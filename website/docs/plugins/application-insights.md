# Application Insights plugin

This plugin lets you track page views using [Microsoft Application Insights](https://www.npmjs.com/package/@microsoft/applicationinsights-web).

```sh
yarn add docusaurus-plugin-application-insights
```

```js
plugings: [
    ...,
    ["docusaurus-plugin-application-insights", {
        instrumentationKey: "YOUR INSTRUMENTATION KEY HERE"
    }]
]