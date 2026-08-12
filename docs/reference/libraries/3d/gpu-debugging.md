---
title: GPU Debugging in vvvv / GPU 调试
slug: /libraries/3d/gpu-debugging
source_path: reference/libraries/3d/gpu-debugging.md
source_blob: cceea0ffd2410f86c2d229b68ae3f068d9b83ddf
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/gpu-debugging.html)

本文讲 vvvv 里做 GPU 调试的两个主要选择。你可以用：

* **Stride Profiler**：vvvv 内置的一个简单的实时工具，能快速看清性能和资源占用情况。
* **RenderDoc**：一个更细致的逐帧调试工具，让你能查看 GPU 调用、抓取帧、深入分析着色器 —— 只是不能实时进行。

两个工具都能帮你找出性能瓶颈和问题，看你需要多细。它们也可以配合着用。

## 用 Stride Profiler 做性能分析 {#performance-profiling-with-the-stride-profiler}

[**Stride Profiler**（英文）](https://doc.stride3d.net/4.2/en/manual/troubleshooting/profiling.html)是 vvvv 内置的工具，让你能快速地实时评估性能。它给出一份概览：草图的哪些部分吃掉了最多资源。

要打开 Stride Profiler，在任意 Stride 窗口里按 **F3**。左上角会出现一小块文字显示，显示**当前帧率**（FPS）。

### 在 Profiler 里导航 {#navigating-the-profiler}

按 **F5** 在几个页面之间切换，可以看到不同的性能细节：

* **FPS 页**：显示当前帧率
* **CPU 页**：列出 CPU 性能
* **GPU 页**：列出 GPU 性能

### 排序与查看细节 {#sorting-and-viewing-details}

默认情况下，条目按耗时排序（最长的调用／动作排在最前）。

* **F6**：在按耗时（默认）和按动作名之间切换排序方式
* **1、2、3、4 键**：当日志多到一页放不下时，在多个页面之间切换

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_profiler.png)

### Profiler Key 输入 {#profiler-key-input}

草图里的每一个着色器或渲染器都有一个 **Profiler Key** 输入。在这里填一个独特的名字，就更容易在 Profiler 窗口里追踪特定元素的性能。

Stride Profiler 特别适合快速找出草图里哪些部分性能开销最高。它提供了一种不依赖外部工具、又快又高效的性能监看方式。

## 用 RenderDoc 做细致调试 {#detailed-debugging-with-renderdoc}

想做更深入的 GPU 调试，可以用 **RenderDoc**。这个工具让你能抓取单独的帧，查看 GPU 调用、着色器，以及其他在 Stride Profiler 里实时看不到的渲染细节。

### 前置条件 {#prerequisites}

