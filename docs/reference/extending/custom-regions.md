---
title: Custom Regions / 自定义区块
slug: /extending/custom-regions
source_path: reference/extending/custom-regions.md
source_blob: 005a4c6ffe9c00c2ab7716919746d093a09aec3e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/custom-regions.html)

区块可以形容为*中间有个洞、样子像节点的积木*：它们做某件具体的事 —— 这一点上它们像节点；但它们对细节「心里没底」，于是把最终用户请进来、向他索要那些细节 —— 这一点让它们成为区块。

笼统地说，我们可以把区块描述为带*callback*（回调）机制的节点：一种回头去调用区块内部那张小草图的办法，而那张小草图是由区块的最终用户打的。

## 区块的几种风味 {#region-flavors}

VL 为区块开发者提供了好几种这样的回调机制。

* 基于 Delegate 的回调
  * 短命的（无状态）
    * 基于 `Func<>` 或 `Action<>`
    * 基于一个自定义的 Delegate 类型（通常在 C# 里声明）
  * 长期运行、类似过程的（有状态）
    * 基于两个 Delegate（一个用来创建状态，一个用来更新状态）
* 用 `CustomRegion` API 构建的区块
  * 长期运行，并支持边界控制点

## 基于 Delegate 的区块 {#delegate-based-regions}

基于 Delegate 的区块，让区块的设计者可以把任意数据送进区块内部，并要回任意别的数据。你要做的只是：

* `Invoke` 一个任意类型的 Delegate —— 比如 `(Vector2, Rectangle) -> Boolean`
  * 通过给 `Invoke` 调用喂数据，把数据送进区块内部
  * 把返回值用在有意义的地方

接下来剩的事，就是真正把「填细节」这个任务委派给你这个区块的使用者 —— 也就是应用侧。做法是索要一个具体的「Delegate 实现」：

* 建一个输入针脚，把它连到 Invoke 节点的第一个针脚上。VL 现在就知道，你正在设计的这个节点可以是
  * 一个带 Delegate 输入针脚的节点，或者
  * 一个区块！

这样一来，你基本上就是让用户的「Delegate 实现」、也就是用户区块的内部，流进了你的算法。

现在你可以自行盘算什么时候回调那张草图。比如你可以回调好几次，或者只在某个条件成立时才回调。至于什么时候回调用户对你这个区块的应用，你有完全的自由。

### 自定义 Delegate 类型 {#custom-delegate-types}

它们让你能定义出针脚名字起得很漂亮的区块。如果你不怕 C#，那请一定试试！

* 它们提升区块的可读性，因为你可以给针脚起名
* 它们允许多个输出

细节见：https://github.com/vvvv/VL-Language/issues/5

### 有状态的 —— 基于 Delegate {#stateful---delegate-based}

这里的基本想法是：把区块构建成允许在内部放置过程节点的样子。

这种风味的区块能够

* 实例化用户的草图，以及
* 更新这张草图。

通常这类区块只管理用户草图的一个实例。不过你想管理多少个实例都随你。

帮助面板里有一个例子：*Stateful Delegate-based While Loop*。

## 基于 `CustomRegion` API {#customregion-api-based}

从 4.0 起，VL 提供了一种方式来构建带`Input Border Controlpoints`（输入边界控制点，简称 BCP）和 `Output BCP` 的区块。而且同样：这些你都可以打草图。

这是个强大的功能，因为它让最终用户能保持在流畅的状态里 —— 把数据送进或取出区块，忽然就毫不费力了。

*边界控制点把内部和外部连起来，也就意味着你在自己节点上开的那个「洞」不能是任意形状的。在基于 Delegate 的版本里，你可以把任何东西委派给用户，交换只有用户草图和你的算法需要知道的数据；而有了边界控制点，内部和外部在概念上就更紧密地互联了。*

下面这些区块展示了 CustomRegion API 的用法：

* Comment
* Do
* Try
* ManageProcess

### 用法 {#usage}

要打出一个新区块，你需要做的只是：

* 定义一个新的 `Process`
* 在 `Update` 上有一个类型为 `ICustomRegion` 的输入针脚
* 用这个输入针脚的配置菜单来配置这个区块的若干方面

到这一步为止，工作流和先前「有一个 Delegate 类型的输入针脚」非常相似，只是这一次类型是 `ICustomRegion`。

