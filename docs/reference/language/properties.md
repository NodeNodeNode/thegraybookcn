---
title: Properties / 参数
slug: /language/properties
source_path: reference/language/properties.md
source_blob: a0997b51de59ab8abda1f7bea5b67d765520b347
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/properties.html)

数据类型可以用 *Property*（参数）来存放数据。想看一个数据类型有哪些参数，用[草图浏览器](patch-explorer.md)。

*（上游此处待补图：草图浏览器里列出的参数）*

增删参数都可以在[草图浏览器](patch-explorer.md)里做，不过要*添加*参数的话，通常直接建 *Pad*（数据板）就行了。

如果你是从文本编程过来的，可以把参数理解成「变量」—— 但有个重要区别：**每个运算器里只能对它写入一次。**

## Pads / 数据板 {#pads}

在草图里，数据板用来读取（get）或写入（set）参数。数据板通过**名字**指向参数，也就是说：**同名的数据板指的是同一个参数**。名字区分大小写。

在任何一个[运算器](operations.md)里，你都可以这样理解执行顺序：**先把所有数据板读一遍，然后执行运算，最后才把所有数据板写一遍。**

连线从上方进入数据板，就是往里写；连线从底部离开数据板，就是从里面读。

一个数据板可以有多条连线进、也可以有多条连线出。但要注意：**出去的连线可以同属一个运算器，进来的连线却必须分属不同的运算器。** 这么想就好理解了 —— 数据板不是用来在一个运算器执行过程中存中间值的，它只用来在**不同运算器的执行之间**存数据。

数据板上方出现一个小三角，提示你草图里还有另一个同名的数据板，而且那个也被写入了。

*（上游此处待补图：不同的运算器写入同一个数据板）*

### Adding Pads / 添加数据板 {#adding-pads}

通过[节点浏览器](../hde/the_nodebrowser.md)添加数据板有三种方式：

1. 先输入你想创建的数据板的名字，然后选 `Pad` 这一项
2. 先选 `Pad` 这一项，然后输入名字
3. 从节点浏览器里列出的现有参数中直接选一个

### Renaming Pads / 重命名数据板 {#renaming-pads}

双击数据板的名字就能改。**注意：重命名只改这一个数据板**，改完它指向的可能就是另一个参数了。如果新名字对应的参数此前不存在，系统会在这时自动新建一个。

想把所有同名的数据板一次性改掉，得去[草图浏览器](patch-explorer.md)里重命名那个**参数**。

### Anonymous Pads / 匿名数据板 {#anonymous-pads}

没有名字的数据板叫「匿名数据板」。它不指向任何参数，但一样可以在多个运算器的调用之间存数据。

按住 `Shift` 双击一条连线，就能快速往这条连线上插一个匿名数据板。

匿名数据板也可以单纯当作一个汇合点，把多条连线并成一条。

*（上游此处待补图：把匿名数据板当作多条连线的汇合点）*

## The datatype of a property / 参数的数据类型 {#the-datatype-of-a-property}

参数的数据类型有三种来路：

1. Generic
2. 推断得来
3. 手动标注

**关于第 1 种，Generic。** 参数默认是 Generic 的，也就是没有指定数据类型。体现在数据板上，就是它只显示一个空心圆。

只要一个参数关联的所有数据板都没有被推断出类型、也没有被标注过类型，这个参数就一直是 Generic 的。

**关于第 2 种，推断得来。** 如果编译器从连到数据板上的那些连线推断出了类型，它就显示为一个实心圆。把鼠标悬停在数据板上，从提示框里能看到推断出来的类型。

*（上游此处待补图：Generic 的数据板 vs 已推断出类型的数据板）*

**关于第 3 种，手动标注。** 想手动给参数定类型，就去标注它的某一个数据板。鼠标中键点击数据板，会打开一个小的检查器，在那里编辑类型。中键之外，也可以右键点击数据板的标签，选 `Configure`。

*（上游此处待补图：标注一个数据板）*

手动标注过的数据板很好认：它的圆圈里有一个点。

*（上游此处待补图：已标注的数据板）*

## Pads vs. IOBoxes / 数据板与 IOBox {#pads-vs-ioboxes}

数据板和 IOBox 本质上是同一个东西：IOBox 有一个数值编辑器和一段注释（在右侧），数据板则有一个名字（在左侧）。

右键 `Replace...` 可以在两者之间互转。

你也可以给任何数据板打开数值编辑器，或者把任何 IOBox 的编辑器隐藏掉。

## Metadata / 元数据 {#metadata}

参数可以关联一些元数据，为它补充更多信息。举个例子：一个 Float32 类型的参数可以带上 Min 和 Max，这样控制它的界面就能把滑块限制在这两个值之间。

元数据对那些需要读取参数的系统很有用。目前会用到元数据的有：

- Object Editor：见[帮助面板](../hde/findinghelp.md)里的 “HowTo Build a Custom Editor”
- Channel Browser
- Channel Bindings

要给一个参数定义元数据，得先选中指向它的某个数据板，然后通过 [Inspector（英文）](https://thegraybook.vvvv.org/reference/hde/inspector.html)查看。

想用程序读取元数据，见[帮助面板](../hde/findinghelp.md)里的 “HowTo Reflect over Property Metadata”。

![](https://thegraybook.vvvv.org/images/reference/language/pad-inspector.png)
在 Inspector 中看到的一个 Float32 类型的参数

### Common Metadata / 通用元数据 {#common-metadata}

- Default：界面可以用它来重置数值

以下这些对所有类型都可用：

- Order：这个参数在列表里相对于同级参数的排列顺序
- Widget：这个参数最好用哪种控件来操作
- Can be Published：这个参数能不能作为 Channel 发布出去
- Visible in ObjectEditor：这个参数在 ObjectEditor 里是否可见
- Read-Only：这个参数是只读，还是也可以写
- Don't Serialize：
- Label：给人读的标识
- Description：对这个参数更详细的描述
- Tags：与这个参数关联的一组词

### Metadata specific for number types / 数值类型专有的元数据 {#metadata-specific-for-number-types}

- Min：允许的最小值（含）
- Max：允许的最大值（含）

### Custom Metadata / 自定义元数据 {#custom-metadata}

允许你给参数挂上自定义的键值数据。
