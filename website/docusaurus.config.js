// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { configure } = require("@rise4fun/docusaurus-plugin-rise4fun");

/** @type {import('@docusaurus/types').Config} */
const config = configure(
    {
        title: "rise4fun",
        tagline: "Awesome Documentation for Programming Language Tools.",
        url: "https://microsoft.github.io",
        baseUrl: "/docusaurus-plugins-rise4fun",
        onBrokenLinks: "throw",
        onBrokenMarkdownLinks: "warn",
        favicon: "img/favicon.ico",
        projectName: "docusaurus-plugins-rise4fun",
        presets: [
            [
                "classic",
                /** @type {import('@docusaurus/preset-classic').Options} */
                ({
                    docs: {
                        sidebarPath: require.resolve("./sidebars.js"),
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
                    title: "rise4fun",
                    logo: {
                        alt: "Rise4fun Logo",
                        src: "img/logo.svg",
                    },
                    items: [
                        {
                            type: "doc",
                            position: "left",
                            docId: "intro",
                            label: "Docs",
                        },
                    ],
                },
                footer: {
                    style: "dark",
                    links: [
                        {
                            title: "Docs",
                            items: [
                                {
                                    label: "Introduction",
                                    to: "/docs/intro",
                                },
                                {
                                    label: "Getting Started",
                                    to: "/docs/getting-started",
                                },
                                {
                                    label: "Plugins",
                                    to: "/docs/plugins",
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
                    nodeBin: "tsc",
                },
                {
                    lang: "echo",
                    compile: async (source, langOptions) => ({
                        code: 0,
                        stdout: source.toUpperCase(),
                    }),
                },
            ],
        },
    }
);

module.exports = config;
