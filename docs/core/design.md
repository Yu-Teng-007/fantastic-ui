# Fantastic UI 设计规范

## 设计理念

Fantastic UI 设计系统基于简洁性、一致性和易用性的核心理念，旨在提供优雅、高效的跨平台用户界面体验。我们的设计遵循"以用户为中心"的原则，保持视觉语言的统一，确保组件在不同平台上保持一致的外观和行为。

## 颜色系统

### 主色板

| 颜色类型 | 色值    | 应用场景                     |
| -------- | ------- | ---------------------------- |
| 主色     | #007bff | 主要按钮、强调元素、活跃状态 |
| 成功色   | #28a745 | 成功状态、完成操作提示       |
| 警告色   | #ffc107 | 警告提示、需要注意的操作     |
| 危险色   | #dc3545 | 错误提示、危险操作、删除操作 |
| 信息色   | #17a2b8 | 信息提示、辅助说明           |

### 中性色板

| 颜色类型 | 色值    | 应用场景           |
| -------- | ------- | ------------------ |
| 纯黑     | #000000 | 特殊强调文字       |
| 主要文本 | #333333 | 主要文字内容       |
| 次要文本 | #666666 | 次要文字、说明文字 |
| 辅助文本 | #999999 | 辅助文字、提示文字 |
| 占位文本 | #cccccc | 输入框占位符       |
| 边框颜色 | #e4e7ed | 边框、分割线       |
| 背景色   | #f5f7fa | 页面背景、卡片背景 |
| 纯白     | #ffffff | 卡片背景、文字背景 |

### 透明度使用规范

| 透明度值 | 应用场景                 |
| -------- | ------------------------ |
| 90%      | 重要元素，需要明显强调   |
| 70%      | 次要元素，保持较高可见度 |
| 50%      | 辅助元素，半透明效果     |
| 30%      | 禁用状态，弱化显示       |
| 10%      | 极弱提示，轻微背景变化   |

### SCSS 变量

```scss
// 主色板
$primary-color: #007bff;
$success-color: #28a745;
$warning-color: #ffc107;
$danger-color: #dc3545;
$info-color: #17a2b8;

// 中性色板
var(--black): #000000;
var(--text-primary): #333333;
$text-secondary: #666666;
$text-assist: #999999;
$text-placeholder: #cccccc;
var(--border-color): #e4e7ed;
$background-color: #f5f7fa;
var(--white): #ffffff;
```

## 字体规范

### 字体家族

```scss
$font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
```

### 字号体系

| 用途      | 字号 | 字重 | 行高 |
| --------- | ---- | ---- | ---- |
| 主标题    | 20px | 600  | 1.4  |
| 次级标题  | 18px | 600  | 1.4  |
| 小标题    | 16px | 600  | 1.4  |
| 正文-大   | 16px | 400  | 1.5  |
| 正文-标准 | 14px | 400  | 1.5  |
| 正文-小   | 12px | 400  | 1.5  |
| 辅助文字  | 12px | 400  | 1.5  |

### SCSS 变量

```scss
// 字体家族
$font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;

// 字号
$font-size-xl: 20px; // 主标题
$font-size-lg: 18px; // 次级标题
$font-size-md: 16px; // 小标题/正文大
$font-size-base: 14px; // 正文标准
$font-size-sm: 12px; // 正文小/辅助文字

// 字重
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;

// 行高
$line-height-tight: 1.4; // 标题行高
$line-height-base: 1.5; // 正文行高
```

## 间距规范

我们采用 4px 的基础网格系统，所有间距都应是 4 的倍数：

| 间距名称     | 数值 | 使用场景                     |
| ------------ | ---- | ---------------------------- |
| $spacing-xs  | 4px  | 极小间距，图标与文字间距     |
| $spacing-sm  | 8px  | 小间距，紧凑布局元素间距     |
| $spacing-md  | 12px | 中等间距，常规元素间距       |
| $spacing-lg  | 16px | 大间距，卡片内边距、分组间距 |
| $spacing-xl  | 24px | 特大间距，区块间隔           |
| $spacing-xxl | 32px | 最大间距，页面主要区块分隔   |

