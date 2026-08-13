---
title: Finders / 查找
slug: /develop-environment/finders
source_path: reference/hde/finders.md
source_blob: 424859e2a2b75f602bb448f490feb655502e80ca
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/finders.html)

开发环境提供两种快速查找的方式：

* **Finder**：在当前草图里搜字符串
* **SymbolFinder**：搜文档、草图、Operation、Pad

## Finder {#finder}

在任意草图里按 `Ctrl` `+` `F`，搜索本地出现的字符串。输入之后用 `F3` 或 `Enter` 在结果之间跳转，按 `Esc` 收起结果。

![](https://thegraybook.vvvv.org/images/hde/vl-Finder-Finder.png)
Finder

## SymbolFinder {#symbolfinder}

按 `Ctrl` `+` `Shift` `+` `F` 或 `Ctrl` `+` `,`，在全局范围内搜索包含指定字符串的任意符号。

![](https://thegraybook.vvvv.org/images/hde/vl-Finder-SymbolFinder.png)
SymbolFinder

在搜索词前面加上下面这些前缀再跟一个空格，可以缩小搜索范围：

| 前缀 | 含义 |
|---|---|
| d | 只搜文档 |
| p | 只搜草图（类型、Process） |
| m | 只搜成员 Operation |
| u | 只搜工具 Operation |
| f | 只搜字段 |
