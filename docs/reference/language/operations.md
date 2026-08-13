---
title: Operations
slug: /language/operations
source_path: reference/language/operations.md
source_blob: cac772bdb08c7edddd79c5c2cff66661791b04de
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/operations.html)

:::note
译者注：Operation 全书保留英文不译。曾译作「运算器」，但那在中文里是 ALU（算术逻辑单元）的标准译名，且「-器」是设备后缀，而 Operation 是一段可调用的逻辑。与 Spread、Delegate、Generic 等同一处理。 <!-- gb-ignore T1 这一句在讨论译名本身，不是在使用它 -->
:::

Operation 定义一段简单的功能：它接收输入，做点什么，然后返回结果。Operation **不能持有状态** —— 也就是说，它没法把数据保存到下一次调用。数据要存在[参数](properties.md)里。

## Definition vs. Application / 定义和应用 {#definition-vs-application}

单说「Operation」这个词有时候会含糊：它既可能指*一个 Operation 的定义*，也可能指*这个定义的一次应用* —— 而后者其实就是我们平时说的 *Node*（节点）。在这一章里，「Operation」一律是「Operation 定义」的简称。

## Types of Operations / Operation 的类型 {#types-of-operations}

VL 里有两种 Operation：

* 成员 Operation
* 静态 Operation

## Member Operations / 成员 Operation {#member-operations}

*成员*这个词说的是：这些 Operation **属于**某个数据类型，并且**作用于**这个类型的数据。

一个数据类型可以有很多 Operation，最常见的是至少有一个 `Create` 和一个 `Update`。为了在 *Patch*（草图）里区分多个成员 Operation，VL 用颜色来标记 *Pin*（针脚）和 *Link*（连线）。有三个颜色是保留的：

- 白色：Create Operation
- 灰色：Update Operation
- 深红色：Dispose Operation

其余颜色都是从调色板里随机取的，本身没有任何含义，只用来表示「这些带颜色的元素属于同一个 Operation」。想知道某个颜色对应哪个 Operation，可以用 [草图浏览器](patch-explorer.md)，或者把鼠标悬停在针脚上，从提示框里找到 Operation 的名字。

*（上游此处待补图：一个成员 Operation 的定义，以及它作为节点的应用）*

### Creating a Member Operation / 创建成员 Operation {#creating-a-member-operation}

成员 Operation 有两种创建方式：通过 [草图浏览器](patch-explorer.md)，或者在指派（assignment）的过程中 —— 你可以选择指派给一个新的 Operation，然后当场给它起名，创建和指派一步完成。

### Assigning Nodes, Inputs/Outputs and Links to operations / 把节点、输入输出和连线指派给 Operation {#assigning-nodes-inputsoutputs-and-links-to-operations}

用元素的右键菜单，把它指派给某个已有的 Operation，或者新建一个。

通常从输入或输出针脚开始指派比较合理。注意：**指派会自动在整个草图里传播**，只在 Pad 和*process node*（过程节点）那里停下 —— 这两者有点像 Operation 之间的桥：一个 Operation 写进去的值存在那里，另一个 Operation 可以取出来用。

也有些情况下，某个 Operation 里根本没有输入或输出针脚。那就考虑把指派设在连线或者 Operation 节点上。

:::note
过程节点本身不能被指派给某个 Operation。你会看到的是：它的各个针脚可以指派给不同的 Operation —— 也就是说，一个过程节点的不同部分（不同 Operation）可以在外层草图的不同 Operation 上执行。
:::

### Clearing Operation assignments / 清除指派 {#clearing-operation-assignments}

要移除某个元素的指派，同样用右键菜单里的 `Clear assignment`。

默认情况下，没有指派的元素会「回落」到在 Update 上执行 —— 前提是 Update 存在。

### The Dispose Operation / Dispose Operation {#the-dispose-operation}

如果你想清掉一个运行时动态创建出来的对象，通常做法就是确保不再持有对它的引用，比如把它从列表里移除。但要小心：**如果这个对象是可释放的（disposable），你必须在丢掉最后一个引用之前调用它的 `Dispose` Operation。**

那怎么知道一个对象是不是可释放的？目前只能靠试：把 Dispose [IDisposable] 节点连到你这个对象的*实例*上，如果这条连接被允许，就说明它是可释放的，需要你手动调用 `Dispose`。

反过来，如果你想让自己的对象实现 IDisposable 接口，只要建一个叫 “Dispose” 的成员 Operation 就行，用法和别的 Operation 没有区别。至少对过程节点来说，系统从此就知道：每当这个过程节点从草图里被删除时，要自动触发这个 Operation。

