import { IConfiguration } from '@microsoft/applicationinsights-core-js';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ApplicationInsightsOptions = Prettify<IConfiguration>;

export type PluginOptions = Partial<ApplicationInsightsOptions>;
