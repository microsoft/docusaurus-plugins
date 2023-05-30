import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import type { ClientModule } from '@docusaurus/types';

let appInsights: ApplicationInsights;

if (typeof window !== 'undefined') {
  const pluginConfig = (window as any).appInsightsPluginConfig;

  if (pluginConfig) {
    if (pluginConfig.enableClickAnalytics) {
      const clickPluginInstance = new ClickAnalyticsPlugin();

      pluginConfig.config = {
        ...pluginConfig.config,
        extensions: [clickPluginInstance],
        extensionConfig: {
          [clickPluginInstance.identifier]: {
            autoCapture: true,
            dataTags: {
              useDefaultContentNameOrId: true,
            },
            urlCollectQuery: true,
          },
        },
      };
    }

    appInsights = new ApplicationInsights({
      config: pluginConfig.config,
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
  }
}

const clientModule: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (
      previousLocation &&
      (location.pathname !== previousLocation.pathname ||
        location.search !== previousLocation.search ||
        location.hash !== previousLocation.hash)
    ) {
      // don't log hash, leave for client side data
      appInsights?.trackPageView({
        name: location.pathname + location.search,
      });
    }
  },
};

export default clientModule;
