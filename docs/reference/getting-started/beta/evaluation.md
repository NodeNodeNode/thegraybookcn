---
title: Evaluation / 求值
slug: /getting-started/beta-evaluation
source_path: reference/getting-started/beta/evaluation.md
source_blob: 67e6139ff64862f9621a80df92f2d49eab98d6d5
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/beta/evaluation.html)

vvvv beta 的求值是基于帧的。每一帧，整张图都会从 sink（比如 Renderer 或 Writer）出发**惰性地**求值。

有些节点在特定情况下不会对输入求值。比如 Switch (Input) 只对当前切换到的那一个输入求值；S+H 只在你真的要在这一帧采样时才对它的数据源求值。所以 vvvv beta 会确保并非所有东西都被求值，只算必要的那部分。

**而 VL 总是全部求值** —— 除非你强制它别去算某些部分。

假设你在 vvvv beta 里放了一个 VL 节点，那么整个 VL 草图都会被求值。不止如此：里面所有的节点都会被完整求值。所以如果某个节点背后还有草图，那整个草图也一起被求值。

*这么设计的一个原因，是让系统尽可能贴近 .NET。这样你以后把 vl 文档导出时，不会遇到 Lazy 之类的特殊类型，看到的就是你在草图里看到的那些基本类型。*

让 VL 不去反复计算某些区域的唯一办法，是使用**区块**。区块有好几种，但它们基本上都在内外之间围一道栅栏，让区块自己决定什么时候去调用内部。

*loop* 区块在迭代次数为 0 时不会执行，*if* 区块在条件为 false 时不会执行。有些节点自带一个隐藏的 if 区块作为语法糖 —— 这类节点会有一个 apply 针脚，apply 关掉时，节点就不会被求值。
