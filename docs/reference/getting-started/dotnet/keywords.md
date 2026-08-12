---
title: C# Keywords / C# 关键字
slug: /getting-started/csharp-keywords
source_path: reference/getting-started/dotnet/keywords.md
source_blob: 3a31d8223686329f7110cf9f656e4ffe49acf81e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/dotnet/keywords.html)

以及它们在 VL 里怎么表达。

**图例**

* **not-supported** —— 这个关键字在 VL 里没有对应物。如果你确实需要它的功能，仍然可以写 C# 代码给 VL 用，见[使用 C# 编写节点](../../extending/writing-nodes.md)。
* **no-inheritance** —— VL 不支持类继承，因此也没有随之而来的这类概念。

### abstract {#abstract}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/abstract) · {no-inheritance}

### as {#as}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/as) · 用 *CastAs* 节点。

### base {#base}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/base) · {no-inheritance}

### break {#break}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/break) · 见[循环的特殊针脚](../../language/loops.md#special-pins)，那里讲了怎么用 **Break** 输出跳出循环。

### case {#case}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/case) · 见 [switch](#switch)。

### catch {#catch}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/catch) · 见 [try](#try)。

### checked {#checked}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/checked) · {not-supported}

<!-- gb-ignore T1 这是 C# 关键字本身，小写是它的正确写法，不是 VL 的 Class -->
### class {#class}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/class) · 见[类型草图](../../language/patches.md#datatype-patches)。

### const {#const}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/const) · {not-supported}

### continue {#continue}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/continue) · {not-supported}

### decimal {#decimal}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)

### default {#default}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/default) · 见 [switch](#switch)。

<!-- gb-ignore T1 这是 C# 关键字本身，小写是它的正确写法，不是 VL 的 Delegate -->
### delegate {#delegate}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/reference-types) · 见 [Delegate](../../language/delegates.md)。

### do {#do}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/do) · 见 [while](#while)。

### double {#double}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types) · 在 VL 里叫 *Float64*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### else {#else}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else) · 见 [if](#if)。

### enum {#enum}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum) · 已有的枚举在 VL 里当然能用，但有一件事 VL 还做不到：**定义自定义枚举**。需要自定义枚举的话，目前得用 C# 代码来定义，做法见[使用 C# 编写节点](../../extending/writing-nodes.md)。

### event {#event}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/event) · VL 不用事件，而是用一个类似的概念：**Observable**。详见[响应式](../../libraries/reactive.md)。

### explicit {#explicit}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/explicit) · {not-supported}

### extern {#extern}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/extern) · {not-supported}

### finally {#finally}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/try-finally) · 见 [try](#try)。

### fixed {#fixed}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/fixed-statement) · {not-supported}

### float {#float}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types) · 在 VL 里叫 *Float32*，属于 *Primitives* 目录。

### for {#for}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for) · 见[循环](../../language/loops.md)。

### foreach {#foreach}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/foreach-in) · 见[循环](../../language/loops.md)。

### goto {#goto}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/goto) · {not-supported}

### if {#if}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else) · 见[条件](../../language/conditions.md)。

### implicit {#implicit}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/implicit) · {not-supported}

### in {#in}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/in) · {not-supported}

### int {#int}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer32*，属于 *Primitives* 目录。

### interface {#interface}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interface) · 见[类型草图里的 Interface](../../language/patches.md#interface)。

### internal {#internal}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/internal)

### is {#is}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/is) · {not-supported}

### lock {#lock}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/statements/lock) · {not-supported}

### long {#long}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer64*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### namespace {#namespace}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/namespace) · *namespace* 这个概念在 VL 里叫[目录](../../language/categories.md)。

### new {#new}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/new) · `new` 关键字表示构造器，也就是创建对象新实例的那个运算。在 VL 里，Class 和 Record 的构造器一律叫 **Create**。

在 VL 里创建一个 DateTime 实例是这样：

*（上游此处引用的图片在其仓库中已缺失）*

### null {#null}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/null) · 属于 **Primitive.Object** 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### operator {#operator}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/operator)

### out {#out}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/out)

### override {#override}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/override) · {no-inheritance}

### params {#params}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/params)

### private {#private}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/private)

### protected {#protected}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/protected) · {no-inheritance}

### public {#public}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/public)

### readonly {#readonly}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/readonly) · {not-supported}

### ref {#ref}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/ref)

### return {#return}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/statements/jump-statements)

### sbyte {#sbyte}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer8*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### sealed {#sealed}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/sealed) · {not-supported}

### short {#short}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer16*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### sizeof {#sizeof}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/sizeof)

### stackalloc {#stackalloc}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/stackalloc) · {not-supported}

### static {#static}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/static) · {not-supported}

### struct {#struct}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct)

### switch {#switch}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/switch) · VL 目前还没有 *switch* 语句。绕行办法见[条件](../../language/conditions.md)。

### this {#this}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/this)

### throw {#throw}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### try {#try}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements) · 见[异常处理](../../language/exception-handling.md)。

### typeof {#typeof}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/type-testing-and-cast)

### uint {#uint}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer32 (Unsigned)*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### ulong {#ulong}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer64 (Unsigned)*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### unchecked {#unchecked}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/unchecked) · {not-supported}

### unsafe {#unsafe}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/unsafe) · {not-supported}

### ushort {#ushort}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) · 在 VL 里叫 *Integer16 (Unsigned)*，属于 *Primitives* 目录。

:::note
只有在节点浏览器里启用了 *Advanced* 视角时才会显示。
:::

### using {#using}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using)

### virtual {#virtual}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/virtual) · {no-inheritance}

### void {#void}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/void)

### volatile {#volatile}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/volatile) · {not-supported}

### while {#while}

[C# 参考](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/while) · VL 目前还没有 *while* 循环。一个简单的绕行办法见[循环](../../language/loops.md#while)。
