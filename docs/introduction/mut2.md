---
title: DataFlow and Mutability / 数据流与可变性
slug: /explanations/dataflow-and-mutability
source_path: introduction/mut2.md
source_blob: bbe0ff9b92be677ea51a3ac2f6c049fb14c5102f
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/mut2.html)

*（上游此处待补图：与「数据流」那页相同的示例草图）*

## 不可变数据与数据流 {#immutable-data-and-data-flow}

看 HSV 节点那个输出针脚 —— 它是另外两个节点的*data source*（数据源）。两条连线从这里出发，所以两个接收方拿到的是同一个颜色。记住：只有数据源才是数据的来源。这件事没办法搞乱，也不该有办法搞乱。

这一点决定了一张草图能不能看懂。数据从上面来，只从那个数据源（HSV 节点的输出针脚）来 —— 要紧的就这一条。任何例外都会摧毁数据流最基本的想法：**数据只从源流向汇点**。

## 可变数据与引用流 {#mutable-data-and-reference-flow}

可变数据同样向下流，但这次更贴切的说法是：向下游流的是**指向数据的引用**。接收方节点可以就地改动这份数据 —— 于是凡是拿到这个引用的其他*data sink*（数据汇点），看到的都是改过的对象。

汇点之间能互相影响，所以你不能只想数据流，还得想**执行顺序**。这时要多一点命令式的思路、少一点声明式。具体来说，你会更倾向于纵向布线，让草图读起来像一长串指令 —— 而这串指令只能按某一种顺序执行。
