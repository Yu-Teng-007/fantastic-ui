<template>
    <fanc-popup
        :show="show"
        :position="position"
        :overlay="mask"
        :closeable="showClose"
        :close-icon-position="mapCloseIconPosition"
        :round="round"
        :duration="duration"
        :z-index="zIndex"
        :overlay-closable="maskClickClose"
        :custom-style="customStyle"
        :custom-class="`fanc-dialog-container ${customClass} fanc-dialog-${type}`"
        @update:show="$emit('update:show', $event)"
        @open="$emit('open')"
        @close="handleClose"
        @clickOverlay="$emit('clickOverlay')"
    >
        <!-- 图片区域（置顶） -->
        <view v-if="imageUrl && imagePosition === 'top'" class="fanc-dialog-image-container">
            <image
                :src="imageUrl"
                class="fanc-dialog-image"
                :style="imageStyle"
                mode="aspectFit"
            ></image>
        </view>

        <!-- 标题栏 -->
        <view v-if="showTitle" class="fanc-dialog-header">
            <slot name="header">
                <view class="fanc-dialog-title-container">
                    <fanc-icon
                        v-if="type !== 'default'"
                        :name="typeIconMap[type]"
                        :color="typeColorMap[type]"
                        :size="20"
                        class="fanc-dialog-title-icon"
                    />
                    <text class="fanc-dialog-title">{{ title }}</text>
                </view>
            </slot>
        </view>

        <!-- 图片区域（默认） -->
        <view v-if="imageUrl && imagePosition === 'default'" class="fanc-dialog-image-container">
            <image
                :src="imageUrl"
                class="fanc-dialog-image"
                :style="imageStyle"
                mode="aspectFit"
            ></image>
        </view>

        <!-- 内容区 -->
        <view
            class="fanc-dialog-content"
            :class="{
                'fanc-dialog-content-no-title': !showTitle,
                'fanc-dialog-content-no-buttons': !showButtons,
            }"
        >
            <slot>
                <text
                    class="fanc-dialog-message"
                    :class="{ 'fanc-dialog-message-center': messageAlign === 'center' }"
                    >{{ message }}</text
                >
            </slot>
        </view>

        <!-- 图片区域（底部） -->
        <view v-if="imageUrl && imagePosition === 'bottom'" class="fanc-dialog-image-container">
            <image
                :src="imageUrl"
                class="fanc-dialog-image"
                :style="imageStyle"
                mode="aspectFit"
            ></image>
        </view>

        <!-- 按钮区 -->
        <view
            v-if="showButtons"
            class="fanc-dialog-footer"
            :class="[`fanc-dialog-footer-${buttonLayout}`]"
        >
            <slot name="footer">
                <!-- 垂直布局时的多按钮支持 -->
                <template v-if="buttonLayout === 'vertical' && buttons && buttons.length > 0">
                    <view
                        v-for="(button, index) in buttons"
                        :key="index"
                        class="fanc-dialog-button"
                        :class="[
                            'fanc-dialog-button-full',
                            button.type
                                ? `fanc-dialog-button-${button.type}`
                                : 'fanc-dialog-confirm',
                        ]"
                        :style="button.style || ''"
                        @click="handleButtonClick(button, index)"
                    >
                        <text>{{ button.text }}</text>
                    </view>
                </template>
                <!-- 默认按钮 -->
                <template v-else>
                    <view
                        v-if="showCancelButton"
                        class="fanc-dialog-button fanc-dialog-cancel"
                        :class="{ 'fanc-dialog-button-full': buttonLayout === 'vertical' }"
                        :style="cancelButtonStyle"
                        @click="handleCancel"
                    >
                        <text>{{ cancelText }}</text>
                    </view>
                    <view
                        v-if="showConfirmButton"
                        class="fanc-dialog-button fanc-dialog-confirm"
                        :class="{ 'fanc-dialog-button-full': buttonLayout === 'vertical' }"
                        :style="confirmButtonStyle"
                        @click="handleConfirm"
                    >
                        <text>{{ confirmText }}</text>
                    </view>
                </template>
            </slot>
        </view>

        <!-- 自定义底部内容 -->
        <slot name="bottom"></slot>
    </fanc-popup>
