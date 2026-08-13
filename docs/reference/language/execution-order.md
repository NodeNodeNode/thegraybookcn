---
title: Execution Order / 执行顺序
slug: /language/execution-order
source_path: reference/language/execution-order.md
source_blob: 4e6cc044575a147508a12ce94607cb61a5ba79a0
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/execution-order.html)

多数时候执行顺序一目了然：从上到下，按连线的次序走。

## No link dependency / 没有连线依赖时 {#no-link-dependency}

但有时节点之间**没有**能表达执行顺序的连线依赖。这可能没事，也可能出事，看你在做什么。下面是几种会出事的情形和解法：

### Multiple writes to mutable data / 对可变数据的多次写入 {#multiple-writes-to-mutable-data}

一帧里对同一个可变数据类型写入（也就是修改）多次时，执行顺序通常要紧。下图读出了 Value，但这一帧读到的是不是 “1.00”**并无定义** —— 也可能是 “0.00”，因为根本没指定顺序。连线上那只「黄袜子」警告的就是这件事。

![](https://thegraybook.vvvv.org/images/language/mutable-undefined-order.png)

与其把这些 Operation「并联」到 Pad 上，不如把它们「串联」起来，这样执行顺序就明确了。

![](https://thegraybook.vvvv.org/images/language/mutable-defined-order.png)

### Nodes with no connection in the patch / 草图里没有连接的节点 {#nodes-with-no-connection-in-the-patch}

想在同一帧里先把数据写进文件、再读出来，就必须保证写在读之前。下面这种天真的接法保证不了，所以可能碰巧能用，也可能不能：

![](https://thegraybook.vvvv.org/images/language/writer-reader-undefined.png)

这种情形下要在节点之间建立依赖，用 `Do` 区块。它本身什么都不做，但可以加输入和输出 —— 拿这些针脚来指定执行顺序。

![](https://thegraybook.vvvv.org/images/language/writer-reader-defined.png)

### Nodes without any pins / 完全没有针脚的节点 {#nodes-without-any-pins}

有些节点一个针脚都没有。这类节点通常负责全局初始化某个节点库的状态，必须抢在其他一切之前执行。同样用 `Do` 区块来搭出顺序：

![](https://thegraybook.vvvv.org/images/language/nodes-without-pins.png)

## Circular graphs / 环形图 {#circular-graphs}

想连出一个环时，VL 会拦住你。按住 `Space` 强行连上，会看到这样的报错：

![](https://thegraybook.vvvv.org/images/language/cyclic-graph-error.png)

想想就明白：真放行了，VL 永远不知道该从哪儿开始执行。所以这种情形下你得想清楚 —— 上一帧算出来的值存在哪里，下一帧再取用。

解决办法是引入一个[参数](properties.md)，用 Pad 在这一帧写入、在下一帧读出：

![](https://thegraybook.vvvv.org/images/language/property-instead-of-cyclic-graph.png)
