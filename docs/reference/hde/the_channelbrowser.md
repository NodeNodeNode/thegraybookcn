---
title: The Channel Browser / 通道浏览器
slug: /develop-environment/the-channel-browser
source_path: reference/hde/the_channelbrowser.md
source_blob: 142e6f7b2369ddef00133c852a3c8300239c8940
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/the_channelbrowser.html)

![](https://thegraybook.vvvv.org/images/reference/hde/channel-browser.png)

通道浏览器（`Ctrl` `+` `F4`）功能相当密集，值得你花点时间自己摸一摸。它总体上做的事情是：给你一份 Public Channel 的总览 —— 也就是整个程序范围内所有公开的、具名的参数。

所有 public channel 都列在这里，可以直接编辑；值的快照用[预设](presets.md)存取；点几下就能通过[绑定](bindings.md)暴露给外部世界。

## Creating a public channel / 创建 public channel {#creating-a-public-channel}

用 PublicChannel 节点创建 public channel，指定路径和类型。最简单的路径就是一个名字，也可以带斜杠 `/` —— 这样在通道浏览器里就能把 public channel 分出层级。

![](https://thegraybook.vvvv.org/images/reference/hde/public-channels.png)

这样定义之后，这个 public channel 的值既能从通道浏览器改，也能从另一个路径相同的 PublicChannel 节点改。通道本来就是**双向**的，读写都行。

PublicChannel 节点还可以直接从浏览器里把通道拖进草图来创建。

## Finding PublicChannel nodes / 找到 PublicChannel 节点 {#finding-publicchannel-nodes}

大项目里 public channel 一多，就记不住 PublicChannel 节点的各个实例散在哪儿了。在浏览器里右键一个 public channel，它的全部实例会列出来，点一下就跳过去。

![](https://thegraybook.vvvv.org/images/reference/hde/finding-nodes.png)

## Persistence of public channels / public channel 的持久化 {#persistence-of-public-channels}

通道的定义存在一个单独的文件里，文件名与当前主 .vl 文档相同，后缀是 `.pc`。这样，当你打开一个旁边有同名 .pc 文件的 .vl 文档时，可以放心：所有 public channel 在第一帧就是可用的。

这对版本控制也很好 —— 你对 public channel 的改动会集中呈现在一处 diff 里。

## Removing a public channel / 移除 public channel {#removing-a-public-channel}

删掉 PublicChannel 节点，对应的通道**不会**跟着消失。移除 public channel 只有一条路：在通道浏览器里右键那个通道，选 `Remove`。只有当时已经没有任何 PublicChannel 节点引用它，它才真的没了。

想一次性移除所有不再被 PublicChannel 节点引用的通道，用通道浏览器编辑菜单里的 “Remove unused channels”：

![](https://thegraybook.vvvv.org/images/reference/hde/edit-menu.png)
