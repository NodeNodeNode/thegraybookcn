---
title: Introduction for Creative Coders / 写给 creative coders
slug: /getting-started/introduction-for-creative-coders
source_path: reference/getting-started/cc/introduction-for-creative-coders.md
source_blob: db34b7f3c4a78d66fdcc0e55f51920cdf9dae2b6
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/cc/introduction-for-creative-coders.html)

创意编程的各种框架，做的事大同小异，真正的差别在于**怎么做**。vvvv 从 2000 年前后开始开发，二十多年只琢磨一件事：让实时的可视化编程环境更好用、更快。最新的 vvvv gamma 就是这些年经验的结果。

## What people are using vvvv for / 用户使用 vvvv 来做些什么 {#what-people-are-using-vvvv-for}

vvvv 用在很多领域：生成艺术、交互设计、数据可视化、计算机视觉、VR、演出控制、物理计算、机器学习，以及各种快速原型。到 [Gallery](https://visualprogramming.net/#Showcase) 看看实际案例。

---

你之前用什么，决定了 vvvv 能给你带来什么。

## Coming from other visual programming environments / 来自其他的创意编程环境 {#coming-from-other-visual-programming-environments}

如果你熟悉这些可视化编程环境：

- [cables](https://cables.gl/)
- [Isadora](https://troikatronix.com/)
- [Max](https://cycling74.com/)
- [PD](http://puredata.info/)
- [TouchDesigner](https://derivative.ca/)
- [Vuo](https://vuo.org/)

……那下面几点你大概会感兴趣。

### Vast, modular, open-source library of nodes / 庞大、模块化、开源的节点库 {#vast-modular-open-source-library-of-nodes}

到[节点库](../../libraries/overview.md)页面可以纵览 vvvv 的节点库，数量很大。大部分开源，少数因为组织上的原因没能开源。核心库 VL.CoreLib 之外，还有几个大块头：

- **VL.Stride**：用作 3D 渲染、着色器编程、VR 等，基于 [Stride 引擎](https://www.stride3d.net/)
- **VL.Skia**：用作 2D 渲染、矢量图形输出等，基于 [Skia](https://skia.org/)
- **VL.OpenCV**：用作计算机视觉等，基于 [OpenCV](https://opencv.org/)
- **VL.Fuse**：一个用于 Stride 的 GPU 工具集
- **VL.Elementa**：一个基于 Skia 的 UI 组件库

此外还有一系列开箱即用的外接设备节点库和 IO 协议节点库。

### Export Windows applications / 导出 Windows 应用程序 {#export-windows-applications}

用 vvvv 做的任何项目都可以[导出](../../hde/exporting.md)成 Windows 应用程序。其他平台在计划中。

### Comfortable licensing model / 舒适的授权模式 {#comfortable-licensing-model}

非商业用途免费。下载、安装、用：

- 不会问你多余的问题
- 没有复制保护
- 没有功能限制
- 没有强制注册
- 按你商业项目的类型和规模付费（个人、自由开发者或中小企业、大型商业项目）
- 你拿到的始终是最新版本
- 支持按年或按月计费

要拿 vvvv 做商业项目，[按开发者席位买授权](https://store.vvvv.org/)就行。

## Coming from text based coding / 来自文本编程 {#coming-from-text-based-coding}

如果你熟悉的是文本形式的创意编程，比如：

- [Cinder](https://www.libcinder.org) 或 [OpenFrameworks](https://openframeworks.cc)
- [Nannou](https://nannou.cc) 或 [rin](https://rin.rs)
- [Processing](https://processing.org) 或 [p5.js](https://p5js.org)
- [OpenRNDR](https://openrndr.org)

……那下面几点可能对你有意思。

### Save time / 省时间 {#save-time}

vvvv 没有那个经典的、耗时的「改代码 — 编译 — 运行」循环。**你对 vvvv 程序做的每一个改动，都会立刻看到结果。** 我们把这叫做**实时编程**，用的是状态热重载的思路：每次改动都会在底层被立即编译，不需要你去触发。如果出错了，你会就地看到一个标记或提示框告诉你问题在哪，而你可以直接修 —— 不必重启程序，也不会丢掉状态。

再加上[现成的节点库](../../libraries/overview.md)，连上就能用，常见场景的原型很快就能搭出来。

### Use familiar techniques / 用你熟悉的技术 {#use-familiar-techniques}

VL（vvvv 用的语言）不是那种只能拼现成积木、想扩展却无从下手的可视化语言。它有循环和 if 区块，支持递归，可以定义并实例化自己的数据类型（Generic 的也行），也可以定义和实现接口。所以你不必局限在数据流里，面向对象的经验照样用得上。还有 Delegate 和 Observable，让程序的一部分异步跑起来 —— **这些都不用写一行代码。**

### Write your own nodes / 自己写节点 {#write-your-own-nodes}

有些东西 —— 比如底层算法 —— 确实还是写文本更顺手。[节点可以](../../extending/overview.md)用纯 C# 或 F# 写，不需要任何 vvvv 专有的样板代码。也正因如此，[NuGet](http://nuget.org) 上的任何 .NET 库你都能直接拿来用。

## What you may miss / 你可能会怀念的东西 {#what-you-may-miss}

跟上面那些框架比，有几样东西 vvvv 还没有：

- vvvv 目前只支持 Windows，我们打算将来改掉这一点
- vvvv 导不出移动端和网页。并非做不到，只是眼下不在路线图上

## Getting Started / 从哪里开始 {#getting-started}

- 先看[这批教程](https://www.youtube.com/playlist?list=PLBTgwgsWWcT_VMMrwsy3Ao7_ubazEGL4s)，再看[这批](https://www.youtube.com/playlist?list=PL2KeRstDQVRRVnzCHEambwAI4yWmpIF-p)，把最基础的部分过一遍
- 看看 [The NODE Institute](https://thenodeinstitute.org/) 有没有即将开课的线上课程
- 还有 [NODE20 研讨会录像](https://vimeo.com/showcase/node20workshops)，另有 90 小时的学习内容
- 等你有了更具体的问题，去 [HowTo 系列](https://www.youtube.com/playlist?list=PLBTgwgsWWcT-G9lk-IlKLkGZJ9NnXcuBV)里找答案

在 vvvv 里按 <span class="keyseq"><kbd>F1</kbd></span> 打开帮助面板，那里有大量各种主题的示例和帮助草图。另外：**选中任意一个节点再按 F1，可以看到它专属的帮助草图。**

还有问题？到[论坛](https://forum.vvvv.org)或[聊天室](https://app.element.io/#/room/#vvvv:matrix.org)问，开发者和热心的全球社区都在。
