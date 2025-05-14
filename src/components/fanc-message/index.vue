<template>
    <view
        v-if="isShow"
        class="fanc-message"
        :class="[
            `fanc-message--${type}`,
            isShow ? 'fanc-message--show' : '',
            closable ? 'fanc-message--with-close' : '',
            actionText ? 'fanc-message--with-action' : '',
            scrollable ? 'fanc-message--scrollable' : '',
            useHtml ? 'fanc-message--html' : '',
        ]"
        :style="messageStyle"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 消息图标 -->
        <view v-if="showIcon" class="fanc-message__icon">
            <fanc-icon :name="iconClass" :size="14"></fanc-icon>
        </view>

        <!-- 消息内容 -->
        <view class="fanc-message__content" :class="{ 'fanc-message__content--scroll': scrollable }">
            <view
                class="fanc-message__content-inner"
                :class="{ 'fanc-message__content-inner--scroll': scrollable && shouldScroll }"
            >
                <rich-text v-if="useHtml" :nodes="message"></rich-text>
                <text v-else>{{ message }}</text>
            </view>
        </view>

        <!-- 操作按钮 -->
        <view v-if="actionText" class="fanc-message__action" @click="handleAction">
            <text class="fanc-message__action-text">{{ actionText }}</text>
        </view>

        <!-- 关闭按钮 -->
        <view v-if="closable" class="fanc-message__close" @click="close">
            <fanc-icon name="times" :size="14"></fanc-icon>
        </view>
    </view>
</template>

<script>
/**
 * fanc-message 消息提示
 * @description 用于全局消息提示，支持不同类型的消息通知
 * @property {String} id - 消息ID
 * @property {String} message - 消息内容
 * @property {String} type - 消息类型，可选值为 info/success/warning/error
 * @property {Boolean} showIcon - 是否显示图标
 * @property {Number} duration - 显示时长，单位为毫秒，设为0则不自动关闭
 * @property {Boolean} closable - 是否显示关闭按钮
 * @property {Number} zIndex - 层级
 * @property {Number} offsetTop - 顶部偏移量
 * @property {String} actionText - 操作按钮文本，不为空时显示操作按钮
 * @property {Boolean} scrollable - 是否启用横向滚动
 * @property {Number} scrollSpeed - 滚动速度，单位为像素/秒
 * @property {Boolean} useHtml - 是否启用富文本支持
 * @event {Function} close - 关闭时触发
 * @event {Function} action - 点击操作按钮时触发
 */
