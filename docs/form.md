# Fanc Form 表单组件

表单组件，用于数据录入、校验和提交，支持输入框、单选框、下拉选择、日期选择等类型的表单项。

## 基础用法

基础表单包含各种表单项，如输入框、下拉选择、单选框、复选框等。

```html
<fanc-form :model="formData" :rules="rules" label-width="80px" ref="form">
  <fanc-form-item label="用户名" prop="username">
    <fanc-field v-model="formData.username" placeholder="请输入用户名" />
  </fanc-form-item>
  
  <fanc-form-item label="密码" prop="password">
    <fanc-field v-model="formData.password" type="password" placeholder="请输入密码" />
  </fanc-form-item>
  
  <fanc-form-item label="手机号码" prop="phone">
    <fanc-field v-model="formData.phone" placeholder="请输入手机号码" />
  </fanc-form-item>
  
  <fanc-form-item label="邮箱" prop="email">
    <fanc-field v-model="formData.email" placeholder="请输入邮箱" />
  </fanc-form-item>
  
  <fanc-form-item>
    <view class="form-buttons">
      <fanc-button type="primary" @click="submitForm">提交</fanc-button>
      <fanc-button @click="resetForm" style="margin-left: 10px;">重置</fanc-button>
    </view>
  </fanc-form-item>
</fanc-form>
```

```javascript
export default {
  data() {
    // 自定义手机号码验证
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'));
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback();
      }
    };
    
    return {
      formData: {
        username: '',
        password: '',
        phone: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid, errors) => {
        if (valid) {
          uni.showToast({
            title: '表单验证通过',
            icon: 'success'
          });
          console.log('表单数据:', this.formData);
          // 提交表单
        } else {
          console.log('表单验证失败:', errors);
          const firstError = Object.values(errors)[0];
          uni.showToast({
            title: firstError,
            icon: 'none'
          });
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.form.reset();
    }
  }
};
```

## 表单验证

支持多种验证规则，包括必填、长度、正则、自定义验证等。

```html
<fanc-form 
  :model="formData" 
  :rules="rules" 
  label-width="100px"
  ref="form"
  validate-on-blur
>
  <!-- 必填验证 -->
  <view class="section">
    <view class="section-title">必填验证</view>
    <fanc-form-item label="用户名" prop="username" required>
      <fanc-field 
        v-model="formData.username" 
        placeholder="必填项" 
      />
    </fanc-form-item>
  </view>
  
  <!-- 长度验证 -->
  <view class="section">
    <view class="section-title">长度验证</view>
    <fanc-form-item label="密码" prop="password">
      <fanc-field 
        v-model="formData.password" 
        type="password" 
        placeholder="长度6-20位" 
      />
    </fanc-form-item>
  </view>
  
  <!-- 正则验证 -->
  <view class="section">
    <view class="section-title">正则验证</view>
    <fanc-form-item label="邮政编码" prop="zipcode">
      <fanc-field 
        v-model="formData.zipcode" 
        placeholder="6位数字邮编" 
      />
    </fanc-form-item>
  </view>
  
  <!-- 类型验证 -->
  <view class="section">
    <view class="section-title">类型验证</view>
    <fanc-form-item label="邮箱" prop="email">
      <fanc-field 
        v-model="formData.email" 
        placeholder="有效的邮箱地址" 
      />
    </fanc-form-item>
    
    <fanc-form-item label="年龄" prop="age">
      <fanc-field 
        v-model="formData.age" 
        placeholder="数字" 
      />
    </fanc-form-item>
  </view>
  
  <!-- 自定义验证 -->
  <view class="section">
    <view class="section-title">自定义验证</view>
    <fanc-form-item label="密码确认" prop="confirmPassword">
      <fanc-field 
        v-model="formData.confirmPassword" 
        type="password"
        placeholder="与密码相同" 
      />
    </fanc-form-item>
  </view>
  
  <!-- 提交验证 -->
  <view class="form-actions">
    <fanc-button type="primary" @click="submitForm">验证表单</fanc-button>
    <fanc-button @click="resetForm" style="margin-left: 10px;">重置表单</fanc-button>
  </view>
</fanc-form>
```

