"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5689],{5318:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>b});var n=r(7378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),i=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=i(e.components);return n.createElement(u.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=i(r),m=a,b=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(b,s(s({ref:t},c),{},{components:r})):n.createElement(b,s({ref:t},c))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[d]="string"==typeof e?e:a,s[1]=l;for(var i=2;i<o;i++)s[i]=r[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9798:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(7378),a=r(8944);const o={tabItem:"tabItem_wHwb"};function s(e){let{children:t,hidden:r,className:s}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(o.tabItem,s),hidden:r},t)}},3930:(e,t,r)=>{r.d(t,{Z:()=>k});var n=r(5773),a=r(7378),o=r(8944),s=r(3457),l=r(3620),u=r(654),i=r(784),c=r(1819);function d(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}function p(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=t??d(r);return function(e){const t=(0,i.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function m(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:r}=e;const n=(0,l.k6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,u._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function f(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,o=p(e),[s,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[u,i]=b({queryString:r,groupId:n}),[d,f]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,o]=(0,c.Nk)(r);return[n,(0,a.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:n}),h=(()=>{const e=u??d;return m({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{h&&l(h)}),[h]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),i(e),f(e)}),[i,f,o]),tabValues:o}}var h=r(6457);const g={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};function y(e){let{className:t,block:r,selectedValue:l,selectValue:u,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.o5)(),p=e=>{const t=e.currentTarget,r=c.indexOf(t),n=i[r].value;n!==l&&(d(t),u(n))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const r=c.indexOf(e.currentTarget)+1;t=c[r]??c[0];break}case"ArrowLeft":{const r=c.indexOf(e.currentTarget)-1;t=c[r]??c[c.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":r},t)},i.map((e=>{let{value:t,label:r,attributes:s}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:p},s,{className:(0,o.Z)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":l===t})}),r??t)})))}function v(e){let{lazy:t,children:r,selectedValue:n}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function w(e){const t=f(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",g.tabList)},a.createElement(y,(0,n.Z)({},e,t)),a.createElement(v,(0,n.Z)({},e,t)))}function k(e){const t=(0,h.Z)();return a.createElement(w,(0,n.Z)({key:String(t)},e))}},4147:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(7378),a=r(398),o=r(8944);const s={mr1:"mr1_Kbkl",hidemobile:"hidemobile_QIMd"};function l(e){const{className:t,editorId:r,text:l,label:u="Edit",title:i="Load code in side editor"}=e,{setSource:c}=(0,a.ZP)();return n.createElement("button",{type:"button",title:i,className:(0,o.Z)(s.hidemobile,s.mr1,t||"button button--primary"),onClick:()=>c(r,l)},u)}},6503:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(7378),a=r(8944);const o={browserWindow:"browserWindow_s0V6",browserWindowHeader:"browserWindowHeader_HY6p",row:"row_xW88",buttons:"buttons_kP2n",right:"right_GiNy",browserWindowAddressBar:"browserWindowAddressBar_EPHM",dot:"dot_rw9t",browserWindowMenuIcon:"browserWindowMenuIcon_ibuU",bar:"bar_Wn1S",browserWindowBody:"browserWindowBody__sFz"};function s(e){let{children:t,minHeight:r,url:s="http://localhost:3000"}=e;return n.createElement("div",{className:o.browserWindow,style:{minHeight:r}},n.createElement("div",{className:o.browserWindowHeader},n.createElement("div",{className:o.buttons},n.createElement("span",{className:o.dot,style:{background:"#f25f58"}}),n.createElement("span",{className:o.dot,style:{background:"#fbbe3c"}}),n.createElement("span",{className:o.dot,style:{background:"#58cb42"}})),n.createElement("div",{className:(0,a.Z)(o.browserWindowAddressBar,"text--truncate")},s),n.createElement("div",{className:o.browserWindowMenuIcon},n.createElement("div",null,n.createElement("span",{className:o.bar}),n.createElement("span",{className:o.bar}),n.createElement("span",{className:o.bar})))),n.createElement("div",{className:o.browserWindowBody},t))}},1862:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>m});var n=r(5773),a=(r(7378),r(5318)),o=r(3930),s=r(9798),l=r(6503),u=r(4147);const i={sidebar_position:3},c="\ud83d\udce6 theme-side-editor",d={unversionedId:"plugins/docusaurus-theme-side-editor",id:"plugins/docusaurus-theme-side-editor",title:"\ud83d\udce6 theme-side-editor",description:"A Docusaurus theme component that loads a code editor in a split pane.",source:"@site/docs/plugins/docusaurus-theme-side-editor.mdx",sourceDirName:"plugins",slug:"/plugins/docusaurus-theme-side-editor",permalink:"/docusaurus-plugins/docs/plugins/docusaurus-theme-side-editor",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docs",previous:{title:"\ud83d\udce6 theme-codesandbox-button",permalink:"/docusaurus-plugins/docs/plugins/docusaurus-theme-codesandbox-button"},next:{title:"\ud83d\udce6 remark-plugin-code-tabs",permalink:"/docusaurus-plugins/docs/plugins/docusaurus-remark-plugin-code-tabs"}},p={},m=[{value:"Usage",id:"usage",level:2},{value:"Configuration",id:"configuration",level:2}],b={toc:m},f="wrapper";function h(e){let{components:t,...r}=e;return(0,a.kt)(f,(0,n.Z)({},b,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"-theme-side-editor"},"\ud83d\udce6 theme-side-editor"),(0,a.kt)("p",null,"A Docusaurus theme component that loads a code editor in a split pane."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"Read the ",(0,a.kt)("a",{parentName:"p",href:"/docs/markdown-features/side-editor"},"Side Editor documentation"),"."),(0,a.kt)("p",null,"You can also inject the button using MDX. Add the global import at the start of the ",(0,a.kt)("inlineCode",{parentName:"p"},".mdx")," file."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import SideEditorButton from '@theme/SideEditorButton';\n")),(0,a.kt)("p",null,"Then use the ",(0,a.kt)("inlineCode",{parentName:"p"},"SideEditorButton")," element in your page."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<SideEditorButton editorId="devicescript" text={`console.log("hello")`} />\n')),(0,a.kt)(l.Z,{mdxType:"BrowserWindow"},(0,a.kt)(u.Z,{editorId:"devicescript",text:'console.log("hello")',mdxType:"SideEditorButton"})),(0,a.kt)("h2",{id:"configuration"},"Configuration"),(0,a.kt)("p",null,"Install the theme"),(0,a.kt)(o.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,a.kt)(s.Z,{value:"npm",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @rise4fun/docusaurus-theme-side-editor\n"))),(0,a.kt)(s.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @rise4fun/docusaurus-theme-side-editor\n"))),(0,a.kt)(s.Z,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add @rise4fun/docusaurus-theme-side-editor\n")))),(0,a.kt)("p",null,"Add the theme to your theme list."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const config = {\n  plugins: [\n    // highlight-start\n    ['@rise4fun/docusaurus-theme-side-editor', {}],\n    // highlight-end\n  ],\n};\n")))}h.isMDXComponent=!0}}]);