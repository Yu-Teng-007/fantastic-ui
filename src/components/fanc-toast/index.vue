<template>
    <view>
        <!-- 遮罩层 -->
        <view
            v-if="isShow && mask"
            class="fanc-toast__mask"
            :class="{ 'fanc-toast__mask--lock': lockBackground }"
            :style="{ zIndex: zIndex - 1 }"
            @click="onMaskClick"
        ></view>

        <!-- Toast主体 -->
        <view
            v-if="isShow"
            class="fanc-toast"
            :class="[
                `fanc-toast--${position}`,
                `fanc-toast--${type}`,
                { 'fanc-toast--with-icon': showIcon || type === 'loading' },
            ]"
            :style="[
                {
                    zIndex: zIndex,
                    maxWidth: maxWidth,
                },
                customStyle,
            ]"
        >
            <!-- Toast 内容容器 -->
            <view class="fanc-toast__container">
                <!-- 图标 -->
                <view v-if="showIcon || type === 'loading'" class="fanc-toast__icon">
                    <view v-if="type === 'loading'" class="fanc-toast__loading">
                        <view
                            v-for="(item, index) in 12"
                            :key="index"
                            class="fanc-toast__loading-item"
                            :style="{
                                transform: `rotate(${index * 30}deg)`,
                                'animation-delay': `${index * 0.08333333}s`,
                            }"
                        ></view>
                    </view>
                    <fanc-icon v-else :name="iconName" :size="24"></fanc-icon>
                </view>

                <!-- 消息内容 -->
                <view v-if="message" class="fanc-toast__text">{{ message }}</view>
            </view>
        </view>
    </view>
</template>

<script>
/**
 * fanc-toast 轻提示
 * @description 用于轻量级反馈或提示，可以简单地使用文字或图标
 * @property {String} id - Toast 实例的唯一标识（由插件自动生成）
 * @property {String} message - 提示文本内容
 * @property {String} type - 提示类型，可选值为 text/success/error/warning/loading
 * @property {String} position - 显示位置，可选值为 center/top/bottom
 * @property {Boolean} mask - 是否显示背景遮罩
 * @property {Boolean} maskClosable - 点击遮罩是否可关闭
 * @property {Boolean} lockBackground - 遮罩显示时是否锁定背景
 * @property {Number} duration - 展示时长(ms)，值为 0 时，toast 不会自动消失
 * @property {Boolean} showIcon - 是否显示图标，loading 类型下不生效
 * @property {Number} zIndex - 层级
 * @property {String} maxWidth - 最大宽度，默认为 70%
 * @property {Object} customStyle - 自定义样式
 * @event {Function} close - 关闭时触发
 */
import {
    TOAST_ZINDEX,
    TOAST_DEFAULT_DURATION,
    TOAST_TYPES,
    TOAST_POSITIONS,
    TOAST_MAX_WIDTH,
    TOAST_ICON_MAP,
} from "@/configs/toast";

