# Form 表单

表单组件用于数据收集、校验和提交，与 `fanc-field` 输入框组件配合使用，提供数据验证和表单提交功能。

## 基础用法

表单组件由 `fanc-form` 和 `fanc-field` 组件组成，`fanc-field` 组件通过 `name` 属性与表单的数据和验证规则关联。

```html
<fanc-form :model="formData" :rules="formRules" ref="form">
    <fanc-field
        v-model="formData.username"
        label="用户名"
        name="username"
        required
        label-width="fixed"
        placeholder="请输入用户名"
    ></fanc-field>
    
    <fanc-field
        v-model="formData.password"
        label="密码"
        name="password"
        type="password"
        label-width="fixed"
        required
        placeholder="请输入密码"
    ></fanc-field>
    
    <view class="form-buttons">
        <fanc-button type="primary" @click="onSubmit">提交</fanc-button>
        <fanc-button style="margin-left: 10px" @click="onReset">重置</fanc-button>
    </view>
</fanc-form>
```

```javascript
export default {
    data() {
        return {
            formData: {
                username: "",
                password: "",
            },
            formRules: {
                username: [
                    { required: true, message: "请输入用户名" },
                    { min: 3, max: 20, message: "用户名长度在3-20个字符之间" }
                ],
                password: [
                    { required: true, message: "请输入密码" }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then(({ valid, invalidFields }) => {
                if (valid) {
                    console.log("提交表单：", this.formData);
                } else {
                    console.log("验证失败：", invalidFields);
                }
            });
        },
        onReset() {
            this.$refs.form.resetFields();
        },
    },
};
```

## 表单验证

通过 `rules` 属性设置表单验证规则，支持多种验证方式和自定义验证。

```html
<fanc-form :model="formData" :rules="formRules" ref="form">
    <fanc-field
        v-model="formData.email"
        label="邮箱"
        name="email"
        label-width="fixed"
        required
        placeholder="请输入邮箱"
    ></fanc-field>
    
    <fanc-field
        v-model="formData.phone"
        label="手机号"
        name="phone"
        label-width="fixed"
        type="number"
        required
        placeholder="请输入手机号"
    ></fanc-field>
    
    <view class="form-buttons">
        <fanc-button type="primary" @click="validateForm">提交</fanc-button>
        <fanc-button style="margin-left: 10px" @click="resetForm">重置</fanc-button>
    </view>
</fanc-form>
```

```javascript
export default {
    data() {
        return {
            formData: {
                email: "",
                phone: "",
            },
            formRules: {
                email: [
                    { required: true, message: "请输入邮箱" },
                    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: "请输入正确的邮箱格式" },
                ],
                phone: [
                    { required: true, message: "请输入手机号" },
                    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号格式" },
                ],
            },
        };
    },
    methods: {
        validateForm() {
            this.$refs.form.validate().then(({ valid, invalidFields }) => {
                if (valid) {
                    console.log("验证通过");
                } else {
                    console.log("验证失败", invalidFields);
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
    },
};
```

## 自定义验证规则

支持通过 `validator` 函数实现自定义验证规则。

```javascript
data() {
    // 自定义密码一致性验证
    const validatePassword = (rule, value, callback) => {
        if (value !== this.formData.password) {
            callback("两次输入的密码不一致");
        } else {
            callback();
        }
    };

    return {
        formData: {
            password: "",
            confirmPassword: "",
        },
        formRules: {
            password: [
                { required: true, message: "请输入密码" },
                { min: 6, message: "密码长度不能少于6个字符" },
            ],
            confirmPassword: [
                { required: true, message: "请再次输入密码" },
                { validator: validatePassword, message: "两次输入的密码不一致" },
            ],
        },
    };
}
```

## 表单布局

支持不同的标签位置和布局方式。

```html
<!-- 标签在左侧 (默认) -->
<fanc-form :model="formData">
    <fanc-field
        v-model="formData.username"
        label="用户名"
        name="username"
        label-width="fixed"
        placeholder="请输入用户名"
    ></fanc-field>
</fanc-form>

<!-- 标签在顶部 -->
<fanc-form :model="formData">
    <view class="field-with-top-label">
        <text class="field-top-label">姓名</text>
        <fanc-field
            v-model="formData.name"
            name="name"
            placeholder="请输入姓名"
            borderless
        ></fanc-field>
    </view>
</fanc-form>

<style>
.field-with-top-label {
    margin-bottom: 16px;
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 8px 12px;
}

.field-top-label {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
    margin-bottom: 4px;
    display: block;
}
</style>
```

## 禁用状态

可以设置整个表单禁用。

```html
<fanc-form :model="formData" :disabled="true">
    <fanc-field
        v-model="formData.username"
        label="用户名"
        name="username"
        disabled
    ></fanc-field>
    
    <fanc-field
        v-model="formData.email"
        label="邮箱"
        name="email"
        disabled
    ></fanc-field>
</fanc-form>
```

## 表单验证触发方式

通过 `validate-trigger` 属性设置表单验证的触发方式。

