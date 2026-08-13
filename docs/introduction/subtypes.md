---
title: Sub Types / 子类型
slug: /explanations/sub-types
source_path: introduction/subtypes.md
source_blob: 955914fb41afaf47a5e84e2440ba96730ba93a5d
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/subtypes.html)

正如在 [Spread 与其他集合](lo_9_2_Spreads.md)里提到过的，一个 Spread 既可以看作 List，也可以只看作 Sequence。

某个 Spread `(0, 1, 2)` 的类型是 Spread —— 这一点没什么可争的。

但这份数据 `(0, 1, 2)` 也可以理解成某种更通用的类型。我们甚至可以说：Spread 不过是个对象。这话听着等于没说，可它是对的。到某个时候你会想把不同的东西装进同一个 Spread —— 用「对象的 Spread」就行，因为任何东西都是对象。

目前子类型关系都是内建的。将来你或许能自己设计抽象父类型，再连出它的子类型。
