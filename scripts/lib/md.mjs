// 共享的 Markdown 结构分析工具。
// 只分析结构（标题、链接、图片），不做内容处理。
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import GithubSlugger from 'github-slugger';

export const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../..');
export const UPSTREAM = path.join(ROOT, '.upstream');
export const DOCS = path.join(ROOT, 'docs');

/** 上游仓库里不属于正文的路径 */
const UPSTREAM_EXCLUDE = [
  'custom template/', // DocFX 模板，非文档内容
  'api/', // DocFX 生成的 API 存根
  'README.md',
];

/** 递归列出目录下所有 .md，返回相对该目录的 posix 路径 */
export function listMarkdown(dir, {exclude = []} = {}) {
  const out = [];
  const walk = (cur) => {
    for (const entry of fs.readdirSync(cur, {withFileTypes: true})) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const rel = path.relative(dir, full).split(path.sep).join('/');
        if (!exclude.some((p) => rel.startsWith(p) || rel === p)) out.push(rel);
      }
    }
  };
  walk(dir);
  return out.sort();
}

/** 上游全部正文页（不含 toc.md，那些转成 sidebars.js） */
export function listUpstreamDocs({includeToc = false} = {}) {
  return listMarkdown(UPSTREAM, {exclude: UPSTREAM_EXCLUDE}).filter(
    (p) => includeToc || path.basename(p) !== 'toc.md',
  );
}

/**
 * 统一行尾。上游有相当一部分文件是 CRLF（全部 toc.md 都是），残留的 \r 会被
 * 行尾正则和标题文本一起吃进去，进而污染 slug —— 所有解析入口都必须先过这一步。
 */
export const normalizeEol = (src) => src.replace(/\r\n?/g, '\n');

/**
 * 把围栏代码块和行内代码替换成等长空白，这样后续正则不会误伤代码里的
 * `#`、`[]()`、花括号。保持行数不变，行号才对得上。
 */