```javascript
export default {
  data() {
    // 确认密码验证
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    
    return {
      formData: {
        username: '',
        password: '',
        zipcode: '',
        email: '',
        age: '',
        confirmPassword: ''
      },
      rules: {
        // 必填验证
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        
        // 长度验证
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        
        // 正则验证
        zipcode: [
          { pattern: /^\d{6}$/, message: '邮政编码必须为6位数字', trigger: 'blur' }
        ],
        
        // 类型验证
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        age: [
          { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
          { type: 'number', min: 0, max: 120, message: '年龄必须在0-120之间', trigger: 'blur' }
        ],
        
        // 自定义验证
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    };
  }
};
```

## 表单布局

支持多种表单布局方式，包括左侧标签和顶部标签。

```html
<!-- 左侧标签布局 -->
<fanc-form 
  :model="formData" 
  label-position="left"
  label-width="80px"
>
  <fanc-form-item label="用户名" prop="username">
    <fanc-field v-model="formData.username" placeholder="请输入用户名" />
  </fanc-form-item>
  
  <fanc-form-item label="手机号码" prop="phone">
    <fanc-field v-model="formData.phone" placeholder="请输入手机号码" />
  </fanc-form-item>
</fanc-form>

<!-- 顶部标签布局 -->
<fanc-form 
  :model="formData" 
  label-position="top"
>
  <fanc-form-item label="用户名" prop="username">
    <fanc-field v-model="formData.username" placeholder="请输入用户名" />
  </fanc-form-item>
  
  <fanc-form-item label="手机号码" prop="phone">
    <fanc-field v-model="formData.phone" placeholder="请输入手机号码" />
  </fanc-form-item>
</fanc-form>
```

## 嵌套表单布局

支持复杂的嵌套表单布局。

```html
<fanc-form :model="formData">
  <view class="form-row">
    <view class="form-col">
      <fanc-form-item label="姓" prop="lastName" label-position="top">
        <fanc-field v-model="formData.lastName" placeholder="请输入姓" />
      </fanc-form-item>
    </view>
    <view class="form-col">
      <fanc-form-item label="名" prop="firstName" label-position="top">
        <fanc-field v-model="formData.firstName" placeholder="请输入名" />
      </fanc-form-item>
    </view>
  </view>
  
  <fanc-form-item label="地址" prop="address" label-position="top">
    <fanc-field 
      v-model="formData.address" 
      type="textarea" 
      placeholder="请输入地址"
    />
  </fanc-form-item>
</fanc-form>

<style>
.form-row {
  display: flex;
  margin: 0 -16rpx;
}

.form-col {
  flex: 1;
  padding: 0 16rpx;
}
</style>
```

## 高级表单示例

复杂的表单布局和组合使用。

```html
<fanc-form 
  :model="formData" 
  :rules="rules" 
  label-position="top"
  ref="form"
>
  <!-- 用户基本信息 -->
  <view class="form-section">
    <view class="form-section__title">基本信息</view>
    
    <view class="form-row">
      <view class="form-col">
        <fanc-form-item label="姓氏" prop="lastName">
          <fanc-field v-model="formData.lastName" placeholder="请输入姓氏" />
        </fanc-form-item>
      </view>
      <view class="form-col">
        <fanc-form-item label="名字" prop="firstName">
          <fanc-field v-model="formData.firstName" placeholder="请输入名字" />
        </fanc-form-item>
      </view>
    </view>
    
    <fanc-form-item label="性别" prop="gender">
      <view class="radio-group">
        <view class="radio-item" @click="formData.gender = 'male'">
          <view class="radio-button" :class="{'radio-button--active': formData.gender === 'male'}"></view>
          <text>男</text>
        </view>
        <view class="radio-item" @click="formData.gender = 'female'">
          <view class="radio-button" :class="{'radio-button--active': formData.gender === 'female'}"></view>
          <text>女</text>
        </view>
      </view>
    </fanc-form-item>
  </view>
  
  <!-- 联系方式 -->
  <view class="form-section">
    <view class="form-section__title">联系方式</view>
    
    <fanc-form-item label="手机号码" prop="phone">
      <fanc-field v-model="formData.phone" placeholder="请输入手机号码" />
    </fanc-form-item>
    
    <fanc-form-item label="邮箱" prop="email">
      <fanc-field v-model="formData.email" placeholder="请输入邮箱" />
    </fanc-form-item>
  </view>
  
  <!-- 日期选择 -->
  <view class="form-section">
    <view class="form-section__title">时间选择</view>
    
    <fanc-form-item label="日期范围">
      <view class="date-range">
        <view class="date-item">
          <fanc-field 
            v-model="formData.startDate" 
            placeholder="开始日期" 
            disabled 
            right-icon="calendar"
          />
        </view>
        <view class="date-separator">至</view>
        <view class="date-item">
          <fanc-field 
            v-model="formData.endDate" 
            placeholder="结束日期" 
            disabled
            right-icon="calendar"
          />
        </view>
      </view>
    </fanc-form-item>
  </view>
  
  <!-- 附加信息 -->
  <view class="form-section">
    <view class="form-section__title">附加信息</view>
    
    <fanc-form-item label="详细地址" prop="address">
      <fanc-field
        v-model="formData.address"
        type="textarea"
        placeholder="请输入详细地址"
        :autoHeight="true"
      />
    </fanc-form-item>
  </view>
  
  <!-- 提交按钮 -->
  <view class="form-actions">
    <fanc-button type="primary" block @click="submitForm">提交表单</fanc-button>
    <fanc-button block @click="resetForm" style="margin-top: 10px;">重置表单</fanc-button>
  </view>
</fanc-form>
```

