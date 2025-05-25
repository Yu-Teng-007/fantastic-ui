# Fantastic UI 组件库

基于 uni-app 的轻量级跨平台 UI 组件库，提供高质量的移动端组件，支持 H5、App、小程序等多平台。

## 特性

-   🌈 **多平台兼容**: 一套代码，多端运行，支持 H5、iOS、Android 和各类小程序平台
-   🚀 **性能优先**: 追求轻量化设计，确保高性能体验
-   💎 **精致 UI**: 提供统一、美观的视觉体验
-   🧩 **可定制主题**: 灵活的主题配置，支持品牌定制
-   📦 **即插即用**: 支持按需引入组件
-   📱 **全面适配**: 针对不同尺寸设备进行优化


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

-   表单组件
    -   Cascader 级联选择器：支持多级数据选择，内置纯弹窗模式，可自定义弹出位置和样式
    -   Calendar 日历：支持单选、多选、范围选择等多种模式的日历组件
    -   Checkbox 复选框：用于在选中和非选中状态之间进行切换
    -   Field 输入框：支持文本输入、多行文本等多种类型

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

## 代码格式化规范

项目使用 Prettier 进行代码格式化，确保团队代码风格统一。

### 格式化配置

主要格式化规则：
- 使用双引号 `"` 而非单引号 `'`
- 每行最大长度为 100 字符
- 使用 2 个空格缩进
- 语句末尾使用分号
- 使用 ES5 风格的尾随逗号
- 箭头函数参数始终使用括号
- Vue 文件中的 script 和 style 块不缩进

### 如何使用

1. **自动格式化**：
   - 在保存文件时自动格式化（需要 VSCode + Prettier 插件）
   - 使用命令行：`npm run format` 或 `yarn format`

2. **检查格式问题**：
   - 使用命令行：`npm run format:check` 或 `yarn format:check`

3. **编辑器配置**：
   - 项目根目录已配置 `.vscode/settings.json`，使用 VSCode 可以自动格式化代码
   - 需要安装 [Prettier 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 注意事项

- 提交代码前请确保已格式化
- 若需特殊处理某些文件，可在 `.prettierignore` 中配置
