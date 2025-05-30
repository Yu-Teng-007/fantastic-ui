<template>
    <component
        :is="tag"
        class="fanc-button"
        :class="[
            `fanc-button--${type}`,
            `fanc-button--${size}`,
            {
                'is-plain': plain,
                'is-disabled': disabled,
                'is-loading': loading,
                'is-square': square,
                'is-round': round,
                'is-block': block,
                'is-hairline': hairline,
                'is-shadow': shadow,
            },
        ]"
        :style="buttonStyle"
        :disabled="disabled || loading"
        @click="handleClick"
    >
        <view v-if="loading" class="fanc-button__loading">
            <view class="fanc-loading-indicator"></view>
            <text v-if="loadingText" class="fanc-button__loading-text">{{ loadingText }}</text>
        </view>
        <view v-else class="fanc-button__content">
            <view v-if="icon && !loading" class="fanc-button__icon">
                <image v-if="isIconUrl" :src="icon" class="fanc-icon-image" mode="aspectFit" />
                <fanc-icon v-else :name="icon" :size="iconSize" :color="iconColor"></fanc-icon>
            </view>
            <text v-if="$slots.default" class="fanc-button__text">
                <slot></slot>
            </text>
        </view>
    </component>
</template>

<script>
/**
 * fanc-button 按钮
 * @description 按钮组件，用于触发操作，如提交表单、确认操作等
 * @property {String} type - 按钮类型，可选值为 default/primary/success/warning/danger
 * @property {Boolean} plain - 是否为朴素按钮
 * @property {Boolean} disabled - 是否禁用按钮
 * @property {Boolean} loading - 是否显示为加载状态
 * @property {String} loadingText - 加载状态文字
 * @property {Boolean} square - 是否为方形按钮
 * @property {Boolean} round - 是否为圆角按钮
 * @property {String} icon - 按钮图标，支持图标名称或图片URL
 * @property {String|Number} iconSize - 图标大小，默认为1em
 * @property {String} iconColor - 图标颜色
 * @property {String} size - 按钮尺寸，可选值为 large/normal/small/mini
 * @property {Boolean} block - 是否为块级元素
 * @property {String} url - 跳转链接
 * @property {String|Object} to - 路由跳转对象，同vue-router的to
 * @property {String} color - 按钮颜色，支持十六进制颜色
 * @property {Boolean} hairline - 是否使用细边框
 * @property {Boolean} shadow - 是否显示阴影
 * @event {Function} click - 点击按钮时触发
 */
export default {
    name: "fanc-button",
    props: {
        // 按钮类型
        type: {
            type: String,
            default: "default",
            validator: (value) =>
                ["default", "primary", "success", "warning", "danger", "info"].includes(value),
        },
        // 是否为朴素按钮
        plain: Boolean,
        // 是否禁用按钮
        disabled: Boolean,
        // 是否显示为加载状态
        loading: Boolean,
        // 加载状态文字
        loadingText: String,
        // 是否为方形按钮
        square: Boolean,
        // 是否为圆角按钮
        round: Boolean,
        // 按钮图标
        icon: String,
        // 图标大小
        iconSize: {
            type: [String, Number],
            default: "",
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: "",
        },
        // 按钮尺寸
        size: {
            type: String,
            default: "normal",
            validator: (value) => ["large", "normal", "small", "mini"].includes(value),
        },
        // 是否为块级元素
        block: Boolean,
        // 跳转链接
        url: String,
        // 路由跳转对象
        to: [String, Object],
        // 按钮颜色
        color: String,
        // 是否使用细边框
        hairline: Boolean,
        // 是否显示阴影
        shadow: Boolean,
    },
    computed: {
        // 确定按钮使用的标签
        tag() {
            if (this.url) {
                return "a";
            } else if (this.to) {
                return "router-link";
            }
            return "button";
        },
        // 判断图标是否为URL
        isIconUrl() {
            return (
                this.icon &&
                (this.icon.startsWith("http") ||
                    this.icon.startsWith("/") ||
                    this.icon.startsWith("."))
            );
        },
        // 计算按钮样式
        buttonStyle() {
            const style = {};

            if (this.color) {
                if (this.plain) {
                    style.color = this.color;
                    style.borderColor = this.color;
                    style.background = "#fff";
                } else {
                    style.background = this.color;
                    style.borderColor = this.color;
                    style.color = "#fff";
                }
            }

            // 阴影效果
            if (this.shadow && !this.disabled && !this.plain) {
                style.boxShadow = `0 ${
                    this.size === "large" ? "8px" : "4px"
                } 12px rgba(0, 0, 0, 0.1)`;
            }

            return style;
        },
    },
    methods: {
        // 处理按钮点击事件
        handleClick(event) {
            // 禁用状态或加载状态下不触发点击事件
            if (this.disabled || this.loading) {
                event.preventDefault();
                return;
            }

            // 处理页面跳转
            if (this.url) {
                uni.navigateTo({ url: this.url });
            }

            // 触发点击事件
            this.$emit("click", event);
        },
    },
};
</script>

