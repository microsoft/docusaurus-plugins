import type { Config, ThemeConfig } from "@docusaurus/types";
import type { PluginOptions, Options } from "./options";
import appInsightPlugin from "docusaurus-plugin-application-insights";
import npm2yarnPlugin from "@docusaurus/remark-plugin-npm2yarn";
import compileCodePlugin from "docusaurus-remark-plugin-compile-code";

const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;
const releaseTag = process.env.RELEASE_VERSION;

export type { PluginOptions, Options };

/**
 * Injects rise4fun specific configurations
 * @param configuration
 * @returns
 */
export function configure(
    configuration: Config,
    options: PluginOptions = {}
): Config {
    const { appInsights, compileCode } = options;

    // injecting legal terms
    const themeConfig: ThemeConfig =
        configuration.themeConfig || (configuration.themeConfig = {});
    const footer: any = themeConfig.footer || (themeConfig.footer = {});
    const links = footer.links || (footer.links = []);
    links.push({
        title: "Legal",
        items: [
            {
                label: "Privacy & Cookies",
                href: "https://go.microsoft.com/fwlink/?LinkId=521839",
            },
            {
                label: "Terms of Use",
                href: "https://www.microsoft.com/en-us/legal/intellectualproperty/copyright",
            },
            {
                label: "Trademarks",
                href: "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general",
            },
        ],
    });

    // github versioning
    let link = "";
    if (repo && releaseTag)
        link = `<a href=https://github.com/${repo}/releases/tag/${releaseTag} target="_blank" rel="noopener noreferrer">version: ${releaseTag}</a> | `;
    else if (repo && sha) {
        link = `<a href=https://github.com/${repo}/commit/${sha} target="_blank" rel="noopener noreferrer">${sha.slice(
            0,
            8
        )}</a> | `;
    }

    // patch copyrigth
    footer.copyright = `${link}Copyright © ${new Date().getFullYear()} Microsoft Corporation.`;

    const plugins = configuration.plugins || (configuration.plugins = []);
    const presets = configuration.presets || (configuration.presets = []);

    // inject app insights
    if (appInsights)
        injectPlugin(appInsightPlugin, {
            disableCookiesUsage: true,
            ...appInsights,
        });

    // inject remark plugins
    injectRemarkPlugin(npm2yarnPlugin, { sync: true });
    if (compileCode) injectRemarkPlugin(compileCodePlugin, compileCode);

    console.log(configuration);
    return configuration;

    function injectPlugin(plugin: any, object: object) {
        plugins.push([plugin, options.appInsights]);
    }

    function injectRemarkPlugin(remarkPlugin: any, options: object) {
        const entry = [remarkPlugin, options];
        plugins
            .map((plugin: any) => plugin.remarkPlugins)
            .filter((rps) => !!rps)
            .push(entry);
        presets
            .filter((preset) => Array.isArray(preset))
            .map((preset: any) => preset[1])
            .filter((config) => !!config)
            .forEach((config) => {
                config.remarkPlugins?.push(entry);
                pushRemarkPlugin(config.docs, entry);
                pushRemarkPlugin(config.blog, entry);
                pushRemarkPlugin(config.pages, entry);
            });
    }

    function pushRemarkPlugin(node: any, entry: any) {
        if (!node) return;
        const ps = node.remarkPlugins || (node.remarkPlugins = []);
        ps.push(entry);
    }
}
