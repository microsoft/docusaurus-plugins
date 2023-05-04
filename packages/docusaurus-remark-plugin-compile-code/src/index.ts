/// <refere
import visit from 'unist-util-visit';
import type { Code, Image } from 'mdast';
import type { Plugin } from 'unified';
import type { Parent } from 'unist';
import {
  ensureDirSync,
  writeFileSync,
  existsSync,
  readJSONSync,
  removeSync,
  writeJSONSync,
  readFileSync,
  copyFileSync,
} from 'fs-extra';
import { join, resolve, basename, dirname, extname } from 'node:path';
import {
  CustomLangOptions,
  LangOptions,
  LangResult,
  PluginOptions,
  PuppeteerLangOptions,
  ToolLangOptions,
} from './types';
import hashCode from './hash';
import { spawnSync } from 'child_process';
import { minimatch } from 'minimatch';
import puppeteer, { Browser, Page } from 'puppeteer';

const RESULT_FILE = 'result.json';

function readCachedResult(cwd: string): LangResult | undefined {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) return undefined;

  // cache lookup
  const cached = join(cwd, RESULT_FILE);
  if (existsSync(cached)) {
    try {
      const res = readJSONSync(cached) as LangResult;
      return res;
    } catch (e) {
      // invalid file, delete folder
      removeSync(cwd);
    }
  }
  return undefined;
}

function parseMeta(meta: string = '') {
  const skip = /\s?skip|no-build\s?/i.test(meta);
  const ignoreErrors = /\s?ignore-?errors\s?/i.test(meta);
  return { skip, ignoreErrors };
}

