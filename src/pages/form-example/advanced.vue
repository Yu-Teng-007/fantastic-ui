<template>
  <view class="page">
    <view class="page__header">
      <view class="page__title">高级表单示例</view>
      <view class="page__desc">展示了复杂的表单布局和组合使用方式</view>
    </view>
    
    <view class="page__content">
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
                  @click="showStartDatePicker = true"
                />
              </view>
              <view class="date-separator">至</view>
              <view class="date-item">
                <fanc-field 
                  v-model="formData.endDate" 
                  placeholder="结束日期" 
                  disabled
                  right-icon="calendar"
                  @click="showEndDatePicker = true"
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
          
          <fanc-form-item label="备注" prop="remark">
            <fanc-field
              v-model="formData.remark"
              type="textarea"
              placeholder="请输入备注信息"
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
    </view>
    
    <!-- 日期选择器弹窗 -->
    <fanc-popup v-model="showStartDatePicker" position="bottom">
      <view class="date-picker">
        <view class="date-picker__header">
          <text @click="showStartDatePicker = false">取消</text>
          <text>选择开始日期</text>
          <text @click="confirmStartDate">确定</text>
        </view>
        <picker-view 
          indicator-style="height: 50px;" 
          style="width: 100%; height: 250px;"
          :value="startDateIndexes"
          @change="onStartDateChange"
        >
          <picker-view-column>
            <view class="picker-item" v-for="(year, index) in years" :key="'year-'+index">{{year}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="(month, index) in months" :key="'month-'+index">{{month}}月</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="(day, index) in days" :key="'day-'+index">{{day}}日</view>
          </picker-view-column>
        </picker-view>
      </view>
    </fanc-popup>
    
    <fanc-popup v-model="showEndDatePicker" position="bottom">
      <view class="date-picker">
        <view class="date-picker__header">
          <text @click="showEndDatePicker = false">取消</text>
          <text>选择结束日期</text>
          <text @click="confirmEndDate">确定</text>
        </view>
        <picker-view 
          indicator-style="height: 50px;" 
          style="width: 100%; height: 250px;"
          :value="endDateIndexes"
          @change="onEndDateChange"
        >
          <picker-view-column>
            <view class="picker-item" v-for="(year, index) in years" :key="'year-'+index">{{year}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="(month, index) in months" :key="'month-'+index">{{month}}月</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="(day, index) in days" :key="'day-'+index">{{day}}日</view>
          </picker-view-column>
        </picker-view>
      </view>
    </fanc-popup>
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
    
    // 生成年份数据
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 5 + i);
    
    // 生成月份数据
    const months = Array.from({length: 12}, (_, i) => i + 1);
    
    // 生成日期数据 (默认31天)
    const days = Array.from({length: 31}, (_, i) => i + 1);
    
    return {
      formData: {
        lastName: '',
        firstName: '',
        gender: 'male',
        phone: '',
        email: '',
        startDate: '',
        endDate: '',
        address: '',
        remark: ''
      },
      rules: {
        lastName: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      // 日期选择器相关
      showStartDatePicker: false,
      showEndDatePicker: false,
      years: years,
      months: months,
      days: days,
      startDateIndexes: [5, 0, 0], // 默认选中当前年份，1月1日
      endDateIndexes: [5, 0, 0],
      tempStartDate: {
        year: currentYear,
        month: 1,
        day: 1
      },
      tempEndDate: {
        year: currentYear,
        month: 1,
        day: 1
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
    
    // 开始日期变化
    onStartDateChange(e) {
      const values = e.detail.value;
      this.startDateIndexes = values;
      
      const year = this.years[values[0]];
      const month = this.months[values[1]];
      const day = this.days[values[2]];
      
      this.tempStartDate = { year, month, day };
    },
    
    // 结束日期变化
    onEndDateChange(e) {
      const values = e.detail.value;
      this.endDateIndexes = values;
      
      const year = this.years[values[0]];
      const month = this.months[values[1]];
      const day = this.days[values[2]];
      
      this.tempEndDate = { year, month, day };
    },
    
    // 确认开始日期
    confirmStartDate() {
      const { year, month, day } = this.tempStartDate;
      this.formData.startDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      this.showStartDatePicker = false;
    },
    
    // 确认结束日期
    confirmEndDate() {
      const { year, month, day } = this.tempEndDate;
      this.formData.endDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      this.showEndDatePicker = false;
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

.form-section {
  margin-bottom: 48rpx;
}

.form-section__title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 32rpx;
  position: relative;
  padding-left: 24rpx;
}

.form-section__title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8rpx;
  height: 32rpx;
  width: 8rpx;
  background-color: var(--fanc-primary-color);
  border-radius: 4rpx;
}

.form-row {
  display: flex;
  margin: 0 -16rpx;
}

.form-col {
  flex: 1;
  padding: 0 16rpx;
}

.radio-group {
  display: flex;
  margin-top: 16rpx;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
}

.radio-button {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 12rpx;
  position: relative;
}

.radio-button--active {
  border-color: var(--fanc-primary-color);
}

.radio-button--active::after {
  content: '';
  position: absolute;
  width: 20rpx;
  height: 20rpx;
  background-color: var(--fanc-primary-color);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.date-range {
  display: flex;
  align-items: center;
}

.date-item {
  flex: 1;
}

.date-separator {
  margin: 0 20rpx;
  color: #999;
}

.form-actions {
  margin-top: 64rpx;
}

.date-picker {
  background-color: #fff;
}

.date-picker__header {
  display: flex;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  border-bottom: 1px solid #eee;
}

.date-picker__header text:first-child {
  color: #999;
}

.date-picker__header text:last-child {
  color: var(--fanc-primary-color);
}

.picker-item {
  line-height: 100rpx;
  text-align: center;
}
</style> 