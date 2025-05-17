# FancCascader 级联选择器

级联选择器组件，用于在多层级数据中进行选择，例如地区选择、分类选择等场景。

## 基础用法

```html
<fanc-cascader
  v-model="selectedValue"
  :options="options"
  placeholder="请选择"
  title="请选择"
  @change="onChange"
></fanc-cascader>
```

## 选项数据格式

```js
[
  {
    text: '选项一', // 显示的文本
    value: 'option1', // 选项的值
    children: [ // 子选项
      {
        text: '子选项一',
        value: 'child1',
        children: [...] // 可以有更多层级
      }
    ]
  }
]
```

## 属性说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| options | 选项数据 | Array | [] |
| value | 当前选中值，可使用v-model双向绑定 | Array | [] |
| placeholder | 占位符文本 | String | '请选择' |
| title | 弹窗标题 | String | '请选择' |
| disabled | 是否禁用 | Boolean | false |
| closeable | 是否显示关闭按钮 | Boolean | true |
| closeOnClickOverlay | 是否点击遮罩关闭弹窗 | Boolean | true |
| activeColor | 选中项的颜色 | String | '' |
| immediateChange | 是否选择即改变(不需确认) | Boolean | false |

## 事件说明

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| change | 选择值改变时触发 | 选中值数组 |
| confirm | 点击确认按钮时触发 | {values: 选中值数组, options: 选中选项对象数组} |
| cancel | 点击取消按钮时触发 | - |
| open | 弹窗打开时触发 | - |
| close | 弹窗关闭时触发 | - |

## 示例

### 基础用法
```html
<fanc-cascader
  v-model="selectedArea"
  :options="areaOptions"
  placeholder="请选择地区"
  title="选择地区"
  @change="onChange"
></fanc-cascader>
```

### 选择即改变
```html
<fanc-cascader
  v-model="selectedCategory"
  :options="categoryOptions"
  placeholder="请选择分类"
  title="选择分类"
  :immediate-change="true"
  @change="onCategoryChange"
></fanc-cascader>
```

### 自定义颜色
```html
<fanc-cascader
  v-model="selectedFood"
  :options="foodOptions"
  placeholder="请选择食品"
  title="选择食品"
  active-color="#ff4400"
  @change="onFoodChange"
></fanc-cascader>
```

### 禁用状态
```html
<fanc-cascader
  v-model="selectedValue"
  :options="options"
  placeholder="禁用状态"
  :disabled="true"
></fanc-cascader>
``` 