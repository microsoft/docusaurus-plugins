/// <refere
import visit from "unist-util-visit";
import type { Code, Root } from "mdast";
import type { Plugin } from "unified";
import type { Parent } from "unist";
import { parse } from "node:querystring";

function parseMeta<T>(node: Code) {
    return parse(node.meta || "", " ") as T;
}

function injectImport(root: Root, jsx: string) {
    if (
        !root.children.find(
            (n: { type: string; value?: string }) =>
                n.type === "import" && n.value && n.value?.indexOf(jsx) > -1
        )
    ) {
        root.children.unshift(
            ...[
                {
                    type: "import",
                    value: jsx + ";",
                } as any,
            ]
        );
    }
}

const plugin: Plugin<[{}?]> = (options = undefined) => {
    const {} = options || {};

    return async (root, vfile) => {
        let needsImport = false;
        const visited = new Set<Code>(); // visit called twice on async
        // collect all nodes
        visit(root, "code", (node: Code, nodeIndex: number, parent) => {
            if (!parent || visited.has(node)) return;
            visited.add(node);

            const meta = parseMeta<{ tabs: string }>(node);
            if (meta.tabs === undefined) return;

            const codes = [node];
            // collect all code blocks with tabs in this sequence
            const startIndex = nodeIndex++;
            while (
                nodeIndex < parent.children.length &&
                parent.children[nodeIndex]?.type === "code"
            ) {
                codes.push(parent.children[nodeIndex] as Code);
                nodeIndex++;
            }

            // collapse code into a mdx tree
            const mdx = [
                {
                    type: "jsx",
                    value: "<Tabs>",
                },
            ];
            codes.forEach((c) => {
                const { lang = "", meta: metastring = "", value } = c;
                const meta = parseMeta(c) as { title?: string };
                mdx.push({
                    type: "jsx",
                    value: `<Tab value={${JSON.stringify(
                        lang
                    )}} label={${JSON.stringify(meta.title)}}>`,
                });
                mdx.push({
                    type: "element",
                    tagName: "pre",
                    properties: {},
                    children: [
                        {
                            type: "element",
                            tagName: "code",
                            properties: {
                                className: `language-${lang}`,
                                metastring,
                                ...meta,
                            },
                            children: [
                                {
                                    type: "text",
                                    value: value,
                                },
                            ],
                        },
                    ],
                } as any);
                mdx.push({
                    type: "jsx",
                    value: "</Tab>",
                });
            });
            mdx.push({
                type: "jsx",
                value: "</Tabs>",
            });

            parent.children.splice(startIndex, codes.length, ...mdx);
            needsImport = true;

            // tell visitor to continue on the next node
            return startIndex + 1;
        });

        // add import as final step
        if (needsImport) {
            injectImport(root as Root, "import TabItem from '@theme/TabItem'");
            injectImport(root as Root, "import Tabs from '@theme/Tabs'");
        }
    };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
