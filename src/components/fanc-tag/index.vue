<template>
    <view
        class="fanc-tag"
        :class="[
            `fanc-tag--${type}`,
            {
                'fanc-tag--plain': plain,
                'fanc-tag--round': round,
                'fanc-tag--mark': mark,
                'fanc-tag--closeable': closeable,
                'fanc-tag--disabled': disabled,
                [`fanc-tag--${size}`]: size,
            },
        ]"
        :style="tagStyle"
        @click="onClick"
    >
        <slot></slot>
        <text v-if="closeable" class="fanc-tag__close" @click.stop="onClose">
            <fanc-icon name="times" size="12"></fanc-icon>
        </text>
    </view>
</template>

<script>
export default {
    name: "fanc-tag",
    props: {
        // 标签类型
        type: {
            type: String,
            default: "default",
            validator: (value) => {
                return ["default", "primary", "success", "warning", "danger", "info"].includes(
                    value
                );
            },
        },
        // 是否为空心样式
        plain: {
            type: Boolean,
            default: false,
        },
        // 是否为圆角样式
        round: {
            type: Boolean,
            default: false,
        },
        // 是否为标记样式(半圆角)
        mark: {
            type: Boolean,
            default: false,
        },
        // 是否为可关闭标签
        closeable: {
            type: Boolean,
            default: false,
        },
        // 标签是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 标签尺寸
        size: {
            type: String,
            default: "medium",
            validator: (value) => {
                return ["small", "medium", "large"].includes(value);
            },
        },
        // 文本颜色
        textColor: {
            type: String,
            default: "",
        },
        // 背景颜色
        color: {
            type: String,
            default: "",
        },
    },
    computed: {
        tagStyle() {
            const style = {};
            if (this.color) {
                style.backgroundColor = this.color;
                if (this.plain) {
                    style.color = this.color;
                    style.borderColor = this.color;
                }
            }
            if (this.textColor) {
                style.color = this.textColor;
            }
            return style;
        },
    },
    methods: {
        onClick(event) {
            if (this.disabled) return;
            this.$emit("click", event);
        },
        onClose(event) {
            if (this.disabled) return;
            event.stopPropagation();
            this.$emit("close", event);
        },
    },
};
</script>

<style>
.fanc-tag {
    display: inline-flex;
    align-items: center;
    padding: var(--tag-padding-medium);
    border-radius: var(--tag-border-radius);
    font-size: var(--tag-font-size-medium);
    line-height: var(--tag-line-height-medium);
    white-space: nowrap;
    color: var(--tag-default-color);
    background-color: var(--tag-default-bg-color);
    box-sizing: border-box;
}

.fanc-tag--primary {
    color: var(--tag-primary-color);
    background-color: var(--tag-primary-bg-color);
}

.fanc-tag--success {
    color: var(--tag-success-color);
    background-color: var(--tag-success-bg-color);
}

.fanc-tag--warning {
    color: var(--tag-warning-color);
    background-color: var(--tag-warning-bg-color);
}

.fanc-tag--danger {
    color: var(--tag-danger-color);
    background-color: var(--tag-danger-bg-color);
}

.fanc-tag--info {
    color: var(--tag-info-color);
    background-color: var(--tag-info-bg-color);
}

.fanc-tag--default {
    color: var(--tag-default-color);
    background-color: var(--tag-default-bg-color);
}

/* 空心样式 */
.fanc-tag--plain {
    background-color: var(--tag-plain-bg-color);
    border: var(--tag-plain-border-width) solid var(--gray-600);
    color: var(--gray-600);
}

.fanc-tag--plain.fanc-tag--primary {
    border-color: var(--tag-primary-bg-color);
    color: var(--tag-primary-bg-color);
}

.fanc-tag--plain.fanc-tag--success {
    border-color: var(--tag-success-bg-color);
    color: var(--tag-success-bg-color);
}

.fanc-tag--plain.fanc-tag--warning {
    border-color: var(--tag-warning-bg-color);
    color: var(--tag-warning-bg-color);
}

.fanc-tag--plain.fanc-tag--danger {
    border-color: var(--tag-danger-bg-color);
    color: var(--tag-danger-bg-color);
}

.fanc-tag--plain.fanc-tag--info {
    border-color: var(--tag-info-bg-color);
    color: var(--tag-info-bg-color);
}

.fanc-tag--plain.fanc-tag--default {
    border-color: var(--gray-400);
    color: var(--tag-default-color);
}

/* 圆角样式 */
.fanc-tag--round {
    border-radius: var(--tag-round-border-radius);
}

/* 标记样式 */
.fanc-tag--mark {
    border-radius: 0 var(--tag-round-border-radius) var(--tag-round-border-radius) 0;
}

/* 尺寸 */
.fanc-tag--small {
    font-size: var(--tag-font-size-small);
    padding: var(--tag-padding-small);
    line-height: var(--tag-line-height-small);
}

.fanc-tag--medium {
    font-size: var(--tag-font-size-medium);
    padding: var(--tag-padding-medium);
    line-height: var(--tag-line-height-medium);
}

.fanc-tag--large {
    font-size: var(--tag-font-size-large);
    padding: var(--tag-padding-large);
    line-height: var(--tag-line-height-large);
}

/* 关闭按钮 */
.fanc-tag__close {
    margin-left: var(--tag-close-margin-left);
    cursor: pointer;
    line-height: 1;
}

/* 禁用样式 */
.fanc-tag--disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.fanc-tag--disabled.fanc-tag--plain {
    border-color: var(--gray-400);
    color: var(--gray-400);
}
</style>
