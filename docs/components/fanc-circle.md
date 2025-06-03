# fanc-circle 环形进度条组件

## 组件介绍

`fanc-circle` 是一个圆环形的进度条组件，用于展示当前任务的环形进度，支持进度渐变动画，可以满足各种环形进度展示场景的需求。

## 组件特性

- 支持自定义环形进度条颜色和轨道颜色
- 支持自定义文字内容和样式
- 提供多种状态展示（正常、成功、警告、错误）
- 支持进度动画和自定义动画速度
- 支持自定义环形尺寸和线宽
- 支持自定义进度方向（顺时针/逆时针）
- 支持自定义端点样式（圆角/方形/平角）

## 组件用法

### 基础用法

```vue
<fanc-circle :rate="30"></fanc-circle>
```

### 自定义颜色

```vue
<fanc-circle :rate="30" color="#f60"></fanc-circle>
<fanc-circle :rate="60" color="#1989fa"></fanc-circle>
<fanc-circle :rate="80" color="linear-gradient(to right, #be99ff, #7232dd)"></fanc-circle>
```

### 轨道颜色

```vue
<fanc-circle :rate="50" layer-color="#e1f5fe"></fanc-circle>
```

### 环形宽度

```vue
<fanc-circle :rate="50" :stroke-width="60"></fanc-circle>
<fanc-circle :rate="50" :stroke-width="20"></fanc-circle>
```

### 环形尺寸

```vue
<fanc-circle :rate="50" :size="150"></fanc-circle>
<fanc-circle :rate="50" :size="80"></fanc-circle>
```

### 自定义文字内容

```vue
<fanc-circle :rate="75" text="加载中..."></fanc-circle>

<!-- 使用插槽自定义更复杂的内容 -->
<fanc-circle :rate="75">
  <view class="custom-text">
    <view class="custom-text__value">75</view>
    <view class="custom-text__label">进度</view>
  </view>
</fanc-circle>
```

### 文字样式

```vue
<fanc-circle :rate="50" text-color="#7232dd" font-size="24px"></fanc-circle>
```

### 圆角样式

```vue
<fanc-circle :rate="50" stroke-linecap="round"></fanc-circle>
<fanc-circle :rate="50" stroke-linecap="butt"></fanc-circle>
<fanc-circle :rate="50" stroke-linecap="square"></fanc-circle>
```

### 进度方向

```vue
<fanc-circle :rate="50" :clockwise="true"></fanc-circle>
<fanc-circle :rate="50" :clockwise="false"></fanc-circle>
```

### 状态进度条

```vue
<fanc-circle :rate="25" status="normal"></fanc-circle>
<fanc-circle :rate="50" status="success"></fanc-circle>
<fanc-circle :rate="75" status="warning"></fanc-circle>
<fanc-circle :rate="100" status="error"></fanc-circle>
```

### 动画速度

```vue
<fanc-circle :rate="50" :speed="3000"></fanc-circle>
<fanc-circle :rate="50" :speed="500"></fanc-circle>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rate | 进度百分比，取值范围 0-100 | Number | `0` |
| size | 圆环直径，单位px | Number | `100` |
| strokeWidth | 圆环宽度，单位px | Number | `40` |
| color | 进度条颜色，支持渐变色 | String | - |
| layerColor | 轨道颜色 | String | - |
| textColor | 文字颜色 | String | - |
| text | 自定义文字内容 | String | - |
| strokeLinecap | 进度条端点样式，可选值为 butt/round/square | String | `round` |
| clockwise | 是否顺时针增加 | Boolean | `true` |
| status | 进度条状态，可选值为 normal/success/warning/error | String | `normal` |
| speed | 动画速度，单位 ms | Number | `500` |
| fill | 是否显示填充色 | Boolean | `false` |
| fontSize | 文字大小，如 18px | String | - |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update | 进度更新完成时触发 | 当前进度值（0-100的数字） |

### 插槽

| 名称 | 说明 |
| --- | --- |
| default | 自定义文字内容 |

## 代码演示

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <fanc-circle :rate="30"></fanc-circle>
    
    <!-- 动态进度条 -->
    <fanc-circle :rate="dynamicRate"></fanc-circle>
    <view class="button-group">
      <fanc-button size="small" @click="decreaseRate">减少</fanc-button>
      <fanc-button size="small" type="primary" @click="increaseRate">增加</fanc-button>
      <fanc-button size="small" type="success" @click="startProgress">开始</fanc-button>
      <fanc-button size="small" type="warning" @click="resetProgress">重置</fanc-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dynamicRate: 30,
      progressTimer: null,
    };
  },
  beforeDestroy() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  },
  methods: {
    increaseRate() {
      if (this.dynamicRate < 100) {
        this.dynamicRate += 10;
        if (this.dynamicRate > 100) {
          this.dynamicRate = 100;
        }
      } else {
        this.$toast.warning("已达到最大值");
      }
    },
    decreaseRate() {
      if (this.dynamicRate > 0) {
        this.dynamicRate -= 10;
        if (this.dynamicRate < 0) {
          this.dynamicRate = 0;
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
        if (this.dynamicRate < 100) {
          this.dynamicRate += 5;
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
      this.dynamicRate = 0;
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

1. `rate` 属性必须是一个介于 0 和 100 之间的数字，否则组件将会抛出错误
2. 使用 `color` 属性设置自定义颜色时，`status` 属性将不再生效
3. 当需要自定义复杂的文字内容时，可以使用默认插槽
4. 圆环的尺寸会根据 `size` 属性进行调整，确保留有足够的空间
5. 当使用渐变色时，需要使用标准的 CSS 渐变语法 