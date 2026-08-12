---
title: Graphics Cards / 显卡
slug: /libraries/3d/graphics-cards
source_path: reference/libraries/3d/graphics-cards.md
source_blob: 7b799c3b3edb69df8a72ebb5c9ce2d0070533d52
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/3d/graphics-cards.html)

vvvv 任何时候都只用一块 GPU！这意味着你不能简单地往机器上再插一块 GPU、把一个渲染窗口挪过去，就以为这个窗口跑在第二块 GPU 上了！

如果你的系统有多块 GPU，你可以为每个程序（包括 vvvv.exe，或任何你[导出](/develop-environment/exporting)的程序）单独决定它跑在哪块 GPU 上。做法是为它[指定图形性能首选项（英文）](https://www.ghacks.net/2021/10/29/how-to-assign-graphics-performance-preferences-to-windows-11-programs/)。

「只用一块 GPU」这条规则有一个例外：以 [SLI](https://www.nvidia.com/en-gb/geforce/technologies/sli/) 模式使用多块 GPU 时。
