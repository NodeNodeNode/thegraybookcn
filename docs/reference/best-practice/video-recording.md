---
title: Video Recording / 把输出录成视频
slug: /best-practice/video-recording
source_path: reference/best-practice/video-recording.md
source_blob: 4539d40ae471ffa7e66bce0ec1302b89e953e4da
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/video-recording.html)

录屏有这么几个选择。

## XBox Game Bar {#xbox-game-bar}

Windows 10 上一般已经装好了，没有的话可以从 Microsoft Store 装。

按 <span class="keyseq"><kbd>Windows</kbd><kbd>G</kbd></span> 打开它。可以录全屏视频加音频。

## Nvidia 显卡 {#nvidia-cards}

如果驱动没有一并装上，去下载并安装 [Geforce Experience](https://www.nvidia.com/de-de/geforce/geforce-experience/)。

按 <span class="keyseq"><kbd>ALT</kbd><kbd>Z</kbd></span> 打开它。可以录全屏视频加音频。

## AMD 显卡 {#amd-cards}

如果驱动没有一并装上，去下载并安装 [Radeon Software](https://www.amd.com/en/technologies/radeon-software-gaming-media)。

按 <span class="keyseq"><kbd>ALT</kbd><kbd>R</kbd></span> 打开它。可以录全屏视频加音频。

## OBS Studio {#obs-studio}

免费开源的录像与直播软件：https://obsproject.com/

## VL.ScreenRecorder {#vlscreenrecorder}

想把录制做进自己的应用里，看看 [VL.ScreenRecorder](https://www.nuget.org/packages/VL.ScreenRecorder) 这个 NuGet。

## VL.LoopTool {#vllooptool}

一组节点，用来简化循环动画的制作。它包含能响应全局音序器的动画节点，让平滑的缓动动画很容易做出来；还提供了预设的动画相机和场景。能捕获视频、图像序列和图片。
NuGet：[VL.LoopTool](https://www.nuget.org/packages/VL.LoopTool)

## 高分辨率纹理／图像写出 {#high-resolution-textureimage-writer}

如果你想以非实时的方式写出高分辨率图像序列，用下面这些节点：

* VL.Stride：TextureWriter 配合 SceneTexture
* VL.Skia：ImageWriter 配合 Renderer (Offscreen)

用它们时还要把 MainLoop 节点设成 `Is Incremental`，并填上你要的 `Incremental FPS`。这样所有依赖时钟的节点（LFO、滤波器等等）时序才会正确推进 —— 不管每张图写进磁盘要花多久。

:::note
如果你的画面内容依赖音频分析或实时传感器数据这类实时参数，这套办法就不管用。
:::

## Gif 录制 {#gif-recorders}

要录动图 gif，试试 [LiceCap](https://www.cockos.com/licecap/) 这个屏幕捕获工具。
