<template>
    <view class="content">
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
            <navigator url="/pages/message-example/index" class="nav-button">
                <text class="nav-text">查看消息通知示例</text>
            </navigator>
            <navigator url="/pages/noticebar-example/index" class="nav-button">
                <text class="nav-text">查看公告栏示例</text>
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
    padding: 16px;
    background-color: #f7f8fa;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 100rpx auto 40rpx auto;
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(0, 123, 255, 0.15);
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 40rpx;
    color: #323233;
    font-weight: 600;
    margin-bottom: 60rpx;
}

.nav-section {
    margin-top: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    width: 100%;
    padding: 0 30rpx;
}

.nav-button {
    background-color: #007bff;
    color: white;
    padding: 24rpx 40rpx;
    border-radius: 8rpx;
    text-align: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 123, 255, 0.2);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 500rpx;
    position: relative;
    overflow: hidden;
}

.nav-button:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 6rpx rgba(0, 123, 255, 0.2);
    background-color: #0069d9;
}

.nav-text {
    font-size: 32rpx;
    font-weight: 500;
    position: relative;
    z-index: 1;
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
        opacity: 0.7;
    }
    50% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0.95);
        opacity: 0.7;
    }
}

.nav-button:nth-child(1) {
    background-color: #007bff;
}

.nav-button:nth-child(2) {
    background-color: #28a745;
}

.nav-button:nth-child(3) {
    background-color: #fd7e14;
}

.nav-button:nth-child(4) {
    background-color: #dc3545;
}

.nav-button:nth-child(5) {
    background-color: #6610f2;
}

.nav-button:nth-child(6) {
    background-color: #17a2b8;
}
</style>