export function maskCode(input) {
  const src = normalizeEol(input);
  let out = src.replace(/^([ \t]*)(```|~~~)[^\n]*\n[\s\S]*?^[ \t]*\2[^\n]*$/gm, (block) =>
    block.replace(/[^\n]/g, ' '),
  );
  out = out.replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));
  return out;
}

/** 去掉 frontmatter（替换为等长空白，保住行号） */
export function maskFrontmatter(input) {
  const src = normalizeEol(input);
  const m = /^---\n[\s\S]*?\n---[ \t]*(\n|$)/.exec(src);
  if (!m || m.index !== 0) return src;
  return m[0].replace(/[^\n]/g, ' ') + src.slice(m[0].length);
}

const lineOf = (src, index) => src.slice(0, index).split('\n').length;

/**
 * 提取 ATX 标题。返回 {depth, text, explicitId, slug, line}。
 * slug 用 github-slugger 计算（与 Docusaurus 一致，含同名标题去重）。
 */
export function parseHeadings(input) {
  // masked 与 norm 必须同源同长，否则下面按偏移回取原文会错位
  const norm = normalizeEol(input);
  const masked = maskCode(maskFrontmatter(norm));
  const slugger = new GithubSlugger();
  const out = [];
  const re = /^(#{1,6})[ \t]+(.+?)[ \t]*$/gm;
  let m;
  while ((m = re.exec(masked)) !== null) {
    let text = norm.slice(m.index + m[1].length, m.index + m[0].length).trim();
    // ATX 的闭合 # 序列必须有空白在前（CommonMark）。不要求空白的话，
    // 「Writing nodes using C#」会被截成「Writing nodes using C」。
    text = text.replace(/[ \t]+#+$/, '').trim();
    // DocFX 的选项卡语法 `# [标签](#tab/tabid-N)`：这不是标题，是 tab 标签。
    // 不参与 slug 命名空间，否则会污染同文件其他标题的去重计数。
    const tab = /^\[([^\]]*)\]\(#tab\/([^)]+)\)$/.exec(text);
    if (tab) {
      out.push({
        depth: m[1].length,
        text: tab[1],
        explicitId: null,
        slug: null,
        docfxTab: tab[2],
        line: lineOf(masked, m.index),
      });
      continue;
    }
    // Docusaurus 的显式 id 语法 {#custom-id}
    const explicit = /\{#([^}]+)\}[ \t]*$/.exec(text);
    const explicitId = explicit ? explicit[1] : null;
    if (explicit) text = text.slice(0, explicit.index).trim();
    out.push({
      depth: m[1].length,
      text,
      explicitId,
      slug: explicitId ? slugger.slug(explicitId, true) : slugger.slug(text),
      line: lineOf(masked, m.index),
    });
  }
  return out;
}

/** 提取 Markdown 链接 [text](target)，跳过图片 ![]() */
export function parseLinks(src) {
  const masked = maskCode(maskFrontmatter(src));
  const out = [];
  const re = /(!?)\[([^\]]*)\]\(([^)\s]*)(?:[ \t]+"[^"]*")?\)/g;
  let m;
  while ((m = re.exec(masked)) !== null) {
    if (m[1] === '!') continue;
    out.push({text: m[2], target: m[3], line: lineOf(masked, m.index), raw: m[0]});
  }
  return out;
}

/** 提取图片：Markdown ![]() 与 HTML <img src> 两种形态 */
export function parseImages(src) {
  const masked = maskCode(maskFrontmatter(src));
  const out = [];
  let m;
  const md = /!\[([^\]]*)\]\(([^)\s]*)(?:[ \t]+"[^"]*")?\)/g;
  while ((m = md.exec(masked)) !== null) {
    out.push({kind: 'md', alt: m[1], src: m[2], line: lineOf(masked, m.index)});
  }
  const html = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
  while ((m = html.exec(masked)) !== null) {
    out.push({kind: 'html', alt: '', src: m[1], line: lineOf(masked, m.index)});
  }
  return out;
}

/**
 * 屏蔽链接/图片的地址部分与 HTML 标签内部，只留下人眼能读到的正文。
 * 术语检查必须跑在这层之上，否则 nuget.org、class="keyseq" 这类会漫天误报。
 * 同样保持长度与行数不变。
 */
export function maskUrlsAndTags(input) {
  const blank = (m) => ' '.repeat(m.length);
  const blankKeepLines = (m) => m.replace(/[^\n]/g, ' ');
  return normalizeEol(input)
    // HTML 注释。必须先于标签处理：<!-- --> 不以字母开头，标签正则抓不到它，
    // 而注释里常写理由（含术语原词），漏掉会让检查器把自己的抑制注释也报出来。
    .replace(/<!--[\s\S]*?-->/g, blankKeepLines)
    // [文字](地址 "标题") → 只保留「文字」
    .replace(/(!?\[[^\]]*\])\(([^)]*)\)/g, (_, keep, url) => keep + blank('(' + url + ')'))
    // 参考式链接定义 [id]: https://…
    .replace(/^\[[^\]]+\]:[ \t]*\S+.*$/gm, blank)
    // HTML 标签内部（属性里全是 class/src/style，不是正文）
    .replace(/<\/?[a-zA-Z][^>]*>/g, blank)
    // 裸 URL
    .replace(/\bhttps?:\/\/\S+/g, blank);
}

/** 正文清洗全套：去 frontmatter、代码、链接地址、HTML 标签 */
export const proseOnly = (src) => maskUrlsAndTags(maskCode(maskFrontmatter(src)));

/** 拆 target 为 {filePath, anchor} */
export function splitTarget(target) {
  const hash = target.indexOf('#');
  if (hash === -1) return {filePath: target, anchor: null};
  return {filePath: target.slice(0, hash), anchor: target.slice(hash + 1)};
}

/** 判断是否站外链接 */
export const isExternal = (t) => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(t);

