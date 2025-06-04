# CountTo 数字滚动

CountTo 组件用于数字的动画滚动效果，通常用于展示一个从初始值到目标值的连续变化过程，可以增强数据展示的动态效果和视觉吸引力。

## 基础用法

通过 `start-val` 和 `end-val` 属性设置起始值和结束值，`duration` 属性设置动画持续时间（单位为毫秒）。

```html
<fanc-count-to :start-val="0" :end-val="3000" :duration="3000"></fanc-count-to>
```

## 带前缀和后缀

通过 `prefix` 和 `suffix` 属性设置前缀和后缀，需要将 `type` 设置为 `addon`。

```html
<fanc-count-to
  :start-val="0"
  :end-val="8888"
  :duration="3000"
  type="addon"
  prefix="¥"
  suffix="元"
></fanc-count-to>
```

## 使用千分位分隔符

通过 `separator` 属性设置千分位分隔符。

```html
<fanc-count-to
  :start-val="0"
  :end-val="12345678"
  :duration="3000"
  separator=","
></fanc-count-to>
```

## 小数点精度

通过 `decimals` 属性设置小数点精度。

```html
<fanc-count-to
  :start-val="0"
  :end-val="3.1415926"
  :duration="3000"
  :decimals="4"
></fanc-count-to>
```

## 不同样式类型

CountTo 组件提供了多种预设样式类型，可通过 `type` 属性设置。

### 默认样式

```html
<fanc-count-to :start-val="0" :end-val="3000" :duration="3000" type="default"></fanc-count-to>
```

### 带背景样式

```html
<fanc-count-to :start-val="0" :end-val="9527" :duration="3000" type="bg"></fanc-count-to>
```

### 圆形背景样式

```html
<fanc-count-to :start-val="0" :end-val="99" :duration="3000" type="circle"></fanc-count-to>
```

## 自定义颜色和字体大小

通过 `color`、`background-color` 和 `font-size` 属性自定义样式。

```html
<fanc-count-to
  :start-val="0"
  :end-val="6666"
  :duration="3000"
  color="#f44336"
  :font-size="30"
></fanc-count-to>
```

## 不同的缓动效果

通过 `easing-fn` 属性设置不同的缓动效果，支持 `linear`、`easeIn`、`easeOut` 和 `easeInOut`。

```html
<fanc-count-to
  :start-val="0"
  :end-val="1000"
  :duration="3000"
  easing-fn="easeOut"
></fanc-count-to>
```

## 控制滚动

CountTo 组件提供了 `start`、`pause`、`resume` 和 `reset` 方法来控制滚动过程，需要设置 `autoplay` 为 `false` 来手动控制滚动。

```html
<fanc-count-to
  ref="countTo"
  :start-val="0"
  :end-val="8888"
  :duration="3000"
  :autoplay="false"
  @finished="onFinished"
></fanc-count-to>
<view class="control-buttons">
  <fanc-button size="small" type="primary" @click="start">开始</fanc-button>
  <fanc-button size="small" type="info" @click="pause">暂停</fanc-button>
  <fanc-button size="small" type="success" @click="resume">继续</fanc-button>
  <fanc-button size="small" type="warning" @click="reset">重置</fanc-button>
</view>
```

```javascript
export default {
  methods: {
    start() {
      this.$refs.countTo.start();
    },
    pause() {
      this.$refs.countTo.pause();
    },
    resume() {
      this.$refs.countTo.resume();
    },
    reset() {
      this.$refs.countTo.reset();
    },
    onFinished() {
      this.$toast.success("滚动完成");
    },
  },
};
```

## 自定义插槽

通过设置 `type` 为 `custom` 并使用默认插槽来自定义内容。

```html
<fanc-count-to
  :start-val="0"
  :end-val="100"
  :duration="3000"
  type="custom"
>
  <template v-slot="{ displayValue }">
    <view class="custom-count-to">
      <view class="custom-count-to__progress">
        <view
          class="custom-count-to__bar"
          :style="{ width: displayValue + '%' }"
        ></view>
      </view>
      <text class="custom-count-to__text">{{ displayValue }}%</text>
    </view>
  </template>
</fanc-count-to>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start-val | 开始值 | _number \| string_ | `0` |
| end-val | 结束值 | _number \| string_ | `0` |
| duration | 持续时间，单位毫秒 | _number \| string_ | `2000` |
| decimals | 小数点精度 | _number \| string_ | `0` |
| autoplay | 是否自动开始滚动 | _boolean_ | `true` |
| separator | 千分位分隔符 | _string_ | `''` |
| prefix | 前缀 | _string_ | `''` |
| suffix | 后缀 | _string_ | `''` |
| easing-fn | 动画缓动函数，可选值：`linear`、`easeOut`、`easeIn`、`easeInOut` | _string_ | `linear` |
| type | 滚动类型，可选值：`default`、`addon`、`bg`、`circle`、`custom` | _string_ | `default` |
| color | 自定义颜色 | _string_ | - |
| background-color | 自定义背景颜色 | _string_ | - |
| font-size | 字体大小，可以是数字或带单位的字符串 | _number \| string_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 数值变化时触发 | _value: string_ |
| finished | 滚动结束时触发 | - |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始滚动 | - |
| pause | 暂停滚动 | - |
| resume | 继续滚动 | - |
| reset | 重置滚动 | - |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容，仅在 `type` 为 `custom` 时有效 | _{ displayValue: string }_ |

## 样式变量

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --count-to-text-color | _var(--text-primary)_ | 文本颜色 |
| --count-to-font-size | _24px_ | 字体大小 |
| --count-to-font-weight | _500_ | 字体粗细 |
| --count-to-addon-color | _var(--text-secondary)_ | 前缀和后缀颜色 |
| --count-to-addon-font-size | _16px_ | 前缀和后缀字体大小 |
| --count-to-bg-color | _var(--fanc-primary-color)_ | 带背景样式的背景颜色 |
| --count-to-bg-text-color | _var(--white)_ | 带背景样式的文本颜色 |
| --count-to-bg-padding | _8px 16px_ | 带背景样式的内边距 |
| --count-to-bg-border-radius | _4px_ | 带背景样式的圆角 |
| --count-to-circle-bg-color | _var(--fanc-primary-color)_ | 圆形背景样式的背景颜色 |
| --count-to-circle-text-color | _var(--white)_ | 圆形背景样式的文本颜色 |
| --count-to-circle-padding | _0_ | 圆形背景样式的内边距 |
| --count-to-circle-size | _60px_ | 圆形背景样式的尺寸 | 