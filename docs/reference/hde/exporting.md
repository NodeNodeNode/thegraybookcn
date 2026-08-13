---
title: Exporting Applications / 导出应用
slug: /develop-environment/exporting
source_path: reference/hde/exporting.md
source_blob: 83a943fd1eca3f6d67f0037df6a37ae2b211f1b9
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/exporting.html)

vvvv 可以把草图导出成一个可独立运行的程序。截至 7.x，支持这些导出目标：

- Windows：桌面程序和控制台程序
- Linux、macOS：控制台程序

有两条路可以走：

- 用命令行编译器 `vvvvc.exe`
- 用 vvvv 自带的导出界面：`Quad > Export...`，或快捷键 `F10`

## The commandline compiler / 命令行编译器 {#the-commandline-compiler}

独立编译器 `vvvvc.exe` **从 7.0 版本起**随 vvvv 一起发布，就在安装目录里 `vvvv.exe` 旁边。

最简单的用法：

```
vvvvc.exe MyApp.vl
```

它会把产物发布到默认的导出目录：

```
%UserProfile%\Documents\vvvv\gamma\Exports\MyApp
```

:::note
你必须确保编译器能访问到草图引用的所有 NuGet。目前这意味着你得手动安装它们，或者用 `--nuget-path`、`--package-repositories`、`--export-package-sources` 这几个[命令行参数](commandline-arguments.md)把编译器指过去。
:::

### Compiler arguments / 编译器参数 {#compiler-arguments}