```html
<fanc-form :model="formData" :rules="formRules" validate-trigger="change">
    <fanc-field
        v-model="formData.value"
        label="输入内容"
        name="value"
        placeholder="请输入内容"
    ></fanc-field>
</fanc-form>
```

## 自动滚动到错误表单项

当表单校验失败时，可以自动滚动到第一个校验失败的表单项，默认开启。

```html
<fanc-form :model="formData" :rules="formRules" :scroll-to-error="true">
    <!-- 表单内容 -->
</fanc-form>
```

在长表单中，校验失败时会自动滚动到第一个错误的表单项，提高用户体验，特别是在移动端。可以通过设置 `scroll-to-error` 属性为 `false` 来禁用此功能。

## Form Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | Object | {} |
| rules | 表单验证规则 | Object | {} |
| disabled | 是否禁用所有表单项 | Boolean | false |
| validateTrigger | 表单校验触发的时机，可选值为 change/blur/submit | String | blur |
| scrollToError | 是否在提交表单且校验失败时滚动至错误的表单项 | Boolean | true |

## Form Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 表单提交时触发 | { valid, invalidFields, model, event } |
| validate | 表单校验完成时触发 | (isValid, invalidFields) |
| reset | 表单重置时触发 | - |

## Form Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 对整个表单进行校验，返回Promise | (fields: string \| string[]) 要校验的字段，不传则校验所有字段 |
| validateField | 对特定字段进行校验，返回Promise | (name: string) 要校验的字段名 |
| resetFields | 重置表单 | (fields: string \| string[]) 要重置的字段，不传则重置所有字段 |
| clearValidate | 清除验证状态 | (fields: string \| string[]) 要清除的字段，不传则清除所有字段 |
| submitForm | 提交表单，会先进行校验，然后触发submit事件 | (event: Event) 事件对象 |

### submitForm方法详解

`submitForm`方法是表单提交的便捷方式，它会先对表单进行校验，然后触发表单的`submit`事件。通常有以下使用场景：

1. 直接调用表单组件的submitForm方法
```js
// 在组件方法中
submitFormDirectly() {
    // 直接调用表单组件的submitForm方法
    this.$refs.form.submitForm();
}
```

2. 与原生表单submit事件配合使用
```html
<form @submit.prevent="handleFormSubmit">
    <fanc-form ref="form" :model="formData" :rules="formRules">
        <!-- 表单内容 -->
        <button type="submit">提交</button>
    </fanc-form>
</form>

<script>
export default {
    methods: {
        handleFormSubmit(event) {
            // 表单提交事件触发时，调用表单组件的submitForm方法
            this.$refs.form.submitForm(event);
        }
    }
}
</script>
```

3. 与validateTrigger="submit"配合使用
```html
<fanc-form ref="form" :model="formData" :rules="formRules" validate-trigger="submit">
    <!-- 表单内容 -->
    <fanc-button @click="$refs.form.submitForm()">提交</fanc-button>
</fanc-form>
```

当`validateTrigger`设置为`submit`时，表单只会在调用`submitForm`方法时进行验证，这对于复杂表单或需要批量验证的情况很有用。

提交表单后，会触发表单的`submit`事件，回调参数包含验证结果、错误字段信息和表单数据：

```js
// 监听表单提交事件
handleSubmit(result) {
    if (result.valid) {
        // 验证通过，可以进行提交操作
        console.log("表单数据:", result.model);
    } else {
        // 验证失败，显示错误信息
        console.log("验证失败字段:", result.invalidFields);
    }
}
```

## Field Props 与表单相关的属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 表单域名称，用于表单验证 | String | - |
| rules | 表单域验证规则 | Object/Array | [] |
| validateTrigger | 表单验证触发方式，可选值为 blur/change/submit | String | blur |
| error | 是否显示错误状态 | Boolean | false |
| errorMessage | 错误提示文案 | String | - |
| required | 是否必填 | Boolean | false |

## 表单验证规则

表单验证规则是一个对象，key 是表单域的 name，value 是验证规则数组：

```javascript
{
    username: [
        { required: true, message: "请输入用户名" },
        { min: 3, max: 20, message: "用户名长度在3-20个字符之间" }
    ]
}
```

支持的验证规则类型：

| 规则 | 说明 | 示例 |
| --- | --- | --- |
| required | 是否必填 | { required: true, message: "必填字段" } |
| min | 最小长度 | { min: 3, message: "至少3个字符" } |
| max | 最大长度 | { max: 20, message: "最多20个字符" } |
| len | 精确长度 | { len: 6, message: "必须是6个字符" } |
| pattern | 正则表达式 | { pattern: /^\d+$/, message: "必须是数字" } |
| validator | 自定义校验函数 | { validator: (rule, value, callback) => { /* 自定义逻辑 */ } } |
| type | 内置类型验证 | { type: "email", message: "请输入正确的邮箱" } |
| enum | 枚举值 | { enum: ["a", "b", "c"], message: "必须是a、b、c之一" } |

内置验证类型：

| 类型 | 说明 |
| --- | --- |
| email | 邮箱格式 |
| url | URL格式 |
| number | 数字 |
| integer | 整数 |
| mobile | 手机号 |
| idcard | 身份证号 | 