import type { ApplicationInsightsOptions } from "docusaurus-plugin-application-insights";
import type { PluginOptions as CompileCodePluginOptions } from "docusaurus-remark-plugin-compile-code";
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
};

export type Options = Partial<PluginOptions>;
