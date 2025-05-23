<template>
    <view class="fanc-date-picker" :class="{ 'fanc-date-picker--disabled': disabled }">
        <fanc-popup
            v-model="showPicker"
            position="bottom"
            :round="round"
            :overlay="overlay"
            :closeable="closeable"
            :duration="duration"
            @close="onClose"
        >
            <!-- 标题栏 -->
            <view class="fanc-date-picker__header" v-if="showToolbar">
                <view
                    class="fanc-date-picker__cancel"
                    hover-class="fanc-date-picker__cancel--hover"
                    @click="onCancel"
                    >{{ cancelText }}</view
                >
                <view class="fanc-date-picker__title">{{ title }}</view>
                <view
                    class="fanc-date-picker__confirm"
                    hover-class="fanc-date-picker__confirm--hover"
                    @click="onConfirm"
                    >{{ confirmText }}</view
                >
            </view>

            <!-- 选择器主体 -->
            <view class="fanc-date-picker__body" :style="{ height }">
                <picker-view
                    class="fanc-date-picker__view"
                    :value="pickerValue"
                    :indicator-style="indicatorStyle"
                    :mask-style="maskStyle"
                    @change="onChange"
                >
                    <!-- 年份列 -->
                    <picker-view-column v-if="type !== 'month-day'">
                        <view
                            class="fanc-date-picker__item"
                            v-for="(year, index) in years"
                            :key="index"
                        >
                            {{ year }}{{ yearSuffix }}
                        </view>
                    </picker-view-column>

                    <!-- 月份列 -->
                    <picker-view-column v-if="type !== 'year'">
                        <view
                            class="fanc-date-picker__item"
                            v-for="(month, index) in months"
                            :key="index"
                        >
                            {{ formatValue(month) }}{{ monthSuffix }}
                        </view>
                    </picker-view-column>

                    <!-- 日期列 -->
                    <picker-view-column v-if="type === 'date' || type === 'month-day'">
                        <view
                            class="fanc-date-picker__item"
                            v-for="(day, index) in days"
                            :key="index"
                        >
                            {{ formatValue(day) }}{{ daySuffix }}
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-date-picker 日期选择器
 * @description 日期选择器组件，用于选择年、月、日，通常与弹出层组件配合使用
 * @property {Boolean} show - 是否显示选择器
 * @property {String} type - 选择器类型，可选值为 date/year-month/month-day/year
 * @property {String} title - 选择器标题
 * @property {String} confirmText - 确认按钮文字
 * @property {String} cancelText - 取消按钮文字
 * @property {Boolean} showToolbar - 是否显示顶部栏
 * @property {Boolean} disabled - 是否禁用
 * @property {String} height - 选择器高度
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} round - 是否圆角
 * @property {String} yearSuffix - 年份后缀
 * @property {String} monthSuffix - 月份后缀
 * @property {String} daySuffix - 日期后缀
 * @property {Boolean} closeable - 是否显示关闭图标
 * @property {Number|String} duration - 动画时长，单位为毫秒
 * @property {String|Number} minDate - 可选的最小日期（时间戳或YYYY-MM-DD格式）
 * @property {String|Number} maxDate - 可选的最大日期（时间戳或YYYY-MM-DD格式）
 * @property {String|Number} defaultDate - 默认选中的日期（时间戳或YYYY-MM-DD格式）
 * @event {Function} confirm - 点击确认按钮时触发
 * @event {Function} cancel - 点击取消按钮时触发
 * @event {Function} change - 选项变化时触发
 * @event {Function} close - 关闭时触发
 */
