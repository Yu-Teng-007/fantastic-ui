# TimePicker 时间选择器

时间选择器组件，用于选择小时、分钟和秒，支持自定义步进值和范围。

## 基础用法

通过 `v-model` 绑定是否显示选择器，通过 `value` 设置当前选中的时间。

```html
<fanc-cell title="选择时间" :value="time" @click="showPicker = true" is-link />

<fanc-time-picker
  v-model="showPicker"
  :value="time"
  @confirm="onConfirm"
/>
```

```js
export default {
  data() {
    return {
      showPicker: false,
      time: '12:30'
    };
  },
  methods: {
    onConfirm(time) {
      this.time = time;
    }
  }
};
```

## 显示秒选择器

设置 `show-seconds` 属性后，时间选择器会显示秒选择器，同时需要设置 `format` 为 `HH:mm:ss`。

```html
<fanc-time-picker
  v-model="showPicker"
  :value="time"
  show-seconds
  format="HH:mm:ss"
  @confirm="onConfirm"
/>
```

## 设置步进值

通过 `minute-step` 和 `second-step` 属性设置分钟和秒的步进值。

```html
<fanc-time-picker
  v-model="showPicker"
  :value="time"
  :minute-step="10"
  :second-step="15"
  show-seconds
  format="HH:mm:ss"
  @confirm="onConfirm"
/>
```

## 限制小时范围

通过 `min-hour` 和 `max-hour` 属性限制小时的选择范围。

```html
<fanc-time-picker
  v-model="showPicker"
  :value="time"
  :min-hour="9"
  :max-hour="18"
  @confirm="onConfirm"
/>
```

## 自定义后缀

通过 `hour-suffix`、`minute-suffix` 和 `second-suffix` 属性设置后缀。

```html
<fanc-time-picker
  v-model="showPicker"
  :value="time"
  hour-suffix="h"
  minute-suffix="m"
  second-suffix="s"
  show-seconds
  format="HH:mm:ss"
  @confirm="onConfirm"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示选择器 | _boolean_ | `false` |
| value | 当前选中的时间，格式为 HH:mm 或 HH:mm:ss | _string_ | - |
| title | 选择器标题 | _string_ | `选择时间` |
| confirm-text | 确认按钮文字 | _string_ | `确认` |
| cancel-text | 取消按钮文字 | _string_ | `取消` |
| show-toolbar | 是否显示顶部栏 | _boolean_ | `true` |
| disabled | 是否禁用 | _boolean_ | `false` |
| height | 选择器高度 | _string \| number_ | `220px` |
| overlay | 是否显示遮罩层 | _boolean_ | `true` |
| round | 是否圆角 | _boolean_ | `true` |
| hour-suffix | 小时后缀 | _string_ | `时` |
| minute-suffix | 分钟后缀 | _string_ | `分` |
| second-suffix | 秒钟后缀 | _string_ | `秒` |
| closeable | 是否显示关闭图标 | _boolean_ | `false` |
| duration | 动画时长，单位毫秒 | _number \| string_ | `300` |
| show-seconds | 是否显示秒选择器 | _boolean_ | `false` |
| format | 时间格式，支持 HH:mm:ss 和 HH:mm | _string_ | `HH:mm` |
| minute-step | 分钟步进值 | _number_ | `1` |
| second-step | 秒钟步进值 | _number_ | `1` |
| min-hour | 可选的最小小时 | _number \| string_ | `0` |
| max-hour | 可选的最大小时 | _number \| string_ | `23` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | _value: string_ |
| cancel | 点击取消按钮时触发 | - |
| change | 选项变化时触发 | _value: string_ |
| close | 关闭时触发 | - |

### Slots

无 