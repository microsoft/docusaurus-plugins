/// <reference types="@docusaurus/module-type-aliases" />

declare module "@docusaurus/theme-codesandbox-button" {
    export type ThemeConfig = {};
    export type UserThemeConfig = {};

    export default function themeCodeSandboxButton(): object;
}

declare module "@theme/CodeSandboxButton" {
    export interface Props {
        className?: string;
        files: Record<string, string>;
        startFile?: string;
        label?: string;
    }

    export default function CodeSandboxButton(props: Props): JSX.Element;
}