export default {
    name: "fanc-message",

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
            default: "info",
            validator: (value) => ["info", "success", "warning", "error"].includes(value),
        },
        showIcon: {
            type: Boolean,
            default: true,
        },
        duration: {
            type: Number,
            default: 3000,
        },
        closable: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: 2000,
        },
        offsetTop: {
            type: Number,
            default: 20,
        },
        actionText: {
            type: String,
            default: "",
        },
        scrollable: {
            type: Boolean,
            default: false,
        },
        scrollSpeed: {
            type: Number,
            default: 50, // 滚动速度，单位为像素/秒
        },
        useHtml: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isShow: false,
            timer: null,
            onClose: null, // 关闭回调函数，由外部设置
            onAction: null, // 操作按钮回调函数，由外部设置
            shouldScroll: false, // 是否需要滚动
            contentWidth: 0, // 内容宽度
            containerWidth: 0, // 容器宽度
            scrollTimer: null, // 滚动定时器
        };
    },

    computed: {
        // 根据消息类型返回对应的图标类名
        iconClass() {
            const iconMap = {
                info: "info-circle",
                success: "check-circle",
                warning: "exclamation-circle",
                error: "tired",
            };
            return iconMap[this.type] || iconMap.info;
        },

        // 计算消息样式
        messageStyle() {
            return {
                zIndex: this.zIndex,
                top: `${this.offsetTop}px`,
                position: "fixed",
                left: "50%",
                transform: this.isShow ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-100%)",
                opacity: this.isShow ? 1 : 0,
            };
        },
    },

    watch: {
        duration: {
            handler(val) {
                // 清除旧定时器
                this.clearTimer();
                // 如果消息已显示且持续时间大于0，则设置新定时器
                if (this.isShow && val > 0) {
                    this.startTimer();
                }
            },
            immediate: true,
        },

        isShow(val) {
            if (val) {
                if (this.duration > 0) {
                    this.startTimer();
                }
                // 当消息显示时，检查是否需要滚动
                this.$nextTick(() => {
                    this.checkScrollable();
                });
            } else {
                // 消息隐藏时停止滚动
                this.stopScroll();
            }
        },

        message() {
            // 消息内容变化时，重新检查是否需要滚动
            this.$nextTick(() => {
                this.checkScrollable();
            });
        },

        scrollable(val) {
            if (val && this.isShow) {
                this.$nextTick(() => {
                    this.checkScrollable();
                });
            } else {
                this.stopScroll();
            }
        },
    },

    mounted() {
        // 在组件挂载后，确保样式生效
        setTimeout(() => {
            // 这个延迟确保过渡效果正常工作
            if (this.offsetTop > 0) {
                this.isShow = true;
            }
        }, 50);
    },

    beforeDestroy() {
        this.clearTimer();
        this.stopScroll();
    },

    methods: {
        // 开始定时器
        startTimer() {
            if (this.duration > 0) {
                this.clearTimer();
                this.timer = setTimeout(() => {
                    this.close();
                }, this.duration);
            }
        },

        // 清除定时器
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },

        // 关闭消息
        close() {
            this.isShow = false;
            this.clearTimer();
            this.stopScroll();

            // 调用外部传入的onClose
            if (typeof this.onClose === "function") {
                this.onClose();
            }
        },

        // 处理操作按钮点击
        handleAction() {
            // 点击操作按钮时，如果设置了自动关闭，则停止计时器
            this.clearTimer();

            // 调用外部传入的onAction
            if (typeof this.onAction === "function") {
                this.onAction();
            }

            // 默认点击操作按钮后关闭消息，除非设置了不自动关闭
            if (this.duration !== 0) {
                this.close();
            }
        },

        // 检查是否需要滚动
        checkScrollable() {
            if (!this.scrollable || !this.$el) return;

            try {
                const contentEl = this.$el.querySelector(".fanc-message__content-inner");
                const containerEl = this.$el.querySelector(".fanc-message__content");

                if (contentEl && containerEl) {
                    // 获取内容和容器的宽度
                    this.contentWidth = contentEl.scrollWidth || contentEl.offsetWidth;
                    this.containerWidth = containerEl.clientWidth;

                    // 如果内容宽度大于容器宽度，则需要滚动
                    this.shouldScroll = this.contentWidth > this.containerWidth;

                    if (this.shouldScroll) {
                        // 启动滚动动画
                        this.startScroll();
                    } else {
                        this.stopScroll();
                    }
                }
            } catch (e) {
                console.error("检查滚动失败:", e);
                this.shouldScroll = false;
            }
        },

        // 开始滚动
        startScroll() {
            this.stopScroll();

            // 计算滚动动画持续时间 (毫秒)
            const scrollDistance = this.contentWidth - this.containerWidth;
            const duration = (scrollDistance / this.scrollSpeed) * 1000;

            // 设置CSS动画
            const contentEl = this.$el.querySelector(".fanc-message__content-inner");
            if (contentEl) {
                // 设置滚动距离变量
                contentEl.style.setProperty("--scroll-distance", `${scrollDistance}px`);
                contentEl.style.animationDuration = `${duration}ms`;
                contentEl.style.animationName = "messageScroll";
                contentEl.style.animationTimingFunction = "linear";
                contentEl.style.animationIterationCount = "infinite";
                contentEl.style.animationDirection = "alternate";
                contentEl.style.animationPlayState = "running";
            }
        },

        // 鼠标进入时暂停滚动
        onMouseEnter() {
            if (this.scrollable && this.shouldScroll) {
                this.pauseScroll();
            }
        },

        // 鼠标离开时恢复滚动
        onMouseLeave() {
            if (this.scrollable && this.shouldScroll) {
                this.resumeScroll();
            }
        },

        // 暂停滚动
        pauseScroll() {
            const contentEl = this.$el && this.$el.querySelector(".fanc-message__content-inner");
            if (contentEl) {
                contentEl.style.animationPlayState = "paused";
            }
        },

        // 恢复滚动
        resumeScroll() {
            const contentEl = this.$el && this.$el.querySelector(".fanc-message__content-inner");
            if (contentEl) {
                contentEl.style.animationPlayState = "running";
            }
        },

        // 停止滚动
        stopScroll() {
            const contentEl = this.$el && this.$el.querySelector(".fanc-message__content-inner");
            if (contentEl) {
                contentEl.style.animationPlayState = "paused";
            }
        },
    },
};
</script>

