---
title: VL Templates / VL 模板
slug: /getting-started/beta-vl-templates
source_path: reference/getting-started/beta/vl-templates.md
source_blob: 1f996bb0668c53996e70812188b27cd66d1f00f9
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/beta/vl-templates.html)

从 vvvv beta 里创建 VL 节点时，可以按 <span class="keyseq"><kbd>Ctrl</kbd></span> + 左键单击来克隆模板，有两个模板可选：

* Template (Value)
* Template (Value Stateless)

克隆任一模板都会生成一个新的 .vl 文档。前者会在文档里创建一个 ProcessDefinition，后者（无状态模板）则按你给的名字、目录和版本创建一个 OperationDefinition。

## Make VL nodes show up in vvvv beta / 让 VL 节点出现在 vvvv beta 里 {#make-vl-nodes-show-up-in-vvvv-beta}

克隆模板会生成一个新的 .vl 文档和一个节点定义（Process 或 Operation）。想让你在 VL 里另外创建的节点也出现在 vvvv beta 中，它们必须满足：

* 非 Generic
* 位于 VVVV 这个目录下

并且是以下两者之一：

* 一个 OperationDefinition
* 一个启用了 ProcessNode 的 ProcessDefinition

![](https://thegraybook.vvvv.org/images/beta/ProcessNode.png)
把一个 VL Process 准备成可在 vvvv beta 中使用的节点
