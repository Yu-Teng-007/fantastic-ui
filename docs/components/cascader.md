# 级联选择 Cascader

级联选择组件，用于从一组相关联的数据集合中进行选择，常用于省市区、分类选择等场景。

## 引入

```js
import { FancCascader } from 'fantastic-ui';
```

## 基础用法

通过 `v-model` 或 `show` 属性控制显示隐藏，通过 `options` 属性来定义选项数据，通过 `@finish` 事件来获取选择结果。当选择到最后一级选项（没有子选项的叶节点）时，会自动触发确认并关闭。

```html
<fanc-cascader
  v-model="showCascader"
  :options="options"
  @finish="onFinish">
</fanc-cascader>
```

```js
export default {
  data() {
    return {
      showCascader: false,
      options: [
        {
          text: '广东省',
          value: 'guangdong',
          children: [
            {
              text: '广州市',
              value: 'guangzhou',
              children: [
                { text: '天河区', value: 'tianhe' }
              ]
            },
            {
              text: '深圳市',
              value: 'shenzhen',
              children: [
                { text: '南山区', value: 'nanshan' }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    onFinish(result) {
      // result: { values: ['guangdong', 'shenzhen', 'nanshan'], texts: ['广东省', '深圳市', '南山区'] }
    }
  }
};
```

## 功能特点

- **多级联动选择**：支持任意层级的数据结构
- **内置弹窗**：采用内置Popup弹窗模式，使用更简便
- **自动关闭**：选择到最后一级选项（叶节点）时自动确认并关闭
- **自定义配置**：支持自定义标题、按钮文字和选中态颜色
- **默认值**：支持设置默认选中的选项
- **自定义头部**：支持隐藏默认头部，实现自定义头部样式

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示级联选择器，可以用v-model双向绑定 | _boolean_ | `false` |
| options | 可选项数据源 | _Array_ | `[]` |
| default-value | 默认选中项 | _Array_ | `[]` |
| show-header | 是否显示头部 | _boolean_ | `true` |
| title | 标题 | _string_ | `请选择` |
| confirm-text | 确认按钮文字 | _string_ | `确定` |
| cancel-text | 取消按钮文字 | _string_ | `取消` |
| active-color | 选中项的高亮颜色 | _string_ | 主题色 |
| reset-on-close | 关闭时是否重置选中值 | _boolean_ | `false` |
| overlay | 是否显示遮罩层 | _boolean_ | `true` |
| round | 是否显示圆角 | _boolean_ | `true` |
| closeable | 是否显示关闭图标 | _boolean_ | `true` |
| close-icon-position | 关闭图标位置 | _string_ | `top-right` |
| z-index | 弹出层层级 | _number \| string_ | `1000` |
| overlay-closable | 是否点击遮罩层关闭弹窗 | _boolean_ | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中项变化时触发 | 详见下表 |
| pathSelected | 选择完成一个完整路径时触发 | 详见下表 |
| finish | 选择完成时触发（选择叶节点或点击确认按钮） | 详见下表 |
| close | 关闭选择器时触发 | - |
| update:show | 更新show属性值的事件 | _boolean_ |

### 事件回调参数

`change` 事件的回调参数为包含以下属性的对象：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| value | 当前点击的选项的值 | _string \| number_ |
| tabIndex | 当前点击的选项所在层级的索引 | _number_ |
| values | 选中项的值数组 | _Array_ |
| texts | 选中项的文本数组 | _Array_ |

`pathSelected` 和 `finish` 事件的回调参数为包含以下属性的对象：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| values | 选中项的值数组 | _Array_ |
| texts | 选中项的文本数组 | _Array_ |
| options | 选中项的原始对象数组 | _Array_ |

### 方法

通过 ref 可以获取到 Cascader 实例并调用实例方法，详见下方示例：

```html
<fanc-cascader ref="cascaderRef" :options="options" />
```

```js
// 重置选择
this.$refs.cascaderRef.reset();
```

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| reset | 重置选择 | - | - |

## 选项数据结构

`options` 属性是一个由对象组成的数组，数组中的每个对象配置一个选项，对象格式如下：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文字 | _string_ |
| value | 选项对应的值，作为唯一标识符 | _string \| number_ |
| children | 子选项列表 | _Array_ |
| disabled | 是否禁用选项 | _boolean_ |

## 示例

### 打开选择器

通过ref获取组件实例，或者直接使用v-model控制显示隐藏。

```html
<!-- 方式一：使用v-model -->
<fanc-cascader
  v-model="showCascader"
  :options="options"
  @finish="onFinish">
</fanc-cascader>

<view @click="showCascader = true">打开选择器</view>

<!-- 方式二：使用show属性和update:show事件 -->
<fanc-cascader
  :show="showCascader"
  :options="options"
  @update:show="showCascader = $event"
  @finish="onFinish">
</fanc-cascader>

<view @click="showCascader = true">打开选择器</view>
```

### 自定义配置

可以设置多种属性来自定义级联选择器的行为。

```html
<fanc-cascader
  v-model="showCascader"
  :options="options"
  :default-value="defaultValue"
  title="选择配送地址"
  confirm-text="确定选择"
  cancel-text="取消选择"
  active-color="#ff5722"
  :round="true"
  :closeable="true"
  @finish="onFinish">
</fanc-cascader>
```

### 自定义头部

隐藏内置头部，实现自定义头部样式。注意：即使使用自定义头部，选择最后一级时仍会自动关闭。

```html
<fanc-cascader
  v-model="showCascader"
  :options="options"
  :show-header="false"
  @pathSelected="onPathSelected"
  @finish="onFinish">
</fanc-cascader>
``` 