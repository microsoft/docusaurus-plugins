import React, { useState } from "react";
import type { Props } from "@theme/CodeSandboxButton";

export default function CodeSandboxButton(props: Props) {
    const { className, files, startFile, label = "CodeSandbox" } = props;
    const [error, setError] = useState<string | undefined>();
    const [importing, setImporting] = useState(false);

    const handleClick = async () => {
        const f = files;
        const body = JSON.stringify({
            files: f,
        });
        try {
            setError(undefined);
            setImporting(true);
            const x = await fetch(
                "https://codesandbox.io/api/v1/sandboxes/define?json=1",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body,
                }
            );
            if (!x.ok) throw new Error("codesandbox.io api call failed");
            const data = await x.json();
            const { sandbox_id } = data;
            if (sandbox_id === undefined)
                throw new Error("failed to create new sandbox");
            let url = `https://codesandbox.io/s/${data.sandbox_id}?`;
            if (startFile) url += `file=/${encodeURIComponent(startFile)}`;
            window.open(url, "_blank", "noreferrer");
        } catch (error: any) {
            console.error(error);
            setError(error?.message || error + "");
        } finally {
            setImporting(false);
        }
    };

    return (
        <button
            type="button"
            aria-label="Open code in CodeSandbox"
            title={error || "Open in CodeSandbox"}
            className={className || "button button--primary"}
            onClick={handleClick}
            disabled={importing}
        >
            {label}
            {error && `!!!`}
        </button>
    );
}
