---
title: Publishing a NuGet / 发布 NuGet
slug: /extending/publishing
source_path: reference/extending/publishing.md
source_blob: 373e622d411c9db03920ef83507d1614102c462c
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/publishing.html)

这份指南讲怎么在你的 GitHub 仓库上配一套工作流，用 [PublishVLNuget](https://github.com/vvvv/PublishVLNuget) 这个 GitHub Action 把插件发布到 nuget.org 或任何你想要的源。

本指南假定你已经有了 GitHub 和 nuget.org 的账号，并且能访问一个已有的 VL GitHub 仓库。

## 参考实例 {#references}

这里讲的配置目前正被以下这些节点库使用：

* [VL.IO.OSC](https://github.com/vvvv/VL.IO.OSC)
* [VL.Devices.AzureKinect](https://github.com/vvvv/VL.Devices.AzureKinect)
* [VL.Devices.Nuitrack](https://github.com/vvvv/VL.Devices.NuiTrack)
* [VL.Devices.RealSense](https://github.com/vvvv/VL.Devices.RealSense)
* [VL.OpenCV](https://github.com/vvvv/VL.OpenCV)

尽管拿它们作为你自己节点库的起点。

## GitHub Actions 简介 {#a-brief-introduction-to-github-actions}

GitHub Action 是一些用途明确的小脚本，用来把仓库上的任务自动化。它们是*工作流*的构件：把若干 action 一个接一个串进自己的小脚本，再决定这个工作流在什么条件下触发（`main` 上有新提交、打了新标签等等）。

我们这个 action 会替你做这些事：

* 编译你的 Visual Studio 解决方案，如果你的插件有的话
* 如果你不想每次都把包图标提交进仓库，就从一个外部网址下载它
* 用 `nuspec` 或 `csproj` 文件把你的 NuGet 打包
* 把它发布到 nuget.org（或任何其他源）

一个 action 接受输入参数，以键值对的形式列出。在工作流脚本里，我们这个 action 大概长这样：

```yaml
- name: Publish VL Nuget
    uses: vvvv/PublishVLNuget@1.0.43
    with:
    csproj: src\VL.MyLib.csproj
    nuspec: deployment\VL.MyLib.nuspec
    icon-src: https://foo.bar/icon.png
    icon-dst: ./deployment/nugeticon.png
    nuget-key: ${{ secrets.NUGET_KEY }}
```

这个 action 能处理的全部输入参数，见它的 [GitHub 仓库（英文）](https://github.com/vvvv/PublishVLNuget#inputs)。

关于 GitHub Actions 的更多信息，见[官方文档（英文）](https://docs.github.com/en/free-pro-team@latest/actions)。

## 若干预备说明 {#preliminary-notes}

### nuspec 文件 {#nuspec-file}

nuspec 文件装着这个 NuGet 的元数据：版本、作者、依赖，同时指定最终的包里该含哪些文件。建议放在仓库根目录的 `deployment` 文件夹里，不过放哪儿都行。

关于 `nuspec` 文件格式的更多信息，见 Microsoft 的[文档（英文）](https://docs.microsoft.com/en-us/nuget/reference/nuspec)。

#### 依赖 {#dependencies}

在 nuspec 文件里，确认你把这个节点库／项目需要的 NuGet 都列在了 `dependencies` 一节下。

#### 资源、二进制文件、帮助文档等等 {#assets-binaries-help-files-etc}

在 nuspec 文件里，确认你把所有资源、dll、帮助文档等等都列在了 `files` 一节下。

#### 版本 {#version}

你的包版本应该遵循 [semver](https://semver.org/) 规范。

一个 NuGet 包可以有两种版本：正式版或预发布版。

预发布包意味着这个包还在开发中：东西可能在两个版本之间剧烈变化，功能也可能时不时失效或不稳定。

正式版包意味着这个包已经为生产环境做过充分测试和打磨：不预期有重大破坏性改动，稳定性可以信赖。

如果你想发布包的预发布版本，就得告诉 nuget.org 这确实是个预发布版本。做法是在包版本的末尾加上 `-alpha` 后缀。

### `csproj` 文件 {#csproj-file}

如果你的插件有 `csproj` 文件，它也可以代替 `nuspec` 文件来打包你的 NuGet。更多信息请参阅 NuGet 文档的[这一节（英文）](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package-msbuild)。

如果你打算这么用，只要把这个 GitHub Action 的 `nuspec` 输入省掉即可。

### 包图标 {#package-icon}

我们这个 GitHub Action 可以用 `icon-src` 和 `icon-dst` 两个输入参数从外部指定包图标，这样就不必把图标提交进仓库 —— 每次工作流运行都会下载它并放进包里。

请注意 `icon-dst` 输入参数必须指向仓库里一个**已经存在**的文件夹。我们建议你干脆下载到仓库根目录，像这样：

```yaml
(...)
- name: Publish VL Nuget
    uses: vvvv/PublishVLNuget@1.0.43
    with:
    (...)
    icon-src: https://wwww.url.to/nugeticon.png
    icon-dst: ./nugeticon.png
```

#### 用 `nuspec` 文件 {#using-a-nuspec-file}

在你的 action 里，把图标的目标位置设为仓库根目录：

```yaml
(...)
- name: Publish VL Nuget
    uses: vvvv/PublishVLNuget@1.0.43
    with:
    (...)
    icon-src: https://wwww.url.to/nugeticon.png
    icon-dst: ./nugeticon.png
```

:::note
工作流文件里的路径，相对的是仓库根目录。
:::

然后在 `file` 一节里，nuspec 要从「action 下载它的那个位置」引用（`src` 属性），再放到你想要的地方（`target` 属性）—— 注意 `target` 得和 `metadata` 一节期望的位置对上。

```xml
(...)
    <metadata>
        (...)
        <icon>icon\nugeticon.png</icon>
    </metadata>
    <files>
        (...)
        <file src="..\nugeticon.png" target="icon\">
    </files>
(...)
```

:::note
nuspec 文件里的路径，相对的是这个文件自己所在的位置。
:::

#### 用 `csproj` 文件 {#using-a-csproj-file}

你可以在 Visual Studio 里给项目配图标。注意要填一个**还不存在**的文件路径 —— 那个文件稍后才由 action 下载。这感觉有点怪，因为 Visual Studio 给了你一个 `Browse` 按钮让你挑文件；直接手写路径，跟工作流文件里的 `icon-src` 对上就行。

举例来说，你的工作流文件会长这样：

```yaml
(...)
- name: Publish VL Nuget
    uses: vvvv/PublishVLNuget@1.0.28
    with:
    csproj: src\Whatever\Whatever.csproj
    icon-src: https://wwww.url.to/nugeticon.png
    icon-dst: ./deployment/nugeticon.png
    nuget-key: ${{ secrets.NUGET_KEY }}
```

而你的 Visual Studio 配置长这样：

![](https://thegraybook.vvvv.org/images/libraries/publishing_icon_in_visualstudio.png)
Visual Studio

## 使用这个 Action {#using-the-action}

### 取得 nuget.org 的 API key {#getting-a-nugetorg-api-key}

下面这几步带你走完 nuget.org 的配置。开始之前，请确认你有一个可用的账号并已登录 nuget.org。

1. 点右上角你的用户名
2. 在弹出的菜单里点 `API Keys`
3. 点 `+ Create`
4. 在 `Key Name` 下填仓库名或项目名 —— 全世界的人敲 `nuget install <你的包名>` 时用的就是它
5. 在 `Package owner` 下按你的情况选对选项：如果这个包该归属于你所在的某个组织而不是你个人，现在就选那个组织
6. 在 `Glob Pattern` 下填：`*`
7. 点 `Create`

:::warning
这时你应该会看到刚创建的包出现在列表里，并带一条黄色警告提醒你复制你的 key。**这一步至关重要，因为这是你唯一一次能复制到这个值的机会。**
:::

点包描述下面的 `Copy`，把它加进你仓库的 secrets。做法请参阅 GitHub 文档的[这一页（英文）](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)。记住你这个 secret 的名字，下一步创建工作流文件时会用到。我们建议就叫它 `NUGET_KEY`。

### 创建工作流文件 {#creating-the-workflow-file}

在你仓库的 `.github/workflows` 目录里新建一个 `main.yml` 文件。你的仓库结构应该长这样：

```
├── .github
│   └── workflows
│       └── main.yml
├── deployment
│   ├── VL.MyLib.nuspec
├── help
│   └── Basics
│       ├── HowTo Foo.vl
│       └── HowTo Bar.vl
├── src
│   └── MyLib
│       ├── Baz.cs
│       ├── MyLib.csproj
│       └── MyLib.sln
├── README.md
└── VL.Whatever.vl
```

在用 `PublishVLNuget` 之前，你需要先加上几个它依赖的、已有的其他 action。所以在你的 `main.yml` 文件里粘贴以下内容：

```yaml
name: push_nuget

# on push on main
on:
  push:
    branches:
      - main
    paths-ignore:
      - README.md

jobs:
  build:
    runs-on: windows-latest
    steps:
    - name: Git Checkout
      uses: actions/checkout@master
    
    - name: Setup MSBuild.exe
      uses: microsoft/setup-msbuild@v2

    - name: Setup Nuget.exe
      uses: nuget/setup-nuget@v2.0.0
```

`on` 一节描述这个工作流在什么条件下被触发。这里我们指定：当 `main` 上有新提交时触发，**除非**改的是 `README.md`。

接着，在我们的 job 里加三个 action：

* `actions/checkout` 确保用的是最新版的 git checkout action
* `microsoft/setup-msbuild` 确保我们的 action 能用 `msbuild.exe` 来编译你的解决方案
  * 因此，如果你的插件没有 Visual Studio 解决方案，这一条可以省掉
* `nuget/setup-nuget` 安装 `nuget.exe`。我们的 action 需要它来打包并把你的插件推到 nuget.org

现在一切就绪，可以把我们的 action 加上并填好它的参数了。

```yaml
- name: Publish VL Nuget
    uses: vvvv/PublishVLNuget@1.0.43
    with:
    csproj: src\VL.MyLib.csproj
    nuspec: deployment\VL.MyLib.nuspec
    icon-src: https://foo.bar/nugeticon.png
    icon-dst: ./nugeticon.png
    nuget-key: ${{ secrets.NUGET_KEY }}
```

:::note
工作流文件里的路径，相对的是你仓库的根目录！
:::

想知道 `{{ secrets.NUGET_KEY }}` 是什么？见[取得 nuget.org 的 API key](#getting-a-nugetorg-api-key)。

### 推送！{#push}

现在推到 `main` 分支就能触发一次新部署。记得先把 `nuspec` 或 `csproj` 里的版本号往上抬 —— 否则 nuget.org（或你用的任何源）会拒收。

到你仓库的 *Action* 一栏可以实时监看工作流的运行。工作流运行期间若有错误，会显示在这里。

![](https://thegraybook.vvvv.org/images/libraries/publishing_workflow_run_report.png)
工作流运行报告

### 给包归类 {#categorize-the-pack}

想让你在 nuget.org 上公开的包出现在[包浏览器](http://vvvv.org/packs)里，请确认：

* 你的包带一个 “VL” 标签
* 你把自己的包加进了[精选节点库清单](https://github.com/vvvv/PublicContent/blob/master/Libraries.xml)—— 这份清单定义了浏览器里用的分类。注意：一个 NuGet 可以出现在多个分类里！
