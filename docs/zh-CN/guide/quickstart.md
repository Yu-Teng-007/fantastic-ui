# 快速上手

本文将介绍如何在项目中安装和使用 Fantastic UI 组件库。

## 安装

### 环境要求

-   Node.js >= 12.0.0
-   Vue >= 2.6.0 < 2.7.0
-   uni-app 框架

### 使用包管理器安装

我们推荐使用 npm 或 yarn 安装：

```bash
# 使用 npm
npm install fantastic-ui --save

# 使用 yarn
yarn add fantastic-ui

# 使用 pnpm (推荐)
pnpm add fantastic-ui
```

> 注意：如果您的网络环境不佳，推荐使用国内镜像源安装：
>
> ```bash
> # npm 设置淘宝镜像
> npm config set registry https://registry.npmmirror.com
>
> # yarn 设置淘宝镜像
> yarn config set registry https://registry.npmmirror.com
>
> # pnpm 设置淘宝镜像
> pnpm config set registry https://registry.npmmirror.com
> ```

## 引入组件库

### 完整引入

在 main.js 中引入并安装 Fantastic UI：

```js
import Vue from "vue";
import FantasticUI from "fantastic-ui";
import App from "./App";

Vue.use(FantasticUI);

new Vue({
    el: "#app",
    render: (h) => h(App),
});
```

### 按需引入

如果您只需要使用部分组件，可以采用按需引入的方式：

```js
import Vue from "vue";
import { FancButton, FancIcon } from "fantastic-ui";
import App from "./App";

Vue.component(FancButton.name, FancButton);
Vue.component(FancIcon.name, FancIcon);
// 或者使用 Vue.use
Vue.use(FancButton);
Vue.use(FancIcon);

new Vue({
    el: "#app",
    render: (h) => h(App),
});
```

## 使用组件

安装并引入组件库后，您可以在模板中直接使用：

```html
<template>
    <div>
        <fanc-button type="primary">主要按钮</fanc-button>
        <fanc-button type="success">成功按钮</fanc-button>
        <fanc-icon name="home"></fanc-icon>
    </div>
</template>
```

## 自定义主题

Fantastic UI 支持主题定制，您可以通过修改 SCSS 变量来定制组件样式：

1. 创建一个 SCSS 文件，例如 `theme.scss`：

```scss
// 修改主题颜色
$fanc-primary-color: #6200ea;
$fanc-success-color: #00c853;
$fanc-warning-color: #ffab00;
$fanc-danger-color: #d50000;

// 引入组件库样式
@import "fantastic-ui/styles/index.scss";
```

2. 在 `main.js` 中引入该文件：

```js
import Vue from "vue";
import FantasticUI from "fantastic-ui";
import "./theme.scss";

Vue.use(FantasticUI);
```

更多主题定制方法，请参考[主题定制](./theme.md)章节。

## 常见问题

如果您在使用过程中遇到问题，可以：

1. 查看[常见问题](./faq.md)文档
2. 提交 [GitHub Issue](https://github.com/yourusername/fantastic-ui/issues)
3. 加入我们的交流群获取帮助

## 示例项目

我们提供了一个完整的示例项目，您可以通过以下命令克隆并运行：

```bash
# 克隆示例项目
git clone https://github.com/yourusername/fantastic-ui-demo.git

# 安装依赖
cd fantastic-ui-demo
npm install

# 启动项目
npm run dev
```

## 下一步

-   阅读[组件文档](../components/button.md)了解各个组件的使用方法
-   学习[主题定制](./theme.md)以满足您的个性化需求
