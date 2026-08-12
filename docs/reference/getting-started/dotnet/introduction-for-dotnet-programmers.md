---
title: Introduction for .NET programmers / 写给 .NET 开发者
slug: /getting-started/introduction-for-dotnet-programmers
source_path: reference/getting-started/dotnet/introduction-for-dotnet-programmers.md
source_blob: 3844bf2eb2a96fddb2bbff98e22bea98feb8f46f
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/dotnet/introduction-for-dotnet-programmers.html)

VL 是一门面向 [.NET](https://en.wikipedia.org/wiki/.NET) 的可视化编程语言。它把数据流编程和面向对象编程里的一些特性结合在一起。vvvv 则是 VL 的编辑环境。

- vvvv 5.x 使用 .NET 6
- vvvv 6.x 和 7.x 使用 .NET 8

由于可以直接访问 .NET 的全部库，你基本上可以把它当作又一门 .NET 语言来用，和 C# 或 F# 一样。但那些库大多不是为数据流设计的，所以我们为你精选整理了一个用起来舒服得多的库 —— 新建 VL 文档时默认引用的就是它。

## Language Features / 语言特性 {#language-features}

如果你熟悉 C#，除了「它是可视化的」这一点之外，VL 应该会让你觉得挺熟悉。不过有几样东西对你来说是新的：

### Spreads {#spreads}

VL 里主要的集合类型叫 **Spread**，它的每一项叫 **Slice**。Spread 是不可变集合，有一个特别之处：**对它调用 `GetSlice(Index)` 时，如果索引超出了元素个数，你拿到的不是错误，而是「索引对个数取模」之后那一项。**

比如一个有 5 个 slice 的 Spread，你要第 7 个，拿到的是第 2 个。

### Foreach with Multiple Inputs / 多输入的 Foreach {#foreach-with-multiple-inputs}

C# 里的 foreach 一次只能遍历一个集合，而 VL 里你可以同时遍历多个集合。**迭代次数由元素最少的那个集合决定。**

## Renamings / 重命名 {#renamings}

导入数据类型时，我们总体上尽量少改名字。但对集合类型，我们擅自做了这些调整：

* 所有 .NET 的不可变集合去掉 *Immutable* 前缀 —— 因为在 VL 里不可变才是默认
* 所有 .NET 的可变集合加上 *Mutable* 前缀
* IEnumerable 叫做 Sequence

## Getting Started / 从哪里开始 {#getting-started}

下面这些工作坊录像特别适合有 .NET 背景的人：

- [Introduction to vvvv For Coders](https://vimeo.com/467725726)
- [Using .NET NuGets](https://vimeo.com/467351841)
- [Object Oriented Patching](https://vimeo.com/467436333)
- [Introduction to Reactive Patching](https://vimeo.com/467724898)
- [Turning a .NET library into a VL library](https://vimeo.com/467350999)
- [Talk introducing vvvv to .NET developers](https://youtu.be/-Rr7QRYlZDc)

看完再回到[开始](../overview.md)那一页，那里有更多学习资源。

你可能还想了解怎么[扩展 vvvv](../../extending/overview.md)，以及看看我们的[示例库](https://github.com/vvvv/vl.demolib) —— 里面有用 C# 和 F# 为 VL 编写节点的例子。

还有疑问？去[论坛](http://forum.vvvv.org)或[聊天室](https://app.element.io/#/room/#vvvv:matrix.org)提问。
