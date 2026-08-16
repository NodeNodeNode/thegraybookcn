# 维护手册

上游 [The-Gray-Book](https://github.com/vvvv/The-Gray-Book) 在持续更新，没有人会来通知我们。这份文档规定**怎么发现**、**怎么跟进**。

设计目标只有一个：**不再依赖「谁记得去看一眼」。** 这个站上一次就是这么停了四年。

---

## 一、节奏

| 频率 | 做什么 | 谁 |
|---|---|---|
| 每周一（自动） | CI 巡检上游，有漂移就写进固定 issue | 机器 |
| 收到 issue 后 | 按下面四步跟进 | 维护者 |
| 每季度 | 顺手做一次体检（§5） | 维护者 |

**实测漂移率约 6 页 / 3 个月**，也就是平均每两周不到一页。所以每周巡检足够，每天跑只会变成没人看的噪音。

---

## 二、自动巡检

`.github/workflows/upstream-check.yml`，每周一 03:00 UTC（北京时间 11:00）跑一次，也可以在 Actions 页面手动触发。

**有漂移才出声**：把 `gb:diff` 的输出写进一个标题固定的 issue（标签 `upstream-drift`），列出改了哪几页、上游动过几次、规模多大、diff 在哪看。没漂移就什么都不做。

同一个 issue **反复复用**，不会每周新开一个把仓库淹掉。

> 首次启用时需要在仓库里建一个 `upstream-drift` 标签，或者让 Action 第一次运行时自动创建。

---

## 三、跟进上游改动：看 → 判 → 改 → 记

### 1. 看：上游到底改了什么

```bash
npm run gb:upstream                              # 更新上游副本
npm run gb:diff                                  # 全部过期页的摘要
npm run gb:diff reference/hde/exporting.md       # 单页的完整 diff
```

`gb:diff` 会沿着这个文件的提交历史回溯，找到我们那一版对应的 commit，然后告诉你：

```
reference/hde/exporting.md
  译文 docs/reference/hde/exporting.md
  自我们翻译以来，上游动过 1 次：
    2026-05-19  0325716  Update exporting.md  — joreg
  规模：+5 −1 行
  网页比对：https://github.com/vvvv/The-Gray-Book/compare/c4a862a5f6...HEAD
```

### 2. 判：这是哪一类改动

| 上游改了什么 | 怎么处理 |
|---|---|
| 英文错别字、标点、措辞微调 | **译文往往不用动**，直接跳到第 4 步回填账本 |
| 加了一两句 / 加了一个列表项 | 增量补译，别重翻整页 |
| 加了一整节 | 补那一节；顺便确认新标题的锚点钉了上游值 |
| 结构重排（标题级别、顺序变了） | 对齐结构，注意锚点跟着上游走 |
| 整页重写 | 整页重译，按 [`ARCHITECTURE.md` §8](ARCHITECTURE.md) 的流程 |
| 只改了图片路径 | 我们用的是绝对 URL，通常不受影响，确认图片仍可达即可 |

**「规模：+5 −1 行」这个数字是最快的分流依据。**

### 3. 改：动译文

照 [`TRANSLATION-STYLE.md`](TRANSLATION-STYLE.md)。新术语记得同一个提交进 [`translation/terms.yml`](translation/terms.yml)（棘轮规则）。

`terms.yml` 一改，**两个产物都要重新生成并一起提交**：

```bash
npm run gb:terms-doc        # → TERMINOLOGY.md
npm run gb:gen-searchdict   # → translation/search-dict.txt（搜索分词词典）
```

漏了后者不会报错，只会让新术语在搜索里被切碎、排序变差 —— 是那种半年后才被发现的退化。

### 4. 记：回填账本

```bash
npm run gb:touch reference/hde/exporting.md
```

它只改 frontmatter 里的 `source_blob` 和 `last_synced` 两行，正文一个字不碰。

> [!WARNING]
> **没有真正跟进就跑 `gb:touch`，等于把这次漂移永久抹掉** —— 以后再也不会有任何机制提醒你这一页落后了。这比忘记回填危险得多。
>
> `--all` 只在一种情况下是对的：你确认这批改动对译文没有影响（比如上游只动了英文的错别字）。

### 5. 提交前跑门槛

```bash
npm run gb:check-terms    # 看计数行，不要只看末尾
npm run gb:check-anchors
npm run build             # 断链与坏锚点会直接失败
```

---

## 四、几种特殊情况

### 上游新增了页面

`gb:status` 会把它列进「未翻译」。翻不翻由内容价值决定，但两类**不要翻**：

* 上游只有标题没有正文的空壳
* 不在上游任何 `toc.md` 里的页面（官网点不到，`gb:status` 会单独列出来）

翻完之后：

```bash
npm run gb:gen-sidebar    # 让它进侧边栏
```

别忘了先在 `translation/sidebar-labels.json` 里补中文标签。

### 上游删除或改名了页面

`gb:status` 报「失联」，`gb:diff` 会提示：

```bash
git -C .upstream log --follow --diff-filter=RD -- <旧路径>
```

* **改名** → 改我们译文 frontmatter 里的 `source_path`，然后 `gb:touch`
* **删除** → 我们这页也删掉，并确认没有别的页面还链着它（`npm run build` 会拦）

⚠️ 改 `source_path` 时，**不要顺手改 `slug`** —— slug 是对外 URL，改了会断掉外部链接和搜索引擎收录。路径服务于同步，URL 服务于读者，两件事解耦。

### 上游改了 `toc.md`（目录结构变了）

```bash
npm run gb:gen-sidebar
```

侧边栏是生成的，会自动跟上。但要留意两点：

* 新出现的分组标题需要在 `sidebar-labels.json` 里补中文
* 若某页被挂到了两个位置，第二次会降级成普通链接 —— 这条路径踩过坑，见 [`ARCHITECTURE.md` §6.6](ARCHITECTURE.md)

### 上游历史被重写

`gb:diff` 会说「在上游历史里找不到我们记录的那个版本」。这时只能人工看那一页的提交历史，判断改了什么，然后照常处理。

---

## 五、季度体检

不紧急，但攒着不做会慢慢烂掉：

```bash
npm run gb:status         # 覆盖率、失联、导航外页面
npm run gb:check-terms    # 应该是 0 error
npm run gb:check-anchors
npm run build
```

再加三件机器查不了的：

| 查什么 | 怎么查 |
|---|---|
| 术语表有没有「待拍板」积压 | `TERMINOLOGY.md` 末尾会列 `open` 条目，应为 0 |
| 图片还可达吗 | 抽查上游图片 URL（上游偶尔会挪图） |
| 依赖有没有安全告警 | `npm audit`；Docusaurus 大版本升级要单独排期 |

---

## 六、维护者要知道的三件事

1. **先读 [`ARCHITECTURE.md`](ARCHITECTURE.md)。** 那里记着 13 个已经踩过的坑，其中大半是**静默失效**型的 —— 不报错、不断链、构建照过，只是内容悄悄烂掉。不读一遍会重新踩。

2. **门槛不要跳。** 术语、锚点、构建三道，加上人工的站内 slug 比对、图片可达性、列表条目计数。最后一项在条目密集的页面几乎是唯一可靠的完整性检查。

3. **`gb:check-terms` 要看计数行**，不要只看输出末尾 —— 这个坑我们踩过，末尾只有「待拍板 N 个」，11 个 error 就在上面被漏掉了。

---

## 七、命令速查

| 命令 | 什么时候用 |
|---|---|
| `npm run gb:upstream` | 每次跟进之前，更新上游副本 |
| `npm run gb:status` | 全局：覆盖率、谁过期、谁失联 |
| `npm run gb:diff [路径]` | **上游改了什么** —— 跟进的起点 |
| `npm run gb:touch <路径>` | 跟进完了，回填账本 |
| `npm run gb:termcard <路径>` | 翻某页之前，生成术语卡 |
| `npm run gb:check-terms` | 术语一致性 |
| `npm run gb:check-anchors` | 锚点 |
| `npm run gb:gen-sidebar` | 目录变了 / 新翻了页面 |
| `npm run gb:terms-doc` | 改过 `terms.yml` 之后 |
| `npm run gb:gen-searchdict` | 改过 `terms.yml` 之后（同上，两个都要跑） |
| `npm run build` | 提交前，双 throw 门槛 |
