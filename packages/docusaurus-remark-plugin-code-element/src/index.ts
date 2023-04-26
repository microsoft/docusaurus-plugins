import visit from 'unist-util-visit';
import type { Code, Literal, Root } from 'mdast';
import type { Plugin } from 'unified';
import { parse } from 'node:querystring';
import { PluginOptions } from './types';

function parseMeta(node: Code) {
  const r = parse(node.meta || '', ' ');
  Object.keys(r).forEach((k) => (r[k] = fromAttributeValue(r[k])));
  return r;
}

function injectThemeImport(root: Root, element: string) {
  if (
    !root.children.find(
      (n: { type: string; value?: string }) =>
        n.type === 'import' && n.value && n.value?.includes(`@theme/${element}`)
    )
  ) {
    root.children.unshift({
      type: 'import',
      value: `import ${element} from '@theme/${element}';`,
    } as any);
  }
}

function fromAttributeValue(s: string | string[] | undefined) {
  if (s === undefined) return s;
  if (s === '') return true;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (typeof s === 'string') {
    const i = parseInt(s);
    if (!isNaN(i)) return i;
    const f = parseFloat(s);
    if (!isNaN(f)) return f;
    const x = /^0x/.test(s) && parseInt(s.slice(2), 16);
    if (x !== false && !isNaN(x)) return x;
  }
  if (typeof s === 'string' && s[0] === '"') {
    try {
      return JSON.parse(s);
    } catch {}
  }
  return s;
}

function toAttributeValue(s: string | undefined) {
  if (!s) return s;
  try {
    const j = JSON.parse(s);
    if (typeof j === 'string') s = j;
  } catch {}
  return JSON.stringify(s);
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
  const { langs = [] } = options || {};

  return async (root, vfile) => {
    const needsImport = new Set<string>();
    const visited = new Set<Code>(); // visit called twice on async
    // collect all nodes
    visit(root, 'code', (node: Code, nodeIndex: number, parent) => {
      const { lang, meta, value } = node;
      if (!parent || !lang || visited.has(node)) return;
      visited.add(node);

      const langOptions = langs.find((o) => o.lang === lang);
      if (!langOptions) return;

      const { element } = langOptions;
      const parsedMeta = parseMeta(node);
      needsImport.add(element);
      parent.children.splice(nodeIndex, 1, <Literal>{
        type: 'jsx',
        value: `<${element} lang={${toAttributeValue(lang)}} meta={${JSON.stringify(
          parsedMeta
        )}} value={${toAttributeValue(value)}} />`,
      });
    });

    needsImport.forEach((element) => injectThemeImport(root as Root, element));
  };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
