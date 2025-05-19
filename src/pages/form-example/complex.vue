<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">复杂表单</text>
            <text class="example-page__header-desc"
                >演示复杂表单的使用方法，包含多种组件和复杂布局</text
            >
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">用户注册表单</view>
            <view class="example-form-wrapper">
                <fanc-form ref="registForm" :model="formData" :rules="formRules">
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

                    <fanc-field
                        v-model="formData.password"
                        label="密码"
                        name="password"
                        label-width="fixed"
                        type="password"
                        required
                        placeholder="请输入密码"
                    ></fanc-field>

                    <fanc-field
                        v-model="formData.confirmPassword"
                        label="确认密码"
                        name="confirmPassword"
                        label-width="fixed"
                        type="password"
                        required
                        placeholder="请再次输入密码"
                    ></fanc-field>

                    <view class="form-group">
                        <view class="form-group__label">性别</view>
                        <view class="form-group__content checkbox-wrapper">
                            <fanc-checkbox-group v-model="formData.gender" name="gender">
                                <fanc-checkbox name="male">男</fanc-checkbox>
                                <fanc-checkbox name="female">女</fanc-checkbox>
                                <fanc-checkbox name="other">其他</fanc-checkbox>
                            </fanc-checkbox-group>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="form-group__label">兴趣爱好</view>
                        <view class="form-group__content checkbox-wrapper">
                            <fanc-checkbox-group v-model="formData.interests" name="interests">
                                <fanc-checkbox name="sports">体育</fanc-checkbox>
                                <fanc-checkbox name="reading">阅读</fanc-checkbox>
                                <fanc-checkbox name="travel">旅行</fanc-checkbox>
                                <fanc-checkbox name="music">音乐</fanc-checkbox>
                                <fanc-checkbox name="movie">电影</fanc-checkbox>
                            </fanc-checkbox-group>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="form-group__label">出生日期</view>
                        <view class="form-group__content">
                            <view class="calendar-field" @click="showCalendar = true">
                                <fanc-field
                                    v-model="formData.birthdate"
                                    name="birthdate"
                                    placeholder="请选择出生日期"
                                    readonly
                                    right-icon="calendar-alt"
                                    borderless
                                ></fanc-field>
                            </view>
                            <fanc-popup v-model="showCalendar" position="bottom">
                                <view class="calendar-container">
                                    <view class="calendar-header">
                                        <text class="calendar-title">选择日期</text>
                                        <fanc-icon
                                            name="times"
                                            size="20"
                                            @click="showCalendar = false"
                                            class="calendar-close"
                                        ></fanc-icon>
                                    </view>
                                    <fanc-calendar
                                        :value="formData.birthdate"
                                        @confirm="onSelectDate"
                                        :max-date="maxDate"
                                        @close="showCalendar = false"
                                    ></fanc-calendar>
                                </view>
                            </fanc-popup>
                        </view>
                    </view>

                    <view class="form-group">
                        <view class="form-group__label">所在地区</view>
                        <view class="form-group__content">
                            <view class="cascader-field" @click="showCascader = true">
                                <fanc-field
                                    v-model="formData.regionText"
                                    name="region"
                                    placeholder="请选择所在地区"
                                    readonly
                                    right-icon="map-marker-alt"
                                    borderless
                                ></fanc-field>
                            </view>
                            <fanc-popup v-model="showCascader" position="bottom">
                                <view class="cascader-container">
                                    <view class="cascader-header">
                                        <text class="cascader-title">选择地区</text>
                                        <fanc-icon
                                            name="times"
                                            size="20"
                                            @click="showCascader = false"
                                            class="cascader-close"
                                        ></fanc-icon>
                                    </view>
                                    <fanc-cascader
                                        :options="regionOptions"
                                        :value="formData.region"
                                        @change="onRegionChange"
                                        @close="showCascader = false"
                                    ></fanc-cascader>
                                </view>
                            </fanc-popup>
                        </view>
                    </view>

                    <fanc-field
                        v-model="formData.address"
                        label="详细地址"
                        name="address"
                        label-width="fixed"
                        type="textarea"
                        placeholder="请输入详细地址"
                    ></fanc-field>

                    <view class="form-group">
                        <view class="form-group__label">用户协议</view>
                        <view class="form-group__content agreement-wrapper">
                            <fanc-checkbox v-model="formData.agreement" name="agreement">
                                我已阅读并同意
                                <text class="agreement-link" @click="showAgreement = true"
                                    >《用户协议》</text
                                >
                            </fanc-checkbox>
                        </view>
                    </view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="submitForm" block>注册</fanc-button>
                    </view>
                </fanc-form>
            </view>
        </view>

        <!-- 用户协议弹窗 -->
        <fanc-dialog
            v-model="showAgreement"
            title="用户协议"
            :show-cancel-button="false"
            confirm-text="我已阅读"
        >
            <view class="agreement-content">
                <view class="agreement-section">
                    <view class="agreement-section-title">1. 协议条款</view>
                    <view class="agreement-section-text"
                        >本协议是您与本应用之间关于使用本应用服务所订立的协议。请您仔细阅读本注册协议，如果您注册，则意味着您同意遵守本协议的所有条款。</view
                    >
                </view>
                <view class="agreement-section">
                    <view class="agreement-section-title">2. 账号注册</view>
                    <view class="agreement-section-text"
                        >您在注册时提供的所有信息必须真实、完整。如有变动，请及时更新相关信息。您须对账号安全负责，不得将账号提供给他人使用。</view
                    >
                </view>
                <view class="agreement-section">
                    <view class="agreement-section-title">3. 隐私保护</view>
                    <view class="agreement-section-text"
                        >我们会按照隐私政策收集、使用、储存您的信息。我们会尽最大努力保护您的个人信息安全。</view
                    >
                </view>
            </view>
        </fanc-dialog>
    </view>
