<template>
    <view
        class="fanc-divider"
        :class="[
            `fanc-divider--${type}`,
            `fanc-divider--${position}`,
            {
                'is-dashed': dashed,
                'is-hairline': hairline,
            },
        ]"
        :style="dividerStyle"
    >
        <text v-if="$slots.default" class="fanc-divider__text">
            <slot></slot>
        </text>
    </view>
</template>

<script>
/**
 * fanc-divider 分割线
 * @description 区隔内容的分割线，一般用于页面底部"没有更多"的提示
 * @property {String} type - 分割线类型，可选值为 solid/dashed/dotted
 * @property {String} position - 文本位置，可选值为 left/center/right
 * @property {Boolean} dashed - 是否为虚线
 * @property {Boolean} hairline - 是否使用细线
 * @property {String} color - 分割线颜色
 * @property {String} textColor - 文本颜色
 * @property {String} borderColor - 边框颜色
 * @property {String|Number} margin - 上下外边距
 */
export default {
    name: "fanc-divider",
    props: {
        // 分割线类型
        type: {
            type: String,
            default: "solid",
            validator: (value) => ["solid", "dashed", "dotted"].includes(value),
        },
        // 文本位置
        position: {
            type: String,
            default: "center",
            validator: (value) => ["left", "center", "right"].includes(value),
        },
        // 是否为虚线
        dashed: Boolean,
        // 是否使用细线
        hairline: Boolean,
        // 分割线颜色
        color: String,
        // 文本颜色
        textColor: String,
        // 边框颜色
        borderColor: String,
        // 上下外边距
        margin: {
            type: [String, Number],
            default: "16",
        },
    },
    computed: {
        // 计算分割线样式
        dividerStyle() {
            const style = {};

            if (this.margin) {
                style.margin = `${this.margin}px 0`;
            }

            if (this.color) {
                style.color = this.color;
            }

            if (this.textColor) {
                style["--divider-text-color"] = this.textColor;
            }

            if (this.borderColor) {
                style["--divider-border-color"] = this.borderColor;
            }

            return style;
        },
    },
};
</script>

<style lang="scss" scoped>
// 分割线基础样式
.fanc-divider {
    display: flex;
    align-items: center;
    margin: var(--divider-margin, 16px 0);
    color: var(--divider-text-color, var(--text-secondary));
    font-size: var(--divider-font-size, 14px);
    line-height: 1.5;
    border: 0 solid var(--divider-border-color, var(--border-color));
    border-bottom-width: 1px;

    // 文本样式
    &__text {
        position: relative;
        padding: 0 var(--divider-text-padding, 16px);
        white-space: nowrap;
        color: inherit;
    }

    // 实线类型
    &--solid {
        border-style: solid;
    }

    // 虚线类型
    &--dashed {
        border-style: dashed;
    }

    // 点线类型
    &--dotted {
        border-style: dotted;
    }

    // 文本位置-居中
    &--center {
        justify-content: center;

        &::before,
        &::after {
            content: "";
            display: block;
            flex: 1;
            border-top: 1px solid var(--divider-border-color, var(--border-color));
            transform: translateY(50%);
        }

        &.is-dashed {
            &::before,
            &::after {
                border-top-style: dashed;
            }
        }

        &.is-dotted {
            &::before,
            &::after {
                border-top-style: dotted;
            }
        }
    }

    // 文本位置-左侧
    &--left {
        &::before {
            content: "";
            display: block;
            width: var(--divider-text-margin-left, 5%);
            border-top: 1px solid var(--divider-border-color, var(--border-color));
            transform: translateY(50%);
        }

        &::after {
            content: "";
            display: block;
            flex: 1;
            border-top: 1px solid var(--divider-border-color, var(--border-color));
            transform: translateY(50%);
        }

        &.is-dashed {
            &::before,
            &::after {
                border-top-style: dashed;
            }
        }

        &.is-dotted {
            &::before,
            &::after {
                border-top-style: dotted;
            }
        }
    }

    // 文本位置-右侧
    &--right {
        justify-content: flex-end;

        &::before {
            content: "";
            display: block;
            flex: 1;
            border-top: 1px solid var(--divider-border-color, var(--border-color));
            transform: translateY(50%);
        }

        &::after {
            content: "";
            display: block;
            width: var(--divider-text-margin-right, 5%);
            border-top: 1px solid var(--divider-border-color, var(--border-color));
            transform: translateY(50%);
        }

        &.is-dashed {
            &::before,
            &::after {
                border-top-style: dashed;
            }
        }

        &.is-dotted {
            &::before,
            &::after {
                border-top-style: dotted;
            }
        }
    }

    // 细线样式
    &.is-hairline {
        border-bottom-width: 0.5px;

        &::before,
        &::after {
            border-top-width: 0.5px;
        }
    }

    // 虚线样式
    &.is-dashed {
        border-style: dashed;
    }
}

// 加载动画
@keyframes fanc-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style> 