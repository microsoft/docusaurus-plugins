import { describe, it, expect } from 'vitest';
import path from 'path';
import vfile from 'to-vfile';
import mdx from 'remark-mdx';
import remark from 'remark';
import plugin from '../index';
import type { PluginOptions } from '../types';
import { readFileSync } from 'fs-extra';

const processFixture = async (name: string, options: PluginOptions) => {
  const filePath = path.join(__dirname, '__fixtures__', `${name}.md`);
  const file = await vfile.read(filePath);
  const result = await remark().use(mdx).use(plugin, options).process(file);

  return result.toString();
};

const options: PluginOptions = {
  langs: [
    {
      lang: 'ts',
      nodeBin: 'tsc',
      inputFiles: {
        'tsconfig.json': {
          compilerOptions: {
            target: 'esnext',
            skipLibCheck: true,
            lib: ['esnext', 'dom'],
          },
          include: ['input.ts'],
        },
      },
    },
    {
      lang: 'meta',
      meta: 'bar',
      compile: async (source, langOptions) => ({
        stdout: source,
      }),
    },
    {
      lang: 'fail',
      errorLang: 'console',
      errorMeta: 'console',
      meta: 'foo',
      compile: async (source, langOptions) => {
        throw new Error('fail');
      },
    },
    {
      lang: 'echo',
      prefix: 'prefix',
      inputLang: 'lisp',
      compile: async (source, langOptions) => ({
        stdout: source,
      }),
    },
    {
      lang: 'echonull',
      inputLang: null,
      outputLang: null,
      compile: async (source, langOptions) => ({
        stdout: source,
      }),
    },
    {
      lang: 'echonode',
      compile: async (source, langOptions) => ({
        nodes: [
          {
            type: 'code',
            meta: 'extra',
            value: 'extra --> ' + source,
          },
          {
            type: 'code',
            lang: 'json',
            value: JSON.stringify(langOptions, null, 2),
          },
        ],
      }),
    },
  ],
};

describe('compile-code plugin', () => {
  it('works on compile file', async () => {
    const result = await processFixture('compile', options);
    expect(result).toMatchSnapshot();
  });
  it('works on nodebin file', async () => {
    const result = await processFixture('nodebin', options);
    expect(result).toMatchSnapshot();
  });
  it('works on meta file', async () => {
    const result = await processFixture('meta', options);
    expect(result).toMatchSnapshot();
  });
  it('works on nodes file', async () => {
    const result = await processFixture('nodes', options);
    expect(result).toMatchSnapshot();
  });
  it('works on puppet file', async () => {
    const options: PluginOptions = {
      langs: [
        {
          lang: 'puppet',
          createDriverHtml: (options) => {
            const filePath = path.join(__dirname, '__fixtures__', `puppet.html`);
            return readFileSync(filePath, { encoding: 'utf-8' });
          },
        },
      ],
    };
    const result = await processFixture('puppet', options);
    expect(result).toMatchSnapshot();
  });
});
