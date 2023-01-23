import type { ApplicationInsightsOptions } from "@rise4fun/docusaurus-plugin-application-insights";
import type { PluginOptions as CompileCodePluginOptions } from "@rise4fun/docusaurus-remark-plugin-compile-code";
import type { PluginOptions as CodeTabsPluginOptions } from "@rise4fun/docusaurus-remark-plugin-code-tabs";
import type { PluginOptions as SideEditorRemarkPluginOptions } from "@rise4fun/docusaurus-remark-plugin-side-editor";
import type { SideEditorThemeConfig } from "@rise4fun/docusaurus-theme-side-editor";

export type PluginOptions = {
    /**
     * Disable injecting Microsoft legal links
     */
    legal?: false;
    /**
     * Application Insights configuration to enable analytics
     */
    appInsights?: ApplicationInsightsOptions;
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
    codeSandbox?: false | CodeTabsPluginOptions;

    /**
     * Sets the side editor options
     */
    sideEditor?: SideEditorRemarkPluginOptions & SideEditorThemeConfig;
};

export type Options = Partial<PluginOptions>;
