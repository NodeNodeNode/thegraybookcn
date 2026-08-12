// gb:migrate —— Phase 1 结构重构。
//
// 把现有译文迁到与上游 1:1 的路径，并把 frontmatter 改成同步账本。
// 不翻译、不改正文一个字，只动路径与 frontmatter。
//
// 默认 dry-run，加 --apply 才真的改。
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {load} from 'js-yaml';
import matter from '@11ty/gray-matter';
import {ROOT, UPSTREAM, DOCS, resolveSlug, parseHeadings, normalizeEol} from './lib/md.mjs';

const APPLY = process.argv.includes('--apply');
const {entries, originCn} = load(fs.readFileSync(path.join(ROOT, 'translation/mapping.yml'), 'utf8'));

const upstreamBlob = new Map();
for (const line of execFileSync('git', ['-C', UPSTREAM, 'ls-tree', '-r', 'HEAD'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
})
  .trim()
  .split('\n')) {
  const m = /^\d+ blob ([0-9a-f]+)\t(.+)$/.exec(line);
  if (m) upstreamBlob.set(m[2], m[1]);
}

const today = new Date().toISOString().slice(0, 10);
const statusOf = {translated: 'translated', partial: 'partial', stub: 'stub'};

/** 上游页面的 h1 英文标题，用于组装双语标题 */
function upstreamTitle(source) {
  const abs = path.join(UPSTREAM, source);
  if (!fs.existsSync(abs)) return null;
  const h = parseHeadings(fs.readFileSync(abs, 'utf8')).find((x) => x.depth === 1 && !x.docfxTab);
  return h?.text ?? null;
}

/** 组装「English / 中文」双语标题，已是双语的不重复加 */
function bilingual(en, zh) {
  if (!en) return zh;
  if (!zh || zh === en) return en;
  if (zh.includes(' / ')) return zh;
  return `${en} / ${zh}`;
}

const plan = [];
const problems = [];

for (const e of entries) {
  const fromAbs = path.join(DOCS, e.from);
  const toRel = e.source; // docs/ 下与上游同路径
  const toAbs = path.join(DOCS, toRel);

  if (!fs.existsSync(fromAbs)) {
    problems.push(`源文件不存在：docs/${e.from}`);
    continue;
  }
  if (!upstreamBlob.has(e.source)) {
    problems.push(`上游没有这个文件：${e.source}`);
    continue;
  }

  const raw = normalizeEol(fs.readFileSync(fromAbs, 'utf8'));
  const {data, content} = matter(raw);
  const slug = resolveSlug(e.source);
  if (!slug.slug || slug.needsOverride) {
    problems.push(`${e.source} 的 slug 需要人工指定（当前 ${slug.slug ?? '无'}）`);
    continue;
  }

  const fm = {
    title: bilingual(upstreamTitle(e.source), data.title),
    slug: slug.slug,
    source_path: e.source,
    source_blob: upstreamBlob.get(e.source),
    status: statusOf[e.completeness] ?? 'partial',
    last_synced: today,
  };

  plan.push({from: e.from, to: toRel, fm, oldTitle: data.title, note: e.note, content});
}

// _category_.json 全部删除：导航改由 toc.md 生成的 sidebars.js 决定
const categoryFiles = [];
(function walk(dir) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name === '_category_.json') categoryFiles.push(path.relative(DOCS, full));
  }
})(DOCS);

console.log(`迁移计划：${plan.length} 个文件${APPLY ? '（正在应用）' : '（dry-run，加 --apply 才生效）'}\n`);
for (const p of plan) {
  console.log(`  docs/${p.from}`);
  console.log(`   → docs/${p.to}`);
  console.log(`     slug   ${p.fm.slug}`);
  if (p.fm.title !== p.oldTitle) console.log(`     title  「${p.oldTitle}」→「${p.fm.title}」`);
  console.log(`     status ${p.fm.status}`);
  if (p.note) console.log(`     ⚠ ${p.note}`);
  console.log('');
}
console.log(`另删除 ${categoryFiles.length} 个 _category_.json：${categoryFiles.join(', ')}`);
console.log(`中文站原创（加 origin: cn）：${originCn.join(', ')}`);

if (problems.length) {
  console.log(`\n阻塞问题 ${problems.length} 个：`);
  problems.forEach((p) => console.log(`  ${p}`));
}

if (!APPLY) process.exit(problems.length ? 1 : 0);
if (problems.length) {
  console.log('\n有阻塞问题，拒绝应用。');
  process.exit(1);
}

// ── 应用 ────────────────────────────────────────────────────────
const git = (...a) => execFileSync('git', a, {cwd: ROOT, encoding: 'utf8'});

for (const p of plan) {
  const toAbs = path.join(DOCS, p.to);
  fs.mkdirSync(path.dirname(toAbs), {recursive: true});
  // 先用 git mv 保住重命名历史，再重写 frontmatter
  git('mv', path.posix.join('docs', p.from), path.posix.join('docs', p.to));
  fs.writeFileSync(toAbs, matter.stringify(p.content, p.fm));
}

for (const rel of originCn) {
  const abs = path.join(DOCS, rel);
  const {data, content} = matter(normalizeEol(fs.readFileSync(abs, 'utf8')));
  fs.writeFileSync(abs, matter.stringify(content, {title: data.title, origin: 'cn'}));
}

for (const rel of categoryFiles) git('rm', '-q', path.posix.join('docs', rel));

// 清掉迁移后残留的空目录
(function prune(dir) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    if (!ent.isDirectory()) continue;
    const full = path.join(dir, ent.name);
    prune(full);
    if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
  }
})(DOCS);

console.log('\n迁移完成。');
