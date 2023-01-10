/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import visit from "unist-util-visit";
import type { Code, Content, Literal } from "mdast";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";

type PluginOptions = {
  sync?: boolean;
};

const plugin: Plugin<[PluginOptions?]> = (options = {}) => {
  const { sync = false } = options;
  return (root) => {
    let transformed = false as boolean;
    let alreadyImported = false as boolean;
    visit(root, (node: Node) => {});
  };
};

// To continue supporting `require('npm2yarn')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
