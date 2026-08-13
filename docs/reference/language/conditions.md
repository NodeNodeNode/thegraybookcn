---
title: Conditions / 条件
slug: /language/conditions
source_path: reference/language/conditions.md
source_blob: e678087c85605f97136d565df595433af120772c
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/conditions.html)

到目前为止，VL 里唯一的条件语言原语就是 `If` 区块。

## The If region / If 区块 {#the-if-region}

`If` 区块用来有条件地执行草图的某一部分。`Condition` 输入为 true，就执行区块内部的草图；否则，边框控制输入上的值直接透传到对应的输出。

![](https://thegraybook.vvvv.org/images/language/if-region.png)

想快速把一堆节点用 If 区块围起来：选中，右键菜单选 `Surround -> If`。

要把节点移进或移出区块，拖动时按住 `Space`。

## Switch {#switch}

VL 没有专门的 Switch 区块，但有一个 Switch 节点 —— 至少能按某个条件或索引，把多路输入选一路送到输出。

![](https://thegraybook.vvvv.org/images/language/switch-node.png)

Switch 节点的输入是一个 Pin Group。选中之后按 `Ctrl` `+` `+` 或 `Ctrl` `+` `-` 增删输入。
