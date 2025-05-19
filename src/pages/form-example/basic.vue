<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">基础表单</text>
            <text class="example-page__header-desc">演示基础表单的使用方法和布局</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">标准表单</view>
            <view class="example-form-wrapper">
                <fanc-form :model="formData" ref="form1">
                    <fanc-field
                        v-model="formData.username"
                        label="用户名"
                        required
                        name="username"
                        placeholder="请输入用户名"
                        label-width="fixed"
                    ></fanc-field>

                    <fanc-field
                        v-model="formData.password"
                        label="密码"
                        required
                        name="password"
                        type="password"
                        placeholder="请输入密码"
                        label-width="fixed"
                    ></fanc-field>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="handleSubmit">提交</fanc-button>
                        <fanc-button style="margin-left: 10px" @click="handleReset"
                            >重置</fanc-button
                        >
                    </view>
                </fanc-form>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">顶部标签</view>
            <view class="example-form-wrapper">
                <fanc-form :model="formData2" ref="form2">
                    <view class="field-with-top-label">
                        <text class="field-top-label">姓名</text>
                        <fanc-field
                            v-model="formData2.name"
                            name="name"
                            placeholder="请输入姓名"
                            borderless
                        ></fanc-field>
                    </view>

                    <view class="field-with-top-label">
                        <text class="field-top-label">手机号</text>
                        <fanc-field
                            v-model="formData2.phone"
                            name="phone"
                            type="number"
                            placeholder="请输入手机号"
                            borderless
                        ></fanc-field>
                    </view>

                    <view class="field-with-top-label">
                        <text class="field-top-label">备注</text>
                        <fanc-field
                            v-model="formData2.remark"
                            name="remark"
                            type="textarea"
                            placeholder="请输入备注信息"
                            borderless
                        ></fanc-field>
                    </view>

                    <view class="form-buttons">
                        <fanc-button type="primary" @click="handleSubmit2">提交</fanc-button>
                    </view>
                </fanc-form>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">禁用状态</view>
            <view class="example-form-wrapper">
                <fanc-form :model="formData3" :disabled="true" ref="form3">
                    <fanc-field
                        v-model="formData3.username"
                        label="用户名"
                        name="username"
                        label-width="fixed"
                        disabled
                    ></fanc-field>

                    <fanc-field
                        v-model="formData3.email"
                        label="邮箱"
                        name="email"
                        label-width="fixed"
                        disabled
                    ></fanc-field>

                    <view class="form-buttons">
                        <fanc-button type="primary" disabled>提交</fanc-button>
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
            formData: {
                username: "",
                password: "",
            },
            formData2: {
                name: "",
                phone: "",
                remark: "",
            },
            formData3: {
                username: "张三",
                email: "zhangsan@example.com",
            },
        };
    },
    methods: {
        handleSubmit() {
            uni.showToast({
                title: "表单提交成功",
                icon: "success",
            });
            console.log("表单数据:", this.formData);
        },
        handleReset() {
            this.$refs.form1.resetFields();
            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },
        handleSubmit2() {
            uni.showToast({
                title: "表单提交成功",
                icon: "success",
            });
            console.log("表单数据:", this.formData2);
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

.field-with-top-label {
    margin-bottom: 16px;
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 8px 12px;
}

.field-top-label {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
    margin-bottom: 4px;
    display: block;
}
</style>
