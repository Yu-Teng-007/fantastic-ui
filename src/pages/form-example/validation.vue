<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">表单验证</text>
            <text class="example-page__header-desc">演示表单验证功能的使用方法</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础验证</view>
            <view class="example-form-wrapper">
                <fanc-form
                    ref="basicForm"
                    :model="formData"
                    :rules="formRules"
                    :scroll-to-error="true"
                    @submit="handleSubmit"
                >
                    <fanc-field
                        v-model="formData.username"
                        label="用户名"
                        name="username"
                        label-width="fixed"
                        required
                        placeholder="请输入用户名"
                    ></fanc-field>

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

                    <view style="height: 20px"></view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="validateForm">提交</fanc-button>
                        <fanc-button style="margin-left: 10px" @click="resetForm">重置</fanc-button>
                    </view>
                </fanc-form>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义验证</view>
            <view class="example-form-wrapper">
                <fanc-form
                    ref="customForm"
                    :model="customFormData"
                    :rules="customFormRules"
                    :scroll-to-error="true"
                    @submit="handleCustomSubmit"
                >
                    <fanc-field
                        v-model="customFormData.password"
                        label="密码"
                        name="password"
                        label-width="fixed"
                        type="password"
                        required
                        placeholder="请输入密码"
                    ></fanc-field>

                    <fanc-field
                        v-model="customFormData.confirmPassword"
                        label="确认密码"
                        name="confirmPassword"
                        label-width="fixed"
                        type="password"
                        required
                        placeholder="请再次输入密码"
                    ></fanc-field>

                    <fanc-field
                        v-model="customFormData.age"
                        label="年龄"
                        name="age"
                        label-width="fixed"
                        type="number"
                        required
                        placeholder="请输入年龄"
                    ></fanc-field>

                    <view style="height: 20px"></view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="validateCustomForm">提交</fanc-button>
                        <fanc-button style="margin-left: 10px" @click="resetCustomForm"
                            >重置</fanc-button
                        >
                    </view>
                </fanc-form>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">触发验证方式</view>
            <view class="example-form-wrapper">
                <fanc-form
                    ref="triggerForm"
                    :model="triggerFormData"
                    :rules="triggerFormRules"
                    :validate-trigger="validateTrigger"
                    :scroll-to-error="true"
                >
                    <view class="trigger-label">验证方式</view>
                    <view class="trigger-selector">
                        <fanc-button
                            :type="validateTrigger === 'blur' ? 'primary' : 'default'"
                            size="small"
                            @click="validateTrigger = 'blur'"
                            >失焦验证</fanc-button
                        >
                        <fanc-button
                            :type="validateTrigger === 'change' ? 'primary' : 'default'"
                            size="small"
                            @click="validateTrigger = 'change'"
                            >实时验证</fanc-button
                        >
                        <fanc-button
                            :type="validateTrigger === 'submit' ? 'primary' : 'default'"
                            size="small"
                            @click="validateTrigger = 'submit'"
                            >提交验证</fanc-button
                        >
                    </view>

                    <fanc-field
                        v-model="triggerFormData.value"
                        label="验证字段"
                        name="value"
                        required
                        placeholder="请输入信息"
                    ></fanc-field>

                    <view
                        style="
                            height: 1200px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        "
                    >
                        <text>滚动测试区域（提交表单时会自动滚动到错误字段）</text>
                    </view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="validateTriggerForm">提交</fanc-button>
                    </view>
                </fanc-form>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        // 自定义密码一致性验证
        const validatePassword = (rule, value, callback) => {
            if (value !== this.customFormData.password) {
                callback("两次输入的密码不一致");
            } else {
                callback();
            }
        };

        return {
            // 基础验证表单
            formData: {
                username: "",
                email: "",
                phone: "",
            },
            formRules: {
                username: [
                    { required: true, message: "请输入用户名" },
                    { min: 3, max: 20, message: "用户名长度在3-20个字符之间" },
                ],
                email: [
                    { required: true, message: "请输入邮箱" },
                    {
                        pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
                        message: "请输入正确的邮箱格式",
                    },
                ],
                phone: [
                    { required: true, message: "请输入手机号" },
                    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号格式" },
                ],
            },

            // 自定义验证表单
            customFormData: {
                password: "",
                confirmPassword: "",
                age: "",
            },
            customFormRules: {
                password: [
                    { required: true, message: "请输入密码" },
                    { min: 6, message: "密码长度不能少于6个字符" },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message: "密码必须包含大小写字母和数字",
                    },
                ],
                confirmPassword: [
                    { required: true, message: "请再次输入密码" },
                    { validator: validatePassword, message: "两次输入的密码不一致" },
                ],
                age: [
                    { required: true, message: "请输入年龄" },
                    { pattern: /^\d+$/, message: "年龄必须是数字" },
                    {
                        validator: (rule, value, callback) => {
                            if (value && (value < 18 || value > 120)) {
                                callback("年龄必须在18-120岁之间");
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },

            // 触发验证方式表单
            validateTrigger: "blur",
            triggerFormData: {
                value: "",
            },
            triggerFormRules: {
                value: [
                    { required: true, message: "请输入信息" },
                    { min: 5, message: "内容长度不能少于5个字符" },
                ],
            },
        };
    },
    methods: {
        // 基础验证表单方法
        validateForm() {
            this.$refs.basicForm.validate().then(({ valid, invalidFields }) => {
                if (valid) {
                    uni.showToast({
                        title: "验证通过",
                        icon: "success",
                    });
                    console.log("表单数据:", this.formData);
                } else {
                    uni.showToast({
                        title: "验证失败",
                        icon: "none",
                    });
                    console.log("验证失败:", invalidFields);
                }
            });
        },
        resetForm() {
            this.$refs.basicForm.resetFields();
            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },
        handleSubmit(result) {
            console.log("表单提交结果:", result);
            if (result.valid) {
                uni.showToast({
                    title: "表单提交成功",
                    icon: "success",
                });
            } else {
                uni.showToast({
                    title: "表单验证失败",
                    icon: "none",
                });
            }
        },

        // 自定义验证表单方法
        validateCustomForm() {
            this.$refs.customForm.validate().then(({ valid, invalidFields }) => {
                if (valid) {
                    uni.showToast({
                        title: "验证通过",
                        icon: "success",
                    });
                    console.log("表单数据:", this.customFormData);
                } else {
                    uni.showToast({
                        title: "验证失败",
                        icon: "none",
                    });
                    console.log("验证失败:", invalidFields);
                }
            });
        },
        resetCustomForm() {
            this.$refs.customForm.resetFields();
            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },
        handleCustomSubmit(result) {
            console.log("自定义表单提交结果:", result);
            if (result.valid) {
                uni.showToast({
                    title: "表单提交成功",
                    icon: "success",
                });
            } else {
                uni.showToast({
                    title: "表单验证失败",
                    icon: "none",
                });
            }
        },

        // 触发验证方式表单方法
        validateTriggerForm() {
            this.$refs.triggerForm.validate().then(({ valid, invalidFields }) => {
                if (valid) {
                    uni.showToast({
                        title: "验证通过",
                        icon: "success",
                    });
                } else {
                    uni.showToast({
                        title: "验证失败",
                        icon: "none",
                    });
                    console.log("验证失败:", invalidFields);
                }
            });
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/example-pages.scss";

.example-form-wrapper {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    margin: 8px 16px 16px;
}

.form-buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
}

.trigger-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.trigger-label {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
    margin-bottom: 8px;
}
</style>
