<template>
    <view class="fanc-slider">
        <view class="fanc-slider__wrapper">
            <!-- 滑动轨道 -->
            <view
                class="fanc-slider__track"
                :style="{ backgroundColor: inactiveColor }"
                @click="onClick"
            >
                <!-- 已选择的部分 -->
                <view
                    class="fanc-slider__bar"
                    :style="{
                        width: barWidth,
                        backgroundColor: activeColor,
                    }"
                ></view>

                <!-- 滑块 -->
                <view
                    class="fanc-slider__thumb"
                    :class="{ 'fanc-slider__thumb--disabled': disabled }"
                    :style="{
                        left: barWidth,
                        backgroundColor: thumbColor || activeColor,
                    }"
                    @touchstart.stop.prevent="onTouchStart"
                    @touchmove.stop.prevent="onTouchMove"
                    @touchend.stop.prevent="onTouchEnd"
                    @touchcancel.stop.prevent="onTouchEnd"
                >
                    <slot name="thumb"></slot>
                </view>
            </view>
        </view>

        <!-- 显示数值 -->
        <view v-if="showValue" class="fanc-slider__value">{{ currentValue }}</view>
    </view>
</template>

<script>
/**
 * fanc-slider 滑动选择器
 * @description 用于选择横轴上的数值、区间、档位
 * @property {Number} value/v-model 当前进度百分比，取值范围0-100
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 步长，取值必须大于0，并且可被(max - min)整除
 * @property {Boolean} disabled 是否禁用滑块
 * @property {String} activeColor 进度条激活部分的颜色
 * @property {String} inactiveColor 进度条未激活部分的颜色
 * @property {String} thumbColor 滑块颜色
 * @property {Boolean} showValue 是否显示当前值
 * @event {Function} change 进度变化时触发
 * @event {Function} changing 滑动过程中触发
 */
export default {
    name: "FancSlider",

    props: {
        // 当前值，支持v-model双向绑定
        value: {
            type: Number,
            default: 0,
        },
        // 最小值
        min: {
            type: Number,
            default: 0,
        },
        // 最大值
        max: {
            type: Number,
            default: 100,
        },
        // 步长
        step: {
            type: Number,
            default: 1,
            validator: (val) => val > 0,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 进度条激活部分的颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 进度条未激活部分的颜色
        inactiveColor: {
            type: String,
            default: "",
        },
        // 滑块颜色
        thumbColor: {
            type: String,
            default: "",
        },
        // 是否显示当前值
        showValue: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            // 记录当前值
            currentValue: this.value,
            // 记录拖动状态
            isDragging: false,
            // 记录滑动器宽度
            sliderWidth: 0,
            // 记录滑动器左侧位置
            sliderLeft: 0,
        };
    },

    computed: {
        // 计算进度条宽度
        barWidth() {
            const range = this.max - this.min;
            const percentage = range !== 0 ? ((this.currentValue - this.min) * 100) / range : 0;
            return `${percentage}%`;
        },
    },

    watch: {
        value(val) {
            // 确保值在有效范围内
            const newVal = this.handleValue(val);
            if (newVal !== this.currentValue) {
                this.currentValue = newVal;
            }
        },
    },

    mounted() {
        this.currentValue = this.handleValue(this.value);
        this.getSliderInfo();
    },

    methods: {
        // 获取滑动器尺寸信息
        getSliderInfo() {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(".fanc-slider__track")
                .boundingClientRect((rect) => {
                    if (rect) {
                        this.sliderWidth = rect.width;
                        this.sliderLeft = rect.left;
                    }
                })
                .exec();
        },

        // 处理值，确保在有效范围内且符合步长
        handleValue(value) {
            // 确保值在范围内
            let val = Math.max(this.min, Math.min(this.max, value));

            // 按步长取整
            const range = this.max - this.min;
            if (this.step > 0 && range > 0) {
                const steps = Math.round((val - this.min) / this.step);
                val = steps * this.step + this.min;

                // 处理浮点数精度问题
                val = parseFloat(val.toFixed(10));
            }

            return val;
        },

        // 根据位置计算值
        getValueByPosition(position) {
            if (!this.sliderWidth) {
                return this.min;
            }

            // 计算百分比
            let percentage = (position - this.sliderLeft) / this.sliderWidth;
            percentage = Math.max(0, Math.min(1, percentage));

            // 计算实际值
            const range = this.max - this.min;
            const value = this.min + percentage * range;

            return this.handleValue(value);
        },

        // 点击轨道时的处理
        onClick(event) {
            if (this.disabled) return;

            const { clientX } = event.touches ? event.touches[0] : event;
            this.currentValue = this.getValueByPosition(clientX);
            this.$emit("input", this.currentValue);
            this.$emit("change", this.currentValue);
        },

        // 开始拖动
        onTouchStart(event) {
            if (this.disabled) return;

            this.isDragging = true;
            this.getSliderInfo();
        },

        // 拖动过程
        onTouchMove(event) {
            if (this.disabled || !this.isDragging) return;

            const { clientX } = event.touches[0];
            this.currentValue = this.getValueByPosition(clientX);
            this.$emit("input", this.currentValue);
            this.$emit("changing", this.currentValue);
        },

        // 结束拖动
        onTouchEnd() {
            if (this.disabled || !this.isDragging) return;

            this.isDragging = false;
            this.$emit("change", this.currentValue);
        },
    },
};
</script>

<style>
.fanc-slider {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    box-sizing: border-box;
}

.fanc-slider__wrapper {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
}

.fanc-slider__track {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--slider-inactive-color, var(--gray-300));
    cursor: pointer;
}

.fanc-slider__bar {
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: 2px;
    background-color: var(--slider-active-color, var(--fanc-primary-color));
}

.fanc-slider__thumb {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--slider-thumb-color, var(--white));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    transition: box-shadow 0.2s;
    z-index: 1;
}

.fanc-slider__thumb:active {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.fanc-slider__thumb--disabled {
    cursor: not-allowed;
    background-color: var(--gray-400);
}

.fanc-slider__value {
    min-width: 32px;
    margin-left: 8px;
    text-align: center;
    font-size: 14px;
    color: var(--text-primary);
}
</style>
