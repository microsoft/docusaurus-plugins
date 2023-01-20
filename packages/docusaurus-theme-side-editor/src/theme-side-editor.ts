/// <reference types="@docusaurus/module-type-aliases" />

declare module "@rise4fun/docusaurus-theme-side-editor" {
    export type ThemeConfig = {};
    export type UserThemeConfig = {};

    export default function themeSideEditor(): object;
}

declare module "@theme/SideEditor" {
    export interface Props {
    }

    export default function SideEditor(props: Props): JSX.Element;
}
