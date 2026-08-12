---
title: Aspects / Aspect
slug: /extending/aspects
source_path: reference/extending/aspects.md
source_blob: d40105c80b3e665b0bbc3953970299e569d20b6e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/aspects.html)

Aspect 主要用在节点库开发中。它能让你：

* 把「标准」节点与「进阶」「内部」节点区分开
* 把节点标记为「已废弃」或「实验性」

在节点浏览器里，Aspect 可以用来[过滤节点（英文）](https://thegraybook.vvvv.org/reference/hde/the_nodebrowser.html#filtering-nodes)。

VL 有这几个 Aspect 关键字：

* Advanced
* Internal
* Experimental
* Obsolete
* Adaptive

## Advanced {#advanced}

Advanced 大概是最重要的一个 Aspect。它背后的想法是：节点库的开发者会提供少数几个特别好用的节点和类型，覆盖这个库 90% 用户的需求。开发者希望这些易用的节点默认就出现在节点浏览器里；只有当用户遇到更进阶的需求时，其余的节点和类型才需要一并可见。

为此，节点库开发者可以随自己的心意组织这个库的结构，然后把额外的进阶节点放进 Advanced 目录 —— 这就告诉节点浏览器：Advanced 按钮关着的时候（默认就是关着的）把它们藏起来。

节点浏览器还有一个按钮，用来显示／隐藏「标准」节点（默认开着），方便你检查自己的库是否前后一致。

## Internal {#internal}

有了这个 Aspect，节点库开发者可以把节点的可见性控制得更细。

*Internal* 让节点和类型只在定义它们的那个 .vl 文档内部可用。它适合那些换个语境就毫无意义的小工具和辅助节点 —— 当这个文档被别的文档引用时，它们不该被「暴露」出去。

## Obsolete 与 Experimental {#obsolete-and-experimental}

这两个分别留给过去和未来的节点。

还没做完、或者只是某项新技术的概念验证的节点，应该放进 *Experimental* 目录。用这些节点要当心，它们可能不稳定，将来也可能出现破坏性改动。

*Obsolete* 一望即知：带这个 Aspect 的节点只是为了保持向后兼容才留着，不该再用了，因为多半已经有更新／更好的版本。

## Adaptive {#adaptive}

你可以在任何地方建一个 *Adaptive* 目录，它会把目录内所有的节点签名加进自适应体系，于是每一个类型都可以去实现这样一个节点。举例来说，自适应的运算符 `+`、`-`、`*`、`/`、`=` 等等就放在 *Math.Adaptive* 目录里，因而它们在节点浏览器里显示在 *Math* 之下。

给节点施加 Aspect 有几种不同的方式：

## 给一组节点指定 Aspect {#specifying-aspects-for-groups-of-nodes}

用上面任意一个关键字作为名字建[目录](/language/categories)，就能把 Aspect 施加到这个目录内定义的所有节点上。

注意，Aspect 虽然是以目录的形式指定的，但它并不计入节点真正的完整目录。所以举例来说，*MyLibrary.Particles.Advanced* 或 *MyLibrary.Advanced.Particles* 都只会变成 *MyLibrary.Value*。

在提示框里，Aspect 与目录被清楚地区分开：

![](https://thegraybook.vvvv.org/images/libraries/aspect_tooltip.PNG)

## 给单个数据类型定义指定 Aspect {#specifying-an-aspect-for-a-single-datatype-definition}

对 Process、Record 或 Class，可以通过[草图浏览器](/language/patch-explorer#datatype-patch-explorer)设定 Aspect。

给某个类型指定的 Aspect，同样作用于它内部的所有元素！

## 给单个运算器指定 Aspect {#specifying-an-aspect-for-a-single-operation}

要给单个[运算器](/language/operations)指定 Aspect，只要把关键字写进运算器名字的版本部分，比如：

```
GetBytes (Advanced) 或 Transform (Normal Advanced)
```
