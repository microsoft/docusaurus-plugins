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

const processFixture = async (name: string, options: any) => {
    const filePath = path.join(__dirname, "__fixtures__", `${name}.md`);
    const file = await vfile.read(filePath);
    const result = await remark().use(mdx).use(plugin, options).process(file);

    return result.toString();
};

const options = {};

describe("code-tabs plugin", () => {
    it("works on onetab file", async () => {
        const result = await processFixture("onetab", options);
        expect(result).toMatchSnapshot();
    });
    it("works on twotabs file", async () => {
        const result = await processFixture("twotabs", options);
        expect(result).toMatchSnapshot();
    });
    it("works on groups file", async () => {
        const result = await processFixture("groups", options);
        expect(result).toMatchSnapshot();
    });
    it("works on codesandbox file", async () => {
        const result = await processFixture("codesandbox", options);
        expect(result).toMatchSnapshot();
    });
});
