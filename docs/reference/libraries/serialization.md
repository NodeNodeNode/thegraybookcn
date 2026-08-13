---
title: Serialization and Deserialization / 序列化与反序列化
slug: /libraries/serialization
source_path: reference/libraries/serialization.md
source_blob: a61b924d48dcc0f76ca54ce377387a27a1590cd2
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/serialization.html)

*序列化是把数据结构翻译成某种格式（文本或一串字节）的过程，以便存储（比如存进文件）或传输（比如通过网络），之后再重建出来。相反的操作 —— 从序列化的格式里把数据结构提取回来 —— 叫作反序列化。*

来自[维基百科](https://en.wikipedia.org/wiki/Serialization)

## 常见格式 {#common-formats}

做这件事的方法有很多，但常用的文本序列化格式有三种：[XML](https://en.wikipedia.org/wiki/XML)、[JSON](https://en.wikipedia.org/wiki/JSON) 和 [CSV](https://en.wikipedia.org/wiki/Comma-separated_values)。二进制格式通常更小，因而读写更快；而文本格式的好处是人能读懂，这对调试和版本管理都有帮助。跟网络打交道时，通常会选 JSON —— 它很容易用 JavaScript 解析和生成。

## 自动 {#automatic}

当你只需要把数据结构通过网络从应用的一个实例发给另一个实例、数据并不需要存进磁盘时，你多半不在意实际用的是什么格式。

这种情况下用现成的运行时序列化器就行 —— 大多数数据类型都能直接序列化，不用为此另建一套数据结构。快而省事，代价是格式完全不由你控制，体积上可能有些开销：一些你根本不需要的数据也会被写进去。

序列化成 XElement（也就是 XML）时，最好用 `System.Serialization` 目录下的这些节点：

* Serialize → XElement → Deserialize
* Serialize (Log Errors) [Advanced] → XElement → Deserialize (Log Errors)

此外，`VL.Serialization.FSPickler` 这个包里的下列节点也可以用：

* Serialize (XML) → String → Deserialize (XML)
* Serialize (JSON) → String → Deserialize (JSON)
* Serialize (Binary) → MutableArray of Byte → Deserialize (Binary)

:::note
这些节点生成的序列化格式是「易变的」—— VL 换个版本就可能不兼容了。

还有一点：一份 JSON 或 XML 如果不是由对应的 Serialize 节点生成的，而各个属性又没按字母顺序排列，反序列化就会失败。这是 FsPickler 的怪癖，我们大概迟早要把它换掉。在那之前，碰上这种情况可以改用 [Json.NET](https://www.newtonsoft.com/json) 库里的节点。
:::

想了解这些节点内部怎么工作，去看它们基于的 [FSPickler（英文）](https://mbraceproject.github.io/FsPickler/)库的文档。

*（上游此处待补图：MyType 被自动序列化和反序列化的例子）*

## 手动 {#manual}

当你要把程序的状态存进磁盘时，你可能得考虑文件格式的不同版本 —— 因为你所保存的数据结构会随时间演变，而你多半仍希望你的应用能打开早先版本存下的文件。

这种情况下你会想自己定义格式：格式什么时候改由你说了算，序列化和反序列化过程相应调整，并且可以通过为不同版本的格式提供不同的序列化／反序列化器来保住向后兼容。

### 自定义序列化 {#custom-serialization}

下面这些节点用来搭数据结构：

* XElement (Join) [XML]
* XAttribute (Join) [XML]

然后用这些节点把它序列化成字符串格式：

* ToJSON [XML]
* ToString [XML]

或者用这些节点直接存进磁盘：

* FileWriter (JSON) [IO]
* FileWriter (XML) [IO]

另建一套只用于序列化的数据结构是一份开销，但也有好处：你可以把不需要序列化的东西留在外面，并且精确定义最终格式长什么样。

*（上游此处待补图：一个数据结构，以及它序列化成 XML 和 JSON 字符串的样子）*

### 自定义反序列化 {#custom-deserialization}

下面这些节点用来从磁盘读 JSON 或 XML 文件：

* FileReader (JSON) [IO]
* FileReader (XML) [IO]

或者把 JSON、XML 字符串解析成 XElement 结构：

* ParseJson [XML]
* Parse [XML]

然后用下面这些节点访问数据结构里的各个字段：

* XElement (Split) [XML]
* XAttribute (Split) [XML]
* XElementsByName [XML]
* XPathSelectElement [XML]
* XPathSelectElements [XML]
* XPathEvaluate [XML]

*（上游此处待补图：对给定的 json／xml 做反序列化）*
