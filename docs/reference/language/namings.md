---
title: Identifier Naming Conventions / 标识符命名约定
slug: /language/namings
source_path: reference/language/namings.md
source_blob: bdf977d4396483147cc56d9f463190ec569f47cd
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/namings.html)

VL 采用 Pascal Case 作为大小写约定。例如：

数据类型：

```
Particle
ParticleSystem
AlignedBox
```

Operation：

```
Update
GetPosition
SplitCurve
```

总体上允许使用下面这些字符，但不能以数字或空格开头：

**a-z A-Z 0-9 + - \* / = ~ < >**

Pad 和针脚的名字里应当带空格，这样看起来更舒服，也和 Operation 区分得开：

```
Velocity
Map Mode
Word List
```

目录名可以包含点号：

```
Math
Collections.Spread
Animation.FrameBased
```
