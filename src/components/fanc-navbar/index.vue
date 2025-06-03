<template>
    <view
        class="fanc-navbar"
        :class="[
            fixed ? 'fanc-navbar--fixed' : '',
            border ? 'fanc-navbar--border' : '',
            safeAreaInsetTop ? 'fanc-navbar--safe-area' : '',
        ]"
        :style="navbarStyle"
    >
        <!-- 状态栏占位 -->
        <view
            v-if="fixed && statusBarHeight > 0"
            class="fanc-navbar__status-bar"
            :style="{ height: `${statusBarHeight}px` }"
        ></view>

        <!-- 导航栏主体 -->
        <view class="fanc-navbar__content" :style="contentStyle">
            <!-- 左侧区域 -->
            <view class="fanc-navbar__left" @click="onClickLeft">
                <slot name="left">
                    <template v-if="leftArrow">
                        <view class="fanc-navbar__arrow">
                            <fanc-icon name="chevron-left" :size="arrowSize" :color="arrowColor" />
                        </view>
                    </template>
                    <text v-if="leftText" class="fanc-navbar__text">{{ leftText }}</text>
                </slot>
            </view>

            <!-- 标题区域 -->
            <view class="fanc-navbar__title" :style="titleStyle">
                <slot name="title">
                    <text
                        v-if="title"
                        class="fanc-navbar__title-text"
                        :style="{ color: titleColor }"
                        >{{ title }}</text
                    >
                </slot>
            </view>

            <!-- 右侧区域 -->
            <view class="fanc-navbar__right" @click="onClickRight">
                <slot name="right">
                    <text v-if="rightText" class="fanc-navbar__text">{{ rightText }}</text>
                </slot>
            </view>
        </view>

        <!-- 占位元素，用于fixed模式 -->
        <view
            v-if="fixed && placeholder"
            class="fanc-navbar__placeholder"
            :style="placeholderStyle"
        ></view>
    </view>
</template>

<script>
export default {
    name: "FancNavbar",
    props: {
        // 标题
        title: {
            type: String,
            default: "",
        },
        // 左侧文本
        leftText: {
            type: String,
            default: "",
        },
        // 右侧文本
        rightText: {
            type: String,
            default: "",
        },
        // 是否固定在顶部
        fixed: {
            type: Boolean,
            default: false,
        },
        // 是否显示下边框
        border: {
            type: Boolean,
            default: true,
        },
        // 固定时是否在标签位置生成一个等高的占位元素
        placeholder: {
            type: Boolean,
            default: false,
        },
        // 是否开启顶部安全区适配
        safeAreaInsetTop: {
            type: Boolean,
            default: true,
        },
        // 导航栏高度
        height: {
            type: [Number, String],
            default: 44,
        },
        // 导航栏背景色
        background: {
            type: String,
            default: "",
        },
        // 导航栏z-index
        zIndex: {
            type: [Number, String],
            default: 10,
        },
        // 标题颜色
        titleColor: {
            type: String,
            default: "",
        },
        // 左侧返回箭头
        leftArrow: {
            type: Boolean,
            default: false,
        },
        // 箭头颜色
        arrowColor: {
            type: String,
            default: "",
        },
        // 箭头大小
        arrowSize: {
            type: [Number, String],
            default: 16,
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            statusBarHeight: 0,
        };
    },

    computed: {
        // 导航栏样式
        navbarStyle() {
            const style = {
                ...this.customStyle,
                zIndex: this.zIndex,
            };

            if (this.background) {
                style.backgroundColor = this.background;
            }

            return style;
        },

        // 内容样式
        contentStyle() {
            const style = {};

            if (this.height) {
                style.height = this.addUnit(this.height);
                style.lineHeight = this.addUnit(this.height);
            }

            return style;
        },

        // 标题样式
        titleStyle() {
            const style = {};

            if (this.titleColor) {
                style.color = this.titleColor;
            }

            return style;
        },

        // 占位符样式
        placeholderStyle() {
            const height = Number(this.height) + this.statusBarHeight;
            return {
                height: `${height}px`,
            };
        },
    },

    mounted() {
        this.getStatusBarHeight();
    },

    methods: {
        // 获取状态栏高度
        getStatusBarHeight() {
            // 如果是在uniapp环境中，使用uni接口获取状态栏高度
            // #ifdef APP-PLUS || MP
            try {
                const { statusBarHeight } = uni.getSystemInfoSync();
                this.statusBarHeight = statusBarHeight || 0;
            } catch (e) {
                this.statusBarHeight = 0;
            }
            // #endif
        },

        // 统一添加单位
        addUnit(value) {
            if (value == null) {
                return "";
            }

            return typeof value === "number" ? `${value}px` : String(value);
        },

        // 点击左侧
        onClickLeft(event) {
            this.$emit("click-left", event);
        },

        // 点击右侧
        onClickRight(event) {
            this.$emit("click-right", event);
        },
    },
};
</script>

<style>
.fanc-navbar {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-color: var(--navbar-bg-color);
}

/* 固定顶部 */
.fanc-navbar--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

/* 底部边框 */
.fanc-navbar--border:after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid var(--navbar-border-color);
    transform: scaleY(0.5);
}

/* 安全区适配 */
.fanc-navbar--safe-area {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
}

/* 状态栏 */
.fanc-navbar__status-bar {
    width: 100%;
}

/* 导航栏内容 */
.fanc-navbar__content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    height: var(--navbar-height);
    padding: 0 16px;
}

/* 左侧区域 */
.fanc-navbar__left {
    display: flex;
    align-items: center;
    padding-right: 10px;
    color: var(--navbar-text-color);
}

/* 右侧区域 */
.fanc-navbar__right {
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: var(--navbar-text-color);
}

/* 返回箭头 */
.fanc-navbar__arrow {
    display: flex;
    align-items: center;
    margin-right: 4px;
}

/* 文本 */
.fanc-navbar__text {
    color: var(--navbar-text-color);
    font-size: var(--navbar-text-font-size);
}

/* 标题 */
.fanc-navbar__title {
    flex: 1;
    font-size: var(--navbar-title-font-size);
    font-weight: var(--navbar-title-font-weight);
    text-align: center;
    color: var(--navbar-title-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 占位元素 */
.fanc-navbar__placeholder {
    width: 100%;
}
</style>