## API

### Fanc Form Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| model | 表单数据对象 | Object | - |
| rules | 表单验证规则 | Object | - |
| label-width | 表单项标签宽度 | String | - |
| label-position | 表单项标签位置，可选值为 left、top | String | left |
| label-align | 表单项标签对齐方式，可选值为 left、center、right | String | left |
| disabled | 是否禁用所有表单项 | Boolean | false |
| show-required-mark | 是否显示必填星号 | Boolean | true |
| show-error-message | 是否显示校验错误信息 | Boolean | true |
| validate-on-blur | 是否在 blur 时触发验证 | Boolean | true |
| validate-on-change | 是否在输入时触发验证 | Boolean | false |

### Fanc Form Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| validate | 对整个表单进行校验 | callback(valid, errors) |
| validateField | 对单个表单字段进行校验 | (prop, callback) |
| reset | 重置表单 | - |
| clear | 清空表单 | - |

### Fanc Form Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| submit | 表单提交事件 | event |

### Fanc Form Item Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| prop | 表单域 model 字段 | String | - |
| label | 标签文本 | String | - |
| label-width | 标签宽度 | String | - |
| label-position | 表单项标签位置，可选值为 left、top | String | - |
| label-align | 标签对齐方式，可选值为 left、center、right | String | left |
| required | 是否必填，如不设置则根据校验规则自动生成 | Boolean | false |
| rules | 表单验证规则 | Object/Array | - |
| show-error | 是否显示错误信息 | Boolean | true |
| show-error-icon | 是否显示验证图标 | Boolean | true |

### Fanc Form Item Slots

| 名称 | 说明 |
|------|------|
| default | 表单项内容 |
| label | 自定义标签内容 |

## 表单验证规则

表单验证基于 async-validator，支持的验证规则包括：

- required: 必填项
- type: 类型验证（email、url、number等）
- min/max: 长度或数值范围
- pattern: 正则表达式
- validator: 自定义校验函数

```javascript
rules: {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  age: [
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
    { min: 18, max: 60, message: '年龄必须在18到60岁之间', trigger: 'blur' }
  ],
  mobile: [
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
  ],
  custom: [
    { validator: customFunction, trigger: 'blur' }
  ]
}
```

## 使用注意事项

1. 确保每个 fanc-form-item 组件都设置了 prop 属性，并且与 model 中的字段名相匹配。
2. 表单验证规则的 trigger 值包括 blur、change 和 submit，可以根据需要设置。
3. 使用 ref 获取表单实例，可以调用表单的方法如 validate、reset 等。
4. 表单组件需要与 fanc-field 组件配合使用，以获得最佳体验。
5. 复杂表单布局可以使用 flex 或 grid 布局系统实现。
6. 自定义验证函数应返回 Promise 或使用回调函数。