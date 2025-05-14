<template>
    <view class="fanc-action-sheet-container">
        <fanc-popup
            :show="show"
            position="bottom"
            :z-index="zIndex"
            :overlay="overlay"
            :overlay-closable="closeOnClickOverlay"
            :duration="duration"
            :custom-style="customStyle"
            :custom-class="customClass"
            round
            @update:show="onUpdateShow"
            @open="onOpenEmit"
            @close="onCloseEmit"
            @clickOverlay="$emit('clickOverlay')"
        >
            <view class="fanc-action-sheet">
                <!-- 标题 -->
                <view v-if="title" class="fanc-action-sheet__header">
                    <text class="fanc-action-sheet__title">{{ title }}</text>
                    <view v-if="showClose" class="fanc-action-sheet__close" @click="onClose">
                        <fanc-icon name="close" size="18" />
                    </view>
                </view>

                <!-- 描述 -->
                <view v-if="description" class="fanc-action-sheet__description">
                    <text>{{ description }}</text>
                </view>

                <!-- 操作项列表 -->
                <view class="fanc-action-sheet__content">
                    <view
                        v-for="(item, index) in actions"
                        :key="index"
                        class="fanc-action-sheet__item"
                        :class="{
                            'fanc-action-sheet__item--disabled': item.disabled,
                            'fanc-action-sheet__item--loading': item.loading,
                            [`fanc-action-sheet__item--${item.type || 'default'}`]: item.type,
                        }"
                        :style="item.style || {}"
                        @click="onSelect(item, index)"
                    >
                        <view v-if="item.loading" class="fanc-action-sheet__loading">
                            <view class="fanc-loading-indicator"></view>
                        </view>
                        <view v-else-if="item.icon" class="fanc-action-sheet__icon">
                            <fanc-icon :name="item.icon" :size="item.iconSize || '18'" :color="item.iconColor" />
                        </view>
                        <text class="fanc-action-sheet__name">{{ item.name }}</text>
                        <text v-if="item.subname" class="fanc-action-sheet__subname">{{ item.subname }}</text>
                    </view>
                </view>

                <!-- 取消按钮 -->
                <view v-if="cancelText" class="fanc-action-sheet__cancel" @click="onCancel">
                    <text class="fanc-action-sheet__cancel-text">{{ cancelText }}</text>
                </view>
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-action-sheet 动作面板
 * @description 动作面板组件，用于从底部弹出菜单给用户选择操作
 * @property {Boolean} show - 是否显示动作面板
 * @property {Array} actions - 操作项数组，数组项包含name, subname, disabled, loading, icon, iconSize, iconColor, type, style属性
 * @property {String} title - 面板标题
 * @property {String} description - 面板描述文字
 * @property {String} cancelText - 取消按钮文字，不设置则不显示取消按钮
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} closeOnClickOverlay - 是否点击遮罩层后关闭
 * @property {Boolean} showClose - 是否显示关闭按钮
 * @property {Number|String} duration - 动画时长，单位为毫秒
 * @property {Number|String} zIndex - 面板的z-index值
 * @property {String|Object} customStyle - 自定义面板样式
 * @property {String} customClass - 自定义面板类名
 * @event {Function} select - 选中操作项时触发，回调参数为选中项和索引
 * @event {Function} cancel - 点击取消按钮时触发
 * @event {Function} close - 面板关闭时触发
 * @event {Function} open - 面板打开时触发
 * @event {Function} clickOverlay - 点击遮罩层时触发
 */
