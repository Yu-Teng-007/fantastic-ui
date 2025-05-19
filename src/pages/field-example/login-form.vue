<template>
    <view class="login-demo-container">
        <view class="login-tabs">
            <view
                class="login-tab-item"
                :class="{ active: activeTab === 'login' }"
                @click="activeTab = 'login'"
            >
                <text>登录</text>
            </view>
            <view
                class="login-tab-item"
                :class="{ active: activeTab === 'register' }"
                @click="activeTab = 'register'"
            >
                <text>注册</text>
            </view>
        </view>

        <!-- 登录表单 -->
        <view class="login-form" v-if="activeTab === 'login'">
            <view class="form-logo">
                <fanc-icon name="user-circle" size="60" color="#4a66ff" />
                <text class="form-title">账号登录</text>
            </view>

            <view class="form-container">
                <fanc-field
                    v-model="loginForm.username"
                    name="username"
                    label="账号"
                    left-icon="user"
                    placeholder="请输入用户名/手机号"
                    clearable
                    required
                    :rules="{ required: true, message: '请输入账号' }"
                    @validate="onValidate"
                ></fanc-field>

                <fanc-field
                    v-model="loginForm.password"
                    name="password"
                    type="password"
                    label="密码"
                    left-icon="lock"
                    placeholder="请输入密码"
                    :showPassword="passwordVisible"
                    right-icon="eye"
                    required
                    :rules="{ required: true, message: '请输入密码' }"
                    @click-right-icon="togglePasswordVisible"
                    @validate="onValidate"
                ></fanc-field>

                <view class="form-options">
                    <text class="form-link">忘记密码?</text>
                </view>

                <view class="form-submit">
                    <fanc-button type="primary" block @click="handleLogin">登录</fanc-button>
                </view>

                <view class="form-alternative">
                    <view class="divider">
                        <text class="divider-text">其他登录方式</text>
                    </view>
                    <view class="social-login">
                        <view class="social-icon">
                            <fanc-icon name="weixin" size="28" color="#07c160" />
                        </view>
                        <view class="social-icon">
                            <fanc-icon name="qq" size="28" color="#1da1f2" />
                        </view>
                        <view class="social-icon">
                            <fanc-icon name="weibo" size="28" color="#e6162d" />
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 注册表单 -->
        <view class="login-form" v-if="activeTab === 'register'">
            <view class="form-logo">
                <fanc-icon name="user-plus" size="60" color="#4a66ff" />
                <text class="form-title">账号注册</text>
            </view>

            <view class="form-container">
                <fanc-field
                    v-model="registerForm.username"
                    name="reg_username"
                    label="用户名"
                    left-icon="user"
                    placeholder="请设置用户名"
                    clearable
                    required
                    :rules="{ required: true, message: '请设置用户名' }"
                    @validate="onValidate"
                ></fanc-field>

                <fanc-field
                    v-model="registerForm.phone"
                    name="reg_phone"
                    label="手机号"
                    type="tel"
                    left-icon="phone"
                    placeholder="请输入手机号"
                    clearable
                    required
                    :rules="{ type: 'mobile', message: '请输入正确的手机号码' }"
                    @validate="onValidate"
                ></fanc-field>

                <fanc-field
                    v-model="registerForm.code"
                    name="reg_code"
                    label="验证码"
                    left-icon="shield-alt"
                    placeholder="请输入验证码"
                    required
                    :rules="{ required: true, message: '请输入验证码' }"
                    @validate="onValidate"
                >
                    <template #input-suffix>
                        <view style="min-width: 90px; margin-left: 8px">
                            <fanc-button size="small" type="primary" :disabled="codeSending">
                                {{ codeButtonText }}
                            </fanc-button>
                        </view>
                    </template>
                </fanc-field>

                <fanc-field
                    v-model="registerForm.password"
                    name="reg_password"
                    type="password"
                    label="密码"
                    left-icon="lock"
                    placeholder="请设置密码"
                    :showPassword="regPasswordVisible"
                    right-icon="eye"
                    required
                    :rules="[
                        { required: true, message: '请设置密码' },
                        { min: 6, max: 20, message: '密码长度为6-20个字符' },
                    ]"
                    @click-right-icon="toggleRegPasswordVisible"
                    @validate="onValidate"
                ></fanc-field>

                <fanc-field
                    v-model="registerForm.confirmPassword"
                    name="reg_confirm_password"
                    type="password"
                    label="确认密码"
                    left-icon="lock"
                    placeholder="请再次输入密码"
                    :showPassword="regConfirmPasswordVisible"
                    right-icon="eye"
                    required
                    :rules="[
                        { required: true, message: '请再次输入密码' },
                        {
                            validator: validateConfirmPassword,
                            message: '两次输入的密码不一致',
                        },
                    ]"
                    @click-right-icon="toggleRegConfirmPasswordVisible"
                    @validate="onValidate"
                ></fanc-field>

                <view class="form-agreement">
                    <text>注册即代表同意</text>
                    <text class="form-link">《用户协议》</text>
                    <text>和</text>
                    <text class="form-link">《隐私政策》</text>
                </view>

                <view class="form-submit">
                    <fanc-button type="primary" block @click="handleRegister">注册</fanc-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            activeTab: "login",
            passwordVisible: false,
            regPasswordVisible: false,
            regConfirmPasswordVisible: false,
            codeSending: false,
            countdown: 60,
            codeTimer: null,
            loginForm: {
                username: "",
                password: "",
            },
            registerForm: {
                username: "",
                phone: "",
                code: "",
                password: "",
                confirmPassword: "",
            },
            validationResults: {},
        };
    },
    computed: {
        codeButtonText() {
            return this.codeSending ? `${this.countdown}秒后重新获取` : "获取验证码";
        },
    },
    methods: {
        togglePasswordVisible() {
            this.passwordVisible = !this.passwordVisible;
        },
        toggleRegPasswordVisible() {
            this.regPasswordVisible = !this.regPasswordVisible;
        },
        toggleRegConfirmPasswordVisible() {
            this.regConfirmPasswordVisible = !this.regConfirmPasswordVisible;
        },
        onValidate(field) {
            this.validationResults[field.name] = field.valid;
            console.log(
                `字段 ${field.name} 校验结果:`,
                field.valid ? "通过" : "失败",
                field.message
            );
        },
        validateConfirmPassword(rule, value) {
            if (value !== this.registerForm.password) {
                return false;
            }
            return true;
        },
        sendVerificationCode() {
            if (this.codeSending) return;

            // 校验手机号
            const phoneFieldRef = this.$children.find(
                (child) => child.$options.name === "fanc-field" && child.name === "reg_phone"
            );

            if (phoneFieldRef) {
                phoneFieldRef.validate((valid) => {
                    if (valid) {
                        this.startCodeCountdown();
                        uni.showToast({
                            title: "验证码已发送",
                            icon: "success",
                        });
                    } else {
                        uni.showToast({
                            title: "请输入正确的手机号",
                            icon: "none",
                        });
                    }
                });
            }
        },
        startCodeCountdown() {
            this.codeSending = true;
            this.countdown = 60;

            this.codeTimer = setInterval(() => {
                this.countdown--;
                if (this.countdown <= 0) {
                    clearInterval(this.codeTimer);
                    this.codeSending = false;
                }
            }, 1000);
        },
        validateForm(formType) {
            // 获取对应表单的所有field组件
            const namePrefix = formType === "login" ? "" : "reg_";
            const fieldRefs = this.$children.filter(
                (child) =>
                    child.$options.name === "fanc-field" &&
                    (!namePrefix || child.name.startsWith(namePrefix))
            );

            // 创建验证Promise数组
            const validations = fieldRefs.map((field) => {
                return new Promise((resolve) => {
                    field.validate((valid) => {
                        resolve(valid);
                    });
                });
            });

            return Promise.all(validations).then((results) => {
                return results.every((valid) => valid);
            });
        },
        async handleLogin() {
            const isValid = await this.validateForm("login");

            if (isValid) {
                uni.showToast({
                    title: "登录成功",
                    icon: "success",
                });
                // 这里可以添加实际的登录逻辑
                console.log("登录信息:", this.loginForm);
            } else {
                uni.showToast({
                    title: "请完善登录信息",
                    icon: "none",
                });
            }
        },
        async handleRegister() {
            const isValid = await this.validateForm("register");

            if (isValid) {
                uni.showToast({
                    title: "注册成功",
                    icon: "success",
                });
                // 这里可以添加实际的注册逻辑
                console.log("注册信息:", this.registerForm);
            } else {
                uni.showToast({
                    title: "请完善注册信息",
                    icon: "none",
                });
            }
        },
    },
    beforeDestroy() {
        // 清除定时器
        if (this.codeTimer) {
            clearInterval(this.codeTimer);
        }
    },
};
</script>

