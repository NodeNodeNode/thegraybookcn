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

不可变数据在数据流草图里很好消化：看着它时你不用去想「什么时候」，它始终冻在那个状态。不改内存又想做点事，唯一的办法是分配新内存、造个新对象来装新值。所以改一个 Record 的参数，得到的是一份新快照 —— 一个装着新状态的新对象；往 Spread 里加一项，得到的是一个新的 Spread。

## 连线上流过的数据会随时间变化吗 {#is-the-data-flowing-over-a-link-changing-over-time}

“Changed” 节点其实该叫 ChangedReference：它只认得「换了个新对象」这一种变化，认不出可变对象**内部**的变化。不过内部变化有时候也值得关心 —— 比如在 Elementa 或更大的对象图里，你会想直接改对象本身，省下大量内存分配。

## 可变对象的「快照」 {#mutable-object-snapshots}

「同一个对象随时间留下的一系列快照」这个想法很好用。要是能轻松认出「上次看到的是 17 号，现在是同一个对象的 31 号」，那么你没盯着的那段时间里发生的变化也能察觉。我把这叫票号系统，Elementa 里好像也是这么叫的。作为节点库开发者，你只要给对象加一个整数参数 “Ticket”，每次改动就加一。之后用 Changed 节点检查票号变没变即可。

## 不可变对象的快照共享同一个身份 {#immutable-object-snapshots-share-an-identity}

关于 Record 的快照还有一点有意思：往 Spread 里加一项、或给 Record 设一个参数而产生新快照时，新对象与被克隆的那个共享同一个「身份」。于是你能看出哪些快照是一家人。

## Changed 节点无处不在 {#changed-nodes-are-everywhere}

提示框里的那个「时钟」也在可视化数据是否变了：实心表示对象变了，只有描边表示和上一帧是同一个对象。

另外，Cache 区块的每一个输入边界控制点里，都含有一个 Changed 节点。
