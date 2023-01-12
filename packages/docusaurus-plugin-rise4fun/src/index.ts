import type { Config, ThemeConfig } from "@docusaurus/types";
import type { PluginOptions, Options } from "./options";
import appInsightPlugin from "docusaurus-plugin-application-insights";
import npm2yarnPlugin from "@docusaurus/remark-plugin-npm2yarn";
import compileCodePlugin from "docusaurus-remark-plugin-compile-code";
const mathPlugin = require("remark-math");
const katexPlugin = require("rehype-katex");

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
    const { appInsights, compileCode, math, npm2yarn, mermaid } = options;

    // injecting legal terms
    const themeConfig: ThemeConfig =
        configuration.themeConfig || (configuration.themeConfig = {});
    const stylesheets =
        configuration.stylesheets || (configuration.stylesheets = []);
    const markdown = configuration.markdown || (configuration.markdown = {});
    const themes = configuration.themes || (configuration.themes = []);
    const footer: any = themeConfig.footer || (themeConfig.footer = {});

    if (!themeConfig.organizationName)
        themeConfig.organizationName = "Microsoft";
    if (!themeConfig.url) themeConfig.url = "https://microsoft.github.io";
    if (!themeConfig.baseUrl)
        themeConfig.baseUrl = "/" + themeConfig.projectName;
    if (!themeConfig.i18n)
        themeConfig.i18n = {
            defaultLocale: "en",
            locales: ["en"],
        };
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

    //  npm2yarn
    if (npm2yarn !== false) injectRemarkPlugin(npm2yarnPlugin, { sync: true }); // npm/yarn

    // math
    if (math !== false) {
        injectRemarkPlugin(mathPlugin); // math
        injectRehypePlugin(katexPlugin, { strict: true });
        injectStylesheet({
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        });
    }

    // mermaid
    if (mermaid !== false) {
        injectTheme("@docusaurus/theme-mermaid");
        markdown.mermaid = true;
        if (typeof mermaid === "object")
            themeConfig.mermaid = mermaid
    }

    if (compileCode) injectRemarkPlugin(compileCodePlugin, compileCode);

    console.log(configuration);
    return configuration;

    function injectStylesheet(sheet: {
        href: string;
        type: "text/css";
        integrity?: string;
        crossorigin?: string;
    }) {
        stylesheets.push(sheet);
    }

    function injectTheme(theme: any, options?: object) {
        themes.push(options ? [theme, options] : theme);
    }

    function injectPlugin(plugin: any, options?: object) {
        plugins.push(options ? [plugin, options] : plugin);
    }

    function injectRemarkPlugin(remarkPlugin: any, options?: object) {
        const entry = options ? [remarkPlugin, options] : remarkPlugin;
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

    function injectRehypePlugin(rehypePlugin: any, options?: object) {
        const entry = options ? [rehypePlugin, options] : rehypePlugin;
        plugins
            .map((plugin: any) => plugin.rehypePlugins)
            .filter((rps) => !!rps)
            .push(entry);
        presets
            .filter((preset) => Array.isArray(preset))
            .map((preset: any) => preset[1])
            .filter((config) => !!config)
            .forEach((config) => {
                config.rehypePlugins?.push(entry);
                pushRehypePlugin(config.docs, entry);
                pushRehypePlugin(config.blog, entry);
                pushRehypePlugin(config.pages, entry);
            });
    }

    function pushRehypePlugin(node: any, entry: any) {
        if (!node) return;
        const ps = node.rehypePlugins || (node.rehypePlugins = []);
        ps.push(entry);
    }
}
