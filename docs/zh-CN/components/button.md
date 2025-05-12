# Button 按钮

按钮组件用于触发操作，如提交表单、确认操作等。Fantastic UI 提供多种样式、尺寸和状态的按钮，满足不同场景的需求。

## 基础用法

基础的按钮用法，包括多种类型：默认按钮、主要按钮、成功按钮、警告按钮和危险按钮。

```html
<fanc-button>默认按钮</fanc-button>
<fanc-button type="primary">主要按钮</fanc-button>
<fanc-button type="success">成功按钮</fanc-button>
<fanc-button type="warning">警告按钮</fanc-button>
<fanc-button type="danger">危险按钮</fanc-button>
```

## 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```html
<fanc-button plain>朴素按钮</fanc-button>
<fanc-button type="primary" plain>主要按钮</fanc-button>
<fanc-button type="success" plain>成功按钮</fanc-button>
<fanc-button type="warning" plain>警告按钮</fanc-button>
<fanc-button type="danger" plain>危险按钮</fanc-button>
```

## 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```html
<fanc-button disabled>禁用按钮</fanc-button>
<fanc-button type="primary" disabled>禁用主要按钮</fanc-button>
<fanc-button type="success" disabled>禁用成功按钮</fanc-button>
```

## 加载状态

通过 `loading` 属性设置按钮为加载状态，加载状态下按钮同样不可点击。

```html
<fanc-button loading>加载中...</fanc-button>
<fanc-button type="primary" loading>加载中...</fanc-button>
<fanc-button type="success" loading loadingText="加载中">加载中...</fanc-button>
```

## 按钮尺寸

支持 `large`、`normal`、`small` 和 `mini` 四种尺寸，默认为 `normal`。

```html
<fanc-button size="large">大型按钮</fanc-button>
<fanc-button>默认按钮</fanc-button>
<fanc-button size="small">小型按钮</fanc-button>
<fanc-button size="mini">迷你按钮</fanc-button>
```

## 块级按钮

按钮默认为行内块级元素，通过 `block` 属性可以将其设置为块级元素，宽度为 100%。

```html
<fanc-button type="primary" block>块级按钮</fanc-button> <fanc-button type="success" block>块级按钮</fanc-button>
```

## 自定义颜色

通过 `color` 属性可以自定义按钮的颜色。

```html
<fanc-button color="#8e44ad">自定义颜色</fanc-button> <fanc-button color="#8e44ad" plain>自定义颜色</fanc-button>
```

## 圆角按钮

通过 `round` 属性可以将按钮设置为圆角按钮。

```html
<fanc-button type="primary" round>圆角按钮</fanc-button> <fanc-button type="success" round>圆角按钮</fanc-button>
```

## 方形按钮

通过 `square` 属性可以将按钮设置为方形按钮，常用于图标按钮。

```html
<fanc-button type="primary" square>方形按钮</fanc-button> <fanc-button type="success" square>方形按钮</fanc-button>
```

## 图标按钮

通过 `icon` 属性设置按钮图标，支持图标名称或图片 URL。

```html
<fanc-button icon="home">主页</fanc-button>
<fanc-button icon="https://example.com/icon.png">图片图标</fanc-button>
<fanc-button icon="search" type="primary">搜索</fanc-button>
```

## 页面导航

按钮可以通过 `url` 或 `to` 属性进行页面跳转。

```html
<fanc-button url="/pages/index/index">跳转到首页</fanc-button>
<fanc-button to="/pages/about/about" type="primary">关于我们</fanc-button>
```

## API

### Props

| 参数        | 说明                                                                | 类型             | 默认值    |
| ----------- | ------------------------------------------------------------------- | ---------------- | --------- |
| type        | 按钮类型，可选值为 `default` `primary` `success` `warning` `danger` | String           | `default` |
| plain       | 是否为朴素按钮                                                      | Boolean          | `false`   |
| disabled    | 是否禁用按钮                                                        | Boolean          | `false`   |
| loading     | 是否显示为加载状态                                                  | Boolean          | `false`   |
| loadingText | 加载状态文字                                                        | String           | -         |
| square      | 是否为方形按钮                                                      | Boolean          | `false`   |
| round       | 是否为圆角按钮                                                      | Boolean          | `false`   |
| icon        | 按钮图标，支持图标名称或图片 URL                                    | String           | -         |
| size        | 按钮尺寸，可选值为 `large` `normal` `small` `mini`                  | String           | `normal`  |
| block       | 是否为块级元素                                                      | Boolean          | `false`   |
| url         | 跳转链接                                                            | String           | -         |
| to          | 路由跳转对象，同 vue-router 的 to                                   | String \| Object | -         |
| color       | 按钮颜色，支持十六进制颜色                                          | String           | -         |

### Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| click  | 点击按钮时触发 | event: Event |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## 最佳实践

### 按钮类型选择

-   **主要按钮（Primary）**：用于页面主要操作，如提交表单、确认订单等
-   **成功按钮（Success）**：用于表示成功或完成操作
-   **警告按钮（Warning）**：用于需要用户注意的操作
-   **危险按钮（Danger）**：用于危险或不可逆操作，如删除数据

### 按钮状态

-   使用 `loading` 状态表示异步操作进行中
-   使用 `disabled` 状态表示按钮不可用

### 按钮位置

-   主要按钮应放在次要按钮的右侧（在从左到右阅读的语言环境中）
-   表单底部的提交按钮应靠右对齐
-   对话框底部的操作按钮应根据平台习惯排列

### 移动端优化

-   在移动端使用较大的按钮尺寸，确保易于点击
-   使用 `block` 属性创建全宽按钮，提高可点击区域
