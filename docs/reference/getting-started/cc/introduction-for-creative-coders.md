---
title: Introduction for Creative Coders / 写给 creative coders
slug: /getting-started/introduction-for-creative-coders
source_path: reference/getting-started/cc/introduction-for-creative-coders.md
source_blob: db34b7f3c4a78d66fdcc0e55f51920cdf9dae2b6
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/cc/introduction-for-creative-coders.html)

作为创意工程师，你所使用的各式各样的框架，它们基本上都在做着类似的工作。而它们之间最大的不同在于**是如何完成工作的**。vvvv 的开发基本上开始于 2000 年左右，这么多年来一直专注于如何更方便、更快速地使用实时的可视化编程环境。而最新的版本，也就是 vvvv gamma，则是这漫长经验累积的结果。

## What people are using vvvv for / 用户使用 vvvv 来做些什么 {#what-people-are-using-vvvv-for}

vvvv 被广泛地用于各种领域，包括：生成艺术、交互设计、数据可视化、计算机视觉、VR、演出控制、物理计算、机器学习，以及各式各样的快速原型设计。可以来 [Gallery](https://visualprogramming.net/#Showcase) 看看各种案例。

---

根据你从不同的平台而来，vvvv 可以提供给你不同的益处。

## Coming from other visual programming environments / 来自其他的创意编程环境 {#coming-from-other-visual-programming-environments}

如果你对下列可视化编程环境很熟悉：

- [cables](https://cables.gl/)
- [Isadora](https://troikatronix.com/)
- [Max](https://cycling74.com/)
- [PD](http://puredata.info/)
- [TouchDesigner](https://derivative.ca/)
- [Vuo](https://vuo.org/)

……那么下面的信息你可能会感兴趣。

### Vast, modular, open-source library of nodes / 庞大、模块化、开源的节点库 {#vast-modular-open-source-library-of-nodes}

查看[节点库](../../libraries/overview.md)页面，你可以纵观各式各样、数量庞大的 vvvv 节点库。大部分节点库是开源的（少数因为组织结构的原因没有做到开源）。除了核心库 VL.CoreLib 之外，还有几个大型的节点库：

- **VL.Stride**：用作 3D 渲染、着色器编程、VR 等，基于 [Stride 引擎](https://www.stride3d.net/)
- **VL.Skia**：用作 2D 渲染、矢量图形输出等，基于 [Skia](https://skia.org/)
- **VL.OpenCV**：用作计算机视觉等，基于 [OpenCV](https://opencv.org/)
- **VL.Fuse**：一个用于 Stride 的 GPU 工具集
- **VL.Elementa**：一个基于 Skia 的 UI 组件库

此外还有一系列开箱即用的外接设备节点库和 IO 协议节点库。

### Export Windows applications / 导出 Windows 应用程序 {#export-windows-applications}

任何你用 vvvv 编写的项目，都可以被[导出](../../hde/exporting.md)成一个 Windows 应用程序。其他平台也在计划中。

### Comfortable licensing model / 舒适的授权模式 {#comfortable-licensing-model}

vvvv 对于非商业用途是免费的。下载安装，然后用就是了：

- 不会问你多余的问题
- 没有复制保护
- 没有功能限制
- 没有强制注册
- 按你商业项目的类型和规模付费（个人、自由开发者或中小企业、大型商业项目）
- 你拿到的始终是最新版本
- 支持按年或按月计费

如果你要开始用 vvvv 做商业项目，只需要[按开发者席位购买授权](https://store.vvvv.org/)。

## Coming from text based coding / 来自文本编程 {#coming-from-text-based-coding}

如果你熟悉的是基于文本的创意编程，比如：

- [Cinder](https://www.libcinder.org) 或 [OpenFrameworks](https://openframeworks.cc)
- [Nannou](https://nannou.cc) 或 [rin](https://rin.rs)
- [Processing](https://processing.org) 或 [p5.js](https://p5js.org)
- [OpenRNDR](https://openrndr.org)

……那么下面这些可能对你有意思。

### Save time / 省时间 {#save-time}

vvvv 没有那个经典的、耗时的「改代码 — 编译 — 运行」循环。**你对 vvvv 程序做的每一个改动，都会立刻看到结果。** 我们把这叫做**实时编程**，用的是状态热重载的思路：每次改动都会在底层被立即编译，不需要你去触发。如果出错了，你会就地看到一个标记或提示框告诉你问题在哪，而你可以直接修 —— 不必重启程序，也不会丢掉状态。

再加上[丰富的节点库](../../libraries/overview.md)（连上就能用），vvvv 让你在很短时间里就能把常见的基础场景原型做出来。

### Use familiar techniques / 用你熟悉的技术 {#use-familiar-techniques}

VL（vvvv 使用的语言）不是那种只能拿现成积木、又很难扩展的普通可视化语言：它有循环和 if 区块，支持递归，允许你定义并实例化自己的数据类型（甚至是 Generic 的），也能定义和实现接口。这意味着你不局限于数据流编程，还可以把面向对象的经验用上。此外你还能用 Delegate 和 Observable，让程序的一部分异步执行 —— **这一切都不需要写一行代码。**

### Write your own nodes / 自己写节点 {#write-your-own-nodes}

诚然，某些东西 —— 比如底层算法 —— 有时候用文本写更容易。[节点可以用](../../extending/overview.md)纯 C# 或 F# 编写，不需要任何 vvvv 专有的样板代码。也正因如此，你可以直接使用 [NuGet](http://nuget.org) 包管理器上托管的任何 .NET 库。

## What you may miss / 你可能会怀念的东西 {#what-you-may-miss}

和上面列出的那些框架相比，你可能会觉得少了点什么：

- vvvv 目前仍然只支持 Windows，我们计划在某个时候改变这一点
- vvvv 不能导出到移动端或网页。这并非完全不可能，但目前不在路线图上

## Getting Started / 从哪里开始 {#getting-started}

- 先看[这批教程](https://www.youtube.com/playlist?list=PLBTgwgsWWcT_VMMrwsy3Ao7_ubazEGL4s)，再看[这批](https://www.youtube.com/playlist?list=PL2KeRstDQVRRVnzCHEambwAI4yWmpIF-p)，把最基础的部分过一遍
- 看看 [The NODE Institute](https://thenodeinstitute.org/) 有没有即将开课的线上课程
- 还有 [NODE20 研讨会录像](https://vimeo.com/showcase/node20workshops)，另有 90 小时的学习内容
- 等你有了更具体的问题，去 [HowTo 系列](https://www.youtube.com/playlist?list=PLBTgwgsWWcT-G9lk-IlKLkGZJ9NnXcuBV)里找答案

在 vvvv 里按 <span class="keyseq"><kbd>F1</kbd></span> 打开帮助面板，那里有大量各种主题的示例和帮助草图。另外：**选中任意一个节点再按 F1，可以看到它专属的帮助草图。**

还有疑问？在[论坛](http://forum.vvvv.org)或[聊天室](https://app.element.io/#/room/#vvvv:matrix.org)里，开发者和热情的全球社区会帮你。
