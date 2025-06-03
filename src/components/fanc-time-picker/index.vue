<template>
    <view class="fanc-time-picker" :class="{ 'fanc-time-picker--disabled': disabled }">
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
            <view class="fanc-time-picker__header" v-if="showToolbar">
                <view
                    class="fanc-time-picker__cancel"
                    hover-class="fanc-time-picker__cancel--hover"
                    @click="onCancel"
                    >{{ cancelText }}</view
                >
                <view class="fanc-time-picker__title">{{ title }}</view>
                <view
                    class="fanc-time-picker__confirm"
                    hover-class="fanc-time-picker__confirm--hover"
                    @click="onConfirm"
                    >{{ confirmText }}</view
                >
            </view>

            <!-- 选择器主体 -->
            <view class="fanc-time-picker__body" :style="{ height }">
                <picker-view
                    class="fanc-time-picker__view"
                    :value="pickerValue"
                    :indicator-style="indicatorStyle"
                    :mask-style="maskStyle"
                    @change="onChange"
                >
                    <!-- 小时列 -->
                    <picker-view-column>
                        <view
                            class="fanc-time-picker__item"
                            v-for="(hour, index) in hours"
                            :key="index"
                        >
                            {{ formatValue(hour) }}{{ hourSuffix }}
                        </view>
                    </picker-view-column>

                    <!-- 分钟列 -->
                    <picker-view-column>
                        <view
                            class="fanc-time-picker__item"
                            v-for="(minute, index) in minutes"
                            :key="index"
                        >
                            {{ formatValue(minute) }}{{ minuteSuffix }}
                        </view>
                    </picker-view-column>

                    <!-- 秒钟列 -->
                    <picker-view-column v-if="showSeconds">
                        <view
                            class="fanc-time-picker__item"
                            v-for="(second, index) in seconds"
                            :key="index"
                        >
                            {{ formatValue(second) }}{{ secondSuffix }}
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-time-picker 时间选择器
 * @description 时间选择器组件，用于选择小时、分钟、秒，通常与弹出层组件配合使用
 * @property {Boolean} show - 是否显示选择器
 * @property {String} title - 选择器标题
 * @property {String} confirmText - 确认按钮文字
 * @property {String} cancelText - 取消按钮文字
 * @property {Boolean} showToolbar - 是否显示顶部栏
 * @property {Boolean} disabled - 是否禁用
 * @property {String} height - 选择器高度
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} round - 是否圆角
 * @property {String} hourSuffix - 小时后缀
 * @property {String} minuteSuffix - 分钟后缀
 * @property {String} secondSuffix - 秒钟后缀
 * @property {Boolean} closeable - 是否显示关闭图标
 * @property {Number|String} duration - 动画时长，单位为毫秒
 * @property {Boolean} showSeconds - 是否显示秒选择器
 * @property {String} format - 时间格式，支持 HH:mm:ss 和 HH:mm
 * @property {String} value - 当前选中的时间，格式为 HH:mm 或 HH:mm:ss
 * @property {Number} minuteStep - 分钟步进值，默认为1
 * @property {Number} secondStep - 秒钟步进值，默认为1
 * @property {String} minHour - 可选的最小小时，默认为00
 * @property {String} maxHour - 可选的最大小时，默认为23
 * @event {Function} confirm - 点击确认按钮时触发
 * @event {Function} cancel - 点击取消按钮时触发
 * @event {Function} change - 选项变化时触发
 * @event {Function} close - 关闭时触发
 */
