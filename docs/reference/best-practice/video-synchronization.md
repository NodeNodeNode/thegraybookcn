---
title: Video Synchronization / 视频同步
slug: /best-practice/video-synchronization
source_path: reference/best-practice/video-synchronization.md
source_blob: 86be8169f4725ed00a7c55d123b030244fdd7ed9
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/video-synchronization.html)

用 Video 目录下的 **ImagePlayer (Stride)** 或 **ImagePlayer (Skia)** 节点（或者它们的逐帧版本），就有可能让在不同 PC 上播放的视频同步起来 —— 前提是这些机器接在同一个局域网里。

## 它是怎么工作的 {#how-it-works}

服务端和客户端各自跑自己的播放机制（基于时间的或逐帧的），服务端向客户端发送控制信息（播放、跳转、循环起止点）。此外服务端还会发送自己当前的流位置，客户端一旦偏离太远就可以据此调整。

服务端发出「播放」消息时，所有客户端能不能一开始就完美同步，取决于 3 个条件：

* 「播放」消息是否同时抵达了所有客户端
* 服务端和客户端是否通过硬件做了帧同步，也就是用 Quadro 或 FirePro 显卡
* 服务端和客户端的帧率是否完全稳定

只要其中任何一条不成立，一开始就可能有偏移，或者偏移会随时间累积出来。为了补偿这个偏移，客户端就得去贴合服务端的流位置。

## 基于时间 {#time-based}

这种情况下，客户端的时间会在必要时持续向服务端的时间靠拢，因此两者不会偏离太多。不过这可能会干扰垂直同步的时序，加大微抖动的概率 —— 而基于时间的播放本来就已经有微抖动了。

见帮助面板里的 `HowTo Synchronize players between multiple PCs`。

## 逐帧 {#frame-based}

这种情况下，要在客户端算出偏移、并决定什么时候跳帧，你可以想出不同的策略。FramePlayer 节点实现了其中一种。

见帮助面板里的 `HowTo Synchronize framebased players between multiple PCs`。
