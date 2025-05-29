<template>
    <view
        class="fanc-rate-container"
        :class="[
            `fanc-rate-container--${descriptionPosition}`,
            { 'fanc-rate-container--with-description': showDescription && descriptions.length > 0 },
        ]"
    >
        <!-- 左侧描述 -->
        <view
            v-if="showDescription && descriptionPosition === 'left' && currentDescription"
            class="fanc-rate__description"
        >
            {{ currentDescription }}
        </view>

        <!-- 评分组件 -->
        <view
            class="fanc-rate"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        >
            <view
                class="fanc-rate__item"
                v-for="(item, index) in starList"
                :key="index"
                @click="onItemClick(index)"
                :style="{ marginRight: index !== count - 1 ? `${gutter}px` : 0 }"
                :id="`star-${index}`"
            >
                <fanc-icon
                    :name="item.icon"
                    :size="size"
                    :color="item.color"
                    class="fanc-rate__icon"
                    :class="{ 'fanc-rate__icon--disabled': disabled }"
                />
                <view
                    class="fanc-rate__bubble"
                    v-if="showBubble && currentBubbleIndex === index && allowHalf"
                >
                    <view class="fanc-rate__bubble-option" @click.stop="selectHalfStar(index)">
                        <fanc-icon
                            :name="halfIcon"
                            :size="16"
                            :color="activeColor || 'var(--rate-active-color)'"
                        ></fanc-icon>
                        <text class="fanc-rate__bubble-text">{{ index + 0.5 }}</text>
                    </view>
                    <view class="fanc-rate__bubble-divider"></view>
                    <view class="fanc-rate__bubble-option" @click.stop="selectFullStar(index)">
                        <fanc-icon
                            :name="activeIcon"
                            :size="16"
                            :color="activeColor || 'var(--rate-active-color)'"
                        ></fanc-icon>
                        <text class="fanc-rate__bubble-text">{{ index + 1 }}</text>
                    </view>
                </view>
                <view
                    class="fanc-rate__bubble"
                    v-if="showBubble && currentBubbleIndex === index && !allowHalf"
                >
                    <fanc-icon
                        :name="activeIcon"
                        :size="16"
                        :color="activeColor || 'var(--rate-active-color)'"
                    ></fanc-icon>
                    <text class="fanc-rate__bubble-text">{{ index + 1 }}</text>
                </view>
            </view>
        </view>

        <!-- 右侧描述 -->
        <view
            v-if="showDescription && descriptionPosition === 'right' && currentDescription"
            class="fanc-rate__description"
        >
            {{ currentDescription }}
        </view>
    </view>
</template>

