---
title: C# Concepts / C# 概念
slug: /getting-started/csharp-concepts
source_path: reference/getting-started/dotnet/concepts.md
source_blob: cf6b25960f2290f21c1957351e2d73b11de2d988
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/dotnet/concepts.html)

以及它们在 VL 里怎么表达。

## foo++ {#foo}

像下面这样的表达式，在 VL 里怎么写：

```csharp
var foo = 1;
foo++;
```

首先我们得同意，上面这段只是这样写的简写：

```csharp
var foo = 1;
foo = foo + 1;
```

那么下面这张草图应该这样读：**下面**那个 foo 数据板对应赋值号的左边（`foo =`），**上面**那个 foo 数据板对应被初始化的变量（`var foo = 1`）。也就是：

```
foo（下面的数据板） = foo（上面的数据板） + 1;
```

*（上游此处引用的图片在其仓库中已缺失：示意从 IOBox 连到 foo 数据板的那条线是白色的，表示它被指派给了构造器）*

*（上游此处引用的图片在其仓库中已缺失：示意 `+ 1` 的快捷写法 —— 用 Inc 节点）*

## Nullable {#nullable}

引用外部库时，你可能会碰到类型为 **Nullable&lt;T&gt;** 的输入或输出针脚。要处理它们，需要从 GAC 中[引用](../../extending/overview.md) **System.Runtime** 程序集。

这样你就能用 HasValue 和 Value 这两个节点从可空的输出里读值。而要给一个需要 `Nullable<T>` 的输入设值，只要在值和那个输入之间放一个 CastAs 节点就够了。

:::note
CastAs 只有在节点浏览器里启用了 **Advanced** 视角时才会出现。
:::

## Variables / 变量 {#variables}

（上游此节尚未撰写。）

## Lambda {#lambda}

（上游此节尚未撰写。）

## Observable {#observable}

见[响应式](../../libraries/reactive.md)。

## Task {#task}

（上游此节尚未撰写。）

## Enumerator {#enumerator}

引用外部库时，你可能会碰到一些集合类型，它们并不继承自 Sequence，因此没法直接用在 VL 的 ForEach 循环里。

这类集合多半仍然支持 Enumerator。在 VL 里处理 enumerator 的办法是用这两个节点：MoveNext 和 Current。
