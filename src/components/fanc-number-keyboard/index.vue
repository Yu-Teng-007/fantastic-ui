<template>
    <transition name="fanc-keyboard">
        <view
            v-if="isVisible"
            class="fanc-number-keyboard"
            :class="{
                'is-fixed': fixed,
                'is-round': round,
                'has-sidebar': theme === 'custom' && showSidebar,
            }"
            :style="keyboardStyle"
        >
            <view class="fanc-number-keyboard__header" v-if="showHeader">
                <text class="fanc-number-keyboard__title">{{ title }}</text>
            </view>
            <view
                class="fanc-number-keyboard__body"
                :class="{ 'with-sidebar': theme === 'custom' && showSidebar }"
            >
                <view
                    class="fanc-number-keyboard__keys"
                    :class="{ 'with-sidebar': theme === 'custom' && showSidebar }"
                >
                    <view
                        v-for="(key, index) in displayKeys"
                        :key="index"
                        class="fanc-number-keyboard__key"
                        :class="[
                            {
                                'is-zero': key.value === '0' && key.wider,
                                'is-function': key.type === 'function',
                                'is-delete': key.type === 'delete',
                                'is-normal-delete': isNormalDelete(key),
                                'is-empty': key.type === 'empty',
                                'is-idcard': key.value === 'X' && theme === 'idcard',
                                'is-keyboard': key.type === 'keyboard',
                            },
                        ]"
                        @click="onKeyPress(key)"
                    >
                        <template v-if="key.type === 'delete'">
                            <fanc-icon name="backspace" size="24" color="#5e5d5d"></fanc-icon>
                        </template>
                        <template v-else-if="key.type === 'empty'"> </template>
                        <template v-else-if="key.type === 'function'">
                            {{ key.text }}
                        </template>
                        <template v-else-if="key.type === 'keyboard'">
                            <fanc-icon name="keyboard" size="24" color="#5e5d5d"></fanc-icon>
                        </template>
                        <template v-else>
                            {{ key.text }}
                        </template>
                    </view>
                </view>
                <!-- 右侧栏 -->
                <view
                    class="fanc-number-keyboard__sidebar"
                    v-if="theme === 'custom' && showSidebar"
                >
                    <view
                        v-for="(key, index) in sidebarKeys"
                        :key="index"
                        class="fanc-number-keyboard__sidebar-key"
                        :class="{
                            'is-delete': key.type === 'delete',
                            'is-confirm': key.type === 'confirm',
                        }"
                        @click="onKeyPress(key)"
                    >
                        <template v-if="key.type === 'delete'">
                            <fanc-icon name="backspace" size="24"></fanc-icon>
                        </template>
                        <template v-else>
                            {{ key.text }}
                        </template>
                    </view>
                </view>
            </view>
        </view>
    </transition>
</template>

<script>
import fancIcon from "../fanc-icon/index.vue";

/**
 * fanc-number-keyboard 数字键盘
 * @description 数字键盘组件，常用于输入密码、验证码等纯数字场景
 * @property {Boolean} show - 是否显示键盘
 * @property {String} title - 键盘标题
 * @property {Boolean} zIndex - 键盘层级
 * @property {Boolean} round - 是否为圆角键盘
 * @property {Boolean} fixed - 是否固定在底部
 * @property {Boolean} showDeleteKey - 是否显示删除键
 * @property {Boolean} hideOnClickOutside - 是否在点击外部时关闭键盘
 * @property {Boolean} randomKeyOrder - 是否随机排序键盘按键
 * @property {String} extraKey - 额外按键的内容
 * @property {Boolean} showExtraKey - 是否显示额外按键
 * @property {Boolean} showHeader - 是否显示键盘头部
 * @property {String} theme - 键盘主题，可选值为 'default'、'idcard'、'custom'
 * @property {Boolean} showSidebar - 是否显示右侧栏，仅在 theme 为 'custom' 时有效
 * @property {String} confirmButtonText - 确认按钮文字，仅在 theme 为 'custom' 且 showSidebar 为 true 时有效
 * @event {Function} input - 点击按键时触发
 * @event {Function} delete - 点击删除键时触发
 * @event {Function} close - 点击关闭按钮时触发
 * @event {Function} blur - 键盘关闭时触发
 * @event {Function} function - 点击功能键时触发
 * @event {Function} confirm - 点击确认按钮时触发，仅在 theme 为 'custom' 且 showSidebar 为 true 时有效
 */
