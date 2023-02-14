const { readFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const visit = require("unist-util-visit");

// inspired from https://github.com/dotansimha/remark-import-partial
module.exports = function () {
    const unified: any = this;

    return function transformer(tree: any, file: any) {
        visit(tree, "paragraph", (node: any) => {
            if (
                node.children &&
                node.children[0] &&
                node.children[0].type === "text"
            ) {
                const m = /{@import(?<optional>\s+optional)?\s+(?<filePath>.+)}/.exec(
                    node.children[0].value || ""
                );
                if (m) {
                    const { filePath, optional } = m.groups || {};
                    const fileAbsPath = resolve(file.dirname, filePath);

                    if (existsSync(fileAbsPath)) {
                        const rawMd = readFileSync(fileAbsPath, "utf-8");
                        node.children = unified.parse(rawMd).children;
                    } else {
                        if (!optional)
                            throw new Error(
                                `import error: ${fileAbsPath} not found`
                            );
                        else node.children = [];
                    }
                }
            }
        });
    };
};
