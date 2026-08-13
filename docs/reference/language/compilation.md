---
title: Compilation / 编译
slug: /language/compilation
source_path: reference/language/compilation.md
source_blob: fc56762882bc298cdf75371482a55b982e8136c2
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/compilation.html)

你每改动一次草图，vvvv 就即时编译一次，并把正在运行的程序同步更新。我们叫它「Hotswap」—— 跟你可能听过的 [.NET Hot Reload](https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/) 是一类东西，只是在 vvvv 里全自动、一直在发生，你多半察觉不到。

编译器工作时，编辑器左上角、Quad 菜单下方会出现一个小指示灯：

| 指示灯颜色 | 含义 |
|---|---|
| 灰色 | 正在构建符号 |
| 橙色 | 正在生成 C# 代码 |

即时编译平时完全没有存在感。但做大型项目或节点库时，所有 .vl 文件都要持续纳入改动检测，卡顿就明显了。为此 vvvv gamma 5.0 引入了**只读包**。

## Read-only packages / 只读包 {#read-only-packages}

只读包里的草图不参与即时编译，而是以优化过的方式运行，和导出之后的效果一样。除了跑得更快，编译器不必再盯着这些草图本身也省下 CPU 周期，并让 vvvv 整体内存占用更小、垃圾回收压力更轻。

### Restrictions in read-only packages / 只读包里的限制 {#restrictions-in-read-only-packages}

属于只读包的草图，顶上会有这样一条横幅：

![](https://thegraybook.vvvv.org/images/reference/language/readonly-package-banner.png)

在只读的草图里，注意以下限制：

- 提示框不会显示草图里流动的数据
- 你做的任何修改都不会生效

真改了并保存的话，改动要等下次启动 vvvv 才会被发现，届时触发这份草图的一次性重新编译。

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
