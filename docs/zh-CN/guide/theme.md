# 主题定制

Fantastic UI 提供了灵活的主题定制能力，您可以通过多种方式定制组件库的主题风格，以满足您的品牌需求和视觉设计。

## 变量覆盖（推荐）

Fantastic UI 的样式是基于 SCSS 变量构建的，您可以通过覆盖这些变量来定制主题。

### 步骤 1：创建主题文件

创建一个 SCSS 文件，例如 `theme.scss`，在此文件中覆盖默认的样式变量：

```scss
// 覆盖主题颜色
$fanc-primary-color: #6200ea; // 主色
$fanc-success-color: #00c853; // 成功色
$fanc-warning-color: #ffab00; // 警告色
$fanc-danger-color: #d50000; // 危险色

// 覆盖字体大小
$font-size-base: 16px; // 基础字体大小
$font-size-lg: 18px; // 大号字体
$font-size-sm: 14px; // 小号字体

// 覆盖圆角大小
$border-radius: 6px; // 基础圆角
$border-radius-lg: 8px; // 大号圆角
$border-radius-sm: 4px; // 小号圆角

// 覆盖间距
$spacing-unit: 16px; // 基础间距单位

// 引入组件库样式
@import "fantastic-ui/styles/index.scss";
```

### 步骤 2：引入主题文件

在您的项目入口文件 `main.js` 中引入这个主题文件：

```js
import Vue from "vue";
import FantasticUI from "fantastic-ui";
import "./theme.scss";

Vue.use(FantasticUI);
```

> 注意：请确保先引入主题文件，再使用组件库，以保证您的自定义变量能够正确覆盖默认变量。

## 运行时主题切换

如果您需要在运行时动态切换主题（如实现暗色模式切换），可以使用 CSS 变量结合类名切换的方式：

### 步骤 1：定义 CSS 变量

```scss
:root {
    // 亮色主题变量
    --fanc-bg-color: #ffffff;
    --fanc-text-color: #333333;
    --fanc-primary-color: #007bff;
    --fanc-border-color: #e4e7ed;
}

.dark-theme {
    // 暗色主题变量
    --fanc-bg-color: #1a1a1a;
    --fanc-text-color: #f0f0f0;
    --fanc-primary-color: #3c9cff;
    --fanc-border-color: #4c4d4f;
}
```

### 步骤 2：切换主题类名

```js
// 切换暗色主题
document.documentElement.classList.add("dark-theme");

// 切换回亮色主题
document.documentElement.classList.remove("dark-theme");
```

## 自定义单个组件样式

如果您只需要修改某个特定组件的样式，可以使用以下方法：

### 方法一：使用样式覆盖

```scss
// 修改按钮组件样式
.fanc-button--primary {
    background-color: #8e44ad;
    border-color: #8e44ad;
}
```

### 方法二：使用行内样式或组件属性

```html
<fanc-button type="primary" color="#8e44ad">自定义颜色按钮</fanc-button>
```

## 完整的主题变量列表

以下是 Fantastic UI 提供的主要样式变量，您可以覆盖这些变量来定制主题：

### 基础颜色

| 变量名           | 默认值  | 说明   |
| ---------------- | ------- | ------ |
| $primary-color   | #007bff | 主色   |
| $secondary-color | #6c757d | 次要色 |
| $success-color   | #28a745 | 成功色 |
| $danger-color    | #dc3545 | 危险色 |
| $warning-color   | #ffc107 | 警告色 |
| $info-color      | #17a2b8 | 信息色 |
| $light-color     | #f8f9fa | 亮色   |
| $dark-color      | #343a40 | 暗色   |

### 文字颜色

| 变量名                      | 默认值  | 说明           |
| --------------------------- | ------- | -------------- |
| $uni-text-color             | #333    | 主要文字颜色   |
| $uni-text-color-inverse     | #fff    | 反色文字颜色   |
| $uni-text-color-grey        | #999    | 灰色文字颜色   |
| $uni-text-color-placeholder | #808080 | 占位符文字颜色 |

### 字体设置

| 变量名                  | 默认值             | 说明         |
| ----------------------- | ------------------ | ------------ |
| $font-family-sans-serif | -apple-system, ... | 无衬线字体   |
| $font-size-base         | 1rem               | 基础字体大小 |
| $font-size-lg           | 1.25rem            | 大号字体     |
| $font-size-sm           | 0.875rem           | 小号字体     |
| $line-height-base       | 1.5                | 基础行高     |

### 间距与尺寸

| 变量名         | 默认值   | 说明           |
| -------------- | -------- | -------------- |
| $spacing-unit  | 1rem     | 基础间距单位   |
| $btn-padding-y | 0.375rem | 按钮垂直内边距 |
| $btn-padding-x | 0.75rem  | 按钮水平内边距 |

### 边框与圆角

| 变量名            | 默认值    | 说明     |
| ----------------- | --------- | -------- |
| $border-width     | 1px       | 边框宽度 |
| $border-color     | $gray-300 | 边框颜色 |
| $border-radius    | 0.25rem   | 基础圆角 |
| $border-radius-lg | 0.3rem    | 大号圆角 |
| $border-radius-sm | 0.2rem    | 小号圆角 |

更多变量请参考 [src/styles/\_variables.scss](../../../src/styles/_variables.scss) 文件。

## 组件交互效果定制

除了颜色和尺寸外，您还可以定制组件的交互效果：

```scss
// 定制按钮交互效果
.fanc-button {
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:active:not(.is-disabled) {
        transform: scale(0.98);
        box-shadow: none;
    }
}
```

## 最佳实践

1. **保持一致性**：维持应用内颜色、字体、间距等元素的一致性
2. **适度定制**：不要过度修改组件的基础样式，以免破坏组件的交互体验
3. **响应式考虑**：定制时考虑不同设备的显示效果
4. **测试适配性**：在多个平台和设备上测试自定义主题的效果
