<template>
    <view class="fanc-slider" :class="{ 'fanc-slider--vertical': vertical }">
        <view class="fanc-slider__container">
            <!-- 显示最小值 -->
            <view v-if="showExtremities" class="fanc-slider__value fanc-slider__value--min">
                {{ min }}
            </view>

            <view class="fanc-slider__wrapper">
                <!-- 滑动轨道 -->
                <view
                    class="fanc-slider__track"
                    :style="{ backgroundColor: inactiveColor }"
                    @click="onClick"
                >
                    <!-- 点击波纹效果 -->
                    <view
                        v-if="showRipple"
                        class="fanc-slider__ripple"
                        :style="rippleStyle"
                        @animationend="onRippleEnd"
                    ></view>

                    <!-- 刻度标记 -->
                    <template v-if="showTicks">
                        <view
                            v-for="(tick, index) in ticks"
                            :key="index"
                            class="fanc-slider__tick"
                            :class="{
                                'fanc-slider__tick--active': isTickActive(tick),
                            }"
                            :style="{
                                [vertical ? 'bottom' : 'left']: `${tick.position}%`,
                                backgroundColor: isTickActive(tick) ? activeColor : '',
                            }"
                        ></view>
                    </template>

                    <!-- 已选择的部分 -->
                    <view class="fanc-slider__bar" :style="barStyle"></view>

                    <!-- 左侧滑块（仅在范围模式下显示） -->
                    <view
                        v-if="isRange"
                        class="fanc-slider__thumb"
                        :class="{
                            'fanc-slider__thumb--disabled': disabled,
                            'fanc-slider__thumb--dragging': isDragging && currentDrag === 'min',
                        }"
                        :style="leftThumbStyle"
                        @touchstart.stop.prevent="(e) => onTouchStart(e, 'min')"
                        @touchmove.stop.prevent="(e) => onTouchMove(e, 'min')"
                        @touchend.stop.prevent="(e) => onTouchEnd('min')"
                        @touchcancel.stop.prevent="(e) => onTouchEnd('min')"
                    >
                        <slot name="left-thumb"></slot>
                    </view>

                    <!-- 右侧滑块（单滑块模式下是唯一滑块） -->
                    <view
                        class="fanc-slider__thumb"
                        :class="{
                            'fanc-slider__thumb--disabled': disabled,
                            'fanc-slider__thumb--dragging': isDragging && currentDrag === 'max',
                        }"
                        :style="rightThumbStyle"
                        @touchstart.stop.prevent="(e) => onTouchStart(e, 'max')"
                        @touchmove.stop.prevent="(e) => onTouchMove(e, 'max')"
                        @touchend.stop.prevent="(e) => onTouchEnd('max')"
                        @touchcancel.stop.prevent="(e) => onTouchEnd('max')"
                    >
                        <slot name="thumb"></slot>
                    </view>
                </view>

                <!-- 刻度标记标签 -->
                <view v-if="showTickLabels" class="fanc-slider__tick-labels">
                    <view
                        v-for="(tick, index) in ticks"
                        :key="index"
                        class="fanc-slider__tick-label"
                        :style="{
                            [vertical ? 'bottom' : 'left']: `${tick.position}%`,
                        }"
                    >
                        {{ tick.value }}
                    </view>
                </view>
            </view>

            <!-- 显示当前值 -->
            <view v-if="showValue" class="fanc-slider__value fanc-slider__value--current">
                <template v-if="isRange">{{ minValue }}-{{ currentValue }}</template>
                <template v-else>{{ currentValue }}</template>
            </view>

            <!-- 显示最大值 -->
            <view v-if="showExtremities" class="fanc-slider__value fanc-slider__value--max">
                {{ max }}
            </view>
        </view>
    </view>
</template>

