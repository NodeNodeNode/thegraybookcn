---
title: IOBoxes / 输入输出盒子
slug: /language/ioboxes
source_path: reference/language/ioboxes.md
source_blob: 7e7bb1d754be9705bc207a72570d431b31e8ca5e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/ioboxes.html)

IOBox 是 “Input/Output boxes”（输入输出盒子）的简称：既可以把固定的数值*输入*到程序里，也可以把数值*输出*出来，用于调试或显示。

![](https://thegraybook.vvvv.org/images/language/ioboxes-8e444.png)
各种不同数据类型的 IOBox

通常的做法是：从某个节点的输入或输出 *Pin*（针脚）上引出一条 *Link*（连线），然后按鼠标中键（或者 `Alt` `+` 左键单击）创建出对应的 IOBox。另一种做法是在 *Patch*（草图）的空白处双击右键，在弹出的节点浏览器里选一个。

![](https://thegraybook.vvvv.org/images/language/ioboxes-fb5fa.png)
双击右键后从节点浏览器中选择 IOBox

每种基本数据类型都有相应的 IOBox，而且各自都有一些特别的用法，下面逐个来看。

## 设置 IOBox {#configuring-ioboxes}

所有 IOBox 的设置方式都是一样的，都通过 inspector 来改：

* 用鼠标中键点击 IOBox
* 或者右键点击它的标签，选择 `Configure`

![](https://thegraybook.vvvv.org/images/language/ioboxes-e0989.png)
设置一个数值 IOBox

## 数值 {#numbers}

不管是整数（integer32、byte 等）还是实数（float32 等），数值 IOBox 的用法都一样：

* 双击，用键盘输入数值

:::note
你也可以直接输入算式，比如 “1/3”，它会立刻求值并把结果填进 IOBox。
不过要输入负号，比如 “-1”，你得写成 “±1”。
:::

* 按住右键上下拖动，可以连续改变数值
  * 拖动时按住 `Shift`，步长除以 10
  * 拖动时按住 `Ctrl`，步长再除以 10
  * 配合上面两个再按住 `Alt`，就变成乘以而不是除以
* `Alt` `+` 右键单击，把数值重置回默认值

在 inspector 里可以设置：

* 右键拖动时会用到的最小值、最大值和步长
* 显示精度
* 是否显示单位。单位只影响显示，不会影响数值本身
* 显示成横向还是纵向的滑块

## 向量 {#vectors}

向量 IOBox 最主要的设置项，是它的各个分量要横着排还是竖着排。

![](https://thegraybook.vvvv.org/images/language/ioboxes-d3c5e.png)
一个显示了全部分量编辑器的 2D 向量 IOBox

另外，把鼠标悬停在 IOBox 上时，上方会浮出一个数值，改它就能一次性改变所有分量。

## 布尔值 {#booleans}

布尔 IOBox 有三种按钮模式：

![](https://thegraybook.vvvv.org/images/language/ioboxes-6d217.png)
布尔 IOBox 的三种模式

* Toggle：右键单击，在 TRUE 和 FALSE 之间来回切换
* Bang：右键单击，只在一帧内返回 TRUE，其余时候返回 FALSE
* Press：只要右键按住就返回 TRUE，松开就是 FALSE

## 字符串 {#strings}

字符串 IOBox 这样改值：

* 双击，用键盘输入文字
  * 输入过程中按 `Ctrl` `+` `Enter` 可以换行
* `Ctrl` `+` 右键单击，打开选择文件的对话框
* `Shift` `+` 右键单击，打开选择目录的对话框

在 inspector 里可以设置：

* 从三种字符串类型里选一种：
  * *String*：默认
  * *Comment*：在草图里写注释
  * *Link*：在草图里放一个链接作为注释，右键单击会在浏览器中打开
* 是否把不可打印字符显示出来（也就是 ASCII 码小于 32 的那些）

![](https://thegraybook.vvvv.org/images/language/ioboxes-4e18c.png)
三种不同类型的字符串 IOBox

## 颜色 {#colors}

颜色 IOBox 支持多种输入颜色的方式：

* 双击，用键盘输入[颜色的名字](https://docs.microsoft.com/en-us/dotnet/api/system.windows.media.colors?view=netframework-4.8)
* 双击，用不同的格式输入颜色的数值：
  * 形如 “H:0.00 S:0.00 V:1.00 A:1.00” 的字符串，其中每个分量（HSVA 颜色模型的色相、饱和度、明度和透明度）都是 0 到 1 之间的值
  * 形如 “R:0 G:255 B:0 A:255” 的字符串，其中每个分量（RGBA 颜色模型的红、绿、蓝和透明度）都是 0 到 255 之间的值
  * 形如 “RRGGBBAA” 的字符串，其中 RR、GG、BB、AA 各是一对十六进制值，对应 0 到 255。比如红色就写成 “FF0000FF”

也可以用鼠标来改变颜色：

| 想做什么 | 怎么操作 |
|---|---|
| 改变明度 | 右键上下拖动 |
| 改变色相 | 右键左右拖动 |
| 改变饱和度 | `Ctrl` `+` 右键上下拖动 |
| 改变透明度通道 | `Shift` `+` 右键上下拖动 |

## 路径 {#paths}

路径 IOBox 用来输入文件名或目录。注意它默认总是假设你要选的是文件。

:::note
路径 IOBox 会尽可能存成相对路径，却不会告诉你这件事。少数情况下你确实想指定绝对路径，这就容易犯迷糊：IOBox 和提示框上显示的是你输入的绝对路径，内部存的却是相对路径。所以如果你真的需要绝对路径，请改用字符串 IOBox，后面接一个 ToPath [IO] 节点。
:::

* 右键单击，打开选择文件的对话框
* `Shift` `+` 右键单击，打开选择目录的对话框
* 点击 [O] 图标，用关联的程序打开当前选中的文件
* `Alt` `+` 点击 [O] 图标，在资源管理器中查看该文件或目录

在 inspector 里可以设置：

* 路径类型选 *File* 还是 *Directory*。这只决定右键单击 IOBox 时弹出哪种对话框

## 集合 {#collections}

上面所有的数据类型都能用集合 IOBox 来承载。最常见的做法是：从一个集合类型（比如 Spread、Sequence 等）的针脚上引出连线，然后按鼠标中键，自动创建出对应的 IOBox。

![](https://thegraybook.vvvv.org/images/language/collectioniobox.gif)
按鼠标中键创建 IOBox

如果你想手动创建集合 IOBox，先建一个普通的 IOBox，再把它的类型设置成 `Spread<Float32>` 之类。

![](https://thegraybook.vvvv.org/images/language/collectioniobox2.gif)
标注 IOBox 的类型

IOBox 左上角的数字表示集合里元素的个数，这个数字是可以改的。集合 IOBox 默认最多显示 5 个元素，超过之后会出现滚动条。

![](https://thegraybook.vvvv.org/images/language/ioboxes-08b7c.png)
用集合 IOBox 查看一个 float 的 Spread

在 inspector 里可以设置：

* 最多显示多少个条目
* 显示或隐藏条目的序号
* 条目是竖着排还是横着排
* 增加或删除条目
