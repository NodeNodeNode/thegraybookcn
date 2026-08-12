---
title: Patches / 草图
slug: /language/patches
source_path: reference/language/patches.md
source_blob: fe98615c6f5ac2d95587eab574abd6f3c7427e9e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/patches.html)

*Patch（草图）*是一块画布，上面放着[节点](nodes.md)、[连线（英文）](https://thegraybook.vvvv.org/reference/language/links.html)以及其他 VL 语言元素。一个 VL 文档可以包含很多草图。草图主要分两大类：

* 类型草图（Datatype Patches）
* 定义草图（Definition Patches）

每个 VL 文档都有两个主草图，可以从[文档菜单](../hde/navigating_a_project.md)进入：

* **Application 草图**：类型草图的一种特殊形式
* **Definitions 草图**：所有定义草图的根

## Application patch / Application 草图 {#application-patch}

VL 文档的主入口。放在这里的节点，会在文档被打开时立刻执行 —— 无论是直接打开，还是作为别的文档的*依赖（Dependency）*被打开。

这里通常就是你开始写程序的地方。快捷键 `Alt` `+` `A` 可以到这个草图。

Application 草图里也可以放定义，但这不算什么好习惯。

如果一个文档的 Application 草图是空的，那这个文档就只是被当作节点库使用 —— 也就是只向引用它的文档提供节点定义。

## Definitions patch / Definitions 草图 {#definitions-patch}

VL 文档里所有的节点定义都放在这里。你可以用[目录（英文）](https://thegraybook.vvvv.org/reference/language/categories.html)和 [group patch（英文）](https://thegraybook.vvvv.org/reference/language/groups.html)在这里搭出层级、组织你的定义。快捷键 `Alt` `+` `Shift` `+` `A` 可以到这个草图。

![](https://thegraybook.vvvv.org/images/language/vl-DocumentPatch.png)
VL.CoreLib.vl 的 Definitions 草图的一部分

在这里通常能看到一系列类型定义和目录，不过定义草图里也可以直接放[静态运算器](operations.md#static-operations)。

定义草图可以设置一个基础目录，也可以不设。

![](https://thegraybook.vvvv.org/images/language/vl-DocumentPatch-BaseCategory.png)
文档的基础目录被设为 “Foo”

## Datatype Patches / 类型草图 {#datatype-patches}

类型草图有好几种，可以在 [草图浏览器](patch-explorer.md)里切换：

* Process
* Record
* Class
* Interface
* Forward

Process、Record 和 Class 草图可以有[参数（英文）](https://thegraybook.vvvv.org/reference/language/properties.html)和[成员运算器](operations.md#member-operations)。Interface 和 Forward 比较特殊，见下文。

每个类型草图，在定义草图里都有一个对应的类型定义元素。

![](https://thegraybook.vvvv.org/images/language/vl-DatatypePatch.png)
三种数据类型：Process、Record 和 Class

新建类型草图有几种方式：

* 在[节点浏览器](../hde/the_nodebrowser.md)里输入你想创建的节点名，然后选 `Node`，就会创建一个*过程节点（Process Node）*
* 按 `Ctrl` `+` `P`，在光标处创建一个过程节点并打开新草图
* 按 `Ctrl` `+` `Shift` `+` `P`，只打开新草图，不创建节点应用

无论哪种方式，对应的类型定义都会被自动放进当前文档的定义草图里。

### Process {#process}

最常见的类型草图就是 Process。它保存着[过程节点](nodes.md)的定义 —— 也就是说，它的生命周期绑定在某个节点的存在上。

Process 的成员运算器既可以直接属于这个 Process，也可以不属于。用草图浏览器可以逐个决定。多个运算器的执行顺序也在那里配置，上下拖动即可。

文档的 Application 草图是一种特殊的 Process 草图：

* 它有 Create 和 Update 运算器，但不允许你再添加别的运算器
* 它不能被实例化成节点，但只要它所在的文档被直接打开、或作为别的文档的依赖被打开，它的一个*实例*就在运行了

### Record {#record}

定义一个*Immutable（不可变）*的数据类型。和 Process 不同，它的生命周期不由某个节点的存在决定 —— 你可以随时创建、更新、释放任意多个 Record 的实例。

一个 Record 典型的生命周期是这样：

- 调用它的 `Create` 运算器创建出一个实例
- 这个实例被存进某个集合里
- `Update`（或者你自己定义的其他运算器）被反复调用、或者偶尔调用，每次返回一个**新的**实例，替换掉原来那个，再存回集合
- 想把它清掉时，把实例从集合里移除。如果这个 Record 持有非托管资源，移除之前还必须调用它的 `Dispose` 运算器

任何修改 Record 类型的节点，本质上都是复制一份（把改动应用上去）然后返回一个新实例。所以**被修改过的 Record 必须写回*数据板（Pad）***，改动才能活到下一帧。

Record 在任何时刻都是一份固定不变的数据快照 —— 这个性质让它特别适合 VL 这样的数据流编程语言。

Record 也可以顺带定义一个 Process，方法是在草图浏览器里打开 Process 开关。

### Class {#class}

定义一个*Mutable（可变）*的数据类型。基本上和 Record 类似，但有一个关键区别：

**任何修改 Class 类型的节点，改的都是原来那个实例。** 不管操作它的节点在链路上有多靠后，被改的始终是最初那个实例。所以在连线上、从针脚传到针脚的，并不是数据本身，而只是指向原实例的一个引用。

Class 同样可以顺带定义一个 Process，方法也是在草图浏览器里打开 Process 开关。

### Interface {#interface}

尚未正式支持。

### Forward {#forward}

见 [Forwarding（英文）](https://thegraybook.vvvv.org/reference/extending/forwarding.html)。
