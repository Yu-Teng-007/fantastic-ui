<template>
    <view
        v-if="isShow"
        class="fanc-message"
        :class="[
            `fanc-message--${type}`,
            isShow ? 'fanc-message--show' : '',
            closable ? 'fanc-message--with-close' : '',
        ]"
        :style="messageStyle"
    >
        <!-- 消息图标 -->
        <view v-if="showIcon" class="fanc-message__icon">
            <i :class="iconClass"></i>
        </view>

        <!-- 消息内容 -->
        <view class="fanc-message__content">
            <text>{{ message }}</text>
        </view>

        <!-- 关闭按钮 -->
        <view v-if="closable" class="fanc-message__close" @click="close">
            <i class="fas fa-times"></i>
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
 * @event {Function} close - 关闭时触发
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
    },

    data() {
        return {
            isShow: false,
            timer: null,
            onClose: null, // 关闭回调函数，由外部设置
        };
    },

    computed: {
        // 根据消息类型返回对应的图标类名
        iconClass() {
            const iconMap = {
                info: "fas fa-info-circle",
                success: "fas fa-check-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-times-circle",
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
            if (val && this.duration > 0) {
                this.startTimer();
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

            // 调用外部传入的onClose
            if (typeof this.onClose === "function") {
                this.onClose();
            }
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

        text {
            color: inherit;
        }
    }

    &__close {
        margin-left: 16px;
        cursor: pointer;
        font-size: 14px;
        color: #909399;

        i {
            font-size: 14px;
        }
    }

    // 不同类型的消息样式
    &--info {
        background-color: #f4f4f5;
        border: 1px solid #ebeef5;
        color: #909399;

        .fanc-message__icon {
            color: #909399;
        }
    }

    &--success {
        background-color: #f0f9eb;
        border: 1px solid #e1f3d8;
        color: #67c23a;

        .fanc-message__icon {
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
    }

    &--error {
        background-color: #fef0f0;
        border: 1px solid #fde2e2;
        color: #f56c6c;

        .fanc-message__icon {
            color: #f56c6c;
        }
    }

    &--with-close {
        padding-right: 12px;
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
}
/* #endif */
</style>
