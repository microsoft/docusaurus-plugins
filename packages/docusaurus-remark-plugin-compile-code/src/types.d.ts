export interface LangResult {
    /**
     * console standard output
     */
    stdout?: string;
    /**
     * console standard error
     */
    stderr?: string;
    /**
     * Tool runtime exception or invalid status code
     */
    error?: string;
}

export interface SnippetOptions {
    meta: string;
    cwd: string;
}

export type CompileFunction = (
    source: string,
    options: LangOptions & SnippetOptions
) => Promise<LangResult>;

export interface LangOptions {
    /**
     * Markdown language code identifier in the markdown fenced regions.
     */
    lang: string;
    /**
     * Required string in meta to filter snippets within a language
     */
    langMeta?: string;
    /**
     * Prefix all sources with this string (if not present)
     */
    prefix?: string;
    /**
     * Replace language with the `prism` language for syntax coloring
     * after processing
     */
    inputLang?: string;
    /**
     * Version of the tool, used when hashing pre-compiled solution
     */
    version?: string;
    /**
     * Tool timeout in milliseconds
     */
    timeout?: number;
    /**
     * Output markdown language code identifier, default `code`
     */
    outputLang?: string;
    /**
     * Output meta, default empty.
     */
    outputMeta?: string;
    /**
     * Do not fail build when tools return errors
     */
    ignoreErrors?: boolean;
}

export interface ToolLangOptions extends LangOptions {
    /**
     * Path to the executable
     */
    command?: string;
    /**
     * Additional arguments passed when invoking tool
     */
    args?: string[];
    /**
     * File name extension for sources, default is `lang`.
     */
    extension: string?;
    /**
     * name of the tool alias installed by npm in `node_modules/.bin`. Overrides command.
     */
    nodeBin?: string;
    /**
     * npm package containing the node tool
     */
    npmPackage?: string;
    /**
     * Expected success return code, default `0`.
     */
    successReturnCode?: number;
    /**
     * Ignore tool return code.
     */
    ignoreReturnCode?: boolean;
}

export interface CustomLangOptions extends LangOptions {
    compile?: CompileFunction;
}

export type PluginOptions = {
    outputPath?: string;
    langs: (ToolLangOptions | CustomLangOptions)[];
    concurrency?: number;
    cache?: boolean;
};
