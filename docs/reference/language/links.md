---
title: Links / 连线
slug: /language/links
source_path: reference/language/links.md
source_blob: 939b9f37d24de6e38e21a4ae4ec43c793382cca1
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/links.html)

*Link*（连线）连接两个 *Pin*（针脚），数据顺着它从一个节点流到另一个。连线分三种：

*（上游此处待补图：普通连线、引用连线、Delegate 连线）*

在[类型草图](patches.md#datatype-patches)里连线可以带颜色，颜色表示这条线属于哪个[成员 Operation](operations.md#member-operations)。

连线上出现「黄袜子」是个警告：这条线的来源是可变的，却同时接了不止一个下游节点。具体含义和处理办法，读提示框里的完整说明。

拉线过程中和对已有连线还能做很多操作，见[连线快捷键（英文）](https://thegraybook.vvvv.org/reference/hde/keyboard-shortcuts.html#links)。
