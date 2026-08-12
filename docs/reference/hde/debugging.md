---
title: Debugging / 调试
slug: /develop-environment/debugging
source_path: reference/hde/debugging.md
source_blob: 2ccafe04a6bc64f4233021a8035ad0dacfe6c3b1
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/debugging.html)

按 `Ctrl` `+` `F2` 打开这几个调试窗口：

- [构建结果](debugging-buildresult.md)
- [应用健康](debugging-apphealth.md)
- [日志](debugging-log.md)

## Stepping Execution / 单步执行 {#stepping-execution}

| 操作 | 按键 |
|---|---|
| 运行 | `F5` |
| 单步执行 | `F6` |
| 暂停执行 | `F7` |
| 停止执行 | `F8` |
| 重启 | `F9` |

按 `F7` 可以暂停 VL 的执行。反复按 `F6`，执行就会一步一步往前走。按 `F5` 回到运行状态。

你也可以在[设置](settings.md)里打开 *Pause on error*，这样一出错就自动暂停，并跳到抛出异常的那个节点。

## IOBoxes {#ioboxes}

把 [IOBox](../language/ioboxes.md) 接在上游，用来显示传进来的值。

*（上游此处待补图：用 IOBox 查看上游的值）*

## Tooltips / 提示框 {#tooltips}

把鼠标悬停在针脚上，提示框会显示它的名字和类型。

*（上游此处待补图：显示针脚名字和类型的提示框）*

如果类型是 Sequence、Spread 这类集合，提示框还会用方括号显示集合的元素个数，以及前三个元素的值。

*（上游此处待补图：集合类型的提示框）*

:::note
如果你观察的这个针脚位于一个被实例化了多次的草图里，**目前还没有办法知道这个值属于哪一个实例**。
:::

## Timings / 耗时 {#timings}

在[设置](settings.md)里打开 *Show Timings* 之后，提示框会显示耗时。

*（上游此处待补图：节点上的耗时提示）*

*（上游此处待补图：数据类型定义上的耗时提示）*

## Write to Console / 写到控制台 {#write-to-console}

日志窗口可以通过 `Quad > Windows > Log` 打开，或者按 `Ctrl` `+` `F1`。

用 `System.Console` 目录下的进阶节点 `Write` 和 `WriteLine`，把调试信息写进日志。

控制台获得焦点时按 `Backspace` 可以清空它。

## Warnings and Errors / 警告与错误 {#warnings-and-errors}

*（上游此处待补图：报错的节点）*

*（上游此处待补图：带警告的连线）*

*（上游此处待补图：带警告的针脚）*

针脚上的警告你确认过之后，按 `Ctrl` `+` `E` 可以把它们清掉。

## Attaching Visual Studio / 挂接 Visual Studio {#attaching-visual-studio}

如果遇到用上面这些手段都追不到的错误，还可以用 Visual Studio 挂接到你的草图上。

:::note
注意：这不是给普通用户准备的。
:::

但如果你对 C# 编程相当熟悉，可以这么做：

- 用 `--debug` 命令行参数启动 vvvv.exe
- 运行 Visual Studio
- 挂接到 vvvv.exe
- 等待异常发生
- 这时会打开你草图对应的 C# 代码，并跳到出错的位置。你也可以在这里设断点。这有助于你找到问题的根源
