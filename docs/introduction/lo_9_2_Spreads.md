---
title: Spreads and Other Collections / Spread 与其他集合
slug: /explanations/spreads-and-other-collections
source_path: introduction/lo_9_2_Spreads.md
source_blob: d55d3e502ce5c338c5046fb3ef2413c51936dd87
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/lo_9_2_Spreads.html)

## Spread {#spread}

Spread 这个名字是我们从 vvvv 那里借来的。它就是一组已经准备好、随时可以被取用的元素 —— 换句话说：计算机内存里有一块地方装着全部元素，信息都在那儿，可以读取，个数已知，值也已知。

更要紧的是：**Spread 不可变。** 一个 Spread 从某个数据源出来，可以喂给很多个数据汇点，而我们可以向你保证：所有汇点访问到的永远是同一份数据。

**容易混淆之处其一：** Spread 类型的数据源当然可以随时间改变它的输出 —— 但它是通过**取到新的 Spread** 来做到的。

**容易混淆之处其二：** 当然也有节点可以「改变」Spread 的内容：写入新值、删掉某项、添加新项。但同样，这些操作**生成的是新的 Spread**，它们不会改动上游传来的那个。

Spread 提供了不少操作，其中一部分以 Operation 区块的形式提供，多数则是节点。

*（上游此处待补图）*

## SpreadBuilder {#spreadbuilder}

有个叫 SpreadBuilder 的东西，提供了更高效的方式来构造 Spread。**SpreadBuilder 是可变的**，只应该用在「需要对一个 Spread 连续做很多次改动」的地方。如果你确定自己已经到了做性能优化的阶段，用 ToBuilder 节点把 Spread 转成*builder*（构建器），做完再用 ToSpread 转回普通的 Spread。

我们建议你**只在局部使用 SpreadBuilder** —— 用它把 Spread 造出来，然后传递造好的那个 Spread，别把构建器本身传来传去。哪怕你需要把结果存起来以后用，也请存 Spread 而不是构建器。这会让你在理解一张草图时轻松很多。

## HashSet {#hashset}

HashSet 表示（数学意义上的）**集合**。

假设你有一个整数集合，里面可能有数字 2 —— 只可能有一个，不可能有多个。集合的意思就是：它装着某个类型的元素，而这个数据类型的每一个可能取值，要么在集合里，要么不在。

## Sequence {#sequence}

上面这些数据类型，都可以被看作数据的**序列** —— 也就是说，存在一种方式可以逐项地遍历它们的内容。比如 “ForEach” 循环区块需要的正是这一点，它才能把进来的元素在区块内部提供出来。

从头说起：不同的集合类型有不同的存储方式，它们在细节上有差异 —— 而这些差异**有时候并不重要**。所有这些集合都有**一个共同的方面**：你可以逐项遍历它们。

Sequence 这个类型就是为此存在的 —— 提供一块共同的地基。如果某个数据汇点只需要顺序遍历全部元素，那它可以接受 Sequence。如果你在做一个给别人用的节点，也可以只接受 Sequence —— 你的用户（也可能就是你自己）会很高兴能把任何自己想用的集合喂进来。

## List {#list}

Repeat 区块接受 List。List 和 Sequence 一样也是一种抽象：**任何有「个数」这一属性的集合都是 List。**

**Spread、SpreadBuilder 和 HashSet 三者既是 Sequence，也是 List。**