1. **装上 RenderDoc**：在 vvvv 里使用 RenderDocManager 之前，你必须先装 RenderDoc。最新版本从这里下载：[Download RenderDoc](https://renderdoc.org)。

2. **带 RenderDoc 标志启动 vvvv**：
   * vvvv 必须带 `--renderdoc` 标志启动
   * 这个标志打通 RenderDoc 与 vvvv 之间的连接
   * 可选：再加 `--debug-gpu` 以同时启用 D3D11 调试层，它的前置条件见下文

### 在 vvvv 里使用 RenderDocManager {#using-the-renderdocmanager-in-vvvv}

#### 1. 摆好 RenderDocManager 节点 {#1-setting-up-the-renderdocmanager-node}

vvvv 带着 `--renderdoc` 标志跑起来之后，打开任意一份引用了 **VL.Stride** 的草图，加上 **RenderDocManager** 节点。

#### 2. 打开 Stride Profiler {#2-enabling-the-stride-profiler}

抓帧之前，按上文所述打开 **Stride Profiler**。

当前显示哪一页无所谓，但这个 profiler **必须开着** —— RenderDoc 要靠它拿到组织 GPU 调用所需的详细信息。

#### 3. 抓取帧 {#3-capturing-frames}

* **抓单帧**：触发 **Capture Next Frame** 输入，抓取 GPU 渲染的下一帧。这一帧会被存下来，供之后在 RenderDoc 里分析。

* **抓多帧**：用 **Number of Frames to Capture** 输入抓取连续的一串帧。这在调试周期性掉帧、性能起伏这类反复出现的问题时特别有用。举例来说，如果问题每 `n` 帧出现一次，你就可以把帧数设成 `n`，把相关的那些帧抓下来分析。

![](https://thegraybook.vvvv.org/images/libraries/3d/renderdoc_node.png)

## 把 RenderDoc 附加到 vvvv {#attaching-renderdoc-to-vvvv}

1. 启动 RenderDoc。
2. 进 **File** > **Attach to Running Instance**。
3. 在弹出的窗口里找到 **localhost**，在它下面找到 **vvvv**。
4. 双击 **vvvv**，把 RenderDoc 连到这个 vvvv 实例上，就能访问抓到的帧了。如果还没抓过帧，这里什么都不会出现 —— 你可以从 vvvv 那边触发抓帧，也可以直接在 RenderDoc 里触发。

![](https://thegraybook.vvvv.org/images/libraries/3d/attach.png)

## 在 RenderDoc 里调试抓到的帧 {#debugging-captured-frames-in-renderdoc}

帧抓到并在 RenderDoc 里加载好之后：

1. **双击**某一帧：
   * RenderDoc 会分析这一帧，可能要花上几秒
   * 你会看到 vvvv 在这一帧里发出的所有 GPU 调用

2. **时间轴**：RenderDoc 界面顶部有一条时间轴，显示 GPU 事件的先后顺序。

3. **绘制调用与管线状态**：时间轴下面是绘制调用和管线状态，你可以在那里查看着色器、资源以及其他渲染细节。

4. **着色器调试**：
   * 要调试像素、顶点或计算着色器，进 **Pipeline State** 一节
   * 关于在 RenderDoc 里调试着色器的更多信息，见它的官方指南：[Shader Debugging in RenderDoc（英文）](https://renderdoc.org/docs/how/how_debug_shader.html)

![](https://thegraybook.vvvv.org/images/libraries/3d/renderdoc.png)

## 用 RenderDoc 做性能分析 {#performance-profiling-with-renderdoc}

RenderDoc 也提供性能计数器，帮你评估特定帧的 GPU 性能指标。这些计数器让你更深入地看清哪些 GPU 调用最吃性能。

### 1. 打开性能计数器查看器 {#1-enabling-the-performance-counter-viewer}

* 在 RenderDoc 里进 **Window > Performance Counter Viewer**。
* 在这个视图里，你可以访问各种 GPU 计数器，包括通用计数器和 **Nvidia 专有计数器**。

要启用 Nvidia 专有计数器：

1. 从 Nvidia 官方页面下载 **Nsight Perf SDK**：[Nsight Perf SDK](https://developer.nvidia.com/nsight-perf-sdk)。
2. 解压这个 SDK。
3. 把 `nvperf_grfx_host.dll` 文件复制到下面这个目录：
   `C:\Users\YourUsername\AppData\Roaming\renderdoc\plugins\nv\nvperf_grfx_host.dll`
4. 在 RenderDoc 里重新打开这份帧抓取。

启用之后，你就可以对抓到的帧执行 **Sample Counters**。它会生成一份详细列表，显示各种性能指标，比如特定 GPU 调用耗费的毫秒数。

### 2. 分析性能计数器 {#2-analyzing-performance-counters}

* 性能计数器查看器会显示耗时、内存占用等与性能相关的数据。
* 点击列表里的 **EID**（事件 ID），可以跳到时间轴或绘制调用列表中相应的那次调用，做更深入的查看。

![](https://thegraybook.vvvv.org/images/libraries/3d/counter_view.png)

关于怎样使用性能计数器查看器的更多信息，见 RenderDoc 官方文档：[Performance Counter Viewer in RenderDoc（英文）](https://renderdoc.org/docs/window/performance_counter_viewer.html)。

关于使用 RenderDoc 的更多细节，包括着色器调试和性能计数器这些进阶功能，见官方的 [RenderDoc 文档（英文）](https://renderdoc.org/docs/)。

## 启用 D3D11 调试层 {#enabling-the-d3d11-debug-layer}

你也可以启用 [D3D11 调试层（英文）](https://learn.microsoft.com/en-us/windows/win32/direct3d11/overviews-direct3d-11-devices-layers)，并用 [DebugView](https://learn.microsoft.com/en-us/sysinternals/downloads/debugview) 这类工具捕获它的输出。

要启用调试层需要：

1. 打开 Windows 的可选功能「图形工具」—— 详细步骤见上面那个链接
2. 用 `--debug-gpu` 启动 vvvv.exe —— 这告诉 vvvv 创建一个 D3D11 调试设备

注意，如果同时也启用了 RenderDoc，DebugView 似乎就捕获不到信息了。
