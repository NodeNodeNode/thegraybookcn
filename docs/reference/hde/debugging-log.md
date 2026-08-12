---
title: Log / 日志
slug: /develop-environment/debugging-log
source_path: reference/hde/debugging-log.md
source_blob: 915d1a64c4b1c733d831abe3a89e7905e4380f7a
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/hde/debugging-log.html)

想先了解日志，可以看 vvvvTv 的这一期：[Logging](https://youtube.com/live/OpUrJjTXBxM?feature=share)。

日志会持续收集所有消息并展示完整历史，直到你手动清空、或者缓冲区写满为止（缓冲区长度默认 5000，可以在设置里改）。

![](https://thegraybook.vvvv.org/images/reference/hde/2023-12-20-21-15-29.png)

## Severity Threshold / 严重级别阈值 {#severity-threshold}

每条日志消息都带有以下严重级别之一：

- Critical
- Error
- Warning
- Information
- Debug
- Trace

严重级别下拉框（默认是 Information）用来设一条硬性的日志级别门槛 —— 比所选阈值更低的消息会被直接忽略。

## Filtering Severities / 过滤严重级别 {#filtering-severities}

所有通过了阈值的日志消息都会出现在列表里。想只看某几种级别，用阈值下拉框旁边那排级别按钮来切换。小技巧：**右键点击某个级别可以单独只看它**。

## System vs. App messages / 系统消息与程序消息 {#system-vs-app-messages}

列表里的日志消息，可能来自系统（vvvv 自身），也可能来自你的程序。看 “Source” 那一列就能分辨。

## Logging from your patches / 从草图里打日志 {#logging-from-your-patches}

想从草图里产生日志消息，用 Log [System.Logging] 节点。

## Log Providers / 日志提供程序 {#log-providers}

日志有意思的地方在于：你可以把它路由到任何你喜欢的[日志提供程序](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging-providers)。真实项目里你可能想把某些消息写进文件、另一些发到云服务 —— 都做得到，见帮助面板里的 “HowTo Configure logging providers”。

## Log UI in your own application / 在自己的程序里放日志界面 {#log-ui-in-your-own-application}

导出程序之后，你默认就看不到日志了 —— 因为上面那个日志窗口是 vvvv 自身的一部分，不属于你的程序。

第三方日志提供程序当然还是照用，但你可能也想让日志窗口成为程序的一部分。具体怎么做，见 “HowTo Use the log view in an exported application”。

## Log issues during startup of vvvv / vvvv 启动阶段的问题 {#log-issues-during-startup-of-vvvv}

如果问题在 vvvv 自己启动时就出现了，用 `--log` 命令行参数启动 vvvv.exe，然后查看生成在这里的 vvvv.log 文件：

```
%UserProfile%\Documents\vvvv\gamma\
```
