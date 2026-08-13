---
title: Running vvvv on a Mac / 在 Mac 上运行 vvvv
slug: /best-practice/vvvv-on-mac
source_path: reference/best-practice/vvvv-on-mac.md
source_blob: 5bc78b26c7ee36ef78275a27f1e9b3cba1af953b
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-mac.html)

vvvv 没有 macOS 的原生版本！

**但是**：在较新的 Mac 硬件上，有办法让它跑起来而不出现明显的性能问题。

:::note
我们的测试环境是一台 Apple M4 芯片、24GB 内存、运行 macOS Tahoe 的 Mac mini。因此本文只讨论基于 Arm 的现代 Apple 芯片，不涉及 Apple 旧的 Intel 芯片。
:::

有这么几个选择：

## Parallels Desktop {#parallels-desktop}

![](https://thegraybook.vvvv.org/images/reference/best-practice/vvvv-on-mac.png)

[Parallels Desktop](https://www.parallels.com/de/products/desktop) 让你能在 macOS 上用虚拟机跑 Windows。装 Parallels 加装 Windows 用时不到 30 分钟。配好之后，记得下载并安装 [Arm 版 vvvv](/best-practice/vvvv-on-arm)。

我们测试用的是 Parallels 26 版。

### 已知问题 {#known-issues}

右键拖动 IOBox 或输入针脚有时会失灵。改一下 Parallels 里的这个设置就能解决：

```
你的虚拟机配置 > 硬件 > 鼠标与键盘 > 鼠标：为游戏优化
```

### 限制 {#limitations}

遗憾的是有些节点库在 Arm 版 vvvv 上没法用，细节见：[在 Arm CPU 上运行 vvvv](/best-practice/vvvv-on-arm)。

## 其他选择 {#other-options}

其他一些（截至本文写作时还更偏实验性的）路子，见[这个论坛帖子](https://forum.vvvv.org/t/vvvv-on-macos-and-linux/24159)。
