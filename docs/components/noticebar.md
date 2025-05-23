# Noticebar 公告栏

公告栏组件用于展示系统公告、消息通知、活动提醒等信息。

## 基础用法

```html
<fanc-noticebar text="这是一条普通的公告信息"></fanc-noticebar>
```

## 不同类型

公告栏有四种类型：`info`、`success`、`warning`、`error`。

```html
<fanc-noticebar type="info" text="这是一条信息通知"></fanc-noticebar>
<fanc-noticebar type="success" text="这是一条成功通知"></fanc-noticebar>
<fanc-noticebar type="warning" text="这是一条警告通知"></fanc-noticebar>
<fanc-noticebar type="error" text="这是一条错误通知"></fanc-noticebar>
```

## 可关闭的公告栏

设置 `closable` 属性后，公告栏会显示关闭按钮。

```html
<fanc-noticebar text="这是一条可关闭的公告" closable></fanc-noticebar>
```

## 滚动公告

当公告内容较长时，可以设置 `scrollable` 属性开启滚动效果。

```html
<fanc-noticebar text="这是一条较长的公告内容，将会自动滚动显示，以便用户查看完整信息。" scrollable></fanc-noticebar>
```

## 多行显示

默认情况下，公告栏内容为单行显示。设置 `multiLine` 属性可以支持多行文本。

```html
<fanc-noticebar text="这是一条多行公告内容。这是第二行内容。这是第三行内容。" multiLine></fanc-noticebar>
```

## 带操作按钮

设置 `actionText` 属性可以在公告栏右侧显示操作按钮。

```html
<fanc-noticebar text="这是一条带有操作按钮的公告" actionText="查看详情" @action="onActionClick"></fanc-noticebar>
```

## 轮播公告

当需要轮播显示多条公告时，可以将 `text` 设置为数组。

```html
<fanc-noticebar
    :text="[
    '第一条公告内容',
    '第二条公告内容',
    '第三条公告内容'
  ]"
    showPlayBtn
></fanc-noticebar>
```

## 自定义图标

可以通过 `iconName` 属性自定义左侧图标，也可以通过 `showIcon` 控制是否显示图标。

```html
<fanc-noticebar text="这是一条使用自定义图标的公告" iconName="bell"></fanc-noticebar>

<fanc-noticebar text="这是一条没有图标的公告" :showIcon="false"></fanc-noticebar>
```

## 支持 HTML 内容

设置 `enableHtml` 属性可以支持 HTML 内容渲染。

```html
<fanc-noticebar
    text="<span style='color: red'>重要通知</span>：系统将于今晚22:00进行升级维护。"
    enableHtml
></fanc-noticebar>
```

## API

### Props

| 参数         | 说明                                          | 类型         | 默认值 |
| ------------ | --------------------------------------------- | ------------ | ------ |
| text         | 公告内容，可以是字符串或字符串数组            | String/Array | -      |
| type         | 公告类型，可选值为 info/success/warning/error | String       | info   |
| showIcon     | 是否显示图标                                  | Boolean      | true   |
| iconName     | 自定义图标名称                                | String       | -      |
| closable     | 是否显示关闭按钮                              | Boolean      | false  |
| scrollable   | 是否开启滚动播放                              | Boolean      | false  |
| scrollSpeed  | 滚动速度，单位为像素/秒                       | Number       | 50     |
| autoPlay     | 是否自动播放，仅在 text 为数组时有效          | Boolean      | true   |
| playInterval | 播放间隔，单位为毫秒                          | Number       | 3000   |
| showPlayBtn  | 是否显示播放控制按钮                          | Boolean      | false  |
| multiLine    | 是否支持多行展示                              | Boolean      | false  |
| actionText   | 操作按钮文本                                  | String       | -      |
| enableHtml   | 是否支持 HTML 内容                            | Boolean      | false  |

### Events

| 事件名 | 说明               | 回调参数     |
| ------ | ------------------ | ------------ |
| click  | 点击公告内容时触发 | event: Event |
| close  | 关闭公告时触发     | event: Event |
| action | 点击操作按钮时触发 | event: Event |

## 最佳实践

1. **选择合适的类型**：根据通知的重要性和紧急程度选择合适的类型。

    - `info` - 一般信息通知
    - `success` - 成功或积极反馈
    - `warning` - 需要注意的提示
    - `error` - 错误或重要警告

2. **简洁明了**：公告内容应简洁明了，传达核心信息。

3. **长度控制**：

    - 单行公告：内容应尽量简短
    - 长内容：使用滚动效果或多行展示
    - 多条公告：使用轮播形式展示

4. **交互反馈**：

    - 重要通知应提供操作入口，如"查看详情"
    - 非必要通知应允许用户关闭

5. **视觉层次**：避免在同一页面使用过多公告栏，以免分散用户注意力。

6. **响应式考虑**：在不同设备上测试公告栏的显示效果，确保良好的用户体验。
