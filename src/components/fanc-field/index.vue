<template>
    <view class="fanc-field" :class="[
        type ? 'fanc-field--' + type : '',
        disabled ? 'fanc-field--disabled' : '',
        error ? 'fanc-field--error' : '',
        center ? 'fanc-field--center' : '',
        required ? 'fanc-field--required' : '',
        borderless ? 'fanc-field--borderless' : '',
        isLink ? 'fanc-field--clickable' : '',
    ]">
        <view class="fanc-field__left" :class="[labelWidth ? 'fanc-field__left--' + labelWidth : '']">
            <!-- 自定义左侧图标 -->
            <slot name="left-icon" v-if="$slots['left-icon']"></slot>
            <!-- 默认图标 -->
            <view class="fanc-field__icon" v-else-if="leftIcon">
                <fanc-icon :name="leftIcon" class="fanc-field__icon-inner" size="16" />
            </view>

            <view class="fanc-field__label" v-if="label || $slots.label">
                <!-- 自定义标签 -->
                <slot name="label" v-if="$slots.label"></slot>
                <!-- 默认标签 -->
                <text v-else>{{ label }}</text>
            </view>
        </view>

        <view class="fanc-field__content">
            <!-- 输入框前内容 -->
            <slot name="input-prefix" v-if="$slots['input-prefix']"></slot>

            <!-- 输入框 -->
            <input
                v-if="type !== 'textarea'"
                :value="value"
                :type="inputType"
                :placeholder="placeholder"
                :disabled="disabled || readonly"
                :focus="focus"
                :password="password && type === 'password'"
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
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                @confirm="onConfirm"
                @keyboardheightchange="onKeyboardHeightChange"
            />

            <!-- 文本域 -->
            <textarea
                v-else
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
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                @confirm="onConfirm"
                @keyboardheightchange="onKeyboardHeightChange"
            ></textarea>
            
            <!-- 输入框后内容 -->
            <slot name="input-suffix" v-if="$slots['input-suffix']"></slot>
            
            <!-- 字数统计 -->
            <view class="fanc-field__word-limit" v-if="showWordLimit && maxlength">
                <text>{{ value ? value.length : 0 }}/{{ maxlength }}</text>
            </view>
            
            <!-- 清除按钮 -->
            <view 
                class="fanc-field__clear" 
                v-if="clearable && value && !disabled && !readonly"
                @touchstart.stop.prevent="onClear"
            >
                <fanc-icon name="times-circle" size="16" />
            </view>
            
            <!-- 自定义右侧图标 -->
            <slot name="right-icon" v-if="$slots['right-icon']"></slot>
            <!-- 默认右侧图标 -->
            <view class="fanc-field__right-icon" v-else-if="rightIcon || isLink">
                <fanc-icon
                    color="#bfbfbf"
                    size="16"
                    :name="rightIcon || (isLink ? 'angle-right' : '')"
                    class="fanc-field__right-icon-inner"
                />
            </view>
        </view>
        
        <!-- 错误提示 -->
        <view class="fanc-field__error-message" v-if="error && errorMessage">
            {{ errorMessage }}
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
                return ["text", "textarea", "password", "number", "digit", "idcard", "tel"].includes(value);
            }
        },
        // 输入框的当前值
        value: {
            type: [String, Number],
            default: ""
        },
        // 输入框标签
        label: {
            type: String,
            default: ""
        },
        // 输入框占位文本
        placeholder: {
            type: String,
            default: "请输入"
        },
        // 标签宽度，可选值为 auto / fixed
        labelWidth: {
            type: String,
            default: ""
        },
        // 是否禁用输入框
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否只读
        readonly: {
            type: Boolean,
            default: false
        },
        // 是否显示表单必填星号
        required: {
            type: Boolean,
            default: false
        },
        // 是否启用清除图标
        clearable: {
            type: Boolean,
            default: false
        },
        // 是否密码类型
        password: {
            type: Boolean,
            default: false
        },
        // 输入的最大字符数
        maxlength: {
            type: [String, Number],
            default: -1
        },
        // 是否显示字数统计
        showWordLimit: {
            type: Boolean,
            default: false
        },
        // 左侧图标名称
        leftIcon: {
            type: String,
            default: ""
        },
        // 右侧图标名称
        rightIcon: {
            type: String,
            default: ""
        },
        // 是否显示内容为错误状态
        error: {
            type: Boolean,
            default: false
        },
        // 错误提示文案
        errorMessage: {
            type: String,
            default: ""
        },
        // 是否垂直居中
        center: {
            type: Boolean,
            default: false
        },
        // 是否隐藏底部边框
        borderless: {
            type: Boolean,
            default: false
        },
        // 是否是链接
        isLink: {
            type: Boolean,
            default: false
        },
        // 自动获取焦点
        focus: {
            type: Boolean,
            default: false
        },
        // 输入框内容对齐方式，可选值为 left、center、right
        inputAlign: {
            type: String,
            default: "left",
            validator: (value) => {
                return ["left", "center", "right"].includes(value);
            }
        },
        // 光标与键盘的距离
        cursorSpacing: {
            type: Number,
            default: 0
        },
        // 设置键盘右下角按钮的文字，可选值为 send、search、next、go、done
        confirmType: {
            type: String,
            default: "done"
        },
        // 指定 placeholder 的样式
        placeholderStyle: {
            type: String,
            default: ""
        },
        // 指定 placeholder 的类名
        placeholderClass: {
            type: String,
            default: ""
        },
        // 键盘弹起时，是否自动上推页面
        adjustPosition: {
            type: Boolean,
            default: true
        },
        // 点击键盘右下角按钮时是否保持键盘不收起
        confirmHold: {
            type: Boolean,
            default: false
        },
        // focus时，点击页面的时候不收起键盘
        holdKeyboard: {
            type: Boolean,
            default: false
        },
        // 光标起始位置
        selectionStart: {
            type: Number,
            default: -1
        },
        // 光标结束位置
        selectionEnd: {
            type: Number,
            default: -1
        },
        // 是否显示键盘上方带有"完成"按钮那一栏
        showConfirmBar: {
            type: Boolean,
            default: true
        },
        // 是否自动增高
        autoHeight: {
            type: Boolean,
            default: false
        },
        // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
        fixed: {
            type: Boolean,
            default: false
        },
        // 指定focus时的光标位置
        cursor: {
            type: Number,
            default: -1
        }
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
                tel: "number"
            };
            return typeMap[this.type] || "text";
        }
    },
    
    methods: {
        // 输入事件
        onInput(event) {
            this.$emit("input", event.detail.value);
            this.$emit("change", event.detail.value);
        },
        
        // 聚焦事件
        onFocus(event) {
            this.$emit("focus", event);
        },
        
        // 失焦事件
        onBlur(event) {
            this.$emit("blur", event);
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
        }
    }
};
</script>

<style lang="scss">
.fanc-field {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
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
    
    &--required {
        .fanc-field__label:before {
            content: "*";
            color: var(--field-required-color, var(--fanc-danger-color));
            margin-right: 4px;
        }
    }
    
    &--clickable:active {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    &__content {
        display: flex;
        align-items: center;
        width: 100%;
        padding-top: 4px;
    }
    
    &__left {
        display: flex;
        align-items: center;
        
        &--auto {
            width: auto;
        }
        
        &--fixed {
            width: 88px;
        }
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
        margin-right: 8px;
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
            color: var(--field-placeholder-color, var(--text-disabled));
        }
    }
    
    &__textarea {
        flex: 1;
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 0;
        color: var(--field-input-color, var(--text-primary));
        font-size: 14px;
        line-height: 24px;
        min-height: 24px;
        background-color: transparent;
        border: 0;
        resize: none;
        
        &::placeholder {
            color: var(--field-placeholder-color, var(--text-disabled));
        }
    }
    
    &__word-limit {
        margin-top: 4px;
        color: var(--field-word-limit-color, var(--text-secondary));
        font-size: 12px;
        line-height: 16px;
        text-align: right;
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