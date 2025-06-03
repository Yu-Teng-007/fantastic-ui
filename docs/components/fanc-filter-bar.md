# fanc-filter-bar 筛选栏组件

## 组件介绍

`fanc-filter-bar` 是一个用于列表页面的数据筛选组件，支持下拉菜单、抽屉式筛选和单选切换等多种筛选方式。它可以帮助用户快速筛选和排序列表数据，提高用户体验。

## 组件特性

- 支持多种筛选方式：下拉菜单、抽屉式筛选、单选切换
- 支持横向滚动，适应多个筛选项
- 支持自定义更多筛选按钮
- 支持多选和单选筛选
- 支持固定在页面顶部
- 支持禁用特定筛选项
- 提供丰富的事件和自定义选项

## 组件用法

### 基础用法

```vue
<template>
  <fanc-filter-bar
    :items="filterItems"
    @filter-change="onFilterChange"
  ></fanc-filter-bar>
</template>

<script>
export default {
  data() {
    return {
      filterItems: [
        {
          text: '综合排序',
          type: 'dropdown',
          id: 'sort',
          options: [
            { text: '综合排序', value: 'default' },
            { text: '销量优先', value: 'sales' },
            { text: '价格低到高', value: 'price-asc' },
            { text: '价格高到低', value: 'price-desc' }
          ]
        },
        {
          text: '分类',
          type: 'dropdown',
          id: 'category',
          options: [
            { text: '全部分类', value: '' },
            { text: '手机数码', value: 'digital' },
            { text: '家用电器', value: 'appliance' },
            { text: '电脑办公', value: 'computer' }
          ]
        }
      ]
    };
  },
  methods: {
    onFilterChange(result) {
      console.log('筛选结果:', result);
    }
  }
};
</script>
```

### 带抽屉筛选

```vue
<template>
  <fanc-filter-bar
    :items="filterItems"
    :drawer-items="drawerItems"
    @filter-change="onFilterChange"
  ></fanc-filter-bar>
</template>

<script>
export default {
  data() {
    return {
      filterItems: [
        {
          text: '综合排序',
          type: 'dropdown',
          id: 'sort',
          options: [
            { text: '综合排序', value: 'default' },
            { text: '销量优先', value: 'sales' },
            { text: '价格低到高', value: 'price-asc' },
            { text: '价格高到低', value: 'price-desc' }
          ]
        },
        {
          text: '更多筛选',
          type: 'drawer'
        }
      ],
      drawerItems: [
        {
          id: 'brand',
          title: '品牌',
          multiple: true,
          options: [
            { text: '苹果', value: 'apple' },
            { text: '华为', value: 'huawei' },
            { text: '小米', value: 'xiaomi' },
            { text: '三星', value: 'samsung' }
          ]
        },
        {
          id: 'price',
          title: '价格区间',
          multiple: false,
          options: [
            { text: '0-1000元', value: '0-1000' },
            { text: '1000-2000元', value: '1000-2000' },
            { text: '2000-3000元', value: '2000-3000' },
            { text: '3000元以上', value: '3000-' }
          ]
        }
      ]
    };
  },
  methods: {
    onFilterChange(result) {
      console.log('筛选结果:', result);
    }
  }
};
</script>
```

### 单选切换

```vue
<template>
  <fanc-filter-bar
    :items="filterItems"
    @filter-change="onFilterChange"
  ></fanc-filter-bar>
</template>

<script>
export default {
  data() {
    return {
      filterItems: [
        {
          text: '综合排序',
          type: 'dropdown',
          id: 'sort',
          options: [
            { text: '综合排序', value: 'default' },
            { text: '销量优先', value: 'sales' },
            { text: '价格低到高', value: 'price-asc' },
            { text: '价格高到低', value: 'price-desc' }
          ]
        },
        {
          text: '有货',
          type: 'radio',
          id: 'inStock'
        },
        {
          text: '促销',
          type: 'radio',
          id: 'promotion'
        }
      ]
    };
  },
  methods: {
    onFilterChange(result) {
      console.log('筛选结果:', result);
    }
  }
};
</script>
```

