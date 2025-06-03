# CountDown 倒计时

## 介绍

用于实时展示倒计时数值，支持多种样式，可用于秒杀、活动倒计时、验证码等场景。

## 引入

```js
import { FancCountDown } from 'fantastic-ui';

// 全局注册
Vue.component(FancCountDown.name, FancCountDown);

// 局部注册
export default {
  components: {
    FancCountDown
  }
}
```

## 代码演示

### 基础用法

通过 `time` 属性设置倒计时时长，单位为毫秒。

```html
<fanc-count-down :time="3 * 60 * 60 * 1000"></fanc-count-down>
```

### 方形底样式

设置 `type` 属性为 `square` 展示方形底样式。

```html
<fanc-count-down :time="time" type="square"></fanc-count-down>
```

### 圆形底样式

设置 `type` 属性为 `circle` 展示圆形底样式。

```html
<fanc-count-down :time="time" type="circle"></fanc-count-down>
```

### 带单位样式

设置 `type` 属性为 `text` 展示带单位样式。

```html
<fanc-count-down :time="time" type="text"></fanc-count-down>
```

### 无底色带单位样式

设置 `type` 属性为 `plain` 展示无底色带单位样式。

```html
<fanc-count-down :time="time" type="plain"></fanc-count-down>
```

### 自定义颜色

通过 `color` 和 `background-color` 属性设置自定义颜色。

```html
<fanc-count-down 
  :time="time" 
  type="square"
  color="#fff"
  background-color="#f44336">
</fanc-count-down>
```

### 毫秒级渲染

设置 `millisecond` 属性可以开启毫秒级渲染。

```html
<fanc-count-down 
  :time="time" 
  type="square"
  millisecond>
</fanc-count-down>
```

### 控制倒计时

通过 `ref` 获取组件实例后，可以调用 `start`、`pause`、`reset` 方法控制倒计时。

```html
<fanc-count-down 
  ref="countDown"
  :time="time" 
  :auto-start="false"
  type="square"
  @finish="onFinish">
</fanc-count-down>
<view class="control-buttons">
  <fanc-button size="small" type="primary" @click="start">开始</fanc-button>
  <fanc-button size="small" type="info" @click="pause">暂停</fanc-button>
  <fanc-button size="small" type="warning" @click="reset">重置</fanc-button>
</view>
```

```js
export default {
  methods: {
    start() {
      this.$refs.countDown.start();
    },
    pause() {
      this.$refs.countDown.pause();
    },
    reset() {
      this.$refs.countDown.reset();
    },
    onFinish() {
      this.$toast.success('倒计时结束');
    }
  }
}
```

### 自定义格式

设置 `type` 属性为 `custom` 并使用插槽可以自定义倒计时的格式和样式。

```html
<fanc-count-down 
  :time="time" 
  type="custom">
  <template v-slot="timeData">
    <text class="custom-time">{{ timeData.timeData.hours }}</text>
    <text class="custom-colon">:</text>
    <text class="custom-time">{{ timeData.timeData.minutes }}</text>
    <text class="custom-colon">:</text>
    <text class="custom-time">{{ timeData.timeData.seconds }}</text>
  </template>
</fanc-count-down>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| time | 倒计时时长，单位毫秒 | _number \| string_ | `0` |
| format | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | _string_ | `HH:mm:ss` |
| auto-start | 是否自动开始倒计时 | _boolean_ | `true` |
| type | 倒计时类型，可选值为 `square` `circle` `text` `plain` `custom` | _string_ | `square` |
| millisecond | 是否开启毫秒级渲染 | _boolean_ | `false` |
| color | 自定义文字颜色 | _string_ | - |
| background-color | 自定义背景颜色 | _string_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| finish | 倒计时结束时触发 | - |
| change | 倒计时变化时触发 | _timeData: object_ |

### Slots

| 名称 | 说明 | 参数 |
|------|------|------|
| default | 自定义内容 | _timeData: object_ |

### timeData 格式

| 名称 | 说明 | 类型 |
|------|------|------|
| days | 剩余天数 | _string_ |
| hours | 剩余小时 | _string_ |
| minutes | 剩余分钟 | _string_ |
| seconds | 剩余秒数 | _string_ |
| milliseconds | 剩余毫秒 | _string_ |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| start | 开始倒计时 | - | - |
| pause | 暂停倒计时 | - | - |
| reset | 重设倒计时，若 auto-start 为 true，重设后会自动开始倒计时 | - | - |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
|------|------|------|
| --countdown-text-color | var(--text-primary) | 倒计时文字颜色 |
| --countdown-item-text-color | var(--white) | 倒计时数字文字颜色 |
| --countdown-item-background-color | var(--fanc-primary-color) | 倒计时数字背景颜色 |
| --countdown-separator-color | var(--text-primary) | 倒计时分隔符颜色 |
| --countdown-unit-color | var(--text-primary) | 倒计时单位文字颜色 | 