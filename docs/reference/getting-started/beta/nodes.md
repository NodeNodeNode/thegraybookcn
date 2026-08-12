---
title: Nodes / 节点差异
slug: /getting-started/beta-nodes
source_path: reference/getting-started/beta/nodes.md
source_blob: 84b5ad73a187676a921e5f6d4deb217b92a98c6a
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/beta/nodes.html)

这里逐个看那些在 VL 里与 vvvv beta 行为不同的节点。

## IOBox (String) {#iobox-string}

在 vvvv beta 里，IOBox (String) 接到一个需要文件名或目录的针脚上时，会自动适配，你右键就能得到相应的打开对话框。

VL 里有专门的 IOBox (Path) 来处理文件和目录路径，但它（暂时）不知道你想选哪一种。所以默认右键打开的是文件对话框；想要目录对话框，得**按住 <span class="keyseq"><kbd>Shift</kbd></span> 再右键**。

## Cons {#cons}

在 vvvv beta 里，单个值和 Spread 都能接到 Cons 节点上。而 VL 区分单个值与 Spread（见上文关于 Spread 的一节），所以现在是两个节点：

* **Cons**：把多个单值合成一个 Spread
* **Concat**：把多个 Spread 连接成一个 Spread

如果你想把单值和 Spread 混在一起，得先用 ToSpread 节点把单值转成 Spread。增减这类节点的针脚数量，见上文「给节点添加针脚」。

## Map and MapRange {#map-and-maprange}

以前是一个节点配一个枚举来选择映射模式，VL 里改成了几个各司其职的节点：

* Clamp
* Mirror
* Wrap
* Map

除了简单的 Map 之外，还有把映射与特定模式组合起来的节点：

* MapClamp
* MapMirror
* MapWrap

## InputMorph {#inputmorph}

在找 InputMorph (Animation) 节点？它现在叫 Lerp，是[线性插值](https://en.wikipedia.org/wiki/Linear_interpolation)的缩写。

但要注意两处差异：

* InputMorph 的**第一个**输入是插值因子（“Switch” 针脚），而 Lerp 上对应的 “Scalar” 输入在**最右边**
* InputMorph 可以有任意多个输入并在它们之间插值，**Lerp 只有两个输入**

## Quaternions / 四元数 {#quaternions}

有一处差异要留意：**乘法顺序是反的。** VL 采用教科书的四元数乘法约定，而 vvvv beta 用的是 DirectX 的实现 —— 后者偏离了通用约定，目的是让四元数的表现和旋转矩阵一致。如今大多数 3D 引擎都用教科书约定，我们与之保持一致，这样你读别处的文档和代码时会更顺。
