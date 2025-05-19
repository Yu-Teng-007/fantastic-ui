<template>
    <view
        class="fanc-field"
        :class="[
            type ? 'fanc-field--' + type : '',
            disabled ? 'fanc-field--disabled' : '',
            error ? 'fanc-field--error' : '',
            center ? 'fanc-field--center' : '',
            borderless ? 'fanc-field--borderless' : '',
            isLink ? 'fanc-field--clickable' : '',
            type === 'textarea' ? 'fanc-field--textarea' : '',
        ]"
    >
        <view class="fanc-field__container">
            <view
                class="fanc-field__left"
                :class="[labelWidth ? 'fanc-field__left--' + labelWidth : '']"
            >
                <!-- 左侧图标 -->
                <slot name="left-icon" v-if="$slots['left-icon']"></slot>
                <view class="fanc-field__icon" v-else-if="leftIcon">
                    <fanc-icon :name="leftIcon" class="fanc-field__icon-inner" size="16" />
                </view>

                <view class="fanc-field__label" v-if="label || $slots.label">
                    <!-- 必填星号 -->
                    <text v-if="required" class="fanc-field__required-mark">*</text>
                    <!-- 自定义标签 -->
                    <slot name="label" v-if="$slots.label"></slot>
                    <!-- 默认标签 -->
                    <text v-else>{{ label }}</text>
                </view>
            </view>

            <view class="fanc-field__content">
                <!-- 输入框前内容 -->
                <slot name="input-prefix" v-if="$slots['input-prefix']"></slot>

                <!-- 自定义输入内容 -->
                <slot name="input" v-if="$slots.input"></slot>

                <!-- 输入框 -->
                <input
                    v-else-if="type !== 'textarea'"
                    :value="value"
                    :type="inputType"
                    :placeholder="placeholder"
                    :disabled="disabled || readonly"
                    :focus="focus"
                    :password="showPassword ? false : password || type === 'password'"
                    :maxlength="maxlength"
                    :cursor-spacing="cursorSpacing"
                    :confirm-type="confirmType"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="placeholderClass"
                    :adjust-position="adjustPosition"
                    :confirm-hold="confirmHold"
                    :hold-keyboard="holdKeyboard"
                    :selection-start="selectionStart"
                    :selection-end="selectionEnd"
                    class="fanc-field__input"
                    :class="[`fanc-field__input--text-${inputAlign}`]"
                    @input="onInput"
                    @focus="onFocus"
                    @blur="onBlur"
                    @confirm="onConfirm"
                    @keyboardheightchange="onKeyboardHeightChange"
                />

                <!-- 文本域 -->
                <view v-else class="fanc-field__textarea-wrapper">
                    <textarea
                        :value="value"
                        :placeholder="placeholder"
                        :disabled="disabled || readonly"
                        :focus="focus"
                        :maxlength="maxlength"
                        :cursor-spacing="cursorSpacing"
                        :placeholder-style="placeholderStyle"
                        :placeholder-class="placeholderClass"
                        :adjust-position="adjustPosition"
                        :show-confirm-bar="showConfirmBar"
                        :auto-height="autoHeight"
                        :fixed="fixed"
                        :cursor="cursor"
                        class="fanc-field__textarea"
                        :style="{ textAlign: inputAlign }"
                        @input="onInput"
                        @focus="onFocus"
                        @blur="onBlur"
                        @confirm="onConfirm"
                        @keyboardheightchange="onKeyboardHeightChange"
                    ></textarea>

                    <!-- 字数统计 -->
                    <view class="fanc-field__word-limit" v-if="showWordLimit && maxlength">
                        <text>{{ value ? value.length : 0 }}/{{ maxlength }}</text>
                    </view>
                </view>

                <!-- 输入框后内容 -->
                <slot name="input-suffix" v-if="$slots['input-suffix']"></slot>

                <!-- 字数统计 (非文本域) -->
                <view
                    class="fanc-field__word-limit"
                    v-if="showWordLimit && maxlength && type !== 'textarea'"
                >
                    <text>{{ value ? value.length : 0 }}/{{ maxlength }}</text>
                </view>

                <!-- 清除按钮 -->
                <view
                    class="fanc-field__clear"
                    v-if="clearable && value && !disabled && !readonly"
                    @touchstart.stop.prevent="onClear"
                    @click.stop="onClear"
                >
                    <fanc-icon name="times-circle" size="16" />
                </view>

                <!-- 自定义右侧图标 -->
                <slot name="right-icon" v-if="$slots['right-icon']"></slot>
                <!-- 默认右侧图标 -->
                <view
                    class="fanc-field__right-icon"
                    v-else-if="rightIcon || isLink"
                    @click.stop="onClickRightIcon"
                >
                    <fanc-icon
                        color="#bfbfbf"
                        size="16"
                        :name="rightIcon || (isLink ? 'angle-right' : '')"
                        class="fanc-field__right-icon-inner"
                    />
                </view>
            </view>
        </view>

        <!-- 错误提示 -->
        <view class="fanc-field__error-message" v-if="showError && showErrorMessage">
            {{ showErrorMessage }}
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-field",

    props: {
        // 输入框类型，可选值为 text、textarea、password、number、digit、idcard、tel
        type: {
            type: String,
            default: "text",
            validator: (value) => {
                return [
                    "text",
                    "textarea",
                    "password",
                    "number",
                    "digit",
                    "idcard",
                    "tel",
                ].includes(value);
            },
        },
        // 输入框的当前值
        value: {
            type: [String, Number],
            default: "",
        },
        // 输入框标签
        label: {
            type: String,
            default: "",
        },
        // 输入框占位文本
        placeholder: {
            type: String,
            default: "请输入",
        },
        // 标签宽度，可选值为 auto / fixed
        labelWidth: {
            type: String,
            default: "",
        },
        // 是否禁用输入框
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否只读
        readonly: {
            type: Boolean,
            default: false,
        },
        // 是否显示表单必填星号
        required: {
            type: Boolean,
            default: false,
        },
        // 是否启用清除图标
        clearable: {
            type: Boolean,
            default: false,
        },
        // 是否密码类型
        password: {
            type: Boolean,
            default: false,
        },
        // 是否显示密码
        showPassword: {
            type: Boolean,
            default: false,
        },
        // 输入的最大字符数
        maxlength: {
            type: [String, Number],
            default: -1,
        },
        // 是否显示字数统计
        showWordLimit: {
            type: Boolean,
            default: false,
        },
        // 左侧图标名称
        leftIcon: {
            type: String,
            default: "",
        },
        // 右侧图标名称
        rightIcon: {
            type: String,
            default: "",
        },
        // 是否显示内容为错误状态
        error: {
            type: Boolean,
            default: false,
        },
        // 错误提示文案
        errorMessage: {
            type: String,
            default: "",
        },
        // 是否垂直居中
        center: {
            type: Boolean,
            default: false,
        },
        // 是否隐藏底部边框
        borderless: {
            type: Boolean,
            default: false,
        },
        // 是否是链接
        isLink: {
            type: Boolean,
            default: false,
        },
        // 自动获取焦点
        focus: {
            type: Boolean,
            default: false,
        },
        // 输入框内容对齐方式，可选值为 left、center、right
        inputAlign: {
            type: String,
            default: "left",
            validator: (value) => {
                return ["left", "center", "right"].includes(value);
            },
        },
        // 光标与键盘的距离
        cursorSpacing: {
            type: Number,
            default: 0,
        },
        // 设置键盘右下角按钮的文字，可选值为 send、search、next、go、done
        confirmType: {
            type: String,
            default: "done",
        },
        // 指定 placeholder 的样式
        placeholderStyle: {
            type: String,
            default: "",
        },
        // 指定 placeholder 的类名
        placeholderClass: {
            type: String,
            default: "",
        },
        // 键盘弹起时，是否自动上推页面
        adjustPosition: {
            type: Boolean,
            default: true,
        },
        // 点击键盘右下角按钮时是否保持键盘不收起
        confirmHold: {
            type: Boolean,
            default: false,
        },
        // focus时，点击页面的时候不收起键盘
        holdKeyboard: {
            type: Boolean,
            default: false,
        },
        // 光标起始位置
        selectionStart: {
            type: Number,
            default: -1,
        },
        // 光标结束位置
        selectionEnd: {
            type: Number,
            default: -1,
        },
        // 是否显示键盘上方带有"完成"按钮那一栏
        showConfirmBar: {
            type: Boolean,
            default: true,
        },
        // 是否自动增高
        autoHeight: {
            type: Boolean,
            default: false,
        },
        // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
        fixed: {
            type: Boolean,
            default: false,
        },
        // 指定focus时的光标位置
        cursor: {
            type: Number,
            default: -1,
        },
        // 校验规则
        rules: {
            type: [Object, Array],
            default: () => [],
        },
        // 校验触发时机，可选值为 blur / change / submit
        validateTrigger: {
            type: String,
            default: "blur",
            validator: (value) => {
                return ["blur", "change", "submit"].includes(value);
            },
        },
        // 表单域名称
        name: {
            type: String,
            default: "",
        },
        // 校验提示文案最大长度
        errorMessageMaxLength: {
            type: Number,
            default: 100,
        },
        // 是否在失焦时自动校验
        validateOnBlur: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            // 当前校验状态
            validateState: "",
            // 当前校验信息
            validateMessage: "",
            // 是否正在校验
            validateDisabled: false,
            // 内部错误状态
            internalError: false,
            // 内部错误信息
            internalErrorMessage: "",
        };
    },

    computed: {
        // 计算实际输入类型
        inputType() {
            const typeMap = {
                text: "text",
                password: "text",
                number: "number",
                digit: "digit",
                idcard: "idcard",
                tel: "number",
            };
            return typeMap[this.type] || "text";
        },

        // 计算实际错误状态
        showError() {
            return this.error || this.internalError;
        },

        // 计算实际错误信息
        showErrorMessage() {
            return this.errorMessage || this.internalErrorMessage;
        },
    },

    watch: {
        value(val) {
            // 值变化时根据触发时机进行校验
            if (this.validateTrigger === "change") {
                this.validate();
            }
        },
    },

    methods: {
        // 输入事件
        onInput(event) {
            const value = event.detail.value;
            this.$emit("input", value);
            this.$emit("change", value);

            // 清除错误状态
            if (value && this.internalError) {
                this.internalError = false;
                this.internalErrorMessage = "";
            }
        },

        // 聚焦事件
        onFocus(event) {
            this.$emit("focus", event);
        },

        // 失焦事件
        onBlur(event) {
            this.$emit("blur", event);

            // 失焦时自动校验
            if (this.validateOnBlur && this.validateTrigger === "blur") {
                this.validate();
            }
        },

        // 确认事件
        onConfirm(event) {
            this.$emit("confirm", event.detail.value);
        },

        // 键盘高度变化事件
        onKeyboardHeightChange(event) {
            this.$emit("keyboardheightchange", event);
        },

        // 清除内容
        onClear() {
            this.$emit("input", "");
            this.$emit("change", "");
            this.$emit("clear");

            // 清除内部错误状态
            this.internalError = false;
            this.internalErrorMessage = "";
        },

        // 点击右侧图标
        onClickRightIcon(event) {
            this.$emit("click-right-icon", event);
        },

        // 重置校验状态
        resetValidation() {
            this.internalError = false;
            this.internalErrorMessage = "";
            this.validateState = "";
            this.validateMessage = "";
        },

        // 校验函数
        validate(callback) {
            // 如果没有规则或者字段被禁用，则跳过校验
            if (!this.rules || this.rules.length === 0 || this.disabled) {
                callback && callback(true);
                return true;
            }

            // 防止重复校验
            if (this.validateDisabled) {
                callback && callback(true);
                return true;
            }

            this.validateDisabled = true;

            const value = this.value;
            const rules = Array.isArray(this.rules) ? this.rules : [this.rules];

            // 执行所有校验规则
            let valid = true;
            let message = "";

            for (let i = 0; i < rules.length; i++) {
                const rule = rules[i];

                // 必填校验
                if (rule.required && (value === "" || value === undefined || value === null)) {
                    valid = false;
                    message = rule.message || "此字段不能为空";
                    break;
                }

                // 正则校验
                if (rule.pattern && !rule.pattern.test(value)) {
                    valid = false;
                    message = rule.message || "格式不正确";
                    break;
                }

                // 最小长度校验
                if (rule.min !== undefined && value.length < rule.min) {
                    valid = false;
                    message = rule.message || `最少需要输入 ${rule.min} 个字符`;
                    break;
                }

                // 最大长度校验
                if (rule.max !== undefined && value.length > rule.max) {
                    valid = false;
                    message = rule.message || `最多只能输入 ${rule.max} 个字符`;
                    break;
                }

                // 指定长度校验
                if (rule.len !== undefined && value.length !== rule.len) {
                    valid = false;
                    message = rule.message || `长度必须为 ${rule.len} 个字符`;
                    break;
                }

                // 自定义校验函数
                if (typeof rule.validator === "function") {
                    try {
                        const result = rule.validator(rule, value);

                        // 如果返回的是Promise
                        if (result && typeof result.then === "function") {
                            result
                                .then(() => {
                                    this.validateDisabled = false;
                                })
                                .catch((error) => {
                                    valid = false;
                                    message = error.message || rule.message || "校验失败";
                                    this.setValidateInfo(valid, message);
                                    this.validateDisabled = false;
                                    callback && callback(false, message);
                                });
                            return;
                        }
                    } catch (error) {
                        valid = false;
                        message = error.message || rule.message || "校验失败";
                        break;
                    }
                }

                // 枚举值校验
                if (rule.enum && Array.isArray(rule.enum) && !rule.enum.includes(value)) {
                    valid = false;
                    message = rule.message || `输入值必须是 ${rule.enum.join(", ")} 其中之一`;
                    break;
                }

                // 类型校验
                if (rule.type) {
                    let typeValid = true;

                    switch (rule.type) {
                        case "email":
                            typeValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                value
                            );
                            break;
                        case "url":
                            typeValid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
                            break;
                        case "number":
                            typeValid = !isNaN(Number(value));
                            break;
                        case "integer":
                            typeValid = Number.isInteger(Number(value));
                            break;
                        case "mobile":
                            typeValid = /^1[3-9]\d{9}$/.test(value);
                            break;
                        case "idcard":
                            typeValid = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
                            break;
                    }

                    if (!typeValid) {
                        valid = false;
                        message = rule.message || `请输入正确的${rule.type}格式`;
                        break;
                    }
                }
            }

            this.setValidateInfo(valid, message);
            this.validateDisabled = false;
            callback && callback(valid, message);
            return valid;
        },

        // 设置校验信息
        setValidateInfo(valid, message) {
            this.validateState = valid ? "success" : "error";
            this.validateMessage = message;

            // 更新内部错误状态
            this.internalError = !valid;
            this.internalErrorMessage = message;

            // 触发校验事件
            this.$emit("validate", {
                name: this.name,
                value: this.value,
                valid: valid,
                message: message,
            });
        },
    },
};
</script>

