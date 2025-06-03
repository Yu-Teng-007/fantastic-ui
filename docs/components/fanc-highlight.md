# fanc-highlight 高亮文本组件

## 组件介绍

`fanc-highlight` 是一个用于高亮显示特定文本的组件，可以用于搜索结果展示、关键信息突出显示等场景。它支持多种类型和样式，可以满足各种高亮显示的需求。

## 组件特性

- 支持单个或多个关键词的高亮显示
- 支持多种预设类型：主要、成功、警告、危险和信息
- 支持自定义文本颜色和背景色
- 支持圆角样式
- 支持自定义关键词的样式
- 支持文本内容插槽，方便灵活使用

## 组件用法

### 基础用法

```vue
<fanc-highlight>这是一段普通文本</fanc-highlight>
```

### 关键词高亮

```vue
<fanc-highlight text="这是一段包含关键词的文本内容" keywords="关键词"></fanc-highlight>
```

### 多关键词高亮

```vue
<fanc-highlight 
    text="这是一段包含多个关键词的长文本内容，可以同时高亮多个不同的关键词" 
    :keywords="['关键词', '高亮', '文本']">
</fanc-highlight>
```

### 不同类型

```vue
<fanc-highlight type="primary">主要类型</fanc-highlight>
<fanc-highlight type="success">成功类型</fanc-highlight>
<fanc-highlight type="warning">警告类型</fanc-highlight>
<fanc-highlight type="danger">危险类型</fanc-highlight>
<fanc-highlight type="info">信息类型</fanc-highlight>
```

### 圆角样式

```vue
<fanc-highlight type="primary" round>圆角主要类型</fanc-highlight>
<fanc-highlight type="success" round>圆角成功类型</fanc-highlight>
<fanc-highlight type="warning" round>圆角警告类型</fanc-highlight>
```

### 自定义颜色

```vue
<fanc-highlight color="#8e44ad" backgroundColor="#f5e6ff">自定义紫色</fanc-highlight>
<fanc-highlight color="#e67e22" backgroundColor="#fff5e6">自定义橙色</fanc-highlight>
<fanc-highlight color="#2ecc71" backgroundColor="#e6fff0">自定义绿色</fanc-highlight>
```

### 自定义关键词样式

```vue
<fanc-highlight 
    text="这是一段包含自定义关键词样式的文本" 
    keywords="自定义关键词"
    keywordColor="#ffffff"
    keywordBackgroundColor="#ff5252">
</fanc-highlight>

<fanc-highlight 
    text="这是一段包含不加粗关键词的文本" 
    keywords="不加粗"
    :bold="false"
    keywordColor="#2196f3">
</fanc-highlight>
```

### 搜索结果示例

```vue
<template>
  <view>
    <fanc-field
      v-model="searchKeyword"
      placeholder="请输入搜索关键词"
      clearable
      @confirm="handleSearch"
    >
      <template #right-icon>
        <fanc-icon name="search" size="20" @click="handleSearch"></fanc-icon>
      </template>
    </fanc-field>
    
    <view v-for="(item, index) in searchResults" :key="index">
      <fanc-highlight :text="item.content" :keywords="searchKeyword"></fanc-highlight>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      searchResults: [],
      mockData: [
        { id: 1, content: '高亮文本组件是一个非常实用的UI组件' },
        { id: 2, content: '可以用于搜索结果中显示匹配的关键词' }
      ]
    };
  },
  methods: {
    handleSearch() {
      this.searchResults = this.mockData.filter(item => 
        item.content.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文本内容 | String | '' |
| keywords | 需要高亮的关键词，可以是字符串或字符串数组 | String \| Array | '' |
| type | 高亮类型，可选值为 `primary` `success` `warning` `danger` `info` | String | 'primary' |
| color | 自定义文本颜色 | String | '' |
| backgroundColor | 自定义背景色 | String | '' |
| round | 是否使用圆角样式 | Boolean | false |
| keywordColor | 关键词自定义颜色 | String | '' |
| keywordBackgroundColor | 关键词自定义背景色 | String | '' |
| bold | 关键词是否使用加粗效果 | Boolean | true |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，当不使用 `text` 属性时可以通过插槽设置内容 |

## 注意事项

1. 当使用 `text` 属性时，默认插槽内容将被忽略
2. 当同时使用 `type` 属性和自定义颜色（`color`/`backgroundColor`）时，自定义颜色优先级更高
3. 关键词匹配不区分大小写，可以匹配文本中任意位置的关键词
4. 多个关键词可能会重叠匹配，组件会尽量保证所有关键词都能被正确高亮
5. 当使用多个关键词时，如果关键词之间有包含关系，可能会导致高亮效果不符合预期，建议避免使用有包含关系的关键词

## 应用场景

- 搜索结果中高亮显示匹配的关键词
- 页面中突出显示重要信息或提示
- 文本内容中标记特定术语或关键概念
- 表单验证后高亮显示错误或成功的部分
- 文章中高亮显示特定的标签或分类 