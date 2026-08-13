---
title: NuGet Compatibility Chart / NuGet 兼容性对照表
slug: /changelog/nuget-compatibility-chart
source_path: changelog/nuget-compatibility-chart.md
source_blob: db209476fc4c74b76ddb9beafbe45cb44d6784fa
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/changelog/nuget-compatibility-chart.html)

不同版本的 vvvv 兼容不同版本的 NuGet。多数时候用某个 NuGet 的最新版就是最好的选择，但尤其是碰上较老的 vvvv 版本时，你可能得退回到某些 NuGet 的特定旧版本。

可惜下面这些列表是人工维护的，因此远谈不上完整。欢迎你把自己的发现补进来，帮我们把它做得更好 —— 点这一页右上角的 “Improve this Doc”，或者发邮件到 [devvvvs@vvvv.org](mailto:devvvvs@vvvv.org) 告诉我们。

如果你确实需要把某个 NuGet 降级，务必先读[安装某个特定版本的 NuGet](/develop-environment/managing-nugets#installing-a-specific-version)。

## vvvv gamma 7.x

| 包 | 版本 | 取得推荐版本的命令 |
|---|---|---|
| [VL.Fuse](https://www.nuget.org/packages/VL.Fuse) | >= 1.0.3-beta08 | `nuget install VL.Fuse -pre` |
| [VL.Devices.Axis](https://www.nuget.org/packages/VL.Devices.Axis) | >= 0.0.9 preview | `nuget install VL.Devices.Axis -pre` |
| [VL.CEF.Skia](https://www.nuget.org/packages/VL.CEF.Skia) | >= 0.7.2 | `nuget install VL.CEF.Skia` |
| [VL.CEF.Stride](https://www.nuget.org/packages/VL.CEF.Stride) | >= 0.7.2 | `nuget install VL.CEF.Stride` |

## vvvv gamma 6.x

| 包 | 版本 | 取得推荐版本的命令 |
|---|---|---|
| [VL.Audio](https://www.nuget.org/packages/VL.Audio) | <= 1.8.2 | 随 vvvv 发布 |
| [VL.Audio.LTC](https://www.nuget.org/packages/VL.Audio.LTC) | >=0.1.1 | `nuget install VL.Audio.LTC` |
| [VL.Devices.RealSense](https://www.nuget.org/packages/VL.Devices.RealSense) | >= 1.6.0 | `nuget install VL.Devices.RealSense` |
| [VL.Devices.AzureKinect](https://www.nuget.org/packages/VL.Devices.AzureKinect) | >= 1.5.0 | `nuget install VL.Devices.AzureKinect` |
| [VL.Devices.AzureKinect.Body](https://www.nuget.org/packages/VL.Devices.AzureKinect) | >= 1.5.0 | `nuget install VL.Devices.AzureKinect.Body` |
| [VL.Fuse](https://www.nuget.org/packages/VL.Fuse) | >= 1.0.3 preview | `nuget install VL.Fuse -pre` |
| [VL.IO.TCP](https://www.nuget.org/packages/VL.IO.TCP) | >= 0.5.0 preview | `nuget install VL.IO.TCP -pre` |
| [VL.Kairos](https://www.nuget.org/packages/VL.Kairos) | >= 1.1.9 | `nuget install VL.Kairos` |
| [VL.Pipette.HDE](https://www.nuget.org/packages/VL.Pipette.HDE) | 0.0.2 | `nuget install VL.Pipette.HDE -version 0.0.2` |
| [VL.SpoutMonitor.HDE](https://www.nuget.org/packages/VL.SpoutMonitor.HDE) | 0.1.0 | `nuget install VL.SpoutMonitor.HDE -version 0.1.0` |
| [VL.TUIO.HDE](https://www.nuget.org/packages/VL.TUIO.HDE) | 0.2.1 | `nuget install VL.TUIO.HDE -version 0.2.1` |
| [VL.Devices.Axis](https://www.nuget.org/packages/VL.Devices.Axis) | = 0.0.8 preview | `nuget install VL.Devices.Axis -version 0.0.8` |

## vvvv gamma 5.x

| 包 | 版本 | 取得推荐版本的命令 |
|---|---|---|
| [VL.Audio.GPL](https://www.nuget.org/packages/VL.Audio.GPL) | >= 1.1.1 preview | `nuget install VL.Audio.GPL -pre` |
| [VL.Badmapper](https://github.com/vvvv/VL.BadMapper) | >= 0.0.19 preview | `nuget install VL.Badmapper -pre` |
| [VL.Devices.Astra](https://github.com/vvvv/VL.Devices.Astra) | >= 1.2.0 | `nuget install VL.Devices.Astra` |
| [VL.Devices.Kinect2](https://github.com/vvvv/VL.Devices.Kinect2) | >= 1.3.0 | `nuget install VL.Devices.Kinect2` |
| [VL.Devices.Kinect](https://github.com/vvvv/VL.Devices.Kinect) | >= 1.0.3 | `nuget install VL.Devices.Kinect` |
| [VL.Devices.LeapOrion](https://github.com/vvvv/VL.Devices.LeapOrion) | >= 1.2.0 | `nuget install VL.Devices.LeapOrion` |
| [VL.Devices.RealSense](https://github.com/vvvv/VL.Devices.RealSense) | 1.5.0 | `nuget install VL.Devices.RealSense -version 1.5.0` |
| [VL.Fuse](https://www.nuget.org/packages/VL.Fuse) | 1.0.2 | `nuget install VL.Fuse -version 1.0.2` |
| [VL.Kairos](https://www.nuget.org/packages/VL.Kairos) | >= 1.0 preview | `nuget install VL.Kairos -version 1.1.8` |
| [VL.Stride.Text3d](https://github.com/bj-rn/VL.Stride.Text3d) | >= 1.0.1 | `nuget install VL.Stride.Text3d` |
| [VL.IO.TCP](https://www.nuget.org/packages/VL.IO.TCP) | <= 0.4.2 preview | `nuget install VL.IO.TCP -version 0.4.2-alpha` |
| [VL.Audio.LTC](https://www.nuget.org/packages/VL.Audio.LTC) | 0.1.0 | `nuget install VL.Audio.LTC -version 0.1.0` |

## vvvv gamma 2021.4.12

| 包 | 版本 | 取得推荐版本的命令 |
|---|---|---|
| [VL.Audio.GPL](https://www.nuget.org/packages/VL.Audio.GPL) | 1.0.0 | `nuget install VL.Audio.GPL -version 1.0.0` |
| [VL.Badmapper](https://github.com/vvvv/VL.BadMapper) | 0.0.15 | `nuget install VL.Badmapper -version 0.0.15` |
| [VL.Devices.Astra](https://github.com/vvvv/VL.Devices.Astra) | 1.0.1 | `nuget install VL.Devices.Astra -version 1.0.1` |
| [VL.Devices.Kinect2](https://github.com/vvvv/VL.Devices.Kinect2) | 1.2.1 | `nuget install VL.Devices.Kinect2 -version 1.2.1` |
| [VL.Devices.LeapOrion](https://github.com/vvvv/VL.Devices.LeapOrion) | 1.1.4 | `nuget install VL.Devices.LeapOrion -version 1.1.4` |
| [VL.Devices.RealSense](https://github.com/vvvv/VL.Devices.RealSense) | 1.3.2 | `nuget install VL.Devices.RealSense -version 1.3.2` |
| [VL.Fuse](https://www.nuget.org/packages/VL.Fuse) | 0.2.4 | `nuget install VL.Fuse -version 0.2.4` |
| [VL.Kairos](https://www.nuget.org/packages/VL.Kairos) | 0.6 | `nuget install VL.Kairos -version 0.6` |
| [VL.Stride.Text3d](https://github.com/bj-rn/VL.Stride.Text3d) | 0.4.0 | `nuget install VL.Stride.Text3d -version 0.4.0` |

## vvvv gamma 2021.3.0

同样适用于 *vvvv beta42*

| 包 | 版本 | 取得推荐版本的命令 |
|---|---|---|
| [VL.OpenCV](https://github.com/vvvv/VL.OpenCV) | 1.2.0 | `nuget install VL.OpenCV -version 1.2.0` |