### SCSS 变量

```scss
// 间距系统
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;
$spacing-lg: 16px;
$spacing-xl: 24px;
$spacing-xxl: 32px;
```

## 圆角规范

| 圆角类型              | 数值 | 使用场景             |
| --------------------- | ---- | -------------------- |
| $border-radius-none   | 0    | 无圆角，方形元素     |
| $border-radius-sm     | 2px  | 小圆角，紧凑型组件   |
| $border-radius-md     | 4px  | 标准圆角，大多数元素 |
| $border-radius-lg     | 8px  | 大圆角，卡片、弹窗   |
| $border-radius-xl     | 16px | 特大圆角，浮动按钮   |
| $border-radius-circle | 50%  | 圆形元素，头像、徽标 |

### SCSS 变量

```scss
// 圆角系统
$border-radius-none: 0;
$border-radius-sm: 2px;
$border-radius-md: 4px;
$border-radius-lg: 8px;
$border-radius-xl: 16px;
$border-radius-circle: 50%;
```

## 阴影规范

| 阴影类型   | 样式                        | 使用场景             |
| ---------- | --------------------------- | -------------------- |
| $shadow-sm | 0 2px 5px rgba(0,0,0,0.05)  | 轻微提升，如卡片     |
| $shadow-md | 0 4px 10px rgba(0,0,0,0.1)  | 中等提升，如弹出菜单 |
| $shadow-lg | 0 8px 20px rgba(0,0,0,0.15) | 显著提升，如模态框   |
| $shadow-xl | 0 12px 40px rgba(0,0,0,0.2) | 最大提升，如重要弹窗 |

### SCSS 变量

```scss
// 阴影系统
$shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 10px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.15);
$shadow-xl: 0 12px 40px rgba(0, 0, 0, 0.2);
```

## 动画与过渡

### 时长

| 时长类型       | 数值  | 使用场景             |
| -------------- | ----- | -------------------- |
| $duration-fast | 150ms | 微小动效，如按钮点击 |
| $duration-base | 300ms | 基础动效，如弹窗弹出 |
| $duration-slow | 500ms | 较慢动效，如页面切换 |

### 缓动函数

| 类型 | 函数                                   | 使用场景           |
| ---- | -------------------------------------- | ------------------ |
| 标准 | cubic-bezier(0.34, 0.69, 0.1, 1)       | 大多数过渡效果     |
| 进入 | cubic-bezier(0, 0, 0.2, 1)             | 元素进入动画       |
| 退出 | cubic-bezier(0.4, 0, 1, 1)             | 元素退出动画       |
| 弹性 | cubic-bezier(0.68, -0.55, 0.265, 1.55) | 需要弹性效果的元素 |

### SCSS 变量

```scss
// 动画时长
$duration-fast: 150ms;
$duration-base: 300ms;
$duration-slow: 500ms;

// 缓动函数
$easing-standard: cubic-bezier(0.34, 0.69, 0.1, 1);
$easing-enter: cubic-bezier(0, 0, 0.2, 1);
$easing-exit: cubic-bezier(0.4, 0, 1, 1);
$easing-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 布局规范

### 响应式断点

| 断点名称 | 宽度范围 | 对应设备       |
| -------- | -------- | -------------- |
| xs       | <576px   | 小型手机屏幕   |
| sm       | ≥576px   | 大型手机屏幕   |
| md       | ≥768px   | 平板设备       |
| lg       | ≥992px   | 小型桌面显示器 |
| xl       | ≥1200px  | 大型桌面显示器 |

### 栅格系统

采用 12 列栅格系统，支持响应式布局：

-   容器外边距: 16px
-   列间距: 8px (小屏), 16px (大屏)

### SCSS 变量

```scss
// 响应式断点
$breakpoint-xs: 576px;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;