<style lang="scss">
/* 定义滚动动画 */
@keyframes messageScroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(var(--scroll-distance, -30%) * -1));
    }
}

.fanc-message {
    position: fixed;
    min-width: 300px;
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    transition: all 0.3s;

    &__icon {
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            font-size: 16px;
        }
    }

    &__content {
        flex: 1;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;

        &--scroll {
            overflow: hidden;
            white-space: nowrap;
        }

        &-inner {
            display: inline-block;

            &--scroll {
                white-space: nowrap;
                padding-right: 20px;
                will-change: transform;
            }
        }

        text {
            color: inherit;
        }
    }

    &__action {
        margin-left: 16px;
        cursor: pointer;
        padding: 2px 8px;
        border-radius: 3px;
        transition: background-color 0.2s, opacity 0.2s;

        &:active {
            opacity: 0.7;
        }

        &-text {
            font-size: 13px;
            font-weight: 500;
        }
    }

    &__close {
        margin-left: 12px;
        cursor: pointer;
        font-size: 14px;
        color: #909399;
    }

    // 不同类型的消息样式
    &--info {
        background-color: #f4f4f5;
        border: 1px solid #ebeef5;
        color: #909399;

        .fanc-message__icon {
            color: #909399;
        }

        .fanc-message__action-text {
            color: #409eff;
        }
    }

    &--success {
        background-color: #f0f9eb;
        border: 1px solid #e1f3d8;
        color: #67c23a;

        .fanc-message__icon {
            color: #67c23a;
        }

        .fanc-message__action-text {
            color: #67c23a;
        }
    }

    &--warning {
        background-color: #fdf6ec;
        border: 1px solid #faecd8;
        color: #e6a23c;

        .fanc-message__icon {
            color: #e6a23c;
        }

        .fanc-message__action-text {
            color: #e6a23c;
        }
    }

    &--error {
        background-color: #fef0f0;
        border: 1px solid #fde2e2;
        color: #f56c6c;

        .fanc-message__icon {
            color: #f56c6c;
        }

        .fanc-message__action-text {
            color: #f56c6c;
        }
    }

    &--with-close {
        padding-right: 12px;
    }

    &--with-action {
        padding-right: 12px;
    }

    &--scrollable {
        .fanc-message__content {
            max-width: 240px;
        }
    }

    &--html {
        .fanc-message__content {
            line-height: 1.6;

            rich-text {
                display: inline;
            }
        }
    }
}

/* 在H5环境中添加样式覆盖 */
/* #ifdef H5 */
.fanc-message {
    transform: translateX(-50%) !important;
    left: 50% !important;
    z-index: 10000 !important;

    &--show {
        opacity: 1 !important;
    }

    .fanc-message__content text {
        white-space: pre-wrap !important;
    }

    .fanc-message__content--scroll text {
        white-space: nowrap !important;
    }

    .fanc-message__action {
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
}
/* #endif */

/* 移动端样式优化 */
@media screen and (max-width: 768px) {
    .fanc-message {
        min-width: 260px;
        max-width: 90%;

        &--scrollable {
            .fanc-message__content {
                max-width: 180px;
            }
        }
    }
}
</style>
