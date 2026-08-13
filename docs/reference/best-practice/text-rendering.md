---
title: Text rendering / 文字渲染
slug: /best-practice/text-rendering
source_path: reference/best-practice/text-rendering.md
source_blob: f23440d0f5abcf723ba5a9724ea293b0388d14f8
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/text-rendering.html)

## 2D 图形 {#2d-graphics}

用 VL.Skia 时你有这些选择：

* Skia 自身就带一整套节点，能做高质量的简单文字渲染
* 富文本渲染可以试试 [VL.RichtextKit](https://forum.vvvv.org/t/vl-richtextkit/19883)
* 用 [VL.CEF.Skia](https://www.nuget.org/packages/VL.CEF.Skia) 渲染 html 内容，可以渲染出复杂排版的文字

## 3D 图形 {#3d-graphics}

用 [VL.Stride](/libraries/graphics-3d) 时你有这些选择：

* 想快速做简单的文字渲染，用 Text [Stride.Models]（实验性）
* 上面 2D 图形的任何一种做法，都可以通过 Stride 里的 SkiaRenderer 或 SkiaTexture 节点用上
* 用 [VL.CEF.Stride](https://www.nuget.org/packages/VL.CEF.Stride) 渲染 html 内容，可以渲染出复杂排版的文字
* 渲染挤出的 3D 文字用 [VL.Stride.Text3d](https://www.nuget.org/packages/VL.Stride.Text3d)
* 可以试试 [VL.BMFont](https://www.nuget.org/packages/VL.BMFont)
* 可以试试 [FontStashSharp](https://github.com/FontStashSharp/FontStashSharp)（给 Stride 用的文字渲染库插件）
* 要最好的效果就上 [Slug](https://sluglibrary.com/) 库，需要另外向对方买授权。实现上需要帮忙，[联系我们](mailto:devvvvs@vvvv.org)。

:::note[译者注]
上游此处把 VL.Skia 链到 `../libraries/graphics-2d.md`，但上游仓库里并没有这个文件，链接是断的，因此译文这里不加链接。VL.Stride 那条链接正常。
:::
