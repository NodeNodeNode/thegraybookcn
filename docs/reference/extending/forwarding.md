---
title: Forwarding .NET Libraries / 转发 .NET 库
slug: /extending/forwarding
source_path: reference/extending/forwarding.md
source_blob: 60884ea8ed32803da9cb17f36247d447e1fdea65
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/forwarding.html)

[使用 .NET 库](/extending/using-net-libraries)让我们能直接拿到浩瀚的节点来打草图。不过其中很多库放进 VL 的数据流环境并不好用。

为了让更随性的用户也用得上，我们常常想精确筛选：原始库里究竟哪些节点和类型该露给他们。转发就是插入极薄的一层包装来做这件事。

## Reasons to Forward / 转发的理由 {#reasons-to-forward}

* 有选择地转发 .NET .dll 里的类型和 Operation
* 调整类型上与 VL 相关的元信息（比如可变性和已知类型结构）
* 为 VL 里的节点和类型挑一个合适的目录
* 做简单的单位或类型转换（比如把弧度制的角度换成周期制）
* 重命名针脚、Operation、类型
* 给输入针脚设定默认值
* 提供便利的过程节点，把一些底层功能包装成更高层的节点
* 设计可销毁对象的生命周期管理

:::note
从一个库里转发类型时有一点很重要：我们不希望引入新的包装类型。因此使用转发**不会**引入新类型！

被转发的类型与原始库兼容 —— 用户可以随时回退到原始库的底层功能，并与高层包装混着用。

另外，这层包装还是一道有用的屏障，把 vl 节点库的用户与原始库的变动隔开。原始库改了名字之类的时候，与其让用户直面变动，不如用转发把草图保住。
:::

## Forwarding Types / 转发类型 {#forwarding-types}

典型做法是建*一个 .vl 文档*，用它转发一个或多个 .NET .dll 或 C# 项目（.csproj）里的类型。这样用户唯一要引用的就是这个文档。

## Create Type Forward / 创建类型转发 {#create-type-forward}

### 1. Set a reference to the .NET .dll or .csproj / 1. 设一个指向 .NET .dll 或 .csproj 的引用 {#1-set-a-reference-to-the-net-dll-or-csproj}

在一个空白的 .vl 文档里，设好指向你想转发类型的那些 .NET .dll 或 .csproj 文件的引用。见[引用文件](/libraries/referencing#files)。

### 2. Prepare a Category / 2. 准备好一个目录 {#2-prepare-a-category}

被导入的类型会出现在你把它放进的那个[目录](/language/categories)里。所以，先在你文档的[定义草图](/language/patches#definitions-patch)里把需要的目录建好。

### 3. Create Type Forward / 3. 创建类型转发 {#3-create-type-forward}

创建类型转发有两种方式：

#### 3.1 Drag-Drop from the Solution Explorer / 3.1 从方案浏览器拖放 {#31-drag-drop-from-the-solution-explorer}

1. 打开你想把类型放进去的那个 group
2. 打开方案浏览器
3. 选 “.NET Dependencies”
4. 找到你想转发的类型
5. 把这个类型拖放进那个 group

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-dragndrop.png)
把类型从方案浏览器拖放进 group

#### 3.2 Manually / 3.2 手动 {#32-manually}

1. 打开你想把类型放进去的那个 group
2. 新建一个 *Process* 草图
3. 把 `patch type` 设为 “Forward”
4. 在这个草图上设一个 `type-annotation`

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-Manually.png)
左：点开 `patch type` 下拉，设为 “Forward”。右：点 `type-annotation`，从节点浏览器里选一个类型

### Configure Type Forward / 配置类型转发 {#configure-type-forward}

#### Rename Type / 重命名类型 {#rename-type}

通常你会想保留原始库里类型的名字。如果你有充分的理由改名，那就改。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-Rename.png)
重命名一个类型

#### Forward All Nodes / 转发所有节点 {#forward-all-nodes}

创建类型转发时，这个类型的每个 Operation 默认都当作节点转发出去。只想转发其中一部分，就取消勾选 “Forward All Nodes”。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ForwardAll.png)
Forward All Nodes

:::note
即使这个选项开着，你仍然可以为个别 Operation 单独创建 Operation 转发，从而调整它们的转发方式，见下文。
:::

#### Mutability / 可变性 {#mutability}

.NET 库不带「这个类型可不可变」这样的元信息，所以得手动告诉 VL：把 mutable 标记设对。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-Mutable.png)
Mutable 复选框

由于大多数 .NET 类型是可变的，这个标记默认是开着的。下面是判断一个 .NET 类型是否不可变的方法：

