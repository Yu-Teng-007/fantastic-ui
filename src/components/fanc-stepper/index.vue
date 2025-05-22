<template>
    <view class="fanc-stepper" :class="[`fanc-stepper--${theme}`, { 'is-disabled': disabled }]">
        <view
            class="fanc-stepper__minus"
            :class="{ 'is-disabled': disableMinus || disabled || isMinusDisabled }"
            @touchstart.prevent="onTouchStart('minus')"
            @touchend.prevent="onTouchEnd"
            @touchcancel.prevent="onTouchEnd"
            @click.stop="handleMinus"
        >
            <fanc-icon name="minus" :size="buttonSize" :color="buttonIconColor"></fanc-icon>
        </view>
        <input
            class="fanc-stepper__input"
            :class="{ 'is-disabled': disabled }"
            type="number"
            :value="inputValue"
            :disabled="disabled"
            :style="inputStyle"
            @input="handleInput"
            @blur="handleBlur"
            @focus="handleFocus"
        />
        <view
            class="fanc-stepper__plus"
            :class="{ 'is-disabled': disablePlus || disabled || isPlusDisabled }"
            @touchstart.prevent="onTouchStart('plus')"
            @touchend.prevent="onTouchEnd"
            @touchcancel.prevent="onTouchEnd"
            @click.stop="handlePlus"
        >
            <fanc-icon name="plus" :size="buttonSize" :color="buttonIconColor"></fanc-icon>
        </view>
    </view>
</template>

<script>
/**
 * fanc-stepper 步进器
 * @description 步进器组件，用于增加或减少数值，常用于商品数量选择
 * @property {Number} value - 当前值
 * @property {Number} min - 最小值
 * @property {Number} max - 最大值
 * @property {Number} step - 步长，每次点击增加或减少的值
 * @property {Boolean} disabled - 是否禁用步进器
 * @property {String} input-width - 输入框宽度，默认为40px
 * @property {String} button-size - 按钮图标大小
 * @property {Boolean} show-input - 是否显示输入框
 * @property {Boolean} disable-input - 是否禁用输入框
 * @property {Number} decimal-length - 固定显示的小数位数
 * @property {Boolean} disable-plus - 是否禁用增加按钮
 * @property {Boolean} disable-minus - 是否禁用减少按钮
 * @property {Boolean} allow-empty - 是否允许输入框为空
 * @property {String} theme - 主题样式，可选值为 round/square
 * @property {String} placeholder - 输入框占位符
 * @property {Number} longPressInterval - 长按按钮时触发变化的间隔，单位毫秒
 * @property {Number} longPressStartTime - 长按按钮时变化速率加速的延迟，单位毫秒
 * @event {Function} change - 值改变时触发
 * @event {Function} focus - 输入框聚焦时触发
 * @event {Function} blur - 输入框失焦时触发
 * @event {Function} plus - 点击增加按钮时触发
 * @event {Function} minus - 点击减少按钮时触发
 */
