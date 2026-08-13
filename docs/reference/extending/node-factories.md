---
title: Node Factories / 节点工厂
slug: /extending/node-factories
source_path: reference/extending/node-factories.md
source_blob: 241c208d5633962b87893834f596df5c9bfc6a19
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/node-factories.html)

*node factory*（节点工厂）让你用 C# 这样的语言直接造出完整的节点，不必把类型和方法拖到 VL 画布上。工厂通过一套 API 动态描述节点，所以也能用程序批量生成。

做好之后，请把这个工厂选为你的 VL 文档的依赖，像这样：

![](https://user-images.githubusercontent.com/575557/179545040-f7dcc439-8edf-4b6e-ac1c-21dfe42a4c17.png)

## 基本组件 {#basic-components}

用来把节点列进节点浏览器的：

* [IVLNodeDescriptionFactory](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/IVLNodeDescriptionFactory.cs)
* [IVLNodeDescription](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/IVLNodeDescription.cs)
* [IVLPinDescription](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/IVLPinDescription.cs)
* [NodeBuilding 辅助类](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/NodeBuilding.cs)

用来执行的：

* [IVLNode](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/IVLNode.cs)、[FactoryBasedVLNode](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/FactoryBasedVLNode.cs)
* [IVLPin](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/NodeFactory/IVLPin.cs)

## 示例 {#examples}

* https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Video/src/Initialization.cs
* https://github.com/vvvv/VL.Audio/blob/main/VL.Audio/src/Initialization.cs
* https://github.com/vvvv/VL.RunwayML/blob/master/src/Initialization.cs
* https://github.com/vvvv/VL.StandardLibs/blob/main/VL.ImGui/src/Initialization.cs
* https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Stride.Runtime/src/Initialization.cs
