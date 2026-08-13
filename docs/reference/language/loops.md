---
title: Loops / 循环
slug: /language/loops
source_path: reference/language/loops.md
source_blob: 314ff534096bc619c4a2648fd6b194474487002d
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/loops.html)

VL 里有两种循环：

* **Repeat**：经典的 for 循环，用 *Iteration Count* 输入指定循环执行多少次
* **ForEach**：对经由 splicer 进入循环的 Spread，逐 slice 执行

节点浏览器里能搜到好几个叫 Repeat 和 ForEach 的节点。要拿到这里说的这两个基本款，选**斜体**写的那个版本。

*（上游此处待补图：在节点浏览器里选择 Repeat 或 ForEach）*

## Getting data into a loop / 把数据送进循环 {#getting-data-into-a-loop}

有三种方式把数据送进循环，Repeat 和 ForEach 都适用：

### Direct Connection / 直接连接 {#direct-connection}

数据可以直接连进循环，这样每一次迭代拿到的都是同一份数据。

*（上游此处待补图：直接连进循环区块）*

### Splicer {#splicer}

Splicer 让你在连续的迭代中依次取到 Spread 里连续的 slice。开始拉连线时会出现一条 splicer 栏，从那里连进循环，每次迭代就会自动拿到进来那个 Spread 的一个 slice。

*（上游此处待补图：一个 Spread 经由 splicer 连进循环）*

多个 Spread 可以经由各自的 splicer 进入同一个循环。这时如果是 **ForEach** 循环，迭代次数由所有进来的 Spread 中**slice 数最少**的那个决定。

*（上游此处待补图：ForEach 循环分别收到 20 个和 15 个 slice 的 Spread，于是执行 15 次）*

**Repeat** 循环的迭代次数由 Iteration Count 决定，不管经由 splicer 进来的 Spread 有多少 slice。当迭代次数大于某个 Spread 的 slice 数时，会用循环的 index 对该 Spread 的 slice 数取模，反复取用它的 slice。

*（上游此处待补图：Repeat 循环的 Iteration Count 设为 5，分别收到 2 个和 3 个 slice 的 Spread，于是执行 5 次）*

Splicer 默认没有名字。起个名字有时能让草图更清楚 —— 双击右边的区域就能输入。

### Accumulator {#accumulator}

Accumulator 用来在循环的各次迭代之间传递数据：先在区块外面初始化，之后每次迭代都能读取和修改，改完传给下一次。最终的值从 accumulator 的输出取。

所以你可以把 accumulator 理解成：一个在循环外面声明、然后在每次迭代里被修改的变量。

*（上游此处待补图：accumulator 在每次迭代中被修改）*

Accumulator 默认也没有名字。为了区分同一个循环里的多个 accumulator，系统会自动用罗马数字给它们编号。想自己起名，双击 accumulator 右边的区域即可。

## Getting data out of a loop / 把数据取出循环 {#getting-data-out-of-a-loop}

由于任何区块都不允许直接往外拉连线，把数据取出循环只有两种方式。Repeat 和 ForEach 都适用：

用**向外的 splicer**，把所有迭代的结果收集起来，作为一个 Spread 返回。

用**向外的 accumulator**，取到经所有迭代修改之后的最终值。

## Special Pins / 特殊针脚 {#special-pins}

有三个特殊针脚，只能在循环内部通过节点浏览器创建：

*（上游此处待补图：循环里的 Index、Break 和 Keep 针脚）*

### Index {#index}

返回当前是第几次迭代。

### Break {#break}

设为 true，就能在没跑够迭代次数时提前跳出循环。注意：**触发跳出的那一次迭代仍会完整执行完**，所以向外的 splicer 会把这一次的结果算进去，accumulator 也会被这一次改到。

想知道循环是正常跑完的还是被 break 打断的，可以检测 *Break* 输出。

### Keep {#keep}

在每次迭代里把它设为 true 或 false，用来指定这一次迭代的结果要不要被向外的 splicer 收进返回的 Spread 里。

注意 keep 对 accumulator 没有影响 —— 也就是说，那些没有被「keep」的迭代，照样会改变 accumulator。

## Other Loops / 其他循环 {#other-loops}

### While {#while}

用一个 Repeat 循环，把它的 *Iteration Count* 设成一个很大的数 —— 这个数在这里相当于你指定的最大迭代次数，用来保证草图不会无限挂住。在循环内部写出「满足什么条件才继续执行」，然后把这个条件取反，接到循环的 *Break* 输出上。

*（上游此处待补图：用 Repeat 循环模拟 while 循环）*
