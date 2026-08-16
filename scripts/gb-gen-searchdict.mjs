// gb:gen-searchdict —— 从 terms.yml 生成 jieba 用户词典 translation/search-dict.txt。
// terms.yml 是唯一真源，这份是产物，不要手改。
//
// 为什么需要它：jieba 的默认词典不认识本书的复合术语，「数据枢纽」会被切成
// 「数据」+「枢纽」，「节点浏览器」切成「节点」+「浏览器」。搜是搜得到，但
// 命中会被一堆只含「数据」或「节点」的页面稀释，真正该排第一的页反而沉下去。
// 把术语表喂进去，这些词就作为整体参与索引与查询。
//
// 词典格式是 jieba 的标准三列：`词 频次 词性`。频次给得高，是为了压过默认
// 词典里那些更短的词 —— 只有当整词的分数高于拆开的组合时，切分才会保住它。
//
// 坑：产物里**一行注释都不能写**。jieba 的 load_dict 在 Rust 侧逐行按三列解析，
// 遇到 `#` 开头的行会 parse int 失败，然后 unwrap 直接 panic —— 而且是
// non-unwinding panic，整个 node 进程 abort，构建看不到任何有用的错误信息
// （只有一段 Rust backtrace）。所以出处说明只能放在本脚本和文档里，不能放进产物。
import fs from 'node:fs';
import path from 'node:path';
import {load} from 'js-yaml';
import {ROOT} from './lib/md.mjs';

const OUT = 'translation/search-dict.txt';
const FREQ = 10000; // 远高于默认词典中任何单字/双字词，确保整词胜出
const {terms} = load(fs.readFileSync(path.join(ROOT, 'translation/terms.yml'), 'utf8'));

// 只收纯汉字词。「静态 Operation」这类含空格和拉丁字母的条目进不了 jieba 词典
// （格式按空格分列，词里带空格会被解析成 词+频次），单字词交给默认词典即可。
const isPureHan = (s) => /^[一-鿿]+$/.test(s);

const words = [
  ...new Set(
    terms
      .map((t) => (t.zh ?? '').trim())
      .filter((zh) => zh && isPureHan(zh) && zh.length >= 2),
  ),
].sort();

const skipped = terms
  .map((t) => (t.zh ?? '').trim())
  .filter((zh) => zh && !(isPureHan(zh) && zh.length >= 2));

const out = words.map((w) => `${w} ${FREQ} n`).join('\n') + '\n';
const abs = path.join(ROOT, OUT);

// --check：只比对不写盘。改了 terms.yml 却忘了重新生成，是那种不报错、
// 只是让新术语在搜索里被切碎的静默退化 —— 有这个模式才谈得上被门槛拦住。
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
  if (cur !== out) {
    console.error(`✗ ${OUT} 与 terms.yml 不同步，请跑 \`npm run gb:gen-searchdict\``);
    process.exit(1);
  }
  console.log(`✓ ${OUT} 与 terms.yml 同步（${words.length} 条）`);
  process.exit(0);
}

fs.writeFileSync(abs, out);
console.log(`已生成 ${OUT}：${words.length} 条`);
if (skipped.length) {
  console.log(`跳过 ${skipped.length} 条（非纯汉字或单字）：${skipped.join('、')}`);
}
