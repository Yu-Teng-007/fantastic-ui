# Steps 步骤条

Steps 步骤条组件，用于引导用户按照流程完成任务或者展示当前的操作进度。

## 基础用法

```html
<fanc-steps :active="active" :steps="steps" />
```

```javascript
export default {
  data() {
    return {
      active: 1,
      steps: [
        { title: '步骤一', desc: '描述信息' },
        { title: '步骤二', desc: '描述信息' },
        { title: '步骤三', desc: '描述信息' },
        { title: '步骤四', desc: '描述信息' },
      ],
    };
  },
};
```

## 自定义图标

通过 `icon` 属性设置步骤的图标。

```html
<fanc-steps :active="active" :steps="stepsWithIcon" />
```

```javascript
export default {
  data() {
    return {
      active: 1,
      stepsWithIcon: [
        { title: '步骤一', desc: '描述信息', icon: 'home' },
        { title: '步骤二', desc: '描述信息', icon: 'search' },
        { title: '步骤三', desc: '描述信息', icon: 'like' },
        { title: '步骤四', desc: '描述信息', icon: 'user' },
      ],
    };
  },
};
```

## 自定义样式

可以通过 `active-color` 和 `inactive-color` 属性设置激活状态和非激活状态的颜色。

```html
<fanc-steps 
  :active="active" 
  :steps="steps" 
  active-color="#07c160" 
  inactive-color="#bdbdbd" 
/>
```

## 竖向步骤条

设置 `direction` 属性为 `vertical` 可以展示竖向步骤条。

```html
<fanc-steps 
  :active="active" 
  :steps="steps" 
  direction="vertical" 
/>
```

## 点状步骤条

设置 `dot` 属性可以展示点状步骤条。

```html
<fanc-steps 
  :active="active" 
  :steps="steps" 
  dot 
/>
```

## 带状态步骤条

通过 `status` 属性设置当前步骤的状态，支持 `wait`、`process`、`finish`、`error` 四种状态。

```html
<fanc-steps 
  :active="active" 
  :steps="stepsWithStatus" 
/>
```

```javascript
export default {
  data() {
    return {
      active: 1,
      stepsWithStatus: [
        { title: '步骤一', desc: '已完成', status: 'finish' },
        { title: '步骤二', desc: '进行中', status: 'process' },
        { title: '步骤三', desc: '待处理', status: 'wait' },
        { title: '步骤四', desc: '失败', status: 'error' },
      ],
    };
  },
};
```

## 可点击的步骤条

设置 `clickable` 属性后，步骤条可以通过点击进行切换。

```html
<fanc-steps 
  :active="active" 
  :steps="steps" 
  clickable 
  @click-step="onClickStep" 
/>
```

```javascript
export default {
  data() {
    return {
      active: 1,
      steps: [
        { title: '步骤一', desc: '描述信息' },
        { title: '步骤二', desc: '描述信息' },
        { title: '步骤三', desc: '描述信息' },
        { title: '步骤四', desc: '描述信息' },
      ],
    };
  },
  methods: {
    onClickStep(index) {
      this.active = index;
    },
  },
};
```

## 自定义内容

使用 `slots` 可以自定义步骤的内容。

```html
<fanc-steps :active="active">
  <fanc-step title="步骤一" desc="描述信息">
    <template #icon>
      <fanc-icon name="home" />
    </template>
  </fanc-step>
  <fanc-step title="步骤二" desc="描述信息">
    <template #title>
      <text class="custom-title">自定义标题</text>
    </template>
  </fanc-step>
  <fanc-step title="步骤三" desc="描述信息">
    <template #desc>
      <text class="custom-desc">自定义描述</text>
    </template>
  </fanc-step>
</fanc-steps>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤 | _number_ | `0` |
| steps | 步骤配置 | _array_ | `[]` |
| direction | 显示方向，可选值为 `horizontal` 和 `vertical` | _string_ | `horizontal` |
| active-color | 激活状态颜色 | _string_ | `#1989fa` |
| inactive-color | 未激活状态颜色 | _string_ | `#969799` |
| active-icon | 激活状态图标 | _string_ | `checked` |
| inactive-icon | 未激活状态图标 | _string_ | - |
| dot | 是否显示点状步骤条 | _boolean_ | `false` |
| clickable | 是否可点击 | _boolean_ | `false` |

### Steps Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click-step | 点击步骤时触发 | _index: number_ |

### Step Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | _string_ | - |
| desc | 描述 | _string_ | - |
| icon | 图标 | _string_ | - |
| status | 状态，可选值为 `wait`、`process`、`finish`、`error` | _string_ | - |

### Step Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
| icon | 自定义图标 |
| title | 自定义标题 |
| desc | 自定义描述 |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --steps-background-color | var(--white) | 背景颜色 |
| --step-title-font-size | 16px | 标题字体大小 |
| --step-title-color | var(--text-primary) | 标题颜色 |
| --step-description-font-size | 14px | 描述字体大小 |
| --step-description-color | var(--text-secondary) | 描述颜色 |
| --step-line-color | #ebedf0 | 步骤线颜色 |
| --step-active-color | var(--primary-color) | 激活状态颜色 |
| --step-inactive-color | #c8c9cc | 未激活状态颜色 |
| --step-finish-line-color | var(--primary-color) | 已完成步骤线颜色 |
| --step-finish-text-color | var(--primary-color) | 已完成步骤文字颜色 |
| --step-process-text-color | var(--primary-color) | 进行中步骤文字颜色 |
| --step-wait-text-color | var(--text-secondary) | 等待中步骤文字颜色 |
| --step-error-text-color | var(--danger-color) | 错误步骤文字颜色 |
| --step-dot-size | 10px | 点状步骤条点的大小 |
| --step-icon-size | 20px | 图标大小 |
| --step-horizontal-title-margin-top | 4px | 水平方向下标题上边距 |
| --step-horizontal-desc-margin-top | 4px | 水平方向下描述上边距 |
| --step-vertical-title-margin-left | 10px | 垂直方向下标题左边距 |
| --step-vertical-desc-margin-top | 4px | 垂直方向下描述上边距 |
| --step-vertical-desc-margin-left | 30px | 垂直方向下描述左边距 | 