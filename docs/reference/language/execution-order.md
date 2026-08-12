---
title: Execution Order / 执行顺序
slug: /language/execution-order
source_path: reference/language/execution-order.md
source_blob: 4e6cc044575a147508a12ce94607cb61a5ba79a0
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/execution-order.html)

大多数情况下节点的执行顺序是一目了然的：从上到下，按它们之间连线连接的次序来。

## No link dependency / 没有连线依赖时 {#no-link-dependency}

但也有些时候，节点之间**没有**能表达执行顺序的连线依赖。这可能没问题，也可能有问题，取决于你在做什么。下面是几种会出问题的情形，以及怎么解决：

### Multiple writes to mutable data / 对可变数据的多次写入 {#multiple-writes-to-mutable-data}

在一帧里对一个可变数据类型写入（也就是修改）多次时，执行顺序通常是要紧的。下图这个例子里，Value 被读了出来，但这一帧读到的是不是 “1.00” 其实**没有定义** —— 它也可能是 “0.00”，因为根本没有指定顺序。连线上那个「黄袜子」警告说的就是这件事。

![](https://thegraybook.vvvv.org/images/language/mutable-undefined-order.png)

与其把这些运算器「并联」到数据板上，不如把它们「串联」起来，这样执行顺序就明确了。

![](https://thegraybook.vvvv.org/images/language/mutable-defined-order.png)

### Nodes with no connection in the patch / 草图里没有连接的节点 {#nodes-with-no-connection-in-the-patch}

如果你想在同一帧里先把数据写进文件、再读出来，就必须确保写在读之前发生。像下面这样天真的接法并不能保证这一点，所以它可能碰巧能用，也可能不能：

![](https://thegraybook.vvvv.org/images/language/writer-reader-undefined.png)

要在这种情形下给节点之间建立连线，可以用 `Do` 区块。这个区块本身什么都不做，但它允许你给它加输入和输出 —— 你就能用这些针脚来指定执行顺序。

![](https://thegraybook.vvvv.org/images/language/writer-reader-defined.png)

### Nodes without any pins / 完全没有针脚的节点 {#nodes-without-any-pins}

有些节点一个针脚都没有。这类节点通常是用来全局初始化某个节点库的状态的，那就必须让它们先于其他一切执行。这种时候同样可以用 `Do` 区块来搭出执行顺序：

![](https://thegraybook.vvvv.org/images/language/nodes-without-pins.png)

## Circular graphs / 环形图 {#circular-graphs}

当你想连出一个环形的连接时，VL 会阻止你。如果你在连接时按住 `Space` 强行连上，会看到这样的报错：

![](https://thegraybook.vvvv.org/images/language/cyclic-graph-error.png)

想想就明白：如果 VL 允许你这么干，它永远不知道该从哪里开始执行。所以在这种情形下，你需要想清楚 —— 把上一帧算出来的值存在哪里，然后在下一帧取用。

解决办法是引入一个[参数](properties.md)，用数据板在这一帧写入、在下一帧读出：

![](https://thegraybook.vvvv.org/images/language/property-instead-of-cyclic-graph.png)
