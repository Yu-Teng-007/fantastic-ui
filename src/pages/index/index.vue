<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <text class="title">{{ title }}</text>
        </view>

        <view class="nav-section">
            <navigator url="/pages/button-example/button-example" class="nav-button">
                <text class="nav-text">查看按钮示例</text>
            </navigator>
            <navigator url="/pages/icon-example/icon-example" class="nav-button">
                <text class="nav-text">查看图标示例</text>
            </navigator>
            <navigator url="/pages/cell-example/index" class="nav-button">
                <text class="nav-text">查看单元格示例</text>
            </navigator>
            <navigator url="/pages/popup-example/index" class="nav-button">
                <text class="nav-text">查看弹出层示例</text>
            </navigator>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Hello",
        };
    },
    onLoad() {},
    methods: {},
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}

.nav-section {
    margin-top: 50rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    width: 100%;
    padding: 0 30rpx;
}

.nav-button {
    background-color: #007aff;
    color: white;
    padding: 20rpx 40rpx;
    border-radius: 10rpx;
    text-align: center;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
    width: 100%;
    max-width: 400rpx;
}

.nav-button:hover {
    background-color: #0056b3;
}

.nav-text {
    font-size: 32rpx;
}
</style>
