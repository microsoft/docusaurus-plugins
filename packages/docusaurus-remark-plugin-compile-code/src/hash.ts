import { createHash } from "crypto";
import { LangOptions } from "./types";

export default function hashCode(
    source: string,
    meta: string,
    options: LangOptions
) {
    const hash = createHash("sha1");
    return hash
        .update(source)
        .update(meta)
        .update(JSON.stringify(options))
        .digest("hex");
}
