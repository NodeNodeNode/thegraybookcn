---
title: Text rendering / 文字渲染
slug: /best-practice/text-rendering
source_path: reference/best-practice/text-rendering.md
source_blob: 0e3cbee2ee94bfaf995da7cb29da6ef72e477f93
status: translated
last_synced: '2026-10-25'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/text-rendering.html)

## 2d Graphics / 2D 图形 {#2d-graphics}

用 VL.Skia 时你有这些选择：

* Skia 自身就带一整套节点，能做高质量的简单文字渲染
* 看看 [2D 文字渲染相关的包](https://vvvv.org/packs/?c=2d%20Graphics#Text%20Rendering)

## 3d Graphics / 3D 图形 {#3d-graphics}

用 [VL.Stride](/libraries/graphics-3d) 时你有这些选择：

* 想快速做简单的文字渲染，用 Text [Stride.Models]（实验性）
* 看看 [3D 文字渲染相关的包](https://vvvv.org/packs/?c=3d%20Graphics#Text%20Rendering)
* 可以试试 [FontStashSharp](https://github.com/FontStashSharp/FontStashSharp)（给 Stride 用的文字渲染库插件）
* 稍复杂一点的选择是高质量文字渲染库 [Slug](https://sluglibrary.com/)。实现上需要帮忙，[联系我们](mailto:devvvvs@vvvv.org)。

:::note[译者注]
上游此处把 VL.Skia 链到 `../libraries/graphics-2d.md`，但上游仓库里并没有这个文件，链接是断的，因此译文这里不加链接。VL.Stride 那条链接正常。
:::
