import type { ApplicationInsightsOptions } from "@rise4fun/docusaurus-plugin-application-insights";
import type { PluginOptions as CompileCodePluginOptions } from "@rise4fun/docusaurus-remark-plugin-compile-code";
export type PluginOptions = {
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
     * Sets as false to disable injecting `math`, `katex` plugins
     */
    math?: boolean;
    /**
     * Sets as false to disable mermaid diagrams. Set as mermaid configuration for customizations.
     */
    mermaid?: boolean | object;
};

export type Options = Partial<PluginOptions>;
