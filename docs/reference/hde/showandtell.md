---
title: Show & Tell / 分享作品
slug: /develop-environment/show-and-tell
source_path: reference/hde/showandtell.md
source_blob: 7d8c68ab46b9d00fa8426fda3fcc9a8d53c208bf
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/showandtell.html)

Show & Tell 这个扩展用来快速分享渲染结果的截图。

按 `Ctrl` `+` `3` 打开它。

打开之后，它会接管你的截图操作。两种截图方式都行：

- `Win` `+` `Shift` `+` `S`：Windows 自带的截图快捷键
- `Ctrl` `+` `2`：在 Skia 和 Stride 窗口上有效

截图配上文字之后，可以发到大家共用的 [madewithvvvv](https://pixelfed.social/madewithvvvv/) 账号。你也可以把 Show & Tell 配置成发到你自己的 [Pixelfed](https://pixelfed.org/) 或 [Mastodon](https://joinmastodon.org/) 账号，慢慢积累成一份漂亮的作品集。

## Configuring Accounts / 配置账号 {#configuring-accounts}

按齿轮按钮打开配置页。

### The common "madewithvvvv" account / 共用的 madewithvvvv 账号 {#the-common-madewithvvvv-account}

这是默认账号，谁都可以往里发。如果你希望自己发的图能关联到你的用户名，就别用 guest/guest，改填你的 vvvv.org 登录凭据。

### Custom Accounts / 自己的账号 {#custom-accounts}

如果你有 [Pixelfed](https://pixelfed.org/) 或 [Mastodon](https://joinmastodon.org/) 账号，也可以发到那里。

![](https://thegraybook.vvvv.org/images/reference/hde/fediverse.png)
Pixelfed 与 Mastodon

按 `Add Account` 按钮，填写：

* 一个便于你自己识别这个账号的名字
* 实例地址（不带 `http://`，比如 `pixelfed.de`）
* 访问令牌

### Pixelfed access token / Pixelfed 访问令牌 {#pixelfed-access-token}

:::note
有个我们还在排查的问题：目前这套在 pixelfed.social 这个实例上不能用。可以换[别的实例](https://fedidb.org/software/pixelfed)。
:::

在你的 Pixelfed 账号里，进 `Settings > Applications > Create New Token`。

填完表单，**务必勾上 `Write` 权限**，然后按 `Create`。系统会给出一个访问令牌，把它复制粘贴到账号配置里。

### Mastodon access token / Mastodon 访问令牌 {#mastodon-access-token}

在你的 Mastodon 账号里，进 `Preferences > Development > New Application`。

填完表单，**务必勾上 `Write` 权限**，然后按 `Submit`。系统会给出一个访问令牌，同样复制粘贴到账号配置里。

## What the Pixelfed and Mastodon? / Pixelfed 和 Mastodon 是什么？ {#what-the-pixelfed-and-mastodon}

Pixelfed 和 Mastodon 都属于更大的 [Fediverse](https://en.wikipedia.org/wiki/Fediverse) —— 一个由去中心化社交网络组成的联邦。和那些更为人熟知的围墙花园不同，它们的运作方式更像电子邮件：任何人都可以自己架一个 Pixelfed 或 Mastodon 服务器，同时仍然能和其他所有人通信，因为整个 fediverse 共用一套通信协议 [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub)。没有广告，没有追踪，没有区块链，没有加密货币 —— 只是一种在互联网上分享图片和文字的朴素方式。
