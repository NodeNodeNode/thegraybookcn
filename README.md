# 灰皮书 · thegraybookcn

[vvvv gamma 中文文档](https://docs.nodenodenode.net)，[the gray book](https://thegraybook.vvvv.org/) 的中文站点。

上游是 [vvvv/The-Gray-Book](https://github.com/vvvv/The-Gray-Book)（DocFX + Markdig），本站用 [Docusaurus 3](https://docusaurus.io/) 构建。需要 Node.js 20 或更高版本。

## 三份文档，各管一段

| 文档 | 管什么 |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | **设计思路与已踩过的坑**。动手前先读这份 |
| [`TRANSLATION-STYLE.md`](TRANSLATION-STYLE.md) | 文风、排版、标点、链接规范 |
| [`translation/terms.yml`](translation/terms.yml) | 术语唯一真源（[`TERMINOLOGY.md`](TERMINOLOGY.md) 是它的产物，不要手改） |

## 上手

```bash
npm install
npm run gb:upstream    # 建立上游工作副本（.upstream/，gitignored）
npm start              # 本地开发；npm run start:lan 可在局域网访问
```

## 翻译工作流

```bash
npm run gb:status              # 覆盖率 + 谁过期了 + 谁还没翻
npm run gb:termcard <上游路径>  # 生成这一页用得上的术语卡
# … 翻译；新术语同 commit 进 translation/terms.yml（棘轮规则）
npm run gb:terms-doc           # 重新生成 TERMINOLOGY.md
npm run gb:gen-sidebar         # 从上游 toc.md 重新生成 sidebars.js
```

完整流程与每一步的理由见 [`ARCHITECTURE.md` §8](ARCHITECTURE.md)。

## 四道门槛

提交前一道都不要跳：

```bash
npm run gb:check-terms    # 术语一致性；看计数行，不要只看末尾
npm run gb:check-anchors  # 上游锚点是否都能解析到真实标题
npm run build             # onBrokenLinks + onBrokenAnchors 双 throw
```

外加三项人工核对（站内 slug、图片可达性、**列表条目计数**），见 [`ARCHITECTURE.md` §8](ARCHITECTURE.md)。

## 全部脚本

| 命令 | 作用 |
|---|---|
| `gb:upstream` | 建立/更新上游工作副本 |
| `gb:status` | 覆盖率与过期报告（blob 账本） |
| `gb:termcard` | 为某一页生成术语卡 |
| `gb:check-terms` | 术语一致性检查（T1–T4 + E1） |
| `gb:fix-terms` | 按术语表批量修正存量译文（只改正文区域） |
| `gb:terms-doc` | 从 `terms.yml` 生成 `TERMINOLOGY.md` |
| `gb:check-anchors` | 锚点门槛 |
| `gb:gen-sidebar` | 从上游 `toc.md` 生成 `sidebars.js` |
| `gb:migrate` | 结构迁移（一次性，默认 dry-run） |

## 构建与部署

```bash
npm run build     # 输出到 build/
npm run serve     # 本地预览构建产物
```

仓库里没有 CI 配置，`docs.nodenodenode.net` 的托管方式不在本仓库内描述。`package.json` 里保留了 Docusaurus 自带的 `npm run deploy`（推 `gh-pages` 分支），但当前部署未走这条路径。

## 生成物，不要手改

```
sidebars.js                      ← gb:gen-sidebar
TERMINOLOGY.md                   ← gb:terms-doc
translation/navbar-sections.json ← gb:gen-sidebar
```
