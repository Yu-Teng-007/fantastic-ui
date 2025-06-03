<template>
    <view class="fanc-progress" :style="containerStyle">
        <view class="fanc-progress__bar">
            <view class="fanc-progress__portion" :style="progressStyle">
                <view v-if="showPivot" class="fanc-progress__pivot" :style="pivotStyle">
                    {{ pivotText }}
                </view>
            </view>
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
 * @property {String} pivotColor - 进度条文字背景色
 * @property {String} pivotTextColor - 进度条文字颜色
 * @property {String} textColor - 文字颜色
 * @property {Boolean} showPivot - 是否显示进度条文字
 * @property {Boolean} striped - 是否显示条纹
 * @property {Boolean} stripedActive - 条纹是否有动画效果
 * @property {String} pivotText - 自定义文字内容
 * @property {String} textInside - 文字是否显示在进度条内部
 * @property {Number} strokeWidth - 进度条宽度，单位px
 * @property {String} status - 进度条状态，可选值为 normal/success/warning/error
 * @property {Boolean} rounded - 是否显示圆角
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
        // 进度条文字背景色
        pivotColor: {
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
        // 文字是否显示在进度条内部
        textInside: {
            type: Boolean,
            default: false,
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
    },
    computed: {
        // 容器样式
        containerStyle() {
            return {
                height: `${this.strokeWidth}px`,
            };
        },
        // 进度条样式
        progressStyle() {
            const style = {
                width: `${this.percentage}%`,
            };

            // 设置进度条颜色
            if (this.color) {
                style.background = this.color;
            } else if (this.status !== "normal") {
                style.background = `var(--fanc-${this.status}-color)`;
            } else {
                style.background = "var(--fanc-primary-color)";
            }

            // 设置条纹效果
            if (this.striped) {
                style.backgroundImage = "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)";
                style.backgroundSize = "40px 40px";
                
                if (this.stripedActive) {
                    style.animation = "fanc-progress-stripes 2s linear infinite";
                }
            }

            // 设置圆角
            if (this.rounded) {
                style.borderRadius = `${this.strokeWidth / 2}px`;
            }

            return style;
        },
        // 进度文字样式
        pivotStyle() {
            const style = {};

            // 设置进度文字背景色
            if (this.pivotColor) {
                style.background = this.pivotColor;
            } else if (this.status !== "normal") {
                style.background = `var(--fanc-${this.status}-color)`;
            }

            // 设置进度文字颜色
            if (this.pivotTextColor) {
                style.color = this.pivotTextColor;
            }

            // 文字位置
            if (this.textInside) {
                style.position = "absolute";
                style.right = "8px";
                style.transform = "none";
                style.top = "50%";
                style.marginTop = "-10px";
            }

            return style;
        },
        // 默认文字内容为百分比
        defaultPivotText() {
            return `${this.percentage}%`;
        }
    },
    methods: {
        // 获取当前进度文本
        getPivotText() {
            return this.pivotText || this.defaultPivotText;
        }
    }
};
</script>

<style lang="scss" scoped>
// 进度条基础样式
.fanc-progress {
    position: relative;
    width: 100%;
    box-sizing: border-box;

    // 进度条轨道
    &__bar {
        position: relative;
        width: 100%;
        height: 100%;
        background: var(--progress-track-color, var(--gray-200));
        border-radius: inherit;
        overflow: hidden;
    }

    // 进度条进度部分
    &__portion {
        position: relative;
        height: 100%;
        background: var(--fanc-primary-color);
        transition: all 0.3s ease;
    }

    // 进度条文字
    &__pivot {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        min-width: 3.6em;
        padding: 2px 5px;
        color: var(--white);
        font-size: 10px;
        line-height: 1.6;
        text-align: center;
        border-radius: 10px;
        background: var(--fanc-primary-color);
        transition: all 0.3s ease;
    }

    // 条纹动画
    @keyframes fanc-progress-stripes {
        from {
            background-position: 40px 0;
        }
        to {
            background-position: 0 0;
        }
    }
}
</style> 