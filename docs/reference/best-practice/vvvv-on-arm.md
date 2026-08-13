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

有些节点库在 Arm 版 vvvv 上用不了 —— 当它自带的所谓「原生依赖」在 Arm 上不存在时，就是这种情况。想知道哪些节点库在 Arm 上有问题，在 Arm CPU 上带命令行参数 `--log` 跑一次 Arm 版 vvvv，然后在生成的日志里找这类警告：

`Library Foo contains native assets but none for the current runtime win-arm64...`

关于各节点库的 Arm 兼容性，笼统地说（并不完整）是这样：

### VL.Stride {#vlstride}

7.1-preview 68 起可用。

Arm CPU 往往不配 Nvidia 的 GPU。而写着色器时，非 Nvidia 的 GPU 对官方规范似乎严格得多。这就容易造成一种印象：在 Nvidia 机器上好好的东西，换台机器就坏了。但多数情况是程序本来就写错了，只是 Nvidia 的 GPU 照样能跑。所以该做的是把代码改对，让它在所有 GPU 上都成立。

在少数几份帮助文档里你会看到我们加的警告：⚠️Nvidia only⚠️ —— 那表示它用了只有 Nvidia 显卡才支持的渲染技法。

### VL.Fuse {#vlfuse}

与 VL.Stride 相同，见上文。大体能用，但凡是着色器写法只对 Nvidia GPU 成立的地方就会失败。

### VL.Audio {#vlaudio}

用 Resample [Audio.Utils] 节点会让 vvvv 崩溃。

### 应该能用 {#should-work}

下面这些节点库在 vvvv 里还不支持 Arm，但它们底层依赖的库看起来是支持的。稍加努力，应该能让它们在 Arm 版 vvvv 上跑起来：

* VL.OpenCV
* VL.IO.NDI

### 也许能用 {#could-work}

下面这些节点库能不能支持，要看它们底层库的作者支不支持 Arm CPU。对方一旦提供支持，我们多半就能让它们在 Arm 版 vvvv 上工作：

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
