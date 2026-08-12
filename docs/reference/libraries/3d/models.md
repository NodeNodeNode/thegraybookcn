---
title: Models and Meshes / 模型与网格
slug: /libraries/3d/models
source_path: reference/libraries/3d/models.md
source_blob: eff5ee6b758978e697508f283b090ee14f9a96d6
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/models.html)

用 `FileModel` 节点可以从文件加载模型。支持这些文件类型：

* `.fbx;.dae;.3ds;.gltf;.glb;.obj;.blend;.x;.md2;.md3;.dxf;.ply;.stl;.stp`

加载好的模型可以接到 `ModelEntity` 上，用某个材质把它渲染出来。

目前我们还不支持自动加载材质、贴图、动画或骨骼，这些会在以后的版本里加上。例子见帮助文档 `Load Assets from File`，它同时演示了怎样给一个模型指定多个材质。

模型也可以从 Stride 游戏项目里加载。这样做的好处是你可以在 Stride 编辑器里把模型连同材质一起配置好。见 Stride 手册里的 [Assets（英文）](https://doc.stride3d.net/4.0/en/manual/game-studio/assets.html)和 [Animation（英文）](https://doc.stride3d.net/4.0/en/manual/animation/index.html)。另见帮助文档 `Load Stride Project` 和 `Modify Entities from a Stride Project`。

## Model 与 Mesh 的区别 {#difference-between-model-and-mesh}

### Model {#model}

`Model` 是一个高层的类，它把几何（网格）与外观（材质）组合在一起，还可以选配一副用于动画的骨骼。因此它既能表示只有一个网格、一份材质的简单模型，也能表示带动画的角色这类复杂的 3D 物体。

在场景图里，一个模型必须被指派给某个 `Entity` 上的 `ModelComponent`。见[渲染](/libraries/3d/rendering)。

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_model.svg)
Model 的数据结构

要把一个模型的数据拼起来，简单情形下（一个网格加一份材质）用 `MeshModel` 节点，多个网格和材质则用 `MeshesModel`。要把单个模型接进场景图，可以用 `ModelEntity` 节点 —— 它在内部替你把 entity 和 component 都配好了。

### Mesh {#mesh}

`Mesh` 是模型的一部分，它装着几何信息，以及一个指向模型材质列表中某份材质的序号。

![](https://thegraybook.vvvv.org/images/libraries/3d/stride_mesh.svg)
Mesh 的数据结构

真正的几何数据存放在一个叫 `MeshDraw` 的类里，它持有绘制几何时要用的索引缓冲和顶点缓冲这些 GPU 资源。具体来说，`MeshDraw` 有 `IndexBufferBinding` 和 `VertexBufferBinding` 两个参数，各自持有相应的缓冲，外加一些给图形管线用的信息。所以从模型到第一个顶点缓冲的完整路径是：`Model.Meshes[0].Draw.VertexBuffers[0].Buffer`。

顶点缓冲里存的顶点可以带不同的字段，比如法线、纹理坐标等等。为了让取顶点数据这件事更顺手，你可以用 `MeshSplit` 这组节点，见帮助文档 `Split a mesh into its components`。

### 动态网格 {#dynamic-mesh}

`DynamicMesh` 和 `DynamicMesh (Indexed)` 这两个节点，能从顶点数据和／或索引数据造出一个网格。

要把单个网格接进场景图，可以用 `MeshEntity` 节点 —— 它在内部替你把 entity 和 component 都配好了。网格也可以用底层的工作流、通过 `MeshRenderer` 来渲染，细节见[渲染](/libraries/3d/rendering)。另见帮助文档 `Dynamic Mesh`，那是一个搭建并渲染网格的例子。