<script>
export default {
    name: "FancRate",

    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },

    props: {
        // 当前值
        modelValue: {
            type: Number,
            default: 0,
        },
        // 图标总数
        count: {
            type: Number,
            default: 5,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 图标大小，单位px
        size: {
            type: [Number, String],
            default: 20,
        },
        // 图标间距，单位px
        gutter: {
            type: [Number, String],
            default: 4,
        },
        // 选中时的颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 未选中时的颜色
        inactiveColor: {
            type: String,
            default: "",
        },
        // 选中时的图标名称
        activeIcon: {
            type: String,
            default: "star",
        },
        // 未选中时的图标名称
        inactiveIcon: {
            type: String,
            default: "star",
        },
        // 半星图标名称
        halfIcon: {
            type: String,
            default: "star-half-alt",
        },
        // 是否允许半星
        allowHalf: {
            type: Boolean,
            default: false,
        },
        // 是否只读
        readonly: {
            type: Boolean,
            default: false,
        },
        // 是否可以通过滑动手势选择评分
        touchable: {
            type: Boolean,
            default: true,
        },
        // 是否显示气泡
        showBubble: {
            type: Boolean,
            default: true,
        },
        // 气泡显示时间(毫秒)
        bubbleDuration: {
            type: Number,
            default: 800,
        },
        // 是否自动关闭气泡
        autoCloseBubble: {
            type: Boolean,
            default: null, // null表示根据allowHalf自动决定
        },
        // 是否显示描述文本
        showDescription: {
            type: Boolean,
            default: false,
        },
        // 描述文本数组
        descriptions: {
            type: Array,
            default: () => [],
        },
        // 描述文本位置，可选值为 'left' 或 'right'
        descriptionPosition: {
            type: String,
            default: "right",
            validator: (value) => ["left", "right"].includes(value),
        },
        // 未选择时的描述文本
        unselectedDescription: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            currentBubbleIndex: -1,
            bubbleTimer: null,
            // 触摸相关状态
            touching: false,
            touchStartX: 0,
            touchStartY: 0,
            starRects: [], // 存储每个星星的位置信息
            // 用于uni-app的尺寸信息
            rateWidth: 0,
            starWidth: 0,
        };
    },

    computed: {
        starList() {
            const result = [];
            const { count, modelValue, activeIcon, inactiveIcon, activeColor, inactiveColor } =
                this;

            for (let i = 0; i < count; i++) {
                const score = i + 1;
                const isFull = modelValue >= score;
                const isHalf = this.allowHalf && modelValue + 0.5 >= score && modelValue < score;

                let icon = isFull ? activeIcon : inactiveIcon;
                if (isHalf) {
                    icon = this.halfIcon;
                }

                result.push({
                    icon,
                    color:
                        isFull || isHalf
                            ? activeColor || "var(--rate-active-color)"
                            : inactiveColor || "var(--rate-inactive-color)",
                });
            }

            return result;
        },

        // 计算是否应该自动关闭气泡
        shouldAutoClose() {
            // 如果明确设置了autoCloseBubble，则使用设置值
            if (this.autoCloseBubble !== null) {
                return this.autoCloseBubble;
            }
            // 否则根据allowHalf决定：允许半星时不自动关闭，不允许半星时自动关闭
            return !this.allowHalf;
        },

        // 当前评分对应的描述文本
        currentDescription() {
            if (!this.showDescription || this.descriptions.length === 0) {
                return "";
            }

            // 如果没有评分，返回未选择时的描述
            if (this.modelValue === 0) {
                return this.unselectedDescription;
            }

            // 计算当前评分对应的描述索引
            const index = Math.ceil(this.modelValue) - 1;

            // 确保索引在有效范围内
            if (index >= 0 && index < this.descriptions.length) {
                return this.descriptions[index];
            }

            return "";
        },
    },

    mounted() {
        // 组件挂载后获取星星位置信息
        this.updateStarInfoForUni();

        // uni-app没有resize事件，使用onResize生命周期
        // 在页面尺寸变化时需要重新计算
        const pageInstance = this.$scope || this;
        if (pageInstance && pageInstance.$vm) {
            pageInstance.$vm.$on("onResize", this.updateStarInfoForUni);
        }
    },

    beforeDestroy() {
        // 组件销毁前清除定时器和事件监听
        if (this.bubbleTimer) {
            clearTimeout(this.bubbleTimer);
            this.bubbleTimer = null;
        }

        // 移除事件监听
        const pageInstance = this.$scope || this;
        if (pageInstance && pageInstance.$vm) {
            pageInstance.$vm.$off("onResize", this.updateStarInfoForUni);
        }
    },

    methods: {
        // 更新星星位置信息（uni-app版本）
        updateStarInfoForUni() {
            const query = uni.createSelectorQuery().in(this);

            // 获取整个评分容器的宽度
            query
                .select(".fanc-rate")
                .boundingClientRect((data) => {
                    if (data) {
                        this.rateWidth = data.width;
                        // 计算每个星星的平均宽度
                        this.starWidth = this.rateWidth / this.count;

                        // 计算每个星星的位置
                        this.starRects = [];
                        for (let i = 0; i < this.count; i++) {
                            const starLeft = i * this.starWidth;
                            this.starRects.push({
                                left: starLeft,
                                right: starLeft + this.starWidth,
                                width: this.starWidth,
                                center: starLeft + this.starWidth / 2,
                            });
                        }
                    }
                })
                .exec();
        },

        // 处理触摸开始事件
        onTouchStart(event) {
            if (this.disabled || this.readonly || !this.touchable) {
                return;
            }

            this.touching = true;

            // 获取触摸点相对于屏幕的位置
            const touch = event.touches[0];
            this.touchStartX = touch.clientX || touch.x;
            this.touchStartY = touch.clientY || touch.y;

            // 确保有星星位置信息
            if (this.starRects.length === 0) {
                this.updateStarInfoForUni();
                return; // 等待下次触摸移动时更新评分
            }

            // 获取评分容器的位置信息
            const query = uni.createSelectorQuery().in(this);
            query
                .select(".fanc-rate")
                .boundingClientRect((data) => {
                    if (data) {
                        // 计算触摸点相对于评分容器的位置
                        const relativeX = this.touchStartX - data.left;
                        // 根据触摸位置更新评分
                        this.updateRateByTouch(relativeX);
                    }
                })
                .exec();
        },

        // 处理触摸移动事件
        onTouchMove(event) {
            if (!this.touching || this.disabled || this.readonly || !this.touchable) {
                return;
            }

            // 阻止页面滚动
            event.preventDefault && event.preventDefault();
            event.stopPropagation && event.stopPropagation();

            // 获取触摸点相对于屏幕的位置
            const touch = event.touches[0];
            const touchX = touch.clientX || touch.x;

            // 获取评分容器的位置信息
            const query = uni.createSelectorQuery().in(this);
            query
                .select(".fanc-rate")
                .boundingClientRect((data) => {
                    if (data) {
                        // 计算触摸点相对于评分容器的位置
                        const relativeX = touchX - data.left;
                        // 根据触摸位置更新评分
                        this.updateRateByTouch(relativeX);
                    }
                })
                .exec();
        },

        // 处理触摸结束事件
        onTouchEnd() {
            if (!this.touching) {
                return;
            }

            this.touching = false;
        },

        // 根据触摸位置更新评分
        updateRateByTouch(relativeX) {
            if (this.starRects.length === 0 || relativeX < 0) {
                return;
            }

            // 找出触摸位置所在的星星
            let score = 0;

            for (let i = 0; i < this.starRects.length; i++) {
                const rect = this.starRects[i];

                if (relativeX < rect.left) {
                    // 触摸位置在当前星星左侧，评分为前一个星星
                    break;
                }

                if (relativeX <= rect.right) {
                    // 触摸位置在当前星星内
                    score = i + 1;

                    // 如果允许半星，判断是否在星星的左半部分
                    if (this.allowHalf && relativeX < rect.center) {
                        score -= 0.5;
                    }

                    break;
                }

                // 触摸位置在当前星星右侧，评分为当前星星
                score = i + 1;
            }

            // 更新评分
            if (score !== this.modelValue) {
                this.onChange(score);
            }
        },

        onItemClick(index) {
            if (this.disabled || this.readonly) {
                return;
            }

            // 先隐藏之前的气泡，确保新气泡能正常显示
            // 但不要重置定时器，让新气泡能有完整的显示时间
            this.currentBubbleIndex = -1;

            if (this.allowHalf && this.showBubble) {
                // 在允许半星且开启气泡的情况下，显示选择气泡
                this.showBubbleAt(index);
            } else {
                // 否则直接设置评分值
                this.onChange(index + 1);
            }
        },

        selectHalfStar(index) {
            // 选择半星
            this.onChange(index + 0.5);
            this.hideBubble();
        },

        selectFullStar(index) {
            // 选择整星
            this.onChange(index + 1);
            this.hideBubble();
        },

        onChange(value) {
            this.$emit("update:modelValue", value);
            this.$emit("change", value);

            // 如果不是允许半星的情况，显示普通气泡
            if (!this.allowHalf && this.showBubble) {
                const index = Math.floor(value) - 1;
                this.showBubbleAt(index);
            }
        },

        showBubbleAt(index) {
            // 清除之前的定时器，确保新气泡有完整的显示时间
            if (this.bubbleTimer) {
                clearTimeout(this.bubbleTimer);
                this.bubbleTimer = null;
            }

            // 显示气泡
            this.currentBubbleIndex = index;

            // 根据shouldAutoClose决定是否自动关闭气泡
            if (this.shouldAutoClose) {
                this.bubbleTimer = setTimeout(() => {
                    this.hideBubble();
                }, this.bubbleDuration);
            }
        },

        hideBubble() {
            this.currentBubbleIndex = -1;
            if (this.bubbleTimer) {
                clearTimeout(this.bubbleTimer);
                this.bubbleTimer = null;
            }
        },
    },
};
</script>

