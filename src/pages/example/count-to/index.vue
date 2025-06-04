<template>
    <view class="count-to-example">
        <fanc-navbar title="数字滚动示例" left-arrow @click-left="goBack"></fanc-navbar>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-count-to :start-val="0" :end-val="3000" :duration="3000"></fanc-count-to>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带前缀和后缀</view>
            <view class="section-content">
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
            <view class="section-content">
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
            <view class="section-content">
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
            <view class="section-content">
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
            <view class="section-content">
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
            <view class="section-content">
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
            <view class="section-content easing-list">
                <view class="easing-item">
                    <text class="easing-name">线性：</text>
                    <fanc-count-to
                        :start-val="0"
                        :end-val="1000"
                        :duration="3000"
                        easing-fn="linear"
                    ></fanc-count-to>
                </view>
                <view class="easing-item">
                    <text class="easing-name">缓入：</text>
                    <fanc-count-to
                        :start-val="0"
                        :end-val="1000"
                        :duration="3000"
                        easing-fn="easeIn"
                    ></fanc-count-to>
                </view>
                <view class="easing-item">
                    <text class="easing-name">缓出：</text>
                    <fanc-count-to
                        :start-val="0"
                        :end-val="1000"
                        :duration="3000"
                        easing-fn="easeOut"
                    ></fanc-count-to>
                </view>
                <view class="easing-item">
                    <text class="easing-name">缓入缓出：</text>
                    <fanc-count-to
                        :start-val="0"
                        :end-val="1000"
                        :duration="3000"
                        easing-fn="easeInOut"
                    ></fanc-count-to>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">控制滚动</view>
            <view class="section-content">
                <fanc-count-to
                    ref="countTo"
                    :start-val="0"
                    :end-val="8888"
                    :duration="3000"
                    :autoplay="false"
                    @finished="onFinished"
                ></fanc-count-to>
                <view class="control-buttons">
                    <fanc-button size="small" type="primary" @click="start">开始</fanc-button>
                    <fanc-button size="small" type="info" @click="pause">暂停</fanc-button>
                    <fanc-button size="small" type="success" @click="resume">继续</fanc-button>
                    <fanc-button size="small" type="warning" @click="reset">重置</fanc-button>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义插槽</view>
            <view class="section-content custom-slot">
                <fanc-count-to
                    :start-val="0"
                    :end-val="100"
                    :duration="3000"
                    type="custom"
                >
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
        goBack() {
            uni.navigateBack();
        },
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
.count-to-example {
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

.easing-list {
    flex-direction: column;
    align-items: flex-start;
}

.easing-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.easing-name {
    width: 80px;
    font-size: 14px;
    color: #323233;
}

.custom-slot {
    flex-direction: column;
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
    background-color: #4a6cf7;
    border-radius: 5px;
    transition: width 0.3s;
}

.custom-count-to__text {
    font-size: 16px;
    font-weight: bold;
    color: #4a6cf7;
}
</style> 