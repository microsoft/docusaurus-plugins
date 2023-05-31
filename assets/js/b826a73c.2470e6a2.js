"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5413],{5318:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),g=i,m=c["".concat(l,".").concat(g)]||c[g]||d[g]||a;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:i,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},3858:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=n(5773),i=(n(7378),n(5318));const a={sidebar_position:6},o="Deployment",s={unversionedId:"getting-started/deployment",id:"getting-started/deployment",title:"Deployment",description:"Now that we have a web site running locally, it is time to setup the deployment.",source:"@site/docs/getting-started/deployment.mdx",sourceDirName:"getting-started",slug:"/getting-started/deployment",permalink:"/docusaurus-plugins/docs/getting-started/deployment",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"docs",previous:{title:"Configuration",permalink:"/docusaurus-plugins/docs/getting-started/configuration"},next:{title:"Maintenance",permalink:"/docusaurus-plugins/docs/getting-started/maintenance"}},l={},u=[{value:"GitHub Action",id:"github-action",level:2},{value:"GitHub Pages",id:"github-pages",level:2}],p={toc:u},c="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"deployment"},"Deployment"),(0,i.kt)("p",null,"Now that we have a web site running locally, it is time to setup the deployment."),(0,i.kt)("p",null,"We start by adding a GitHub Action to build and push the compiled web site to the ",(0,i.kt)("inlineCode",{parentName:"p"},"gh-pages")," branch;\nthen setup the GitHub Pages on the project."),(0,i.kt)("h2",{id:"github-action"},"GitHub Action"),(0,i.kt)("p",null,"Now that you've got the website building locally, it's time to setup a build script in GitHub Actions\nto prepare for automatic deployment on every successful commit/build."),(0,i.kt)("p",null,"Add a root level ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," file that declares the ",(0,i.kt)("inlineCode",{parentName:"p"},"website")," folder as a ",(0,i.kt)("inlineCode",{parentName:"p"},"yarn")," workspace (and the ",(0,i.kt)("inlineCode",{parentName:"p"},"packages")," folder)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'{\n  "private": true,\n  "workspaces": ["packages/*", "website"],\n  "scripts": {\n    "build": "cd website && yarn build"\n  }\n}\n')),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},".github/workflows/build.yml")," to your project"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title=".github/workflows/build.yml"',title:'".github/workflows/build.yml"'},"name: Build and Deploy\non:\n    workflow_dispatch:\n    push:\n    pull_request:\njobs:\n    build:\n        name: Build and Deployment\n        runs-on: ubuntu-latest\n        env:\n            GITHUB_REPOSITORY: ${{ github.repository }}\n            GITHUB_REF: ${{ github.ref }}\n            GITHUB_SHA: ${{ github.sha }}\n        steps:\n            - uses: actions/checkout@v3\n\n            - name: Cache ris4fun compile code\n                id: docusaurus-rise4fun-compile-code\n                uses: actions/cache@v3\n                with:\n                path: website/.docusaurus/docusaurus-remark-plugin-compile-code/\n                key: ${{ runner.os }}-${{ hashFiles('**/yarn.lock') }}\n\n            - uses: actions/setup-node@v3\n              with:\n                  node-version: 18.x\n                  cache: yarn\n                  cache-dependency-path: yarn.lock\n\n            - name: yarn install\n              run: yarn install --frozen-lockfile\n\n            - name: Build all\n              run: yarn build\n\n            - name: Deploy to GitHub Pages\n              uses: peaceiris/actions-gh-pages@v3\n              if: ${{ github.ref == 'refs/heads/main' }}\n              with:\n                  github_token: ${{ secrets.GITHUB_TOKEN }}\n                  publish_dir: website/build\n                  force_orphan: true\n")),(0,i.kt)("p",null,"Once a build passed, don't forget to enable GitHub Pages in your GitHub repository settings."),(0,i.kt)("p",null,"Navigate to the ",(0,i.kt)("strong",{parentName:"p"},"Actions")," tab in your GitHub repository home page and you should see this action running.\nOnce the run is done, and if everything goes right, the action will upload the compiled web site in the ",(0,i.kt)("inlineCode",{parentName:"p"},"gh_pages")," branch."),(0,i.kt)("h2",{id:"github-pages"},"GitHub Pages"),(0,i.kt)("p",null,"Navigate to the ",(0,i.kt)("strong",{parentName:"p"},"Settings")," page, then ",(0,i.kt)("strong",{parentName:"p"},"Pages")," tab, and enable pages from the ",(0,i.kt)("inlineCode",{parentName:"p"},"gh-pages")," branch. This will trigger\na deployment build and your web site should be live within minutes. Yay!"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Copy the GitHub Pages url and set it as the repository web address.")))}d.isMDXComponent=!0}}]);