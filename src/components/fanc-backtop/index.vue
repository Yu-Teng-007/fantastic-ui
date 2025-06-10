<template>
    <view
        v-show="visible"
        :class="[
            'fanc-backtop',
            `fanc-backtop--${type}`,
            { 'fanc-backtop--round': round },
            { 'fanc-backtop--shadow': shadow },
        ]"
        :style="customStyle"
        @click="scrollToTop"
    >
        <slot>
            <fanc-icon
                v-if="icon"
                :name="icon"
                :size="iconSize"
                :color="iconColor"
                class="fanc-backtop__icon"
            />
            <text v-if="text" class="fanc-backtop__text">{{ text }}</text>
        </slot>
    </view>
</template>

<script>
/**
 * fanc-backtop 返回顶部
 * @description 提供较长的页面快捷返回顶部功能
 * @tutorial https://www.example.com/docs/components/fanc-backtop.html
 * @property {String} type 类型，可选值为 primary success warning danger info
 * @property {Number} visibilityHeight 滚动高度达到此参数值才出现，单位px
 * @property {Number} duration 回到顶部所需时间（ms）
 * @property {String} icon 图标名称
 * @property {Number} iconSize 图标大小
 * @property {String} iconColor 图标颜色
 * @property {String} text 按钮文字
 * @property {Boolean} round 是否为圆形按钮
 * @property {Boolean} shadow 是否显示阴影
 * @property {String} right 距离页面右边距离
 * @property {String} bottom 距离页面底部距离
 * @property {String} zIndex 层级
 * @property {String} color 自定义背景颜色
 * @property {String} textColor 自定义文字颜色
 * @event {Function} click 点击返回顶部按钮时触发
 */
export default {
    name: "FancBacktop",
    props: {
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
        // 滚动高度达到此参数值才出现
        visibilityHeight: {
            type: Number,
            default: 200,
        },
        // 回到顶部所需时间（ms）
        duration: {
            type: Number,
            default: 300,
        },
        // 图标名称
        icon: {
            type: String,
            default: "arrow-up",
        },
        // 图标大小
        iconSize: {
            type: Number,
            default: 16,
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: "",
        },
        // 按钮文字
        text: {
            type: String,
            default: "",
        },
        // 是否为圆形按钮
        round: {
            type: Boolean,
            default: true,
        },
        // 是否显示阴影
        shadow: {
            type: Boolean,
            default: true,
        },
        // 距离页面右边距离
        right: {
            type: String,
            default: "20px",
        },
        // 距离页面底部距离
        bottom: {
            type: String,
            default: "40px",
        },
        // 层级
        zIndex: {
            type: String,
            default: "10",
        },
        // 自定义背景颜色
        color: {
            type: String,
            default: "",
        },
        // 自定义文字颜色
        textColor: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            visible: false,
            scrollTop: 0,
            observer: null,
            handleScroll: null,
        };
    },
    computed: {
        customStyle() {
            const style = {
                right: this.right,
                bottom: this.bottom,
                zIndex: this.zIndex,
            };

            if (this.color) {
                style.backgroundColor = this.color;
            }

            if (this.textColor) {
                style.color = this.textColor;
            }

            return style;
        },
    },
    mounted() {
        this.initScrollListener();
    },
    beforeDestroy() {
        this.removeScrollListener();
    },
    methods: {
        initScrollListener() {
            // 检查环境，判断是uni-app环境还是浏览器环境
            if (typeof uni !== "undefined" && uni.onPageScroll) {
                // uni-app环境
                uni.onPageScroll(({ scrollTop }) => {
                    this.scrollTop = scrollTop;
                    this.visible = scrollTop >= this.visibilityHeight;
                });
            } else {
                // 浏览器环境
                this.handleScroll = () => {
                    this.scrollTop =
                        window.pageYOffset ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop;
                    this.visible = this.scrollTop >= this.visibilityHeight;
                };
                window.addEventListener("scroll", this.handleScroll);
                // 初始检查
                this.handleScroll();
            }
        },
        removeScrollListener() {
            if (typeof uni !== "undefined" && uni.offPageScroll) {
                uni.offPageScroll();
            } else {
                window.removeEventListener("scroll", this.handleScroll);
            }
        },
        scrollToTop() {
            if (typeof uni !== "undefined" && uni.pageScrollTo) {
                // uni-app环境
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: this.duration,
                });

                // 成功提示
                if (this.$toast && this.$toast.success) {
                    this.$toast.success("已返回顶部");
                }
            } else {
                // 浏览器环境
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }

            this.$emit("click");
        },
    },
};
</script>

<style>
.fanc-backtop {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
}

.fanc-backtop--default {
    background-color: var(--bg-white);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.fanc-backtop--primary {
    background-color: var(--fanc-primary-color);
    color: var(--white);
}

.fanc-backtop--success {
    background-color: var(--fanc-success-color);
    color: var(--white);
}

.fanc-backtop--warning {
    background-color: var(--fanc-warning-color);
    color: var(--white);
}

.fanc-backtop--danger {
    background-color: var(--fanc-danger-color);
    color: var(--white);
}

.fanc-backtop--info {
    background-color: var(--fanc-info-color);
    color: var(--white);
}

.fanc-backtop--round {
    border-radius: 50%;
}

.fanc-backtop--shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.fanc-backtop__icon {
    margin-bottom: 2px;
}

.fanc-backtop__text {
    font-size: 12px;
    line-height: 1;
}
</style>
