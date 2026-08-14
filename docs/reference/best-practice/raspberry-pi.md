---
title: Deploying to a Raspberry Pi / 部署到树莓派
slug: /best-practice/raspberry-pi
source_path: reference/best-practice/raspberry-pi.md
source_blob: 05a6d541f407439fc11cc2093f7e92c6807b89bc
status: translated
last_synced: '2026-08-13'
---

[源文档地址](https://thegraybook.vvvv.org/reference/best-practice/raspberry-pi.html)

从 [5.0 版本（英文）](https://thegraybook.vvvv.org/changelog/5.x.html)起，你可以把控制台应用[导出](/develop-environment/exporting)到 Linux —— 这让[树莓派](https://www.raspberrypi.com/)成了一个绝佳的目标平台。

在[应用导出器](/develop-environment/exporting)里这样指定：

* Output type：Console Application
* Target：Linux

## Deployment modes / 部署模式 {#deployment-modes}

正如 [Deploy .NET apps on ARM single-board computers（英文）](https://learn.microsoft.com/en-us/dotnet/iot/deployment#deploying-a-framework-dependent-app)所述，有两种部署模式：

### Framework dependent / 依赖框架 {#framework-dependent}

导出器默认用这个模式。导出的东西要能跑起来，先得[在树莓派上装好 .NET（英文）](https://learn.microsoft.com/en-us/dotnet/iot/deployment#deploying-a-framework-dependent-app)，照做第 1、2 步。

导出成功后，把生成的文件复制到树莓派上，在那边的命令行里敲这个来运行程序：

```
dotnet myprogram.dll
```

### Self-contained / 自包含 {#self-contained}

用这个选项就不需要你装 .NET 了！

先正常跑一次导出，然后按 “Show Details” 按钮。最顶上你会看到这样一行：

```
dotnet publish -c Release --self-contained false /clp:ErrorsOnly /nologo PathToYourProject.csproj"
```

把它复制下来，打开一个命令提示符，按下面这样改过之后运行：

```
dotnet publish -c Release -r linux-arm --self-contained true /clp:ErrorsOnly /nologo PathToYourProject.csproj"
```

32 位的 Raspberry Pi OS 用 `-r linux-arm`，64 位版本用 `-r linux-arm64`。

导出成功后，把生成的文件复制到树莓派上，在那边的命令行里给可执行文件加上执行权限：

```
chmod +x myprogram
```

然后运行它：

```
./myprogram
```

## Automatic deployment of files / 自动部署文件 {#automatic-deployment-of-files}

每次构建之后把文件复制到树莓派这件事，是可以自动化的。在导出器界面里按 `Advanced build configuration`，在 `<Project>` 标签内部加上下面这些行：

```xml
<PropertyGroup>    
  <SourceFolder>PATH-TO-YOUR-PROJECTS-EXPORT-FOLDER</SourceFolder>
  <DestFolder>PATH-TO-YOUR-DESTINATION-FOLDER-ON-THE-PI</DestFolder>
</PropertyGroup>

<ItemGroup>
  <FilesToCopy Include="$(SourceFolder)\**" />
</ItemGroup>

<Target Name="Deploy" AfterTargets="Publish">
  <!-- copy all files from the source folder to the dest folder that are newer or don't exist in the dest folder -->
  <Message Importance="High" Text="Copying files to Raspberry PI..." />
  <Copy SourceFiles="@(FilesToCopy)" DestinationFiles="@(FilesToCopy->'$(DestFolder)\%(RecursiveDir)%(Filename)%(Extension)')" SkipUnchangedFiles="True">
    <Output TaskParameter="CopiedFiles" ItemName="Copied" />
  </Copy>
    
  <ItemGroup>
    <OutdatedFiles Include="$(DestFolder)\**" Exclude="@(Copied)" />
  </ItemGroup>
  <Message Importance="High" Text="Deleting files..." />
  <Delete Files="@(OutdatedFiles)" />
</Target>
```

把 `SourceFolder` 和 `DestFolder` 填好。之后每次构建，改动过的文件都会被复制到树莓派上。

## Autostart / 开机自启 {#autostart}

要让应用在树莓派开机时自动启动，得把它装成一个服务 —— rc.local、.desktop 文件这些办法似乎都不行。

安装服务的方法，参阅 [boot.pdf](https://github.com/thagrol/Guides/blob/main/boot.pdf) 的第 “4.4 Using A Systemd Service” 章。

### Pitfalls / 几个坑 {#pitfalls}

* 如果你的程序要访问文件，记得把 `WorkingDirectory` 设到应用在磁盘上所在的位置
* `ExecStart` 里 “dotnet” 和你的应用都需要写绝对路径，比如：`/home/pi/.dotnet/dotnet /home/pi/MyApp/myapp.dll`

### Map Pi as network drive / 把树莓派映射成网络驱动器 {#map-pi-as-network-drive}

要把树莓派用户的主目录映射成 Windows 机器上的 Z 盘，在命令提示符里运行：

```
net use Z: \\[hostname]\[username]
```

## Useful NuGets / 好用的 NuGet {#useful-nugets}

* [System.Device.Gpio](https://www.nuget.org/packages/System.Device.Gpio)：用于 GPIO、I2C、SPI、PWM、串口
* [Iot.Device.Bindings](https://www.nuget.org/packages/Iot.Device.Bindings)：用于更高层的特定设备支持
* [VL.IO.RCP](https://www.nuget.org/packages/VL.IO.RCP)：用于从网页浏览器远程控制应用的参数
* IO 目录下的任何节点库
* [SFML.Net](https://www.nuget.org/packages/SFML.Net)：用于音频播放和录制（注意：这个 NuGet 的 2.5.0 版本录音是坏的，自己[从源码](https://github.com/SFML/SFML.Net)编译才能用）

:::note[译者注]
上游把「IO 目录下的任何节点库」链到 `../libraries/io.md`，但上游仓库里并没有这个文件，链接是断的，因此译文这里不加链接。
:::

## Useful links / 有用的链接 {#useful-links}

* [Setup Raspberry Pi SSH Keys for Authentication（英文）](https://pimylifeup.com/raspberry-pi-ssh-keys/)
* [.NET IoT Libraries documentation（英文）](https://learn.microsoft.com/en-us/dotnet/iot/)
* [Debug .NET apps on Raspberry Pi（英文）](https://learn.microsoft.com/en-us/dotnet/iot/debugging?source=recommendations)
