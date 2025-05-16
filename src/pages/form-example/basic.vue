<template>
  <view class="page">
    <view class="page__header">
      <view class="page__title">基础表单示例</view>
      <view class="page__desc">展示了表单的基本用法，包括验证和提交</view>
    </view>
    
    <view class="page__content">
      <fanc-form 
        :model="formData" 
        :rules="rules" 
        label-width="80px"
        ref="form"
      >
        <fanc-form-item label="用户名" prop="username">
          <fanc-field 
            v-model="formData.username" 
            placeholder="请输入用户名" 
            @blur="handleFieldBlur"
          />
        </fanc-form-item>
        
        <fanc-form-item label="密码" prop="password">
          <fanc-field 
            v-model="formData.password" 
            type="password" 
            placeholder="请输入密码" 
            @blur="handleFieldBlur"
          />
        </fanc-form-item>
        
        <fanc-form-item label="手机号码" prop="phone">
          <fanc-field 
            v-model="formData.phone" 
            placeholder="请输入手机号码" 
            @blur="handleFieldBlur"
          />
        </fanc-form-item>
        
        <fanc-form-item label="邮箱" prop="email">
          <fanc-field 
            v-model="formData.email" 
            placeholder="请输入邮箱" 
            @blur="handleFieldBlur"
          />
        </fanc-form-item>
        
        <fanc-form-item label="备注" prop="remark">
          <fanc-field 
            v-model="formData.remark" 
            type="textarea" 
            placeholder="请输入备注信息" 
          />
        </fanc-form-item>
        
        <fanc-form-item>
          <view class="form-buttons">
            <fanc-button type="primary" @click="submitForm">提交</fanc-button>
            <fanc-button @click="resetForm" style="margin-left: 10px;">重置</fanc-button>
          </view>
        </fanc-form-item>
      </fanc-form>
    </view>
  </view>
</template>

<script>
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
        email: '',
        remark: ''
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
    },
    
    // 字段失焦时触发表单项验证
    handleFieldBlur(field) {
      const formItem = this.$refs.form.formItems.find(item => 
        item.prop === Object.keys(this.formData).find(key => this.formData[key] === field.detail.value)
      );
      
      if (formItem) {
        formItem.onFieldBlur();
      }
    }
  }
};
</script>

<style>
.page {
  padding: 32rpx;
}

.page__header {
  margin-bottom: 40rpx;
}

.page__title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.page__desc {
  font-size: 28rpx;
  color: #666;
}

.page__content {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.form-buttons {
  display: flex;
  margin-top: 20rpx;
}
</style> 