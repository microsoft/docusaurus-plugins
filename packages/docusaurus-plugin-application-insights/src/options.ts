export type ApplicationInsightsOptions = {
  instrumentationKey: string;
  connectionString: string;
};

export type PluginOptions = Partial<ApplicationInsightsOptions>;
