---
title: Builders of Immutable Data / 不可变数据的构建器
slug: /explanations/builders-of-immutable-data
source_path: introduction/mut4.md
source_blob: 0833f74c1b6365b9898a078db5aba381e19494cb
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/mut4.html)

不可变类型（比如 Spread）在数据流草图里很好消化：看着它时你不用去想「什么时候」，它始终冻在那个状态。不改内存又想做点事，唯一的办法是分配新内存、造个新对象来装新值。所以改一个 Record 的参数，得到的是一份新快照 —— 一个装着新状态的新对象。

现在设想 Spread 也是这样一个不可变的东西：插入或删除若干项，往往就造出了一个全新的集合。所以有时候用*builder*（构建器）来造会更划算。构建器的想法是：你还在描述「想要的 Spread 长什么样」的过程中，这东西可变完全没关系 —— 这样就不会产生一堆用不上的临时集合。等造完了、要交给别的草图取用时，再把它变回好消化的 Spread。

注意：聪明的构建器有好几种。比如 Cons 节点用的那个记得上一帧 cons 进来的是哪些值 —— 这一帧若没变，就根本不产生新的 Spread。循环区块 splicer 输出内部用的构建器也类似。

不过好吧，那是另一个话题了：「管理 Spread 随时间留下的快照，同时尽可能少产生垃圾」。

而「从某个 Spread 出发，切到构建器，改一改，再切回 Spread」是个更成熟的概念，在 Operation 里同样适用，跟「比较不同时刻的 Spread」没有关系。
