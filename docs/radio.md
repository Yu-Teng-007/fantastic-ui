# Radio 单选框

在一组备选项中进行单选。

## 基础用法

通过 `v-model` 绑定选中选项的值。

```html
<fanc-radio v-model="checked" label="单选框"></fanc-radio>
```

```js
export default {
  data() {
    return {
      checked: true
    };
  }
};
```

## 禁用状态

通过 `disabled` 属性禁用单选框。

```html
<fanc-radio v-model="checked" disabled label="禁用状态"></fanc-radio>
```

## 自定义形状

通过 `shape` 属性设置单选框形状，支持 `round`、`square` 两种形状。

```html
<fanc-radio v-model="checked1" shape="round" label="圆形"></fanc-radio>
<fanc-radio v-model="checked2" shape="square" label="方形"></fanc-radio>
```

## 自定义选中样式

通过 `check-type` 属性设置单选框选中样式，支持 `dot`、`check` 两种样式。

```html
<fanc-radio v-model="checked1" label="默认圆点样式"></fanc-radio>
<fanc-radio v-model="checked2" check-type="check" label="对勾样式"></fanc-radio>
```

## 自定义大小

通过 `icon-size` 属性设置单选框大小，支持 `small`、`normal`、`large` 三种大小。

```html
<fanc-radio v-model="checked1" icon-size="small" label="小尺寸"></fanc-radio>
<fanc-radio v-model="checked2" label="正常尺寸"></fanc-radio>
<fanc-radio v-model="checked3" icon-size="large" label="大尺寸"></fanc-radio>
```

## 自定义颜色

通过 `checked-color` 属性设置选中状态的颜色。

```html
<fanc-radio v-model="checked1" checked-color="#f44336" label="红色"></fanc-radio>
<fanc-radio v-model="checked2" checked-color="#4caf50" label="绿色"></fanc-radio>
<fanc-radio v-model="checked3" checked-color="#2196f3" label="蓝色"></fanc-radio>
```

## 单选框组

需要与 `fanc-radio-group` 配合使用，选中值是通过 `name` 属性确定的。

```html
<fanc-radio-group v-model="radioValue">
  <fanc-radio name="1" label="选项1"></fanc-radio>
  <fanc-radio name="2" label="选项2"></fanc-radio>
  <fanc-radio name="3" label="选项3"></fanc-radio>
</fanc-radio-group>
```

```js
export default {
  data() {
    return {
      radioValue: '1'
    };
  }
};
```

## 单选框组形状

通过 `shape` 属性统一设置所有单选框形状。

```html
<fanc-radio-group v-model="radioValue" shape="square">
  <fanc-radio name="1" label="选项1"></fanc-radio>
  <fanc-radio name="2" label="选项2"></fanc-radio>
  <fanc-radio name="3" label="选项3"></fanc-radio>
</fanc-radio-group>
```

## 单选框组选中样式

通过 `check-type` 属性统一设置所有单选框的选中样式。

```html
<fanc-radio-group v-model="radioValue" check-type="check">
  <fanc-radio name="1" label="选项1"></fanc-radio>
  <fanc-radio name="2" label="选项2"></fanc-radio>
  <fanc-radio name="3" label="选项3"></fanc-radio>
</fanc-radio-group>
```

## 单选框组禁用

设置 `disabled` 属性可以禁用整个单选框组。

```html
<fanc-radio-group v-model="radioValue" disabled>
  <fanc-radio name="1" label="选项1"></fanc-radio>
  <fanc-radio name="2" label="选项2"></fanc-radio>
  <fanc-radio name="3" label="选项3"></fanc-radio>
</fanc-radio-group>
```

## 垂直排列

设置 `direction` 属性为 `vertical` 可以垂直排列单选框。

```html
<fanc-radio-group v-model="radioValue" direction="vertical">
  <fanc-radio name="1" label="选项1"></fanc-radio>
  <fanc-radio name="2" label="选项2"></fanc-radio>
  <fanc-radio name="3" label="选项3"></fanc-radio>
</fanc-radio-group>
```

## Radio Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| value | 是否选中 | *boolean* | `false` |
| name | 标识符，与单选框组配合使用 | *string \| number \| boolean* | - |
| disabled | 是否禁用单选框 | *boolean* | `false` |
| label | 单选框标签内容 | *string* | - |
| checked-color | 选中状态颜色 | *string* | - |
| icon-size | 图标大小，可选值为`small` `normal` `large` | *string* | `normal` |
| shape | 形状，可选值为`round` `square` | *string* | `round` |
| check-type | 选中样式类型，可选值为`dot` `check` | *string* | `dot` |

## Radio Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| input | 选中状态变化时触发 | *boolean* |
| change | 选中状态变化时触发 | *boolean* |

## Radio Slots

| 名称 | 说明 |
|------|------|
| default | 自定义文本内容 |

## RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| value | 选中标识符 | *string \| number \| boolean* | - |
| disabled | 是否禁用所有单选框 | *boolean* | `false` |
| checked-color | 所有单选框的选中状态颜色 | *string* | - |
| direction | 排列方向，可选值为`horizontal` `vertical` | *string* | `horizontal` |
| shape | 所有单选框的形状，可选值为`round` `square` | *string* | `round` |
| check-type | 所有单选框的选中样式类型，可选值为`dot` `check` | *string* | `dot` |

## RadioGroup Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| input | 选中值变化时触发 | *string \| number \| boolean* |
| change | 选中值变化时触发 | *string \| number \| boolean* | 