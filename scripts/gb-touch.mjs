// gb:touch —— 跟进完上游改动之后，把账本记回去。
//
// 用法
//   npm run gb:touch reference/hde/exporting.md      单页
//   npm run gb:touch --all                           全部过期页（慎用，见下）
//
// ⚠️ 这个命令只改 frontmatter，不碰正文。它的意思是「我已经把上游这次改动
//    跟进到译文里了」。在没有真正跟进的情况下跑它，等于把这次漂移**永久抹掉** ——
//    以后再也不会有任何机制提醒你这一页落后了。这比忘记回填危险得多。
//
//    所以 --all 只在一种情况下是对的：你确认这批改动对译文没有影响
//    （比如上游只动了英文原文的错别字、或只改了图片路径而我们本来就用绝对 URL）。
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import matter from '@11ty/gray-matter';
import {UPSTREAM, DOCS, listMarkdown} from './lib/md.mjs';

if (!fs.existsSync(UPSTREAM)) {
  console.error('缺少 .upstream/，先跑 npm run gb:upstream');
  process.exit(2);
}

const git = (...args) => {
  try {
    return execFileSync('git', ['-C', UPSTREAM, ...args], {encoding: 'utf8'}).trim();
  } catch {
    return null;
  }
};

const args = process.argv.slice(2);
const all = args.includes('--all');
const only = args.filter((a) => !a.startsWith('--'));

if (!all && only.length === 0) {
  console.error('用法：npm run gb:touch <上游路径>   或   npm run gb:touch --all');
  process.exit(2);
}

/** 上游路径 → 本地文件 */
const ledger = new Map();
for (const rel of listMarkdown(DOCS)) {
  const abs = path.join(DOCS, rel);
  const {data} = matter(fs.readFileSync(abs, 'utf8'));
  if (data.origin === 'cn' || !data.source_path) continue;
  ledger.set(data.source_path, {abs, blob: data.source_blob == null ? null : String(data.source_blob)});
}

const today = new Date().toISOString().slice(0, 10);
const targets = all ? [...ledger.keys()] : only;
let touched = 0;
let skipped = 0;

for (const src of targets) {
  const e = ledger.get(src);
  if (!e) {
    console.error(`  ✗ 账本里没有 ${src}`);
    process.exitCode = 1;
    continue;
  }
  const cur = git('rev-parse', `HEAD:${src}`);
  if (!cur) {
    console.error(`  ✗ 上游没有 ${src}（已删除或改名？需人工重新映射 source_path）`);
    process.exitCode = 1;
    continue;
  }
  if (cur === e.blob) {
    if (!all) console.log(`  · ${src} 本来就是最新的，未改动`);
    skipped++;
    continue;
  }

  // 只替换这两行，其余 frontmatter 与正文一个字都不动 ——
  // 用 gray-matter 反序列化再写回会重排键序、改动引号风格，制造无谓的 diff。
  let raw = fs.readFileSync(e.abs, 'utf8');
  const before = raw;
  raw = raw.replace(/^source_blob:.*$/m, `source_blob: ${cur}`);
  raw = /^last_synced:/m.test(raw)
    ? raw.replace(/^last_synced:.*$/m, `last_synced: '${today}'`)
    : raw.replace(/^source_blob:.*$/m, (m) => `${m}\nlast_synced: '${today}'`);
  if (raw === before) {
    console.error(`  ✗ ${src} 的 frontmatter 里没找到 source_blob，未改动`);
    process.exitCode = 1;
    continue;
  }
  fs.writeFileSync(e.abs, raw);
  console.log(`  ✓ ${src}  ${e.blob?.slice(0, 10) ?? '(空)'} → ${cur.slice(0, 10)}`);
  touched++;
}

console.log(`\n回填 ${touched} 页${skipped ? `，${skipped} 页本来就是最新的` : ''}`);
if (touched) {
  console.log('提交前记得跑：npm run gb:check-terms && npm run gb:check-anchors && npm run build');
}
