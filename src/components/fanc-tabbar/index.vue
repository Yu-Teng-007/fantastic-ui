<template>
    <view
        class="fanc-tabbar"
        :class="{ 'fanc-tabbar--fixed': fixed, 'fanc-tabbar--placeholder': fixed && placeholder }"
    >
        <view class="fanc-tabbar__content" :style="{ zIndex: zIndex }">
            <view
                v-for="(item, index) in items"
                :key="index"
                class="fanc-tabbar__item"
                :class="{
                    'fanc-tabbar__item--active': modelValue === index,
                    'fanc-tabbar__item--disabled': item.disabled,
                }"
                @click="onChange(index, item)"
            >
                <view v-if="item.icon || item.image" class="fanc-tabbar__icon">
                    <fanc-icon
                        v-if="item.icon"
                        :name="item.icon"
                        :color="getIconColor(index, item)"
                        :size="item.iconSize || iconSize"
                    ></fanc-icon>
                    <image
                        v-else-if="item.image"
                        :src="
                            modelValue === index && item.activeImage ? item.activeImage : item.image
                        "
                        mode="aspectFit"
                        class="fanc-tabbar__image"
                    ></image>
                </view>
                <view v-if="item.badge" class="fanc-tabbar__badge">
                    <text
                        v-if="typeof item.badge === 'string' || typeof item.badge === 'number'"
                        class="fanc-tabbar__badge-text"
                    >
                        {{ item.badge }}
                    </text>
                    <view v-else-if="item.badge === true" class="fanc-tabbar__badge-dot"></view>
                </view>
                <view class="fanc-tabbar__text" :style="{ color: getTextColor(index, item) }">
                    {{ item.text }}
                </view>
            </view>
        </view>
        <!-- 安全区域占位符 -->
        <view v-if="fixed && safeAreaInsetBottom" class="fanc-tabbar__safe-area"></view>
    </view>
</template>

<script>
/**
 * TabBar 标签栏
 * @description 底部导航栏，用于在不同页面之间进行切换
 * @property {Number} value/v-model - 当前选中标签的索引
 * @property {Array} items - 标签项配置数组
 * @property {Boolean} fixed - 是否固定在底部
 * @property {Boolean} placeholder - 固定在底部时是否在标签位置生成等高的占位元素
 * @property {Boolean} safeAreaInsetBottom - 是否开启底部安全区适配
 * @property {Number} zIndex - 元素层级
 * @property {String|Number} iconSize - 图标尺寸，默认24px
 * @event {Function} change - 点击标签时触发
 */
export default {
    name: "FancTabbar",
    props: {
        modelValue: {
            type: Number,
            default: 0,
        },
        items: {
            type: Array,
            default: () => [],
        },
        fixed: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: Boolean,
            default: true,
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        zIndex: {
            type: Number,
            default: 10,
        },
        iconSize: {
            type: [String, Number],
            default: 24,
        },
    },
    emits: ["update:modelValue", "change"],
    methods: {
        /**
         * 切换标签时触发
         * @param {Number} index - 标签索引
         * @param {Object} item - 标签项配置
         */
        onChange(index, item) {
            if (item.disabled) {
                return;
            }

            if (this.modelValue !== index) {
                this.$emit("update:modelValue", index);
                this.$emit("change", index, item);

                // 如果定义了跳转页面，则执行跳转
                if (item.url) {
                    if (item.switchTab) {
                        uni.switchTab({ url: item.url });
                    } else if (item.redirectTo) {
                        uni.redirectTo({ url: item.url });
                    } else if (item.reLaunch) {
                        uni.reLaunch({ url: item.url });
                    } else {
                        uni.navigateTo({ url: item.url });
                    }
                }
            }
        },

        /**
         * 获取图标颜色
         * @param {Number} index - 标签索引
         * @param {Object} item - 标签项配置
         * @returns {String} 图标颜色
         */
        getIconColor(index, item) {
            if (item.disabled) {
                return item.disabledColor || "";
            }

            if (this.modelValue === index) {
                return item.activeColor || "";
            }

            return item.color || "";
        },

        /**
         * 获取文本颜色
         * @param {Number} index - 标签索引
         * @param {Object} item - 标签项配置
         * @returns {String} 文本颜色
         */
        getTextColor(index, item) {
            if (item.disabled) {
                return item.disabledColor || "";
            }

            if (this.modelValue === index) {
                return item.activeColor || "";
            }

            return item.color || "";
        },
    },
};
</script>

<style>
.fanc-tabbar {
    width: 100%;
    background-color: var(--tabbar-bg-color);
    box-sizing: border-box;
}

.fanc-tabbar--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

.fanc-tabbar--placeholder {
    height: var(--tabbar-placeholder-height);
}

.fanc-tabbar__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--tabbar-height);
    border-top: 1px solid var(--tabbar-border-color);
    box-shadow: 0 -1px 4px var(--tabbar-shadow-color);
}

.fanc-tabbar__safe-area {
    height: var(--tabbar-safe-area-height);
    width: 100%;
    background-color: var(--tabbar-bg-color);
}

.fanc-tabbar__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    color: var(--tabbar-item-color);
}

.fanc-tabbar__item--active {
    color: var(--tabbar-item-active-color);
}

.fanc-tabbar__item--disabled {
    color: var(--tabbar-item-disabled-color);
    opacity: var(--tabbar-item-disabled-opacity);
    pointer-events: none;
}

.fanc-tabbar__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-tabbar__image {
    width: var(--tabbar-item-icon-size);
    height: var(--tabbar-item-icon-size);
}

.fanc-tabbar__badge {
    position: absolute;
    top: -4px;
    right: -8px;
    z-index: 1;
}

.fanc-tabbar__badge-text {
    display: inline-block;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
    color: #fff;
    font-size: 10px;
    text-align: center;
    background-color: var(--fanc-danger-color);
    border-radius: 10px;
}

.fanc-tabbar__badge-dot {
    width: 8px;
    height: 8px;
    background-color: var(--fanc-danger-color);
    border-radius: 50%;
}

.fanc-tabbar__text {
    margin-top: var(--tabbar-item-text-margin-top);
    font-size: var(--tabbar-item-text-size);
    line-height: 1.2;
}
</style>
