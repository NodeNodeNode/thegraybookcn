---
title: Extensions / 扩展
slug: /develop-environment/extensions
source_path: reference/hde/extensions.md
source_blob: c84c904efd6e2fc89b8004346d100287198b4fda
status: translated
last_synced: '2026-08-13'
---

编辑器扩展是一些小工具，装上就能增强 vvvv。

例子：

- 键鼠显示：vvvv 自带。在桌面左下角显示键盘和鼠标动作，录教程或者开线下工作坊时很有用。
- [Pipette](https://www.nuget.org/packages/VL.Pipette.HDE/)：桌面取色器。把鼠标停在桌面上任意像素上按 <span class="keyseq"><kbd>ESC</kbd></span>，这个像素的颜色就以十六进制字符串进了剪贴板（可以直接粘进任何颜色 IOBox）。
- [TUIO Simulator and Monitor](https://www.nuget.org/packages/VL.TUIO.HDE/)：在做 TUIO 多点触摸项目，手边却没有触摸设备可以测？这个模拟器加监视器就是你的好帮手。
- [Spout Monitor](https://www.nuget.org/packages/VL.SpoutMonitor.HDE/)：贴图要靠 [Spout](https://spout.zeal.co/) 从别的程序传进来？用这个监视器可以快速看一眼系统里当前共享着哪些贴图。

## Finding and installing extensions / 找到并安装扩展 {#finding-and-installing-extensions}

扩展以 NuGet 的形式发布，所以你装的任何一个 VL NuGet 都可能自带扩展。也有些 NuGet 只含扩展，在 [nuget.org](https://www.nuget.org/packages?q=Tags%3A%22VL%22+hde) 上很容易找到。

找到之后，[像装其他 NuGet 一样装它](/libraries/referencing#nugets)。

## Creating extensions / 编写扩展 {#creating-extensions}

扩展就是草图，所以自己做一个很容易。见[编写编辑器扩展](/extending/editor-extensions)。
