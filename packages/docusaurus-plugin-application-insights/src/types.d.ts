/// <reference types="@docusaurus/module-type-aliases" />

interface Window {
  appInsights: {
    trackPageView(name: string): void;
  }
}
