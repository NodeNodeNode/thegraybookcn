---
title: Libraries / 节点库
slug: /libraries/
source_path: reference/libraries/overview.md
source_blob: ca41048670d26d3f8d8df854abf81c82335221cd
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/overview.html)

VL 的功能被组织成一个个节点库，也叫 NuGet 包，或者干脆叫 “pack”。它们并非全都随 vvvv 发布，但都很容易装上。其中大多数是开源的，而且有不少是由和你一样的 vvvv 用户提供和维护的。想纵览有哪些可用，见：

VL NuGet 的在线浏览器：**http://vvvv.org/packs**

想了解怎么在 vvvv 里使用 NuGet，参阅[管理 NuGet](/develop-environment/managing-nugets) 这篇文档，或者看 [HowTo Use NuGets（英文）](https://youtu.be/-U_kUQ3VDog) 这个视频。

## VL.CoreLib {#the-vlcorelib}

VL 的默认节点库叫 VL.CoreLib，它为最基本的打草图需求提供节点和类型。下面纵览它会给引用了它的文档添加哪些目录。

| 目录 | 内容 |
|---|---|
| 2D | Vector2、Rectangle、Circle 这类 2D 图元，以及 2D 变换和碰撞节点。此外还有各种与 2D 相关的数学节点。 |
| 3D | Vector3、Box、Sphere 这类 3D 图元，以及 3D 变换和碰撞节点。此外还有各种与 3D 相关的数学节点。 |
| Adaptive | 能对不同数据类型运算的节点，比如能处理数字、字符串、颜色……的 `+ [Adaptive]`，或者对 2D 和 3D 向量都管用的 `Length [Adaptive]`。 |
| Animation | 基于时间的节点，比如时间发生器（LFO、Stopwatch……）和滤波器（Damper、Oscillator……）。它还有一个子目录 *FrameBased*，里面是功能类似但改为逐帧运算的节点。 |
| [Collections](/libraries/collections) | 最值得一提的是 Spread，此外还有 Sequence、Dictionary、HashSet 这些较简单的集合。 |
| Color | 包含 RGBA 颜色类型，以及在不同色彩空间之间转换的 Operation。 |
| Control | 用来打控制流的节点，比如 FlipFlop、MonoFlop…… |
| IO | 鼠标、键盘和触摸节点，以及文件 IO、Path（目录、文件名）和网络相关的节点。 |
| Math | 通用数学、算法…… |
| Primitive | 包含各种基本数据类型，比如 Bool、Byte、Integer32/64、Float32/64、Char、String。 |
| [Reactive](/libraries/reactive) | 响应式编程的节点。 |
| System | [XML](/libraries/xml)、[JSON](/libraries/json)、DateTime、[序列化](/libraries/serialization)…… |
| Text | TypeWriter |

## 缺什么吗？{#anything-missing}

万一你发现缺了什么，有这么几个选择：

* 我们提供定制开发，别客气，[联系我们](mailto:devvvvs@vvvv.org)！
* 如果你熟悉文本编程，那么[做一个自己的节点库](/extending/)相当容易
* 除了专为 vvvv 做的节点库，你还可以[使用几乎任何 .NET 库](/extending/using-net-libraries)
* 你也可能在这些地方找到别人做到一半的东西：
  * vvvv 论坛的 [WIP 版块](https://forum.vvvv.org/c/wip/27)
  * GitHub 上[带 VL 标签的仓库](https://github.com/topics/vl)
