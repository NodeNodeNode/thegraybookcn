---
title: The Cache region / Cache 区块
slug: /language/cache
source_path: reference/language/cache.md
source_blob: 13bfb8d5274bb64c40b43ad73a509970794e8f23
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/cache.html)

想让草图的某一部分不必每帧都执行，用 `Cache` 区块。主要用途是优化性能 —— 只在真的需要时才执行，省下宝贵的 CPU 周期。

![](https://thegraybook.vvvv.org/images/language/cache-region.png)

Cache 区块里的节点只在两种情况下执行：某个边框控制输入变了，或者 `Force` 输入设为 true。

执行过一次之后，输出边框控制点会**保持**住结果（这就是「缓存」的意思），直到下次执行。

`Dispose Cached Outputs` 输入决定：缓存新结果之前，要不要先释放掉输出边框控制点里原有的对象。经验法则是：对象的类若有 `Dispose()` 方法，多半该打开这个输入 —— 除非你打算另行处理释放。

`Has Changed` 输出在区块执行的那一帧返回 true。

想快速把一堆节点用 Cache 区块围起来：选中，右键菜单选 `Surround -> Cache`。

要把节点移进或移出区块，拖动时按住 `Space`。
