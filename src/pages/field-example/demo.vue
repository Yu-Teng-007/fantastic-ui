<template>
    <view class="demo-container">
        <view class="demo-title">输入框示例</view>
        <view class="demo-description">展示fanc-field组件的基本用法和常见场景</view>

        <!-- 基础用法 -->
        <view class="demo-section">
            <view class="demo-section-title">基础用法</view>
            <fanc-field
                v-model="username"
                label="用户名"
                required
                placeholder="请输入用户名"
            ></fanc-field>
            <fanc-field
                v-model="phone"
                label="手机号"
                type="tel"
                left-icon="phone"
                placeholder="请输入手机号"
            ></fanc-field>
            <fanc-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                right-icon="eye"
                :showPassword="passwordVisible"
                @click-right-icon="togglePasswordVisible"
            ></fanc-field>
        </view>

        <!-- 验证码示例 -->
        <view class="demo-section">
            <view class="demo-section-title">带验证码</view>
            <fanc-field v-model="code" label="验证码" placeholder="请输入验证码" maxlength="6">
                <template #input-suffix>
                    <view style="min-width: 80px; margin-left: 8px">
                        <fanc-button size="small" type="primary">获取验证码</fanc-button>
                    </view>
                </template>
            </fanc-field>
        </view>

        <!-- 字段校验 -->
        <view class="demo-section">
            <view class="demo-section-title">字段校验</view>
            <fanc-field
                v-model="validatedField"
                label="必填字段"
                required
                placeholder="此字段不能为空"
                :rules="{ required: true, message: '请输入内容' }"
                @validate="onValidate"
            ></fanc-field>
            <fanc-field
                v-model="email"
                label="邮箱"
                placeholder="请输入邮箱"
                :rules="{ type: 'email', message: '请输入正确的邮箱格式' }"
                @validate="onValidate"
            ></fanc-field>
        </view>

        <!-- 带图标的输入框 -->
        <view class="demo-section">
            <view class="demo-section-title">带图标的输入框</view>
            <fanc-field
                v-model="search"
                left-icon="search"
                placeholder="搜索关键词"
                clearable
            ></fanc-field>
            <fanc-field
                v-model="website"
                label="网址"
                left-icon="globe"
                right-icon="link"
                placeholder="请输入网址"
            ></fanc-field>
        </view>

        <!-- 文本域示例 -->
        <view class="demo-section">
            <view class="demo-section-title">文本域</view>
            <fanc-field
                v-model="message"
                type="textarea"
                label="留言"
                placeholder="请输入留言内容"
                show-word-limit
                maxlength="100"
                auto-height
            ></fanc-field>
        </view>

        <!-- 表单提交按钮 -->
        <view class="demo-buttons">
            <fanc-button type="primary" block @click="validateAll">提交表单</fanc-button>
            <fanc-button type="default" block plain style="margin-top: 12px" @click="resetForm"
                >重置表单</fanc-button
            >
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            phone: "",
            password: "",
            code: "",
            search: "",
            message: "",
            website: "",
            email: "",
            validatedField: "",
            passwordVisible: false,
            validationResults: {},
        };
    },
    methods: {
        togglePasswordVisible() {
            this.passwordVisible = !this.passwordVisible;
        },
        onValidate(field) {
            this.validationResults[field.name] = field.valid;
            console.log(
                `字段 ${field.name} 校验结果:`,
                field.valid ? "通过" : "失败",
                field.message
            );
        },
        validateAll() {
            // 获取页面上所有的fanc-field组件实例
            const fieldRefs = this.$children.filter(
                (child) => child.$options.name === "fanc-field"
            );

            // 创建验证Promise数组
            const validations = fieldRefs.map((field) => {
                return new Promise((resolve) => {
                    field.validate((valid) => {
                        resolve(valid);
                    });
                });
            });

            // 等待所有验证完成
            Promise.all(validations).then((results) => {
                const allValid = results.every((valid) => valid);
                if (allValid) {
                    uni.showToast({
                        title: "表单验证通过",
                        icon: "success",
                    });
                } else {
                    uni.showToast({
                        title: "表单验证失败",
                        icon: "error",
                    });
                }
            });
        },
        resetForm() {
            // 重置所有字段值
            this.username = "";
            this.phone = "";
            this.password = "";
            this.code = "";
            this.search = "";
            this.message = "";
            this.website = "";
            this.email = "";
            this.validatedField = "";

            // 重置所有字段的验证状态
            const fieldRefs = this.$children.filter(
                (child) => child.$options.name === "fanc-field"
            );
            fieldRefs.forEach((field) => {
                field.resetValidation();
            });

            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.demo-container {
    padding: 16px;
    background-color: #f7f8fa;
    min-height: 100vh;
}

.demo-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    text-align: center;
    color: #323233;
}

.demo-description {
    font-size: 14px;
    color: #969799;
    text-align: center;
    margin-bottom: 24px;
}

.demo-section {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.demo-section-title {
    font-size: 15px;
    font-weight: 500;
    color: #323233;
    padding: 12px 16px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #ebedf0;
}

.demo-buttons {
    margin-top: 24px;
    padding: 0 8px;
}
</style>
