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
                <image v-if="isIconUrl" :src="icon" class="fanc-icon-image" />
                <text v-else :class="['fanc-icon', icon]"></text>
            </view>
            <text v-if="!loading || (loading && loadingText)" class="fanc-button__text">
                <slot></slot>
            </text>
        </view>
    </component>
</template>

<script>
export default {
    name: "fanc-button",
    props: {
        type: {
            type: String,
            default: "default",
            validator: (value) => ["default", "primary", "success", "warning", "danger"].includes(value),
        },
        plain: Boolean,
        disabled: Boolean,
        loading: Boolean,
        loadingText: String,
        square: Boolean,
        round: Boolean,
        icon: String,
        size: {
            type: String,
            default: "normal",
            validator: (value) => ["large", "normal", "small", "mini"].includes(value),
        },
        block: Boolean,
        url: String,
        to: [String, Object],
        color: String,
    },
    computed: {
        tag() {
            if (this.url) {
                return "a";
            } else if (this.to) {
                return "router-link";
            }
            return "button";
        },
        isIconUrl() {
            return (
                this.icon && (this.icon.startsWith("http") || this.icon.startsWith("/") || this.icon.startsWith("."))
            );
        },
        buttonStyle() {
            const style = {};
            if (this.color) {
                if (this.plain) {
                    style.color = this.color;
                    style.borderColor = this.color;
                    style.backgroundColor = "#fff";
                } else {
                    style.backgroundColor = this.color;
                    style.borderColor = this.color;
                    style.color = "#fff";
                }
            }
            return style;
        },
    },
    methods: {
        handleClick(event) {
            if (this.disabled || this.loading) {
                event.preventDefault();
                return;
            }
            if (this.url) {
                uni.navigateTo({ url: this.url });
            } else if (this.to) {
            }
            this.$emit("click", event);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/uni.scss";

.fanc-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: $btn-padding-y $btn-padding-x;
    font-size: $btn-font-size;
    line-height: $btn-line-height;
    text-align: center;
    border-radius: $btn-border-radius;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;

    &__content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    &__icon {
        display: inline-flex;
        align-items: center;
        & + .fanc-button__text {
            margin-left: 0.3em;
        }
    }

    .fanc-icon-image {
        width: 1em;
        height: 1em;
    }

    &__loading {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .fanc-loading-indicator {
        border: 2px solid rgba(0, 0, 0, 0.1);
        border-left-color: currentColor;
        border-radius: 50%;
        width: 1em;
        height: 1em;
        animation: fanc-spin 0.8s linear infinite;
    }

    &__loading-text {
        margin-left: 0.5em;
    }

    &--default {
        color: $uni-text-color;
        background-color: $uni-bg-color;
        border-color: $uni-border-color;

        &.is-plain {
            color: $uni-text-color;
            background-color: transparent;
            border-color: $uni-border-color;
        }

        &:active:not(.is-disabled) {
            background-color: darken($uni-bg-color, 5%);
        }
    }

    &--primary {
        color: $uni-text-color-inverse;
        background-color: $fanc-primary-color;
        border-color: $fanc-primary-color;

        &.is-plain {
            color: $fanc-primary-color;
            background-color: transparent;
            border-color: $fanc-primary-color;
        }
        &:active:not(.is-disabled) {
            background-color: darken($fanc-primary-color, 10%);
            border-color: darken($fanc-primary-color, 10%);
        }
    }

    &--success {
        color: $uni-text-color-inverse;
        background-color: $fanc-success-color;
        border-color: $fanc-success-color;

        &.is-plain {
            color: $fanc-success-color;
            background-color: transparent;
            border-color: $fanc-success-color;
        }
        &:active:not(.is-disabled) {
            background-color: darken($fanc-success-color, 10%);
            border-color: darken($fanc-success-color, 10%);
        }
    }

    &--warning {
        color: $uni-text-color-inverse;
        background-color: $fanc-warning-color;
        border-color: $fanc-warning-color;

        &.is-plain {
            color: $fanc-warning-color;
            background-color: transparent;
            border-color: $fanc-warning-color;
        }
        &:active:not(.is-disabled) {
            background-color: darken($fanc-warning-color, 10%);
            border-color: darken($fanc-warning-color, 10%);
        }
    }

    &--danger {
        color: $uni-text-color-inverse;
        background-color: $fanc-danger-color;
        border-color: $fanc-danger-color;

        &.is-plain {
            color: $fanc-danger-color;
            background-color: transparent;
            border-color: $fanc-danger-color;
        }
        &:active:not(.is-disabled) {
            background-color: darken($fanc-danger-color, 10%);
            border-color: darken($fanc-danger-color, 10%);
        }
    }

    &--large {
        padding: ($btn-padding-y * 1.25) ($btn-padding-x * 1.5);
        font-size: $uni-font-size-lg;
        border-radius: $border-radius-lg;
    }

    &--normal {
    }

    &--small {
        padding: ($btn-padding-y * 0.75) ($btn-padding-x * 1);
        font-size: $uni-font-size-sm;
        border-radius: $border-radius-sm;
    }

    &--mini {
        padding: ($btn-padding-y * 0.5) ($btn-padding-x * 0.75);
        font-size: $uni-font-size-sm * 0.9;
        border-radius: $border-radius-sm;
    }

    &.is-round {
        border-radius: 100px;
    }

    &.is-square {
        border-radius: 0;
    }

    &.is-block {
        display: flex;
        width: 100%;
    }

    &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;
        &:active {
        }
    }

    &.is-loading {
        cursor: default;
        .fanc-button__text:not(:empty),
        .fanc-button__icon:not(:empty) {
            visibility: hidden;
        }
        &.fanc-button--default .fanc-loading-indicator {
            border-left-color: $uni-text-color;
        }
        &.fanc-button--primary .fanc-loading-indicator {
            border-left-color: $uni-text-color-inverse;
        }
        &.fanc-button--success .fanc-loading-indicator {
            border-left-color: $uni-text-color-inverse;
        }
        &.fanc-button--warning .fanc-loading-indicator {
            border-left-color: $uni-text-color-inverse;
        }
        &.fanc-button--danger .fanc-loading-indicator {
            border-left-color: $uni-text-color-inverse;
        }
        &[style*="color"] .fanc-loading-indicator {
        }
    }
}

@keyframes fanc-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
