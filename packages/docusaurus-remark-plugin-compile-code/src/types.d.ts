export interface LangResult {
    code?: number | null;
    stdout?: string;
    stderr?: string;
    error?: string;
}

export interface LangOptions {
    lang: string;
    command?: string;
    args?: string[];
    timeout?: number;
    extension?: string;
    outputLang?: string;
    outputMeta?: string;

    compile?: (source: string, langOptions: LangOptions) => LangResult;

    nodeBin?: string;
}

export type PluginOptions = {
    outputPath?: string;
    langs: LangOptions[];
    concurrency?: number;
};
