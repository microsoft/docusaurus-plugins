/// <refere
import visit from 'unist-util-visit';
import type { Code, Root } from 'mdast';
import type { Plugin } from 'unified';
import { parse } from 'node:querystring';
import { PluginOptions } from './types';

/**
 * 
  const version = v1.20.0
  const url = `https://raw.githubusercontent.com/PrismJS/prism/${version}/components.js`;
  const response = await fetch(url);
  const text = await response.text();
  eval(text);
  const lgs = {}
  Object.entries(components.languages).map(
    ([code, { title = "NO_TITLE", alias = [] }]) => {
      alias = typeof alias === `string` ? [alias] : alias;
      lgs[code] = title;
      if (typeof alias === "string")
         lgs[alias] = title;
      else alias.forEach(a => lgs[a] = title)
    }
  );
  console.log(lgs)  
 */

const PRISM_LANGUAGES: Record<string, string> = {
  meta: 'NO_TITLE',
  markup: 'Markup',
  html: 'Markup',
  xml: 'Markup',
  svg: 'Markup',
  mathml: 'Markup',
  css: 'CSS',
  clike: 'C-like',
  javascript: 'JavaScript',
  js: 'JavaScript',
  abap: 'ABAP',
  abnf: 'Augmented Backus–Naur form',
  actionscript: 'ActionScript',
  ada: 'Ada',
  antlr4: 'ANTLR4',
  g4: 'ANTLR4',
  apacheconf: 'Apache Configuration',
  apl: 'APL',
  applescript: 'AppleScript',
  aql: 'AQL',
  arduino: 'Arduino',
  arff: 'ARFF',
  asciidoc: 'AsciiDoc',
  adoc: 'AsciiDoc',
  asm6502: '6502 Assembly',
  aspnet: 'ASP.NET (C#)',
  autohotkey: 'AutoHotkey',
  autoit: 'AutoIt',
  bash: 'Bash',
  shell: 'Bash',
  basic: 'BASIC',
  batch: 'Batch',
  bbcode: 'BBcode',
  shortcode: 'BBcode',
  bison: 'Bison',
  bnf: 'Backus–Naur form',
  rbnf: 'Backus–Naur form',
  brainfuck: 'Brainfuck',
  brightscript: 'BrightScript',
  bro: 'Bro',
  c: 'C',
  concurnas: 'Concurnas',
  conc: 'Concurnas',
  csharp: 'C#',
  cs: 'C#',
  dotnet: 'C#',
  cpp: 'C++',
  cil: 'CIL',
  coffeescript: 'CoffeeScript',
  coffee: 'CoffeeScript',
  cmake: 'CMake',
  clojure: 'Clojure',
  crystal: 'Crystal',
  csp: 'Content-Security-Policy',
  'css-extras': 'CSS Extras',
  d: 'D',
  dart: 'Dart',
  dax: 'DAX',
  diff: 'Diff',
  django: 'Django/Jinja2',
  jinja2: 'Django/Jinja2',
  'dns-zone-file': 'DNS zone file',
  'dns-zone': 'DNS zone file',
  docker: 'Docker',
  dockerfile: 'Docker',
  ebnf: 'Extended Backus–Naur form',
  eiffel: 'Eiffel',
  ejs: 'EJS',
  elixir: 'Elixir',
  elm: 'Elm',
  etlua: 'Embedded Lua templating',
  erb: 'ERB',
  erlang: 'Erlang',
  'excel-formula': 'Excel Formula',
  xlsx: 'Excel Formula',
  xls: 'Excel Formula',
  fsharp: 'F#',
  factor: 'Factor',
  'firestore-security-rules': 'Firestore security rules',
  flow: 'Flow',
  fortran: 'Fortran',
  ftl: 'FreeMarker Template Language',
  gcode: 'G-code',
  gdscript: 'GDScript',
  gedcom: 'GEDCOM',
  gherkin: 'Gherkin',
  git: 'Git',
  glsl: 'GLSL',
  gml: 'GameMaker Language',
  gamemakerlanguage: 'GameMaker Language',
  go: 'Go',
  graphql: 'GraphQL',
  groovy: 'Groovy',
  haml: 'Haml',
  handlebars: 'Handlebars',
  haskell: 'Haskell',
  hs: 'Haskell',
  haxe: 'Haxe',
  hcl: 'HCL',
  http: 'HTTP',
  hpkp: 'HTTP Public-Key-Pins',
  hsts: 'HTTP Strict-Transport-Security',
  ichigojam: 'IchigoJam',
  icon: 'Icon',
  inform7: 'Inform 7',
  ini: 'Ini',
  io: 'Io',
  j: 'J',
  java: 'Java',
  javadoc: 'JavaDoc',
  javadoclike: 'JavaDoc-like',
  javastacktrace: 'Java stack trace',
  jolie: 'Jolie',
  jq: 'JQ',
  jsdoc: 'JSDoc',
  'js-extras': 'JS Extras',
  'js-templates': 'JS Templates',
  json: 'JSON',
  jsonp: 'JSONP',
  json5: 'JSON5',
  julia: 'Julia',
  keyman: 'Keyman',
  kotlin: 'Kotlin',
  latex: 'LaTeX',
  tex: 'LaTeX',
  context: 'LaTeX',
  latte: 'Latte',
  less: 'Less',
  lilypond: 'LilyPond',
  ly: 'LilyPond',
  liquid: 'Liquid',
  lisp: 'Lisp',
  emacs: 'Lisp',
  elisp: 'Lisp',
  'emacs-lisp': 'Lisp',
  livescript: 'LiveScript',
  llvm: 'LLVM IR',
  lolcode: 'LOLCODE',
  lua: 'Lua',
  makefile: 'Makefile',
  markdown: 'Markdown',
  md: 'Markdown',
  'markup-templating': 'Markup templating',
  matlab: 'MATLAB',
  mel: 'MEL',
  mizar: 'Mizar',
  monkey: 'Monkey',
  moonscript: 'MoonScript',
  moon: 'MoonScript',
  n1ql: 'N1QL',
  n4js: 'N4JS',
  n4jsd: 'N4JS',
  'nand2tetris-hdl': 'Nand To Tetris HDL',
  nasm: 'NASM',
  neon: 'NEON',
  nginx: 'nginx',
  nim: 'Nim',
  nix: 'Nix',
  nsis: 'NSIS',
  objectivec: 'Objective-C',
  ocaml: 'OCaml',
  opencl: 'OpenCL',
  oz: 'Oz',
  parigp: 'PARI/GP',
  parser: 'Parser',
  pascal: 'Pascal',
  objectpascal: 'Pascal',
  pascaligo: 'Pascaligo',
  pcaxis: 'PC-Axis',
  px: 'PC-Axis',
  perl: 'Perl',
  php: 'PHP',
  phpdoc: 'PHPDoc',
  'php-extras': 'PHP Extras',
  plsql: 'PL/SQL',
  powerquery: 'PowerQuery',
  pq: 'PowerQuery',
  mscript: 'PowerQuery',
  powershell: 'PowerShell',
  processing: 'Processing',
  prolog: 'Prolog',
  properties: '.properties',
  protobuf: 'Protocol Buffers',
  pug: 'Pug',
  puppet: 'Puppet',
  pure: 'Pure',
  python: 'Python',
  py: 'Python',
  q: 'Q (kdb+ database)',
  qml: 'QML',
  qore: 'Qore',
  r: 'R',
  jsx: 'React JSX',
  tsx: 'React TSX',
  renpy: "Ren'py",
  reason: 'Reason',
  regex: 'Regex',
  rest: 'reST (reStructuredText)',
  rip: 'Rip',
  roboconf: 'Roboconf',
  robotframework: 'Robot Framework',
  robot: 'Robot Framework',
  ruby: 'Ruby',
  rb: 'Ruby',
  rust: 'Rust',
  sas: 'SAS',
  sass: 'Sass (Sass)',
  scss: 'Sass (Scss)',
  scala: 'Scala',
  scheme: 'Scheme',
  'shell-session': 'Shell session',
  smalltalk: 'Smalltalk',
  smarty: 'Smarty',
  solidity: 'Solidity (Ethereum)',
  'solution-file': 'Solution file',
  sln: 'Solution file',
  soy: 'Soy (Closure Template)',
  sparql: 'SPARQL',
  rq: 'SPARQL',
  'splunk-spl': 'Splunk SPL',
  sqf: 'SQF: Status Quo Function (Arma 3)',
  sql: 'SQL',
  stylus: 'Stylus',
  swift: 'Swift',
  tap: 'TAP',
  tcl: 'Tcl',
  textile: 'Textile',
  toml: 'TOML',
  tt2: 'Template Toolkit 2',
  turtle: 'Turtle',
  trig: 'Turtle',
  twig: 'Twig',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  't4-cs': 'T4 Text Templates (C#)',
  t4: 'T4 Text Templates (C#)',
  't4-vb': 'T4 Text Templates (VB)',
  't4-templating': 'T4 templating',
  vala: 'Vala',
  vbnet: 'VB.Net',
  velocity: 'Velocity',
  verilog: 'Verilog',
  vhdl: 'VHDL',
  vim: 'vim',
  'visual-basic': 'Visual Basic',
  vb: 'Visual Basic',
  wasm: 'WebAssembly',
  wiki: 'Wiki markup',
  xeora: 'Xeora',
  xeoracube: 'Xeora',
  xojo: 'Xojo (REALbasic)',
  xquery: 'XQuery',
  yaml: 'YAML',
  yml: 'YAML',
  zig: 'Zig',
};

