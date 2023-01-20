/// <reference types="@docusaurus/module-type-aliases" />

declare module "@rise4fun/docusaurus-theme-side-editor" {
    export type ThemeConfig = {
        sideEditor: SideEditorThemeConfig;
    };
    export interface SideEditorThemeConfig {
        editors: SideEditorConfig[];
        persistenceId?: string;
    }
    export interface SideEditorConfig {
        editorId: string;
    }

    export default function themeSideEditor(): object;
}

declare module "@theme/SideEditor" {
    export interface Props {
        children: React.ReactNode;
    }

    export default function SideEditor(props: Props): JSX.Element;
}

declare module "@theme/IFrameEditor" {
    export interface Props {
        url: string;
        className?: string;
        allow?: string;
        sandbox?: string;
    }

    export default function IFrameEditor(props: Props): JSX.Element;
}
