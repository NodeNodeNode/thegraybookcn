---
title: Navigating a Project / 文件导航
slug: /develop-environment/navigating-a-project
source_path: reference/hde/navigating_a_project.md
source_blob: 8877795b03fce34483b7db1c4aaa73c146cf1704
status: translated
last_synced: '2026-08-13'
---

VL 里的一个项目通常就是一份 .vl 文档，里面装着一张或多张草图。除此之外，一份文档还可以依赖别的文档或者 NuGet，用到它们提供的节点。

主菜单栏上始终显示你当前在编辑的那份文档的文件名，也就是「当前文档」。

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document.png)
主菜单栏，当前文档是 “callmenames.vl”

## Active Document Menu / 当前文档菜单 {#active-document-menu}

点当前文档，打开它的菜单。

### Dependencies / 依赖 {#dependencies}

一份文档可以引用三类依赖：

* VL NuGet
* .NET NuGet
* 文件

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document_menu_dependencies.png)
文档的依赖

#### VL Nugets / VL NuGet {#vl-nugets}

进 `VL Nugets`，可以看到所有为 VL 提供节点的 NuGet。每个 NuGet 是一批文档（.vl、.dll 等等）的集合，这些文档为你的文档提供节点。

NuGet 旁边带括号的版本号，表示当前加载的版本与最初引用的版本不一致。`>` 表示引用的版本比当前加载的小，`<` 表示引用的版本比当前加载的大。

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document_menu_dependencies_vlnugets.png)
可用的 NuGet

右键点一个 NuGet 就选中它。选中之后，在这份文档里可以通过节点浏览器用到它的全部节点。

#### .NET Nugets / .NET NuGet {#net-nugets}

`.NET Nugets` 一栏里是所有并非为 VL 定制的 NuGet。它们照样能用，只是取决于库本身有多复杂，用起来可能会稍微进阶一些。

#### Files / 文件 {#files}

除了 NuGet，你也可以引用单个文件，支持这几种：

* .vl
* .dll
* .csproj

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document_menu_dependencies_addfiles.png)
添加文件

选 `Add Existing...`，用文件浏览器挑一个文件。这些文件暴露出来的节点，都能在当前文档里通过节点浏览器用到。

#### Forward Dependencies / 转发依赖 {#forward-dependencies}

这一栏把所有 NuGet 和文件合在一起列出来，你可以逐个指定它的节点要不要转发出去。

某个依赖不转发，它的节点就只在当前文档里可见 —— 引用了当前文档的那些文档看不到它们。

某个依赖转发了，凡是引用了当前文档的文档，也都能看到它的节点。

## Application {#application}

见 [Application 草图](/language/patches#application-patch)。

## Definitions {#definitions}

见 [Definitions 草图](/language/patches#definitions-patch)。

## Last saved with version / 最后保存时的版本 {#last-saved-with-version}

菜单底部显示这份文档最后一次保存时用的 VL 版本。如果文档名前面有个绿色或红色的小图标，说明保存它时用的版本和你现在运行的版本不是同一个。

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document_menu.png)
这个例子里运行的是 gamma 2020.1.3.147

*绿色*

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document_menu_savedOlder_line.png)

文档名旁边的绿色小标记提示你：这份文档已升级到当前运行的版本，一般没什么问题。之所以还是提示一下，是想让你知道 —— 如果就这么存下去，再用老版本打开它可能会出问题。

*红色*

![](https://thegraybook.vvvv.org/images/hde/gamma-active_document_menu_savedNewer_line.png)

红色标记是个警告：这份文档最后一次保存用的是更新的版本，所以看起来或跑起来可能不对劲。这种情况下，考虑换个更新版本的 VL 来打开它。
