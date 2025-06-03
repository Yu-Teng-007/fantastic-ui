# Collapse 折叠面板

可折叠/展开的内容区域，用于分组显示大量内容。

## 基础用法

通过 `v-model` 控制展开的面板列表，`name` 属性唯一标识面板，非手风琴模式下可展开多个面板。

```html
<fanc-collapse v-model="activeNames">
  <fanc-collapse-item title="标题1" name="1">
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题2" name="2">
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题3" name="3">
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
</fanc-collapse>
```

```js
export default {
  data() {
    return {
      activeNames: ['1']
    };
  }
};
```

## 手风琴模式

通过 `accordion` 属性开启手风琴模式，每次只能展开一个面板。

```html
<fanc-collapse v-model="activeName" accordion>
  <fanc-collapse-item title="标题1" name="1">
    手风琴模式下，每次只能展开一个面板。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题2" name="2">
    手风琴模式下，每次只能展开一个面板。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题3" name="3">
    手风琴模式下，每次只能展开一个面板。
  </fanc-collapse-item>
</fanc-collapse>
```

```js
export default {
  data() {
    return {
      activeName: '1'
    };
  }
};
```

## 禁用状态

通过 `disabled` 属性禁用特定面板。

```html
<fanc-collapse v-model="activeNames">
  <fanc-collapse-item title="标题1" name="1">
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题2" name="2" disabled>
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题3" name="3">
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
</fanc-collapse>
```

## 自定义标题内容

通过 `title` 插槽可以自定义标题内容，通过 `value` 属性设置右侧内容。

```html
<fanc-collapse v-model="activeNames">
  <fanc-collapse-item name="1">
    <template #title>
      <view class="custom-title">
        <fanc-icon name="star" color="#007bff" size="16"></fanc-icon>
        <text style="margin-left: 8px;">自定义标题</text>
      </view>
    </template>
    这是一段自定义标题的内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="标题2" name="2" value="内容提示">
    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
  </fanc-collapse-item>
</fanc-collapse>
```

## 带图标的折叠面板

通过 `left-icon` 属性设置左侧图标。

```html
<fanc-collapse v-model="activeNames">
  <fanc-collapse-item title="个人信息" name="1" left-icon="user">
    这里是个人信息的相关内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="安全设置" name="2" left-icon="shield-alt">
    这里是安全设置的相关内容。
  </fanc-collapse-item>
  <fanc-collapse-item title="支付管理" name="3" left-icon="credit-card">
    这里是支付管理的相关内容。
  </fanc-collapse-item>
</fanc-collapse>
```

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前展开面板的 name | 手风琴模式：string \| number<br>非手风琴模式：(string \| number)[] | - |
| accordion | 是否开启手风琴模式 | boolean | false |
| border | 是否显示外边框 | boolean | true |

### Collapse Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换面板时触发 | 类型与 v-model 绑定的值一致 |

### CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识符，默认为索引值 | string \| number | 索引值 |
| title | 标题栏左侧内容 | string | - |
| value | 标题栏右侧内容 | string | - |
| disabled | 是否禁用面板 | boolean | false |
| left-icon | 标题栏左侧图标名称或图片链接 | string | - |
| left-icon-size | 左侧图标大小，默认单位为 px | string \| number | 16 |
| left-icon-color | 左侧图标颜色 | string | #323233 |

### CollapseItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 面板内容 |
| title | 自定义标题内容 |
| value | 自定义右侧内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --collapse-bg-color | var(--bg-white) | 折叠面板背景色 |
| --collapse-title-color | var(--text-primary) | 标题文字颜色 |
| --collapse-title-disabled-color | var(--text-disabled) | 禁用状态下标题文字颜色 |
| --collapse-content-color | var(--text-secondary) | 内容文字颜色 |
| --collapse-value-color | var(--text-secondary) | 右侧内容文字颜色 |
| --collapse-border-color | var(--border-color) | 边框颜色 |
| --collapse-icon-color | var(--gray-600) | 图标颜色 |
| --collapse-header-bg-color | var(--bg-white) | 标题栏背景色 |
| --collapse-content-bg-color | var(--bg-white) | 内容区域背景色 |
| --collapse-transition-duration | 0.3s | 动画时长 |
| --collapse-header-padding | 12px 16px | 标题栏内边距 |
| --collapse-content-padding | 12px 16px | 内容区域内边距 |
| --collapse-header-font-size | 14px | 标题栏字体大小 |
| --collapse-content-font-size | 14px | 内容区域字体大小 |
| --collapse-header-line-height | 24px | 标题栏行高 |
| --collapse-content-line-height | 1.5 | 内容区域行高 |
| --collapse-header-font-weight | 500 | 标题栏字体粗细 |
| --collapse-disabled-opacity | 0.6 | 禁用状态下的透明度 | 