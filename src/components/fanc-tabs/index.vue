<template>
    <view class="fanc-tabs">
        <!-- 标签栏 -->
        <scroll-view
            scroll-x
            :scroll-left="scrollLeft"
            class="fanc-tabs__nav"
            :class="[`fanc-tabs__nav--${type}`, { 'fanc-tabs__nav--border': border }]"
            :style="{ background: background }"
            @scroll="onScroll"
        >
            <view class="fanc-tabs__nav-wrap">
                <view
                    v-for="(item, index) in getTabs()"
                    :key="index"
                    class="fanc-tabs__tab"
                    :class="{
                        'fanc-tabs__tab--active': currentIndex === index,
                        'fanc-tabs__tab--disabled': item.disabled,
                    }"
                    :style="{
                        color:
                            type === 'card'
                                ? currentIndex === index
                                    ? '#ffffff'
                                    : inactiveColor
                                : currentIndex === index
                                ? activeColor
                                : inactiveColor,
                        'font-size': `${fontSize}px`,
                    }"
                    @click="onTabClick(index)"
                >
                    <!-- 使用具名插槽自定义标签 -->
                    <slot :name="`title-${index}`" :active="currentIndex === index" :item="item">
                        <view class="fanc-tabs__tab-text">{{ item.title }}</view>
                    </slot>
                </view>

                <!-- 底部条 -->
                <view
                    v-if="type === 'line'"
                    class="fanc-tabs__line"
                    :style="{
                        transform: `translateX(${lineOffsetLeft}px)`,
                        width: `${lineWidth}px`,
                        height: `${lineHeight}px`,
                        background: activeColor,
                        bottom: `${lineBottom}px`,
                    }"
                ></view>
            </view>
        </scroll-view>

        <!-- 内容区域 -->
        <view class="fanc-tabs__content">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancTabs",

    props: {
        // 当前选中标签的索引或名称
        value: {
            type: [Number, String],
            default: 0,
        },

        // 标签数据，可以直接传入，也可以通过子组件自动收集
        tabs: {
            type: Array,
            default: () => [],
        },

        // 样式类型，可选值为 card/line
        type: {
            type: String,
            default: "line",
        },

        // 标签栏背景色
        background: {
            type: String,
            default: "#ffffff",
        },

        // 是否显示标签栏下边框
        border: {
            type: Boolean,
            default: true,
        },

        // 标签文字大小
        fontSize: {
            type: Number,
            default: 14,
        },

        // 标签激活态颜色
        activeColor: {
            type: String,
            default: "var(--fanc-primary-color)",
        },

        // 标签默认态颜色
        inactiveColor: {
            type: String,
            default: "var(--text-primary)",
        },

        // 底部条宽度，默认与文字等宽
        lineWidth: {
            type: Number,
            default: 20,
        },

        // 底部条高度
        lineHeight: {
            type: Number,
            default: 3,
        },

        // 底部条距离底部的距离
        lineBottom: {
            type: Number,
            default: 0,
        },

        // 是否开启切换动画
        animated: {
            type: Boolean,
            default: false,
        },

        // 是否可滑动切换
        swipeable: {
            type: Boolean,
            default: false,
        },

        // 是否粘性布局
        sticky: {
            type: Boolean,
            default: false,
        },

        // 粘性布局吸顶距离
        offsetTop: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            children: [], // 存储子 Tab 组件
            currentIndex: 0,
            scrollLeft: 0,
            lineOffsetLeft: 0,
            tabRects: [],
        };
    },

    created() {
        // 初始化当前索引
        this.setCurrentIndexByValue(this.value);
    },

    watch: {
        value(val) {
            this.setCurrentIndexByValue(val);
        },

        currentIndex() {
            this.updateTabsStatus();
            this.updateLinePosition();
            this.scrollIntoView();
        },

        tabs: {
            handler() {
                this.$nextTick(() => {
                    this.updateTabRects();
                });
            },
            deep: true,
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.updateTabRects();
        });
    },

    methods: {
        // 根据传入的值设置当前索引
        setCurrentIndexByValue(value) {
            if (typeof value === "number") {
                // 如果是数字，直接作为索引
                if (this.currentIndex !== value) {
                    this.currentIndex = value;
                    this.updateTabsStatus();
                    this.updateLinePosition();
                    this.scrollIntoView();
                }
            } else if (typeof value === "string") {
                // 如果是字符串，尝试匹配 name
                const tabs = this.getTabs();
                const index = tabs.findIndex((tab) => tab.name === value);
                if (index !== -1 && this.currentIndex !== index) {
                    this.currentIndex = index;
                    this.updateTabsStatus();
                    this.updateLinePosition();
                    this.scrollIntoView();
                }
            }
        },

        // 获取当前选中标签的值（索引或名称）
        getCurrentValue() {
            const tabs = this.getTabs();
            const currentTab = tabs[this.currentIndex];

            // 如果当前标签有 name 属性，返回 name，否则返回索引
            return currentTab && currentTab.name !== undefined && currentTab.name !== ""
                ? currentTab.name
                : this.currentIndex;
        },

        // 获取标签数据，优先使用 props 中的 tabs，如果没有则从子组件中收集
        getTabs() {
            if (this.tabs && this.tabs.length > 0) {
                return this.tabs;
            }

            return this.children.map((child) => ({
                title: child.title,
                disabled: child.disabled,
                name: child.name,
            }));
        },

        // 点击标签
        onTabClick(index) {
            const tabs = this.getTabs();
            if (tabs[index] && tabs[index].disabled) {
                this.$emit("disabled", index);
                return;
            }

            if (this.currentIndex !== index) {
                this.currentIndex = index;
                // 发送当前值（索引或名称）
                const value = this.getCurrentValue();
                this.$emit("input", value);
                this.$emit("change", value, index);
            }
        },

        // 更新子 Tab 组件的激活状态
        updateTabsStatus() {
            if (this.children && this.children.length) {
                this.children.forEach((child, index) => {
                    child.active = index === this.currentIndex;
                });
            }
        },

        // 滚动事件
        onScroll(e) {
            this.$emit("scroll", e);
        },

        // 更新标签位置信息
        updateTabRects() {
            const query = uni.createSelectorQuery().in(this);
            query
                .selectAll(".fanc-tabs__tab")
                .boundingClientRect((rects) => {
                    if (rects) {
                        this.tabRects = rects;
                        this.updateLinePosition();
                    }
                })
                .exec();
        },

        // 更新底部条位置
        updateLinePosition() {
            if (this.type !== "line" || !this.tabRects[this.currentIndex]) return;

            const rect = this.tabRects[this.currentIndex];
            if (rect) {
                const lineWidth = this.lineWidth || rect.width;
                this.lineOffsetLeft = rect.left + (rect.width - lineWidth) / 2;
            }
        },

        // 将当前标签滚动到可视区域
        scrollIntoView() {
            if (!this.tabRects[this.currentIndex]) return;

            const rect = this.tabRects[this.currentIndex];
            const tabsWidth = this.tabRects.reduce((sum, curr) => sum + curr.width, 0);

            let scrollLeft = rect.left;
            if (tabsWidth > uni.getSystemInfoSync().windowWidth) {
                scrollLeft = scrollLeft - (uni.getSystemInfoSync().windowWidth - rect.width) / 2;
            }

            this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
        },
    },
};
</script>

