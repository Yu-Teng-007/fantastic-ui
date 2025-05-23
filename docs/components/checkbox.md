# 复选框 Checkbox

复选框组件，用于在一组备选项中进行多选。

## 基础用法

:::demo
```html
<fanc-checkbox v-model="checked" label="复选框"></fanc-checkbox>
<fanc-checkbox v-model="checked" label="方形复选框" shape="square"></fanc-checkbox>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>
```
:::

## 禁用状态

:::demo
```html
<fanc-checkbox v-model="checked1" label="禁用状态" disabled></fanc-checkbox>
<fanc-checkbox v-model="checked2" label="禁用选中状态" disabled></fanc-checkbox>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true
    }
  }
}
</script>
```
:::

## 自定义样式

可以通过 `checked-color` 属性设置选中状态的颜色，通过 `icon-size` 属性设置复选框尺寸。

:::demo
```html
<fanc-checkbox v-model="checked1" label="自定义颜色" checked-color="#ff6700"></fanc-checkbox>
<fanc-checkbox v-model="checked2" label="自定义大小" icon-size="large"></fanc-checkbox>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: true
    }
  }
}
</script>
```
:::

## 自定义图标

可以通过 `icon` 属性设置自定义图标，搭配 `checked-color` 属性实现更丰富的视觉效果。

:::demo
```html
<fanc-checkbox v-model="checked1" label="爱心图标" icon="heart" checked-color="#e91e63"></fanc-checkbox>
<fanc-checkbox v-model="checked2" label="星星图标" icon="star" checked-color="#ff9800"></fanc-checkbox>
<fanc-checkbox v-model="checked3" label="自定义方形" icon="check" shape="square" checked-color="#4caf50"></fanc-checkbox>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: true,
      checked3: true
    }
  }
}
</script>
```
:::

## 复选框组

复选框可以与复选框组一起使用，复选框组通过 `v-model` 数组类型的值管理当前选中的复选框。

:::demo
```html
<fanc-checkbox-group v-model="result">
  <fanc-checkbox name="1" label="选项一"></fanc-checkbox>
  <fanc-checkbox name="2" label="选项二"></fanc-checkbox>
  <fanc-checkbox name="3" label="选项三"></fanc-checkbox>
</fanc-checkbox-group>

<p>当前选中: {{ result.join(', ') }}</p>

<script>
export default {
  data() {
    return {
      result: ['1']
    }
  }
}
</script>
```
:::

## 垂直排列

设置 `direction` 属性为 `vertical` 可以使复选框垂直排列。

:::demo
```html
<fanc-checkbox-group v-model="result" direction="vertical">
  <fanc-checkbox name="A" label="选项A"></fanc-checkbox>
  <fanc-checkbox name="B" label="选项B"></fanc-checkbox>
  <fanc-checkbox name="C" label="选项C"></fanc-checkbox>
</fanc-checkbox-group>

<script>
export default {
  data() {
    return {
      result: ['A', 'B']
    }
  }
}
</script>
```
:::

## 限制最大选择数量

设置 `max` 属性可以限制复选框组的最大可选数量，超出限制后的复选框将被禁用。

:::demo
```html
<fanc-checkbox-group v-model="result" :max="2" @exceed-max="onExceedMax">
  <fanc-checkbox name="X" label="选项X"></fanc-checkbox>
  <fanc-checkbox name="Y" label="选项Y"></fanc-checkbox>
  <fanc-checkbox name="Z" label="选项Z"></fanc-checkbox>
</fanc-checkbox-group>

<script>
export default {
  data() {
    return {
      result: []
    }
  },
  methods: {
    onExceedMax(max) {
      this.$toast.show({
        type: 'text',
        message: `最多只能选择${max}项`,
        duration: 1500
      });
    }
  }
}
</script>
```
:::

## 自定义图标和颜色组合

搭配不同图标和颜色，可以创建语义化的复选框组合。

:::demo
```html
<fanc-checkbox-group v-model="result" direction="vertical">
  <fanc-checkbox name="success" label="成功" checked-color="#07c160" icon="check"></fanc-checkbox>
  <fanc-checkbox name="info" label="信息" checked-color="#1989fa" icon="info"></fanc-checkbox>
  <fanc-checkbox name="warning" label="警告" checked-color="#ff976a" icon="warning"></fanc-checkbox>
  <fanc-checkbox name="error" label="错误" checked-color="#ee0a24" icon="close"></fanc-checkbox>
</fanc-checkbox-group>

<script>
export default {
  data() {
    return {
      result: ['success', 'info']
    }
  }
}
</script>
```
:::

## 与单元格组件结合

将复选框与单元格组件结合，可以实现更丰富的交互效果。

:::demo
```html
<fanc-cell-group>
  <fanc-cell v-for="(item, index) in list" :key="index" @click="toggleItem(item)">
    <view slot="title">{{ item.label }}</view>
    <fanc-checkbox 
      slot="right-icon" 
      :value="item.checked" 
      @click.stop
      checked-color="#ff6700"
    ></fanc-checkbox>
  </fanc-cell>
</fanc-cell-group>

<script>
export default {
  data() {
    return {
      list: [
        { label: '选项一', checked: false },
        { label: '选项二', checked: true },
        { label: '选项三', checked: false }
      ]
    }
  },
  methods: {
    toggleItem(item) {
      item.checked = !item.checked;
    }
  }
}
</script>
```
:::

## API

### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| value | 是否选中，可以使用 v-model 双向绑定 | Boolean | `false` |
| shape | 复选框形状，可选值为 `square` `round` | String | `round` |
| label | 复选框标签文本 | String | - |
| disabled | 是否禁用状态 | Boolean | `false` |
| checked-color | 选中状态颜色 | String | - |
| icon | 自定义图标名称 | String | `check` |
| icon-size | 图标大小，可选值为 `small` `normal` `large` | String | `normal` |
| name | 标识符，在复选框组中使用 | String \| Number \| Boolean | - |

### Checkbox Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| input | 当绑定值变化时触发 | 选中状态（boolean） |
| change | 当选中状态变化时触发 | 选中状态（boolean） |

### Checkbox Slots

| 名称 | 说明 |
|------|------|
| default | 自定义标签文本内容 |

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| value | 当前选中的标识符数组，可以使用 v-model 双向绑定 | Array | `[]` |
| disabled | 是否禁用所有复选框 | Boolean | `false` |
| checked-color | 所有复选框选中状态颜色 | String | - |
| max | 最大可选数量，0表示不限制 | Number | `0` |
| shape | 所有复选框形状，可选值为 `square` `round` | String | `round` |
| direction | 排列方向，可选值为 `horizontal` `vertical` | String | `horizontal` |

### CheckboxGroup Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| input | 当绑定值变化时触发 | 当前选中项的标识符数组 |
| change | 当选中值变化时触发 | 当前选中项的标识符数组 |
| exceed-max | 当选择超出最大数量限制时触发 | 最大可选数量 |

### CheckboxGroup Methods

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| selectAll | 全选所有复选框 | - | - |
| unselectAll | 取消选中所有复选框 | - | - | 