export function readUpstream(relPath) {
  return fs.readFileSync(path.join(UPSTREAM, relPath), 'utf8');
}

/** 解析上游相对链接：相对于 fromRel 所在目录 */
export function resolveUpstreamLink(fromRel, targetPath) {
  const base = targetPath.startsWith('/')
    ? targetPath.replace(/^\/+/, '')
    : path.posix.join(path.posix.dirname(fromRel), targetPath);
  return path.posix.normalize(base);
}

/**
 * 解析 DocFX 的 toc.md：`#`/`##`/`###` 标题层级 + Markdown 链接声明导航顺序。
 * 返回扁平列表 [{depth, label, target, tocFile}]，target 为相对 toc.md 所在目录的路径
 * （可能为空字符串，表示纯分组标题）。
 */
export function parseToc(tocRel) {
  const src = readUpstream(tocRel);
  const dir = path.posix.dirname(tocRel);
  const out = [];
  for (const line of maskCode(src).split('\n')) {
    const m = /^(#{1,6})[ \t]+\[([^\]]*)\]\(([^)]*)\)[ \t]*$/.exec(line);
    if (!m) continue;
    const target = m[3].trim();
    out.push({
      depth: m[1].length,
      label: m[2],
      target,
      resolved: target ? path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, target)) : null,
      tocFile: tocRel,
    });
  }
  return out;
}

/** 上游导航可达的全部页面路径集合（目录链接会展开成该目录的 toc.md） */
export function navReachable() {
  const seen = new Set();
  const visit = (tocRel) => {
    if (seen.has(tocRel)) return;
    seen.add(tocRel);
    for (const item of parseToc(tocRel)) {
      if (!item.resolved) continue;
      // 形如 `reference/` 的目录链接 → 展开成该目录的 toc.md
      if (item.target.endsWith('/')) {
        const sub = path.posix.join(item.resolved, 'toc.md');
        if (fs.existsSync(path.join(UPSTREAM, sub))) visit(sub);
      } else {
        seen.add(item.resolved);
      }
    }
  };
  visit('toc.md');
  return seen;
}

/** 上游文件路径 → 本地镜像路径（1:1，同步主键） */
export const upstreamToLocal = (rel) => path.posix.join('docs', rel);

let slugMapCache = null;
function slugMap() {
  if (!slugMapCache) {
    slugMapCache = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'scripts/slug-map.json'), 'utf8'),
    );
  }
  return slugMapCache;
}

const kebab = (name) =>
  name
    .replace(/\.mdx?$/, '')
    .replace(/[_\s]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * 上游路径 → 本站 URL slug。
 * 返回 {slug, source}，source 说明是哪条规则命中的；needsOverride 表示
 * 文件名无法机械 kebab 化（如 lo_9_2_Spreads），必须人工在 fileOverrides 里指定。
 */
export function resolveSlug(rel) {
  const {dirRules, landingPages, fileOverrides} = slugMap();
  if (fileOverrides[rel]) return {slug: '/' + fileOverrides[rel], source: 'override'};
  if (landingPages[rel]) return {slug: '/' + landingPages[rel], source: 'landing'};

  const prefix = Object.keys(dirRules)
    .filter((p) => rel.startsWith(p))
    .sort((a, b) => b.length - a.length)[0];
  if (prefix === undefined) return {slug: null, source: 'no-rule', needsOverride: true};

  const base = path.posix.basename(rel);
  // 形如 lo_9_2_Spreads.md / mut4.md：带序号前缀或纯代号，机械转换出来的 slug 没有可读性
  const unreadable = /^(lo|mut|dyn|hf)[_0-9]/i.test(base) || /^[a-z]{1,4}\d+\.mdx?$/i.test(base);
  const slug = '/' + dirRules[prefix] + kebab(base);
  return {slug, source: 'rule', needsOverride: unreadable};
}

export {GithubSlugger};