<style>
.fanc-tabs {
    width: 100%;
    position: relative;
}

.fanc-tabs__nav {
    white-space: nowrap;
    position: relative;
    width: 100%;
    height: 44px;
    overflow: hidden;
}

.fanc-tabs__nav--border::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--border-color);
    transform: scaleY(0.5);
}

.fanc-tabs__nav-wrap {
    display: flex;
    position: relative;
    height: 100%;
}

.fanc-tabs__tab {
    flex: 1;
    min-width: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    position: relative;
    cursor: pointer;
    height: 100%;
    box-sizing: border-box;
    transition: color 0.3s;
}

.fanc-tabs__tab--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.fanc-tabs__tab-text {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.fanc-tabs__line {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    transition: transform 0.3s ease;
    border-radius: 3px;
}

.fanc-tabs__nav--card {
    padding: 3px;
    box-sizing: border-box;
    background: #f5f7fa;
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 40px;
}

.fanc-tabs__nav--card .fanc-tabs__nav-wrap {
    width: 100%;
}

.fanc-tabs__nav--card .fanc-tabs__tab {
    border-radius: 4px;
    margin-right: 2px;
    background: transparent;
    color: var(--text-primary);
    transition: all 0.3s;
    height: 34px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
}

.fanc-tabs__nav--card .fanc-tabs__tab:last-child {
    margin-right: 0;
}

.fanc-tabs__nav--card .fanc-tabs__tab--active {
    background-color: var(--fanc-primary-color);
    color: var(--white);
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
    font-weight: 500;
}

.fanc-tabs__nav--card .fanc-tabs__tab::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s;
}

.fanc-tabs__nav--card .fanc-tabs__tab--active::before {
    opacity: 1;
}

.fanc-tabs__content {
    width: 100%;
    overflow: hidden;
    margin-top: 8px;
}
</style>
