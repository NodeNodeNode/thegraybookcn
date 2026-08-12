---
title: Managing NuGets / 管理 NuGet
slug: /develop-environment/managing-nugets
source_path: reference/hde/managing-nugets.md
source_blob: 4620dc93249b84a5dd593a7a6ccf0ed4efdb48f2
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/managing-nugets.html)

![](https://thegraybook.vvvv.org/images/libraries/vl-Dependencies-ManageNugets-Commandline.png)
通过命令行安装一个 NuGet

## Find on nuget.org / 在 nuget.org 上查找 {#find-on-nugetorg}

打开浏览器，让你在[线上仓库](https://nuget.org)里搜索 NuGet。注意：目前找到之后，你仍然得通过命令行手动安装。

## Show installed / 查看已安装 {#show-installed}

打开文件管理器，定位到所有 NuGet 在本地的安装路径。默认在用户目录下：

```
AppData\Local\vvvv\gamma\nugets
```

这个路径可以用命令行参数 `nuget-path` 改，见[命令行参数](commandline-arguments.md)。

## Commandline / 命令行 {#commandline}

打开一个命令行，你可以在里面运行 [NuGet CLI 命令](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference)。

### Installing the latest version of a NuGet / 安装最新版 {#installing-the-latest-version-of-a-nuget}

装最新版直接跑 `nuget install`，比如：

`nuget install vl.opencv`

**通过命令行装完之后，当前文档并不会自动引用它。** 它此时只是出现在[依赖菜单](navigating_a_project.md)的 NuGet 列表里而已。不过如果这个 NuGet 带了帮助文件，那些文件已经会出现在[帮助面板](findinghelp.md)里了。

:::note
想把已装的 NuGet 更新到最新版，再跑一次 install 命令就行。你的包目录里可以同时存在同一个 NuGet 的多个版本，VL 总是用最新的那个。旧版本如果不再需要，得手动删。
:::

### Installing a pre-release version / 安装预发布版 {#installing-a-pre-release-version}

有时候你想装某个包的「预发布」版本。跑 install 命令时加上 `-pre` 参数，比如：

`nuget install vl.audio -pre`

### Installing a specific version / 安装指定版本 {#installing-a-specific-version}

有时候你想装的不是最新版，而是某个特定版本。这时用 `-version` 参数，比如：

`nuget install vl.opencv -version 2.1.0`

:::note
vvvv 永远会加载它找到的最新版 NuGet。所以如果你想降级到某个旧版本，务必确认更新的版本、以及它们的依赖，都已经不在本地了。

删除某个版本的方法是去[查看已安装](#show-installed)，从那里删掉对应的文件夹。如果删不掉，先把 vvvv 关掉。
:::

我们在 [NuGet 兼容性对照表（英文）](https://thegraybook.vvvv.org/changelog/nuget-compatibility-chart.html)里收集了各个包在特定 vvvv 版本下的推荐版本。

### Troubleshooting / 排查 {#troubleshooting}

如果 `nuget install` 报错说这个 NuGet 不存在，但你确定它存在、名字也没拼错，那有小概率是你的 [NuGet.Config](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file) 文件坏了。它在这里：

```
C:\Users\..\AppData\Roaming\NuGet
```

把现有文件改个名留作备份，然后重新跑 install —— 系统会自动重建一份能用的 NuGet.Config。
