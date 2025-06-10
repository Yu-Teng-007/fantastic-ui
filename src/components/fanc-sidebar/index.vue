<template>
    <view
        class="fanc-sidebar"
        :class="{ 'fanc-sidebar--right': position === 'right' }"
        :style="computedStyle"
    >
        <slot name="content">
            <view class="fanc-sidebar__content">
                <view
                    v-for="(item, index) in items"
                    :key="index"
                    class="fanc-sidebar-item"
                    :class="[
                        { 'fanc-sidebar-item--active': activeIndex === index },
                        { 'fanc-sidebar-item--disabled': item.disabled },
                    ]"
                    @click="handleItemClick(index, item)"
                >
                    <view class="fanc-sidebar-item__content">
                        <view class="fanc-sidebar-item__icon" v-if="item.icon">
                            <slot :name="`icon-${index}`" v-if="$slots[`icon-${index}`]"></slot>
                            <fanc-icon
                                v-else
                                :name="item.icon"
                                :size="item.iconSize || 18"
                            ></fanc-icon>
                        </view>
                        <view
                            class="fanc-sidebar-item__text"
                            :class="{ 'fanc-sidebar-item__text--no-icon': !item.icon }"
                        >
                            {{ item.title }}
                        </view>
                    </view>
                    <view class="fanc-sidebar-item__badge" v-if="item.badge">{{ item.badge }}</view>
                </view>
                <slot></slot>
            </view>
        </slot>
    </view>
</template>

<script>
export default {
    name: "FancSidebar",
    model: {
        prop: "activeIndex",
        event: "update:activeIndex",
    },
    props: {
        activeIndex: {
            type: [Number, String],
            default: 0,
        },
        width: {
            type: [Number, String],
            default: 90,
        },
        position: {
            type: String,
            default: "left",
            validator: (value) => ["left", "right"].includes(value),
        },
        customStyle: {
            type: Object,
            default: () => ({}),
        },
        backgroundColor: {
            type: String,
            default: "",
        },
        items: {
            type: Array,
            default: () => [],
            // item结构: {
            //   title: String,       // 项目标题
            //   icon: String,        // 图标名称
            //   iconSize: Number,    // 图标大小
            //   disabled: Boolean,   // 是否禁用
            //   badge: String/Number // 徽标内容
            // }
        },
    },
    computed: {
        computedStyle() {
            const style = {
                ...this.customStyle,
            };

            if (this.width) {
                style.width = typeof this.width === "number" ? `${this.width}px` : this.width;
            }

            if (this.backgroundColor) {
                style.backgroundColor = this.backgroundColor;
            }

            return style;
        },
    },
    methods: {
        handleItemClick(index, item) {
            if (item.disabled) {
                this.$emit("disabled-click", index, item);
                return;
            }

            this.$emit("update:activeIndex", index);
            this.$emit("change", index, item);
            this.$emit("click", index, item);
        },
    },
};
</script>

<style>
.fanc-sidebar {
    position: relative;
    height: 100%;
    background-color: var(--sidebar-bg-color, #f7f7f7);
    overflow-y: auto;
    flex-shrink: 0;
    z-index: 0;
    width: 90px;
    border-right: none;
}

.fanc-sidebar--right {
    border-left: none;
}

.fanc-sidebar--left {
    border-right: none;
}

.fanc-sidebar__content {
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* 整合fanc-sidebar-item样式 */
.fanc-sidebar-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: var(--sidebar-item-bg-color, transparent);
    border-bottom: none;
    margin: 2px 0;
    border-radius: 0;
}

.fanc-sidebar-item--active {
    background-color: var(--sidebar-item-active-bg-color, transparent);
    color: var(--sidebar-item-active-color, #1f64ff);
    font-weight: 500;
    position: relative;
    z-index: 1;
    box-shadow: none;
}

.fanc-sidebar-item--active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    width: 3px;
    height: 30px;
    background-color: var(--sidebar-item-active-indicator-color, #1f64ff);
    border-radius: 0;
}

.fanc-sidebar--right .fanc-sidebar-item--active::before {
    left: auto;
    right: 0;
}

.fanc-sidebar-item--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.fanc-sidebar-item__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
}

.fanc-sidebar-item__icon {
    margin-right: 0;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-sidebar-item__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
}

.fanc-sidebar-item__text--no-icon {
    font-size: 14px;
}

.fanc-sidebar-item__badge {
    position: absolute;
    top: 0;
    right: 4px;
    display: inline-block;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
    font-size: 12px;
    text-align: center;
    background-color: var(--sidebar-item-badge-bg-color, #ff4d4f);
    color: var(--sidebar-item-badge-color, #fff);
    border-radius: 8px;
}
</style>
