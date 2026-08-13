---
title: Design Guidelines / 设计指南
slug: /extending/design-guidelines
source_path: reference/extending/design-guidelines.md
source_blob: e3b70f2cacf75856ac99562640ea5cd57b15fe0c
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/design-guidelines.html)

设计节点库要做很多选择：命名、用哪些模式、暴露哪些数据类型。下面这些指南是我们做 VL.CoreLib 和其他随 VL 发布的节点库时遵循的。为了让用户在各个节点库之间得到一致的外观、手感和行为，建议你设计自己的库时也照这些来。

## 命名 {#namings}

### 文档 {#documents}

节点库主文档的名字应该暗示出这个库引入的目录。引入了不止一个目录（比如 VL.CoreLib），就挑一个更宽泛的词来标识这个库。

```
VL.CoreLib.vl
VL.Devices.Leap.vl
VL.EditingFramework.vl
```

文档名

### 节点名 {#node-names}

一个节点的名字由 3 个部分组成：

* Name（名字）
* (Version)（版本）
* [Category]（目录）

#### Name {#name}

给节点挑名字部分时遵循这些规则：

* 用驼峰式大小写，不要空格
* 过程节点用名词：Sequencer、FlipFlop、Copier
* Operation 节点优先用动词：Map、Copy、Sample
* 避免以 “As..” 开头的节点名，比如 “AsString”，改用 “To..” 或 “From..”（关于 To／From 节点的更多规则见下文）

#### Version {#version}

VL 用版本来替代「函数重载」。版本是可选的，大多数节点不该带；需要时也可以由多个空格分隔的词构成。按下面这条规则决定：

要为某个已有节点标示更具体的版本时：两个同名节点里较简单的那个永远不带版本，更具体的那个带一个描述其特殊之处的版本。

#### Category {#category}

和节点名一样，目录也是必需的。用点号分隔的词可以造出子目录。此外，决定一个节点的目录时遵循这些规则：

* 优先用已有的目录，而不是自己另发明一个
* 避免过度使用子目录

```
LFO [Animation]
Copier [IO]
Map (Range) [Math.Ranges]
RGBA (Join) [Color.RGBA]
RGBA (Join Vector4) [Color.RGBA]
```

节点名

### 节点标签 {#node-tags}

标签是你可以给节点配上的额外搜索词，帮助人们在节点浏览器里找到它们。适用这些规则：

* 一串小写、空格分隔的词
* 不要用任何已经出现在节点名、版本或目录里的词

### Create、(Join) 与 From… {#create-vs-join-vs-from}

有一类节点通常被称为「构造函数」，因为它们创建某个数据类型的实例。与其把这些节点全叫 “Create”、或者干脆用数据类型名（比如 “Rectangle”），我们辨认出了 3 种不同的构造节点，每一种都想用不同的方式命名。

```
Create [Particle]
RGBA (Join) [Color.RGBA]
FromHSL [Color.RGBA]
```

构造函数名

没错，它们之间的界线有点模糊，但我们是这样决定用哪种命名方案的：

#### Create {#create}

在 VL 里打出自己的数据类型时，它默认带一个 “Create” Operation。对复杂的数据类型 —— 比如 Particle，它不只是一堆参数的容器，还带功能 —— 我们保留这个默认值。这种情况下，草图里出现一个 Create [Particle] 节点感觉是对的：你一眼就明白，粒子在这里被创建出来。

#### Join 与 Split {#join-and-split}

如果你创建的数据类型多少只是一堆参数的容器，那么一对 join／split 节点往往很有用：join 为每个参数配一个输入针脚，用来创建实例；split 是它的逆运算，为每个参数配一个输出针脚，把数据类型拆成各个部分。这类情况下我们不用默认的 “Create” Operation，而是把它改名为 “MyDatatype (Join)”，并另建一个 “MyDatatype (Split)” Operation —— 两者做的事无非是写入／读出这个数据类型内部的参数。

```
Vector2 (Join) 接受 X 和 Y 作为输入
Vector2 (Split) 返回 X 和 Y 作为输出
RGBA (Join) 接受 Red、Green、Blue、Alpha 作为输入
RGBA (Split) 返回 Red、Green、Blue、Alpha 作为输出
```

Join／Split 节点的例子

