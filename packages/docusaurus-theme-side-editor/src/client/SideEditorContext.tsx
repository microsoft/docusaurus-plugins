import SideEditor from "@theme/SideEditor";
import React, { createContext, ReactNode, useState } from "react";
import type { SideEditorConfig } from "@rise4fun/docusaurus-theme-side-editor";
import useSideEditorConfig from "./useSideEditorConfig";

export interface SideEditorSource {
    editorId: string;
    text: string;
    config: SideEditorConfig;
}

export interface SideEditorProps {
    setSource: (editorId: string, text: string) => void;
    source?: SideEditorSource;
}

const SideEditorContext = createContext<SideEditorProps>({
    setSource: () => {},
});
SideEditorContext.displayName = "SideEditor";

export default SideEditorContext;

export function SplitEditorProvider(props: { children: ReactNode }) {
    const { children } = props;
    const { editors } = useSideEditorConfig();

    const [source, setSource_] = useState<SideEditorSource | undefined>();
    const setSource = (editorId: string, text: string) => {
        const editorConfig = editors.find(({ id }) => id === editorId);
        if (!editorConfig) setSource_(undefined);
        else {
            setSource_({ editorId, text, config: editorConfig });
        }
    };
    return (
        <SideEditorContext.Provider value={{ setSource, source }}>
            {source !== undefined ? <SideEditor {...props} /> : <>{children}</>}
        </SideEditorContext.Provider>
    );
}
