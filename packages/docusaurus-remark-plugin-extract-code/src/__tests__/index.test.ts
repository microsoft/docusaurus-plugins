import path from "path";
import vfile from "to-vfile";
import mdx from "remark-mdx";
import remark from "remark";
import plugin from "../index";

const processFixture = async (name: string,
    options: {
        outputPath?: string;
        langs?: string[];
    }
) => {
    const filePath = path.join(__dirname, "__fixtures__", `${name}.md`);
    const file = await vfile.read(filePath);
    const result = await remark().use(mdx).use(plugin, options).process(file);

    return result.toString();
};

describe("extract-code plugin", () => {
    it("works on snippet file", async () => {
        const result = await processFixture("snippets", { langs: ["js"] });
        expect(result).toMatchSnapshot();
    });
});
