// gb:terms-doc —— 从 terms.yml 生成人类可读的 TERMINOLOGY.md。
// terms.yml 是唯一真源，这份是产物，不要手改。
import fs from 'node:fs';
import path from 'node:path';
import {load} from 'js-yaml';
import {ROOT} from './lib/md.mjs';

const {terms} = load(fs.readFileSync(path.join(ROOT, 'translation/terms.yml'), 'utf8'));

const label = {
  decided: '已拍板',
  provisional: '暂定',
  'keep-en': '保留英文',
  open: '**待拍板**',
};
const cell = (s) => (s ?? '').toString().replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

const rows = terms.map((t) => {
  const zh = t.status === 'keep-en' ? `（保留 ${(t.case ?? [t.en]).join(' / ')}）` : (t.zh ?? '—');
  const rules = [
    t.forbid?.length ? `禁用：${t.forbid.join('、')}` : null,
    t.forbid_bare_en ? '禁止裸用英文' : null,
    t.first_use ? '首次出现用双语并列' : null,
    t.scope ? `仅限 ${t.scope}` : null,
  ].filter(Boolean);
  return `| \`${cell(t.en)}\` | ${cell(zh)} | ${label[t.status] ?? t.status} | ${cell(rules.join('；')) || '—'} | ${cell(t.note) || '—'} |`;
});

const open = terms.filter((t) => t.status === 'open');

const out = `# 术语对照表

<!-- 本文件由 \`npm run gb:terms-doc\` 从 translation/terms.yml 生成，不要手改。 -->

唯一真源是 [\`translation/terms.yml\`](translation/terms.yml)。改术语请改那份，然后重新生成本文。

翻译时不需要通读本表 —— \`gb:termcard\` 会针对当前页面生成一份不超过 30 条的术语卡。
本表用于查阅与审校。

共 ${terms.length} 条，其中待拍板 ${open.length} 条。

${open.length ? `> **开工前需拍板**：${open.map((t) => `\`${t.en}\``).join('、')}\n> 这些词 \`status\` 为 \`open\`，检查器会对它们的使用报 warn。\n` : ''}
| 英文 | 中文 | 状态 | 规则 | 说明 |
|---|---|---|---|---|
${rows.join('\n')}
`;

fs.writeFileSync(path.join(ROOT, 'TERMINOLOGY.md'), out);
console.log(`已生成 TERMINOLOGY.md：${terms.length} 条术语，${open.length} 条待拍板`);
