// gb:upstream —— 建立/更新上游工作副本。
//
// 用 --filter=blob:none 部分克隆：拿到完整提交历史（重命名检测需要），
// blob 按需拉取。这份副本是 gitignored 的，上游正文绝不进我们的仓库。
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {UPSTREAM} from './lib/md.mjs';

const REPO = 'https://github.com/vvvv/The-Gray-Book';
const run = (args, cwd) =>
  execFileSync('git', args, {cwd, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8'});

if (!fs.existsSync(UPSTREAM)) {
  console.log(`克隆上游到 ${UPSTREAM} …`);
  run(['clone', '--filter=blob:none', REPO, UPSTREAM]);
} else {
  console.log('更新上游工作副本 …');
  run(['fetch', 'origin', 'master'], UPSTREAM);
  run(['checkout', '-q', 'origin/master'], UPSTREAM);
}

const head = run(['rev-parse', 'HEAD'], UPSTREAM).trim();
const when = run(['log', '-1', '--format=%ci'], UPSTREAM).trim();
console.log(`上游 HEAD ${head.slice(0, 10)}   ${when}`);
