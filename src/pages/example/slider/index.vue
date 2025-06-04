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

        <!-- 显示范围值 -->
        <view class="section">
            <view class="section-title">显示范围值</view>
            <view class="section-content">
                <fanc-slider v-model="value3" show-extremities @change="onChange"></fanc-slider>
            </view>
        </view>

        <!-- 显示所有值 -->
        <view class="section">
            <view class="section-title">显示所有值</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value4"
                    show-value
                    show-extremities
                    @change="onChange"
                ></fanc-slider>
            </view>
        </view>

        <!-- 设置步长 -->
        <view class="section">
            <view class="section-title">设置步长</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value5"
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
                    v-model="value6"
                    :min="-50"
                    :max="50"
                    show-value
                    show-extremities
                    @change="onChange"
                ></fanc-slider>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value7"
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
                <fanc-slider v-model="value8" disabled show-value></fanc-slider>
            </view>
        </view>

        <!-- 自定义按钮 -->
        <view class="section">
            <view class="section-title">自定义按钮</view>
            <view class="section-content">
                <fanc-slider v-model="value9" show-value>
                    <template #thumb>
                        <view class="custom-thumb">
                            {{ value9 }}
                        </view>
                    </template>
                </fanc-slider>
            </view>
        </view>

        <!-- 显示刻度 -->
        <view class="section">
            <view class="section-title">显示刻度</view>
            <view class="section-content">
                <fanc-slider
                    v-model="value10"
                    show-ticks
                    show-tick-labels
                    :tick-count="5"
                    @change="onChange"
                ></fanc-slider>
            </view>
        </view>

        <!-- 垂直方向 -->
        <view class="section">
            <view class="section-title">垂直方向</view>
            <view class="vertical-slider-container">
                <view class="vertical-slider">
                    <fanc-slider
                        v-model="value11"
                        active-color="#ee0a24"
                        vertical
                        show-value
                        @change="onChange"
                    ></fanc-slider>
                </view>
            </view>
        </view>

        <!-- 双滑块用法 -->
        <view class="section">
            <view class="section-title">双滑块用法</view>
            <view class="section-content">
                <view class="range-slider">
                    <fanc-slider
                        v-model="rangeValue"
                        range
                        active-color="#ff6b00"
                        show-value
                        show-extremities
                        @change="onRangeChange"
                    ></fanc-slider>
                </view>
            </view>
        </view>

        <!-- 自定义双滑块 -->
        <view class="section">
            <view class="section-title">自定义双滑块</view>
            <view class="section-content">
                <view class="range-slider">
                    <fanc-slider
                        v-model="customRangeValue"
                        range
                        active-color="#007bff"
                        @change="onRangeChange"
                    >
                        <template #left-thumb>
                            <view class="custom-thumb custom-thumb--left">
                                {{ customRangeValue[0] }}
                            </view>
                        </template>
                        <template #thumb>
                            <view class="custom-thumb custom-thumb--right">
                                {{ customRangeValue[1] }}
                            </view>
                        </template>
                    </fanc-slider>
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
            value4: 60,
            value5: 40,
            value6: 0,
            value7: 70,
            value8: 20,
            value9: 60,
            value10: 50,
            value11: 40,
            rangeValue: [36, 80],
            customRangeValue: [20, 60],
        };
    },
    methods: {
        onChange(value) {
            this.$toast.text(`当前值：${value}`);
        },
        onRangeChange(value) {
            this.$toast.text(`当前范围：${value[0]}-${value[1]}`);
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
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.custom-thumb--left {
    background-color: #007bff;
}

.custom-thumb--right {
    background-color: #28a745;
}

.vertical-slider-container {
    display: flex;
    align-items: center;
    padding: 16px;
    height: 200px;
}

.vertical-slider {
    height: 100%;
    width: 40px;
}

.range-slider {
    padding: 20px 0;
    position: relative;
}

.range-value {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #323233;
}
</style>
