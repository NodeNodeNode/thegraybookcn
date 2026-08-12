---
title: TextureFX / TextureFX/图像效果
slug: /libraries/3d/texturefx
source_path: reference/libraries/3d/texturefx.md
source_blob: 5da6841230d80db2d9cf38b7d009001f1d827bd7
status: partial
last_synced: '2026-08-12'
---

TextureFX是用来创建基于GPU/shader的图像着色器节点的规范。着色器使用[SDSL](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/index.html)语言规范来编写，它是对于[HLSL](http://msdn.microsoft.com/en-us/library/windows/desktop/bb509561%28v=vs.85%29.aspx)的扩展。我们必须要区分以下基本概念Sources、Mixers、Filters 和 Utils。

以下是你编写自己的图像效果的时候需要了解的内容：

## 创建一个新的图像效果

在你的.vl文档的同一目录下新建叫做``\shaders``的文件夹。在这个文件夹中创建带有后缀``_TextureFX.sdsl``的文件，例如：
```
\MyProgram.vl
\shaders\MyFx_TextureFX.sdsl
```

一个.sdsl的着色器文件内部将会包含source, mixer, filter或者utility TextureFX。对于一个简单的反向滤波器，下面的代码就是所需要的一切。
```
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

有三件事情对于节点工厂选取你的文件，并且将它解释为一个TextureFX的着色器至关重要：
- 着色器的名字必须在vvvv系统中，以及在你的文件中必须唯一
- 着色器必须以`_TextureFX`结尾
- 文件的名字必须看起来像这样：`[shader-name]_TextureFX.sdsl`

:::

## 目录和种类

在默认情况下，每个TextureFX的节点都会显示在```Stride\Textures```的目录下。想要将节点移动到别的目录下，请使用节点属性。

想要定义节点的种类是"Experimental", "Internal", "Obsolete" and "Advanced" 的时候，有两种方式：
- 同样你可以在你的shader的文件名字中加入对种类的定义，但是必要忘记着色器的名字和文件的名字必须相同
- 可以在节点属性的目录中定义它

## 继承基础着色器

系统中已经有非常丰富的着色器你可以直接[继承](https://thegraybook.vvvv.org/reference/libraries/3d/shaders.html#inheritance)。并且允许多重继承！
- 这些着色器与Stride一起发布：使用[Shader Explorer](https://github.com/tebjan/Stride.ShaderExplorer)来查看可以继承的着色器(需要安装[Stride](https://www.stride3d.net/download/))
- 着色器与VL.Stride一起发布：请查看这些.sdsl文件，路径是C:\Program Files\vvvv\vvvv_gamma_...\lib\packs\VL.Stride.Runtime...\stride\Assets\Effects

### 推荐的基础着色器

### TextureFX
TextureFX派生自ImageEffectShader、SpriteBase、ShaderBase、Texturing和ShaderUtils。

### FilterBase

从TextureFX继承派生出来，允许你使用Mix()函数，可以输入两个可切换的贴图和一个驱动参数。

:::note

使用 ```tex0col``` 输入并不是强制的，你还是可以添加其他的贴图输入到采样器的。

:::

### MixerBase

从TextureFX继承派生出来，允许你实现一个Mix()的函数，可以让实现在两个纹理之间根据参数的变换来切换。

:::note

使用 ```tex0col``` 和 ```tex1col``` 输入不是强制性的，您仍然可以添加其他纹理输入以进行采样。

:::

### ShaderUtils