<style>
.fanc-rate-container {
    display: flex;
    align-items: center;
}

.fanc-rate-container--left {
    flex-direction: row;
}

.fanc-rate-container--right {
    flex-direction: row;
}

.fanc-rate-container--with-description .fanc-rate {
    margin: 0 8px;
}

.fanc-rate {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    touch-action: none; /* 防止触摸时页面滚动 */
}

.fanc-rate__description {
    font-size: 14px;
    color: var(--text-primary, #323233);
    white-space: nowrap;
    transition: color 0.2s;
}

.fanc-rate__item {
    position: relative;
    display: inline-flex;
    cursor: pointer;
}

.fanc-rate__icon {
    transition: transform 0.2s;
}

.fanc-rate__icon:not(.fanc-rate__icon--disabled):hover {
    transform: scale(1.1);
}

.fanc-rate__icon--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.fanc-rate__bubble {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    min-width: 60px;
    min-height: 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    animation: bubble-in 0.2s ease-out;
    z-index: 10;
    padding: 0 8px;
}

.fanc-rate__bubble-option {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.2s;
}

.fanc-rate__bubble-option:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.fanc-rate__bubble-divider {
    width: 1px;
    height: 20px;
    background-color: #ebedf0;
    margin: 0 4px;
}

.fanc-rate__bubble-text {
    font-size: 14px;
    font-weight: bold;
    color: var(--text-primary, #323233);
    margin-left: 4px;
}

.fanc-rate__bubble::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background-color: #ffffff;
}

@keyframes bubble-in {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
</style>
