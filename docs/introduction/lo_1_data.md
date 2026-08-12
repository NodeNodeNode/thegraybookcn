---
title: Data and Data Types / 数据与数据类型
slug: /explanations/data-and-data-types
source_path: introduction/lo_1_data.md
source_blob: ff025754b1ebed2cefe89a97b7259b3d2c85c552
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/lo_1_data.html)

再来看一些数据：

| 类型 | 数据板 |
|---|---|
| Color（RGBA 颜色） | ![](https://thegraybook.vvvv.org/images/introduction/datatype-color.png) |
| Number（Integer32 整数） | ![](https://thegraybook.vvvv.org/images/introduction/datatype-Integer32.png) |
| Number（Float32 浮点数） | ![](https://thegraybook.vvvv.org/images/introduction/datatype-float32.png) |
| Boolean（真或假） | ![](https://thegraybook.vvvv.org/images/introduction/datatype-boolean.png) |
| String（也就是一段文本） | ![](https://thegraybook.vvvv.org/images/introduction/datatype-string.png) |
| Vector2 | ![](https://thegraybook.vvvv.org/images/introduction/datatype-vector2.png) |
| Vector3 | ![](https://thegraybook.vvvv.org/images/introduction/datatype-vector3.png) |
| Vector4 | ![](https://thegraybook.vvvv.org/images/introduction/datatype-vector4.png) |

大概是这么个意思。上面这些统统叫作数据。但这些数据之间差别很大，而你常常需要知道「在哪里该指望哪一种数据」。幸好人们把「数据的种类」叫作*data type*（数据类型），这个词恰好抓住了那个最朴素的想法：把一团乱麻分开，让所有可能的数据分属不同的类型，而每个类型又指代属于它的全部可能数据。

举个例子：草图里某个特定的数据源，我们指望从它那儿拿到一份颜色类型的数据 —— 简称一个颜色。一旦知道了这个数据类型，我们就知道：在世上所有可能的数据里，只有很小的一个子集可能出现在这个数据枢纽上。这颜色可以是红的、蓝的，甚至紫的，但它无论如何必须是个颜色。要是我们每次都得考虑「任何一种可能的数据」，那代码里就得准备一大堆兜底方案，以防真的来了一份意料之外的随机数据……

因为数据和数据类型无处不在，人们干脆把 data type 里那个冗余的 data 省掉，直接叫它 “type”（类型）。

## 实例 {#instances}

某个数据类型的数据，也叫作那个数据类型的*instance*（实例）。

*给 vvvv 用户：*

*在 VL 里，我们甚至把「一个颜色」和「多个颜色」区分开。这让你能搭出更复杂的系统，长远来看是帮了你。只要记住：VL 里的一个颜色，和一个装着颜色的 Spread，是两回事。*

关于数据的更多内容：[基本节点与数据类型](/explanations/basic-nodes-and-data-types) 和 [再谈数据（英文）](https://thegraybook.vvvv.org/introduction/more-on-data.html)
