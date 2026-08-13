// gb:status —— 覆盖率与过期报告。
//
// 回答两个问题：哪些上游页面还没翻、哪些译文因上游改动而过期。
// 过期判定用上游文件的 git blob SHA（内容指纹），不是仓库 HEAD ——
// HEAD 每周都变，blob 只在这个文件真被改时才变。
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import matter from '@11ty/gray-matter';
import {
  ROOT,
  UPSTREAM,
  DOCS,
  listUpstreamDocs,
  listMarkdown,
  resolveSlug,
  navReachable,
} from './lib/md.mjs';

if (!fs.existsSync(UPSTREAM)) {
  console.error('缺少 .upstream/，先跑 npm run gb:upstream');
  process.exit(2);
}

const git = (...args) =>
  execFileSync('git', ['-C', UPSTREAM, ...args], {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024});

const head = git('rev-parse', 'HEAD').trim();

/** 上游全部正文页的 blob SHA */
const upstreamBlobs = new Map();
for (const line of git('ls-tree', '-r', 'HEAD').trim().split('\n')) {
  const m = /^\d+ blob ([0-9a-f]+)\t(.+)$/.exec(line);
  if (m) upstreamBlobs.set(m[2], m[1]);
}

// 上游导航可达的页面。不可达的是遗留内容 —— 官网上点不到，我们的 sidebar 也是从 toc.md
// 生成的，所以它们不该计入分母。
const reachable = navReachable();
const allUpstreamDocs = listUpstreamDocs();
const upstreamDocs = allUpstreamDocs.filter((r) => reachable.has(r));
const navOrphans = allUpstreamDocs.filter((r) => !reachable.has(r));

const words = (rel) =>
  fs.readFileSync(path.join(UPSTREAM, rel), 'utf8').split(/\s+/).filter(Boolean).length;

/** 本地译文：读 frontmatter 的 source_path / source_blob / status */
const localDocs = listMarkdown(DOCS);
const bySource = new Map();
const unmapped = [];
const originCn = [];
for (const rel of localDocs) {
  const raw = fs.readFileSync(path.join(DOCS, rel), 'utf8');
  const {data} = matter(raw);
  if (data.origin === 'cn') {
    originCn.push(rel);
    continue;
  }
  if (!data.source_path) {
    unmapped.push(rel);
    continue;
  }
  bySource.set(data.source_path, {
    local: rel,
    blob: data.source_blob ?? null,
    status: data.status ?? 'unknown',
  });
}

const buckets = {
  translated: [],
  outdated: [],
  partial: [],
  untranslated: [],
  orphaned: [],
  needSlug: [],
};

for (const rel of upstreamDocs) {
  const entry = bySource.get(rel);
  const upBlob = upstreamBlobs.get(rel);
  const slug = resolveSlug(rel);
  if (slug.needsOverride || !slug.slug) buckets.needSlug.push({rel, ...slug});

  if (!entry) {
    buckets.untranslated.push({rel, words: words(rel)});
    continue;
  }
  // blob 一律按字符串比。frontmatter 里的 SHA 没加引号，而 YAML 会把纯数字的值
  // 解析成 number —— 那样 `entry.blob &&` 会在值为 0 时短路，漂移被静默漏掉。
  // 40 位十六进制恰好全是数字的概率极低，但这种失败是无声的，而账本的全部价值
  // 就在于可信。强制转字符串后，最坏情况是多报一次（吵），而不是漏报（哑）。
  const localBlob = entry.blob == null ? null : String(entry.blob);
  if (localBlob && upBlob && localBlob !== upBlob) {
    buckets.outdated.push({rel, ...entry, upBlob});
  } else if (entry.status === 'partial' || entry.status === 'stub') {
    buckets.partial.push({rel, ...entry});
  } else {
    buckets.translated.push({rel, ...entry});
  }
}
// 本地指向的上游文件已经不存在了
for (const [src, entry] of bySource) {
  if (!upstreamBlobs.has(src)) buckets.orphaned.push({rel: src, ...entry});
}

const totalWords = upstreamDocs.reduce((n, r) => n + words(r), 0);
const doneWords = buckets.translated.reduce((n, e) => n + words(e.rel), 0);
const partialWords = buckets.partial.reduce((n, e) => n + words(e.rel), 0);
const pct = (a, b) => (b === 0 ? '0.0' : ((a / b) * 100).toFixed(1));

