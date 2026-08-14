---
title: Nodes / 节点
slug: /language/nodes
source_path: reference/language/nodes.md
source_blob: d48be22f836484b445456ec46abc5f5c007f5422
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/nodes.html)

节点是草图的主要构件。顶上是输入针脚，底下是输出针脚 —— 针脚就是那些能让节点通过[连线](links.md)接起来的枢纽。

节点也被称作某个节点定义的「应用」。

## Node Name / 节点名 {#node-name}

一个节点的名字由这几部分组成：

* 显示名
* 可选的版本
* 目录（可以理解成命名空间）

把鼠标停在节点上看提示框，会显示完整的名字：

![](https://thegraybook.vvvv.org/images/language/nodename.png)
目录 “Primitive.String” 里、版本为 “Count” 的 “Split” 节点

## Types of Nodes / 节点的类型 {#types-of-nodes}

节点分几种：

*（上游此处待补图：过程节点、静态 Operation 节点、Record Operation 节点、Class Operation 节点）*

### Process Nodes / 过程节点 {#process-nodes}

一个过程节点代表一张草图的一个实例。

叫「过程」是因为可以把它想成一台小机器：第一次执行时先跑一遍初始化（`Create` Operation），之后循环执行它的一个或多个 Operation，并在帧与帧之间维持内部状态。过程节点通常至少有一个 `Update` Operation，但不止于此。

过程节点长得有辨识度：针脚背后的横条颜色更深，看上去更「重」—— 这是在暗示它持有状态，也就是会在连续两次执行之间存下数据。

定义过程节点的更多内容，见[类型草图](patches.md#process)。

### Static Operation Nodes / 静态 Operation 节点 {#static-operation-nodes}

Operation 节点代表单个 Operation。

它们比过程节点看起来轻：针脚背后没有横条。这表示它们不在状态上工作，也就是不会在连续两次执行之间存下任何数据。

#### Apply input / Apply 输入 {#apply-input}

若一个静态 Operation 节点的第一个输入和第一个输出是同一个数据类型，就可以通过 `context-menu > Configure` 给它加一个 *Apply* 针脚。

Apply 输入默认为 true。关掉之后这个 Operation 会被绕过，输入原样从输出返回。

这本质上是「用 [If 区块](conditions.md#the-if-region)把节点围起来」的快捷写法。

### Record Operation Nodes / Record Operation 节点 {#record-operation-nodes}

Record Operation 节点属于某个 Record，并在这个 Record 上工作。它们在视觉上更高一些，因为节点名下方还用小号字显示所属的数据类型名。

它们有一个可选的「状态输出」针脚，这个针脚在视觉上**不**与对应的「状态输入」相连 —— 意思是出去的永远是一个全新的对象，从进来的那个克隆并修改而来。

### Class Operation Nodes / Class Operation 节点 {#class-operation-nodes}

Class Operation 节点属于某个 Class，并在这个 Class 上工作。它们在视觉上同样更高，节点名下方也用小号字显示所属的数据类型名。

它们总是带一个「状态输出」针脚，而且这个针脚在视觉上**与**对应的「状态输入」相连 —— 意思是进去和出来的是同一个对象，只是被改动过。

## Optional Pins on Nodes / 节点上的可选针脚 {#optional-pins-on-nodes}

节点可以带默认不显示的针脚。右键点节点、按 Configure，会弹出一个小检查器，在那里显示或隐藏可选针脚。

## Pin groups / 针脚组 {#pin-groups}

有些节点带针脚组，可以改变针脚的数量。

带针脚组的节点例如：Group、Cons、+。

一个节点通常只有一个输入或一个输出针脚组，这种情况下按 <span class="keyseq"><kbd>CTRL</kbd><kbd>+</kbd></span> 增加针脚、<span class="keyseq"><kbd>CTRL</kbd><kbd>-</kbd></span> 减少针脚。

节点上有多个针脚组时的快捷键，见[针脚组快捷键](/develop-environment/keyboard-shortcuts#pin-groups)。

![](https://thegraybook.vvvv.org/images/language/PinGroup.png)

## Navigating to a Nodes definition / 导航到节点的定义 {#navigating-to-a-nodes-definition}

若一个节点由草图定义，在它上面 `右键 -> Open` 就能到那份定义。凡是带小箭头图标的节点，背后都有一张草图 —— 或者在同一个文档里，或者在作为文件依赖被直接引用的文档里。这类草图中键点一下就能快速打开。

*（上游此处待补图：背后带草图的节点）*

另见[设置](../hde/settings.md)里的 “Middleclick navigates to definition”：打开它之后，即使草图不在同一个文档、也不在被引用的文档里，中键也能导航过去。

若一个节点由 SDSL 着色器代码定义，打开的会是相应的代码编辑器，见[编辑着色器](../libraries/3d/editing-shaders.md)。

由 C# 代码定义的节点没法查看。

---

:::note[译者补充]
这一节不在上游原文里，是中文版译者留下的笔记，帮助理解 Record 与 Class 的区别。

Record 和 Class 都比静态 Operation 更进一步：你可以参与定义节点的生命周期，也可以定义更复杂的多个 Operation。所以定义完一个 Record 之后再去实例化它，找到的不是一个节点，而是一整个目录、里面一堆节点。

两者的差别在于**不可变**与**可变**：

* **Record** 是不可变的。在数据流上工作时，每次改动都会先拷贝一份再改。
* **Class** 是可变的。它直接在原数据上改。

有点像**黑胶唱片**和**磁带**的区别。想改黑胶上的内容（比如调换两首歌的顺序），没什么好办法 —— 它是物理的，只能重新压一张。磁带就可以直接抹掉重录。所以以黑胶为介质，每改一次都得拿一张新的空白盘来拷贝；以磁带为介质，从头到尾可以是同一盘。

日常使用中，Class 会改动数据源，在数据流式编程里更容易出错（比如不知道数据在哪儿被改了），所以多数情况用 Record 就够；Record 满足不了时再考虑 Class。
:::
