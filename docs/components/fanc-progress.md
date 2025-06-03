# fanc-progress 进度条组件

## 组件介绍

`fanc-progress` 是一个用于展示当前任务进度的组件，支持自定义颜色、样式和状态，可以满足各种进度展示场景的需求。

## 组件特性

- 支持自定义进度条颜色和轨道颜色
- 支持自定义进度文字和样式
- 提供多种状态展示（正常、成功、警告、错误）
- 支持条纹效果和动画
- 支持圆角进度条
- 可调整进度条粗细

## 组件用法

### 基础用法

```vue
<fanc-progress :percentage="50"></fanc-progress>
```

### 自定义颜色

```vue
<fanc-progress :percentage="25" color="#f60"></fanc-progress>
<fanc-progress :percentage="50" color="#1989fa"></fanc-progress>
<fanc-progress :percentage="100" color="linear-gradient(to right, #be99ff, #7232dd)"></fanc-progress>
```

### 轨道颜色

```vue
<fanc-progress :percentage="50" track-color="#e1f5fe"></fanc-progress>
```

### 进度条粗细

```vue
<fanc-progress :percentage="50" :stroke-width="4"></fanc-progress>
<fanc-progress :percentage="50" :stroke-width="16"></fanc-progress>
```

### 不显示进度文字

```vue
<fanc-progress :percentage="50" :show-pivot="false"></fanc-progress>
```

### 文字内显

```vue
<fanc-progress :percentage="50" text-inside></fanc-progress>
```

### 自定义文字内容

```vue
<fanc-progress :percentage="75" pivot-text="加载中..."></fanc-progress>
```

### 状态进度条

```vue
<fanc-progress :percentage="20" status="normal"></fanc-progress>
<fanc-progress :percentage="50" status="success"></fanc-progress>
<fanc-progress :percentage="80" status="warning"></fanc-progress>
<fanc-progress :percentage="100" status="error"></fanc-progress>
```

### 自定义进度文字样式

```vue
<fanc-progress :percentage="50" pivot-color="#7232dd" pivot-text-color="#fff"></fanc-progress>
```

### 圆角进度条

```vue
<fanc-progress :percentage="50" rounded></fanc-progress>
```

### 条纹进度条

```vue
<fanc-progress :percentage="50" striped></fanc-progress>
<fanc-progress :percentage="50" striped striped-active></fanc-progress>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 进度百分比，取值范围 0-100 | Number | `0` |
| color | 进度条颜色，支持渐变色 | String | - |
| trackColor | 轨道颜色 | String | - |
| pivotColor | 进度条文字背景色 | String | - |
| pivotTextColor | 进度条文字颜色 | String | - |
| showPivot | 是否显示进度条文字 | Boolean | `true` |
| striped | 是否显示条纹 | Boolean | `false` |
| stripedActive | 条纹是否有动画效果 | Boolean | `false` |
| pivotText | 自定义文字内容 | String | - |
| textInside | 文字是否显示在进度条内部 | Boolean | `false` |
| strokeWidth | 进度条宽度，单位px | Number | `8` |
| status | 进度条状态，可选值为 normal/success/warning/error | String | `normal` |
| rounded | 是否显示圆角 | Boolean | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| - | - | - |

## 代码演示

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <fanc-progress :percentage="50"></fanc-progress>
    
    <!-- 动态进度条 -->
    <fanc-progress :percentage="dynamicPercentage"></fanc-progress>
    <view class="button-group">
      <fanc-button size="small" @click="decreasePercentage">减少</fanc-button>
      <fanc-button size="small" type="primary" @click="increasePercentage">增加</fanc-button>
      <fanc-button size="small" type="success" @click="startProgress">开始</fanc-button>
      <fanc-button size="small" type="warning" @click="resetProgress">重置</fanc-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dynamicPercentage: 30,
      progressTimer: null,
    };
  },
  beforeDestroy() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  },
  methods: {
    increasePercentage() {
      if (this.dynamicPercentage < 100) {
        this.dynamicPercentage += 10;
        if (this.dynamicPercentage > 100) {
          this.dynamicPercentage = 100;
        }
      } else {
        this.$toast.warning("已达到最大值");
      }
    },
    decreasePercentage() {
      if (this.dynamicPercentage > 0) {
        this.dynamicPercentage -= 10;
        if (this.dynamicPercentage < 0) {
          this.dynamicPercentage = 0;
        }
      } else {
        this.$toast.warning("已达到最小值");
      }
    },
    startProgress() {
      if (this.progressTimer) {
        this.$toast.text("进度条已在运行中");
        return;
      }

      this.resetProgress();
      this.progressTimer = setInterval(() => {
        if (this.dynamicPercentage < 100) {
          this.dynamicPercentage += 5;
        } else {
          clearInterval(this.progressTimer);
          this.progressTimer = null;
          this.$toast.success("进度已完成");
        }
      }, 500);
    },
    resetProgress() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
        this.progressTimer = null;
      }
      this.dynamicPercentage = 0;
    },
  },
};
</script>

<style>
.button-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
```

## 注意事项

1. `percentage` 属性必须是一个介于 0 和 100 之间的数字，否则组件将会抛出错误
2. 使用 `color` 属性设置自定义颜色时，`status` 属性将不再生效
3. 若需要展示精确的小数进度，可以使用 `pivot-text` 属性自定义文字内容 