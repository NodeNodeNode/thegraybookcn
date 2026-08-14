---
title: 3d Graphics / 3D 图形
slug: /libraries/graphics-3d
source_path: reference/libraries/graphics-3d.md
source_blob: 5aef208b5ff70fda3d0a271cd6f987c3ae1dc831
status: translated
last_synced: '2026-08-13'
---

vvvv 的 3D 渲染引擎 VL.Stride 基于 [Stride 3D 引擎](http://stride3d.net)，随安装包一起发布。它有两套截然不同的工作流：

* **高层**，也就是好上手的场景图那套 —— 往场景里加模型、加灯光，3D 场景就搭起来了。模型可以配上材质，决定它长什么样
* **底层**，直接跟图形 API 打交道

两套可以轻松混用，细节见[渲染](/libraries/3d/rendering)。

两套工作流下，你都可以用 [Stride 着色语言（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/index.html)（HLSL 的一种扩展）写[着色器](/libraries/3d/shaders) —— 顶点、像素、几何、计算着色器都行 —— 来定制自己的渲染。

后期效果也有一批现成的：环境光遮蔽、景深、Bloom 等等。VL.Stride 还能把内容输出到 VR 设备。

总的来说，[Stride 官方文档（英文）](https://doc.stride3d.net/latest/en/)对理解这个引擎的关键概念很有帮助。

### Topics / 主题 {#topics}

* [渲染](/libraries/3d/rendering)
* [模型与网格](/libraries/3d/models)
* [几何](/libraries/3d/geometry)
* [文字渲染](/best-practice/text-rendering)
* [透明](/libraries/3d/transparency)
* [着色器](/libraries/3d/shaders)
* [TextureFX 着色器的方方面面](/libraries/3d/texturefx)
* [编辑着色器](/libraries/3d/editing-shaders)
* 投影映射
* [显卡](/libraries/3d/graphics-cards)

:::note[译者注]
上游此处的「投影映射」链接指向 `projectionmapping.md`，但上游仓库里并没有这个文件，链接是断的。这里保留条目、去掉链接。
:::

### Additional libraries / 其他节点库 {#additional-libraries}

见包浏览器里的 [3d Graphics 分类](https://vvvv.org/packs/?c=3d%20Graphics)。

### Useful tools / 好用的工具 {#useful-tools}

* [Stride 着色器浏览器](https://github.com/tebjan/Stride.ShaderExplorer)，用来翻可继承的着色器（还需要装上 [Stride](https://stride3d.net/download/)）
* [材质编辑器清单](https://forum.vvvv.org/t/open-source-material-editor-material-creation-resource-list/19185)
* [ALVR](https://github.com/alvr-org/ALVR)，通过 Wi-Fi 把 VR 内容推流到头显

---

想要一个另类的、非常原始的线框 3D 引擎，见 VL.Skia3d。NuGet：[VL.Skia3d](https://www.nuget.org/packages/VL.Skia3d)
