# Pagination 分页组件

分页组件，用于数据量过多时进行分页显示。

## 基础用法

基础分页组件，用于分页显示数据，通过 `v-model` 或 `value` 绑定当前页码。

```html
<fanc-pagination v-model="currentPage" :total="100"></fanc-pagination>
```

## 简单模式

简单模式下，只显示当前页码和总页数，适用于空间有限的场景。

```html
<fanc-pagination v-model="currentPage" :total="100" simple></fanc-pagination>
```

## 显示文字

可以通过 `show-page-text` 属性来显示上一页和下一页的文字。

```html
<fanc-pagination v-model="currentPage" :total="100" show-page-text></fanc-pagination>
```

## 自定义文字

可以自定义上一页和下一页的文字。

```html
<fanc-pagination
  v-model="currentPage"
  :total="100"
  show-page-text
  prev-text="前往上一页"
  next-text="前往下一页"
></fanc-pagination>
```

## 迷你版本

通过 `mini` 属性可以设置为迷你版分页，适用于空间有限的场景。

```html
<fanc-pagination v-model="currentPage" :total="100" mini></fanc-pagination>
```

## 多页码

当页码较多时，会自动省略中间部分，显示首尾页码和当前页码附近的页码。

```html
<fanc-pagination v-model="currentPage" :total="500" :page-size="10"></fanc-pagination>
```

## 自定义页码数量

通过 `pager-count` 属性可以自定义页码按钮的数量。

```html
<fanc-pagination
  v-model="currentPage"
  :total="500"
  :page-size="10"
  :pager-count="5"
></fanc-pagination>
```

## 深色主题

通过 `dark` 属性可以设置深色主题。

```html
<fanc-pagination v-model="currentPage" :total="100" dark></fanc-pagination>
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
    v-model="productPage"
    :total="mockProducts.length"
    :page-size="5"
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
| value / v-model | 当前页码 | `Number` | `1` |
| total | 总记录数 | `Number` | `0` |
| pageSize | 每页记录数 | `Number` | `10` |
| pagerCount | 页码按钮的数量，当总页数超过该值时会折叠 | `Number` | `7` |
| mini | 是否使用小型分页样式 | `Boolean` | `false` |
| simple | 是否使用简单分页模式 | `Boolean` | `false` |
| dark | 是否使用深色主题 | `Boolean` | `false` |
| hidden | 当只有1页时是否隐藏分页 | `Boolean` | `false` |
| prevText | 上一页文字 | `String` | `上一页` |
| nextText | 下一页文字 | `String` | `下一页` |
| showPageText | 是否显示上一页/下一页文字 | `Boolean` | `false` |
| background | 页码按钮背景色 | `String` | - |
| activeColor | 当前页码的文字颜色 | `String` | - |
| activeBackground | 当前页码的背景颜色 | `String` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码改变时触发 | `(page: number)` |
| prev | 点击上一页按钮时触发 | - |
| next | 点击下一页按钮时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| - | 暂无插槽 |

## 样式变量

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --pagination-button-bg-color | var(--bg-white) | 按钮背景颜色 |
| --pagination-button-text-color | var(--text-primary) | 按钮文字颜色 |
| --pagination-active-bg-color | var(--fanc-primary-color) | 当前页按钮背景颜色 |
| --pagination-active-text-color | var(--white) | 当前页按钮文字颜色 |
| --pagination-disabled-color | var(--text-disabled) | 禁用状态颜色 |
| --pagination-text-color | var(--text-primary) | 文字颜色 |
| --pagination-current-color | var(--fanc-primary-color) | 当前页文字颜色 |
| --pagination-separator-color | var(--text-secondary) | 分隔符颜色 |
| --pagination-total-color | var(--text-secondary) | 总页数文字颜色 |
| --pagination-dark-bg-color | var(--black-300) | 深色主题背景颜色 |
| --pagination-dark-text-color | var(--gray-100) | 深色主题文字颜色 |
| --pagination-dark-active-bg-color | var(--fanc-primary-color) | 深色主题当前页背景颜色 |
| --pagination-dark-active-text-color | var(--white) | 深色主题当前页文字颜色 |
</rewritten_file> 