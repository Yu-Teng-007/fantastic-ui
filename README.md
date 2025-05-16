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

- [开发文档](docs/README.md)
- [设计规范](docs/core/design.md)
- [项目分析报告](docs/core/project-analysis.md)
- [项目文件说明](docs/core/project-files.md)
- [项目架构和逻辑结构](docs/core/project-architecture.md)

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
    -   Button 按钮：支持多种类型、状态、形状和尺寸，包括阴影、细边框等特性
    -   Icon 图标：支持自定义颜色和大小的图标系统
    -   Cell 单元格：用于展示信息的列表项
    -   CellGroup 单元格组：对单元格进行分组

## 版本

当前版本: v0.1.1

### 更新日志

#### v0.1.1

-   完善按钮组件，新增 info 类型按钮
-   新增细边框(hairline)和阴影(shadow)功能
-   支持自定义图标大小和颜色
-   优化样式系统，使用统一的变量

#### v0.1.0

-   首次发布
-   基础组件实现

## 开源协议

本项目基于 [MIT 协议](LICENSE)
