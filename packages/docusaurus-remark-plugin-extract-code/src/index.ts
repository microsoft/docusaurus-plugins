/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import visit from "unist-util-visit";
import type { Code, Content, Literal } from "mdast";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import { ensureDirSync, writeFileSync } from "fs-extra";
import { join } from "path";

type PluginOptions = {
    outputPath?: string;
    langs?: string[];
};

const plugin: Plugin<[PluginOptions?]> = (options = {}) => {
    const { outputPath = "./snippets", langs = [] } = options;

    ensureDirSync(outputPath);

    let snippet = 0;
    return (root, file) => {
        visit(root, "code", (node: Code) => {
            const { lang, value } = node;
            if (lang && langs.indexOf(lang) > -1) {
                console.log(file);
                const fn = join(
                    outputPath,
                    `${file.name}.${snippet.toFixed(3)}.${lang}`
                );
                writeFileSync(fn, value, { encoding: "utf8" });
                snippet++;
            }
        });
    };
};

// To continue supporting `require('npm2yarn')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
