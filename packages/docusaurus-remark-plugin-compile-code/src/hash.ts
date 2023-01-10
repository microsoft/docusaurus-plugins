import { createHash } from "crypto";
import { LangOptions } from "./options";

export default function hashCode(
    source: string,
    meta: string,
    options: LangOptions
) {
    const { lang, version, timeout, command, args, nodeBin } = options;
    const hash = createHash("sha1");

    // TODO: add rise4fun engine version to the hash
    return hash
        .update(source)
        .update(meta)
        .update(command || "cmd")
        .update(nodeBin || "nb")
        .update(args?.join(";") || "noargs")
        .update(lang)
        .update(version || "0.0.0")
        .update(String(timeout))
        .digest("hex");
}