* 它只有只读字段
* 它的每一个字段都是不可变类型
* 可选：它有 `WithFoo(TFoo newValue)` 这样的方法，用来取得该类型的一个新实例（也就是一份新的不可变快照）—— 新实例的所有字段都取当前实例的值，只有 `Foo` 这个字段被设为 `newValue`

C# 接下来的版本里请留意 `record`，它应该能减轻写不可变类型的痛苦。

#### Known Type Structure / 已知类型结构 {#known-type-structure}

（上游此处待写）

*（上游此处待补图：已知类型结构）*

#### Create Default / 创建默认值 {#create-default}

成员 Operation 节点通常期望主输入上有一个该类型的值，那儿一空就抛「空指针异常」。要避免这一点，得告诉 VL：需要时该怎么构造这个类型的默认实例。

做法很简单：在类型转发草图里建一个叫 `CreateDefault` 的 Operation，让它返回该类型的一个实例 —— 往往直接返回某个构造函数的结果就够了。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-CreateDefault.png)
为一个类型创建默认值

### Process Node / 过程节点 {#process-node}

每一个类型转发也可以直接暴露出一个过程节点。这与从普通草图里暴露一个[过程节点](/language/nodes#process-nodes)完全一样。

* 在转发里，转到[草图浏览器](/language/patch-explorer)，勾上 “Process Node” 复选框
* 然后[手动转发](#forwarding-operations)你这个 C# 类型的一个构造函数

这样你就得到了一个可用的、属于你 C# 类型的过程节点。

如果你想从同一个类型转发里暴露多于一个过程节点，那么每多一个过程节点，你就得另建一个[过程定义](/language/patches#process)。这些定义不转发类型，只是用该类型的 Operation 来搭出想要的过程。

### Forwarding Operations / 转发 Operation {#forwarding-operations}

如上所示，类型转发能轻松地自动转发全部 Operation。不过就算 “Forward All Nodes” 开着，手动转发某些 Operation 来调整针脚仍然讲得通。

为个别 Operation 创建转发：

1. 打开你想把这个 Operation 放进去的那个类型
2. 打开方案浏览器
3. 选 “.NET Dependencies”
4. 找到你想导入的 Operation
5. 把这个 Operation 拖放进那个类型

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-DroppingOperation.png)
把 Operation 放进类型里

:::note
你也可以选中多个 Operation，一次性把它们放进草图。
:::

现在你有了一个转发 Operation 定义，包在要转发的那个节点外面。被转发节点的所有针脚都会自动反映到这个定义的签名里 —— 也就是说，底层 .NET 代码里增加、改名或删除针脚，签名都会跟着变。不想要这种行为，见下文「手动管理签名」。

即便不手动管理签名，你仍然可以对一个转发做下面这些改动：

### Renaming a Pin / 重命名针脚 {#renaming-a-pin}

如果你有充分的理由改一个针脚的名字，比如为了让它符合 [VL 命名约定](/language/namings)，那就手动为这个针脚建一个输入或输出，然后改名。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ForwardPins-Rename.png)
重命名一个针脚

### Setting a Default / 设定默认值 {#setting-a-default}

Operation 的参数很少带有意义的默认值。要转发一个带合适默认值的针脚，就手动为这个针脚建一个输入，并给它设默认值。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ForwardPins-Default.png)
通过中键点击或 `Rightclick > Configure` 给输入设默认值

### Hiding a Pin / 隐藏针脚 {#hiding-a-pin}

即使「自动转发所有针脚」开着，你也可以覆盖个别针脚的转发 —— 只要往它上面连一个 IOBox。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ForwardPins-HidingPins.png)
隐藏一个针脚

### Type or Unit Conversions / 类型或单位转换 {#type-or-unit-conversions}

转发是做简单类型或单位转换的好地方。设想一个 Operation 接受弧度制的角度，而你想用符合 vl 习惯的周期制。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ForwardPins-Conversion.png)
SineWave 接受周期制的角度

### Show Category / 显示目录 {#show-category}

默认情况下成员 Operation 开着这一项，静态 Operation 不开。要改这个默认值，唯一说得过去的理由是像 Vector (Join) 这样的节点 —— 它们是成员这一事实，对草图的可读性并不重要。对比下面两者：

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ShowCategory-Compare.png)
Vector (Join) [2D.Vector2] 不显示它的目录，而 GetSlice [Collections.Spreads] 显示

在你正在转发的那个 Operation 的标题栏上右键，选 `Configure > Show Category`，来指定这个节点是否显示它的类型目录。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-ShowCategory.png)
Show Category 复选框

### Manually managing the Signature / 手动管理签名 {#manually-managing-the-signature}

转发节点时，你通常希望签名自动与外层定义同步。所以管理这个行为的两个选项默认都开着：

* Locked Signature（也就是由系统管理，而非用户手动管理）
* Connect to Signature（只在签名被锁定时起作用）

