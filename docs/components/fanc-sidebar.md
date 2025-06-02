# fanc-sidebar 侧边栏组件

## 组件介绍

`fanc-sidebar` 是一个侧边栏导航组件，用于创建固定的垂直导航菜单，常用于应用的左侧或右侧导航。它通常与 `fanc-sidebar-item` 组件一起使用，形成完整的侧边导航系统。

## 组件特性

- 支持左侧和右侧固定展示
- 支持自定义宽度
- 支持选项激活状态
- 支持禁用状态
- 支持徽标显示
- 支持v-model双向绑定
- 支持选中项与内容区域的视觉黏连效果
- 支持圆角过渡，使界面更加自然美观

## 组件用法

### 基础用法

```vue
<template>
  <view class="container">
    <fanc-sidebar :active-index="activeIndex" @change="onChange" class="sidebar">
      <fanc-sidebar-item 
        v-for="(item, index) in menuItems" 
        :key="index"
        :title="item.title"
        :icon="item.icon"
        :active="activeIndex === index"
        :index="index"
        @click="onItemClick(index)"
      />
    </fanc-sidebar>
    
    <view class="content">
      <!-- 内容区域 -->
      <text>当前选中: {{ menuItems[activeIndex].title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      menuItems: [
        { title: '选项一', icon: 'home' },
        { title: '选项二', icon: 'user' },
        { title: '选项三', icon: 'bell' },
        { title: '选项四', icon: 'cog' }
      ]
    };
  },
  methods: {
    onItemClick(index) {
      this.activeIndex = index;
      // 处理菜单项点击事件
    },
    onChange(index) {
      console.log('当前选中索引:', index);
    }
  }
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 200px;
  height: 100%;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
```

### 使用v-model双向绑定

```vue
<!-- 侧边栏组件支持v-model:activeIndex双向绑定 -->
<fanc-sidebar v-model:active-index="activeIndex" class="sidebar">
  <!-- 侧边栏内容 -->
</fanc-sidebar>

<!-- 侧边栏项组件支持v-model:active双向绑定 -->
<fanc-sidebar-item 
  v-for="(item, index) in menuItems"
  :key="index"
  :title="item.title"
  :icon="item.icon"
  v-model:active="activeItems[index]"
  :index="index"
  @click="onItemClick(index)"
/>
```

### 右侧侧边栏

```vue
<fanc-sidebar :active-index="activeIndex" position="right" class="sidebar">
  <fanc-sidebar-item 
    v-for="(item, index) in menuItems" 
    :key="index"
    :title="item.title"
    :icon="item.icon"
    :active="activeIndex === index"
    :index="index"
    @click="onItemClick(index)"
  />
</fanc-sidebar>
```

### 自定义宽度

```vue
<fanc-sidebar :active-index="activeIndex" :width="100" class="sidebar">
  <fanc-sidebar-item 
    v-for="(item, index) in menuItems" 
    :key="index"
    :icon="item.icon"
    :active="activeIndex === index"
    :index="index"
    @click="onItemClick(index)"
  />
</fanc-sidebar>
```

### 带徽标的侧边栏项

```vue
<fanc-sidebar :active-index="activeIndex" class="sidebar">
  <fanc-sidebar-item title="选项一" icon="home" />
  <fanc-sidebar-item title="选项二" icon="user" />
  <fanc-sidebar-item title="消息" icon="bell" badge="5" />
  <fanc-sidebar-item title="选项四" icon="cog" />
</fanc-sidebar>
```

### 禁用状态

```vue
<fanc-sidebar :active-index="activeIndex" class="sidebar">
  <fanc-sidebar-item title="选项一" icon="home" />
  <fanc-sidebar-item title="选项二" icon="user" />
  <fanc-sidebar-item title="选项三" icon="bell" disabled />
  <fanc-sidebar-item title="选项四" icon="cog" />
</fanc-sidebar>
```

### 自定义背景色

```vue
<fanc-sidebar :active-index="activeIndex" background-color="#f0f0f0" class="sidebar">
  <fanc-sidebar-item title="选项一" icon="home" />
  <fanc-sidebar-item title="选项二" icon="user" />
  <fanc-sidebar-item title="选项三" icon="bell" />
  <fanc-sidebar-item title="选项四" icon="cog" />
</fanc-sidebar>
```

## API

### fanc-sidebar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active-index | 当前激活项的索引 | Number \| String | `0` |
| width | 侧边栏宽度，单位为px | Number \| String | `200` |
| position | 侧边栏位置，可选值为 `left` `right` | String | `left` |
| background-color | 自定义背景色 | String | `''` |
| custom-style | 自定义侧边栏样式 | Object | `{}` |

### fanc-sidebar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:active-index | 更新activeIndex属性值 | index: 当前激活项的索引 |
| change | 激活项变化时触发 | index: 当前激活项的索引 |

### fanc-sidebar Slots

| 名称 | 说明 |
| --- | --- |
| default | 侧边栏内容，通常是多个fanc-sidebar-item组件 |
| content | 自定义整个侧边栏内容 |

### fanc-sidebar-item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 菜单项标题 | String | `''` |
| icon | 菜单项图标名称 | String | `''` |
| icon-size | 图标大小，单位为px | Number \| String | `18` |
| active | 是否为选中状态 | Boolean | `false` |
| disabled | 是否为禁用状态 | Boolean | `false` |
| badge | 徽标内容 | Number \| String | `''` |
| index | 菜单项索引，点击事件回调参数 | Number \| String | `''` |

### fanc-sidebar-item Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击菜单项时触发 | index: 菜单项索引 |
| update:active | 更新active属性值 | active: 是否为选中状态 |

### fanc-sidebar-item Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义菜单项内容，会覆盖title属性 |
| icon | 自定义图标，会覆盖icon属性 |

## 样式变量

组件提供了以下CSS变量，可用于自定义样式，在项目的`src/styles/variables.css`中可以覆盖这些变量：

```css
--sidebar-bg-color: #f5f5f5;
--sidebar-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
--sidebar-border-color: #ebedf0;
--sidebar-item-bg-color: #f5f5f5;
--sidebar-item-border-color: #ebedf0;
--sidebar-item-active-bg-color: #fff;
--sidebar-item-active-color: #007bff;
--sidebar-item-active-indicator-color: #007bff;
--sidebar-item-badge-bg-color: #dc3545;
--sidebar-item-badge-color: #fff;
--sidebar-item-active-radius: 8px;
```

## 注意事项

1. 使用 `v-model:active-index` 可以实现侧边栏选中项的双向绑定
2. 使用 `v-model:active` 可以实现侧边栏项选中状态的双向绑定
3. 侧边栏默认宽度为200px，可以通过 `width` 属性自定义宽度
4. 侧边栏项的激活状态需要手动控制，通过 `active` 属性设置
5. 侧边栏通常与flex布局一起使用，以实现左右分栏的效果
6. 侧边栏内容可以完全自定义，不仅限于使用 `fanc-sidebar-item` 组件
7. 默认侧边栏背景色为浅灰色，选中项背景色为白色，形成与内容区域的视觉黏连效果
8. 可以通过设置 `--sidebar-item-active-radius` 变量来调整选中项的圆角，实现不同的视觉效果
9. 选中项具有轻微的阴影效果和圆角，使视觉过渡更加自然 