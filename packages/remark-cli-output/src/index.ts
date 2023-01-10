import visit from "unist-util-visit";
import { Transformer } from "unified";

interface Options {
  /**
   * Set if you want to throw on error, otherwise it logs to stderr
   */
  throwOnError?: boolean;
}

/**
 * Transforms ts and tsx code blocks into their JS counterparts for multi-code block automation
 * @param param options
 * @returns Transformer
 */
export default function plugin({ throwOnError }: Options = {}): Transformer {
  return async (root, file) => {
    visit(root, "root", (node) => {
      console.log(node);
    });
  };
}
