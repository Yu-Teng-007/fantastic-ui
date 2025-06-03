# fanc-tabs 选项卡组件

## 组件介绍

`fanc-tabs` 是一个功能完善的选项卡组件，用于内容分类后的展示切换。它支持线条和卡片两种样式，可以满足各种内容分类和切换场景的需求。

## 组件特性

- 支持线条和卡片两种样式
- 支持标签禁用状态
- 支持自定义标签样式和底部条样式
- 支持多标签横向滚动
- 支持徽标和小红点提示
- 支持粘性布局
- 支持滑动切换功能

## 组件用法

### 基础用法

```vue
<fanc-tabs :tabs="tabs" @change="onChange">
    <view v-if="activeTab === 0">标签 1 内容</view>
    <view v-if="activeTab === 1">标签 2 内容</view>
    <view v-if="activeTab === 2">标签 3 内容</view>
</fanc-tabs>

<script>
export default {
    data() {
        return {
            tabs: [
                { title: '标签 1' },
                { title: '标签 2' },
                { title: '标签 3' }
            ],
            activeTab: 0
        }
    },
    methods: {
        onChange(event) {
            this.activeTab = event.index;
        }
    }
}
</script>
```

### 卡片样式

```vue
<fanc-tabs type="card" :tabs="tabs" @change="onChange">
    <view v-if="activeTab === 0">标签 1 内容</view>
    <view v-if="activeTab === 1">标签 2 内容</view>
    <view v-if="activeTab === 2">标签 3 内容</view>
</fanc-tabs>
```

### 徽标提示

```vue
<fanc-tabs :tabs="tabs" @change="onChange">
    <view v-if="activeTab === 0">标签 1 内容</view>
    <view v-if="activeTab === 1">标签 2 内容</view>
    <view v-if="activeTab === 2">标签 3 内容</view>
</fanc-tabs>

<script>
export default {
    data() {
        return {
            tabs: [
                { title: '标签 1', badge: '5' },
                { title: '标签 2', badge: '10' },
                { title: '标签 3', dot: true }
            ],
            activeTab: 0
        }
    }
}
</script>
```

### 禁用标签

```vue
<fanc-tabs :tabs="tabs" @disabled="onDisabled" @change="onChange">
    <view v-if="activeTab === 0">标签 1 内容</view>
    <view v-if="activeTab === 1">标签 2 内容</view>
    <view v-if="activeTab === 2">标签 3 内容</view>
</fanc-tabs>

<script>
export default {
    data() {
        return {
            tabs: [
                { title: '标签 1' },
                { title: '标签 2', disabled: true },
                { title: '标签 3' }
            ],
            activeTab: 0
        }
    },
    methods: {
        onDisabled(event) {
            this.$toast.warning('该标签已被禁用');
        }
    }
}
</script>
```

### 自定义样式

```vue
<fanc-tabs 
    :tabs="tabs" 
    active-color="#ee0a24"
    inactive-color="#646566"
    line-width="30px"
    line-height="4px"
    @change="onChange"
>
    <view v-if="activeTab === 0">标签 1 内容</view>
    <view v-if="activeTab === 1">标签 2 内容</view>
    <view v-if="activeTab === 2">标签 3 内容</view>
</fanc-tabs>
```

### 滚动标签

```vue
<fanc-tabs :tabs="tabs" scrollable @change="onChange">
    <!-- 内容区域 -->
</fanc-tabs>

<script>
export default {
    data() {
        return {
            tabs: [
                { title: '标签 1' },
                { title: '标签 2' },
                { title: '标签 3' },
                { title: '标签 4' },
                { title: '标签 5' },
                { title: '标签 6' },
                { title: '标签 7' }
            ]
        }
    }
}
</script>
```

### 粘性布局

```vue
<fanc-tabs :tabs="tabs" sticky @change="onChange">
    <!-- 内容区域 -->
</fanc-tabs>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 选项卡样式类型，可选值为 `line` `card` | String | `line` |
| tabs | 选项卡标题数组，格式为 `[{title: '标签1', disabled: false}]` | Array | `[]` |
| active | 当前激活的标签索引 | Number | `0` |
| animated | 是否启用切换动画 | Boolean | `true` |
| swipeable | 是否可滑动切换 | Boolean | `false` |
| scrollable | 是否可滚动 | Boolean | `false` |
| sticky | 是否使用粘性布局 | Boolean | `false` |
| duration | 动画时长，单位秒 | Number | `0.3` |
| lineWidth | 底部条宽度，默认单位px | String | `20px` |
| lineHeight | 底部条高度，默认单位px | String | `3px` |
| activeColor | 激活状态颜色 | String | - |
| inactiveColor | 未激活状态颜色 | String | - |
| bgColor | 背景颜色 | String | - |

### Tabs 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| title | 标签标题 | String |
| disabled | 是否禁用标签 | Boolean |
| badge | 徽标内容 | String \| Number |
| dot | 是否显示小红点 | Boolean |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | `{ index: 标签索引, title: 标签标题 }` |
| click | 点击标签时触发 | `{ index: 标签索引, title: 标签标题 }` |
| disabled | 点击禁用标签时触发 | `{ index: 标签索引, title: 标签标题 }` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 选项卡内容区域 |

## 注意事项

1. 使用时需要根据当前激活的标签索引来控制内容区域的显示与隐藏
2. 当标签数量较多时，建议开启 `scrollable` 属性使标签可以横向滚动
3. 使用 `sticky` 属性时，标签栏会在页面滚动时固定在顶部
4. 使用 `swipeable` 属性可以通过左右滑动切换标签，适合移动端使用 