# Tabs 选项卡

选项卡组件，用于在不同的内容区域之间进行切换。

## 基础用法

通过 `v-model` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

```vue
<fanc-tabs v-model="active">
  <fanc-tab title="标签 1">内容 1</fanc-tab>
  <fanc-tab title="标签 2">内容 2</fanc-tab>
  <fanc-tab title="标签 3">内容 3</fanc-tab>
</fanc-tabs>
```

```js
export default {
  data() {
    return {
      active: 0
    };
  }
}
```

## 自定义标签

通过具名插槽 `title-n`（n 为索引）自定义标签内容，可以添加图标或徽标。

```vue
<fanc-tabs v-model="active">
  <template #title-0="{ active }">
    <view class="custom-tab">
      <fanc-icon name="home" :color="active ? '#007bff' : '#666'"></fanc-icon>
      <text :style="{ color: active ? '#007bff' : '#666' }">首页</text>
    </view>
  </template>
  <template #title-1="{ active }">
    <view class="custom-tab">
      <fanc-icon name="heart" :color="active ? '#007bff' : '#666'"></fanc-icon>
      <text :style="{ color: active ? '#007bff' : '#666' }">收藏</text>
      <view class="badge">8</view>
    </view>
  </template>
  
  <fanc-tab title="首页">首页内容</fanc-tab>
  <fanc-tab title="收藏">收藏内容</fanc-tab>
</fanc-tabs>
```

```css
.custom-tab {
  display: flex;
  align-items: center;
  position: relative;
}
.badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: #f56c6c;
  color: white;
  font-size: 10px;
  height: 16px;
  min-width: 16px;
  border-radius: 8px;
  text-align: center;
}
```

## 通过 name 属性匹配

可以在标签上设置 `name` 属性，此时 `v-model` 的值为当前标签的 name。

```vue
<fanc-tabs v-model="activeName">
  <fanc-tab title="首页" name="home">首页内容</fanc-tab>
  <fanc-tab title="分类" name="category">分类内容</fanc-tab>
  <fanc-tab title="我的" name="profile">我的内容</fanc-tab>
</fanc-tabs>
```

```js
export default {
  data() {
    return {
      activeName: 'home'
    };
  }
}
```

## 通过数据渲染

可以通过 `tabs` 属性传入标签数据，动态渲染选项卡。

```vue
<fanc-tabs v-model="active" :tabs="tabs">
  <fanc-tab v-for="(item, index) in tabs" :key="index">
    {{ item.title }} 的内容
  </fanc-tab>
</fanc-tabs>
```

```js
export default {
  data() {
    return {
      active: 0,
      tabs: [
        { title: '选项 A' },
        { title: '选项 B' },
        { title: '选项 C' }
      ]
    };
  }
}
```

## 样式风格

`type` 属性可以设置选项卡样式，默认为 `line` 线条样式，可选值为 `card` 卡片样式。卡片样式下，激活的标签会显示为主题色背景，白色文字，并带有轻微的阴影效果和高光。

```vue
<fanc-tabs v-model="active" type="card">
  <fanc-tab title="标签 1">内容 1</fanc-tab>
  <fanc-tab title="标签 2">内容 2</fanc-tab>
  <fanc-tab title="标签 3">内容 3</fanc-tab>
</fanc-tabs>
```

## 卡片样式自定义背景

卡片样式可以通过 `background` 属性自定义背景色，使其与页面风格更加协调。

```vue
<fanc-tabs v-model="active" type="card" background="#e8f4ff">
  <fanc-tab title="热门推荐">热门推荐内容</fanc-tab>
  <fanc-tab title="最新上架">最新上架内容</fanc-tab>
  <fanc-tab title="促销活动">促销活动内容</fanc-tab>
</fanc-tabs>
```

## 禁用标签

设置 `disabled` 属性可以禁用某个标签。