const BUILD_PATH = './.docusaurus/docusaurus-remark-plugin-compile-code/';
const cachePath = `${BUILD_PATH}cache/`;
const outputPath = `${BUILD_PATH}src/`;
const assetsPath = `${BUILD_PATH}assets/`;

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
  const { langs = [], cache = !process.env.RISE_COMPILE_CODE_NO_CACHE, failFast } = options || {};
  let puppets: Record<
    string,
    {
      page: Page;
      close: () => Promise<void>;
      pendingRequests: Record<
        string,
        {
          resolve: (msg: object) => void;
          reject: (reason: any) => void;
        }
      >;
    }
  > = {};
  const cleanupPuppets = async () => {
    Object.keys(puppets).forEach((k) => {
      const { close, pendingRequests } = puppets[k] || {};
      if (pendingRequests && !Object.keys(pendingRequests).length) {
        console.debug(`${k}:puppet> cleanup`);
        close?.();
        delete puppets[k];
      }
    });
    puppets = {};
  };

  const puppeteerCodeNoCache = async (
    cwd: string,
    source: string,
    meta: string,
    langOptions: PuppeteerLangOptions,
    hash: string
  ): Promise<LangResult | undefined> => {
    const { timeout = 60000 } = langOptions;
    let { page, pendingRequests } = puppets[langOptions.lang] || {};
    if (!page) {
      pendingRequests = {};
      const browser = await puppeteer.launch({ headless: 'new' });
      const puppeteerVersion = await browser.version();
      const msgp = `${langOptions.lang}:driver> `;
      console.info(`${msgp}starting browser ${puppeteerVersion}`);
      page = await browser.newPage();
      if (!page) throw Error('page could not load');
      page.on('console', (msg) => {
        console.log(msg.text());
      });
      const close: () => Promise<void> = async () => {
        await page?.close();
        await browser?.close();
      };
      let html =
        (langOptions.html && readFileSync(langOptions.html, { encoding: 'utf-8' })) ||
        langOptions.createDriverHtml?.(langOptions);

      // exapnd scripts
      const scriptPromises: Promise<void>[] = [];
      html = html?.replace(/<script src="file:\/\/([^"]+)">\s*<\/script>/gi, (m, n) => {
        console.debug(`inlining ${n}`);
        const js = readFileSync(n, { encoding: 'utf-8' });
        if (!page) return 'missing page';
        scriptPromises.push(
          page
            .addScriptTag({ content: js })
            .then(() => {
              console.debug(`inlined ${n}`);
            })
            .catch((e) => {
              console.error(e);
              throw e;
            })
        );
        return `<!-- inlined ${n} -->`;
      });
      await Promise.all(scriptPromises);

      await page.exposeFunction('rise4funPostMessage', (msg: object) => {
        const resp: any = langOptions.resolveCompileResponse?.(msg) || msg;
        const id = resp?.id;
        const { resolve } = pendingRequests?.[id] || {};
        if (resolve) {
          console.debug(`${msgp}received ${id}`);
          delete pendingRequests?.[id];
          resolve({
            ...resp,
            outputFiles: {
              'driver.html': html,
              ...(resp.outputFiles || {}),
            },
          });
        }
      });
      let readyResolve: (() => void) | undefined = undefined;
      let readyReject: ((reason: any) => void) | undefined = undefined;
      const ready = new Promise<void>(async (resolve, reject) => {
        readyResolve = resolve;
        readyReject = reject;
      });
      await page?.exposeFunction('rise4funReady', () => {
        readyReject = undefined;
        readyResolve?.();
      });
      await page.setContent(html!);
      console.debug(`${msgp}waiting browser`);
      let readyTimeoutId = setTimeout(() => {
        console.error(`${msgp}browser timeout`);
        readyResolve = undefined;
        readyReject?.({
          message: 'browser timeout',
          outputFiles: { 'driver.html': html },
        });
      }, 30000);
      await ready;
      clearTimeout(readyTimeoutId);
      // wait for ready message
      puppets[langOptions.lang] = { page, pendingRequests, close };
    }
    // send and wait for message
    const id = langOptions.lang + Math.random().toString();
    const request = {
      id,
      type: 'puppet',
      lang: langOptions.lang,
      source,
      options: {
        ...langOptions,
        meta,
        cwd,
      },
    };
    const msg = langOptions.createCompileRequest?.(request) || request;
    const processing = new Promise<LangResult | undefined>((resolve, reject) => {
      console.debug(`${langOptions.lang}:puppeteer> schedule ${id}`);
      pendingRequests![id] = { resolve, reject };
      page!.evaluate(async (msg) => {
        window.postMessage(msg, '*');
      }, msg);
    });
    // concurrent timeout
    setTimeout(() => {
      const req = pendingRequests?.[id];
      if (req) {
        console.error(`${langOptions.lang}:puppeteer> timeout ${id}`);
        delete pendingRequests?.[id];
        req?.reject?.('render timeout');
      }
    }, timeout);
    return processing;
  };

  async function compileCode(
    cwd: string,
    source: string,
    meta: string,
    langOptions: LangOptions,
    cache: boolean,
    hash: string
  ): Promise<LangResult | undefined> {
    let result = cache && readCachedResult(cwd);
    if (result) return result;

    const { prefix } = langOptions;
    const psource = !prefix || source.indexOf(prefix) > -1 ? source : prefix + '\n\n' + source;

    ensureDirSync(cwd);
    result = await compileCodeNodeCache(cwd, psource, meta, langOptions, hash);

    // cache on disk
    if (result && cache) {
      writeJSONSync(join(cwd, RESULT_FILE), result, { spaces: 2 });
    }
    return result;
  }

  const compileCodeNodeCache = async (
    cwd: string,
    source: string,
    meta: string,
    langOptions: LangOptions,
    hash: string
  ): Promise<LangResult | undefined> => {
    const { timeout, lang, outputFiles = [] } = langOptions;
    const writeGeneratedOutputFiles = (res: LangResult) => {
      const ros = res?.outputFiles || {};
      Object.keys(ros).forEach((fn) => {
        const content = ros[fn];
        console.debug(`write ${join(cwd, fn)}`);
        if (typeof content === 'string')
          writeFileSync(join(cwd, fn), content, {
            encoding: 'utf-8',
          });
        else writeFileSync(join(cwd, fn), content as Uint8Array);
      });
    };
    const cleanOutputFiles = (cwd: string) => {
      outputFiles?.forEach((f) => {
        try {
          removeSync(join(cwd, f.name));
        } catch (e) {
          console.debug(e);
        }
      });
    };
    const generateNodesFromOutputFiles = (result: LangResult) => {
      if (outputFiles) {
        result.nodes = [
          ...(result.nodes || []),
          ...outputFiles
            .filter(({ name }) => existsSync(join(cwd, name)))
            .map(({ name, title, lang: outputLang, meta }) => {
              const fn = name;
              if (/\.(svg|png|jpg|jpeg)$/i.test(fn)) {
                // copy file to static folder
                const snd = join(assetsPath, lang, hash);
                ensureDirSync(snd);
                copyFileSync(join(cwd, fn), join(snd, fn));

                return <Image>{
                  type: 'image',
                  alt: title || fn,
                  url: `/${join(lang, hash, fn)}`,
                };
              } else {
                const text = readFileSync(join(cwd, fn), {
                  encoding: 'utf-8',
                });
                return <Code>{
                  type: 'code',
                  lang: outputLang || extname(fn).slice(1),
                  meta: `tabs title=${JSON.stringify(title || fn)} ${meta || ''}`,
                  value: text,
                };
              }
            }),
        ];
      }
    };

    // custom function
    const { compile } = langOptions as CustomLangOptions;
    if (compile) {
      try {
        const res = await compile(source, {
          ...langOptions,
          meta,
          cwd,
        });
        if (res) {
          writeGeneratedOutputFiles(res);
          generateNodesFromOutputFiles(res);
        }
        return res;
      } catch (e) {
        return {
          error: e + '',
        };
      }
    }

    // puppeteer
    const { html, createDriverHtml } = langOptions as PuppeteerLangOptions;
    if (!!createDriverHtml || !!html) {
      try {
        const res = await puppeteerCodeNoCache(
          cwd,
          source,
          meta,
          langOptions as PuppeteerLangOptions,
          hash
        );
        if (res) {
          writeGeneratedOutputFiles(res);
          generateNodesFromOutputFiles(res);
        }
        return res;
      } catch (e) {
        return {
          error: e + '',
        };
      }
    }

    // Tool
    const {
      extension,
      command,
      nodeBin,
      args = [],
      successReturnCode = 0,
      ignoreReturnCode,
      inputFiles = {},
    } = langOptions as ToolLangOptions;
    if (command || nodeBin) {
      const ifn = `input.${extension || lang}`;
      const iargs = [...args];
      ensureDirSync(cwd);
      writeFileSync(join(cwd, ifn), source);

      // write prefiles
      Object.entries(inputFiles).map(([name, content]) =>
        writeFileSync(
          join(cwd, name),
          typeof content === 'object' ? JSON.stringify(content, null, 2) : content,
          { encoding: 'utf-8' }
        )
      );

      writeJSONSync(join(cwd, 'options.json'), {
        ...langOptions,
        meta,
      });

      // compile tool
      let cmd: string = command || '';
      if (nodeBin) {
        if (process.platform === 'win32') {
          cmd = resolve(join('node_modules', '.bin', nodeBin + '.cmd'));
        } else {
          iargs.unshift(resolve(join('node_modules', '.bin', nodeBin)));
          cmd = 'node';
        }
      } else if (/\.m?js/.test(cmd)) {
        iargs.unshift(resolve(cmd));
        cmd = 'node';
      }
      writeFileSync(
        join(cwd, `run.${process.platform === 'win32' ? 'cmd' : 'sh'}`),
        `${cmd} ${iargs.join(' ')}`
      );
      try {
        cleanOutputFiles(cwd);
        const res = spawnSync(cmd, iargs, {
          timeout,
          cwd,
        });
        let error = res.error?.message || '';
        if (!ignoreReturnCode && res.status !== successReturnCode && !res.stderr)
          error += `\exit code: ${res.status}`;
        const result: LangResult = {
          stdout: res.stdout?.toString() || '',
          stderr: res.stderr?.toString() || '',
          error,
        };
        generateNodesFromOutputFiles(result);
        return result;
      } catch (e) {
        return {
          stderr: e + '',
          error: 'tool execution failed',
        } as LangResult;
      }
    }

    // unknown configuration
    return {
      error: `invalid configuration (${langOptions.lang})`,
    };
  };

  return async (root, vfile) => {
    let snippet = 0;
    const { history } = vfile;
    const fpath = vfile.path || history[history.length - 1] || 'unknown';
    const fbase = basename(fpath);

    let errors = 0;
    const visited = new Set<Code>(); // visit called twice on async
    const todo: {
      node: Code;
      parent: Parent | undefined;
    }[] = [];
    // collect all nodes
    visit(root, 'code', (node: Code, _, parent) => {
      if (!visited.has(node)) {
        visited.add(node);
        todo.push({ node, parent });
      }
    });

    // render
    for (const { node, parent } of todo) {
      if (!parent) continue;
      const { lang, meta, value } = node;
      if (!lang) return;
      const langOptions = langs.find(
        (o) => o.lang === lang && (!o.meta || (meta || '').indexOf(o.meta) > -1)
      );
      if (!langOptions) continue;
      const { skip, ignoreErrors: ignoreErrorsMeta } = parseMeta(meta || '');
      if (skip) continue;

      const {
        outputMeta = '',
        errorMeta = '',
        outputLang,
        errorLang,
        inputLang,
        ignoreErrors: ignoreErrorsLang,
        excludedFiles,
      } = langOptions;

      if (
        vfile.path !== undefined &&
        excludedFiles?.some((excluded) => minimatch(vfile.path || '', excluded))
      ) {
        continue;
      }

      // save source in tree
      snippet++;
      const fn = join(outputPath, fbase, `code${snippet}.${lang}`);
      ensureDirSync(dirname(fn));
      writeFileSync(fn, value, { encoding: 'utf-8' });

      // compute output
      let nextIndex = parent.children.indexOf(node) + 1;
      const ignoreErrors = ignoreErrorsLang || ignoreErrorsMeta;
      const hash = hashCode(value, meta || '', langOptions);
      const cwd = join(cachePath, lang, hash);
      const res = await compileCode(cwd, value, meta || '', langOptions, cache, hash);
      const { stdout, stderr, error, nodes } = res || {};
      const out: (string | undefined)[] = [stdout?.trimEnd()].filter((s) => !!s);
      const err: (string | undefined)[] = [stderr?.trimEnd(), error].filter((s) => !!s);
      if (inputLang === null) {
        // remove code
        nextIndex--;
        parent.children.splice(nextIndex, 1);
      } else if (inputLang) node.lang = inputLang;

      if (outputLang !== null && out?.length) {
        parent.children.splice(nextIndex++, 0, <Code>{
          type: 'code',
          lang: outputLang,
          meta: outputMeta + ` title="Output"`,
          value: out.join('\n'),
        });
      }

      if (errorMeta !== null && err?.length) {
        parent.children.splice(nextIndex++, 0, <Code>{
          type: 'code',
          lang: errorLang || 'console',
          meta: outputMeta + ` title="Error"`,
          value: err.join('\n'),
        });
      }

      if (nodes?.length) {
        parent.children.splice(nextIndex, 0, ...nodes);
        nextIndex += nodes.length;
      }

      if (!ignoreErrors && res && (res?.error || stderr)) {
        errors++;
        console.error(`error ${vfile.path}: ${res.error || ''}`);

        if (failFast) throw new Error('error while compiling code snippet');
      }
    }

    // cleanup pupppets
    await cleanupPuppets();

    if (errors) throw new Error('errors while compile code snippets');
  };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
