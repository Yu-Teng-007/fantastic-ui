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
        <!-- 导航栏主体 -->
        <view class="fanc-navbar__content" :style="contentStyle">
            <!-- 左侧区域 -->
            <view class="fanc-navbar__left" @click="onClickLeft">
                <slot name="left">
                    <view class="fanc-navbar__arrow" v-if="showLeftArrow">
                        <fanc-icon name="chevron-left" :size="arrowSize" :color="arrowColor" />
                    </view>
                    <text
                        v-if="showLeftText"
                        class="fanc-navbar__text"
                        :style="{ color: leftTextColor }"
                        >{{ leftTextDisplay }}</text
                    >
                </slot>
            </view>

            <!-- 标题区域 -->
            <view class="fanc-navbar__title" :style="titleStyle">
                <slot name="title">
                    <text v-if="title" class="fanc-navbar__title-text" :style="titleTextStyle">{{
                        truncatedTitle
                    }}</text>
                </slot>
            </view>

            <!-- 右侧区域 -->
            <view class="fanc-navbar__right" @click="onClickRight">
                <slot name="right">
                    <text
                        v-if="rightText"
                        class="fanc-navbar__text"
                        :style="{ color: rightTextColor }"
                        >{{ rightText }}</text
                    >
                    <template v-if="rightIcon">
                        <view class="fanc-navbar__icon">
                            <fanc-icon :name="rightIcon" :size="iconSize" :color="rightIconColor" />
                        </view>
                    </template>
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
import FancIcon from "../fanc-icon/index.vue";

