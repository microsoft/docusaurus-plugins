import { Joi } from '@docusaurus/utils-validation';
import type { LoadContext, Plugin, OptionValidationContext } from '@docusaurus/types';
import type { ApplicationInsightsOptions, PluginOptions } from './options';
import { resolve } from 'node:path';
import validatePeerDependencies from 'validate-peer-dependencies';

validatePeerDependencies(__dirname);

export default function pluginApplicationInsights(
  _context: LoadContext,
  options: ApplicationInsightsOptions
): Plugin {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    name: '@rise4fun/docusaurus-plugin-application-insights',

    getClientModules() {
      return isProd ? [resolve(__dirname, './analytics')] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `window.appInsightsConfig = ${JSON.stringify(options)};`,
          },
        ],
      };
    },
  };
}

const pluginOptionsSchema = Joi.object<ApplicationInsightsOptions>({
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
  extensions: Joi.array().optional(),
  channels: Joi.array().optional(),
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
}).xor('instrumentationKey', 'connectionString');

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<PluginOptions, ApplicationInsightsOptions>): ApplicationInsightsOptions {
  return validate(pluginOptionsSchema, options);
}

export type { ApplicationInsightsOptions, PluginOptions };
