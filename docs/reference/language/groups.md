---
title: Groups / group patch
slug: /language/groups
source_path: reference/language/groups.md
source_blob: 3bdef26b53cfa2a142af79bd2af6f0ca410601fb
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/groups.html)

VL 里的 group 帮你在视觉上组织元素，但它对语言本身没有任何意义 —— 这一点和[目录](categories.md)不同。所以你可以用 group 把一些元素收进一个新草图里藏起来，给当前草图腾出空间，同时又不会给目录结构添一层。

在[Definitions 草图](patches.md#definitions-patch)里，通过节点浏览器选 “Group” 就能添加 group 元素。和目录一样，group 也可以嵌套。

![](https://thegraybook.vvvv.org/images/language/02_GroupInside.PNG)
group patch 的内部

![](https://thegraybook.vvvv.org/images/language/01_GroupOutside.PNG)
从外面看 group patch

group 可以很方便地转成[目录](categories.md)：

![](https://thegraybook.vvvv.org/images/language/08_ChangePatchType.gif)
把 group 转成目录
