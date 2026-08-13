# 灰皮书中文版 · thegraybookcn

**[docs.nodenodenode.net](https://docs.nodenodenode.net)** —— vvvv gamma 官方文档 [the gray book](https://thegraybook.vvvv.org/) 的社区中文翻译。

由 vvvv 中文社区维护，非官方站点。上游导航里的每一页，这里都有对应的中文。

---

## 这些译文是 AI 翻译的

我们用 AI 做初翻，再配合人工审校和一套机器检查（术语一致性、锚点、链接、渲染）来兜底。

理由很直接：灰皮书有十几万词，靠零散的业余时间逐页人译，现实里的结果是**翻到一半就停了，然后上游又跑远了** —— 这个站此前就停了四年。AI 让「全部覆盖」和「跟上更新」第一次变得可能。

代价也要说清楚：**有些地方会生硬，有些地方会走味，个别地方可能理解错了。** 术语我们锁得很死（一份机器可读的术语表在把关），但语感和上下文判断，AI 仍然不如一个真正用过这个功能的人。

**所以这个仓库最需要的贡献，不是「认领一章来翻」，而是把读着别扭的地方改顺。**

## 读着不顺？来帮我们改

按顺手程度排，随便挑一种：

| 方式 | 怎么做 |
|---|---|
| **直接改** | 每页底部有「编辑此页」，点开就是 GitHub 在线编辑器。**改一个字也算** |
| **开 issue** | [提一个 issue](https://github.com/NodeNodeNode/thegraybookcn/issues)，说明哪页哪句、问题是什么 |
| **说一声** | 到 [Discord](https://discord.com/invite/yBWCJQQ4Pq) 或发邮件到 <info@nodenodenode.net> |

哪怕只是「这句我读了三遍没读懂」，对我们也是有用的信息 —— 读不懂本身就是要修的缺陷。

每一页正文最上面都有「源文档地址」，一点就能对照英文原文。**拿不准时以原文为准。**

完整贡献流程见站上的[如何加入](https://docs.nodenodenode.net/about-translation/how-to-join)。

---

## 给要动手改仓库的人

站点用 [Docusaurus 3](https://docusaurus.io/) 构建，需要 Node.js 20 或更高版本。

```bash
npm install
npm run gb:upstream    # 建立上游工作副本（.upstream/，gitignored）
npm start              # 本地预览；npm run start:lan 可在局域网访问
```

### 五份文档，各管一段

| 文档 | 管什么 |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | **设计思路与已踩过的坑**。改动工具链前先读这份 |
| [`MAINTENANCE.md`](MAINTENANCE.md) | **上游更新之后怎么跟进**。日常维护看这份 |
| [`TRANSLATION-STYLE.md`](TRANSLATION-STYLE.md) | 文风、排版、标点、链接规范 |
| [`translation/terms.yml`](translation/terms.yml) | 术语唯一真源（[`TERMINOLOGY.md`](TERMINOLOGY.md) 是它的产物，不要手改） |
| 站上的[协作规范](https://docs.nodenodenode.net/about-translation/translation-standard) | 给校对者看的精简版 |

### 提交前跑这三条

```bash
npm run gb:check-terms    # 术语一致性；看计数行，不要只看末尾
npm run gb:check-anchors  # 上游锚点是否都能解析到真实标题
npm run build             # 断链与坏锚点会直接让构建失败
```

**新定的术语必须写进 `translation/terms.yml`，和译文放在同一个提交里。** 没进表就不算改完 —— 这是硬约束，检查器会拦。

### 与上游同步

上游是 [vvvv/The-Gray-Book](https://github.com/vvvv/The-Gray-Book)（DocFX + Markdig）。每页 frontmatter 里记着当时上游文件的 git blob SHA，据此判断谁过期了：

```bash
npm run gb:upstream    # 更新上游副本
npm run gb:status      # 覆盖率 + 谁过期了 + 谁还没翻
npm run gb:diff        # 上游具体改了什么
npm run gb:touch <路径> # 跟进完之后回填账本
```

仓库里有一个每周自动巡检上游的 GitHub Action，发现漂移会写进一个固定的 issue，**不依赖谁记得去看一眼**。

实测漂移率约 6 页 / 3 个月。跟进流程见 [`MAINTENANCE.md`](MAINTENANCE.md)，原理与设计取舍见 [`ARCHITECTURE.md`](ARCHITECTURE.md)。

### 全部脚本

| 命令 | 作用 |
|---|---|
| `gb:upstream` | 建立/更新上游工作副本 |
| `gb:status` | 覆盖率与过期报告 |
| `gb:diff` | 上游改了什么（跟进的起点） |
| `gb:touch` | 跟进完之后回填账本 |
| `gb:termcard` | 为某一页生成术语卡 |
| `gb:check-terms` | 术语一致性检查 |
| `gb:fix-terms` | 按术语表批量修正存量译文（只改正文区域） |
| `gb:terms-doc` | 从 `terms.yml` 生成 `TERMINOLOGY.md` |
| `gb:check-anchors` | 锚点门槛 |
| `gb:check-rewrite` | 润色时断言只改了散文，没动结构 |
| `gb:prose-smell` | 翻译腔嫌疑定位（只提示，不进门槛） |
| `gb:gen-sidebar` | 从上游 `toc.md` 生成 `sidebars.js` |
| `gb:migrate` | 结构迁移（一次性，默认 dry-run） |

### 生成物，不要手改

```
sidebars.js                      ← gb:gen-sidebar
TERMINOLOGY.md                   ← gb:terms-doc
translation/navbar-sections.json ← gb:gen-sidebar
```

### 构建与部署

```bash
npm run build     # 输出到 build/
npm run serve     # 本地预览构建产物
```

仓库里唯一的 CI 是上游漂移巡检（不参与部署）。`docs.nodenodenode.net` 的托管方式不在本仓库内描述。`package.json` 里保留了 Docusaurus 自带的 `npm run deploy`（推 `gh-pages` 分支），但当前部署未走这条路径。

---

## 许可与署名

译文由 vvvv 中文社区维护，原文版权归 [vvvv group](https://vvvv.org/) 所有。本站为非官方社区翻译。

界面标题字体为 Fusion Pixel 12 的子集（`static/fonts/`），OFL 许可。
