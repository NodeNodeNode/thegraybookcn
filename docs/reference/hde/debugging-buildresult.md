---
title: Build Result / 构建结果
slug: /develop-environment/debugging-build-result
source_path: reference/hde/debugging-buildresult.md
source_blob: 3457da81315c072633026ff9c004a5e68f15053a
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/debugging-buildresult.html)

这里显示构建过程中产生的错误、警告和信息。每当 vvvv 构建你的草图时（也就是你每做一次改动），这个列表就会清空一次，给你一份最新问题的视图。

![](https://thegraybook.vvvv.org/images/reference/hde/2023-12-20-21-12-17.png)

最常见的错误是这两类：

* 缺失的依赖引用或节点
* 连线、针脚、Pad 上的类型问题

双击某一条会把你带到消息的来源 —— 直接跳到草图里，你会在那儿看到同一个问题以红色或黄色的节点、连线、针脚或 Pad 呈现出来。

草图是理解和修复问题的地方，而构建结果视图的作用是帮你：

* 跳出来看到构建问题的全貌
* 在其中导航、找到根源问题

把这个列表控制住，是[应用健康](debugging-apphealth.md)的基础。

**几点说明**

* 通常只有 Error 值得关注
* **vvvv 允许带着错误构建草图。** 这是为了让迭代和重构更快 —— 你不必把每个错误都修掉才能试一个新想法。重构过程中你可能会看到一大堆错误，构建结果视图会提醒你它们的存在，但不必因此有负担。做大草图时这本来就是工作的一部分，是事情在推进的证明。什么时候回头收拾这些错误，你自己决定。当然，等到要测试程序、排查 bug 时，没有构建错误会让事情容易得多
* **Warning**：往往一大堆，又很难清干净，所以容易被无视。但还是有用的 —— 它想帮你看清程序到底在做什么，尤其是对象可变性和执行顺序这两件事
