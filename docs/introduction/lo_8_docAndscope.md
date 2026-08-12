---
title: Documents, Dependencies and Scopes / 文档、依赖与作用域
slug: /explanations/documents-dependencies-and-scopes
source_path: introduction/lo_8_docAndscope.md
source_blob: f6a29f776dc096ea380ff7f8cc40989cbe0be82b
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/introduction/lo_8_docAndscope.html)

## Documents / 文档 {#documents}

一个文档可以包含很多草图。

在这些草图里，你会用到基础库自带的节点，或者别人做的节点。

## Dependencies / 依赖 {#dependencies}

所以，要用上不在基础库里的节点，你得能告诉系统：装着那个节点的文件在哪。这些文件就是这个文档的**依赖**。依赖可以通过导航栏来编辑。

依赖可以是别的 .vl 文件，也可以是 .vlimport 文件。

## Scopes / 作用域 {#scopes}

每个文档能看到哪些节点，取决于它自己的依赖。

好处在于：**你同时打开多个文档也没关系。** 只要它们之间没有互相引用，就不会互相影响 —— 每个文档只能看到自己依赖列表里的那些节点。

这样你就可以同时打开自己文档的好几个版本。你在里面定义的节点和类型，在不同版本里很可能同名；但因为它们彼此看不见，所以可以并存。
