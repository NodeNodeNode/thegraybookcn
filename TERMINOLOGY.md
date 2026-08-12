# 术语对照表

<!-- 本文件由 `npm run gb:terms-doc` 从 translation/terms.yml 生成，不要手改。 -->

唯一真源是 [`translation/terms.yml`](translation/terms.yml)。改术语请改那份，然后重新生成本文。

翻译时不需要通读本表 —— `gb:termcard` 会针对当前页面生成一份不超过 30 条的术语卡。
本表用于查阅与审校。

共 57 条，其中待拍板 2 条。

> **开工前需拍板**：`applet`、`shader`
> 这些词 `status` 为 `open`，检查器会对它们的使用报 warn。

| 英文 | 中文 | 状态 | 规则 | 说明 |
|---|---|---|---|---|
| `patch` | 草图 | 已拍板 | 禁用：图档；禁止裸用英文；首次出现用双语并列 | 现有译文里 34 处「草图」、4 处「图档」、18 处裸用 patch。取多数派，且 「类型草图 / 文档草图」这套搭配已经长出来了。2026-08-11 由 RED 拍板。 |
| `node` | 节点 | 已拍板 | 首次出现用双语并列 | — |
| `link` | 连线 | 已拍板 | — | 指节点之间的连接。不要译成「链接」，那是 hyperlink。 |
| `pin` | 针脚 | 已拍板 | 禁用：阵脚；首次出现用双语并列 | 「阵脚」是 the_nodebrowser 那页的手误，已列入 forbid 防止复发。 |
| `IOBox` | （保留 IOBox / IOBoxes） | 保留英文 | — | 保留英文。首次出现可加括号注「输入输出盒子」，但正文一律用 IOBox。 这是 vvvv 社区口语里的固定说法，译成中文反而增加理解成本。 |
| `pad` | 数据板 | 已拍板 | 首次出现用双语并列 | 原先只有 3 处样本，暂定为「数据板」。翻 properties 页时它出现 47 次 （那是它的主场页），读下来「数据板」站得住 —— 它确实是草图里存放数据的一块板子， 与 IOBox 本质相同。2026-08-12 转为已定。 |
| `region` | 区块 | 已拍板 | 首次出现用双语并列 | — |
| `operation` | 运算器 | 已拍板 | 禁用：操作器；首次出现用双语并列 | 原译者在 language/operations.md 里专门写了 :::note 论证过这个选择 （「Operations 可以翻译成运算器，操作器等等……这里先采用运算器」）。 沿用，并把「操作器」列入 forbid。 |
| `static operation` | 静态运算器 | 已拍板 | — | — |
| `member operation` | 成员运算器 | 已拍板 | — | — |
| `process node` | 过程节点 | 已拍板 | 首次出现用双语并列 | — |
| `datatype patch` | 类型草图 | 已拍板 | — | — |
| `document patch` | 文档草图 | 已拍板 | — | — |
| `data type` | 数据类型 | 已拍板 | — | — |
| `definition` | 定义 | 已拍板 | — | Definition vs. Application 译作「定义和应用」。 |
| `instance` | 实例 | 已拍板 | — | — |
| `immutable` | 不可变 | 已拍板 | 首次出现用双语并列 | — |
| `mutable` | 可变 | 已拍板 | 首次出现用双语并列 | — |
| `Record` | （保留 Record） | 保留英文 | — | Record 与 Class 是 VL 的两种 patch 类型，保留英文。动词化时可写「记录和类运算」。 |
| `Class` | （保留 Class） | 保留英文 | — | — |
| `node browser` | 节点浏览器 | 已拍板 | — | — |
| `patch explorer` | 草图浏览器 | 已拍板 | — | 与已定的 node browser=节点浏览器 平行。它是编辑器里的一个面板， 正文用中文，指菜单项或界面标签时保留 `Patch Explorer`。 2026-08-12 翻 patch-explorer 页时定。 |
| `help browser` | 帮助面板 | 已拍板 | 禁用：帮助面包 | 「帮助面包」是手误。菜单项本身出现时保留英文 `Help Browser`。 |
| `help patch` | 帮助文档 | 已拍板 | — | — |
| `category` | 目录 | 已拍板 | 禁用：类别目录 | 指 VL 里节点的归类层级。现有译文 13 处用「目录」，C# 那页写成「类别目录」 属离群值。注意不要和文件系统的目录混淆，必要时写「节点目录」。 |
| `library` | 节点库 | 已拍板 | 禁止裸用英文 | 中文语境里不要裸用 Library。指 NuGet 包形态的第三方库时也用「节点库」。 |
| `editor extension` | 编辑器扩展 | 已拍板 | 禁用：编辑环境扩展 | 现有译文标题用「编辑器扩展」、正文链接用「编辑环境扩展」，取前者。 |
| `NuGet` | （保留 NuGet / NuGets） | 保留英文 | — | 现有译文有 nuget 22 处、Nuget 14 处、NuGet 6 处三种写法。统一为官方写法 NuGet（复数 NuGets）。检查器会跳过代码块与链接地址，nuget.org 这类不受影响。 |
| `dependency` | 依赖 | 已拍板 | 首次出现用双语并列 | — |
| `project` | 项目 | 已拍板 | — | — |
| `tag` | 标签 | 已拍板 | — | — |
| `theme` | 主题 | 已拍板 | — | — |
| `settings` | 设置 | 已拍板 | — | — |
| `Quad` | （保留 Quad） | 保留英文 | — | 编辑窗口左上角的灰色 logo 方块。首次出现时加括号释义。 |
| `spread` | （保留 Spread / Spreads） | 保留英文 | — | 保留英文。vvvv 社区口语里 Spread 就是 Spread，没有任何中译能不损失含义 （它既不是数组也不是列表，是 vvvv 特有的数据组织方式）。首次出现可加括号 简述，正文一律用 Spread。2026-08-12 由 RED 拍板。 |
| `delegate` | （保留 Delegate / Delegates） | 保留英文 | — | 保留英文。与 spread 同理，是 VL/.NET 的技术概念。2026-08-12 由 RED 拍板。 |
| `generic` | （保留 Generic / Generics） | 保留英文 | — | 保留英文。中文里「泛型」是成熟译法，但 RED 选择与 spread / delegate 保持一致， 且 VL 界面上的 `Is Generic` 本来就是英文原样呈现。2026-08-12 拍板。 |
| `group patch` | （保留 group patch / group patches / Group patch / Group Patch） | 保留英文 | — | 保留英文。2026-08-12 由 RED 拍板。 大小写放宽到四种：上游自己就不一致（groups.md 用 Group patch，patches.md 用 group patch），而作为并列的类型名（与 Document Patch / Datatype Patch 同列）时 标题式大写才是对的。句中行文用小写。 |
| `property` | 参数 | 已拍板 | — | 沿用现有译文的「参数」。注意与下面的 option 区分：过去两者都被译成「参数」， 是全书最容易混淆的一处。property 是数据类型上定义的可读写成员，option 是界面选项。 |
| `option` | 选项 | 已拍板 | — | 界面上的选项，译「选项」不译「参数」—— 后者留给 property。 这是为解开撞词而做的调整，翻译时务必按语境分清。 |
| `data hub` | 数据枢纽 | 已拍板 | 首次出现用双语并列 | 上游在 lo_0_dataHubs 里专门造了这个词，用来统称针脚这类「可以连上去的地方」， 再往下分成 data source 和 data sink 两种。译「数据枢纽」。 注意它是上位概念：正文说「针脚」时不要替换成「数据枢纽」，反之亦然。 |
| `data source` | 数据源 | 已拍板 | 首次出现用双语并列 | 与 data sink 成对。这一对是数据流的地基词，几乎每页都要用，所以先于 Language 章拍板。单说 source 时也译「数据源」—— 但「源文档」「源码」这类 与数据流无关的 source 不受本条约束，按语境正常译。 |
| `data sink` | 数据汇点 | 已拍板 | 首次出现用双语并列 | 与 data source 成对，取信号处理里 source/sink 的标准中译「源／汇」。 「汇点」比「接收端」短且不会与网络语境的「接收方」混淆。 单说 sink 时译「汇点」，正文里凡是与 source 并举处一律用全称「数据汇点」。 2026-08-12 翻 mut2 / lo_0_dataHubs 时定 —— 这两页正是定义这一对词的地方。 |
| `reference` | 引用 | 已拍板 | 首次出现用双语并列 | 指向内存中某个位置的引用，与不可变数据相对。不要译成「参考」， 也不要与 hyperlink 的「链接」或 link 的「连线」混淆。 |
| `builder` | 构建器 | 已拍板 | 首次出现用双语并列 | Builder 模式的标准中译。刻意不用「构造器」—— 那个词在 .NET 语境里 已经被 constructor 占了，两者在同一本书里撞车会很难拆。 类型名 SpreadBuilder 保留英文原样，正文泛指时用「构建器」。 |
| `aspect` | （保留 Aspect / Aspects / aspect / aspects） | 保留英文 | — | 保留英文。两个现成的中译都会撞车：「切面」是 AOP 的 aspect，和这里 「标记节点面向哪类用户」完全是两回事；「特性」在 .NET 语境里已被 Attribute 占了，而本章正好同时在讲 .NET。Aspect 的取值本身 （Advanced / Internal / Experimental / Obsolete / Adaptive） 是 VL 里的目录名，必须原样保留 —— 词保留英文，读者反而对得上界面。 大小写放宽到四种：标题式与句中式上游都在用。 |
| `adaptive` | 自适应 | 已拍板 | — | 指 VL 的 adaptive 节点体系（每个类型都能实现同一个节点签名）。 注意目录名 `Advanced`、`Math.Adaptive` 这类是界面上的字面值，保留英文。 |
| `node factory` | 节点工厂 | 已拍板 | 首次出现用双语并列 | — |
| `package repository` | 包仓库 | 已拍板 | — | 沿用 compilation.md 已有的译法。`--package-repositories` 是命令行参数， 保留英文原样。「源码包仓库」= source package-repository，同一套词。 |
| `wrapper` | 包装器 | 已拍板 | 首次出现用双语并列 | 动词 wrap 译「包装」。指把第三方 .NET 库裹成 VL 友好形态的那一层。 |
| `border control point` | 边界控制点 | 已拍板 | 首次出现用双语并列 | 区块边框上那些让数据进出的控制点。上游正文里大量简写为 BCP， 译文首次出现给出全称并标注 BCP，之后沿用 BCP —— 一页里出现几十次， 全写中文会把句子压垮。 |
| `patch inlay` | 内嵌草图 | 已拍板 | 首次出现用双语并列 | IRegion API 里指区块内部那张由用户打的草图。不译「嵌片」—— 它首先是一张草图， 「内嵌」说的是它的位置。与 region patch 是同一个东西的两种叫法。 |
| `callback` | 回调 | 已拍板 | 首次出现用双语并列 | — |
| `help flag` | 帮助标记 | 已拍板 | 首次出现用双语并列 | 不用「帮助旗标」—— 界面上它就是一个小标记，不是旗子。 |
| `Observable` | （保留 Observable / Observables） | 保留英文 | — | Rx 的核心概念，与 VL 的响应式体系直接对应。保留英文，已有译文即如此。 |
| `applet` | — | **待拍板** | — | — |
| `shader` | — | **待拍板** | 仅限 reference/libraries/ | Libraries/3D 章的术语体系，等翻到那章再统一扩表。 |
