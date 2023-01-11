import type { ClientModule } from "@docusaurus/types";

const clientModule: ClientModule = {
    onRouteDidUpdate({ location, previousLocation }) {
        if (
            previousLocation &&
            (location.pathname !== previousLocation.pathname ||
                location.search !== previousLocation.search ||
                location.hash !== previousLocation.hash)
        ) {
            if (!window.appInsights)
                console.error(`window.appInsights not founsd`);
            else
                window.appInsights.trackPageView(
                    location.pathname + location.search + location.hash
                );
        }
    },
};

export default clientModule;
