# Icon 图标

图标组件用于展示各类图标，Fantastic UI 内置了一套常用图标，并且支持自定义图标和图片图标。

## 基础用法

通过 `name` 属性指定图标名称，支持内置图标和自定义图标。

```html
<fanc-icon name="home" />
<fanc-icon name="search" />
<fanc-icon name="user" />
<fanc-icon name="setting" />
```

## 图标颜色

通过 `color` 属性设置图标颜色。

```html
<fanc-icon name="heart" color="#f00" />
<fanc-icon name="star" color="#ff0" />
<fanc-icon name="like" color="#0f0" />
<fanc-icon name="share" color="#00f" />
```

## 图标大小

通过 `size` 属性设置图标大小，单位为 px。

```html
<fanc-icon name="home" size="20" />
<fanc-icon name="home" size="24" />
<fanc-icon name="home" size="32" />
<fanc-icon name="home" size="40" />
```

## 自定义类名

通过 `custom-class` 属性设置自定义类名，用于覆盖默认样式。

```html
<fanc-icon name="home" custom-class="my-icon" />
```

```css
.my-icon {
    /* 自定义样式 */
    font-weight: bold;
    /* 更多样式... */
}
```

## 使用本地图片

通过 `name` 属性传入图片 URL 可以使用图片作为图标。

```html
<fanc-icon name="/static/icons/custom-icon.png" /> <fanc-icon name="https://example.com/icon.png" size="40" />
```

## 图标旋转

通过 `rotate` 属性控制图标旋转角度。

```html
<fanc-icon name="loading" rotate="90" />
<fanc-icon name="loading" rotate="180" />
<fanc-icon name="loading" rotate="270" />
```

## 图标动画

通过 `spin` 属性让图标旋转动画。

```html
<fanc-icon name="loading" spin /> <fanc-icon name="refresh" spin />
```

## 可点击图标

图标默认不可点击，设置 `clickable` 属性后会显示点击效果，并可以通过 `click` 事件监听点击。

```html
<fanc-icon name="share" clickable @click="onShare" />
```

## 徽标提示

结合其他组件可以实现图标徽标效果。

```html
<view class="icon-with-badge">
    <fanc-icon name="cart" size="30" />
    <view class="badge">5</view>
</view>
```

```css
.icon-with-badge {
    position: relative;
    display: inline-block;
}
.badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background-color: #f00;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
    padding: 0 4px;
}
```

## 内置图标列表

<div class="icon-grid">
  <!-- 此处应展示所有内置图标的预览，实际项目中需要补充具体图标 -->
  <div class="icon-item">
    <fanc-icon name="home" />
    <div class="icon-name">home</div>
  </div>
  <div class="icon-item">
    <fanc-icon name="search" />
    <div class="icon-name">search</div>
  </div>
  <!-- 更多图标... -->
</div>

## API

### Props

| 参数         | 说明                | 类型             | 默认值    |
| ------------ | ------------------- | ---------------- | --------- |
| name         | 图标名称或图片链接  | String           | -         |
| color        | 图标颜色            | String           | `inherit` |
| size         | 图标大小，单位为 px | String \| Number | `24`      |
| custom-class | 自定义类名          | String           | -         |
| rotate       | 图标旋转角度        | String \| Number | `0`       |
| spin         | 是否启用旋转动画    | Boolean          | `false`   |
| clickable    | 是否开启点击反馈    | Boolean          | `false`   |
| custom-style | 自定义样式          | String \| Object | -         |

### Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| click  | 点击图标时触发 | event: Event |

## 使用指南

### 自定义图标库

Fantastic UI 的图标使用了 FontAwesome 图标库，您也可以使用其他图标库或自定义图标：

1. 引入您喜欢的图标库：

```js
// main.js
import "@fortawesome/fontawesome-free/css/all.css"; // 使用 FontAwesome
// 或者使用其他图标库
```

2. 在组件中使用：

```html
<fanc-icon name="fas fa-heart" />
<!-- FontAwesome 的图标 -->
```

### 使用 SVG 图标

如果您需要使用 SVG 图标，可以：

1. 将 SVG 文件放在项目的静态资源目录中
2. 通过 `name` 属性引用 SVG 文件路径

```html
<fanc-icon name="/static/icons/custom.svg" />
```

### 最佳实践

1. **保持一致性**：在整个应用中使用一致的图标风格
2. **适当的大小**：根据上下文环境选择合适的图标大小
3. **辅助文字**：纯图标应配合文字说明或提示，增强用户理解
4. **交互反馈**：可点击的图标应设置 `clickable` 属性提供反馈
5. **无障碍支持**：为图标添加 `aria-label` 属性，提升可访问性
