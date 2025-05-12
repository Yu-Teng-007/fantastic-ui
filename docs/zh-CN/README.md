# Fantastic UI

<p align="center">
  <img src="../../src/static/logo.png" width="200" alt="Fantastic UI Logo">
</p>

<p align="center">基于uni-app的轻量级跨平台UI组件库</p>

## 介绍

Fantastic UI 是一套基于 [uni-app](https://uniapp.dcloud.io/) 开发的跨平台 UI 组件库，致力于提供统一、美观的视觉体验。组件库采用 Vue 2 开发，支持在 H5、iOS、Android 以及各类小程序平台使用。

## 特性

-   🌈 **多平台兼容**: 一套代码，多端运行，支持 H5、iOS、Android 和各类小程序平台
-   🚀 **性能优先**: 追求轻量化设计，确保高性能体验
-   💎 **精致 UI**: 提供统一、美观的视觉体验
-   🧩 **可定制主题**: 灵活的主题配置，支持品牌定制
-   📦 **即插即用**: 支持按需引入组件
-   📱 **全面适配**: 针对不同尺寸设备进行优化

## 快速上手

### 安装

```bash
# 使用npm
npm i fantastic-ui

# 使用yarn
yarn add fantastic-ui

# 使用pnpm
pnpm add fantastic-ui
```

### 引入组件

#### 完整引入

```js
// main.js
import Vue from "vue";
import FantasticUI from "fantastic-ui";
import "fantastic-ui/lib/index.css";

Vue.use(FantasticUI);
```

#### 按需引入

```js
// main.js
import Vue from "vue";
import { FancButton, FancIcon } from "fantastic-ui";
import "fantastic-ui/lib/button/style";
import "fantastic-ui/lib/icon/style";

Vue.use(FancButton);
Vue.use(FancIcon);
```

## 浏览器兼容性

-   Android 4.4+
-   iOS 9.0+
-   支持主流小程序平台

## 组件列表

### 基础组件

-   [Button 按钮](./components/button.md)
-   [Icon 图标](./components/icon.md)
-   [Cell 单元格](./components/cell.md)
-   [CellGroup 单元格组](./components/cell-group.md)
