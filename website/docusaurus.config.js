// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const { configure } = require("@rise4fun/docusaurus-plugin-rise4fun");
const { say } = require("cowsay")

const config = configure(
    {
        title: "rise4fun",
        tagline:
            "Docusaurus plugins for awesome Programming Language documentation.",
        organizationName: "Microsoft",
        url: "https://microsoft.github.io",
        baseUrl: "/docusaurus-plugins-rise4fun",
        onBrokenLinks: "throw",
        onBrokenMarkdownLinks: "warn",
        favicon: "img/logo.svg",
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
                        {
                            type: "doc",
                            position: "left",
                            docId: "markdown-features/index",
                            label: "Markdown",
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
                                    label: "Markdown Features",
                                    to: "/docs/markdown-features",
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
        algolia: {
            appId: "CO2Z4A2ENY",
            apiKey: "07dbf88eedb219c92c00332228bc26b9",
            indexName: "rise4fun",
        },
        appInsights: {
            instrumentationKey: "ec147bad-05d9-4959-922d-e5fc3dd0930b",
        },
        codeTabs: {
            langTitles: {
                yacl: "Yet another cool language",
                txt: "Text",
            },
        },
        codeSandbox: {
            templates: {
                node18: {
                    files: {
                        "package.json": {
                            content: {
                                dependencies: {},
                            },
                        },
                        "sandbox.config.json": {
                            content: {
                                template: "node",
                                container: {
                                    node: "18",
                                },
                            },
                        },
                    },
                },
                react: {
                    files: {
                        "package.json": {
                            content: {
                                name: "react",
                                version: "1.0.0",
                                description:
                                    "React example starter project",
                                keywords: ["react", "starter"],
                                main: "src/index.js",
                                dependencies: {
                                    react: "18.2.0",
                                    "react-dom": "18.2.0",
                                    "react-scripts": "4.0.0",
                                },
                                devDependencies: {
                                    "@babel/runtime": "7.13.8",
                                    typescript: "4.1.3",
                                },
                                scripts: {
                                    start: "react-scripts start",
                                    build: "react-scripts build",
                                    test: "react-scripts test --env=jsdom",
                                    eject: "react-scripts eject",
                                },
                                browserslist: [
                                    ">0.2%",
                                    "not dead",
                                    "not ie <= 11",
                                    "not op_mini all",
                                ],
                            },
                        },
                        "sandbox.config.json": {
                            content: {
                                template: "node",
                                view: "terminal",
                                container: {
                                    node: "18",
                                },
                            },
                        },
                    },
                },
            },
        },
        compileCode: {
            langs: [
                {
                    lang: "msagl",
                    html: "./langs/msagl.html",
                    timeout: 10000,
                    outputFiles: [
                        {
                            name: "output.svg",
                            title: "Generated graph",
                        },
                    ]
                },
                {
                    lang: "ts",
                    nodeBin: "tsc",
                    npmPackage: "typescript",
                    inputFiles: {
                        "tsconfig.json": {
                            "compilerOptions": {
                                "target": "ES2015",
                                "module": "commonjs",
                                "strict": true,
                                "esModuleInterop": true,
                                "skipLibCheck": true,
                                "forceConsistentCasingInFileNames": true
                            },
                        }
                    }
                },
                {
                    lang: "echo",
                    compile: async (source) => ({
                        stdout: source.toUpperCase(),
                    }),
                },
                {
                    lang: "cowsay",
                    compile: async (text) => ({
                        stdout: say({ text })
                    })
                },
                {
                    lang: "z3wasm",
                    extension: "z3",
                    inputLang: "lisp",
                    command: "./langs/z3.mjs",
                },
                {
                    lang: "svgo",
                    extension: "svg",
                    inputLang: "markup",
                    command: "./langs/svgo.js",
                    outputFiles: [
                        {
                            name: "output.svg",
                            title: "Optimized SVG",
                        },
                        {
                            name: "output.svg.txt",
                            lang: "markup",
                            title: "optimized.svg",
                        },
                    ],
                },
            ],
        },
        codeElement: {
            langs: [
                {
                    lang: "cow",
                    element: "Cow"
                }
            ]
        },
        sideEditor: {
            editors: [
                {
                    id: "msagl",
                    type: "iframe",
                    language: "plaintext",
                    lightUrl: "./editors/msagljs.html?theme=light",
                    darkUrl: "./editors/msagljs.html?theme=dark",
                    message: {
                        type: "msagl",
                    },
                    messageTextFieldName: "dot",
                    readyMessage: {
                        type: "msagl",
                        state: "ready",
                    },
                },
                {
                    id: "devicescript",
                    type: "iframe",
                    lightUrl:
                        "https://microsoft.github.io/jacdac-docs/editors/devicescript/?devicescriptvm=1&embed=1&footer=0&light=1",
                    darkUrl:
                        "https://microsoft.github.io/jacdac-docs/editors/devicescript/?devicescriptvm=1&embed=1&footer=0&dark=1",
                    message: {
                        channel: "devicescript",
                        type: "source",
                        force: true,
                        startMissingSimulators: true,
                    },
                    messageTextFieldName: "source",
                    readyMessage: {
                        channel: "jacdac",
                    },
                },
            ],
        },
    }
);


module.exports = config;
