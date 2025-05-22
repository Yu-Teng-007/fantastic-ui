<template>
    <view
        class="fanc-radio"
        :class="[
            checked ? 'fanc-radio--checked' : '',
            disabled ? 'fanc-radio--disabled' : '',
            `fanc-radio--${shapeValue}`,
        ]"
        @click="onClick"
    >
        <!-- 单选框标记 -->
        <view class="fanc-radio__icon" :class="`fanc-radio__icon--${iconSize}`">
            <view
                class="fanc-radio__icon-box"
                :style="{
                    borderColor: getBorderColor,
                    backgroundColor: checked ? (disabled ? '#ebedf0' : iconCheckedColor) : '',
                }"
            >
                <fanc-icon
                    v-if="checked && checkTypeValue === 'check'"
                    name="check"
                    class="fanc-radio__icon-check"
                    color="#fff"
                    :size="getIconSize"
                />
                <view
                    v-if="checked && checkTypeValue === 'dot'"
                    class="fanc-radio__icon-dot"
                ></view>
            </view>
        </view>
        <!-- 单选框标签 -->
        <view
            v-if="label || $slots.default"
            class="fanc-radio__label"
            :style="{
                color: disabled
                    ? 'var(--radio-disabled-label-color, var(--text-disabled))'
                    : 'var(--radio-label-color, var(--text-primary))',
                marginLeft: iconSize === 'large' ? '8px' : '4px',
            }"
        >
            <slot>{{ label }}</slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-radio",

    components: {
        "fanc-icon": () => import("../fanc-icon"),
    },

    props: {
        // 是否选中
        value: {
            type: Boolean,
            default: false,
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
        // 图标大小
        iconSize: {
            type: String,
            default: "normal",
            validator: (val) => ["small", "normal", "large"].includes(val),
        },
        // 自定义值，用于与radio-group配合
        name: {
            type: [String, Number, Boolean],
            default: "",
        },
        // 形状，可选值：square、round
        shape: {
            type: String,
            default: "round",
            validator: (val) => ["square", "round"].includes(val),
        },
        // 选中样式类型，可选值：dot、check
        checkType: {
            type: String,
            default: "dot",
            validator: (val) => ["dot", "check"].includes(val),
        },
    },

    inject: {
        fancRadioGroup: {
            default: null,
        },
    },

    computed: {
        // 获取是否选中状态
        checked() {
            return this.fancRadioGroup ? this.fancRadioGroup.value === this.name : this.value;
        },

        // 获取形状属性
        shapeValue() {
            const hasExplicitShape = this.$options?.propsData && "shape" in this.$options.propsData;

            if (this.fancRadioGroup && !hasExplicitShape) {
                return this.fancRadioGroup.shape;
            }
            return this.shape;
        },

        // 选中状态的图标颜色
        iconCheckedColor() {
            if (this.checkedColor) return this.checkedColor;
            if (this.fancRadioGroup?.checkedColor) {
                return this.fancRadioGroup.checkedColor;
            }
            return "var(--radio-checked-icon-color, var(--fanc-primary-color))";
        },

        // 获取选中样式类型
        checkTypeValue() {
            const hasExplicitCheckType =
                this.$options?.propsData && "checkType" in this.$options.propsData;

            if (this.fancRadioGroup && !hasExplicitCheckType) {
                return this.fancRadioGroup.checkType || this.checkType;
            }
            return this.checkType;
        },

        // 获取图标大小
        getIconSize() {
            return (
                {
                    small: 8,
                    normal: 12,
                    large: 16,
                }[this.iconSize] || 12
            );
        },

        // 获取边框颜色
        getBorderColor() {
            const disabledColor = "var(--radio-disabled-icon-color, #c8c9cc)";
            if (this.checked) {
                return this.disabled ? disabledColor : this.iconCheckedColor;
            }
            return this.disabled ? disabledColor : "var(--radio-icon-color, #c8c9cc)";
        },
    },

    methods: {
        // 点击单选框
        onClick() {
            if (this.disabled || (this.fancRadioGroup && this.fancRadioGroup.disabled)) {
                return;
            }

            if (this.fancRadioGroup) {
                this.fancRadioGroup.updateValue(this.name);
            } else {
                this.$emit("input", true);
                this.$emit("change", true);
            }
        },
    },
};
</script>

<style>
.fanc-radio {
    display: inline-flex;
    align-items: center;
    user-select: none;
    margin-right: 16px;
    cursor: pointer;
    line-height: 1;
}

.fanc-radio--disabled {
    cursor: not-allowed;
    opacity: var(--radio-disabled-opacity, 0.6);
}

.fanc-radio__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--radio-icon-size-normal, 18px);
    height: var(--radio-icon-size-normal, 18px);
}

.fanc-radio__icon--small {
    width: var(--radio-icon-size-small, 14px);
    height: var(--radio-icon-size-small, 14px);
}

.fanc-radio__icon--large {
    width: var(--radio-icon-size-large, 22px);
    height: var(--radio-icon-size-large, 22px);
}

.fanc-radio__icon-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid;
    box-sizing: border-box;
    transition: all var(--radio-transition-duration, 0.2s);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.fanc-radio--round .fanc-radio__icon-box {
    border-radius: 100%;
}

.fanc-radio--square .fanc-radio__icon-box {
    border-radius: 2px;
}

.fanc-radio__icon-dot {
    width: 50%;
    height: 50%;
    border-radius: 100%;
    background-color: #fff;
}

.fanc-radio--square .fanc-radio__icon-dot {
    border-radius: 1px;
}

.fanc-radio__icon-check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    line-height: 1;
}

.fanc-radio--checked .fanc-radio__icon-box {
    border-color: var(--radio-checked-icon-color, var(--fanc-primary-color));
    background-color: var(--radio-checked-icon-color, var(--fanc-primary-color));
}

.fanc-radio--checked.fanc-radio--disabled .fanc-radio__icon-box {
    border-color: var(--radio-disabled-icon-color, #c8c9cc);
    background-color: #ebedf0;
}

.fanc-radio--checked.fanc-radio--disabled .fanc-radio__icon-check {
    color: #c8c9cc;
    opacity: 0.6;
}

.fanc-radio__label {
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    color: var(--radio-label-color, #323233);
    margin-left: var(--radio-label-margin, 4px);
}

.fanc-radio--disabled .fanc-radio__label {
    color: var(--radio-disabled-label-color, #c8c9cc);
}
</style>
