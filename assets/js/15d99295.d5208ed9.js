"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8338],{5318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),l=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(u.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=l(n),g=r,f=p["".concat(u,".").concat(g)]||p[g]||d[g]||o;return n?a.createElement(f,i(i({ref:t},c),{},{components:n})):a.createElement(f,i({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=g;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s[p]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},5011:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(5773),r=(n(7378),n(5318));const o={sidebar_position:2},i="Getting Started",s={unversionedId:"getting-started/index",id:"getting-started/index",title:"Getting Started",description:"Rise4fun leverages Docusaurus along with a few custom plugins.",source:"@site/docs/getting-started/index.mdx",sourceDirName:"getting-started",slug:"/getting-started/",permalink:"/docusaurus-plugins/docs/getting-started/",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docs",previous:{title:"Introduction",permalink:"/docusaurus-plugins/docs/intro"},next:{title:"Configuration",permalink:"/docusaurus-plugins/docs/getting-started/configuration"}},u={},l=[{value:"Docusaurus",id:"docusaurus",level:2},{value:"Rise4fun configuration",id:"rise4fun-configuration",level:2},{value:"Cleanup time!",id:"cleanup-time",level:2},{value:"Start authoring!",id:"start-authoring",level:2}],c={toc:l},p="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"getting-started"},"Getting Started"),(0,r.kt)("p",null,"Rise4fun leverages ",(0,r.kt)("a",{parentName:"p",href:"https://docusaurus.io/"},"Docusaurus")," along with a few custom plugins."),(0,r.kt)("p",null,"In this page, we'll show you how to create your first Docusaurus web site and\nenable the rise4fun plugins in it."),(0,r.kt)("h2",{id:"docusaurus"},"Docusaurus"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://docusaurus.io/"},"Docusaurus")," is a framework to build optimized documentation web sites.\nIt has an extensive documentation which we recommend taking a peek later on. For simplicity,\nthe installation tutorial is repeated here:"),(0,r.kt)("p",null,"Install ",(0,r.kt)("a",{parentName:"p",href:"https://nodejs.org/en/download/"},"Node.js")," 18+, open a terminal on your project root\nand create a new Docusaurus site:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-docusaurus@latest website classic --typescript\n")),(0,r.kt)("p",null,"Try it out! Go to website and start docusaurus."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd website\nyarn start\n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you are using ",(0,r.kt)("a",{parentName:"p",href:"https://yarnpkg.com/features/workspaces"},"yarn workspaces"),", add ",(0,r.kt)("inlineCode",{parentName:"p"},"website")," to your workspace list and run ",(0,r.kt)("inlineCode",{parentName:"p"},"yarn install")," again.")),(0,r.kt)("h2",{id:"rise4fun-configuration"},"Rise4fun configuration"),(0,r.kt)("p",null,"Let's work on the docusaurus website folder."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd website\n")),(0,r.kt)("p",null,"Install the ",(0,r.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@rise4fun/docusaurus-plugin-rise4fun"},"rise4fun plugin")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @rise4fun/docusaurus-plugin-rise4fun\n")),(0,r.kt)("p",null,"Open ",(0,r.kt)("inlineCode",{parentName:"p"},"./docusaurus.config.js")," and update it as follows."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="./docusaurus.config.js"',title:'"./docusaurus.config.js"'},'// highlight-next-line\nconst { configure } = require("@rise4fun/docusaurus-plugin-rise4fun");\n...\n// highlight-next-line\nconst config = configure(\n    {\n        ...\n}\n// highlight-start\n    // rise4fun configuration\n    , {\n\n})\n// highlight-end\n')),(0,r.kt)("h2",{id:"cleanup-time"},"Cleanup time!"),(0,r.kt)("p",null,"The default Docusaurus template comes with a lot of content. Make sure to give a pass through ",(0,r.kt)("inlineCode",{parentName:"p"},"docusaurus.config.js"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"review the names, url, project name and so forth"),(0,r.kt)("li",{parentName:"ul"},"if you don't need a blog, set ",(0,r.kt)("inlineCode",{parentName:"li"},"blog: false")," and delete the ",(0,r.kt)("inlineCode",{parentName:"li"},"blog")," folder"),(0,r.kt)("li",{parentName:"ul"},"if you're already familiar with Docusaurus, delete the repopulated content of ",(0,r.kt)("inlineCode",{parentName:"li"},"docs"))),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Microsoft projects: make sure that ",(0,r.kt)("inlineCode",{parentName:"p"},"organizationName")," is set to ",(0,r.kt)("inlineCode",{parentName:"p"},"microsoft"),", to enable automatic legal footer injection"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="website/docusaurus.config.js"',title:'"website/docusaurus.config.js"'},'const { configure } = require("@rise4fun/docusaurus-plugin-rise4fun");\n...\nconst config = configure(\n    {\n        ...\n        // highlight-next-line\n        organizationName: "microsoft",\n    }\n...\n'))),(0,r.kt)("h2",{id:"start-authoring"},"Start authoring!"),(0,r.kt)("p",null,"Start the site"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn start\n")),(0,r.kt)("p",null,"Open ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:3000"},"http://localhost:3000")," and you'll see your web site running, yay!"),(0,r.kt)("p",null,"You can learn about the ",(0,r.kt)("a",{parentName:"p",href:"/docs/markdown-features"},"Markdown features")," available to create your documentation site."))}d.isMDXComponent=!0}}]);