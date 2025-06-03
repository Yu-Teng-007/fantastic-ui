# Breadcrumb 面包屑

面包屑是一种导航辅助工具，用于显示当前页面在网站结构中的位置，帮助用户了解当前所处位置以及快速返回之前的任意页面。

## 基础用法

面包屑组件需要传入一个数组，每个数组项包含 `text` 文本内容和可选的 `url` 跳转链接。

```html
<fanc-breadcrumb :items="items"></fanc-breadcrumb>

<script>
export default {
  data() {
    return {
      items: [
        { text: '首页', url: '/pages/home/index' },
        { text: '组件' },
        { text: '导航组件' },
        { text: '面包屑' }
      ]
    };
  }
};
</script>
```

## 自定义分隔符

通过 `separator` 属性可以自定义分隔符文本，通过 `separatorIcon` 属性可以使用图标作为分隔符。

```html
<!-- 使用文本分隔符 -->
<fanc-breadcrumb :items="items" separator=">"></fanc-breadcrumb>

<!-- 使用图标分隔符 -->
<fanc-breadcrumb :items="items" separatorIcon="angle-right"></fanc-breadcrumb>
```

## 带图标的面包屑

在数组项中设置 `icon` 属性可以为面包屑项添加图标。

```html
<fanc-breadcrumb :items="iconItems"></fanc-breadcrumb>

<script>
export default {
  data() {
    return {
      iconItems: [
        { text: '首页', icon: 'home', url: '/pages/home/index' },
        { text: '组件', icon: 'puzzle-piece' },
        { text: '导航组件', icon: 'compass' },
        { text: '面包屑', icon: 'map-signs' }
      ]
    };
  }
};
</script>
```

## 自定义样式

可以通过传入各种样式属性来自定义面包屑的显示效果。

```html
<fanc-breadcrumb 
  :items="items" 
  fontSize="16" 
  textColor="#666666" 
  activeColor="#ff6700" 
  separatorColor="#999999"
></fanc-breadcrumb>
```

## 不同主题

面包屑组件提供了三种主题样式：`light`（默认）、`dark` 和 `primary`。

```html
<fanc-breadcrumb :items="items" theme="light"></fanc-breadcrumb>
<fanc-breadcrumb :items="items" theme="dark"></fanc-breadcrumb>
<fanc-breadcrumb :items="items" theme="primary"></fanc-breadcrumb>
```

## 使用子组件

面包屑还可以通过子组件的方式使用，更加灵活。

```html
<view class="custom-breadcrumb">
  <fanc-breadcrumb-item 
    text="首页" 
    icon="home" 
    url="/pages/home/index"
  ></fanc-breadcrumb-item>
  
  <fanc-breadcrumb-item 
    text="组件" 
    icon="puzzle-piece"
  ></fanc-breadcrumb-item>
  
  <fanc-breadcrumb-item 
    text="导航组件" 
    icon="compass"
  ></fanc-breadcrumb-item>
  
  <fanc-breadcrumb-item 
    text="面包屑" 
    icon="map-signs"
    active 
    :showSeparator="false"
  ></fanc-breadcrumb-item>
</view>

<style>
.custom-breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px 0;
}
</style>
```

## 监听点击事件

通过 `@item-click` 事件可以监听面包屑项的点击。

```html
<fanc-breadcrumb 
  :items="items"
  @item-click="handleItemClick"
></fanc-breadcrumb>

<script>
export default {
  methods: {
    handleItemClick(item, index) {
      console.log('点击了:', item.text, '索引:', index);
    }
  }
};
</script>
```

## API

### Props

