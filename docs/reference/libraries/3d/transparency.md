---
title: Transparency / 透明
slug: /libraries/3d/transparency
source_path: reference/libraries/3d/transparency.md
source_blob: 568d9ce97cd7fe4968e9dd3b3d0a7197113b0664
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/transparency.html)

透明加上带深度缓冲的 3D 渲染，是个棘手的话题，通用情形下并没有被完全解决。你唯一能做的，是为自己这一套具体的搭法找到合适的渲染技法。

## 材质 {#materials}

Stride 的渲染系统有一个专给透明物体的渲染阶段，它紧接在普通的不透明阶段之后被调用。在这个透明阶段里，材质上接了透明特性的物体会被渲染。这些物体会自动按从后到前排序，只从深度缓冲里读、不写入，并以叠加或 alpha 混合的方式覆盖到场景之上。

透明特性有 3 种：**Blend**、**Additive** 和 **Cutoff**。这几种模式及其参数的详细说明见 [Stride 材质文档（英文）](https://doc.stride3d.net/4.0/en/manual/graphics/materials/misc-attributes.html#transparency)。这些材质特性对应的节点，可以在节点浏览器的 `[Materials.MiscAttributes.Transparency]` 目录下找到。

:::note
如果渲染系统把某个物体挪进了透明渲染阶段，它就不再写入深度缓冲了。这意味着它不会遮挡其他物体。
:::

## 自定义渲染 {#custom-rendering}

如果你渲染的是自己写的着色器，可以通过 `BlendStateDescription` + `BlendStateRenderTargetDescription` 和 `DepthStencilStateDescription` 这几个节点来控制混合方式、以及与深度缓冲的交互。RenderEntity 节点也提供了指定渲染阶段的可能，见[渲染](/libraries/3d/rendering)。

`[BlendStateDescription]` 目录下还有一些预设好的混合状态，比如 `Additive`、`AlphaBlend` 和 `AlphaBlendPremultiplied`。

关于这个话题以及相关问题的延伸阅读，可以看看 [vvvv beta 的文档（英文）](https://beta.vvvv.org/topics/graphics/direct3d-9/basics/transparency/transparency-and-depthbuffer.html)。
