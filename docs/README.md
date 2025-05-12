# Fantastic UI 组件库

Fantastic UI 是一个基于 uni-app 的跨平台 UI 组件库，旨在提供统一、美观、高效的用户界面组件，支持多端适配，包括 H5、微信小程序、App 等平台。

## 特性

-   🔥 **跨平台**：一套代码，多端运行，支持 H5、微信小程序、App 等
-   🎨 **美观**：遵循现代设计趋势，提供精美的视觉体验
-   💪 **TypeScript**：使用 TypeScript 开发，提供完善的类型定义
-   📱 **响应式**：组件自适应不同屏幕尺寸
-   🚀 **高性能**：组件性能优化，流畅的用户体验
-   🛠️ **可定制**：提供丰富的主题定制能力

## 安装

```bash
# 使用 npm
npm install fantastic-ui

# 使用 yarn
yarn add fantastic-ui

# 使用 pnpm
pnpm add fantastic-ui
```

## 快速上手

```js
// main.js
import Vue from "vue";
import FantasticUI from "fantastic-ui";

Vue.use(FantasticUI);
```

## 按需引入

```js
// 按需引入
import { FancButton, FancIcon } from "fantastic-ui";

Vue.component(FancButton.name, FancButton);
Vue.component(FancIcon.name, FancIcon);
```

## 组件列表

-   Button 按钮
-   Icon 图标
-   Cell 单元格
-   CellGroup 单元格组

## 链接

-   [文档首页](./zh-CN/README.md)
-   [主题定制](./zh-CN/guide/theme.md)
-   [设计规范](./zh-CN/guide/design.md)

