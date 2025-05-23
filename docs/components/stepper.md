# Stepper 步进器

步进器组件，用于增加或减少数值，常用于商品数量选择。

## 基础用法

```html
<fanc-stepper v-model="value" />
```

## 步长设置

通过 `step` 属性设置每次点击增加或减少的值，默认为 `1`。

```html
<fanc-stepper v-model="value" :step="2" />
```

## 限制输入范围

通过 `min` 和 `max` 属性限制输入范围。

```html
<fanc-stepper v-model="value" :min="5" :max="10" />
```

## 禁用状态

通过 `disabled` 属性设置禁用状态。

```html
<fanc-stepper v-model="value" disabled />
```

## 禁用输入框

通过 `disable-input` 属性禁用输入框，仅允许通过按钮进行加减操作。

```html
<fanc-stepper v-model="value" disable-input />
```

## 固定小数位数

通过 `decimal-length` 属性设置固定显示的小数位数。

```html
<fanc-stepper v-model="value" :step="0.2" :decimal-length="1" />
```

## 自定义大小

通过 `input-width` 和 `button-size` 属性自定义大小。

```html
<fanc-stepper v-model="value" input-width="60px" button-size="20" />
```

## 圆角风格

设置 `theme` 属性为 `round` 展示圆角风格。

```html
<fanc-stepper v-model="value" theme="round" />
```

## 禁用增加/减少按钮

通过 `disable-plus` 和 `disable-minus` 属性禁用对应的按钮。

```html
<!-- 禁用增加按钮 -->
<fanc-stepper v-model="value" disable-plus />

<!-- 禁用减少按钮 -->
<fanc-stepper v-model="value" disable-minus />
```

## 长按连续增减

步进器支持长按按钮连续增减数值，长按时间越长，变化速度越快。

```html
<fanc-stepper v-model="value" :min="0" :max="100" />
```

可以通过 `long-press-interval` 和 `long-press-start-time` 属性自定义长按行为。

```html
<!-- 自定义长按间隔和加速时间 -->
<fanc-stepper 
  v-model="value" 
  :long-press-interval="300" 
  :long-press-start-time="800" 
/>
```

## 快速点击响应

步进器组件经过优化，支持快速点击操作，每次点击都能正确响应，不会出现点击无效的情况。

```html
<fanc-stepper v-model="value" />
```

当用户快速点击按钮时，组件会智能处理点击事件，确保每次点击都能正确触发值的变化，同时又不会因为事件冲突导致重复触发。

## 异步变更

通过监听 `change` 事件处理异步逻辑。

```html
<fanc-stepper v-model="value" @change="onChange" />
```

```js
export default {
  data() {
    return {
      value: 1
    };
  },
  methods: {
    onChange(value) {
      console.log('数值已更新:', value);
      // 处理异步逻辑
    }
  }
};
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值，支持v-model双向绑定 | `Number \| String` | `0` |
| min | 最小值 | `Number \| String` | `0` |
| max | 最大值 | `Number \| String` | `Infinity` |
| step | 步长，每次点击增加或减少的值 | `Number \| String` | `1` |
| disabled | 是否禁用步进器 | `Boolean` | `false` |
| input-width | 输入框宽度 | `String` | `40px` |
| button-size | 按钮图标大小 | `Number \| String` | `16` |
| show-input | 是否显示输入框 | `Boolean` | `true` |
| disable-input | 是否禁用输入框 | `Boolean` | `false` |
| decimal-length | 固定显示的小数位数 | `Number \| String` | `null` |
| disable-plus | 是否禁用增加按钮 | `Boolean` | `false` |
| disable-minus | 是否禁用减少按钮 | `Boolean` | `false` |
| allow-empty | 是否允许输入框为空 | `Boolean` | `false` |
| theme | 主题样式，可选值为 round/square | `String` | `square` |
| placeholder | 输入框占位符 | `String` | `''` |
| long-press-interval | 长按按钮时触发变化的间隔，单位毫秒 | `Number \| String` | `200` |
| long-press-start-time | 长按按钮时变化速率加速的延迟，单位毫秒 | `Number \| String` | `600` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值改变时触发 | `value: 当前值` |
| focus | 输入框聚焦时触发 | `event: Event` |
| blur | 输入框失焦时触发 | `value: 当前值` |
| plus | 点击增加按钮时触发 | `value: 当前值` |
| minus | 点击减少按钮时触发 | `value: 当前值` |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --stepper-button-width | `28px` | 按钮宽度 |
| --stepper-button-height | `28px` | 按钮高度 |
| --stepper-button-bg-color | `var(--white)` | 按钮背景色 |
| --stepper-button-border-color | `var(--border-color)` | 按钮边框颜色 |
| --stepper-button-disabled-bg-color | `var(--gray-100)` | 禁用状态按钮背景色 |
| --stepper-button-disabled-border-color | `var(--border-color)` | 禁用状态按钮边框颜色 |
| --stepper-button-disabled-color | `var(--text-disabled)` | 禁用状态按钮文字颜色 |
| --stepper-button-icon-color | `var(--text-primary)` | 按钮图标颜色 |
| --stepper-button-active-bg-color | `var(--gray-100)` | 按钮激活状态背景色 |
| --stepper-input-width | `40px` | 输入框宽度 |
| --stepper-input-height | `28px` | 输入框高度 |
| --stepper-input-font-size | `14px` | 输入框字体大小 |
| --stepper-input-text-color | `var(--text-primary)` | 输入框文字颜色 |
| --stepper-input-bg-color | `var(--white)` | 输入框背景色 |
| --stepper-input-border-color | `var(--border-color)` | 输入框边框颜色 |
| --stepper-input-disabled-bg-color | `var(--gray-100)` | 禁用状态输入框背景色 |
| --stepper-input-disabled-text-color | `var(--text-disabled)` | 禁用状态输入框文字颜色 |
| --stepper-border-radius-left | `4px 0 0 4px` | 左侧按钮边框圆角 |
| --stepper-border-radius-right | `0 4px 4px 0` | 右侧按钮边框圆角 |
| --stepper-disabled-opacity | `0.6` | 禁用状态透明度 | 