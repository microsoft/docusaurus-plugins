import type { Plugin } from '@docusaurus/types';
import type { ThemeConfig, SideEditorThemeConfig } from '@microsoft/docusaurus-theme-side-editor';
import validatePeerDependencies from 'validate-peer-dependencies';

validatePeerDependencies(__dirname);

export default function themeSideEditor(): Plugin<void> {
  return {
    name: '@microsoft/docusaurus-theme-side-editor',

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
