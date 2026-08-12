---
title: The User Interface / 用户界面
slug: /getting-started/beta-user-interface
source_path: reference/getting-started/beta/user-interface.md
source_blob: b7d84f41c673e3d5920b398f92531d8b600dcb1b
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/beta/user-interface.html)

## Main Menu / 主菜单 {#main-menu}

VL 里没有中键呼出的主菜单。所有主要功能都藏在左上角那个灰色的 `Quad Menu` 后面。Quad 菜单旁边是文档菜单，放的是和当前文档有关的条目。见[文件导航](../../hde/navigating_a_project.md)。

## The NodeBrowser / 节点浏览器 {#the-nodebrowser}

VL 的节点浏览器完全是另一套东西。见[节点浏览器](../../hde/the_nodebrowser.md)。

## Inspector {#inspector}

Inspector 有两个：

- 主 [Inspector（英文）](https://thegraybook.vvvv.org/reference/hde/inspector.html)
- 也可以按需在可查看的元素旁边就地打开一个：中键点击某个输入／输出、数据板或 IOBox，或者右键点它的标签选 `Configure`

## Finder / 查找 {#finder}

见[查找](../../hde/finders.md)。

## TTY Renderer {#tty-renderer}

有一个方便的日志窗口，通过 `Quad Menu` -> `Windows` -> `Log` 打开。另见[日志](../../hde/debugging-log.md)。

## Docking Patches / 停靠草图窗口 {#docking-patches}

草图窗口和工具窗口可以通过拖进拖出来停靠。关于恢复上次工作状态的选项，见[设置](../../hde/settings.md)里的 “Open previous documents/windows”。

## Open a nodes patch / 打开节点对应的草图 {#open-a-nodes-patch}

在 beta 里你右键点击节点来打开它对应的草图；在 VL 里是右键 -> Open。

## Patching / 连线 {#patching}

在 vvvv beta 里，把连到针脚的连线删掉时，当前值会被留在针脚里。**VL 不会这样。**
