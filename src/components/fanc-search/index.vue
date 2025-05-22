<template>
    <view class="fanc-search" :class="[`fanc-search--${shape}`]" :style="customStyle">
        <view class="fanc-search__content">
            <view v-if="leftIcon" class="fanc-search__left-icon">
                <fanc-icon :name="leftIcon" :size="iconSize" :color="iconColor"></fanc-icon>
            </view>
            <view v-if="label" class="fanc-search__label">{{ label }}</view>
            <view class="fanc-search__input-container">
                <input
                    :value="value"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :disabled="disabled"
                    :focus="focus"
                    :confirm-type="confirmType"
                    :maxlength="maxlength"
                    :cursor-spacing="cursorSpacing"
                    :type="inputType"
                    :adjust-position="adjustPosition"
                    class="fanc-search__input"
                    :style="inputStyle"
                    @input="handleInput"
                    @confirm="handleConfirm"
                    @focus="handleFocus"
                    @blur="handleBlur"
                />
                <view
                    v-if="showClearIcon && value && !disabled"
                    class="fanc-search__clear-icon"
                    @click="handleClear"
                >
                    <fanc-icon
                        name="times-circle"
                        size="14"
                        color="var(--search-clear-icon-color)"
                    ></fanc-icon>
                </view>
            </view>
            <view
                v-if="rightIcon || $slots.rightIcon"
                class="fanc-search__right-icon"
                @click="handleRightIconClick"
            >
                <slot name="rightIcon">
                    <fanc-icon
                        v-if="rightIcon"
                        :name="rightIcon"
                        :size="iconSize"
                        :color="iconColor"
                    ></fanc-icon>
                </slot>
            </view>
        </view>
        <view v-if="showActionButton" class="fanc-search__action" @click="handleAction">
            <slot name="action">{{ actionText }}</slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-search 搜索组件
 * @description 用于搜索场景的输入框组件
 * @property {String} value - 搜索框当前值
 * @property {String} placeholder - 占位提示文字
 * @property {String} placeholderStyle - 占位提示文字样式
 * @property {String} label - 搜索框左侧文本
 * @property {String} shape - 搜索框形状，可选值为 square/round
 * @property {String} background - 搜索框背景色
 * @property {String} inputType - 输入框类型，可选值为 text/number/idcard/digit
 * @property {Boolean} clearable - 是否显示清除按钮
 * @property {Boolean} focus - 是否自动聚焦
 * @property {Boolean} disabled - 是否禁用
 * @property {Boolean} readOnly - 是否只读
 * @property {String} leftIcon - 左侧图标名称
 * @property {String} rightIcon - 右侧图标名称
 * @property {String} iconSize - 图标大小
 * @property {String} iconColor - 图标颜色
 * @property {String} maxlength - 最大输入长度，-1为不限制
 * @property {Number} cursorSpacing - 指定光标与键盘的距离
 * @property {Boolean} adjustPosition - 键盘弹起时是否自动上推页面
 * @property {String} confirmType - 键盘右下角按钮的文字，可选值为 send/search/next/go/done
 * @property {Boolean} showActionButton - 是否显示右侧按钮
 * @property {String} actionText - 右侧按钮文字
 * @property {String} actionColor - 右侧按钮颜色
 * @property {String} align - 输入框内容对齐方式，可选值为 left/center/right，默认left
 * @event {Function} input - 输入框内容变化时触发
 * @event {Function} search - 点击搜索或确认按钮时触发
 * @event {Function} focus - 输入框聚焦时触发
 * @event {Function} blur - 输入框失焦时触发
 * @event {Function} clear - 点击清除按钮时触发
 * @event {Function} right-icon-click - 点击右侧图标时触发
 * @event {Function} action-click - 点击右侧按钮时触发
 */