现在你在自己的帮助文档里通过节点浏览器实例化这个新区块时，你直接就会得到一个区块，什么都不会多问。*如果你不满意节点浏览器没问你要节点还是区块：去看看那个区块输入针脚的配置菜单。*

你在告诉 VL 系统的是：我想定义一个区块，但让我干脆把它打出来吧。亲爱的 VL 系统，你只需要把用户对这个区块的具体用法交给我，把应用侧／用户侧的一切都告诉我，让我对着它琢磨，其余的我只要把区块的逻辑打出来就行。

于是，现在你可以用上这个自定义区块实例，去索要那些细节、去问用户究竟是怎么用你这个区块的。

`ICustomRegion` 类型：

* `Input`、`Outputs` 描述输入和输出的 BCP。你可以把这看作一套类似反射的 API，让你能对「你的区块被怎样使用了」这一静态事实进行推断。
* `InputValues` 让你能查看流进区块输入 BCP 的那些值。
* `SetOutputValues` 让你最终写进输出 BCP。这些就是会流向区块下游的值。

到这里我们只关注了区块的外部。现在来对付内部：

* `CreateRegionPatch` 让你实例化一份用户草图，取回一个 `ICustomRegionPatch` —— 这个类型基本上只允许你更新用户的那张区块草图。

通常你只想管理一个实例的生命周期，但你并不受此限制 —— 这正是要把*区块*（`ICustomRegion`）与区块*内部*的实例化（`ICustomRegionPatch`）分开的原因。

如果你只想管理一个实例，那么不妨用辅助节点 `CustomRegionPatch`，它替你照料这些事：

* 在区块应用的生命周期一开始，实例化一份实例
* 每一帧调用一次这张区块草图的 update
* 销毁用户草图里可销毁的那些部分（比如其中用到的某些过程节点）

例子和更多注解请看 `Do [Control]` 或 `ManageProcess [Primitive]`。

`Do [Control]` 特别有意思，因为它极其基本。乍看之下这个区块的用途相当单薄，它只做这些事：

* 接下进来的值
* 把它们喂给从内部视角看的输入 BCP
* 调用草图
* 接下落在输出 BCP 内部一侧的那些值
* 最后把这些值提供给区块的外部视角

所以它基本上什么也没做，只是执行了内部。那我干嘛要用这样一个区块？作为用户我完全可以不用这个区块，我的节点照样会被执行，那意义在哪？嗯，只在于一些细微之处。它有时能帮你组织代码结构 —— 这非常非常像文本语言里的一个代码块。

总之。你想做一个能做更多事的区块？那就接着打呀！

* 拿到输入 BCP 的值，对它们做点什么，然后喂给区块内部
* 或者拿到用户在输出 BCP 上打出来的东西，对它们做些推断、做点什么，再把变换后的值喂给区块外部

接下来就要靠你的想象力了……

#### 配置选项 {#configuration-options}

* **Node Or Region** —— 这个区块能不能也被创建成节点。在组合区块时有用。
* **Supported Control Points** —— 选择你的区块支持哪一类控制点：
  * `None` —— 不允许任何控制点
  * `Border` —— 矩形，数据穿过边界时不该被区块改动
  * `Accumulator` —— 菱形，控制点成对出现；若区块没有执行，输出应当与输入相同
  * `Splicer` —— 三角形，穿过边界时输入数据应当被拆开、输出数据应当被拼回去。拆和拼需要由区块自己处理，不过系统会在控制点内外两侧的类型上帮上一把（如果指定了类型约束的话）。
* **Control Point Type Constraint** —— 定义系统施加在每个控制点上的类型约束。举例来说，如果你指定 `Spread`，那么用户就只能往这个区块上连 Spread。对 Splicer，系统会尝试把内层的类型参数与控制点的内侧对齐。

#### 用户的预期 {#user-expectations}

设计区块时，你可能会把注意力放在某个特定数据类型的 BCP 上。但请注意：数据类型不同时，用户可能仍希望有某种标准行为。不妨为这样的 BCP 实现一套兜底机制 —— 只是把数据原封不动地从外面接到里面、或者反过来，很像 `Do [Control]` 区块里那样。

#### 目前的限制 {#current-limitiations}

