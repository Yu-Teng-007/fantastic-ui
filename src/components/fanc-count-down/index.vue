<template>
    <view class="fanc-count-down">
        <!-- 方形底样式 -->
        <view v-if="type === 'square'" class="fanc-count-down__square">
            <view class="fanc-count-down__item">{{ timeData.hours }}</view>
            <text class="fanc-count-down__separator">:</text>
            <view class="fanc-count-down__item">{{ timeData.minutes }}</view>
            <text class="fanc-count-down__separator">:</text>
            <view class="fanc-count-down__item">{{ timeData.seconds }}</view>
        </view>

        <!-- 圆形底样式 -->
        <view v-else-if="type === 'circle'" class="fanc-count-down__circle">
            <view class="fanc-count-down__item">{{ timeData.hours }}</view>
            <text class="fanc-count-down__separator">:</text>
            <view class="fanc-count-down__item">{{ timeData.minutes }}</view>
            <text class="fanc-count-down__separator">:</text>
            <view class="fanc-count-down__item">{{ timeData.seconds }}</view>
        </view>

        <!-- 带单位样式 -->
        <view v-else-if="type === 'text'" class="fanc-count-down__text">
            <view class="fanc-count-down__item">{{ timeData.hours }}</view>
            <text class="fanc-count-down__unit">时</text>
            <view class="fanc-count-down__item">{{ timeData.minutes }}</view>
            <text class="fanc-count-down__unit">分</text>
            <view class="fanc-count-down__item">{{ timeData.seconds }}</view>
            <text class="fanc-count-down__unit">秒</text>
        </view>

        <!-- 无底色带单位样式 -->
        <view v-else-if="type === 'plain'" class="fanc-count-down__plain">
            <text>{{ timeData.hours }}</text>
            <text class="fanc-count-down__unit">时</text>
            <text>{{ timeData.minutes }}</text>
            <text class="fanc-count-down__unit">分</text>
            <text>{{ timeData.seconds }}</text>
            <text class="fanc-count-down__unit">秒</text>
        </view>

        <!-- 自定义插槽 -->
        <slot v-else :time-data="timeData"></slot>
    </view>
</template>

<script>
import { parseTimeData } from "@/plugins/count-down";

export default {
    name: "FancCountDown",
    props: {
        // 倒计时时长，单位毫秒
        time: {
            type: [Number, String],
            default: 0,
        },
        // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
        format: {
            type: String,
            default: "HH:mm:ss",
        },
        // 是否自动开始倒计时
        autoStart: {
            type: Boolean,
            default: true,
        },
        // 倒计时类型：square-方形底, circle-圆形底, text-带单位, plain-无底色带单位, custom-自定义
        type: {
            type: String,
            default: "square",
            validator: (value) => {
                return ["square", "circle", "text", "plain", "custom"].includes(value);
            },
        },
        // 毫秒级渲染
        millisecond: {
            type: Boolean,
            default: false,
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
    },
    data() {
        return {
            remain: 0,
            counting: false,
            timeData: {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
                milliseconds: "000",
            },
            timer: null,
        };
    },
    computed: {
        // 计算样式
        countDownStyle() {
            const style = {};
            if (this.color) {
                style.color = this.color;
            }
            if (this.backgroundColor) {
                style.backgroundColor = this.backgroundColor;
            }
            return style;
        },
    },
    watch: {
        time: {
            immediate: true,
            handler(val) {
                this.reset();
            },
        },
    },
    mounted() {
        if (this.autoStart) {
            this.start();
        }
    },
    beforeDestroy() {
        this.pause();
    },
    methods: {
        // 开始倒计时
        start() {
            if (this.counting) {
                return;
            }

            this.counting = true;
            this.remain = Math.max(0, Number(this.time));

            if (this.remain <= 0) {
                this.handleFinish();
                return;
            }

            this.tick();
        },

        // 暂停倒计时
        pause() {
            this.counting = false;
            clearTimeout(this.timer);
        },

        // 重置倒计时
        reset() {
            this.pause();
            this.remain = Math.max(0, Number(this.time));
            this.updateTimeData();

            if (this.autoStart) {
                this.start();
            }
        },

        // 倒计时计算
        tick() {
            if (!this.counting) {
                return;
            }

            // 计算间隔
            const interval = this.millisecond ? 50 : 1000;

            this.timer = setTimeout(() => {
                // 更新剩余时间
                if (this.remain > 0) {
                    this.remain -= interval;
                    this.updateTimeData();

                    if (this.remain > 0) {
                        this.tick();
                    } else {
                        this.handleFinish();
                    }
                } else {
                    this.handleFinish();
                }
            }, interval);
        },

        // 更新时间数据
        updateTimeData() {
            const remain = Math.max(0, this.remain);
            const timeData = parseTimeData(remain);

            this.timeData = {
                days: this.padZero(timeData.days),
                hours: this.padZero(timeData.hours),
                minutes: this.padZero(timeData.minutes),
                seconds: this.padZero(timeData.seconds),
                milliseconds: this.padZero(timeData.milliseconds, 3),
            };

            this.$emit("change", this.timeData);
        },

        // 处理倒计时结束
        handleFinish() {
            this.remain = 0;
            this.counting = false;
            this.updateTimeData();
            this.$emit("finish");
        },

        // 数字补零
        padZero(num, targetLength = 2) {
            let str = String(num);
            while (str.length < targetLength) {
                str = "0" + str;
            }
            return str;
        },
    },
};
</script>

<style>
.fanc-count-down {
    display: inline-flex;
    align-items: center;
    color: var(--countdown-text-color);
    line-height: 1.5;
}

/* 方形底样式 */
.fanc-count-down__square {
    display: flex;
    align-items: center;
}

.fanc-count-down__square .fanc-count-down__item {
    min-width: 22px;
    padding: 0 4px;
    color: var(--countdown-item-text-color);
    font-size: 14px;
    text-align: center;
    background-color: var(--countdown-item-background-color);
    border-radius: 4px;
}

.fanc-count-down__square .fanc-count-down__separator {
    margin: 0 2px;
    color: var(--countdown-separator-color);
    font-size: 14px;
}

/* 圆形底样式 */
.fanc-count-down__circle {
    display: flex;
    align-items: center;
}

.fanc-count-down__circle .fanc-count-down__item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 4px;
    color: var(--countdown-item-text-color);
    font-size: 14px;
    text-align: center;
    background-color: var(--countdown-item-background-color);
    border-radius: 22px;
}

.fanc-count-down__circle .fanc-count-down__separator {
    margin: 0 2px;
    color: var(--countdown-separator-color);
    font-size: 14px;
}

/* 带单位样式 */
.fanc-count-down__text {
    display: flex;
    align-items: center;
}

.fanc-count-down__text .fanc-count-down__item {
    min-width: 22px;
    padding: 0 4px;
    color: var(--countdown-item-text-color);
    font-size: 14px;
    text-align: center;
    background-color: var(--countdown-item-background-color);
    border-radius: 4px;
}

.fanc-count-down__text .fanc-count-down__unit {
    margin: 0 2px;
    color: var(--countdown-unit-color);
    font-size: 14px;
}

/* 无底色带单位样式 */
.fanc-count-down__plain {
    display: flex;
    align-items: center;
    color: var(--countdown-text-color);
    font-size: 14px;
}

.fanc-count-down__plain .fanc-count-down__unit {
    margin: 0 2px;
    color: var(--countdown-unit-color);
}
</style>
