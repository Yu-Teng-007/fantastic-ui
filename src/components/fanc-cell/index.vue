<template>
    <view
        class="fanc-cell"
        :class="[
            center ? 'fanc-cell--center' : '',
            isLink ? 'fanc-cell--clickable' : '',
            borderless ? 'fanc-cell--borderless' : '',
            large ? 'fanc-cell--large' : '',
            label || $slots.label ? 'fanc-cell--has-label' : '',
            isLink ? 'fanc-cell--hover' : '',
        ]"
        @click="onClick"
    >
        <view :class="['fanc-cell__left', titleWidth ? 'fanc-cell__left--' + titleWidth : '']">
            <!-- 自定义左侧图标 -->
            <slot name="icon" v-if="$slots.icon"> </slot>
            <!-- 默认图标 -->
            <view class="fanc-cell__icon" v-else-if="icon">
                <fanc-icon :name="icon" class="fanc-cell__icon-inner" size="16" />
            </view>

            <view class="fanc-cell__title">
                <!-- 自定义标题 -->
                <slot name="title" v-if="$slots.title"> </slot>
                <!-- 默认标题 -->
                <block v-else>
                    <text>{{ title }}</text>
                </block>

                <!-- 自定义标题下方描述 -->
                <slot name="description" v-if="$slots.description"> </slot>
                <!-- 默认描述 -->
                <view class="fanc-cell__description" v-else-if="description">
                    <text>{{ description }}</text>
                </view>
            </view>
        </view>

        <view class="fanc-cell__content">
            <!-- 自定义右侧内容 -->
            <slot v-if="$slots.default"> </slot>
            <!-- 默认内容 -->
            <text v-else-if="content">{{ content }}</text>
        </view>

        <!-- 自定义右侧图标 -->
        <slot name="right-icon" v-if="$slots['right-icon']"> </slot>
        <!-- 默认箭头 -->
        <view class="fanc-cell__right-icon" v-else-if="isLink">
            <fanc-icon
                color="#bfbfbf"
                size="16"
                :name="arrowDirection ? 'angle-' + arrowDirection : 'angle-right'"
                class="fanc-cell__right-icon-inner"
            />
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-cell",

    props: {
        // 单元格标题
        title: {
            type: String,
            default: "",
        },
        // 单元格右侧内容
        content: {
            type: String,
            default: "",
        },
        // 标题下方描述
        description: {
            type: String,
            default: "",
        },
        // 左侧图标名称
        icon: {
            type: String,
            default: "",
        },
        // 是否显示右侧箭头
        isLink: {
            type: Boolean,
            default: false,
        },
        // 箭头方向，可选值为 left、up、down
        arrowDirection: {
            type: String,
            default: "right",
            validator: (value) => {
                return ["left", "up", "down", "right"].includes(value);
            },
        },
        // 是否使用大号单元格
        large: {
            type: Boolean,
            default: false,
        },
        // 是否垂直居中
        center: {
            type: Boolean,
            default: false,
        },
        // 是否隐藏底部边框
        borderless: {
            type: Boolean,
            default: false,
        },
        // 标题宽度，默认为 auto
        titleWidth: {
            type: String,
            default: "",
        },
        // 点击后跳转的链接地址
        url: {
            type: String,
            default: "",
        },
        // 点击后跳转的路由对象
        to: {
            type: [String, Object],
            default: "",
        },
    },

    methods: {
        onClick() {
            this.$emit("click");

            // 处理链接跳转
            if (this.url) {
                uni.navigateTo({
                    url: this.url,
                });
                return;
            }

            // 处理路由跳转
            if (this.to) {
                if (typeof this.to === "string") {
                    uni.navigateTo({
                        url: this.to,
                    });
                } else {
                    const { type = "navigateTo", url } = this.to;
                    if (url) {
                        uni[type]({
                            url,
                        });
                    }
                }
            }
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.fanc-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: $cell-padding-y $cell-padding-x;
    background-color: $white;
    line-height: $line-height-base;

    &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: $cell-padding-x;
        bottom: 0;
        left: $cell-padding-x;
        border-bottom: $border-width solid $border-color;
        transform: scaleY(0.5);
    }

    &--borderless::after {
        display: none;
    }

    &--large {
        padding-top: $spacing-md;
        padding-bottom: $spacing-md;
    }

    &--center {
        align-items: center;
    }

    &--clickable {
        cursor: pointer;
    }

    &--hover:active {
        background-color: rgba($black, 0.05);
    }

    &__left {
        display: flex;
        align-items: center;
        flex: 1;

        &--auto {
            width: auto;
        }

        &--fixed {
            width: 88px;
        }
    }

    &__icon {
        margin-right: $spacing-xs;
        font-size: $font-size-base;

        &-inner {
            display: block;
            min-width: 1em;
            color: $gray-600;
        }
    }

    &__title {
        flex: 1;

        &:empty {
            display: none;
        }
    }

    &__description {
        margin-top: $spacing-xs;
        color: $gray-600;
        font-size: $font-size-sm;
        line-height: $line-height-base * 0.75;
    }

    &__content {
        flex: 1;
        position: relative;
        overflow: hidden;
        text-align: right;
        vertical-align: middle;
        color: $gray-600;
    }

    &__right-icon {
        margin-left: $spacing-xs;
        color: $gray-600;
        display: flex;
        align-items: center;

        &-inner {
            display: block;
            font-size: $font-size-base;
        }
    }

    &--has-label {
        padding-bottom: $spacing-xs * 1.5;
    }
}
</style>
