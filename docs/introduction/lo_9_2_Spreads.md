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

Spread 这个名字是从 vvvv 借来的。它是一组随时可以取用的元素：内存里有一块地方装着全部元素，个数已知，值也已知，随时能读。

更要紧的是：**Spread 不可变。** 一个 Spread 从数据源出来，可以喂给很多个数据汇点 —— 所有汇点看到的永远是同一份数据。

**容易混淆之处其一：** Spread 类型的数据源当然可以随时间改变输出 —— 但办法是**换一个新的 Spread**。

**容易混淆之处其二：** 确实有节点能「改变」Spread 的内容：写入新值、删项、加项。但这些操作**生成的都是新的 Spread**，不会动上游传来的那个。

Spread 提供了不少操作，其中一部分以 Operation 区块的形式提供，多数则是节点。

*（上游此处待补图）*

## SpreadBuilder {#spreadbuilder}

SpreadBuilder 提供了更高效的构造方式。**它是可变的**，只该用在「要对一个 Spread 连续改很多次」的地方。确定自己到了优化性能这一步，就用 ToBuilder 把 Spread 转成*builder*（构建器），改完再用 ToSpread 转回来。

建议**只在局部用 SpreadBuilder**：用它把 Spread 造出来，然后传递造好的 Spread，别把构建器本身传来传去。要存起来以后用，也存 Spread，不要存构建器。这样草图好读得多。

## HashSet {#hashset}

HashSet 表示（数学意义上的）**集合**。

假设有一个整数集合，里面可能有数字 2 —— 只可能有一个，不会有多个。集合的意思就是：某个类型的每一个可能取值，要么在里面，要么不在。

## Sequence {#sequence}

上面这些类型都可以看作数据的**序列**：总有办法逐项遍历里面的内容。“ForEach” 循环区块要的正是这一点 —— 有了它才能把元素在区块内部一个个交出来。

不同的集合存储方式不同，细节各异 —— 但这些差异**有时候并不重要**。它们有一个共同点：都能逐项遍历。

Sequence 这个类型就是为此而生，提供一块共同的地基。数据汇点只要顺序遍历全部元素，接受 Sequence 就够了。做给别人用的节点也一样 —— 用户（很可能就是你自己）会庆幸能把任何顺手的集合喂进来。

## List {#list}

Repeat 区块接受 List。List 和 Sequence 一样也是一种抽象：**任何有「个数」这一属性的集合都是 List。**

**Spread、SpreadBuilder 和 HashSet 三者既是 Sequence，也是 List。**