</template>

<script>
import FancPopup from "../fanc-popup/index.vue";
import FancIcon from "../fanc-icon/index.vue";

export default {
    name: "FancDialog",
    components: {
        FancPopup,
        FancIcon,
    },
    model: {
        prop: "show",
        event: "update:show",
    },
    props: {
        // 是否显示对话框
        show: {
            type: Boolean,
            default: false,
        },
        // 对话框标题
        title: {
            type: String,
            default: "提示",
        },
        // 对话框内容
        message: {
            type: String,
            default: "",
        },
        // 对话框图片URL
        imageUrl: {
            type: String,
            default: "",
        },
        // 图片样式
        imageStyle: {
            type: [String, Object],
            default: "",
        },
        // 图片位置
        imagePosition: {
            type: String,
            default: "default",
            validator: (value) => ["top", "default", "bottom"].includes(value),
        },
        // 对话框类型
        type: {
            type: String,
            default: "default",
            validator: (value) =>
                ["default", "success", "warning", "error", "info"].includes(value),
        },
        // 对话框位置 (仅支持center, 由于是Dialog)
        position: {
            type: String,
            default: "center",
            validator: (value) => ["center", "top", "bottom"].includes(value),
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: true,
        },
        // 是否显示按钮
        showButtons: {
            type: Boolean,
            default: true,
        },
        // 是否显示确认按钮
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        // 是否显示取消按钮
        showCancelButton: {
            type: Boolean,
            default: true,
        },
        // 确认按钮文本
        confirmText: {
            type: String,
            default: "确定",
        },
        // 取消按钮文本
        cancelText: {
            type: String,
            default: "取消",
        },
        // 按钮布局方式
        buttonLayout: {
            type: String,
            default: "horizontal",
            validator: (value) => ["horizontal", "vertical"].includes(value),
        },
        // 多按钮配置（垂直布局时使用）
        buttons: {
            type: Array,
            default: () => [],
            // 按钮格式：[{text: '按钮文本', type: 'confirm/cancel/info/warning/danger', style: '样式字符串', callback: 回调函数}]
        },
        // 内容对齐方式
        messageAlign: {
            type: String,
            default: "left",
            validator: (value) => ["left", "center", "right"].includes(value),
        },
        // 是否显示关闭图标
        showClose: {
            type: Boolean,
            default: false,
        },
        // 关闭图标位置
        closeIconPosition: {
            type: String,
            default: "inside",
            validator: (value) => ["inside", "outside"].includes(value),
        },
        // 是否显示遮罩
        mask: {
            type: Boolean,
            default: true,
        },
        // 点击遮罩是否可关闭
        maskClickClose: {
            type: Boolean,
            default: true,
        },
        // 是否使用圆角
        round: {
            type: Boolean,
            default: true,
        },
        // 锁定页面滚动
        lockScroll: {
            type: Boolean,
            default: true,
        },
        // 自定义样式类
        customClass: {
            type: String,
            default: "",
        },
        // 自定义样式
        customStyle: {
            type: [String, Object],
            default: "",
        },
        // 自定义确认按钮样式
        confirmButtonStyle: {
            type: [String, Object],
            default: "",
        },
        // 自定义取消按钮样式
        cancelButtonStyle: {
            type: [String, Object],
            default: "",
        },
        // 是否异步关闭
        asyncClose: {
            type: Boolean,
            default: false,
        },
        // 弹出动画时长
        duration: {
            type: Number,
            default: 300,
        },
        // z-index层级
        zIndex: {
            type: Number,
            default: 2000,
        },
    },
    data() {
        return {
            // 类型与图标的映射
            typeIconMap: {
                success: "check-circle",
                warning: "exclamation-triangle",
                error: "times-circle",
                info: "info-circle",
                default: "",
            },
            // 类型与颜色的映射
            typeColorMap: {
                success: "var(--success-color)",
                warning: "var(--warning-color)",
                error: "var(--danger-color)",
                info: "var(--primary-color)",
                default: "",
            },
        };
    },
    computed: {
        // 映射关闭图标位置到popup组件的值
        mapCloseIconPosition() {
            return this.closeIconPosition === "inside" ? "top-right" : "top-right";
        },
    },
    methods: {
        // 处理关闭
        handleClose() {
            if (this.asyncClose) {
                this.$emit("close");
            } else {
                this.$emit("update:show", false);
                this.$emit("close");
            }
        },

        // 处理确认
        handleConfirm() {
            if (this.asyncClose) {
                this.$emit("confirm");
            } else {
                this.$emit("update:show", false);
                this.$emit("confirm");
            }
        },

        // 处理取消
        handleCancel() {
            if (this.asyncClose) {
                this.$emit("cancel");
            } else {
                this.$emit("update:show", false);
                this.$emit("cancel");
            }
        },

        // 处理多按钮点击
        handleButtonClick(button, index) {
            if (this.asyncClose) {
                this.$emit("buttonClick", { button, index });
            } else {
                if (typeof button.callback === "function") {
                    button.callback(button, index);
                }
                this.$emit("buttonClick", { button, index });
                this.$emit("update:show", false);
            }
        },
    },
};
</script>

