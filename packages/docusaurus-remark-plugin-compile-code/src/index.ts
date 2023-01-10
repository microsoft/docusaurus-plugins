/// <refere
import visit from "unist-util-visit";
import type { Code } from "mdast";
import type { Plugin } from "unified";
import {
    ensureDirSync,
    writeFileSync,
    existsSync,
    exists,
    readJSONSync,
    removeSync,
    remove,
    writeJSONSync,
} from "fs-extra";
import { join, basename, dirname } from "path";
import { LangOptions, PluginOptions } from "./options";
import hashCode from "./hash";
import { spawnSync } from "child_process";

const RESULT_FILE = "result.json";

interface SpawnResult {
    code: number | null;
    stdout: string;
    stderr: string;
    error?: string;
}

function readCachedResult(cwd: string): SpawnResult | undefined {
    // cache lookup
    const cached = join(cwd, RESULT_FILE);
    if (existsSync(cached)) {
        try {
            const res = readJSONSync(cached) as SpawnResult;
            console.debug(`cached ${cwd}`)
            return res
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
    langOptions: LangOptions
): SpawnResult | undefined {
    const { extension, timeout, args = [] } = langOptions;
    let result = readCachedResult(cwd);
    if (!result) {
        ensureDirSync(cwd);
        const ifn = `input.${extension}`;
        const iargs = [...args, ifn];
        writeFileSync(join(cwd, ifn), source);
        const res = spawnSync(cwd, iargs, {
            timeout,
        });
        result = {
            code: res.status,
            stdout: res.stdout?.toString() || "",
            stderr: res.stderr?.toString() || "",
            error: res.error?.message,
        };
        // cache on disk
        if (result) writeJSONSync(join(cwd, RESULT_FILE), result);
    }
    return result;
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
    const {
        outputPath = "./.docusaurus/docusaurus-remark-plugin-compile-code/",
        langs = [],
    } = options || {};
    return async (root, file) => {
        const { history } = file;
        const fpath = file.path || history[history.length - 1] || "unknown";
        const fbase = basename(fpath);
        visit(root, "code", (node: Code, nodeIndex, parent) => {
            const { lang, meta, value } = node;
            const langOptions = langs.find((o) => o.lang === lang);
            if (!lang || !langOptions) return;

            const { outputLang = null, outputMeta = null } = langOptions;
            const hash = hashCode(value, meta || "", langOptions);
            const cwd = join(outputPath, lang, hash);
            const res = compileCode(cwd, value, langOptions);
            if (parent && res && res.code === 0) {
                const out: Code = {
                    type: "code",
                    lang: outputLang,
                    meta: outputMeta,
                    value: res.stdout,
                }
                parent.children.splice(nodeIndex, 0, out);
            }
        });
    };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
