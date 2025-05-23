# Field 输入框

输入框组件用于接收用户输入的信息，支持文本输入、数字输入、密码输入等多种类型，并提供了丰富的表单验证和交互功能。

## 基础用法

基础的输入框用法，提供左侧标签和输入区域。

```html
<fanc-field v-model="value" label="文本" placeholder="请输入文本"></fanc-field>
<fanc-field v-model="value" label="手机号" placeholder="请输入手机号"></fanc-field>
<fanc-field v-model="value" label="整数" placeholder="请输入整数"></fanc-field>
<fanc-field v-model="value" label="数字" placeholder="请输入数字（支持小数）" type="digit"></fanc-field>
<fanc-field v-model="value" label="密码" placeholder="请输入密码" type="password"></fanc-field>
```

## 左侧图标

通过 `leftIcon` 属性设置输入框左侧图标，图标会显示在标签前面。

```html
<fanc-field v-model="value" leftIcon="user" label="用户名" placeholder="请输入用户名"></fanc-field>
<fanc-field v-model="value" leftIcon="lock" label="密码" type="password" placeholder="请输入密码"></fanc-field>
<fanc-field v-model="value" leftIcon="mobile" label="手机号" placeholder="请输入手机号"></fanc-field>
<fanc-field v-model="value" leftIcon="map-marker-alt" label="地址" placeholder="请输入地址"></fanc-field>
```

## 自定义类型

输入框支持多种类型输入，可通过type属性控制。

```html
<fanc-field v-model="value" label="文本域" type="textarea" placeholder="请输入多行文本" autosize></fanc-field>
<fanc-field v-model="value" label="数字键盘" type="number" placeholder="请输入数字"></fanc-field>
<fanc-field v-model="value" label="身份证号" type="idcard" placeholder="请输入身份证号"></fanc-field>
```

## 禁用和只读

通过 `disabled` 和 `readonly` 属性控制输入框状态。

```html
<fanc-field v-model="value" label="禁用输入框" disabled placeholder="输入框已禁用"></fanc-field>
<fanc-field v-model="value" label="只读输入框" readonly placeholder="输入框为只读"></fanc-field>
```

## 显示图标

通过 `rightIcon` 属性设置输入框右侧图标，可用于自定义操作。

```html
<fanc-field
  v-model="value"
  label="搜索"
  rightIcon="times-circle"
  placeholder="请输入搜索关键词"
  @click-right-icon="clearSearch"
></fanc-field>
```

## 错误提示

通过 `errorMessage` 属性可以在输入框下方显示错误提示信息，错误提示文字为红色。

```html
<fanc-field
  v-model="value"
  label="用户名"
  placeholder="请输入用户名"
  errorMessage="请输入用户名"
></fanc-field>
<fanc-field
  v-model="value"
  label="手机号"
  placeholder="请输入手机号"
  errorMessage="手机号格式错误"
></fanc-field>
```

## 显示清除按钮

通过 `clearable` 属性在输入框有内容时显示清除按钮。

```html
<fanc-field v-model="value" label="用户名" clearable placeholder="请输入用户名"></fanc-field>
<fanc-field v-model="value" label="密码" type="password" clearable placeholder="请输入密码"></fanc-field>
```

## 字数统计

通过 `maxlength` 和 `showWordLimit` 属性显示字数统计。

```html
<fanc-field
  v-model="value"
  label="留言"
  type="textarea"
  maxlength="50"
  placeholder="请输入留言内容"
  showWordLimit
  autosize
></fanc-field>
```

## 垂直居中

通过 `center` 属性使输入框垂直居中对齐。

```html
<fanc-field v-model="value" center label="用户名" placeholder="请输入用户名"></fanc-field>
```

## 必填标识

通过 `required` 属性显示必填标识。

```html
<fanc-field v-model="value" required label="用户名" placeholder="请输入用户名"></fanc-field>
<fanc-field v-model="value" required label="密码" type="password" placeholder="请输入密码"></fanc-field>
```

## 自定义按钮

使用插槽可以自定义右侧内容，如添加按钮等。

```html
<fanc-field v-model="value" label="短信验证码" maxlength="6" placeholder="请输入验证码">
  <template #right-icon>
    <view class="sms-button" @click="sendSmsCode">
      {{ smsButtonText }}
    </view>
  </template>
</fanc-field>

<fanc-field v-model="value" label="搜索地点" leftIcon="map-marker-alt" placeholder="选择地址">
  <template #right-icon>
    <view class="location-button" @click="chooseLocation">
      <fanc-icon name="location-arrow" size="16" color="#007bff"></fanc-icon>
    </view>
  </template>
</fanc-field>
```

## API

### Props

