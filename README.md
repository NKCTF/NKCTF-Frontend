### NKCTF Front-End

#### Preparations / 准备

+ 安装 Node JS，[下载地址](https://nodejs.org/en/) [Linux](https://nodejs.org/en/download/package-manager/)
+ 建议为 Github 账户添加一个 SSH key，[操作方式](https://help.github.com/articles/connecting-to-github-with-ssh/)
+ 创建一个新的目录，建议使用`NKCTF`
+ `cd NKCTF` 后执行
`git clone git@github.com:NKCTF/NKCTF-Frontend.git frontend`，
需要已经配置好的 SSH key。如果没有配置，也可以使用 HTTPS 方式。
+ `cd frontend` 后执行 `npm install`。如果提示找不到 npm，
请尝试将 node/bin 添加到环境变量，小娜搜索 `path` -> 环境变量 -> 上面的 PATH -> 添加 `C:\Program Files\nodejs`
+ `npm run dev` 后访问 `http://localhost:8080` (如被占用，则是 808*，查看 output） 即可

### Structure / 项目结构

+ 项目入口点是 package.json，里的 scripts 项对应 `npm run build` 和 `npm run dev` 指令
+ webpack 会从 webpack.config.js 读取配置文件并打包应用
+ 代码在 `src/`，入口点是 index.js，路由在其中定义
+ 组件模板在 `src/template.vue`，创建新组件时将其复制一份，放在 `src/components` (代码中用 **@c/** 指代），并将 `export default` 里的 `name` 改成唯一的就可以愉快的使用了。
+ 建议 `@c`  中只放置路由或弹窗，具体组件放置在对应文件夹中，参考 `@c/navbar.vue`
+ 资源文件在 `src/resources` 中，代码中用 **@r/** 指代
+ `src/css` 中的文件应用于整个项目，可在 `template.vue的拷贝` 中修改 style 标签内容以

### Frameworks / 所用框架

+ [webpack](https://webpack.js.org/)
+ [Vue](https://vuejs.org/)
+ [Vuex](https://vuex.vuejs.org/)
+ [Vue Router](https://router.vuejs.org/)
+ [Bulma](https://bulma.io/)

### Why not webpack-merge? / 为什么不用 webpack-merge？

It merges Function -> string... wasting my sometime to debug, I hate it.

### Why vcss? / 为什么定义了 vcss？

目前 vue-loader 和 style-loader/url 不能协作，需要单独定义规则。
希望未来会修复这些兼容性问题QAQ