export default {
    name: "fanc-date-picker",

    model: {
        prop: "show",
        event: "update:show",
    },

    props: {
        // 是否显示选择器
        show: {
            type: Boolean,
            default: false,
        },
        // 选择器类型
        type: {
            type: String,
            default: "date",
            validator: (value) => ["date", "year-month", "month-day", "year"].includes(value),
        },
        // 选择器标题
        title: {
            type: String,
            default: "选择日期",
        },
        // 确认按钮文字
        confirmText: {
            type: String,
            default: "确认",
        },
        // 取消按钮文字
        cancelText: {
            type: String,
            default: "取消",
        },
        // 是否显示顶部栏
        showToolbar: {
            type: Boolean,
            default: true,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 选择器高度
        height: {
            type: String,
            default: "220px",
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否圆角
        round: {
            type: Boolean,
            default: true,
        },
        // 年份后缀
        yearSuffix: {
            type: String,
            default: "年",
        },
        // 月份后缀
        monthSuffix: {
            type: String,
            default: "月",
        },
        // 日期后缀
        daySuffix: {
            type: String,
            default: "日",
        },
        // 是否显示关闭图标
        closeable: {
            type: Boolean,
            default: false,
        },
        // 动画时长
        duration: {
            type: [Number, String],
            default: 300,
        },
        // 可选的最小日期
        minDate: {
            type: [Number, String],
            default: () => {
                const date = new Date();
                date.setFullYear(date.getFullYear() - 10);
                date.setMonth(0);
                date.setDate(1);
                return date.getTime();
            },
        },
        // 可选的最大日期
        maxDate: {
            type: [Number, String],
            default: () => {
                const date = new Date();
                date.setFullYear(date.getFullYear() + 10);
                date.setMonth(11);
                date.setDate(31);
                return date.getTime();
            },
        },
        // 默认选中的日期
        defaultDate: {
            type: [Number, String],
            default: () => new Date().getTime(),
        },
    },

    data() {
        return {
            showPicker: false,
            pickerValue: [0, 0, 0],
            currentDate: new Date().getTime(),
            years: [],
            months: [],
            days: [],
            indicatorStyle: `height: 40px; line-height: 40px; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);`,
            maskStyle: `background-size: 100% 80px;`,
        };
    },

    watch: {
        show: {
            handler(val) {
                this.showPicker = val;
                if (val) {
                    this.initDefaultDate();
                }
            },
            immediate: true,
        },

        defaultDate: {
            handler() {
                this.initDefaultDate();
            },
        },

        minDate: {
            handler() {
                this.initDateData();
            },
        },

        maxDate: {
            handler() {
                this.initDateData();
            },
        },

        type: {
            handler() {
                this.initDateData();
            },
        },
    },

    created() {
        this.initDateData();
    },

    methods: {
        // 格式化为两位数
        formatValue(value) {
            return value < 10 ? `0${value}` : `${value}`;
        },

        // 解析日期
        parseDate(date) {
            if (date === null) {
                return new Date();
            }

            if (typeof date === "string") {
                // 支持YYYY-MM-DD格式
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
                    const parts = date.split("-");
                    const year = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const day = parseInt(parts[2], 10);
                    return new Date(year, month, day);
                }
                return new Date(date);
            }

            if (typeof date === "number") {
                return new Date(date);
            }

            return new Date();
        },

        // 初始化日期数据
        initDateData() {
            const min = this.parseDate(this.minDate);
            const max = this.parseDate(this.maxDate);

            // 初始化年份列表
            this.years = [];
            const minYear = min.getFullYear();
            const maxYear = max.getFullYear();
            for (let i = minYear; i <= maxYear; i++) {
                this.years.push(i);
            }

            // 初始化月份列表
            this.months = [];
            for (let i = 1; i <= 12; i++) {
                this.months.push(i);
            }

            // 初始化日期列表
            this.updateDays();

            // 初始化默认值
            this.initDefaultDate();
        },

        // 更新日期列表
        updateDays(year, month) {
            if (year === undefined) {
                year = this.years[this.pickerValue[0]] || new Date().getFullYear();
            }

            if (month === undefined) {
                month = this.months[this.pickerValue[1]] || new Date().getMonth() + 1;
            }

            const date = new Date(year, month, 0);
            const daysInMonth = date.getDate();

            this.days = [];
            for (let i = 1; i <= daysInMonth; i++) {
                this.days.push(i);
            }
        },

        // 初始化默认日期
        initDefaultDate() {
            const defaultDateObj = this.parseDate(this.defaultDate);
            const defaultYear = defaultDateObj.getFullYear();
            const defaultMonth = defaultDateObj.getMonth() + 1;
            const defaultDay = defaultDateObj.getDate();

            // 更新年份索引
            let yearIndex = 0;
            if (this.type !== "month-day") {
                yearIndex = this.years.findIndex((year) => year === defaultYear);
                yearIndex = yearIndex === -1 ? 0 : yearIndex;
            }

            // 更新月份索引
            let monthIndex = 0;
            if (this.type !== "year") {
                monthIndex = this.months.findIndex((month) => month === defaultMonth);
                monthIndex = monthIndex === -1 ? 0 : monthIndex;
            }

            // 更新日期索引
            let dayIndex = 0;
            if (this.type === "date" || this.type === "month-day") {
                // 确保日期列表已更新
                this.updateDays(defaultYear, defaultMonth);
                dayIndex = this.days.findIndex((day) => day === defaultDay);
                dayIndex = dayIndex === -1 ? 0 : dayIndex;
            }

            // 设置选择器值
            this.currentDate = defaultDateObj.getTime();
            this.pickerValue = [yearIndex, monthIndex, dayIndex];
        },

        // 值变化处理
        onChange(e) {
            const values = e.detail.value;
            this.pickerValue = values;

            let year, month, day;
            const dateObject = new Date(this.currentDate);

            // 根据选择器类型获取年月日
            switch (this.type) {
                case "date":
                    year = this.years[values[0]];
                    month = this.months[values[1]];
                    this.updateDays(year, month);
                    day = this.days[values[2]] || 1;
                    dateObject.setFullYear(year);
                    dateObject.setMonth(month - 1);
                    dateObject.setDate(day);
                    break;

                case "year-month":
                    year = this.years[values[0]];
                    month = this.months[values[1]];
                    dateObject.setFullYear(year);
                    dateObject.setMonth(month - 1);
                    break;

                case "month-day":
                    month = this.months[values[0]];
                    day = this.days[values[1]] || 1;
                    dateObject.setMonth(month - 1);
                    dateObject.setDate(day);
                    break;

                case "year":
                    year = this.years[values[0]];
                    dateObject.setFullYear(year);
                    break;
            }

            this.currentDate = dateObject.getTime();

            // 触发change事件
            this.$emit("change", {
                detail: {
                    value: this.getFormatValue(),
                },
            });
        },

        // 获取格式化的日期值
        getFormatValue() {
            const date = new Date(this.currentDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            let formatValue = "";

            switch (this.type) {
                case "date":
                    formatValue = `${year}-${this.formatValue(month)}-${this.formatValue(day)}`;
                    break;

                case "year-month":
                    formatValue = `${year}-${this.formatValue(month)}`;
                    break;

                case "month-day":
                    formatValue = `${this.formatValue(month)}-${this.formatValue(day)}`;
                    break;

                case "year":
                    formatValue = `${year}`;
                    break;
            }

            return {
                value: this.currentDate,
                text: formatValue,
                year,
                month,
                day,
            };
        },

        // 确认选择
        onConfirm() {
            const value = this.getFormatValue();
            this.$emit("confirm", value);
            this.$emit("update:show", false);
        },

        // 取消选择
        onCancel() {
            this.$emit("cancel");
            this.$emit("update:show", false);
        },

        // 关闭选择器
        onClose() {
            this.$emit("close");
            this.$emit("update:show", false);
        },
    },
};
</script>

<style>
.fanc-date-picker {
    /* 主容器 */
}

.fanc-date-picker--disabled {
    opacity: var(--form-disabled-opacity);
}

.fanc-date-picker__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 16px;
    background-color: var(--bg-white);
    position: relative;
}

.fanc-date-picker__header::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background-color: var(--border-color);
    transform: scaleY(0.5);
}

.fanc-date-picker__title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
    text-align: center;
    flex: 1;
}

.fanc-date-picker__cancel,
.fanc-date-picker__confirm {
    font-size: 14px;
    padding: 0 16px;
    height: 44px;
    line-height: 44px;
}

.fanc-date-picker__cancel {
    color: var(--text-secondary);
}

.fanc-date-picker__confirm {
    color: var(--fanc-primary-color);
}

.fanc-date-picker__cancel--hover,
.fanc-date-picker__confirm--hover {
    opacity: 0.8;
}

.fanc-date-picker__body {
    position: relative;
    background-color: var(--bg-white);
}

.fanc-date-picker__view {
    width: 100%;
    height: 100%;
}

.fanc-date-picker__item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--text-primary);
    height: 40px;
    line-height: 40px;
}
</style>
