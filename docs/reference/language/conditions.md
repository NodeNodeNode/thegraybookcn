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

`If` 区块用来有条件地执行草图的某一部分。`Condition` 输入为 true 时，区块内部的草图被执行；否则，边框控制输入上的值会直接透传到对应的输出。

![](https://thegraybook.vvvv.org/images/language/if-region.png)

想快速把一堆节点用 If 区块围起来，选中它们，然后从右键菜单里选 `Surround -> If`。

把节点移进移出区块的方法是：拖动它们的同时按住 `Space`。

## Switch {#switch}

VL 没有专门的 Switch 区块，但有一个 Switch 节点 —— 它至少能让你根据某个条件或索引，把多个可能的输入路由到一个输出上。

![](https://thegraybook.vvvv.org/images/language/switch-node.png)

Switch 节点的输入是一个 Pin Group。选中它，按 `Ctrl` `+` `+` 或 `Ctrl` `+` `-` 来增删输入。
