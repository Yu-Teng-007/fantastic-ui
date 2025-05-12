# Fantastic UI 组件库

基于 uni-app 的轻量级跨平台 UI 组件库，提供高质量的移动端组件，支持 H5、App、小程序等多平台。

## 特性

-   🌈 **多平台兼容**: 一套代码，多端运行，支持 H5、iOS、Android 和各类小程序平台
-   🚀 **性能优先**: 追求轻量化设计，确保高性能体验
-   💎 **精致 UI**: 提供统一、美观的视觉体验
-   🧩 **可定制主题**: 灵活的主题配置，支持品牌定制
-   📦 **即插即用**: 支持按需引入组件
-   📱 **全面适配**: 针对不同尺寸设备进行优化

## 文档

-   [文档首页](docs/zh-CN/README.md)
-   [快速上手](docs/zh-CN/guide/quickstart.md)
-   [主题定制](docs/zh-CN/guide/theme.md)
-   [设计规范](docs/zh-CN/guide/design.md)
-   [贡献指南](docs/zh-CN/guide/contribution.md)

## 安装

```bash
# 使用npm
npm i fantastic-ui

# 使用yarn
yarn add fantastic-ui

# 使用pnpm
pnpm add fantastic-ui
```

## 快速上手

在项目入口文件中引入组件库：

```js
// main.js
import Vue from "vue";
import FantasticUI from "fantastic-ui";

Vue.use(FantasticUI);
```

按需引入组件：

```js
// main.js
import Vue from "vue";
import { FancButton, FancIcon } from "fantastic-ui";

Vue.use(FancButton);
Vue.use(FancIcon);
```

## 组件列表

-   基础组件
    -   Button 按钮
    -   Icon 图标
    -   Cell 单元格
    -   CellGroup 单元格组

## 版本

当前版本: v0.1.0

## 开源协议

本项目基于 [MIT 协议](LICENSE)
