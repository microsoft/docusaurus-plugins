import type { Plugin } from '@docusaurus/types';
import type {
  ThemeConfig,
  CodeSandboxButtonThemeConfig,
} from '@microsoft/docusaurus-theme-codesandbox-button';
import validatePeerDependencies from 'validate-peer-dependencies';

validatePeerDependencies(__dirname);

export default function themeCodeSandboxButton(): Plugin<void> {
  return {
    name: '@microsoft/docusaurus-theme-codesandbox-button',

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

export { ThemeConfig, CodeSandboxButtonThemeConfig };
