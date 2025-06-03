# Navbar 导航栏

导航栏组件，用于页面顶部导航，支持自定义文字、返回按钮、标题和右侧按钮。

## 介绍

`FancNavbar` 是一个移动端顶部导航栏组件，提供了丰富的自定义选项，可用于各种场景的页面导航。

## 引入

```js
import { FancNavbar } from 'fantastic-ui';

// 注册组件
export default {
  components: {
    FancNavbar
  }
}
```

## 代码演示

### 基础用法

通过 `title` 属性设置导航栏标题，通过 `left-text` 和 `right-text` 设置左右文字。

```html
<fanc-navbar
  title="标题"
  left-text="返回"
  right-text="按钮"
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

### 返回按钮

通过 `left-arrow` 属性设置是否显示返回箭头。

```html
<fanc-navbar 
  title="标题" 
  left-arrow 
  @click-left="onClickLeft" 
/>
```

### 自定义颜色

通过 `background`、`title-color` 和 `arrow-color` 属性设置导航栏的颜色。

```html
<fanc-navbar
  title="自定义颜色"
  left-text="返回"
  right-text="按钮"
  background="#007bff"
  title-color="#fff"
  :arrow-color="'#fff'"
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

### 自定义图标

通过插槽自定义导航栏左右两侧的图标。

```html
<fanc-navbar title="自定义图标">
  <template #left>
    <view class="navbar-icon-wrapper" @click="onClickLeft">
      <fanc-icon name="arrow-left" size="20" />
    </view>
  </template>
  <template #right>
    <view class="navbar-icon-wrapper" @click="onClickRight">
      <fanc-icon name="ellipsis-v" size="20" />
    </view>
  </template>
</fanc-navbar>
```

### 固定在顶部

通过 `fixed` 属性可以将导航栏固定在顶部，同时可以通过 `placeholder` 属性设置是否在标签位置生成一个等高的占位元素。

```html
<fanc-navbar
  title="固定导航栏"
  left-text="返回"
  right-text="关闭"
  fixed
  placeholder
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

### 多级导航

配合其他组件可以实现多级导航的效果。

```html
<view class="subsection">
  <fanc-navbar
    title="商品详情"
    left-arrow
    :border="false"
    @click-left="onClickLeft"
  />
  <view class="tabs">
    <view 
      v-for="(tab, index) in tabs" 
      :key="index"
      class="tab-item"
      :class="{ active: activeTab === index }"
      @click="activeTab = index"
    >
      {{ tab }}
    </view>
  </view>
</view>
```

```js
export default {
  data() {
    return {
      activeTab: 0,
      tabs: ['商品', '详情', '评论', '推荐']
    };
  },
  methods: {
    onClickLeft() {
      this.$toast.text('点击返回');
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | _string_ | - |
| left-text | 左侧文字 | _string_ | - |
| right-text | 右侧文字 | _string_ | - |
| left-arrow | 是否显示左侧箭头 | _boolean_ | `false` |
| fixed | 是否固定在顶部 | _boolean_ | `false` |
| border | 是否显示下边框 | _boolean_ | `true` |
| placeholder | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |
| safe-area-inset-top | 是否开启顶部安全区适配 | _boolean_ | `true` |
| height | 导航栏高度，支持数值或带单位字符串 | _number \| string_ | `44` |
| background | 导航栏背景色 | _string_ | - |
| z-index | 导航栏 z-index | _number \| string_ | `10` |
| title-color | 标题颜色 | _string_ | - |
| arrow-color | 箭头颜色 | _string_ | - |
| arrow-size | 箭头大小，支持数值或带单位字符串 | _number \| string_ | `16` |
| custom-style | 自定义样式 | _object_ | `{}` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 导航栏内容，会覆盖所有内容 |
| left | 自定义左侧内容 |
| title | 自定义标题内容 |
| right | 自定义右侧内容 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click-left | 点击左侧按钮时触发 | _event: Event_ |
| click-right | 点击右侧按钮时触发 | _event: Event_ |

### 样式变量

以下为组件使用的 CSS 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| --navbar-bg-color | `var(--white)` | 导航栏背景色 |
| --navbar-text-color | `var(--text-primary)` | 导航栏文字颜色 |
| --navbar-title-color | `var(--text-primary)` | 导航栏标题颜色 |
| --navbar-text-font-size | `14px` | 导航栏文字大小 |
| --navbar-title-font-size | `16px` | 导航栏标题大小 |
| --navbar-title-font-weight | `500` | 导航栏标题字重 |
| --navbar-height | `44px` | 导航栏高度 |
| --navbar-border-color | `var(--border-color)` | 导航栏边框颜色 | 