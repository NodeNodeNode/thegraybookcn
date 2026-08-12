---
title: Collections / 集合
slug: /libraries/collections
source_path: reference/libraries/collections.md
source_blob: 0714a25d82e5c677c6b0ba103f2455f91014fe4d
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/collections.html)

VL.CoreLib 里带了大量不同的集合类型：

## Sequence {#sequence}

VL 里集合的基础类型是 *Sequence*。它对应 .NET 世界里所谓的 *IEnumerable* —— 我们只是给了它一个更好读的名字。

## Spread {#spread}

Spread 是一种特化的 Sequence。Spread 里的元素叫作 slice。当你向一个有 4 个 slice 的 Spread 索要序号为 6 的 slice 时，它不会抱怨，而是把序号对它的个数取模 —— 也就是 6 mod 4 = 2 —— 然后返回序号为 2 的那个 slice。

## SpreadBuilder {#spreadbuilder}

SpreadBuilder 是 Spread 的可变版本，用在性能要紧的场景里。典型场景是需要在循环里往 Spread 增删 slice。这种情况下用 SpreadBuilder 来改动，最后再用 ToSpread 回到安全的不可变世界。

## Dictionary {#dictionary}

Dictionary 是一种键值集合。往字典里添加条目（值）时要给一个标签（键）。键必须唯一，因此可以用它从字典里取回单个的值。

键常常是字符串，但其实可以是任何别的数据类型。

## HashSet {#hashset}

表示一组值的集合。

---

在节点浏览器里打开 `Advanced` 这个 Aspect，可以看到更多集合类型。
