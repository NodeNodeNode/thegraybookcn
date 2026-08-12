---
title: Exception Handling / 异常处理
slug: /language/exception-handling
source_path: reference/language/exception-handling.md
source_blob: 150192a31261a5df4adad61b61ba4a6c380c0463
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/exception-handling.html)

节点有时候会出现粉色边框，意思是它抛出了一个运行时错误。把鼠标悬停在节点上，提示框会告诉你更多信息：

![](https://thegraybook.vvvv.org/images/language/node-throwing-error.png)

草图的执行是暂停还是继续，取决于你在[设置](../hde/settings.md)里对 “Pause on Error” 的选择。但就算继续执行，它之后很可能还会在同一个地方再次出错。所以「处理」异常是个好习惯。

想用程序处理运行时错误，可以把出问题的部分用 Try 区块围起来：

![](https://thegraybook.vvvv.org/images/language/try-region.png)

这样你就能优雅地应对草图里的问题，而不必中断整个程序的执行。
