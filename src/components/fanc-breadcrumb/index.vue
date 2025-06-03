<template>
    <view class="fanc-breadcrumb" :class="[`fanc-breadcrumb--${theme}`]">
        <view
            class="fanc-breadcrumb__item"
            v-for="(item, index) in items"
            :key="index"
            @click="handleItemClick(item, index)"
        >
            <view v-if="item.icon" class="fanc-breadcrumb__icon">
                <fanc-icon
                    :name="item.icon"
                    :size="iconSize"
                    :color="activeIndex === index ? activeColor : iconColor"
                ></fanc-icon>
            </view>
            <text
                class="fanc-breadcrumb__text"
                :class="{ 'fanc-breadcrumb__text--active': activeIndex === index }"
                :style="{
                    color: activeIndex === index ? activeColor : textColor,
                    fontSize: `${fontSize}px`,
                }"
                >{{ item.text }}</text
            >
            <view v-if="index < items.length - 1" class="fanc-breadcrumb__separator">
                <fanc-icon
                    v-if="separatorIcon"
                    :name="separatorIcon"
                    :size="separatorSize"
                    :color="separatorColor"
                ></fanc-icon>
                <text
                    v-else
                    class="fanc-breadcrumb__separator-text"
                    :style="{ color: separatorColor }"
                    >{{ separator }}</text
                >
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancBreadcrumb",
    props: {
        // 面包屑项目数组
        items: {
            type: Array,
            default: () => [],
        },
        // 分隔符
        separator: {
            type: String,
            default: "/",
        },
        // 分隔符图标，设置后会优先使用图标
        separatorIcon: {
            type: String,
            default: "",
        },
        // 主题
        theme: {
            type: String,
            default: "light",
            validator: (value) => ["light", "dark", "primary"].includes(value),
        },
        // 文本颜色
        textColor: {
            type: String,
            default: "",
        },
        // 激活状态文本颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 分隔符颜色
        separatorColor: {
            type: String,
            default: "",
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: "",
        },
        // 字体大小
        fontSize: {
            type: [Number, String],
            default: 14,
        },
        // 图标大小
        iconSize: {
            type: [Number, String],
            default: 16,
        },
        // 分隔符大小
        separatorSize: {
            type: [Number, String],
            default: 12,
        },
        // 是否显示首页
        showHome: {
            type: Boolean,
            default: true,
        },
        // 首页文本
        homeText: {
            type: String,
            default: "首页",
        },
        // 首页图标
        homeIcon: {
            type: String,
            default: "home",
        },
        // 首页链接
        homeUrl: {
            type: String,
            default: "/pages/home/index",
        },
        // 点击项目事件是否冒泡
        clickBubble: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            activeIndex: -1,
        };
    },
    computed: {
        // 组合后的面包屑项目
        combinedItems() {
            const result = [...this.items];
            if (this.showHome && (result.length === 0 || result[0].text !== this.homeText)) {
                result.unshift({
                    text: this.homeText,
                    icon: this.homeIcon,
                    url: this.homeUrl,
                });
            }
            return result;
        },
    },
    watch: {
        combinedItems: {
            immediate: true,
            handler(val) {
                this.activeIndex = val.length - 1;
            },
        },
    },
    methods: {
        // 处理面包屑项目点击
        handleItemClick(item, index) {
            if (!this.clickBubble) {
                // 阻止事件冒泡
                event.stopPropagation();
            }

            // 如果点击的是当前活动项，不做任何操作
            if (index === this.activeIndex && !item.alwaysClick) {
                return;
            }

            // 更新活动项索引
            this.activeIndex = index;

            // 触发点击事件
            this.$emit("item-click", item, index);

            // 如果存在URL，进行页面跳转
            if (item.url) {
                uni.navigateTo({
                    url: item.url,
                    fail: () => {
                        uni.switchTab({
                            url: item.url,
                            fail: () => {
                                this.$toast.error("页面跳转失败");
                            },
                        });
                    },
                });
            }
        },
    },
};
</script>

<style>
.fanc-breadcrumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px 0;
}

.fanc-breadcrumb__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
}

.fanc-breadcrumb__icon {
    margin-right: 4px;
}

.fanc-breadcrumb__text {
    font-size: 14px;
    color: var(--breadcrumb-text-color, var(--text-secondary));
    line-height: 1.5;
}

.fanc-breadcrumb__text--active {
    color: var(--breadcrumb-active-color, var(--fanc-primary-color));
    font-weight: 500;
}

.fanc-breadcrumb__separator {
    display: flex;
    align-items: center;
    margin: 0 8px;
    color: var(--breadcrumb-separator-color, var(--text-disabled));
    font-size: 12px;
}

.fanc-breadcrumb__separator-text {
    color: var(--breadcrumb-separator-color, var(--text-disabled));
}

/* 主题样式 */
.fanc-breadcrumb--light {
    background-color: var(--breadcrumb-light-bg-color, var(--bg-white));
}

.fanc-breadcrumb--dark {
    background-color: var(--breadcrumb-dark-bg-color, var(--dark-color));
}

.fanc-breadcrumb--dark .fanc-breadcrumb__text {
    color: var(--breadcrumb-dark-text-color, var(--text-light));
}

.fanc-breadcrumb--dark .fanc-breadcrumb__text--active {
    color: var(--breadcrumb-dark-active-color, var(--white));
}

.fanc-breadcrumb--dark .fanc-breadcrumb__separator,
.fanc-breadcrumb--dark .fanc-breadcrumb__separator-text {
    color: var(--breadcrumb-dark-separator-color, rgba(255, 255, 255, 0.5));
}

.fanc-breadcrumb--primary {
    background-color: var(--breadcrumb-primary-bg-color, var(--fanc-primary-color));
}

.fanc-breadcrumb--primary .fanc-breadcrumb__text {
    color: var(--breadcrumb-primary-text-color, rgba(255, 255, 255, 0.9));
}

.fanc-breadcrumb--primary .fanc-breadcrumb__text--active {
    color: var(--breadcrumb-primary-active-color, var(--white));
}

.fanc-breadcrumb--primary .fanc-breadcrumb__separator,
.fanc-breadcrumb--primary .fanc-breadcrumb__separator-text {
    color: var(--breadcrumb-primary-separator-color, rgba(255, 255, 255, 0.7));
}
</style>