export default {
    name: "fanc-stepper",
    props: {
        // 当前值
        value: {
            type: [Number, String],
            default: 0,
        },
        // 最小值
        min: {
            type: [Number, String],
            default: 0,
        },
        // 最大值
        max: {
            type: [Number, String],
            default: Infinity,
        },
        // 步长
        step: {
            type: [Number, String],
            default: 1,
        },
        // 是否禁用步进器
        disabled: {
            type: Boolean,
            default: false,
        },
        // 输入框宽度
        inputWidth: {
            type: String,
            default: "40px",
        },
        // 按钮图标大小
        buttonSize: {
            type: [Number, String],
            default: 16,
        },
        // 是否显示输入框
        showInput: {
            type: Boolean,
            default: true,
        },
        // 是否禁用输入框
        disableInput: {
            type: Boolean,
            default: false,
        },
        // 固定显示的小数位数
        decimalLength: {
            type: [Number, String],
            default: null,
        },
        // 是否禁用增加按钮
        disablePlus: {
            type: Boolean,
            default: false,
        },
        // 是否禁用减少按钮
        disableMinus: {
            type: Boolean,
            default: false,
        },
        // 是否允许输入框为空
        allowEmpty: {
            type: Boolean,
            default: false,
        },
        // 主题样式
        theme: {
            type: String,
            default: "square",
            validator: (value) => ["square", "round"].includes(value),
        },
        // 输入框占位符
        placeholder: {
            type: String,
            default: "",
        },
        // 长按按钮时触发变化的间隔，单位毫秒
        longPressInterval: {
            type: [Number, String],
            default: 200,
        },
        // 长按按钮时变化速率加速的延迟，单位毫秒
        longPressStartTime: {
            type: [Number, String],
            default: 600,
        },
    },
    data() {
        return {
            // 长按定时器
            longPressTimer: null,
            // 当前长按的按钮
            currentButton: null,
            // 长按开始时间
            longPressStartTimestamp: 0,
            // 是否为长按操作
            isLongPress: false,
            // 最后一次操作时间戳，用于防止快速点击时的重复触发
            lastActionTimestamp: 0,
            // 输入框当前值（内部状态）
            innerValue: "",
            // 是否处于输入状态
            isInputting: false,
        };
    },
    computed: {
        // 计算显示值
        displayValue() {
            if (this.allowEmpty && this.value === "") {
                return "";
            }

            const numValue = Number(this.value);

            if (isNaN(numValue)) {
                return this.min;
            }

            // 确保显示值也在范围内
            const formattedValue = this.format(numValue);

            // 处理小数位数
            if (this.decimalLength !== null) {
                return formattedValue.toFixed(this.decimalLength);
            }

            return formattedValue;
        },
        // 输入框显示值
        inputValue() {
            // 如果正在输入，使用内部状态值
            if (this.isInputting) {
                return this.innerValue;
            }
            // 否则使用格式化后的显示值
            return this.displayValue;
        },
        // 计算按钮图标颜色
        buttonIconColor() {
            return this.disabled
                ? "var(--stepper-button-disabled-color)"
                : "var(--stepper-button-icon-color)";
        },
        // 计算输入框样式
        inputStyle() {
            return {
                width: this.inputWidth,
                display: this.showInput ? "block" : "none",
            };
        },
        // 确保最小值不小于0
        safeMinValue() {
            return Math.max(0, Number(this.min));
        },
        // 当前值是否达到最小值，用于禁用减号按钮
        isMinusDisabled() {
            if (this.allowEmpty && this.value === "") return true;

            const currentValue = Number(this.value);
            if (isNaN(currentValue)) return true;

            return currentValue <= this.safeMinValue;
        },
        // 当前值是否达到最大值，用于禁用加号按钮
        isPlusDisabled() {
            if (this.allowEmpty && this.value === "") return false;

            const currentValue = Number(this.value);
            if (isNaN(currentValue)) return false;

            return currentValue >= Number(this.max);
        },
    },
    watch: {
        // 监听外部值变化，更新内部状态
        value: {
            immediate: true,
            handler(newVal) {
                if (!this.isInputting) {
                    this.innerValue = newVal;
                }
            },
        },
    },
    methods: {
        // 处理触摸开始，启动长按定时器
        onTouchStart(button) {
            if (this.isButtonDisabled(button)) return;

            this.currentButton = button;
            this.longPressStartTimestamp = Date.now();
            this.isLongPress = false;
            this.clearLongPressTimer();

            this.longPressTimer = setTimeout(() => {
                this.isLongPress = true;
                this.onLongPress();
            }, Number(this.longPressInterval));
        },

        // 处理触摸结束，清除长按定时器
        onTouchEnd() {
            this.clearLongPressTimer();

            // 如果不是长按操作，则在触摸结束时触发一次点击事件
            if (!this.isLongPress && this.currentButton) {
                if (this.currentButton === "plus") {
                    this.handlePlus();
                } else if (this.currentButton === "minus") {
                    this.handleMinus();
                }
            }

            this.currentButton = null;
            this.isLongPress = false;
        },

        // 长按处理
        onLongPress() {
            if (!this.currentButton) {
                return;
            }

            // 根据当前按钮执行相应操作
            if (this.currentButton === "plus") {
                this.handlePlus();
            } else if (this.currentButton === "minus") {
                this.handleMinus();
            }

            // 计算下一次间隔时间（长按时间越长，变化越快）
            const elapsedTime = Date.now() - this.longPressStartTimestamp;
            let interval = Number(this.longPressInterval);

            if (elapsedTime > Number(this.longPressStartTime)) {
                // 加速变化，最快每100毫秒变化一次
                interval = Math.max(100, interval - Math.floor(elapsedTime / 1000) * 50);
            }

            // 继续设置定时器
            this.longPressTimer = setTimeout(() => {
                this.onLongPress();
            }, interval);
        },

        // 清除长按定时器
        clearLongPressTimer() {
            if (this.longPressTimer) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
        },

        // 处理加按钮点击
        handlePlus() {
            this.isInputting = false;
            if (this.isRapidClick() || this.isButtonDisabled("plus") || this.isPlusDisabled) return;

            const currentValue = this.allowEmpty && this.value === "" ? 0 : Number(this.value);
            if (isNaN(currentValue)) return;

            const newValue = this.addNumber(currentValue, Number(this.step));
            const value = Math.min(newValue, Number(this.max));

            this.innerValue = String(value);
            this.emitValue(value, "plus");
        },

        // 处理减按钮点击
        handleMinus() {
            this.isInputting = false;
            if (this.isRapidClick() || this.isButtonDisabled("minus") || this.isMinusDisabled)
                return;

            const currentValue = this.allowEmpty && this.value === "" ? 0 : Number(this.value);
            if (isNaN(currentValue)) return;

            const newValue = this.addNumber(currentValue, -Number(this.step));
            const value = Math.max(newValue, this.safeMinValue);

            this.innerValue = String(value);
            this.emitValue(value, "minus");
        },

        // 处理输入框输入
        handleInput(event) {
            if (this.disabled || this.disableInput) return;

            this.isInputting = true;
            const inputValue = event.detail.value;
            const minValue = this.safeMinValue;
            const maxValue = Number(this.max);

            this.innerValue = inputValue;

            // 处理空值
            if (inputValue === "") {
                if (this.allowEmpty) {
                    this.emitChange("");
                } else {
                    this.updateValueToMin(minValue);
                }
                return;
            }

            // 处理特殊输入
            if (inputValue === "." || /^\d+\.$/.test(inputValue)) return;
            if (inputValue === "-" || inputValue.startsWith("-")) {
                this.updateValueToMin(minValue);
                return;
            }

            // 处理数值
            const numValue = Number(inputValue);
            if (isNaN(numValue)) return;

            // 范围检查
            if (numValue < minValue) {
                this.updateValueToMin(minValue);
                return;
            }
            if (numValue > maxValue) {
                this.updateValueToMax(maxValue);
                return;
            }

            // 正常更新
            this.$emit("input", inputValue);
            this.$emit("change", numValue);
        },

        // 处理输入框失焦
        handleBlur(event) {
            this.isInputting = false;
            const value = event.detail.value;
            const minValue = this.safeMinValue;

            // 处理空值
            if (value === "") {
                if (this.allowEmpty) {
                    this.innerValue = "";
                    this.$emit("blur", "");
                } else {
                    this.updateValueAndEmitBlur(minValue);
                }
                return;
            }

            // 处理特殊输入
            if (value === "." || value.startsWith("-")) {
                this.updateValueAndEmitBlur(minValue);
                return;
            }

            // 处理数值
            const numValue = Number(value);
            if (isNaN(numValue)) {
                this.updateValueAndEmitBlur(minValue);
                return;
            }

            // 格式化并更新
            const validValue = this.format(numValue);
            this.innerValue = String(validValue);
            this.emitChange(validValue);
            this.$emit("blur", validValue);
        },

        // 处理输入框聚焦
        handleFocus(event) {
            this.isInputting = true;
            this.$emit("focus", event.detail.value);
        },

        // 格式化数值，确保在最小值和最大值之间
        format(value) {
            if (value === "" || isNaN(value)) return this.safeMinValue;

            value = Math.max(Math.min(Number(this.max), value), this.safeMinValue);

            if (this.decimalLength !== null) {
                value = parseFloat(value.toFixed(this.decimalLength));
            }

            return value;
        },

        // 精确加法，避免浮点数计算误差
        addNumber(num1, num2) {
            const cardinal = Math.pow(10, 10);
            return Math.round((num1 + num2) * cardinal) / cardinal;
        },

        // 触发值变化事件
        emitChange(value) {
            this.$emit("input", value);
            this.$emit("change", value);
        },

        // 辅助方法
        isButtonDisabled(button) {
            return (
                this.disabled ||
                (button === "plus" && this.disablePlus) ||
                (button === "minus" && this.disableMinus)
            );
        },
        isRapidClick() {
            const now = Date.now();
            const isRapid = now - this.lastActionTimestamp < 50 && !this.isLongPress;
            this.lastActionTimestamp = now;
            return isRapid;
        },
        emitValue(value, eventType) {
            this.$emit("input", value);
            this.$emit("change", value);
            if (eventType) this.$emit(eventType, value);
        },
        updateValueToMin(minValue) {
            this.innerValue = String(minValue);
            this.emitChange(minValue);
        },
        updateValueToMax(maxValue) {
            this.innerValue = String(maxValue);
            this.emitChange(maxValue);
        },
        updateValueAndEmitBlur(value) {
            this.innerValue = String(value);
            this.emitChange(value);
            this.$emit("blur", value);
        },
    },
    // 组件销毁时清除定时器
    beforeDestroy() {
        this.clearLongPressTimer();
    },
};
</script>

