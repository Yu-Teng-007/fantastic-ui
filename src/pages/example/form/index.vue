<template>
    <view class="container">
        <view class="header">
            <view class="title">表单</view>
            <view class="subtitle"
                >表单组件用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型</view
            >
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="form-container">
                <fanc-form ref="form1" :model="form1" :rules="rules1" label-width="80px">
                    <fanc-field
                        v-model="form1.username"
                        name="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        required
                    ></fanc-field>
                    <fanc-field
                        v-model="form1.password"
                        name="password"
                        label="密码"
                        type="password"
                        placeholder="请输入密码"
                        required
                    ></fanc-field>
                    <view class="form-button-group">
                        <fanc-button type="primary" size="medium" @click="submitForm1"
                            >提交</fanc-button
                        >
                        <fanc-button size="medium" @click="resetForm1">重置</fanc-button>
                    </view>
                </fanc-form>
            </view>
        </view>

        <!-- 表单验证 -->
        <view class="section">
            <view class="section-title">表单验证</view>
            <view class="form-container">
                <fanc-form ref="validateForm" :model="form2" :rules="rules2" label-width="80px">
                    <fanc-field
                        v-model="form2.name"
                        name="name"
                        label="姓名"
                        placeholder="请输入姓名"
                        required
                    ></fanc-field>
                    <fanc-field
                        v-model="form2.mobile"
                        name="mobile"
                        label="手机号"
                        placeholder="请输入手机号"
                        required
                    ></fanc-field>
                    <fanc-field
                        v-model="form2.email"
                        name="email"
                        label="邮箱"
                        placeholder="请输入邮箱"
                        required
                    ></fanc-field>
                    <view class="form-button-group">
                        <fanc-button type="primary" size="medium" @click="submitForm2"
                            >提交</fanc-button
                        >
                        <fanc-button size="medium" @click="resetForm2">重置</fanc-button>
                    </view>
                </fanc-form>
            </view>
        </view>

        <!-- 表单项类型 -->
        <view class="section">
            <view class="section-title">表单项类型</view>
            <view class="form-container">
                <fanc-form :model="form3" label-width="80px" class="form-types">
                    <view class="form-item">
                        <text class="form-item__label" style="width: 80px">单选框</text>
                        <view class="form-item__content">
                            <fanc-radio-group v-model="form3.gender" class="radio-group">
                                <fanc-radio name="male">男</fanc-radio>
                                <fanc-radio name="female">女</fanc-radio>
                            </fanc-radio-group>
                        </view>
                    </view>
                    <view class="form-item">
                        <text class="form-item__label" style="width: 80px">复选框</text>
                        <view class="form-item__content">
                            <fanc-checkbox-group v-model="form3.hobbies" class="checkbox-group">
                                <fanc-checkbox name="reading">阅读</fanc-checkbox>
                                <fanc-checkbox name="sports">运动</fanc-checkbox>
                                <fanc-checkbox name="music">音乐</fanc-checkbox>
                            </fanc-checkbox-group>
                        </view>
                    </view>
                    <view class="form-item">
                        <text class="form-item__label" style="width: 80px">步进器</text>
                        <view class="form-item__content">
                            <fanc-stepper v-model="form3.count" :min="1" :max="10"></fanc-stepper>
                        </view>
                    </view>
                    <view class="form-item">
                        <text class="form-item__label" style="width: 80px">开关</text>
                        <view class="form-item__content">
                            <switch
                                :checked="form3.agree"
                                @change="onSwitchChange"
                                color="#007bff"
                            />
                        </view>
                    </view>
                </fanc-form>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="form-container">
                <fanc-form :model="form6" disabled>
                    <fanc-field
                        v-model="form6.username"
                        label="用户名"
                        label-width="80px"
                        placeholder="请输入用户名"
                    ></fanc-field>
                    <fanc-field
                        v-model="form6.mobile"
                        label="手机号"
                        label-width="80px"
                        placeholder="请输入手机号"
                    ></fanc-field>
                </fanc-form>
            </view>
        </view>

        <!-- 标签位置 -->
        <view class="section">
            <view class="section-title">标签位置</view>
            <view class="form-position-group">
                <view class="form-position-item">
                    <view class="sub-title">左侧标签（默认）</view>
                    <fanc-form :model="form11" label-width="80px" class="form-container">
                        <fanc-field
                            v-model="form11.username"
                            label="用户名"
                            placeholder="请输入用户名"
                        ></fanc-field>
                        <fanc-field
                            v-model="form11.password"
                            label="密码"
                            type="password"
                            placeholder="请输入密码"
                        ></fanc-field>
                    </fanc-form>
                </view>

                <view class="form-position-item">
                    <view class="sub-title">顶部标签</view>
                    <fanc-form :model="form12" label-position="top" class="form-container">
                        <fanc-field
                            v-model="form12.username"
                            label="用户名"
                            placeholder="请输入用户名"
                        ></fanc-field>
                        <fanc-field
                            v-model="form12.password"
                            label="密码"
                            type="password"
                            placeholder="请输入密码"
                        ></fanc-field>
                    </fanc-form>
                </view>
            </view>

            <view class="sub-title">单独设置标签位置</view>
            <fanc-form :model="form13" label-width="80px" class="form-container">
                <fanc-field
                    v-model="form13.username"
                    label="用户名"
                    placeholder="请输入用户名"
                ></fanc-field>
                <fanc-field
                    v-model="form13.password"
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                    label-position="top"
                ></fanc-field>
                <fanc-field
                    v-model="form13.email"
                    label="邮箱"
                    placeholder="请输入邮箱"
                ></fanc-field>
            </fanc-form>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础表单
            form1: {
                username: "",
                password: "",
            },
            rules1: {
                username: [{ required: true, message: "请输入用户名" }],
                password: [{ required: true, message: "请输入密码" }],
            },

            // 表单验证
            form2: {
                name: "",
                mobile: "",
                email: "",
            },
            rules2: {
                name: [
                    { required: true, message: "请输入姓名" },
                    { min: 2, max: 20, message: "长度在2到20个字符" },
                ],
                mobile: [
                    { required: true, message: "请输入手机号" },
                    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
                ],
                email: [
                    { required: true, message: "请输入邮箱" },
                    { type: "email", message: "邮箱格式不正确" },
                ],
            },

            // 表单项类型
            form3: {
                gender: "male",
                hobbies: ["reading"],
                count: 1,
                agree: true,
            },

            // 表单布局
            form4: {
                username: "",
                password: "",
            },
            form5: {
                username: "",
                password: "",
            },

            // 禁用状态
            form6: {
                username: "张三",
                mobile: "13800138000",
            },

            // 自定义尺寸
            form7: {
                username: "",
            },
            form8: {
                username: "",
            },
            form9: {
                username: "",
            },

            // 混合标签位置
            form10: {
                username: "",
                password: "",
                email: "",
            },

            // 标签位置
            form11: {
                username: "",
                password: "",
            },
            form12: {
                username: "",
                password: "",
            },
            form13: {
                username: "",
                password: "",
                email: "",
            },
        };
    },
    methods: {
        // 基础表单提交
        submitForm1() {
            this.$refs.form1.validate().then((result) => {
                if (result.valid) {
                    this.$toast.success("提交成功");
                } else {
                    this.$toast.fail("表单校验失败");
                }
            });
        },
        // 基础表单重置
        resetForm1() {
            this.$refs.form1.resetFields();
            this.$toast("表单已重置");
        },

        // 表单验证提交
        submitForm2() {
            this.$refs.validateForm.validate().then((result) => {
                if (result.valid) {
                    this.$toast.success("验证通过");
                } else {
                    this.$toast.error("验证失败");
                }
            });
        },
        // 表单验证重置
        resetForm2() {
            this.$refs.validateForm.resetFields();
            this.$toast("表单已重置");
        },

        // 开关切换
        onSwitchChange(e) {
            this.form3.agree = e.detail.value;
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    margin-bottom: 24px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
}

.section {
    margin-bottom: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
}

.form-container {
    padding: 16px;
}

.sub-title {
    font-size: 14px;
    color: #666;
    margin: 16px 0 8px;
    font-weight: 500;
    position: relative;
    padding-left: 12px;
}

.sub-title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 14px;
    background-color: var(--primary-color);
    border-radius: 2px;
}

.form-button-group {
    display: flex;
    margin-top: 24px;
    justify-content: center;
}

.form-button-group .fanc-button {
    margin-right: 12px;
    min-width: 88px;
}

.form-button-group .fanc-button:last-child {
    margin-right: 0;
}

.form-item {
    position: relative;
    display: flex;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 12px;
    border-radius: 4px;
    background-color: #fafafa;
}

.form-item__label {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    text-align: right;
    margin-right: 12px;
}

.form-item__content {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
}

.form-position-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
}

.form-position-item {
    flex: 1;
    min-width: 280px;
}

.radio-group,
.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.form-types .form-item {
    transition: all 0.3s ease;
}

.form-types .form-item:hover {
    background-color: #f0f7ff;
}

@media screen and (max-width: 768px) {
    .form-position-group {
        flex-direction: column;
    }

    .form-position-item {
        width: 100%;
    }

    .form-button-group {
        flex-wrap: wrap;
    }

    .form-button-group .fanc-button {
        margin-bottom: 8px;
    }
}
</style>
