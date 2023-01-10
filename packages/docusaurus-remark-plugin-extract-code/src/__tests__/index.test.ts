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
import npm2yarn from "../index";

const processFixture = async (name: string,
    options: {
        outputPath?: string;
        langs?: string[];
    }
) => {
    const filePath = path.join(__dirname, "__fixtures__", `${name}.md`);
    const file = await vfile.read(filePath);
    const result = await remark().use(mdx).use(npm2yarn, options).process(file);

    return result.toString();
};

describe("extract-code plugin", () => {
    it("works on snippet file", async () => {
        const result = await processFixture("snippets", { langs: ["js"] });
        expect(result).toMatchSnapshot();
    });
});
