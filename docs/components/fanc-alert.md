# Alert 警告提示

警告提示，展现需要关注的信息。

## 基础用法

基础的警告提示，有四种不同的类型。

```html
<fanc-alert title="信息提示的文案" type="info"></fanc-alert>
<fanc-alert title="成功提示的文案" type="success"></fanc-alert>
<fanc-alert title="警告提示的文案" type="warning"></fanc-alert>
<fanc-alert title="错误提示的文案" type="error"></fanc-alert>
```

## 带有图标

带有图标的警告提示，可以更醒目地展示信息。

```html
<fanc-alert title="信息提示的文案" type="info" show-icon></fanc-alert>
<fanc-alert title="成功提示的文案" type="success" show-icon></fanc-alert>
<fanc-alert title="警告提示的文案" type="warning" show-icon></fanc-alert>
<fanc-alert title="错误提示的文案" type="error" show-icon></fanc-alert>
```

## 带有辅助性文字介绍

带有辅助性文字介绍的警告提示，可以更详细地展示信息。

```html
<fanc-alert 
  title="信息提示的文案" 
  description="信息提示的辅助性文字介绍信息提示的辅助性文字介绍信息提示的辅助性文字介绍" 
  type="info" 
  show-icon
></fanc-alert>
```

## 可关闭的警告提示

可关闭的警告提示，可以手动关闭。

```html
<fanc-alert 
  title="信息提示的文案" 
  type="info" 
  closable 
  @close="handleClose"
></fanc-alert>
```

## 自定义样式

可以设置圆角、浅色背景和居中等样式。

```html
<fanc-alert title="圆角提示" type="info" round></fanc-alert>
<fanc-alert title="浅色背景提示" type="success" plain></fanc-alert>
<fanc-alert title="居中提示" type="warning" center></fanc-alert>
<fanc-alert 
  title="组合样式" 
  type="error" 
  show-icon 
  round 
  center 
  closable
></fanc-alert>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 警告提示的类型，可选值为 `info`、`success`、`warning`、`error` | String | `info` |
| title | 警告提示的标题 | String | - |
| description | 警告提示的辅助性文字介绍 | String | - |
| show-icon | 是否显示图标 | Boolean | `false` |
| icon | 自定义图标名称 | String | - |
| closable | 是否可关闭 | Boolean | `false` |
| round | 是否使用圆角 | Boolean | `false` |
| plain | 是否使用浅色背景 | Boolean | `false` |
| center | 文字是否居中 | Boolean | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭警告提示时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 警告提示的标题内容 |
| description | 警告提示的辅助性文字介绍内容 |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --alert-padding | 12px 16px | 内边距 |
| --alert-border-radius | 4px | 圆角大小 |
| --alert-round-border-radius | 16px | 圆角样式的圆角大小 |
| --alert-font-size | 14px | 字体大小 |
| --alert-line-height | 1.5 | 行高 |
| --alert-title-font-weight | 500 | 标题字体粗细 |
| --alert-icon-margin-right | 10px | 图标右边距 |
| --alert-description-margin-top | 6px | 描述文字上边距 |
| --alert-description-font-size | 12px | 描述文字字体大小 |
| --alert-close-top | 12px | 关闭按钮顶部位置 |
| --alert-close-right | 16px | 关闭按钮右侧位置 |
| --alert-close-padding | 4px | 关闭按钮内边距 |
| --alert-with-description-title-font-size | 16px | 带描述文字时标题字体大小 |
| --alert-with-description-title-margin-bottom | 4px | 带描述文字时标题下边距 |
| --alert-with-description-icon-margin-top | 4px | 带描述文字时图标顶部边距 |
| --alert-info-color | var(--info-color) | 信息类型文字颜色 |
| --alert-info-bg-color | #f0f8ff | 信息类型背景颜色 |
| --alert-info-border-color | #d0e6ff | 信息类型边框颜色 |
| --alert-success-color | var(--success-color) | 成功类型文字颜色 |
| --alert-success-bg-color | #f0f9eb | 成功类型背景颜色 |
| --alert-success-border-color | #e1f3d8 | 成功类型边框颜色 |
| --alert-warning-color | var(--warning-color) | 警告类型文字颜色 |
| --alert-warning-bg-color | #fffbe5 | 警告类型背景颜色 |
| --alert-warning-border-color | #fff1c2 | 警告类型边框颜色 |
| --alert-error-color | var(--danger-color) | 错误类型文字颜色 |
| --alert-error-bg-color | #fff2f0 | 错误类型背景颜色 |
| --alert-error-border-color | #ffccc7 | 错误类型边框颜色 |
| --alert-description-color | var(--text-secondary) | 描述文字颜色 |
| --alert-close-color | var(--gray-600) | 关闭按钮颜色 | 