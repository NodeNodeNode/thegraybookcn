---
title: Builders of Immutable Data / 不可变数据的构建器
slug: /explanations/builders-of-immutable-data
source_path: introduction/mut4.md
source_blob: 0833f74c1b6365b9898a078db5aba381e19494cb
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/mut4.html)

不可变类型 —— 比如 Spread —— 在面向数据流的草图里很好消化：看着一个不可变的东西时，你永远不需要去想「什么时候」，它始终处在那个冻结的状态。想在不改动内存的前提下找点乐子，唯一的办法就是分配一块新内存、造出新对象，让新对象装着那个新的不可变值。所以，当你改一个 Record 的参数时，你得到的是一份新快照、一个装着新状态的新对象。

现在设想 Spread 也是这样一个不可变的东西：当你插入或删除若干项时，你往往会造出一个全新的集合。这就是为什么有时候用一个 *builder*（构建器）来造这个不可变的东西会有帮助。构建器抓住的想法是：在你还在描述「我想要的 Spread 长什么样」的过程中，这东西是可变的完全没关系 —— 这样就不会产生一堆你并不需要的临时集合。等造完了，也就是要让它流出你的草图、交给别的草图取用的时候，再把它变回一个好消化的东西：一个 Spread。

注意：聪明的构建器有好几种。比如 Cons 节点也用了构建器，但它那个知道上一帧 cons 进来的是哪些值；如果这一帧和上一帧一样，就根本不产生新的 Spread。循环区块的 splicer 输出内部用的构建器也类似。

不过好吧，那是另一个话题了：「管理 Spread 随时间留下的快照，同时尽可能少产生垃圾」。

而「从某个 Spread 出发，切到构建器，做些改动，再切回 Spread」是一个更成熟的概念，它在 Operation 里同样适用，而且跟「比较不同时刻的 Spread」没有任何关系。
