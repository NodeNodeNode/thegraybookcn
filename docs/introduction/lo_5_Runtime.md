---
title: The running System / 运行中的系统
slug: /explanations/the-running-system
source_path: introduction/lo_5_Runtime.md
source_blob: 79f8133f055ab13d39e8b78f6c1f91458479af3e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/lo_5_Runtime.html)

这么说可能有点耍赖，但你不妨把**整个运行中的系统**想成一个过程节点：它被创建一次，然后被反复更新。

## A Root Patch / 根草图 {#a-root-patch}

根草图定义了这个过程。

*给 vvvv 用户：在 vvvv 里克隆一个 VL 模板时，你创建的就是一个新的根草图。那个 vvvv 节点持有并管理你刚创建的这个过程的一个实例。*

## Create And Update {#create-and-update}

在根草图里，你定义「系统启动时发生什么」和「系统运行时发生什么」—— 方法是把节点分别放到 “Create” 和 “Update” 上。

既然我们还在「看待事物」这一章：

![](https://thegraybook.vvvv.org/images/introduction/createAndUpdate.png)

再说一遍：草图的一部分只在系统启动时执行一次，另一部分则被一遍遍地调用。你能看出哪部分是哪部分吗？

*给 vvvv 用户：在 vvvv 里创建或重置这个节点时，过程会被重置，也就是 “Create” 被调用。从那之后，每一个 vvvv 帧都会调用 “Update”。*

## Persistency / 持久性 {#persistency}

前面说了，根草图就像一个过程节点：它一直在那儿，并且会演变。它可以在内部存下数据，下一帧再取出来。
