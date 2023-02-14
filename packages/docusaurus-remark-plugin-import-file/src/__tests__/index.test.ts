import path from "path";
import vfile from "to-vfile";
import mdx from "remark-mdx";
import remark from "remark";
const plugin = require("../index")
import type { PluginOptions } from "../types";

const processFixture = async (name: string, options: PluginOptions) => {
    const filePath = path.join(__dirname, "__fixtures__", `${name}.md`);
    const file = await vfile.read(filePath);
    const result = await remark().use(mdx).use(plugin, options).process(file);

    return result.toString();
};

const options: PluginOptions = {};

describe("compile-code plugin", () => {
    it("works on compile file", async () => {
        const result = await processFixture("compile", options);
        expect(result).toMatchSnapshot();
    });
});
