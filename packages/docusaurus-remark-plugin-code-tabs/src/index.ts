/// <refere
import visit from "unist-util-visit";
import type { Code, Root } from "mdast";
import type { Plugin } from "unified";
import { parse } from "node:querystring";
import { PluginOptions } from "./types";

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

function toAttributeValue(s: string | undefined) {
    if (!s) return s;
    try {
        const j = JSON.parse(s);
        if (typeof j === "string") s = j;
    } catch {}
    return JSON.stringify(s);
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
    const {} = options || {};

    return async (root, vfile) => {
        let needsImport = false;
        const visited = new Set<Code>(); // visit called twice on async
        // collect all nodes
        visit(root, "code", (node: Code, nodeIndex: number, parent) => {
            if (!parent || visited.has(node)) return;
            visited.add(node);

            const { tabs } = parseMeta<{ tabs: string }>(node);
            if (tabs === undefined) return;

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
                    value: `<Tabs groupId={${JSON.stringify(
                        tabs || "default"
                    )}}>`,
                },
            ];
            codes.forEach((c) => {
                const { lang = "", meta: metastring = "", value } = c;
                const { title } = parseMeta(c) as { title?: string };
                mdx.push({
                    type: "jsx",
                    value: `<Tab value={${JSON.stringify(
                        lang
                    )}} label={${toAttributeValue(title)}}>`,
                });
                mdx.push({ ...c });
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
            const nextIndex = startIndex + (mdx.length - codes.length) + 1;
            return nextIndex;
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