export default {
    name: "fanc-toast",

    props: {
        id: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
            validator: (value) => TOAST_TYPES.includes(value),
        },
        position: {
            type: String,
            default: "center",
            validator: (value) => TOAST_POSITIONS.includes(value),
        },
        mask: {
            type: Boolean,
            default: false,
        },
        maskClosable: {
            type: Boolean,
            default: false,
        },
        lockBackground: {
            type: Boolean,
            default: false,
        },
        duration: {
            type: Number,
            default: TOAST_DEFAULT_DURATION,
        },
        showIcon: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: TOAST_ZINDEX,
        },
        maxWidth: {
            type: String,
            default: TOAST_MAX_WIDTH,
        },
        customStyle: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            isShow: false,
            timer: null,
            onClose: null, // 关闭回调函数，由外部设置
            originalBodyOverflow: "", // 保存原始body overflow样式
        };
    },

    computed: {
        // 根据类型获取对应的图标
        iconName() {
            return TOAST_ICON_MAP[this.type] || "";
        },
    },

    watch: {
        duration: {
            handler(val) {
                // 清除旧定时器
                this.clearTimer();
                // 如果 Toast 已显示且持续时间大于 0，则设置新定时器
                if (this.isShow && val > 0) {
                    this.startTimer();
                }
            },
            immediate: true,
        },

        // 监听显示状态和锁定背景的变化
        isShow(val) {
            if (this.mask && this.lockBackground) {
                if (val) {
                    this.lockBodyScroll();
                } else {
                    this.unlockBodyScroll();
                }
            }
        },
    },

    mounted() {
        // 启动延迟以让过渡效果生效
        setTimeout(() => {
            this.isShow = true;

            // 如果设置了自动关闭，则启动定时器
            if (this.duration > 0) {
                this.startTimer();
            }
        }, 10);
    },

    beforeDestroy() {
        this.clearTimer();

        // 确保组件销毁时解锁背景
        if (this.mask && this.lockBackground && this.isShow) {
            this.unlockBodyScroll();
        }
    },

    methods: {
        // 锁定背景滚动
        lockBodyScroll() {
            if (typeof document !== "undefined") {
                this.originalBodyOverflow = document.body.style.overflow;
                document.body.style.overflow = "hidden";
            }
        },

        // 解锁背景滚动
        unlockBodyScroll() {
            if (typeof document !== "undefined") {
                document.body.style.overflow = this.originalBodyOverflow;
            }
        },

        // 开始计时器
        startTimer() {
            this.clearTimer();
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    this.close();
                }, this.duration);
            }
        },

        // 清除计时器
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },

        // 点击遮罩
        onMaskClick() {
            if (this.maskClosable) {
                this.close();
            }
        },

        // 关闭 Toast
        close() {
            this.isShow = false;

            // 通过延迟执行关闭回调，让过渡动画完成
            setTimeout(() => {
                // 执行外部传入的关闭回调
                if (typeof this.onClose === "function") {
                    this.onClose();
                }

                // 组件内部事件
                this.$emit("close");
            }, 200);
        },
    },
};
</script>

<style lang="scss">
.fanc-toast {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    max-width: var(--toast-max-width, 70%);
    transition: all 0.2s;
    pointer-events: auto;

    // 位置
    &--center {
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &--top {
        top: 20%;
        transform: translateX(-50%);
    }

    &--bottom {
        bottom: 20%;
        transform: translateX(-50%);
    }

    // 遮罩层
    &__mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--toast-mask-color, rgba(0, 0, 0, 0.3));
        pointer-events: auto;

        // 锁定背景时的样式
        &--lock {
            overflow: hidden;
            touch-action: none;
        }
    }

    // 容器
    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px;
        border-radius: 8px;
        background-color: var(--toast-bg-color, rgba(0, 0, 0, 0.7));
        color: var(--toast-text-color, #fff);
        pointer-events: auto;
        box-shadow: 0 3px 6px var(--toast-shadow-color, rgba(0, 0, 0, 0.16));
        min-width: 120px;
        max-width: 100%;
        box-sizing: border-box;
    }

    // 图标
    &__icon {
        margin-bottom: 8px;
        color: var(--toast-icon-color, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    // Loading 动画
    &__loading {
        width: 30px;
        height: 30px;
        position: relative;

        &-item {
            position: absolute;
            top: 0;
            left: 14px;
            width: 2px;
            height: 8px;
            border-radius: 1px;
            background-color: var(--toast-loading-color, #fff);
            opacity: 0.2;
            transform-origin: center 15px;
            animation: fanc-toast-loading 1.2s linear infinite;

            @for $i from 1 through 12 {
                &:nth-child(#{$i}) {
                    opacity: 0.2 + ($i - 1) * 0.06;
                }
            }
        }
    }

    // 文本
    &__text {
        font-size: 14px;
        line-height: 1.5;
        text-align: center;
        word-break: break-word;
    }

    // 类型样式
    &--success {
        .fanc-toast__icon {
            color: var(--toast-success-color, #fff);
        }
    }

    &--error {
        .fanc-toast__icon {
            color: var(--toast-error-color, #fff);
        }
    }

    &--warning {
        .fanc-toast__icon {
            color: var(--toast-warning-color, #fff);
        }
    }

    &--loading {
        .fanc-toast__icon {
            color: var(--toast-loading-color, #fff);
        }
    }

    // 带有图标的样式
    &--with-icon {
        .fanc-toast__container {
            min-width: 120px;
            padding: 16px;
        }
    }
}

// Loading 动画关键帧
@keyframes fanc-toast-loading {
    0% {
        opacity: 0.25;
    }
    100% {
        opacity: 1;
    }
}
</style>
