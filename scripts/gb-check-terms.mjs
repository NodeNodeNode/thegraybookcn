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
import {
  ROOT,
  DOCS,
  listMarkdown,
  proseOnly,
  suppressionsOf,
  maskCode,
  maskFrontmatter,
  normalizeEol,
} from './lib/md.mjs';

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

for (const rel of files) {
  const abs = path.join(DOCS, rel);
  if (!fs.existsSync(abs)) continue;
  const raw = fs.readFileSync(abs, 'utf8');
  // 双语标题 `## English / 中文` 的英文半边是设计如此，不该按中文正文的规则去查。
  // 只保留 “ / ” 之后的中文部分参与检查。
  const prose = linesOf(proseOnly(raw))
    .map((line) => {
      const h = /^(#{1,6}[ \t]+)(.*)$/.exec(line);
      if (!h) return line;
      const slash = h[2].lastIndexOf(' / ');
      if (slash === -1) return line;
      return ' '.repeat(h[1].length + slash + 3) + h[2].slice(slash + 3);
    })
    .join('\n');
  const lines = linesOf(prose);
  const isSuppressed = suppressionsOf(raw);
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
      // 后面紧跟另一个大写开头的词时跳过：那是专有名称的一部分（如界面上的
      // 「Patch Explorer」），不是该译却没译。这类专名在后续章节会大量出现，
      // 逐处抑制不现实，规则本身要认得出来。
      const re = new RegExp(
        `(?<![A-Za-z0-9])${escapeRe(t.en)}(?![A-Za-z0-9])(?![ \\t][A-Z])`,
        'gi',
      );
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

  // E1：强调标记闭合失败 —— 这是渲染 bug，不是风格问题，所以是 error。
  //
  // CommonMark 要求收尾的 `*`/`**` 是 right-flanking：前面不能是空白；若前面是标点，
  // 则后面必须是空白或标点。中文里写 `*Patch（草图）*是` 时，收尾星号前面是全角 `）`、
  // 后面紧跟汉字，两个条件都不满足 —— 无法闭合，页面上原样显示裸星号。
  //
  // 这个坑与「全角括号内外不加空格」的排版约定天然互斥，只靠人眼绝对防不住：
  // 它不报错、不断链、构建照过，只是安静地把标记漏出来。
  const isSpace = (c) => c === '' || /\s/.test(c);
  const isPunct = (c) => c !== '' && /[\p{P}\p{S}]/u.test(c);
  // flanking 判定看的是相邻字符的「性质」，所以不能用 proseOnly 那份 —— 它把行内代码
  // 换成了空格，会让 `` `mainloop`* `` 这种本来正常的写法被误判成「收尾符前是空白」。
  // 这里另做一份：围栏代码整行清空，行内代码替换成等长的字母（保住「非空白非标点」这个性质）。
  const flankLines = maskCode(maskFrontmatter(normalizeEol(raw)))
    .split('\n')
    .map((line, i) =>
      /^\s*$/.test(line)
        ? line
        : normalizeEol(raw).split('\n')[i].replace(/`[^`\n]*`/g, (m) => 'x'.repeat(m.length)),
    );
  flankLines.forEach((rawLine, i) => {
    // 先抹掉行首的列表项目符号，否则 `* *String*：默认` 里的项目符号会被
    // 当成开标记，和后面那个 `*` 配成一对，产生误报。
    const text = rawLine.replace(/^(\s*)[*+-](\s)/, '$1 $2');
    for (const m of text.matchAll(/(\*{1,2})([^*\n]+?)\1/g)) {
      // 开标记必须 left-flanking：后面不能是空白。不满足就根本不是一次强调尝试。
      const openNext = m[2][0] ?? '';
      const openPrev = text[m.index - 1] ?? '';
      const leftFlanking =
        !isSpace(openNext) && (!isPunct(openNext) || isSpace(openPrev) || isPunct(openPrev));
      if (!leftFlanking) continue;

      const prev = m[2].slice(-1);
      const next = text[m.index + m[0].length] ?? '';
      const rightFlanking = !isSpace(prev) && (!isPunct(prev) || isSpace(next) || isPunct(next));
      if (!rightFlanking) {
        report(
          'error',
          'E1',
          rel,
          i + 1,
          `强调标记闭合失败，页面会显示裸星号：${m[0]}${next}` +
            `（收尾符前是「${prev}」后是「${next}」）→ 把中文移到标记外，写成 *English*（中文）`,
        );
      }
    }
  });
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
