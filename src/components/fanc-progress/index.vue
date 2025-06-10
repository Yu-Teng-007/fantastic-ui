<template>
    <view class="fanc-progress" :style="containerStyle">
        <view class="fanc-progress__bar" :style="trackStyle">
            <view class="fanc-progress__portion" :style="progressStyle">
                <view
                    v-if="showPivot && textPosition === 'inside'"
                    class="fanc-progress__pivot"
                    :style="pivotStyle"
                >
                    {{ displayText }}
                </view>
            </view>
        </view>
        <view
            v-if="showPivot && textPosition === 'outside'"
            class="fanc-progress__pivot fanc-progress__pivot--outside"
            :style="pivotStyle"
        >
            {{ displayText }}
        </view>
    </view>
</template>

<script>
/**
 * fanc-progress 进度条
 * @description 用于展示当前任务的进度
 * @property {Number} percentage - 进度百分比，取值范围 0-100
 * @property {String} color - 进度条颜色，支持渐变色
 * @property {String} trackColor - 轨道颜色
 * @property {String} pivotTextColor - 进度条文字颜色
 * @property {String} textColor - 文字颜色
 * @property {Boolean} showPivot - 是否显示进度条文字
 * @property {Boolean} striped - 是否显示条纹
 * @property {Boolean} stripedActive - 条纹是否有动画效果
 * @property {String} pivotText - 自定义文字内容
 * @property {Function} format - 自定义文字格式化函数，参数为当前百分比，返回显示的文字内容
 * @property {String} textPosition - 文字位置，可选值为 inside/outside
 * @property {Number} strokeWidth - 进度条宽度，单位px
 * @property {String} status - 进度条状态，可选值为 normal/success/warning/error
 * @property {Boolean} rounded - 是否显示圆角
 * @property {Boolean} disabled - 是否禁用状态
 * @property {String} themeColor - 主题颜色，可选值为 blue/pink/red/purple
 */
