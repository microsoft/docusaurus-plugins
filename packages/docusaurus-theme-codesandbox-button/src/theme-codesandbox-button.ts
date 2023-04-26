/// <reference types="@docusaurus/module-type-aliases" />

declare module '@rise4fun/docusaurus-theme-codesandbox-button' {
  export interface CodeSandboxFileOptions {
    content: string | object;
  }
  export interface CodeSandboxOptions {
    files: Record<string, CodeSandboxFileOptions>;
  }
  export interface CodeSandboxButtonThemeConfig {
    templates?: Record<string, CodeSandboxOptions>;
    defaultTemplate?: string;
  }
  export interface ThemeConfig {
    codeSandbox?: CodeSandboxButtonThemeConfig;
  }
  export default function themeCodeSandboxButton(): object;
}

declare module '@theme/CodeSandboxButton' {
  export interface Props {
    className?: string;
    files: Record<string, string>;
    startFile?: string;
    label?: string;
    template?: string;
  }

  export default function CodeSandboxButton(props: Props): JSX.Element;
}
