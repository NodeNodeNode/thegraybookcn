---
title: Shaders / 着色器
slug: /libraries/3d/shaders
source_path: reference/libraries/3d/shaders.md
source_blob: 2f39285c28bda52517e6e63da935ff35d4b665a7
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/shaders.html)

着色器用 [SDSL（英文）](https://doc.stride3d.net/4.0/en/manual/graphics/effects-and-shaders/shading-language/index.html)编写 —— 这是一种高级着色器语言，支持面向对象概念和多重继承，因而能写出简短又好看的着色器代码。

下面是一份带你上手的分步指南：

## Prepare an editor / 准备编辑器 {#prepare-an-editor}

vvvv 不自带着色器编辑器。要获得最好的体验，我们推荐 **Visual Studio Code** 加 **Stride Shader Tools** 扩展。配置方法和其他选择见[编辑着色器](/libraries/3d/editing-shaders)。

## Start from a Template / 从模板开始 {#start-from-a-template}

![](https://thegraybook.vvvv.org/images/libraries/3d/shaderwizard.png)

用内置的着色器向导（5.0 版本起提供）：

* `Quad` → `New` → `Shader File`
* 选一个模板
* 为新着色器起个名字
* 在 `Open on Create` 下拉里你可以选：
  * Solution：这是最好的选择，前提是你按[编辑着色器](/libraries/3d/editing-shaders)所述装好了 Visual Studio 和 Stride 扩展
  * 打开 .sdsl 文件：如果你没装 Visual Studio，用任何文本编辑器编辑 .sdsl 文件也行
  * 打开文件夹：这会儿不想改文件的话，也可以只让资源管理器打开到文件所在的位置
* 按 `Create`
  * 这会在磁盘上创建新的着色器文件，把 VL.Stride 包引用进你的当前文档（如果还没引用的话），并打开这个着色器

## Create the shader node / 创建着色器节点 {#create-the-shader-node}

打开[节点浏览器](/develop-environment/the-node-browser)，按你起的名字找到这个着色器。

从此以后，每当你在着色器文件里保存一处改动，这个节点都会相应更新。

## Further details / 更多细节 {#further-details}

### Scope / 代码范围 {#scope}

任何把 VL.Stride 设为依赖的 .vl 文档，都会拾取放在它旁边、名为 “shaders” 的特殊文件夹里的着色器文件。多个 .vl 文档可以共用同一个 shaders 文件夹。

:::note
着色器文件共享一个全局范围，所以不能有两个同名文件 —— 哪怕分属两个不同的 .vl 文档。
:::

### Special Suffixes / 特殊后缀 {#special-suffixes}

如果一个着色器文件以下面某个预定义后缀结尾，这个着色器就会被转换成一个 VL 节点。

#### _ShaderFX {#_shaderfx}

一个只代表「一段代码」的节点，用来组合出更大的着色器。这类节点最灵活，跟其他所有类型的着色器节点都能配合。

#### _DrawFX {#_drawfx}

一个可以用来绘制几何体的节点。

#### _ComputeFX {#_computefx}

一个代表计算着色器的节点，用来在 GPU 上处理任意数据。

#### _TextureFX {#_texturefx}

处理纹理的专用节点。更多内容见 [TextureFX](/libraries/3d/texturefx) 一章。

## Core Concepts / 核心概念 {#core-concepts}

### Includes and Static Calls / include 与静态调用 {#includes-and-static-calls}

你可以像在 HLSL 里那样使用 [`#include` 指令（英文）](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-include)。不过你往往用不着它 —— 因为只要另一个着色器在[代码范围](#scope)之内（比如在同一个目录里，或者两者都在某个已加载 .vl 文档旁边的 /shaders 文件夹里），你就能直接调用它的静态函数。静态函数是指那些不使用任何 stream 变量或类变量（比如着色器输入）的函数。另见 Stride 文档里的 [Static Calls（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/shader-classes-mixins-and-inheritance.html#static-calls)。

假设你有一个这样的 `MyUtils.sdsl` 文件：

```c
shader MyUtils
{
    float4 Invert(float4 col)
    {
        col.rgb = 1 - col.rgb;
        return col;
    }
};
```

你可以在另一个文件里这样调用它的静态函数：

```c
shader MyFx_TextureFX : FilterBase
{
    float4 Filter(float4 tex0col)
    {
        return MyUtils.Invert(tex0col);
    }
};
```

### Inheritance / 继承 {#inheritance}

继承主要用来复用已有的着色器代码，可以理解成把另一个着色器的代码导入或包含进自己的着色器。

例子见 Stride 文档里的 [Inheritance（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/shader-classes-mixins-and-inheritance.html#example-code-inheritance)。

想更好地理解着色器的继承层级，你可以：

* 用 **VS Code 的 Stride Shader Tools 扩展**，它在你编辑时于侧边栏面板里显示继承树（见[编辑着色器](/libraries/3d/editing-shaders)）
* 用独立的 [Stride.ShaderExplorer](/libraries/graphics-3d#useful-tools) 工具来浏览和导出着色器层级

### Composition {#composition}

Composition 让着色器 A 能把另一个着色器 B 当成一个变量来用，调用 B 的函数。关键在于：A 期望的 composition 变量是着色器类 B，那么凡是继承自 B 的着色器 —— C、D 都行 —— 都可以填进这个位置。同一个 composition 能换上不同的实现，这就得到了面向对象语言里**接口**那样的多态。

例子见 Stride 文档里的 [Composition（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/composition.html)。

### Streams / Stream {#streams}

在着色器的不同阶段之间传参，SDSL 提供了一个方便的办法：把变量声明成 stream 变量，任何着色器阶段都能读写。SDSL 编译器会为每个阶段生成对应的输入输出结构体。

例子见 Stride 文档里的 [Automatic shader stage input/output（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/automatic-shader-stage-input-output.html)。
