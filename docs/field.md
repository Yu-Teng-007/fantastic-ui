# Field 输入框

Field 输入框组件是一个表单项组件，支持文本输入、数字输入、密码输入、文本域等多种输入类型，并提供了丰富的配置项和事件。

## 基本用法

```html
<fanc-field 
  v-model="value" 
  label="用户名" 
  placeholder="请输入用户名"
></fanc-field>
```

## 输入框类型

支持多种输入类型，包括普通文本、密码、数字、身份证、手机号和文本域等。

```html
<!-- 文本输入框 -->
<fanc-field v-model="text" label="文本" placeholder="请输入文本"></fanc-field>

<!-- 密码输入框 -->
<fanc-field v-model="password" type="password" label="密码" placeholder="请输入密码"></fanc-field>

<!-- 数字输入框 -->
<fanc-field v-model="number" type="number" label="数字" placeholder="请输入数字"></fanc-field>

<!-- 身份证输入框 -->
<fanc-field v-model="idcard" type="idcard" label="身份证" placeholder="请输入身份证号码"></fanc-field>

<!-- 手机号输入框 -->
<fanc-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号"></fanc-field>

<!-- 文本域 -->
<fanc-field v-model="message" type="textarea" label="留言" placeholder="请输入留言"></fanc-field>
```

## 禁用和只读

通过设置 `disabled` 或 `readonly` 属性来禁用输入框或设为只读状态。

```html
<!-- 禁用状态 -->
<fanc-field v-model="value" label="禁用" disabled></fanc-field>

<!-- 只读状态 -->
<fanc-field v-model="value" label="只读" readonly></fanc-field>
```

## 必填项和错误提示

可以通过设置 `required` 显示必填星号，通过 `error` 和 `error-message` 显示错误状态和错误信息。

```html
<!-- 必填项 -->
<fanc-field v-model="value" label="用户名" required></fanc-field>

<!-- 错误提示 -->
<fanc-field
  v-model="value"
  label="邮箱"
  placeholder="请输入邮箱"
  error
  error-message="邮箱格式不正确"
></fanc-field>
```

## 图标和清除按钮

可以在输入框内添加图标，还可以启用清除按钮。

```html
<!-- 左侧图标 -->
<fanc-field v-model="value" label="用户名" left-icon="user"></fanc-field>

<!-- 右侧图标 -->
<fanc-field v-model="value" label="搜索" right-icon="search"></fanc-field>

<!-- 清除按钮 -->
<fanc-field v-model="value" label="输入内容" clearable></fanc-field>
```

## 字数统计

对于有字数限制的输入场景，可以启用字数统计功能。

```html
<fanc-field
  v-model="value"
  label="留言"
  type="textarea"
  placeholder="请输入留言"
  maxlength="50"
  show-word-limit
></fanc-field>
```

## 自动高度

对于文本域类型，可以设置 `auto-height` 属性使文本域高度自动适应内容。

```html
<fanc-field
  v-model="value"
  label="留言"
  type="textarea"
  placeholder="请输入留言"
  auto-height
></fanc-field>
```

## 输入对齐方式

可以通过 `input-align` 属性设置输入框内容的对齐方式。

```html
<!-- 居左对齐 -->
<fanc-field v-model="value" label="居左" input-align="left"></fanc-field>

<!-- 居中对齐 -->
<fanc-field v-model="value" label="居中" input-align="center"></fanc-field>

<!-- 居右对齐 -->
<fanc-field v-model="value" label="居右" input-align="right"></fanc-field>
```

## 插槽用法

Field 组件提供了多个插槽，可以自定义左侧标签、图标和输入框前后内容。

