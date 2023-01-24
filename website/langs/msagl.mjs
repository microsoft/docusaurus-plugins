import { createSVGWindow } from "svgdom";
import { parseDot } from "@msagl-js/parser";
import { RendererSVG } from "@msagl-js/renderer";
import { writeFileSync } from "node:fs";

async function run() {
    const input = readFileSync(`./input.z3`, { encoding: "utf8" });
    const options = JSON.parse(
        readFileSync(`./options.json`, { encoding: "utf8" })
    );

    const window = createSVGWindow();
    const document = window.document;
    const container = document.createElement("div");

    const renderer = new RendererSVG(container);
    const graph = parseDot(input);
    renderer.setGraph(graph, options);

    const svg = renderer.getSvgString();
    console.log(svg);
    writeFileSync("./graph.svg", svg, { encoding: "utf-8" });
}

(async () => {
    try {
        await run();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