<style lang="scss" scoped>
.login-demo-container {
    padding: 24px 16px;
    background-color: #f7f8fa;
    min-height: 100vh;
}

.login-tabs {
    display: flex;
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.login-tab-item {
    flex: 1;
    text-align: center;
    padding: 14px 0;
    font-size: 15px;
    color: #323233;
    position: relative;
    transition: all 0.3s;

    &.active {
        color: #4a66ff;
        font-weight: 500;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 25%;
            width: 50%;
            height: 3px;
            background-color: #4a66ff;
            border-radius: 2px;
        }
    }
}

.login-form {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
}

.form-title {
    font-size: 22px;
    font-weight: 600;
    color: #323233;
    margin-top: 12px;
}

.form-container {
    position: relative;
}

.form-options {
    display: flex;
    justify-content: flex-end;
    margin: 8px 0 24px;
}

.form-link {
    color: #4a66ff;
    font-size: 14px;
}

.form-submit {
    margin: 24px 0;
}

.form-alternative {
    margin-top: 24px;
}

.divider {
    position: relative;
    text-align: center;
    margin: 16px 0;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #ebedf0;
        transform: scaleY(0.5);
    }

    .divider-text {
        position: relative;
        display: inline-block;
        padding: 0 12px;
        background-color: #fff;
        color: #969799;
        font-size: 14px;
    }
}

.social-login {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.social-icon {
    margin: 0 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.2s;

    &:active {
        transform: scale(0.95);
    }
}

.form-agreement {
    font-size: 14px;
    color: #969799;
    text-align: center;
    margin-top: 16px;
}
</style>
