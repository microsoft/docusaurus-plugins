import type { Config, ThemeConfig } from "@docusaurus/types";
import type { PluginOptions, Options } from "./options";
import appInsightPlugin from "@rise4fun/docusaurus-plugin-application-insights";
import npm2yarnPlugin from "@docusaurus/remark-plugin-npm2yarn";
import compileCodePlugin from "@rise4fun/docusaurus-remark-plugin-compile-code";
import codeTabsPlugin from "@rise4fun/docusaurus-remark-plugin-code-tabs";

const mathPlugin = require("remark-math");
const katexPlugin = require("rehype-katex");

const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;

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
    const {
        appInsights,
        compileCode,
        math,
        npm2yarn,
        mermaid,
        legal,
        codeTabs,
        codeSandboxButton,
        sideEditor,
    } = options;

    // injecting legal terms
    const themeConfig: ThemeConfig =
        configuration.themeConfig || (configuration.themeConfig = {});
    const stylesheets =
        configuration.stylesheets || (configuration.stylesheets = []);
    const markdown = configuration.markdown || (configuration.markdown = {});
    const themes = configuration.themes || (configuration.themes = []);
    const footer: any = themeConfig.footer || (themeConfig.footer = {});
    const navbar: any =
        themeConfig.navbar || (themeConfig.navbar = { items: [] });
    const prism: any = themeConfig.prism || (themeConfig.prism = {});

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
    if (legal !== false) {
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
        // patch copyrigth
        footer.copyright = `Copyright © ${new Date().getFullYear()} Microsoft Corporation.`;
    }

    // github versioning
    if (repo && sha) {
        const link = `<a href=https://github.com/${repo}/commit/${sha} target="_blank" rel="noopener noreferrer">${sha.slice(
            0,
            8
        )}</a> | `;
        footer.copyright = link + footer.copyright;
    }

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
        if (typeof mermaid === "object") themeConfig.mermaid = mermaid;
    }

    if (codeSandboxButton !== false)
        injectTheme(
            "@rise4fun/docusaurus-theme-codesandbox-button",
            codeSandboxButton
        );

    if (sideEditor)
        injectTheme("@rise4fun/docusaurus-theme-side-editor", sideEditor);

    // additional languages
    const additionalLanguages: string[] =
        prism.additionalLanguages || (prism.additionalLanguages = []);
    const extraPrismLanguages: Set<string> = new Set(["lisp"]);
    if (compileCode) {
        injectBeforeDefaultRemarkPlugin(compileCodePlugin, compileCode);
        compileCode.langs.forEach(({ inputLang }) => {
            if (inputLang) extraPrismLanguages.add(inputLang);
        });
    }

    if (codeTabs !== false) {
        injectBeforeDefaultRemarkPlugin(codeTabsPlugin, {});
    }

    Array.from(extraPrismLanguages.values())
        .filter((l) => additionalLanguages.indexOf(l) < 0)
        .forEach((l) => additionalLanguages.push(l));

    if (
        repo &&
        !navbar.items.find((i: any) => i.className === "header-github-link")
    )
        navbar.items.push({
            href: `https://github.com/${repo}`,
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
        });

    return configuration;

    function injectStylesheet(sheet: {
        href: string;
        type: "text/css";
        integrity?: string;
        crossorigin?: string;
    }) {
        stylesheets.push(sheet);
    }

    function injectTheme(theme: any, options?: boolean | object) {
        themes.push(typeof options === "object" ? [theme, options] : theme);
    }

    function injectPlugin(plugin: any, options?: boolean | object) {
        plugins.push(typeof options === "object" ? [plugin, options] : plugin);
    }

    function injectRemarkPlugin(remarkPlugin: any, options?: boolean | object) {
        const entry =
            typeof options === "object"
                ? [remarkPlugin, options]
                : remarkPlugin;
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

    function injectBeforeDefaultRemarkPlugin(
        remarkPlugin: any,
        options?: object
    ) {
        const entry = options ? [remarkPlugin, options] : remarkPlugin;
        presets
            .filter((preset) => Array.isArray(preset))
            .map((preset: any) => preset[1])
            .filter((config) => !!config)
            .forEach((config) => {
                pushBeforeDefaultRemarkPlugin(config.docs, entry);
                pushBeforeDefaultRemarkPlugin(config.blog, entry);
                pushBeforeDefaultRemarkPlugin(config.pages, entry);
            });
    }

    function pushBeforeDefaultRemarkPlugin(node: any, entry: any) {
        if (!node) return;
        const ps =
            node.beforeDefaultRemarkPlugins ||
            (node.beforeDefaultRemarkPlugins = []);
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
