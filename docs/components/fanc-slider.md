# 滑动选择器 Slider

滑动选择器是一个用于在指定范围内选择单个值或值区间的组件。用户可以通过拖动滑块或点击轨道来选择数值。

## 基础用法

```html
<fanc-slider v-model="value" @change="onChange"></fanc-slider>
```

## 显示当前值

设置 `show-value` 属性可以在滑块右侧显示当前选择的值。

```html
<fanc-slider v-model="value" show-value @change="onChange"></fanc-slider>
```

## 显示范围值

设置 `show-extremities` 属性可以显示最小值和最大值。

```html
<fanc-slider v-model="value" show-extremities @change="onChange"></fanc-slider>
```

## 显示所有值

同时设置 `show-value` 和 `show-extremities` 可以显示所有值。

```html
<fanc-slider v-model="value" show-value show-extremities @change="onChange"></fanc-slider>
```

## 设置步长

通过 `step` 属性设置滑块移动的步长，默认为1。

```html
<fanc-slider v-model="value" :step="10" show-value @change="onChange"></fanc-slider>
```

## 设置范围

通过 `min` 和 `max` 属性设置滑动的范围，默认为0-100。

```html
<fanc-slider v-model="value" :min="-50" :max="50" show-value show-extremities @change="onChange"></fanc-slider>
```

## 自定义样式

可以通过 `active-color` 和 `inactive-color` 属性设置滑块的颜色。

```html
<fanc-slider v-model="value" active-color="#ee0a24" inactive-color="#f2f3f5" show-value @change="onChange"></fanc-slider>
```

## 禁用状态

设置 `disabled` 属性禁用滑块。

```html
<fanc-slider v-model="value" disabled show-value></fanc-slider>
```

## 自定义按钮

通过 `thumb` 插槽可以自定义滑块按钮的内容。

```html
<fanc-slider v-model="value" show-value>
  <template #thumb>
    <view class="custom-thumb">{{ value }}</view>
  </template>
</fanc-slider>
```

## 显示刻度

设置 `show-ticks` 和 `show-tick-labels` 属性可以显示刻度标记和刻度标签，通过 `tick-count` 属性设置刻度数量。

```html
<fanc-slider v-model="value" show-ticks show-tick-labels :tick-count="5" @change="onChange"></fanc-slider>
```

## 垂直方向

设置 `vertical` 属性使滑块垂直展示，需要指定容器高度。

```html
<view style="height: 200px;">
  <fanc-slider v-model="value" vertical show-value @change="onChange"></fanc-slider>
</view>
```

## 双滑块模式

设置 `range` 属性开启双滑块模式，此时 `v-model` 绑定值为数组格式：`[min, max]`。

```html
<fanc-slider v-model="rangeValue" range show-value show-extremities @change="onRangeChange"></fanc-slider>
```

## 自定义双滑块

在双滑块模式下，可以分别使用 `left-thumb` 和 `thumb` 插槽自定义左右滑块。

```html
<fanc-slider v-model="rangeValue" range @change="onRangeChange">
  <template #left-thumb>
    <view class="custom-thumb custom-thumb--left">{{ rangeValue[0] }}</view>
  </template>
  <template #thumb>
    <view class="custom-thumb custom-thumb--right">{{ rangeValue[1] }}</view>
  </template>
</fanc-slider>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model | 当前进度百分比，范围模式下为 [min, max] 数组 | Number / Array | 0 |
| min | 最小值 | Number | 0 |
| max | 最大值 | Number | 100 |
| step | 步长，取值必须大于0，并且可被(max - min)整除 | Number | 1 |
| disabled | 是否禁用滑块 | Boolean | false |
| active-color | 进度条激活部分的颜色 | String | 主题色 |
| inactive-color | 进度条未激活部分的颜色 | String | #e5e5e5 |
| thumb-color | 滑块颜色 | String | 与active-color相同 |
| show-value | 是否显示当前值 | Boolean | false |
| show-extremities | 是否显示最小值和最大值 | Boolean | true |
| range | 是否为范围选择 | Boolean | false |
| vertical | 是否垂直方向 | Boolean | false |
| show-ticks | 是否显示刻度标记 | Boolean | false |
| show-tick-labels | 是否显示刻度标签 | Boolean | false |
| tick-count | 刻度数量 | Number | 5 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 进度变化且结束拖动后触发 | value: 当前值，范围模式下为数组 |
| changing | 滑块拖动过程中触发 | value: 当前值，范围模式下为数组 |

### Slots

| 名称 | 说明 |
| --- | --- |
| thumb | 自定义滑块按钮 |
| left-thumb | 自定义左侧滑块按钮（仅在range模式下生效） |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --slider-active-color | var(--fanc-primary-color) | 进度条激活部分的颜色 |
| --slider-inactive-color | var(--gray-300) | 进度条未激活部分的颜色 |
| --slider-disabled-color | var(--gray-400) | 禁用状态下滑块的颜色 |
| --slider-thumb-color | var(--white) | 滑块按钮的颜色 |
| --slider-thumb-shadow | 0 1px 3px rgba(0, 0, 0, 0.2) | 滑块按钮的阴影 |
| --slider-thumb-active-shadow | 0 2px 5px rgba(0, 0, 0, 0.3) | 滑块按钮激活时的阴影 |
| --slider-value-color | var(--text-primary) | 值文本的颜色 |
| --slider-disabled-opacity | 0.6 | 禁用状态的透明度 | 