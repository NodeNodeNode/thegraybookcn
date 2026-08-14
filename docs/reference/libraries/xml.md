---
title: XML / XML
slug: /libraries/xml
source_path: reference/libraries/xml.md
source_blob: f517f38fe812cc3417f5a54dbf0fd4c4c0d52a8a
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/libraries/xml.html)

VL 里处理 XML 数据的数据类型叫 *XElement*。

在节点浏览器里逛一逛 *System.XML* 这个目录，可以纵览所有可用来操作 XElement 的节点。

本页的例子都基于下面这份 XML 结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<entries>
  <entry visible="true" >
    <id>1</id>
    <label>Foo</label>
    <description>A Thing</description>
    <speed>2.4</speed>
  </entry>
  <entry visible="false">
    <id>2</id>
    <label>Bar</label>
    <description>Another Thing</description>
    <speed>4.2</speed>
  </entry>
</entries>
```

## Extracting data from an XElement using XPath queries / 用 XPath 查询从 XElement 里提取数据 {#extracting-data-from-an-xelement-using-xpath-queries}

关于 XPath 的一般性介绍可以在 W3Schools 找到：[XML and XPath（英文）](https://www.w3schools.com/xml/xml_xpath.asp)

每一个 XElement 可以有：

* 一个值
* 一组 XAttribute
* 一组子 XElement

以上面那份例子来说：

* 第一个 “label” 元素的值是 “Foo”
* “entry” 元素有一个名为 “visible” 的属性，第一个 entry 的 “visible” 属性值是 “true”
* “entry” 元素的子元素是：“id”、“label”、“description” 和 “speed”

### Accessing an element's value / 访问一个元素的值 {#accessing-an-elements-value}

只想访问某个元素第一次出现时的值，用 *XPathGetValue [System.XML]* 节点：

![](https://thegraybook.vvvv.org/images/libraries/xml-1a41f.png)
第一个 XPathGetValue 节点是灰的（也就是没在用），因为它的输出上还什么都没连。第二个节点接了一个 IOBox，其类型被配置为 “String”，这就告诉 XPathGetValue 节点把 XElement 的值当作字符串来解读

想拿到某个元素所有出现处的值，用 *XPathGetValues [System.XML]* 节点：

![](https://thegraybook.vvvv.org/images/libraries/xml-a7e85.png)
XPathGetValues 把查询到的所有元素的值，以一个 Spread 返回，类型取决于接了什么

### Accessing an element's attributes / 访问一个元素的属性 {#accessing-an-elements-attributes}

只想访问某个元素第一次出现时的某个属性，用 *XPathGetAttributeValue [System.XML]* 节点：

![](https://thegraybook.vvvv.org/images/libraries/xml-cc084.png)
第一个 XPathGetAttributeValue 节点是灰的（也就是没在用），因为它的输出上还什么都没连。第二个节点接了一个 IOBox，其类型被配置为 “Boolean”，这就告诉 XPathGetAttributeValue 节点把 XElement 的值当作布尔值来解读

想拿到某个元素所有出现处的属性，用 *XPathGetAttributeValues [System.XML]* 节点：

![](https://thegraybook.vvvv.org/images/libraries/xml-028d5.png)
XPathGetAttributeValues 把查询到的所有属性的值，以一个 Spread 返回，类型取决于接了什么
