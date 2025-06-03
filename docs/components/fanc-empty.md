# Empty 空状态

## 介绍

用于空状态时的占位提示，当页面或容器中没有数据时，使用空状态组件进行提示，并引导用户进行操作。

## 引入

```js
import { FancEmpty } from 'fantastic-ui';

// 全局注册
Vue.component(FancEmpty.name, FancEmpty);

// 局部注册
export default {
  components: {
    FancEmpty
  }
}
```

## 代码演示

### 基础用法

默认展示一个空状态的图标和文字提示。

```html
<fanc-empty description="暂无数据"></fanc-empty>
```

### 图标用法

可以通过 `icon` 属性设置显示的图标。

```html
<fanc-empty icon="box-open" description="没有找到包裹"></fanc-empty>
```

### 自定义图片

可以通过 `image` 属性自定义图片的链接。

```html
<fanc-empty 
  image="/static/empty-image.png" 
  description="暂无收藏内容">
</fanc-empty>
```

### 预设类型

提供了 `default`、`error`、`search`、`network` 四种预设类型，可以根据不同场景使用不同的类型。

```html
<!-- 错误类型 -->
<fanc-empty 
  type="error" 
  icon="exclamation-circle" 
  description="加载失败，请检查网络">
</fanc-empty>

<!-- 搜索类型 -->
<fanc-empty 
  type="search" 
  icon="search" 
  description="没有找到搜索结果">
</fanc-empty>

<!-- 网络错误类型 -->
<fanc-empty 
  type="network" 
  icon="wifi-slash" 
  description="网络连接失败，请检查网络设置">
</fanc-empty>
```

### 自定义尺寸

可以通过 `imageSize` 和 `iconSize` 属性自定义图片或图标的尺寸。

```html
<fanc-empty 
  icon="inbox" 
  iconSize="80" 
  imageSize="150" 
  description="自定义尺寸的空状态">
</fanc-empty>
```

### 底部内容

通过默认插槽可以在空状态下方添加操作按钮等内容。

```html
<fanc-empty icon="file-circle-exclamation" description="暂无订单数据">
  <fanc-button type="primary" size="small">立即下单</fanc-button>
</fanc-empty>
```

### 完全自定义

通过插槽可以完全自定义空状态的各个部分。

```html
<fanc-empty>
  <template #image>
    <view class="custom-image">
      <fanc-icon name="face-sad-tear" size="60" color="#4a6cf7"></fanc-icon>
    </view>
  </template>
  <template #description>
    <text class="custom-description">
      您还没有创建任何内容<text class="highlight">需要帮助?</text>
    </text>
  </template>
  <view class="custom-action">
    <fanc-button type="primary" size="small">查看教程</fanc-button>
    <fanc-button plain hairline size="small" style="margin-left: 10px;">联系客服</fanc-button>
  </view>
</fanc-empty>

<style>
.custom-image {
  width: 120px;
  height: 120px;
  background: rgba(74, 108, 247, 0.1);
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-description {
  font-size: 16px;
  color: #323233;
}

.highlight {
  color: #4a6cf7;
  margin-left: 4px;
}

.custom-action {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述文字 | _string_ | 暂无数据 |
| image | 图片链接 | _string_ | - |
| icon | 图标名称，如果设置了 image，则 icon 不生效 | _string_ | - |
| imageSize | 图片尺寸，单位 px | _number_ | 100 |
| iconSize | 图标尺寸，单位 px | _number_ | 50 |
| iconColor | 图标颜色 | _string_ | #c8c9cc |
| type | 预设类型，可选值为 `default` `error` `search` `network` | _string_ | default |
| customClass | 自定义类名 | _string_ | - |
| customStyle | 自定义样式 | _string_ | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 空状态底部内容 |
| image | 自定义图片 |
| description | 自定义描述文字 |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --empty-description-color | var(--text-secondary) | 描述文字颜色 |
| --empty-description-font-size | 14px | 描述文字字体大小 |
| --empty-description-line-height | 1.5 | 描述文字行高 |
| --empty-image-width | 100px | 图片宽度 |
| --empty-image-height | 100px | 图片高度 |
| --empty-image-margin-bottom | 16px | 图片底部外边距 |
| --empty-bottom-margin-top | 8px | 底部内容顶部外边距 |
| --empty-padding | 40px 0 | 内边距 |
| --empty-error-color | var(--fanc-danger-color) | 错误类型文字颜色 |
| --empty-search-color | var(--text-secondary) | 搜索类型文字颜色 |
| --empty-network-color | var(--fanc-warning-color) | 网络错误类型文字颜色 |
| --empty-icon-color | #c8c9cc | 默认图标颜色 |
| --empty-icon-size | 50px | 默认图标大小 |

## 常见问题

### 1. 如何自定义图标颜色？

通过 `iconColor` 属性可以自定义图标颜色，如 `iconColor="#ff0000"`。

### 2. 如何调整图片尺寸？

通过 `imageSize` 属性可以调整图片尺寸，该属性接收一个数字，表示像素值，如 `imageSize="150"`。

### 3. 如何在空状态下添加按钮？

可以通过默认插槽在空状态下方添加按钮或其他内容，例如：

```html
<fanc-empty description="暂无数据">
  <fanc-button type="primary" size="small">添加数据</fanc-button>
</fanc-empty>
```

### 4. 如何使用自定义类型？

除了预设的四种类型外，还可以通过组合使用 `icon`、`iconColor`、`customClass` 等属性来创建自定义类型的空状态。 