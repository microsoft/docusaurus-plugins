import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import type { ClientModule } from '@docusaurus/types';

let appInsights: ApplicationInsights;
if (typeof window !== 'undefined') {
  const config = (window as any).appInsightsConfig;
  if (config) {
    appInsights = new ApplicationInsights({
      config,
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