export default {
    name: "fanc-time-picker",

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
        // 选择器标题
        title: {
            type: String,
            default: "选择时间",
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
        // 小时后缀
        hourSuffix: {
            type: String,
            default: "时",
        },
        // 分钟后缀
        minuteSuffix: {
            type: String,
            default: "分",
        },
        // 秒钟后缀
        secondSuffix: {
            type: String,
            default: "秒",
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
        // 是否显示秒选择器
        showSeconds: {
            type: Boolean,
            default: false,
        },
        // 时间格式
        format: {
            type: String,
            default: "HH:mm",
            validator: (value) => ["HH:mm", "HH:mm:ss"].includes(value),
        },
        // 当前选中的时间
        value: {
            type: String,
            default: "",
        },
        // 分钟步进值
        minuteStep: {
            type: Number,
            default: 1,
            validator: (val) => val > 0 && val <= 60 && 60 % val === 0,
        },
        // 秒钟步进值
        secondStep: {
            type: Number,
            default: 1,
            validator: (val) => val > 0 && val <= 60 && 60 % val === 0,
        },
        // 可选的最小小时
        minHour: {
            type: [Number, String],
            default: 0,
        },
        // 可选的最大小时
        maxHour: {
            type: [Number, String],
            default: 23,
        },
    },

    data() {
        return {
            showPicker: false,
            pickerValue: [0, 0, 0],
            currentTime: this.value || this.getDefaultTime(),
        };
    },

    computed: {
        // 小时列表
        hours() {
            const min = parseInt(this.minHour);
            const max = parseInt(this.maxHour);
            const hours = [];
            for (let i = min; i <= max; i++) {
                hours.push(i);
            }
            return hours;
        },

        // 分钟列表
        minutes() {
            const minutes = [];
            for (let i = 0; i < 60; i += this.minuteStep) {
                minutes.push(i);
            }
            return minutes;
        },

        // 秒钟列表
        seconds() {
            const seconds = [];
            for (let i = 0; i < 60; i += this.secondStep) {
                seconds.push(i);
            }
            return seconds;
        },

        // 指示器样式
        indicatorStyle() {
            return `height: 44px;`;
        },

        // 蒙层样式
        maskStyle() {
            return `background-size: 100% 88px;`;
        },
    },

    watch: {
        show(val) {
            this.showPicker = val;
            if (val) {
                this.updatePickerValue();
            }
        },
        value(val) {
            this.currentTime = val || this.getDefaultTime();
            if (this.showPicker) {
                this.updatePickerValue();
            }
        },
    },

    created() {
        this.showPicker = this.show;
        if (this.showPicker) {
            this.updatePickerValue();
        }
    },

    methods: {
        // 格式化数值，补零
        formatValue(value) {
            return value < 10 ? `0${value}` : `${value}`;
        },

        // 获取默认时间
        getDefaultTime() {
            const now = new Date();
            const hours = this.formatValue(now.getHours());
            const minutes = this.formatValue(
                Math.floor(now.getMinutes() / this.minuteStep) * this.minuteStep
            );
            const seconds = this.formatValue(
                Math.floor(now.getSeconds() / this.secondStep) * this.secondStep
            );

            return this.showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
        },

        // 更新选择器值
        updatePickerValue() {
            const [hours, minutes, seconds = "00"] = (
                this.currentTime || this.getDefaultTime()
            ).split(":");

            const hourIndex = this.hours.findIndex((item) => this.formatValue(item) === hours);
            const minuteIndex = this.minutes.findIndex(
                (item) => this.formatValue(item) === minutes
            );
            const secondIndex = this.seconds.findIndex(
                (item) => this.formatValue(item) === seconds
            );

            this.pickerValue = [
                hourIndex > -1 ? hourIndex : 0,
                minuteIndex > -1 ? minuteIndex : 0,
                secondIndex > -1 ? secondIndex : 0,
            ];
        },

        // 选择器变化事件
        onChange(e) {
            const { value } = e.detail;
            this.pickerValue = value;

            const hour = this.formatValue(this.hours[value[0]] || 0);
            const minute = this.formatValue(this.minutes[value[1]] || 0);
            const second = this.showSeconds ? this.formatValue(this.seconds[value[2]] || 0) : "00";

            const time = this.showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;

            this.$emit("change", time);
        },

        // 确认事件
        onConfirm() {
            if (this.disabled) return;

            const hour = this.formatValue(this.hours[this.pickerValue[0]] || 0);
            const minute = this.formatValue(this.minutes[this.pickerValue[1]] || 0);
            const second = this.showSeconds
                ? this.formatValue(this.seconds[this.pickerValue[2]] || 0)
                : "00";

            const time = this.showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;

            this.$emit("confirm", time);
            this.$emit("input", time);
            this.onClose();
        },

        // 取消事件
        onCancel() {
            this.$emit("cancel");
            this.onClose();
        },

        // 关闭事件
        onClose() {
            this.showPicker = false;
            this.$emit("update:show", false);
            this.$emit("close");
        },
    },
};
</script>

<style>
.fanc-time-picker {
    position: relative;
}

.fanc-time-picker--disabled {
    opacity: var(--form-disabled-opacity, 0.6);
}

.fanc-time-picker__header {
    display: flex;
    height: 44px;
    line-height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background-color: var(--white, #fff);
    position: relative;
}

.fanc-time-picker__header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--border-color, #ebedf0);
    transform: scaleY(0.5);
}

.fanc-time-picker__title {
    font-weight: 500;
    font-size: 16px;
    color: var(--text-primary, #323233);
}

.fanc-time-picker__cancel,
.fanc-time-picker__confirm {
    padding: 0 16px;
    font-size: 14px;
}

.fanc-time-picker__cancel {
    color: var(--text-secondary, #969799);
}

.fanc-time-picker__cancel--hover {
    opacity: 0.7;
}

.fanc-time-picker__confirm {
    color: var(--fanc-primary-color, #007bff);
}

.fanc-time-picker__confirm--hover {
    opacity: 0.7;
}

.fanc-time-picker__body {
    background-color: var(--white, #fff);
}

.fanc-time-picker__view {
    width: 100%;
    height: 100%;
}

.fanc-time-picker__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    font-size: 16px;
    color: var(--text-primary, #323233);
}
</style>
