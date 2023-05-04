import type { LoadContext, Plugin } from '@docusaurus/types';
import { PluginOptions, Options, normalizeConfig } from './options';
import { resolve } from 'node:path';
import validatePeerDependencies from 'validate-peer-dependencies';

validatePeerDependencies(__dirname);

export default function pluginApplicationInsights(
  _context: LoadContext,
  options: PluginOptions
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

      options = normalizeConfig(options);

      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `window.appInsightsPluginConfig = ${JSON.stringify(options)};`,
          },
        ],
      };
    },
  };
}

export { validateOptions } from './options';

export type { PluginOptions, Options };
