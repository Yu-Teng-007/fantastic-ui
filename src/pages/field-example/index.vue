<template>
    <view class="container">
        <view class="page-title">Field 输入框</view>

        <view class="section-title">基础用法</view>
        <view class="example-block">
            <fanc-field v-model="value" label="文本" placeholder="请输入文本"></fanc-field>
        </view>

        <view class="section-title">输入框类型</view>
        <view class="example-block">
            <fanc-field v-model="text" label="文本" placeholder="请输入文本"></fanc-field>
            <fanc-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
            ></fanc-field>
            <fanc-field
                v-model="number"
                type="number"
                label="数字"
                placeholder="请输入数字"
            ></fanc-field>
            <fanc-field
                v-model="idcard"
                type="idcard"
                label="身份证"
                placeholder="请输入身份证号码"
            ></fanc-field>
            <fanc-field
                v-model="tel"
                type="tel"
                label="手机号"
                placeholder="请输入手机号"
            ></fanc-field>
            <fanc-field
                v-model="message"
                type="textarea"
                label="留言"
                placeholder="请输入留言"
            ></fanc-field>
        </view>

        <view class="section-title">禁用和只读</view>
        <view class="example-block">
            <fanc-field
                v-model="disabled"
                label="禁用"
                disabled
                placeholder="禁用状态"
            ></fanc-field>
            <fanc-field
                v-model="readonly"
                label="只读"
                readonly
                placeholder="只读状态"
            ></fanc-field>
        </view>

        <view class="section-title">必填项和错误提示</view>
        <view class="example-block">
            <fanc-field
                v-model="required"
                label="用户名"
                required
                placeholder="请输入用户名"
            ></fanc-field>
            <fanc-field
                v-model="error"
                label="邮箱"
                placeholder="请输入邮箱"
                error
                error-message="邮箱格式不正确"
            ></fanc-field>
        </view>

        <view class="section-title">图标和清除按钮</view>
        <view class="example-block">
            <fanc-field
                v-model="leftIcon"
                label="用户名"
                left-icon="user"
                placeholder="请输入用户名"
            ></fanc-field>
            <fanc-field
                v-model="rightIcon"
                label="搜索"
                right-icon="search"
                placeholder="请输入搜索关键词"
            ></fanc-field>
            <fanc-field
                v-model="clearable"
                label="输入内容"
                clearable
                placeholder="可清除内容"
            ></fanc-field>
        </view>

        <view class="section-title">字数统计</view>
        <view class="example-block">
            <fanc-field
                v-model="wordLimit"
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                maxlength="50"
                show-word-limit
            ></fanc-field>
        </view>

        <view class="section-title">自动高度</view>
        <view class="example-block">
            <fanc-field
                v-model="autoHeight"
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                auto-height
            ></fanc-field>
        </view>

        <view class="section-title">输入对齐方式</view>
        <view class="example-block">
            <fanc-field
                v-model="alignLeft"
                label="居左"
                input-align="left"
                placeholder="居左对齐"
            ></fanc-field>
            <fanc-field
                v-model="alignCenter"
                label="居中"
                input-align="center"
                placeholder="居中对齐"
            ></fanc-field>
            <fanc-field
                v-model="alignRight"
                label="居右"
                input-align="right"
                placeholder="居右对齐"
            ></fanc-field>
        </view>

        <view class="section-title">插槽用法</view>
        <view class="example-block">
            <fanc-field v-model="slots" placeholder="请输入金额">
                <!-- 自定义标签 -->
                <template #label>
                    <text style="color: var(--fanc-primary-color)">金额</text>
                </template>

                <!-- 输入框前内容 -->
                <template #input-prefix>
                    <text style="margin-right: 4px">¥</text>
                </template>

                <!-- 输入框后内容 -->
                <template #input-suffix>
                    <text style="margin-left: 4px">元</text>
                </template>
            </fanc-field>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            text: "",
            password: "",
            number: "",
            idcard: "",
            tel: "",
            message: "",
            disabled: "禁用状态",
            readonly: "只读状态",
            required: "",
            error: "",
            leftIcon: "",
            rightIcon: "",
            clearable: "",
            wordLimit: "",
            autoHeight: "",
            alignLeft: "",
            alignCenter: "",
            alignRight: "",
            slots: "",
        };
    },
};
</script>

<style lang="scss">
@import "@/styles/example-pages.scss";

.container {
    padding: 20px;
}

.page-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.section-title {
    margin: 20px 0 10px;
    font-size: 16px;
    font-weight: bold;
}

.example-block {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
}
</style>
