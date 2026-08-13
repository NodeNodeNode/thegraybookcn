// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// 头部四个板块，由 `npm run gb:gen-sidebar` 依 docs/ 的实际内容生成：
// 有译文的板块走站内 sidebar，整块未翻的直接链上游英文并标「（英文）」。
// 翻到哪个板块，重新生成即自动转为站内链接，这里不需要手改。
const navbarSections = require('./translation/navbar-sections.json').map((s) =>
  s.type === 'docSidebar'
    ? {type: 'docSidebar', sidebarId: s.sidebarId, position: 'left', label: s.label}
    : {href: s.href, position: 'left', label: s.label, className: 'gb-en-link'},
);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '灰皮书',
  tagline: 'vvvv gamma 中文文档',
  url: 'https://docs.nodenodenode.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  // 译文标题全部钉死上游英文锚点（## 中文标题 {#english-slug}），锚点正确性
  // 因此是可以被构建期强制的，不该靠人肉复查。
  onBrokenAnchors: 'throw',
  favicon: 'img/favicon.ico',
  markdown: {
    // 'detect' = .md 走 CommonMark、.mdx 才走 MDX。
    // 上游有大量内嵌 HTML（<kbd>×416、<span class="keyseq">×224、<center>×107）
    // 和裸花括号（{no-inheritance} 之类），在 MDX 下全是硬错误；CommonMark 模式
    // 会额外挂 rehype-raw 把它们当原生 HTML 渲染。admonition 是无条件挂载的
    // remark 插件，与 format 无关，:::note 照常可用。
    // 个别页面需要 JSX 组件时，改成 .mdx 后缀即可单独豁免。
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  organizationName: 'NodeNodeNode', // GitHub org/user name.
  projectName: 'thegraybookcn', // Repo name.
  // 像素字体是首屏唯一的外部资源请求，preload 早一个 RTT 拿到，
  // 避免导航和侧边栏先闪一下系统字体再跳成点阵字。
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/fusion-pixel-12-subset.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
  ],
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // docs/ 下的路径与上游 1:1（同步主键），URL 由每页 frontmatter 的 slug 决定。
          // routeBasePath 设成 '/' 之后，URL 形如 /develop-environment/the-node-browser，
          // 与上游 .../reference/hde/the_nodebrowser.html 对称。首页仍由
          // src/pages/index.js 占据 '/'（只要没有 doc 的 slug 是 '/' 就不冲突）。
          routeBasePath: '/',
          // 关掉「文件名数字前缀」解析。它默认会把 `5.x.md` 开头的 `5.` 当成排序前缀剥掉，
          // 于是 5.x / 6.x / 7.x 三页的 doc id 全变成 `x` 直接撞车，构建失败。
          // 我们的文件名与上游 1:1，顺序完全由 toc 决定，这个机制对本站有害无益。
          numberPrefixParser: false,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/NodeNodeNode/thegraybookcn/edit/main/',
        },
        // 纯文档站，不要博客
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        // 三态语义：用户没手动选过就跟随系统。与上游的 light/dark/auto 结构同构。
        respectPrefersColorScheme: true,
      },
      // 上游右侧目录只收 h2，跟随
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 2,
      },
      navbar: {
        logo: {
          alt: '灰皮书',
          src: 'img/logo.svg',
        },
        items: navbarSections,
      },
      // 扁平单行，不用三栏分组 —— 文档站的页脚没必要做成站点地图。
      // vvvv 论坛与 Matrix 都能从「原文站点」到达，社群入口交给 Discord 和主站。
      footer: {
        style: 'light',
        links: [
          {label: '关于翻译', to: '/intro'},
          // 这两页此前没有任何入口，是读者点不到的孤儿页。
          {label: '帮我们改进', to: '/about-translation/how-to-join'},
          {label: '原文站点', href: 'https://thegraybook.vvvv.org/'},
          {label: 'GitHub', href: 'https://github.com/NodeNodeNode/thegraybookcn'},
          {label: 'Discord', href: 'https://discord.com/invite/yBWCJQQ4Pq'},
          {label: 'nodenodenode.net', href: 'https://www.nodenodenode.net/'},
        ],
        // 三句都不能省：非官方声明与 AI 翻译声明是对读者诚实
        // （读者有权知道自己读的是机器初翻，好据此决定要不要核对原文），
        // 字体署名是 OFL 的许可要求。
        copyright:
          `© ${new Date().getFullYear()} vvvv community cn · 社区中文翻译，非官方站点 · ` +
          'AI 翻译 + 人工校对，读着不顺请<a href="/about-translation/how-to-join">帮我们改进</a> · ' +
          '字体 Fusion Pixel Font (OFL)',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
    }),
};

module.exports = config;