关掉它们的理由通常是：你想给自己的 vl 节点库建一套稳定 API，不希望它自动跟着底层 .NET 库走。.NET 库改一处就可能让你的用户不兼容，所以你会想先审阅这些变动，再决定怎么转发到自己的 API 上。

:::note
“Locked Signature” 和 “Connect to Signature” 这两个功能并不限于在转发定义里使用。别的场景下它们也可能有用。
:::

### Locked Signature {#locked-signature}

取消勾选 “Locked Signature” 有两个后果：

* 签名里的针脚不再按它们在草图里的横向位置自动排序
* 对那些开了 “Connect to Signature” 的节点，若其签名变了，针脚不会再被自动加进／移出签名。取而代之，签名上会显示警告，让你去查看这些变动并作出反应

另见 [Operation 签名](/language/operations#operation-signature)。

### Connect to Signature {#connect-to-signature}

从方案浏览器拖进来准备转发的节点，Connect to Signature 默认开着。它替你省几次点击：自动把节点连到外层签名，效果等同于你为每个针脚都建一个同名针脚再连上。想更手动地控制转发哪些针脚，就关掉它。

在你正在转发的那个节点上右键，选 `Configure > Connect to Signature`。

![](https://thegraybook.vvvv.org/images/reference/extending/connect-to-signature.png)
“Connect to Signature” 功能

## Forwarding Enums / 转发枚举 {#forwarding-enums}

要把一个 .dll 里的枚举转发给 .vl 文档的使用者，只要把这个枚举拖放到草图上。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-wrapping-Enums.png)
枚举转发

## Wrapping Non-Standard Events or Delegates / 包装非标准的事件或 Delegate {#wrapping-non-standard-events-or-delegates}

第三方库里的事件或 Delegate，常常正是写一小段 C# 包装的理由。符合 [.NET Core 事件模式（英文）](https://docs.microsoft.com/en-us/dotnet/csharp/modern-events)的事件会自动转成 vl 里的 Observable；但很多库用的是非标准事件或 Delegate，这时就得用 System.Reactive 这个 NuGet 提供的 [Observable.FromEvent（英文）](https://msdn.microsoft.com/en-us/library/system.reactive.linq.observable.fromevent(v=vs.103).aspx)，在 C# 里手写转换。

举个例子。假设这个库有个数据类型 `Tablet`，上面定义了这样一个事件：

```csharp
public event PacketArrivalEventHandler (int x, int y, int z);
```

而你想在这个事件被触发时，通过 VL 里某个节点的输出收到通知。

首先你得为「你想在 VL 里收到的通知类型」建一个类。它大概长这样：

```csharp
public class PackageArgs: EventArgs
{
    public readonly int X;
    public readonly int Y;
    public readonly int Z;

    public PackageArgs(int x, int y, int z)
    {
        X = x;
        Y = y;
        Z = z;
    }
}
```

然后你可以造一个静态 Operation 节点，它在 VL 里接收一个 `Tablet` 实例，并在输出上返回一个 `Observable<PackageArgs>`：

```csharp
public static class TabletHelper
{
    public static IObservable<PackageArgs> PackageArrived(Tablet tablet)
    {
        return Observable.FromEvent<Tablet.PacketArrivalEventHandler, PackageArgs>(handler =>
                {
                    Tablet.PacketArrivalEventHandler paHandler = (x, y, z) =>
                    {
                        handler(new PackageArgs(x, y, z));
                    };

                    return paHandler;
                },
                paHandler => tablet.PacketArrival += paHandler,
                paHandler => tablet.PacketArrival -= paHandler);
    }
}
```

*（上游此处待补图：在 vl 里长什么样）*

注意这里节点放在 Create 上、结果存进一个 Pad，而不是放在 Update 上 —— 这样 Observable 只创建一次，正是我们想要的。若你必须把节点放在 Update 上（比如输入的 Tablet 会变），可以加个小技巧来缓存 Observable、只在输入变化时重建：

```csharp
public static class TabletHelper
{
    public static IObservable<PackageArgs> PackageArrived(Tablet tablet)
    {
        return CachedObservables.GetValue(tablet, x => PackageArrived_((Tablet)x))
    }

    static IObservable<PackageArgs> PackageArrived_(Tablet tablet)
    {
        return Observable.FromEvent<Tablet.PacketArrivalEventHandler, PackageArgs>(handler =>
                {
                    Tablet.PacketArrivalEventHandler paHandler = (x, y, z) =>
                    {
                        handler(new PackageArgs(x, y, z));
                    };

                    return paHandler;
                },
                paHandler => tablet.PacketArrival += paHandler,
                paHandler => tablet.PacketArrival -= paHandler);
    }
}
```