export default {
    name: "FancNavbar",
    components: {
        FancIcon,
    },
    props: {
        // 标题
        title: {
            type: String,
            default: "",
        },
        // 标题最大宽度，超出将被省略
        titleMaxWidth: {
            type: [Number, String],
            default: "",
        },
        // 标题最大字符数，超出将被省略
        titleMaxLength: {
            type: [Number, String],
            default: 0,
        },
        // 标题省略号位置，可选值为 start、middle、end
        titleEllipsis: {
            type: String,
            default: "end",
            validator: (value) => ["start", "middle", "end"].includes(value),
        },
        // 左侧文本
        leftText: {
            type: String,
            default: "返回",
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
            default: 100,
        },
        // 标题颜色
        titleColor: {
            type: String,
            default: "",
        },
        // 左侧返回箭头
        leftArrow: {
            type: Boolean,
            default: true,
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
        // 左侧文本颜色
        leftTextColor: {
            type: String,
            default: "",
        },
        // 右侧文本颜色
        rightTextColor: {
            type: String,
            default: "",
        },
        // 左侧图标
        leftIcon: {
            type: String,
            default: "",
        },
        // 右侧图标
        rightIcon: {
            type: String,
            default: "",
        },
        // 图标大小
        iconSize: {
            type: [Number, String],
            default: 20,
        },
        // 左侧图标颜色
        leftIconColor: {
            type: String,
            default: "",
        },
        // 右侧图标颜色
        rightIconColor: {
            type: String,
            default: "",
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: () => ({}),
        },
        // 顶部偏移量，用于处理系统自带导航栏
        offsetTop: {
            type: [Number, String],
            default: 0,
        },
        // 是否显示左侧返回文字
        showLeftText: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            statusBarHeight: 0,
        };
    },

    computed: {
        // 是否显示左侧返回箭头
        showLeftArrow() {
            return this.leftArrow || (!this.leftIcon && !this.leftText);
        },

        // 左侧文本显示内容
        leftTextDisplay() {
            return this.leftText || "返回";
        },

        // 处理标题超出部分
        truncatedTitle() {
            if (!this.title) return "";

            // 处理最大字符数限制
            if (this.titleMaxLength > 0 && this.title.length > this.titleMaxLength) {
                const maxLength = parseInt(this.titleMaxLength, 10);

                if (this.titleEllipsis === "start") {
                    return "..." + this.title.slice(-maxLength);
                } else if (this.titleEllipsis === "middle") {
                    const frontLen = Math.ceil(maxLength / 2);
                    const endLen = Math.floor(maxLength / 2);
                    return this.title.slice(0, frontLen) + "..." + this.title.slice(-endLen);
                } else {
                    return this.title.slice(0, maxLength) + "...";
                }
            }

            return this.title;
        },

        // 导航栏样式
        navbarStyle() {
            const style = {
                ...this.customStyle,
                zIndex: this.zIndex,
            };

            if (this.background) {
                style.backgroundColor = this.background;
            }
            if (this.fixed) {
                style.zIndex = this.zIndex + 10;
            }

            if (this.fixed && this.offsetTop) {
                style.top = this.addUnit(this.offsetTop);
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

        // 标题文本样式
        titleTextStyle() {
            const style = {
                color: this.titleColor || "",
            };

            // 如果设置了最大宽度
            if (this.titleMaxWidth) {
                style.maxWidth = this.addUnit(this.titleMaxWidth);
            }

            return style;
        },

        // 占位符样式
        placeholderStyle() {
            const height = Number(this.height) + this.statusBarHeight;
            const style = {
                height: `${height}px`,
            };

            if (this.offsetTop) {
                style.marginTop = this.addUnit(this.offsetTop);
            }

            return style;
        },
    },

    mounted() {
        this.getStatusBarHeight();
    },

    methods: {
        // 获取状态栏高度
        getStatusBarHeight() {
            // 尝试使用uni接口获取状态栏高度
            if (typeof uni !== "undefined") {
                try {
                    const sysInfo = uni.getSystemInfoSync();
                    this.statusBarHeight = sysInfo.statusBarHeight || 20;
                } catch (e) {
                    this.statusBarHeight = 20; // 设置一个默认值
                }
            } else {
                // 非uni环境，设置一个默认值
                this.statusBarHeight = 20;
            }
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
    z-index: 100;
    display: flex;
    flex-direction: column;
    background-color: var(--navbar-bg-color, #ffffff);
    width: 100%;
    box-sizing: border-box;
}

/* 固定顶部 */
.fanc-navbar--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    box-sizing: border-box;
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
    border-bottom: 1px solid var(--navbar-border-color, #ebedf0);
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
    box-sizing: border-box;
}

/* 导航栏内容 */
.fanc-navbar__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--navbar-height, 44px);
    padding: 0 16px;
    width: 100%;
    box-sizing: border-box;
}

/* 左侧区域 */
.fanc-navbar__left {
    display: flex;
    align-items: center;
    padding-right: 10px;
    color: var(--navbar-text-color, #323233);
    box-sizing: border-box;
    z-index: 1;
}

/* 右侧区域 */
.fanc-navbar__right {
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: var(--navbar-text-color, #323233);
    box-sizing: border-box;
    z-index: 1;
}

/* 返回箭头 */
.fanc-navbar__arrow {
    display: flex;
    align-items: center;
    margin-right: 4px;
}

/* 图标 */
.fanc-navbar__icon {
    display: flex;
    align-items: center;
    margin: 0 4px;
}

/* 文本 */
.fanc-navbar__text {
    color: var(--navbar-text-color, #323233);
    font-size: var(--navbar-text-font-size, 14px);
    margin: 0 4px;
}

/* 标题 */
.fanc-navbar__title {
    flex: 1;
    font-size: var(--navbar-title-font-size, 16px);
    font-weight: var(--navbar-title-font-weight, 500);
    text-align: center;
    color: var(--navbar-title-color, #323233);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    left: 88px;
    right: 88px;
    box-sizing: border-box;
}

/* 占位元素 */
.fanc-navbar__placeholder {
    width: 100%;
    box-sizing: border-box;
}

/* 标题文本 */
.fanc-navbar__title-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
}
</style>
