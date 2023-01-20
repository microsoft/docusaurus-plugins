import React, {
    useState,
    useRef,
    useEffect,
    IframeHTMLAttributes,
    useId,
} from "react";
import type { Props } from "@theme/IFrameEditor";

export default function IFrameEditor(props: Props) {
    const {
        url,
        className,
        allow = "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; serial; bluetooth",
        sandbox = "allow-forms allow-scripts allow-downloads allow-modals allow-popups allow-presentation allow-same-origin allow-scripts",
    } = props;

    const frameId = useId();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const postSource = (force: boolean) => {
        const iframe = iframeRef.current;
        const parent = iframe?.contentWindow;
        if (!parent) return;

        const msg = {
            channel: "devicescript",
            type: "source",
            source,
            force,
            startMissingSimulators: true,
        };
        parent.postMessage(msg, "https://microsoft.github.io/jacdac-docs/");
    };

    // when source changes
    useEffect(() => postSource(true), [source, sourceId]);
    // when a frame goes live
    useEffect(() => {
        const iframe = iframeRef.current;
        const parent = iframe?.contentWindow;
        if (!parent) return;

        const handleMessage = (ev) => {
            const { data } = ev;
            if (data?.channel === "jacdac") {
                window.removeEventListener("message", handleMessage);
                postSource(false);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [source, url]);

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