## Static Operations / 静态 Operation {#static-operations}

静态 Operation 是独立的，只作用于喂给它的数据。

*（上游此处待补图：一个静态 Operation 的定义，以及它作为节点的应用）*

### Creating a Static Operation / 创建静态 Operation {#creating-a-static-operation}

静态 Operation 的定义可以通过节点浏览器创建。

![](https://thegraybook.vvvv.org/images/language/vl-Operations-Static-NodeBrowser.png)
在节点浏览器中选择创建一个 Operation 定义

默认情况下，静态 Operation 的 *Is Generic* 参数是**关闭**的。这时候，凡是数据类型没有指定、也无法推断出来的输入和输出，都会报错。想允许 Generic 的输入，就把这个开关打开。

![](https://thegraybook.vvvv.org/images/language/vl-Utils-StaticOperation-GenericToggle.png)
Operation 定义的 “Is Generic” 开关默认是关闭的

创建好之后，这个 Operation 定义就会出现在节点浏览器里，可以作为节点被创建出来。

![](https://thegraybook.vvvv.org/images/language/vl-Operations-Static-MyOperation-NodeBrowser.png)
新建的 Operation 现在可以在节点浏览器里选到了

## Input and Output Pins / 输入与输出针脚 {#input-and-output-pins}

Operation 定义里的输入和输出，会在对应的节点上呈现为针脚。

创建针脚有两种方式：

- 手上牵着一条连线时，按住 `Ctrl` 并左键单击
- 双击调出节点浏览器，输入你想给针脚起的名字，然后选择 `Input` 或 `Output`

### Configuring Input and Output Pins / 设置输入与输出针脚 {#configuring-input-and-output-pins}

用针脚的设置菜单来配置它。两种打开方式：

- 鼠标中键点击针脚
- 右键点击针脚，选择 `Configure`

### Annotating Inputs and Outputs / 标注输入与输出的类型 {#annotating-inputs-and-outputs}

「标注」的意思是手动给针脚指定一个数据类型。设置菜单里最上面那一项就是 Type，双击即可编辑。

:::note
类型名区分大小写，设置类型时拼写务必正确。
:::

### Defaults for Inputs / 输入的默认值 {#defaults-for-inputs}

当一个输入被标注了类型之后，你还可以在设置菜单里给它指定默认值。

### Visibility for Inputs and Outputs / 输入与输出的可见性 {#visibility-for-inputs-and-outputs}

作为节点的作者，你可以决定某些针脚默认不显示。理由通常是：这个针脚只在特殊场合才有意义，节点的常规用法用不到它。

把针脚的可见性设成 `Optional` 时，节点的使用者可以从节点的设置菜单里把它显示出来。如果设成 `Hidden`，使用者就无法使用它了。

### Pin groups / Pin Group {#pin-groups}

类型为 `Spread<T>`、`Array<T>`、`MutableArray<T>`、`Dictionary<string, T>` 和 `MutableDictionary<string, T>` 的针脚，可以改成所谓的 *Pin Group*。Pin Group 允许你在节点上动态增删针脚。对应的快捷键见 [Pin Group 快捷键（英文）](https://thegraybook.vvvv.org/reference/hde/keyboard-shortcuts.html#pin-groups)。

要把一个针脚变成 Pin Group，它必须先被标注成上面那些类型之一。只有这样，设置菜单里的 Pin Group 标志才能设为 TRUE。

![](https://thegraybook.vvvv.org/images/language/PinGroup.png)

### Operation Signature / Operation 签名 {#operation-signature}

Operation 的签名决定了它的输入和输出在对应节点上的排列顺序。

静态 Operation 的签名可以直接在 Operation 定义的区块上打开。成员 Operation 的签名则要通过草图浏览器访问。

![](https://thegraybook.vvvv.org/images/language/member-operation-signature.png)
*在 [草图浏览器](patch-explorer.md) 中，成员 Operation “Update” 的已锁定签名*

![](https://thegraybook.vvvv.org/images/language/static-operation-signature.png)
*静态 Operation “Confine” 的未锁定签名*

签名默认是**锁定**的，这意味着针脚的顺序由它们在草图里从左到右的位置决定。想手动管理签名，就得点那个锁的图标把它**解锁**。解锁之后，你可以用拖拽来排列针脚。

[Connect To Signature（英文）](https://thegraybook.vvvv.org/reference/extending/forwarding.html#connect-to-signature)这个功能只在锁定的签名上生效 —— 那种情况下系统才完全掌控针脚的存在与顺序。

双击针脚的名字可以重命名。中键单击针脚可以给它标注类型。
