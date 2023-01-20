/// <reference types="@docusaurus/module-type-aliases" />

declare module "@rise4fun/docusaurus-theme-side-editor" {
    export type ThemeConfig = {
        sideEditor: SideEditorThemeConfig;
    };
    export interface SideEditorThemeConfig {
        editors: IFrameEditorConfig[];
        persistenceId?: string;
    }
    export interface SideEditorConfig {
        id: string;
        type: string;
    }
    export interface IFrameEditorConfig extends SideEditorConfig {
        url: string;
        type: "iframe";
        className?: string;
        allow?: string;
        sandbox?: string;

        message?: object;
        messageIdFieldName?: string;
        textFieldName?: string;
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
    import type { IFrameEditorConfig } from "@rise4fun/docusaurus-theme-side-editor";
    export interface Props {
        text: string;
        config: IFrameEditorConfig;
    }

    export default function IFrameEditor(props: Props): JSX.Element;
}

declare module "@theme/SideEditorButton" {
    export interface Props {
        editorId: string;
        text: string;
        className?: string;
        title?: string;
        label?: string;
    }

    export default function SideEditorButton(props: Props): JSX.Element;
}

declare module "@theme/Root" {
    export default function SideEditorButton(props: any): JSX.Element;
}
