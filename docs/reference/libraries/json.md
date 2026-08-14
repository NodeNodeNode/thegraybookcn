---
title: JSON / JSON
slug: /libraries/json
source_path: reference/libraries/json.md
source_blob: dc4d4e9cb7c728cf0d29008cf564c1b1d2f36979
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/json.html)

在 VL 里，默认不是直接对 JSON 对象做操作，而是把 JSON 转换成 XElement —— 后者很容易查看和修改。反过来，XElement 也随时可以转换成 JSON。

:::note
如果在某个进阶场景里，你发现这种「JSON 转 XElement」的做法行不通，你仍然可以直接对 JSON 操作 —— 引用 [JSON.NET](https://www.newtonsoft.com/json) 这样的库即可，做法见[使用 .NET 库](/extending/using-net-libraries)。
:::

## Loading a JSON file / 加载一个 JSON 文件 {#loading-a-json-file}

加载文件可能相当耗时，因而会打断你本来流畅的帧率。为此 VL 提供了两种文件读取方案：

* 简单好用、但会阻塞的方案
* 不阻塞、但要多点几下才能配好的方案

### Blocking / 阻塞 {#blocking}

用 *JSONReader [System.XML]* 节点读一个 .json 文件，结果以 XElement 的形式给你：

![](https://thegraybook.vvvv.org/images/libraries/json-37ff4.png)
JSONReader 加载一个 .json 文件并立刻以 XElement 返回，这可能会阻塞程序其余部分的执行

### Non-Blocking (Reactive) / 不阻塞（响应式） {#non-blocking-reactive}

异步加载 .json 文件最简单的办法，是把 *JSONReader (Reactive) [System.XML]* 和 *HoldLatest [Reactive]* 连起来用。文件加载完成后，HoldLatest 会在它的 **On Data** 输出上打出一个脉冲，并把文件内容以 XElement 返回：

![](https://thegraybook.vvvv.org/images/libraries/json-3b519.png)
JSONReader (Reactive) 加载一个 .json 文件，在之后的某一帧以 XElement 返回，因而程序其余部分不会被打断

而既然已经进了响应式／异步的世界，你还可以对这个文件做进一步的解析，比如用 *ForEach [Reactive]*：

![](https://thegraybook.vvvv.org/images/libraries/json-1a150.png)
这个例子里，除了异步加载文件之外，还顺手取出了根元素的名字作为一个简单示范。不过显然，你在这里可以做更昂贵的运算，而它们照样不会打断你的帧率

这样一来，加载和解析都是异步完成的，只有两者都完成之后，你才拿到结果去做后续处理。

## Parsing a JSON string / 解析一个 JSON 字符串 {#parsing-a-json-string}

如果你手上有一个 JSON 格式的字符串，直接用 *ParseJSON [System.XML]* 节点把它转成 XElement 以便后续处理：

![](https://thegraybook.vvvv.org/images/libraries/json-890ce.png)

## Saving a JSON file / 保存一个 JSON 文件 {#saving-a-json-file}

保存文件可能相当耗时，因而会打断你本来流畅的帧率。为此 VL 提供了两种文件写入方案：

* 简单好用、但会阻塞的方案
* 不阻塞、但要多点几下才能配好的方案

### Blocking / 阻塞 {#blocking-1}

用 *JSONWriter [System.XML]* 节点把给定的 XElement 写进一个 .json 文件：

![](https://thegraybook.vvvv.org/images/libraries/json-10881.png)

### Non-Blocking (Reactive) / 不阻塞（响应式） {#non-blocking-reactive-1}

异步保存 .json 文件最简单的办法，是把 *JSONWriter (Reactive) [System.XML]* 和 *ToObservable [Reactive]* 连起来用。把 XElement 接到 ToObservable 节点的 **Message** 输入上，再给它的 **Send** 输入打一个脉冲，操作就开始了。保存完成后，JSONWriter 的 **On Completed** 输出会打出一个脉冲：

![](https://thegraybook.vvvv.org/images/libraries/json-bf0b4.png)

不过连搭建 XElement 结构本身都可能很耗时，所以你也可以把草图的这一部分甩进响应式的世界，只在写文件之前才做，比如用 *ForEach [Reactive]*：

![](https://thegraybook.vvvv.org/images/libraries/json-7c6e9.png)

这样一来，创建 XElement 和保存文件都是异步完成的，不会打断你的帧率。

## Converting an XElement to a string in JSON format / 把 XElement 转换成 JSON 格式的字符串 {#converting-an-xelement-to-a-string-in-json-format}

如果你有一个 XElement，只是想把它转成 JSON 格式的字符串，用 *ToJSON [System.XML]* 节点：

![](https://thegraybook.vvvv.org/images/libraries/json-cba43.png)