<script>
/**
 * fanc-slider 滑动选择器
 * @description 用于选择横轴上的数值、区间、档位
 * @property {Number|Array} value/v-model 当前进度百分比，取值范围0-100，范围模式下为[min, max]数组
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 步长，取值必须大于0，并且可被(max - min)整除
 * @property {Boolean} disabled 是否禁用滑块
 * @property {String} activeColor 进度条激活部分的颜色
 * @property {String} inactiveColor 进度条未激活部分的颜色
 * @property {String} thumbColor 滑块颜色
 * @property {Boolean} showValue 是否显示当前值，默认为false
 * @property {Boolean} showExtremities 是否显示最小值和最大值，默认为false
 * @property {Boolean} range 是否为范围选择
 * @property {Boolean} vertical 是否垂直方向
 * @property {Boolean} showTicks 是否显示刻度标记
 * @property {Boolean} showTickLabels 是否显示刻度标签
 * @property {Number} tickCount 刻度数量，默认为5
 * @event {Function} change 进度变化时触发
 * @event {Function} changing 滑动过程中触发
 */
export default {
    name: "FancSlider",

    props: {
        // 当前值，支持v-model双向绑定
        value: {
            type: [Number, Array],
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
        // 是否显示最小值和最大值
        showExtremities: {
            type: Boolean,
            default: true,
        },
        // 是否为范围选择
        range: {
            type: Boolean,
            default: false,
        },
        // 是否垂直方向
        vertical: {
            type: Boolean,
            default: false,
        },
        // 是否显示刻度标记
        showTicks: {
            type: Boolean,
            default: false,
        },
        // 是否显示刻度标签
        showTickLabels: {
            type: Boolean,
            default: false,
        },
        // 刻度数量
        tickCount: {
            type: Number,
            default: 5,
            validator: (val) => val > 1,
        },
    },

    data() {
        return {
            // 记录当前值
            currentValue: 0,
            // 范围模式下的最小值
            minValue: 0,
            // 记录拖动状态
            isDragging: false,
            // 当前拖动的滑块（min或max）
            currentDrag: null,
            // 记录滑动器宽度
            sliderWidth: 0,
            // 记录滑动器左侧位置
            sliderLeft: 0,
            // 记录滑动器高度（用于垂直模式）
            sliderHeight: 0,
            // 记录滑动器顶部位置（用于垂直模式）
            sliderTop: 0,
            // 点击波纹效果
            showRipple: false,
            // 点击位置
            ripplePosition: { x: 0, y: 0 },
        };
    },

    computed: {
        // 是否为范围选择模式
        isRange() {
            return this.range;
        },

        // 计算进度条宽度
        barWidth() {
            const range = this.max - this.min;
            const percentage = range !== 0 ? ((this.currentValue - this.min) * 100) / range : 0;
            return `${percentage}%`;
        },

        // 计算左侧滑块位置（百分比）
        leftBarPosition() {
            const range = this.max - this.min;
            return range !== 0 ? ((this.minValue - this.min) * 100) / range : 0;
        },

        // 计算右侧滑块位置（百分比）
        rightBarPosition() {
            const range = this.max - this.min;
            return range !== 0 ? ((this.currentValue - this.min) * 100) / range : 0;
        },

        // 进度条样式
        barStyle() {
            const style = {};

            if (this.vertical) {
                style.bottom = this.isRange ? `${this.leftBarPosition}%` : "0";
                style.height = this.isRange
                    ? `${this.rightBarPosition - this.leftBarPosition}%`
                    : this.barWidth;
            } else {
                style.left = this.isRange ? `${this.leftBarPosition}%` : "0";
                style.width = this.isRange
                    ? `${this.rightBarPosition - this.leftBarPosition}%`
                    : this.barWidth;
            }

            // 设置颜色，禁用状态下透明度降低
            const baseColor =
                this.activeColor || "var(--slider-active-color, var(--fanc-primary-color))";
            style.backgroundColor = baseColor;

            if (this.disabled) {
                style.opacity = "0.4";
            }

            return style;
        },

        // 左侧滑块样式
        leftThumbStyle() {
            const style = {
                backgroundColor: this.thumbColor || this.activeColor,
            };

            if (this.vertical) {
                style.bottom = `${this.leftBarPosition}%`;
            } else {
                style.left = `${this.leftBarPosition}%`;
            }

            return style;
        },

        // 右侧滑块样式
        rightThumbStyle() {
            const style = {
                backgroundColor: this.thumbColor || this.activeColor,
            };

            if (this.vertical) {
                style.bottom = `${this.rightBarPosition}%`;
            } else {
                style.left = this.isRange ? `${this.rightBarPosition}%` : this.barWidth;
            }

            return style;
        },

        // 计算刻度标记
        ticks() {
            const ticks = [];
            const range = this.max - this.min;

            // 确保至少有2个刻度（起点和终点）
            const count = Math.max(2, this.tickCount);

            for (let i = 0; i < count; i++) {
                const position = (i / (count - 1)) * 100;
                const value = this.min + (i / (count - 1)) * range;

                ticks.push({
                    position,
                    value: Math.round(value),
                });
            }

            return ticks;
        },

        // 波纹样式
        rippleStyle() {
            if (this.vertical) {
                return {
                    bottom: `${this.ripplePosition.y}%`,
                    left: "50%",
                    backgroundColor: this.activeColor || undefined,
                };
            } else {
                return {
                    left: `${this.ripplePosition.x}%`,
                    top: "50%",
                    backgroundColor: this.activeColor || undefined,
                };
            }
        },
    },

    watch: {
        value: {
            handler(val) {
                if (this.isRange && Array.isArray(val)) {
                    // 范围模式
                    const [min, max] = val;
                    this.minValue = this.handleValue(min);
                    this.currentValue = this.handleValue(max);
                } else {
                    // 单滑块模式
                    this.currentValue = this.handleValue(val);
                }
            },
            immediate: true,
        },
    },

    mounted() {
        // 初始化值
        if (this.isRange && Array.isArray(this.value)) {
            const [min, max] = this.value;
            this.minValue = this.handleValue(min);
            this.currentValue = this.handleValue(max);
        } else {
            this.currentValue = this.handleValue(this.value);
        }

        // 立即获取一次尺寸信息
        this.getSliderInfo();

        // 延迟再次获取，确保在组件完全渲染后获取正确尺寸
        setTimeout(() => {
            this.getSliderInfo();
        }, 100);

        // 监听窗口大小变化，重新获取尺寸信息
        window.addEventListener("resize", this.getSliderInfo);
    },

    beforeDestroy() {
        // 移除事件监听
        window.removeEventListener("resize", this.getSliderInfo);
    },

    methods: {
        // 获取滑动器尺寸信息
        getSliderInfo(callback) {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(".fanc-slider__track")
                .boundingClientRect((rect) => {
                    if (rect) {
                        this.sliderWidth = rect.width;
                        this.sliderLeft = rect.left;
                        this.sliderHeight = rect.height;
                        this.sliderTop = rect.top;

                        if (callback && typeof callback === "function") {
                            callback();
                        }
                    } else {
                        console.error("Failed to get slider dimensions");
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

        // 点击轨道时的处理
        onClick(event) {
            if (this.disabled) return;

            // 重新获取滑动器尺寸信息
            this.getSliderInfo(() => {
                try {
                    // 获取点击坐标
                    let clientX, clientY;

                    // 处理不同的事件类型
                    if (event.touches && event.touches.length) {
                        // 触摸事件
                        clientX = event.touches[0].clientX;
                        clientY = event.touches[0].clientY;
                    } else {
                        // 鼠标事件
                        clientX = event.changedTouches
                            ? event.changedTouches[0].clientX
                            : event.detail.x;
                        clientY = event.changedTouches
                            ? event.changedTouches[0].clientY
                            : event.detail.y;
                    }

                    if (!this.sliderWidth || !this.sliderHeight) {
                        console.error("Slider dimensions not available");
                        return;
                    }

                    // 计算点击位置对应的值
                    let percentage;
                    if (this.vertical) {
                        // 垂直模式：从底部向上计算
                        const offsetY = clientY - this.sliderTop;
                        percentage = 1 - offsetY / this.sliderHeight;

                        // 设置波纹位置
                        this.ripplePosition = { x: 0, y: percentage * 100 };
                    } else {
                        // 水平模式：从左向右计算
                        const offsetX = clientX - this.sliderLeft;
                        percentage = offsetX / this.sliderWidth;

                        // 设置波纹位置
                        this.ripplePosition = { x: percentage * 100, y: 0 };
                    }

                    // 显示波纹效果
                    this.showRipple = true;

                    // 限制百分比范围
                    percentage = Math.max(0, Math.min(1, percentage));

                    // 计算对应的值
                    const newValue = this.min + percentage * (this.max - this.min);
                    const valueWithStep = this.handleValue(newValue);

                    // 更新值并触发事件
                    this.updateValue(valueWithStep);
                } catch (error) {
                    console.error("Slider click error:", error);
                }
            });
        },

        // 波纹动画结束时的处理
        onRippleEnd() {
            this.showRipple = false;
        },

        // 更新值并触发事件
        updateValue(newValue) {
            if (this.isRange) {
                // 范围模式：判断更新哪个滑块
                const minDistance = Math.abs(this.minValue - newValue);
                const maxDistance = Math.abs(this.currentValue - newValue);

                if (minDistance <= maxDistance) {
                    this.minValue = newValue;
                } else {
                    this.currentValue = newValue;
                }

                // 确保最小值不大于最大值
                if (this.minValue > this.currentValue) {
                    [this.minValue, this.currentValue] = [this.currentValue, this.minValue];
                }

                this.$emit("input", [this.minValue, this.currentValue]);
                this.$emit("change", [this.minValue, this.currentValue]);
            } else {
                // 单滑块模式
                this.currentValue = newValue;
                this.$emit("input", this.currentValue);
                this.$emit("change", this.currentValue);
            }
        },

        // 判断刻度是否处于激活状态
        isTickActive(tick) {
            if (this.isRange) {
                return tick.value >= this.minValue && tick.value <= this.currentValue;
            } else {
                return tick.value <= this.currentValue;
            }
        },

        // 开始拖动
        onTouchStart(event, type) {
            if (this.disabled) return;

            this.isDragging = true;
            this.currentDrag = type;
            this.getSliderInfo();
        },

        // 拖动过程
        onTouchMove(event, type) {
            if (this.disabled || !this.isDragging || this.currentDrag !== type) return;

            try {
                // 获取拖动坐标
                const clientX = event.touches[0].clientX;
                const clientY = event.touches[0].clientY;

                if (!this.sliderWidth || !this.sliderHeight) {
                    return;
                }

                // 计算拖动位置对应的值
                let percentage;
                if (this.vertical) {
                    // 垂直模式：从底部向上计算
                    const offsetY = clientY - this.sliderTop;
                    percentage = 1 - offsetY / this.sliderHeight;
                } else {
                    // 水平模式：从左向右计算
                    const offsetX = clientX - this.sliderLeft;
                    percentage = offsetX / this.sliderWidth;
                }

                // 限制百分比范围
                percentage = Math.max(0, Math.min(1, percentage));

                // 计算对应的值
                const newValue = this.min + percentage * (this.max - this.min);
                const valueWithStep = this.handleValue(newValue);

                // 根据拖动的滑块类型更新值
                if (type === "min") {
                    // 左侧/下侧滑块
                    this.minValue = Math.min(valueWithStep, this.currentValue);
                    this.$emit("input", [this.minValue, this.currentValue]);
                    this.$emit("changing", [this.minValue, this.currentValue]);
                } else {
                    // 右侧/上侧滑块
                    this.currentValue = Math.max(valueWithStep, this.minValue);
                    if (this.isRange) {
                        this.$emit("input", [this.minValue, this.currentValue]);
                        this.$emit("changing", [this.minValue, this.currentValue]);
                    } else {
                        this.$emit("input", this.currentValue);
                        this.$emit("changing", this.currentValue);
                    }
                }
            } catch (error) {
                console.error("Slider move error:", error);
            }
        },

        // 结束拖动
        onTouchEnd(type) {
            if (this.disabled || !this.isDragging || this.currentDrag !== type) return;

            this.isDragging = false;
            this.currentDrag = null;

            if (this.isRange) {
                this.$emit("change", [this.minValue, this.currentValue]);
            } else {
                this.$emit("change", this.currentValue);
            }
        },
    },
};
</script>

<style>
.fanc-slider {
    position: relative;
    width: 100%;
    box-sizing: border-box;
}

.fanc-slider__container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0;
    box-sizing: border-box;
}

.fanc-slider__wrapper {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
}

.fanc-slider__track {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--slider-inactive-color, var(--gray-300));
    cursor: pointer;
    overflow: visible;
}

.fanc-slider__bar {
    position: absolute;
    height: 100%;
    border-radius: 2px;
    background-color: var(--slider-active-color, var(--fanc-primary-color));
    transition: all 0.2s ease;
}

.fanc-slider__thumb {
    position: absolute;
    top: 50%;
    min-width: 20px;
    min-height: 20px;
    border-radius: 50%;
    background-color: var(--slider-thumb-color, var(--white));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-slider__thumb:active {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%) scale(1.1);
}

.fanc-slider__thumb--dragging {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%) scale(1.1);
}

.fanc-slider__thumb--disabled {
    cursor: not-allowed;
    background-color: var(--gray-400, #c8c9cc);
}

.fanc-slider__value {
    min-width: 32px;
    margin-left: 8px;
    text-align: center;
    font-size: 14px;
    color: var(--text-primary);
    transition: all 0.2s ease;
}

.fanc-slider__value--min {
    margin-right: 4px;
    color: var(--text-secondary, #969799);
    font-size: 12px;
}

.fanc-slider__value--max {
    margin-left: 4px;
    color: var(--text-secondary, #969799);
    font-size: 12px;
}

.fanc-slider__value--current {
    font-weight: 500;
}

/* 点击波纹效果 */
.fanc-slider__ripple {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--slider-active-color, var(--fanc-primary-color));
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple-animation 0.4s ease-out;
    pointer-events: none;
    z-index: 0;
}

@keyframes ripple-animation {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.6;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}

/* 刻度标记样式 */
.fanc-slider__tick {
    position: absolute;
    top: 50%;
    width: 2px;
    height: 8px;
    background-color: var(--gray-300);
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: background-color 0.2s ease;
}

.fanc-slider__tick--active {
    background-color: var(--slider-active-color, var(--fanc-primary-color));
}

.fanc-slider__tick-labels {
    position: relative;
    width: 100%;
    margin-top: 8px;
    height: 16px;
    font-size: 12px;
    color: var(--text-secondary);
}

.fanc-slider__tick-label {
    position: absolute;
    transform: translateX(-50%);
    text-align: center;
    white-space: nowrap;
    transition: color 0.2s ease;
}

/* 垂直滑块样式 */
.fanc-slider--vertical {
    height: 100%;
    width: 40px;
}

.fanc-slider--vertical .fanc-slider__container {
    height: 100%;
    width: 40px;
    padding: 0;
    flex-direction: column;
}

.fanc-slider--vertical .fanc-slider__wrapper {
    width: 100%;
    height: 100%;
    flex-direction: row;
    padding: 16px 0;
}

.fanc-slider--vertical .fanc-slider__track {
    width: 4px;
    height: 100%;
}

.fanc-slider--vertical .fanc-slider__bar {
    width: 100%;
    height: auto;
    bottom: 0;
    top: auto;
}

.fanc-slider--vertical .fanc-slider__thumb {
    left: 50%;
    top: auto;
    transform: translate(-50%, 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.fanc-slider--vertical .fanc-slider__thumb:active {
    transform: translate(-50%, 50%) scale(1.1);
}

.fanc-slider--vertical .fanc-slider__thumb--dragging {
    transform: translate(-50%, 50%) scale(1.1);
}

.fanc-slider--vertical .fanc-slider__value {
    margin-left: 0;
    margin-top: 8px;
}

.fanc-slider--vertical .fanc-slider__value--min {
    margin-bottom: 4px;
    margin-top: 0;
}

.fanc-slider--vertical .fanc-slider__value--max {
    margin-top: 4px;
    margin-bottom: 0;
}

.fanc-slider--vertical .fanc-slider__tick {
    top: auto;
    left: 50%;
    width: 8px;
    height: 2px;
    transform: translate(-50%, 50%);
}

.fanc-slider--vertical .fanc-slider__tick-labels {
    height: 100%;
    width: 24px;
    margin-top: 0;
    margin-left: 8px;
}

.fanc-slider--vertical .fanc-slider__tick-label {
    transform: translateY(50%);
    left: 0;
    text-align: left;
}
</style>
