<template>
    <view class="container">
        <view class="header">
            <view class="title">警告提示</view>
            <view class="subtitle">用于页面中展示重要的提示信息</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-alert title="信息提示的文案" type="info"></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="成功提示的文案" type="success"></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="警告提示的文案" type="warning"></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="错误提示的文案" type="error"></fanc-alert>
            </view>
        </view>

        <!-- 带有图标 -->
        <view class="section">
            <view class="section-title">带有图标</view>
            <view class="section-content">
                <fanc-alert title="信息提示的文案" type="info" show-icon></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="成功提示的文案" type="success" show-icon></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="警告提示的文案" type="warning" show-icon></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="错误提示的文案" type="error" show-icon></fanc-alert>
            </view>
        </view>

        <!-- 带有辅助性文字介绍 -->
        <view class="section">
            <view class="section-title">带有辅助性文字介绍</view>
            <view class="section-content">
                <fanc-alert
                    title="信息提示的文案"
                    description="信息提示的辅助性文字介绍信息提示的辅助性文字介绍信息提示的辅助性文字介绍"
                    type="info"
                    show-icon
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    title="成功提示的文案"
                    description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
                    type="success"
                    show-icon
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    title="警告提示的文案"
                    description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
                    type="warning"
                    show-icon
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    title="错误提示的文案"
                    description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
                    type="error"
                    show-icon
                ></fanc-alert>
            </view>
        </view>

        <!-- 可关闭的警告提示 -->
        <view class="section">
            <view class="section-title">可关闭的警告提示</view>
            <view class="section-content">
                <fanc-alert
                    v-if="showInfo"
                    title="信息提示的文案"
                    type="info"
                    closable
                    @close="showInfo = false"
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    v-if="showSuccess"
                    title="成功提示的文案"
                    type="success"
                    closable
                    @close="showSuccess = false"
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    v-if="showWarning"
                    title="警告提示的文案"
                    type="warning"
                    closable
                    @close="showWarning = false"
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    v-if="showError"
                    title="错误提示的文案"
                    type="error"
                    closable
                    @close="showError = false"
                ></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-button size="small" @click="resetCloseable">重置</fanc-button>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="section-content">
                <fanc-alert title="圆角提示" type="info" round></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="浅色背景提示" type="success" plain></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert title="居中提示" type="warning" center></fanc-alert>
                <view style="height: 12px"></view>
                <fanc-alert
                    title="组合样式"
                    type="error"
                    show-icon
                    round
                    center
                    closable
                ></fanc-alert>
            </view>
        </view>

        <!-- 使用场景示例 -->
        <view class="section">
            <view class="section-title">使用场景示例</view>
            <view class="section-content">
                <view class="example-block">
                    <view class="example-title">表单验证提示</view>
                    <view class="form-example">
                        <view class="form-item">
                            <text class="form-label">用户名</text>
                            <input class="form-input" placeholder="请输入用户名" />
                        </view>
                        <fanc-alert
                            title="用户名不能为空"
                            type="error"
                            show-icon
                            style="margin-top: 8px"
                        ></fanc-alert>
                    </view>
                </view>

                <view class="example-block">
                    <view class="example-title">系统公告</view>
                    <fanc-alert
                        title="系统升级通知"
                        description="系统将于2023年10月1日22:00-23:00进行升级维护，期间部分功能将不可用，请提前做好准备。"
                        type="info"
                        show-icon
                        closable
                    ></fanc-alert>
                </view>

                <view class="example-block">
                    <view class="example-title">操作结果反馈</view>
                    <fanc-alert
                        title="操作成功"
                        description="您的订单已提交成功，订单号：2023100112345，我们将尽快为您发货。"
                        type="success"
                        show-icon
                    ></fanc-alert>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            showInfo: true,
            showSuccess: true,
            showWarning: true,
            showError: true,
        };
    },
    methods: {
        resetCloseable() {
            this.showInfo = true;
            this.showSuccess = true;
            this.showWarning = true;
            this.showError = true;
            this.$toast.success("已重置");
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

.section-content {
    padding: 16px;
}

.example-block {
    margin-bottom: 20px;
}

.example-block:last-child {
    margin-bottom: 0;
}

.example-title {
    font-size: 14px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 12px;
}

.form-example {
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 16px;
}

.form-item {
    margin-bottom: 8px;
}

.form-label {
    display: block;
    font-size: 14px;
    color: #323233;
    margin-bottom: 8px;
}

.form-input {
    width: 100%;
    height: 40px;
    border: 1px solid #dcdee0;
    border-radius: 4px;
    padding: 0 12px;
    font-size: 14px;
    box-sizing: border-box;
}
</style>
