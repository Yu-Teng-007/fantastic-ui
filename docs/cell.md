# Cell 单元格

单元格组件用于展示列表信息，常用于个人信息、设置页面等场景。

## 基础用法

最基础的单元格用法，展示标题、内容和可选的图标。

```html
<fanc-cell title="单元格" value="内容" />
<fanc-cell title="单元格" value="内容" label="描述信息" />
<fanc-cell title="单元格" icon="home" value="内容" />
```

## 显示图标

通过 `icon` 属性在单元格左侧显示图标。

```html
<fanc-cell title="姓名" icon="user" value="张三" />
<fanc-cell title="电话" icon="phone" value="13800138000" />
<fanc-cell title="地址" icon="location" value="广州市天河区" />
```

## 展示箭头

通过 `is-link` 属性显示导航箭头，常用于可点击或可跳转的单元格。

```html
<fanc-cell title="单元格" is-link />
<fanc-cell title="单元格" value="内容" is-link />
<fanc-cell title="单元格" value="内容" is-link arrow-direction="down" />
```

## 分组用法

结合 `cell-group` 组件使用，可以将一组相关单元格放在一起。

```html
<fanc-cell-group title="基本信息">
    <fanc-cell title="姓名" value="张三" />
    <fanc-cell title="电话" value="13800138000" />
</fanc-cell-group>
<fanc-cell-group title="其他信息">
    <fanc-cell title="关于我们" is-link url="/pages/about/about" />
    <fanc-cell title="帮助中心" is-link />
</fanc-cell-group>
```

## 自定义内容

通过插槽可以自定义单元格的内容。

```html
<fanc-cell title="标题">
    <template #value>
        <view class="custom-value">自定义内容</view>
    </template>
</fanc-cell>

<fanc-cell>
    <template #title>
        <view class="custom-title">
            <text class="custom-title-text">自定义标题</text>
            <fanc-icon name="star" color="#f00" />
        </view>
    </template>
    <template #value>
        <fanc-button size="mini" type="primary">按钮</fanc-button>
    </template>
</fanc-cell>
```

## 垂直居中

通过 `center` 属性可以让单元格的内容垂直居中对齐。

```html
<fanc-cell title="单元格" value="内容" center /> <fanc-cell title="单元格" label="描述信息" value="内容" center />
```

## 可点击的单元格

设置 `is-link` 或 `clickable` 属性后，单元格会产生点击效果。

```html
<fanc-cell title="单元格" clickable @click="onClick" />
<fanc-cell title="单元格" is-link url="/pages/detail/detail" />
<fanc-cell title="单元格" is-link :to="{ path: '/pages/detail/detail', query: { id: 1 } }" />
```

## 自定义大小

通过 `size` 属性可以控制单元格的大小。

```html
<fanc-cell title="大号单元格" value="内容" size="large" />
<fanc-cell title="默认单元格" value="内容" />
<fanc-cell title="小号单元格" value="内容" size="small" />
```

## API

### Cell Props

| 参数            | 说明                                              | 类型             | 默认值    |
| --------------- | ------------------------------------------------- | ---------------- | --------- |
| title           | 标题                                              | String           | -         |
| value           | 右侧内容                                          | String           | -         |
| label           | 标题下方的描述                                    | String           | -         |
| icon            | 左侧图标名称或图片链接                            | String           | -         |
| size            | 单元格大小，可选值为 `large` `default` `small`    | String           | `default` |
| is-link         | 是否显示右侧箭头，并且可点击                      | Boolean          | `false`   |
| clickable       | 是否开启点击反馈                                  | Boolean          | `false`   |
| url             | 点击后跳转的链接地址                              | String           | -         |
| to              | 点击后跳转的目标路由对象，等同于 vue-router 的 to | String \| Object | -         |
| border          | 是否显示下边框                                    | Boolean          | `true`    |
| center          | 是否使内容垂直居中                                | Boolean          | `false`   |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` `right`     | String           | `right`   |
| required        | 是否显示表单必填星号                              | Boolean          | `false`   |
| title-style     | 标题样式                                          | String \| Object | -         |
| value-style     | 右侧内容样式                                      | String \| Object | -         |
| label-style     | 描述信息样式                                      | String \| Object | -         |

### Cell Events

| 事件名 | 说明             | 回调参数     |
| ------ | ---------------- | ------------ |
| click  | 点击单元格时触发 | event: Event |

### Cell Slots

| 名称       | 说明               |
| ---------- | ------------------ |
| default    | 自定义右侧内容     |
| title      | 自定义左侧标题     |
| label      | 自定义标题下方描述 |
| icon       | 自定义左侧图标     |
| right-icon | 自定义右侧图标     |

### CellGroup Props

| 参数   | 说明                   | 类型    | 默认值  |
| ------ | ---------------------- | ------- | ------- |
| title  | 分组标题               | String  | -       |
| border | 是否显示外边框         | Boolean | `true`  |
| inset  | 是否展示为圆角卡片风格 | Boolean | `false` |

### CellGroup Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 默认插槽，用于放置多个 Cell 组件 |
| title   | 自定义分组标题                   |

## 最佳实践

### 内容布局

-   标题应简洁明了，通常为名词或短语
-   内容应尽量简短，避免过长内容导致换行
-   使用 `label` 属性提供额外的描述信息

### 交互设计

-   用于导航的单元格应使用 `is-link` 属性显示箭头
-   对于复杂的自定义内容，可使用插槽灵活定制
-   相关的单元格应使用 `cell-group` 组件进行分组

### 应用场景

-   **个人信息展示**：展示用户基本信息，如姓名、电话等
-   **设置列表**：展示应用设置项，通常带有箭头表示可跳转
-   **选择列表**：用于展示可选项，如语言选择、主题选择等
-   **表单分组**：将相关的表单项进行分组展示
