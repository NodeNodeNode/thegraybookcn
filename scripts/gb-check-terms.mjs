// gb:check-terms —— 术语一致性检查。
//
// 术语表的三层防漂移机制里的第二层（事后校验）。第一层是翻译前注入的页面术语卡，
// 第三层是「新术语没进表这页就不算完」的棘轮规则。
//
// 检查跑在 proseOnly 之上：代码块、链接地址、HTML 属性都已屏蔽，
// 所以 nuget.org 这类不会误报。
import fs from 'node:fs';
import path from 'node:path';
import {load} from 'js-yaml';
import {ROOT, DOCS, listMarkdown, proseOnly} from './lib/md.mjs';

const {terms} = load(fs.readFileSync(path.join(ROOT, 'translation/terms.yml'), 'utf8'));
const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((p) => path.relative(DOCS, path.resolve(p)))
  : listMarkdown(DOCS);

const findings = [];
let report = () => {};

const linesOf = (text) => text.split('\n');
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** 英文词要求词边界，中文词不需要（中文没有空格分词） */
const wordRe = (s, flags) =>
  /^[\x20-\x7e]+$/.test(s)
    ? new RegExp(`(?<![A-Za-z0-9])${escapeRe(s)}(?![A-Za-z0-9])`, flags)
    : new RegExp(escapeRe(s), flags);

/**
 * 抑制注释：`<!-- gb-ignore T1 这里的 class 指其他语言的通用概念 -->`
 * 写在违规行的上一行或同一行，可选跟检查码（省略则抑制该行全部）。
 * 理由是必填的 —— 没有理由的抑制半年后没人知道能不能删。
 */
function suppressions(rawLines) {
  const map = new Map(); // line(1-based) -> Set(codes) | 'all'
  rawLines.forEach((text, i) => {
    const m = /<!--\s*gb-ignore(?:\s+([A-Z]\d(?:\s*,\s*[A-Z]\d)*))?\s+(\S.*?)\s*-->/.exec(text);
    if (!m) return;
    const codes = m[1] ? new Set(m[1].split(/\s*,\s*/)) : 'all';
    const stripped = text.replace(/<!--[\s\S]*?-->/, '').trim();
    // 注释独占一行 → 作用于下一行；跟在正文后面 → 作用于本行
    map.set(stripped === '' ? i + 2 : i + 1, codes);
  });
  return map;
}

for (const rel of files) {
  const abs = path.join(DOCS, rel);
  if (!fs.existsSync(abs)) continue;
  const raw = fs.readFileSync(abs, 'utf8');
  const prose = proseOnly(raw);
  const lines = linesOf(prose);
  const suppressed = suppressions(linesOf(raw));
  const isSuppressed = (line, code) => {
    const s = suppressed.get(line);
    return s === 'all' || (s instanceof Set && s.has(code));
  };
  report = (level, code, file, line, msg) => {
    if (!isSuppressed(line, code)) findings.push({level, code, file, line, msg});
  };

  for (const t of terms) {
    // 1. 明确禁用的错误译法/写法
    for (const bad of t.forbid ?? []) {
      const re = wordRe(bad, 'g');
      lines.forEach((text, i) => {
        if (re.test(text)) {
          report('error', 'T1', rel, i + 1, `禁用写法「${bad}」→ 应为「${t.zh ?? (t.case ?? [])[0]}」（${t.en}）`);
        }
        re.lastIndex = 0;
      });
    }

    // 2. 保留英文的术语，大小写必须正确
    if (t.status === 'keep-en' && t.case?.length) {
      const allowed = new Set(t.case);
      // 排除域名：链接文字里的 nuget.org 是专名，不该按术语大小写去改。
      // 这个例外必须和 gb:fix-terms 保持一致，否则会报出一个永远修不掉的项。
      const re = new RegExp(
        `(?<![A-Za-z0-9])(${escapeRe(t.en)}s?)(?![A-Za-z0-9]|\\.(?:org|com|net))`,
        'gi',
      );
      lines.forEach((text, i) => {
        for (const m of text.matchAll(re)) {
          if (!allowed.has(m[1])) {
            report('error', 'T1', rel, i + 1, `「${m[1]}」大小写不对 → 应为 ${t.case.join(' / ')}`);
          }
        }
      });
    }

    // 3. 该译却裸用了英文原词
    if (t.forbid_bare_en) {
      const re = wordRe(t.en, 'gi');
      lines.forEach((text, i) => {
        // 首次出现的双语并列形式 *Patch（草图）* 是合法的，跳过
        if (/\*[^*]*（[^）]*）\*/.test(text)) return;
        if (re.test(text)) {
          report('warn', 'T3', rel, i + 1, `中文语境裸用了英文「${t.en}」→ 应译为「${t.zh}」`);
        }
        re.lastIndex = 0;
      });
    }

    // 4. 尚未拍板的术语被用到了
    if (t.status === 'open') {
      const re = wordRe(t.en, 'gi');
      lines.forEach((text, i) => {
        if (re.test(text)) {
          report('warn', 'T4', rel, i + 1, `术语「${t.en}」尚未拍板（status: open），需先决定译法`);
        }
        re.lastIndex = 0;
      });
    }
  }
}

findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
for (const f of findings) {
  console.log(`docs/${f.file}:${f.line}: [${f.code}/${f.level}] ${f.msg}`);
}

const errors = findings.filter((f) => f.level === 'error').length;
const warns = findings.length - errors;
console.log(`\n检查 ${files.length} 个文件：${errors} error，${warns} warn`);

const open = terms.filter((t) => t.status === 'open');
if (open.length) {
  console.log(`\n待拍板术语 ${open.length} 个：${open.map((t) => t.en).join('、')}`);
}
process.exit(errors > 0 ? 1 : 0);
