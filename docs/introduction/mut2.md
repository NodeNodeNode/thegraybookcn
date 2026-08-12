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

我们把注意力放在 HSV 节点的那个输出针脚上 —— 它是另外两个节点的*data source*（数据源）。两条连线从这里出发，所以两个接收方拿到的都是 HSV 节点算出的同一个颜色。记住：只有数据源才应该是数据的来源。没有任何办法把这件事搞乱，也不该有任何办法把它搞乱。

这一点对「能不能看懂一张草图」至关重要。数据是从上面来的，只从那个数据源（HSV 节点的输出针脚）来。要紧的就这一条。任何对这条规则的例外，都会摧毁数据流最基本的想法，也就是**数据只从源流向汇点**。

## 可变数据与引用流 {#mutable-data-and-reference-flow}

可变数据同样向下流动，不过这一次更贴切的说法是：向下游流动的是**指向数据的引用**。接收方节点现在可以就地改动这份数据 —— 也就是说，凡是拿到了这个对象引用的其他*data sink*（数据汇点），都会看到被改过的对象。

汇点之间能互相影响，这使得你不能只想数据流，还必须想**执行顺序**。你需要更命令式地思考，少一些声明式。具体来说，你会更倾向于纵向布线，让草图读起来更像一长串指令 —— 而这串指令只能按某一种顺序执行。
