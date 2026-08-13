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

ForEach 区块以同一个步调同时遍历多个集合，每个集合在区块内部交给你一项。每一轮也可以输出多项，得到多个等长的 Spread。

只要上游接入的每个 Sequence 都还有数据，区块主体就一直执行。换句话说：只要有一个输入空着，就不会迭代。

![](https://thegraybook.vvvv.org/images/introduction/forEach.png)

## Repeat {#repeat}

Repeat 区块由 `Iteration Count` 针脚决定主体执行多少次。

其他方面和 ForEach 区块很像：同样可以接入多个 List，同一个步调走。某个 List 项数不够时，循环会绕回开头，直到走够为止。

## If {#if}

只有条件成立，区块主体才执行。

你可以设零到多个出口，让区块外面的节点用上区块算出的数据。条件不成立时用默认值 —— 默认值在区块顶部设定。

## Delegate {#delegate}

用 Delegate 可以匿名地定义一个 Operation。既然匿名，这个 Operation 就没法调用 —— 名字都没有，怎么叫呢？所以 Delegate 区块有一个输出，以「值」的形式持有区块内定义的那个 Operation。

有些节点能调用这样的 Delegate，把 Delegate 值连过去就行。最简单的是各种 “Apply” 节点，另外还有很多。

注意：其他区块都是当场执行的（好吧，执行零到多次）。Delegate 区块不调用自己的主体，只是把你的逻辑捕获下来，装进一个能在连线上流动的值里。真正去调用它的是下游接入的那张草图 —— 什么时候调用由它决定，你干预不了。而 Delegate 的要点恰恰是：你也不想干预。

实际上你常常是反过来遇到它：先有一个节点需要 Delegate，好在它想调用的时候调用。从这个方向入手，Delegate 怎么用会更显而易见。“Where [Spread]” 就是这样一个节点 —— 把它创建成节点，再喂一个 Delegate 给它。

*（上游此处待补图）*

## Operation 区块 {#operation-region}

Operation 区块把「一个需要 Delegate 的 Operation」和「这个 Delegate 的定义」合在了一起。

*（上游此处待补图）*

## Where {#where}

“Where [Spread]” 区块让你逐项决定：这一项要不要留在结果 Spread 里。站在 Where 节点的角度看：每一项调用一次区块主体，把这一项递进去，再按你的返回值决定要不要收下。
