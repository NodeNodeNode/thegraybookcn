// gb:check-rewrite —— 润色散文时的不变量断言。
//
// 大规模改写散文最大的风险不是改得不好看，是**顺手改坏了结构**：
// 动了锚点（静默断掉全站深链）、动了链接、少了一条列表项、碰了代码块。
// 这些都不会让构建失败，只会安静地烂掉。
//
// 这个脚本把「只改散文、不动结构」从「我很小心」变成机器保证：
// 对工作区里每个改动过的 md，与 git HEAD 的版本逐项比对不变量。
//
// 用法
//   npm run gb:check-rewrite            比对工作区 vs HEAD
//   npm run gb:check-rewrite <ref>      比对工作区 vs 指定提交
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT} from './lib/md.mjs';

const BASE = process.argv[2] ?? 'HEAD';
const git = (...args) =>
  execFileSync('git', ['-C', ROOT, ...args], {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024});

const changed = git('diff', '--name-only', BASE, '--', 'docs')
  .split('\n')
  .filter((f) => /\.mdx?$/.test(f));

if (!changed.length) {
  console.log(`docs/ 下没有相对 ${BASE} 改动过的 md 文件。`);
  process.exit(0);
}

/** 从一份 markdown 里抽出所有「结构不变量」 */
function invariants(s) {
  const norm = s.replace(/\r\n/g, '\n');
  return {
    // 围栏代码块的内容，逐字
    code: (norm.match(/^```[\s\S]*?^```/gm) ?? []).map((b) => b.trim()),
    // 行内代码
    inline: (norm.match(/(`+)(?:(?!\1)[^\n])*\1/g) ?? []).sort(),
    // 显式标题锚点 —— 改了会静默断掉全站深链
    anchors: (norm.match(/\{#[^}]*\}/g) ?? []).sort(),
    // 链接与图片的目标地址（不含链接文字，文字是散文、允许改）
    urls: [...norm.matchAll(/\]\(([^)]*)\)/g)].map((m) => m[1]).sort(),
    // 列表条目数 —— 少一条就是漏译，这是条目密集页唯一可靠的完整性检查
    bullets: (norm.match(/^\s*(?:[*+-]|\d+\.)\s/gm) ?? []).length,
    // frontmatter 逐字
    front: /^---\n[\s\S]*?\n---/.exec(norm)?.[0] ?? '',
    // 标题层级序列（文字可改，级别不能改）
    levels: (norm.match(/^#{1,6}(?= )/gm) ?? []).join(','),
  };
}

const LABEL = {
  code: '围栏代码块内容',
  inline: '行内代码',
  anchors: '标题锚点 {#…}',
  urls: '链接／图片地址',
  bullets: '列表条目数',
  front: 'frontmatter',
  levels: '标题层级',
};

let bad = 0;
for (const rel of changed) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.log(`  ⚠️  ${rel} 已删除，跳过`);
    continue;
  }
  const before = invariants(git('show', `${BASE}:${rel}`));
  const after = invariants(fs.readFileSync(abs, 'utf8'));

  const diffs = [];
  for (const k of Object.keys(LABEL)) {
    const a = JSON.stringify(before[k]);
    const b = JSON.stringify(after[k]);
    if (a !== b) diffs.push([k, before[k], after[k]]);
  }

  if (!diffs.length) {
    console.log(`  ✓ ${rel}`);
    continue;
  }
  bad++;
  console.log(`  ✗ ${rel}`);
  for (const [k, a, b] of diffs) {
    if (k === 'bullets') {
      console.log(`      ${LABEL[k]}：${a} → ${b}`);
      continue;
    }
    if (Array.isArray(a)) {
      const setA = new Set(a.map(String));
      const setB = new Set(b.map(String));
      const gone = [...setA].filter((x) => !setB.has(x));
      const add = [...setB].filter((x) => !setA.has(x));
      console.log(`      ${LABEL[k]}：`);
      gone.slice(0, 4).forEach((x) => console.log(`        − ${x.slice(0, 90)}`));
      add.slice(0, 4).forEach((x) => console.log(`        + ${x.slice(0, 90)}`));
      if (gone.length + add.length > 8) console.log(`        …共 ${gone.length + add.length} 处`);
    } else {
      console.log(`      ${LABEL[k]}：有改动`);
    }
  }
}

console.log(`\n检查 ${changed.length} 个改动过的文件：${bad} 个动了结构`);
if (bad) {
  console.log('润色只应改散文。上面这些是结构，改了它们要么断链、要么漏内容。');
  process.exit(1);
}
console.log('结构不变量全部保持 —— 只改了散文。');
