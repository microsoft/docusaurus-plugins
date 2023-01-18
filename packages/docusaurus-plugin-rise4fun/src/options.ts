import type { ApplicationInsightsOptions } from "@rise4fun/docusaurus-plugin-application-insights";
import type { PluginOptions as CompileCodePluginOptions } from "@rise4fun/docusaurus-remark-plugin-compile-code";
import type { PluginOptions as CodeTabsPluginOptions } from "@rise4fun/docusaurus-remark-plugin-code-tabs";
export type PluginOptions = {
    /**
     * Inject Microsoft legal links
     */
    legal?: boolean;
    /**
     * Application Insights configuration to enable analytics
     */
    appInsights?: ApplicationInsightsOptions;
    compileCode?: CompileCodePluginOptions;
    /**
     * Set as false to disable injecting `npm2yarn` plugin
     */
    npm2yarn?: boolean;
    /**
     * Set as false to disable injecting `math`, `katex` plugins
     */
    math?: boolean;
    /**
     * Set as false to disable code tabs
     */
    codeTabs?: boolean | CodeTabsPluginOptions;
    /**
     * Sets as false to disable mermaid diagrams. Set as mermaid configuration for customizations.
     */
    mermaid?: boolean | object;
};

export type Options = Partial<PluginOptions>;
