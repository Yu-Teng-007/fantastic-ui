# Backtop 返回顶部

## 介绍

Backtop 返回顶部组件提供了一种便捷的方式，让用户能够快速回到页面顶部，特别适用于长内容页面。

## 引入

```js
import { FancBacktop } from 'fantastic-ui';

// 全局注册
Vue.use(FancBacktop);

// 局部注册
export default {
  components: {
    FancBacktop
  }
}
```

## 代码演示

### 基础用法

当页面滚动高度超过 200px 时，会显示返回顶部按钮。点击按钮时，页面会平滑滚动到顶部。

```html
<fanc-backtop />
```

### 自定义显示高度

通过 `visibilityHeight` 属性可以自定义滚动高度阈值，当滚动高度超过该值时才显示返回顶部按钮。

```html
<fanc-backtop :visibilityHeight="300" />
```

### 不同类型

返回顶部组件支持多种类型，包括默认、主要、成功、警告、危险和信息。

```html
<fanc-backtop type="default" text="默认" />
<fanc-backtop type="primary" text="主要" />
<fanc-backtop type="success" text="成功" />
<fanc-backtop type="warning" text="警告" />
<fanc-backtop type="danger" text="危险" />
<fanc-backtop type="info" text="信息" />
```

### 自定义图标

可以通过 `icon` 属性自定义返回顶部按钮的图标。

```html
<fanc-backtop icon="chevron-up" />
<fanc-backtop icon="rocket" />
<fanc-backtop icon="arrow-circle-up" />
```

### 自定义形状

默认情况下，返回顶部按钮为圆形，可以通过 `round` 属性设置为方形，通过 `shadow` 属性控制是否显示阴影。

```html
<fanc-backtop :round="false" />
<fanc-backtop :round="false" :shadow="false" />
```

### 自定义颜色

可以通过 `color` 和 `textColor` 属性自定义返回顶部按钮的背景颜色和文字颜色。

```html
<fanc-backtop color="#8e44ad" textColor="#ffffff" text="紫色" />
<fanc-backtop color="#e74c3c" textColor="#ffffff" text="红色" />
<fanc-backtop color="#2ecc71" textColor="#ffffff" text="绿色" />
```

### 自定义位置

可以通过 `right` 和 `bottom` 属性自定义返回顶部按钮在页面中的位置。

```html
<fanc-backtop right="30px" bottom="60px" />
```

### 自定义内容

可以通过默认插槽自定义返回顶部按钮的内容。

```html
<fanc-backtop>
  <view class="custom-backtop">
    <fanc-icon name="arrow-up" size="20" />
    <text>顶部</text>
  </view>
</fanc-backtop>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `default` `primary` `success` `warning` `danger` `info` | _string_ | `primary` |
| visibilityHeight | 滚动高度达到此参数值才出现，单位px | _number_ | `200` |
| duration | 回到顶部所需时间（ms） | _number_ | `300` |
| icon | 图标名称 | _string_ | `arrow-up` |
| iconSize | 图标大小 | _number_ | `16` |
| iconColor | 图标颜色 | _string_ | - |
| text | 按钮文字 | _string_ | - |
| round | 是否为圆形按钮 | _boolean_ | `true` |
| shadow | 是否显示阴影 | _boolean_ | `true` |
| right | 距离页面右边距离 | _string_ | `20px` |
| bottom | 距离页面底部距离 | _string_ | `40px` |
| zIndex | 层级 | _string_ | `10` |
| color | 自定义背景颜色 | _string_ | - |
| textColor | 自定义文字颜色 | _string_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击返回顶部按钮时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义返回顶部按钮内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --backtop-bg-color | `var(--bg-white)` | 背景颜色 |
| --backtop-text-color | `var(--text-primary)` | 文字颜色 |
| --backtop-primary-bg-color | `var(--fanc-primary-color)` | 主要类型背景颜色 |
| --backtop-primary-text-color | `var(--white)` | 主要类型文字颜色 |
| --backtop-success-bg-color | `var(--fanc-success-color)` | 成功类型背景颜色 |
| --backtop-success-text-color | `var(--white)` | 成功类型文字颜色 |
| --backtop-warning-bg-color | `var(--fanc-warning-color)` | 警告类型背景颜色 |
| --backtop-warning-text-color | `var(--white)` | 警告类型文字颜色 |
| --backtop-danger-bg-color | `var(--fanc-danger-color)` | 危险类型背景颜色 |
| --backtop-danger-text-color | `var(--white)` | 危险类型文字颜色 |
| --backtop-info-bg-color | `var(--fanc-info-color)` | 信息类型背景颜色 |
| --backtop-info-text-color | `var(--white)` | 信息类型文字颜色 |
| --backtop-border-color | `var(--border-color)` | 边框颜色 |
| --backtop-shadow-color | `rgba(0, 0, 0, 0.15)` | 阴影颜色 |
| --backtop-size | `40px` | 按钮尺寸 |
| --backtop-icon-size | `16px` | 图标尺寸 |
| --backtop-text-font-size | `12px` | 文字字体大小 |
| --backtop-border-radius | `50%` | 边框圆角 |
| --backtop-z-index | `10` | 层级 |
| --backtop-transition-duration | `0.3s` | 过渡动画时长 | 