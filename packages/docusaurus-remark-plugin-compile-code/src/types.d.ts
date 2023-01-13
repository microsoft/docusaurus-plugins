export interface LangResult {
    code?: number | null;
    stdout?: string;
    stderr?: string;
    error?: string;
}

export interface SnippetOptions {
    meta: string
    cwd: string
}

export type CompileFunction = (source: string, options: LangOptions & SnippetOptions) => Promise<LangResult>;

export interface LangOptions {
    lang: string;
    version?: string;
    command?: string;
    args?: string[];
    timeout?: number;
    extension?: string;
    outputLang?: string;
    outputMeta?: string;

    compile?: CompileFunction;

    nodeBin?: string;
    npmPackage?: string;
}

export type PluginOptions = {
    outputPath?: string;
    langs: LangOptions[];
    concurrency?: number;
    cache?: boolean;
};