export default {
    name: "fanc-number-keyboard",
    components: {
        "fanc-icon": fancIcon,
    },
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
        // 是否显示额外按键
        showExtraKey: {
            type: Boolean,
            default: false,
        },
        // 是否显示键盘头部
        showHeader: {
            type: Boolean,
            default: false,
        },
        // 键盘主题，可选值为 'default'、'idcard'、'custom'
        theme: {
            type: String,
            default: "default",
            validator: (value) => ["default", "idcard", "custom"].includes(value),
        },
        // 是否显示右侧栏，仅在 theme 为 'custom' 时有效
        showSidebar: {
            type: Boolean,
            default: false,
        },
        // 确认按钮文字，仅在 theme 为 'custom' 且 showSidebar 为 true 时有效
        confirmButtonText: {
            type: String,
            default: "确认",
        },
    },
    data() {
        return {
            // 键盘实际显示状态
            isVisible: false,
            // 点击外部事件处理器
            clickOutsideHandler: null,
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
        // 基础按键配置
        baseKeys() {
            let keys = [
                { text: "1", value: "1" },
                { text: "2", value: "2" },
                { text: "3", value: "3" },
                { text: "4", value: "4" },
                { text: "5", value: "5" },
                { text: "6", value: "6" },
                { text: "7", value: "7" },
                { text: "8", value: "8" },
                { text: "9", value: "9" },
            ];

            // 第一个位置：额外键或键盘键
            if (this.showExtraKey) {
                keys.push({ text: this.extraKey, value: this.extraKey, type: "function" });
            } else {
                keys.push({ type: "keyboard", value: "keyboard" });
            }

            // 第二个位置：始终是数字0
            keys.push({ text: "0", value: "0" });

            // 第三个位置：删除键
            if (this.showDeleteKey) {
                keys.push({ type: "delete", value: "delete" });
            } else {
                keys.push({ type: "empty" });
            }

            return keys;
        },
        // 计算显示的按键
        displayKeys() {
            let keys = [];

            // 根据主题选择不同的键盘布局
            if (this.theme === "idcard") {
                // 身份证键盘布局
                keys = [
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    { text: "6", value: "6" },
                    { text: "7", value: "7" },
                    { text: "8", value: "8" },
                    { text: "9", value: "9" },
                    { text: "X", value: "X" },
                    { text: "0", value: "0" },
                ];

                // 添加删除键
                if (this.showDeleteKey) {
                    keys.push({ type: "delete", value: "delete" });
                }
            } else if (this.theme === "custom" && this.showSidebar) {
                // 带右侧栏的键盘布局
                keys = [
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    { text: "6", value: "6" },
                    { text: "7", value: "7" },
                    { text: "8", value: "8" },
                    { text: "9", value: "9" },
                ];

                // 额外键（如果有）
                if (this.showExtraKey) {
                    keys.push({ text: this.extraKey, value: this.extraKey, type: "function" });
                } else {
                    // 使用键盘键
                    keys.push({ type: "keyboard", value: "keyboard" });
                }

                // 添加0键，在有侧边栏时占据两倍宽度
                keys.push({ text: "0", value: "0", wider: true });
            } else {
                // 默认键盘布局
                keys = [...this.baseKeys];

                // 随机排序数字键（仅排序1-9）
                if (this.randomKeyOrder) {
                    // 提取1-9数字键
                    const numberKeys = keys.slice(0, 9);
                    // 提取底部一行按键（不参与随机排序）
                    const bottomRowKeys = keys.slice(9);

                    // Fisher-Yates 洗牌算法
                    for (let i = numberKeys.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [numberKeys[i], numberKeys[j]] = [numberKeys[j], numberKeys[i]];
                    }

                    keys = [...numberKeys, ...bottomRowKeys];
                }
            }

            return keys;
        },
        // 右侧栏按键
        sidebarKeys() {
            if (this.theme !== "custom" || !this.showSidebar) {
                return [];
            }

            return [
                { type: "delete", value: "delete" },
                { text: this.confirmButtonText, type: "confirm", value: "confirm" },
            ];
        },
    },
    methods: {
        isNormalDelete(key) {
            let isNormalDelete = false;
            this.displayKeys.map((item) => {
                if (item.value === "X") {
                    isNormalDelete = true;
                }
            });

            return key.type === "delete" && isNormalDelete;
        },
        // 按键点击事件
        onKeyPress(key) {
            if (key.type === "delete") {
                this.$emit("delete");
            } else if (key.type === "function") {
                this.$emit("function", key.value);
            } else if (key.type === "confirm") {
                this.$emit("confirm");
            } else if (key.type === "empty") {
                // 空白键不做任何操作
            } else if (key.type === "keyboard") {
                // 收起键盘
                this.hideKeyboard();
                this.$emit("close");
            } else {
                this.$emit("input", key.value);
            }
        },
        // 显示键盘
        showKeyboard() {
            this.isVisible = true;
            this.$emit("update:show", true);

            // 添加点击外部事件监听
            this.setupClickOutsideListener();
        },
        // 隐藏键盘
        hideKeyboard() {
            this.isVisible = false;
            this.$emit("update:show", false);
            this.$emit("blur");

            // 移除点击外部事件监听
            this.removeClickOutsideListener();
        },
        // 设置点击外部监听器
        setupClickOutsideListener() {
            if (this.hideOnClickOutside) {
                // 先移除已有的监听器，防止重复绑定
                this.removeClickOutsideListener();

                // 创建点击外部处理函数
                this.clickOutsideHandler = (event) => {
                    // 如果键盘已经隐藏，不做任何处理
                    if (!this.isVisible) return;

                    // 检查点击是否在键盘外部
                    const keyboardEl = event.target.closest(".fanc-number-keyboard");
                    if (!keyboardEl && this.hideOnClickOutside) {
                        this.hideKeyboard();
                        this.$emit("close");
                    }
                };

                // 延迟添加点击监听，避免触发当前点击事件
                setTimeout(() => {
                    if (this.isVisible) {
                        document.addEventListener("click", this.clickOutsideHandler);
                    }
                }, 50);
            }
        },
        // 移除点击外部监听器
        removeClickOutsideListener() {
            if (this.clickOutsideHandler) {
                document.removeEventListener("click", this.clickOutsideHandler);
                this.clickOutsideHandler = null;
            }
        },
        // 同步显示状态
        syncVisible(value) {
            if (value === this.isVisible) return;

            if (value) {
                this.showKeyboard();
            } else {
                this.hideKeyboard();
            }
        },
    },
    watch: {
        // 监听显示状态
        show(newVal) {
            this.syncVisible(newVal);
        },
    },
    mounted() {
        if (this.show) {
            this.isVisible = true;
            this.setupClickOutsideListener();
        }
    },
    beforeDestroy() {
        this.removeClickOutsideListener();
    },
};
</script>

