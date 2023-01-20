import React, { createElement, useContext, useMemo } from "react";
import type { Props } from "@theme/SideEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideEditorContext from "../../client/SideEditorContext";
import useSideEditorConfig from "../../client/useSideEditorConfig";
import IFrameEditor from "@theme/IFrameEditor";

export default function SideEditor(props: Props) {
    const { children } = props;
    const { persistenceId = "@rise4fun/sideEditor" } = useSideEditorConfig();
    const { source } = useContext(SideEditorContext);
    const { editorId, text, config } = source || {};
    const autoSaveId = `${persistenceId}/panels`;

    // no split
    if (!editorId || !config) return children;

    const { type, ...configRest } = config;
    // split enabled
    const elementType: ((props: any) => JSX.Element) | undefined =
        useMemo(() => {
            switch (type) {
                case "iframe":
                    return IFrameEditor;
                default:
                    return undefined;
            }
        }, [type]);

    if (!elementType) return children;

    const editorProps = { ...configRest, text };
    return (
        <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
            <Panel>{children}</Panel>
            <PanelResizeHandle />
            <Panel collapsible={true}>
                {createElement(elementType, editorProps)}
            </Panel>
        </PanelGroup>
    );
}
