// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { configure } = require("docusaurus-plugin-rise4fun");

/** @type {import('@docusaurus/types').Config} */
const config = configure(
    {
        title: "Rise4Fun plugins for Docusaurus",
        tagline: "Rise4Fun plugins for Docusaurus",
        url: "https://microsoft.github.io",
        baseUrl: "/docusaurus-plugins-rise4fun",
        onBrokenLinks: "throw",
        onBrokenMarkdownLinks: "warn",
        favicon: "img/favicon.ico",
        projectName: "docusaurus-plugins-rise4fun", // Usually your repo name.

        presets: [
            [
                "classic",
                /** @type {import('@docusaurus/preset-classic').Options} */
                ({
                    docs: {
                        sidebarPath: require.resolve("./sidebars.js"),
                        beforeDefaultRemarkPlugins: [
                            [
                                require("docusaurus-remark-plugin-extract-code"),
                                { langs: ["js"] },
                            ],
                        ],
                        remarkPlugins: [],
                    },
                    blog: false,
                    theme: {
                        customCss: require.resolve("./src/css/custom.css"),
                    },
                }),
            ],
        ],

        themeConfig:
            /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
            ({
                navbar: {
                    title: "Rise4Fun plugins",
                    logo: {
                        alt: "Rise4fun Logo",
                        src: "img/logo.svg",
                    },
                    items: [],
                },
                footer: {
                    style: "dark",
                    links: [
                        {
                            title: "Docs",
                        },
                        {
                            title: "More",
                            items: [
                                {
                                    label: "GitHub",
                                    href: "https://github.com/microsoft/docusaurus-plugins-rise4fun",
                                },
                            ],
                        },
                    ],
                },
                prism: {
                    theme: lightCodeTheme,
                    darkTheme: darkCodeTheme,
                },
            }),

        plugins: [],
    },
    {
        appInsights: {
            instrumentationKey: "ec147bad-05d9-4959-922d-e5fc3dd0930b",
        },
        compileCode: {
            langs: [
                {
                    lang: "ts",
                    version: "0.0.0",
                    nodeBin: "tsc",
                    npmPackage: "typescript",
                },
                {
                    lang: "echo",
                    version: "0.0.0",
                    compile: (source, langOptions) => ({
                        code: 0,
                        stdout: source,
                    }),
                },
            ],
        },
    }
);

module.exports = config;
