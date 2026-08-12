---
title: Bindings / 绑定
slug: /develop-environment/bindings
source_path: reference/hde/bindings.md
source_blob: 8577eacd11b7fe8be514c06659639129f176daa0
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/bindings.html)

绑定提供了一种统一的方式，把程序里的 [Public Channel](the_channelbrowser.md) 暴露出去、让它们与外部世界交互。可以把它理解成通往 RCP、OSCQuery、OSC、Midi、Redis 等等的便捷通道。

![](https://thegraybook.vvvv.org/images/reference/hde/binding-columns.png)
由各自的节点建立起来的 MIDI、OSC、OSCQuery 和 Redis 绑定列

## Adding Binding Columns / 添加绑定列 {#adding-binding-columns}

要添加绑定，先得让某个绑定服务存在起来 —— 用 VL.IO.Midi、VL.IO.OSCQuery 这类包里你已经熟悉的节点。

比如 OSCQuery，只要放一个 OSCQueryServer 节点，通道浏览器里就会多出一个新的绑定列。

![](https://thegraybook.vvvv.org/images/reference/hde/binding-column.png)

每个通道上你会看到这些：

- **方向**：箭头表示值是进、是出，还是双向
- **状态**：复选框表示这个绑定是否处于激活状态
- **+/🖊**：用来添加或修改绑定的按钮

## Adding Bindings / 添加绑定 {#adding-bindings}

给一个 public channel 添加绑定有两种方式：

- 通过通道浏览器的「绑定」列
- 用 BindTo… 节点

有了绑定列之后，点一下对应的复选框就能为某个 public channel 激活绑定。除 MIDI 之外的所有绑定类型，做到这一步默认绑定就已经跑起来了。想要更精细的控制，多数绑定都可以用 🖊 按钮调。

另一条路是用各 IO 包自带的 BindTo… 节点给通道建立绑定 —— 这种方式**连非 public 的通道也能绑**。比如 OSCQuery 就用 BindToOSCQuery 节点，接上就完事。

![](https://thegraybook.vvvv.org/images/reference/hde/bindto-node.png)

注意：同一个通道上可以有多个绑定。这样你就能做到「从 MIDI 进来的值，从 OSC 出去」，或者反过来。

## Removing Bindings / 移除绑定 {#removing-bindings}

取消绑定列里的复选框，或者删掉 BindTo… 节点，绑定就没了。
