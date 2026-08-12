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

但这份数据 `(0, 1, 2)` 同样可以被理解为某种更通用的类型。我们甚至可以说：Spread 不过是某个对象。这话说了等于没说，可它是对的。到某个时候，你可能想把不同的东西装进同一个 Spread —— 用「对象的 Spread」就能做到，因为任何东西也都是对象。

目前子类型关系都是内建的。将来你或许能设计自己的抽象父类型，并连出属于这个父类型的子类型。
