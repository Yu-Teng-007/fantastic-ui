# Steps 步骤条

用于任务步骤展示或任务进度展示。

## 引入

```js
import { FancSteps, FancStep } from 'fantastic-ui';

Vue.use(FancSteps);
Vue.use(FancStep);
```

## 代码演示

### 基础用法

简单的步骤条。

```html
<fanc-steps :active="active">
  <fanc-step title="步骤一" description="这是第一步的描述信息"></fanc-step>
  <fanc-step title="步骤二" description="这是第二步的描述信息"></fanc-step>
  <fanc-step title="步骤三" description="这是第三步的描述信息"></fanc-step>
  <fanc-step title="步骤四" description="这是第四步的描述信息"></fanc-step>
</fanc-steps>
```

```js
export default {
  data() {
    return {
      active: 1
    };
  }
};
```

### 竖向步骤条

设置 `direction="vertical"` 可以展示竖向步骤条。

```html
<fanc-steps :active="active" direction="vertical">
  <fanc-step title="步骤一" description="这是第一步的描述信息"></fanc-step>
  <fanc-step title="步骤二" description="这是第二步的描述信息"></fanc-step>
  <fanc-step title="步骤三" description="这是第三步的描述信息"></fanc-step>
  <fanc-step title="步骤四" description="这是第四步的描述信息"></fanc-step>
</fanc-steps>
```

### 自定义图标

通过 `icon` 属性设置步骤的图标。

```html
<fanc-steps :active="1">
  <fanc-step title="登录" icon="user"></fanc-step>
  <fanc-step title="信息填写" icon="edit"></fanc-step>
  <fanc-step title="付款" icon="credit-card"></fanc-step>
  <fanc-step title="完成" icon="check-circle"></fanc-step>
</fanc-steps>
```

### 自定义状态

通过 `status` 属性设置步骤的状态。

```html
<fanc-steps :active="1">
  <fanc-step title="已完成" status="finish"></fanc-step>
  <fanc-step title="进行中" status="process"></fanc-step>
  <fanc-step title="待处理" status="wait"></fanc-step>
  <fanc-step title="出错了" status="error"></fanc-step>
</fanc-steps>
```

### 居中展示

设置 `center` 属性可以让步骤居中展示。

```html
<fanc-steps :active="1" center>
  <fanc-step title="步骤一" description="这是第一步的描述信息"></fanc-step>
  <fanc-step title="步骤二" description="这是第二步的描述信息"></fanc-step>
  <fanc-step title="步骤三" description="这是第三步的描述信息"></fanc-step>
</fanc-steps>
```

### 自定义颜色

通过 `active-color` 和 `inactive-color` 属性设置步骤的激活和未激活颜色。

```html
<fanc-steps :active="1" active-color="#07c160" inactive-color="#cccccc">
  <fanc-step title="步骤一" description="已完成"></fanc-step>
  <fanc-step title="步骤二" description="进行中"></fanc-step>
  <fanc-step title="步骤三" description="待进行"></fanc-step>
</fanc-steps>
```

### 任务步骤展示

结合插槽可以实现更复杂的步骤展示。

```html
<fanc-steps :active="2">
  <fanc-step title="已完成">
    <text class="step-status">2023-05-01 12:30</text>
  </fanc-step>
  <fanc-step title="进行中">
    <text class="step-status">2023-05-02 10:15</text>
  </fanc-step>
  <fanc-step title="待处理">
    <text class="step-status">预计 2023-05-03</text>
  </fanc-step>
  <fanc-step title="完成">
    <text class="step-status">预计 2023-05-04</text>
  </fanc-step>
</fanc-steps>

<style>
.step-status {
  font-size: 12px;
  color: #969799;
}
</style>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤 | _number_ | `0` |
| direction | 显示方向，可选值为 `horizontal`、`vertical` | _string_ | `horizontal` |
| center | 是否居中展示 | _boolean_ | `false` |
| active-color | 激活状态颜色 | _string_ | `var(--fanc-primary-color)` |
| inactive-color | 未激活状态颜色 | _string_ | `var(--gray-400)` |
| icon-size | 图标大小，单位 px | _number \| string_ | `24` |

### Step Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | _string_ | - |
| description | 步骤描述 | _string_ | - |
| icon | 步骤图标 | _string_ | - |
| status | 步骤状态，可选值为 `wait`、`process`、`finish`、`error` | _string_ | - |

### Step Slots

| 名称 | 说明 |
| --- | --- |
| default | 步骤内容 |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --steps-bg-color | `var(--white)` | 步骤条背景颜色 |
| --steps-active-color | `var(--fanc-primary-color)` | 激活状态颜色 |
| --steps-inactive-color | `var(--gray-400)` | 未激活状态颜色 |
| --steps-finish-color | `var(--fanc-primary-color)` | 已完成状态颜色 |
| --steps-error-color | `var(--fanc-danger-color)` | 错误状态颜色 |
| --steps-title-color | `var(--text-primary)` | 标题颜色 |
| --steps-title-active-color | `var(--fanc-primary-color)` | 激活状态标题颜色 |
| --steps-title-error-color | `var(--fanc-danger-color)` | 错误状态标题颜色 |
| --steps-description-color | `var(--text-secondary)` | 描述文字颜色 |
| --steps-description-error-color | `var(--fanc-danger-color)` | 错误状态描述文字颜色 |
| --steps-line-color | `var(--gray-400)` | 连接线颜色 |
| --steps-line-finish-color | `var(--fanc-primary-color)` | 已完成连接线颜色 |
| --steps-indicator-size | `24px` | 指示器大小 |
| --steps-indicator-font-size | `14px` | 指示器字体大小 |
| --steps-title-font-size | `14px` | 标题字体大小 |
| --steps-description-font-size | `12px` | 描述文字字体大小 |
| --steps-indicator-active-bg | `var(--fanc-primary-color)` | 激活状态指示器背景颜色 |
| --steps-indicator-active-border | `var(--fanc-primary-color)` | 激活状态指示器边框颜色 |
| --steps-indicator-active-text | `var(--white)` | 激活状态指示器文字颜色 |
| --steps-indicator-wait-bg | `var(--white)` | 等待状态指示器背景颜色 |
| --steps-indicator-wait-border | `var(--gray-400)` | 等待状态指示器边框颜色 |
| --steps-indicator-wait-text | `var(--gray-600)` | 等待状态指示器文字颜色 |
| --steps-indicator-error-bg | `var(--fanc-danger-color)` | 错误状态指示器背景颜色 |
| --steps-indicator-error-border | `var(--fanc-danger-color)` | 错误状态指示器边框颜色 |
| --steps-indicator-error-text | `var(--white)` | 错误状态指示器文字颜色 |
| --steps-transition-duration | `0.3s` | 过渡动画时长 | 