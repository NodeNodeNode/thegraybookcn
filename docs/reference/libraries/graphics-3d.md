---
title: 3d Graphics / 3D图像渲染
slug: /libraries/graphics-3d
source_path: reference/libraries/graphics-3d.md
source_blob: 5aef208b5ff70fda3d0a271cd6f987c3ae1dc831
status: translated
last_synced: '2026-08-12'
---

vvvv 的 3d 渲染引擎 VL.Stride 基于[Stride 3d](https://www.stride3d.net/) 引擎并随安装一起提供。它允许两种不同的工作流程：
- **高阶渲染流程**，可以轻松使用场景渲染流程。你可以通过添加模型，灯光等等到场景中。模型也可以被给予材质来改变其外观
- **底层渲染流程**，直接使用图形的API接口的渲染流程

两种不同的工作流程可以轻松地结合使用，更多细节请查看[渲染]。

你也可以通过 Stride Shading Language （一种对HLSL地扩展语言）编写[Shaders着色器]（顶点着色器，像素着色器，多边形着色器，计算着色器），来在两种工作流程中自定义你所需要的渲染。

同样的，你还可以使用丰富的 Post FX 效果，包括环境光遮蔽（ambient occlusion）效果，景深效果（depth of field），高光效果（Bloom）等等。VL.Stride 同样允许你输出内容到VR设备。

总的来说，[Stride文档](https://doc.stride3d.net/latest/en/)将会对你理解这些关键性的内容帮助很大。

## 主题
- 渲染
- 模型和多边形网格
- 透明
- 着色器
- 关于纹理效果着色器的种种
- 编写着色器
- 多边形

## 其他周边的库
- VL.Fuse
- VL.CEF
- VL.IO.PLY
- VL.IO.Teximp
- VL.Assimp
- VL.Alembic
- VL.OpenEXR
- VL.Boids-GPU

## 好用的工具
- [Stride 着色器浏览器](https://github.com/tebjan/Stride.ShaderExplorer)
- [各种材质编辑器](https://discourse.vvvv.org/t/open-source-material-editor-material-creation-resource-list/19185)