```vue
<fanc-tabs v-model="active">
  <fanc-tab title="标签 1">内容 1</fanc-tab>
  <fanc-tab title="标签 2" disabled>内容 2</fanc-tab>
  <fanc-tab title="标签 3">内容 3</fanc-tab>
</fanc-tabs>
```

## 自定义样式

可以通过各种属性自定义选项卡样式。

```vue
<fanc-tabs 
  v-model="active" 
  active-color="#ff6b00" 
  inactive-color="#666666" 
  background="#f5f5f5"
  :line-width="30"
  :line-height="4"
  :font-size="16"
>
  <fanc-tab title="标签 1">内容 1</fanc-tab>
  <fanc-tab title="标签 2">内容 2</fanc-tab>
  <fanc-tab title="标签 3">内容 3</fanc-tab>
</fanc-tabs>
```

## API

### Tabs Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value/v-model | 绑定当前选中标签的索引或名称 | _number \| string_ | `0` |
| tabs | 标签数据 | _array_ | `[]` |
| type | 样式类型，可选值为 `card` `line` | _string_ | `line` |
| background | 标签栏背景色 | _string_ | `#ffffff` |
| border | 是否显示标签栏下边框 | _boolean_ | `true` |
| font-size | 标签文字大小 | _number_ | `14` |
| active-color | 标签激活态颜色 | _string_ | `var(--fanc-primary-color)` |
| inactive-color | 标签默认态颜色 | _string_ | `var(--text-primary)` |
| line-width | 底部条宽度 | _number_ | `20` |
| line-height | 底部条高度 | _number_ | `3` |
| line-bottom | 底部条距离底部的距离 | _number_ | `0` |
| animated | 是否开启切换动画 | _boolean_ | `false` |
| swipeable | 是否可滑动切换 | _boolean_ | `false` |
| sticky | 是否使用粘性布局 | _boolean_ | `false` |
| offset-top | 粘性布局吸顶距离 | _number_ | `0` |

### Tab Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标签标题 | _string_ | - |
| disabled | 是否禁用标签 | _boolean_ | `false` |
| name | 标签名称，作为匹配的标识符 | _string \| number_ | - |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | 当前标签的索引或名称，索引值 |
| disabled | 点击被禁用的标签时触发 | 被禁用的标签的索引值 |
| scroll | 滚动时触发 | 滚动事件对象 |

### Tabs Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置 Tab 组件 |
| title-n | 标签自定义内容插槽，n 为标签的索引值（从 0 开始） |

### Tab Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于自定义标签内容 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --tabs-nav-bg-color | `var(--white)` | 导航栏背景色 |
| --tabs-nav-card-bg-color | `var(--gray-100)` | 卡片模式下导航栏背景色 |
| --tabs-active-color | `var(--fanc-primary-color)` | 激活状态下的标签颜色 |
| --tabs-inactive-color | `var(--text-primary)` | 非激活状态下的标签颜色 |
| --tabs-disabled-color | `var(--text-disabled)` | 禁用状态下的标签颜色 |
| --tabs-disabled-opacity | `0.6` | 禁用状态下的标签透明度 |
| --tabs-line-color | `var(--fanc-primary-color)` | 底部条颜色 |
| --tabs-card-active-bg | `var(--white)` | 卡片模式下激活状态的背景色 |
| --tabs-card-active-shadow | `rgba(0, 0, 0, 0.08)` | 卡片模式下激活状态的阴影颜色 |
| --tabs-border-color | `var(--border-color)` | 边框颜色 |
| --tabs-nav-height | `44px` | 导航栏高度 |
| --tabs-line-height | `3px` | 底部条高度 |
| --tabs-line-radius | `3px` | 底部条圆角 |
| --tabs-font-size | `14px` | 标签文字大小 |
| --tabs-transition-duration | `0.3s` | 过渡动画时间 |
| --tabs-tab-padding | `0 12px` | 标签内边距 |
| --tabs-tab-min-width | `80px` | 标签最小宽度 |
