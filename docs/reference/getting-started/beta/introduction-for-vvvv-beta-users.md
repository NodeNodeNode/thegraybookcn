---
title: Introduction for vvvv beta users / 写给 vvvv beta 用户
slug: /getting-started/introduction-for-vvvv-beta-users
source_path: reference/getting-started/beta/introduction-for-vvvv-beta-users.md
source_blob: d86e5fcfa06a9ba48b465c5eaf9102f2cf78bbba
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/getting-started/beta/introduction-for-vvvv-beta-users.html)

这些年里，大家用 vvvv beta 做的项目越来越复杂，常常把它的能力用到了极限。为了跟上今天的需求，新的编程概念和技术必须被引入。

到某个节点我们得出结论：这类改动的数量和幅度会给开发带来大量额外负担。真要做下去，很可能会牺牲性能和稳定性，也会让用户失望 —— 因为他们得为新范式调整自己的工作方式。所以我们换了个思路：**从零开始，把 VL 做成一门全新的、完全独立的可视化语言。** 这让我们在打造 VL 时有了更大的自由度，可以按它自己的节奏走，而不必把新特性硬塞进已经被验证过的 vvvv beta 里。

做 VL 的过程中，我们的目标始终是：尽可能把 vvvv beta 里好的部分继承下来，同时用新特性去解决那些让人卡住的问题。归根结底，我们希望所有 vvvv beta 用户在 VL 里也能感到自在，同时把新的人群带进来、让怀疑者也见识到可视化编程的妙处。

VL 集成进 vvvv beta 之后，你可以保持原来的连线习惯，按需一点点探索 VL 的特性。当你在 vvvv beta 里撞上天花板时，我们建议你看看 VL 能不能解决。下面列出一些常见的、已经或将要被 VL 解决的问题 —— 这份清单并不完整。

## When to use VL / 什么时候该用 VL {#when-to-use-vl}

### Your huge patch has become quite a mess over time and you find it hard to read and maintain it / 大草图日积月累变得凌乱，难读也难维护 {#your-huge-patch-has-become-quite-a-mess-over-time-and-you-find-it-hard-to-read-and-maintain-it}

vvvv beta 对草图的结构基本没有概念。唯一能用来组织的手段是子草图，而那其实只对人有意义 —— vvvv beta 实际上忽略它们，看到的只是一整张大草图。既然它没提供更好的组织方式，用它构建大型、结构良好的程序就很难。VL 内建了很多特性专门对付这个问题：文档之间可以显式互相引用，你可以创建自定义的数据类型和 Operation（可以想成面向对象编程）。这些都能改善程序的可读性和可维护性。

### Parts of your patch need to only run once to initialize or need to be initialized only at a later point during runtime / 草图的某些部分只需要运行一次做初始化，或者要等到运行中的某个时刻才初始化 {#parts-of-your-patch-need-to-only-run-once-to-initialize-or-need-to-be-initialized-only-at-a-later-point-during-runtime}

在 vvvv beta 里，要让某些部分在启动时初始化一次，你会给它们发一个 bang 让它求值一次。但即使不被求值，这些部分仍然是程序的一部分，照样占用你宝贵的 CPU 周期和内存。VL 让你能更明确地「只运行一次」（用类型草图里的构造器），也能更明确地让整块草图只在需要时才运行。

### You want to offload parts of your patch to separate threads / 想把草图的一部分挪到独立线程上 {#you-want-to-offload-parts-of-your-patch-to-separate-threads}

大草图的计算开销会很高，而 vvvv beta 本质上是单线程的，没法让你用满整台机器。用 VL，你可以把程序的某些区域定义为与主草图异步运行，从而并行使用多个 CPU。

### You need to react asynchronously to an input device / 需要对输入设备做异步响应 {#you-need-to-react-asynchronously-to-an-input-device}

外部输入设备发数据的频率，常常和你希望草图运行的帧率对不上。vvvv beta 只有一个主循环，任何进来的数据都得先对齐到它才能处理。碰上对时序敏感的设备，这就会出问题，而此前你唯一的出路是写一个 C# 插件。在 VL 里，所有外部输入都通过 Observable 进来，它们异步执行，允许你按数据自己的节奏处理，之后再同步回主循环。

### You need to use an external .net library / 需要用一个外部 .NET 库 {#you-need-to-use-an-external-net-library}

在 vvvv beta 里用 .NET 库本来也做得到 —— 写个 C# 插件就行。但那要求你切换到文本编程，还得遵循 vvvv beta 的插件接口，无论开发时间还是计算开销都有额外负担。用 VL，你多半可以直接访问同一个 .NET 库，没有这些负担，而且全程保持可视化编程。

## Main differences between vvvv beta and VL / vvvv beta 与 VL 的主要差异 {#main-differences-between-vvvv-beta-and-vl}

第一眼看上去，VL 对 vvvv beta 用户是相当眼熟的：有灰色的节点、连线和 IOBox，连线方式也类似。老用户最先会绊到的几处明显差异是：

* **循环**：没有自动 spreading。VL（目前）只有显式的循环
* **类型**：VL 对类型更挑剔，而这反过来带来了更大的灵活性
* **Pad**：不再用 FrameDelay 节点，VL 里用具名的 Pad 来表示「把状态从这一帧交给下一帧」
* **节点浏览器**：VL 有不同种类的节点，所以浏览器的用法也有些不同

这些只是老用户最容易注意到的差异，VL 还有很多特性等着你按需发现和使用。关于这些差异、以及另一些你会觉得眼熟的东西，后面几章有更详细的说明。
