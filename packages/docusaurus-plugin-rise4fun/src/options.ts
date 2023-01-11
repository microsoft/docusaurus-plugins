import type { ApplicationInsightsOptions } from "docusaurus-plugin-application-insights";
import type { PluginOptions as CompileCodePluginOptions } from "docusaurus-remark-plugin-compile-code";
export type PluginOptions = {
    appInsights?: ApplicationInsightsOptions;
    compileCode?: CompileCodePluginOptions;
};

export type Options = Partial<PluginOptions>;
