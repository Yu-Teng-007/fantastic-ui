<template>
    <view class="fanc-popover">
        <view
            class="fanc-popover__reference"
            @click="onClick"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
            <slot></slot>
        </view>
        <view
            v-if="showPopover"
            class="fanc-popover__wrapper"
            :class="[`fanc-popover__wrapper--${placement}`]"
            @click.stop
        >
            <view
                class="fanc-popover__content"
                :class="[
                    `fanc-popover__content--${theme}`,
                    `fanc-popover__content--${placement}`,
                    'fanc-popover-animation',
                ]"
            >
                <!-- 气泡箭头 -->
                <view
                    class="fanc-popover__arrow"
                    :class="[`fanc-popover__arrow--${theme}`, `fanc-popover__arrow--${placement}`]"
                ></view>
                <view class="fanc-popover__inner">
                    <!-- 自定义标题 -->
                    <view v-if="title" class="fanc-popover__title">{{ title }}</view>
                    <!-- 内容插槽 -->
                    <view class="fanc-popover__text">
                        <slot name="content">{{ content }}</slot>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancPopover",
    props: {
        // 展示文本内容
        content: {
            type: String,
            default: "",
        },
        // 标题
        title: {
            type: String,
            default: "",
        },
        // 主题风格
        theme: {
            type: String,
            default: "dark",
            validator: (value) => ["light", "dark"].includes(value),
        },
        // 触发方式: click, hover
        trigger: {
            type: String,
            default: "click",
            validator: (value) => ["click", "hover"].includes(value),
        },
        // 气泡位置
        placement: {
            type: String,
            default: "top",
            validator: (value) =>
                [
                    "top",
                    "bottom",
                    "left",
                    "right",
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                    "left-top",
                    "left-bottom",
                    "right-top",
                    "right-bottom",
                ].includes(value),
        },
        // 自动关闭延时，单位毫秒，0表示不自动关闭
        duration: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            showPopover: false,
            timer: null,
        };
    },
    created() {
        // #ifdef H5
        // H5平台，添加点击外部关闭功能
        if (typeof document !== "undefined") {
            this._handleDocumentClick = (e) => {
                const target = e.target;
                const popover = this.$el;
                if (popover && !popover.contains(target)) {
                    this.close();
                }
            };
        }
        // #endif
    },
    watch: {
        showPopover(newVal) {
            if (newVal) {
                this.$emit("open");

                // 添加点击外部关闭功能
                // #ifdef H5
                if (typeof document !== "undefined") {
                    setTimeout(() => {
                        document.addEventListener("click", this._handleDocumentClick);
                    }, 0);
                }
                // #endif

                // 自动关闭
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        this.close();
                    }, this.duration);
                }
            } else {
                this.$emit("close");

                // 移除点击外部关闭监听
                // #ifdef H5
                if (typeof document !== "undefined") {
                    document.removeEventListener("click", this._handleDocumentClick);
                }
                // #endif

                // 清除计时器
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            }
        },
    },
    methods: {
        // 切换显示状态
        toggle() {
            this.showPopover = !this.showPopover;
        },
        // 点击事件
        onClick() {
            if (this.trigger === "click") {
                this.toggle();
            }
        },
        // 触摸开始 (用于模拟hover效果)
        onTouchStart() {
            if (this.trigger === "hover") {
                this.showPopover = true;
            }
        },
        // 触摸结束
        onTouchEnd() {
            if (this.trigger === "hover" && this.duration === 0) {
                setTimeout(() => {
                    this.showPopover = false;
                }, 200);
            }
        },
        // 手动打开
        open() {
            this.showPopover = true;
        },
        // 手动关闭
        close() {
            this.showPopover = false;
        },
    },
    beforeDestroy() {
        // #ifdef H5
        if (typeof document !== "undefined") {
            document.removeEventListener("click", this._handleDocumentClick);
        }
        // #endif

        // 清除计时器
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },
};
</script>

