import React, { useContext, useState } from "react";
import type { Props } from "@theme/SideEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideEditorContext from "../../client/SideEditorContext";

export default function SideEditor(props: Props) {
    const { children } = props;
    const { source } = useContext(SideEditorContext);
    // todo: config
    const autoSaveId = "@rise4fun/sideeditor";

    return (
        <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
            <Panel>{children}</Panel>
            <PanelResizeHandle />
            <Panel collapsible={true}></Panel>
        </PanelGroup>
    );
}
