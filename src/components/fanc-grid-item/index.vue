<template>
    <view
        class="fanc-grid-item"
        :class="[
            square ? 'fanc-grid-item--square' : '',
            clickable ? 'fanc-grid-item--clickable' : '',
            border ? 'fanc-grid-item--bordered' : '',
            direction === 'horizontal' ? 'fanc-grid-item--horizontal' : '',
            theme ? `fanc-grid-item--${theme}` : '',
        ]"
        :style="gridItemStyle"
        @click="onClick"
    >
        <view class="fanc-grid-item__wrapper" :style="wrapperStyle">
            <view class="fanc-grid-item__content">
                <!-- 图标区域 -->
                <view class="fanc-grid-item__icon" v-if="icon || $slots.icon">
                    <slot name="icon">
                        <fanc-icon :name="icon" :size="iconSize" :color="iconColor" />
                    </slot>
                </view>

                <!-- 文本区域 -->
                <view class="fanc-grid-item__text">
                    <slot name="text">
                        <text class="fanc-grid-item__text-content">{{ text }}</text>
                    </slot>
                </view>

                <!-- 自定义内容区域 -->
                <slot></slot>

                <!-- 右上角徽标 -->
                <view
                    v-if="badge !== '' || dot"
                    :class="['fanc-grid-item__badge', dot ? 'fanc-grid-item__badge--dot' : '']"
                >
                    <view class="fanc-grid-item__badge-dot" v-if="dot"></view>
                    <text class="fanc-grid-item__badge-text" v-else-if="badge !== ''">{{
                        badge
                    }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-grid-item",

    inject: {
        grid: {
            default: null,
        },
    },

    props: {
        // 文字
        text: {
            type: String,
            default: "",
        },
        // 图标名称
        icon: {
            type: String,
            default: "",
        },
        // 图标尺寸
        iconSize: {
            type: [Number, String],
            default: 28,
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: "",
        },
        // 徽标内容
        badge: {
            type: [Number, String],
            default: "",
        },
        // 是否展示为小红点
        dot: {
            type: Boolean,
            default: false,
        },
        // 点击后跳转的链接地址
        url: {
            type: String,
            default: "",
        },
        // 点击后跳转的路由对象
        to: {
            type: [String, Object],
            default: "",
        },
        // 主题色，会覆盖父组件的主题色
        theme: {
            type: String,
            default: "",
            validator: (value) => {
                return ["", "primary", "success", "warning", "danger", "info"].includes(value);
            },
        },
    },

    computed: {
        // 从父组件获取属性
        square() {
            return this.grid?.square;
        },
        clickable() {
            return this.grid?.clickable || this.url || this.to;
        },
        columnNum() {
            return this.grid?.columnNum || 4;
        },
        border() {
            return this.grid?.bordered;
        },
        gutter() {
            return this.grid?.gutter || 0;
        },
        direction() {
            return this.grid?.direction || "vertical";
        },
        parentTheme() {
            return this.grid?.theme || "";
        },

        // 计算样式
        gridItemStyle() {
            const width = `${100 / this.columnNum}%`;
            const halfGutter = this.gutter / 2;

            if (this.gutter > 0) {
                return {
                    width,
                    paddingLeft: `${halfGutter}px`,
                    paddingRight: `${halfGutter}px`,
                    paddingTop: `${halfGutter}px`,
                    paddingBottom: `${halfGutter}px`,
                };
            } else {
                return {
                    width,
                };
            }
        },
        wrapperStyle() {
            if (this.gutter > 0) {
                return {
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    overflow: "hidden",
                };
            } else {
                return {};
            }
        },
    },

    methods: {
        onClick() {
            this.$emit("click");

            // 处理链接跳转
            if (this.url) {
                uni.navigateTo({
                    url: this.url,
                });
                return;
            }

            // 处理路由跳转
            if (this.to) {
                if (typeof this.to === "string") {
                    uni.navigateTo({
                        url: this.to,
                    });
                } else {
                    const { type = "navigateTo", url } = this.to;
                    if (url) {
                        uni[type]({
                            url,
                        });
                    }
                }
            }
        },
    },
};
</script>

<style>
.fanc-grid-item {
    position: relative;
    box-sizing: border-box;
}

.fanc-grid-item--square .fanc-grid-item__wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
}

.fanc-grid-item--square .fanc-grid-item__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

/* 无间距时的边框样式 */
.fanc-grid-item--bordered:not([style*="padding"]) {
    position: relative;
    box-shadow: 1px 1px 0 0 var(--border-color, #ebedf0);
}

/* 有间距时的边框样式 */
.fanc-grid-item--bordered[style*="padding"] .fanc-grid-item__wrapper {
    border: 1px solid var(--border-color, #ebedf0);
}

.fanc-grid-item--bordered::after {
    content: none;
}

/* 无间距时的点击效果 */
.fanc-grid-item--clickable:not([style*="padding"]):active {
    background-color: var(--bg-gray-light, #f5f5f5);
}

/* 有间距时的点击效果 */
.fanc-grid-item--clickable[style*="padding"] .fanc-grid-item__wrapper:active {
    background-color: var(--bg-gray-light, #f5f5f5);
}

.fanc-grid-item__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.2s;
}

.fanc-grid-item__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding: 16px 8px;
}

.fanc-grid-item--horizontal .fanc-grid-item__content {
    flex-direction: row;
}

.fanc-grid-item__icon {
    font-size: 28px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-grid-item--horizontal .fanc-grid-item__icon {
    margin-right: 8px;
    margin-bottom: 0;
}

.fanc-grid-item__text {
    color: var(--text-primary, #323233);
}

.fanc-grid-item__text-content {
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
    text-align: center;
}

.fanc-grid-item--horizontal .fanc-grid-item__text-content {
    text-align: left;
}

.fanc-grid-item__badge {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    background-color: var(--fanc-danger-color, #ee0a24);
    border-radius: 16px;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    white-space: nowrap;
}

/* 圆点徽标样式 */
.fanc-grid-item__badge--dot {
    min-width: unset;
    width: auto;
    height: auto;
    padding: 0;
    background-color: transparent;
}

.fanc-grid-item__badge-dot {
    width: 8px;
    height: 8px;
    background-color: var(--fanc-danger-color, #ee0a24);
    border-radius: 100%;
}

/* 主题 */
.fanc-grid-item--primary .fanc-grid-item__icon {
    color: var(--fanc-primary-color, #1989fa);
}

.fanc-grid-item--success .fanc-grid-item__icon {
    color: var(--fanc-success-color, #07c160);
}

.fanc-grid-item--warning .fanc-grid-item__icon {
    color: var(--fanc-warning-color, #ff976a);
}

.fanc-grid-item--danger .fanc-grid-item__icon {
    color: var(--fanc-danger-color, #ee0a24);
}

.fanc-grid-item--info .fanc-grid-item__icon {
    color: var(--fanc-info-color, #909399);
}
</style>