<style lang="scss" scoped>
// 按钮基础样式
.fanc-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    border-radius: 4px;
    border: 1px solid transparent;
    font-weight: 400;
    cursor: pointer;
    transition: all 300ms cubic-bezier(0.34, 0.69, 0.1, 1);
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;

    // 内容布局
    &__content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    // 图标样式
    &__icon {
        display: inline-flex;
        align-items: center;

        & + .fanc-button__text {
            margin-left: 4px;
        }
    }

    // 图片图标样式
    .fanc-icon-image {
        width: 1em;
        height: 1em;
    }

    // 加载状态样式
    &__loading {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    // 加载指示器样式
    .fanc-loading-indicator {
        border: 2px solid rgba(#000, 0.1);
        border-left-color: currentColor;
        border-radius: 50%;
        width: 1em;
        height: 1em;
        animation: fanc-spin 500ms linear infinite;
    }

    // 加载文字样式
    &__loading-text {
        margin-left: 4px;
    }

    // plain按钮点击统一背景色
    &.is-plain:active:not(.is-disabled) {
        background-color: var(--gray-100) !important; // 使用淡灰色作为统一背景色
    }

    // 默认按钮样式
    &--default {
        color: var(--text-primary);
        background-color: var(--bg-white);
        border-color: var(--border-color);

        &.is-plain {
            color: var(--text-primary);
            background-color: var(--bg-transparent);
            border-color: var(--border-color);
        }

        &:active:not(.is-disabled) {
            background-color: darken(#fff, 5%);
            border-color: darken(#dee2e6, 10%);
        }
    }

    // 主要按钮样式
    &--primary {
        color: var(--text-light);
        background-color: var(--fanc-primary-color);
        border-color: var(--fanc-primary-color);

        &.is-plain {
            color: var(--fanc-primary-color);
            background-color: var(--bg-transparent);
            border-color: var(--fanc-primary-color);
        }

        &:active:not(.is-disabled) {
            background-color: darken(#007bff, 10%);
            border-color: darken(#007bff, 10%);
        }
    }

    // 成功按钮样式
    &--success {
        color: var(--text-light);
        background-color: var(--fanc-success-color);
        border-color: var(--fanc-success-color);

        &.is-plain {
            color: var(--fanc-success-color);
            background-color: var(--bg-transparent);
            border-color: var(--fanc-success-color);
        }

        &:active:not(.is-disabled) {
            background-color: darken(#28a745, 10%);
            border-color: darken(#28a745, 10%);
        }
    }

    // 警告按钮样式
    &--warning {
        color: var(--text-light);
        background-color: var(--fanc-warning-color);
        border-color: var(--fanc-warning-color);

        &.is-plain {
            color: var(--fanc-warning-color);
            background-color: var(--bg-transparent);
            border-color: var(--fanc-warning-color);
        }

        &:active:not(.is-disabled) {
            background-color: darken(#ffc107, 10%);
            border-color: darken(#ffc107, 10%);
        }
    }

    // 危险按钮样式
    &--danger {
        color: var(--text-light);
        background-color: var(--fanc-danger-color);
        border-color: var(--fanc-danger-color);

        &.is-plain {
            color: var(--fanc-danger-color);
            background-color: var(--bg-transparent);
            border-color: var(--fanc-danger-color);
        }

        &:active:not(.is-disabled) {
            background-color: darken(#dc3545, 10%);
            border-color: darken(#dc3545, 10%);
        }
    }

    // 信息按钮样式
    &--info {
        color: var(--text-light);
        background-color: var(--fanc-info-color);
        border-color: var(--fanc-info-color);

        &.is-plain {
            color: var(--fanc-info-color);
            background-color: var(--bg-transparent);
            border-color: var(--fanc-info-color);
        }

        &:active:not(.is-disabled) {
            background-color: darken(#17a2b8, 10%);
            border-color: darken(#17a2b8, 10%);
        }
    }

    // 大尺寸按钮
    &--large {
        padding: 8px 16px;
        font-size: 16px;
        border-radius: 6px;
        height: 44px;
    }

    // 正常尺寸按钮
    &--normal {
        height: 36px;
    }

    // 小尺寸按钮
    &--small {
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 2px;
        height: 28px;
    }

    // 迷你尺寸按钮
    &--mini {
        padding: 3px 4px;
        font-size: 12px;
        border-radius: 2px;
        height: 24px;
    }

    // 圆角按钮
    &.is-round {
        border-radius: 100px;
    }

    // 方形按钮
    &.is-square {
        border-radius: 0;
    }

    // 块级按钮
    &.is-block {
        display: flex;
        width: 100%;
    }

    // 细边框按钮
    &.is-hairline {
        border-width: 0.5px;
    }

    // 禁用状态
    &.is-disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    // 加载状态
    &.is-loading {
        cursor: default;
        pointer-events: none;

        .fanc-button__content {
            opacity: 0;
        }

        // 为不同类型的按钮设置不同的加载指示器颜色
        &.fanc-button--default .fanc-loading-indicator {
            border-left-color: var(--text-primary);
        }

        &.fanc-button--primary .fanc-loading-indicator,
        &.fanc-button--success .fanc-loading-indicator,
        &.fanc-button--warning .fanc-loading-indicator,
        &.fanc-button--danger .fanc-loading-indicator,
        &.fanc-button--info .fanc-loading-indicator {
            border-left-color: var(--text-light);
        }

        // 当使用plain模式时，按照按钮的文字颜色来设置加载指示器的颜色
        &.is-plain {
            &.fanc-button--primary .fanc-loading-indicator {
                border-left-color: var(--fanc-primary-color);
            }

            &.fanc-button--success .fanc-loading-indicator {
                border-left-color: var(--fanc-success-color);
            }

            &.fanc-button--warning .fanc-loading-indicator {
                border-left-color: var(--fanc-warning-color);
            }

            &.fanc-button--danger .fanc-loading-indicator {
                border-left-color: var(--fanc-danger-color);
            }

            &.fanc-button--info .fanc-loading-indicator {
                border-left-color: var(--fanc-info-color);
            }
        }
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
