import { createHash } from "crypto";
import { LangOptions } from "./options";

export default function hashCode(
    source: string,
    meta: string,
    options: LangOptions
) {
    const { lang, version, timeout } = options;
    const hash = createHash("sha1");

    // TODO: add rise4fun engine version to the hash
    return hash
        .update(source)
        .update(meta)
        .update(lang)
        .update(version || "0.0.0")
        .update(String(timeout))
        .digest("hex");
}
