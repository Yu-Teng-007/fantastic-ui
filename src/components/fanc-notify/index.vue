<template>
    <view>
        <!-- 消息提示容器 -->
        <view
            v-if="isShow"
            class="fanc-notify"
            :class="[
                `fanc-notify--${type}`,
                { 'fanc-notify--with-icon': showIcon },
                { 'fanc-notify--safe-area': safeAreaInsetTop },
            ]"
            :style="{
                zIndex: zIndex,
                top: offsetTop ? `${offsetTop}px` : '0',
                ...customStyle,
            }"
            @click="onClick"
        >
            <!-- 图标 -->
            <view v-if="showIcon" class="fanc-notify__icon">
                <fanc-icon :name="realIconName" :size="18"></fanc-icon>
            </view>

            <!-- 消息内容 -->
            <view class="fanc-notify__content">
                <!-- 标题 -->
                <view v-if="title" class="fanc-notify__title">{{ title }}</view>

                <!-- 消息文本 -->
                <view class="fanc-notify__text">{{ message }}</view>
            </view>

            <!-- 右侧图标 -->
            <view v-if="rightIcon" class="fanc-notify__right-icon">
                <fanc-icon :name="rightIcon" :size="18"></fanc-icon>
            </view>
        </view>
    </view>
</template>

<script>
/**
 * fanc-notify 消息提示
 * @description 用于页面顶部向下滑出一个提示，尔后自动收起的场景
 * @property {String} message - 提示文本内容
 * @property {String} title - 提示标题
 * @property {String} type - 提示类型，可选值为 primary/success/error/warning
 * @property {String} iconName - 自定义图标名称
 * @property {String} rightIcon - 右侧图标名称
 * @property {Boolean} showIcon - 是否显示图标
 * @property {Number} duration - 展示时长(ms)，值为 0 时，notify 不会自动消失
 * @property {Number} offsetTop - 顶部偏移距离，单位 px
 * @property {Boolean} safeAreaInsetTop - 是否留出顶部安全距离（状态栏高度）
 * @property {Number} zIndex - 层级
 * @property {Object} customStyle - 自定义样式
 * @event {Function} click - 点击时触发
 * @event {Function} close - 关闭时触发
 */
import {
    NOTIFY_ZINDEX,
    NOTIFY_DEFAULT_DURATION,
    NOTIFY_TYPES,
    NOTIFY_ICON_MAP,
} from "@/configs/notify";

export default {
    name: "fanc-notify",

    props: {
        id: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        iconName: {
            type: String,
            default: "",
        },
        rightIcon: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "primary",
            validator: (value) => NOTIFY_TYPES.includes(value),
        },
        showIcon: {
            type: Boolean,
            default: true,
        },
        duration: {
            type: Number,
            default: NOTIFY_DEFAULT_DURATION,
        },
        offsetTop: {
            type: Number,
            default: 0,
        },
        safeAreaInsetTop: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: NOTIFY_ZINDEX,
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
            onClick: null, // 点击回调函数，由外部设置
        };
    },

    computed: {
        // 根据类型获取对应的图标
        realIconName() {
            return this.iconName || NOTIFY_ICON_MAP[this.type] || "";
        },
    },

    watch: {
        duration: {
            handler(val) {
                // 清除旧定时器
                this.clearTimer();
                // 如果 Notify 已显示且持续时间大于 0，则设置新定时器
                if (this.isShow && val > 0) {
                    this.startTimer();
                }
            },
            immediate: true,
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
    },

    methods: {
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

        // 点击 Notify
        handleClick() {
            // 执行外部传入的点击回调
            if (typeof this.onClick === "function") {
                this.onClick();
            }

            // 触发点击事件
            this.$emit("click");
        },

        // 关闭 Notify
        close() {
            this.isShow = false;

            // 通过延迟执行关闭回调，让过渡动画完成
            setTimeout(() => {
                // 执行外部传入的关闭回调
                if (typeof this.onClose === "function") {
                    this.onClose();
                }

                // 触发关闭事件
                this.$emit("close");
            }, 300); // 假设过渡动画为300ms
        },
    },
};
</script>

<style>
.fanc-notify {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 14px 16px;
    font-size: 14px;
    line-height: 1.4;
    color: var(--notify-text-color);
    word-break: break-all;
    white-space: pre-wrap;
    transition: all 0.3s ease-in-out;
    transform: translateY(-100%);
    animation: fanc-notify-slide-in 0.3s forwards;
}

.fanc-notify--safe-area {
    padding-top: calc(14px + constant(safe-area-inset-top));
    padding-top: calc(14px + env(safe-area-inset-top));
}

.fanc-notify--primary {
    background-color: var(--notify-primary-bg-color);
}

.fanc-notify--success {
    background-color: var(--notify-success-bg-color);
}

.fanc-notify--warning {
    background-color: var(--notify-warning-bg-color);
}

.fanc-notify--error {
    background-color: var(--notify-error-bg-color);
}

.fanc-notify__icon {
    margin-right: 8px;
    font-size: 18px;
    flex-shrink: 0;
}

.fanc-notify__content {
    flex: 1;
    min-width: 0;
}

.fanc-notify__title {
    font-weight: bold;
    margin-bottom: 4px;
}

.fanc-notify__text {
    word-wrap: break-word;
}

.fanc-notify__right-icon {
    margin-left: 8px;
    flex-shrink: 0;
}

@keyframes fanc-notify-slide-in {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes fanc-notify-slide-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100%);
    }
}

.fanc-notify--leave {
    animation: fanc-notify-slide-out 0.3s forwards;
}
</style>
