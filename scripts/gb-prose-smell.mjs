// gb:prose-smell —— 翻译腔嫌疑定位。
//
// 只做定位，不做判断。文风不能机器判定，所以它**永远是 warn，绝不进门槛** ——
// 它唯一的用处是：在 7 万多字里，把最可疑的段落排到前面，让人先看那些。
//
// 用法
//   npm run gb:prose-smell                    全站排行
//   npm run gb:prose-smell reference/language 只看某个目录
import fs from 'node:fs';
import path from 'node:path';
import {DOCS, listMarkdown, proseOnly, normalizeEol} from './lib/md.mjs';

const only = process.argv[2];

// 每一条都来自本仓库实际踩到的翻译腔，不是凭空列的
const SMELLS = [
  ['它/它们扎堆', /它们?/g, 3], // 一段里 3 个以上：中文靠话题链承接，代词该省
  ['让…可以/使得/允许你', /(?:让[^，。]{0,8}(?:可以|能够?)|使得|允许你|使[^，。]{0,6}能够)/g, 1],
  ['……的方式，是', /的(?:方式|办法|做法)[，,]\s*(?:是|就是)/g, 1],
  ['被+动词', /被[一-鿿]/g, 3],
  ['三重「的」', /[一-鿿]的[一-鿿]{2,8}的[一-鿿]{2,8}的/g, 1],
  ['对…来说/对于', /(?:对于|对[^，。]{1,8}来说)/g, 2],
  ['通过…来…', /通过[^，。]{2,20}来[一-鿿]/g, 1],
  ['一个…的…（a Y of X）', /一(?:个|份|条|种)[一-鿿]{2,10}的[一-鿿]{2,6}/g, 2],
];

const rows = [];

for (const rel of listMarkdown(DOCS)) {
  if (only && !rel.startsWith(only)) continue;
  const raw = normalizeEol(fs.readFileSync(path.join(DOCS, rel), 'utf8'));
  // 遮掉代码/链接地址/HTML 属性，只看散文
  const prose = proseOnly(raw);
  const lines = prose.split('\n');

  let han = 0;
  let ta = 0;
  const hits = [];
  lines.forEach((line, i) => {
    const text = line.replace(/^\s*(?:[*+-]|\d+\.)\s/, '').trim();
    if (!text) return;
    han += (text.match(/[一-鿿]/g) ?? []).length;
    ta += (text.match(/它们?/g) ?? []).length;
    for (const [name, re, threshold] of SMELLS) {
      const n = (text.match(re) ?? []).length;
      if (n >= threshold) hits.push({line: i + 1, name, n, text});
    }
  });
  if (!han) continue;
  // 「它」密度单列：它是散布式的，不会在单行里扎堆，却最能反映照搬英语代词的程度
  rows.push({rel, han, ta, hits, taDensity: (ta / han) * 10000});
}

rows.sort((a, b) => b.taDensity - a.taDensity);

console.log('翻译腔嫌疑排行（按「它」密度排 —— 照搬英语代词是头号症状）\n');
console.log(
  `  ${'文件'.padEnd(46)}${'汉字'.padStart(7)}${'它/万字'.padStart(9)}${'其他命中'.padStart(9)}`,
);
for (const r of rows.slice(0, 25)) {
  console.log(
    `  ${r.rel.padEnd(46)}${String(r.han).padStart(7)}${r.taDensity.toFixed(0).padStart(9)}${String(r.hits.length).padStart(9)}`,
  );
}

const worst = rows.filter((r) => r.hits.length).slice(0, 3);
if (worst.length) {
  console.log('\n最重的三个文件，各举几处：\n');
  for (const r of worst) {
    console.log(`  ── ${r.rel}`);
    for (const h of r.hits.slice(0, 4)) {
      console.log(`     ${String(h.line).padStart(4)}  [${h.name} ×${h.n}]`);
      console.log(`           ${h.text.slice(0, 76)}`);
    }
    console.log();
  }
}

const totHan = rows.reduce((n, r) => n + r.han, 0);
const totHit = rows.reduce((n, r) => n + r.hits.length, 0);
console.log(
  `合计 ${rows.length} 个文件、${totHan} 汉字，命中 ${totHit} 处（每万字 ${((totHit / totHan) * 10000).toFixed(0)}）`,
);
console.log('这只是嫌疑，不是判决 —— 每一条都要人读过才算数。');
