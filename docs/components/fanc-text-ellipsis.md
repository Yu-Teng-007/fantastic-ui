# TextEllipsis 文本省略

### 介绍

`TextEllipsis` 组件用于对长文本内容进行省略显示，并提供展开/收起功能，适用于文章摘要、商品描述、评论内容等场景。

### 引入

```js
// 全局引入
import FantasticUI from 'fantastic-ui';
Vue.use(FantasticUI);

// 单独引入
import { FancTextEllipsis } from 'fantastic-ui';
Vue.component(FancTextEllipsis.name, FancTextEllipsis);
```

## 代码演示

### 基础用法

通过 `text` 属性设置文本内容，`rows` 属性设置最大显示行数，默认为3行。

```html
<fanc-text-ellipsis :text="text" :rows="2"></fanc-text-ellipsis>
```

### 默认展开

通过 `default-expanded` 属性设置组件默认是否展开。

```html
<fanc-text-ellipsis :text="text" :default-expanded="true"></fanc-text-ellipsis>
```

### 自定义行数

通过 `rows` 属性可以自定义文本最大显示行数。

```html
<fanc-text-ellipsis :text="text" :rows="4"></fanc-text-ellipsis>
```

### 自定义按钮文本

通过 `expand-text` 和 `collapse-text` 属性自定义展开和收起按钮的文本。

```html
<fanc-text-ellipsis 
  :text="text" 
  expand-text="查看更多" 
  collapse-text="收起内容">
</fanc-text-ellipsis>
```

### 不显示图标

通过 `show-icon` 属性控制是否显示展开/收起按钮的图标。

```html
<fanc-text-ellipsis :text="text" :show-icon="false"></fanc-text-ellipsis>
```

### 自定义样式

组件支持自定义文本样式，如字体大小、行高、文本颜色、按钮颜色等。

```html
<fanc-text-ellipsis 
  :text="text" 
  font-size="16px"
  line-height="1.8"
  text-color="#333333"
  trigger-color="#ff6600">
</fanc-text-ellipsis>
```

### 使用插槽

可以通过默认插槽传入自定义内容，支持HTML结构。

```html
<fanc-text-ellipsis :rows="3">
  <view>
    <text>这是通过</text>
    <text style="color: #ff6600; font-weight: bold;">插槽</text>
    <text>传入的内容，可以包含</text>
    <text style="color: #007bff; text-decoration: underline;">复杂的HTML结构</text>
    <text>，比如加粗、颜色、下划线等样式。</text>
  </view>
</fanc-text-ellipsis>
```

### 监听展开/收起事件

通过 `toggle` 事件可以监听文本的展开和收起状态变化。

```html
<fanc-text-ellipsis 
  :text="text" 
  @toggle="onToggle">
</fanc-text-ellipsis>
```

```js
export default {
  methods: {
    onToggle(expanded) {
      console.log('当前状态:', expanded ? '已展开' : '已收起');
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 显示的文本内容 | _string_ | `''` |
| rows | 最大显示行数 | _number_ | `3` |
| default-expanded | 是否默认展开 | _boolean_ | `false` |
| expand-text | 展开按钮文本 | _string_ | `'展开'` |
| collapse-text | 收起按钮文本 | _string_ | `'收起'` |
| trigger-color | 展开/收起按钮颜色 | _string_ | `var(--fanc-primary-color)` |
| show-icon | 是否显示展开/收起图标 | _boolean_ | `true` |
| always-show-trigger | 是否始终显示展开/收起按钮 | _boolean_ | `false` |
| line-height | 文本行高 | _string_ | `'1.5'` |
| font-size | 文本字体大小 | _string_ | `'14px'` |
| text-color | 文本颜色 | _string_ | `var(--text-primary)` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| toggle | 展开/收起状态切换时触发 | _expanded: boolean_ |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义文本内容 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [主题定制](#/theme)。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --text-ellipsis-text-color | var(--text-primary) | 文本颜色 |
| --text-ellipsis-trigger-color | var(--fanc-primary-color) | 触发器颜色 |
| --text-ellipsis-trigger-hover-color | rgba(0, 123, 255, 0.8) | 触发器悬停颜色 |
| --text-ellipsis-background-color | var(--bg-white) | 背景颜色 |
| --text-ellipsis-font-size | 14px | 文本字体大小 |
| --text-ellipsis-line-height | 1.5 | 文本行高 |
| --text-ellipsis-transition-duration | 0.3s | 过渡动画持续时间 |
| --text-ellipsis-trigger-padding | 8px 0 | 触发器内边距 |
| --text-ellipsis-trigger-font-size | 14px | 触发器字体大小 |
``` 