# FixedNav 悬浮导航

悬浮收起体验交互，用于快捷导航。

## 基础用法

通过 `items` 属性设置导航项数据。

```html
<fanc-fixed-nav :items="items" @click="onNavItemClick" />
```

```js
export default {
  data() {
    return {
      items: [
        { icon: 'home', text: '首页' },
        { icon: 'user', text: '我的' },
        { icon: 'shopping-cart', text: '购物车' },
        { icon: 'heart', text: '收藏' }
      ]
    };
  },
  methods: {
    onNavItemClick(item, index) {
      console.log(item, index);
    }
  }
};
```

## 不同类型

通过 `type` 属性设置不同类型，支持 `default`、`primary`、`success`、`warning`、`danger` 和 `info` 六种类型。

```html
<fanc-fixed-nav type="primary" :items="items" />
<fanc-fixed-nav type="success" :items="items" />
<fanc-fixed-nav type="warning" :items="items" />
<fanc-fixed-nav type="danger" :items="items" />
<fanc-fixed-nav type="info" :items="items" />
```

## 不同位置

通过 `position` 属性设置不同位置，支持 `left-bottom`、`right-bottom`、`left-top` 和 `right-top` 四个位置。

```html
<fanc-fixed-nav position="left-bottom" :items="items" />
<fanc-fixed-nav position="right-bottom" :items="items" />
<fanc-fixed-nav position="left-top" :items="items" />
<fanc-fixed-nav position="right-top" :items="items" />
```

## 水平方向

通过 `direction` 属性设置排列方向，支持 `horizontal` 和 `vertical` 两种方向。

```html
<fanc-fixed-nav direction="horizontal" :items="items" />
```

## 自定义图标

通过 `mainIcon` 和 `closeIcon` 属性自定义主按钮图标和关闭图标。

```html
<fanc-fixed-nav 
  mainIcon="compass" 
  closeIcon="times-circle" 
  :items="iconItems" 
/>
```

```js
export default {
  data() {
    return {
      iconItems: [
        { icon: 'star', text: '收藏', iconColor: '#f39c12' },
        { icon: 'bell', text: '通知', iconColor: '#3498db' },
        { icon: 'comment', text: '消息', iconColor: '#2ecc71' },
        { icon: 'cog', text: '设置', iconColor: '#9b59b6' }
      ]
    };
  }
};
```

## 带徽标

导航项可以通过 `badge` 属性显示徽标或小红点。

```html
<fanc-fixed-nav :items="badgeItems" />
```

```js
export default {
  data() {
    return {
      badgeItems: [
        { icon: 'home', text: '首页' },
        { icon: 'user', text: '我的', badge: true },
        { icon: 'shopping-cart', text: '购物车', badge: '9' },
        { icon: 'bell', text: '通知', badge: '99+' }
      ]
    };
  }
};
```

## 遮罩层

通过 `overlay` 属性设置是否显示遮罩层，`closeOnClickOverlay` 属性设置是否点击遮罩层关闭。

```html
<fanc-fixed-nav 
  :items="items" 
  :overlay="true" 
  :closeOnClickOverlay="true"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 导航项数据 | _Array_ | `[]` |
| defaultCollapsed | 默认是否收起 | _boolean_ | `true` |
| position | 导航位置，可选值为 `left-bottom`、`right-bottom`、`left-top`、`right-top` | _string_ | `right-bottom` |
| direction | 排列方向，可选值为 `horizontal`、`vertical` | _string_ | `vertical` |
| type | 类型，可选值为 `default`、`primary`、`success`、`warning`、`danger`、`info` | _string_ | `primary` |
| offset | 距离边缘的距离 | _object_ | `{ bottom: '100px', right: '20px' }` |
| zIndex | z-index 层级 | _number \| string_ | `100` |
| showText | 是否显示文字 | _boolean_ | `true` |
| showMainText | 是否显示主按钮文字 | _boolean_ | `true` |
| mainText | 主按钮文字 | _string_ | `菜单` |
| mainIcon | 主按钮图标 | _string_ | `bars` |
| closeIcon | 关闭图标 | _string_ | `times` |
| iconSize | 图标大小 | _number \| string_ | `20` |
| iconColor | 图标颜色 | _string_ | - |
| mainIconColor | 主图标颜色 | _string_ | - |
| activeIndex | 激活的导航项索引 | _number_ | `-1` |
| overlay | 是否显示遮罩层 | _boolean_ | `false` |
| closeOnClickOverlay | 是否点击遮罩层关闭 | _boolean_ | `true` |

### Item 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名称 | _string_ |
| text | 文本 | _string_ |
| badge | 徽标内容，为 `true` 时显示小红点 | _boolean \| string \| number_ |
| iconColor | 图标颜色 | _string_ |
| url | 点击后跳转的链接 | _string_ |
| closeOnClick | 是否在点击后收起 | _boolean_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击导航项时触发 | item: 导航项数据, index: 导航项索引 |
| toggle | 展开/收起状态切换时触发 | collapsed: 是否收起 |

### 样式变量

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --fixed-nav-bg-color | `var(--white)` | 背景颜色 |
| --fixed-nav-text-color | `var(--text-primary)` | 文本颜色 |
| --fixed-nav-active-bg-color | `var(--fanc-primary-color)` | 激活状态背景颜色 |
| --fixed-nav-active-text-color | `var(--white)` | 激活状态文本颜色 |
| --fixed-nav-shadow | `0 2px 8px rgba(0, 0, 0, 0.15)` | 阴影效果 |
| --fixed-nav-item-shadow | `0 2px 8px rgba(0, 0, 0, 0.1)` | 导航项阴影效果 |
| --fixed-nav-primary-bg-color | `var(--fanc-primary-color)` | 主要类型背景颜色 |
| --fixed-nav-success-bg-color | `var(--fanc-success-color)` | 成功类型背景颜色 |
| --fixed-nav-warning-bg-color | `var(--fanc-warning-color)` | 警告类型背景颜色 |
| --fixed-nav-danger-bg-color | `var(--fanc-danger-color)` | 危险类型背景颜色 |
| --fixed-nav-info-bg-color | `var(--fanc-info-color)` | 信息类型背景颜色 |
| --fixed-nav-overlay-bg-color | `rgba(0, 0, 0, 0.5)` | 遮罩层背景颜色 |
| --fixed-nav-badge-bg-color | `var(--fanc-danger-color)` | 徽标背景颜色 |
| --fixed-nav-badge-text-color | `var(--white)` | 徽标文本颜色 |
| --fixed-nav-size | `50px` | 导航按钮尺寸 |
| --fixed-nav-border-radius | `50%` | 导航按钮圆角 |
| --fixed-nav-font-size | `14px` | 文本字体大小 |
| --fixed-nav-icon-size | `20px` | 图标大小 |
| --fixed-nav-z-index | `100` | 层级 |
| --fixed-nav-transition-duration | `0.3s` | 过渡动画时长 |
| --fixed-nav-badge-size | `16px` | 徽标尺寸 |
| --fixed-nav-badge-dot-size | `8px` | 小红点尺寸 |
| --fixed-nav-badge-font-size | `12px` | 徽标字体大小 |
| --fixed-nav-item-spacing | `8px` | 导航项间距 | 