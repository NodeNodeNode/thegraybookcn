---
title: 如何加入
origin: cn
---

欢迎来帮忙。先读一下[关于翻译](/intro) —— 尤其是「这些译文是 AI 翻译的」那一节，它决定了现在最需要的是什么样的帮助。

## 现在最需要的是校对，不是从头翻

上游导航里的每一页都已经有中文了。所以**最有价值的贡献不再是「认领一章来翻」，而是把读着别扭的地方改顺**。

具体来说，这几类问题最值得报：

| 类型 | 例子 |
|---|---|
| **译错了** | 意思与原文相反或偏离 —— 这类最要紧 |
| **术语不一致** | 同一个词在这页和那页叫法不同 |
| **读不懂** | 句子太长、语序像英文、代词指代不清 |
| **界面对不上** | 译文写的菜单项与你 vvvv 里看到的不一样 |
| **链接或图片坏了** | 点不开、显示不出来 |

你不需要懂 Docusaurus，也不需要通读全书。**遇到一处报一处就很好。**

## 最省事的三种方式

### 1. 在页面上直接改

每一页最下面有「编辑此页」，点开就是 GitHub 的在线编辑器。改完填一句说明、提交，就会生成一个 Pull Request。

**改一个字也欢迎**，不用凑数。

### 2. 开一个 issue

到 [github.com/NodeNodeNode/thegraybookcn/issues](https://github.com/NodeNodeNode/thegraybookcn/issues) 说明哪一页、哪一句、问题是什么。

### 3. 在 Discord 里说一声

[Discord](https://discord.com/invite/yBWCJQQ4Pq) 里直接讲也行，不必走 GitHub。或者发邮件到 [info@nodenodenode.net](mailto:info@nodenodenode.net)。

## 要动手改多一些内容的话

站点仓库：[github.com/NodeNodeNode/thegraybookcn](https://github.com/NodeNodeNode/thegraybookcn)

1. `fork` 仓库到你的账号，`clone` 到本地
2. `npm install`，然后 `npm start` 起本地预览
3. 新建一个分支：
   * 校对修正：`fix/[页面-问题]`，如 `fix/language-nodes-typo`
   * 新增内容：`docs/[页面]`，如 `docs/language-nodes`
4. 改完在本地跑一下检查（见下）
5. 提交并推送，创建 PR，在说明里简述改了什么
6. 等 Review；通过后会发布到线上

### 提交前跑一下这三条

```bash
npm run gb:check-terms     # 术语一致性
npm run gb:check-anchors   # 锚点
npm run build              # 断链会直接让构建失败
```

术语请照 [`translation/terms.yml`](https://github.com/NodeNodeNode/thegraybookcn/blob/main/translation/terms.yml)，文风照 [`TRANSLATION-STYLE.md`](https://github.com/NodeNodeNode/thegraybookcn/blob/main/TRANSLATION-STYLE.md)。

**如果你要新定一个术语**，请把它写进 `terms.yml`，和译文放在同一个提交里 —— 这是本项目的硬约束，没进表就不算改完。

想了解这套机制为什么长这样，见 [`ARCHITECTURE.md`](https://github.com/NodeNodeNode/thegraybookcn/blob/main/ARCHITECTURE.md)。

## 联系我们

有意长期参与的话，先发邮件到 [info@nodenodenode.net](mailto:info@nodenodenode.net) 或者到 [Discord](https://discord.com/invite/yBWCJQQ4Pq) 聊聊。
