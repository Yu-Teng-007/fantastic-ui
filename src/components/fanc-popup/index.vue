<template>
    <view
        v-if="showPopup"
        class="fanc-popup"
        :class="[position ? `fanc-popup--${position}` : '', round ? 'fanc-popup--round' : '', customClass]"
        :style="popupStyle"
    >
        <!-- 遮罩层 -->
        <view
            v-if="overlay"
            :style="{ zIndex: zIndex - 1 }"
            class="fanc-popup__overlay"
            :class="{ 'fanc-popup__overlay--show': showAnimated && overlay }"
            @click="onClickOverlay"
        ></view>

        <!-- 弹出层内容 -->
        <view
            class="fanc-popup__content"
            :class="{ 'fanc-popup__content--show': showAnimated }"
            :style="{ zIndex: zIndex }"
            @click.stop="noop"
        >
            <!-- 关闭图标 -->
            <view
                v-if="closeable"
                class="fanc-popup__close-icon"
                :class="[`fanc-popup__close-icon--${closeIconPosition}`]"
                @click="close"
            >
                <fanc-icon name="close" size="18" />
            </view>

            <!-- 弹出层内容插槽 -->
            <slot></slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-popup 弹出层
 * @description 弹出层组件，支持多个方向弹出，可用于底部菜单、消息提示等场景
 * @property {Boolean} show - 是否显示弹出层
 * @property {String} position - 弹出位置，可选值为 center/top/bottom/left/right
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} closeable - 是否显示关闭图标
 * @property {String} closeIconPosition - 关闭图标位置，可选值为 top-right/top-left/bottom-right/bottom-left
 * @property {Boolean} round - 是否显示圆角
 * @property {Number|String} duration - 动画时长，单位为毫秒
 * @property {Number|String} zIndex - 弹出层的z-index值
 * @property {Boolean} overlayClosable - 是否点击遮罩层后关闭弹出层
 * @property {String|Object} customStyle - 自定义弹出层样式
 * @property {String} customClass - 自定义弹出层类名
 * @event {Function} open - 弹出层打开时触发
 * @event {Function} close - 弹出层关闭时触发
 * @event {Function} clickOverlay - 点击遮罩层时触发
 */
export default {
    name: "fanc-popup",

    model: {
        prop: "show",
        event: "update:show",
    },

    props: {
        // 是否显示弹出层
        show: {
            type: Boolean,
            default: false,
        },
        // 弹出位置
        position: {
            type: String,
            default: "center",
            validator: (value) => ["center", "top", "bottom", "left", "right"].includes(value),
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否显示关闭图标
        closeable: {
            type: Boolean,
            default: false,
        },
        // 关闭图标位置
        closeIconPosition: {
            type: String,
            default: "top-right",
            validator: (value) => ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value),
        },
        // 是否显示圆角
        round: {
            type: Boolean,
            default: false,
        },
        // 动画时长
        duration: {
            type: [Number, String],
            default: 300,
        },
        // 弹出层的z-index值
        zIndex: {
            type: [Number, String],
            default: 1000,
        },
        // 是否点击遮罩层后关闭弹出层
        overlayClosable: {
            type: Boolean,
            default: true,
        },
        // 自定义弹出层样式
        customStyle: {
            type: [String, Object],
            default: "",
        },
        // 自定义弹出层类名
        customClass: {
            type: String,
            default: "",
        },
        // 是否挂载到页面根元素
        mountToBody: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            showPopup: false, // 是否显示弹出层
            showAnimated: false, // 是否显示动画
            popupEl: null, // 弹出层DOM元素
        };
    },

    computed: {
        // 计算弹出层样式
        popupStyle() {
            const style = {};

            // 设置动画时长
            const duration = this.duration;
            if (duration) {
                style.transitionDuration = `${duration}ms`;
            }

            // 设置挂载到页面根元素时的样式
            if (this.mountToBody) {
                style.position = "fixed";
                style.top = "0";
                style.left = "0";
                style.width = "100%";
                style.height = "100%";
                style.pointerEvents = "none";
            }

            // 合并自定义样式
            if (this.customStyle) {
                if (typeof this.customStyle === "string") {
                    // 字符串样式直接返回
                    return `${style.transitionDuration};${this.customStyle}`;
                } else {
                    // 对象样式需要合并
                    return { ...style, ...this.customStyle };
                }
            }

            return style;
        },
    },

    watch: {
        show: {
            handler(val) {
                if (val) {
                    this.open();
                } else {
                    this.handleClose();
                }
            },
            immediate: false,
        },
    },

    mounted() {
        if (this.mountToBody) {
            this.moveToBody();
        }
    },

    beforeDestroy() {
        // 组件销毁时，如果挂载到了body需要移除
        if (this.popupEl && this.mountToBody && typeof document !== 'undefined') {
            // 添加安全检查：确保节点仍然是body的子节点
            if (document.body.contains(this.popupEl)) {
                document.body.removeChild(this.popupEl);
            }
        }
    },

    methods: {
        // 将弹出层移动到body
        moveToBody() {
            // 仅在H5端执行DOM操作
            // #ifdef H5
            if (this.$el && typeof document !== "undefined") {
                // 存储元素引用
                this.popupEl = this.$el;
                // 移至body
                document.body.appendChild(this.$el);
            }
            // #endif
        },

        // 打开弹出层
        open() {
            this.showPopup = true;
            // 使用nextTick确保DOM先渲染，再添加动画类
            this.$nextTick(() => {
                setTimeout(() => {
                    this.showAnimated = true;
                    this.$emit("open");
                }, 10);
            });
        },

        // 处理关闭弹出层
        handleClose() {
            this.showAnimated = false;
            // 等待动画结束后再隐藏元素
            const animationDuration = parseInt(this.duration);
            setTimeout(() => {
                this.showPopup = false;
                this.$emit("close");
            }, animationDuration);
        },

        // 关闭弹出层
        close() {
            this.$emit("update:show", false);
            // 直接调用handleClose方法执行关闭动画
            this.handleClose();
        },

        // 点击遮罩层
        onClickOverlay() {
            this.$emit("clickOverlay");
            if (this.overlayClosable) {
                this.$emit("update:show", false);
                this.handleClose();
            }
        },

        // 空函数，用于阻止事件冒泡
        noop() {},
    },
};
</script>

