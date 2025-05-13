# 弹出层组件 (Popup)

## 介绍

弹出层组件是一个可多方向弹出的容器，用于展示临时性内容，如菜单、选择器、对话框等。

## 引入

```vue
<script>
import fancPopup from '@/components/fanc-popup/index.vue';

export default {
  components: {
    'fanc-popup': fancPopup
  }
}
</script>
```

## 代码演示

### 基础用法

最简单的使用方式是通过`show`属性控制弹出层的显示与隐藏。默认情况下，弹出层会居中显示。

```vue
<template>
  <fanc-popup :show="show" @close="show = false">
    <view class="content">这是弹出层内容</view>
  </fanc-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
```

### 弹出位置

通过`position`属性设置弹出位置，默认值为`center`，可选值为`top`、`bottom`、`left`、`right`。

```vue
<fanc-popup :show="show" position="bottom" @close="show = false">
  <view class="content">底部弹出内容</view>
</fanc-popup>
```

### 圆角风格

通过`round`属性设置弹出层的圆角风格。

```vue
<fanc-popup :show="show" position="bottom" round @close="show = false">
  <view class="content">圆角底部弹出层</view>
</fanc-popup>
```

### 关闭图标

通过`closeable`属性在弹出层上显示关闭图标，点击关闭图标时会触发`close`事件。

```vue
<fanc-popup :show="show" closeable @close="show = false">
  <view class="content">带关闭图标的弹出层</view>
</fanc-popup>
```

### 自定义关闭图标位置

通过`closeIconPosition`属性设置关闭图标位置，可选值为`top-right`、`top-left`、`bottom-right`、`bottom-left`。

```vue
<fanc-popup 
  :show="show" 
  closeable 
  closeIconPosition="top-left" 
  @close="show = false"
>
  <view class="content">自定义关闭图标位置</view>
</fanc-popup>
```

### 自定义样式

通过`customStyle`属性设置弹出层样式。

```vue
<fanc-popup 
  :show="show" 
  :customStyle="{ width: '80%', height: '300px' }" 
  @close="show = false"
>
  <view class="content">自定义样式的弹出层</view>
</fanc-popup>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示弹出层 | *Boolean* | `false` |
| position | 弹出位置，可选值为 `center` `top` `bottom` `left` `right` | *String* | `center` |
| overlay | 是否显示遮罩层 | *Boolean* | `true` |
| closeable | 是否显示关闭图标 | *Boolean* | `false` |
| closeIconPosition | 关闭图标位置，可选值为 `top-right` `top-left` `bottom-right` `bottom-left` | *String* | `top-right` |
| round | 是否显示圆角 | *Boolean* | `false` |
| duration | 动画时长，单位毫秒 | *Number \| String* | `300` |
| zIndex | z-index层级 | *Number \| String* | `1000` |
| overlayClosable | 是否点击遮罩层后关闭弹出层 | *Boolean* | `true` |
| customStyle | 自定义弹出层样式 | *Object \| String* | `''` |
| customClass | 自定义弹出层类名 | *String* | `''` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 打开弹出层时触发 | - |
| close | 关闭弹出层时触发 | - |
| clickOverlay | 点击遮罩层时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 弹出层内容 |

## 注意事项

1. 弹出层组件默认会阻止内容区域的点击事件冒泡
2. 如果需要在页面中使用多个弹出层，建议设置不同的 `zIndex` 保证层级正确
3. 复杂内容建议通过 `slot` 传入自定义组件实现 