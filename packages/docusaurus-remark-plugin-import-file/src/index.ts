const { readFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const visit = require("unist-util-visit");

module.exports = function () {
    const unified: any = this;

    return function transformer(tree: any, file: any) {
        visit(tree, "paragraph", (node: any) => {
            if (
                node.children &&
                node.children[0] &&
                node.children[0].type === "text"
            ) {
                const m = /{@import (.+)}/.exec(node.children[0].value || "");
                if (m?.[1]) {
                    const filePath = m[1];
                    const fileAbsPath = resolve(file.dirname, filePath);

                    if (existsSync(fileAbsPath)) {
                        const rawMd = readFileSync(fileAbsPath, "utf-8");
                        node.children = unified.parse(rawMd).children;
                    }
                }
            }
        });
    };
};