<style lang="scss">
.fanc-field {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    background-color: var(--field-bg-color, var(--white));
    line-height: 24px;

    &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid var(--field-border-color, var(--border-color));
        transform: scaleY(0.5);
    }

    &--borderless::after {
        display: none;
    }

    &--center {
        align-items: center;
    }

    &--disabled {
        opacity: var(--field-disabled-opacity, 0.6);
    }

    &--error {
        .fanc-field__input,
        .fanc-field__textarea {
            color: var(--field-error-color, var(--fanc-danger-color));
        }
    }

    &--clickable:active {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &--textarea {
        .fanc-field__container {
            align-items: flex-start;
            padding-top: 4px;
        }

        .fanc-field__label {
            margin-top: 4px;
        }

        .fanc-field__content {
            align-items: flex-start;
            min-height: 64px;
        }

        .fanc-field__textarea-wrapper {
            padding: 2px 0;
            background-color: transparent;
        }
    }

    &__container {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    &__content {
        display: flex;
        align-items: center;
        flex: 1;
    }

    &__left {
        display: flex;
        align-items: center;
        min-width: 80px;

        &--auto {
            width: auto;
            min-width: unset;
        }

        &--fixed {
            width: 88px;
        }
    }

    &__required-mark {
        color: var(--field-required-color, #f56c6c);
        margin-right: 4px;
        font-size: 14px;
    }

    &__icon {
        margin-right: 4px;

        &-inner {
            display: block;
            min-width: 1em;
            color: var(--field-icon-color, var(--gray-600));
        }
    }

    &__label {
        color: var(--field-label-color, var(--text-primary));
        font-size: 14px;
        line-height: 24px;
        margin-right: 12px;
        display: flex;
        align-items: center;
    }

    &__input {
        flex: 1;
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 0;
        color: var(--field-input-color, var(--text-primary));
        font-size: 14px;
        line-height: 24px;
        background-color: transparent;
        border: 0;
        resize: none;
        min-height: 24px;

        &--text-left {
            text-align: left;
        }

        &--text-center {
            text-align: center;
        }

        &--text-right {
            text-align: right;
        }

        &::placeholder {
            color: var(--field-placeholder-color, #bfbfbf);
        }
    }

    &__textarea-wrapper {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: transparent;
        border-radius: 4px;
        min-height: 64px;
    }

    &__textarea {
        flex: 1;
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 6px 0;
        color: var(--field-input-color, var(--text-primary, #303133));
        font-size: 14px;
        line-height: 1.6;
        min-height: 64px;
        background-color: transparent;
        border: 0;
        resize: none;
        transition: color 0.2s;

        &::placeholder {
            color: var(--field-placeholder-color, #c0c4cc);
            transition: color 0.2s;
        }

        &:focus {
            outline: none;

            &::placeholder {
                color: var(--field-placeholder-focus-color, #909399);
            }
        }
    }

    &__word-limit {
        margin-top: 4px;
        color: var(--field-word-limit-color, var(--text-secondary, #909399));
        font-size: 12px;
        line-height: 16px;
        text-align: right;
        width: 100%;
    }

    &__clear {
        margin-left: 4px;
        color: var(--field-clear-icon-color, var(--text-disabled));
        cursor: pointer;

        &:active {
            color: var(--field-clear-icon-active-color, var(--text-secondary));
        }
    }

    &__right-icon {
        margin-left: 4px;
        color: var(--field-right-icon-color, var(--gray-600));
        cursor: pointer;

        &-inner {
            display: block;
            min-width: 1em;
        }
    }

    &__error-message {
        color: var(--field-error-message-color, var(--fanc-danger-color));
        font-size: 12px;
        line-height: 16px;
        margin-top: 4px;
    }
}
</style>
