<template>
    <view class="fanc-tabs" :class="{ 'fanc-tabs--card': type === 'card' }">
        <!-- 粘性布局占位符 -->
        <view
            v-if="sticky && isFixed"
            class="fanc-tabs__sticky-placeholder"
            :style="{ height: navHeight + 'px' }"
        ></view>

        <!-- 标签头部区域 -->
        <view
            class="fanc-tabs__nav-container"
            :class="{ 'fanc-tabs__nav-container--sticky': sticky && isFixed }"
        >
            <scroll-view
                class="fanc-tabs__nav"
                :class="[
                    `fanc-tabs__nav--${type}`,
                    {
                        'fanc-tabs__nav--scrollable': scrollable,
                    },
                ]"
                scroll-x
                :scroll-with-animation="true"
                :scroll-left="scrollLeft"
            >
                <view class="fanc-tabs__nav-wrap">
                    <view
                        class="fanc-tabs__tab"
                        v-for="(item, index) in tabs"
                        :key="index"
                        :class="[
                            {
                                'fanc-tabs__tab--active': currentIndex === index,
                                'fanc-tabs__tab--disabled': item.disabled,
                            },
                        ]"
                        :style="tabStyle(index)"
                        @click="onTabClick(index, item)"
                    >
                        <view class="fanc-tabs__tab-text">
                            {{ item.title }}
                            <view v-if="item.badge" class="fanc-tabs__tab-badge">{{
                                item.badge
                            }}</view>
                            <view v-if="item.dot" class="fanc-tabs__tab-dot"></view>
                        </view>
                    </view>
                    <!-- 标签底部条 -->
                    <view v-if="type === 'line'" class="fanc-tabs__line" :style="lineStyle"></view>
                </view>
            </scroll-view>
        </view>

        <!-- 内容区域 -->
        <view class="fanc-tabs__content">
            <slot></slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-tabs 选项卡
 * @description 选项卡组件，用于内容分类后的展示切换
 * @property {String} type - 选项卡样式类型，可选值为 line/card
 * @property {Array} tabs - 选项卡标题数组，格式为 [{title: '标签1', disabled: false}]
 * @property {Number} active - 当前激活的标签索引
 * @property {Boolean} animated - 是否启用切换动画
 * @property {Boolean} scrollable - 是否可滚动
 * @property {Boolean} sticky - 是否使用粘性布局
 * @property {Number} duration - 动画时长，单位秒
 * @property {String} lineWidth - 底部条宽度，默认单位px
 * @property {String} lineHeight - 底部条高度，默认单位px
 * @property {String} activeColor - 激活状态颜色
 * @property {String} inactiveColor - 未激活状态颜色
 * @property {String} bgColor - 背景颜色
 * @event {Function} change - 切换标签时触发
 * @event {Function} click - 点击标签时触发
 * @event {Function} disabled - 点击禁用标签时触发
 */
