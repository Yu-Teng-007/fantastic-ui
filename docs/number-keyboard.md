# NumberKeyboard 数字键盘

数字键盘组件，常用于输入密码、验证码等纯数字场景。

## 基础用法

通过 `show` 属性控制键盘是否显示，使用 `input` 事件获取输入内容，`delete` 事件处理删除操作，`close` 事件处理关闭操作。

```html
<fanc-number-keyboard
  :show="showKeyboard"
  @input="onInput"
  @delete="onDelete"
  @close="showKeyboard = false"
/>
```

```js
export default {
  data() {
    return {
      showKeyboard: false,
      value: ''
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value || '') + key;
    },
    onDelete() {
      this.value = this.value.slice(0, -1);
    }
  }
};
```

## 自定义标题

可以通过 `title` 属性设置键盘标题，`close-button-text` 属性设置关闭按钮文本。

```html
<fanc-number-keyboard
  :show="showKeyboard"
  title="请输入支付密码"
  close-button-text="确定"
  @input="onInput"
  @delete="onDelete"
  @close="showKeyboard = false"
/>
```

## 随机数字键盘

通过 `random-key-order` 属性可以打乱数字键盘顺序，常用于安全输入场景。

```html
<fanc-number-keyboard
  :show="showKeyboard"
  title="安全键盘"
  :random-key-order="true"
  @input="onInput"
  @delete="onDelete"
  @close="showKeyboard = false"
/>
```

## 自定义额外键

通过 `extra-key` 属性可以设置左下角的额外键内容，当点击额外键时会触发 `function` 事件。

```html
<fanc-number-keyboard
  :show="showKeyboard"
  title="输入金额"
  extra-key="."
  @input="onInput"
  @delete="onDelete"
  @close="showKeyboard = false"
  @function="onFunctionKey"
/>
```

```js
methods: {
  onFunctionKey(key) {
    // 小数点只能输入一次
    if (key === '.' && !this.value.includes('.')) {
      this.value += key;
    }
  }
}
```

## 无标题栏键盘

通过 `show-header` 属性可以隐藏标题栏。

```html
<fanc-number-keyboard
  :show="showKeyboard"
  :show-header="false"
  @input="onInput"
  @delete="onDelete"
  @close="showKeyboard = false"
/>
```

## 带关闭图标的键盘

通过 `show-close-icon` 属性可以显示一个关闭图标，点击该图标可以关闭键盘。

```html
<fanc-number-keyboard
  :show="showKeyboard"
  title="带关闭图标的键盘"
  :show-close-icon="true"
  @input="onInput"
  @delete="onDelete"
  @close="showKeyboard = false"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| show | 是否显示键盘 | `Boolean` | `false` |
| title | 键盘标题 | `String` | `键盘标题` |
| z-index | 键盘层级 | `Number \| String` | `100` |
| round | 是否为圆角键盘 | `Boolean` | `true` |
| fixed | 是否固定在底部 | `Boolean` | `true` |
| close-button-text | 关闭按钮文字 | `String` | `完成` |
| show-delete-key | 是否显示删除键 | `Boolean` | `true` |
| hide-on-click-outside | 是否在点击外部时关闭键盘 | `Boolean` | `true` |
| random-key-order | 是否随机排序键盘按键 | `Boolean` | `false` |
| extra-key | 额外按键的内容 | `String` | `.` |
| show-header | 是否显示键盘头部 | `Boolean` | `true` |
| show-close-icon | 是否显示关闭图标 | `Boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| input | 点击按键时触发 | 按键文本 |
| delete | 点击删除键时触发 | - |
| close | 点击关闭按钮时触发 | - |
| blur | 键盘关闭时触发 | - |
| function | 点击功能键时触发 | 功能键文本 |

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
|------|------|------|
| --keyboard-bg-color | `#f2f3f5` | 键盘背景色 |
| --keyboard-header-bg-color | `#f7f8fa` | 键盘头部背景色 |
| --keyboard-border-color | `#ebedf0` | 键盘边框色 |
| --keyboard-title-color | `#323233` | 键盘标题文字颜色 |
| --keyboard-close-color | `var(--fanc-primary-color)` | 关闭按钮颜色 |
| --keyboard-key-bg-color | `#fff` | 按键背景色 |
| --keyboard-key-color | `#323233` | 按键文字颜色 |
| --keyboard-key-active-bg-color | `#e6e6e6` | 按键按下时背景色 |
| --keyboard-function-key-color | `var(--text-secondary)` | 功能键文字颜色 |
| --keyboard-delete-key-color | `var(--text-secondary)` | 删除键文字颜色 |
| --keyboard-transition-duration | `0.3s` | 过渡动画持续时间 |
| --keyboard-z-index | `100` | 键盘 z-index 层级 |
```