注意，你的想法目前还是会撞上一些约束 :(

* 没法定义多种控制点类别（比如 `Accumulator` 和 `Splicer` 同时用）
* 区块草图内部的针脚不被支持。所以你目前总得用 BCP。绕过这个限制的办法是：检查某个特定名字或类型的 BCP，然后对它做区别处理。

有什么需求请告诉我们：https://github.com/vvvv/VL-Language/issues/51

## 基于 `IRegion` API {#iregion-api-based}

随着 VL 7.0 发布，我们引入了一套更通用的区块 API `IRegion<TInlay>`，它不再有 `ICustomRegion` 那些限制。它让区块的开发者可以只通过一个接口，就完整定义出内部的形状 —— 这个接口是专为这个区块写的，还是引用一个已有的，都无所谓。它进一步不对「输入输出数据如何存放」作任何假设，而是明确告知区块：什么时候把数据交给它、什么时候从它那儿取数据。

### 示例 {#examples}

目前在帮助面板的 API / Custom Regions 下有一个例子，叫 *IfElse*。它定义了一个叫 `IIfElsePatch` 的接口，充当内嵌草图，带两个运算器 `Then` 和 `Else`。打开时它创建一份内嵌草图，此后就按输入条件在它上面调用 `Then` 或 `Else`。

同一个例子的 C# 写法在这里：https://github.com/vvvv/VL.StandardLibs/blob/main/VL.TestNodes/src/IfElseRegion.cs

另一个 C# 例子是 [`ForEach (Key)` 区块](https://github.com/vvvv/VL.StandardLibs/blob/c4fb51ab5354cac01bf9dbcdac7efe749e47e0f3/VL.CoreLib/src/Control/Synchronize.cs#L345)，它同时说明内嵌草图也可以带针脚。

### 用法 {#usage-1}

* 定义一个类，继承 `IRegion`，并启用它的 process。
* 可选：定义一个接口 `IMyPatchInlay`，代表区块的内部。
* 给你的类加一个叫 `Update` 的运算器，并确保它属于这个 process。这是当前设计的一条限制／假设，将来可能会放开。
* 定义一个叫 `SetPatchInlayFactory` 的运算器，带一个输入 `Patch Inlay Factory`，并标注为 `() -> IMyPatchInlay`。
* 这个区块现在应该能从节点浏览器里找到了。
* `Patch Inlay Factory` 这个针脚可以用来进一步配置支持哪些类型的控制点（或者一个都不支持）。细节见下文。
* 加上运算器 `AcknowledgeInput` —— 系统会为每一个控制点和连线调用它，把数据送进区块。
* 加上运算器 `RetrieveOutput` —— 系统会调用它，为每一个控制点取回数据。
* 加上运算器 `RetrieveInput` —— 系统会从内嵌草图内部调用它，为某个控制点或连线取回数据。
* 加上运算器 `AcknowledgeOutput` —— 系统会从内嵌草图内部调用它，把某个控制点的数据交给区块。

### 配置选项 {#configuration-options-1}

* ~~**Node Or Region** —— 这个区块能不能也被创建成节点。在组合区块时有用。~~ —— 尚未实现
* **Supported Control Points** —— 选择你的区块支持哪一类控制点：
  * `None` —— 不允许任何控制点
  * `Border` —— 矩形，数据穿过边界时不该被区块改动
  * `Accumulator` —— 菱形，控制点成对出现；若区块没有执行，输出应当与输入相同
  * `Splicer` —— 三角形，穿过边界时输入数据应当被拆开、输出数据应当被拼回去。拆和拼需要由区块自己处理，不过系统会在控制点内外两侧的类型上帮上一把（如果指定了类型约束的话）。
* **Control Point Type Constraint** —— 定义系统施加在每个控制点上的类型约束。举例来说，如果你指定 `Spread`，那么用户就只能往这个区块上连 Spread。对 Splicer，系统会尝试把内层的类型参数与控制点的内侧对齐。

### 目前的限制 {#current-limitations}

虽然我们认为这套 API 状态相当不错（它是这些年多份提案演化来的，比如 https://github.com/vvvv/VL-Language/issues/53 ），当前的实现仍带着一些假设／限制：

* 这个 process 必须含有一个 `Update` 运算器。我们大概还需要加一些配置选项，来定义控制点在「从外部的多个时刻连线」这件事上允许怎样表现。目前输入控制点被假定在 `Update` 上，而输出控制点也可以从其他时刻访问。这条限制不适用于区块的内部时刻 —— 我们的 *IfElse* 例子就明确允许从 `Then` 和 `Else` 连到同一个控制点，最后一个赢。
* 用作内嵌草图的那个接口不能继承其他接口。
* 接口上的类型参数（泛化接口）目前还没测试过。
