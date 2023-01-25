import { parseDot } from "@msagl/parser";
import { LayoutOptions, Renderer } from "@msagl/renderer";
import React, { useEffect, useRef } from "react";

import styles from "./styles.module.css";

export default function Dot(props: {
    lang: string;
    meta: LayoutOptions;
    value: string;
}) {
    const { lang, meta, value } = props;
    const containerRef = useRef();
    const renderer = useRef<Renderer>();

    useEffect(() => {
        const container = containerRef.current;
        if (!renderer.current) renderer.current = new Renderer(container);
        const graph = parseDot(value);
        renderer.current.setGraph(graph, meta);
    }, [value, JSON.stringify(meta)]);

    return (
        <div
            data-lang={lang}
            className={styles.dotContainer}
            ref={containerRef}
        ></div>
    );
}
