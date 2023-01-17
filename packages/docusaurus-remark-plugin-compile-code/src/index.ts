/// <refere
import visit from "unist-util-visit";
import type { Code } from "mdast";
import type { Plugin } from "unified";
import type { Parent } from "unist";
import {
    ensureDirSync,
    writeFileSync,
    existsSync,
    readJSONSync,
    removeSync,
    writeJSONSync,
} from "fs-extra";
import { join, resolve } from "path";
import {
    CustomLangOptions,
    LangOptions,
    LangResult,
    PluginOptions,
    ToolLangOptions,
} from "./types";
import hashCode from "./hash";
import { spawnSync } from "child_process";
const RESULT_FILE = "result.json";

function readCachedResult(cwd: string): LangResult | undefined {
    const isProd = process.env.NODE_ENV === "production";
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

async function compileCode(
    cwd: string,
    source: string,
    meta: string,
    langOptions: LangOptions,
    cache: boolean
): Promise<LangResult | undefined> {
    let result = cache && readCachedResult(cwd);
    if (result) return result;

    ensureDirSync(cwd);
    result = await compileCodeNodeCache(cwd, source, meta, langOptions);

    // cache on disk
    if (result && cache) {
        writeJSONSync(join(cwd, RESULT_FILE), result, { spaces: 2 });
    }
    return result;
}

async function compileCodeNodeCache(
    cwd: string,
    source: string,
    meta: string,
    langOptions: LangOptions
): Promise<LangResult | undefined> {
    const { timeout, lang } = langOptions;

    // custom function
    const { compile } = langOptions as CustomLangOptions;
    if (compile) {
        try {
            return await compile(source, {
                ...langOptions,
                meta,
                cwd,
            });
        } catch (e) {
            return {
                error: e + "",
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
    } = langOptions as ToolLangOptions;
    if (command || nodeBin) {
        const ifn = `input.${extension || lang}`;
        const iargs = [...args, ifn];
        ensureDirSync(cwd);
        writeFileSync(join(cwd, ifn), source);

        // compile tool
        let cmd: string = command || "";
        if (nodeBin) {
            cmd = "node";
            iargs.unshift(resolve(join("node_modules", ".bin", nodeBin)));
        }
        writeFileSync(join(cwd, "run.sh"), `${cmd} ${iargs.join(" ")}`);
        const res = spawnSync(cmd, iargs, {
            timeout,
            cwd,
        });
        if (res.error) console.error(res.error);
        let error = res.error?.message || "";
        if (!ignoreReturnCode && res.status !== successReturnCode)
            error += `\nreturn code: ${res.status}`;
        const result: LangResult = {
            stdout: res.stdout?.toString() || "",
            stderr: res.stderr?.toString() || "",
            error,
        };
        return result;
    }

    // unknown configuration
    return {
        error: "invalid configuration",
    };
}

function parseMeta(meta: string = "") {
    const skip = / skip /i.test(meta);
    return { skip };
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
    const {
        outputPath = "./.docusaurus/docusaurus-remark-plugin-compile-code/",
        langs = [],
        cache = process.env.NODE_ENV === "production",
    } = options || {};

    return async (root, vfile) => {
        let errors = 0;
        const visited = new Set<Code>(); // visit called twice on async
        const todo: {
            node: Code;
            parent: Parent | undefined;
        }[] = [];
        // collect all nodes
        visit(root, "code", (node: Code, _, parent) => {
            if (!visited.has(node)) {
                visited.add(node);
                todo.push({ node, parent });
            }
        });

        // render
        for (const { node, parent } of todo) {
            if (!parent) continue;
            const { lang, meta, value } = node;
            const langOptions = langs.find(
                (o) =>
                    o.lang === lang &&
                    (!o.langMeta || (meta || "").indexOf(o.langMeta) > -1)
            );
            if (!lang || !langOptions) continue;
            const { skip } = parseMeta(meta || "");
            if (skip) continue;

            const { outputMeta, outputLang, inputLang, ignoreErrors } =
                langOptions;
            const hash = hashCode(value, meta || "", langOptions);
            const cwd = join(outputPath, lang, hash);
            const res = await compileCode(
                cwd,
                value,
                meta || "",
                langOptions,
                cache
            );
            const out: string =
                [
                    res?.stdout?.trimEnd(),
                    res?.stderr
                        ? `-- error\n${res.stderr.trimEnd()}`
                        : undefined,
                    res?.error,
                ]
                    .filter((s) => !!s)
                    .join("\n") || "no output";

            const nodeIndex = parent.children.indexOf(node);
            if (inputLang) node.lang = inputLang;
            parent.children.splice(nodeIndex + 1, 0, <Code>{
                type: "code",
                lang: outputLang,
                meta: outputMeta,
                value: out,
            });

            if (!ignoreErrors && res?.error) {
                errors++;
                console.error(`${vfile.name}: ${res?.error}`);
            }
        }

        if (errors) throw new Error("errors while compile code snippets");
    };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
