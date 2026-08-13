---
title: Exception Handling / 异常处理
slug: /language/exception-handling
source_path: reference/language/exception-handling.md
source_blob: 150192a31261a5df4adad61b61ba4a6c380c0463
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/exception-handling.html)

节点出现粉色边框，意思是抛了一个运行时错误。把鼠标停在节点上，提示框会说得更细：

![](https://thegraybook.vvvv.org/images/language/node-throwing-error.png)

草图是暂停还是继续，取决于你在[设置](../hde/settings.md)里怎么设 “Pause on Error”。不过就算继续跑，多半也会在同一个地方再出一次错 —— 所以还是养成处理异常的习惯为好。

想用程序处理运行时错误，可以把出问题的部分用 Try 区块围起来：

![](https://thegraybook.vvvv.org/images/language/try-region.png)

这样就能从容应付草图里的问题，而不必中断整个程序。
