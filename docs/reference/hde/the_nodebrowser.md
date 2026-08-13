---
title: The Node Browser / 节点浏览器
slug: /develop-environment/the-node-browser
source_path: reference/hde/the_nodebrowser.md
source_blob: d00a894acbdffec5d105bac13f368f06f5211858
status: translated
last_synced: '2026-08-13'
---

在草图上任意位置左键双击打开节点浏览器，你会看到：

* 语言基元（Node、Input、IOBox……）
* 顶层节点分类的列表（2D、3D、Animation……）
* 可用 NuGet 的列表（VL）

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Nodebrowser.png" height="460" />

还有这几种方式也能调出节点浏览器：

* 拉线的过程中左键双击，创建一个直接连上这根线的节点
* 在一根已有的连线上左键双击，往这根线上插入一个节点
* 在一个已有的节点上左键双击，替换掉它

## 过滤节点 {#filtering-nodes}

左侧那几个圆圈是过滤器，用来快速纳入或排除某一组节点。鼠标悬停可以看到各自的用途，点击开关：

- 纳入高层节点（标准集）
- 纳入未来可能加入的节点（Experimental）
- 纳入底层节点（Advanced）
- 纳入已废弃的老节点（Obsolete）

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Filter1.png" />

底部两个圆圈是另外两个过滤器：

- 纳入内部节点（只在本文档内可见的那些）
- 纳入外部节点（来自引用的 .dll 和 NuGet）

![](https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Filter2.png)

如果某个圆圈里有个点，说明按当前搜索词，打开这个过滤器还能多列出一些节点。

这些过滤器的默认值可以在[设置](/develop-environment/settings)的 “Advanced” 一节里改。

## 找到节点 {#finding-nodes}

浏览可用节点有两条路：

* 按分类
* 按标签

两种方式下，认得这些图标都有帮助：

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Category.png" height="20" /> 分类

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Nuget.png" height="20" /> NuGet 包

节点：

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Process.png" height="20" /> Process 节点

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Operation.png" height="20" /> Operation 节点

类型：

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Type_Record.png" height="20" /> Record

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Type_Mutable.png" height="20" /> Class

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Type_Enum.png" height="20" /> 枚举

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Icon-Type_Interface.png" height="20" /> 接口

把鼠标悬停在代表节点的条目上，节点浏览器右上角会显示这个节点的输入和输出，提示框里会显示它的说明（如果有的话）。

点一个代表节点的条目，可能发生两件事：

* 如果你的选择没有歧义，节点直接创建出来
* 有些情况下选择是有歧义的，这时节点浏览器会让你从若干选项里再挑一下，把细节定清楚

### 按分类搜索 {#search-by-category}

VL 里的节点按分类组织成一棵层级树。点任何一个分类就进到它里面。

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Tags.png" height="460" />

注意，进入一个分类后，节点浏览器右下角会出现一个标签，列表就按这个标签过滤了。你可以从列表里再选一个分类来收窄搜索，也可以点标签旁边的 X 把它去掉。按 <span class="keyseq"><kbd>ESC</kbd></span> 总是去掉最后加上的那个标签。

### 按标签搜索 {#search-by-tag}

输入任何一个词来搜。

## 语言基元 {#language-primitives}

语言基元以*斜体*显示：

* IOBox
* Pad
* 针脚（Input、Output）
* Patch Definition
* Canvas
* Record Definition
* Class Definition
* Operation Definition
* Delegate
* 区块（Repeat、Foreach、If）

很多基元在节点浏览器里选好要创建之后，可以直接给它起名。针脚和 Pad 还能反过来用：先在节点浏览器里输入名字，再点 Pin／Pad，创建出来的元素就已经带着你要的名字了。

## 可用的 NuGet {#available-nugets}

对 VL 可用、但当前文档还没引用的 NuGet 也会出现在节点浏览器里，点一下就能快速引用它。引用之后，它的所有节点都会出现在节点浏览器里。

<img src="https://thegraybook.vvvv.org/images/hde/vl-Nodebrowser-Nugets.png" height="460" />

要想再去掉某个 NuGet，得到文档的依赖列表里取消勾选。

## 只有签名不同的节点 {#nodes-that-only-differ-by-signature}

节点通常靠名字、版本或分类区分。但有时候几个节点这三样全都一样。设计一个库的对外接口时，我们一般会给「只差一点细节」的节点标上版本来区分；不过另一些情况下，我们是从 dll 导入节点的，不会给每个重载单独起名。

这种时候，用户需要通过挑签名来选定节点：

![](https://user-images.githubusercontent.com/575557/200344675-54f48159-7444-41e6-b6b4-3a864916608d.png)

我们提供两种挑选方式：

* 挑一个节点签名 —— 相当于一次选定好几个针脚
* 一个一个针脚地挑，像多选题那样

#### 挑一个节点签名 {#choose-a-node-signature}

这个例子里能看到三个条目，对应三个可用的节点：

![](https://user-images.githubusercontent.com/575557/200342798-ecf5e1c0-ba9b-4e97-adbc-3bb549f74a8a.png)

#### 一个一个针脚地挑 {#choose-single-pins}

这套流程是这样走的：

* 如果有一个节点的签名明显比其他所有的都简单，就先摆下这个节点
* 双击这个节点，会看到你可以加进来的那些针脚
* 选中一个针脚之后，如果在这套针脚配置下有唯一一个明显最简单的节点，节点浏览器就直接关掉
* 再双击这个节点，可以看到还能加哪些针脚、以及你已经定下了哪些。已选的针脚可以逐个取消，直到找到你要的那个重载

重载多、针脚也多的时候，这套流程很有用 —— 你不用记住所有的变体，只要告诉节点浏览器你想用哪些针脚，它就会把还有可能的针脚摆给你看。

要启用这套流程，选这个：

![](https://user-images.githubusercontent.com/575557/200347537-bee02efb-80e3-4ce2-a770-27175a3c5fc6.png)
