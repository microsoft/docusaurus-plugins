import type { PluginOptions as ApplicationInsightsOptions } from '@microsoft/docusaurus-plugin-application-insights';
import type { PluginOptions as CompileCodePluginOptions } from '@microsoft/docusaurus-remark-plugin-compile-code';
import type { PluginOptions as CodeTabsPluginOptions } from '@microsoft/docusaurus-remark-plugin-code-tabs';
import type { PluginOptions as CodeElementPluginOptions } from '@microsoft/docusaurus-remark-plugin-code-element';
import type { PluginOptions as SideEditorRemarkPluginOptions } from '@microsoft/docusaurus-remark-plugin-side-editor';
import type { SideEditorThemeConfig } from '@microsoft/docusaurus-theme-side-editor';
import type { CodeSandboxButtonThemeConfig } from '@microsoft/docusaurus-theme-codesandbox-button';
import type { PluginOptions as ImportFilePluginOptions } from '@microsoft/docusaurus-remark-plugin-import-file';

export interface AlgoliaOptions {
  /**
   * The application ID provided by Algolia
   */
  appId: string;
  /**
   * Public API key: it is safe to commit it
   */
  apiKey: string;
  /**
   * Index name provided by algolia
   */
  indexName: string;
}

export type PluginOptions = {
  /**
   * Disable injecting Microsoft legal links
   */
  legal?: false;

  /**
   * Application Insights configuration to enable analytics
   */
  appInsights?: ApplicationInsightsOptions;

  /**
   * Precompiled snippets configuration
   */
  compileCode?: CompileCodePluginOptions;

  /**
   * Set as false to disable injecting `npm2yarn` plugin
   */
  npm2yarn?: false;
  /**
   * Set as false to disable injecting `math`, `katex` plugins
   */
  math?: false;
  /**
   * Set as false to disable code tabs
   */
  codeTabs?: false | CodeTabsPluginOptions;
  /**
   * Sets as false to disable mermaid diagrams. Set as mermaid configuration for customizations.
   */
  mermaid?: false | object;

  /**
   * Sets as false to disable CodeSandbox button theme.
   */
  codeSandbox?: false | CodeSandboxButtonThemeConfig;

  /**
   * Sets the side editor options
   */
  sideEditor?: SideEditorRemarkPluginOptions & SideEditorThemeConfig;

  /**
   * Configure code to MDX plugin
   */
  codeElement?: CodeElementPluginOptions;

  /**
   * Limited Algolia options
   */
  algolia?: AlgoliaOptions;

  /**
   * Set to false to disable button
   */
  githubButton?: false;

  /**
   * Set to false to disable partial imports
   */
  importFile?: false | ImportFilePluginOptions;
};

export type Options = Partial<PluginOptions>;