// 栅格系统
$grid-columns: 12;
$grid-gutter-width: 16px;
$grid-gutter-width-sm: 8px;
```

## 组件设计规范

### 按钮规范

| 按钮类型 | 尺寸 (高度) | 内边距 | 字号 | 圆角 |
| -------- | ----------- | ------ | ---- | ---- |
| 大号按钮 | 44px        | 16px   | 16px | 4px  |
| 标准按钮 | 36px        | 12px   | 14px | 4px  |
| 小型按钮 | 28px        | 8px    | 12px | 4px  |
| 迷你按钮 | 24px        | 4px    | 12px | 2px  |

### 表单元素规范

| 元素类型 | 高度   | 内边距    | 字号 | 边框              |
| -------- | ------ | --------- | ---- | ----------------- |
| 输入框   | 36px   | 水平 12px | 14px | 1px solid #e4e7ed |
| 多行文本 | 自适应 | 12px      | 14px | 1px solid #e4e7ed |
| 选择器   | 36px   | 水平 12px | 14px | 1px solid #e4e7ed |

### 卡片组件规范

| 卡片类型 | 内边距 | 圆角 | 阴影       |
| -------- | ------ | ---- | ---------- |
| 标准卡片 | 16px   | 8px  | $shadow-sm |
| 突出卡片 | 16px   | 8px  | $shadow-md |

### SCSS 变量

```scss
// 按钮规范
$button-height-lg: 44px;
$button-height-md: 36px;
$button-height-sm: 28px;
$button-height-xs: 24px;

$button-padding-lg: 16px;
$button-padding-md: 12px;
$button-padding-sm: 8px;
$button-padding-xs: 4px;

// 表单元素规范
$input-height: 36px;
$input-padding: 12px;
$input-font-size: 14px;
$input-border: 1px solid var(--border-color);

// 卡片规范
$card-padding: 16px;
$card-border-radius: 8px;
$card-shadow: $shadow-sm;
$card-shadow-prominent: $shadow-md;
```

## 图标规范

### 尺寸规范

| 图标类型 | 尺寸  | 使用场景           |
| -------- | ----- | ------------------ |
| 迷你图标 | 12px  | 极小场景、标签     |
| 小图标   | 16px  | 辅助说明、菜单图标 |
| 中图标   | 20px  | 标准场景、按钮图标 |
| 大图标   | 24px  | 主要操作图标       |
| 特大图标 | 32px+ | 特殊场景、空状态   |

### 图标风格

保持一致的视觉风格：

-   线条粗细统一
-   拐角圆润度一致
-   留白比例协调
-   视觉重量平衡

### SCSS 变量

```scss
// 图标尺寸
$icon-size-xs: 12px;
$icon-size-sm: 16px;
$icon-size-md: 20px;
$icon-size-lg: 24px;
$icon-size-xl: 32px;
```

## 交互反馈规范

### 状态反馈

| 状态     | 视觉效果                 | 应用场景     |
| -------- | ------------------------ | ------------ |
| 默认状态 | 基础样式                 | 组件初始状态 |
| 悬停状态 | 轻微颜色加深/阴影变化    | 鼠标经过元素 |
| 按下状态 | 明显颜色加深/内阴影      | 用户点击元素 |
| 焦点状态 | 外发光边框               | 键盘导航焦点 |
| 激活状态 | 高亮显示，颜色鲜明       | 当前选中项   |
| 禁用状态 | 降低透明度，移除交互效果 | 不可用元素   |

### 加载状态

| 类型     | 表现形式            | 使用场景       |
| -------- | ------------------- | -------------- |
| 按钮加载 | 内嵌旋转器+文字提示 | 按钮触发的操作 |
| 页面加载 | 居中旋转器/进度条   | 整页内容加载   |
| 局部加载 | 区域内骨架屏/旋转器 | 区块内容加载   |

### SCSS 变量

```scss
// 状态颜色变化
$hover-opacity: 0.8;
$active-opacity: 0.7;
$disabled-opacity: 0.5;

