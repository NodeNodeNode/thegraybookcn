---
title: Reactive / 响应式编程
slug: /libraries/reactive
source_path: reference/libraries/reactive.md
source_blob: afa4a1309fd589d12d6fb1751c2a3a6bbddee599
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/reactive.html)

Reactive 这个目录提供处理异步事件和后台计算的工具，你甚至可以搭出自己的主循环，跑在另一个 CPU 核心上。

## 处理事件 {#processing-events}

处理事件时首选的节点，是 *Reactive* 目录下的 *ForEach 区块*。区块里可以放任何节点，两次事件之间的数据也记得住。还有一个 *Keep* 版本，可以用一个布尔输出把事件过滤掉。这个区块与用于 Spread 的 ForEach 区块非常相似，区别只在于它的输入输出是随时间到来的事件值，而不是 Spread 里的 slice。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-refreshEvery30secInBackground.PNG)
在后台每 30 秒刷新一次网络数据，并把结果传给主循环

### 切换或合并事件源 {#switching-or-merging-event-sources}

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-switchingAndMerging.PNG)
切换或合并 midi 事件

### 过滤 {#filtering}

用 *OfType* 或 *Where* 也可以做过滤：

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-onlyGetTouchDown.PNG)
从合并后的事件流里只取 TouchDown 事件

其他节点还包括

* Skip
* Delay
* Delay (Selector)
* Scan
* Switch……

## 接收事件 {#receiving-events}

如果你想离开 Observable 的世界、把事件值传给主循环，用下面这 3 个节点之一：

* HoldLatest：总是返回最新的值
* Sampler：返回自上一帧以来的所有事件值，可能为空
* S+H：与 *Sampler* 相同，但会一直返回同样的值，直到下一个事件到来

它们的行为各有一点不同，看你需要哪种：

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-3waysToGetEventValuesToMainloop.PNG)
把事件值传给主循环的三种方式

## 创建事件 {#creating-events}

生成你自己的事件源同样容易：

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-waysToCreateObservableSources.PNG)
创建 Observable 事件源的不同方式

:::note
只发送 Record 类型的值作为事件数据，因为它们是线程安全的。如果你要发送任何 Class 类型的值，请确保你非常清楚自己在做什么！
:::
