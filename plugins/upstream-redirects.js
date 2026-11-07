// 兼容官网网址：给每篇译文在上游的路径上放一个跳转页。
//
//   thegraybook.vvvv.org/reference/hde/exporting.html#the-commandline-compiler
//   把域名换成本站 → /reference/hde/exporting.html → 跳到 /develop-environment/exporting#…
//
// 本站 URL 由 frontmatter slug 决定，和上游路径不同（见 docusaurus.config.js 里 routeBasePath 的注释），
// 读者对照官网时没法凭网址找到中文页。锚点是钉死的上游英文 id，所以 #hash 原样带过去就能落到同一节。
//
// 只在 postBuild 写静态文件，不注册路由：这些地址不进 sitemap、不进搜索索引。
// 用 JS 跳转而不是服务器 301，是因为 hash 只有浏览器端拿得到，也不依赖托管方的配置。
const fs = require('node:fs');
const path = require('node:path');

const field = (src, key) => new RegExp(`^${key}:\\s*['"]?([^'"\\n]+?)['"]?\\s*$`, 'm').exec(src)?.[1];

function collect(dir, out = []) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) collect(abs, out);
    else if (/\.mdx?$/.test(ent.name)) out.push(abs);
  }
  return out;
}

const page = (to) => `<!doctype html>
<html lang="zh-Hans">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>跳转中…</title>
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash);</script>
</head>
<body><p>正在跳转到 <a href="${to}">中文版</a>。</p></body>
</html>
`;

module.exports = function upstreamRedirects(context) {
  return {
    name: 'upstream-redirects',
    async postBuild({outDir}) {
      const base = context.siteConfig.baseUrl.replace(/\/$/, '');
      let n = 0;
      for (const file of collect(path.join(context.siteDir, 'docs'))) {
        const src = fs.readFileSync(file, 'utf8').split(/^---\s*$/m)[1] ?? '';
        const from = field(src, 'source_path');
        const slug = field(src, 'slug');
        if (!from || !slug) continue; // 中文站原创页（origin: cn）没有上游对应
        const target = path.join(outDir, from.replace(/\.mdx?$/, '.html'));
        if (fs.existsSync(target)) {
          // changelog/index.md 这类：上游路径恰好就是本页自己的输出文件，不用跳
          if (target === path.join(outDir, slug, 'index.html')) continue;
          throw new Error(`上游路径跳转页与站内文件冲突：${target}`);
        }
        fs.mkdirSync(path.dirname(target), {recursive: true});
        fs.writeFileSync(target, page(base + slug));
        n++;
      }
      console.log(`[upstream-redirects] 已生成 ${n} 个上游路径跳转页`);
    },
  };
};
