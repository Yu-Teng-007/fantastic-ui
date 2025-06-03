# Grid 宫格

## 介绍

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 引入

```js
import { FancGrid, FancGridItem } from 'fantastic-ui';

Vue.use(FancGrid);
Vue.use(FancGridItem);
```

## 代码演示

### 基础用法

通过在 `fanc-grid` 组件上设置相关属性，可以控制宫格的列数、是否显示边框、格子间距等。宫格内容通过 `fanc-grid-item` 组件定义。

```html
<fanc-grid>
  <fanc-grid-item icon="home" text="文本" />
  <fanc-grid-item icon="search" text="文本" />
  <fanc-grid-item icon="heart" text="文本" />
  <fanc-grid-item icon="user" text="文本" />
</fanc-grid>
```

### 自定义列数

默认一行展示四个格子，可以通过 `column-num` 自定义列数。

```html
<fanc-grid :column-num="3">
  <fanc-grid-item icon="home" text="文本" v-for="n in 6" :key="n" />
</fanc-grid>
```

### 正方形格子

设置 `square` 属性后，格子的高度会和宽度保持一致。

```html
<fanc-grid square>
  <fanc-grid-item icon="home" text="文本" v-for="n in 8" :key="n" />
</fanc-grid>
```

### 格子间距

通过 `gutter` 属性设置格子之间的距离，默认为 0。

```html
<fanc-grid :gutter="10">
  <fanc-grid-item icon="home" text="文本" v-for="n in 8" :key="n" />
</fanc-grid>
```

### 内容横排

将 `direction` 属性设置为 `horizontal`，可以让宫格的内容呈横向排列。

```html
<fanc-grid direction="horizontal" :column-num="3">
  <fanc-grid-item icon="home" text="文本" v-for="n in 6" :key="n" />
</fanc-grid>
```

### 徽标提示

设置 `badge` 属性后，会在图标右上角展示相应的徽标，也可以通过 `dot` 来显示小红点。

```html
<fanc-grid :column-num="2">
  <fanc-grid-item icon="bell" text="徽标文字" badge="5" />
  <fanc-grid-item icon="envelope" text="小红点" dot />
</fanc-grid>
```

### 无边框

设置 `bordered` 属性为 `false` 后，宫格不会显示边框。

```html
<fanc-grid :bordered="false">
  <fanc-grid-item icon="home" text="文本" v-for="n in 8" :key="n" />
</fanc-grid>
```

### 主题色

通过设置 `theme` 属性可以改变宫格项的主题色，支持的主题有 `primary`、`success`、`warning`、`danger` 和 `info`。

```html
<fanc-grid :column-num="5">
  <fanc-grid-item icon="folder" text="默认" />
  <fanc-grid-item icon="folder" text="主要" theme="primary" />
  <fanc-grid-item icon="folder" text="成功" theme="success" />
  <fanc-grid-item icon="folder" text="警告" theme="warning" />
  <fanc-grid-item icon="folder" text="危险" theme="danger" />
</fanc-grid>
```

### 自定义内容

通过插槽可以自定义格子的内容。

```html
<fanc-grid :column-num="3">
  <fanc-grid-item>
    <template #icon>
      <image 
        src="https://img.yzcdn.cn/vant/apple-1.jpg" 
        style="width: 36px; height: 36px; border-radius: 4px;"
      />
    </template>
    <template #text>
      <view style="font-size: 14px; color: #323233; margin-top: 8px;">
        自定义图文
      </view>
    </template>
  </fanc-grid-item>
  <fanc-grid-item>
    <view style="text-align: center;">
      <view style="background: #f2f3f5; width: 64px; height: 32px; border-radius: 4px; line-height: 32px;">
        自定义
      </view>
    </view>
  </fanc-grid-item>
</fanc-grid>
```

### 页面导航

通过 `url` 或 `to` 属性进行页面跳转。

```html
<fanc-grid :column-num="2" clickable>
  <fanc-grid-item 
    icon="home" 
    text="首页" 
    url="/pages/home/index" 
  />
  <fanc-grid-item 
    icon="search" 
    text="搜索" 
    :to="{ url: '/pages/example/search/index' }" 
  />
</fanc-grid>
```

## API

### Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column-num | 列数 | _number_ | `4` |
| bordered | 是否显示边框 | _boolean_ | `true` |
| gutter | 格子之间的间距，默认单位为`px` | _number \| string_ | `0` |
| square | 是否将格子固定为正方形 | _boolean_ | `false` |
| clickable | 是否开启格子点击反馈 | _boolean_ | `false` |
| direction | 格子内容排列的方向，可选值为 `horizontal` | _string_ | `vertical` |
| theme | 主题色，可选值为 `primary` `success` `warning` `danger` `info` | _string_ | - |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字 | _string_ | - |
| icon | 图标名称或图片链接 | _string_ | - |
| icon-size | 图标大小，默认单位为`px` | _number \| string_ | `28` |
| icon-color | 图标颜色 | _string_ | - |
| dot | 是否显示图标右上角小红点 | _boolean_ | `false` |
| badge | 图标右上角徽标的内容 | _number \| string_ | - |
| url | 点击后跳转的链接地址 | _string_ | - |
| to | 点击后跳转的目标路由对象，同 uni-app 的 [uni.navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto) | _string \| object_ | - |
| theme | 主题色，可选值为 `primary` `success` `warning` `danger` `info`，会覆盖父组件的主题色 | _string_ | - |

### GridItem Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击格子时触发 | - |

### GridItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义所有内容 |
| icon | 自定义图标 |
| text | 自定义文字 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [主题定制](#/theme)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --grid-bg-color | _var(--white)_ | 背景颜色 |
| --grid-text-color | _var(--text-primary)_ | 文字颜色 |
| --grid-icon-color | _var(--text-primary)_ | 图标颜色 |
| --grid-border-color | _var(--border-color)_ | 边框颜色 |
| --grid-active-color | _var(--bg-gray-light)_ | 点击态背景颜色 |
| --grid-text-font-size | _14px_ | 文字字体大小 |
| --grid-icon-font-size | _28px_ | 图标字体大小 |
| --grid-item-padding | _16px 8px_ | 格子内边距 |
| --grid-item-content-padding | _16px 8px_ | 格子内容区内边距 |
| --grid-item-gap | _8px_ | 图标与文字间距 |
| --grid-badge-color | _var(--white)_ | 徽标文字颜色 |
| --grid-badge-bg-color | _var(--fanc-danger-color)_ | 徽标背景颜色 |
| --grid-primary-color | _var(--fanc-primary-color)_ | 主要主题色 |
| --grid-success-color | _var(--fanc-success-color)_ | 成功主题色 |
| --grid-warning-color | _var(--fanc-warning-color)_ | 警告主题色 |
| --grid-danger-color | _var(--fanc-danger-color)_ | 危险主题色 |
| --grid-info-color | _var(--fanc-info-color)_ | 信息主题色 | 