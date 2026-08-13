---
title: Documentation Window / 文档窗口
slug: /develop-environment/documentation
source_path: reference/hde/documentation.md
source_blob: 9a649ee3fc9aa405c27ade4a2a4c17b4478b9ca3
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/documentation.html)

用文档窗口可以给你的各种元素写说明。按 `Ctrl` `+` `M` 打开它，顶部的三个下拉框用来导航：

* 文档
* 所选文档里的草图
* 所选草图里的 Operation

只要 *Attach* 复选框没有勾上，你在编辑器里切换草图时，文档窗口就会跟着当前草图走。

![](https://thegraybook.vvvv.org/images/hde/vl-DocumentationWindow.png)
文档窗口

写说明这件事，主要在你准备把节点库分享给别人时才有意义。做自己的项目时基本用不上。

## Document / 文档 {#document}

* Summary：一句话描述这个文档的内容
* Authors：作者
* Credits：致谢
* License URL：许可证地址
* Project URL：项目地址

## Datatype / 数据类型 {#datatype}

* Summary：一句话描述这个数据类型
* Remarks：补充的用法说明、注意事项、已知问题等
* Tags：逗号分隔的标签，用来在节点浏览器里找到这个数据类型
* Properties：逐个描述这个数据类型的每个参数

## Operation / Operation {#operation}

* Summary：一句话描述这个 Operation
* Remarks：补充的用法说明、注意事项、已知问题等
* Tags：逗号分隔的标签，用来在节点浏览器里找到这个 Operation
* Inputs：逐个描述这个 Operation 的每个输入
* Outputs：逐个描述这个 Operation 的每个输出
