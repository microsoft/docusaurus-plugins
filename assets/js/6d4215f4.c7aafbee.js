"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1694],{5318:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>b});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,b=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(b,s(s({ref:t},p),{},{components:n})):r.createElement(b,s({ref:t},p))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6503:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(7378),o=n(8944);const a={browserWindow:"browserWindow_s0V6",browserWindowHeader:"browserWindowHeader_HY6p",row:"row_xW88",buttons:"buttons_kP2n",right:"right_GiNy",browserWindowAddressBar:"browserWindowAddressBar_EPHM",dot:"dot_rw9t",browserWindowMenuIcon:"browserWindowMenuIcon_ibuU",bar:"bar_Wn1S",browserWindowBody:"browserWindowBody__sFz"};function s(e){let{children:t,minHeight:n,url:s="http://localhost:3000"}=e;return r.createElement("div",{className:a.browserWindow,style:{minHeight:n}},r.createElement("div",{className:a.browserWindowHeader},r.createElement("div",{className:a.buttons},r.createElement("span",{className:a.dot,style:{background:"#f25f58"}}),r.createElement("span",{className:a.dot,style:{background:"#fbbe3c"}}),r.createElement("span",{className:a.dot,style:{background:"#58cb42"}})),r.createElement("div",{className:(0,o.Z)(a.browserWindowAddressBar,"text--truncate")},s),r.createElement("div",{className:a.browserWindowMenuIcon},r.createElement("div",null,r.createElement("span",{className:a.bar}),r.createElement("span",{className:a.bar}),r.createElement("span",{className:a.bar})))),r.createElement("div",{className:a.browserWindowBody},t))}},8063:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var r=n(5773),o=(n(7378),n(5318)),a=n(6503);const s={id:"npm-tool",sidebar_position:2},i="Tools published on npm",l={unversionedId:"markdown-features/compile-code/npm-tool",id:"markdown-features/compile-code/npm-tool",title:"Tools published on npm",description:"There is a special support for tools that can be installed through npm.",source:"@site/docs/markdown-features/compile-code/npm-tool.mdx",sourceDirName:"markdown-features/compile-code",slug:"/markdown-features/compile-code/npm-tool",permalink:"/docusaurus-plugins/docs/markdown-features/compile-code/npm-tool",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"npm-tool",sidebar_position:2},sidebar:"docs",previous:{title:"Compile Code",permalink:"/docusaurus-plugins/docs/markdown-features/compile-code/"},next:{title:"Node.JS script",permalink:"/docusaurus-plugins/docs/markdown-features/compile-code/node-script"}},c={},p=[],d={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"tools-published-on-npm"},"Tools published on npm"),(0,o.kt)("p",null,"There is a special support for tools that can be installed through ",(0,o.kt)("inlineCode",{parentName:"p"},"npm"),"."),(0,o.kt)("p",null,"Let's take the TypeScript compiler as an example. Add a ",(0,o.kt)("inlineCode",{parentName:"p"},"compileCode")," language entry\nthat will run all ",(0,o.kt)("inlineCode",{parentName:"p"},"ts")," code section through the ",(0,o.kt)("inlineCode",{parentName:"p"},"tsc")," node executable."),(0,o.kt)("p",null,"By default, the tool generates a unique folder and write the source as ",(0,o.kt)("inlineCode",{parentName:"p"},"input.ts"),", and the options as ",(0,o.kt)("inlineCode",{parentName:"p"},"options.json"),".\nThe tool is executed within the generated folder and can tune how your tool is called in the options."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="./docusaurus.config.js"',title:'"./docusaurus.config.js"'},'compileCode: {\n    langs: [\n        ...,\n        // highlight-start\n        {\n            lang: "ts",\n            nodeBin: "tsc",\n            inputFiles: {\n                "tsconfig.json": {\n                    "compilerOptions": {\n                        "target": "esnext",\n                        "skipLibCheck": true,\n                        "lib": ["esnext", "dom"]\n                    },\n                    "include": [\n                        "input.ts"\n                    ]\n                }\n            }\n        },\n        // highlight-end\n    ];\n}\n')),(0,o.kt)("p",null,"Let's take a look at this example in action."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-markdown"},"```ts showLineNumbers ignoreErrors\nconsole.llog('typo!');\n```\n")),(0,o.kt)("p",null,"When rendered in the docs, this snippet looks like any other code snippet. But you'll also notice an additional box\nunderneath with the TypeScript compiler output. This output was computed at build time."),(0,o.kt)(a.Z,{mdxType:"BrowserWindow"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:"showLineNumbers ignoreErrors",showLineNumbers:!0,ignoreErrors:!0},"console.llog('typo!');\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",metastring:' title="Output"',"":!0,title:'"Output"'},"input.ts(1,9): error TS2551: Property 'llog' does not exist on type 'Console'. Did you mean 'log'?\n"))))}m.isMDXComponent=!0}}]);