<template>
    <view class="fanc-tabs" :class="{ 'fanc-tabs--card': type === 'card' }">
        <!-- 标签头部区域 -->
        <scroll-view
            class="fanc-tabs__nav"
            :class="[
                `fanc-tabs__nav--${type}`,
                {
                    'fanc-tabs__nav--scrollable': scrollable,
                    'fanc-tabs__nav--fixed': sticky,
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
                    <view class="fanc-tabs__tab-text">{{ item.title }}</view>
                    <view v-if="item.badge" class="fanc-tabs__tab-badge">{{ item.badge }}</view>
                    <view v-if="item.dot" class="fanc-tabs__tab-dot"></view>
                </view>
                <!-- 标签底部条 -->
                <view v-if="type === 'line'" class="fanc-tabs__line" :style="lineStyle"></view>
            </view>
        </scroll-view>

        <!-- 内容区域 -->
        <view class="fanc-tabs__content" :style="contentStyle">
            <view
                class="fanc-tabs__pane"
                :style="{ transform: `translateX(${-100 * currentIndex}%)` }"
            >
                <slot></slot>
            </view>
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
 * @property {Boolean} swipeable - 是否可滑动切换
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
        // 是否可滑动切换
        swipeable: {
            type: Boolean,
            default: false,
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
            touchStartX: 0,
            touchDeltaX: 0,
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
                transform: `translateX(${rect.left + (rect.width - parseFloat(width)) / 2}px)`,
                backgroundColor: this.activeColor || "var(--tabs-active-color)",
                transition: `transform ${this.duration}s`,
            };
        },
        // 内容区域样式
        contentStyle() {
            return {
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
            if (!this.scrollable || !this.tabRects[this.currentIndex]) {
                return;
            }

            const rect = this.tabRects[this.currentIndex];
            const tabWidth = rect.width;
            const offsetLeft = rect.left;

            this.$nextTick(() => {
                this.scrollLeft = offsetLeft - (uni.upx2px(750) - tabWidth) / 2;
            });
        },
        // 处理触摸开始事件
        onTouchStart(event) {
            if (!this.swipeable) return;

            this.touchStartX = event.touches[0].clientX;
            this.touchDeltaX = 0;
        },
        // 处理触摸移动事件
        onTouchMove(event) {
            if (!this.swipeable) return;

            this.touchDeltaX = event.touches[0].clientX - this.touchStartX;
        },
        // 处理触摸结束事件
        onTouchEnd() {
            if (!this.swipeable || Math.abs(this.touchDeltaX) < 50) return;

            if (this.touchDeltaX > 0 && this.currentIndex > 0) {
                // 右滑，切换到前一个标签
                this.currentIndex--;
                this.$emit("change", {
                    index: this.currentIndex,
                    title: this.tabs[this.currentIndex].title,
                });
            } else if (this.touchDeltaX < 0 && this.currentIndex < this.tabs.length - 1) {
                // 左滑，切换到后一个标签
                this.currentIndex++;
                this.$emit("change", {
                    index: this.currentIndex,
                    title: this.tabs[this.currentIndex].title,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-tabs {
    width: 100%;
    position: relative;

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
            height: 36px;
            margin: 0 16px;
            border-radius: 4px;
            border: 1px solid var(--tabs-card-border-color, #e9ecef);
            box-sizing: border-box;
        }

        &--scrollable {
            white-space: nowrap;
            overflow-x: auto;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &--fixed {
            position: sticky;
            top: 0;
            z-index: 99;
        }
    }

    &__nav-wrap {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        height: 100%;
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
        border-right: 1px solid var(--tabs-card-border-color, #e9ecef);

        &:last-child {
            border-right: none;
        }

        &--active {
            background-color: var(--tabs-card-active-bg-color, #007bff);
            color: var(--tabs-card-active-text-color, #fff) !important;
        }
    }

    &__tab-text {
        display: inline-block;
        text-align: center;
    }

    &__tab-badge {
        position: absolute;
        top: -2px;
        right: -4px;
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
        position: relative;
        overflow: hidden;
    }

    &__pane {
        width: 100%;
        transition: transform 0.3s;
        will-change: transform;
    }
}
</style>
