# fanc-skeleton 骨架屏组件

## 组件介绍

`fanc-skeleton` 是一个用于在页面数据加载完成前展示页面大致结构的骨架屏组件。当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构，减少用户等待时的焦虑感，提升用户体验。

## 组件特性

- 支持显示标题、头像、段落等基础骨架结构
- 支持自定义每个部分的样式和尺寸
- 支持加载动画效果
- 支持圆角风格
- 支持自定义行数和宽度
- 支持自定义模板，适应复杂布局
- 支持显示/隐藏控制，便于在数据加载完成后显示真实内容

## 组件用法

### 基础用法

最简单的骨架屏只需要使用基础属性：

```vue
<fanc-skeleton />
```

### 显示头像

添加头像占位图：

```vue
<fanc-skeleton avatar />
```

### 圆形头像

设置头像为圆形：

```vue
<fanc-skeleton avatar avatarRound />
```

### 标题和段落

显示标题和段落占位：

```vue
<fanc-skeleton title paragraph />
```

### 自定义行数和宽度

自定义段落行数和每行宽度：

```vue
<fanc-skeleton 
  title 
  paragraph 
  :rowCount="5" 
  :rowWidths="['60%', '80%', '70%', '90%', '40%']" 
/>
```

### 带圆角风格

使用圆角风格的骨架屏：

```vue
<fanc-skeleton avatar avatarRound title paragraph round />
```

### 关闭动画效果

关闭加载动画：

```vue
<fanc-skeleton title paragraph :animated="false" />
```

### 自定义背景色

设置骨架屏背景色：

```vue
<fanc-skeleton title paragraph bgColor="#f8f8f8" />
```

### 实际应用场景

结合loading属性控制骨架屏的显示和隐藏：

```vue
<fanc-skeleton 
  :loading="isLoading" 
  avatar 
  avatarSize="48px" 
  avatarRound 
  title 
  titleWidth="60%" 
  paragraph 
  :rowCount="3"
>
  <!-- 实际内容 -->
  <view class="content">
    <view class="header">
      <image class="avatar" src="path/to/avatar.jpg"></image>
      <view class="title">真实标题</view>
    </view>
    <view class="text">这里是实际内容，当 isLoading 为 false 时显示</view>
  </view>
</fanc-skeleton>
```

### 自定义骨架屏模板

对于复杂布局，可以使用自定义模板：

```vue
<fanc-skeleton :loading="isLoading">
  <template #template>
    <view class="custom-skeleton">
      <!-- 自定义骨架屏布局 -->
      <view class="custom-skeleton__header">
        <view class="custom-skeleton__avatar"></view>
        <view class="custom-skeleton__title"></view>
      </view>
      <view class="custom-skeleton__content">
        <view class="custom-skeleton__item"></view>
        <view class="custom-skeleton__item"></view>
      </view>
    </view>
  </template>
  
  <!-- 实际内容 -->
  <view class="real-content">
    实际内容区域
  </view>
</fanc-skeleton>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示骨架屏，为 true 时显示骨架屏，false 则显示实际内容 | Boolean | `true` |
| animated | 是否开启动画效果 | Boolean | `true` |
| avatar | 是否显示头像占位图 | Boolean | `false` |
| avatarSize | 头像占位图大小 | String | `32px` |
| avatarRound | 头像是否为圆形 | Boolean | `false` |
| title | 是否显示标题占位图 | Boolean | `true` |
| titleWidth | 标题占位图宽度 | String | `40%` |
| paragraph | 是否显示段落占位图 | Boolean | `true` |
| rowCount | 段落占位图行数 | Number | `3` |
| rowWidths | 自定义每行宽度，如 ['60%', '100%', '80%'] | Array | - |
| round | 所有占位图是否显示为圆角风格 | Boolean | `false` |
| bgColor | 骨架屏背景色 | String | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 骨架屏的实际内容，当 loading 为 false 时显示 |
| template | 自定义骨架屏模板，可用于复杂布局 |

## CSS 变量

组件提供了一些 CSS 变量，可用于自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --skeleton-bg-color | 骨架屏占位元素的背景色 | `#eeeeee` |
| --skeleton-from-color | 骨架屏动画渐变起始颜色 | `#eeeeee` |
| --skeleton-to-color | 骨架屏动画渐变结束颜色 | `#dddddd` |
| --skeleton-title-radius | 标题占位图圆角大小 | `2px` |
| --skeleton-avatar-radius | 头像占位图圆角大小 | `2px` |
| --skeleton-row-radius | 段落占位图圆角大小 | `2px` |
| --skeleton-round-radius | 圆角风格下的公共圆角大小 | `8px` |

## 注意事项

1. 为了获得最佳效果，骨架屏的结构应尽量与实际内容结构保持一致
2. 在使用自定义模板时，需要自行设置占位元素的样式
3. 骨架屏通常用于首屏加载，不建议在页面频繁切换的场景使用
4. 骨架屏的动画效果会消耗一定的性能，在低端设备上可以考虑关闭动画
5. 当需要展示复杂布局时，推荐使用自定义模板插槽实现 