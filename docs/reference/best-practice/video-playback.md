---
title: Video Playback / 播放视频
slug: /best-practice/video-playback
source_path: reference/best-practice/video-playback.md
source_blob: ab98a3aaf1bb871f1aff58d33ca937acdc10f678
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/video-playback.html)

vvvv 提供了两条截然不同的视频播放路子：

* 视频文件
* 图像序列

## Video files / 视频文件 {#video-files}

* 引用 VL.Video 这个 NuGet（随 vvvv 发布），就会带来 **VideoPlayer** [Video] 节点
* 这个节点开箱即可播放相当广泛的[视频容器和编解码器（英文）](https://docs.microsoft.com/en-us/windows/win32/medfound/supported-media-formats-in-media-foundation)
* 如果你缺了播放所需的某些编解码器，看看这个 [Mediafoundation 编解码器包](http://codecguide.com/media_foundation_codecs.htm)里有没有
* 这个节点的用例请查阅帮助面板

### 优点 {#advantages}

* 又快又好上手
* 对不稳定的渲染帧率比较宽容 —— 必要时会丢帧

### 缺点 {#disadvantages}

* 做不到无缝循环（某些编解码器可能行，另一些不行）
* 做不到源之间的无缝切换（某些编解码器可能行，另一些不行）
* 可能出现微抖动，全屏播放时最明显 —— 因为时序没有与垂直同步耦合
* 没有网络同步

:::note
要播放 [HAP 视频文件](http://hap.video)，需要第三方的 [VL.HapPlayer](https://www.nuget.org/packages/VL.HapPlayer/) NuGet。
:::

## Image sequences / 图像序列 {#image-sequences}

* 取决于你用的渲染引擎，随 vvvv 发布的是下面这些节点：
  * VL.Stride（3D 引擎）：**ImagePlayer (Stride)** [Video] 或 **ImagePlayer (FrameBased Stride)** [Video]
  * VL.Skia（2D 引擎）：**ImagePlayer (Skia)** [Video] 或 **ImagePlayer (FrameBased Skia)** [Video]
* VL.Stride 的 ImagePlayer 更偏好 [DDS 格式（英文）](https://www.reedbeta.com/blog/understanding-bcn-texture-compression-formats/)的图像（转换工具见下文）
* 两者都支持播放 JPG、PNG 和 BMP 文件
* 这些节点的用例请查阅帮助面板

### 优点 {#advantages-1}

* 节点有两种变体：基于时间的和逐帧的，见下文
* 能做到无缝循环
* 可以实现源之间的无缝切换
* 局域网内多台 PC 上的图像序列播放可以做[同步](/best-practice/video-synchronization)

### Disadvantage / 缺点 {#disadvantage}

* 媒体素材管理起来没那么舒服（也就是成千上万个图像文件）
* 音轨需要另外用 [VL.Audio](https://www.nuget.org/packages/VL.Audio/) 单独播放

### Timebased vs. Framebased / 基于时间 vs. 逐帧 {#timebased-vs-framebased}

#### Time based / 基于时间 {#time-based}

* 默认的、更好上手的选择
* 用在视频不是全屏播放、而是作为场景一部分的场合
* 对不稳定的渲染帧率比较宽容 —— 必要时会丢帧
* 可能出现微抖动，全屏播放时最明显 —— 因为时序没有与垂直同步耦合

#### Frame based / 逐帧 {#frame-based}

* 用在视频全屏播放的场合
* 能做到帧级精确、与垂直同步耦合的播放
* 要求渲染帧率完全稳定

### DDS conversion tools / DDS 转换工具 {#dds-conversion-tools}

* [Texconv](https://github.com/Microsoft/DirectXTex/wiki/Texconv)：命令行工具
* [TexconvGUI](https://github.com/bj-rn/texconvgui/releases)：上面那个的图形界面
* [Intel's Texture Works](https://gametechdev.github.io/Intel-Texture-Works-Plugin/)：Photoshop 插件
* [NVIDIA Texture Tools Exporter](https://developer.nvidia.com/nvidia-texture-tools-exporter)
* [AMD Compressonator](https://gpuopen.com/gaming-product/compressonator/)
