import React from "react";

export default function Cow(props: {
    lang: string;
    meta: object;
    value: string;
}) {
    const { value } = props;
    return <pre>cow says: {value}</pre>;
}
