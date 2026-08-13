// gb:diff —— 上游改了什么。
//
// gb:status 只告诉你「这页过期了」，但决定怎么处理需要知道改了什么：
// 改个错别字和重写一整节，工作量差两个数量级。这个脚本回答后一个问题。
//
// 用法
//   npm run gb:diff                          全部过期页的摘要
//   npm run gb:diff reference/hde/gui.md     单页的完整 diff
//
// 实现要点：我们账本里记的是 blob（文件内容指纹），不是 commit。
// 要找出「自我们翻译以来上游动过哪几次」，得沿着这个文件的提交历史往回走，
// 找到最后一次内容仍等于我们记录值的那个 commit —— 它之后的提交就是待审的改动。
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import matter from '@11ty/gray-matter';
import {UPSTREAM, DOCS, listMarkdown} from './lib/md.mjs';

const REPO = 'https://github.com/vvvv/The-Gray-Book';

if (!fs.existsSync(UPSTREAM)) {
  console.error('缺少 .upstream/，先跑 npm run gb:upstream');
  process.exit(2);
}

const git = (...args) =>
  execFileSync('git', ['-C', UPSTREAM, ...args], {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024});
const gitQuiet = (...args) => {
  try {
    return git(...args);
  } catch {
    return null;
  }
};

/** 本地账本：上游路径 → {本地文件, 记录的 blob} */
const ledger = new Map();
for (const rel of listMarkdown(DOCS)) {
  const {data} = matter(fs.readFileSync(path.join(DOCS, rel), 'utf8'));
  if (data.origin === 'cn' || !data.source_path) continue;
  ledger.set(data.source_path, {
    local: rel,
    blob: data.source_blob == null ? null : String(data.source_blob),
  });
}

/**
 * 自 recordedBlob 以来，这个文件被哪些提交动过。
 * 返回 {commits, oldCommit}；oldCommit 是我们那份内容最后仍然成立的提交。
 * 找不到（比如上游改过名、或历史被重写）时 commits 为 null —— 调用方要能接住。
 */
function commitsSince(srcPath, recordedBlob) {
  const log = gitQuiet('log', '--format=%H', '--', srcPath);
  if (!log) return {commits: null, oldCommit: null};
  const hashes = log.trim().split('\n').filter(Boolean);
  const newer = [];
  for (const h of hashes) {
    const blob = gitQuiet('rev-parse', `${h}:${srcPath}`)?.trim();
    if (blob === recordedBlob) return {commits: newer, oldCommit: h};
    newer.push(h);
  }
  return {commits: null, oldCommit: null}; // 历史里从来没出现过这个 blob
}

const meta = (h) => git('show', '-s', '--format=%h|%ad|%an|%s', '--date=short', h).trim().split('|');

/** 过期页 = 账本里记的 blob 与当前上游不一致 */
const outdated = [];
for (const [src, e] of ledger) {
  const cur = gitQuiet('rev-parse', `HEAD:${src}`)?.trim();
  if (!cur) {
    outdated.push({src, ...e, cur: null, gone: true});
  } else if (e.blob && e.blob !== cur) {
    outdated.push({src, ...e, cur});
  }
}

const only = process.argv[2];
const targets = only ? outdated.filter((o) => o.src === only) : outdated;

if (only && targets.length === 0) {
  const inLedger = ledger.has(only);
  console.log(
    inLedger ? `${only} 没有过期，与当前上游一致。` : `账本里没有 ${only}，检查一下路径。`,
  );
  process.exit(0);
}

if (outdated.length === 0) {
  console.log(`上游 HEAD ${git('rev-parse', 'HEAD').trim().slice(0, 10)}`);
  console.log('没有过期页面 —— 全部译文与当前上游一致。');
  process.exit(0);
}

console.log(`上游 HEAD ${git('rev-parse', 'HEAD').trim().slice(0, 10)}`);
console.log(`过期 ${outdated.length} 页${only ? `（只看 ${only}）` : ''}\n`);

for (const o of targets) {
  console.log('─'.repeat(72));
  console.log(o.src);
  console.log(`  译文 docs/${o.local}`);

  if (o.gone) {
    console.log('  ⚠️  上游已删除或改名 —— 需要人工重新映射 source_path');
    console.log(`  查改名：git -C .upstream log --follow --diff-filter=RD -- ${o.src}`);
    console.log();
    continue;
  }

  const {commits, oldCommit} = commitsSince(o.src, o.blob);

  if (commits === null) {
    console.log('  ⚠️  在上游历史里找不到我们记录的那个版本');
    console.log('     （上游可能重写过历史，或这一页曾被改名后合并）');
    console.log(`     人工比对：${REPO}/commits/master/${o.src}`);
    console.log();
    continue;
  }

  console.log(`  自我们翻译以来，上游动过 ${commits.length} 次：`);
  for (const h of commits.slice().reverse()) {
    const [short, date, who, subj] = meta(h);
    console.log(`    ${date}  ${short}  ${subj}  — ${who}`);
  }

  // 改动规模：决定这是顺手改还是要重译
  const stat = gitQuiet('diff', '--numstat', `${oldCommit}..HEAD`, '--', o.src)?.trim();
  if (stat) {
    const [add, del] = stat.split('\t');
    console.log(`  规模：+${add} −${del} 行`);
  }
  console.log(`  网页比对：${REPO}/compare/${oldCommit.slice(0, 10)}...HEAD`);
  console.log(`  本地细看：git -C .upstream diff ${oldCommit.slice(0, 10)}..HEAD -- ${o.src}`);

  if (only) {
    console.log();
    const d = gitQuiet('diff', `${oldCommit}..HEAD`, '--', o.src);
    console.log(d ?? '  （无内容差异，可能只是行尾或权限变化）');
  }
  console.log();
}

if (!only) {
  console.log('─'.repeat(72));
  console.log('看某一页的完整 diff：npm run gb:diff <上游路径>');
}
