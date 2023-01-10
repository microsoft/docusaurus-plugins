/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from "path";
import vfile from "to-vfile";
import mdx from "remark-mdx";
import remark from "remark";
import plugin from "../index";
import { PluginOptions } from "../options";

const processFixture = async (name: string, options: PluginOptions) => {
    const filePath = path.join(__dirname, "__fixtures__", `${name}.md`);
    const file = await vfile.read(filePath);
    const result = await remark().use(mdx).use(plugin, options).process(file);

    return result.toString();
};

const options: PluginOptions = {
    langs: [
        {
            lang: "ts",
            version: "0.0.0",
            nodeBin: "tsc",
            npmPackage: "typescript",
        },
    ],
};

describe("extract-code plugin", () => {
    it("works on snippet file", async () => {
        const result = await processFixture("snippets", options);
        expect(result).toMatchSnapshot();
    });
});
