---
title: Presets & Transitions / 预设与过渡
slug: /develop-environment/presets
source_path: reference/hde/presets.md
source_blob: 6240aa71ea7f2a5afb5243029f61f7982361f227
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/presets.html)

用预设可以给任意一组 [Public Channel](the_channelbrowser.md) 拍快照，存下来，随时再调回去。直接调用会**跳**到存下的值；用过渡则会**平滑地**收敛过去。

![](https://thegraybook.vvvv.org/images/reference/hde/presets.png)
用来存快照的预设列，以及用来触发快照的预设面板

## Storing presets / 存预设 {#storing-presets}

存预设有两种方式：

- 通过通道浏览器的「预设列」
- 通过一组节点

![](https://thegraybook.vvvv.org/images/reference/hde/preset-columns.png)
多个预设列可以并行使用，让你分别捕捉和调整预设

每个预设都存成一个小的 .xml 文件，放在当前主 .vl 文档旁边一个叫 “Presets” 的文件夹里。这样你可以直接在资源管理器里重排、重命名预设；对版本控制也友好，改了什么一目了然。

想在草图里用程序存预设，看 “StorePreset” 节点的帮助文档。

## Recalling presets / 调用预设 {#recalling-presets}

调用预设同样有两种方式：

- 通过通道浏览器的「预设面板」
- 通过一组节点

![](https://thegraybook.vvvv.org/images/reference/hde/presets-panel.png)

预设面板列出所有可用的预设。你可以在这里快速过渡到、或者直接跳到其中任意一个，也可以重命名、加描述、删除。

过渡当然还有更多可控的东西（曲线、时长），你会想控制它们，也确实能控制。但对于简单场景，默认的过渡已经够快速试验了。

想在草图里用程序调用预设，看 “RecallPreset” 和 “TriggerPreset” 节点的帮助文档。
