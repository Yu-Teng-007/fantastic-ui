# fanc-tag 标签组件

## 组件介绍

`fanc-tag` 是一个用于标记关键词和概括主要内容的组件。它支持多种类型、尺寸和样式，适用于商品分类、文章标签、状态提示等多种场景。

## 组件特性

- 支持多种标签类型：默认、主要、成功、警告、危险和信息
- 支持空心样式和实心样式
- 支持圆角和标记(半圆角)样式
- 支持多种尺寸：小、中、大
- 支持可关闭标签
- 支持禁用状态
- 支持自定义颜色和文本颜色
- 支持组合使用多种样式

## 组件用法

### 基础用法

```vue
<fanc-tag>默认标签</fanc-tag>
<fanc-tag type="primary">主要标签</fanc-tag>
<fanc-tag type="success">成功标签</fanc-tag>
<fanc-tag type="warning">警告标签</fanc-tag>
<fanc-tag type="danger">危险标签</fanc-tag>
<fanc-tag type="info">信息标签</fanc-tag>
```

### 空心样式

```vue
<fanc-tag plain>默认标签</fanc-tag>
<fanc-tag type="primary" plain>主要标签</fanc-tag>
<fanc-tag type="success" plain>成功标签</fanc-tag>
```

### 圆角样式

```vue
<fanc-tag round>默认标签</fanc-tag>
<fanc-tag type="primary" round>主要标签</fanc-tag>
<fanc-tag type="success" round>成功标签</fanc-tag>
```

### 标记样式

```vue
<fanc-tag mark>默认标签</fanc-tag>
<fanc-tag type="primary" mark>主要标签</fanc-tag>
<fanc-tag type="success" mark>成功标签</fanc-tag>
```

### 标签尺寸

```vue
<fanc-tag type="primary" size="small">小型标签</fanc-tag>
<fanc-tag type="primary">默认标签</fanc-tag>
<fanc-tag type="primary" size="large">大型标签</fanc-tag>
```

### 自定义颜色

```vue
<fanc-tag color="#7232dd">单色标签</fanc-tag>
<fanc-tag color="#7232dd" plain>空心颜色</fanc-tag>
<fanc-tag color="#7232dd" text-color="#fff">文字颜色</fanc-tag>
```

### 可关闭标签

```vue
<fanc-tag type="primary" closeable @close="onClose">可关闭标签</fanc-tag>
```

```javascript
export default {
  methods: {
    onClose() {
      // 处理关闭事件
      this.$toast.text('标签已关闭');
    }
  }
}
```

### 组合样式

```vue
<fanc-tag type="primary" round plain>圆角空心</fanc-tag>
<fanc-tag type="success" mark plain>标记空心</fanc-tag>
<fanc-tag type="danger" round closeable>圆角可关闭</fanc-tag>
```

### 禁用标签

```vue
<fanc-tag disabled>禁用标签</fanc-tag>
<fanc-tag type="primary" disabled>禁用主要</fanc-tag>
<fanc-tag type="success" plain disabled>禁用空心</fanc-tag>
<fanc-tag type="warning" round disabled>禁用圆角</fanc-tag>
<fanc-tag type="danger" closeable disabled>禁用关闭</fanc-tag>
```

## 实际应用场景

### 商品标签

```vue
<view class="product-card">
  <view class="product-tags">
    <fanc-tag type="danger" size="small">热卖</fanc-tag>
    <fanc-tag type="warning" size="small">限时</fanc-tag>
  </view>
  <view class="product-name">优质纯棉T恤</view>
  <view class="product-price">¥89.00</view>
</view>
```

### 文章标签

```vue
<view class="article-card">
  <view class="article-title">Vue3 组件开发教程</view>
  <view class="article-tags">
    <fanc-tag type="primary" plain size="small">Vue3</fanc-tag>
    <fanc-tag type="info" plain size="small">组件</fanc-tag>
    <fanc-tag type="success" plain size="small">教程</fanc-tag>
  </view>
  <view class="article-desc">探讨Vue3组件库的开发实践和最佳方案...</view>
</view>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型，可选值为 `default` `primary` `success` `warning` `danger` `info` | String | `default` |
| plain | 是否为空心样式 | Boolean | `false` |
| round | 是否为圆角样式 | Boolean | `false` |
| mark | 是否为标记样式(半圆角) | Boolean | `false` |
| closeable | 是否为可关闭标签 | Boolean | `false` |
| disabled | 是否禁用标签 | Boolean | `false` |
| size | 标签尺寸，可选值为 `small` `medium` `large` | String | `medium` |
| color | 标签颜色，支持十六进制颜色 | String | - |
| textColor | 文本颜色，支持十六进制颜色 | String | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击标签时触发 | event: Event |
| close | 关闭标签时触发 | event: Event |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 标签内容 |

## 注意事项

1. 当标签内容过长时，建议设置文本溢出样式或使用更宽的标签
2. 使用 `closeable` 属性时，标签的 `close` 事件会在点击关闭图标时触发，但不会自动隐藏标签，需要自行处理隐藏逻辑
3. 使用 `color` 属性自定义颜色时，`plain` 属性会使边框和文字变为相应的颜色
4. 当同时使用 `mark` 和 `round` 属性时，`mark` 属性优先级更高
5. 当标签被禁用时，点击事件和关闭事件将不会触发 