// 焦点状态
$focus-outline-width: 2px;
$focus-outline-color: rgba($primary-color, 0.25);
$focus-outline-offset: 2px;
```

## 多端适配规范

### 触控目标尺寸

-   最小可点击区域: 44px × 44px
-   控件间最小间距: 8px

### 平台特性适配

| 平台       | 特殊适配点                      |
| ---------- | ------------------------------- |
| H5         | 响应式布局、悬停状态            |
| 微信小程序 | 组件安全区域、原生组件限制      |
| iOS        | 遵循 iOS 设计规范、底部安全区域 |
| Android    | Material Design 风格、返回手势  |

### SCSS 变量

```scss
// 多端适配
$min-tap-size: 44px;
$min-tap-spacing: 8px;

// 安全区域
$safe-area-inset-top: env(safe-area-inset-top);
$safe-area-inset-right: env(safe-area-inset-right);
$safe-area-inset-bottom: env(safe-area-inset-bottom);
$safe-area-inset-left: env(safe-area-inset-left);
```

## 无障碍设计规范

-   色彩对比度: 遵循 WCAG 2.1 AA 标准
-   键盘可访问性: 所有交互元素支持键盘操作
-   屏幕阅读器: 提供适当的 aria 属性和角色
-   聚焦顺序: 合理的 Tab 键导航顺序
-   文本替代: 为非文本内容提供替代文本

## 暗色模式规范

| 亮色模式 | 暗色模式 | 元素类型 |
| -------- | -------- | -------- |
| #ffffff  | #121212  | 背景色   |
| #f5f7fa  | #1e1e1e  | 次级背景 |
| #e4e7ed  | #333333  | 边框颜色 |
| #333333  | #ffffff  | 主要文本 |
| #666666  | #aaaaaa  | 次要文本 |
| 原色 80% | 原色 70% | 主要按钮 |

### SCSS 变量

```scss
// 暗色模式变量
:root {
    // 亮色主题
    --background-color: #{var(--white)};
    --background-color-secondary: #{$background-color};
    --border-color: #{var(--border-color)};
    --text-primary: #{var(--text-primary)};
    --text-secondary: #{$text-secondary};
}

.dark-theme {
    // 暗色主题
    --background-color: #121212;
    --background-color-secondary: #1e1e1e;
    --border-color: #333333;
    --text-primary: #{var(--white)};
    --text-secondary: #aaaaaa;
}
```

## 品牌定制指南

设计团队可通过以下方式快速定制品牌风格：

1. 替换主色板颜色
2. 调整边框圆角风格
3. 修改字体家族
4. 更新阴影深度和风格
5. 配置特定的图标风格

所有变量都在 `src/styles/_variables.scss` 文件中集中管理，支持灵活扩展和覆盖。

### 步骤 1：创建品牌主题文件

```scss
// theme-custom.scss
// 1. 覆盖基础变量
$primary-color: #8e44ad; // 自定义主色
$border-radius-md: 8px; // 自定义圆角

// 2. 引入基础样式文件
@import "fantastic-ui/styles/index.scss";

// 3. 扩展自定义样式
.custom-brand-element {
    background-color: lighten($primary-color, 40%);
}
```

### 步骤 2：在项目中引入自定义主题

```js
// main.js
import Vue from "vue";
import FantasticUI from "fantastic-ui";
import "./styles/theme-custom.scss";

Vue.use(FantasticUI);
```

## 使用指南

### 设计资源

-   组件库的 Sketch/Figma UI Kit
-   色彩板样本
-   字体标准手册
-   图标库资源包

### 设计检查清单

使用该设计系统时，请检查以下几点：

-   [ ] 色彩使用是否符合规范
-   [ ] 字体和字号是否遵循系统
-   [ ] 间距和对齐是否基于网格系统
-   [ ] 圆角和阴影是否一致
-   [ ] 交互反馈是否清晰
-   [ ] 是否考虑了无障碍设计
-   [ ] 是否适配了多种设备尺寸
-   [ ] 是否考虑了亮/暗色模式

## 参考资源

-   [Material Design](https://material.io/design)
-   [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
-   [WeChat Mini Program Design Guidelines](https://developers.weixin.qq.com/miniprogram/design/)
-   [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