export default {
    name: "fanc-tabs",
    props: {
        // 选项卡样式类型
        type: {
            type: String,
            default: "line",
            validator: (value) => ["line", "card"].includes(value),
        },
        // 选项卡标题数组
        tabs: {
            type: Array,
            default: () => [],
        },
        // 当前激活的标签索引
        active: {
            type: Number,
            default: 0,
        },
        // 是否启用切换动画
        animated: {
            type: Boolean,
            default: true,
        },
        // 是否可滚动
        scrollable: {
            type: Boolean,
            default: false,
        },
        // 是否使用粘性布局
        sticky: {
            type: Boolean,
            default: false,
        },
        // 动画时长，单位秒
        duration: {
            type: Number,
            default: 0.3,
        },
        // 底部条宽度
        lineWidth: {
            type: String,
            default: "20px",
        },
        // 底部条高度
        lineHeight: {
            type: String,
            default: "3px",
        },
        // 激活状态颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 未激活状态颜色
        inactiveColor: {
            type: String,
            default: "",
        },
        // 背景颜色
        bgColor: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            currentIndex: this.active,
            tabRects: [],
            scrollLeft: 0,
            containerLeft: 0,
            isFixed: false,
            navHeight: 0,
            scrollTop: 0,
            navOffsetTop: 0,
        };
    },
    computed: {
        // 底部条样式
        lineStyle() {
            if (!this.tabRects[this.currentIndex]) {
                return {};
            }

            const rect = this.tabRects[this.currentIndex];
            const width = this.lineWidth === "auto" ? `${rect.width}px` : this.lineWidth;

            return {
                width: width,
                height: this.lineHeight,
                transform: `translateX(${
                    rect.left - this.containerLeft + (rect.width - parseFloat(width)) / 2
                }px)`,
                backgroundColor: this.activeColor || "var(--tabs-active-color)",
                transition: this.animated ? `transform ${this.duration}s` : "none",
            };
        },
    },
    watch: {
        active(val) {
            this.currentIndex = val;
            this.updateTabPosition();
        },
        tabs: {
            handler() {
                this.$nextTick(() => {
                    this.updateTabRects();
                });
            },
            deep: true,
        },
        currentIndex() {
            this.updateTabPosition();
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.updateTabRects();
            this.getContainerLeft();
            if (this.sticky) {
                this.initStickyLayout();
            }
        });
    },
    methods: {
        // 标签样式
        tabStyle(index) {
            const style = {};

            if (this.currentIndex === index) {
                style.color = this.activeColor || "var(--tabs-active-color)";
                if (this.type === "card") {
                    style.backgroundColor = this.bgColor || "var(--tabs-card-active-bg-color)";
                }
            } else {
                style.color = this.inactiveColor || "var(--tabs-inactive-color)";
                if (this.type === "card") {
                    style.backgroundColor = "transparent";
                }
            }

            return style;
        },
        // 点击标签事件
        onTabClick(index, item) {
            if (item.disabled) {
                this.$emit("disabled", { index, title: item.title });
                return;
            }

            if (index !== this.currentIndex) {
                this.currentIndex = index;
                this.$emit("change", { index, title: item.title });
            }

            this.$emit("click", { index, title: item.title });
        },
        // 更新标签位置信息
        updateTabRects() {
            const query = uni.createSelectorQuery().in(this);
            query
                .selectAll(".fanc-tabs__tab")
                .boundingClientRect((rects) => {
                    this.tabRects = rects;
                    this.updateTabPosition();
                })
                .exec();
        },
        // 更新标签滚动位置
        updateTabPosition() {
            if (!this.scrollable || !this.tabRects[this.currentIndex]) return;

            const rect = this.tabRects[this.currentIndex];
            const screenWidth = uni.upx2px(750);

            this.$nextTick(() => {
                this.scrollLeft = Math.max(0, rect.left - (screenWidth - rect.width) / 2);
            });
        },
        // 已移除轮播图组件，此方法不再需要
        // onSwiperChange(e) {
        //     const current = e.detail.current;
        //     if (current !== this.currentIndex) {
        //         this.currentIndex = current;
        //         this.$emit("change", {
        //             index: current,
        //             title: this.tabs[current].title,
        //         });
        //     }
        // },
        // 获取tabs容器左侧的位置偏移
        getContainerLeft() {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(".fanc-tabs")
                .boundingClientRect((data) => {
                    if (data && typeof data.left === "number") {
                        this.containerLeft = data.left;
                        this.updateTabRects();
                    }
                })
                .exec();
        },
        // 初始化粘性布局
        initStickyLayout() {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(".fanc-tabs__nav-container")
                .boundingClientRect((rect) => {
                    if (rect) {
                        this.navHeight = rect.height;
                        this.navOffsetTop = rect.top;

                        // 设置初始状态
                        this.checkStickyPosition();

                        // 添加页面滚动监听
                        uni.$on("page-scroll", this.checkStickyPosition);
                    }
                })
                .exec();

            // 创建页面滚动监听（在页面中使用）
            this.$emit("init-sticky", {
                componentId: this._uid,
            });
        },

        // 检查是否需要固定
        checkStickyPosition(scrollTop) {
            // 如果没有传入scrollTop，尝试获取当前页面滚动位置
            if (scrollTop === undefined) {
                // 使用setTimeout避免在某些平台上的警告
                setTimeout(() => {
                    uni.pageScrollTo({
                        scrollTop: 0,
                        duration: 0,
                    });

                    // 此时页面会滚动到顶部，我们可以检测初始位置
                    this.isFixed = false;
                }, 0);
                return;
            }

            this.scrollTop = scrollTop;
            this.isFixed = scrollTop >= this.navOffsetTop;
        },

        // 组件销毁时移除监听
        beforeDestroy() {
            if (this.sticky) {
                uni.$off("page-scroll", this.checkStickyPosition);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-tabs {
    width: 100%;
    position: relative;

    &__sticky-placeholder {
        width: 100%;
    }

    &__nav-container {
        width: 100%;
        background-color: var(--tabs-nav-bg-color, #fff);

        &--sticky {
            position: fixed;
            top: var(--window-top, 0);
            left: 0;
            right: 0;
            z-index: 99;
        }
    }

    &__nav {
        position: relative;
        display: flex;
        background-color: var(--tabs-nav-bg-color, #fff);
        overflow: hidden;

        &--line {
            height: 44px;
            border-bottom: 1px solid var(--tabs-nav-border-color, #f2f2f2);
        }

        &--card {
            height: 40px;
            border-radius: 8px;
            border: 1px solid var(--tabs-card-border-color, #e9ecef);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            box-sizing: border-box;
            background-color: var(--tabs-card-bg-color, #f8f9fa);
            padding: 2px;
        }

        &--scrollable {
            white-space: nowrap;
            overflow-x: auto;

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }

    &__nav-wrap {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
    }

    &__tab {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 12px;
        font-size: 14px;
        line-height: 20px;
        color: var(--tabs-inactive-color, #646566);
        cursor: pointer;
        height: 100%;

        &--active {
            font-weight: 500;
            color: var(--tabs-active-color, #007bff);
        }

        &--disabled {
            color: var(--tabs-disabled-color, #c8c9cc) !important;
            cursor: not-allowed;
        }
    }

    &--card &__tab {
        position: relative;
        margin: 0 2px;
        border-radius: 6px;
        border: none;
        transition: all 0.3s ease;
        height: calc(100% - 4px);

        &:hover {
            background-color: var(--tabs-card-hover-bg-color, rgba(0, 0, 0, 0.05));
        }

        &--active {
            background-color: var(--tabs-card-active-bg-color, #007bff);
            color: var(--tabs-card-active-text-color, #fff) !important;
            box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
            transform: translateY(-1px);
        }
    }

    &__tab-text {
        display: inline-block;
        text-align: center;
        position: relative;
    }

    &__tab-badge {
        position: absolute;
        top: -4px;
        right: -8px;
        min-width: 16px;
        height: 16px;
        line-height: 16px;
        padding: 0 4px;
        font-size: 10px;
        color: #fff;
        background-color: var(--tabs-badge-color, #ee0a24);
        border-radius: 8px;
        text-align: center;
        box-sizing: border-box;
        transform: translate(50%, -50%);
    }

    &__tab-dot {
        position: absolute;
        top: -2px;
        right: -4px;
        width: 8px;
        height: 8px;
        background-color: var(--tabs-badge-color, #ee0a24);
        border-radius: 50%;
        transform: translate(50%, -50%);
    }

    &__line {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        height: 3px;
        border-radius: 3px;
        background-color: var(--tabs-active-color, #007bff);
        transition: transform 0.3s;
    }

    &__content {
        width: 100%;
    }

    &__content-item {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    &__scroll-view {
        height: 100%;
        width: 100%;
    }

    &__pane {
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
