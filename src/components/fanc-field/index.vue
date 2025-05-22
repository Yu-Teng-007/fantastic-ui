<template>
    <view
        class="fanc-field"
        :class="[
            error ? 'fanc-field--error' : '',
            disabled ? 'fanc-field--disabled' : '',
            readonly ? 'fanc-field--readonly' : '',
            'fanc-field--' + type,
            required ? 'fanc-field--required' : '',
            clickable ? 'fanc-field--clickable' : '',
            border ? 'fanc-field--border' : '',
            center ? 'fanc-field--center' : '',
            errorMessage ? 'fanc-field--with-error-msg' : '',
        ]"
    >
        <!-- 左侧图标 -->
        <view v-if="leftIcon || $slots['left-icon']" class="fanc-field__left-icon">
            <slot name="left-icon">
                <fanc-icon :name="leftIcon" size="16" class="fanc-field__icon" />
            </slot>
        </view>

        <!-- 标签 -->
        <view v-if="label || $slots.label" class="fanc-field__label" :style="{ width: labelWidth }">
            <slot name="label">{{ label }}</slot>
        </view>

        <!-- 输入框区域 -->
        <view class="fanc-field__value-wrapper">
            <view class="fanc-field__value">
                <!-- 输入框内容 -->
                <view class="fanc-field__body">
                    <!-- 文本输入 -->
                    <template v-if="type !== 'textarea'">
                        <input
                            class="fanc-field__input"
                            :value="value"
                            :type="inputType"
                            :placeholder="placeholder"
                            :placeholder-style="placeholderStyle"
                            :disabled="disabled || readonly"
                            :maxlength="maxlength"
                            :cursor-spacing="cursorSpacing"
                            :focus="focus"
                            :confirm-type="confirmType"
                            :confirm-hold="confirmHold"
                            :adjust-position="adjustPosition"
                            :cursor="cursor"
                            :password="type === 'password' && !showPassword"
                            @input="onInput"
                            @focus="onFocus"
                            @blur="onBlur"
                            @confirm="onConfirm"
                            @keyboardheightchange="onKeyboardHeightChange"
                        />

                        <!-- 单行输入框的字数统计 -->
                        <view v-if="showWordLimit && maxlength" class="fanc-field__word-limit">
                            <text class="fanc-field__word-num">{{ value ? value.length : 0 }}</text
                            >/{{ maxlength }}
                        </view>
                    </template>

                    <!-- 多行文本输入 -->
                    <template v-else>
                        <textarea
                            class="fanc-field__textarea"
                            :value="value"
                            :placeholder="placeholder"
                            :placeholder-style="placeholderStyle"
                            :disabled="disabled || readonly"
                            :maxlength="maxlength"
                            :cursor-spacing="cursorSpacing"
                            :focus="focus"
                            :auto-height="autosize"
                            :show-confirm-bar="showConfirmBar"
                            :adjust-position="adjustPosition"
                            :cursor="cursor"
                            @input="onInput"
                            @focus="onFocus"
                            @blur="onBlur"
                            @confirm="onConfirm"
                            @keyboardheightchange="onKeyboardHeightChange"
                        />
                    </template>
                </view>

                <!-- 清除按钮 -->
                <view
                    v-if="clearable && value && !readonly && !disabled"
                    class="fanc-field__clear"
                    @click="onClear"
                >
                    <fanc-icon name="times-circle" size="16" class="fanc-field__clear-icon" />
                </view>

                <!-- 密码可见按钮 -->
                <view
                    v-if="type === 'password' && value"
                    class="fanc-field__right-icon fanc-field__password-icon"
                    @click="togglePasswordVisible"
                >
                    <fanc-icon
                        :name="showPassword ? 'eye' : 'eye-slash'"
                        size="16"
                        class="fanc-field__icon"
                    />
                </view>

                <!-- 右侧图标 -->
                <view
                    v-if="rightIcon || $slots['right-icon']"
                    class="fanc-field__right-icon"
                    @click="onClickRightIcon"
                >
                    <slot name="right-icon">
                        <fanc-icon :name="rightIcon" size="16" class="fanc-field__icon" />
                    </slot>
                </view>
            </view>

            <!-- 文本域模式下的字数统计 -->
            <view
                v-if="showWordLimit && maxlength && type === 'textarea'"
                class="fanc-field__word-limit fanc-field__word-limit--below"
            >
                <text class="fanc-field__word-num">{{ value ? value.length : 0 }}</text
                >/{{ maxlength }}
            </view>

            <!-- 错误提示 -->
            <view v-if="errorMessage" class="fanc-field__error-message">
                {{ errorMessage }}
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-field",

    props: {
        // 输入框的类型，支持text、password、textarea、number、digit等
        type: {
            type: String,
            default: "text",
        },
        // 输入框的值
        value: {
            type: [String, Number],
            default: "",
        },
        // 输入框的描述名称
        label: {
            type: String,
            default: "",
        },
        // 标签宽度，如 '80px' 或 '5em'
        labelWidth: {
            type: String,
            default: "88px",
        },
        // 是否必填
        required: {
            type: Boolean,
            default: false,
        },
        // 占位提示文字
        placeholder: {
            type: String,
            default: "请输入",
        },
        // 占位提示文字样式
        placeholderStyle: {
            type: String,
            default: "",
        },
        // 输入框左侧图标名称
        leftIcon: {
            type: String,
            default: "",
        },
        // 输入框右侧图标名称
        rightIcon: {
            type: String,
            default: "",
        },
        // 是否显示清除按钮
        clearable: {
            type: Boolean,
            default: false,
        },
        // 是否只读
        readonly: {
            type: Boolean,
            default: false,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否显示边框
        border: {
            type: Boolean,
            default: true,
        },
        // 最大输入长度
        maxlength: {
            type: [String, Number],
            default: -1,
        },
        // 是否根据内容自动调整高度 (textarea模式下有效)
        autosize: {
            type: Boolean,
            default: false,
        },
        // 是否错误状态
        error: {
            type: Boolean,
            default: false,
        },
        // 错误提示信息
        errorMessage: {
            type: String,
            default: "",
        },
        // 是否显示字数统计
        showWordLimit: {
            type: Boolean,
            default: false,
        },
        // 确认按钮的文字
        confirmType: {
            type: String,
            default: "done",
        },
        // 点击键盘确认按钮时是否维持键盘不收起
        confirmHold: {
            type: Boolean,
            default: false,
        },
        // 是否可点击
        clickable: {
            type: Boolean,
            default: false,
        },
        // 是否垂直居中
        center: {
            type: Boolean,
            default: false,
        },
        // 是否自动聚焦
        focus: {
            type: Boolean,
            default: false,
        },
        // 指定focus时的光标位置
        cursor: {
            type: [String, Number],
            default: -1,
        },
        // 键盘弹起时，是否自动上推页面
        adjustPosition: {
            type: Boolean,
            default: true,
        },
        // 是否显示键盘上方带有"完成"按钮那一栏
        showConfirmBar: {
            type: Boolean,
            default: true,
        },
        // 指定光标与键盘的距离，单位px
        cursorSpacing: {
            type: [String, Number],
            default: 0,
        },
    },

    data() {
        return {
            showPassword: false, // 是否显示密码
        };
    },

    computed: {
        // 根据type属性确定输入框的实际type
        inputType() {
            const map = {
                text: "text",
                password: "text", // 密码框使用text类型，通过password属性控制安全显示
                number: "number",
                digit: "digit",
                idcard: "idcard",
                textarea: "textarea",
            };
            return map[this.type] || "text";
        },

        // 计算错误信息的左侧边距
        errorMessageStyle() {
            // 如果有左侧图标，需要添加图标的宽度和间距
            const leftIconWidth = this.leftIcon || this.$slots["left-icon"] ? "24px" : "0";
            // 如果有标签，需要添加标签的宽度
            const labelWidth = this.label || this.$slots.label ? this.labelWidth : "0";

            return {
                marginLeft:
                    leftIconWidth === "0" && labelWidth === "0"
                        ? "16px"
                        : `calc(${leftIconWidth} + ${labelWidth})`,
            };
        },
    },

    methods: {
        // 输入事件
        onInput(event) {
            const { value = "" } = event.detail || event.target || {};
            this.$emit("input", value);
            this.$emit("change", value);
        },

        // 聚焦事件
        onFocus(event) {
            this.$emit("focus", event);
        },

        // 失焦事件
        onBlur(event) {
            this.$emit("blur", event);
        },

        // 点击清除按钮
        onClear() {
            this.$emit("input", "");
            this.$emit("change", "");
            this.$emit("clear");
        },

        // 键盘确认事件
        onConfirm(event) {
            const { value = "" } = event.detail || {};
            this.$emit("confirm", value);
        },

        // 切换密码显示状态
        togglePasswordVisible() {
            this.showPassword = !this.showPassword;
            this.$emit("click-icon", "password");
        },

        // 点击右侧图标
        onClickRightIcon() {
            this.$emit("click-right-icon");
            this.$emit("click-icon", "right");
        },

        // 键盘高度变化事件
        onKeyboardHeightChange(event) {
            this.$emit("keyboardheightchange", event);
        },
    },
};
</script>

