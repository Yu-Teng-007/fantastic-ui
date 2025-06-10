<template>
    <view
        class="fanc-field"
        :class="[
            showError ? 'fanc-field--error' : '',
            disabled ? 'fanc-field--disabled' : '',
            readonly ? 'fanc-field--readonly' : '',
            'fanc-field--' + type,
            isRequired ? 'fanc-field--required' : '',
            clickable ? 'fanc-field--clickable' : '',
            border ? 'fanc-field--border' : '',
            center ? 'fanc-field--center' : '',
            actualErrorMessage ? 'fanc-field--with-error-msg' : '',
            actualLabelPosition === 'top' ? 'fanc-field--label-top' : '',
        ]"
    >
        <!-- 左侧图标 -->
        <view v-if="leftIcon || $slots['left-icon']" class="fanc-field__left-icon">
            <slot name="left-icon">
                <fanc-icon :name="leftIcon" size="16" class="fanc-field__icon" />
            </slot>
        </view>

        <!-- 标签 -->
        <view
            v-if="label || $slots.label"
            class="fanc-field__label"
            :style="{ width: actualLabelPosition === 'top' ? '100%' : actualLabelWidth }"
        >
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
                    v-if="showClear"
                    class="fanc-field__right-icon fanc-field__clear"
                    @click.stop="onClear"
                >
                    <fanc-icon name="times-circle" size="16" class="fanc-field__icon" />
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
            <view v-if="actualErrorMessage" class="fanc-field__error-message">
                {{ actualErrorMessage }}
            </view>
        </view>
    </view>
</template>

<script>
import AsyncValidator from "async-validator";

