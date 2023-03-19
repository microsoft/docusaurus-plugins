import { describe, it, expect } from "vitest";
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

const options = {
    languages: {
        ts: "typescript",
    },
};

describe("code-tabs plugin", () => {
    it("works on edit file", async () => {
        const result = await processFixture("edit", options);
        expect(result).toMatchSnapshot();
    });
});
