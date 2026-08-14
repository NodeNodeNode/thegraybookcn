---
title: Editing shaders / 编辑着色器
slug: /libraries/3d/editing-shaders
source_path: reference/libraries/3d/editing-shaders.md
source_blob: 20902442adcad79fdf5fad1040ed703965a10236
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/editing-shaders.html)

着色器用 [SDSL（英文）](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/index.html)编写，它是 [HLSL（英文）](http://msdn.microsoft.com/en-us/library/windows/desktop/bb509561%28v=vs.85%29.aspx)的一个超集。

vvvv 不自带着色器编辑器，你可以用任何自己喜欢的文本编辑器 —— 只要把 `.sdsl` 这个文件后缀关联到它就行。之后你在某个着色器节点上右键 → Open，代码就会在指定的编辑器里打开。每当你保存这个文件，这个着色器节点就会更新。

## Recommended: Visual Studio Code with Stride Shader Tools / 推荐：Visual Studio Code 加 Stride Shader Tools {#recommended-visual-studio-code-with-stride-shader-tools}

[Visual Studio Code](https://code.visualstudio.com/) 或 [VSCodium](https://vscodium.com/) 装上 **[Stride Shader Tools](https://marketplace.visualstudio.com/items?itemName=stride.sdsl)** 扩展（[OpenVSX](https://open-vsx.org/extension/tebjan/sdsl)），能提供：

* SDSL 语法高亮
* 上下文相关的代码补全（继承来的成员、stream、语义、composition）
* 侧边栏里的继承树可视化
* 成员浏览器，列出所有可用的方法和变量
* 沿着继承链的「转到定义」
* 实时错误报告
* 类型、方法和语义的悬停文档
* 结合 RenderDoc 的 SDSL 层面调试 *（即将推出）*

## Alternative: Other Text Editors / 备选：其他文本编辑器 {#alternative-other-text-editors}

如果你更喜欢别的编辑器，那么任何带 HLSL 语法高亮的编辑器都能用：

* [Sublime Text](https://www.sublimetext.com/) 加 “HLSL Syntax” 包
* 任何支持 HLSL 高亮的文本编辑器

## Error Reporting with Visual Studio (Alternative) / 用 Visual Studio 做错误报告（备选） {#error-reporting-with-visual-studio-alternative}

上面推荐的 **Visual Studio Code 加 Stride Shader Tools** 已经提供了实时错误报告。

如果你更喜欢 **Visual Studio 2022**，这样配置也能得到错误报告：

* [Visual Studio 2022](https://visualstudio.microsoft.com/)
* Visual Studio 的 Stride 扩展，它随 [Stride 安装程序](https://stride3d.net/download/)一起提供
* Stride 本身也必须装上。你的 vvvv 版本具体需要哪个版本的 Stride，可以在 vvvv 的 “About” 对话框里查

### Additional Tools / 其他工具 {#additional-tools}

* **[Stride Shader Explorer](https://github.com/tebjan/Stride.ShaderExplorer/releases)**：一个独立工具，用来浏览内置着色器及其继承层级。它现在已经整合进了 VS Code 扩展，但作为独立的浏览器仍然好用。
* **Visual Studio 增强**（如果你用 VS）：
  * 打开[滚动条代码图（英文）](https://learn.microsoft.com/en-us/visualstudio/ide/how-to-track-your-code-by-customizing-the-scrollbar?view=vs-2022)
  * 用 [Productivity Power Tools](https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.ProductivityPowerPack2022) 高亮选中的词
