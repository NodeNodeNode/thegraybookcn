---
title: Categories / 目录
slug: /language/categories
source_path: reference/language/categories.md
source_blob: c175c6ed2d7de278bd9d2b581e23f3f4666340e6
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/categories.html)

VL 里的目录相当于其他编程语言的「命名空间」，用来组织自己的节点库。

## A documents category / 文档的目录 {#a-documents-category}

每个 VL 文档都开启一个目录，在该文档的 Definitions 草图里定义。

![](https://thegraybook.vvvv.org/images/language/07_DocPatch.png)
把 “Voo” 指定为文档的目录

## Category elements / 目录元素 {#category-elements}

在[Definitions 草图](patches.md#definitions-patch)里，通过节点浏览器选 “Category” 就能添加目录元素，用来搭出一套目录结构、把节点库的不同部分装进去。

目录名会**追加**到上级草图的目录后面，于是你能搭出任意层级、并在节点浏览器里看到。多级目录用点号书写，比如 *MyCat1.MyCat2*。

![](https://thegraybook.vvvv.org/images/language/03_CategoryOutside.PNG)
从外面看目录草图

![](https://thegraybook.vvvv.org/images/language/04_CategoryInside.PNG)
目录草图的内部

## Full Category / 完整目录 {#full-category}

Full Category 与普通目录类似，区别是**不**追加到上级目录后面，而是另起一个根目录。

![](https://thegraybook.vvvv.org/images/language/05_FullCategoryOutside.PNG)
从外面看目录草图

![](https://thegraybook.vvvv.org/images/language/06_FullCategoryInside.PNG)
目录草图的内部

:::note
空目录不会出现在节点浏览器里。
:::

## Changing the Patch Type / 改变草图类型 {#changing-the-patch-type}

用草图类型的枚举，可以轻松把目录转成 [group patch（英文）](https://thegraybook.vvvv.org/reference/language/groups.html)，反过来也行。注意看标签是怎么变化、怎么反映实际的目录结构的：

![](https://thegraybook.vvvv.org/images/language/08_ChangePatchType.gif)
把 group 转成目录

## Setting Categories on Definitions / 在定义上设置目录 {#setting-categories-on-definitions}

好像上面这些选择还不够多似的，还有一种方式可以给 Operation 或数据类型的定义指定目录：

![](https://thegraybook.vvvv.org/images/language/09_SetCategoryOnDef.gif)
在数据类型或 Operation 的定义上设置目录
