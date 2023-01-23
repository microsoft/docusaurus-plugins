export interface CodeSandboxFileOptions {
    content: string | object;
}
export interface CodeSandboxOptions {
    files: Record<string, CodeSandboxFileOptions>;
}

export type PluginOptions = {
    /**
     * language code to title map
     */
    languages?: Record<string, string>;
    /**
     * Additional CodeSandbox definitions
     */
    codesandboxes?: Record<string, CodeSandboxOptions>;
};
