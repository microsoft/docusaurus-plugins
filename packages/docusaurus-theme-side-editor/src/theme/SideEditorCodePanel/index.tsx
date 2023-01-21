import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import useSideEditorContext from "../../client/SideEditorContext";
import useHtmlDataTheme from "../../client/useHtmlDataTheme";
import type { Props } from "@theme/SideEditorCodePanel";

export default function SideEditorCodePanel(props: Props) {
    const { className } = props;
    const { source } = useSideEditorContext();
    const { editorId, text, config } = source || {};
    const { language = "js" } = config || {};
    const colorMode = useHtmlDataTheme();
    const editorRef = useRef(null);
    const monaco = useMonaco();
    const theme = colorMode === "dark" ? "vs-dark" : "light";
    const [value, setValue] = useState(text || "");
    useEffect(() => {
        setValue(text || "");
    }, [editorId, source]);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
    };
    const handleEditorChange = (value: string | undefined) =>
        setValue(value || "");

    return (
        <Editor
            className={className}
            language={language}
            value={value}
            theme={theme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
        />
    );
}
