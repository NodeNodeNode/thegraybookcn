---
title: Regions / 区块
slug: /explanations/regions
source_path: introduction/lo_6_regions.md
source_blob: ba81b49bd2335661acd08d87205b8bac1d6dd911
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/lo_6_regions.html)

## ForEach {#foreach}

ForEach 区块让你以同一个步调同时遍历多个集合。每个集合在区块内部都会给你一项拿来用。你也可以在每一轮里输出多项，得到多个等长的 Spread。

只要上游接入的每一个 Sequence 都还有数据，区块的主体就会一直被调用。也就是说：只要有一个输入什么都没接，它就不会迭代。

![](https://thegraybook.vvvv.org/images/introduction/forEach.png)

## Repeat {#repeat}

Repeat 区块让你定义主体该被调用多少次，这通过 `Iteration Count` 针脚来设定。

其他方面它和 ForEach 区块非常像：它同样允许接入多个 List，并以同一个步调走过它们。当某个 List 能提供的项数不够时，循环会反复绕回列表开头，直到走够为止。

## If {#if}

只有条件成立时，这个区块的主体才会被执行。

你可以设零到多个出口，好让区块外面的节点用上区块被调用时算出的数据。若条件不成立，就使用默认值 —— 默认值可以在区块顶部设定。

## Delegate {#delegate}

用 Delegate 你可以匿名地定义一个运算器。既然是匿名的，这个新运算器也就没法被调用 —— 名字都没有，怎么叫它呢？为了解决这一点，Delegate 区块有一个输出，它以「值」的形式持有区块内定义的那个运算器。

有些节点能调用这样的 Delegate，只要你把 Delegate 值连给它们。最简单的是各种 “Apply” 节点，此外还有很多。

注意：其他所有区块都是当场执行的（好吧：执行零到多次）。而 Delegate 区块并不调用它的主体，它只是把你的逻辑捕获下来，装进一个能在连线上流动的值里。真正可能去调用这个匿名运算器的，是下游接入的那张草图 —— 什么时候调用由它决定，你无从干预。而 Delegate 的要点恰恰是：你并不想干预。

实际上你常常是反过来遇到它的：先有一个节点，它需要一个 Delegate，好在它想调用的任何时刻去调用。从这个方向入手，Delegate 该怎么用可能会更显而易见。一个需要 Delegate 的例子是 “Where [Spread]” —— 把它创建成一个节点，然后喂一个 Delegate 给它。

*（上游此处待补图）*

## 运算器区块 {#operation-region}

运算器区块把「一个需要 Delegate 的运算器」和「这个 Delegate 的定义」合在了一起。

*（上游此处待补图）*

## Where {#where}

“Where [Spread]” 区块让你为每一项决定它该不该出现在结果 Spread 里。站在 Where 节点的角度看：它为每一项调用一次区块的主体，每次都递给区块一项，并用你的返回值来决定这一项要不要加进结果。
