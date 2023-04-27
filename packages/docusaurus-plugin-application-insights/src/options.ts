import { IConfiguration } from '@microsoft/applicationinsights-core-js';

export type ApplicationInsightsOptions = IConfiguration;

export type PluginOptions = Partial<ApplicationInsightsOptions>;
