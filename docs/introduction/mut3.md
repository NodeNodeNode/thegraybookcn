---
title: Detecting Changes / 检测变化
slug: /explanations/detecting-changes
source_path: introduction/mut3.md
source_blob: 8437fb159b6a40fc4a0a20eb1adb2591b85f39d6
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/mut3.html)

## 回顾：不可变数据，以及如何产生新值 {#recap-of-immutable-data-and-how-to-produce-new-values}

不可变数据在面向数据流的草图里很好消化 —— 看着一个不可变的东西时，你永远不需要去想「什么时候」，它始终处在那个冻结的状态。想在不改动内存的前提下找点乐子，唯一的办法就是分配一块新内存、造出新对象，让新对象装着那个新的不可变值。所以，当你改一个 Record 的参数时，你得到的是一份新快照、一个装着新状态的新对象；当你往一个 Spread 里加一项时，你得到的是一个新的 Spread 对象。

## 连线上流过的数据会随时间变化吗 {#is-the-data-flowing-over-a-link-changing-over-time}

“Changed” 节点大概应该叫 ChangedReference 才对，因为它只能检测出「面前换了个新对象」这一种变化，检测不出可变对象内部的变化。不过内部变化有时候也挺有意思 —— 比如在 Elementa 或者更大的对象图里，你会想直接改动对象本身，以免一直做巨量的内存分配。

## 可变对象的「快照」 {#mutable-object-snapshots}

「同一个对象随时间留下的一系列快照」这个想法非常好用。如果有办法轻松认出「我上次看到的是第 17 号快照，现在是同一个对象的第 31 号」，那么连你没盯着的那段时间里发生的变化，你也能察觉到。我喜欢把这叫作票号系统，我想 Elementa 里也是这么叫的。作为节点库的开发者，你只要给对象加一个整数参数 “Ticket”，每次要改动这个可变对象时就把它加一。这样你就能用 Changed 节点来检查某个对象的票号是不是变了。

## 不可变对象的快照共享同一个身份 {#immutable-object-snapshots-share-an-identity}

顺带一提，关于 Record 的快照还有一个有意思的事实：当你往 Spread 里加一项、或者给 Record 设一个参数从而产生新快照时，得到的新对象会与「它被克隆自」的那个对象共享同一个「身份」。于是：你能「看出」哪些快照是一家人。

## Changed 节点无处不在 {#changed-nodes-are-everywhere}

提示框里的那个「时钟」也在可视化数据是否变了：实心表示对象变了，只有描边表示和上一帧是同一个对象。

另外，Cache 区块的每一个输入边界控制点里，都含有一个 Changed 节点。
