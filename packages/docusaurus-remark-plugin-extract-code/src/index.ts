/// <refere
import visit from "unist-util-visit";
import type { Code, Content, Literal } from "mdast";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import { ensureDirSync, writeFileSync } from "fs-extra";
import { join, resolve, basename, dirname } from "path";

type PluginOptions = {
    outputPath?: string;
    langs?: string[];
};

const plugin: Plugin<[PluginOptions?]> = (options = {}) => {
    const { outputPath = "./snippets", langs = [] } = options;

    ensureDirSync(outputPath);

    let snippet = 0;
    return (root, file) => {
        const { history } = file;
        const fpath = history[history.length - 1] || "unknown";
        const fbase = basename(fpath);
        visit(root, "code", (node: Code) => {
            const { lang, value } = node;
            if (lang && langs.indexOf(lang) > -1) {
                const fn = join(outputPath, `${fbase}.${snippet}.${lang}`);
                ensureDirSync(dirname(fn))
                writeFileSync(fn, value, { encoding: "utf8",  });
                snippet++;
            }
        });
    };
};

// To continue supporting `require('npm2yarn')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