export default {
    name: "fanc-search",
    props: {
        // 输入框当前值
        value: {
            type: String,
            default: "",
        },
        // 占位提示文本
        placeholder: {
            type: String,
            default: "请输入搜索关键词",
        },
        // 占位提示文本样式
        placeholderStyle: {
            type: String,
            default: "",
        },
        // 搜索框左侧文本
        label: {
            type: String,
            default: "",
        },
        // 搜索框形状
        shape: {
            type: String,
            default: "round",
            validator: (value) => ["square", "round"].includes(value),
        },
        // 背景颜色
        background: {
            type: String,
            default: "",
        },
        // 输入框类型
        inputType: {
            type: String,
            default: "text",
            validator: (value) => ["text", "number", "idcard", "digit"].includes(value),
        },
        // 是否显示清除按钮
        clearable: {
            type: Boolean,
            default: true,
        },
        // 是否自动聚焦
        focus: {
            type: Boolean,
            default: false,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否只读
        readOnly: {
            type: Boolean,
            default: false,
        },
        // 左侧图标
        leftIcon: {
            type: String,
            default: "search",
        },
        // 右侧图标
        rightIcon: {
            type: String,
            default: "",
        },
        // 图标大小
        iconSize: {
            type: [String, Number],
            default: "16",
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: "var(--search-icon-color)",
        },
        // 最大输入长度，-1为不限制
        maxlength: {
            type: [String, Number],
            default: -1,
        },
        // 光标与键盘的距离
        cursorSpacing: {
            type: Number,
            default: 0,
        },
        // 键盘弹起时是否自动上推页面
        adjustPosition: {
            type: Boolean,
            default: true,
        },
        // 键盘右下角按钮的文字
        confirmType: {
            type: String,
            default: "search",
            validator: (value) => ["send", "search", "next", "go", "done"].includes(value),
        },
        // 是否显示右侧按钮
        showActionButton: {
            type: Boolean,
            default: false,
        },
        // 右侧按钮文字
        actionText: {
            type: String,
            default: "搜索",
        },
        // 右侧按钮颜色
        actionColor: {
            type: String,
            default: "",
        },
        // 输入框内容对齐方式
        align: {
            type: String,
            default: "left",
            validator: (value) => ["left", "center", "right"].includes(value),
        },
    },
    computed: {
        // 是否显示清除按钮
        showClearIcon() {
            return this.clearable && this.value && !this.readOnly;
        },
        // 自定义样式
        customStyle() {
            const style = {};
            if (this.background) {
                style.backgroundColor = this.background;
            }
            return style;
        },
        // 输入框样式
        inputStyle() {
            return {
                textAlign: this.align,
            };
        },
    },
    methods: {
        // 处理输入事件
        handleInput(event) {
            const value = event.detail.value;
            this.$emit("input", value);
        },
        // 处理确认事件
        handleConfirm(event) {
            const value = event.detail.value;
            this.$emit("search", value);
        },
        // 处理聚焦事件
        handleFocus(event) {
            this.$emit("focus", event);
        },
        // 处理失焦事件
        handleBlur(event) {
            this.$emit("blur", event);
        },
        // 处理清除事件
        handleClear() {
            this.$emit("input", "");
            this.$emit("clear");
        },
        // 处理右侧图标点击事件
        handleRightIconClick() {
            this.$emit("right-icon-click");
        },
        // 处理右侧按钮点击事件
        handleAction() {
            this.$emit("action-click", this.value);
            this.$emit("search", this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-search {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: var(--search-background-color);
    padding: 8px 12px;
    width: 100%;

    &__content {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 0 10px;
        height: 36px;
        background-color: var(--search-content-background);
    }

    &__left-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
        height: 100%;
    }

    &__label {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: var(--search-label-color);
        margin-right: 6px;
        height: 100%;
    }

    &__input-container {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }

    &__input {
        flex: 1;
        height: 100%;
        line-height: normal;
        font-size: 14px;
        background-color: transparent;
        color: var(--search-input-color);
        padding: 0;
        margin: 0;
        border: none;
        width: 100%;
    }

    &__clear-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
        cursor: pointer;
        height: 100%;
    }

    &__right-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
        cursor: pointer;
        height: 100%;
    }

    &__action {
        display: flex;
        align-items: center;
        padding-left: 10px;
        margin-left: 8px;
        font-size: 14px;
        color: var(--search-action-color);
        cursor: pointer;
        flex-shrink: 0;
        height: 100%;
    }

    // 圆角样式
    &--round {
        .fanc-search__content {
            border-radius: 20px;
        }
    }

    // 方形样式
    &--square {
        .fanc-search__content {
            border-radius: 4px;
        }
    }

    // 禁用状态
    &--disabled {
        opacity: 0.6;
        cursor: not-allowed;

        .fanc-search__input {
            cursor: not-allowed;
        }
    }
}
</style>
