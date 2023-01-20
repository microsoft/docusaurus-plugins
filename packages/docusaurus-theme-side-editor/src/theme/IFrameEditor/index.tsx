import React, { useRef, useEffect, useId } from "react";
import type { Props } from "@theme/IFrameEditor";
import styles from "./styles.module.css";
import clsx from "clsx";
import useIsBrowser from "@docusaurus/useIsBrowser";

export default function IFrameEditor(props: Props) {
    const { config, source = {} } = props;
    const { text } = source;
    const {
        lightUrl,
        darkUrl,
        message = {},
        className,
        textFieldName = "text",
        messageIdFieldName = "mid",
        allow = "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; usb; xr-spatial-tracking; serial; bluetooth",
        sandbox = "allow-forms allow-scripts allow-downloads allow-modals allow-popups allow-presentation allow-same-origin allow-scripts",
    } = config;
    const isBrowser = useIsBrowser();
    const colorMode = isBrowser
        ? (document.firstElementChild as any).dataset.theme
        : "dark";

    const url = colorMode === "dark" ? darkUrl : lightUrl;
    const frameId = useId();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const postSource = () => {
        const iframe = iframeRef.current;
        const editorWindow = iframe?.contentWindow;
        if (!editorWindow) return;

        const id = Math.random() + "";
        const msg = {
            ...message,
            [messageIdFieldName]: id,
            [textFieldName]: text,
        };
        editorWindow.postMessage(msg, "*");
    };

    // when source changes
    useEffect(() => postSource(), [url, source]);

    return (
        <iframe
            id={frameId}
            ref={iframeRef}
            className={clsx(styles.iframeEditor, className)}
            allow={allow}
            sandbox={sandbox}
            src={url}
        />
    );
}
