---
title: Providing Help / 提供帮助文档
slug: /extending/providing-help
source_path: reference/extending/providing-help.md
source_blob: 8fe21633f9f18cef7291528decb98ef11e3e1c09
status: translated
last_synced: '2026-08-12'
---

[源文档地址](https://thegraybook.vvvv.org/reference/extending/providing-help.html)

[帮助面板](/develop-environment/finding-help#help-browser)里显示的包信息取自它们的 nuspec 配置，显示方式如下：

![](https://thegraybook.vvvv.org/images/reference/extending/helpbrowser.png)

* 标题：`<id>`
* 描述：`<description>`
* 作者：`<authors>`
* 版本：`<version>`
* Readme：自动生成的、指向 nuget.org 上该包 `<readme>` 的链接
* 网站：`<projectUrl>`
* 源码：`<repository>`
* 聊天：由 [HelpbrowserContentX.xml](https://github.com/vvvv/PublicContent/blob/master/HelpBrowser/) 指定
* 赞助！：由 [HelpbrowserContentX.xml](https://github.com/vvvv/PublicContent/blob/master/HelpBrowser/) 指定

## Tutorials and Courses / 教程与课程 {#tutorials-and-courses}

想链接的教程或课程不一定绑定到某个具体的包时，把这些信息写进 [TutorialsAndCourses.xml](https://github.com/vvvv/PublicContent/blob/master/HelpBrowser/TutorialsAndCourses.xml) —— 每个帮助面板都会自动下载并显示它。

## Help Patches / 帮助文档 {#help-patches}

节点库的开发者可以提供草图，演示这个库的各个方面。

我们把草图分成 5 类：

* Explanation（讲解）：通常每个库一份，纵览这个库提供的整套节点
* HowTo（怎么做）：一系列各自独立的草图，演示如何用这个库提供的某些节点组合达成具体的事情
* Reference（参考）：一份草图讲一个具体节点的功能
* Tutorial（教程）：多数情况下是一个指向视频教程的链接
* Example（示例）：一份草图，更宽泛地展示这个库的某种用例，不一定解释太多，更多是让人对「能做什么」有个概念

其中除 “Examples” 之外，都遵循[文档体系（英文）](https://documentation.divio.com/)的思路。

要让帮助面板认出这些文件，它们得放在正确的位置，并遵守命名约定：

```
\help\Explanation Overview of available nodes.vl
\help\HowTo Do something.vl
\help\Referece Nodename.vl
\help\Example Something Beautiful.vl
```

如果一个库的帮助文档很多，你也可以用最多两层子目录来组织它们，像这样：

```
\help\Topic\Subtopic\HowTo Do something.vl
```

帮助面板默认按字母顺序显示这些草图。想改顺序，就在 \help 目录里放一个 Help.xml —— 有了它，内容的组织和排列不必再跟着文件系统走，还能以在线资源链接的形式补充额外的帮助内容，像这样：

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<Pack>
  <Topic title="Overview">
    <UriItem title="Explanation An Introduction to VL.OpenCV" link="https://youtu.be/4hPH5CokxwQ" mediaType="video"/>
    <UriItem title="Reference Finders" link="https://vvvv.gitbooks.io/the-gray-book/content/en/reference/hde/finders.html" mediaType="text"/>
  </Topic>
  <Topic title="Topics">
    <Subtopic title="Images">
      <VLDocument link="Topics\Images\HowTo Draw images.vl" tags="picture render"/>
    </Subtopic>
  </Topic>
</Pack>
```

注意 UriItem 元素上可以给一个 “mediaType” 属性，取值为 “text” 或 “video”，相应的小图标会显示在条目标题后面。

搜索会覆盖条目标题里的所有词。如果你想加入更多塞不进标题的搜索词，用 “tags” 属性写一串空格分隔的搜索词。

## Help Flags / 帮助标记 {#help-flags}

*help flag*（帮助标记）用来指定：当用户选中某个节点并按 <span class="keyseq"><kbd>F1</kbd></span> 时，该打开哪一份 HowTo 草图。

在一份 HowTo 草图里，选中你希望「按 F1 时打开本草图」的那个节点，按 <span class="keyseq"><kbd>Ctrl</kbd><kbd>H</kbd></span>。这会设下一个高优先级的帮助标记。再按一次改成低优先级，按第三次则清除这个帮助标记。

![](https://thegraybook.vvvv.org/images/libraries/helpflags-a2c55.png)
FileReader 带一个高优先级帮助标记，SplitToLines 带一个低优先级的

### High vs. Low Priority / 高优先级与低优先级 {#high-vs-low-priority}

在某个节点上按 <span class="keyseq"><kbd>F1</kbd></span> 时，系统会遍历这个库所有 HowTo 草图里的帮助标记。一旦遇到针对该节点的高优先级标记，就把那份草图作为帮助文档显示出来。所以一个节点的高优先级帮助标记只设一次才讲得通。

![](https://thegraybook.vvvv.org/images/libraries/helpflags-7a40e.png)
气泡提示这份帮助文档是为哪个节点打开的

按下 <span class="keyseq"><kbd>F1</kbd></span> 之后，用户若还想看这个节点的节点信息，帮助面板会列出所有「为它设了低优先级帮助标记」的 HowTo 草图。所以在不同 HowTo 草图里为同一个节点设多个低优先级标记是有意义的 —— 那表示找这个节点的用例时，这几份草图也值得一看。

### Help flag indicator / 帮助标记指示器 {#help-flag-indicator}

最终用户不需要看到帮助标记，所以打开帮助文档时它们默认隐藏。用帮助标记指示器可以把它们显示出来。

![](https://thegraybook.vvvv.org/images/libraries/helpflags-21aea.png)
帮助标记指示器，表示这份 HowTo 草图设了帮助标记

### 排查问题 {#troubleshooting}

![](https://thegraybook.vvvv.org/images/libraries/helpflags-79980.png)
警告：这个节点上没法设帮助标记

如果你看到这个警告，检查以下几点：

* 确认你正在添加帮助文档的那个包，是作为[源码包仓库](/extending/contributing#source-package-repositories)被引用的
* 确认你想设帮助标记的那个节点，与你眼下正在准备的这份帮助文档定义在同一个包里
* 如果警告还在，保存你的帮助文档，重启 vvvv，重新打开这份草图，再试一次