<style lang="scss">
.fanc-popover {
    position: relative;
    display: inline-block;

    &__reference {
        display: inline-flex;
    }

    &__wrapper {
        position: absolute;
        z-index: 100;

        /* 基础位置 */
        &--top {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 10px;
        }

        &--bottom {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 10px;
        }

        &--left {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-right: 10px;
        }

        &--right {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 10px;
        }

        /* 扩展位置 */
        &--top-left {
            bottom: 100%;
            left: 0;
            margin-bottom: 10px;
        }

        &--top-right {
            bottom: 100%;
            right: 0;
            margin-bottom: 10px;
        }

        &--bottom-left {
            top: 100%;
            left: 0;
            margin-top: 10px;
        }

        &--bottom-right {
            top: 100%;
            right: 0;
            margin-top: 10px;
        }

        &--left-top {
            right: 100%;
            top: 0;
            margin-right: 10px;
        }

        &--left-bottom {
            right: 100%;
            bottom: 0;
            margin-right: 10px;
        }

        &--right-top {
            left: 100%;
            top: 0;
            margin-left: 10px;
        }

        &--right-bottom {
            left: 100%;
            bottom: 0;
            margin-left: 10px;
        }
    }

    &__content {
        position: relative;
        min-width: 120px;
        padding: 10px 12px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        z-index: 999;
        animation-duration: 0.2s;

        // 亮色主题（默认）
        &--light {
            background-color: var(--bg-white);
            color: var(--text-primary);
            border: 1px solid var(--border-color-light);
        }

        // 暗色主题
        &--dark {
            background-color: var(--dark-color);
            color: var(--text-light);
            border: 1px solid var(--dark-color);
        }
    }

    &__arrow {
        position: absolute;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);

        // 亮色主题（默认）
        &--light {
            background-color: var(--bg-white);
            border: 1px solid var(--border-color-light);
        }

        // 暗色主题
        &--dark {
            background-color: var(--dark-color);
            border: 1px solid var(--dark-color);
        }

        /* 基础箭头位置 */
        &--top {
            bottom: -6px;
            left: 50%;
            margin-left: -5px;
            border-right: none;
            border-bottom: none;
        }

        &--bottom {
            top: -6px;
            left: 50%;
            margin-left: -5px;
            border-left: none;
            border-top: none;
        }

        &--left {
            right: -6px;
            top: 50%;
            margin-top: -5px;
            border-left: none;
            border-bottom: none;
        }

        &--right {
            left: -6px;
            top: 50%;
            margin-top: -5px;
            border-right: none;
            border-top: none;
        }

        /* 扩展箭头位置 */
        &--top-left {
            bottom: -6px;
            left: 10px;
            border-right: none;
            border-bottom: none;
        }

        &--top-right {
            bottom: -6px;
            right: 10px;
            border-right: none;
            border-bottom: none;
        }

        &--bottom-left {
            top: -6px;
            left: 10px;
            border-left: none;
            border-top: none;
        }

        &--bottom-right {
            top: -6px;
            right: 10px;
            border-left: none;
            border-top: none;
        }

        &--left-top {
            right: -6px;
            top: 10px;
            border-left: none;
            border-bottom: none;
        }

        &--left-bottom {
            right: -6px;
            bottom: 10px;
            border-left: none;
            border-bottom: none;
        }

        &--right-top {
            left: -6px;
            top: 10px;
            border-right: none;
            border-top: none;
        }

        &--right-bottom {
            left: -6px;
            bottom: 10px;
            border-right: none;
            border-top: none;
        }
    }

    &__inner {
        position: relative;
    }

    &__title {
        font-weight: 500;
        margin-bottom: 4px;
    }

    &__text {
        font-size: 14px;
        line-height: 1.4;
    }
}

.fanc-popover-animation {
    animation: fancPopoverFadeIn 0.2s ease-in-out;
}

@keyframes fancPopoverFadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* 增加容器宽度以确保充分显示 */
@media screen and (max-width: 375px) {
    .fanc-popover {
        &__content {
            max-width: 240px;
        }
    }
}
</style>
