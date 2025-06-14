# Pagination 分页组件

分页组件，用于数据量过多时进行分页显示。

## 基础用法

基础分页组件，用于分页显示数据，通过 `current` 属性绑定当前页码。默认使用省略号模式。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="100"
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 简单模式

简单模式下，只显示当前页码和总页数，适用于空间有限的场景。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="100" 
  simple
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 不显示省略号

分页组件默认使用省略号模式，如果不需要省略号，可以通过设置 `showEllipsis` 为 `false` 关闭。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="200" 
  :showEllipsis="false"
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 快速跳转

通过 `showQuickJumper` 属性可以开启快速跳转功能，点击页码比例按钮可以弹出选择器快速选择页码。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="200" 
  :showQuickJumper="true"
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 显示总条数

通过 `showTotal` 属性可以显示总条数，当总条数超过9999时会显示为"9999+"并支持点击查看详细数量。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="150" 
  :showTotal="true"
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 自定义插槽

可以通过插槽自定义上一页、下一页按钮和页码内容。

```html
<fanc-pagination :current="currentPage" :total="100" @change="handleChange">
  <!-- 自定义上一页按钮 -->
  <template #prev>
    <fanc-icon name="angle-left" />
  </template>
  
  <!-- 自定义下一页按钮 -->
  <template #next>
    <fanc-icon name="angle-right" />
  </template>
  
  <!-- 自定义页码 -->
  <template #page="{ page }">
    {{ page }}页
  </template>
</fanc-pagination>
```

## 迷你版本

通过 `mini` 属性可以设置为迷你版分页，适用于空间有限的场景。迷你模式下，中间位置会额外显示首尾页码，便于快速跳转。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="500" 
  mini
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 深色主题

通过 `dark` 属性可以设置深色主题，会为整个分页器添加深色背景。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="100" 
  dark
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 功能组合

可以组合使用多种功能，如mini模式、显示总条数、快速跳转等。

```html
<fanc-pagination 
  :current="currentPage" 
  :total="10000" 
  :pageSize="100" 
  :showTotal="true"
  :showQuickJumper="true"
  mini
  @change="(page) => { currentPage = page }"
></fanc-pagination>
```

## 商品列表示例

结合商品列表使用分页组件的示例。

```html
<view class="product-list">
  <view
    class="product-item"
    v-for="(item, index) in displayProducts"
    :key="index"
  >
    <view class="product-image"></view>
    <view class="product-content">
      <view class="product-name">{{ item.name }}</view>
      <view class="product-desc">{{ item.desc }}</view>
      <view class="product-price">¥{{ item.price.toFixed(2) }}</view>
    </view>
  </view>
</view>
<view class="pagination-container">
  <fanc-pagination
    :current="productPage"
    :total="mockProducts.length"
    :pageSize="5"
    :showQuickJumper="true"
    :showTotal="true"
    @change="handleProductPageChange"
  ></fanc-pagination>
</view>

<script>
export default {
  data() {
    return {
      productPage: 1,
      mockProducts: Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `商品 ${index + 1}`,
        desc: `这是商品 ${index + 1} 的描述信息，描述了商品的特点和用途。`,
        price: Math.floor(Math.random() * 1000) + 100,
      })),
    };
  },
  computed: {
    displayProducts() {
      const pageSize = 5;
      const startIndex = (this.productPage - 1) * pageSize;
      return this.mockProducts.slice(startIndex, startIndex + pageSize);
    },
  },
  methods: {
    handleProductPageChange(page) {
      this.productPage = page;
      this.$toast.text(`加载第${page}页商品`);
    },
  },
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页码 | `Number` | `1` |
| total | 总条目数 | `Number` | `0` |
| pageSize | 每页条目数 | `Number` | `10` |
| simple | 是否使用简单分页模式 | `Boolean` | `false` |
| showEllipsis | 是否显示省略号 | `Boolean` | `true` |
| mini | 是否使用小型分页样式 | `Boolean` | `false` |
| dark | 是否使用深色主题 | `Boolean` | `false` |
| hidden | 当只有1页时是否隐藏分页 | `Boolean` | `false` |
| showQuickJumper | 是否显示快速跳转 | `Boolean` | `false` |
| showTotal | 是否显示总条数 | `Boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码改变时触发 | `(page: number)` |
| prev | 点击上一页按钮时触发 | - |
| next | 点击下一页按钮时触发 | - |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| prev | 自定义上一页按钮内容 | - |
| next | 自定义下一页按钮内容 | - |
| page | 自定义页码内容 | `{ page: number }` |
| prev-more | 自定义向前省略号内容 | - |
| next-more | 自定义向后省略号内容 | - |
| info | 自定义简单模式下的页码信息 | `{ current: number, total: number }` |

## 样式变量

组件提供了以下CSS变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --pagination-button-bg-color | #fff | 按钮背景颜色 |
| --pagination-button-text-color | #606266 | 按钮文字颜色 |
| --pagination-active-bg-color | #1989fa | 当前页按钮背景颜色 |
| --pagination-active-text-color | #fff | 当前页按钮文字颜色 |
| --pagination-disabled-color | #c0c4cc | 禁用状态颜色 |

## 省略号模式说明

省略号模式下（默认模式），分页器会根据当前页码位置自动调整显示方式：

1. 当前页在前部分（1-2页）：显示前3页 + 省略号 + 最后一页
2. 当前页在中间：显示省略号 + 当前页前一页 + 当前页 + 当前页后一页 + 省略号（在mini模式下会额外显示首尾页码）
3. 当前页在后部分（倒数2页）：显示第1页 + 省略号 + 后3页

这种设计确保分页器始终只显示适量的页码元素，保持界面简洁的同时提供良好的导航体验。 