<template>
    <view
        v-if="show"
        class="fanc-number-keyboard"
        :class="{ 'is-fixed': fixed, 'is-round': round }"
        :style="keyboardStyle"
    >
        <view class="fanc-number-keyboard__header" v-if="showHeader">
            <text class="fanc-number-keyboard__title">{{ title }}</text>
            <view class="fanc-number-keyboard__close" @click="onClose">{{ closeButtonText }}</view>
        </view>
        <view class="fanc-number-keyboard__close-icon" @click="onClose" v-if="showCloseIcon">
            <view class="fanc-number-keyboard__close-icon-inner"></view>
        </view>
        <view class="fanc-number-keyboard__body">
            <view class="fanc-number-keyboard__keys">
                <view
                    v-for="(key, index) in displayKeys"
                    :key="index"
                    class="fanc-number-keyboard__key"
                    :class="[
                        {
                            'is-zero': key.value === '0' && key.wider,
                            'is-function': key.type === 'function',
                            'is-delete': key.type === 'delete',
                        },
                    ]"
                    @click="onKeyPress(key)"
                >
                    <template v-if="key.type === 'delete'">
                        <view class="fanc-number-keyboard__delete-icon"></view>
                    </template>
                    <template v-else-if="key.type === 'function'">
                        {{ key.text }}
                    </template>
                    <template v-else>
                        {{ key.text }}
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
/**
 * fanc-number-keyboard 数字键盘
 * @description 数字键盘组件，常用于输入密码、验证码等纯数字场景
 * @property {Boolean} show - 是否显示键盘
 * @property {String} title - 键盘标题
 * @property {Boolean} zIndex - 键盘层级
 * @property {Boolean} round - 是否为圆角键盘
 * @property {Boolean} fixed - 是否固定在底部
 * @property {String} closeButtonText - 关闭按钮文字
 * @property {Boolean} showDeleteKey - 是否显示删除键
 * @property {Boolean} hideOnClickOutside - 是否在点击外部时关闭键盘
 * @property {Boolean} randomKeyOrder - 是否随机排序键盘按键
 * @property {String} extraKey - 额外按键的内容
 * @property {Boolean} showHeader - 是否显示键盘头部
 * @property {Boolean} showCloseIcon - 是否显示关闭图标
 * @event {Function} input - 点击按键时触发
 * @event {Function} delete - 点击删除键时触发
 * @event {Function} close - 点击关闭按钮时触发
 * @event {Function} blur - 键盘关闭时触发
 * @event {Function} function - 点击功能键时触发
 */
export default {
    name: "fanc-number-keyboard",
    props: {
        // 是否显示键盘
        show: {
            type: Boolean,
            default: false,
        },
        // 键盘标题
        title: {
            type: String,
            default: "键盘标题",
        },
        // 键盘层级
        zIndex: {
            type: [Number, String],
            default: 100,
        },
        // 是否为圆角键盘
        round: {
            type: Boolean,
            default: true,
        },
        // 是否固定在底部
        fixed: {
            type: Boolean,
            default: true,
        },
        // 关闭按钮文字
        closeButtonText: {
            type: String,
            default: "完成",
        },
        // 是否显示删除键
        showDeleteKey: {
            type: Boolean,
            default: true,
        },
        // 是否在点击外部时关闭键盘
        hideOnClickOutside: {
            type: Boolean,
            default: true,
        },
        // 是否随机排序键盘按键
        randomKeyOrder: {
            type: Boolean,
            default: false,
        },
        // 额外按键的内容
        extraKey: {
            type: String,
            default: ".",
        },
        // 是否显示键盘头部
        showHeader: {
            type: Boolean,
            default: true,
        },
        // 是否显示关闭图标
        showCloseIcon: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // 基础按键配置
            baseKeys: [
                { text: "1", value: "1" },
                { text: "2", value: "2" },
                { text: "3", value: "3" },
                { text: "4", value: "4" },
                { text: "5", value: "5" },
                { text: "6", value: "6" },
                { text: "7", value: "7" },
                { text: "8", value: "8" },
                { text: "9", value: "9" },
                { text: this.extraKey, value: this.extraKey, type: "function" },
                { text: "0", value: "0", wider: true },
            ],
        };
    },
    computed: {
        // 计算样式
        keyboardStyle() {
            const style = {};
            if (this.zIndex) {
                style.zIndex = this.zIndex;
            }
            return style;
        },
        // 计算显示的按键
        displayKeys() {
            let keys = [...this.baseKeys];

            // 随机排序数字键
            if (this.randomKeyOrder) {
                const numberKeys = keys.filter((key) => !isNaN(key.value) && key.value !== "0");
                const otherKeys = keys.filter((key) => isNaN(key.value) || key.value === "0");

                // Fisher-Yates 洗牌算法
                for (let i = numberKeys.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [numberKeys[i], numberKeys[j]] = [numberKeys[j], numberKeys[i]];
                }

                keys = [...numberKeys, ...otherKeys];
            }

            // 添加删除键
            if (this.showDeleteKey) {
                keys.push({ type: "delete", value: "delete" });
            }

            return keys;
        },
    },
    methods: {
        // 按键点击事件
        onKeyPress(key) {
            if (key.type === "delete") {
                this.$emit("delete");
            } else if (key.type === "function") {
                this.$emit("function", key.value);
            } else {
                this.$emit("input", key.value);
            }
        },
        // 关闭键盘
        onClose() {
            this.$emit("close");
            this.$emit("update:show", false);
            this.$emit("blur");
        },
        // 显示键盘
        showKeyboard() {
            this.$emit("update:show", true);
        },
        // 隐藏键盘
        hideKeyboard() {
            this.$emit("update:show", false);
            this.$emit("blur");
        },
    },
    watch: {
        // 监听显示状态
        show(newVal) {
            if (newVal && this.hideOnClickOutside) {
                setTimeout(() => {
                    document.addEventListener("click", this.onClickOutside);
                }, 10);
            } else {
                document.removeEventListener("click", this.onClickOutside);
            }
        },
    },
    beforeDestroy() {
        document.removeEventListener("click", this.onClickOutside);
    },
    mounted() {
        if (this.show && this.hideOnClickOutside) {
            document.addEventListener("click", this.onClickOutside);
        }
    },
};
</script>

