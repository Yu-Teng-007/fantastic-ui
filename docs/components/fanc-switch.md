# fanc-switch 开关选择器组件

## 组件介绍

`fanc-switch` 是一个开关选择器组件，用于在打开和关闭状态之间进行切换。它通常用于表示两种互斥状态的切换，如开/关、是/否等。

## 组件特性

- 支持多种尺寸：大、中、小、迷你
- 支持禁用状态和加载状态
- 支持自定义颜色
- 支持文字描述
- 支持自定义值
- 支持异步控制

## 组件用法

### 基础用法

```vue
<fanc-switch v-model="checked"></fanc-switch>
```

### 禁用状态

```vue
<fanc-switch v-model="checked" disabled></fanc-switch>
```

### 加载状态

```vue
<fanc-switch v-model="checked" loading></fanc-switch>
```

### 开关尺寸

```vue
<fanc-switch v-model="checked" size="large"></fanc-switch>
<fanc-switch v-model="checked"></fanc-switch>
<fanc-switch v-model="checked" size="small"></fanc-switch>
<fanc-switch v-model="checked" size="mini"></fanc-switch>
```

### 自定义颜色

```vue
<fanc-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24"></fanc-switch>
```

### 文字描述

```vue
<fanc-switch v-model="checked" active-text="开启" inactive-text="关闭"></fanc-switch>
```

### 异步控制

```vue
<fanc-switch :model-value="checked" :loading="loading" @change="onChange"></fanc-switch>
```

```javascript
export default {
  data() {
    return {
      checked: false,
      loading: false
    };
  },
  methods: {
    onChange(value) {
      // 设置加载状态
      this.loading = true;
      
      // 模拟异步操作
      setTimeout(() => {
        // 更新值
        this.checked = value;
        // 关闭加载状态
        this.loading = false;
      }, 1000);
    }
  }
};
```

### 自定义值

```vue
<fanc-switch v-model="checked" :active-value="100" :inactive-value="0"></fanc-switch>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 开关选中状态 | Boolean | `false` |
| disabled | 是否为禁用状态 | Boolean | `false` |
| loading | 是否为加载状态 | Boolean | `false` |
| size | 开关尺寸，可选值为 `large` `normal` `small` `mini` | String | `normal` |
| active-color | 打开时的背景色 | String | - |
| inactive-color | 关闭时的背景色 | String | - |
| active-text | 打开时的文字描述 | String | - |
| inactive-text | 关闭时的文字描述 | String | - |
| active-value | 打开时的值 | String / Number / Boolean | `true` |
| inactive-value | 关闭时的值 | String / Number / Boolean | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 开关状态切换时触发 | value: 打开时为 active-value，关闭时为 inactive-value |
| update:model-value | 开关状态变化时触发 | value: Boolean |

## 注意事项

1. 使用 `loading` 属性时，开关会进入加载状态，此时点击事件不会触发
2. 当开关处于 `disabled` 状态时，所有点击事件都不会生效
3. 如果需要自定义开关的值，可以使用 `active-value` 和 `inactive-value` 属性
4. 异步控制开关状态时，建议使用 `model-value` 和 `loading` 属性结合使用 