function parseMeta<T>(node: Code) {
  const r = parse(node.meta || '', ' ');
  Object.keys(r).forEach((k) => (r[k] = fromAttributeValue(r[k])));
  return r as T;
}

function injectThemeImport(root: Root, element: string) {
  if (
    !root.children.find(
      (n: { type: string; value?: string }) =>
        n.type === 'import' && n.value && n.value?.includes(`@theme/${element}`)
    )
  ) {
    root.children.unshift({
      type: 'import',
      value: `import ${element} from '@theme/${element}';`,
    } as any);
  }
}

function fromAttributeValue(s: string | string[] | undefined) {
  if (!s) return s;
  if (typeof s === 'string' && s[0] === '"') {
    try {
      return JSON.parse(s);
    } catch {}
  }
  return s;
}

function toAttributeValue(s: string | undefined) {
  if (!s) return s;
  try {
    const j = JSON.parse(s);
    if (typeof j === 'string') s = j;
  } catch {}
  return JSON.stringify(s);
}

const plugin: Plugin<[PluginOptions?]> = (options = undefined) => {
  const { langTitles } = options || {};

  return async (root, vfile) => {
    let needsTabsImport = false;
    let needsCodeSandboxImport = false;

    const visited = new Set<Code>(); // visit called twice on async
    // collect all nodes
    visit(root, 'code', (node: Code, nodeIndex: number, parent) => {
      if (!parent || visited.has(node)) return;
      visited.add(node);

      const { tabs, lazy, codesandbox } = parseMeta<{
        tabs: string;
        lazy: string;
        codesandbox: string;
      }>(node);
      if (tabs === undefined && codesandbox === undefined) return;

      const codes = [node];
      // collect all code blocks with tabs in this sequence
      const startIndex = nodeIndex++;
      while (
        tabs !== undefined &&
        nodeIndex < parent.children.length &&
        parent.children[nodeIndex]?.type === 'code'
      ) {
        codes.push(parent.children[nodeIndex] as Code);
        nodeIndex++;
      }

      let nextIndex = startIndex + 1;
      if (codes.length > 1) {
        // collapse code into a mdx tree
        const mdx = [
          {
            type: 'jsx',
            value: `<Tabs ${lazy !== undefined ? 'lazy' : ''} groupId={${JSON.stringify(
              tabs || 'default'
            )}}>`,
          },
        ];
        codes.forEach((c) => {
          const { lang = '' } = c;
          const { title, file } = parseMeta(c) as {
            title?: string;
            file?: string;
          };
          mdx.push({
            type: 'jsx',
            value: `<Tab value={${JSON.stringify(file || title || lang)}} label={${toAttributeValue(
              title || langTitles?.[lang || ''] || PRISM_LANGUAGES[lang || ''] || undefined
            )}}>`,
          });
          mdx.push({ ...c });
          mdx.push({
            type: 'jsx',
            value: '</Tab>',
          });
        });
        mdx.push({
          type: 'jsx',
          value: '</Tabs>',
        });

        parent.children.splice(startIndex, codes.length, ...mdx);
        needsTabsImport = true;

        // tell visitor to continue on the next node
        nextIndex = startIndex + (mdx.length - codes.length) + 2;
      }

      // handle code sandbox
      if (codesandbox !== undefined) {
        const files: Record<string, object> = {};
        codes.forEach((c) => {
          const { lang, value } = c;
          const { title, file } = parseMeta(c) as {
            title?: string;
            file?: string;
          };
          files[file || title || `main.${lang}`] = {
            content: value,
          };
        });
        const startFile = Object.keys(files)[0];
        parent.children.splice(nextIndex, 0, {
          type: 'jsx',
          value: `<CodeSandboxButton startFile=${JSON.stringify(startFile)} files={${JSON.stringify(
            files
          )}} ${codesandbox ? `template={${JSON.stringify(codesandbox)}}` : ''} />`,
        } as any);
        nextIndex++;
        needsCodeSandboxImport = true;
      }

      return nextIndex;
    });

    // add import as final step
    if (needsTabsImport) {
      injectThemeImport(root as Root, 'TabItem');
      injectThemeImport(root as Root, 'Tabs');
    }
    if (needsCodeSandboxImport) {
      injectThemeImport(root as Root, 'CodeSandboxButton');
    }
  };
};

// To continue supporting `require('...')` without the `.default` ㄟ(▔,▔)ㄏ
// TODO change to export default after migrating to ESM
export = plugin;
