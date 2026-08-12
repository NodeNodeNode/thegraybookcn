// gb:termcard —— 为某一页生成「页面术语卡」。
//
// 防术语漂移三层机制的第一层（事前注入）。关键设计：不注入全表。
// 全量术语表随翻译推进只会越来越长，翻到后面必然读不完也记不住；
// 按当前页原文求交集得到的小表，成本恒定，而且永远只包含用得上的词。
//
// 用法：node scripts/gb-termcard.mjs reference/language/ioboxes.md
import fs from 'node:fs';
import path from 'node:path';
import {load} from 'js-yaml';
import {ROOT, UPSTREAM, proseOnly} from './lib/md.mjs';

const rel = process.argv[2];
if (!rel) {
  console.error('用法：node scripts/gb-termcard.mjs <上游文件路径>');
  process.exit(2);
}
const abs = path.join(UPSTREAM, rel);
if (!fs.existsSync(abs)) {
  console.error(`上游没有这个文件：${rel}`);
  process.exit(2);
}

const {terms} = load(fs.readFileSync(path.join(ROOT, 'translation/terms.yml'), 'utf8'));
const prose = proseOnly(fs.readFileSync(abs, 'utf8')).toLowerCase();

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hits = terms
  .map((t) => {
    const re = new RegExp(`(?<![a-z0-9])${escapeRe(t.en.toLowerCase())}(e?s)?(?![a-z0-9])`, 'g');
    const n = (prose.match(re) ?? []).length;
    return {t, n};
  })
  .filter((x) => x.n > 0)
  .sort((a, b) => b.n - a.n);

const open = hits.filter((x) => x.t.status === 'open');

console.log(`# 页面术语卡 · ${rel}\n`);
if (open.length) {
  console.log(`⚠ 本页出现 ${open.length} 个尚未拍板的术语，翻译前必须先定：`);
  open.forEach((x) => console.log(`   ${x.t.en}${x.t.note ? ` —— ${x.t.note.trim().split('\n')[0]}` : ''}`));
  console.log('');
}

console.log('| 英文 | 中文 | 处理 | 注意 |');
console.log('|---|---|---|---|');
for (const {t, n} of hits) {
  if (t.status === 'open') continue;
  const zh = t.status === 'keep-en' ? `保留 ${(t.case ?? [t.en]).join(' / ')}` : t.zh;
  const rules = [
    // 中文必须在标记外：`*English（中文）*` 的收尾星号前是全角「）」、后面接汉字，
    // 不构成 right-flanking，CommonMark 根本不闭合，页面上会漏出裸星号。详见 §5。
    t.first_use ? '首次出现用 *English*（中文）' : null,
    t.forbid?.length ? `禁用 ${t.forbid.join('、')}` : null,
    t.forbid_bare_en ? '不得裸用英文' : null,
  ].filter(Boolean);
  console.log(`| ${t.en} (${n}) | ${zh} | ${t.status} | ${rules.join('；') || '—'} |`);
}

console.log(`\n共 ${hits.length - open.length} 条。全表见 TERMINOLOGY.md，文风见 TRANSLATION-STYLE.md。`);
