import React, { useRef, useEffect, useId } from "react";
import type { Props } from "@theme/IFrameEditor";

export default function IFrameEditor(props: Props) {
    const {
        url,
        className,
        allow = "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; serial; bluetooth",
        sandbox = "allow-forms allow-scripts allow-downloads allow-modals allow-popups allow-presentation allow-same-origin allow-scripts",
        text = "",
    } = props;

    const uri = new URL(url);
    const targetOrigin = uri.origin;
    const frameId = useId();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const postSource = (force: boolean) => {
        const iframe = iframeRef.current;
        const parent = iframe?.contentWindow;
        if (!parent) return;

        const id = Math.random() + "";
        const msg = {
            id,
            source: "rise4fun",
            type: "source",
            text,
        };
        parent.postMessage(msg, targetOrigin);
    };

    // when source changes
    useEffect(() => postSource(true), [url, text]);

    return (
        <iframe
            ref={iframeRef}
            id={frameId}
            className={className}
            allow={allow}
            sandbox={sandbox}
            src={url}
        />
    );
}
