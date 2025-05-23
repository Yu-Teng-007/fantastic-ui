# Calendar 日历

日历组件用于选择日期或日期区间，支持单个日期、多个日期、日期范围等多种选择模式。

## 基础用法

日历组件默认使用弹窗形式展示，支持多种使用场景。

### 单个日期选择

最简单的用法是选择单个日期，适用于生日、预约日期等场景。

```vue
<template>
    <view>
        <fanc-button @click="showCalendar">选择日期</fanc-button>
        <fanc-calendar v-model="showCalendar" @confirm="onConfirm" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            showCalendar: false,
            selectedDate: "",
        };
    },
    methods: {
        onConfirm(date) {
            this.selectedDate = date;
        },
    },
};
</script>
```

### 自定义颜色和按钮文字

可以通过 `color` 和 `confirmText` 属性自定义主题颜色和按钮文字。

```vue
<fanc-calendar v-model="showCalendar" color="#ff6b6b" confirm-text="完成" @confirm="onConfirm" />
```

### 日期多选

通过 `type="multiple"` 可以选择多个日期，适用于选择多个休假日等场景。

```vue
<fanc-calendar v-model="showCalendar" type="multiple" @confirm="onMultipleConfirm" />
```

### 日期范围选择

通过 `type="range"` 可以选择日期范围，适用于选择入住离店日期、活动起止日期等场景。

```vue
<fanc-calendar
    v-model="showCalendar"
    type="range"
    title="选择日期范围"
    subtitle="请选择开始和结束日期"
    @confirm="onRangeConfirm"
/>
```

### 自定义日期文案

通过 `textFormatter` 函数可以为日期添加额外的文案信息，如节假日、价格标记等。

```vue
<fanc-calendar v-model="showCalendar" :text-formatter="formatCalendarDay" @confirm="onConfirm" />

<script>
export default {
    methods: {
        formatCalendarDay(date) {
            const day = date.getDate();
            const weekday = date.getDay();

            // 为周末添加标记
            if (weekday === 0 || weekday === 6) {
                return "周末";
            }

            // 为特定日期添加标记
            if (day === 1) {
                return "月初";
            }

            return "";
        },
    },
};
</script>
```

### 自定义周起始日

通过 `firstDayOfWeek` 属性可以自定义一周的起始日，默认为 0（周日），可以设置为 1（周一）。

```vue
<fanc-calendar v-model="showCalendar" :first-day-of-week="1" @confirm="onConfirm" />
```

### 滚动模式

通过 `scroll` 属性可以启用滚动模式，展示多个月份，适用于查看较长时间跨度的日期。

```vue
<fanc-calendar v-model="showCalendar" :scroll="true" @confirm="onConfirm" />
```

### 日期范围限制

通过 `minDate` 和 `maxDate` 属性可以限制可选日期的范围，避免选择无效日期。

```vue
<fanc-calendar v-model="showCalendar" min-date="2025-01-01" max-date="2025-12-31" @confirm="onConfirm" />
```

### 弹出位置

通过 `position` 属性可以设置弹出位置，默认为 `bottom`，可以设置为 `center`。

```vue
<fanc-calendar v-model="showCalendar" position="center" @confirm="onConfirm" />
```

## API

### Props

| 参数                | 说明                                                                           | 类型                      | 默认值      |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------- | ----------- |
| v-model / show      | 是否显示日历弹窗                                                               | `Boolean`                 | `false`     |
| type                | 选择类型，可选值为 `single`、`multiple`、`range`                               | `String`                  | `single`    |
| title               | 日历标题                                                                       | `String`                  | `日期选择`  |
| subtitle            | 日历副标题                                                                     | `String`                  | -           |
| color               | 主题色，日历选中日期的颜色                                                     | `String`                  | -           |
| position            | 弹出位置，可选值为 `center`、`bottom`                                          | `String`                  | `bottom`    |
| round               | 是否显示圆角                                                                   | `Boolean`                 | `true`      |
| overlay             | 是否显示遮罩层                                                                 | `Boolean`                 | `true`      |
| closeable           | 是否显示关闭图标                                                               | `Boolean`                 | `true`      |
| close-icon-position | 关闭图标位置                                                                   | `String`                  | `top-right` |
| z-index             | 弹出层层级                                                                     | `Number \| String`        | `1000`      |
| overlay-closable    | 是否点击遮罩层关闭弹窗                                                         | `Boolean`                 | `true`      |
| show-confirm        | 是否显示确认按钮                                                               | `Boolean`                 | `true`      |
| confirm-text        | 确认按钮文字                                                                   | `String`                  | `确认`      |
| first-day-of-week   | 周起始日，0 表示周日，1-6 表示周一至周六                                       | `Number`                  | `0`         |
| scroll              | 是否使用滚动模式                                                               | `Boolean`                 | `false`     |
| default-date        | 默认选中的日期，type 为 single 时为字符串或 Date 对象，multiple/range 时为数组 | `String \| Date \| Array` | 当天        |
| min-date            | 可选择的最小日期                                                               | `String \| Date`          | -           |
| max-date            | 可选择的最大日期                                                               | `String \| Date`          | -           |
| text-formatter      | 日期文案格式化函数，返回值会显示在日期下方                                     | `Function`                | -           |
| custom-class        | 自定义类名                                                                     | `String`                  | -           |

### Events

| 事件名  | 说明               | 回调参数                                                         |
| ------- | ------------------ | ---------------------------------------------------------------- |
| confirm | 点击确认按钮时触发 | 选中的日期值，type 为 single 时为字符串，multiple/range 时为数组 |
| change  | 选择日期时触发     | 选中的日期值，格式同上                                           |
| close   | 关闭弹窗时触发     | -                                                                |

## 设计变量

组件提供了下列 CSS 变量，可用于自定义样式，部分变量继承自 fanc-popup 组件。

| 名称                 | 默认值  | 说明                         |
| -------------------- | ------- | ---------------------------- |
| --primary-color      | #007bff | 主题色，用于选中日期的背景色 |
| --text-primary       | #343a40 | 主要文本颜色                 |
| --text-secondary     | #6c757d | 次要文本颜色                 |
| --text-disabled      | #c0c4cc | 禁用状态文本颜色             |
| --border-color-light | #ebeef5 | 边框颜色                     |
| --bg-white           | #fff    | 背景色                       |

## 常见问题

### 如何实现自定义样式？

除了使用 `color` 属性设置主题色外，还可以通过 CSS 变量覆盖默认样式。

```css
:root {
    --primary-color: #ff6b6b;
}
```

### 日期格式化

组件内部使用 `YYYY-MM-DD` 格式的日期字符串，如需其他格式，可在 confirm 回调中自行处理。

### 如何处理日期范围的最大跨度限制？

可以在 change 事件中检查日期范围，如果超过限制可以使用自定义提示。

```vue
<fanc-calendar v-model="showCalendar" type="range" @change="onRangeChange" />

<script>
export default {
    methods: {
        onRangeChange(dates) {
            if (dates.length === 2) {
                const start = new Date(dates[0]);
                const end = new Date(dates[1]);
                const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));

                if (diffDays > 30) {
                    uni.showToast({
                        title: "日期范围不能超过30天",
                        icon: "none",
                    });
                }
            }
        },
    },
};
</script>
```

### 禁用特定日期

目前组件不直接支持禁用特定日期（仅支持通过 min/max 设置日期范围），如有此需求，可以在下一版本中添加 disabledDates 或 disabledDatesFormatter 功能。
