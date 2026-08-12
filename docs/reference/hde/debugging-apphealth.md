---
title: App Health / 应用健康
slug: /develop-environment/debugging-app-health
source_path: reference/hde/debugging-apphealth.md
source_blob: 8db428461202293c66a66e6c8b8264b6cb6d99ab
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/debugging-apphealth.html)

这里汇总了正在运行的程序抛出的问题。它们可能是异常（那些粉色的节点），也可能来自 `Warn [VL.Session]` 节点 —— 这个节点你自己也可以放进草图里，用来标记某处有问题。

![](https://thegraybook.vvvv.org/images/reference/hde/2023-12-20-21-14-47.png)

**异常是严重的，必须当回事** —— 那意味着你的程序崩了。

Error、Warning 和 Info 则是节点库作者留下的消息。程序没崩，但有些地方不太对劲，你多半得回头看一眼。

注意：和 [Build Result](debugging-buildresult.md) 一样，这个视图也是**即时的** —— 它永远只显示当下的状况。想查程序历史上出过哪些问题，去看[日志](debugging-log.md)。
