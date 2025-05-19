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
                    <fanc-field
                        label="出生日期"
                        v-model="formData.birthdate"
                        name="birthdate"
                        placeholder="请选择出生日期"
                        readonly
                        right-icon="calendar-alt"
                        @click-right-icon="showCalendar = true"
                    ></fanc-field>
                    <fanc-field
                        label="所在地区"
                        v-model="formData.regionText"
                        name="region"
                        placeholder="请选择所在地区"
                        readonly
                        right-icon="map-marker-alt"
                        @click-right-icon="showCascader = true"
                    ></fanc-field>

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

        <!-- 日历组件 -->
        <fanc-calendar
            v-model="showCalendar"
            type="single"
            title="选择出生日期"
            :default-date="formData.birthdate"
            :max-date="maxDate"
            color="#007bff"
            round
            show-confirm
            confirm-text="确定"
            @confirm="onSelectDate"
        />

        <!-- 级联选择器 -->
        <fanc-cascader
            v-model="formData.region"
            :options="regionOptions"
            title="选择地区"
            active-color="#007bff"
            @change="onRegionChange"
            @finish="onCascaderFinish"
        />
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
                    text: "北京市",
                    value: "110000",
                    children: [
                        {
                            text: "北京市",
                            value: "110100",
                            children: [
                                { text: "东城区", value: "110101" },
                                { text: "西城区", value: "110102" },
                                { text: "朝阳区", value: "110105" },
                                { text: "丰台区", value: "110106" },
                            ],
                        },
                    ],
                },
                {
                    text: "广东省",
                    value: "440000",
                    children: [
                        {
                            text: "广州市",
                            value: "440100",
                            children: [
                                { text: "荔湾区", value: "440103" },
                                { text: "越秀区", value: "440104" },
                                { text: "海珠区", value: "440105" },
                                { text: "天河区", value: "440106" },
                            ],
                        },
                        {
                            text: "深圳市",
                            value: "440300",
                            children: [
                                { text: "罗湖区", value: "440303" },
                                { text: "福田区", value: "440304" },
                                { text: "南山区", value: "440305" },
                                { text: "宝安区", value: "440306" },
                            ],
                        },
                    ],
                },
                {
                    text: "浙江省",
                    value: "330000",
                    children: [
                        {
                            text: "杭州市",
                            value: "330100",
                            children: [
                                { text: "上城区", value: "330102" },
                                { text: "下城区", value: "330103" },
                                { text: "江干区", value: "330104" },
                                { text: "拱墅区", value: "330105" },
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
            if (typeof date === "object" && date.detail) {
                this.formData.birthdate = date.detail.value;
            } else {
                this.formData.birthdate = date;
            }
        },

        // 地区选择器回调
        onRegionChange(value, selectedOptions) {
            if (!selectedOptions) return;

            // 如果selectedOptions存在，更新显示文本
            if (Array.isArray(selectedOptions)) {
                this.formData.regionText = selectedOptions
                    .map((option) => option.text || option.label)
                    .join(" / ");
            }
        },

        // 级联选择器完成回调
        onCascaderFinish(value, selectedOptions) {
            // 在用户完成选择时关闭弹窗
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
        color: #323233;
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
        border-bottom: 1px solid #ebedf0;
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
    height: 60vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

.calendar-header,
.cascader-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #ebeef5;
    flex-shrink: 0;
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
    color: #007bff;
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
    color: #969799;
    line-height: 1.5;
}

.form-buttons {
    margin-top: 24px;
}

/* 确保内容部分可以滚动 */
.fanc-calendar,
.fanc-cascader {
    flex: 1;
    overflow-y: auto;
}
</style>