export default {
    name: "fanc-action-sheet",

    model: {
        prop: "show",
        event: "update:show",
    },

    props: {
        // 是否显示动作面板
        show: {
            type: Boolean,
            default: false,
        },
        // 操作项数组
        actions: {
            type: Array,
            default: () => [],
            validator: (value) => {
                return value.every((item) => typeof item === "object" && item.name !== undefined);
            },
        },
        // 面板标题
        title: {
            type: String,
            default: "",
        },
        // 面板描述文字
        description: {
            type: String,
            default: "",
        },
        // 取消按钮文字，不设置则不显示取消按钮
        cancelText: {
            type: String,
            default: "取消",
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否点击遮罩层后关闭
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: false,
        },
        // 动画时长
        duration: {
            type: [Number, String],
            default: 300,
        },
        // 面板的z-index值
        zIndex: {
            type: [Number, String],
            default: 1000,
        },
        // 自定义面板样式
        customStyle: {
            type: [String, Object],
            default: "",
        },
        // 自定义面板类名
        customClass: {
            type: String,
            default: "",
        },
    },

    data() {
        return {};
    },

    created() {},

    mounted() {},

    methods: {
        // 处理更新show事件
        onUpdateShow(val) {
            this.$emit("update:show", val);
        },

        // 处理open事件
        onOpenEmit() {
            this.$emit("open");
        },

        // 处理close事件
        onCloseEmit() {
            this.$emit("close");
        },

        // 选择操作项
        onSelect(item, index) {
            // 禁用或加载状态下不触发事件
            if (item.disabled || item.loading) {
                return;
            }

            this.$emit("select", item, index);

            // 关闭面板（除非action配置了closeOnSelect: false）
            if (item.closeOnSelect !== false) {
                this.$emit("update:show", false);
            }
        },

        // 点击取消按钮
        onCancel() {
            this.$emit("cancel");
            this.$emit("update:show", false);
        },

        // 关闭面板
        onClose() {
            this.$emit("update:show", false);
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.fanc-action-sheet {
    position: relative;
    max-height: 80vh;
    overflow-y: auto;

    // 头部样式
    &__header {
        position: relative;
        padding: 16px;
        text-align: center;
        font-weight: 500;
        box-sizing: border-box;
        line-height: 24px;
        border-bottom: 1px solid $border-color-light;
    }

    // 标题样式
    &__title {
        font-size: 16px;
        font-weight: 500;
        color: $text-primary;
    }

    // 关闭图标样式
    &__close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        cursor: pointer;
    }

    // 描述文字样式
    &__description {
        padding: 12px 16px;
        text-align: center;
        font-size: 14px;
        color: $text-secondary;
        line-height: 1.5;
        border-bottom: 1px solid $border-color-light;
    }

    // 内容区域样式
    &__content {
        width: 100%;
    }

    // 操作项样式
    &__item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 16px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: $text-primary;
        background-color: $bg-white;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-direction: column;

        &:active {
            background-color: $bg-gray-light;
        }

        &::after {
            content: "";
            position: absolute;
            left: 16px;
            right: 16px;
            bottom: 0;
            height: 1px;
            background-color: $border-color-light;
        }

        &:last-child::after {
            display: none;
        }

        // 禁用状态
        &--disabled {
            color: $text-disabled;
            cursor: not-allowed;

            &:active {
                background-color: $bg-white;
            }
        }

        // 加载状态
        &--loading {
            cursor: default;
        }

        // 不同类型的样式
        &--primary {
            color: $fanc-primary-color;
        }

        &--success {
            color: $fanc-success-color;
        }

        &--warning {
            color: $fanc-warning-color;
        }

        &--danger {
            color: $fanc-danger-color;
        }
    }

    // 操作项名称
    &__name {
        font-size: 16px;
        color: inherit;
    }

    // 操作项副标题
    &__subname {
        margin-top: 4px;
        font-size: 12px;
        color: $text-secondary;
    }

    // 操作项图标
    &__icon {
        margin-bottom: 8px;
    }

    // 加载指示器
    &__loading {
        margin-bottom: 8px;

        .fanc-loading-indicator {
            border: 2px solid rgba($black, 0.1);
            border-left-color: currentColor;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: fanc-spin 500ms linear infinite;
        }
    }

    // 取消按钮样式
    &__cancel {
        margin-top: 8px;
        padding: 14px 16px;
        text-align: center;
        font-size: 16px;
        color: $text-primary;
        background-color: $bg-white;
        cursor: pointer;
        transition: all 0.2s ease;

        &:active {
            background-color: $bg-gray-light;
        }
    }

    &__cancel-text {
        display: inline-block;
        line-height: 22px;
    }
}

@keyframes fanc-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
