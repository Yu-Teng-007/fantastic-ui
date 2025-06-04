# Notify 消息提示

## 介绍

Notify 消息提示组件用于页面顶部向下滑出一个提示，尔后自动收起的场景。常用于告知用户重要的操作结果或系统状态变化，支持多种提示类型。

## 引入

```js
import { FancNotify } from 'fantastic-ui';

Vue.use(FancNotify);
```

## 代码演示

### 基础用法

通过调用 `this.$notify` 方法来显示消息提示。

```html
<template>
  <view>
    <fanc-button type="primary" @click="showNotify">显示消息提示</fanc-button>
  </view>
</template>

<script>
export default {
  methods: {
    showNotify() {
      this.$notify('这是一条消息提示');
    }
  }
};
</script>
```

### 通知类型

支持 `primary`、`success`、`warning`、`error` 四种类型，默认为 `primary`。

```html
<template>
  <view>
    <fanc-button type="primary" @click="showPrimaryNotify">主要通知</fanc-button>
    <fanc-button type="success" @click="showSuccessNotify">成功通知</fanc-button>
    <fanc-button type="warning" @click="showWarningNotify">警告通知</fanc-button>
    <fanc-button type="danger" @click="showErrorNotify">错误通知</fanc-button>
  </view>
</template>

<script>
export default {
  methods: {
    showPrimaryNotify() {
      this.$notify.primary('这是一条主要通知');
    },
    showSuccessNotify() {
      this.$notify.success('这是一条成功通知');
    },
    showWarningNotify() {
      this.$notify.warning('这是一条警告通知');
    },
    showErrorNotify() {
      this.$notify.error('这是一条错误通知');
    }
  }
};
</script>
```

### 自定义配置

Notify 支持配置显示时长、标题、图标等。

```html
<template>
  <view>
    <fanc-button @click="showCustomNotify">自定义配置</fanc-button>
  </view>
</template>

<script>
export default {
  methods: {
    showCustomNotify() {
      this.$notify({
        title: '通知标题',
        message: '这是一条带有标题的通知',
        type: 'primary',
        duration: 5000,
        showIcon: true,
        rightIcon: 'chevron-right',
        onClick: () => {
          console.log('点击了通知');
        }
      });
    }
  }
};
</script>
```

### 顶部安全距离

在有顶部安全区域的设备上，可以通过 `safeAreaInsetTop` 属性设置是否留出顶部安全距离。

```html
<template>
  <view>
    <fanc-button @click="showSafeAreaNotify">顶部安全距离</fanc-button>
  </view>
</template>

<script>
export default {
  methods: {
    showSafeAreaNotify() {
      this.$notify({
        message: '适配顶部安全距离的通知',
        safeAreaInsetTop: true
      });
    }
  }
};
</script>
```

### 手动关闭

通过设置 `duration` 为 `0`，通知不会自动关闭，需要手动调用 `this.$notify.close()` 方法关闭。

```html
<template>
  <view>
    <fanc-button @click="showPersistentNotify">显示不会自动关闭的通知</fanc-button>
    <fanc-button @click="closeNotify">关闭通知</fanc-button>
  </view>
</template>

<script>
export default {
  methods: {
    showPersistentNotify() {
      this.$notify({
        message: '这条通知不会自动关闭',
        duration: 0
      });
    },
    closeNotify() {
      this.$notify.close();
    }
  }
};
</script>
```

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| Notify | 展示提示 | `options | message` | notify 实例 |
| Notify.primary | 展示主要提示 | `options | message` | notify 实例 |
| Notify.success | 展示成功提示 | `options | message` | notify 实例 |
| Notify.warning | 展示警告提示 | `options | message` | notify 实例 |
| Notify.error | 展示错误提示 | `options | message` | notify 实例 |
| Notify.close | 关闭提示 | - | - |

### Options

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| message | 展示文案 | _string_ | - |
| title | 标题 | _string_ | - |
| type | 类型，可选值为 `primary` `success` `warning` `error` | _string_ | `primary` |
| iconName | 自定义图标名称 | _string_ | - |
| rightIcon | 右侧图标名称 | _string_ | - |
| showIcon | 是否显示图标 | _boolean_ | `true` |
| duration | 展示时长(ms)，值为 0 时，notify 不会自动消失 | _number_ | `3000` |
| offsetTop | 顶部偏移距离，单位 px | _number_ | `0` |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度） | _boolean_ | `false` |
| zIndex | 层级 | _number_ | `3000` |
| customStyle | 自定义样式 | _object_ | `{}` |
| onClick | 点击时的回调函数 | _Function_ | - |
| onClose | 关闭时的回调函数 | _Function_ | - |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --notify-primary-bg-color | _var(--primary-color)_ | 主要类型背景色 |
| --notify-success-bg-color | _var(--success-color)_ | 成功类型背景色 |
| --notify-warning-bg-color | _var(--warning-color)_ | 警告类型背景色 |
| --notify-error-bg-color | _var(--danger-color)_ | 错误类型背景色 |
| --notify-text-color | _var(--white)_ | 文字颜色 |
| --notify-z-index | _3000_ | 层级 |
| --notify-transition-duration | _0.3s_ | 过渡动画时长 | 