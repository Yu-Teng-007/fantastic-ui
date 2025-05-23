# CellGroup 单元格组

单元格组组件用于将一组相关的单元格组织在一起，提供统一的外观和样式。

## 基础用法

最基础的用法，将多个单元格放在一个分组中。

```html
<fanc-cell-group>
    <fanc-cell title="单元格" value="内容" />
    <fanc-cell title="单元格" value="内容" />
</fanc-cell-group>
```

## 分组标题

通过 `title` 属性可以设置分组标题。

```html
<fanc-cell-group title="基本信息">
    <fanc-cell title="姓名" value="张三" />
    <fanc-cell title="电话" value="13800138000" />
</fanc-cell-group>
```

## 卡片风格

通过 `inset` 属性可以将单元格组显示为带圆角的卡片风格，常用于信息分组展示。

```html
<fanc-cell-group title="卡片风格" inset>
    <fanc-cell title="单元格" value="内容" />
    <fanc-cell title="单元格" value="内容" />
</fanc-cell-group>
```

## 无边框

设置 `border` 属性为 `false` 可以隐藏外边框。

```html
<fanc-cell-group title="无边框" :border="false">
    <fanc-cell title="单元格" value="内容" />
    <fanc-cell title="单元格" value="内容" />
</fanc-cell-group>
```

## 自定义标题

通过插槽可以自定义分组标题的内容。

```html
<fanc-cell-group>
    <template #title>
        <view class="custom-title">
            <fanc-icon name="info-circle" />
            <text>自定义标题</text>
        </view>
    </template>
    <fanc-cell title="单元格" value="内容" />
    <fanc-cell title="单元格" value="内容" />
</fanc-cell-group>
```

## API

### Props

| 参数   | 说明                   | 类型    | 默认值  |
| ------ | ---------------------- | ------- | ------- |
| title  | 分组标题               | String  | -       |
| border | 是否显示外边框         | Boolean | `true`  |
| inset  | 是否展示为圆角卡片风格 | Boolean | `false` |

### Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 默认插槽，用于放置多个 Cell 组件 |
| title   | 自定义分组标题                   |

## 最佳实践

### 分组原则

- 将功能相似或内容相关的单元格放在同一个分组中
- 使用合适的标题描述分组内容
- 不同分组之间应保持一定的间距，提高可读性

### 风格选择

- 对于页面主体内容，建议使用默认的直角风格
- 对于浮动卡片或特殊信息展示，可考虑使用圆角卡片风格

### 应用场景

- **用户信息展示**：将用户的基本信息、联系方式等分组展示
- **设置分类**：将不同类别的设置项分组，如"账号安全"、"通知设置"等
- **表单分段**：将长表单分成多个逻辑部分，提高填写体验 