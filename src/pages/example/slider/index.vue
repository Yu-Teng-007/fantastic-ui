<template>
    <view class="container">
        <view class="header">
            <view class="title">滑动选择器</view>
            <view class="subtitle">用于选择横轴上的数值、区间、档位</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-slider v-model="value1" @change="onChange"></fanc-slider>
            </view>
        </view>

        <!-- 显示当前值 -->
        <view class="section">
            <view class="section-title">显示当前值</view>
            <view class="section-content">
                <fanc-slider v-model="value2" show-value @change="onChange"></fanc-slider>
            </view>
        </view>

        <!-- 设置步长 -->
        <view class="section">
            <view class="section-title">设置步长</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value3"
                    :step="10"
                    show-value
                    @change="onChange"
                ></fanc-slider>
            </view>
        </view>

        <!-- 设置范围 -->
        <view class="section">
            <view class="section-title">设置范围</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value4"
                    :min="-50"
                    :max="50"
                    show-value
                    @change="onChange"
                ></fanc-slider>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value5"
                    active-color="#ee0a24"
                    inactive-color="#f2f3f5"
                    show-value
                    @change="onChange"
                ></fanc-slider>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="section-content">
                <fanc-slider v-model="value6" disabled show-value></fanc-slider>
            </view>
        </view>

        <!-- 自定义按钮 -->
        <view class="section">
            <view class="section-title">自定义按钮</view>
            <view class="section-content">
                <fanc-slider v-model="value7" show-value>
                    <template #thumb>
                        <view class="custom-thumb">
                            {{ value7 }}
                        </view>
                    </template>
                </fanc-slider>
            </view>
        </view>

        <!-- 垂直方向 -->
        <view class="section">
            <view class="section-title">垂直方向</view>
            <view class="vertical-slider-container">
                <view class="vertical-slider">
                    <fanc-slider
                        v-model="value8"
                        active-color="#ee0a24"
                        @change="onChange"
                    ></fanc-slider>
                </view>
                <view class="vertical-value">{{ value8 }}</view>
            </view>
        </view>

        <!-- 双向滑块 -->
        <view class="section">
            <view class="section-title">双滑块用法</view>
            <view class="section-content">
                <view class="dual-slider">
                    <fanc-slider
                        v-model="minValue"
                        :max="maxValue"
                        @change="onMinChange"
                    ></fanc-slider>
                    <fanc-slider
                        v-model="maxValue"
                        :min="minValue"
                        @change="onMaxChange"
                    ></fanc-slider>
                    <view class="dual-slider-value">
                        <text>{{ minValue }}</text>
                        <text>{{ maxValue }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value1: 50,
            value2: 30,
            value3: 40,
            value4: 0,
            value5: 70,
            value6: 20,
            value7: 60,
            value8: 40,
            minValue: 20,
            maxValue: 80,
        };
    },
    methods: {
        onChange(value) {
            this.$toast.text(`当前值：${value}`);
        },
        onMinChange(value) {
            this.minValue = value;
            if (this.maxValue < value) {
                this.maxValue = value;
            }
        },
        onMaxChange(value) {
            this.maxValue = value;
            if (this.minValue > value) {
                this.minValue = value;
            }
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

.custom-thumb {
    width: 26px;
    height: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 26px;
    text-align: center;
    background-color: #007bff;
    border-radius: 100%;
}

.vertical-slider-container {
    display: flex;
    align-items: center;
    padding: 16px;
    height: 200px;
}

.vertical-slider {
    height: 100%;
    transform: rotate(-90deg);
    width: 200px;
    transform-origin: left center;
    margin-left: 30px;
}

.vertical-value {
    margin-left: 50px;
    font-size: 16px;
    color: #323233;
}

.dual-slider {
    position: relative;
    padding: 20px 0;
}

.dual-slider-value {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #323233;
}
</style>
