<template>
    <view class="fanc-breadcrumb-item" @click="handleClick">
        <view v-if="icon" class="fanc-breadcrumb-item__icon">
            <fanc-icon :name="icon" :size="iconSize" :color="iconColor"></fanc-icon>
        </view>
        <text
            class="fanc-breadcrumb-item__text"
            :class="{ 'fanc-breadcrumb-item__text--active': active }"
            :style="{
                color: active ? activeColor : textColor,
                fontSize: `${fontSize}px`,
            }"
        >
            <slot>{{ text }}</slot>
        </text>
        <view v-if="showSeparator" class="fanc-breadcrumb-item__separator">
            <fanc-icon
                v-if="separatorIcon"
                :name="separatorIcon"
                :size="separatorSize"
                :color="separatorColor"
            ></fanc-icon>
            <text
                v-else
                class="fanc-breadcrumb-item__separator-text"
                :style="{ color: separatorColor }"
                >{{ separator }}</text
            >
        </view>
    </view>
</template>

<script>
export default {
    name: "FancBreadcrumbItem",
    props: {
        // 文本内容
        text: {
            type: String,
            default: "",
        },
        // 图标
        icon: {
            type: String,
            default: "",
        },
        // 链接地址
        url: {
            type: String,
            default: "",
        },
        // 是否激活状态
        active: {
            type: Boolean,
            default: false,
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
        // 分隔符
        separator: {
            type: String,
            default: "/",
        },
        // 分隔符图标
        separatorIcon: {
            type: String,
            default: "",
        },
        // 分隔符颜色
        separatorColor: {
            type: String,
            default: "",
        },
        // 分隔符大小
        separatorSize: {
            type: [Number, String],
            default: 12,
        },
        // 是否显示分隔符
        showSeparator: {
            type: Boolean,
            default: true,
        },
        // 是否总是可点击（即使是激活状态）
        alwaysClick: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleClick() {
            // 如果处于激活状态且不是总是可点击，则不触发点击事件
            if (this.active && !this.alwaysClick) {
                return;
            }

            this.$emit("click");

            // 如果有URL，进行页面跳转
            if (this.url) {
                uni.navigateTo({
                    url: this.url,
                    fail: () => {
                        uni.switchTab({
                            url: this.url,
                            fail: (err) => {
                                console.error("页面跳转失败:", err);
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
.fanc-breadcrumb-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
}

.fanc-breadcrumb-item__icon {
    margin-right: 4px;
}

.fanc-breadcrumb-item__text {
    font-size: 14px;
    color: var(--breadcrumb-text-color, var(--text-secondary));
    line-height: 1.5;
}

.fanc-breadcrumb-item__text--active {
    color: var(--breadcrumb-active-color, var(--fanc-primary-color));
    font-weight: 500;
}

.fanc-breadcrumb-item__separator {
    display: flex;
    align-items: center;
    margin: 0 8px;
    color: var(--breadcrumb-separator-color, var(--text-disabled));
    font-size: 12px;
}

.fanc-breadcrumb-item__separator-text {
    color: var(--breadcrumb-separator-color, var(--text-disabled));
}
</style>
