---
title: Reactive / 响应式编程
slug: /libraries/reactive
source_path: reference/libraries/reactive.md
source_blob: afa4a1309fd589d12d6fb1751c2a3a6bbddee599
status: partial
last_synced: '2026-08-12'
---

`Reactive` 提供了处理异步事件、后台计算的工具，甚至允许你构建自己的 `mainloop` 并在不同 CPU 核心上运行。

## 事件处理

用于处理事件的节点是 `Reactive` 分类下的 `ForEach` 区块。这个区块允许你在其中放置任何节点，并能记住两个事件之间的任何数据。同时还有一个包含 `Keep` 的版本，可以使用布尔输出过滤事件。这个区块与用于 Spread 的 `ForEach` 非常相似，区别在于输入输出是跟随时间的事件值而不是 Spread 中的 Slice。

![Refresh web data every 30 seconds in the background and pass the result on to the mainloop](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-refreshEvery30secInBackground.PNG "Refresh web data every 30 seconds in the background and pass the result on to the mainloop")
*后台每30秒获取一次 web 数据，并将结果传递给 `mainloop`*

## 切换或合并事件源

![Switching or merging midi events](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-switchingAndMerging.PNG "Switching or merging midi events")
*切换或合并 midi 事件*

## 筛选

可以使用 `OfType` 或者 `Where` 进行筛选

![Only get TouchDown events from a combined event stream](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-onlyGetTouchDown.PNG "Only get TouchDown events from a combined event stream")
*其他节点包括* `Skip` `Delay` `Delay(Selector)` `Scan` `Switch` ...

## 接收事件

当你想脱离 `observable` 世界并将事件的值传递给 `mainloop` 时，可以使用以下三种节点：

- `HoldLatest`：总是返回最新的数据
- `Sampler`：返回上一帧后所有的事件值，可为空
- `S+H`：与 `Sampler` 一样，但总是返回相同的值，直到下一个事件发生

这些行为有一些微小的差异，根据你的需求选择：

![Three ways to get event values to the mainloop](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-3waysToGetEventValuesToMainloop.PNG "Three ways to get event values to the mainloop")
*三种将事件值传递给 mainloop 的方法*

## 创建事件

生成你自己的事件源同样简单：

![Different ways to create observable event sources](https://thegraybook.vvvv.org/images/libraries/vl-libraries-reactive-waysToCreateObservableSources.PNG "Different ways to create observable event sources")
*创建 observable 事件源的不同方法*

:::note
只使用 `Record` 类型的数据作为事件数据，因为它们是线程安全的。
如果你发送任何 `Class` 类的数据，请确认你完全明白你正在操作的事情！
:::
