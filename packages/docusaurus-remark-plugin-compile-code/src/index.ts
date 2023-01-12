/// <refere
import visit from "unist-util-visit";
import type { Code } from "mdast";
import type { Plugin } from "unified";
import {
    ensureDirSync,
    writeFileSync,
    existsSync,
    readJSONSync,
    removeSync,
    writeJSONSync,
} from "fs-extra";
import { join, resolve } from "path";
import { LangOptions, LangResult, PluginOptions } from "./types";
import hashCode from "./hash";
import { spawnSync } from "child_process";
const RESULT_FILE = "result.json";

function readCachedResult(cwd: string): LangResult | undefined {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return undefined;

    // cache lookup
    const cached = join(cwd, RESULT_FILE);
    if (existsSync(cached)) {
        try {
            const res = readJSONSync(cached) as LangResult;
            return res;
        } catch (e) {
            // invalid file, delete folder
            removeSync(cwd);
        }
    }
    return undefined;
}

function compileCode(
    cwd: string,
    source: string,
    langOptions: LangOptions,
    cache: boolean
): LangResult | undefined {
    let result = cache && readCachedResult(cwd);
    if (result) return result;

    result = compileCodeNodeCache(cwd, source, langOptions);

    // cache on disk
    if (result && cache) {
        ensureDirSync(cwd);
        writeJSONSync(join(cwd, RESULT_FILE), result, { spaces: 2 });
    }
    return result;
}

function compileCodeNodeCache(
    cwd: string,
    source: string,
    langOptions: LangOptions
): LangResult | undefined {
    const {
        extension,
        timeout,
        args = [],
        lang,
        command,
        nodeBin,
        compile,
    } = langOptions;

    if (compile) {
        try {
            return compile(source, langOptions);
        } catch (e) {
            return {
                error: e + "",
            };
        }
    }

    const ifn = `input.${extension || lang}`;
    const iargs = [...args, ifn];
    ensureDirSync(cwd);
    writeFileSync(join(cwd, ifn), source);

    // compile tool
    let cmd: string = command || "";
    if (nodeBin) {
        cmd = "node";
        iargs.unshift(resolve(join("node_modules", ".bin", nodeBin)));
    }
    writeFileSync(join(cwd, "run.sh"), `${cmd} ${iargs.join(" ")}`);
    const res = spawnSync(cmd, iargs, {
        timeout,
        cwd,
    });
    if (res.error) console.error(res.error);
    const result: LangResult = {
        code: res.status,
        stdout: res.stdout?.toString() || "",
        stderr: res.stderr?.toString() || "",
        error: res.error ? "error while running tool" : undefined,
    };
    return result;
}

function parseMeta(meta: string = "") {
    const skip = / skip /i.test(meta);
    return { skip };
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
    const {
        outputPath = "./.docusaurus/docusaurus-remark-plugin-compile-code/",
        langs = [],
        cache = process.env.NODE_ENV === "production",
    } = options || {};

    return async (root) => {
        visit(root, "code", (node: Code, nodeIndex, parent) => {
            const { lang, meta, value } = node;
            const langOptions = langs.find((o) => o.lang === lang);
            if (!lang || !langOptions) return;
            const { skip } = parseMeta(meta || "");
            if (skip) return;

            const { outputMeta, outputLang } = langOptions;
            const hash = hashCode(value, meta || "", langOptions);
            const cwd = join(outputPath, lang, hash);
            const res = compileCode(cwd, value, langOptions, cache);
            const out: string =
                [
                    res?.stdout,
                    res?.stderr ? `-- error\n${res.stderr}` : undefined,
                    res?.error,
                ]
                    .filter((s) => !!s)
                    .join("\n") || "no output";
            if (parent)
                parent.children.splice(++nodeIndex, 0, <Code>{
                    type: "code",
                    lang: outputLang,
                    meta: outputMeta,
                    value: out,
                });
            return nodeIndex + 1;
        });
    };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
