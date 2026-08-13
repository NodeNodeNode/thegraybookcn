---
title: Delegates / Delegate
slug: /language/delegates
source_path: reference/language/delegates.md
source_blob: 927d33b82ee840b671a18f36ca9b11550baa45e3
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/delegates.html)

Delegate 是**匿名的 Operation**：可以像对象一样传来传去，需要时再拿数据调用。

没有名字在这里反而是优点 —— 只要签名对得上就能装进去，像一块形状合适的乐高。于是「行为」也成了可以传递的对象：换一个 Delegate 就换一套功能，下游调用的代码一个字都不用改。内部实现被藏起来，对外只露一个门面。

Delegate 可以有零到多个输入、零个或一个输出 —— 这些共同构成它的「签名」，或者说「形状」。这是 .NET 的标准特性。

在定义那一侧，输入叫 *parameters*（参数）；在调用那一侧，传进去的值通常叫 *arguments*（实参）。

## Defining a delegate / 定义 Delegate {#defining-a-delegate}

Delegate 用 Delegate 区块来定义。刚建出来是空的，得加上输入和／或输出才真的做事。下图这个 Delegate 接收两个参数，相乘，输出。注意这段代码此时**还没有执行**。

![](https://thegraybook.vvvv.org/images/language/delegates_delegate.png)
一个 Delegate

在输入／输出上右键选 “Configure”，就能指定类型。下图里第一个输入设成了 `Float32`，白点就是这个意思；这个类型会往其他适用的 Generic 类型上传播。

![](https://thegraybook.vvvv.org/images/language/delegates_delegate_typed.png)
指定了类型的 Delegate

## Invoking a delegate / 调用 Delegate {#invoking-a-delegate}

要真的把这段代码跑起来，就得调用它。Delegate 的输出针脚上会显示类似 `(T1, T2 ...) -> (T)` 的类型 —— 你用的 Invoke 节点，参数个数必须和这个签名对上。

![](https://thegraybook.vvvv.org/images/language/delegates_invoke_variants.png)
Invoke 节点的几种变体

现在就能通过 Invoke 节点执行它、给它传参数了。注意下图这个 Delegate 没有指定类型 —— 类型是从用法里推断出来的。

![](https://thegraybook.vvvv.org/images/language/delegates_invoke.png)
使用 Invoke 节点

既然 Delegate 是对象，就可以把一批 Delegate 存进 Spread，再用程序决定执行哪一个。

![](https://thegraybook.vvvv.org/images/language/delegates_spread.png)
存在 Spread 里的多个 Delegate
