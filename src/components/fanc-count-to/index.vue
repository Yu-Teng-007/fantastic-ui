<template>
    <view class="fanc-count-to">
        <!-- 默认样式 -->
        <view v-if="type === 'default'" class="fanc-count-to__default">
            <text class="fanc-count-to__text" :style="countToStyle">{{ displayValue }}</text>
        </view>

        <!-- 带前缀和后缀的样式 -->
        <view v-else-if="type === 'addon'" class="fanc-count-to__addon">
            <text v-if="prefix" class="fanc-count-to__prefix">{{ prefix }}</text>
            <text class="fanc-count-to__text" :style="countToStyle">{{ displayValue }}</text>
            <text v-if="suffix" class="fanc-count-to__suffix">{{ suffix }}</text>
        </view>

        <!-- 带背景的样式 -->
        <view v-else-if="type === 'bg'" class="fanc-count-to__bg">
            <text class="fanc-count-to__text" :style="countToStyle">{{ displayValue }}</text>
        </view>

        <!-- 圆形背景样式 -->
        <view v-else-if="type === 'circle'" class="fanc-count-to__circle">
            <text class="fanc-count-to__text" :style="countToStyle">{{ displayValue }}</text>
        </view>

        <!-- 自定义插槽 -->
        <slot v-else :display-value="displayValue"></slot>
    </view>
</template>

<script>
export default {
    name: "FancCountTo",
    props: {
        // 开始值
        startVal: {
            type: [Number, String],
            default: 0,
        },
        // 结束值
        endVal: {
            type: [Number, String],
            default: 0,
        },
        // 持续时间，单位毫秒
        duration: {
            type: [Number, String],
            default: 2000,
        },
        // 数值精度
        decimals: {
            type: [Number, String],
            default: 0,
        },
        // 是否自动开始滚动
        autoplay: {
            type: Boolean,
            default: true,
        },
        // 是否使用千分位分隔符
        separator: {
            type: String,
            default: "",
        },
        // 前缀
        prefix: {
            type: String,
            default: "",
        },
        // 后缀
        suffix: {
            type: String,
            default: "",
        },
        // 动画缓动函数
        // 可选值：linear、easeOut、easeIn、easeInOut
        easingFn: {
            type: String,
            default: "linear",
            validator: (value) => {
                return ["linear", "easeOut", "easeIn", "easeInOut"].includes(value);
            },
        },
        // 滚动类型: default, addon, bg, circle, custom
        type: {
            type: String,
            default: "default",
            validator: (value) => {
                return ["default", "addon", "bg", "circle", "custom"].includes(value);
            },
        },
        // 自定义颜色
        color: {
            type: String,
            default: "",
        },
        // 自定义背景颜色
        backgroundColor: {
            type: String,
            default: "",
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: "",
        },
    },
    data() {
        return {
            displayValue: 0, // 显示的值
            localStartVal: 0, // 本地开始值
            localEndVal: 0, // 本地结束值
            localDuration: 0, // 本地持续时间
            localDecimals: 0, // 本地精度
            rAF: null, // requestAnimationFrame 的 ID
            startTime: null, // 开始时间
            remaining: null, // 剩余时间
            lastFrameTimestamp: null, // 上一帧的时间戳
            frameVal: null, // 当前帧的值
            paused: false, // 是否暂停
        };
    },
    computed: {
        // 计算样式
        countToStyle() {
            const style = {};
            if (this.color) {
                style.color = this.color;
            }
            if (this.backgroundColor) {
                style.backgroundColor = this.backgroundColor;
            }
            if (this.fontSize) {
                style.fontSize = isNaN(this.fontSize) ? this.fontSize : `${this.fontSize}px`;
            }
            return style;
        },
    },
    watch: {
        startVal() {
            this.reset();
        },
        endVal() {
            this.reset();
        },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.clear();
    },
    methods: {
        // 初始化
        init() {
            this.localStartVal = Number(this.startVal);
            this.localEndVal = Number(this.endVal);
            this.localDuration = Number(this.duration);
            this.localDecimals = Number(this.decimals);
            this.formatValue(this.localStartVal);

            // 校验并处理传入的值
            if (this.localDecimals < 0) {
                this.localDecimals = 0;
            }

            // 设置初始显示值
            this.displayValue = this.formatValue(this.localStartVal);

            // 自动开始滚动
            if (this.autoplay) {
                this.start();
            }
        },

        // 开始滚动
        start() {
            if (this.paused) {
                this.resume();
                return;
            }

            this.clear();
            this.paused = false;
            this.startTime = null;
            this.frameVal = this.localStartVal;
            this.remaining = this.localDuration;

            // 如果开始值等于结束值，不执行动画
            if (this.localStartVal === this.localEndVal) {
                this.displayValue = this.formatValue(this.localEndVal);
                this.$emit("finished");
                return;
            }

            // 使用 requestAnimationFrame 执行动画
            this.rAF = requestAnimationFrame(this.count);
        },

        // 暂停滚动
        pause() {
            if (!this.rAF || this.paused) {
                return;
            }
            this.paused = true;
            cancelAnimationFrame(this.rAF);
            this.remaining -= Date.now() - this.startTime;
        },

        // 继续滚动
        resume() {
            if (!this.paused) {
                return;
            }
            this.paused = false;
            this.startTime = Date.now();
            this.rAF = requestAnimationFrame(this.count);
        },

        // 重置滚动
        reset() {
            this.clear();
            this.init();
        },

        // 清除动画
        clear() {
            if (this.rAF) {
                cancelAnimationFrame(this.rAF);
                this.rAF = null;
            }
        },

        // 计算当前值
        count(timestamp) {
            if (!this.startTime) {
                this.startTime = timestamp;
            }

            const progress = timestamp - this.startTime;
            this.remaining = this.localDuration - progress;

            // 应用缓动函数计算当前值
            this.frameVal = this.calculateCurrentValue(progress / this.localDuration);

            // 更新显示值
            this.displayValue = this.formatValue(this.frameVal);

            // 触发更新事件
            this.$emit("change", this.displayValue);

            // 动画完成
            if (progress >= this.localDuration) {
                this.frameVal = this.localEndVal;
                this.displayValue = this.formatValue(this.localEndVal);
                this.$emit("finished");
                this.clear();
                return;
            }

            // 继续下一帧
            this.rAF = requestAnimationFrame(this.count);
        },

        // 计算当前值
        calculateCurrentValue(progress) {
            let currentValue;
            const diff = this.localEndVal - this.localStartVal;

            // 根据缓动函数计算当前值
            switch (this.easingFn) {
                case "easeOut":
                    currentValue = this.localStartVal + diff * (1 - Math.pow(1 - progress, 2));
                    break;
                case "easeIn":
                    currentValue = this.localStartVal + diff * Math.pow(progress, 2);
                    break;
                case "easeInOut":
                    currentValue =
                        this.localStartVal +
                        diff *
                            (progress < 0.5
                                ? 2 * Math.pow(progress, 2)
                                : 1 - Math.pow(-2 * progress + 2, 2) / 2);
                    break;
                default:
                    // linear
                    currentValue = this.localStartVal + diff * progress;
            }

            // 确保当前值不超过结束值
            if (this.localEndVal > this.localStartVal) {
                return Math.min(currentValue, this.localEndVal);
            } else {
                return Math.max(currentValue, this.localEndVal);
            }
        },

        // 格式化数值
        formatValue(value) {
            const stringValue = this.toFixed(value, this.localDecimals);

            // 添加千分位分隔符
            if (this.separator) {
                return this.addSeparator(stringValue);
            }

            return stringValue;
        },

        // 添加千分位分隔符
        addSeparator(value) {
            const parts = value.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);
            return parts.join(".");
        },

        // 精确的 toFixed 方法
        toFixed(value, decimals) {
            const pow = Math.pow(10, decimals);
            return (Math.round(value * pow) / pow).toFixed(decimals);
        },
    },
};
</script>

