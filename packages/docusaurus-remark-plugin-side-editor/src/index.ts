/// <refere
import visit from 'unist-util-visit';
import type { Code, Literal, Root } from 'mdast';
import type { Plugin } from 'unified';
import { parse } from 'node:querystring';
import { PluginOptions } from './types';

function parseMeta<T>(node: Code) {
  const r = parse(node.meta || '', ' ');
  Object.keys(r).forEach((k) => (r[k] = fromAttributeValue(r[k])));
  return r as T;
}

function injectThemeImport(root: Root, element: string) {
  if (
    !root.children.find(
      (n: { type: string; value?: string }) =>
        n.type === 'import' && n.value && n.value?.indexOf(`@theme/${element}`) > -1
    )
  ) {
    root.children.unshift(
      ...[
        {
          type: 'import',
          value: `import ${element} from '@theme/${element}';`,
        } as any,
      ]
    );
  }
}

function fromAttributeValue(s: string | string[] | undefined) {
  if (!s) return s;
  if (typeof s === 'string' && s[0] === '"') {
    try {
      return JSON.parse(s);
    } catch {}
  }
  return s;
}

function toAttributeValue(s: string | undefined | null) {
  if (!s) return s;
  try {
    const j = JSON.parse(s);
    if (typeof j === 'string') s = j;
  } catch {}
  return JSON.stringify(s);
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
  const { languages } = options || {};

  return async (root, vfile) => {
    let needsSideEditorButtonImport = false;

    const visited = new Set<Code>(); // visit called twice on async
    // collect all nodes
    visit(root, 'code', (node: Code, nodeIndex: number, parent) => {
      if (!parent || visited.has(node)) return;
      visited.add(node);

      const { edit } = parseMeta<{
        edit: string;
      }>(node);
      if (edit === undefined) return;
      const { lang = '', value } = node;
      const editorId = edit || languages?.[lang || ''] || lang;
      parent.children.splice(nodeIndex + 1, 0, {
        type: 'jsx',
        value: `<SideEditorButton editorId={${toAttributeValue(editorId)}} text={${toAttributeValue(
          value
        )}} />`,
      } as Literal);
      needsSideEditorButtonImport = true;
      return nodeIndex + 2;
    });

    // add import as final step
    if (needsSideEditorButtonImport) {
      injectThemeImport(root as Root, 'SideEditorButton');
    }
  };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
