import { deprecate } from 'node:util';
import { Joi } from '@docusaurus/utils-validation';
import type { OptionValidationContext } from '@docusaurus/types';
import { Snippet } from '@microsoft/applicationinsights-web';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ApplicationInsightsConfig = Prettify<Snippet['config']>;

export type PluginOptions = {
  config: ApplicationInsightsConfig;
  enableClickAnalytics: boolean;
};

export type Options = {
  config: ApplicationInsightsConfig;
  enableClickAnalytics?: boolean;
};

export const DEPRECATED_CONFIG_MESSAGE = `You passed the Application Insights configuration using the legacy configuration structure. Please use the new configuration structure in the future.

Example:

{
  config: <Application Insights Configuration object>,
  enableClickAnalytics: <boolean>
}`;

export function normalizeConfig(
  maybeLegacyOptions: ApplicationInsightsConfig | PluginOptions
): PluginOptions {
  // If we have a `config` property, we're using the new configuration API
  if ('config' in maybeLegacyOptions) {
    return maybeLegacyOptions;
  }

  let options: PluginOptions;

  // If we don't have a `config` property, we're using the legacy configuration API, so we normalize it
  const deprecateConfig = deprecate(() => {
    options = {
      config: maybeLegacyOptions as ApplicationInsightsConfig,
      enableClickAnalytics: false,
    };
  }, DEPRECATED_CONFIG_MESSAGE);

  deprecateConfig();

  return options!;
}

const pluginOptionsSchema = Joi.object<PluginOptions>({
  config: Joi.object({
    instrumentationKey: Joi.string().empty(''),
    connectionString: Joi.string().empty(''),
    diagnosticLogInterval: Joi.number().optional(),
    maxMessageLimit: Joi.number().optional(),
    loggingLevelConsole: Joi.number().optional(),
    loggingLevelTelemetry: Joi.number().optional(),
    enableDebug: Joi.boolean().optional(),
    enableDebugExceptions: Joi.boolean().optional(),
    endpointUrl: Joi.string().optional(),
    extensionConfig: Joi.object().optional(),
    extensions: Joi.array().items(Joi.object()).optional(),
    channels: Joi.array().items(Joi.array().items(Joi.object())).optional(),
    disableInstrumentationKeyValidation: Joi.boolean().optional(),
    enablePerfMgr: Joi.boolean().optional(),
    createPerfMgr: Joi.func().optional(),
    perfEvtsSendAll: Joi.boolean().optional(),
    idLength: Joi.number().optional(),
    cookieDomain: Joi.string().optional(),
    cookiePath: Joi.string().optional(),
    disableCookiesUsage: Joi.boolean().optional(),
    cookieCfg: Joi.object().optional(),
    disablePageUnloadEvents: Joi.array().items(Joi.string()).optional(),
    disablePageShowEvents: Joi.array().items(Joi.string()).optional(),
    disableDbgExt: Joi.boolean().optional(),
    emitLineDelimitedJson: Joi.boolean().optional(),
    accountId: Joi.string().optional(),
    sessionRenewalMs: Joi.number().optional(),
    sessionExpirationMs: Joi.number().optional(),
    maxBatchSizeInBytes: Joi.number().optional(),
    maxBatchInterval: Joi.number().optional(),
    disableExceptionTracking: Joi.boolean().optional(),
    disableTelemetry: Joi.boolean().optional(),
    samplingPercentage: Joi.number().optional(),
    autoTrackPageVisitTime: Joi.boolean().optional(),
    enableAutoRouteTracking: Joi.boolean().optional(),
    disableAjaxTracking: Joi.boolean().optional(),
    disableFetchTracking: Joi.boolean().optional(),
    excludeRequestFromAutoTrackingPatterns: Joi.array()
      .items(Joi.alternatives().try(Joi.string(), Joi.object().instance(RegExp)))
      .optional(),
    addRequestContext: Joi.func().optional(),
    overridePageViewDuration: Joi.boolean().optional(),
    maxAjaxCallsPerView: Joi.number().optional(),
    disableDataLossAnalysis: Joi.boolean().optional(),
    disableCorrelationHeaders: Joi.boolean().optional(),
    distributedTracingMode: Joi.string().optional(),
    correlationHeaderExcludedDomains: Joi.array().items(Joi.string()).optional(),
    disableFlushOnBeforeUnload: Joi.boolean().optional(),
    disableFlushOnUnload: Joi.boolean().optional(),
    enableSessionStorageBuffer: Joi.boolean().optional(),
    bufferOverride: Joi.object().optional(),
    isCookieUseDisabled: Joi.boolean().optional(),
    isRetryDisabled: Joi.boolean().optional(),
    url: Joi.string().optional(),
    isStorageUseDisabled: Joi.boolean().optional(),
    isBeaconApiDisabled: Joi.boolean().optional(),
    disableXhr: Joi.boolean().optional(),
    onunloadDisableFetch: Joi.boolean().optional(),
    sdkExtension: Joi.string().optional(),
    isBrowserLinkTrackingEnabled: Joi.boolean().optional(),
    appId: Joi.string().optional(),
    enableCorsCorrelation: Joi.boolean().optional(),
    namePrefix: Joi.string().optional(),
    sessionCookiePostfix: Joi.string().optional(),
    userCookiePostfix: Joi.string().optional(),
    enableRequestHeaderTracking: Joi.boolean().optional(),
    enableResponseHeaderTracking: Joi.boolean().optional(),
    enableAjaxErrorStatusText: Joi.boolean().optional(),
    enableAjaxPerfTracking: Joi.boolean().optional(),
    maxAjaxPerfLookupAttempts: Joi.number().optional(),
    ajaxPerfLookupDelay: Joi.number().optional(),
    onunloadDisableBeacon: Joi.boolean().optional(),
    autoExceptionInstrumented: Joi.boolean().optional(),
    correlationHeaderDomains: Joi.array().items(Joi.string()).optional(),
    autoUnhandledPromiseInstrumented: Joi.boolean().optional(),
    enableUnhandledPromiseRejectionTracking: Joi.boolean().optional(),
    correlationHeaderExcludePatterns: Joi.array().items(Joi.object().instance(RegExp)).optional(),
    customHeaders: Joi.array()
      .items(
        Joi.object({
          header: Joi.string().required(),
          value: Joi.string().required(),
        })
      )
      .optional(),
    convertUndefined: Joi.any().optional(),
    eventsLimitInMem: Joi.number().optional(),
    disableIkeyDeprecationMessage: Joi.boolean().optional(),
    addIntEndpoints: Joi.boolean().optional(),
  })
    .required()
    .xor('instrumentationKey', 'connectionString'),

  enableClickAnalytics: Joi.boolean().optional(),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}
