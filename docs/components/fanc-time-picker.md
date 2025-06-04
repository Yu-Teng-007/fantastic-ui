# TimePicker 时间选择器

TimePicker 组件用于选择时间，支持小时、分钟和秒的选择。

## 基础用法

```html
<fanc-time-picker v-model="time" @confirm="onConfirm" />
```

```javascript
export default {
  data() {
    return {
      time: '',
    };
  },
  methods: {
    onConfirm(value) {
      console.log('选择的时间：', value);
    },
  },
};
```

## 设置默认值

通过 `v-model` 设置默认值，格式为 `HH:mm` 或 `HH:mm:ss`。

```html
<fanc-time-picker v-model="time" @confirm="onConfirm" />
```

```javascript
export default {
  data() {
    return {
      time: '12:30',
    };
  },
  methods: {
    onConfirm(value) {
      console.log('选择的时间：', value);
    },
  },
};
```

## 设置选择范围

通过 `min-hour`、`max-hour`、`min-minute` 和 `max-minute` 属性限制可选时间范围。

```html
<fanc-time-picker
  v-model="time"
  :min-hour="10"
  :max-hour="20"
  :min-minute="0"
  :max-minute="59"
  @confirm="onConfirm"
/>
```

## 显示秒选择

设置 `show-seconds` 属性后，时间选择器会显示秒选择列。

```html
<fanc-time-picker v-model="time" show-seconds @confirm="onConfirm" />
```

## 显示标题

设置 `title` 属性后，时间选择器会显示标题。

```html
<fanc-time-picker v-model="time" title="选择时间" @confirm="onConfirm" />
```

## 设置选项间距

通过 `option-height` 属性设置选项的高度，通过 `visible-option-num` 属性设置可见的选项个数。

```html
<fanc-time-picker
  v-model="time"
  :option-height="50"
  :visible-option-num="5"
  @confirm="onConfirm"
/>
```

## 自定义小时格式

通过 `hour-format` 属性设置小时格式，可选值为 `12` 或 `24`，默认为 `24`。

```html
<fanc-time-picker v-model="time" hour-format="12" @confirm="onConfirm" />
```

## 自定义时间格式化函数

通过 `formatter` 属性设置自定义格式化函数，用于格式化显示的时间文本。

```html
<fanc-time-picker v-model="time" :formatter="formatter" @confirm="onConfirm" />
```

```javascript
export default {
  data() {
    return {
      time: '12:30',
    };
  },
  methods: {
    formatter(type, value) {
      if (type === 'hour') {
        return `${value}时`;
      }
      if (type === 'minute') {
        return `${value}分`;
      }
      if (type === 'second') {
        return `${value}秒`;
      }
      return value;
    },
    onConfirm(value) {
      console.log('选择的时间：', value);
    },
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中的时间，格式为 `HH:mm` 或 `HH:mm:ss` | _string_ | - |
| min-hour | 可选的最小小时 | _number \| string_ | `0` |
| max-hour | 可选的最大小时 | _number \| string_ | `23` |
| min-minute | 可选的最小分钟 | _number \| string_ | `0` |
| max-minute | 可选的最大分钟 | _number \| string_ | `59` |
| min-second | 可选的最小秒数 | _number \| string_ | `0` |
| max-second | 可选的最大秒数 | _number \| string_ | `59` |
| show-seconds | 是否显示秒选择列 | _boolean_ | `false` |
| title | 顶部标题 | _string_ | - |
| confirm-button-text | 确认按钮文字 | _string_ | `确定` |
| cancel-button-text | 取消按钮文字 | _string_ | `取消` |
| option-height | 选项高度，单位为 px | _number \| string_ | `44` |
| visible-option-num | 可见的选项个数 | _number \| string_ | `5` |
| hour-format | 小时格式，可选值为 `12` 或 `24` | _number \| string_ | `24` |
| formatter | 选项格式化函数 | _(type: string, value: string) => string_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击完成按钮时触发 | _value: string_ |
| cancel | 点击取消按钮时触发 | - |
| change | 选项变化时触发 | _value: string_ |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义整个组件的内容 |
| title | 自定义标题内容 |
| confirm | 自定义确认按钮内容 |
| cancel | 自定义取消按钮内容 |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --time-picker-background | var(--white) | 背景色 |
| --time-picker-title-height | 44px | 标题高度 |
| --time-picker-title-font-size | 16px | 标题字体大小 |
| --time-picker-title-color | var(--text-primary) | 标题颜色 |
| --time-picker-title-line-height | 44px | 标题行高 |
| --time-picker-action-padding | 0 16px | 操作按钮内边距 |
| --time-picker-action-font-size | 14px | 操作按钮字体大小 |
| --time-picker-confirm-button-color | var(--primary-color) | 确认按钮颜色 |
| --time-picker-cancel-button-color | var(--gray-600) | 取消按钮颜色 |
| --time-picker-option-font-size | 16px | 选项字体大小 |
| --time-picker-option-text-color | var(--text-primary) | 选项文字颜色 |
| --time-picker-option-disabled-opacity | 0.3 | 禁用选项透明度 |
| --time-picker-option-selected-text-color | var(--primary-color) | 选中选项文字颜色 |
| --time-picker-mask-background | linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)) | 蒙层背景 | 