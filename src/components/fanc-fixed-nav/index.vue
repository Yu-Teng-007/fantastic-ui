<template>
    <view
        class="fanc-fixed-nav"
        :class="[
            `fanc-fixed-nav--${type}`,
            {
                'fanc-fixed-nav--collapsed': collapsed,
                'fanc-fixed-nav--horizontal': direction === 'horizontal',
                'fanc-fixed-nav--vertical': direction === 'vertical',
            },
        ]"
        :style="navStyle"
    >
        <!-- 主按钮 -->
        <view
            class="fanc-fixed-nav__main"
            :class="{ 'fanc-fixed-nav__main--active': !collapsed }"
            @click="toggleCollapse"
        >
            <fanc-icon
                :name="collapsed ? mainIcon : closeIcon"
                :color="mainIconColor"
                :size="iconSize"
            />
            <text v-if="showMainText && !collapsed" class="fanc-fixed-nav__main-text">{{
                mainText
            }}</text>
        </view>

        <!-- 导航项容器 -->
        <view
            class="fanc-fixed-nav__items"
            :class="{ 'fanc-fixed-nav__items--visible': !collapsed }"
        >
            <view
                v-for="(item, index) in items"
                :key="index"
                class="fanc-fixed-nav__item"
                :class="{ 'fanc-fixed-nav__item--active': activeIndex === index }"
                @click="onItemClick(item, index)"
            >
                <view class="fanc-fixed-nav__icon">
                    <fanc-icon
                        :name="item.icon || 'question-circle'"
                        :color="item.iconColor || iconColor"
                        :size="iconSize"
                    />
                    <view
                        v-if="item.badge"
                        class="fanc-fixed-nav__badge"
                        :class="{ 'fanc-fixed-nav__badge--dot': item.badge === true }"
                    >
                        <text v-if="item.badge !== true">{{ item.badge }}</text>
                    </view>
                </view>
                <text v-if="showText && !collapsed" class="fanc-fixed-nav__text">{{
                    item.text
                }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancFixedNav",
    props: {
        // 导航项数据
        items: {
            type: Array,
            default: () => [],
        },
        // 默认是否收起
        defaultCollapsed: {
            type: Boolean,
            default: true,
        },
        // 导航位置
        position: {
            type: String,
            default: "right-bottom",
            validator: (value) => {
                return ["left-bottom", "right-bottom", "left-top", "right-top"].includes(value);
            },
        },
        // 排列方向
        direction: {
            type: String,
            default: "vertical",
            validator: (value) => {
                return ["horizontal", "vertical"].includes(value);
            },
        },
        // 类型
        type: {
            type: String,
            default: "primary",
            validator: (value) => {
                return ["default", "primary", "success", "warning", "danger", "info"].includes(
                    value
                );
            },
        },
        // 距离边缘的距离
        offset: {
            type: Object,
            default: () => ({ bottom: "100px", right: "20px" }),
        },
        // z-index层级
        zIndex: {
            type: [Number, String],
            default: 100,
        },
        // 是否显示文字
        showText: {
            type: Boolean,
            default: true,
        },
        // 是否显示主按钮文字
        showMainText: {
            type: Boolean,
            default: true,
        },
        // 主按钮文字
        mainText: {
            type: String,
            default: "菜单",
        },
        // 主按钮图标
        mainIcon: {
            type: String,
            default: "bars",
        },
        // 关闭图标
        closeIcon: {
            type: String,
            default: "times",
        },
        // 图标大小
        iconSize: {
            type: [Number, String],
            default: 20,
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: "",
        },
        // 主图标颜色
        mainIconColor: {
            type: String,
            default: "",
        },
        // 激活的导航项索引
        activeIndex: {
            type: Number,
            default: -1,
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: false,
        },
        // 是否点击遮罩层关闭
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            collapsed: this.defaultCollapsed,
        };
    },
    computed: {
        navStyle() {
            const style = {
                zIndex: this.zIndex,
            };

            // 根据position设置位置
            if (this.position.includes("left")) {
                style.left = this.offset.left || "20px";
            } else {
                style.right = this.offset.right || "20px";
            }

            if (this.position.includes("top")) {
                style.top = this.offset.top || "100px";
            } else {
                style.bottom = this.offset.bottom || "100px";
            }

            return style;
        },
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed;
            this.$emit("toggle", this.collapsed);

            // 显示遮罩层
            if (this.overlay && !this.collapsed) {
                this.showOverlay();
            } else if (this.overlay) {
                this.hideOverlay();
            }
        },
        onItemClick(item, index) {
            this.$emit("click", item, index);

            // 如果配置了点击自动收起
            if (item.closeOnClick !== false) {
                this.collapsed = true;
                if (this.overlay) {
                    this.hideOverlay();
                }
            }

            // 如果配置了URL，则进行跳转
            if (item.url) {
                uni.navigateTo({
                    url: item.url,
                    fail: () => {
                        uni.switchTab({
                            url: item.url,
                            fail: (err) => {
                                this.$toast.error("页面跳转失败");
                                console.error("Navigation failed:", err);
                            },
                        });
                    },
                });
            }
        },
        showOverlay() {
            // 创建遮罩层
            const overlay = document.createElement("div");
            overlay.className = "fanc-fixed-nav__overlay";
            overlay.style.zIndex = this.zIndex - 1;

            // 添加点击事件
            if (this.closeOnClickOverlay) {
                overlay.addEventListener("click", this.toggleCollapse);
            }

            document.body.appendChild(overlay);
            setTimeout(() => {
                overlay.style.opacity = "1";
            }, 0);
        },
        hideOverlay() {
            const overlay = document.querySelector(".fanc-fixed-nav__overlay");
            if (overlay) {
                overlay.style.opacity = "0";
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            }
        },
    },
    beforeDestroy() {
        // 组件销毁时移除遮罩层
        const overlay = document.querySelector(".fanc-fixed-nav__overlay");
        if (overlay) {
            document.body.removeChild(overlay);
        }
    },
};
</script>

