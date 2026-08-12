---
title: Packman / 包管理器
slug: /develop-environment/packman
source_path: reference/hde/packman.md
source_blob: ff424bf7e8de9ee90d10567955bd97864a16b8cd
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/packman.html)

目前可在 **[vvvv gamma 8.0 预览版](https://vvvv.org/download)** 中试用。

![](https://thegraybook.vvvv.org/images/reference/hde/packman.png)

## Basic Usage / 基本用法 {#basic-usage}

日常使用需要知道的其实不多：

- 按 `Ctrl` `+` `F3` 打开 Packman
- 切到 “Browse…” 标签页
- 找到你想用的包
- 点蓝色的 “Add” 按钮，下载并把它引用到当前文档
- 完成

之后你保存这个 vl 文档、在另一台电脑上打开时，vvvv 会自动把所有被引用的包下载下来。

包下载到哪里去了？好消息是：**你不用管**（在系统的某个 NuGet 缓存里）。早期版本里需要你自己维护的 `\nugets` 文件夹，在 vvvv gamma 8.x 之后已经不起任何作用了。

入门知道这些基本就够了。

## Updates / 更新 {#updates}

接下来你可能遇到的情况是：你引用的某个包发布了新版本。Packman 会这样提示你：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-update-avail.png)

想更新的话，从下拉框里选新版本即可：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-updating.png)

vvvv 会下载并引用这个新版本，同时要求你重启：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-restart.png)

之所以必须重启，是因为 **vvvv 无法在运行时替换一个包的版本** —— 只有重启才能确保新选的版本被加载。你可以放心点那个 “Restart vvvv” 按钮，vvvv 会以你原先的状态重新打开，只不过加载的是新的引用。

## Version mismatches / 版本不匹配 {#version-mismatches}

如果你选定的版本和当前实际加载的版本不一致，被引用的包上就会出现版本不匹配的警告。

![](https://thegraybook.vvvv.org/images/reference/hde/packman-version-miss.png)

几种情形会导致它：

- 如果你刚改过某个包的版本就看到这个警告，那需要重启才能确保新版本被加载（见上文）
- 如果你的多个文档各自明确引用了同一个包的不同版本，你得理一理，为整个项目定下一个版本（见下面的「不指定具体版本」）
- 如果警告出现在带 “Built-In” 标签的包上，你需要先理解这类包的角色，继续往下看

## Built-in packs / 内置包 {#built-in-packs}

vvvv 自带一批它自己运行所必需的包，可以在 Built-in 区看到：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-builtins.png)

**这些包的具体版本由 vvvv 的版本决定，无法更改。**

如果你和其中某个包版本不匹配，那你没得选。这种情况下唯一的办法是选「不指定具体版本」，继续看：

## Reference no specific version / 不指定具体版本 {#reference-no-specific-version}

为了减少与内置包之间的版本不匹配警告、也为了在多个文档之间管理包版本，有一个特别的功能：引用某个包时，你可以选择「不使用具体版本」。这意味着你把「究竟加载哪个版本」这个决定交出去了。

![](https://thegraybook.vvvv.org/images/reference/hde/packman-noversion.png)

对于带 “Built-In” 标签的包，这个选项本来就是默认的 —— 因为它们的版本早已替你决定好了。

另一个用得上的场景是大项目：多个 VL 文档引用同一个包。这个功能是「集中管理多文档包版本」的一半，另一半还在开发中。

## Vulnerable packs / 有漏洞的包 {#vulnerable-packs}

nuget.org（vvvv 默认的包仓库）维护着一份[已知漏洞](https://learn.microsoft.com/en-us/nuget/api/vulnerability-info)清单。

安装包时 vvvv 会对照这份清单，如果你选的版本有漏洞，它会告诉你。加包的时候留意一下[日志](debugging-log.md)，注意这类警告：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-vulnerables.png)

## Quick VL pack reference / 快速引用 VL 包 {#quick-vl-pack-reference}

Packman 最好的地方在于：**到头来你其实不太需要它。** 如果你已经知道想引用的 VL 包叫什么名字，直接在节点浏览器里加就行。

在节点浏览器里输入任意一个包的名字，选中，就完事了。凡是能在 Packman 或[线上包浏览器](https://vvvv.org/packs/)里找到的 VL 包，都能这样添加。

这一步到底做了什么？两件事：

- 下载这个包的**首选版本**（见下文）
- 把这个版本引用到当前 VL 文档

想把包移除？同样的办法。

那什么时候还需要 Packman 呢？

- 搜索包
- 了解某个 VL 包的更多信息
- 调整已引用包的版本
- 搜索并引用 .NET 的 NuGet（也就是并非专为 VL 制作的包）

## Preferred version of a pack / 包的首选版本 {#preferred-version-of-a-pack}

你可能会问：从节点浏览器直接添加引用、不指定版本时，拿到的到底是哪个版本？答案是 vvvv 对每个包都有一个「首选版本」的判断，计算方式是：

- 先假定是这个包的最新稳定版
- 查阅 [package-constraints](https://github.com/vvvv/PublicContent/blob/master/package-constraints.txt) 文件，看这个包对当前运行的 vvvv 版本有没有已知限制
- 最终取「未被 package-constraints 限制的、最新的稳定版」

这个信息在每个包的版本下拉框里也是可见的。如果 vvvv 知道某个版本与当前运行的实例不兼容，你会看到「禁止」图标 —— 意思是那些版本在当前 vvvv 版本下用不了。

![](https://thegraybook.vvvv.org/images/reference/hde/packman-preferred.png)

要记得：**package-constraints 文件是由和你一样的人手工维护的**，所以它的准确程度，取决于社区维护得怎么样。

## Favorites / 收藏 {#favorites}

可用的包数量庞大，但你多半会发现自己常用的就那么几个。为了让它们更好找，我们加了收藏功能。你可以在 Packman 或帮助面板里给包加星：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-fav.png)

然后在单独的列表里快速找到它们：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-fav2.png)

一点提醒：如果你以前在帮助面板里用过收藏，那些不会自动迁移到新系统。

## Support developers / 支持开发者 {#support-developers}

也请特别留意这个列表：

![](https://thegraybook.vvvv.org/images/reference/hde/packman-support.png)

包不是凭空冒出来的，它们由和你一样的 patcher 制作和维护。**如果某个包对你有用，请支持它的作者。**

## Install packs via Helpbrowser / 从帮助面板安装包 {#install-packs-via-helpbrowser}

还有一点。以前你得先找到一个包、安装它，然后才能通过帮助面板看它的帮助文档。

现在在帮助面板里搜索时，它也会去找可能匹配你关键词的包，显示在最底部一个叫 “More Packs” 的区域里。在这里找到合适的，一键就能下载并立刻查看它的帮助。

![](https://thegraybook.vvvv.org/images/reference/hde/packman-helpbrowser.png)

注意区别：**在这里下载的包只是变成了本地可用、可以浏览它的帮助文档，它还没有被引用到你的任何文档里。**

你可能还会问：帮助面板到底显示哪些包的内容、显示哪个版本？

在 vvvv gamma 7.x 及更早的版本里，帮助面板显示的永远是你 NuGet 文件夹里最新的那些包。而那个文件夹已经不存在了，所以现在的规则是：

- 如果某个包有具体版本被加载了，帮助面板显示的就是那个版本的帮助内容
- 否则，显示这个包的**首选版本**（见上文）的内容 —— 但前提是它已经在你的系统上（也就是你此前引用或下载过）
