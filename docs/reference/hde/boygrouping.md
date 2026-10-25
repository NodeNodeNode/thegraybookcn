---
title: Boygrouping / 分布式渲染
slug: /develop-environment/boygrouping
source_path: reference/hde/boygrouping.md
source_blob: 147a6aece12b9d019d6519ea040ceae13a799dc0
status: translated
last_synced: '2026-10-25'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/boygrouping.html)

目前可在 **[vvvv gamma 8.0 预览版](https://vvvv.org/download)** 中试用。

Boygrouping 是 vvvv 的分布式渲染系统，2001 年随 [vvvv beta](https://beta.vvvv.org/using-vvvv/boygrouping/) 首次登场。一台电脑运行项目，可以连上任意多台电脑，各自渲染同一个场景的不同画面，步调完全一致（[n'sync](https://en.wikipedia.org/wiki/NSYNC)）。

这样一来，vvvv 能用实时内容或视频驱动任意大小的投影或屏幕，而且程序可以边跑边改。

:::note[译者注]
boygroup 原意是「男子偶像团体」，n'sync 是美国一支男团的名字，谐音 in sync（同步）。几台电脑像一个组合那样整齐地一起「表演」，名字由此而来。
:::

![](https://thegraybook.vvvv.org/images/reference/hde/boygroup.png)

想想大型、可交互的沉浸式空间，比如 [Dataland](https://dataland.art/)。把 Boygrouping 和立体渲染功能结合起来，给 [CAVE](https://en.wikipedia.org/wiki/Cave_automatic_virtual_environment) 做程序并不比给单块屏幕做更复杂。

## What it does / 它做什么 {#what-it-does}

Boygrouping 最主要的工作，是把项目的 *Patch*（草图）—— 也就是源代码 —— 从服务器同步到所有连上的客户端电脑。你对草图的任何改动，都会马上传到所有客户端并生效。所以不用手动部署程序，也不用在每台客户端上重启！

草图里引用的[包](https://vvvv.org/packs)也一样会同步。只要客户端和服务器一样能上网，它们就会按需自动下载所有包。

除了源代码的改动，在服务器上暂停（`F6`）、单步（`F7`）、停止（`F8`）、启动（`F5`）或重启（`F9`）程序，客户端也会跟着执行。关掉服务器上的 vvvv，所有连着的客户端也会一起关掉。

## Usage / 用法 {#usage}

要运行一个 boygroup，启动 vvvv 时要带上下面这些命令行参数。

### Server / 服务器 {#server}

服务器就是你的主电脑。在这里启动 vvvv 时用 `bind` 参数，指定服务器跑在哪个 IP 上。不写端口的话，默认是 5000：

```
--bind IP:Port
```

还需要 `working-directory` 参数，vvvv 才知道要同步哪些 .vl 文档。**只有放在这个工作目录里的 .vl 文档，才会传给客户端！**

```
--working-directory path\to\working-dir
```

例子：

```
--bind 192.168.0.10 --working-directory C:\MyProject
--bind 192.168.0.10:34556 --working-directory C:\MyProject
```

如果 vvvv 窗口右上角出现了蓝色的 Boygrouping 图标，说明命令生效了：

![](https://thegraybook.vvvv.org/images/reference/hde/boygroupservericon.png)

图标里的数字是当前连着的客户端数量。如果显示红色的 “0”，说明绑定的地址不可用。鼠标悬停在图标上，能看到更多信息，比如所有已连接客户端的 IP 列表。

### Clients / 客户端 {#clients}

在负责渲染的电脑上，启动 vvvv 时用 `server` 参数，指定要连哪台服务器。不写端口的话，默认是 5000：

```
--server IP:Port
```

`working-directory` 参数在这里也是必需的。vvvv 会以这个目录为基准解析相对路径。

```
--working-directory path\to\working-dir
```

**草图里引用的所有资源，都必须能在这个路径下找到！** 怎么同步资源，[见下文](#mirroring-assets)。

例子：

```
--server 192.168.0.11
--server 192.168.0.11:34556
```

:::note
- 服务器和客户端的工作目录不必相同！
- 服务器和客户端谁先启动都没关系：服务器一直在等新连接，客户端也会定期尝试连接指定的服务器。
:::

如果 vvvv 窗口右上角出现了蓝色的 Boygrouping 图标，说明命令生效了：

![](https://thegraybook.vvvv.org/images/reference/hde/boygroupclienticon.png)

圆圈是蓝色的，说明客户端已经连上；是橙色的，说明连接服务器失败。鼠标悬停在图标上能看到更多信息。

### Status nodes / 状态节点 {#status-nodes}

`BoygroupServerStatus` 节点返回：

- Is Server：是否为服务器
- Connected Clients：当前连着的客户端
- All Clients：本次会话里连过的所有客户端
- Working Directory：工作目录
- Binding Address：绑定地址

![](https://thegraybook.vvvv.org/images/reference/hde/boygroupserverstatus.png)

`BoygroupClientStatus` 节点返回：

- Is Client：是否为客户端
- Is Connected：是否已连接
- Server Address：服务器地址
- Working Directory：工作目录

![](https://thegraybook.vvvv.org/images/reference/hde/boygroupclientstatus.png)

### ClientID node / ClientID 节点 {#clientid-node}

如果每台客户端都需要一个唯一的 ID，可以用 `ClientID` *Node*（节点）。按你想要的顺序把所有客户端的 IP 喂给它，它在每台客户端上就会返回对应的 ID。在服务器上它返回 -1：

![Client ID](https://thegraybook.vvvv.org/images/reference/hde/clientid.png)

如果你不想让 ID 和客户端的 IP 绑在一起，也可以启动每台客户端时，用命令行参数传一个唯一的 ID。怎么解析自定义的命令行参数，可以看[帮助面板](findinghelp.md)里的 “HowTo Use Configuration”。

### Debugging / 调试 {#debugging}

需要调试某台客户端上的行为时，用 [RustDesk](https://rustdesk.com/) 这类第三方工具远程连上去就行。这样你能完整操作那台客户端上的 vvvv 编辑器，查看数值，甚至直接改草图。

如果想把在某台客户端上做的本地改动同步回服务器，这样做：

- 在服务器上打开[设置](settings.md)里的 “Auto reload documents”
- 在客户端上保存文档

这样客户端的本地改动就会传回服务器，再由服务器分发给其他所有客户端。

## Licensing / 授权 {#licensing}

除了开发者授权，boygroup 里每台跟着一起「跳舞」的客户端电脑，都需要一个设备授权。你最终也许会改成运行[导出](exporting.md)的程序，但只要还在用 Boygrouping 功能，每台客户端电脑都必须有设备授权。为了方便你控制开销，我们提供[按月](https://store.vvvv.org/products/vvvv-gamma-device-license-monthly)或[按年](https://store.vvvv.org/products/vvvv-gamma-device-license-annual)的设备授权。

## Related topics / 相关话题 {#related-topics}

### Mirroring Assets / 同步资源 {#mirroring-assets}

**Boygrouping 不会自动同步任何资源！** 目前它真的只管 .vl 文档。引用的 .sdsl、.csproj 文件，以及各种内容资源，都还得手动同步。

这里不用重新造轮子，看看 [Remoter](https://github.com/vvvv/Remoter)，它能帮你做这件事。

### Synchronisation / 同步 {#synchronisation}

如果你需要逐帧精确同步，比如做 LED 屏或立体渲染，首先要确保有硬件 [genlock](https://en.wikipedia.org/wiki/Genlock)。比如用 NVIDIA Quadro Sync 卡，再用 [VL.Nvidia.NvAPI](https://forum.vvvv.org/t/vl-nvidia-nvapi/23968) 来配置。

除了用 NvAPI 提供的同步帧计数，你也可以用 [PTP](https://en.wikipedia.org/wiki/Precision_Time_Protocol) 同步各台电脑的系统时钟，然后直接依靠时钟。PTP 配置起来有点麻烦，你有这些选择：

- [用免费工具（英文）](https://thegraybook.vvvv.org/reference/best-practice/ptp.html)
- [用商业工具](https://www.greyware.com/software/domaintime/)

同步数值的话，我们推荐用 [Public Channel](the_channelbrowser.md) 和[绑定](bindings.md)。

### Splitting Views / 拆分画面 {#splitting-views}

Boygrouping 的场景里，经常要把一台相机的视角拆到多个输出上。看看 VL.Stride 自带的 `LookAtRectCamera` 节点的帮助文档。用它可以给多个输出做出无缝衔接的离轴相机视锥体，共用同一个视角。

### Launching Clients / 启动客户端 {#launching-clients}

你时不时会想在所有客户端上同时启动或重启 vvvv。可能是要改启动参数，也可能是要从崩溃中恢复。

这种时候可以看看 [Remoter](https://github.com/vvvv/Remoter)。它不光能管 vvvv，还能管你要在一批客户端上运行的其他程序。

### Projection Mapping / 投影映射 {#projection-mapping}

大型往往意味着投影映射。这方面的需求五花八门，所以 vvvv 支持[多种方案](https://vvvv.org/packs/?c=Projection%20Mapping)，包括 [Scalable Display](https://www.scalabledisplay.com/) 和 [VIOSO](https://vioso.com/) 的自动校准系统。

### Stereoscopic Rendering / 立体渲染 {#stereoscopic-rendering}

只要硬件到位，立体渲染很容易打开。想了解更多，看看 VL.Stride 自带的 `StereoSettings` 节点的帮助文档。
