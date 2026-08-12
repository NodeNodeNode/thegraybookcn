---
title: Delegates / Delegate
slug: /language/delegates
source_path: reference/language/delegates.md
source_blob: 927d33b82ee840b671a18f36ca9b11550baa45e3
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/delegates.html)

Delegate 是**匿名的运算器**：它可以像一个对象那样被传来传去，需要的时候再拿数据去调用它。

Delegate 没有名字，这在这里是个优点 —— 只要签名对得上，它就能装进去，像一块形状合适的乐高。这样你就能把「行为」当成对象来处理，在不同功能之间轻松切换，而下游调用它的代码一个字都不用改。Delegate 把内部实现藏起来，只对外露出一个门面。

Delegate 可以有零到多个输入，零个或一个输出。这也是它「签名」（或者说「形状」）的一部分。它是 .NET 的标准特性。

在定义那一侧，输入叫**参数（parameters）**；在调用那一侧，传进去的值通常叫**实参（arguments）**。

## Defining a delegate / 定义 Delegate {#defining-a-delegate}

Delegate 用 Delegate 区块来定义。它一开始是空的，你得给它加上输入和／或输出，它才真的做点什么。下图这个 Delegate 接收两个参数，把它们相乘，然后输出。注意此时这段代码**还没有被执行**。

![](https://thegraybook.vvvv.org/images/language/delegates_delegate.png)
一个 Delegate

在输入／输出上右键选 “Configure”，可以给它们指定类型。下图里第一个输入被设成了 `Float32`，由那个白点表示；这个类型会传播到其他适用的 Generic 类型上。

![](https://thegraybook.vvvv.org/images/language/delegates_delegate_typed.png)
指定了类型的 Delegate

## Invoking a delegate / 调用 Delegate {#invoking-a-delegate}

要真的执行你写的这段代码，就得调用这个 Delegate。在 Delegate 的输出针脚上你会看到类似 `(T1, T2 ...) -> (T)` 这样的类型。你用的 Invoke 节点，参数个数必须和这个签名对上。

![](https://thegraybook.vvvv.org/images/language/delegates_invoke_variants.png)
Invoke 节点的几种变体

现在你可以通过 Invoke 节点执行这个 Delegate 并给它传参数了。注意下图这个 Delegate 并没有指定类型 —— 类型是从用法里推断出来的。

![](https://thegraybook.vvvv.org/images/language/delegates_invoke.png)
使用 Invoke 节点

既然 Delegate 是对象，你就可以把它们存进一个 Spread 里，然后用程序决定执行哪一个。

![](https://thegraybook.vvvv.org/images/language/delegates_spread.png)
存在 Spread 里的多个 Delegate