<style lang="scss" scoped>
/* 
 * 数字键盘组件样式
 * 结构:
 * - .fanc-number-keyboard 主容器
 *   - __header 键盘头部
 *   - __body 键盘主体
 *     - __keys 按键区域
 *       - __key 单个按键
 *     - __sidebar 右侧栏（可选）
 *       - __sidebar-key 右侧栏按键
 */

.fanc-number-keyboard {
    position: relative;
    background-color: var(--keyboard-bg-color, #f2f3f5);
    user-select: none;
    max-width: 100%;
    width: 100%;
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;

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
        padding: 10px 0;
        background-color: var(--keyboard-header-bg-color, #f7f8fa);
        border-bottom: 1px solid var(--keyboard-border-color, #ebedf0);
    }

    // 标题样式
    &__title {
        font-size: 16px;
        color: var(--keyboard-title-color, #323233);
        font-weight: 400;
    }

    // 键盘主体
    &__body {
        padding: 6px 0;

        &.with-sidebar {
            display: flex;
        }
    }

    // 按键区域
    &__keys {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        &.with-sidebar {
            flex: 3;
        }
    }

    // 右侧栏
    &__sidebar {
        display: flex;
        flex-direction: column;
        width: 25%;
        flex: 1;
    }

    // 右侧栏按键
    &__sidebar-key {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(50% - 6px);
        margin: 3px;
        border-radius: 8px;
        background-color: var(--keyboard-key-bg-color, #fff);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        font-size: 16px;
        font-weight: 500;
        color: var(--keyboard-key-color, #323233);
        cursor: pointer;
        transition: background-color 0.2s;

        &:active {
            background-color: var(--keyboard-key-active-bg-color, #e6e6e6);
        }

        &.is-delete {
            color: var(--keyboard-delete-key-color, var(--text-secondary, #6c757d));
        }

        &.is-confirm {
            background-color: var(
                --keyboard-confirm-key-bg-color,
                var(--fanc-primary-color, #007bff)
            );
            color: var(--keyboard-confirm-key-color, #fff);

            &:active {
                background-color: var(
                    --keyboard-confirm-key-active-bg-color,
                    var(--fanc-primary-dark-color, #0069d9)
                );
            }
        }
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

        // 功能键
        &.is-function {
            color: var(--keyboard-function-key-color, var(--text-secondary, #6c757d));
        }

        // 删除键
        &.is-delete {
            color: var(--keyboard-delete-key-color, var(--text-secondary, #6c757d));
        }

        // 空白键
        &.is-empty {
            background-color: transparent;
            box-shadow: none;
            cursor: default;
        }

        // 身份证X键
        &.is-idcard {
            font-size: 18px;
            font-weight: 600;
        }

        // 键盘按钮
        &.is-keyboard {
            color: var(--keyboard-function-key-color, var(--text-secondary, #6c757d));
        }

        // 0键加宽样式 - 默认模式
        &.is-zero {
            width: calc(100% / 3 * 2 - 9px);
        }
    }

    // 键盘带侧边栏时的0键特殊样式
    &__keys.with-sidebar {
        .fanc-number-keyboard__key.is-zero {
            width: calc((100% / 3) * 2 - 6px); // 精确占据两个按键的宽度
        }
    }
}

/* 键盘动画效果 */
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

// 过渡动画类
.fanc-keyboard-enter-active {
    animation: fanc-slide-up 0.3s both ease-out;
}

.fanc-keyboard-leave-active {
    animation: fanc-slide-down 0.3s both ease-in;
}
</style>
