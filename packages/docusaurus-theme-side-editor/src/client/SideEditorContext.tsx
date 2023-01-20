import SideEditor from "@theme/SideEditor";
import React, { createContext, ReactNode, useState } from "react";

export interface SideEditorSource {
    editorId: string;
    text: string;
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

    const [source, setSource_] = useState<SideEditorSource | undefined>();
    const setSource = (editorId: string, text: string) => {
        if (!editorId) setSource_(undefined);
        else setSource_({ editorId, text });
    };
    return (
        <SideEditorContext.Provider value={{ setSource, source }}>
            {source !== undefined ? <SideEditor {...props} /> : <>{children}</>}
        </SideEditorContext.Provider>
    );
}
