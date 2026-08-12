---
title: Libraries / VL.CoreLib 核心库
slug: /libraries/
source_path: reference/libraries/overview.md
source_blob: ca41048670d26d3f8d8df854abf81c82335221cd
status: partial
last_synced: '2026-08-12'
---

VL.CoreLib 是 VL 的默认库，它为最基本的编程提供了节点和数据类型。以下是按文档引用的分类概述。

| 分类 | 内容 |
| --- | --- |
| 2D | 基础 2d 元素如 `Vector2` `Rectangle` `Circle` ... 2d 变换及碰撞节点，2d 相关的数学运算节点 |
| 3D | 基础 3d 元素如 `Vector3` `Box` `Sphere` ... 3d 变换及碰撞节点，3d 相关的数学运算节点 |
| Adaptive | 可以对不同数据类型进行操作的节点，例如可以对数字、字符串、颜色进行操作的 `+[Adaptive]` 节点，适用于 2D 和 3D 向量的 `Length[Adaptive]` |
| Animation | 基于时间的节点，如时间生成器（`LFO`、`Stopwatch`）和过滤器（`Damper`、`Oscillator`）。还有一个子类别 *FrameBased*，其中包含操作 *FrameBased* 的类似节点 |
| Collections | 包含最常用的 `Spread`，也包含其他简单集合，如 `Sequence`、`Dictionary` 和 `HashSet` |
| Color | 包含 RGBA 颜色类型和从不同颜色空间转换的操作 |
| Control | 用于控制流的节点，如 `FlipFlop`、`MonoFlop` |
| IO | 鼠标、键盘和触摸节点以及用于文件读写、路径（目录、文件名）和网络的节点 |
| Math | 普通数学、算法 |
| Primitive | 包含基本数据类型，如 `Bool`、`Byte`、`Integer32/64`、`Float32/64`、`Char`、`String` |
| Reactive | 响应式编程节点 |
| System | `XML`, `JSON`, `DateTime`, `Serialization` |
| Text | TypeWriter |
