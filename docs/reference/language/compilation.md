---
title: Compilation / 编译
slug: /language/compilation
source_path: reference/language/compilation.md
source_blob: fc56762882bc298cdf75371482a55b982e8136c2
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/compilation.html)

你每次改动草图，vvvv 都会即时编译它，并把正在运行的程序同步更新。我们把这叫「Hotswap」—— 是的，它和你可能听过的 [.NET Hot Reload](https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/) 是类似的东西，只不过在 vvvv 里它是自动的、一直在发生的，而且你多半察觉不到。

编译器工作时，编辑器左上角、Quad 菜单下方会出现一个小指示灯：

| 指示灯颜色 | 含义 |
|---|---|
| 灰色 | 正在构建符号 |
| 橙色 | 正在生成 C# 代码 |

即时编译大多数时候完全没有存在感，但当你在做大型项目或节点库、而所有 .vl 文件都得被持续纳入改动检测时，它会造成明显的卡顿。为此 vvvv gamma 5.0 引入了**只读包**的概念。

## Read-only packages / 只读包 {#read-only-packages}

只读包里的草图不参与即时编译。这样它们就以优化过的方式运行，和你导出之后的效果一样。除了执行更快，编译器不必再操心它们这件事本身也省下了 CPU 周期，还让 vvvv 整体的内存占用更小，从而减轻了垃圾回收的压力。

### Restrictions in read-only packages / 只读包里的限制 {#restrictions-in-read-only-packages}

属于只读包的草图，顶上会有这样一条横幅：

![](https://thegraybook.vvvv.org/images/reference/language/readonly-package-banner.png)

在只读的草图里，注意以下限制：

- 提示框不会显示草图里流动的数据
- 你做的任何修改都不会生效

如果你确实改了并保存，这些改动要等到下次启动 vvvv 时才会被发现，届时会触发该草图的一次性重新编译。

### What makes a package read-only? / 什么样的包是只读的？ {#what-makes-a-package-read-only}

**默认情况下所有包都是只读的。** 这让 vvvv 的启动时间和内存占用都有明显改善。

具体包括：

- 所有随 vvvv 一起发布的包
- 所有你额外[安装（英文）](https://thegraybook.vvvv.org/reference/hde/managing-nugets.html)并在项目里引用的包。这是合理的 —— 你本来就不该去改它们，要改也是换一个版本的 NuGet
- 所有你从[源码包仓库（英文）](https://thegraybook.vvvv.org/reference/extending/contributing.html#source-package-repositories)引用的包

### Editable packages / 可编辑的包 {#editable-packages}

你想让某些包脱离「默认只读」，最可能的原因是：你通过[源码包仓库（英文）](https://thegraybook.vvvv.org/reference/extending/contributing.html#source-package-repositories)引用了它们，就是为了改它们。

这种情况下，启动 vvvv 时要加上[命令行参数（英文）](https://thegraybook.vvvv.org/reference/hde/commandline-arguments.html) `editable-packages`。下面这个例子让所有以 “VL.Devices” 开头的包、以及 “VL.Audio” 这个包都退出预编译：

```
--editable-packages VL.Devices*;VL.Audio
```

:::note
另外，凡是依赖于你所指定的这些包的包，也会一并变成可编辑的。
:::
