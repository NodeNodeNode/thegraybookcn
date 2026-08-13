---
title: Rendering / 渲染
slug: /libraries/3d/rendering
source_path: reference/libraries/3d/rendering.md
source_blob: 74ce12f4d70981a95f9de6708fa2171ac09519ff
status: translated
last_synced: '2026-08-13'
---

VL.Stride 提供两套渲染工作流：

* **高层**：跟模型、灯光、材质、纹理打交道（实体－组件－系统）
* **底层**：直接跟绘制调用、管线状态、GPU 资源打交道

用过游戏引擎的话，你走的就是高层这套。从 vvvv beta 过来、做过 DX9／DX11 的话，你走的是底层这套。

两套工作流可以混着用，没有任何代价，而且都能渲染到纹理或者输出窗口，也都能写着色器。

## 高层（场景图）{#high-level-scene-graph}

也就是常说的实体－组件－系统（ECS）。场景图是一棵树，树上是一个个装着实体的场景。

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_ecs.svg)
*场景图的数据结构*

每个实体带一串组件，组件定义这个实体的行为和功能。实体也可以带一串子实体。

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_entity.svg)
*实体的数据结构*

每个实体都有一个 `TransformComponent`。子实体会把自己的变换乘到父实体的变换上。

搭场景图用 `[Stride]` 目录下的 `Group` 或 `Group (Spectral)` 节点。Group 节点技术上就是一个实体，只不过把输入的那些实体设成了自己的子实体。

### 根节点 {#root-nodes}

`SceneWindow` 和 `SceneTexture` 都会把场景系统搭起来。往其中任何一个上连一个 `RootScene`，就可以从这儿开始搭场景图了。

参考这几份帮助草图：`Overview Scene Graph Basics`、`Overview Scene Graph Advanced`、`Work with Children`。

### 摄像机 {#camera}

`SceneWindow` 节点自带一个默认摄像机，可以用鼠标在场景里四处看。往 *Camera* 输入针脚上连一个摄像机，就把默认的覆盖掉了。

要自己搭摄像机，可以用 Entity 节点连一个 `CameraComponent`，或者直接用 `Camera` 节点 —— 它把这两样合在一起了。帮助面板里有摄像机专门的一节，附了好几份帮助草图。

### 模型 {#models}

见[模型与网格](/libraries/3d/models)。

### 灯光 {#lights}

灯光组件可以挂到任何实体上，挂上之后就用这个实体的变换作为灯光的变换。帮助面板里有灯光专门的一节，帮助草图很多。

另见：[Stride 灯光与阴影文档（英文）](https://doc.stride3d.net/latest/en/manual/graphics/lights-and-shadows/index.html)

## 后期效果 {#post-effects}

Stride 的渲染管线带一批后期处理效果，可以加到渲染好的 3D 场景上，比如环境光遮蔽、Bloom，以及其他屏幕空间或基于图像的效果。

帮助面板里有 `PostFX` 一节，帮助草图很多。

另见：[Stride 后期效果文档（英文）](https://doc.stride3d.net/latest/en/manual/graphics/post-effects/index.html)

## 底层（自定义渲染）{#low-level-custom-rendering}

这套工作流让你直接用图形 API 管自己的绘制调用。用起来更费劲，因为你得懂着色器、缓冲区、管线状态这些图形 API 的东西。

主要的数据类型是 `IRenderer`。实现这个接口，再把它连到一个渲染汇点上，就参与到渲染里了。`MeshRenderer`、`QuadRenderer` 这些就是这个接口的实现。

绘制调用的顺序用 `[Stride.Rendering]` 目录下的 `Group` 和 `Group (Spectral)` 节点来安排。这些 Group 节点也是 `IRenderer` 的实现，会把绘制调用传给连在输入上的那些渲染器。

### 渲染汇点 {#renderer-sinks}

`IRenderer` 可以连到好几种汇点上。具体连哪个，取决于用途和你想在哪个时机渲染。

#### `RenderEntity` {#renderentity}

要参与场景渲染，把这个节点放进场景图里 —— 它会把 `SceneWindow` 或 `SceneTexture` 的绘制调用传给连上的 `IRenderer`。它还有个设置，用来指定场景的渲染阶段：

* `BeforeScene`：非图形的阶段，适合给场景准备缓冲区或纹理
* `Opaque`：常规的 3D 渲染阶段
* `Transparent`：透明阶段，在 Opaque 之后
* `AfterScene`：场景之后，可以用来往最终的渲染目标上画东西
* `ShadowCaster*`：这几个阶段用来渲染阴影贴图

#### `RenderTexture` {#rendertexture}

把东西渲染进一张指定了尺寸和格式的纹理。适合渲染辅助纹理，比如遮罩、文字，或者其他之后要在场景里用到的基础图形。

#### `RenderWindow` {#renderwindow}

不搭高层场景，直接把东西渲染进窗口。适合显示一张全屏纹理，或者合成程序的最终输出。

#### `RendererScheduler` {#rendererscheduler}

非常底层的节点，不经过汇点就安排一次绘制调用。比如 [TextureFX](/libraries/3d/texturefx) 节点往纹理里渲染时用的就是它。

如果有不止一个 `RendererScheduler`，那么它们在更新循环里被调用的顺序，就是渲染时被调用的顺序。

更多细节另见：[Stride 底层 API 文档（英文）](https://doc.stride3d.net/latest/en/manual/graphics/low-level-api/index.html)、[Direct3D 11 编程指南（英文）](https://docs.microsoft.com/en-us/windows/win32/direct3d11/dx-graphics-overviews)
