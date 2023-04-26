import type { Plugin } from '@docusaurus/types';
import type { ThemeConfig, SideEditorThemeConfig } from '@rise4fun/docusaurus-theme-side-editor';
import validatePeerDependencies from 'validate-peer-dependencies';

validatePeerDependencies(__dirname);

export default function themeSideEditor(): Plugin<void> {
  return {
    name: '@rise4fun/docusaurus-theme-side-editor',

    getThemePath() {
      return '../lib/theme';
    },
    getTypeScriptThemePath() {
      return '../src/theme';
    },
  };
}

export function getSwizzleComponentList() {
  return undefined;
}

export { ThemeConfig, SideEditorThemeConfig };
