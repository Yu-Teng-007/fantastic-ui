<template>
    <view class="fanc-circle" :style="circleStyle">
        <svg class="fanc-circle__svg" viewBox="0 0 1040 1040">
            <!-- 背景圆环 -->
            <circle
                class="fanc-circle__track"
                cx="520"
                cy="520"
                :r="normalizedRadius"
                fill="transparent"
                :stroke="trackColor"
                :stroke-width="strokeWidth"
            />
            <!-- 进度圆环 -->
            <circle
                class="fanc-circle__progress"
                cx="520"
                cy="520"
                :r="normalizedRadius"
                fill="transparent"
                :stroke="circleColor"
                :stroke-width="strokeWidth"
                :stroke-linecap="strokeLinecap"
                :stroke-dasharray="circleDasharray"
                :stroke-dashoffset="circleDashoffset"
            />
        </svg>
        <view class="fanc-circle__text" :style="textStyle">
            <slot>
                <text>{{ text || `${Math.round(rate)}%` }}</text>
            </slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-circle 环形进度条
 * @description 圆环形的进度条组件，支持进度渐变动画
 * @property {Number} rate - 进度百分比，取值范围 0-100
 * @property {Number} size - 圆环直径，单位px
 * @property {Number} strokeWidth - 圆环宽度，单位px
 * @property {String} color - 进度条颜色，支持渐变色
 * @property {String} layerColor - 轨道颜色
 * @property {String} textColor - 文字颜色
 * @property {String} text - 自定义文字内容
 * @property {String} strokeLinecap - 进度条端点样式，可选值为 butt/round/square
 * @property {Boolean} clockwise - 是否顺时针增加
 * @property {String} status - 进度条状态，可选值为 normal/success/warning/error
 * @property {Number} speed - 动画速度，单位 ms
 * @property {Boolean} fill - 是否显示填充色，仅在 type 为 circle 时有效
 * @property {String} fontSize - 文字大小，如 18px
 */
export default {
    name: "fanc-circle",
    props: {
        // 进度百分比
        rate: {
            type: Number,
            default: 0,
            validator: (value) => value >= 0 && value <= 100,
        },
        // 圆环直径
        size: {
            type: Number,
            default: 100,
        },
        // 圆环宽度
        strokeWidth: {
            type: Number,
            default: 40,
        },
        // 进度条颜色
        color: {
            type: String,
            default: "",
        },
        // 轨道颜色
        layerColor: {
            type: String,
            default: "",
        },
        // 文字颜色
        textColor: {
            type: String,
            default: "",
        },
        // 自定义文字内容
        text: {
            type: String,
            default: "",
        },
        // 进度条端点样式
        strokeLinecap: {
            type: String,
            default: "round",
            validator: (value) => ["butt", "round", "square"].includes(value),
        },
        // 是否顺时针增加
        clockwise: {
            type: Boolean,
            default: true,
        },
        // 进度条状态
        status: {
            type: String,
            default: "normal",
            validator: (value) => ["normal", "success", "warning", "error"].includes(value),
        },

        // 是否显示填充色
        fill: {
            type: Boolean,
            default: false,
        },
        // 文字大小
        fontSize: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            currentRate: 0,
            animationTimer: null,
        };
    },
    computed: {
        // 标准化半径（考虑到边框宽度）
        normalizedRadius() {
            return 500 - this.strokeWidth / 2;
        },
        // 圆环周长
        circumference() {
            return this.normalizedRadius * 2 * Math.PI;
        },
        // 进度圆环 stroke-dasharray 属性值
        circleDasharray() {
            return `${this.circumference} ${this.circumference}`;
        },
        // 进度圆环 stroke-dashoffset 属性值
        circleDashoffset() {
            const offset = this.circumference - (this.currentRate / 100) * this.circumference;
            return this.clockwise ? offset : -offset;
        },
        // 组件样式
        circleStyle() {
            return {
                width: `${this.size}px`,
                height: `${this.size}px`,
            };
        },
        // 文字样式
        textStyle() {
            const style = {};

            if (this.textColor) {
                style.color = this.textColor;
            } else if (this.status !== "normal") {
                style.color = `var(--fanc-${this.status}-color)`;
            }

            if (this.fontSize) {
                style.fontSize = this.fontSize;
            }

            return style;
        },
        // 进度圆环颜色
        circleColor() {
            if (this.color) {
                return this.color;
            } else if (this.status !== "normal") {
                return `var(--fanc-${this.status}-color)`;
            } else {
                return "var(--fanc-primary-color)";
            }
        },
        // 轨道颜色
        trackColor() {
            return this.layerColor || "var(--circle-track-color, var(--gray-200))";
        },
    },
    watch: {
        rate: {
            handler(newVal) {
                this.animateCircle(newVal);
            },
            immediate: true,
        },
    },
    methods: {
        // 只为环形条添加动画
        animateCircle(targetRate) {
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }

            const startRate = this.currentRate;
            const endRate = targetRate;
            const diff = endRate - startRate;
            const duration = 500; // 固定动画时间为500ms
            const startTime = Date.now();

            const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                let progress = elapsed / duration;

                // 确保进度不超过1
                progress = Math.min(progress, 1);

                // 计算当前进度值
                this.currentRate = startRate + diff * progress;

                // 如果动画未完成，继续动画
                if (progress < 1) {
                    this.animationTimer = setTimeout(animate, 16);
                } else {
                    // 动画完成
                    this.currentRate = endRate;
                    this.animationTimer = null;
                    this.$emit("update", this.currentRate);
                }
            };

            animate();
        },
    },
    beforeDestroy() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
        }
    },
};
</script>

<style lang="scss" scoped>
.fanc-circle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &__svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
    }

    &__track {
        transition: stroke 0.3s;
    }

    &__progress {
        transition: stroke-dashoffset 0.3s ease;
    }

    &__text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: var(--text-primary);
        text-align: center;
        white-space: nowrap;
    }
}
</style>
