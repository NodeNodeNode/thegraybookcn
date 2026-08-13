---
title: Video Capture / 采集视频输入
slug: /best-practice/video-capture
source_path: reference/best-practice/video-capture.md
source_blob: 4adea8f7b3d09181ab07b1a2f8773de00d630201
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/video-capture.html)

要从摄像头和采集卡采集视频，vvvv 提供了几种方案：

## VL.Video {#vlvideo}

这个 NuGet 随 vvvv 一起发布。引用它，你就得到 **VideoIn** 节点，它支持所有带 [UVC 1.1 驱动（英文）](https://docs.microsoft.com/en-us/windows-hardware/drivers/stream/usb-video-class-driver-overview)的 USB 摄像头。

## VL.Devices.Decklink {#vldevicesdecklink}

用来从 Blackmagic 的 [Decklink](https://www.blackmagicdesign.com/products/decklink/models) 设备采集。

## VL.Devices.uEye {#vldevicesueye}

用来从 IDS Imaging 的 [uEye 相机](https://en.ids-imaging.com/store/products/cameras/sort-by/position/sort-direction/desc.html)采集。
