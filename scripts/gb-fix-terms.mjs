// gb:fix-terms —— 按术语表批量修正存量译文里的错误写法。
//
// 关键：只在正文区域替换。直接 sed 会把 nuget.org 这类链接地址、代码块里的
// 标识符一起改掉。这里复用 proseOnly 的遮罩 —— 它逐字符等长替换，
// 所以遮罩后的偏移与原文一一对应，可以据此判断某个匹配是否落在正文里。
//
// 默认 dry-run，加 --apply 才真的改。
import fs from 'node:fs';
import path from 'node:path';
import {DOCS, listMarkdown, proseOnly, normalizeEol} from './lib/md.mjs';

const APPLY = process.argv.includes('--apply');

/** [正则, 替换, 说明]。正则必须带 g。 */
const RULES = [
  [/(?<![A-Za-z0-9])nugets(?![A-Za-z0-9])/g, 'NuGets', 'nugets → NuGets'],
  [/(?<![A-Za-z0-9])Nugets(?![A-Za-z0-9])/g, 'NuGets', 'Nugets → NuGets'],
  [/(?<![A-Za-z0-9])NuGets(?![A-Za-z0-9])/g, 'NuGets', 'NuGets（已正确）'],
  // 否定环视排除域名：链接文字 [nuget.org] 属于正文（遮罩只挡 URL 不挡文字），
  // 但域名不该被改成 NuGet.org。
  [/(?<![A-Za-z0-9])nuget(?![A-Za-z0-9s]|\.(?:org|com|net))/g, 'NuGet', 'nuget → NuGet'],
  [/(?<![A-Za-z0-9])Nuget(?![A-Za-z0-9s]|\.(?:org|com|net))/g, 'NuGet', 'Nuget → NuGet'],
  [/(?<![A-Za-z0-9])IObox(?![A-Za-z0-9])/g, 'IOBox', 'IObox → IOBox'],
  [/(?<![A-Za-z0-9])record node/g, 'Record node', 'record node → Record node'],
  [/(?<![A-Za-z0-9])class node/g, 'Class node', 'class node → Class node'],
  [/图档/g, '草图', '图档 → 草图'],
  [/阵脚/g, '针脚', '阵脚 → 针脚'],
  [/类别目录/g, '目录', '类别目录 → 目录'],
  [/操作器/g, '运算器', '操作器 → 运算器'],
  [/编辑环境扩展/g, '编辑器扩展', '编辑环境扩展 → 编辑器扩展'],
  [/帮助面包/g, '帮助面板', '帮助面包 → 帮助面板'],
];

let total = 0;
for (const rel of listMarkdown(DOCS)) {
  const abs = path.join(DOCS, rel);
  const raw = normalizeEol(fs.readFileSync(abs, 'utf8'));
  const prose = proseOnly(raw); // 与 raw 等长
  const edits = [];

  for (const [re, to, desc] of RULES) {
    re.lastIndex = 0;
    for (const m of prose.matchAll(re)) {
      if (m[0] === to) continue; // 已经是正确写法
      edits.push({start: m.index, end: m.index + m[0].length, from: m[0], to, desc});
    }
  }
  if (!edits.length) continue;

  edits.sort((a, b) => a.start - b.start);
  let out = '';
  let cursor = 0;
  for (const e of edits) {
    out += raw.slice(cursor, e.start) + e.to;
    cursor = e.end;
    const line = raw.slice(0, e.start).split('\n').length;
    console.log(`  docs/${rel}:${line}  ${e.desc}`);
  }
  out += raw.slice(cursor);
  total += edits.length;

  if (APPLY) fs.writeFileSync(abs, out);
}

console.log(
  `\n共 ${total} 处${APPLY ? '已修正' : '待修正（dry-run，加 --apply 才生效）'}`,
);