export default {
    name: "fanc-field",

    model: {
        prop: "value",
        event: "input",
    },

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
        // 输入框聚焦时是否上推页面
        adjustPosition: {
            type: Boolean,
            default: true,
        },
        // 输入框聚焦时光标与键盘的距离
        cursorSpacing: {
            type: Number,
            default: 0,
        },
        // 是否自动聚焦
        focus: {
            type: Boolean,
            default: false,
        },
        // 设置键盘右下角按钮的文字，仅在type='text'时生效
        confirmType: {
            type: String,
            default: "done",
        },
        // 点击键盘右下角按钮时是否保持键盘不收起
        confirmHold: {
            type: Boolean,
            default: false,
        },
        // 指定focus时的光标位置
        cursor: {
            type: Number,
            default: -1,
        },
        // 表单字段名称，与表单model对应的属性名
        name: {
            type: String,
            default: "",
        },
        // 表单验证规则
        rules: {
            type: [Object, Array],
            default: () => [],
        },
        // 标签位置，可选值为 'top' 或 'left'
        labelPosition: {
            type: String,
            default: "left",
        },
        // 是否显示键盘上方带有"完成"按钮那一栏
        showConfirmBar: {
            type: Boolean,
            default: true,
        },
    },

    inject: {
        fancForm: {
            default: null,
        },
    },

    data() {
        return {
            showPassword: false, // 是否显示密码
            textareaHeight: null, // 文本域高度
            validateState: "", // 校验状态 success/error
            validateMessage: "", // 校验错误信息
            isValidating: false, // 是否正在校验
            focused: false, // 是否聚焦
        };
    },

    computed: {
        // 实际输入框类型
        inputType() {
            const map = {
                text: "text",
                password: "text",
                number: "number",
                digit: "digit",
                idcard: "idcard",
                textarea: "textarea",
            };
            return map[this.type] || "text";
        },
        // 是否显示清除按钮
        showClear() {
            return (
                this.clearable &&
                !this.readonly &&
                !this.disabled &&
                this.value !== "" &&
                this.value !== null &&
                this.value !== undefined
            );
        },
        // 表单验证规则
        fieldRules() {
            let formRules = this.fancForm && this.fancForm.rules;
            const selfRules = this.rules;

            // 从Form的rules中获取当前字段的规则
            formRules = formRules && this.name ? formRules[this.name] : [];

            // 合并Form规则和Field自身规则
            const rules = [].concat(selfRules || formRules || []);

            // 如果设置了required属性，则添加必填规则
            if (this.required && !rules.some((rule) => rule.required)) {
                rules.push({
                    required: true,
                    message: `${this.label || this.name || "此项"}不能为空`,
                });
            }

            return rules;
        },
        // 是否为必填项
        isRequired() {
            // 如果设置了required属性，直接返回true
            if (this.required) return true;

            // 检查规则中是否有required: true的规则
            if (this.fieldRules && this.fieldRules.length) {
                return this.fieldRules.some((rule) => rule.required);
            }

            return false;
        },
        // 实际错误信息
        actualErrorMessage() {
            return this.errorMessage || this.validateMessage;
        },
        // 是否显示错误状态
        showError() {
            return this.error || this.validateState === "error";
        },
        // 实际标签位置，优先使用自身设置，其次使用表单设置
        actualLabelPosition() {
            if (this.labelPosition !== "left") {
                return this.labelPosition;
            }
            return this.fancForm && this.fancForm.labelPosition
                ? this.fancForm.labelPosition
                : "left";
        },
        // 实际标签宽度，优先使用自身设置，其次使用表单设置
        actualLabelWidth() {
            return this.labelWidth || (this.fancForm && this.fancForm.labelWidth) || "88px";
        },
    },

    watch: {
        value(data) {
            console.log("🚀 ~ value ~ data:", data);
            // 值变化时触发验证
            this.onFieldChange("change");

            // 自动调整文本域高度
            if (this.type === "textarea" && this.autosize) {
                this.$nextTick(this.adjustTextareaHeight);
            }
        },
    },

    created() {
        // 字段创建时，注册到Form
        if (this.fancForm && this.name) {
            this.fancForm.registerField(this);
        }
    },

    mounted() {
        // 自动调整文本域高度
        if (this.type === "textarea" && this.autosize) {
            this.adjustTextareaHeight();
        }
    },

    beforeDestroy() {
        // 字段销毁时，从Form解注册
        if (this.fancForm && this.name) {
            this.fancForm.unregisterField(this);
        }
    },

    methods: {
        // 输入事件处理
        onInput(event) {
            let value = event.detail.value;
            this.$emit("input", value);
            this.$emit("update:value", value);
            this.$emit("change", value);
        },

        // 聚焦事件处理
        onFocus(event) {
            this.focused = true;
            this.$emit("focus", event);
        },

        // 失焦事件处理
        onBlur(event) {
            this.focused = false;
            this.$emit("blur", event);
            // 失焦时触发验证
            this.onFieldChange("blur");
        },

        // 确认事件处理
        onConfirm(event) {
            this.$emit("confirm", event);
        },

        // 清除内容
        onClear(event) {
            // 阻止事件冒泡
            event && event.stopPropagation && event.stopPropagation();

            // 清空值并触发事件
            this.$emit("input", "");
            this.$emit("update:value", "");
            this.$emit("change", "");
            this.$emit("clear");
            this.$emit("click-icon", "clear");

            // 保持焦点
            this.$nextTick(() => {
                const input = this.$el.querySelector("input") || this.$el.querySelector("textarea");
                if (input) {
                    input.focus();
                }
            });
        },

        // 自动调整文本域高度
        adjustTextareaHeight() {
            if (!this.autosize || this.type !== "textarea") return;

            const textarea = this.$el.querySelector("textarea");
            if (!textarea) return;

            textarea.style.height = "auto";
            let height = textarea.scrollHeight;

            // 设置最小高度为60px
            if (height < 60) height = 60;

            textarea.style.height = height + "px";
            this.textareaHeight = height;
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

        /**
         * 重置字段值和验证状态
         */
        resetField() {
            this.validateState = "";
            this.validateMessage = "";

            // 如果有表单和字段名，重置表单中的对应字段值
            if (this.fancForm && this.name && this.fancForm.model) {
                // 将字段值重置为初始值或空值
                const model = this.fancForm.model;
                model[this.name] = "";
                this.$emit("input", "");
                this.$emit("update:value", "");
                this.$emit("change", "");
            }
        },

        /**
         * 清除校验状态
         */
        clearValidate() {
            this.validateState = "";
            this.validateMessage = "";
        },

        /**
         * 获取表单项的值
         * @returns {any} 字段值
         */
        getFieldValue() {
            if (this.fancForm && this.name) {
                const model = this.fancForm.model || {};
                return model[this.name];
            }
            return this.value;
        },

        /**
         * 验证字段
         * @returns {Promise} 验证结果
         */
        validateField() {
            // 如果没有规则，直接返回验证成功
            if (!this.name || !this.fieldRules || this.fieldRules.length === 0) {
                return Promise.resolve();
            }

            this.isValidating = true;
            const value = this.getFieldValue();

            // 创建验证规则
            const descriptor = { [this.name]: this.fieldRules };
            const validator = new AsyncValidator(descriptor);
            const model = { [this.name]: value };

            // 开始验证
            return new Promise((resolve, reject) => {
                validator.validate(model, { firstFields: true }, (errors, fields) => {
                    this.isValidating = false;

                    if (errors) {
                        // 验证失败
                        this.validateState = "error";
                        this.validateMessage = errors[0].message || "验证失败";
                        reject(this.validateMessage);
                    } else {
                        // 验证成功
                        this.validateState = "success";
                        this.validateMessage = "";
                        resolve();
                    }
                });
            });
        },

        /**
         * 处理验证触发器
         * @param {String} trigger 触发类型 change/blur/submit
         */
        onFieldChange(trigger) {
            if (!this.fancForm) return;

            const validateTrigger = this.fancForm.validateTrigger;
            const shouldValidate =
                (validateTrigger === "onChange" && trigger === "change") ||
                (validateTrigger === "onBlur" && trigger === "blur") ||
                (validateTrigger === "onSubmit" && trigger === "submit");

            if (shouldValidate && this.fancForm.validateOnChange) {
                this.validateField().catch(() => {});
            }
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

    // 标签顶部对齐模式
    &--label-top {
        flex-direction: column;
        align-items: flex-start;

        .fanc-field__label {
            width: 100% !important;
            text-align: left;
            margin-bottom: 8px;
            margin-right: 0;
        }

        .fanc-field__value-wrapper {
            width: 100%;
        }

        .fanc-field__left-icon {
            margin-bottom: 8px;
        }
    }
}
</style>
