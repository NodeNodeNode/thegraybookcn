---
title: Contributing to existing libraries / 为已有的节点库贡献代码
slug: /extending/contributing
source_path: reference/extending/contributing.md
source_blob: 6aad729e5010534b196ec1fb326474675ecc1eac
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/contributing.html)

在已有的开源节点库上协作走 [git](https://git-scm.com) 这条路：fork 一份，在本地改，最后向原仓库发 pull request。工作流的大致样子见 git 官方书里的 [Contributing to a Project（英文）](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project)。

这个流程里很关键的一步是：看出原始文档和你改过的文档之间的差别。对文本编程语言这挺容易，但对可视化编程 —— 至少对 VL —— 这是最主要的难题之一。到目前为止还没有简单办法能快速比较一个文档的两个版本。所以发 pull request 时请记着：接收方可能很难弄明白你到底改了什么。因此请尽量做到：

* 把新增／删除／修改分成不同的 pull request 提交
* 如果你的改动只是新增，尽量把它们放在一个单独的 .vl 文档里
* 一定要用文字把你的改动讲清楚
* 考虑在 pull request 里附上改动前后的截图

## Source package-repositories / 源码包仓库 {#source-package-repositories}

要在仓库的本地副本上干活，建议你建一个这样的目录：

```
vl-libs\
```

然后把所有仓库都克隆进去。比如你想给 [VL.Audio](https://github.com/vvvv/VL.Audio) 和 [VL.Devices.Kinect2](https://github.com/vvvv/VL.Devices.Kinect2) 这两个包做贡献，你的目录结构就会是这样：

```
vl-libs\VL.Audio\
vl-libs\VL.Devices.Kinect2\
```

像这样、底下装着一个或多个 vvvv 包源码子目录的目录，就叫*package repository*（包仓库）。要让 vvvv 知道它的存在，用[命令行参数](/develop-environment/commandline-arguments)指定路径：

```
--package-repositories C:\Users\foo\Documents\repos\vl-libs
```

如果你想把不同的包仓库维护在不同的目录里，当然也可以指定多个路径：

```
--package-repositories "C:\Users\foo\Documents\repos\vl-libs;C:\Users\foo\Documents\repos\vl-libs2"
```

包仓库路径下找到的包，会和你装过的其他 NuGet 一样出现在 `Dependencies > VL Nugets` 里。所以在任意 .vl 文档里都能直接引用、直接改。不过注意：有些包带 C# 解决方案，得先编译过才能用。

默认情况下[源码包是只读的](/language/compilation#read-only-packages)，也就是说你没法在 vvvv 里编辑它们。想让某些包可编辑，你得通过[命令行参数](/develop-environment/commandline-arguments)把它们指定为可编辑的包，比如：

```
--editable-packages VL.Audio;VL.Devices*
```

## Switching between source and binary packages / 在源码包和二进制包之间切换 {#switching-between-source-and-binary-packages}

比如你一开始把 VL.Audio 当 NuGet 装了，后来想 fork 它、克隆源码下来改。只要把源码放进包仓库路径、并把路径告诉 vvvv，vvvv 就会优先用源码包而不是同名的二进制 NuGet。于是「设不设包仓库路径」这一个开关，就能让你在版本管理下的源码和同名二进制包之间来回切换。
