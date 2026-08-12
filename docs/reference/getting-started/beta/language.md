---
title: The Language / 语言差异
slug: /getting-started/beta-language
source_path: reference/getting-started/beta/language.md
source_blob: d25228d49a0b271b9a6db661ceec688a5ec169b5
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/beta/language.html)

## Nodes / 节点 {#nodes}

在 vvvv beta 里所有节点长得都一样。VL 则区分**过程节点**和**运算器节点**：

*（上游此处待补图：过程节点 LFO、运算器节点 Distance、成员运算器节点 Any 的对比）*

* **过程节点是有状态的**，针脚下面有一条较深的横条
* **运算器节点是无状态的**，没有那条横条

有状态意味着过程节点可以跨帧保存数据。无状态的运算器节点则是简单的函数，只能对通过输入拿到的数据做运算。

从这个角度说，vvvv beta 里所有节点都**可能**有状态，但你没有简单的办法看出它究竟有没有。

为什么区分这件事重要？因为它极大改善了你构建草图的方式 —— 你可以有意识地决定哪些部分持有状态、哪些不持有。这提升了可读性，更重要的是简化了调试：某些类型的问题只可能在有状态的地方出现。所以碰上运行时或逻辑问题，先去看过程节点总是明智的。

## Naming Conventions / 命名约定 {#naming-conventions}

命名约定略有变化，现在是：

```
Name (Version1 Version2 ..) [Category.Subcategory]
```

而 vvvv beta 里是：

```
Name (Category Version1 Version2)
```

## Operations / 运算器 {#operations}

在 vvvv beta 里，每个草图恰好定义一个运算。VL 里一个草图可以定义任意多个运算器，每个都有你自己指定的名字和版本，并继承所在草图的目录。

*（上游此处待补图：一个草图里的多个运算器）*

## IOBoxes vs Pins / IOBox 与针脚 {#ioboxes-vs-pins}

在 vvvv beta 里，IOBox 既可以用来设置值也可以用来显示值；给它起个有描述性的名字，它就变成了所在草图的输入或输出针脚。VL 则把 IOBox 和针脚分开了：IOBox 仍然用来设置或显示值，而运算器的入口和出口要用显式的针脚元素来指定。

*（上游此处待补图：IOBox 与针脚的对比）*

和 vvvv beta 一样，拉连线时按中键可以创建 IOBox。而如果拉连线时按 <span class="keyseq"><kbd>Ctrl</kbd></span> + 左键单击，创建的则是一个入口或出口。

针脚和 IOBox 都可以通过中键点击来配置。输入针脚还可以指定默认值。

*（上游此处待补图：配置针脚或 IOBox）*

关于针脚还有一点：在 vvvv beta 里，你习惯了删掉接进基本类型（value、string、color、enum）输入针脚的连线时，针脚会留住最后进来的值。**VL 不会这样 —— 输入针脚不能存值。**

## Values / 数值 {#values}

vvvv beta 里只有一种数值类型，就叫 “Value”，内部用 Float64 表示（作为用户你几乎不用操心）。任何 Value 类型的输出都能接到任何 Value 类型的输入上，哪怕它们的子类型不同，比如 Integer、Boolean 或 Bang。

VL 里数值类型有很多：

* Boolean
* Byte
* Integer32
* Integer64
* Float32
* Float64

而且目前**只能从低精度连到高精度**，比如从 Integer32 连到 Float32（或 Float64），反过来不行。

## Vectors / 向量 {#vectors}

在 vvvv beta 里，2/3/4 维向量和有 2/3/4 个 slice 的 Spread 没有区别。VL 里有明确的向量类型：Vector2、Vector3、Vector4。

## Spreads {#spreads}

vvvv beta 里有 Spread 生成器（如 LinearSpread）、Spread 运算器（如 GetSlice、Zip）和 Spread 汇点（如 Bounds、Mean）。VL 里这些都有，而且更多 —— 还有个额外的好处：**所有 Spread 操作对所有数据类型都始终可用**，不必为此往节点浏览器里塞更多节点。见 Generics。

在 vvvv beta 里，两个针脚之间的每条连接都是一个 Spread。Spread 可以有 0 个、1 个或多个 slice，但无论如何它都是 Spread。

VL 里这件事定义得更清楚，有几点需要理解：

* **单个值** 和 **只有一个值的 Spread** 是两回事
* 说到 Integer32、字符串或颜色的 Spread 时，我们写作 `Spread<Integer32>`、`Spread<String>`、`Spread<RGBA>`
* 也可以有多维的 Spread，比如 `Spread<Spread<Float32>>`
* Spread 只是集合的一种。另外常见的集合类型还有 Dictionary 或 HashSet，能想到的集合类型还有很多。不过入门阶段你主要用的还是 Spread

## Spreading {#spreading}

在 vvvv beta 里，每个节点都能自动 spreading —— 也就是对输入上的每个 slice 都执行一遍。这个便利特性 VL（暂时）还没有，不过我们仍在考虑实现类似的东西。

*（上游此处待补图：VL 节点外套一个循环 vs. vvvv beta 的隐式 spreading）*

## Bin Size {#bin-size}

Bin Size 是 vvvv beta 为了绕开「没有多维 Spread」而想出的办法：给一个 spread 过的针脚配一个 Bin Size 针脚，你就能指定节点该如何解读这个 spread 的各个 bin。既然 VL 的 Spread 可以嵌套 Spread，Bin Size 这个概念就不再需要了。

## Framedelay {#framedelay}

在 vvvv beta 里用 framedelay 有两个理由：

* 确保一件事发生在另一件之后
* 把一个值存到下一帧

VL 里你只会为第一种情况使用 FrameDelay 节点。如果草图需要把值存到下一帧，那就该建一个类型草图 —— 这时你可以用[参数](../../language/properties.md)把程序组织得好得多。

## Adding pins to nodes / 给节点添加针脚 {#adding-pins-to-nodes}

像 `+`、`*`、`Cons` 这类针脚数量可变的节点，选中之后按 <span class="keyseq"><kbd>Ctrl</kbd><kbd>+</kbd></span> 或 <span class="keyseq"><kbd>Ctrl</kbd><kbd>-</kbd></span> 就能增减针脚。