<style lang="scss" scoped>
.fanc-number-keyboard {
    position: relative;
    background-color: var(--keyboard-bg-color, #f2f3f5);
    user-select: none;
    max-width: 100%;
    width: 100%;

    // 固定在底部
    &.is-fixed {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

    // 圆角样式
    &.is-round {
        border-radius: 20px 20px 0 0;
        overflow: hidden;
    }

    // 键盘头部
    &__header {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 6px 0;
        background-color: var(--keyboard-header-bg-color, #f7f8fa);
        border-bottom: 1px solid var(--keyboard-border-color, #ebedf0);
    }

    // 标题样式
    &__title {
        font-size: 16px;
        color: var(--keyboard-title-color, #323233);
        font-weight: 400;
    }

    // 关闭按钮
    &__close {
        position: absolute;
        right: 16px;
        font-size: 14px;
        color: var(--keyboard-close-color, var(--fanc-primary-color, #007bff));
        cursor: pointer;
        padding: 8px 12px;
    }

    // 关闭图标
    &__close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        border-radius: 15px;
        background-color: var(--keyboard-key-bg-color, #fff);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;

        &:active {
            background-color: var(--keyboard-key-active-bg-color, #e6e6e6);
        }
    }

    // 关闭图标内部样式（X形状）
    &__close-icon-inner {
        position: relative;
        width: 16px;
        height: 16px;

        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 16px;
            height: 2px;
            background-color: var(--keyboard-close-color, var(--fanc-primary-color, #007bff));
            transform-origin: center;
        }

        &::before {
            transform: translateY(-50%) rotate(45deg);
        }

        &::after {
            transform: translateY(-50%) rotate(-45deg);
        }
    }

    // 键盘主体
    &__body {
        padding: 6px 0;
    }

    // 键盘按键区域
    &__keys {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    // 按键样式
    &__key {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% / 3 - 6px);
        height: 48px;
        margin: 3px;
        border-radius: 8px;
        background-color: var(--keyboard-key-bg-color, #fff);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        font-size: 22px;
        font-weight: 500;
        color: var(--keyboard-key-color, #323233);
        cursor: pointer;
        transition: background-color 0.2s;

        &:active {
            background-color: var(--keyboard-key-active-bg-color, #e6e6e6);
        }

        // 0键宽度加倍
        &.is-zero {
            width: calc(100% / 3 * 2 - 9px);
        }

        // 功能键
        &.is-function {
            font-size: 16px;
            color: var(--keyboard-function-key-color, var(--text-secondary, #6c757d));
        }

        // 删除键
        &.is-delete {
            font-size: 16px;
            color: var(--keyboard-delete-key-color, var(--text-secondary, #6c757d));
        }
    }

    // 删除图标
    &__delete-icon {
        width: 24px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 22' fill='%23323233'%3E%3Cpath d='M28.8 0H10.4c-.8 0-1.6.4-2.4.8L.8 8c-.4.4-.4 1.2 0 1.6l7.2 7.2c.8.8 1.6.8 2.4.8h18.4c1.6 0 3.2-1.6 3.2-3.2V3.2C32 1.6 30.4 0 28.8 0zM25.6 14.4L23.2 12l2.4-2.4c.4-.4.4-1.2 0-1.6s-1.2-.4-1.6 0L21.6 10.4 19.2 8c-.4-.4-1.2-.4-1.6 0s-.4 1.2 0 1.6l2.4 2.4-2.4 2.4c-.4.4-.4 1.2 0 1.6.4.4 1.2.4 1.6 0l2.4-2.4 2.4 2.4c.4.4 1.2.4 1.6 0s.4-1.2 0-1.6z'/%3E%3C/svg%3E");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
}

// 键盘弹出动画
@keyframes fanc-slide-up {
    from {
        transform: translate3d(0, 100%, 0);
    }
    to {
        transform: translate3d(0, 0, 0);
    }
}

// 键盘收起动画
@keyframes fanc-slide-down {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(0, 100%, 0);
    }
}
</style>
