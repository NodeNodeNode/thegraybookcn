---
title: Enumerations / 枚举
slug: /language/enumerations
source_path: reference/language/enumerations.md
source_blob: 1e42df1afe314dcdda3dc2232e24277419368516
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/language/enumerations.html)

枚举类型是一种值类型，由一组具名常量定义。VL 里有两种枚举：

- 静态枚举（Static Enums）
- 动态枚举（Dynamic Enums）

## Static Enums / 静态枚举 {#static-enums}

静态枚举的条目是固定的，运行时不能改变。`LinearSpreadAlignment` 就是一个例子。

### Using Static Enums / 使用静态枚举 {#using-static-enums}

处理静态枚举用 `Primitive.Enum` 目录下的节点。

![](https://thegraybook.vvvv.org/images/language/static-enums.png)

### Defining Static Enums / 定义静态枚举 {#defining-static-enums}

目前静态枚举还不能在 VL 里直接创建，得写一小段 C# 代码来定义。按[使用 C# 编写节点](../extending/writing-nodes.md)里的说明操作，选 “Static Enum” 模板。打开模板生成的 .cs 文件，你会看到这样一行：

```csharp
    public enum StaticEnum { foo, bar };
```

按需要改它就行，比如：

```csharp
    public enum MyEnum { a, b, c };
```

保存这个 .cs 文件，这个枚举就能在你的 VL 文档里用了。

## Dynamic Enums / 动态枚举 {#dynamic-enums}

动态枚举的条目可以在运行时增加、删除或改变。设备列表之类的场景就用它。

### Using Dynamic Enums / 使用动态枚举 {#using-dynamic-enums}

处理动态枚举用 `Primitive.DynamicEnum` 和 `Primitive.DynamicEnumDefinition` 这两个（进阶）目录下的节点。

![](https://thegraybook.vvvv.org/images/language/dynamic-enums.png)

### Defining Dynamic Enums / 定义动态枚举 {#defining-dynamic-enums}

动态枚举目前同样不能在 VL 里直接创建，也得写一小段 C# 代码。按[使用 C# 编写节点](../extending/writing-nodes.md)里的说明操作，选其中一个 “Dynamic Enum” 模板，然后打开生成的 .cs 文件按需定制。

定制的细节见[定义动态枚举（英文）](https://thegraybook.vvvv.org/reference/extending/writing-nodes.html#dynamic-enums)。

改完保存 .cs 文件，这个枚举就能在你的 VL 文档里用了。
