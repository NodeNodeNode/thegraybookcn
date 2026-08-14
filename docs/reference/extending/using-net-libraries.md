---
title: Using .NET Libraries / 使用 .NET 库
slug: /extending/using-net-libraries
source_path: reference/extending/using-net-libraries.md
source_blob: 91ab4e6c7e3c8f93fd244e0cf63d2e8c0360bdff
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/using-net-libraries.html)

.NET .dll 里任何公开类的静态方法和成员方法，都能在 VL 里当节点用。

## Referencing Libraries / 引用节点库 {#referencing-libraries}

想在草图里用上某个节点库，只需把它作为*dependency*（依赖）[引用](/libraries/referencing)进这个 .vl 文档。

## Accessing nodes / 访问节点 {#accessing-nodes}

每个被引用的 .dll 都会在节点浏览器里显示为一个顶级目录。进去就能浏览这个库的命名空间、类型和 Operation；把鼠标停在某个 Operation 上能读它附带的 xml 文档；点一下就能把它当节点用在草图里。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-using-NodeBrowser.png)
节点浏览器里，来自 VL.DemoLib.dll 的命名空间 “DemoLib” 显示为一个顶级目录

就这样，几乎任何第三方 .NET 库你都能拿来用，立刻开始打草图。

### Hiding dependencies from the Nodebrowser / 在节点浏览器里隐藏依赖 {#hiding-dependencies-from-the-nodebrowser}

节点浏览器里塞满所有依赖的全部节点，有时会让人喘不过气。用输入框旁边的开关，可以把依赖的节点显示或隐藏。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-using-NodeBrowser-hideDependencies.png)
显示／隐藏依赖节点的开关

## For your Consideration / 需要你留心的地方 {#for-your-consideration}

能直接用上几乎任何 .NET 库，确实又方便又强大 —— 碰上简单的库你马上就能尝到甜头。但外面大多数库并不是为 VL 这样的数据流环境设计的。用它们打草图仍然可行，只是要求你对很多事情的理解超出我们通常对用户的期待。所以「直接使用 .NET 库」这个功能，面向的是更进阶的读者。

下面列出第三方库上的典型问题 —— 它们往往正是「把库包装成更适合 VL 的形态」的理由。VL 内置了一些功能帮你轻松写出这类*wrapper*（包装器），见[转发 .NET 库](/extending/forwarding)。

### Incompatible types / 类型不兼容 {#incompatible-types}

各种库常常为向量、矩阵等自带一套类型，与 VL 对应的类型不直接兼容，你得想办法转换。有时差别只在取值范围 —— 比如 VL 里角度和颜色分量都是 0..1，别的库常用别的范围。

包装器可以把这些转换对用户藏起来。

### Mutability / 可变性 {#mutability}

在数据流环境里，跟不可变的数据类型打交道最顺手。可是 .NET 库里的大多数类型是可变的。

### Events / 事件 {#events}

许多 .NET 库暴露的事件并不符合 [.NET Core 事件模式（英文）](https://docs.microsoft.com/en-us/dotnet/csharp/modern-events)，也就意味着它们没法被自动转换成 VL 里的 Observable。碰上这种情况，你得用 C# 写一个包装器，手动把事件转成 Observable，见 [Observable.FromEvent（英文）](https://msdn.microsoft.com/en-us/library/system.reactive.linq.observable.fromevent(v=vs.103).aspx)。

### Error Handling / 错误处理 {#error-handling}

各个库处理错误的方式各不相同，但作为使用者，我们通常希望只有一种一致的方式。

给库做一层包装，能让我们采用 VL 的错误处理方式，并把它呈现给最终用户。

### Too Low-level / 太底层 {#too-low-level}

第三方库提供的功能往往相当底层。在 VL 这样的可视化语言里，我们更想要那种已经把若干功能组合成可复用积木的高层节点。

包装器可以把常用的底层功能组合成好用的高层节点。
