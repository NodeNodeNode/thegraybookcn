---
title: Editor Extensions / 创建编辑器扩展
slug: /extending/editor-extensions
source_path: reference/extending/editor-extensions.md
source_blob: 44bad83647e8a609bb18dc535d67c2bd8dd02cbb
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/editor-extensions.html)

*editor extension*（编辑器扩展）让你用自己的工具来扩展 vvvv 编辑器。这类扩展的例子有：

* Key & Mouse display（键鼠显示，随 vvvv 发布）
* TUIO Simulator & Monitor（通过 VL.TUIO.HDE 这个 NuGet 安装）
* Spout Monitor（通过 VL.SpoutMonitor.HDE 这个 NuGet 安装）
* Desktop Pipette（通过 VL.Pipette.HDE 这个 NuGet 安装）

扩展可以完全用 vvvv 打出来，并指定一个快捷键，这样用户随时都能唤起它们。当前已加载的所有扩展可以在主菜单里找到：

`Quad > Extensions`

## 创建一个扩展 {#creating-an-extension}

扩展就是普通的 VL 草图，唯一的显著特征是：它们保存在以 `.HDE.vl` 结尾的文件里，比如：

`VL.MyExtension.HDE.vl`

任何这样的文件，只要你在 vvvv 里打开了它，它就已经作为一个编辑器扩展在运行了。接下来你多半会希望能用快捷键或菜单项来唤起自己的扩展。为此你得注册一个命令，这可以通过 `Command` 节点来做 —— 引用 `VL.HDE` 这个 NuGet 即可获得该节点。

或者干脆从模板开始：

## 从模板创建一个扩展 {#creating-an-extension-from-the-template}

在主菜单里选：

`Quad > Extensions > New Extension...`

然后在保存文件对话框里为你新扩展的 .vl 文档指定位置和文件名。

:::note
文件名必须以 `.HDE.vl` 结尾，这个文件才是一个合法的编辑器扩展。
:::

这会把模板复制到你指定的位置，并为你打开这个文档，它应该长这样：

![](https://thegraybook.vvvv.org/images/reference/extending/extension-command.png)

注意这里的 `Command` 节点，它让你能向编辑器注册一个命令，指定这些东西：

* 菜单项的标签
* 这个菜单项是否可见
* 一个快捷键

接着去看 `Command` 的输出 —— 每当这个命令通过快捷键或点击菜单项被执行时，它就会触发。

从这儿开始就交给你了。一个经典用例是：反复执行这个命令来显示／隐藏一个编辑器扩展窗口。不过就像在任何别的草图里一样，你在这儿甚至可以跑 `format c:` —— 所以一如往常，小心行事……

## 一个 .HDE.vl 文件里放多个扩展 {#multiple-extensions-per-hdevl-file}

如果你需要这样，那么可以：在你的文档里注册多个命令，各自触发不同的扩展即可。

但要注意，万一你其中一个扩展出了运行时错误，同一文档里运行的其他扩展也可能被牵连。

## 窗口 {#windows}

一个扩展并不一定非得有窗口（比如它可以只是对一堆选中的节点跑个 Operation……）。它也可以有自己一套完全不同的窗口思路。但很多情况下，你只想用 `VL.HDE` 自带的现成窗口。目前有这两个：

* SkiaWindow：Renderer [Skia] 的精简版
* SkiaWindowTopMost：同上，只是它不获取焦点、并且总在最前（比如 Key/Mouse Display 扩展就用它）

### 停靠 {#docking}

要让窗口能参与停靠机制以及自动的窗口恢复管理，它需要被注册到窗口管理器。做法是用 `WindowFactory` 节点把它包起来，并相应地连上 `WindowContext` 和 `Window` 两个针脚。例子见 `VL.HDE/Template.HDE.vl`。

## 与 vvvv 交互 {#interfacing-with-vvvv}

vvvv 的 API 让你能访问悬停中的和选中的节点，并允许你读写针脚。

* 在帮助面板里看 `API` 一节，有一些例子
* 所有 API 节点都在 `VL.Lang` 仓库的 `Session` 目录下

## 设置 {#settings}

有些扩展会希望能通过[设置](/develop-environment/settings)来配置，不过目前还做不到。

## 把扩展打进 NuGet {#packaging-extensions-in-a-nuget}

### 只含扩展的 NuGet {#extension-only-nuget}

如果你想发布一个只含扩展的 NuGet，它的 ID 必须以 `.HDE` 结尾，比如：

`VL.MyExtension.HDE`

这又要求这个 NuGet 里的 .vl 文档遵循同样的命名，叫作：

`VL.MyExtension.HDE.vl`

### 作为 NuGet 一部分的扩展 {#extension-as-part-of-a-nuget}

扩展也可以随任何一个「主要提供其他功能」的 NuGet 一起发布。这种情况下，扩展文档的名字必须与包 ID 完全一致，只是加上 `.HDE` 后缀。举例来说，一个叫 `VL.MyPackage` 的 NuGet 至少会含这两个文档：

```
VL.MyPackage.vl      // 主文档
VL.MyPackage.HDE.vl  // 扩展文档
```

## 重启所有扩展 {#restarting-all-extensions}

尤其是在开发过程中，你可能会把某个扩展搞崩、需要重启它。用快捷键 <span class="keyseq"><kbd>Shift</kbd><kbd>F9</kbd></span> 可以一次性重启所有扩展。
