import React, { useContext, useState } from "react";
import type { Props } from "@theme/SideEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideEditorContext from "../../client/SideEditorContext";
import useSideEditorConfig from "../../client/useSideEditorConfig";

export default function SideEditor(props: Props) {
    const { children } = props;
    const { persistenceId = "@rise4fun/sideEditor" } = useSideEditorConfig();
    const { source } = useContext(SideEditorContext);
    const { editorId, text, config } = source || {};
    const autoSaveId = `${persistenceId}/panels`;

    // no split
    if (!editorId) return children;

    // split enabled
    return (
        <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
            <Panel>{children}</Panel>
            <PanelResizeHandle />
            <Panel collapsible={true}></Panel>
        </PanelGroup>
    );
}