编译器接受的完整参数列表，见[命令行参数](commandline-arguments.md#vvvvexe-and-vvvvcexe)以及下面这些界面选项。

## The Application Exporter UI / 导出界面 {#the-application-exporter-ui}

![](https://thegraybook.vvvv.org/images/hde/exportdialog.png)
应用导出界面

## Application to export / 要导出哪个应用 {#application-to-export}

选择要导出的应用（同时开着多个项目时用得上）。

## Output directory / 输出目录 {#output-directory}

选择导出的程序和文件生成到哪里。

导出成功后，输出目录里会有一个以你的应用命名的文件夹，可执行文件就在里面。**要在另一台电脑上运行，需要把这个文件夹的全部内容都拷过去。**

### 命令行示例 {#commandline-example}

```
vvvvc.exe MyApp.vl --output-directory C:\temp
```

## Icon file / 图标文件 {#icon-file}

指定一个 .ico 文件作为生成的可执行文件的图标。

### 命令行示例 {#commandline-example-1}

```
vvvvc.exe MyApp.vl --app-icon C:\temp\my.ico
```

## Asset behavior / 资源引用方式 {#asset-behavior}

选择导出的程序如何引用资源：

* **Relative to document（相对于文档）**：开发期最好用。资源在哪就从哪引用，你不必操心搬动资源的事，可以快速试导出。
* **Relative to output（相对于输出）**：正式导出用这个。它要求你手动把资源摆到相对于可执行文件的位置上，和开发时它们相对于根文档的位置一致。这样整个输出目录就可以整体搬走、部署到别的电脑。

### 命令行示例 {#commandline-example-2}

```
vvvvc.exe MyApp.vl --asset-behavior RelativeToDocument
```

## Output type / 输出类型 {#output-type}

选择生成 Windows 图形程序（WinExe）还是控制台程序（Exe）。

### 命令行示例 {#commandline-example-3}

```
vvvvc.exe MyApp.vl --output-type Exe
```

控制台程序会打开一个 Windows 控制台，把 Update Operation 只跑一帧，然后立刻自我释放。想避免这个默认行为，用 **KeepAppAlive** 节点。

## Runtime identifier / 运行时标识 {#runtime-identifier}

选择为哪个操作系统和架构构建。目前支持：win-x64 | win-x86 | win-arm64 | osx-x64 | osx-arm64 | linux-x64 | linux-arm | linux-arm64

### 命令行示例 {#commandline-example-4}

```
vvvvc.exe MyApp.vl --rid linux-arm64
```

## Error handling / 错误处理 {#error-handling}

### Ignore Compilation Errors / 忽略编译错误 {#ignore-compilation-errors}

有时候你清楚草图里有错误、但暂时就想放着不管，同时还要能导出。

#### 命令行示例 {#commandline-example-5}

```
vvvvc.exe MyApp.vl --ignore-errors true
```

### Ignore Unhandled Exceptions / 忽略未处理的异常 {#ignore-unhandled-exceptions}

默认情况下，未处理的运行时异常会弹窗并让程序停下。关掉这个行为之后，这类异常就只会被写进日志。

## Options / 选项 {#options}

### Clean Output / 清理输出 {#clean-output}

打开之后，导出前会先清掉上次导出的产物（也就是删掉 `\src` 文件夹）。这会让导出变慢，但能确保旧产物不会干扰这次导出。

### 命令行示例 {#commandline-example-6}

```
vvvvc.exe MyApp.vl --clean false
```

## Export / 导出 {#export}

* 按 **Export** 按钮，等绿色进度条走满、**Run** 按钮变为可用
* 按 **Run** 测试运行你的程序
* **Explore Output**：在指定的输出目录打开文件管理器

### Source Directory / src 目录 {#source-directory}

在应用目录旁边你还会看到一个 `\src` 目录。这是 vvvv 导出过程中产生的中间产物，**可以放心删掉**。

:::note
不过 .NET 开发者可能会对它有兴趣：它是一份完整有效的 C# 解决方案，可以用 Visual Studio 打开、查看和修改。
:::

## Dependencies / 依赖 {#dependencies}

如果你的程序引用了 VL.Stride，要确保目标电脑也装了这些：

* Microsoft Visual C++ 可再发行组件包：[64 位](https://aka.ms/vs/17/release/vc_redist.x64.exe)或[32 位](https://aka.ms/vs/17/release/vc_redist.x86.exe)
* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)（FileTexture 和 FileModel 节点需要它）

### For versions prior to vvvv 5.0 / vvvv 5.0 之前的版本 {#for-versions-prior-to-vvvv-50}

用更早版本的 vvvv 导出的程序，还需要装：

* [MSBuild Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=16)

## Advanced build configuration / 进阶构建配置 {#advanced-build-configuration}

构建过程在很多细节上都可以定制。在主 .vl 文件旁边放一个同名的 `.props` 文件 —— 它其实是个 xml 文件，你可以用 [MSBuild](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-concepts?view=vs-2022) 的语法按需配置。

### Version / 版本号 {#version}

`.props` 文件里可以定义的东西之一是版本号：

```xml
<Version>1.3</Version>
```

然后在 vvvv 草图里用 **ApplicationVersion** 节点把它读出来。

## Useful nodes / 有用的节点 {#useful-nodes}

- Args [System]：拿到启动程序时传入的命令行参数
- [System.Console] 这个进阶目录下的节点

## Useful libraries / 有用的库 {#useful-libraries}

- [Terminal.Gui](https://github.com/migueldeicaza/gui.cs)：用来做带文字界面的控制台程序

## Configuring a renderers appearance / 配置渲染窗口的外观 {#configuring-a-renderers-appearance}

引用 VL.CoreLib.Windows 这个 NuGet 会带来下面这些节点：

* SetWindowState 和 WindowState
* SetWindowMode

用它们可以配置渲染窗口的标题、控制按钮、边框等等。

## Code Signing / 代码签名 {#code-signing}

想让你的可执行文件在别人的电脑上运行时不弹警告，需要用 [SignTool](https://docs.microsoft.com/en-us/windows/win32/seccrypto/signtool) 给它签上证书。

## Troubleshooting / 排查 {#troubleshooting}

### Exported app doesn't run on target PC / 导出的程序在目标电脑上跑不起来 {#exported-app-doesnt-run-on-target-pc}

多半是目标电脑缺依赖，见上面的[依赖](#dependencies)。

### Export fails / 导出失败 {#export-fails}

导出失败时会打开控制台，告诉你出错了。

![](https://thegraybook.vvvv.org/images/hde/exporting-74bc1.png)
导出界面报告出了问题

#### 报错 MSB3073 {#export-fails-with-error-msb3073}

这个错误[来自 Stride](https://github.com/stride3d/stride/issues/2232)。遇到的话可以试试这个绕行办法：

- 在 vvvv 里打开 NuGet 命令行：`Quad 菜单 -> Manage NuGets -> Commandline`
- 在命令行里执行：
  - `nuget install System.Security.Cryptography.Pkcs -version 6.0.4`
  - `copy System.Security.Cryptography.Pkcs.6.0.4\lib\net6.0\System.Security.Cryptography.Pkcs.dll %userprofile%\.nuget\packages\stride.core.assets.compilerapp\4.2.0.2121\lib\net8.0`
- 然后重新导出

#### 报错「Found multiple publish output files with the same relative path」 {#export-fails-with-found-multiple-publish-output-files-with-the-same-relative-path}

如果涉及的文件是 `ijwhost.dll`，在[进阶构建配置](#advanced-build-configuration)的 `.props` 文件里加上这一行可能就好了：

```xml
<ErrorOnDuplicatePublishOutputFiles>false</ErrorOnDuplicatePublishOutputFiles>
```

原理见[这里的说明](https://stackoverflow.com/questions/69919664/publish-error-found-multiple-publish-output-files-with-the-same-relative-path)。

#### 报 NuGet 依赖问题 {#export-fails-with-nuget-dependency-issues}

仔细读那段红色的错误信息，里面会说明原因。如果原因指向「包不兼容」，那可能是你的 NuGet 文件夹里日积月累攒了太多包，把导出挡住了。这种情况可以试试从一个干净的 NuGet 文件夹重新开始：

- 打开 NuGet 文件夹：`Quad 菜单 -> Manage NuGets -> Show Installed`，会打开 `C:\Users\..\AppData\Local\vvvv\gamma\nugets`
- 关掉 vvvv
- 回到上一层，把这个文件夹改名成 `nugets_backup`
- 重新打开 vvvv 和你的草图
- 文档菜单会是红的，表示缺少被引用的依赖
- 点 `文档菜单 -> Dependencies`，右键全选所有缺失的依赖，选 “Install exact referenced version”
- 等所有包重新装完，再试导出

#### 报错「could not copy file」 {#export-fails-with-could-not-copy-file}

当你把某些包作为源码仓库引用时可能会遇到。想办法把导出跑通的话可以试试：

- 在导出日志里找到以 “dotnet publish -c Release” 开头的那一行，把整条命令复制下来
- 关掉 vvvv
- 打开命令行（cmd.exe）
- 粘贴并执行这条命令

#### vvvv gamma 2021.4.x 上导出失败 {#export-fails-with-vvvv-gamma-20214x}

已知问题：MSBuild 工具的版本比 vvvv 预期的更新时会不兼容。要确保装的是对的版本，按下面做：

- 把机器上能找到的所有 Visual Studio 和 Build Tools 全部卸载
- 然后重新运行 vvvv 2021.4.x 的安装程序，并勾上 “Build Tools” 这一项

#### 以上都不是 {#none-of-the-above}

请按 “Copy To Clipboard” 复制控制台的输出，然后通过[论坛](https://forum.vvvv.org/c/vvvv-gamma/bug/31)发给我们。
