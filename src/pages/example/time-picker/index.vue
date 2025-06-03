<template>
    <view class="example-page">
        <view class="header">
            <text class="header__title">时间选择器</text>
            <text class="header__desc">用于选择时间，支持小时、分钟、秒的选择</text>
        </view>

        <fanc-cell-group title="基础用法">
            <fanc-cell title="选择时间" :value="time1" @click="showTimePicker1 = true" is-link />
        </fanc-cell-group>

        <fanc-cell-group title="显示秒选择器">
            <fanc-cell title="选择时间" :value="time2" @click="showTimePicker2 = true" is-link />
        </fanc-cell-group>

        <fanc-cell-group title="设置步进值">
            <fanc-cell title="选择时间" :value="time3" @click="showTimePicker3 = true" is-link />
        </fanc-cell-group>

        <fanc-cell-group title="限制小时范围">
            <fanc-cell title="选择时间" :value="time4" @click="showTimePicker4 = true" is-link />
        </fanc-cell-group>

        <fanc-cell-group title="自定义后缀">
            <fanc-cell title="选择时间" :value="time5" @click="showTimePicker5 = true" is-link />
        </fanc-cell-group>

        <fanc-cell-group title="禁用状态">
            <fanc-cell title="选择时间" value="禁用状态" />
            <view class="disabled-example">
                <fanc-time-picker disabled />
            </view>
        </fanc-cell-group>

        <!-- 基础用法 -->
        <fanc-time-picker v-model="showTimePicker1" :value="time1" @confirm="onConfirm1" />

        <!-- 显示秒选择器 -->
        <fanc-time-picker
            v-model="showTimePicker2"
            :value="time2"
            show-seconds
            format="HH:mm:ss"
            @confirm="onConfirm2"
        />

        <!-- 设置步进值 -->
        <fanc-time-picker
            v-model="showTimePicker3"
            :value="time3"
            :minute-step="10"
            :second-step="15"
            show-seconds
            format="HH:mm:ss"
            @confirm="onConfirm3"
        />

        <!-- 限制小时范围 -->
        <fanc-time-picker
            v-model="showTimePicker4"
            :value="time4"
            :min-hour="9"
            :max-hour="18"
            @confirm="onConfirm4"
        />

        <!-- 自定义后缀 -->
        <fanc-time-picker
            v-model="showTimePicker5"
            :value="time5"
            hour-suffix="h"
            minute-suffix="m"
            second-suffix="s"
            show-seconds
            format="HH:mm:ss"
            @confirm="onConfirm5"
        />
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
.example-page {
    padding: 20px 0;
    min-height: 100vh;
    background-color: #f7f8fa;
}

.header {
    padding: 0 16px;
    margin-bottom: 20px;
}

.header__title {
    display: block;
    font-size: 22px;
    font-weight: 600;
    color: #323233;
    margin-bottom: 8px;
}

.header__desc {
    display: block;
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
}

.disabled-example {
    padding: 16px;
    background-color: #fff;
}
</style>
