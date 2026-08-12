---
title: TextureFX / TextureFX
slug: /libraries/3d/texturefx
source_path: reference/libraries/3d/texturefx.md
source_blob: 5da6841230d80db2d9cf38b7d009001f1d827bd7
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/texturefx.html)

TextureFX 是一套规范，规定了那些基于 GPU／着色器做纹理运算的节点该长什么样。着色器用 [SDSL（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/index.html)编写，它是 [HLSL（英文）](http://msdn.microsoft.com/en-us/library/windows/desktop/bb509561%28v=vs.85%29.aspx)的一个超集。我们把它们分成 Source、Mixer、Filter 和 Util 几类。

要写自己的 TextureFX，你需要知道这些：

## 创建一个新的 TextureFX {#creating-a-new-texturefx}

首先，关于怎样配好一个外部着色器编辑程序，见[编辑着色器](/libraries/3d/editing-shaders)。

然后照[从模板开始](/libraries/3d/shaders#start-from-a-template)去做 —— 那是写着色器最快的路子。如果你偏要手动创建着色器文件，那么为了让节点工厂能拾取这个文件、并把它当作 TextureFX 着色器来解读，你得注意这几点：

* 文件必须放在你 .vl 文件旁边一个叫 `shaders` 的子文件夹里
* 着色器名字在「随 vvvv 发布的着色器」和「你自己的着色器」之中必须唯一
* 着色器名字必须以 **_TextureFX** 结尾
* 文件名必须是：**[着色器名]_TextureFX.sdsl**

## 目录与 Aspect {#category-and-aspects}

默认情况下，每个 TextureFX 节点都会出现在 `Stride\Textures` 目录下。想把节点挪进某个子目录，用[节点特性](#node-attributes)。

“Experimental”、“Internal”、“Obsolete”、“Advanced” 这些 Aspect 有两种指定方式：

* 要么写进着色器的文件名里 —— 这种情况下别忘了着色器名字本身必须与文件名一致
* 要么写进目录[节点特性](#node-attributes)里

## 可继承的基础着色器 {#base-shaders-to-inherit-from}

有一批着色器，你可以从中[继承](/libraries/3d/shaders#inheritance)有用的功能。允许多重继承！

* 随 Stride 发布的：用 [Shader Explorer](https://github.com/tebjan/Stride.ShaderExplorer) 来浏览可继承的着色器（还需要装上 [Stride](https://stride3d.net/download/)）
* 随 VL.Stride 发布的：去这个位置翻 .sdsl 文件：`C:\Program Files\vvvv\vvvv_gamma_...\lib\packs\VL.Stride.Runtime...\stride\Assets\Effects`

### 推荐的基础着色器 {#recommended-base-shaders}

#### TextureFX {#texturefx}

[TextureFX](https://github.com/vvvv/VL.Stride/blob/preview/gamma-2021.4/packages/VL.Stride.Runtime/src/Effects/TextureFX/TextureFX.sdsl) 派生自 [ImageEffectShader](https://github.com/stride3d/stride/blob/master/sources/engine/Stride.Rendering/Rendering/Images/ImageEffectShader.sdsl)、[SpriteBase](https://github.com/stride3d/stride/blob/master/sources/engine/Stride.Graphics/Shaders/SpriteBase.sdsl)、[ShaderBase](https://github.com/stride3d/stride/blob/master/sources/engine/Stride.Graphics/Shaders/ShaderBaseStream.sdsl)、[Texturing](https://github.com/stride3d/stride/blob/master/sources/engine/Stride.Graphics/Shaders/Texturing.sdsl) 和 [ShaderUtils](https://github.com/vvvv/VL.Stride/blob/preview/gamma-2021.4/packages/VL.Stride.Runtime/src/Effects/Common/ShaderUtils.sdsl)。

#### FilterBase {#filterbase}

派生自 TextureFX。让你能实现 `Filter()` 函数 —— 它带一个参数，也就是输入纹理的颜色：

```c
shader MyFx_TextureFX : FilterBase
{
    float4 Filter(float4 tex0col)
    {
        tex0col.rgb = 1 - tex0col.rgb;
        return tex0col;
    }
};
```

:::note
用不用 `tex0col` 这个输入并非强制，你仍然可以添加别的纹理输入来采样。
:::

#### MixerBase {#mixerbase}

派生自 TextureFX。让你能实现 `Mix()` 函数 —— 它带的参数是两个输入纹理的颜色，外加一个混合系数：

```c
shader Mix_TextureFX : MixerBase
{
    float4 Mix(float4 tex0col, float4 tex1col, float fader)
    {
        return lerp(tex0col, tex1col, fader);	
    }
};
```

:::note
用不用 `tex0col` 和 `tex1col` 这两个输入并非强制，你仍然可以添加别的纹理输入来采样。
:::

#### ShaderUtils {#shaderutils}

[ShaderUtils](https://github.com/vvvv/VL.Stride/blob/preview/gamma-2021.4/packages/VL.Stride.Runtime/src/Effects/Common/ShaderUtils.sdsl) 定义了 PI 这类常量，并提供了许多常用的着色器代码片段。

## include 文件 {#include-files}

见 [include 与静态调用](/libraries/3d/shaders#includes-and-static-calls)。

## 节点特性 {#node-attributes}

特性让你能配置自己的 TextureFX 节点。下面是给一个着色器加上若干特性的例子：

```c
[Category("Filter")]
[Summary("Description for what the filter does")]
[Remarks("Any special notes")]
[Tags("Space-separated list of tags")]
[OutputFormat("R8G8B8A8_UNorm_SRgb")]
shader MyFX_TextureFX : TextureFX
{
    stage override float4 Shading()
    {
        return ColorUtilityTemp.LinearToSRgb(InTex0());
    }
};
```

| 特性 | 说明 |
|---|---|
| Category | 不指定的话，节点会出现在 `Stride\Textures` 下。指定一个目录，就能把节点放进那底下的某个子目录。用 `:` 可以定义一个新的根目录（比如 `:My.Category`）。此外这里也可以在目录之中加上 [Aspect](/extending/aspects)，比如 `Filter.Experimental`。 |
| Summary | 一句简短说明，会作为提示框显示在节点浏览器里的节点上，以及在草图里悬停时显示。 |
| Remarks | 关于这个节点的补充信息，在草图里的提示框上可见。 |
| Tags | 一串搜索词（用空格分隔，不是逗号！），在节点浏览器里输入这些词应该能找到这个节点。 |
| OutputFormat | 用来指定输出纹理的格式。有效取值见 [PixelFormats](https://github.com/stride3d/stride/blob/master/sources/engine/Stride/Graphics/PixelFormat.cs)。不指定的话默认是 R8G8B8A8_UNorm_SRgb。 |
| WantsMips | 为某个特定纹理输入请求 mipmap。见下文 [Mipmap](#mipmaps)。 |
| DontConvertToLinearOnRead | 你多半用不着这个标志！设上它会关掉「从 sRGB 输入纹理读取（采样）时自动做的 sRGB 转线性」。只有当输入纹理格式带 `_SRgb` 后缀、且管线设为线性色彩空间（这是默认）时才有意义。见下文 [sRGB 与线性色彩空间](#srgb-and-linear-color-space)。 |
| DontConvertToSRgbOnWrite | 你多半用不着这个标志！设上它会关掉「把着色器结果写进 sRGB 纹理时自动做的线性转 sRGB」。只有当 OutputFormat 带 `_SRgb` 后缀、且管线设为线性色彩空间（两者都是默认）时才有意义。见下文 [sRGB 与线性色彩空间](#srgb-and-linear-color-space)。 |

## Source 节点特性 {#source-node-attributes}

下面这个特性专供 Source 类 TextureFX 使用：

```c
[TextureSource]
shader Foo_TextureFX : TextureFX
```

| 特性 | 说明 |
|---|---|
| TextureSource | 指定一个着色器表现为 [TextureFX Source](#sources)。此外：任何纹理输入针脚都会保留声明时的名字（Filter 和 Mixer 则不然 —— 那里针脚会被改名，以便所有节点之间有一套简洁一致的命名）。 |

## 针脚特性 {#pin-attributes}

每个针脚定义都可以带下列特性：

| 特性 | 说明 |
|---|---|
| Summary | 一句简短说明，作为提示框显示在这个针脚上 |
| Remarks | 补充信息，同样显示在这个针脚的提示框上 |
| Optional | 标记为 optional 的针脚默认不显示在节点上，需要通过节点的配置菜单打开 |
| Color | 让一个 float4 输入显示为颜色针脚 |
| EnumType | 让一个 int 输入显示为枚举。**注意**：这还要求你在 C# 里定义好指定的那个枚举，并让使用这个 TextureFX 的 .vl 文档引用到它。 |
| Default | 只用于 Compute 类输入，指定它们的默认值。基本类型的输入直接在变量定义处设默认值即可。 |

### 示例 {#examples}

```c
[Color]
[Summary("The color to do this and that")]
float4 MyColor;

[EnumType("VL.Stride.Effects.TextureFX.NoiseType")]
int Type;

[Default(1, 1, 1, 1)]
compose ComputeFloat4 Control;
```

## 输入 {#inputs}

每个 TextureFX 节点都恰好有一个纹理输出，以及默认的若干输入：

### Source {#sources}

| 名字 | 类型 | 可选 | 说明 |
|---|---|---|---|
| Output Format | PixelFormat 枚举 | x | 输出纹理的格式，默认 R8G8B8A8_UNorm_SRgb |
| Output Size | Int2 | | 输出纹理的尺寸 |
| Enabled | Boolean | | 输出是否更新 |

要把一个 TextureFX 变成 “Source”，指定 [“TextureSource” 特性](#source-node-attributes)。

### Filter、Mixer 和 Util {#filter-mixer-and-utils}

| 名字 | 类型 | 可选 | 说明 |
|---|---|---|---|
| Input | Texture | | |
| Sampler | SamplerState | x | 用来覆盖默认的采样器 |
| Control | `GPU<Vector4>` | | 用来在输入与运算结果之间做混合 |
| Output Format | PixelFormat 枚举 | x | 用来覆盖输出纹理的格式，默认为 `None`，即使用输入纹理的格式 |
| Output Size | Int2 | x | 用来覆盖输出纹理的尺寸 |
| Output Texture | Texture | x | 用来把输出渲染到给定的纹理里，而不是用节点自己的纹理 |
| Apply | Boolean | | 这个效果是作用到输入纹理上，还是被绕过、直接把输入原样返回 |

## 多趟渲染 {#multiple-passes}

目前着色器代码里还不支持多趟。话虽如此，你仍然可以做出多趟的 TextureFX：把每一趟各自做成一个独立的 TextureFX，再在草图里把它们串起来。例子可以看 Glow 滤镜是怎么做的。

注意这种情况下，把各趟标上 “Internal” 这个 [Aspect](#category-and-aspects) 是有道理的 —— 它们多半不该被单独使用，因此不该出现在节点浏览器里。

## Mipmap {#mipmaps}

有些效果需要输入纹理带 mipmap。这可以通过 `[WantsMips("")]` 特性来表明，它接受一串用逗号分隔的、需要 mipmap 的纹理变量名。之后 TextureFX 的包装层会替你生成 mipmap —— 如果这个纹理还没有的话。为了省性能，会额外生成一个输入针脚，用来控制 mipmap 是每一帧都生成，还是只在纹理实例变化时才生成，默认是 `true`。

```c
[WantsMips("Texture0, MyTexture, ...")]
shader Foo_TextureFX : TextureFX
```

## sRGB 与线性色彩空间 {#srgb-and-linear-color-space}

渲染管线默认设为线性色彩空间。做颜色运算（比如混合和光照）时，这才是正确的色彩空间。但几乎所有图像都以非线性的 sRGB 色彩空间存储 —— 因为那样能用更低的位深，文件也就更小。为了解决这个矛盾，图形 API 提供了[带 `_SRgb` 后缀的低位深像素格式](https://github.com/stride3d/stride/blob/7e836297cb5930c01e6dfa0183e7f3cc64748fb6/sources/engine/Stride/Graphics/PixelFormatExtensions.cs#L590)，用来表明这些像素值处在 sRGB 色彩空间里。

（线性的）图形管线会在从 sRGB 纹理采样某个像素时自动把它从 sRGB 转成线性，也会在把某个像素写进设为渲染目标的 sRGB 纹理时自动把它从线性转成 sRGB。

不过，如果你搬来的着色器代码原本是为传统的 sRGB／非线性管线写的（vvvv beta 里的 DX9/DX11 就是），你可能会想表明输入和输出的颜色处在 sRGB 空间里。

为此，你可以用两个特性来声明读写意图：

* `[DontConvertToLinearOnRead]`，输入应保持为 sRGB。如果这个资源不是无类型的（也就是[强类型的](https://docs.microsoft.com/en-us/windows/win32/direct3d11/overviews-direct3d-11-resources-intro#strong-vs-weak-typing)），这可能会牵扯到一次内部的纹理复制。
* `[DontConvertToSRgbOnWrite]`，输出已经是 sRGB 了。

```c
[DontConvertToLinearOnRead] //could involve a copy for each input texture
[DontConvertToSRgbOnWrite] //almost cost free
shader MySRgbFX_TextureFX : FilterBase
{
    float4 Filter(float4 tex0col)
    {
        tex0col.rgb = tex0col.rgb;
        return tex0col;
    }
};
```

只有当输入纹理或渲染目标带 `_SRgb` 后缀时，这两个特性才会起作用。

因为输入纹理可能不止一个，所以也可以给出一串用逗号分隔的输入纹理变量名，只对其中特定的几个设置这个输入特性：

```c
[DontConvertToLinearOnRead("Texture0, MyTexture")]
[DontConvertToSRgbOnWrite]
shader MySRgbFX_TextureFX : FilterBase
```

## 系统值与着色器语义 {#system-values-and-shader-semantics}

需要的话，可以使用 [HLSL 着色器语义（英文）](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics#system-value-semantics)。

其中许多已经通过继承 [ShaderBase](https://github.com/stride3d/stride/blob/master/sources/engine/Stride.Graphics/Shaders/ShaderBaseStream.sdsl) 以更好读的形式提供了。

### 渲染目标尺寸 {#render-target-size}

一个常见需求是渲染目标的尺寸，它由 `ViewSize` 变量提供。它描述的是当前视口的尺寸 —— 对 TextureFX 来说，那就是渲染目标的完整尺寸：

```c
float2 targetSize = ViewSize;
```

### 时间 {#time}

当前时间和帧时间差，可以通过继承 [Global 着色器](https://github.com/stride3d/stride/blob/master/sources/engine/Stride.Rendering/Rendering/Shaders/Global.sdsl)、并使用 `Time` 和 `TimeStep` 变量来取得。这些值由运行时自动设置。

```c
shader MyBlinker_TextureFX : FilterBase, Global
{
    float4 Filter(float4 tex0col)
    {
        var blink = frac(Time) > 0.5;
        tex0col.rgb = tex0col.rgb * blink;
        return tex0col;
    }
};
```
