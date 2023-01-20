import React, { createElement, useContext, useMemo } from "react";
import type { Props } from "@theme/SideEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import useSideEditorContext from "../../client/SideEditorContext";
import useSideEditorConfig from "../../client/useSideEditorConfig";
import IFrameEditor from "@theme/IFrameEditor";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ResizeHandle from "./ResizeHandle";

export default function SideEditor(props: Props) {
    const { children } = props;
    const { persistenceId = "@rise4fun/sideEditor" } = useSideEditorConfig();
    const { source } = useSideEditorContext();
    const { editorId, config } = source || {};
    const autoSaveId = `${persistenceId}/panels`;

    // no split
    if (!editorId || !config) return children;

    const { type } = config;
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

    const editorProps = { config, source };
    return (
        <div style={{ height: "100vh" }}>
            <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
                <Panel>
                    <div style={{ overflow: "auto", height: "100%" }}>
                        {children}
                    </div>
                </Panel>
                <ResizeHandle />
                <Panel collapsible={true}>
                    <BrowserOnly>
                        {() => (
                            <div style={{ overflow: "auto", height: "100%" }}>
                                {createElement(elementType, editorProps)}
                            </div>
                        )}
                    </BrowserOnly>
                </Panel>
            </PanelGroup>
        </div>
    );
}
