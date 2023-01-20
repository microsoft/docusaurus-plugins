import React, { useState } from "react";
import type { Props } from "@theme/SideEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function SideEditor(props: Props) {
    const autoSaveId = "@rise4fun/sideeditor";
    return (
        <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
            <Panel></Panel>
            <PanelResizeHandle />
            <Panel collapsible={true}></Panel>
        </PanelGroup>
    );
}
