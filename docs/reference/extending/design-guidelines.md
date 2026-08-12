---
title: Design Guidelines / 设计指南
slug: /extending/design-guidelines
source_path: reference/extending/design-guidelines.md
source_blob: e3b70f2cacf75856ac99562640ea5cd57b15fe0c
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/design-guidelines.html)

设计一个节点库的过程中要做很多选择：命名、采用哪些模式、暴露哪些数据类型。下面这些指南是我们做 VL.CoreLib 以及随 VL 发布的其他节点库时所遵循的。为了让 VL 的用户在各个节点库和节点上得到一致的外观／手感／行为，我们建议你设计自己的节点库时也遵循它们。

## 命名 {#namings}

### 文档 {#documents}

一个节点库主文档的名字，应该暗示出这个库引入的目录。如果一个库引入了不止一个目录（比如 VL.CoreLib），那就选一个更宽泛的词来标识这个库。

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
* 运算器节点优先用动词：Map、Copy、Sample
* 避免以 “As..” 开头的节点名，比如 “AsString”，改用 “To..” 或 “From..”（关于 To／From 节点的更多规则见下文）

#### Version {#version}

作为「函数重载」的替代方案，VL 用的是版本。版本是可选的，大多数节点不该带版本。需要版本时，它也可以由多个空格分隔的词构成。用下面这条规则来决定一个节点的版本：

当你想标示某个已有同名节点的更具体的版本时，两个同名节点里较简单的那个应当永远不带版本，而更具体的那个带一个描述其特殊之处的版本。

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

有一类特殊的节点通常被称为「构造函数」，因为它们创建某个数据类型的实例。与其把这些节点全叫 “Create”、或者干脆用数据类型名（比如 “Rectangle”）来称呼它们，我们辨认出了 3 种不同的构造节点，每一种我们都直觉地想用不同的方式命名。

```
Create [Particle]
RGBA (Join) [Color.RGBA]
FromHSL [Color.RGBA]
```

构造函数名

没错，它们之间的界线有点模糊，但我们是这样决定用哪种命名方案的：

#### Create {#create}

当你在 VL 里打出自己的数据类型时，它默认带一个 “Create” 运算器。对复杂的数据类型 —— 比如 Particle，它不只是一堆参数的容器、还带有某些功能 —— 我们保留这个默认值。这种情况下，在草图里看到一个叫 Create [Particle] 的节点感觉是对的，你会明白：在这个点上，一个粒子被创建出来了。

#### Join 与 Split {#join-and-split}

如果你创建的数据类型多少只是一堆参数的容器，那么有一对 join／split 节点往往很有用：join 节点为每个参数配一个输入针脚，让你能创建这个数据类型的实例；split 节点是它的逆运算，为每个参数配一个输出针脚，让你能把这个数据类型拆成各个组成部分。这类情况下我们不用默认的 “Create” 运算器，而是把它改名为 “MyDatatype (Join)”，并另建一个 “MyDatatype (Split)” 运算器 —— 两者做的事无非是写入／读出这个数据类型内部的参数。

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

以 “From..” 或 “To..” 开头的节点，通过从一个给定类型转换到目标类型来创建实例。有人会说，为了简单，我们应该规定这类节点统统叫 “From..” 或者统统叫 “To..”。但我们允许两者并存的理由是：从「节点定义在哪里」这个角度看，两种写法各有道理。

假设你有个叫 “FooStuff” 的节点库，它定义了数据类型 “Foo”，那么给 Foo 配这样一个「构造」运算器是讲得通的：

* FromBar [Foo]

同样，下面这个转换运算器也讲得通：

* ToBar [Foo]

如果有两个节点做的事和刚说的这两个完全一样，但它们定义在一个叫 “BarStuff” 的库里，那它们就会被命名为：

* ToFoo [Bar]
* FromFoo [Bar]

#### ..To.. 转换器 {#to-converters}

如果一个转换器只是在单位之间转换 —— 比如从周期到弧度 —— 而输入输出针脚的数据类型是同一个，那么节点名必须把两个单位都提到，比如：CyclesToRadians。因为这里数据类型没变，哪怕把鼠标停在针脚上也拿不到足够的信息来理解这个节点在干什么。

### 针脚 {#pins}

* 用空格分隔各个词，每个词首字母大写
* 避免用 “Do”、“Update” 这类泛泛的名字

#### 针脚顺序 {#order-of-pins}

主输入在左，……Reset 通常在右。

#### 输入 {#inputs}

“Apply” 是针脚名的保留字，所以当用户手动给某个针脚取这个名字时，编译器会报错。原因是：有一种模式会自动为运算器创建一个 “Apply” 针脚。这样一来，每当我们看到一个 “Apply” 针脚，就能确定这个模式被应用了。