<style>
.fanc-count-to {
    display: inline-flex;
    align-items: center;
    color: var(--count-to-text-color);
}

/* 默认样式 */
.fanc-count-to__default {
    display: inline-flex;
    align-items: center;
}

.fanc-count-to__default .fanc-count-to__text {
    font-size: var(--count-to-font-size);
    font-weight: var(--count-to-font-weight);
    color: var(--count-to-text-color);
}

/* 带前缀和后缀的样式 */
.fanc-count-to__addon {
    display: inline-flex;
    align-items: center;
}

.fanc-count-to__addon .fanc-count-to__text {
    font-size: var(--count-to-font-size);
    font-weight: var(--count-to-font-weight);
    color: var(--count-to-text-color);
}

.fanc-count-to__prefix,
.fanc-count-to__suffix {
    font-size: var(--count-to-addon-font-size);
    color: var(--count-to-addon-color);
    margin: 0 4px;
}

/* 带背景的样式 */
.fanc-count-to__bg {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.fanc-count-to__bg .fanc-count-to__text {
    font-size: var(--count-to-font-size);
    font-weight: var(--count-to-font-weight);
    color: var(--count-to-bg-text-color);
    background-color: var(--count-to-bg-color);
    padding: var(--count-to-bg-padding);
    border-radius: var(--count-to-bg-border-radius);
}

/* 圆形背景样式 */
.fanc-count-to__circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.fanc-count-to__circle .fanc-count-to__text {
    font-size: var(--count-to-font-size);
    font-weight: var(--count-to-font-weight);
    color: var(--count-to-circle-text-color);
    background-color: var(--count-to-circle-bg-color);
    padding: var(--count-to-circle-padding);
    border-radius: 50%;
    min-width: var(--count-to-circle-size);
    min-height: var(--count-to-circle-size);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