<style lang="scss">
/* 导入CSS变量 */

.fanc-popup {
    position: fixed;
    /* 防止内容溢出 */
    overflow: hidden;
    z-index: 1000;
    pointer-events: auto;

    /* 遮罩层样式 */
    &__overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--black);
        opacity: 0;
        transition: opacity 300ms cubic-bezier(0.34, 0.69, 0.1, 1);
        pointer-events: auto;

        &--show {
            opacity: 0.5;
        }
    }

    /* 弹出层内容 */
    &__content {
        position: fixed;
        background-color: var(--white);
        transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
        overflow: auto;
        pointer-events: auto;

        &--show {
            transform: none !important;
        }
    }

    /* 居中弹出 */
    &--center {
        .fanc-popup__content {
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0) scale(0.8);
            min-width: 300px;
            max-width: 80%;
            max-height: 80%;
            border-radius: 6px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
            opacity: 0;

            &--show {
                opacity: 1;
                transform: translate3d(-50%, -50%, 0) scale(1) !important;
            }
        }
    }

    /* 顶部弹出 */
    &--top {
        .fanc-popup__content {
            top: 0;
            left: 0;
            width: 100%;
            transform: translateY(-100%);
        }
    }

    /* 底部弹出 */
    &--bottom {
        .fanc-popup__content {
            bottom: 0;
            left: 0;
            width: 100%;
            transform: translateY(100%);
        }
    }

    /* 左侧弹出 */
    &--left {
        .fanc-popup__content {
            top: 0;
            left: 0;
            height: 100%;
            transform: translateX(-100%);
        }
    }

    /* 右侧弹出 */
    &--right {
        .fanc-popup__content {
            top: 0;
            right: 0;
            height: 100%;
            transform: translateX(100%);
        }
    }

    /* 圆角样式 */
    &--round {
        &.fanc-popup--top .fanc-popup__content {
            border-radius: 0 0 8px 8px;
        }

        &.fanc-popup--bottom .fanc-popup__content {
            border-radius: 8px 8px 0 0;
        }

        &.fanc-popup--left .fanc-popup__content {
            border-radius: 0 8px 8px 0;
        }

        &.fanc-popup--right .fanc-popup__content {
            border-radius: 8px 0 0 8px;
        }
    }

    /* 关闭图标 */
    &__close-icon {
        position: absolute;
        z-index: 1;
        padding: 8px;
        color: var(--gray-600);
        cursor: pointer;

        &:active {
            opacity: 0.6;
        }

        &--top-right {
            top: 0;
            right: 0;
        }

        &--top-left {
            top: 0;
            left: 0;
        }

        &--bottom-right {
            bottom: 0;
            right: 0;
        }

        &--bottom-left {
            bottom: 0;
            left: 0;
        }
    }
}
</style>
