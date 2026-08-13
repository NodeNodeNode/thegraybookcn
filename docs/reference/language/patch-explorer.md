---
title: The Patch Explorer / 草图浏览器
slug: /language/patch-explorer
source_path: reference/language/patch-explorer.md
source_blob: a4d0f245483fb510f77699559f73c0a2f672ef3e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/patch-explorer.html)

*Patch Explorer*（草图浏览器）能让你快速看清一个草图里有哪些元素，还可以在这里设置草图的名字和类型，以及随类型而变的其他参数。

## Showing and Hiding the Explorer / 显示与隐藏 {#showing-and-hiding-the-explorer}

草图浏览器默认不显示。点击编辑器左上角那两个 Quad 图标里**靠下**的那一个，就能切换它的显示状态：

![](https://thegraybook.vvvv.org/images/hde/patch-explorer.png)

草图的类型不同，浏览器里显示的内容也不同：

## Application Patch Explorer / Application 草图 {#application-patch-explorer}

![](https://thegraybook.vvvv.org/images/hde/application-patch-explorer.png)

- 不能指定名字
- 列出这个草图的全部[参数](properties.md)，可以增删
- 列出嵌套在里面的元素，比如[类型草图定义](patches.md#datatype-patches)和[静态 Operation 定义](operations.md#creating-a-static-operation)

## Definition Patch Explorer / Definitions 草图 {#definition-patch-explorer}

![](https://thegraybook.vvvv.org/images/hde/definition-patch-explorer.png)

- 可以指定一个目录，它会作用于文档里的所有元素
- 列出嵌套的元素，比如[类型草图定义](patches.md#datatype-patches)、[静态 Operation 定义](operations.md#creating-a-static-operation)和[目录（英文）](https://thegraybook.vvvv.org/reference/language/categories.html)

## Datatype Patch Explorer / 类型草图 {#datatype-patch-explorer}

### Process/Record/Class {#processrecordclass}

![](https://thegraybook.vvvv.org/images/hde/datatype-patch-explorer.png)

- 可以指定数据类型的名字
- 可以设置[类型草图](patches.md#datatype-patches)的种类
- 仅 Record／Class：可以指定一个 [Aspect（英文）](https://thegraybook.vvvv.org/reference/extending/aspects.html)
- 可以指定这个数据类型能否有 Generic 的输入／输出
- 仅 Record／Class：列出全部 Interface，可以增删
- 列出这个类型的全部[参数](properties.md)，可以增加、重命名、删除
- 列出这个类型的全部[成员 Operation](operations.md#member-operations)，可以增加、重命名、删除
  - 每个 Operation 的[签名](operations.md#operation-signature)都可以在这里显示和调整
- 可以配置 [Process](patches.md#process) 定义
  - 启用／停用 Process
  - 设置一个 [Aspect（英文）](https://thegraybook.vvvv.org/reference/extending/aspects.html)
  - 启用／停用 State 输出
  - 通过勾选框决定哪些 Operation 属于这个 Process
  - 上下拖动 Operation，决定它们在 Process 里的执行顺序
- 列出嵌套的元素，比如[类型草图定义](patches.md#datatype-patches)和[静态 Operation 定义](operations.md#creating-a-static-operation)

### Interface {#interface}

尚未正式支持。

### Forward {#forward}

见 [Forwarding .NET Libraries（英文）](https://thegraybook.vvvv.org/reference/extending/forwarding.html)。

## Category Patch Explorer / 目录草图 {#category-patch-explorer}

![](https://thegraybook.vvvv.org/images/hde/category-patch-explorer.png)

- 可以给[目录（英文）](https://thegraybook.vvvv.org/reference/language/categories.html)或 [group patch（英文）](https://thegraybook.vvvv.org/reference/language/groups.html)指定名字
- 可以改变[目录（英文）](https://thegraybook.vvvv.org/reference/language/categories.html)的类型
- 列出嵌套的元素，比如[类型草图定义](patches.md#datatype-patches)、[静态 Operation 定义](operations.md#creating-a-static-operation)和[目录（英文）](https://thegraybook.vvvv.org/reference/language/categories.html)
