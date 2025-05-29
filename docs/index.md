# Fantastic UI 组件库

Fantastic UI 是一个功能丰富、易于使用的移动端 UI 组件库，提供了丰富的基础组件和高级组件，帮助开发者快速构建美观、一致的用户界面。

## 组件总览

### 基础组件

| 组件名 | 描述 | 文档链接 |
| --- | --- | --- |
| fanc-button | 按钮组件，支持多种样式、尺寸和状态 | [查看文档](./components/fanc-button.md) |
| fanc-icon | 图标组件，提供丰富的图标集合 | [查看文档](./components/fanc-icon.md) |
| fanc-cell | 单元格组件，用于列表展示 | [查看文档](./components/fanc-cell.md) |
| fanc-cell-group | 单元格组组件，对单元格进行分组展示 | [查看文档](./components/fanc-cell-group.md) |
| fanc-image | 图片组件，支持懒加载、预览和加载失败提示 | [查看文档](./components/fanc-image.md) |
| fanc-popup | 弹出层组件，支持多个方向弹出 | [查看文档](./components/fanc-popup.md) |

### 表单组件

| 组件名 | 描述 | 文档链接 |
| --- | --- | --- |
| fanc-form | 表单组件，用于数据收集和验证 | [查看文档](./components/fanc-form.md) |
| fanc-field | 输入框组件，支持多种输入类型 | [查看文档](./components/fanc-field.md) |
| fanc-checkbox | 复选框组件，用于多选场景 | [查看文档](./components/fanc-checkbox.md) |
| fanc-checkbox-group | 复选框组组件，管理多个复选框 | [查看文档](./components/fanc-checkbox-group.md) |
| fanc-radio | 单选框组件，用于单选场景 | [查看文档](./components/fanc-radio.md) |
| fanc-radio-group | 单选框组组件，管理多个单选框 | [查看文档](./components/fanc-radio-group.md) |
| fanc-stepper | 步进器组件，用于数量选择 | [查看文档](./components/fanc-stepper.md) |
| fanc-search | 搜索组件，用于搜索内容 | [查看文档](./components/fanc-search.md) |
| fanc-signature | 签名组件，用于电子签名 | [查看文档](./components/fanc-signature.md) |

### 反馈组件

| 组件名 | 描述 | 文档链接 |
| --- | --- | --- |
| fanc-toast | 轻提示组件，用于简短的消息提示 | [查看文档](./components/fanc-toast.md) |
| fanc-dialog | 对话框组件，用于重要信息确认 | [查看文档](./components/fanc-dialog.md) |
| fanc-action-sheet | 动作面板组件，用于展示一组操作选项 | [查看文档](./components/fanc-action-sheet.md) |
| fanc-message | 消息提示组件，用于操作结果反馈 | [查看文档](./components/fanc-message.md) |

### 展示组件

| 组件名 | 描述 | 文档链接 |
| --- | --- | --- |
| fanc-noticebar | 公告栏组件，用于循环播放通知内容 | [查看文档](./components/fanc-noticebar.md) |
| fanc-swipe-cell | 滑动单元格组件，用于展示操作按钮 | [查看文档](./components/fanc-swipe-cell.md) |
| fanc-popover | 气泡弹出框组件，用于展示临时信息 | [查看文档](./components/fanc-popover.md) |

### 导航组件

| 组件名 | 描述 | 文档链接 |
| --- | --- | --- |
| fanc-dropdown-menu | 下拉菜单组件，用于筛选和排序 | [查看文档](./components/fanc-dropdown-menu.md) |

### 高级组件

| 组件名 | 描述 | 文档链接 |
| --- | --- | --- |
| fanc-number-keyboard | 数字键盘组件，用于数字输入 | [查看文档](./components/fanc-number-keyboard.md) |
| fanc-picker | 选择器组件，用于单列或多列选择 | [查看文档](./components/fanc-picker.md) |
| fanc-date-picker | 日期选择器组件，用于日期选择 | [查看文档](./components/fanc-date-picker.md) |
| fanc-calendar | 日历组件，用于日期范围选择 | [查看文档](./components/fanc-calendar.md) |
| fanc-cascader | 级联选择器组件，用于多级数据选择 | [查看文档](./components/fanc-cascader.md) |

## 使用指南

### 安装

```bash
npm install fantastic-ui
# 或
yarn add fantastic-ui
# 或
pnpm add fantastic-ui
```

### 全局引入

```javascript
import { createApp } from 'vue';
import FantasticUI from 'fantastic-ui';
import 'fantastic-ui/dist/styles/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(FantasticUI);
app.mount('#app');
```

### 按需引入

```javascript
import { createApp } from 'vue';
import { FancButton, FancIcon } from 'fantastic-ui';
import 'fantastic-ui/dist/styles/button.css';
import 'fantastic-ui/dist/styles/icon.css';
import App from './App.vue';

const app = createApp(App);
app.use(FancButton).use(FancIcon);
app.mount('#app');
```

## 设计原则

Fantastic UI 组件库遵循以下设计原则：

1. **一致性**：保持视觉和交互的一致，降低用户的认知负担
2. **易用性**：简单直观的操作方式，降低使用门槛
3. **灵活性**：提供丰富的自定义选项，满足不同场景需求
4. **美观性**：精心设计的视觉样式，提供良好的用户体验
5. **可访问性**：关注无障碍设计，让更多用户能够使用

## 贡献指南

欢迎为 Fantastic UI 贡献代码或提出建议。请参阅 [贡献指南](../CONTRIBUTING.md) 了解详情。

## 版本记录

查看 [CHANGELOG.md](../CHANGELOG.md) 了解各版本的更新内容。

## 许可证

Fantastic UI 使用 [MIT 许可证](../LICENSE)。 