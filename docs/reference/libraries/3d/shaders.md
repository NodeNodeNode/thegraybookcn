---
title: Shaders / 着色器
slug: /libraries/3d/shaders
source_path: reference/libraries/3d/shaders.md
source_blob: 2f39285c28bda52517e6e63da935ff35d4b665a7
status: partial
last_synced: '2026-08-12'
---

VL.Stride的着色器是用[SDSL](https://doc.stride3d.net/4.0/en/manual/graphics/effects-and-shaders/shading-language/index.html)来编写的，这是一种支持面向对象概念以及多重继承功能的高级着色器语言。用它能写出短小而又美观的着色器代码。


# 文件管理

## 代码范围

任何将 VL.Stride 设置为依赖项的 .vl 文档都将拾取放置在它旁边的名为“shaders”的特殊文件夹中的着色器文件。多个.vl文档可以共享同一个着色器的文件夹。

:::note

着色器文件共享一个全局范围，因此相同的文件名是不允许的，其实这两个文件被不同的.vl文档所引用。

:::

## 特殊后缀名

如果一个着色器文件以下面的预设的后缀名结尾的话(比如 MyColor_DrawFX.sdsl)，他可以被直接转化成一个节点被使用。

### _ShaderFX

一个仅仅代表“一段代码”的节点，可以用来组成更大更复杂的着色器。这是最灵活的节点类型，它可以与所有其他着色器节点类型一起工作。

### _DrawFX

一个节点可以用来绘制几何图形。

### _ComputeFX

一个代表着计算着色器的节点，它可以用来处理GPU上的任意数据。

### _TextureFX

处理纹理的专用节点。在TextureFX章节中查看更多信息。


# 核心概念

## 包括

在HLSL中并没有类似于 #include 类似的语句。在这里，你可以简单调用任何一个着色器文件中的任何一个功能模块，只要他们在同一个代码范围之内。

所以，假设你有一个``MyUtils.sdsl``的文件：

``` 
shader MyUtils
{
    float4 Invert(float4 col)
    {
        col.rgb = 1 - col.rgb;
        return col;
    }
};
```

你想在另外一个文件中使用它的功能模块，你需要确保这两个文件在同一个代码范围之内（例如在同一个文件夹中）。你就可以引用在``MyUtils``中的任何一个功能模块，像这样：

```
shader MyFx_TextureFX : FilterBase
{
    float4 Filter(float4 tex0col)
    {
        return MyUtils.Invert(tex0col);
    }
};
```

同样请查看Stride文档的[Static Calls](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/shader-classes-mixins-and-inheritance.html#static-calls)

## 继承

继承功能的主要目的是复用已经存在着色器代码。你可以想象在自己的代码中引入或者包含别的着色器的代码。

请查看Stride文档中的这个[例子](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/shader-classes-mixins-and-inheritance.html#example-code-inheritance)

为了更好地理解着色器的继承功能，你可以使用[Stride.ShaderExplorer](https://thegraybook.vvvv.org/reference/libraries/graphics-3d.html#useful-tools)来获得一个综观，同时浏览一下各种着色器。

## Composition

## Streams