:::note
目前这类 join／split 节点你还得手动打出来。这么做的时候你会注意到 Join 节点上有一个多余的输入针脚、Split 节点上有一个多余的输出针脚 —— 眼下只能先无视它们。以后会有一个选项，能为每个类型草图自动得到 join／split 节点，并且不带这些多余的针脚。
:::

#### From… 与 To… {#from-and-to}

以 “From..” 或 “To..” 开头的节点，靠「从给定类型转换到目标类型」来创建实例。有人会说，为了简单该统统叫 “From..” 或统统叫 “To..”。我们允许两者并存的理由是：从「节点定义在哪里」这个角度看，两种写法各有道理。

假设你有个叫 “FooStuff” 的节点库，它定义了数据类型 “Foo”，那么给 Foo 配这样一个「构造」Operation 是讲得通的：

* FromBar [Foo]

同样，下面这个转换 Operation 也讲得通：

* ToBar [Foo]

如果有两个节点做的事和刚说的这两个完全一样，但它们定义在一个叫 “BarStuff” 的库里，那它们就会被命名为：

* ToFoo [Bar]
* FromFoo [Bar]

#### ..To.. 转换器 {#to-converters}

如果转换器只是在单位之间转换 —— 比如从周期到弧度 —— 而输入输出针脚是同一个数据类型，那么节点名必须把两个单位都写出来，比如 CyclesToRadians。因为类型没变，光把鼠标停在针脚上也看不出这个节点在干什么。

### 针脚 {#pins}

* 用空格分隔各个词，每个词首字母大写
* 避免用 “Do”、“Update” 这类泛泛的名字

#### 针脚顺序 {#order-of-pins}

主输入在左，……Reset 通常在右。

#### 输入 {#inputs}

“Apply” 是针脚名的保留字，用户手动给针脚取这个名字时编译器会报错。原因是有一种模式会自动为 Operation 创建 “Apply” 针脚 —— 这样一来，看到 “Apply” 针脚就能确定用的是这个模式。

#### Operation {#operations}

任何 Operation（工具型或成员型都算），只要它

* 要么完全没有输出
* 要么有一个叫 “Input” 的输入和一个叫 “Output” 的输出，且 “Output” 的类型与 “Input” 相同、再无别的输出

就会自动得到一个 “Apply” 输入。“Apply” 针脚默认是隐藏的，可以通过节点上的 `-> Configure` 菜单显示出来。它默认设为 “true”；设为 “false” 会绕过这个 Operation，直接把输入值传给输出。

#### 过程节点 {#process-nodes}

一个过程节点的任何 Operation，只要它

* 没有输出

就会自动得到一个以该 Operation 命名的输入。这个针脚默认设为 “false”，意思是这个 Operation 不被执行；设为 “true” 才会执行它。

另见下文的针脚组。

### 输出 {#outputs}

* Output 还是 Result
* 见下文：异步工作的节点

## 标准数据类型 {#standard-datatypes}

为了让用户要面对的数据类型不至于太多，节点输入输出上我们只用这些：

* Boolean
* Byte
* Integer32
* Float32
* Vector2/3/4
* Matrix
* Char
* String
* Path
* `Spread<T>`

注意，在一个节点的**实现**里，你当然想用什么数据类型都可以。

## 标准单位 {#standard-units}

* 颜色分量（红、绿、蓝、alpha、色相、饱和度、明度）取值范围 0 到 1
* 角度以周期为单位（0 到 1，逆时针）

## 若干模式 {#patterns}

### 动态针脚数 {#dynamic-pin-counts}

像 “Cons” 或 “+” 这样的节点，输入数量可以由用户按需设定。选中这样一个节点后按 <span class="keyseq"><kbd>Ctrl</kbd><kbd>+</kbd></span> 或 <span class="keyseq"><kbd>Ctrl</kbd><kbd>-</kbd></span>，就会相应地增加／减少输入。

任何 Operation，只要它恰好有两个输入、一个输出，且输出类型与第一个输入相同，就会自动获得这个功能。

另一种情况 —— 你想让一个节点按需创建针脚（想想 Timeliner、Automata）—— 目前还不支持！

### 自适应节点 {#adaptive-nodes}

