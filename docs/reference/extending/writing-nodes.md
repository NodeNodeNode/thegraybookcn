---
title: Writing nodes using C# / 用 C# 编写节点
slug: /extending/writing-nodes
source_path: reference/extending/writing-nodes.md
source_blob: 69be4d848920c0c8944e94e82f2d32d10db2ef0c
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/writing-nodes.html)

首先你得[选一个代码编辑器](/extending/code-editors)。

用 C# 给 VL 写节点，不需要任何 VL 相关的知识或准备 —— 你写的就是普通 C# 代码，VL 再把它变成节点。下面是一份上手指南，也有对应的 [vvvvTv 视频（英文）](https://www.youtube.com/live/LZ-y5FOrdh0?si=76lNgMwPNrN1MgaO)。

## Start from a Template / 从模板开始 {#start-from-a-template}

![](https://thegraybook.vvvv.org/images/reference/extending/csharp-wizard.png)

用内置的 C# 向导（5.0 版本起提供）：

* `Quad` → `New` → `C# File`
* 选一个模板
  * 默认会按当前主文档的名字创建一个 .csproj。若这个 .csproj 已存在，就把 C# 文件加进去。这里假定的典型情形是：一个项目一个 .csproj，下面挂很多 .cs 文件
  * 可选：想改掉这个默认行为，可以展开 `Customize` 下拉：
    * 手动指定 .cs 文件的名字
    * 在可能存在的多个 .csproj 文件里，选择把这个文件加到哪一个
    * 取消勾选 `Use Existing` 以新建一个 .csproj 文件
* 在 `Open on Create` 下拉里你可以选：
  * 打开 .csproj：最好装了 Visual Studio 2022 这样的 IDE
  * 打开 .cs 文件：如果你没装完整的 IDE，用任何文本编辑器编辑 .cs 文件也行
  * 打开文件夹：这会儿不想改文件的话，就让资源管理器打开、指到文件所在的位置
* 按 `Create`
  * 这会在磁盘上创建这些文件，并把 .csproj 文件引用进你当前的主文档

![](https://thegraybook.vvvv.org/images/reference/extending/StaticUtils.png)
在 Visual Studio 2022 里打开的 Static Utils 模板

第一次创建 .csproj 时，你会看到它自动被引用进当前文档，像这样：

![](https://thegraybook.vvvv.org/images/reference/extending/csharp-reference.png)
一个 .vl 文档里引用的 .csproj 文件

:::note
如果你正在做的节点库将来要以 NuGet 的形式发布，就不要用引用 .csproj 文件这一招！那会强制整个包、以及所有依赖它的包变成可编辑的，于是你就失去了[只读包](/language/compilation#read-only-packages)带来的好处。
:::

## Create the node / 创建节点 {#create-the-node}

打开[节点浏览器](/develop-environment/the-node-browser)，按名字找到你的 C# 文件里的方法和类。

比如 Utils 模板的代码，在 VL 里就会变成这样一个节点：

![](https://thegraybook.vvvv.org/images/reference/extending/DemoNode.png)
在 VL 里生成的节点

## Compilation and Hotswap / 编译与热替换 {#compilation-and-hotswap}

每当你改动一个 .cs 文件并保存，就会触发一次代码编译，正在运行的代码会立刻被「热替换」。

### Static methods / 静态方法 {#static-methods}

只要用的都是静态方法，这套机制毫无瑕疵 —— 静态方法可以在运行中替换掉，不带副作用。

C# 代码里有错误时，同一个项目的所有节点都会变红。提示框会说明这个项目出了错，并指向第一个错误所在的 .cs 文件和行号。

![](https://thegraybook.vvvv.org/images/reference/extending/csharp-error.png)

### Classes / 类 {#classes}

如果你处理的是带状态的代码，事情就要棘手一些。这里是两种典型情形：

#### Process node / 过程节点 {#process-node}

想把自己的 C# 类当作 VL 的[过程节点](/language/nodes#process-nodes)来用 —— 一个节点一个实例，不动态生成和销毁 —— 就给它加上 [`ProcessNode`](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/Import/ProcessNodeAttribute.cs) 特性。例子[见下文](#process-nodes)。

这样一来，每当你改动 C# 代码，vvvv 都能按需正确地创建和销毁你这个类的实例。

#### Dynamic instances / 动态实例 {#dynamic-instances}

如果你的 C# 类更像「粒子」—— 也就是会动态生成和销毁实例 —— 上面那招帮不了你，销毁的麻烦还在。有件事你必须知道：

每一次保存 .cs 文件，你都会丢掉所有由 C# 代码定义的实例的运行状态！

只要 C# 代码是完全托管的，这问题不算大：原先放着实例的位置会出现粉色节点、抛空指针异常（“Object reference not set an instance of an object”），按 F9 重启草图就恢复了。

一旦 C# 代码依赖非托管代码（WinForms、设备库等等），事情就麻烦了：那些资源要手动释放，而 vvvv 根本不知道它们存在，清理不了。于是每次保存 .cs 文件都会留下没释放的资源，往往导致不确定的行为 —— 比如某个设备再也访问不了。碰上这种局面，只有彻底重启 vvvv。

## Debugging / 调试 {#debugging}

用 Visual Studio 编辑代码时可以设断点。断点若显示「……当前不会命中」这类警告，去改一个设置：“Debug” 菜单选 “Options...”，找到并关掉 “Require source files to exactly match the original version”。

然后[附加（英文）](https://learn.microsoft.com/en-us/visualstudio/debugger/attach-to-running-processes-with-the-visual-studio-debugger?view=vs-2022)到 vvvv.exe 上，就能看到断点被命中了。

## 示例 {#examples}

下面是一些简单示例，外加几处能帮你写出自己节点的细节。也可以从这里获取：
https://github.com/vvvv/VL.DemoLib

更多通盘的考量另见：[设计指南](/extending/design-guidelines)

### Namespaces / 命名空间 {#namespaces}

C# 里的命名空间会成为 VL 里的目录，嵌套的命名空间（用点号语法）相应变成嵌套的目录。[`ImportAsIs`](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/Import/ImportAsIsAttribute.cs) 特性允许只导入某一个命名空间，从而把它从最终的 VL 目录里剥掉。

### Pin Names / 针脚名 {#pin-names}

为了在 VL 里更好读，Operation 的参数会按驼峰式大小写拆开：C# 里的 “firstInput” 到 VL 里就是 “First Input”。默认的 “return” 返回值在 VL 里叫 “Output”。

```csharp
public static float PinNames(float firstInput, float secondInput)
{
    return firstInput + secondInput;
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-PinNames.png)
提示框里显示的针脚名

### Default Values / 默认值 {#default-values}

直接用 C# 的默认值写法，就能给 VL 里的输入定义默认值。

```csharp
public static float Defaults(float firstInput = 44f, float secondInput = 0.44f)
{
    return firstInput + secondInput;
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Defaults.png)
输入上的默认值

### Multiple Outputs / 多个输出 {#multiple-outputs}

除了返回单个值，你也可以用一个甚至多个 `out` 参数，它们会在 VL 节点上显示为输出针脚：

```csharp
public static void MultipleOutputs(float firstInput, float secondInput, out float added, out float multiplied)
{
    added = firstInput + secondInput;
    multiplied = firstInput * secondInput;
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-MultipleOutputs.png)
一个有多个输出的节点

### Function Overloading / 函数重载 {#function-overloading}

你可以写多个同名的 Operation，它们只在输入参数的个数上有差别：

```csharp
public static float MyAddition(float input, float input2)
{
    return input + input2;
}

public static float MyAddition(float input, float input2, float input3)
{
    return input + input2 + input3;
}
```

在节点浏览器里选这个节点时，它会再问一次你要哪个版本。

*（上游此处待补图：节点浏览器里显示出两个节点）*

### Using Enums / 使用枚举 {#using-enums}

你可以把自定义的 C# 枚举用作 Operation 的输入或输出类型：

```csharp
public enum DemoEnum { Foo, Bar };

public static string StaticEnumDemo(DemoEnum e)
{
    return e.ToString();
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-StaticEnum.png)
VL 草图里的枚举 IOBox

动态枚举（也就是条目会在运行时变化的枚举）的例子见下文。

### Using Generics / 使用 Generic {#using-generics}

VL 拥抱 Generic，所以你当然可以轻松写出泛化的节点：

```csharp
public static string Generic<T>(T input)
{
    return input.ToString();
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Generic.png)
节点上引出的 Generic 针脚

### Operating on Spreads / 对 Spread 做运算 {#operating-on-spreads}

C# 的 `IEnumerable<>` 在 VL 里表现为 `Sequence<>`：

```csharp
public static IEnumerable<float> ReverseSequence(IEnumerable<float> input)
{
    return input.Reverse();
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Spreads.png)
Spread 节点

### Documentation / 文档 {#documentation}

用 C# 的 XML 文档来给你的节点提供说明：

* Summary：关于这个节点的一句话说明
* Remarks：一些补充说明，比如用法提示、注意事项等等，可以写多行
* Param name：每个输入的简短说明
* Returns：关于这个节点结果的简短说明

```csharp
///<summary>Multiplies input by two</summary>
///<remarks>Some additional remarks</remarks>
///<param name="a">The A Parameter</param>
///<returns>Returns 2 times a</returns>
public static int HTMLDocuTest(int a)
{
    return a*2;
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Documentation.png)
文档出现在节点浏览器和提示框里

:::note
只有当项目把 `GenerateDocumentationFile` 属性设为 `true` 时，xml 文档才会被生成。vvvv 创建的 C# 项目默认就带这一项；如果你引用的是一个已有的项目，可能得自己加上！
:::

### C# Ref Paramters / C# 的 ref 参数 {#c-ref-paramters}

你可以用 C# 的 *ref* 参数，但要当心：给这个参数赋值会导致 VL 里出现不确定的行为（目前如此），所以永远不要写 *ref* 参数，只读它！

```csharp
public static int RefParams(ref int firstInput)
{
    return firstInput + 4444;
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-RefParam.png)
一个把 *ref* 参数用作输入的节点

### Datatypes / 数据类型 {#datatypes}

任何你在 C# 里定义为 `class` 或 `struct` 的数据类型，都能在 VL 里使用：

* 任何构造函数都会以一个 `Create` 节点的形式提供
* 任何公开成员都会以一个 VL 节点的形式提供
  * 一个属性最多会产生两个节点，一个取值、一个赋值
  * 一个事件会被转换成一个同名节点，返回 `IObservable<EventPattern<>>`。详见下文。

```csharp
public class MyDataType
{
    private float FX;

    public MyDataType(float x)
    {
        FX = x;
    }

    public float AddValue(float value)
    {
        var lastFX = FX;
        FX += value;

        return FX;
    }
}
```

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Datatypes.png)
对应生成的节点

### Process nodes / 过程节点 {#process-nodes}

给任何一个类加上 [`ProcessNode`](https://github.com/vvvv/VL.StandardLibs/blob/main/VL.Core/src/Import/ProcessNodeAttribute.cs) 特性，就能把它变成一个过程节点。默认情况下，它的所有公开成员都会被用作这个过程的片段。这个特性提供了多种方式来调整这一行为。

:::note
这个特性只有在程序集设置了 `[assembly:ImportAsIs]` 特性时才生效。vvvv 创建的 C# 项目已经设好了这个特性；如果你引用的是一个已有的项目，就得自己加上，见[设置程序集特性（英文）](https://learn.microsoft.com/en-us/dotnet/standard/assembly/set-attributes)。
:::

```csharp
[ProcessNode]
public class Counter
{
    private int _value;

    public int Update(int increment)
    {
        return _value += increment;
    }
}
```

### Events/Observables / 事件与 Observable {#eventsobservables}

符合 [.NET Core 事件模式（英文）](https://docs.microsoft.com/en-us/dotnet/csharp/modern-events)的 .NET 事件，VL 会自动把它们转换成 Observable。所以你在代码里照常用事件就行，然后在 VL 里通过 Observable 模式来访问它们。

下面是不带事件参数和带事件参数的两个 C# 事件的例子：

```csharp
public class MyDataType
{
    public event EventHandler OnValueChanged;
    public event EventHandler<MyGenericEventArgs<float>> OnValueExceeded;
    ...
}

public class MyGenericEventArgs<T> : EventArgs
{
    public readonly T Value;

    public MyGenericEventArgs(T value)
    {
        Value = value;
    }
}
```

在你的代码里，它们可能这样被调用：

```csharp
public float AddValue(float value)
{
    if (value != 0)
    {
        FX += value;
        OnValueChanged?.Invoke(this, EventArgs.Empty);
    }

    if (FX > FThreshold)
        OnValueExceeded?.Invoke(this, new MyGenericEventArgs<float>(FX));

    return FX;
}
```

在 VL 里，这些事件以同名节点的形式提供，返回一个 `Observable<EventPattern<>>`：

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Observables.png)
在 VL 里长这样：a) 成员 Operation，b) 不带任何参数的 ValueChanged 事件，c) 带一个参数的 ValueExceeded 事件

* 如果你的事件不带任何参数（上图中的 b 部分），只是在某件事发生时发一个脉冲，那就用 HoldLatest [Reactive] 节点的 `On Data` 输出来获知这个事件。

* 如果你的事件带参数（上图中的 c 部分），你会收到一个 `Observable<EventPattern<MyGenericEventArgs<>>>`，需要用 EventArgs [Reactive.EventPattern] 节点把它拆开 —— 这个节点由 VL.DevLib 包提供。拆开后你就能拿到 EventArgs 的 Sender 和 Value。

![](https://thegraybook.vvvv.org/images/libraries/vl-libraries-writingNodes-Observables-EventArgs.png)
用 EventArgs 拆包

关于使用 Observable 的一般性说明，见[响应式编程](/libraries/reactive)那一章。

### Dynamic Enums / 动态枚举 {#dynamic-enums}

动态枚举用在这种场景：给用户一个列表挑选，而列表的条目会在运行时变化。典型例子是访问硬件设备的节点 —— 设备随时可能插上或拔掉。

要写一个动态枚举，最好从某个 “Dynamic Enum” [C# 文件模板](#start-from-a-template)开始。

如果你想更好地理解模板里的代码，接着往下读：

先看一个 C# 里普通的枚举：

```csharp
enum MyEnum = { Foo, Bar }
```

这里 `MyEnum` 是我们所说的类型，而 `{ Foo, Bar }` 构成了它的定义。

我们想在代码里使用这样一个枚举的方式，是把它作为某个 Operation 的输入参数的类型，像这样：

```csharp
public static string EnumDemo(MyEnum e)
{
    return e.ToString();
}
```

#### Implementing dynamic Enums for VL / 为 VL 实现动态枚举 {#implementing-dynamic-enums-for-vl}

要为 VL 造一个动态枚举，我们同样需要那两个要素：类型和定义。两者都得在 C# 里实现为类：

* 类型需要实现 `IDynamicEnum`
* 定义需要实现 `IDynamicEnumDefinition`

两者都由 VL.Core 这个 NuGet 提供。

为了让它们更好用，还提供了几个基类实现：

* `VL.Lib.Collections.DynamicEnumBase<T, U>`
* `VL.Lib.Collections.DynamicEnumDefinitionBase<U>`
* `VL.Lib.Collections.ManualDynamicEnumDefinitionBase<U>`

注意这些定义基类是单例：实现会保证全局始终只有一个实例。这一点很重要 —— 引用同一个枚举定义的节点，拿到的条目必须完全一致。

用上面这两个基类，你自己的动态枚举实现大概长这样：

##### 1. Create an enum type / 1. 创建一个枚举类型 {#1-create-an-enum-type}

先从 `DynamicEnumBase` 派生，造出你自己的枚举类型。

```csharp
[Serializable]
public class MyEnum: DynamicEnumBase<MyEnum, MyEnumDefinition>
{
    public MyEnum(string value) : base(value)
    {
    }

    [CreateDefault]
    public static MyEnum CreateDefault()
    {
        //use method of base class if nothing special required
        return CreateDefaultBase();
    }
}
```

换成你自己的实现时，上面这段代码多半不需要改多少，除了：

* 给它起个像样的名字，别叫 “MyEnum”，比如叫 “MidiInputDevice”。注意名字用的是单数：这个类型代表枚举中的**一个**条目。
* 注意第二个类型参数 `MyEnumDefinition`，它把你的枚举与它的定义连起来，同理应该叫 “MidiInputDeviceDefinition”

##### 2. Provide available entries / 2. 提供可选条目 {#2-provide-available-entries}

从 `DynamicEnumDefinitionBase` 派生，实现那个「向系统提供当前可选条目」的类。只需覆写两个函数：一个返回当前条目的字符串列表，另一个告诉系统条目什么时候变了。

```csharp
public class MyEnumDefinition : DynamicEnumDefinitionBase<MyEnumDefinition>
{
    //return the current enum entries
    protected override IReadOnlyDictionary<string, object> GetEntries()
    {
    }

    //inform the system that the enum has changed
    protected override IObservable<object> GetEntriesChangedObservable()
    {
    }

    //optionally disable alphabetic sorting
    protected override bool AutoSortAlphabetically => false; //true is the default
}
```

这里的实现会因你的使用场景而异。一个简单的例子大概是这样：

```csharp
public class ComPortDefinition : DynamicEnumDefinitionBase<ComPortDefinition>
{
    protected override IObservable<object> GetEntriesChangedObservable()
    {
        return HardwareChangedEvents.HardwareChanged;
    }

    protected override IReadOnlyDictionary<string, object> GetEntries()
    {
        Dictionary<string, object> portNames = new Dictionary<string, object>();

        foreach(var portName in NetSerialPort.GetPortNames()
            .Where(n => n.StartsWith("com", StringComparison.InvariantCultureIgnoreCase)))
        {
            //the return dictionary holds the names of the entries as key with an optional "tag"
            //here the tag is null but you can provide any object that you want to associate with the entry
            portNames[portName] = null;
        }

        return portNames;
    }
}
```

关于在 VL 里使用动态枚举，见[枚举](/language/enumerations#dynamic-enums)。
