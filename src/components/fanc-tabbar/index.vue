<template>
    <view
        class="fanc-tabbar"
        :class="{
            'fanc-tabbar--fixed': fixed,
            'fanc-tabbar--placeholder': fixed && placeholder,
            'fanc-tabbar--capsule': capsule,
            'fanc-tabbar--icon-only': iconOnly,
            'fanc-tabbar--text-only': textOnly,
        }"
    >
        <view class="fanc-tabbar__content" :style="{ zIndex: zIndex }">
            <!-- 默认标签项渲染 -->
            <template v-if="!$slots.default">
                <view
                    v-for="(item, index) in items"
                    :key="index"
                    class="fanc-tabbar__item"
                    :class="{
                        'fanc-tabbar__item--active': activeIndex === index,
                        'fanc-tabbar__item--disabled': item.disabled,
                    }"
                    @click="onChange(index, item)"
                >
                    <view class="fanc-tabbar__icon-container">
                        <view
                            v-if="!textOnly && (item.icon || item.image)"
                            class="fanc-tabbar__icon"
                        >
                            <fanc-icon
                                v-if="item.icon"
                                :name="item.icon"
                                :color="getIconColor(index, item)"
                                :size="item.iconSize || iconSize"
                            ></fanc-icon>
                            <image
                                v-else-if="item.image"
                                :src="
                                    activeIndex === index && item.activeImage
                                        ? item.activeImage
                                        : item.image
                                "
                                mode="aspectFit"
                                class="fanc-tabbar__image"
                            ></image>
                        </view>
                        <view v-if="item.badge" class="fanc-tabbar__badge">
                            <text
                                v-if="
                                    typeof item.badge === 'string' || typeof item.badge === 'number'
                                "
                                class="fanc-tabbar__badge-text"
                            >
                                {{ item.badge }}
                            </text>
                            <view
                                v-else-if="item.badge === true"
                                class="fanc-tabbar__badge-dot"
                            ></view>
                        </view>
                    </view>
                    <view
                        v-if="!iconOnly || (iconOnly && !item.icon && !item.image)"
                        class="fanc-tabbar__text"
                        :style="{ color: getTextColor(index, item) }"
                    >
                        {{ item.text }}
                    </view>
                </view>
            </template>

            <!-- 自定义标签项插槽 -->
            <slot></slot>
        </view>
        <!-- 安全区域占位符 -->
        <view v-if="fixed && safeAreaInsetBottom" class="fanc-tabbar__safe-area"></view>
    </view>
</template>

<script>
/**
 * TabBar 标签栏
 * @description 底部导航栏，用于在不同页面之间进行切换
 * @property {Number|String} value/v-model - 当前选中标签的索引或name值
 * @property {Array} items - 标签项配置数组
 * @property {Boolean} fixed - 是否固定在底部
 * @property {Boolean} placeholder - 固定在底部时是否在标签位置生成等高的占位元素
 * @property {Boolean} safeAreaInsetBottom - 是否开启底部安全区适配
 * @property {Boolean} capsule - 是否使用胶囊模式
 * @property {Boolean} iconOnly - 是否只显示图标，不显示文本
 * @property {Boolean} textOnly - 是否只显示文本，不显示图标
 * @property {Number} zIndex - 元素层级
 * @property {String|Number} iconSize - 图标尺寸，默认24px
 * @event {Function} change - 点击标签时触发
 * @slot default - 自定义标签栏内容，设置后将不使用items属性渲染标签
 */
export default {
    name: "FancTabbar",
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    props: {
        modelValue: {
            type: [Number, String],
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
        capsule: {
            type: Boolean,
            default: false,
        },
        iconOnly: {
            type: Boolean,
            default: false,
        },
        textOnly: {
            type: Boolean,
            default: false,
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
    computed: {
        // 获取当前激活的索引
        activeIndex() {
            // 如果modelValue是数字，直接返回
            if (typeof this.modelValue === "number") {
                return this.modelValue;
            }

            // 如果modelValue是字符串，查找对应name的索引
            const index = this.items.findIndex((item) => item.name === this.modelValue);
            return index !== -1 ? index : 0;
        },
    },
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

            // 判断当前索引是否已激活
            if (this.activeIndex !== index) {
                // 如果标签有name属性，则使用name作为v-model的值
                const value = item.name !== undefined ? item.name : index;
                this.$emit("update:modelValue", value);
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

            if (this.activeIndex === index) {
                return item.activeColor || "var(--fanc-primary-color)";
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

            if (this.activeIndex === index) {
                return item.activeColor || "var(--fanc-primary-color)";
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

.fanc-tabbar--capsule {
    padding: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fanc-tabbar--capsule .fanc-tabbar__content {
    width: 80%;
    max-width: 320px;
    border-radius: 50px;
    border-top: none;
    box-shadow: 0 2px 10px var(--tabbar-shadow-color);
    background-color: #fff;
}

.fanc-tabbar__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--tabbar-height);
    border-top: none;
    box-shadow: 0 -4px 10px -2px var(--tabbar-shadow-color, rgba(0, 0, 0, 0.05));
    padding: 6px 0;
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

.fanc-tabbar__icon-container {
    position: relative;
    display: inline-block;
}

.fanc-tabbar__icon {
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
    top: -2px;
    right: -4px;
    z-index: 1;
    transform: translate(50%, -50%);
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

.fanc-tabbar--icon-only .fanc-tabbar__icon {
    margin-bottom: 0;
}

.fanc-tabbar--icon-only .fanc-tabbar__icon-container {
    margin: 0;
}

.fanc-tabbar--text-only .fanc-tabbar__text {
    margin-top: 0;
    font-size: var(--tabbar-text-only-size, 14px);
}

.fanc-tabbar--text-only .fanc-tabbar__item--active .fanc-tabbar__text {
    background-color: var(--tabbar-text-active-bg-color, rgba(25, 137, 250, 0.1));
    border-radius: 20px;
    padding: 4px 12px;
}
</style>
