<template>
    <view class="page">
        <view class="page__header">
            <view class="page__title">表单验证示例</view>
            <view class="page__desc">展示了表单验证功能，包括必填、正则、自定义验证等</view>
        </view>

        <view class="page__content">
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
                            @blur="handleFieldBlur"
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
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>

                    <fanc-form-item label="昵称" prop="nickname">
                        <fanc-field
                            v-model="formData.nickname"
                            placeholder="长度2-10位"
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>
                </view>

                <!-- 正则验证 -->
                <view class="section">
                    <view class="section-title">正则验证</view>
                    <fanc-form-item label="手机号码" prop="phone">
                        <fanc-field
                            v-model="formData.phone"
                            placeholder="11位手机号"
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>

                    <fanc-form-item label="邮政编码" prop="zipcode">
                        <fanc-field
                            v-model="formData.zipcode"
                            placeholder="6位数字邮编"
                            @blur="handleFieldBlur"
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
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>

                    <fanc-form-item label="网址" prop="url">
                        <fanc-field
                            v-model="formData.url"
                            placeholder="有效的网址"
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>

                    <fanc-form-item label="年龄" prop="age">
                        <fanc-field
                            v-model="formData.age"
                            placeholder="数字"
                            @blur="handleFieldBlur"
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
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>

                    <fanc-form-item label="电话" prop="tel">
                        <fanc-field
                            v-model="formData.tel"
                            placeholder="座机或手机号"
                            @blur="handleFieldBlur"
                        />
                    </fanc-form-item>
                </view>

                <!-- 提交验证 -->
                <view class="form-actions">
                    <fanc-button type="primary" @click="submitForm">验证表单</fanc-button>
                    <fanc-button @click="resetForm" style="margin-left: 10px">重置表单</fanc-button>
                </view>
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
                callback(new Error("请输入手机号码"));
            } else if (!/^1[3-9]\d{9}$/.test(value)) {
                callback(new Error("请输入正确的手机号码"));
            } else {
                callback();
            }
        };

        // 确认密码验证
        const validateConfirmPassword = (rule, value, callback) => {
            if (value !== this.formData.password) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };

        // 验证座机或手机号
        const validateTel = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入电话号码"));
            } else if (!/^1[3-9]\d{9}$/.test(value) && !/^0\d{2,3}-\d{7,8}$/.test(value)) {
                callback(new Error("请输入正确的座机号或手机号"));
            } else {
                callback();
            }
        };

        return {
            formData: {
                username: "",
                password: "",
                nickname: "",
                phone: "",
                zipcode: "",
                email: "",
                url: "",
                age: "",
                confirmPassword: "",
                tel: "",
            },
            rules: {
                // 必填验证
                username: [{ required: true, message: "请输入用户名", trigger: "blur" }],

                // 长度验证
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
                ],
                nickname: [
                    { min: 2, max: 10, message: "昵称长度在 2 到 10 个字符", trigger: "blur" },
                ],

                // 正则验证
                phone: [
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    { validator: validatePhone, trigger: "blur" },
                ],
                zipcode: [
                    { pattern: /^\d{6}$/, message: "邮政编码必须为6位数字", trigger: "blur" },
                ],

                // 类型验证
                email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }],
                url: [{ type: "url", message: "请输入正确的网址", trigger: "blur" }],
                age: [
                    { type: "number", message: "年龄必须为数字", trigger: "blur" },
                    {
                        type: "number",
                        min: 0,
                        max: 120,
                        message: "年龄必须在0-120之间",
                        trigger: "blur",
                    },
                ],

                // 自定义验证
                confirmPassword: [
                    { required: true, message: "请确认密码", trigger: "blur" },
                    { validator: validateConfirmPassword, trigger: "blur" },
                ],
                tel: [{ validator: validateTel, trigger: "blur" }],
            },
        };
    },
    methods: {
        // 提交表单
        submitForm() {
            this.$refs.form.validate((valid, errors) => {
                if (valid) {
                    uni.showToast({
                        title: "表单验证通过",
                        icon: "success",
                    });
                    console.log("表单数据:", this.formData);
                } else {
                    console.log("表单验证失败:", errors);
                    const firstError = Object.values(errors)[0];
                    uni.showToast({
                        title: firstError,
                        icon: "none",
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
            const formItem = this.$refs.form.formItems.find(
                (item) =>
                    item.prop ===
                    Object.keys(this.formData).find(
                        (key) => this.formData[key] === field.detail.value
                    )
            );

            if (formItem) {
                formItem.onFieldBlur();
            }
        },
    },
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

.section {
    margin-bottom: 40rpx;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 24rpx;
    color: #333;
    padding-left: 16rpx;
    border-left: 8rpx solid var(--fanc-primary-color);
    line-height: 1.2;
}

.form-actions {
    display: flex;
    margin-top: 40rpx;
}
</style>
