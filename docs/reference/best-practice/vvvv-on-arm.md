---
title: vvvv on Arm / 在 Arm CPU 上运行 vvvv
slug: /best-practice/vvvv-on-arm
source_path: reference/best-practice/vvvv-on-arm.md
source_blob: b449abc3d718c7976013d5a96236b48ec837115d
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-arm.html)

从 7.0 版本起，我们为在 Arm CPU 上运行提供了专门的构建。在下载页面切换到 Arm 标签页，就能看到可下载的版本：

[![](https://thegraybook.vvvv.org/images/reference/best-practice/vvvv-on-arm.png)](https://vvvv.org/download/)

## 限制 {#limitations}

遗憾的是，有些节点库在 Arm 版 vvvv 上没法用。当某个节点库自身带有 Arm 上不存在的所谓「原生依赖」时，就会是这种情况。想弄清哪些节点库在 Arm 上可能有问题，就在 Arm CPU 上带命令行参数 `--log` 跑一个 Arm 版 vvvv，然后在生成的日志文件里找这类警告：

`Library Foo contains native assets but none for the current runtime win-arm64...`

关于各节点库的 Arm 兼容性，笼统地说（并不完整）是这样：

### VL.Stride {#vlstride}

7.1-preview 68 起可用。

Arm CPU 往往不会配 Nvidia 的 GPU。而在着色器编程这件事上，非 Nvidia 的 GPU 似乎要严格得多地遵循官方规范。这会给人一种印象：在 Nvidia 机器上好好的东西，到了非 Nvidia 机器上就坏了 —— 但实际上多数情况是这个程序本来就是错的，只不过 Nvidia 的 GPU 仍能把它跑起来。所以真正要做的是把代码改对，让它在所有 GPU 上都成立！

在少数几份帮助文档里你会看到我们加的警告：⚠️Nvidia only⚠️ —— 那表示它用了只有 Nvidia 显卡才支持的渲染技法。

### VL.Fuse {#vlfuse}

与 VL.Stride 相同，见上文。大体能用，但凡是着色器写法只对 Nvidia GPU 成立的地方就会失败。

### VL.Audio {#vlaudio}

用 Resample [Audio.Utils] 节点会让 vvvv 崩溃。

### 应该能用 {#should-work}

下面这些节点库在 vvvv 里还没有 Arm 支持，但它们底层依赖的库似乎是支持的。所以稍加努力，应该有可能让它们在 Arm 版 vvvv 上跑起来：

* VL.OpenCV
* VL.IO.NDI

### 也许能用 {#could-work}

下面这些节点库能否支持，取决于它们底层库的作者是否支持 Arm CPU。一旦对方提供了支持，我们多半就能让它们在 Arm 版 vvvv 上工作：

* VL.VIOSOWarpBlend
* VL.ScalableDisplay
* VL.Devices.Zed
* VL.Devices.RealSense
* VL.Devices.Orbbec
* VL.Devices.Nuitrack
* VL.Devices.Ultraleap
* VL.Devices.Decklink
* VL.Devices.IDS
* VL.Devices.TheImagingSource

### 不会能用 {#will-not-work}

下面这些设备，厂商在 Arm CPU 上提供支持的希望很小：

* VL.Devices.Astra
* VL.Devices.Kinect
* VL.Devices.Kinect2
* VL.Devices.AzureKinect
