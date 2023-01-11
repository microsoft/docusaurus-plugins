import { ApplicationInsightsOptions } from "docusaurus-plugin-application-insights";
export type PluginOptions = {
    appInsights?: ApplicationInsightsOptions;
};

export type Options = Partial<PluginOptions>;
