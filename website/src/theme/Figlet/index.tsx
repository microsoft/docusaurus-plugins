import React, { useEffect, useState } from "react";
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";

figlet.parseFont("Standard", standard);

export default function Cow(props: {
    lang: string;
    meta: object;
    value: string;
}) {
    const { value } = props;
    const [renderered, setRendered] = useState("");

    useEffect(() => {
        figlet.text(
            value,
            {
                font: "Standard",
            },
            function (err, data) {
                setRendered(err || data);
            }
        );
    }, [value]);

    return <pre>{renderered}</pre>;
}
