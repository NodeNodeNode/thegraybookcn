---
title: Referencing Libraries / 引用节点库
slug: /libraries/referencing
source_path: reference/libraries/referencing.md
source_blob: 6c2d0eb5ece9eed1e72393afb4d18ba186cbedbc
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/referencing.html)

VL 文档可以引用 3 种不同类型的依赖：

* VL NuGet
* .NET NuGet
* 文件

当一个文档引用了某个依赖，就意味着那个依赖里所有公开的节点都能通过[节点浏览器](/develop-environment/the-node-browser)在这个文档里用上。

## NuGet {#nugets}

[NuGet](https://www.nuget.org) 是 .NET 的包管理系统。一个 NuGet 就是一个包，里面可以装很多 .dll 和／或 .vl 文件，为引用这个包的文档提供节点。

安装 NuGet 的方法见[管理 NuGet](/develop-environment/managing-nugets)。

### VL NuGet 与 .NET NuGet {#vl-vs-net-nugets}

VL NuGet 是专为 vl 做的 NuGet，别的 [.NET 语言](https://en.wikipedia.org/wiki/List_of_CLI_languages)用不了。按 NuGet 原本的定义，这仍是一个合法的 NuGet，只是里面装着 .vl 文档，出了 vl 就没用。

.NET NuGet 则更笼统地面向任何 .NET 语言。

在菜单里找到某个 VL 或 .NET NuGet，右键切换选中状态，就引用上了：

![](https://thegraybook.vvvv.org/images/libraries/vl-Dependencies-Nuget.png)
右键切换添加／移除一个 NuGet 引用

### 找不到的 NuGet {#missing-nugets}

文档引用的 NuGet 如果找不到，会在 Dependencies 菜单里标成红色。右键点这条红色条目，你可以：

* *Install*：尝试从 nuget.org 安装。显然这只在该 NuGet 能在线找到时才管用
* *Remove Reference*：把这个 NuGet 从本文档的依赖中移除

红色条目可以用右键选中多条，一次性全部安装或移除。

![](https://thegraybook.vvvv.org/images/libraries/vl-Dependencies-MissingNuget.png)
找不到的 NuGet 的几个选项

### 非托管／原生依赖 {#unmanagednative-dependencies}

有些 NuGet 自带或依赖非托管／原生 .dll，vl 认不出来 —— NuGet 规范压根没规定这类文件该怎么处理。眼下要让这类非托管依赖被认出来，得写个批处理文件给 vl 加一条搜索路径，像这样：

```
SET PATH=%PATH%;c:\path\to\nugets\nativelibs;
vvvv.exe
```

## 文件 {#files}

一个 vl 文档可以引用别的 .vl 文档和托管的 .dll 文件。

### 来自磁盘 {#from-disk}

引用本地文件有 3 种方式：

* 按 <span class="keyseq"><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>E</kbd></span> 通过文件浏览器选择文件
* 通过 `Document > Dependencies > Files > Add Existing...`
* 通过 `Document > Dependencies > Files > Add New`

![](https://thegraybook.vvvv.org/images/libraries/vl-Dependencies-File.png)
把一个已有文件添加为依赖

#### 找不到的文件 {#missing-files}

标成红色的文件在磁盘上找不到。右键可以移除或替换这条引用。

#### 移除或替换文件 {#removing-or-replacing-files}

右键点一条文件引用，可以移除或替换。也可以用右键连着选中多个文件，一次性全部 `Remove`。

![](https://thegraybook.vvvv.org/images/libraries/vl-Dependencies-File-Remove.png)
移除文件

#### 重复引用警告 {#duplicate-reference-warning}

引用一个 .dll 时，你可能会遇到类似下面这样的警告：

![](https://thegraybook.vvvv.org/images/libraries/duplicate-reference-warning.png)

这个警告之所以弹出，是因为 vvvv 已经加载了一个同名文件。

有两种情况会碰上这个：

1. **改变加载 .dll 的位置**：你先前设过指向这个 .dll 的引用，但此后把它在磁盘上挪了地方，现在想把引用修正到新位置。
2. **引用了一个 vvvv 自己已经加载过的 .dll**：你正在设一个指向某处 .dll 的引用，但一个同名的 .dll 已经从别处被加载了 —— 多半是 vvvv 自己加载的。

如果你确定那确实是同一批文件、只是位置不同，那就可以无视这个警告。

否则，情况 1 重启 vvvv 应该能解决；但情况 2 你其实没有机会解决 —— vvvv 加载过的 .dll 完全没法更换。如果出于某些原因你需要用比 vvvv 当前所用更新版本的某个 .dll，请到[论坛](https://forum.vvvv.org)上开一贴说说，我们看看能做点什么。

### 来自 GAC（全局程序集缓存）的库 {#libraries-from-the-gac-global-assembly-cache}

.NET 默认自带大量可以引用的程序集。装了 .NET 的机器上，这些程序集都在 [GAC](https://docs.microsoft.com/en-us/dotnet/framework/app-domains/gac) 里，可以这样引用：

* 按 <span class="keyseq"><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>E</kbd></span>
* 通过 `Document > Dependencies > Files > Add .NET Framework Assembly...`

在弹出的对话框里，双击你想添加为引用的条目。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-using-GACWindow.png)
在这个窗口里用 <span class="keyseq"><kbd>Ctrl</kbd><kbd>F</kbd></span> 查找 GAC 里的库