export default {
    name: "fanc-progress",
    props: {
        // 进度百分比
        percentage: {
            type: Number,
            default: 0,
            validator: (value) => value >= 0 && value <= 100,
        },
        // 进度条颜色
        color: {
            type: String,
            default: "",
        },
        // 轨道颜色
        trackColor: {
            type: String,
            default: "",
        },
        // 进度条文字颜色
        pivotTextColor: {
            type: String,
            default: "",
        },
        // 是否显示进度条文字
        showPivot: {
            type: Boolean,
            default: true,
        },
        // 是否显示条纹
        striped: {
            type: Boolean,
            default: false,
        },
        // 条纹是否有动画效果
        stripedActive: {
            type: Boolean,
            default: false,
        },
        // 自定义文字内容
        pivotText: {
            type: String,
            default: "",
        },
        // 自定义文字格式化函数
        format: {
            type: Function,
            default: null,
        },
        // 文字位置
        textPosition: {
            type: String,
            default: "inside",
            validator: (value) => ["inside", "outside"].includes(value),
        },
        // 进度条宽度
        strokeWidth: {
            type: Number,
            default: 8,
        },
        // 进度条状态
        status: {
            type: String,
            default: "normal",
            validator: (value) => ["normal", "success", "warning", "error"].includes(value),
        },
        // 是否显示圆角
        rounded: {
            type: Boolean,
            default: false,
        },
        // 是否禁用状态
        disabled: {
            type: Boolean,
            default: false,
        },
        // 主题颜色
        themeColor: {
            type: String,
            default: "",
            validator: (value) => ["", "blue", "pink", "red", "purple"].includes(value),
        },
    },
    computed: {
        // 容器样式
        containerStyle() {
            return {
                height: this.textPosition === "outside" ? "auto" : `${this.getStrokeWidth()}px`,
                paddingBottom: this.textPosition === "outside" ? "0" : "0",
                position: "relative",
            };
        },
        // 轨道样式
        trackStyle() {
            const style = {
                height: `${this.getStrokeWidth()}px`,
            };

            // 设置轨道颜色
            if (this.trackColor) {
                style.background = this.trackColor;
            }

            // 设置圆角
            if (this.rounded) {
                style.borderRadius = `${this.getStrokeWidth() / 2}px`;
            }

            return style;
        },
        // 进度条样式
        progressStyle() {
            const style = {
                width: `${this.percentage}%`,
                height: "100%",
            };

            // 处理禁用状态
            if (this.disabled) {
                style.background = "var(--fanc-gray-300, #c8c9cc)";
                return style;
            }

            // 设置进度条颜色
            if (this.color) {
                style.background = this.color;
            } else if (this.themeColor) {
                switch (this.themeColor) {
                    case "pink":
                        style.background = "var(--fanc-pink, #ff8db4)";
                        break;
                    case "red":
                        style.background = "var(--fanc-red, #ee0a24)";
                        break;
                    case "purple":
                        style.background = "var(--fanc-purple, #7232dd)";
                        break;
                    case "blue":
                    default:
                        style.background = "var(--fanc-primary-color, #1989fa)";
                        break;
                }
            } else if (this.status !== "normal") {
                style.background = `var(--fanc-${this.status}-color, var(--fanc-${this.status}))`;
            }

            // 设置条纹效果
            if (this.striped) {
                style.backgroundImage =
                    "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)";
                style.backgroundSize = "40px 40px";

                if (this.stripedActive) {
                    // 使用CSS类来添加动画，而不是直接设置animation属性
                    style.animationName = "none"; // 先清除可能存在的动画
                    style.animationDuration = "2s";
                    style.animationTimingFunction = "linear";
                    style.animationIterationCount = "infinite";
                    style.animationDirection = "normal";
                    style.animationFillMode = "none";
                    style.animationPlayState = "running";

                    // 添加自定义属性标记需要动画
                    style["--striped-active"] = "true";
                }
            }

            // 设置圆角
            if (this.rounded) {
                style.borderRadius = `${this.getStrokeWidth() / 2}px`;
            }

            return style;
        },
        // 进度文字样式
        pivotStyle() {
            const style = {};

            // 设置进度文字颜色
            if (this.pivotTextColor) {
                style.color = this.pivotTextColor;
            } else if (this.disabled) {
                style.color = "var(--fanc-gray-600, #666)";
            } else if (this.textPosition === "outside") {
                // 外部文本颜色根据主题色设置
                if (this.themeColor) {
                    switch (this.themeColor) {
                        case "pink":
                            style.color = "var(--fanc-pink, #ff8db4)";
                            break;
                        case "red":
                            style.color = "var(--fanc-red, #ee0a24)";
                            break;
                        case "purple":
                            style.color = "var(--fanc-purple, #7232dd)";
                            break;
                        case "blue":
                        default:
                            style.color = "var(--fanc-primary-color, #1989fa)";
                            break;
                    }
                } else {
                    style.color = "var(--fanc-primary-color, #1989fa)";
                }
            } else {
                style.color = "var(--fanc-white, #fff)";
            }

            return style;
        },
        // 默认文字内容为百分比
        defaultPivotText() {
            return `${this.percentage}%`;
        },
        // 显示的文本内容
        displayText() {
            if (this.pivotText) {
                return this.pivotText;
            } else if (this.format) {
                return this.format(this.percentage);
            } else {
                return this.defaultPivotText;
            }
        },
    },
    methods: {
        // 获取进度条高度，文本在内部时增加高度
        getStrokeWidth() {
            // 当文本在内部时，确保有足够的高度显示文本
            return this.textPosition === "inside"
                ? Math.max(this.strokeWidth, 16)
                : this.strokeWidth;
        },
    },
};
</script>

<style lang="scss" scoped>
// 进度条基础样式
.fanc-progress {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin: 8px 0;
    display: flex;
    align-items: center;

    // 进度条轨道
    &__bar {
        position: relative;
        width: 100%;
        background: var(--fanc-track-color, var(--fanc-gray-200, #ebedf0));
        border-radius: inherit;
        overflow: hidden;
        flex: 1;
    }

    // 进度条进度部分
    &__portion {
        position: relative;
        height: 100%;
        background: var(--fanc-primary-color, #1989fa);
        transition: width 0.3s ease, background 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        // 添加条纹动画
        &[style*="--striped-active: true"] {
            animation-name: fanc-progress-stripes-animation !important;
        }
    }

    // 进度条文字
    &__pivot {
        min-width: 2em;
        padding: 0 5px;
        color: var(--fanc-white, #fff);
        font-size: 12px;
        line-height: 1.6;
        text-align: center;
        white-space: nowrap;
        z-index: 1;
        box-sizing: border-box;
        margin-right: 5px;

        // 外部文本样式
        &--outside {
            position: static;
            margin-left: 8px;
            margin-right: 0;
            font-size: 14px;
            font-weight: normal;
        }
    }
}

// 条纹动画
@keyframes fanc-progress-stripes-animation {
    from {
        background-position: 40px 0;
    }
    to {
        background-position: 0 0;
    }
}
</style>
