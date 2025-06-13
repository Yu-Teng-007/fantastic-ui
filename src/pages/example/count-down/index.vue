<template>
    <view class="container">
        <view class="header">
            <view class="title">倒计时</view>
            <view class="subtitle">用于展示倒计时的计时器组件</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-count-down :time="time"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">方形底样式</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="square"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">圆形底样式</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="circle"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带单位样式</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="text"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">无底色带单位样式</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="plain"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="square" color="#fff" background-color="#f44336">
                </fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">毫秒级渲染</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="square" millisecond> </fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">控制倒计时</view>
            <view class="demo-block">
                <fanc-count-down
                    ref="countDown"
                    :time="time"
                    :auto-start="false"
                    type="square"
                    @finish="onFinish"
                >
                </fanc-count-down>
                <view class="button-group">
                    <button class="button button-primary" @click="start">开始</button>
                    <button class="button button-info" @click="pause">暂停</button>
                    <button class="button button-warning" @click="reset">重置</button>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义格式</view>
            <view class="demo-block">
                <fanc-count-down :time="time" type="custom">
                    <template v-slot="timeData">
                        <text class="custom-time">{{ timeData.timeData.hours }}</text>
                        <text class="custom-colon">:</text>
                        <text class="custom-time">{{ timeData.timeData.minutes }}</text>
                        <text class="custom-colon">:</text>
                        <text class="custom-time">{{ timeData.timeData.seconds }}</text>
                    </template>
                </fanc-count-down>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            time: 3 * 60 * 60 * 1000, // 3小时倒计时
        };
    },
    methods: {
        start() {
            this.$refs.countDown.start();
        },
        pause() {
            this.$refs.countDown.pause();
        },
        reset() {
            this.$refs.countDown.reset();
        },
        onFinish() {
            this.$toast.success("倒计时结束");
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

.demo-block {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.button-group {
    display: flex;
    margin-top: 16px;
    gap: 12px;
}

.button {
    flex: 1;
    height: 36px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    color: #fff;
}

.button-primary {
    background-color: #1989fa;
}

.button-info {
    background-color: #909399;
}

.button-warning {
    background-color: #ff976a;
}

.custom-time {
    display: inline-block;
    padding: 8px 12px;
    background-color: #323233;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-radius: 4px;
    min-width: 30px;
    text-align: center;
}

.custom-colon {
    margin: 0 4px;
    color: #323233;
    font-size: 18px;
    font-weight: bold;
}
</style>
