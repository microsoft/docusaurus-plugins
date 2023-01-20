import React, { useContext } from "react";
import type { Props } from "@theme/SideEditorButton";
import useSideEditorContext from "../../client/SideEditorContext";

export default function SideEditorButton(props: Props) {
    const {
        className,
        editorId,
        text,
        label = "Edit",
        title = "Load code in side editor",
    } = props;
    const { setSource } = useSideEditorContext();

    const handleClick = () => {
        console.log("setsource", { setSource, editorId, text });
        setSource(editorId, text);
    };

    console.log("sidebutton", { setSource });
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
