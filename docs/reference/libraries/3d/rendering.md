---
title: Rendering / 渲染
slug: /libraries/3d/rendering
source_path: reference/libraries/3d/rendering.md
source_blob: 74ce12f4d70981a95f9de6708fa2171ac09519ff
status: translated
last_synced: '2026-08-12'
---

VL.Stride 提供了两种渲染的工作流程：
- **高阶渲染**：你将使用模型，灯光，材质，贴图等等（实体-组件-系统）
- **底层渲染**：你将直接使用绘制调用（draw call），管线状态，GPU资源等等

如果你之前常使用游戏引擎，那你已经很熟悉高阶渲染流程了。如果你从vvvv beta而来，而且你已经已经熟悉DX9/DX11，那你已经很熟悉底层渲染流程了。

这两种工作流程可以组合起来没有任何缺点，并且都可以渲染到纹理或输出窗口中。你也可以为两者编写着色器。

## 高阶渲染（场景）

通常被理解为实体-组件-系统（ECS）的结构流程。下面的图例展示包含实体的场景的树状图。

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_ecs.svg)

每一个实体（Entity）都带有一个组件的序列，组件定义了实体的行为以及功能。任何一个实体也可以包含一个子实体的序列。

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_entity.svg)

每一个实体都含有一个``TransformComponent``。子实体则会将自己的位移与父实体的位置相乘。

建立这样一个场景，你可以使用在``[Stride]``目录里的``Group``或者``Group(Spectral)``节点。该节点在技术上只是将输入的实体变成一个子实体。

### 根节点

``SceneWindow``和``SceneTexture``这两个节点都能搭建出一个场景系统。把``RootScene``节点连接上任何一个，你就可以从这里开始搭建你的场景。

参考帮助草图：``Overview Scene Graph Basics``,``Overview Scene Graph Advanced``,以及``Work with Children``。

### 摄像机

``SceneWindow``节点内部集成了一个默认的摄像机，用户可以用鼠标来控制这个相机，在场景查看。如果在Camera的针脚上连接上别的Camera的节点，默认的摄像机将会被覆盖掉。

如果要建立你自己的摄像机，你可以使用Entity节点并连接一个``CameraComponent``节点，或者使用一个``Camera``节点（就包括了上述提到的两个节点）来实现。帮助文档中有一些关于相机的例子可以参考。

### 模型

查看 模型与多边形网格

### 灯光

一个灯光的组件可以连接到任何实体节点上，这样灯光就会使用该实体的位移信息。帮助文档中专门介绍灯光的部分，其中有很多例子。

同时也请查看：[Stride Lights and Shadows doc](https://doc.stride3d.net/latest/en/manual/graphics/lights-and-shadows/index.html)

### 后期效果

Stride的渲染管线提供很多实时的后期效果你可以添加到3D场景中。例如环境光遮蔽（ambient occlusion）效果，高光效果（Bloom），以及其他基于空间或者图片的效果。

在帮助文档中有``PostFX``的章节，其中有很多的帮助文档。

同时也请查看：[Stride Post Effects doc](https://doc.stride3d.net/latest/en/manual/graphics/post-effects/index.html)

## 底层渲染（自定义渲染）

此工作流程允许你直接使用图形API来管理你自己的绘制调用。当然这会需要付出更多的努力，因为你需要了解包括着Shaders（着色器），buffers（缓冲区），pipeline states（管线状态）以及其他的图形API的特性。

在这个过程中，主要的数据类型是``IRenderer``。该接口可以通过将其连接到渲染接收器（render sink）来参与渲染。例如``MeshRenderer``或者是``QuadRenderer``节点，就是这个接口是实际应用。

你可以通过在目录``[Stride.Rendering]``中的``Group``以及``Group (Spectral)``来组织和安排你的绘制请求。这些个组节点也是``IRenderer``的实现，他们将输入给他的绘制请求传递到渲染器中。

### 渲染接收器（Renderer sinks）

有好几种渲染接收器你可以连接一个``IRenderer``。根据具体的使用场景和使用阶段的不同，你可以选择不同接收器。

### ``RenderEntity``

可以参与场景渲染流程，该节点需要放置在场景渲染的结构中。它可以连接``IRenderer``到``SceneWindow``或者``SceneTexture``中。它还有一个设置可以用来指定需要参与的场景的渲染阶段。

- ``BeforeScene``：非图像渲染，可以用于为场景准备缓冲区或者纹理
- ``Opaque``（不透明渲染阶段）： 正常的3d渲染阶段
- ``Transparent``：透明渲染阶段，在Opaque之后
- ``AfterScene``：后场景阶段，可以用来绘制最终的渲染对象
- ``ShadowCaster*``: 这些阶段可以用来渲染阴影贴图

### ``RenderTexture``

将物体渲染进可以定义尺寸和格式的纹理中。用来渲染一些帮助纹理，比如遮罩，文字，或者其他一些之后应用在场景中的基础的图形。

### ``RenderWindow``

无需高阶渲染流程的搭建，直接渲染进显示窗口。用于显示全屏尺寸的纹理或者合成最后的输出结果。

### ``RendererScheduler``

一个非常底层的节点，它可以在没有渲染接受器的情况下就安排一个绘制请求。比如，它可以用在当TextureFX节点需要渲染进一张纹理的时候。

如果存在多个``RendererScheduler``的情况下，那么他们在更新循环中被执行的顺序，也就是他们在渲染过程中被绘制的顺序。

更多的细节，同样可以参看[Stride底层API文档](https://doc.stride3d.net/latest/en/manual/graphics/low-level-api/index.html)以及[Direct3D 11的编程指导](https://docs.microsoft.com/en-us/windows/win32/direct3d11/dx-graphics-overviews)。
