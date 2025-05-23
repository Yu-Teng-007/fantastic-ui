# DatePicker 日期选择器

日期选择器组件，用于选择年、月、日，通常与弹出层组件配合使用。

## 基本用法

```html
<fanc-date-picker
  v-model="show"
  @confirm="onConfirm"
/>
```

```js
export default {
  data() {
    return {
      show: false,
      date: ''
    };
  },
  methods: {
    onConfirm(e) {
      this.date = e.text; // 例如：2023-05-20
      this.show = false;
    }
  }
};
```

## 自定义类型

DatePicker 支持四种选择类型：

- `date`: 选择年月日（默认）
- `year-month`: 选择年月
- `month-day`: 选择月日
- `year`: 选择年份

```html
<fanc-date-picker
  v-model="show"
  type="year-month"
  @confirm="onConfirm"
/>
```

## 自定义日期范围

可以使用 `min-date` 和 `max-date` 属性限制可选的日期范围。

```html
<fanc-date-picker
  v-model="show"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="onConfirm"
/>
```

```js
export default {
  data() {
    return {
      show: false,
      minDate: new Date('2020-01-01').getTime(),
      maxDate: new Date('2025-12-31').getTime()
    };
  }
};
```

## 自定义文本后缀

可以使用 `year-suffix`、`month-suffix` 和 `day-suffix` 属性自定义每一列的后缀文本。

```html
<fanc-date-picker
  v-model="show"
  year-suffix=""
  month-suffix="/"
  day-suffix=""
  @confirm="onConfirm"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示选择器 | `Boolean` | `false` |
| type | 选择器类型，可选值为 `date`、`year-month`、`month-day`、`year` | `String` | `date` |
| title | 选择器标题 | `String` | `选择日期` |
| confirm-text | 确认按钮文字 | `String` | `确认` |
| cancel-text | 取消按钮文字 | `String` | `取消` |
| show-toolbar | 是否显示顶部栏 | `Boolean` | `true` |
| disabled | 是否禁用 | `Boolean` | `false` |
| height | 选择器高度 | `String` | `220px` |
| overlay | 是否显示遮罩层 | `Boolean` | `true` |
| round | 是否圆角 | `Boolean` | `true` |
| year-suffix | 年份后缀 | `String` | `年` |
| month-suffix | 月份后缀 | `String` | `月` |
| day-suffix | 日期后缀 | `String` | `日` |
| closeable | 是否显示关闭图标 | `Boolean` | `false` |
| duration | 动画时长，单位为毫秒 | `Number|String` | `300` |
| min-date | 可选的最小日期（时间戳或YYYY-MM-DD格式） | `Number|String` | 十年前 |
| max-date | 可选的最大日期（时间戳或YYYY-MM-DD格式） | `Number|String` | 十年后 |
| default-date | 默认选中的日期（时间戳或YYYY-MM-DD格式） | `Number|String` | 当前日期 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | { value: 时间戳, text: 格式化日期文本, year: 年份, month: 月份, day: 日期 } |
| cancel | 点击取消按钮时触发 | - |
| change | 选项变化时触发 | { detail: { value: 选中项 } } |
| close | 关闭时触发 | - |

## 注意事项

1. 如果传入的 `min-date` 或 `max-date` 是字符串格式，需要确保格式正确（YYYY-MM-DD）
2. 组件返回的日期格式根据选择器类型不同而不同：
   - `date`: YYYY-MM-DD，如 2023-05-20
   - `year-month`: YYYY-MM，如 2023-05
   - `month-day`: MM-DD，如 05-20
   - `year`: YYYY，如 2023

## 样式变量

组件提供了以下CSS变量，可以用来自定义样式：

```css
--date-picker-bg-color: var(--white);
--date-picker-text-color: var(--text-primary);
--date-picker-disabled-opacity: var(--form-disabled-opacity);
--date-picker-title-color: var(--text-primary);
--date-picker-confirm-color: var(--fanc-primary-color);
--date-picker-cancel-color: var(--text-secondary);
--date-picker-item-color: var(--text-primary);
--date-picker-item-disabled-color: var(--text-disabled);
--date-picker-item-active-color: var(--fanc-primary-color);
--date-picker-toolbar-height: 44px;
--date-picker-item-height: 40px;
--date-picker-indicator-border-color: var(--border-color);
``` 