#### FancBreadcrumb Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑项数组 | _array_ | `[]` |
| separator | 分隔符文本 | _string_ | `/` |
| separatorIcon | 分隔符图标，设置后优先使用图标 | _string_ | - |
| theme | 主题，可选值：`light` `dark` `primary` | _string_ | `light` |
| textColor | 文本颜色 | _string_ | - |
| activeColor | 激活状态文本颜色 | _string_ | - |
| separatorColor | 分隔符颜色 | _string_ | - |
| iconColor | 图标颜色 | _string_ | - |
| fontSize | 字体大小，单位px | _number \| string_ | `14` |
| iconSize | 图标大小，单位px | _number \| string_ | `16` |
| separatorSize | 分隔符大小，单位px | _number \| string_ | `12` |
| showHome | 是否显示首页 | _boolean_ | `true` |
| homeText | 首页文本 | _string_ | `首页` |
| homeIcon | 首页图标 | _string_ | `home` |
| homeUrl | 首页链接 | _string_ | `/pages/home/index` |
| clickBubble | 点击事件是否冒泡 | _boolean_ | `false` |

#### FancBreadcrumbItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文本内容 | _string_ | - |
| icon | 图标名称 | _string_ | - |
| url | 链接地址 | _string_ | - |
| active | 是否激活状态 | _boolean_ | `false` |
| textColor | 文本颜色 | _string_ | - |
| activeColor | 激活状态文本颜色 | _string_ | - |
| iconColor | 图标颜色 | _string_ | - |
| fontSize | 字体大小，单位px | _number \| string_ | `14` |
| iconSize | 图标大小，单位px | _number \| string_ | `16` |
| separator | 分隔符文本 | _string_ | `/` |
| separatorIcon | 分隔符图标 | _string_ | - |
| separatorColor | 分隔符颜色 | _string_ | - |
| separatorSize | 分隔符大小，单位px | _number \| string_ | `12` |
| showSeparator | 是否显示分隔符 | _boolean_ | `true` |
| alwaysClick | 是否总是可点击（即使是激活状态） | _boolean_ | `false` |

### Events

#### FancBreadcrumb Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| item-click | 点击面包屑项时触发 | `item: Object, index: number` |

#### FancBreadcrumbItem Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发 | - |

### Slots

#### FancBreadcrumbItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义面包屑项内容 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于定制样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --breadcrumb-text-color | _var(--text-secondary)_ | 面包屑文本颜色 |
| --breadcrumb-active-color | _var(--fanc-primary-color)_ | 面包屑激活项文本颜色 |
| --breadcrumb-separator-color | _var(--text-disabled)_ | 面包屑分隔符颜色 |
| --breadcrumb-icon-color | _var(--text-secondary)_ | 面包屑图标颜色 |
| --breadcrumb-light-bg-color | _var(--bg-white)_ | 浅色主题背景色 |
| --breadcrumb-dark-bg-color | _var(--dark-color)_ | 深色主题背景色 |
| --breadcrumb-dark-text-color | _var(--gray-300)_ | 深色主题文本颜色 |
| --breadcrumb-dark-active-color | _var(--white)_ | 深色主题激活项文本颜色 |
| --breadcrumb-dark-separator-color | _rgba(255, 255, 255, 0.5)_ | 深色主题分隔符颜色 |
| --breadcrumb-primary-bg-color | _var(--fanc-primary-color)_ | 主题色背景色 |
| --breadcrumb-primary-text-color | _rgba(255, 255, 255, 0.9)_ | 主题色文本颜色 |
| --breadcrumb-primary-active-color | _var(--white)_ | 主题色激活项文本颜色 |
| --breadcrumb-primary-separator-color | _rgba(255, 255, 255, 0.7)_ | 主题色分隔符颜色 |
| --breadcrumb-font-size | _14px_ | 字体大小 |
| --breadcrumb-icon-size | _16px_ | 图标大小 |
| --breadcrumb-separator-size | _12px_ | 分隔符大小 |
| --breadcrumb-padding | _8px 16px_ | 内边距 |
| --breadcrumb-separator-margin | _0 8px_ | 分隔符外边距 |
| --breadcrumb-border-radius | _4px_ | 圆角大小 |
| --breadcrumb-shadow-color | _rgba(0, 0, 0, 0.05)_ | 阴影颜色 |
</rewritten_file> 