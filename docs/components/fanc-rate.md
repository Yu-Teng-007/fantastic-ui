# fanc-rate 评分组件

## 组件介绍

`fanc-rate` 是一个评分组件，用于对事物进行评级操作，展示评分结果。支持自定义图标、颜色、数量、大小和间距，还可以设置半星、只读和禁用状态。新增气泡提示功能，方便用户直观了解当前选择的分值，气泡中会显示与评分相同的图标和分值。在允许半星的情况下，点击星星会弹出一个选择气泡，用户可以选择半星或整星评分。还可以通过 `autoCloseBubble` 配置控制气泡是否自动关闭。新增带描述评分功能，可以为每个星级设置描述文本，并且可以选择将描述放在评分组件的左侧或右侧。滑动评分功能已全面优化，支持精确的触摸滑动选择，包括半星选择，提供更流畅的移动端交互体验。现在支持自定义半星图标，可以通过 `halfIcon` 属性设置。

## 组件特性

- 支持自定义评分数量
- 支持自定义图标和颜色
- 支持自定义图标大小和间距
- 支持半星评分
- 支持自定义半星图标
- 支持只读和禁用状态
- 支持点击和滑动手势操作
- 支持带图标的分值气泡提示
- 支持半星选择气泡，方便用户精确选择评分
- 支持配置气泡是否自动关闭
- 支持带描述评分，可在左侧或右侧显示描述文本
- 支持精确的触摸滑动评分，适配移动端交互

## 组件用法

### 基础用法

```vue
<fanc-rate v-model="value" />
```

### 自定义图标

```vue
<fanc-rate v-model="value" activeIcon="heart" inactiveIcon="heart-o" />
```

### 自定义半星图标

```vue
<fanc-rate v-model="value" :allowHalf="true" halfIcon="heart-half" />
```

### 自定义颜色

```vue
<fanc-rate v-model="value" activeColor="#ff5252" inactiveColor="#dddddd" />
```

### 自定义数量

```vue
<fanc-rate v-model="value" :count="8" />
```

### 自定义大小

```vue
<fanc-rate v-model="value" size="30" />
```

### 自定义间距

```vue
<fanc-rate v-model="value" :gutter="16" />
```

### 半星

```vue
<fanc-rate v-model="value" :allowHalf="true" />
```

### 只读状态

```vue
<fanc-rate v-model="value" :readonly="true" />
```

### 禁用状态

```vue
<fanc-rate v-model="value" :disabled="true" />
```

### 禁用滑动手势

```vue
<fanc-rate v-model="value" :touchable="false" />
```

### 气泡提示

```vue
<fanc-rate v-model="value" :showBubble="true" />
```

### 半星选择气泡

```vue
<fanc-rate v-model="value" :allowHalf="true" :showBubble="true" />
```

### 自定义气泡自动关闭行为

```vue
<!-- 允许半星但气泡会自动关闭 -->
<fanc-rate 
  v-model="value" 
  :allowHalf="true" 
  :showBubble="true" 
  :autoCloseBubble="true"
/>

<!-- 不允许半星但气泡不会自动关闭 -->
<fanc-rate 
  v-model="value" 
  :allowHalf="false" 
  :showBubble="true" 
  :autoCloseBubble="false"
/>
```

### 右侧带描述评分

```vue
<fanc-rate 
  v-model="value" 
  :showDescription="true" 
  :descriptions="['很差', '差', '一般', '好评', '优秀']" 
  descriptionPosition="right"
  unselectedDescription="请选择评分"
/>
```

### 左侧带描述评分

```vue
<fanc-rate 
  v-model="value" 
  :showDescription="true" 
  :descriptions="['很差', '差', '一般', '好评', '优秀']" 
  descriptionPosition="left"
  unselectedDescription="请选择评分"
/>
```

### 带描述的半星评分

```vue
<fanc-rate 
  v-model="value" 
  :allowHalf="true"
  :showBubble="true"
  :showDescription="true" 
  :descriptions="['很差', '差', '一般', '好评', '优秀']" 
  descriptionPosition="right"
/>
```

