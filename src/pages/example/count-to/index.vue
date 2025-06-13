<template>
    <view class="container">
        <view class="header">
            <view class="title">数字滚动</view>
            <view class="subtitle">用于展示数字从初始值到目标值的连续变化过程</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-count-to :start-val="0" :end-val="3000" :duration="3000"></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带前缀和后缀</view>
            <view class="demo-block">
                <fanc-count-to
                    :start-val="0"
                    :end-val="8888"
                    :duration="3000"
                    type="addon"
                    prefix="¥"
                    suffix="元"
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">使用千分位分隔符</view>
            <view class="demo-block">
                <fanc-count-to
                    :start-val="0"
                    :end-val="12345678"
                    :duration="3000"
                    separator=","
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">小数点精度</view>
            <view class="demo-block">
                <fanc-count-to
                    :start-val="0"
                    :end-val="3.1415926"
                    :duration="3000"
                    :decimals="4"
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带背景样式</view>
            <view class="demo-block">
                <fanc-count-to
                    :start-val="0"
                    :end-val="9527"
                    :duration="3000"
                    type="bg"
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">圆形背景样式</view>
            <view class="demo-block">
                <fanc-count-to
                    :start-val="0"
                    :end-val="99"
                    :duration="3000"
                    type="circle"
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="demo-block">
                <fanc-count-to
                    :start-val="0"
                    :end-val="6666"
                    :duration="3000"
                    color="#f44336"
                    :font-size="30"
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">不同的缓动效果</view>
            <view class="demo-block">
                <view class="subsection-title">线性</view>
                <fanc-count-to
                    :start-val="0"
                    :end-val="1000"
                    :duration="3000"
                    easing-fn="linear"
                ></fanc-count-to>

                <view class="subsection-title">缓入</view>
                <fanc-count-to
                    :start-val="0"
                    :end-val="1000"
                    :duration="3000"
                    easing-fn="easeIn"
                ></fanc-count-to>

                <view class="subsection-title">缓出</view>
                <fanc-count-to
                    :start-val="0"
                    :end-val="1000"
                    :duration="3000"
                    easing-fn="easeOut"
                ></fanc-count-to>

                <view class="subsection-title">缓入缓出</view>
                <fanc-count-to
                    :start-val="0"
                    :end-val="1000"
                    :duration="3000"
                    easing-fn="easeInOut"
                ></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">控制滚动</view>
            <view class="demo-block">
                <fanc-count-to
                    ref="countTo"
                    :start-val="0"
                    :end-val="8888"
                    :duration="3000"
                    :autoplay="false"
                    @finished="onFinished"
                ></fanc-count-to>
                <view class="button-group">
                    <button class="button button-primary" @click="start">开始</button>
                    <button class="button button-info" @click="pause">暂停</button>
                    <button class="button button-success" @click="resume">继续</button>
                    <button class="button button-warning" @click="reset">重置</button>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义插槽</view>
            <view class="demo-block">
                <fanc-count-to :start-val="0" :end-val="100" :duration="3000" type="custom">
                    <template v-slot="{ displayValue }">
                        <view class="custom-count-to">
                            <view class="custom-count-to__progress">
                                <view
                                    class="custom-count-to__bar"
                                    :style="{ width: displayValue + '%' }"
                                ></view>
                            </view>
                            <text class="custom-count-to__text">{{ displayValue }}%</text>
                        </view>
                    </template>
                </fanc-count-to>
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
        start() {
            this.$refs.countTo.start();
        },
        pause() {
            this.$refs.countTo.pause();
        },
        resume() {
            this.$refs.countTo.resume();
        },
        reset() {
            this.$refs.countTo.reset();
        },
        onFinished() {
            this.$toast.success("滚动完成");
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
}

.subsection-title {
    font-size: 14px;
    color: #969799;
    margin: 16px 0 8px;
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

.button-success {
    background-color: #07c160;
}

.button-warning {
    background-color: #ff976a;
}

.custom-count-to {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.custom-count-to__progress {
    width: 100%;
    height: 10px;
    background-color: #f2f3f5;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 8px;
}

.custom-count-to__bar {
    height: 100%;
    background-color: #1989fa;
    border-radius: 5px;
    transition: width 0.3s;
}

.custom-count-to__text {
    font-size: 16px;
    font-weight: bold;
    color: #1989fa;
}
</style>