#### 运算器 {#operations}

任何运算器（工具型或成员型都算），只要它

* 要么完全没有输出
* 要么有一个叫 “Input” 的输入和一个叫 “Output” 的输出，且 “Output” 的类型与 “Input” 相同、再无别的输出

就会自动得到一个 “Apply” 输入。“Apply” 针脚默认是隐藏的，可以通过节点上的 `-> Configure` 菜单显示出来。它默认设为 “true”；设为 “false” 会绕过这个运算器，直接把输入值传给输出。

#### 过程节点 {#process-nodes}

一个过程节点的任何运算器，只要它

* 没有输出

就会自动得到一个以该运算器命名的输入。这个针脚默认设为 “false”，意思是这个运算器不被执行；设为 “true” 才会执行它。

另见下文的针脚组。

### 输出 {#outputs}

* Output 还是 Result
* 见下文：异步工作的节点

## 标准数据类型 {#standard-datatypes}

为了让用户通常要面对的数据类型数量保持在可控范围内，下面这些是我们用在节点输入输出上的数据类型：

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

任何运算器，只要它恰好有两个输入、一个输出，且输出类型与第一个输入相同，就会自动获得这个功能。

另一种情况 —— 你想让一个节点按需创建针脚（想想 Timeliner、Automata）—— 目前还不支持！

### 自适应节点 {#adaptive-nodes}

自适应节点让你先定义一个节点的签名（也就是输入输出针脚的名字和顺序），再为不同的数据类型提供各自的具体实现。

在节点浏览器里你只会看到一个选项，而不是所有实现。通常这样就很好，因为一旦你往它上面接了连线，编译器就会替你选对实现。

举个例子：设想一个 LinearInterpolation（Lerp）节点，它可以为 Float32、Vector2 等不同数据类型提供具体实现，甚至可以想象为字符串做一个实现；但这个节点的签名始终是同一个：Input 1、Input 2、Scalar、Output。

#### 自适应定义 {#adaptive-definition}

建一个运算器，并确保把它放进顶层的 `Adaptive` 目录。加上输入输出针脚，名字随你喜欢。你甚至可以给个别针脚做类型标注，但至少要留一个针脚是泛化的，否则你没法为这个定义提供不同的实现。

#### 自适应实现 {#adaptive-implementations}

在任何其他目录里建一个运算器，用同样的签名，并以非泛化的方式实现它 —— 也就是说这一次所有输入输出都需要有推断出的或标注好的数据类型。

创建多个实现（针对不同数据类型）时，记得把这些运算器放进不同的目录。

#### 把自适应节点替换成某个具体实现 {#replace-an-adaptive-node-with-a-specific-implementation}

有些情况下你会想确保编译器为某个自适应节点用上某一个具体实现。要为自适应节点选定一个版本，先通过节点浏览器摆下这个节点，然后双击它，主面板里会列出所有可用的实现，从中挑一个即可。

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

我们能用上的许多第三方库，底层依赖非托管资源 —— 这要求在不再需要时手动处理它们的销毁。这类资源类型的一个例子是 Bitmap，通常来说凡是让你访问物理设备的类型都算。忘记销毁这样一个资源，往往很快就会导致错误。

不过只要你只在一个运算器内部访问这类资源，处理销毁并不难：用 Dispose [IDisposable] 在不再需要时释放它们就行。

只有当资源需要存进字段、以便跨时间访问，从而离开了它们被创建的那个作用域时，事情才变得棘手。

针对这些场景，VL 带了一个叫 [Resouces] 的目录，其中包括这些节点：New、BindNew、Do、Execute、Using……

### Restore 方法 {#restore-methods}

导入带泛化类型参数的类型时，你需要为它们写 restore 方法。

### 默认值 {#default-values}

给导入的类型定义默认值：建一个叫 “CreateDefault” 的 Forward 运算器。VL 类型系统每遇到那个类型，就会去找 “CreateDefault”，以避免节点输入上出现 null 值。

这个转发不能带副作用。这一点并非总能做到／总讲得通，那时我们还是得跟 null 打交道。

### 不可变性 {#immutability}

由于在 .NET 里（目前）没法把类型标记为不可变，你可以在把类型导入 VL 时这么标记。

## NuGet {#nugets}

除了帮助文档以外，不要在任何构成某个 NuGet 的 .vl 文档里引用你自己的那个 NuGet。

### 测试 {#tests}

尚待确定：以什么形式提供可自动运行的测试（草图、代码……）。

### 帮助文档 {#help-patches}

见[提供帮助文档](/extending/providing-help)。