### 自定义图标与气泡结合

```vue
<fanc-rate 
  v-model="value" 
  :showBubble="true"
  activeIcon="heart"
  activeColor="#ff5252" 
/>
```

### 自定义半星图标与气泡结合

```vue
<fanc-rate 
  v-model="value" 
  :allowHalf="true"
  :showBubble="true"
  activeIcon="heart"
  halfIcon="heart-half"
  activeColor="#ff5252" 
/>
```

### 监听事件

```vue
<fanc-rate v-model="value" @change="onChange" />
```

```javascript
export default {
  data() {
    return {
      value: 3
    };
  },
  methods: {
    onChange(value) {
      console.log('当前评分：', value);
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前评分值 | Number | `0` |
| count | 图标总数 | Number | `5` |
| disabled | 是否禁用评分 | Boolean | `false` |
| size | 图标大小，单位px | Number \| String | `20` |
| gutter | 图标间距，单位px | Number \| String | `4` |
| activeColor | 选中时的颜色 | String | `var(--rate-active-color)` |
| inactiveColor | 未选中时的颜色 | String | `var(--rate-inactive-color)` |
| activeIcon | 选中时的图标名称 | String | `star` |
| inactiveIcon | 未选中时的图标名称 | String | `star` |
| halfIcon | 半星时的图标名称 | String | `star-half-alt` |
| allowHalf | 是否允许半星 | Boolean | `false` |
| readonly | 是否为只读状态 | Boolean | `false` |
| touchable | 是否可以通过滑动手势选择评分 | Boolean | `true` |
| showBubble | 是否显示分值气泡 | Boolean | `true` |
| bubbleDuration | 气泡显示时间(毫秒) | Number | `800` |
| autoCloseBubble | 是否自动关闭气泡 | Boolean | `null` |
| showDescription | 是否显示描述文本 | Boolean | `false` |
| descriptions | 描述文本数组 | Array | `[]` |
| descriptionPosition | 描述文本位置，可选值为 'left' 或 'right' | String | `right` |
| unselectedDescription | 未选择时的描述文本 | String | `''` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 评分变化时触发 | value: 当前评分 |
| change | 评分变化时触发 | value: 当前评分 |

## 注意事项

1. 当 `disabled` 或 `readonly` 为 `true` 时，用户无法修改评分值
2. 当 `allowHalf` 为 `true` 时，评分值可以包含小数（如 3.5 分）
3. 评分组件依赖于 `fanc-icon` 组件，请确保已正确引入图标组件
4. 评分组件使用 CSS 变量定义样式，可通过修改 `--rate-active-color` 和 `--rate-inactive-color` 来自定义默认颜色
5. 气泡提示功能在点击星星时显示当前选择的分值和图标，气泡使用白色背景，更加美观和易读
6. 当同时启用 `allowHalf` 和 `showBubble` 时，点击星星会显示半星选择气泡，用户可以精确选择半星或整星评分
7. `autoCloseBubble` 配置项用于控制气泡是否自动关闭，默认值为 `null`，表示根据 `allowHalf` 自动决定：允许半星时不自动关闭，不允许半星时自动关闭
8. 使用带描述评分功能时，需要提供 `descriptions` 数组，数组长度应与 `count` 相同，每个元素对应一个星级的描述文本
9. 描述文本可以放置在评分组件的左侧或右侧，通过 `descriptionPosition` 配置，可选值为 'left' 或 'right'
10. 当评分值为 0 时，会显示 `unselectedDescription` 作为描述文本 
11. 滑动评分功能支持精确的触摸滑动选择，当 `allowHalf` 为 `true` 时，可以通过滑动选择半星评分
12. 如果不希望用户通过滑动选择评分，可以将 `touchable` 设置为 `false`
13. 在移动端使用时，滑动评分功能会自动阻止页面滚动，确保良好的用户体验
14. 可以通过 `halfIcon` 属性自定义半星图标，默认为 `star-half-alt`