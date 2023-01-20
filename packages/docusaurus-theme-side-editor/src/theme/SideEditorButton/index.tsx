import React, { useContext } from "react";
import type { Props } from "@theme/SideEditorButton";
import SideEditorContext from "../../client/SideEditorContext";

export default function SideEditorButton(props: Props) {
    const {
        className,
        editorId,
        text,
        label = "Edit",
        title = "Load code in side editor",
    } = props;
    const { setSource } = useContext(SideEditorContext);

    const handleClick = () => {
        setSource(editorId, text);
    };

    return (
        <button
            type="button"
            title={title}
            className={className || "button button--primary"}
            onClick={handleClick}
        >
            {label}
        </button>
    );
}
