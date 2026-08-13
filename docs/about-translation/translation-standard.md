---
title: 协作规范
origin: cn
---

翻译或校对时请照这些约定来。不确定的话，[Discord](https://discord.com/invite/yBWCJQQ4Pq) 里问一声就好。

## 专有名词

这七个词是全书的地基，出现频率最高，也最容易各译各的：

| 名词 | 翻译 |
| :--- | :--- |
| Patch | 草图 |
| Node | 节点 |
| Operation | 运算器 |
| Link | 连线 |
| Pin | 针脚 |
| Region | 区块 |
| Pad | 数据板 |

**完整术语表有 60 条**，包括哪些词保留英文不译（Spread、Delegate、Generic、Aspect 等）：

* 人类可读版：[TERMINOLOGY.md](https://github.com/NodeNodeNode/thegraybookcn/blob/main/TERMINOLOGY.md)
* 机器可读的唯一真源：[`translation/terms.yml`](https://github.com/NodeNodeNode/thegraybookcn/blob/main/translation/terms.yml)

改术语请改 `terms.yml`，`TERMINOLOGY.md` 是由它生成的产物。仓库里有检查器（`npm run gb:check-terms`）会拿这份表校验全站，所以术语不一致提交时就会被拦下来。

**新定一个术语时，必须把它写进 `terms.yml`，并和译文放在同一个提交里。** 没进表就不算改完 —— 这是本项目的硬约束。

## 格式规范

* 节点名称、菜单、按钮名称、按键输入等专有交互对象应该包裹在代码语法中
  * 例：查看菜单 `Quad` > `Setting`

* 中英文混排时，中英文字符之间用一个半角空格隔开
  * 例：如果你从 vvvv beta 而来，而且已经熟悉 DX9/DX11，那你已经很熟悉底层渲染流程了。

* 译注采用 Note 的形式加入
  * 例：

:::note
此处原文尚未更新
:::

* 在文段中使用中文括号而不是英文括号

## 一个容易踩的坑：强调标记不要紧贴汉字

术语首次出现时的双语并列，**必须写成 `*English*（中文）`**，中文放在星号外面。

```
✗ *Patch（草图）*是…     页面上会漏出两个裸星号
✓ *Patch*（草图）是…     正确
```

原因是 CommonMark 的规则：收尾的 `*` 前面若是标点（比如全角 `）`）、后面又紧跟汉字，这个标记**根本不会闭合**。而且它不报错、不断链、构建照过，只是安静地把星号漏给读者 —— 全站曾经有 18 处这样漏着。

同类的还有 `请**[链接](url)**，`（开标记前是汉字、后是方括号，同样开不了）。

完整的文风与排版规则见 [TRANSLATION-STYLE.md](https://github.com/NodeNodeNode/thegraybookcn/blob/main/TRANSLATION-STYLE.md)。
