---
title: The Cache region / Cache 区块
slug: /language/cache
source_path: reference/language/cache.md
source_blob: 13bfb8d5274bb64c40b43ad73a509970794e8f23
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/cache.html)

想让草图的某一部分不必每帧都执行，可以用 `Cache` 区块。它最主要的用途是优化性能 —— 确保某些事情只在真的需要时才执行，省下宝贵的 CPU 周期。

![](https://thegraybook.vvvv.org/images/language/cache-region.png)

Cache 区块里的所有节点，只有在它的某个边框控制输入发生变化、或者 `Force` 输入被设为 true 时才会执行。

执行过一次之后，区块的输出边框控制点会**保持**（也就是缓存）住结果，直到区块下一次被执行。

`Dispose Cached Outputs` 输入决定：在缓存新结果之前，要不要把已经缓存在输出边框控制点里的对象释放掉。经验法则是：如果这个对象的类有 `Dispose()` 方法，你多半想打开这个输入 —— 除非你有意用别的方式处理它的释放。

`Has Changed` 输出会在区块被执行的每一帧返回 true。

想快速把一堆节点用 Cache 区块围起来，选中它们，然后从右键菜单里选 `Surround -> Cache`。

把节点移进移出区块的方法是：拖动它们的同时按住 `Space`。
