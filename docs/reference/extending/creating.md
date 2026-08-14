---
title: Creating a new Library/Package/Nuget / 创建一个新的节点库／包／NuGet
slug: /extending/creating
source_path: reference/extending/creating.md
source_blob: 5c4b9043ca8a4eb09aefb217528e53941847a6b9
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/creating.html)

给 vvvv 贡献一组节点，最规整的方式是做一个节点库，以 [NuGet 包](https://nuget.org)的形式发布。

## Source and binary nugets / 源码 NuGet 与二进制 NuGet {#source-and-binary-nugets}

NuGet 包通常以二进制形式安装。vvvv 在此之上加了「源码 NuGet」：你可以直接引用一个包的源码，就当它已经是二进制 NuGet。要让 vvvv 把一个目录认作源码 NuGet，这个目录得位于某个[包仓库](/extending/contributing#source-package-repositories)路径下，并遵守下面这些约定：

## Innards of a nuget / 一个 NuGet 的内部构造 {#innards-of-a-nuget}

对 vvvv 来说，一个目录里的源码 NuGet 由两个文件定义：

* `<包名>\<包名>.nuspec`
* `<包名>\<包名>.vl`

比如：

```
\VL.Devices.Leap\VL.Devices.Leap.nuspec
\VL.Devices.Leap\VL.Devices.Leap.vl
```

.nuspec 文件用一种简单的文本格式描述一个 NuGet，格式定义见 [Nuspec 参考（英文）](http://docs.nuget.org/Create/Nuspec-Reference)。

.vl 文件是这个 NuGet 的中心入口，定义了「用了它之后你能得到哪些节点」：所有东西要么打在这个文件里，要么标记为「转发依赖」。

:::note
确保这个包里没有任何 .vl 文件引用 .csproj！那会强制整个包、以及所有依赖它的包变成可编辑的，于是你就失去了[只读包](/language/compilation#read-only-packages)的好处。
:::

要让 NuGet 在 vvvv 里正常工作，你得提供下面这样的结构 —— 当然所有目录都是可选的，只有某个 NuGet 真的用到时才需要：

```
\lib              // 放托管的 .dll
\runtimes         // 放原生／非托管的 .dll  *
\src              // 放 C# 源码
<包名>.nuspec
<包名>.vl
```

\* 见[按架构区分的目录（英文）](https://learn.microsoft.com/en-us/nuget/create-packages/supporting-multiple-target-frameworks#architecture-specific-folders)

## Creating and Publishing a NuGet / 创建并发布一个 NuGet {#creating-and-publishing-a-nuget}

当你准备好把节点库打成一个 .nupkg 时，有几种做法可选：

* [用 GitHub Actions 这类构建服务](/extending/publishing)
* [`nuget.exe` 命令行（英文）](https://docs.microsoft.com/de-de/nuget/reference/nuget-exe-cli-reference)
* [NuGet Package Explorer 图形界面（英文）](http://docs.nuget.org/Create/using-a-gui-to-build-packages)
