# Form 表单

表单组件用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，需要与 fanc-field 输入框组件搭配使用。

## 基础用法

使用 `fanc-form` 和 `fanc-field` 组件创建表单，每个表单项通过 `name` 属性与表单数据对象的属性相关联。

```html
<fanc-form :model="form" :rules="rules" label-width="80px">
  <fanc-field 
    v-model="form.username" 
    name="username" 
    label="用户名" 
    placeholder="请输入用户名" 
    required
  ></fanc-field>
  <fanc-field 
    v-model="form.password" 
    name="password" 
    label="密码" 
    type="password" 
    placeholder="请输入密码" 
    required
  ></fanc-field>
  <view class="form-button-group">
    <fanc-button type="primary" size="medium" @click="submitForm">提交</fanc-button>
    <fanc-button size="medium" @click="resetForm">重置</fanc-button>
  </view>
</fanc-form>
```

```javascript
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate().then(result => {
        if (result.valid) {
          this.$toast.success('提交成功');
        } else {
          this.$toast.fail('表单校验失败');
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
```

## 表单验证

通过 `rules` 属性传入验证规则，使用 `validate` 方法进行表单验证。

```html
<fanc-form ref="validateForm" :model="form" :rules="rules" label-width="80px">
  <fanc-field 
    v-model="form.name" 
    name="name" 
    label="姓名" 
    placeholder="请输入姓名" 
    required
  ></fanc-field>
  <fanc-field 
    v-model="form.mobile" 
    name="mobile" 
    label="手机号" 
    placeholder="请输入手机号" 
    required
  ></fanc-field>
  <fanc-field 
    v-model="form.email" 
    name="email" 
    label="邮箱" 
    placeholder="请输入邮箱" 
    required
  ></fanc-field>
  <view class="form-button-group">
    <fanc-button type="primary" size="medium" @click="submitForm">提交</fanc-button>
    <fanc-button size="medium" @click="resetForm">重置</fanc-button>
  </view>
</fanc-form>
```

```javascript
export default {
  data() {
    return {
      form: {
        name: '',
        mobile: '',
        email: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' },
          { min: 2, max: 20, message: '长度在2到20个字符' },
        ],
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
        ],
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.validateForm.validate().then(result => {
        if (result.valid) {
          this.$toast.success('验证通过');
        } else {
          this.$toast.fail('验证失败');
        }
      });
    },
    resetForm() {
      this.$refs.validateForm.resetFields();
    },
  },
};
```

## 表单项类型

表单支持各种输入类型，包括单选框、复选框、步进器等。对于非输入框类型的表单项，可以使用自定义布局。

```html
<fanc-form :model="form" label-width="80px">
  <view class="form-item">
    <text class="form-item__label" style="width: 80px;">单选框</text>
    <view class="form-item__content">
      <fanc-radio-group v-model="form.gender">
        <fanc-radio name="male">男</fanc-radio>
        <fanc-radio name="female">女</fanc-radio>
      </fanc-radio-group>
    </view>
  </view>
  <view class="form-item">
    <text class="form-item__label" style="width: 80px;">复选框</text>
    <view class="form-item__content">
      <fanc-checkbox-group v-model="form.hobbies">
        <fanc-checkbox name="reading">阅读</fanc-checkbox>
        <fanc-checkbox name="sports">运动</fanc-checkbox>
        <fanc-checkbox name="music">音乐</fanc-checkbox>
      </fanc-checkbox-group>
    </view>
  </view>
  <view class="form-item">
    <text class="form-item__label" style="width: 80px;">步进器</text>
    <view class="form-item__content">
      <fanc-stepper v-model="form.count" :min="1" :max="10"></fanc-stepper>
    </view>
  </view>
  <view class="form-item">
    <text class="form-item__label" style="width: 80px;">开关</text>
    <view class="form-item__content">
      <switch :checked="form.agree" @change="onSwitchChange" color="#007bff" />
    </view>
  </view>
</fanc-form>
```

## 表单布局

支持不同的表单布局方式，包括标签在顶部和内联表单。

```html
<!-- 标签在顶部 -->
<fanc-form :model="form" label-position="top">
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    placeholder="请输入用户名"
  ></fanc-field>
  <fanc-field 
    v-model="form.password" 
    label="密码" 
    type="password" 
    placeholder="请输入密码"
  ></fanc-field>
</fanc-form>

<!-- 混合标签位置 -->
<fanc-form :model="form" label-width="80px">
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    placeholder="请输入用户名"
  ></fanc-field>
  <fanc-field 
    v-model="form.password" 
    label="密码" 
    type="password" 
    placeholder="请输入密码"
    label-position="top"
  ></fanc-field>
  <fanc-field 
    v-model="form.email" 
    label="邮箱" 
    placeholder="请输入邮箱"
  ></fanc-field>
</fanc-form>

<!-- 内联表单 -->
<fanc-form :model="form" inline>
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    label-width="60px" 
    placeholder="用户名"
  ></fanc-field>
  <fanc-field 
    v-model="form.password" 
    label="密码" 
    label-width="60px" 
    type="password" 
    placeholder="密码"
  ></fanc-field>
</fanc-form>
```

### 标签位置

表单组件支持两种标签位置：左侧对齐（默认）和顶部对齐。

