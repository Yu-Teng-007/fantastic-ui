# fanc-table 表格组件

## 组件介绍

`fanc-table` 是一个功能完善的表格组件，用于展示同类结构下的多种数据，易于组织、对比和分析等。表格通常包含表头、数据行和表尾三部分，支持数据的排序、筛选和分页等操作。

## 组件特性

- 支持基础表格、带边框表格、斑马纹表格等多种样式
- 支持大、中、小三种表格尺寸
- 支持表格列的左对齐、居中对齐和右对齐
- 支持表格列排序功能
- 支持表格数据选择功能（单选/多选）
- 支持表格分页功能
- 支持自定义空数据显示
- 支持加载状态展示
- 支持自定义列渲染
- 支持行点击事件
- 支持表格滚动和固定高度

## 组件用法

### 基础用法

```vue
<fanc-table
  :columns="columns"
  :data="tableData"
/>
```

```javascript
export default {
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name', width: '120px' },
        { title: '年龄', key: 'age', width: '80px' },
        { title: '地址', key: 'address' }
      ],
      tableData: [
        { name: '张三', age: 28, address: '北京市朝阳区' },
        { name: '李四', age: 32, address: '上海市浦东新区' }
      ]
    }
  }
}
```

### 带边框和斑马纹

```vue
<fanc-table
  :columns="columns"
  :data="tableData"
  bordered
  striped
/>
```

### 不同尺寸

```vue
<!-- 大尺寸 -->
<fanc-table
  :columns="columns"
  :data="tableData"
  size="large"
/>

<!-- 中尺寸（默认） -->
<fanc-table
  :columns="columns"
  :data="tableData"
/>

<!-- 小尺寸 -->
<fanc-table
  :columns="columns"
  :data="tableData"
  size="small"
/>
```

### 对齐方式

```vue
<fanc-table
  :columns="alignColumns"
  :data="tableData"
/>
```

```javascript
export default {
  data() {
    return {
      alignColumns: [
        { title: '姓名', key: 'name', width: '120px', align: 'left' },
        { title: '年龄', key: 'age', width: '80px', align: 'center' },
        { title: '地址', key: 'address', align: 'right' }
      ]
    }
  }
}
```

### 排序功能

```vue
<fanc-table
  :columns="sortColumns"
  :data="tableData"
  @sort-change="handleSortChange"
/>
```

```javascript
export default {
  data() {
    return {
      sortColumns: [
        { title: '姓名', key: 'name', width: '120px', sortable: true },
        { title: '年龄', key: 'age', width: '80px', sortable: true },
        { title: '地址', key: 'address' }
      ]
    }
  },
  methods: {
    handleSortChange({ key, order }) {
      console.log('排序字段:', key, '排序方式:', order);
    }
  }
}
```

### 加载状态

```vue
<fanc-table
  :columns="columns"
  :data="tableData"
  loading
  loadingText="加载中..."
/>
```

### 空数据显示

```vue
<fanc-table
  :columns="columns"
  :data="[]"
  emptyText="暂无数据"
/>
```

### 自定义空数据

```vue
<fanc-table
  :columns="columns"
  :data="[]"
>
  <template #empty>
    <view class="custom-empty">
      <fanc-icon name="database" size="32" color="#cccccc" />
      <text>暂无数据，请稍后再试</text>
    </view>
  </template>
</fanc-table>
```

### 可选择表格

```vue
<fanc-table
  :columns="columns"
  :data="tableData"
  selectable
  :selectedRowKeys="selectedRowKeys"
  @selection-change="handleSelectionChange"
/>
```

```javascript
export default {
  data() {
    return {
      selectedRowKeys: []
    }
  },
  methods: {
    handleSelectionChange(selectedKeys) {
      this.selectedRowKeys = selectedKeys;
    }
  }
}
```

### 自定义列渲染

```vue
<fanc-table
  :columns="customColumns"
  :data="userList"
>
  <template #column-avatar="{ row }">
    <image class="user-avatar" :src="row.avatar" mode="aspectFill" />
  </template>
  
  <template #column-status="{ row }">
    <view :class="['status-tag', `status-${row.status}`]">
      {{ getStatusText(row.status) }}
    </view>
  </template>
  
  <template #column-action="{ row }">
    <view class="action-buttons">
      <fanc-button size="mini" type="primary" @click="handleView(row)">查看</fanc-button>
      <fanc-button size="mini" type="danger" @click="handleDelete(row)">删除</fanc-button>
    </view>
  </template>
</fanc-table>
```

### 分页表格

```vue
<fanc-table
  :columns="columns"
  :data="paginatedData"
  :total="100"
  @page-change="handlePageChange"
  @page-size-change="handlePageSizeChange"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置数组 | Array | `[]` |
| data | 表格数据数组 | Array | `[]` |
| size | 表格尺寸，可选值为 `large` `medium` `small` | String | `medium` |
| bordered | 是否显示边框 | Boolean | `true` |
| striped | 是否显示斑马纹 | Boolean | `false` |
| loading | 是否显示加载状态 | Boolean | `false` |
| loadingText | 加载状态文本 | String | - |
| hover | 是否启用行悬停效果 | Boolean | `true` |
| emptyText | 空数据显示文本 | String | `暂无数据` |
| sortable | 是否启用排序功能 | Boolean | `false` |
| sortIconPosition | 排序图标位置，可选值为 `left` `right` | String | `right` |
| align | 单元格对齐方式，可选值为 `left` `center` `right` | String | `left` |
| maxHeight | 表格最大高度 | String | - |
| selectable | 是否启用行选择功能 | Boolean | `false` |
| rowKey | 行数据的唯一标识字段 | String | `id` |
| selectedRowKeys | 已选择的行key数组 | Array | `[]` |
| pagination | 分页配置对象 | Object | - |
| total | 数据总数，用于分页 | Number | `0` |
| showPagination | 是否显示分页 | Boolean | `true` |
| defaultColumnWidth | 默认列宽度 | String | `120px` |
| rowClickable | 行是否可点击 | Boolean | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| sort-change | 排序变化时触发 | `{ key, order }` |
| selection-change | 选择项变化时触发 | `selectedKeys, row` |
| row-click | 行点击时触发 | `row, index` |
| page-change | 页码变化时触发 | `page` |
| page-size-change | 每页条数变化时触发 | `pageSize` |

### Slots

| 名称 | 说明 |
| --- | --- |
| empty | 空数据时的自定义内容 |
| footer | 表格底部自定义内容 |
| pagination | 自定义分页区域内容 |
| column-[key] | 自定义列渲染，其中[key]为列的key值 |

### Column 属性

表格列配置对象支持以下属性：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列标题 | String | - |
| key | 列数据的字段名 | String | - |
| width | 列宽度 | String | - |
| align | 列对齐方式，可选值为 `left` `center` `right` | String | - |
| sortable | 该列是否可排序 | Boolean | `false` |

## 注意事项

1. 当使用自定义列渲染时，需要提供与列 key 值对应的插槽名，格式为 `column-[key]`。
2. 当表格数据较多时，建议设置 `maxHeight` 来控制表格高度，避免页面过长。
3. 使用分页功能时，可以通过监听 `page-change` 和 `page-size-change` 事件来加载不同页的数据。
4. 表格组件内部默认实现了本地排序功能，如需服务端排序，可以监听 `sort-change` 事件并自行处理。
5. 在小屏设备上，建议使用 `size="small"` 来减小表格占用空间。 