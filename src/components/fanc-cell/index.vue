<template>
    <view
        class="fanc-cell"
        :class="[
            center ? 'fanc-cell--center' : '',
            borderless ? 'fanc-cell--borderless' : '',
            large ? 'fanc-cell--large' : '',
            isLink ? 'fanc-cell--hover fanc-cell--clickable' : '',
        ]"
        @click="onClick"
    >
        <!-- 自定义左侧区域 -->
        <view
            class="fanc-cell__left-container"
            :class="{ 'fanc-cell__left-container--center': center }"
        >
            <slot name="left" v-if="$slots.left"></slot>
        </view>
        <view
            v-if="!$slots.left"
            :class="['fanc-cell__left', titleWidth ? 'fanc-cell__left--' + titleWidth : '']"
        >
            <view class="fanc-cell__icon" v-if="icon">
                <fanc-icon :name="icon" class="fanc-cell__icon-inner" size="16" />
            </view>

            <view class="fanc-cell__title">
                <!-- 自定义标题 -->
                <slot name="title" v-if="$slots.title"> </slot>
                <!-- 默认标题 -->
                <block v-else class="fanc-cell__title-inner">
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
            <slot name="content" v-else-if="content || $slots.content">
                <text>{{ content }}</text>
            </slot>
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
.fanc-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    background-color: var(--white);
    line-height: 1.5;
    align-items: flex-start;

    &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid var(--border-color);
        transform: scaleY(0.5);
    }

    &--borderless::after {
        display: none;
    }

    &--large {
        padding-top: 14px;
        padding-bottom: 14px;
    }

    &--center {
        align-items: center;

        .fanc-cell__left {
            align-items: center;
        }
    }

    &--clickable {
        cursor: pointer;
    }

    &--hover:active {
        background-color: rgba(#323233, 0.05);
    }

    &__left-container {
        display: flex;
        align-items: flex-start;

        &--center {
            align-items: center;
        }
    }

    &__left {
        display: flex;
        align-items: flex-start;
        flex: 1;

        &--auto {
            width: auto;
        }

        &--fixed {
            width: 88px;
        }
    }

    &__icon {
        margin-right: 6px;
        width: 16px;
        height: 16px;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 2px;

        &-inner {
            display: block;
            min-width: 1em;
            color: var(--gray-600);
        }
    }

    &__title {
        flex: 1;
        color: var(--black-300);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 24px;
        font-size: 14px;

        &:empty {
            display: none;
        }
    }

    &__description {
        margin-top: 4px;
        color: var(--gray-600);
        font-size: 12px;
        line-height: 1.2;
    }

    &__content {
        flex: 2;
        position: relative;
        text-align: right;
        color: var(--gray-600);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 24px;
        font-size: 14px;
        padding-top: 0;
    }

    &__right-icon {
        margin-left: 4px;
        color: var(--gray-600);
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 4px;

        &-inner {
            display: block;
            width: 16px;
            height: 16px;
            text-align: center;
        }
    }
}
</style>
