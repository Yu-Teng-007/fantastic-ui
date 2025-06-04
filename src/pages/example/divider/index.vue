<template>
    <view class="container">
        <view class="header">
            <view class="title">分割线</view>
            <view class="subtitle">区隔内容的分割线，一般用于页面底部"没有更多"的提示</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="divider-demo">
                <fanc-divider></fanc-divider>
            </view>
        </view>

        <!-- 展示文本 -->
        <view class="section">
            <view class="section-title">展示文本</view>
            <view class="divider-demo">
                <fanc-divider>文本</fanc-divider>
            </view>
        </view>

        <!-- 内容位置 -->
        <view class="section">
            <view class="section-title">内容位置</view>
            <view class="divider-demo">
                <fanc-divider position="left">左侧内容</fanc-divider>
                <fanc-divider position="center">居中内容</fanc-divider>
                <fanc-divider position="right">右侧内容</fanc-divider>
            </view>
        </view>

        <!-- 虚线类型 -->
        <view class="section">
            <view class="section-title">虚线类型</view>
            <view class="divider-demo">
                <fanc-divider dashed>虚线</fanc-divider>
                <fanc-divider type="dotted">点线</fanc-divider>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="divider-demo">
                <fanc-divider borderColor="#1989fa" textColor="#1989fa">自定义颜色</fanc-divider>
                <fanc-divider hairline>细线</fanc-divider>
                <fanc-divider :margin="24">自定义间距</fanc-divider>
            </view>
        </view>

        <!-- 页面底部提示 -->
        <view class="section">
            <view class="section-title">页面底部提示</view>
            <view class="divider-demo">
                <fanc-divider>没有更多了</fanc-divider>
                <fanc-divider>
                    <fanc-icon name="spinner" size="14" style="margin-right: 4px"></fanc-icon>
                    加载中...
                </fanc-divider>
                <fanc-divider>
                    <text @click="handleRefresh" style="color: #1989fa">点击刷新</text>
                </fanc-divider>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleRefresh() {
            this.$toast.text("刷新中...");
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

.divider-demo {
    padding: 16px;
}
</style>
