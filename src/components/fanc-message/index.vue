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
 * @property {Boolean} closeOnAction - 点击操作按钮后是否自动关闭消息
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
        closeOnAction: {
            type: Boolean,
            default: true,
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
            scrollPosition: 0, // 当前滚动位置
            scrollDirection: 1, // 滚动方向：1向左，-1向右
            isScrollPaused: false, // 滚动是否暂停
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

        // 监听关闭按钮状态变化
        closable() {
            if (this.scrollable && this.isShow) {
                this.$nextTick(() => {
                    this.checkScrollable();
                });
            }
        },

        // 监听操作按钮文本变化
        actionText() {
            if (this.scrollable && this.isShow) {
                this.$nextTick(() => {
                    this.checkScrollable();
                });
            }
        },
    },

    mounted() {
        setTimeout(() => {
            if (this.offsetTop > 0) {
                this.isShow = true;

                if (this.scrollable) {
                    setTimeout(() => this.checkScrollable(), 100);
                }
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

            // 根据closeOnAction决定是否关闭消息
            if (this.closeOnAction) {
                this.close();
            }
        },

        // 检查是否需要滚动
        checkScrollable() {
            if (!this.scrollable || !this.$el) return;

            try {
                const contentEl = this.$el.querySelector(".fanc-message__content-inner");
                const containerEl = this.$el.querySelector(".fanc-message__content");

                if (!contentEl || !containerEl) return;

                // 确保文本内容在DOM中完全渲染
                this.$nextTick(() => {
                    // 获取内容和容器的宽度
                    this.contentWidth = contentEl.scrollWidth || contentEl.offsetWidth;
                    this.containerWidth = containerEl.clientWidth;

                    // 计算出实际可用宽度 - 如果有关闭按钮或操作按钮，需要减去按钮占用的空间
                    let effectiveWidth = this.containerWidth;
                    if (this.closable || this.actionText) {
                        // 关闭按钮和操作按钮会导致容器有效宽度减少
                        // 根据样式估算扣除的宽度
                        if (this.closable) {
                            effectiveWidth -= 30; // 关闭按钮的大致宽度及其间距
                        }
                        if (this.actionText) {
                            // 根据操作文本长度估算宽度
                            effectiveWidth -= Math.min(100, this.actionText.length * 12 + 24);
                        }
                    }

                    // 使用有效宽度判断是否需要滚动
                    this.containerWidth = effectiveWidth;

                    // 如果内容宽度大于容器宽度，则需要滚动
                    const shouldScroll = this.contentWidth > this.containerWidth;

                    if (shouldScroll !== this.shouldScroll) {
                        this.shouldScroll = shouldScroll;

                        if (this.shouldScroll) {
                            contentEl.classList.add("fanc-message__content-inner--scroll");
                            this.scrollPosition = 0;
                            this.startScroll();
                        } else {
                            contentEl.classList.remove("fanc-message__content-inner--scroll");
                            this.stopScroll();
                        }
                    }
                });
            } catch (e) {
                console.error("检查滚动失败:", e);
                this.shouldScroll = false;
            }
        },

        // 开始JS滚动
        startScroll() {
            this.stopScroll();

            const contentEl = this.$el.querySelector(".fanc-message__content-inner");
            if (!contentEl) return;

            // 计算滚动范围，考虑padding
            const maxScroll = this.contentWidth - this.containerWidth + (this.closable || this.actionText ? 20 : 0); // 如果有按钮，增加边距补偿

            if (maxScroll <= 0) return;

            // 重置滚动位置和方向
            this.scrollPosition = 0;
            this.scrollDirection = 1;
            this.isScrollPaused = false;

            // 应用初始位置
            contentEl.style.transform = `translateX(0px)`;

            // 计算每帧移动的像素数
            const pixelsPerFrame = this.scrollSpeed / 60;

            // 创建滚动定时器
            this.scrollTimer = setInterval(() => {
                if (this.isScrollPaused) return;

                this.scrollPosition += pixelsPerFrame * this.scrollDirection;

                if (this.scrollPosition >= maxScroll) {
                    this.scrollPosition = maxScroll;
                    this.scrollDirection = -1;
                } else if (this.scrollPosition <= 0) {
                    this.scrollPosition = 0;
                    this.scrollDirection = 1;
                }

                contentEl.style.transform = `translateX(-${this.scrollPosition}px)`;
            }, 16);
        },

        // 停止JS滚动
        stopScroll() {
            if (this.scrollTimer) {
                clearInterval(this.scrollTimer);
                this.scrollTimer = null;
            }

            const contentEl = this.$el.querySelector(".fanc-message__content-inner");
            if (contentEl) {
                contentEl.style.transform = `translateX(0px)`;
            }
        },

        // 鼠标进入时暂停滚动
        onMouseEnter() {
            if (this.scrollable && this.shouldScroll) {
                this.isScrollPaused = true;
            }
        },

        // 鼠标离开时恢复滚动
        onMouseLeave() {
            if (this.scrollable && this.shouldScroll) {
                this.isScrollPaused = false;
            }
        },

        // 暂停滚动
        pauseScroll() {
            this.isScrollPaused = true;
        },

        // 恢复滚动
        resumeScroll() {
            this.isScrollPaused = false;
        },
    },
};
</script>

<style lang="scss">
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
            transition: transform 0.05s linear;

            &--scroll {
                white-space: nowrap;
                padding-right: 20px;
                padding-left: 20px;
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
