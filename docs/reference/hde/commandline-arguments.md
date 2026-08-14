---
title: Commandline Arguments / 命令行参数
slug: /develop-environment/commandline-arguments
source_path: reference/hde/commandline-arguments.md
source_blob: ddd19dcf68c34f921641b8a5198cf4e9f03a992e
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/commandline-arguments.html)

## vvvv.exe {#vvvvexe}

启动 vvvv.exe 时可用的命令行参数：

| 作用 | 参数 |
|---|---|
| 允许多个 vvvv 实例并行运行 | `--allowmultiple` 或 `-m` |
| 启动时不启动草图运行时 | `--stoppedonstartup` |
| 启动时打开一个 VL 文档 | `--open` 或 `-o` + 文件路径 |
| 不加载默认设置，改用指定的 | `--settings` + 文件路径 |
| 不加载编辑器扩展包 | `--noextensions` |
| 把启动阶段的问题记到 `%UserProfile%\Documents\vvvv\gamma\vvvv.log` | `--log` |
| 启用 VL.Stride 的 GPU 调试，见 [GPU 调试](/libraries/3d/gpu-debugging) | `--renderdoc` 和 `--debug-gpu` |

例如：

```
vvvv.exe -o "c:\myproject\foo.vl"
```

## vvvv.exe and vvvvc.exe / 两者通用 {#vvvvexe-and-vvvvcexe}

下面这些参数对 vvvv.exe 和 [vvvvc.exe](/develop-environment/exporting#the-commandline-compiler)都适用：

| 作用 | 参数 |
|---|---|
| 替换 NuGet 的默认全局位置 | `--nuget-path` + 目录路径 |
| VL 查找包时使用的包仓库列表。在[参与节点库开发](/extending/contributing)时最有用 | `--package-repositories` + 分号分隔的包仓库目录列表 |
| 要写进所生成的 NuGet.config 的路径列表，dotnet 会用它来构建生成出来的项目 | `--export-package-sources` + 分号分隔的、含 .nupkg 文件的目录列表 |
| 让某些节点库退出「默认只读」，以便修改它们。详见[可编辑的包](../language/compilation.md#editable-packages) | `--editable-packages` + 分号分隔的包列表，支持通配符，如 `VL.IO.*` |

## vvvvc.exe {#vvvvcexe}

下面这些参数只对 [vvvvc.exe](/develop-environment/exporting#the-commandline-compiler)适用（*斜体*为默认值）：

| 作用 | 参数 |
|---|---|
| 输出的详细程度 | `-v`、`--verbosity` + Trace \| Debug \| *Information* \| Warning \| Error \| Critical \| None |
| 忽略 VL 编译错误（红色节点） | `--ignore-errors` + true \| *false* |
| 忽略运行时错误（粉色节点） | `--ignore-unhandled-exceptions` + true \| *false* |
| 导出的程序与文件生成到哪里。默认 `%UserProfile%\Documents\vvvv\gamma\Exports\AppName` | `--output-directory` + 目录路径 |
| 指定一个 .ico 文件作为生成的可执行文件的图标 | `--app-icon` + .ico 文件路径 |
| 导出的程序里资源如何被引用，见 [Asset behavior](/develop-environment/exporting#asset-behavior) | `--asset-behavior` + RelativeToDocument \| *RelativeToOutput* |
| 生成 Windows 图形程序还是控制台程序 | `--output-type` + Exe \| *WinExe* |
| 为哪个运行时标识构建 | `--rid` + *win-x64* \| win-x86 \| win-arm64 \| osx-x64 \| osx-arm64 \| linux-x64 \| linux-arm \| linux-arm64 |
| 导出前要不要清空构建目录（OutputDirectory/src） | `--clean` + *true* \| false |

比如要为 Linux x64 构建一个控制台程序：

`vvvvc.exe --rid linux-x64 --output-type Exe`