</template>

<script>
export default {
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
                username: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                gender: [],
                interests: [],
                birthdate: "",
                region: [],
                regionText: "",
                address: "",
                agreement: false,
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
                password: [
                    { required: true, message: "请输入密码" },
                    { min: 6, message: "密码长度不能少于6个字符" },
                ],
                confirmPassword: [
                    { required: true, message: "请再次输入密码" },
                    { validator: validatePassword },
                ],
                birthdate: [{ required: true, message: "请选择出生日期" }],
                region: [{ required: true, message: "请选择所在地区" }],
                agreement: [
                    {
                        validator: (rule, value, callback) => {
                            if (value !== true) {
                                callback("请阅读并同意用户协议");
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
            showCalendar: false,
            showCascader: false,
            showAgreement: false,
            maxDate: new Date().toISOString().split("T")[0], // 今天日期
            regionOptions: [
                {
                    value: "110000",
                    label: "北京市",
                    children: [
                        {
                            value: "110100",
                            label: "北京市",
                            children: [
                                { value: "110101", label: "东城区" },
                                { value: "110102", label: "西城区" },
                                { value: "110105", label: "朝阳区" },
                                { value: "110106", label: "丰台区" },
                            ],
                        },
                    ],
                },
                {
                    value: "440000",
                    label: "广东省",
                    children: [
                        {
                            value: "440100",
                            label: "广州市",
                            children: [
                                { value: "440103", label: "荔湾区" },
                                { value: "440104", label: "越秀区" },
                                { value: "440105", label: "海珠区" },
                                { value: "440106", label: "天河区" },
                            ],
                        },
                        {
                            value: "440300",
                            label: "深圳市",
                            children: [
                                { value: "440303", label: "罗湖区" },
                                { value: "440304", label: "福田区" },
                                { value: "440305", label: "南山区" },
                                { value: "440306", label: "宝安区" },
                            ],
                        },
                    ],
                },
                {
                    value: "330000",
                    label: "浙江省",
                    children: [
                        {
                            value: "330100",
                            label: "杭州市",
                            children: [
                                { value: "330102", label: "上城区" },
                                { value: "330103", label: "下城区" },
                                { value: "330104", label: "江干区" },
                                { value: "330105", label: "拱墅区" },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        // 提交表单
        submitForm() {
            this.$refs.registForm.validate().then(({ valid, invalidFields }) => {
                if (valid) {
                    uni.showToast({
                        title: "注册成功",
                        icon: "success",
                    });
                    console.log("注册数据:", this.formData);
                } else {
                    console.log("验证失败:", invalidFields);
                    uni.showToast({
                        title: "请检查表单内容",
                        icon: "none",
                    });
                }
            });
        },

        // 日期选择器回调
        onSelectDate(date) {
            this.formData.birthdate = date;
            this.showCalendar = false;
        },

        // 地区选择器回调
        onRegionChange(value, selectedOptions) {
            this.formData.region = value;
            this.formData.regionText = selectedOptions.map((option) => option.label).join(" / ");
            this.showCascader = false;
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

.form-group {
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    position: relative;

    &__label {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 8px;
        font-weight: 500;
    }

    &__content {
        flex: 1;
    }

    &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid var(--border-color);
        transform: scaleY(0.5);
    }

    &:last-child::after {
        display: none;
    }
}

.checkbox-wrapper {
    padding: 4px 0 12px;
}

.calendar-field,
.cascader-field {
    position: relative;
    width: 100%;
}

.calendar-container,
.cascader-container {
    height: 50vh;
    background-color: #fff;
}

.calendar-header,
.cascader-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color-light);
}

.calendar-title,
.cascader-title {
    font-size: 16px;
    font-weight: 500;
}

.calendar-close,
.cascader-close {
    padding: 6px;
}

.agreement-wrapper {
    padding: 8px 0;
}

.agreement-link {
    color: var(--fanc-primary-color);
}

.agreement-content {
    padding: 16px;
    max-height: 40vh;
    overflow-y: auto;
}

.agreement-section {
    margin-bottom: 12px;
}

.agreement-section-title {
    font-weight: 500;
    margin-bottom: 8px;
}

.agreement-section-text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
}

.form-buttons {
    margin-top: 24px;
}
</style>