const orphanWords = navOrphans.reduce((n, r) => n + words(r), 0);
console.log(
  `上游 HEAD ${head.slice(0, 10)}   导航可达正文页 ${upstreamDocs.length} 个   ${totalWords} 词`,
);
console.log(
  `（另有 ${navOrphans.length} 个页面不在上游导航里、${orphanWords} 词，视为遗留内容，不计入分母）\n`,
);
console.log(`已翻译    ${String(buckets.translated.length).padStart(3)} 页`);
console.log(`部分翻译  ${String(buckets.partial.length).padStart(3)} 页`);
console.log(`已过期    ${String(buckets.outdated.length).padStart(3)} 页  ← 上游改了内容`);
console.log(`未翻译    ${String(buckets.untranslated.length).padStart(3)} 页`);
console.log(`失联      ${String(buckets.orphaned.length).padStart(3)} 页  ← 上游已删除或改名`);
// 两个口径都要给：只算完整翻译的页面，和把半成品也算进来。
// 前者是「真正翻完了多少」，后者是「碰过多少」，混用会误读。
console.log(
  `\n覆盖率（仅完整翻译）  按页数 ${pct(buckets.translated.length, upstreamDocs.length)}%` +
    `   按上游词数 ${pct(doneWords, totalWords)}%`,
);
console.log(
  `覆盖率（含部分翻译）  按页数 ${pct(
    buckets.translated.length + buckets.partial.length,
    upstreamDocs.length,
  )}%   按上游词数 ${pct(doneWords + partialWords, totalWords)}%`,
);

if (unmapped.length) {
  console.log(`\n── 本地文件没有 source_path 也没标 origin: cn（${unmapped.length} 个）──`);
  unmapped.forEach((r) => console.log(`  docs/${r}`));
}
if (originCn.length) console.log(`\n中文站原创内容：${originCn.length} 个（不计入覆盖率）`);

if (buckets.outdated.length) {
  console.log('\n── 已过期，需按上游改动增量重译 ──');
  for (const e of buckets.outdated) {
    // 这里不能给 /compare/<blob>..HEAD —— 账本里记的是 blob（文件内容指纹），
    // 而 GitHub 的 compare 只接受 commit/分支/tag，喂 blob 进去是 404。
    // 曾经就是这么写的，等于把维护者第一个会点的链接做成了死的。
    // 文件的提交历史页永远有效；要「上游到底改了什么」用 gb:diff，
    // 它会沿历史找到我们那一版对应的 commit，给出真正可用的 compare。
    const hist = `https://github.com/vvvv/The-Gray-Book/commits/master/${e.rel}`;
    console.log(`  ${e.rel}\n      本地 docs/${e.local}\n      改动历史 ${hist}`);
  }
  console.log(`\n  看上游具体改了什么：npm run gb:diff [上游路径]`);
}
if (buckets.orphaned.length) {
  console.log('\n── 失联（上游已删除或改名，需人工重新映射）──');
  buckets.orphaned.forEach((e) => console.log(`  ${e.rel}  ←  docs/${e.local}`));
}
if (buckets.needSlug.length) {
  console.log(`\n── 文件名无法机械转成可读 URL，需在 slug-map.json 的 fileOverrides 里指定（${buckets.needSlug.length} 个）──`);
  buckets.needSlug.forEach((e) => console.log(`  ${e.rel}   目前会生成 ${e.slug ?? '（无规则）'}`));
}

const byChapter = new Map();
for (const e of buckets.untranslated) {
  // reference/ 下按二级目录分章；其余顶层目录（introduction/changelog/roadmap）整体算一章
  const seg = e.rel.split('/');
  const ch = seg.length > 2 ? seg.slice(0, 2).join('/') : seg[0];
  const cur = byChapter.get(ch) ?? {n: 0, w: 0};
  byChapter.set(ch, {n: cur.n + 1, w: cur.w + e.words});
}
if (navOrphans.length) {
  console.log('\n── 不在上游导航里的页面（官网点不到，建议不翻；确认前先跟上游问一句）──');
  navOrphans.forEach((r) => console.log(`  ${String(words(r)).padStart(5)} 词   ${r}`));
}
if (byChapter.size) {
  console.log('\n── 未翻译，按章统计 ──');
  [...byChapter.entries()]
    .sort((a, b) => b[1].w - a[1].w)
    .forEach(([ch, v]) => console.log(`  ${String(v.n).padStart(3)} 页  ${String(v.w).padStart(6)} 词   ${ch}`));
}

fs.writeFileSync(
  path.join(ROOT, '.upstream-status.json'),
  JSON.stringify({head, generatedFrom: 'gb:status', buckets}, null, 2),
);
