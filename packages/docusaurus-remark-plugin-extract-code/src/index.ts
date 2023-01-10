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
const NO_EXTRACT_META = "no-extract";

const plugin: Plugin<[PluginOptions?]> = (options = {}) => {
    const {
        outputPath = "./.docusaurus/docusaurus-remark-plugin-extract-code/snippets",
        langs = [],
    } = options;

    ensureDirSync(outputPath);

    return (root, file) => {
        let snippet = 0;
        const { history } = file;
        const fpath = file.path || history[history.length - 1] || "unknown";
        const fbase = basename(fpath);
        visit(root, "code", (node: Code) => {
            const { lang, meta, value } = node;
            if (
                lang &&
                langs.indexOf(lang) > -1 &&
                !meta?.indexOf(NO_EXTRACT_META)
            ) {
                const fn = join(
                    outputPath,
                    lang,
                    `${fbase}.${snippet}.${lang}`
                );
                ensureDirSync(dirname(fn));
                writeFileSync(fn, value, { encoding: "utf8" });
                snippet++;
            }
        });
    };
};

// To continue supporting `require('npm2yarn')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