<style lang="scss">
.fanc-dialog-header {
    padding: 30rpx 24rpx 0;
    text-align: center;
}

.fanc-dialog-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-dialog-title-icon {
    margin-right: 15rpx;
}

.fanc-dialog-title {
    font-size: 34rpx;
    font-weight: 600;
    line-height: 1.4;
    color: var(--dialog-title-color);
}

.fanc-dialog-image-container {
    padding: 24rpx 30rpx 0;
    text-align: center;
}

.fanc-dialog-image {
    width: 240rpx;
    height: 240rpx;
    max-width: 80%;
}

.fanc-dialog-content {
    padding: 24rpx 30rpx 32rpx;
    max-height: 60vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    text-align: center;

    &.fanc-dialog-content-no-title {
        padding-top: 32rpx;
    }

    &.fanc-dialog-content-no-buttons {
        padding-bottom: 36rpx;
    }
}

.fanc-dialog-message {
    font-size: 30rpx;
    line-height: 1.5;
    color: var(--dialog-content-color);

    &.fanc-dialog-message-center {
        text-align: center;
    }
}

.fanc-dialog-footer {
    display: flex;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rpx;
        background-color: var(--dialog-border-color);
        transform: scaleY(0.5);
    }

    &.fanc-dialog-footer-vertical {
        flex-direction: column;

        .fanc-dialog-button:not(:last-child)::after {
            position: absolute;
            content: "";
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2rpx;
            background-color: var(--dialog-border-color);
            transform: scaleY(0.5);
        }
    }

    &.fanc-dialog-footer-horizontal {
        flex-direction: row;

        .fanc-dialog-button:not(:last-child)::after {
            position: absolute;
            content: "";
            top: 0;
            right: 0;
            height: 100%;
            width: 2rpx;
            background-color: var(--dialog-border-color);
            transform: scaleX(0.5);
        }
    }
}

.fanc-dialog-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx 0;
    position: relative;
    font-size: 32rpx;
    transition: background-color 0.2s;

    &.fanc-dialog-button-full {
        width: 100%;
    }

    &:active {
        background-color: var(--dialog-button-active-bg);
    }
}

.fanc-dialog-cancel {
    color: var(--dialog-cancel-color);
}

.fanc-dialog-confirm {
    color: var(--dialog-confirm-color);
    font-weight: 500;
}

.fanc-dialog-button-info {
    color: var(--primary-color);
}

.fanc-dialog-button-warning {
    color: var(--warning-color);
}

.fanc-dialog-button-danger {
    color: var(--danger-color);
}
</style>
