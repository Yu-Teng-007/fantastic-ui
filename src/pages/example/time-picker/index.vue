<template>
    <view class="container">
        <view class="header">
            <view class="title">时间选择器</view>
            <view class="subtitle">用于选择时间，支持小时、分钟、秒的选择</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell-group>
                <fanc-cell
                    title="选择时间"
                    :content="time1"
                    @click="showTimePicker1 = true"
                    is-link
                />
            </fanc-cell-group>
            <fanc-time-picker v-model="showTimePicker1" :content="time1" @confirm="onConfirm1" />
        </view>

        <!-- 显示秒选择器 -->
        <view class="section">
            <view class="section-title">显示秒选择器</view>
            <fanc-cell-group>
                <fanc-cell
                    title="选择时间"
                    :content="time2"
                    @click="showTimePicker2 = true"
                    is-link
                />
            </fanc-cell-group>
            <fanc-time-picker
                v-model="showTimePicker2"
                :content="time2"
                show-seconds
                format="HH:mm:ss"
                @confirm="onConfirm2"
            />
        </view>

        <!-- 设置步进值 -->
        <view class="section">
            <view class="section-title">设置步进值</view>
            <fanc-cell-group>
                <fanc-cell
                    title="选择时间"
                    :content="time3"
                    @click="showTimePicker3 = true"
                    is-link
                />
            </fanc-cell-group>
            <fanc-time-picker
                v-model="showTimePicker3"
                :content="time3"
                :minute-step="10"
                :second-step="15"
                show-seconds
                format="HH:mm:ss"
                @confirm="onConfirm3"
            />
        </view>

        <!-- 限制小时范围 -->
        <view class="section">
            <view class="section-title">限制小时范围</view>
            <fanc-cell-group>
                <fanc-cell
                    title="选择时间"
                    :content="time4"
                    @click="showTimePicker4 = true"
                    is-link
                />
            </fanc-cell-group>
            <fanc-time-picker
                v-model="showTimePicker4"
                :content="time4"
                :min-hour="9"
                :max-hour="18"
                @confirm="onConfirm4"
            />
        </view>

        <!-- 自定义后缀 -->
        <view class="section">
            <view class="section-title">自定义后缀</view>
            <fanc-cell-group>
                <fanc-cell
                    title="选择时间"
                    :content="time5"
                    @click="showTimePicker5 = true"
                    is-link
                />
            </fanc-cell-group>
            <fanc-time-picker
                v-model="showTimePicker5"
                :content="time5"
                hour-suffix="h"
                minute-suffix="m"
                second-suffix="s"
                show-seconds
                format="HH:mm:ss"
                @confirm="onConfirm5"
            />
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <fanc-cell-group>
                <fanc-cell title="选择时间" content="禁用状态" />
            </fanc-cell-group>
            <view class="disabled-example">
                <fanc-time-picker disabled />
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            showTimePicker1: false,
            showTimePicker2: false,
            showTimePicker3: false,
            showTimePicker4: false,
            showTimePicker5: false,
            time1: "12:30",
            time2: "12:30:15",
            time3: "12:30:15",
            time4: "12:30",
            time5: "12:30:15",
        };
    },
    methods: {
        onConfirm1(time) {
            this.time1 = time;
            this.$toast.text(`选择的时间：${time}`);
        },
        onConfirm2(time) {
            this.time2 = time;
            this.$toast.text(`选择的时间：${time}`);
        },
        onConfirm3(time) {
            this.time3 = time;
            this.$toast.text(`选择的时间：${time}`);
        },
        onConfirm4(time) {
            this.time4 = time;
            this.$toast.text(`选择的时间：${time}`);
        },
        onConfirm5(time) {
            this.time5 = time;
            this.$toast.text(`选择的时间：${time}`);
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
</style>
