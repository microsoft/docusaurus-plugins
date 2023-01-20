import React, { useRef, useEffect, useId } from "react";
import type { Props } from "@theme/IFrameEditor";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function IFrameEditor(props: Props) {
    const { config, text } = props;
    const {
        lightUrl,
        darkUrl,
        message = {},
        className,
        textFieldName = "text",
        messageIdFieldName = "mid",
        allow = "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; serial; bluetooth",
        sandbox = "allow-forms allow-scripts allow-downloads allow-modals allow-popups allow-presentation allow-same-origin allow-scripts",
    } = config;
    const colorMode = "dark";
    // TODO    const { colorMode } = useColorMode()

    const url = colorMode === "dark" ? darkUrl : lightUrl;
    const uri = new URL(url);
    const frameId = useId();
    const targetOrigin = uri.origin;
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
        console.log(`post message`, { msg, targetOrigin });
        editorWindow.postMessage(msg, targetOrigin);
    };

    // when source changes
    useEffect(() => postSource(), [url, text]);

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
