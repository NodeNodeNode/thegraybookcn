---
title: Nodes / 节点
slug: /explanations/looking-at-nodes
source_path: introduction/lo_4_lookingAtNodes.md
source_blob: 63972ad30476f5dc3b5d003a5139f3cfa5824b5b
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/lo_4_lookingAtNodes.html)

前面说过：节点的全部意义在于**使用**已经存在的功能。谈到使用时，我们也常用「应用」这个词 —— 用一个节点，就是以某种方式应用一份现成的功能。

VL 提供了几种不同风味的节点。我们来看看：

## Operation Applications / Operation 应用 {#operation-applications}

一个 Operation 应用，应用的是一个 Operation。

Operation 是很原始的东西。它是一次临时的计算：需要数据，产出数据。它可能带副作用，比如写文件，但通常它就是「基于数据算出数据」。

你通过它的输入针脚把数据喂给 Operation 应用，它算完把结果交给你。把它想成某种易逝的、暂时的东西，像一场化学反应。

**它的输出不依赖于此前对这个 Operation 的调用。** 它根本不知道自己以前被调用过。

这里是一些 Operation 应用：

*（上游此处待补图）*

## Process Applications / 过程应用 {#process-applications}

一个过程应用，应用的是一个过程。

过程是持久的东西。它会赖着不走。

把整个程序想成一个过程：它存在一段时间，并且不断演变。过程应用正是照这个想法建模的。你可以把它们想成一个个赖着不走的小程序，像活细胞一样。

这里是一些过程节点：

*（上游此处待补图）*

拿它们的样子和上面的 Operation 应用比一比。差别很小，但日后当你要理清一张草图时，这点差别可能帮上忙。

上面那些过程应用，都需要存下某种状态才能正常工作：FlipFlop 得存下自己的翻转状态，S+H 得存下最后一次采样到的值，TogEdge 得存下上一次的输入值，才能在信号里认出上升沿或下降沿。

**因此，过程应用的输出既取决于输入，也取决于这个过程的状态。**

关于节点的更多内容：[节点](/language/nodes)

:::note[译者注]
上游此处指向本章的 `nodes.md`，但那个文件只有一行标题、没有正文。这里改为指向「编程语言」章的《节点》，那才是讲节点的正文。
:::
