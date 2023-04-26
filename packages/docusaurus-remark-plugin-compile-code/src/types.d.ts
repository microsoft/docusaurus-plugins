import type { Node } from 'unist';

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
  /**
   * Extra markdown node to be added after the output
   */
  nodes?: Node[];
  /**
   * In memory generated files
   */
  outputFiles?: Record<string, string | Uint8Array>;
}

export interface SnippetOptions {
  meta: string;
  cwd: string;
}

export type CompileFunction = (
  source: string,
  options: LangOptions & SnippetOptions
) => Promise<LangResult>;

export interface OutputFile {
  name: string;
  title?: string;
  lang?: string;
  meta?: string;
}

export interface LangOptions {
  /**
   * Markdown language code identifier in the markdown fenced regions.
   */
  lang: string;
  /**
   * Required string in meta to filter snippets within a language
   */
  meta?: string;
  /**
   * Prefix all sources with this string (if not present)
   */
  prefix?: string;
  /**
   * Replace language with the `prism` language for syntax coloring
   * after processing. Set to 'null' to remove code.
   */
  inputLang?: string | null;
  /**
   * Version of the tool, used when hashing pre-compiled solution
   */
  version?: string;
  /**
   * Tool timeout in milliseconds
   */
  timeout?: number;
  /**
   * Output markdown language code identifier, default `code`. Set to `null` to hide standard output.
   */
  outputLang?: string | null;
  /**
   * Error markdown language code identifier, default `console`. Set to `null` to hide standard output.
   */
  errorLang?: string;
  /**
   * Output meta, default empty.
   */
  outputMeta?: string;
  /**
   * Error meta, default empty.
   */
  errorMeta?: string;
  /**
   * Do not fail build when tools return errors
   */
  ignoreErrors?: boolean;
  /**
   * minimatch filter to exclude files from generation
   */
  excludedFiles?: string[];
  /**
   * Sets of files that should be included in the final output
   */
  outputFiles?: OutputFile[];
  /**
   * Optional hash files to consider when computing the hash of the source
   */
  hashFiles?: string[];
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
  /**
   * Additional files to write in the folder before running tool
   */
  inputFiles?: Record<string, string | object>;
}

/**
 * A tool that runs in puppeteer
 */
export interface PuppeteerLangOptions extends LangOptions {
  /**
   * File path to the HTML driver
   */
  html?: string;
  /**
   * Generates the HTML that will drive puppeteer
   * @param options
   * @returns
   */
  createDriverHtml?: (options: PuppeteerLangOptions) => string;
  /**
   * Creates a message that will make the driver do a compilation request
   * @param msg
   * @returns
   */
  createCompileRequest?: (msg: {
    id: string;
    source: string;
    options: LangOptions & SnippetOptions;
  }) => object;
  /**
   * Give a received message from puppeteer, convert to a render rest if any
   * @param msg
   * @returns
   */
  resolveCompileResponse?: (msg: object) => {
    id: string;
  } & LangResult;
}

export interface CustomLangOptions extends LangOptions {
  /**
   * Custom function that compiles the source and returns a result object
   */
  compile?: CompileFunction;
}

export type PluginOptions = {
  /**
   * List of compilers
   */
  langs: (ToolLangOptions | CustomLangOptions | PuppeteerLangOptions)[];

  /**
   * Use cache folder, default is true.
   */
  cache?: boolean;

  /**
   * Stop compiling after first failed snippet
   */
  failFast?: boolean;
};