### 自定义文本

```vue
<template>
  <fanc-filter-bar
    :items="filterItems"
    :drawer-items="drawerItems"
    more-text="筛选"
    reset-text="清空"
    confirm-text="应用"
    @filter-change="onFilterChange"
  ></fanc-filter-bar>
</template>
```

### 禁用选项

```vue
<template>
  <fanc-filter-bar
    :items="filterItems"
    @filter-change="onFilterChange"
  ></fanc-filter-bar>
</template>

<script>
export default {
  data() {
    return {
      filterItems: [
        {
          text: '综合排序',
          type: 'dropdown',
          id: 'sort',
          options: [
            { text: '综合排序', value: 'default' },
            { text: '销量优先', value: 'sales' }
          ]
        },
        {
          text: '分类',
          type: 'dropdown',
          id: 'category',
          disabled: true,
          options: [
            { text: '全部分类', value: '' },
            { text: '手机数码', value: 'digital' }
          ]
        }
      ]
    };
  }
};
</script>
```

### 固定顶部

```vue
<template>
  <fanc-filter-bar
    :items="filterItems"
    :fixed="true"
    @filter-change="onFilterChange"
  ></fanc-filter-bar>
  <!-- 占位元素，防止筛选栏遮挡内容 -->
  <view style="height: 88px;"></view>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 筛选项配置 | Array | `[]` |
| drawer-items | 抽屉筛选项配置 | Array | `[]` |
| show-more | 是否显示更多筛选按钮 | Boolean | `true` |
| more-text | 更多筛选按钮文本 | String | `更多筛选` |
| reset-text | 重置按钮文本 | String | `重置` |
| confirm-text | 确认按钮文本 | String | `确定` |
| dropdown-height | 下拉菜单高度 | Number | `300` |
| fixed | 是否固定在顶部 | Boolean | `false` |
| border | 是否显示底部边框 | Boolean | `true` |

### items 数据结构

```js
[
  {
    text: '筛选项文本',
    type: 'dropdown' | 'drawer' | 'radio', // 下拉菜单、抽屉筛选、单选切换
    id: 'uniqueId', // 唯一标识，用于结果返回
    value: '', // 当前选中的值
    options: [ // 选项列表，type为dropdown时必填
      { text: '选项1', value: 'value1' },
      { text: '选项2', value: 'value2' }
    ],
    disabled: false, // 是否禁用
    showSelectedText: false // 是否在筛选项文本中显示选中的选项文本
  }
]
```

### drawer-items 数据结构

```js
[
  {
    id: 'uniqueId', // 分组唯一标识
    title: '分组标题', // 分组标题
    multiple: false, // 是否多选
    options: [ // 选项列表
      { text: '选项1', value: 'value1' },
      { text: '选项2', value: 'value2' }
    ],
    value: '' // 当前选中的值，多选时为数组
  }
]
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| filter-change | 筛选条件变化时触发 | result: 筛选结果对象 |

### 筛选结果数据结构

```js
{
  // 普通筛选结果
  filter: {
    'sort': 'sales', // 下拉菜单选中的值
    'inStock': true // 单选切换的状态
  },
  // 抽屉筛选结果
  drawer: {
    'brand': ['apple', 'huawei'], // 多选结果
    'price': '1000-2000' // 单选结果
  }
}
```

## 注意事项

1. 使用固定顶部模式时，需要添加占位元素，防止筛选栏遮挡内容
2. 抽屉筛选需要同时设置 `items` 中的 `drawer` 类型项和 `drawer-items` 属性
3. 单选切换类型的筛选项，点击后会切换选中状态
4. 组件内部会自动处理筛选项的激活状态，无需手动控制
5. 筛选结果通过 `filter-change` 事件返回，包含普通筛选和抽屉筛选的结果 