<style lang="scss">
.fanc-field {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    background-color: var(--field-bg-color);

    &--textarea {
        align-items: flex-start;

        .fanc-field__value {
            align-items: flex-start;
        }

        .fanc-field__body {
            align-items: flex-start;
        }

        .fanc-field__label {
            align-items: flex-start;
            padding-top: 2px;
        }

        .fanc-field__left-icon {
            margin-top: 4px;
        }

        .fanc-field__right-icon {
            align-self: flex-start;
            margin-top: 4px;
        }

        .fanc-field__clear {
            align-self: flex-start;
            margin-top: 4px;
        }
    }

    &--border {
        &::after {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 16px;
            bottom: 0;
            left: 16px;
            border-bottom: 1px solid var(--field-border-color);
            transform: scaleY(0.5);
        }
    }

    &--required {
        .fanc-field__label {
            &::before {
                content: "*";
                margin-right: 2px;
                color: var(--field-required-color);
            }
        }
    }

    &--center {
        align-items: center;
    }

    &--disabled {
        opacity: var(--field-disabled-opacity);
    }

    &--error {
        .fanc-field__input,
        .fanc-field__textarea {
            color: var(--field-error-color);
        }
    }

    &--clickable {
        cursor: pointer;
    }

    &__left-icon {
        display: flex;
        align-items: center;
        height: 24px;
        margin-right: 8px;
        flex-shrink: 0;
    }

    &__label {
        width: 88px;
        flex: none;
        margin-right: 12px;
        color: var(--field-label-color);
        word-wrap: break-word;
        display: flex;
        align-items: center;
        min-height: 24px;
        font-size: 14px;
        line-height: 1.5;
    }

    &__value-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    &__value {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        min-height: 24px;
    }

    &__body {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        min-height: 24px;
    }

    &__right-icon {
        display: flex;
        align-items: center;
        height: 24px;
        margin-left: 8px;
    }

    &__clear {
        margin-left: 8px;
        display: flex;
        align-items: center;
        height: 24px;
        cursor: pointer;
    }

    &__icon {
        color: var(--field-icon-color);
    }

    &__clear-icon {
        color: var(--field-clear-icon-color);
        &:active {
            color: var(--field-clear-icon-active-color);
        }
    }

    &__password-icon {
        cursor: pointer;
    }

    &__input,
    &__textarea {
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        margin: 0;
        padding: 0;
        color: var(--field-input-color);
        text-align: left;
        background-color: transparent;
        border: 0;
        resize: none;
        font-size: 14px;
        line-height: 1.5;
    }

    &__input {
        height: 24px;
    }

    &__textarea {
        min-height: 60px;
        height: auto;
        line-height: 1.4;
        padding-top: 2px;
    }

    &__input::placeholder,
    &__textarea::placeholder {
        color: var(--field-placeholder-color);
        font-size: 14px;
        line-height: 1.5;
    }

    &__error-message {
        color: var(--field-error-color);
        font-size: 12px;
        line-height: 1.2;
        margin-top: 4px;
        width: 100%;
        padding-left: 0;
    }

    &__word-limit {
        margin-top: 4px;
        text-align: right;
        font-size: 12px;
        color: var(--field-word-limit-color);

        &--below {
            width: 100%;
            display: block;
            text-align: right;
            margin-top: 4px;
        }
    }

    // textarea模式下错误信息调整
    &--textarea &__error-message {
        margin-top: 2px;
    }

    // 非文本域模式下，有错误提示时，保持标签垂直居中
    &--with-error-msg:not(.fanc-field--textarea) {
        .fanc-field__label {
            align-self: flex-start;
            padding-top: 1px;
        }

        .fanc-field__left-icon {
            align-self: flex-start;
            margin-top: 1px;
        }
    }

    // 文本域模式下，有错误提示时，保持标签顶部对齐
    &--with-error-msg.fanc-field--textarea {
        .fanc-field__label {
            align-self: flex-start;
            padding-top: 2px;
        }
    }
}
</style>
