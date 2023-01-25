import React, { lazy, Suspense } from "react";

export default function Dot(props: {
    lang: string;
    meta: object;
    value: string;
}) {
    const { value } = props;
    return <pre>{value}</pre>;
}
