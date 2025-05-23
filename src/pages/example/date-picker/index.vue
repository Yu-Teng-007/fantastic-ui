<template>
    <view class="container">
        <view class="header">
            <view class="title">日期选择器</view>
            <view class="subtitle">用于选择年、月、日，通常与弹出层组件配合使用</view>
        </view>

        <!-- 基本使用 -->
        <view class="section">
            <view class="section-title">基本使用</view>
            <view class="cell" @click="showBasicPicker = true">
                <view class="cell-title">选择日期</view>
                <view class="cell-value">{{ basicDate || "请选择" }}</view>
                <view class="cell-arrow">
                    <text class="arrow-icon">></text>
                </view>
            </view>
            <fanc-date-picker
                v-model="showBasicPicker"
                :default-date="basicDateTimestamp"
                @confirm="onBasicConfirm"
            />
        </view>

        <!-- 自定义类型 -->
        <view class="section">
            <view class="section-title">自定义类型</view>

            <view class="cell" @click="showYearMonthPicker = true">
                <view class="cell-title">年月选择</view>
                <view class="cell-value">{{ yearMonthDate || "请选择" }}</view>
                <view class="cell-arrow">
                    <text class="arrow-icon">></text>
                </view>
            </view>
            <fanc-date-picker
                v-model="showYearMonthPicker"
                type="year-month"
                title="选择年月"
                :default-date="yearMonthDateTimestamp"
                @confirm="onYearMonthConfirm"
            />

            <view class="cell" @click="showMonthDayPicker = true">
                <view class="cell-title">月日选择</view>
                <view class="cell-value">{{ monthDayDate || "请选择" }}</view>
                <view class="cell-arrow">
                    <text class="arrow-icon">></text>
                </view>
            </view>
            <fanc-date-picker
                v-model="showMonthDayPicker"
                type="month-day"
                title="选择月日"
                :default-date="monthDayDateTimestamp"
                @confirm="onMonthDayConfirm"
            />

            <view class="cell" @click="showYearPicker = true">
                <view class="cell-title">年份选择</view>
                <view class="cell-value">{{ yearDate || "请选择" }}</view>
                <view class="cell-arrow">
                    <text class="arrow-icon">></text>
                </view>
            </view>
            <fanc-date-picker
                v-model="showYearPicker"
                type="year"
                title="选择年份"
                :default-date="yearDateTimestamp"
                @confirm="onYearConfirm"
            />
        </view>

        <!-- 自定义日期范围 -->
        <view class="section">
            <view class="section-title">自定义日期范围</view>
            <view class="cell" @click="showRangePicker = true">
                <view class="cell-title">限制范围</view>
                <view class="cell-value">{{ rangeDate || "请选择(2022-2025年)" }}</view>
                <view class="cell-arrow">
                    <text class="arrow-icon">></text>
                </view>
            </view>
            <fanc-date-picker
                v-model="showRangePicker"
                title="选择日期"
                :min-date="minDate"
                :max-date="maxDate"
                :default-date="rangeDateTimestamp"
                @confirm="onRangeConfirm"
            />
        </view>

        <!-- 自定义文本后缀 -->
        <view class="section">
            <view class="section-title">自定义文本后缀</view>
            <view class="cell" @click="showCustomSuffixPicker = true">
                <view class="cell-title">自定义后缀</view>
                <view class="cell-value">{{ customSuffixDate || "请选择" }}</view>
                <view class="cell-arrow">
                    <text class="arrow-icon">></text>
                </view>
            </view>
            <fanc-date-picker
                v-model="showCustomSuffixPicker"
                title="选择日期"
                year-suffix=""
                month-suffix="/"
                day-suffix=""
                :default-date="customSuffixDateTimestamp"
                @confirm="onCustomSuffixConfirm"
            />
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基本使用
            showBasicPicker: false,
            basicDate: "",
            basicDateTimestamp: new Date().getTime(),

            // 自定义类型
            showYearMonthPicker: false,
            yearMonthDate: "",
            yearMonthDateTimestamp: new Date().getTime(),

            showMonthDayPicker: false,
            monthDayDate: "",
            monthDayDateTimestamp: new Date().getTime(),

            showYearPicker: false,
            yearDate: "",
            yearDateTimestamp: new Date().getTime(),

            // 自定义日期范围
            showRangePicker: false,
            rangeDate: "",
            rangeDateTimestamp: new Date("2023-06-15").getTime(),
            minDate: new Date("2022-01-01").getTime(),
            maxDate: new Date("2025-12-31").getTime(),

            // 自定义文本后缀
            showCustomSuffixPicker: false,
            customSuffixDate: "",
            customSuffixDateTimestamp: new Date().getTime(),
        };
    },
    methods: {
        // 基本使用
        onBasicConfirm(e) {
            this.basicDate = e.text;
            this.basicDateTimestamp = e.value;
        },

        // 自定义类型
        onYearMonthConfirm(e) {
            this.yearMonthDate = e.text;
            this.yearMonthDateTimestamp = e.value;
        },

        onMonthDayConfirm(e) {
            this.monthDayDate = e.text;
            this.monthDayDateTimestamp = e.value;
        },

        onYearConfirm(e) {
            this.yearDate = e.text;
            this.yearDateTimestamp = e.value;
        },

        // 自定义日期范围
        onRangeConfirm(e) {
            this.rangeDate = e.text;
            this.rangeDateTimestamp = e.value;
        },

        // 自定义文本后缀
        onCustomSuffixConfirm(e) {
            this.customSuffixDate = e.text;
            this.customSuffixDateTimestamp = e.value;
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

.cell {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
}

.cell:last-child {
    border-bottom: none;
}

.cell-title {
    flex: 1;
    font-size: 14px;
    color: #323233;
}

.cell-value {
    font-size: 14px;
    color: #969799;
    margin-right: 8px;
}

.cell-arrow {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-icon {
    font-size: 14px;
    color: #c8c9cc;
    transform: rotate(90deg);
}
</style>
