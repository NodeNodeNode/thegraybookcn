# 灰皮书 · thegraybookcn

[vvvv gamma 中文文档](https://docs.nodenodenode.net)，[the gray book](https://thegraybook.vvvv.org/) 的中文站点。

本站使用 [Docusaurus 3](https://docusaurus.io/) 构建。需要 Node.js 20 或更高版本。

### 安装

```
$ npm install
```

### 本地开发

```
$ npm start
```

启动本地开发服务器并自动打开浏览器。大部分改动会实时生效，无需重启。

### 构建

```
$ npm run build
```

生成静态文件到 `build` 目录，可用任意静态托管服务部署。构建产物可以用 `npm run serve` 本地预览。

### 部署

```
$ GIT_USER=<你的 GitHub 用户名> USE_SSH=true npm run deploy
```

如果使用 GitHub Pages 托管，这个命令会构建并推送到 `gh-pages` 分支。