| 参数             | 说明                                                       | 类型               | 默认值   |
| ---------------- | ---------------------------------------------------------- | ------------------ | -------- |
| type             | 输入框类型，可选值为 `text` `password` `textarea` `number` `digit` `idcard` | String | `text` |
| value            | 输入框的值                                                 | String \| Number   | `''`     |
| label            | 输入框左侧文本                                             | String             | `''`     |
| labelWidth       | 标签宽度，默认单位为px                                     | String             | `88px`   |
| required         | 是否显示表单必填星号                                       | Boolean            | `false`  |
| placeholder      | 输入框占位提示文字                                         | String             | `请输入` |
| placeholderStyle | 指定 placeholder 的样式                                    | String             | `''`     |
| leftIcon         | 输入框左侧图标名称或图片链接                               | String             | `''`     |
| rightIcon        | 输入框右侧图标名称或图片链接                               | String             | `''`     |
| clearable        | 是否启用清除图标，点击清除图标后会清空输入框               | Boolean            | `false`  |
| readonly         | 是否为只读状态                                             | Boolean            | `false`  |
| disabled         | 是否禁用输入框                                             | Boolean            | `false`  |
| border           | 是否显示下边框                                             | Boolean            | `true`   |
| maxlength        | 输入的最大字符数                                           | Number \| String   | `-1`     |
| autosize         | 是否自适应内容高度，仅在 textarea 模式下生效               | Boolean            | `false`  |
| error            | 是否将输入内容标红                                         | Boolean            | `false`  |
| errorMessage     | 底部错误提示文案                                           | String             | `''`     |
| showWordLimit    | 是否显示字数统计，需要设置maxlength属性                    | Boolean            | `false`  |
| confirmType      | 设置键盘右下角按钮的文字，可选值见uniapp文档               | String             | `done`   |
| confirmHold      | 点击键盘右下角按钮时是否保持键盘不收起                     | Boolean            | `false`  |
| clickable        | 是否开启点击反馈                                           | Boolean            | `false`  |
| center           | 是否使内容垂直居中                                         | Boolean            | `false`  |
| focus            | 获取焦点                                                   | Boolean            | `false`  |
| cursor           | 指定focus时的光标位置                                      | Number \| String   | `-1`     |
| adjustPosition   | 键盘弹起时，是否自动上推页面                               | Boolean            | `true`   |
| showConfirmBar   | 是否显示键盘上方带有"完成"按钮那一栏，仅在textarea有效     | Boolean            | `true`   |
| cursorSpacing    | 指定光标与键盘的距离，单位px                               | Number \| String   | `0`      |

### Events

| 事件名             | 说明                 | 回调参数                  |
| ------------------ | -------------------- | ------------------------- |
| input              | 输入框内容变化时触发 | value: 输入框的值         |
| change             | 输入框内容变化时触发 | value: 输入框的值         |
| focus              | 输入框获得焦点时触发 | event: Event              |
| blur               | 输入框失去焦点时触发 | event: Event              |
| clear              | 点击清除按钮时触发   | -                         |
| confirm            | 点击完成按钮时触发   | value: 输入框的值         |
| click-right-icon   | 点击右侧图标时触发   | -                         |
| click-icon         | 点击图标时触发       | position: 图标位置，可能为 `right` 或 `password` |
| keyboardheightchange | 键盘高度发生变化的时候触发 | event: Event  |

### Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| label      | 自定义输入框标签     |
| left-icon  | 自定义输入框头部图标 |
| right-icon | 自定义输入框尾部图标 |

## 常见问题

### 如何自定义输入框样式？

可以通过CSS变量来自定义输入框样式：

```css
:root {
  --field-bg-color: #ffffff;
  --field-label-color: #323233;
  --field-input-color: #323233;
  --field-placeholder-color: #c0c4cc;
  --field-error-color: #dc3545;
  --field-required-color: #dc3545;
  --field-icon-color: #969799;
  --field-clear-icon-color: #c0c4cc;
  --field-border-color: #ebedf0;
}
```

### 如何在表单验证中使用Field组件？

可以结合自定义验证规则使用Field组件：

```html
<template>
  <view>
    <fanc-field
      v-model="phone"
      label="手机号"
      :error="!isValidPhone && phone !== ''"
      errorMessage="请输入有效的手机号码"
      @blur="validatePhone"
    ></fanc-field>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: ''
    }
  },
  computed: {
    isValidPhone() {
      return /^1[3-9]\d{9}$/.test(this.phone)
    }
  },
  methods: {
    validatePhone() {
      if (this.phone && !this.isValidPhone) {
        uni.showToast({
          title: '请输入有效的手机号码',
          icon: 'none'
        })
      }
    }
  }
}
</script>
```

### 如何处理输入框中的敏感信息？

对于密码等敏感信息，建议使用password类型，并添加适当的安全措施：

1. 不在前端存储敏感信息的明文
2. 传输时进行加密
3. 限制输入长度和类型
4. 考虑添加验证码等二次验证机制

```html
<fanc-field
  v-model="password"
  type="password"
  label="密码"
  placeholder="请输入密码"
  maxlength="20"
></fanc-field>
```

## 最佳实践

### 表单布局

- 在移动端表单中，推荐使用上下布局（标签在输入框上方），这样可以提供更多的输入空间
- 在桌面端或空间足够的场景下，推荐使用左右布局（标签在输入框左侧）
- 对于较短的输入内容，可以使用紧凑布局；对于较长的内容，应提供宽敞的输入区域

### 错误处理

- 即时验证：在用户输入过程中即时验证并提供反馈
- 提交验证：在表单提交时进行全面验证
- 错误信息应当清晰具体，指导用户如何修正错误

### 交互优化

- 为必填字段添加星号标识
- 使用适当的键盘类型（如数字键盘、电话键盘）
- 提供自动完成和输入建议功能
- 限制输入长度，防止过长输入
- 对于特定格式的输入（如电话号码、信用卡号），可提供自动格式化功能

### 性能考虑

- 避免在输入过程中进行复杂的验证或计算，可使用防抖或节流处理
- 对于大型表单，考虑分步骤提交或使用虚拟列表优化渲染性能 