<template>
    <view
        class="fanc-footer"
        :class="[`fanc-footer--${theme}`, { 'fanc-footer--fixed': fixed }]"
        :style="customStyle"
    >
        <!-- Logo 区域 -->
        <view v-if="showLogo" class="fanc-footer__logo">
            <image v-if="logo" class="fanc-footer__logo-image" :src="logo" mode="aspectFit"></image>
            <text v-if="title" class="fanc-footer__title">{{ title }}</text>
        </view>

        <!-- 链接区域 -->
        <view v-if="links && links.length > 0" class="fanc-footer__links">
            <view
                v-for="(link, index) in links"
                :key="index"
                class="fanc-footer__link-item"
                @click="handleLinkClick(link)"
            >
                <fanc-icon
                    v-if="link.icon"
                    :name="link.icon"
                    :size="16"
                    :color="iconColor"
                    class="fanc-footer__link-icon"
                ></fanc-icon>
                <text class="fanc-footer__link-text">{{ link.text }}</text>
                <text v-if="index < links.length - 1" class="fanc-footer__link-separator">{{
                    separator
                }}</text>
            </view>
        </view>

        <!-- 内容区域 -->
        <view v-if="$slots.default" class="fanc-footer__content">
            <slot></slot>
        </view>

        <!-- 版权信息 -->
        <view v-if="copyright" class="fanc-footer__copyright">
            <text>{{ copyright }}</text>
        </view>

        <!-- 备案信息 -->
        <view v-if="icp" class="fanc-footer__icp">
            <text>{{ icp }}</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancFooter",

    props: {
        // 主题样式
        theme: {
            type: String,
            default: "default",
            validator: (value) => ["default", "dark", "light", "primary"].includes(value),
        },
        // 是否固定在底部
        fixed: {
            type: Boolean,
            default: false,
        },
        // 底部边距，配合fixed使用
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        // Logo图片
        logo: {
            type: String,
            default: "",
        },
        // 标题
        title: {
            type: String,
            default: "",
        },
        // 是否显示Logo区域
        showLogo: {
            type: Boolean,
            default: false,
        },
        // 版权信息
        copyright: {
            type: String,
            default: "",
        },
        // 备案信息
        icp: {
            type: String,
            default: "",
        },
        // 链接列表
        links: {
            type: Array,
            default: () => [],
        },
        // 链接分隔符
        separator: {
            type: String,
            default: "|",
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        iconColor() {
            if (this.theme === "dark") {
                return "#ffffff";
            } else if (this.theme === "primary") {
                return "#ffffff";
            }
            return "";
        },
    },

    methods: {
        handleLinkClick(link) {
            if (link.url) {
                // 处理链接跳转
                uni.navigateTo({
                    url: link.url,
                    fail: () => {
                        // 如果是tabbar页面，使用switchTab
                        uni.switchTab({
                            url: link.url,
                            fail: () => {
                                // 外部链接
                                if (link.external) {
                                    // 在浏览器环境下可以打开外部链接
                                    // #ifdef H5
                                    window.open(link.url);
                                    // #endif

                                    // APP环境下使用系统浏览器打开
                                    // #ifdef APP-PLUS
                                    plus.runtime.openURL(link.url);
                                    // #endif
                                } else {
                                    this.$toast.text("无法打开链接");
                                }
                            },
                        });
                    },
                });
            }

            // 触发点击事件
            this.$emit("link-click", link);
        },
    },
};
</script>

<style>
.fanc-footer {
    width: 100%;
    padding: var(--footer-padding, 20px);
    background-color: var(--footer-bg-color, var(--bg-white));
    color: var(--footer-text-color, var(--text-secondary));
    font-size: var(--footer-font-size, 14px);
    text-align: center;
    box-sizing: border-box;
    border-top: 1px solid var(--footer-border-color, var(--border-color));
}

.fanc-footer--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: var(--footer-z-index, 10);
}

.fanc-footer--dark {
    background-color: var(--footer-dark-bg-color, var(--dark-color));
    color: var(--footer-dark-text-color, var(--text-light));
    border-top-color: var(--footer-dark-border-color, var(--black));
}

.fanc-footer--light {
    background-color: var(--footer-light-bg-color, var(--light-color));
    color: var(--footer-light-text-color, var(--text-primary));
    border-top-color: var(--footer-light-border-color, var(--border-color-light));
}

.fanc-footer--primary {
    background-color: var(--footer-primary-bg-color, var(--primary-color));
    color: var(--footer-primary-text-color, var(--text-light));
    border-top-color: var(--footer-primary-border-color, var(--primary-color));
}

.fanc-footer__logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--footer-logo-margin-bottom, 16px);
}

.fanc-footer__logo-image {
    width: var(--footer-logo-width, 80px);
    height: var(--footer-logo-height, 30px);
    margin-bottom: var(--footer-logo-image-margin-bottom, 8px);
}

.fanc-footer__title {
    font-size: var(--footer-title-font-size, 16px);
    font-weight: var(--footer-title-font-weight, 500);
    margin-bottom: var(--footer-title-margin-bottom, 8px);
}

.fanc-footer__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: var(--footer-links-margin-bottom, 16px);
}

.fanc-footer__link-item {
    display: flex;
    align-items: center;
    margin: var(--footer-link-margin, 0 8px);
    padding: var(--footer-link-padding, 4px 0);
}

.fanc-footer__link-text {
    color: var(--footer-link-color, var(--primary-color));
    font-size: var(--footer-link-font-size, 14px);
}

.fanc-footer__link-icon {
    margin-right: var(--footer-link-icon-margin, 4px);
}

.fanc-footer__link-separator {
    margin: 0 var(--footer-link-separator-margin, 8px);
    color: var(--footer-separator-color, var(--text-disabled));
}

.fanc-footer__content {
    margin-bottom: var(--footer-content-margin-bottom, 16px);
    line-height: var(--footer-line-height, 1.5);
}

.fanc-footer__copyright {
    font-size: var(--footer-copyright-font-size, 12px);
    margin-bottom: var(--footer-copyright-margin-bottom, 8px);
}

.fanc-footer__icp {
    font-size: var(--footer-icp-font-size, 12px);
}

/* 暗色主题下链接颜色 */
.fanc-footer--dark .fanc-footer__link-text {
    color: var(--footer-link-dark-color, var(--light-color));
}

/* 主色主题下链接颜色 */
.fanc-footer--primary .fanc-footer__link-text {
    color: var(--footer-link-primary-color, var(--white));
}
</style>
