<template>
    <view
        class="fanc-switch"
        :class="[
            `fanc-switch--${size}`,
            {
                'is-checked': modelValue,
                'is-disabled': disabled,
                'is-loading': loading,
            },
        ]"
        :style="switchStyle"
        @click="handleClick"
    >
        <view class="fanc-switch__node">
            <view v-if="loading" class="fanc-switch__loading">
                <view class="fanc-loading-indicator"></view>
            </view>
        </view>
        <view v-if="activeText || inactiveText" class="fanc-switch__label">
            <text
                v-if="modelValue && activeText"
                class="fanc-switch__label-text fanc-switch__label-text--active"
                >{{ activeText }}</text
            >
            <text
                v-if="!modelValue && inactiveText"
                class="fanc-switch__label-text fanc-switch__label-text--inactive"
                >{{ inactiveText }}</text
            >
        </view>
    </view>
</template>

<script>
/**
 * fanc-switch 开关选择器
 * @description 开关选择器，用于在打开和关闭状态之间进行切换
 * @property {Boolean} modelValue/v-model - 开关选中状态
 * @property {Boolean} disabled - 是否为禁用状态
 * @property {Boolean} loading - 是否为加载状态
 * @property {String} size - 开关尺寸，可选值为 large/normal/small/mini
 * @property {String} activeColor - 打开时的背景色
 * @property {String} inactiveColor - 关闭时的背景色
 * @property {String} activeText - 打开时的文字描述
 * @property {String} inactiveText - 关闭时的文字描述
 * @property {String|Number} activeValue - 打开时的值
 * @property {String|Number} inactiveValue - 关闭时的值
 * @event {Function} change - 开关状态切换时触发
 */
export default {
    name: "fanc-switch",
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    props: {
        // 开关状态，支持v-model双向绑定
        modelValue: {
            type: Boolean,
            default: false,
        },
        // 是否为禁用状态
        disabled: Boolean,
        // 是否为加载状态
        loading: Boolean,
        // 开关尺寸
        size: {
            type: String,
            default: "normal",
            validator: (value) => ["large", "normal", "small", "mini"].includes(value),
        },
        // 打开时的背景色
        activeColor: String,
        // 关闭时的背景色
        inactiveColor: String,
        // 打开时的文字描述
        activeText: String,
        // 关闭时的文字描述
        inactiveText: String,
        // 打开时的值
        activeValue: {
            type: [String, Number, Boolean],
            default: true,
        },
        // 关闭时的值
        inactiveValue: {
            type: [String, Number, Boolean],
            default: false,
        },
    },
    emits: ["update:modelValue", "change"],
    computed: {
        // 计算开关样式
        switchStyle() {
            const style = {};

            if (this.activeColor && this.modelValue) {
                style.backgroundColor = this.activeColor;
                style.borderColor = this.activeColor;
            }

            if (this.inactiveColor && !this.modelValue) {
                style.backgroundColor = this.inactiveColor;
                style.borderColor = this.inactiveColor;
            }

            return style;
        },
    },
    methods: {
        // 处理开关点击事件
        handleClick() {
            // 禁用状态或加载状态下不触发点击事件
            if (this.disabled || this.loading) {
                return;
            }

            const newValue = !this.modelValue;
            const value = newValue ? this.activeValue : this.inactiveValue;

            this.$emit("update:modelValue", newValue);
            this.$emit("change", value);
        },
    },
};
</script>

<style lang="scss" scoped>
// 开关基础样式
.fanc-switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 100px;
    background-color: var(--switch-inactive-bg-color);
    border: 1px solid var(--switch-inactive-border-color);

    // 开关节点
    &__node {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: var(--switch-node-bg-color);
        box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05);
        transition: transform 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
    }

    // 加载指示器
    &__loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        .fanc-loading-indicator {
            width: 50%;
            height: 50%;
            border: 2px solid transparent;
            border-top-color: var(--switch-loading-color);
            border-radius: 50%;
            animation: fanc-switch-loading 0.8s linear infinite;
        }
    }

    // 文本标签
    &__label {
        margin-left: 8px;

        &-text {
            font-size: 14px;
            line-height: 1.5;

            &--active {
                color: var(--switch-active-text-color);
            }

            &--inactive {
                color: var(--switch-inactive-text-color);
            }
        }
    }

    // 大尺寸
    &--large {
        width: 60px;
        height: 32px;

        .fanc-switch__node {
            width: 28px;
            height: 28px;
            left: 1px;
            top: 1px;
        }

        &.is-checked .fanc-switch__node {
            transform: translateX(28px);
        }
    }

    // 正常尺寸
    &--normal {
        width: 50px;
        height: 28px;

        .fanc-switch__node {
            width: 24px;
            height: 24px;
            left: 1px;
            top: 1px;
        }

        &.is-checked .fanc-switch__node {
            transform: translateX(22px);
        }
    }

    // 小尺寸
    &--small {
        width: 40px;
        height: 24px;

        .fanc-switch__node {
            width: 20px;
            height: 20px;
            left: 1px;
            top: 1px;
        }

        &.is-checked .fanc-switch__node {
            transform: translateX(16px);
        }
    }

    // 迷你尺寸
    &--mini {
        width: 32px;
        height: 20px;

        .fanc-switch__node {
            width: 16px;
            height: 16px;
            left: 1px;
            top: 1px;
        }

        &.is-checked .fanc-switch__node {
            transform: translateX(12px);
        }
    }

    // 选中状态
    &.is-checked {
        background-color: var(--switch-active-bg-color);
        border-color: var(--switch-active-border-color);
    }

    // 禁用状态
    &.is-disabled {
        cursor: not-allowed;
        opacity: var(--switch-disabled-opacity);
    }
}

// 加载动画
@keyframes fanc-switch-loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
