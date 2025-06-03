<template>
    <view class="count-down-example">
        <fanc-navbar title="倒计时示例" left-arrow @click-left="goBack"></fanc-navbar>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-count-down :time="time"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">方形底样式</view>
            <view class="section-content">
                <fanc-count-down :time="time" type="square"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">圆形底样式</view>
            <view class="section-content">
                <fanc-count-down :time="time" type="circle"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带单位样式</view>
            <view class="section-content">
                <fanc-count-down :time="time" type="text"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">无底色带单位样式</view>
            <view class="section-content">
                <fanc-count-down :time="time" type="plain"></fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="section-content">
                <fanc-count-down :time="time" type="square" color="#fff" background-color="#f44336">
                </fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">毫秒级渲染</view>
            <view class="section-content">
                <fanc-count-down :time="time" type="square" millisecond> </fanc-count-down>
            </view>
        </view>

        <view class="section">
            <view class="section-title">控制倒计时</view>
            <view class="section-content">
                <fanc-count-down
                    ref="countDown"
                    :time="time"
                    :auto-start="false"
                    type="square"
                    @finish="onFinish"
                >
                </fanc-count-down>
                <view class="control-buttons">
                    <fanc-button size="small" type="primary" @click="start">开始</fanc-button>
                    <fanc-button size="small" type="info" @click="pause">暂停</fanc-button>
                    <fanc-button size="small" type="warning" @click="reset">重置</fanc-button>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义格式</view>
            <view class="section-content custom-slot">
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
        goBack() {
            uni.navigateBack();
        },
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
.count-down-example {
    padding-bottom: 40px;
}

.section {
    margin: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #323233;
}

.section-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}

.control-buttons {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.control-buttons .fanc-button {
    margin: 0 8px;
}

.custom-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
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
