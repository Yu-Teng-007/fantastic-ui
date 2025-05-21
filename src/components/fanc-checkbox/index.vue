<template>
    <view
        class="fanc-checkbox"
        :class="[
            checked ? 'fanc-checkbox--checked' : '',
            disabled ? 'fanc-checkbox--disabled' : '',
            `fanc-checkbox--${shape}`,
        ]"
        @click="onClick"
    >
        <!-- 复选框选择标记 -->
        <view class="fanc-checkbox__icon" :class="`fanc-checkbox__icon--${iconSize}`">
            <view
                class="fanc-checkbox__icon-box"
                :style="{
                    borderColor: getBorderColor,
                    backgroundColor: checked ? (disabled ? '#ebedf0' : iconCheckedColor) : '',
                }"
            ></view>
            <fanc-icon
                v-if="checked"
                :name="icon"
                :size="iconSizeValue"
                class="fanc-checkbox__icon-check"
            />
        </view>
        <!-- 复选框标签 -->
        <view
            v-if="label || $slots.default"
            class="fanc-checkbox__label"
            :style="{
                color: disabled
                    ? 'var(--checkbox-disabled-label-color, var(--text-disabled))'
                    : 'var(--checkbox-label-color, var(--text-primary))',
                marginLeft: iconSize === 'large' ? '8px' : '4px',
            }"
        >
            <slot>{{ label }}</slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-checkbox",

    props: {
        // 是否选中
        value: {
            type: Boolean,
            default: false,
        },
        // 复选框形状，可选值：square、round
        shape: {
            type: String,
            default: "round",
            validator: (val) => ["square", "round"].includes(val),
        },
        // 标签文本
        label: {
            type: String,
            default: "",
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 选中状态颜色
        checkedColor: {
            type: String,
            default: "",
        },
        // 图标名称
        icon: {
            type: String,
            default: "check",
        },
        // 图标大小
        iconSize: {
            type: String,
            default: "normal",
            validator: (val) => ["small", "normal", "large"].includes(val),
        },
        // 自定义值，用于与checkbox-group配合
        name: {
            type: [String, Number, Boolean],
            default: "",
        },
    },

    inject: {
        fancCheckboxGroup: {
            default: null,
        },
    },

    computed: {
        // 获取是否选中状态
        checked() {
            // 如果在checkbox-group中，由group控制选中状态
            if (this.fancCheckboxGroup) {
                return this.fancCheckboxGroup.value.includes(this.name);
            }
            return this.value;
        },

        // 图标名称
        iconName() {
            // 使用用户传入的图标
            return this.icon;
        },

        // 未选中状态的图标颜色
        iconColor() {
            return "var(--checkbox-icon-color, #c8c9cc)";
        },

        // 选中状态的图标颜色
        iconCheckedColor() {
            if (this.checkedColor) return this.checkedColor;
            if (this.fancCheckboxGroup?.checkedColor) {
                return this.fancCheckboxGroup.checkedColor;
            }
            return "var(--checkbox-checked-icon-color, var(--fanc-primary-color))";
        },

        // 禁用状态的图标颜色
        iconDisabledColor() {
            return "var(--checkbox-disabled-icon-color, #c8c9cc)";
        },

        // 标签颜色
        labelColor() {
            return "var(--checkbox-label-color, var(--text-primary))";
        },

        // 禁用状态的标签颜色
        labelDisabledColor() {
            return "var(--checkbox-disabled-label-color, var(--text-disabled))";
        },

        // 图标大小值
        iconSizeValue() {
            const sizes = {
                small: "12px",
                large: "20px",
                normal: "16px",
            };
            return sizes[this.iconSize] || sizes.normal;
        },

        getBorderColor() {
            const disabledColor = "var(--checkbox-disabled-icon-color, #c8c9cc)";
            if (this.checked) {
                return this.disabled ? disabledColor : this.iconCheckedColor;
            }
            return this.disabled ? disabledColor : "var(--checkbox-icon-color, #c8c9cc)";
        },
    },

    methods: {
        /**
         * 点击复选框
         */
        onClick() {
            // 如果复选框本身禁用或者复选框组禁用，则不处理
            if (this.disabled || (this.fancCheckboxGroup && this.fancCheckboxGroup.disabled)) {
                return;
            }

            const newValue = !this.checked;

            // 如果在checkbox-group中，通知group更新
            if (this.fancCheckboxGroup) {
                this.fancCheckboxGroup.toggleValue(this.name);
            } else {
                // 直接更新父组件的值
                this.$emit("input", newValue);
                this.$emit("change", newValue);
            }
        },
    },
};
</script>

<style>
.fanc-checkbox {
    display: inline-flex;
    align-items: center;
    user-select: none;
    margin-right: 16px;
    cursor: pointer;
    line-height: 1;
}

.fanc-checkbox--disabled {
    cursor: not-allowed;
    opacity: var(--checkbox-disabled-opacity, 0.6);
}

.fanc-checkbox__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--checkbox-icon-size-normal, 16px);
    height: var(--checkbox-icon-size-normal, 16px);
}

.fanc-checkbox__icon-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid;
    box-sizing: border-box;
    transition: all var(--checkbox-transition-duration, 0.2s);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #fff;
}

.fanc-checkbox--round .fanc-checkbox__icon-box {
    border-radius: 100%;
}

.fanc-checkbox--square .fanc-checkbox__icon-box {
    border-radius: 2px;
}

.fanc-checkbox__icon-check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    color: white;
}

.fanc-checkbox__label {
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    color: var(--checkbox-label-color, #323233);
    margin-left: var(--checkbox-label-margin, 4px);
}

.fanc-checkbox--disabled .fanc-checkbox__label {
    color: var(--checkbox-disabled-label-color, #c8c9cc);
}

/* 确保图标大小不同时的一致性 */
.fanc-checkbox__icon--small {
    width: var(--checkbox-icon-size-small, 12px);
    height: var(--checkbox-icon-size-small, 12px);
}

.fanc-checkbox__icon--large {
    width: var(--checkbox-icon-size-large, 20px);
    height: var(--checkbox-icon-size-large, 20px);
}
</style>
