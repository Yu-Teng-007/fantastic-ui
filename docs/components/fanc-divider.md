# fanc-divider 分割线组件

## 组件介绍

`fanc-divider` 是一个用于区隔内容的分割线组件，常用于页面底部"没有更多"的提示。它可以在视觉上将内容区域分隔开，使页面结构更加清晰。

## 组件特性

- 支持多种分割线类型：实线、虚线和点线
- 支持文本内容显示，可用于"没有更多"等提示
- 支持自定义文本位置：左侧、居中和右侧
- 支持细线模式，显示更加轻量的分割线
- 支持自定义颜色和间距，满足不同场景需求
- 支持自定义内容，可以添加图标等元素

## 组件用法

### 基础用法

```vue
<fanc-divider></fanc-divider>
```

### 展示文本

```vue
<fanc-divider>文本</fanc-divider>
```

### 内容位置

```vue
<fanc-divider position="left">左侧内容</fanc-divider>
<fanc-divider position="center">居中内容</fanc-divider>
<fanc-divider position="right">右侧内容</fanc-divider>
```

### 虚线类型

```vue
<fanc-divider dashed>虚线</fanc-divider>
<fanc-divider type="dotted">点线</fanc-divider>
```

### 自定义样式

```vue
<fanc-divider borderColor="#1989fa" textColor="#1989fa">自定义颜色</fanc-divider>
<fanc-divider hairline>细线</fanc-divider>
<fanc-divider :margin="24">自定义间距</fanc-divider>
```

### 页面底部提示

```vue
<fanc-divider>没有更多了</fanc-divider>
<fanc-divider>
  <fanc-icon name="spinner" size="14" style="margin-right: 4px;"></fanc-icon>
  加载中...
</fanc-divider>
<fanc-divider>
  <text @click="handleRefresh" style="color: #1989fa;">点击刷新</text>
</fanc-divider>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 分割线类型，可选值为 `solid` `dashed` `dotted` | String | `solid` |
| position | 文本位置，可选值为 `left` `center` `right` | String | `center` |
| dashed | 是否为虚线 | Boolean | `false` |
| hairline | 是否使用细线 | Boolean | `false` |
| color | 分割线颜色 | String | - |
| textColor | 文本颜色 | String | - |
| borderColor | 边框颜色 | String | - |
| margin | 上下外边距，单位为px | String \| Number | `16` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 分割线内容 |

## 注意事项

1. 当需要显示文本时，可以使用默认插槽添加文本内容
2. 当使用 `dashed` 属性时，会覆盖 `type` 属性的设置
3. 可以通过 CSS 变量自定义更多样式，如 `--divider-text-padding`、`--divider-text-margin-left` 等
4. 分割线组件适合用于列表底部的"没有更多"提示、内容区域的分隔、页面章节的划分等场景 