- 通过 `fanc-form` 的 `label-position` 属性可以统一设置所有表单项的标签位置
- 通过 `fanc-field` 的 `label-position` 属性可以单独设置某个表单项的标签位置，优先级高于表单的设置

这样的灵活性允许在同一个表单中混合使用不同的标签位置，适应不同的表单项需求。例如，对于较长的输入内容或多行文本，使用顶部标签可能更合适；而对于简短的输入，左侧标签可能更紧凑。

## 禁用状态

通过 `disabled` 属性禁用整个表单。

```html
<fanc-form :model="form" disabled>
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    label-width="80px" 
    placeholder="请输入用户名"
  ></fanc-field>
  <fanc-field 
    v-model="form.mobile" 
    label="手机号" 
    label-width="80px" 
    placeholder="请输入手机号"
  ></fanc-field>
</fanc-form>
```

## 自定义尺寸

通过 `size` 属性设置表单项尺寸。

```html
<!-- 小尺寸 -->
<fanc-form :model="form" size="small">
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    label-width="60px" 
    placeholder="请输入用户名"
  ></fanc-field>
</fanc-form>

<!-- 默认尺寸 -->
<fanc-form :model="form">
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    label-width="80px" 
    placeholder="请输入用户名"
  ></fanc-field>
</fanc-form>

<!-- 大尺寸 -->
<fanc-form :model="form" size="large">
  <fanc-field 
    v-model="form.username" 
    label="用户名" 
    label-width="80px" 
    placeholder="请输入用户名"
  ></fanc-field>
</fanc-form>
```

## API

### Form Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| model | 表单数据对象 | `Object` | `{}` |
| rules | 表单验证规则 | `Object` | `{}` |
| validateOnChange | 是否在表单域的值发生变化时立即验证 | `Boolean` | `true` |
| validateTrigger | 验证触发方式，可选值为 `onChange`、`onBlur`、`onSubmit` | `String` | `onChange` |
| disabled | 是否禁用表单内的所有组件 | `Boolean` | `false` |
| scrollToError | 是否在提交表单且校验不通过时滚动至错误的表单项 | `Boolean` | `true` |
| showErrorMessage | 是否显示验证错误信息 | `Boolean` | `true` |
| labelWidth | 表单项标签宽度 | `String` | `88px` |
| labelPosition | 表单项标签的位置，可选值为 `left`、`top` | `String` | `left` |
| size | 表单项尺寸，可选值为 `small`、`default`、`large` | `String` | `default` |
| inline | 是否为内联表单 | `Boolean` | `false` |
| border | 是否有边框 | `Boolean` | `true` |
| padding | 表单内边距 | `String` | `12px` |

### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| validate | 验证表单 | `fieldNames?: string[]` 需要验证的表单项名称数组，不传则验证所有表单项 | `Promise<{ valid: boolean, fields: object }>` |
| resetFields | 重置表单项的值和验证状态 | `fieldNames?: string[]` 需要重置的表单项名称数组，不传则重置所有表单项 | - |
| clearValidate | 清除表单项的验证状态 | `fieldNames?: string[]` 需要清除验证状态的表单项名称数组，不传则清除所有表单项 | - |
| submit | 提交表单 | - | - |

### Form Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| submit | 提交表单且验证通过后触发 | `model: object` 表单数据对象 |
| validate-error | 表单验证不通过时触发 | `fields: object` 验证失败的表单项错误信息 |

### Field Form Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| name | 表单项名称，与表单 model 对应的属性名 | `String` | `''` |
| label | 表单项标签 | `String` | `''` |
| labelWidth | 表单项标签宽度，会覆盖 Form 组件的 labelWidth | `String` | `''` |
| labelPosition | 表单项标签位置，可选值为 `left`、`top`，会覆盖 Form 组件的 labelPosition | `String` | `'left'` |
| required | 是否必填 | `Boolean` | `false` |
| rules | 表单项规则，会与 Form 组件的 rules[name] 合并 | `Object \| Array` | `[]` |

## 自定义表单项

对于非输入框类型的表单项，可以使用以下样式创建自定义表单项：

```html
<view class="form-item">
  <text class="form-item__label" style="width: 80px;">单选框</text>
  <view class="form-item__content">
    <!-- 自定义表单控件 -->
  </view>
</view>
```

```css
.form-item {
  position: relative;
  display: flex;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 24px;
}

.form-item__label {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  margin-right: 12px;
}

.form-item__content {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}
```

## 常用验证规则

表单组件内置了常用的验证规则，可以通过 `$validator` 全局方法获取。

| 规则名 | 说明 | 使用示例 |
|------|------|------|
| required | 必填规则 | `{ required: true, message: '此项不能为空' }` |
| mobile | 手机号码验证规则 | `{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }` |
| email | 邮箱验证规则 | `{ type: 'email', message: '请输入正确的邮箱地址' }` |
| url | URL验证规则 | `{ type: 'url', message: '请输入正确的URL地址' }` |
| idcard | 身份证号码验证规则 | `{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码' }` |
| number | 数字验证规则 | `{ type: 'number', message: '请输入数字' }` |
| integer | 整数验证规则 | `{ pattern: /^-?\d+$/, message: '请输入整数' }` |
| positiveInteger | 正整数验证规则 | `{ pattern: /^[1-9]\d*$/, message: '请输入正整数' }` |
| price | 金额验证规则（两位小数） | `{ pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正确的金额（最多两位小数）' }` | 