```html
<fanc-field v-model="value" placeholder="请输入用户名">
  <!-- 自定义标签 -->
  <template #label>
    <text style="color: red;">用户名</text>
  </template>
  
  <!-- 自定义左侧图标 -->
  <template #left-icon>
    <fanc-icon name="user" size="20" color="#1989fa"></fanc-icon>
  </template>
  
  <!-- 输入框前内容 -->
  <template #input-prefix>
    <text>¥</text>
  </template>
  
  <!-- 输入框后内容 -->
  <template #input-suffix>
    <text>元</text>
  </template>
  
  <!-- 自定义右侧图标 -->
  <template #right-icon>
    <fanc-icon name="eye" size="20" @click="togglePasswordVisibility"></fanc-icon>
  </template>
</fanc-field>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入框的当前值 | String / Number | - |
| type | 输入框类型，可选值为：text、textarea、password、number、digit、idcard、tel | String | text |
| label | 输入框标签 | String | - |
| placeholder | 输入框占位文本 | String | 请输入 |
| label-width | 标签宽度，可选值为 auto / fixed | String | - |
| disabled | 是否禁用输入框 | Boolean | false |
| readonly | 是否只读 | Boolean | false |
| required | 是否显示表单必填星号 | Boolean | false |
| clearable | 是否启用清除图标 | Boolean | false |
| password | 是否密码类型 | Boolean | false |
| maxlength | 输入的最大字符数 | String / Number | -1 |
| show-word-limit | 是否显示字数统计 | Boolean | false |
| left-icon | 左侧图标名称 | String | - |
| right-icon | 右侧图标名称 | String | - |
| error | 是否显示内容为错误状态 | Boolean | false |
| error-message | 错误提示文案 | String | - |
| center | 是否垂直居中 | Boolean | false |
| borderless | 是否隐藏底部边框 | Boolean | false |
| is-link | 是否是链接 | Boolean | false |
| focus | 自动获取焦点 | Boolean | false |
| input-align | 输入框内容对齐方式，可选值为 left、center、right | String | left |
| cursor-spacing | 光标与键盘的距离 | Number | 0 |
| confirm-type | 设置键盘右下角按钮的文字，可选值为 send、search、next、go、done | String | done |
| placeholder-style | 指定 placeholder 的样式 | String | - |
| placeholder-class | 指定 placeholder 的类名 | String | - |
| adjust-position | 键盘弹起时，是否自动上推页面 | Boolean | true |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起 | Boolean | false |
| hold-keyboard | focus时，点击页面的时候不收起键盘 | Boolean | false |
| selection-start | 光标起始位置 | Number | -1 |
| selection-end | 光标结束位置 | Number | -1 |
| show-confirm-bar | 是否显示键盘上方带有"完成"按钮那一栏 | Boolean | true |
| auto-height | 是否自动增高（仅文本域有效） | Boolean | false |
| fixed | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | Boolean | false |
| cursor | 指定focus时的光标位置 | Number | -1 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入框内容变化时触发 | value: 输入框的当前值 |
| change | 输入框内容变化时触发 | value: 输入框的当前值 |
| focus | 输入框获得焦点时触发 | event: 事件对象 |
| blur | 输入框失去焦点时触发 | event: 事件对象 |
| confirm | 点击键盘右下角按钮时触发 | value: 输入框的当前值 |
| clear | 点击清除图标时触发 | - |
| keyboardheightchange | 键盘高度变化时触发 | event: 事件对象，event.detail = { height: 键盘高度, duration: 动画持续时间 } |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容插槽 |
| label | 自定义标签插槽 |
| left-icon | 自定义左侧图标插槽 |
| right-icon | 自定义右侧图标插槽 |
| input-prefix | 输入框前内容插槽 |
| input-suffix | 输入框后内容插槽 |

## 常见问题

### 如何处理表单验证？

Field 组件本身不包含表单验证功能，但可以结合第三方表单验证库或自定义验证逻辑来实现表单验证。当验证失败时，可以通过设置 `error` 和 `error-message` 属性来显示错误状态和错误信息。

### 如何自定义输入框样式？

可以通过 CSS 变量来自定义输入框样式，Field 组件使用了以下 CSS 变量：

```css
:root {
  --field-bg-color: #fff;
  --field-label-color: #333;
  --field-input-color: #333;
  --field-placeholder-color: #c0c4cc;
  --field-error-color: #dc3545;
  --field-disabled-opacity: 0.6;
  --field-required-color: #dc3545;
  --field-icon-color: #6c757d;
  --field-clear-icon-color: #c0c4cc;
  --field-clear-icon-active-color: #6c757d;
  --field-right-icon-color: #6c757d;
  --field-error-message-color: #dc3545;
  --field-word-limit-color: #6c757d;
  --field-border-color: #dee2e6;
}
```

可以在项目中覆盖这些变量来自定义 Field 组件的样式。 