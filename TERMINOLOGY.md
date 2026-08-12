# 术语对照表

<!-- 本文件由 `npm run gb:terms-doc` 从 translation/terms.yml 生成，不要手改。 -->

唯一真源是 [`translation/terms.yml`](translation/terms.yml)。改术语请改那份，然后重新生成本文。

翻译时不需要通读本表 —— `gb:termcard` 会针对当前页面生成一份不超过 30 条的术语卡。
本表用于查阅与审校。

共 43 条，其中待拍板 4 条。

> **开工前需拍板**：`sink`、`source`、`applet`、`shader`
> 这些词 `status` 为 `open`，检查器会对它们的使用报 warn。

| 英文 | 中文 | 状态 | 规则 | 说明 |
|---|---|---|---|---|
| `patch` | 草图 | 已拍板 | 禁用：图档；禁止裸用英文；首次出现用双语并列 | 现有译文里 34 处「草图」、4 处「图档」、18 处裸用 patch。取多数派，且 「类型草图 / 文档草图」这套搭配已经长出来了。2026-08-11 由 RED 拍板。 |
| `node` | 节点 | 已拍板 | 首次出现用双语并列 | — |
| `link` | 连线 | 已拍板 | — | 指节点之间的连接。不要译成「链接」，那是 hyperlink。 |
| `pin` | 针脚 | 已拍板 | 禁用：阵脚；首次出现用双语并列 | 「阵脚」是 the_nodebrowser 那页的手误，已列入 forbid 防止复发。 |
| `IOBox` | （保留 IOBox / IOBoxes） | 保留英文 | — | 保留英文。首次出现可加括号注「输入输出盒子」，但正文一律用 IOBox。 这是 vvvv 社区口语里的固定说法，译成中文反而增加理解成本。 |
| `pad` | 数据板 | 暂定 | 首次出现用双语并列 | 现有译文用「数据板」但只有 3 处，样本量小，后续 Language 章可推翻。 |
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
| `sink` | — | **待拍板** | — | Language 章 execution-order 等页会用到。 |
| `source` | — | **待拍板** | — | 与 sink 成对，一起定。 |
| `applet` | — | **待拍板** | — | — |
| `shader` | — | **待拍板** | 仅限 reference/libraries/ | Libraries/3D 章的术语体系，等翻到那章再统一扩表。 |