<style>
.fanc-fixed-nav {
    position: fixed;
    display: flex;
    box-sizing: border-box;
    transition: all var(--fixed-nav-transition-duration);
}

.fanc-fixed-nav--horizontal {
    flex-direction: row;
}

.fanc-fixed-nav--vertical {
    flex-direction: column;
}

.fanc-fixed-nav__main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--fixed-nav-size);
    height: var(--fixed-nav-size);
    border-radius: var(--fixed-nav-border-radius);
    background-color: var(--fixed-nav-bg-color);
    box-shadow: var(--fixed-nav-shadow);
    cursor: pointer;
    transition: all var(--fixed-nav-transition-duration);
    z-index: 2;
}

.fanc-fixed-nav__main--active {
    transform: rotate(180deg);
}

.fanc-fixed-nav__main-text {
    margin-left: 4px;
    font-size: var(--fixed-nav-font-size);
    color: var(--fixed-nav-text-color);
}

.fanc-fixed-nav__items {
    display: flex;
    overflow: hidden;
    transition: all var(--fixed-nav-transition-duration) ease;
}

.fanc-fixed-nav--horizontal .fanc-fixed-nav__items {
    height: var(--fixed-nav-size);
    width: 0;
    margin-right: var(--fixed-nav-item-spacing);
}

.fanc-fixed-nav--vertical .fanc-fixed-nav__items {
    width: auto;
    height: 0;
    margin-bottom: var(--fixed-nav-item-spacing);
    flex-direction: column;
}

.fanc-fixed-nav--horizontal .fanc-fixed-nav__items--visible {
    width: auto;
}

.fanc-fixed-nav--vertical .fanc-fixed-nav__items--visible {
    height: auto;
}

.fanc-fixed-nav__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--fixed-nav-size);
    height: var(--fixed-nav-size);
    border-radius: var(--fixed-nav-border-radius);
    background-color: var(--fixed-nav-bg-color);
    box-shadow: var(--fixed-nav-item-shadow);
    margin: 0 var(--fixed-nav-item-spacing) 0 0;
    cursor: pointer;
    transition: all var(--fixed-nav-transition-duration);
    position: relative;
}

.fanc-fixed-nav--vertical .fanc-fixed-nav__item {
    margin: 0 0 var(--fixed-nav-item-spacing) 0;
}

.fanc-fixed-nav__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-fixed-nav__text {
    margin-left: 4px;
    font-size: var(--fixed-nav-font-size);
    color: var(--fixed-nav-text-color);
}

.fanc-fixed-nav__badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: var(--fixed-nav-badge-size);
    height: var(--fixed-nav-badge-size);
    line-height: var(--fixed-nav-badge-size);
    border-radius: calc(var(--fixed-nav-badge-size) / 2);
    font-size: var(--fixed-nav-badge-font-size);
    text-align: center;
    padding: 0 4px;
    background-color: var(--fixed-nav-badge-bg-color);
    color: var(--fixed-nav-badge-text-color);
    box-sizing: border-box;
}

.fanc-fixed-nav__badge--dot {
    width: var(--fixed-nav-badge-dot-size);
    height: var(--fixed-nav-badge-dot-size);
    min-width: 0;
    padding: 0;
}

.fanc-fixed-nav__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--fixed-nav-overlay-bg-color);
    z-index: 99;
    opacity: 0;
    transition: opacity var(--fixed-nav-transition-duration);
}

/* 主题样式 */
.fanc-fixed-nav--primary .fanc-fixed-nav__main {
    background-color: var(--fixed-nav-primary-bg-color);
    color: var(--white);
}

.fanc-fixed-nav--primary .fanc-fixed-nav__main-text {
    color: var(--white);
}

.fanc-fixed-nav--success .fanc-fixed-nav__main {
    background-color: var(--fixed-nav-success-bg-color);
    color: var(--white);
}

.fanc-fixed-nav--success .fanc-fixed-nav__main-text {
    color: var(--white);
}

.fanc-fixed-nav--warning .fanc-fixed-nav__main {
    background-color: var(--fixed-nav-warning-bg-color);
    color: var(--white);
}

.fanc-fixed-nav--warning .fanc-fixed-nav__main-text {
    color: var(--white);
}

.fanc-fixed-nav--danger .fanc-fixed-nav__main {
    background-color: var(--fixed-nav-danger-bg-color);
    color: var(--white);
}

.fanc-fixed-nav--danger .fanc-fixed-nav__main-text {
    color: var(--white);
}

.fanc-fixed-nav--info .fanc-fixed-nav__main {
    background-color: var(--fixed-nav-info-bg-color);
    color: var(--white);
}

.fanc-fixed-nav--info .fanc-fixed-nav__main-text {
    color: var(--white);
}

/* 激活项样式 */
.fanc-fixed-nav__item--active {
    background-color: var(--fixed-nav-active-bg-color);
    color: var(--fixed-nav-active-text-color);
}

.fanc-fixed-nav__item--active .fanc-fixed-nav__text {
    color: var(--fixed-nav-active-text-color);
}
</style>