自适应节点让你先定义签名（输入输出针脚的名字和顺序），再为不同的数据类型分别给出具体实现。

节点浏览器里只会出现一个选项，而不是所有实现。这样通常正好 —— 你一接上连线，编译器就替你选对了。

举个例子：LinearInterpolation（Lerp）节点可以为 Float32、Vector2 等类型分别实现，甚至能为字符串做一个；但签名始终是同一个：Input 1、Input 2、Scalar、Output。

#### 自适应定义 {#adaptive-definition}

建一个 Operation，放进顶层的 `Adaptive` 目录，加上输入输出针脚，名字随你喜欢。个别针脚可以做类型标注，但至少留一个泛化的，否则就没法为这个定义提供不同实现。

#### 自适应实现 {#adaptive-implementations}

在任何其他目录里建一个 Operation，用同样的签名，并以非泛化的方式实现它 —— 也就是说这一次所有输入输出都需要有推断出的或标注好的数据类型。

创建多个实现（针对不同数据类型）时，记得把这些 Operation 放进不同的目录。

#### 把自适应节点替换成某个具体实现 {#replace-an-adaptive-node-with-a-specific-implementation}

有时你想确保编译器为某个自适应节点用上指定的实现。做法是：先通过节点浏览器摆下节点，然后双击，主面板里会列出所有可用实现，挑一个即可。

### 过程节点 {#process-nodes-1}

#### Reset 输入 {#reset-inputs}

Reset 永远优先于其他输入（在过程浏览器里排最下）

* 例如：FlipFlop

### 异步工作的节点 {#nodes-that-operate-async}

* 典型的输出
  * In Progress
  * On Completed
  * Success
  * Error

### 异常处理 {#exception-handling}

尚待确定（见内部 issue #1511）：

* 直接把错误抛出来
* 检查输入范围以防出错（比如把进来的值钳制或绕回到安全范围内……），可选地通过一个 Overflow (Bool) 输出报告溢出
* 运算失败时返回默认值，并报告 Success
* 用 try/catch，并通过一组标准针脚报告错误：Success (Bang)、Error (Bang) 和 Error Message (String)

### 缓存输出 {#caching-outputs}

什么时候该做、什么时候不该做。

### 在节点内部解析相对路径 {#resolving-relative-paths-from-within-a-node}

目前还做不到。眼下你得用绝对文件名。

### 保存数据 {#saving-data}

目前还没有办法让一个节点把数据随草图一起保存。眼下你得把东西存在另外的文件里。

### 事件与 Observable {#eventsobservables}

如果你面对的是异步数据源 —— async await、task、事件 —— 请始终以 Observable 的形式交给你的用户。见[用 C# 编写节点](/extending/writing-nodes#eventsobservables)。

### 资源提供者 {#resource-providers}

我们能用上的许多第三方库底层依赖非托管资源 —— 这类资源不用了要手动销毁。Bitmap 就是一例，凡是让你访问物理设备的类型基本都算。忘了销毁，很快就会出错。

只要访问只发生在一个 Operation 内部，销毁并不难：用 Dispose [IDisposable] 在不需要时释放即可。

真正棘手的是资源要存进字段、跨时间访问，从而离开了创建它的那个作用域。

针对这些场景，VL 带了一个叫 [Resouces] 的目录，其中包括这些节点：New、BindNew、Do、Execute、Using……

### Restore 方法 {#restore-methods}

导入带泛化类型参数的类型时，你需要为它们写 restore 方法。

### 默认值 {#default-values}

给导入的类型定义默认值：建一个叫 “CreateDefault” 的 Forward Operation。VL 类型系统每遇到那个类型都会去找它，好避免节点输入上出现 null。

这个转发不能带副作用。这一点并非总能做到／总讲得通，那时我们还是得跟 null 打交道。

### 不可变性 {#immutability}

由于在 .NET 里（目前）没法把类型标记为不可变，你可以在把类型导入 VL 时这么标记。

## NuGet {#nugets}

除了帮助文档以外，不要在任何构成某个 NuGet 的 .vl 文档里引用你自己的那个 NuGet。

### 测试 {#tests}

尚待确定：以什么形式提供可自动运行的测试（草图、代码……）。

### 帮助文档 {#help-patches}

见[提供帮助文档](/extending/providing-help)。
