# Fantastic-UI 项目文件作用说明

本文档对项目中的主要文件和目录进行了分类和功能说明，帮助开发者快速了解项目结构。

## 项目根目录文件

| 文件名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `README.md` | 文档 | 项目主要说明文档，包含项目介绍、特性、安装和使用方法 |
| `package.json` | 配置 | 定义项目依赖、脚本命令和基本信息 |
| `package-lock.json` | 配置 | 锁定安装时的包的版本号，确保不同环境下安装的模块版本一致 |
| `yarn.lock` | 配置 | Yarn包管理器的依赖锁定文件 |
| `babel.config.js` | 配置 | Babel转译器配置，设置JavaScript编译规则 |
| `postcss.config.js` | 配置 | PostCSS配置文件，用于CSS转换和处理 |
| `shims-vue.d.ts` | 类型定义 | Vue文件的TypeScript声明文件 |
| `shims-uni.d.ts` | 类型定义 | uni-app相关的TypeScript声明文件 |
| `.gitignore` | 配置 | 指定Git版本控制忽略的文件 |
| `.cursorrules` | 配置 | Cursor编辑器项目规范配置文件 |

## src目录 - 核心源码

### 入口文件

| 文件名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `main.js` | 代码 | 应用程序入口文件，初始化Vue实例和引入全局资源 |
| `App.vue` | 组件 | 应用程序根组件，定义全局CSS和应用生命周期 |
| `index.js` | 代码 | 组件库入口文件，注册和导出所有组件 |
| `uni.promisify.adaptor.js` | 工具 | uni-app中Promise化API的适配器 |
| `uni.scss` | 样式 | uni-app全局样式变量配置 |
| `manifest.json` | 配置 | 应用配置文件，定义应用名称、版本等信息 |
| `pages.json` | 配置 | 页面路由和窗口配置文件 |

### styles目录 - 样式文件

| 文件名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `variables.css` | 样式 | 全局CSS变量定义，包含主题颜色、组件颜色等 |
| `global.scss` | 样式 | 全局基础样式定义 |
| `index.scss` | 样式 | 样式主入口文件，引入其他样式文件 |
| `example-pages.scss` | 样式 | 示例页面共享样式 |

### components目录 - UI组件

| 目录名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `fanc-button` | 组件 | 按钮组件，支持多种类型、状态和大小 |
| `fanc-icon` | 组件 | 图标组件，提供统一的图标使用方式 |
| `fanc-cell` | 组件 | 单元格组件，用于展示信息 |
| `fanc-cell-group` | 组件 | 单元格组组件，用于对单元格进行分组 |
| `fanc-popup` | 组件 | 弹出层组件，提供多方向弹出能力 |
| `fanc-message` | 组件 | 消息提示组件，用于信息反馈 |
| `fanc-noticebar` | 组件 | 通知栏组件，用于消息通知 |
| `fanc-action-sheet` | 组件 | 动作面板组件，用于展示一组操作选项 |
| `fanc-popover` | 组件 | 弹出气泡组件，用于展示轻量级信息 |
| `fanc-toast` | 组件 | 轻提示组件，用于短暂的信息提示 |
| `fanc-dialog` | 组件 | 对话框组件，用于重要信息确认 |
| `fanc-swipe-cell` | 组件 | 滑动单元格组件，提供左右滑动交互 |
| `fanc-dropdown-menu` | 组件 | 下拉菜单栏组件，提供多级菜单选择 |
| `fanc-image` | 组件 | 图片组件，提供图片加载和处理能力 |
| `fanc-calendar` | 组件 | 日历组件，提供日期选择功能 |

### plugins目录 - 插件

| 文件名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `message.js` | 代码 | Message消息提示插件，提供全局方法调用 |
| `toast.js` | 代码 | Toast轻提示插件，提供全局方法调用 |
| `dialog.js` | 代码 | Dialog对话框插件，提供全局方法调用 |

### configs目录 - 组件配置

| 文件名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `toast.js` | 配置 | Toast轻提示组件默认配置 |
| `message.js` | 配置 | Message消息提示组件默认配置 |
| `noticebar.js` | 配置 | 通知栏组件默认配置 |
| `popover.js` | 配置 | 弹出气泡组件默认配置 |
| `swipe-cell.js` | 配置 | 滑动单元格组件默认配置 |
| `dialog.js` | 配置 | 对话框组件默认配置 |
| `calendar.js` | 配置 | 日历组件默认配置及工具函数 |

## public目录 - 公共资源

存放不需要经过webpack处理的静态资源文件。

## docs目录 - 文档

| 文件名 | 类型 | 作用 |
| ----- | ---- | ---- |
| `README.md` | 文档 | 文档主页，包含组件库介绍和目录 |
| `design.md` | 文档 | 设计规范文档 |
| `button.md` | 文档 | 按钮组件文档 |
| `icon.md` | 文档 | 图标组件文档 |
| `cell.md` | 文档 | 单元格组件文档 |
| `popup.md` | 文档 | 弹出层组件文档 |
| `message.md` | 文档 | 消息提示组件文档 |
| `noticebar.md` | 文档 | 通知栏组件文档 |
| `action-sheet.md` | 文档 | 动作面板组件文档 |
| `popover.md` | 文档 | 弹出气泡组件文档 |
| `toast.md` | 文档 | 轻提示组件文档 |
| `dialog.md` | 文档 | 对话框组件文档 |
| `swipe-cell.md` | 文档 | 滑动单元格组件文档 |
| `dropdown-menu.md` | 文档 | 下拉菜单栏组件文档 |
| `image.md` | 文档 | 图片组件文档 |
| `calendar.md` | 文档 | 日历组件文档 |
| `project-analysis.md` | 文档 | 项目分析报告 |

## 文件关系图

```
fantastic-ui/
├── 入口文件 - 应用初始化和组件注册
│   ├── src/main.js - 应用入口
│   ├── src/App.vue - 根组件
│   └── src/index.js - 组件库入口
│
├── 组件系统 - UI界面构建块
│   └── src/components/ - 各类UI组件
│       ├── 基础组件 (button, icon, cell...)
│       ├── 表单组件 (calendar...)
│       ├── 反馈组件 (dialog, toast, message...)
│       └── 展示组件 (image, popover...)
│
├── 插件系统 - 全局功能注入
│   └── src/plugins/ - 提供全局方法
│       ├── message.js - 消息提示方法
│       ├── toast.js - 轻提示方法
│       └── dialog.js - 对话框方法
│
├── 配置系统 - 组件默认行为定义
│   └── src/configs/ - 各组件配置
│
├── 样式系统 - 视觉风格定义
│   └── src/styles/ - 全局样式定义
│       ├── variables.css - CSS变量
│       └── global.scss - 全局样式
│
└── 文档系统 - 使用指南
    └── docs/ - 组件和项目文档
```

## 开发流程中的文件作用

1. **开发新组件流程**：
   - 在`src/components/`下创建新组件目录
   - 实现组件核心功能 (index.vue)
   - 在`src/configs/`中添加默认配置(如需)
   - 在`src/plugins/`中添加全局方法(如需)
   - 在`src/index.js`中注册组件
   - 在`docs/`目录中添加相应文档

2. **定制主题流程**：
   - 修改`src/styles/variables.css`中的CSS变量

3. **添加新页面流程**：
   - 在`src/pages/`下创建新页面
   - 在`pages.json`中配置路由 