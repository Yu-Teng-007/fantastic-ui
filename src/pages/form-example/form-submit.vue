<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">表单提交方式</text>
            <text class="example-page__header-desc">演示不同的表单提交方法</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">使用submitForm方法提交</view>
            <view class="example-form-wrapper">
                <fanc-form
                    ref="directSubmitForm"
                    :model="formData"
                    :rules="formRules"
                    :scroll-to-error="true"
                    @submit="handleDirectSubmit"
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

                    <view style="height: 20px"></view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="submitFormDirectly"
                            >直接提交表单</fanc-button
                        >
                        <fanc-button style="margin-left: 10px" @click="resetFormDirectly"
                            >重置表单</fanc-button
                        >
                    </view>
                </fanc-form>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">使用表单提交事件</view>
            <view class="example-form-wrapper">
                <form @submit.prevent="handleFormSubmit">
                    <fanc-form
                        ref="eventSubmitForm"
                        :model="eventFormData"
                        :rules="eventFormRules"
                        :scroll-to-error="true"
                        @submit="handleEventSubmit"
                    >
                        <fanc-field
                            v-model="eventFormData.username"
                            label="用户名"
                            name="username"
                            label-width="fixed"
                            required
                            placeholder="请输入用户名"
                        ></fanc-field>

                        <fanc-field
                            v-model="eventFormData.email"
                            label="邮箱"
                            name="email"
                            label-width="fixed"
                            required
                            placeholder="请输入邮箱"
                        ></fanc-field>

                        <view style="height: 20px"></view>

                        <view class="form-buttons">
                            <button type="submit" class="submit-button">使用原生提交按钮</button>
                            <fanc-button style="margin-left: 10px" @click="resetEventForm"
                                >重置表单</fanc-button
                            >
                        </view>
                    </fanc-form>
                </form>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">不同验证触发方式</view>
            <view class="example-form-wrapper">
                <fanc-form
                    ref="triggerForm"
                    :model="triggerFormData"
                    :rules="triggerFormRules"
                    :validate-trigger="validateTrigger"
                    :scroll-to-error="true"
                    @submit="handleTriggerSubmit"
                >
                    <view class="trigger-label">验证触发方式：</view>
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
                        v-model="triggerFormData.content"
                        label="内容"
                        name="content"
                        required
                        placeholder="请输入内容"
                    ></fanc-field>

                    <view style="height: 20px"></view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="submitWithTrigger"
                            >提交表单</fanc-button
                        >
                        <fanc-button style="margin-left: 10px" @click="resetTriggerForm"
                            >重置表单</fanc-button
                        >
                    </view>
                </fanc-form>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 直接提交表单数据
            formData: {
                username: "",
                email: "",
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
            },

            // 事件提交表单数据
            eventFormData: {
                username: "",
                email: "",
            },
            eventFormRules: {
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
            },

            // 验证触发方式表单
            validateTrigger: "blur",
            triggerFormData: {
                content: "",
            },
            triggerFormRules: {
                content: [
                    { required: true, message: "请输入内容" },
                    { min: 5, message: "内容长度不能少于5个字符" },
                ],
            },

            // 提交结果记录
            lastSubmitResult: null,
        };
    },
    methods: {
        // 直接提交表单方法（使用submitForm方法）
        submitFormDirectly() {
            // 直接调用表单组件的submitForm方法
            this.$refs.directSubmitForm.submitForm();
        },
        handleDirectSubmit(result) {
            if (result.valid) {
                uni.showToast({
                    title: "提交成功",
                    icon: "success",
                });
                console.log("提交表单数据:", result.model);
            } else {
                uni.showToast({
                    title: "验证失败",
                    icon: "none",
                });
                console.log("验证失败:", result.invalidFields);
            }
            this.lastSubmitResult = {
                type: "直接提交",
                timestamp: new Date().toLocaleTimeString(),
                result: result,
            };
        },
        resetFormDirectly() {
            this.$refs.directSubmitForm.resetFields();
            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },

        // 使用表单提交事件
        handleFormSubmit(event) {
            // 表单提交事件触发时，手动调用表单组件的submitForm方法
            this.$refs.eventSubmitForm.submitForm(event);
        },
        handleEventSubmit(result) {
            if (result.valid) {
                uni.showToast({
                    title: "提交成功",
                    icon: "success",
                });
                console.log("提交表单数据:", result.model);
            } else {
                uni.showToast({
                    title: "验证失败",
                    icon: "none",
                });
                console.log("验证失败:", result.invalidFields);
            }
            this.lastSubmitResult = {
                type: "事件提交",
                timestamp: new Date().toLocaleTimeString(),
                result: result,
            };
        },
        resetEventForm() {
            this.$refs.eventSubmitForm.resetFields();
            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },

        // 使用不同验证触发方式
        submitWithTrigger() {
            this.$refs.triggerForm.submitForm();
        },
        handleTriggerSubmit(result) {
            if (result.valid) {
                uni.showToast({
                    title: "提交成功",
                    icon: "success",
                });
                console.log("提交表单数据:", result.model);
            } else {
                uni.showToast({
                    title: "验证失败",
                    icon: "none",
                });
                console.log("验证失败:", result.invalidFields);
            }
            this.lastSubmitResult = {
                type: `触发方式: ${this.validateTrigger}`,
                timestamp: new Date().toLocaleTimeString(),
                result: result,
            };
        },
        resetTriggerForm() {
            this.$refs.triggerForm.resetFields();
            uni.showToast({
                title: "表单已重置",
                icon: "none",
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

.submit-button {
    background-color: #2979ff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 14px;
}
</style>