<style lang="scss" scoped>
.fanc-stepper {
    display: inline-flex;
    align-items: center;
    user-select: none;

    &__minus,
    &__plus {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--stepper-button-width);
        height: var(--stepper-button-height);
        background-color: var(--stepper-button-bg-color);
        color: var(--stepper-button-icon-color);
        border: 1px solid var(--stepper-button-border-color);
        cursor: pointer;
        transition: all 0.2s;

        &:active {
            background-color: var(--stepper-button-active-bg-color);
        }

        &.is-disabled {
            background-color: var(--stepper-button-disabled-bg-color);
            border-color: var(--stepper-button-disabled-border-color);
            cursor: not-allowed;
            opacity: var(--stepper-disabled-opacity);
        }
    }

    &__minus {
        border-radius: var(--stepper-border-radius-left);
    }

    &__plus {
        border-radius: var(--stepper-border-radius-right);
    }

    &__input {
        display: block;
        box-sizing: border-box;
        width: var(--stepper-input-width);
        height: var(--stepper-input-height);
        margin: 0 1px;
        padding: 0;
        color: var(--stepper-input-text-color);
        font-size: var(--stepper-input-font-size);
        text-align: center;
        background-color: var(--stepper-input-bg-color);
        border: 1px solid var(--stepper-input-border-color);
        border-width: 1px 0;
        border-radius: 0;
        appearance: none;
        -webkit-appearance: none;

        &.is-disabled {
            background-color: var(--stepper-input-disabled-bg-color);
            color: var(--stepper-input-disabled-text-color);
            cursor: not-allowed;
            opacity: var(--stepper-disabled-opacity);
        }
    }

    &.is-disabled {
        opacity: var(--stepper-disabled-opacity);
    }

    // 圆角主题样式
    &--round {
        .fanc-stepper__minus {
            border-radius: var(--stepper-button-height);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        .fanc-stepper__plus {
            border-radius: var(--stepper-button-height);
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
}
</style>
