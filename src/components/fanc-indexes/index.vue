<template>
    <view class="fanc-indexes" :style="computedStyle">
        <!-- 侧边栏索引 -->
        <view
            class="fanc-indexes__sidebar"
            :class="{ 'fanc-indexes__sidebar--right': position === 'right' }"
        >
            <view
                v-for="(anchor, index) in anchors"
                :key="index"
                class="fanc-indexes__sidebar-item"
                :class="{ 'fanc-indexes__sidebar-item--active': currentIndex === index }"
                @click="onIndexClick(anchor, index)"
            >
                {{ anchor }}
            </view>
        </view>

        <!-- 内容区域 -->
        <scroll-view
            class="fanc-indexes__content"
            scroll-y
            :scroll-into-view="scrollIntoView"
            :scroll-top="scrollTop"
            @scroll="onScroll"
        >
            <slot name="top"></slot>
            <view class="fanc-indexes__body">
                <block v-for="(anchor, index) in anchors" :key="index">
                    <view :id="getAnchorId(anchor)" class="fanc-indexes__anchor">
                        {{ anchor }}
                    </view>
                    <slot :name="anchor">
                        <view
                            v-for="(item, itemIndex) in getItemsByAnchor(anchor)"
                            :key="itemIndex"
                            class="fanc-indexes__item"
                            @click="onItemClick(item, anchor)"
                        >
                            <slot name="item" :item="item" :anchor="anchor">
                                {{ item.text || item }}
                            </slot>
                        </view>
                    </slot>
                </block>
            </view>
            <slot name="bottom"></slot>
        </scroll-view>
    </view>
</template>

<script>
export default {
    name: "FancIndexes",

    props: {
        // 索引字符列表
        indexList: {
            type: Array,
            default: () => {
                // 默认为A-Z字母表
                const indexList = [];
                const charCodeOfA = "A".charCodeAt(0);

                for (let i = 0; i < 26; i++) {
                    indexList.push(String.fromCharCode(charCodeOfA + i));
                }

                return indexList;
            },
        },
        // 高亮的索引
        highlightedIndex: {
            type: [Number, String],
            default: 0,
        },
        // 每个字母下的数据
        data: {
            type: Object,
            default: () => ({}),
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: () => ({}),
        },
        // 侧边栏位置
        position: {
            type: String,
            default: "right",
            validator: (value) => ["left", "right"].includes(value),
        },
        // 是否显示锚点背景
        showAnchor: {
            type: Boolean,
            default: true,
        },
        // 页面滚动节流时间
        throttle: {
            type: [Number, String],
            default: 100,
        },
        // 滚动到指定锚点
        scrollToAnchor: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            currentIndex: 0,
            scrollTop: 0,
            scrollIntoView: "",
            anchorPositions: [],
            lastScrollTop: 0,
            timer: null,
        };
    },

    computed: {
        // 获取所有锚点
        anchors() {
            return this.indexList.filter((index) => {
                if (this.data) {
                    return this.data[index] && this.data[index].length > 0;
                }
                return true;
            });
        },

        // 计算组件样式
        computedStyle() {
            return {
                ...this.customStyle,
            };
        },
    },

    watch: {
        scrollToAnchor(val) {
            if (val && this.anchors.includes(val)) {
                this.scrollTo(val);
            }
        },

        highlightedIndex(val) {
            this.currentIndex = Number(val);
        },

        data() {
            this.$nextTick(() => {
                this.updateAnchorPositions();
            });
        },
    },

    mounted() {
        this.currentIndex = Number(this.highlightedIndex);
        this.$nextTick(() => {
            this.updateAnchorPositions();
        });
    },

    methods: {
        // 获取锚点ID
        getAnchorId(anchor) {
            return `fanc-indexes-anchor-${anchor}`;
        },

        // 根据锚点获取对应的数据项
        getItemsByAnchor(anchor) {
            if (this.data && this.data[anchor]) {
                return this.data[anchor];
            }
            return [];
        },

        // 点击侧边栏索引
        onIndexClick(anchor, index) {
            this.currentIndex = index;
            this.scrollTo(anchor);
            this.$emit("select", {
                anchor,
                index,
            });
        },

        // 点击列表项
        onItemClick(item, anchor) {
            this.$emit("click", {
                item,
                anchor,
            });
        },

        // 滚动到指定锚点
        scrollTo(anchor) {
            this.scrollIntoView = this.getAnchorId(anchor);
        },

        // 监听滚动事件
        onScroll(event) {
            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(() => {
                const { scrollTop } = event.detail;
                this.lastScrollTop = scrollTop;
                this.updateActiveAnchorByScroll(scrollTop);
            }, this.throttle);
        },

        // 更新锚点位置信息
        updateAnchorPositions() {
            const query = uni.createSelectorQuery().in(this);

            this.anchors.forEach((anchor) => {
                query.select(`#${this.getAnchorId(anchor)}`).boundingClientRect();
            });

            query.exec((rects) => {
                if (Array.isArray(rects) && rects.length) {
                    this.anchorPositions = rects.map((rect) => ({
                        anchor: rect.id.replace("fanc-indexes-anchor-", ""),
                        top: rect.top,
                        height: rect.height,
                    }));
                }
            });
        },

        // 根据滚动位置更新当前激活的锚点
        updateActiveAnchorByScroll(scrollTop) {
            if (!this.anchorPositions.length) {
                return;
            }

            const positions = this.anchorPositions.map((item, index) => ({
                ...item,
                index,
            }));

            // 按位置排序
            positions.sort((a, b) => a.top - b.top);

            // 查找当前滚动位置对应的锚点
            for (let i = 0; i < positions.length; i++) {
                const current = positions[i];
                const next = positions[i + 1];

                if (
                    (i === 0 && scrollTop < current.top) ||
                    (scrollTop >= current.top && (!next || scrollTop < next.top))
                ) {
                    // 找到对应的锚点
                    const anchorIndex = this.anchors.findIndex(
                        (anchor) => anchor === current.anchor
                    );

                    if (anchorIndex !== this.currentIndex) {
                        this.currentIndex = anchorIndex;
                        this.$emit("change", {
                            anchor: current.anchor,
                            index: anchorIndex,
                        });
                    }

                    break;
                }
            }
        },
    },
};
</script>

<style>
.fanc-indexes {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background-color: var(--indexes-item-bg-color, #fff);
    z-index: var(--indexes-z-index, 1);
}

.fanc-indexes__sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    z-index: var(--indexes-sidebar-z-index, 2);
    background-color: var(--indexes-sidebar-bg-color, transparent);
}

.fanc-indexes__sidebar--right {
    right: 0;
}

.fanc-indexes__sidebar--left {
    left: 0;
}

.fanc-indexes__sidebar-item {
    padding: var(--indexes-sidebar-item-padding, 0 8px);
    font-size: var(--indexes-sidebar-font-size, 12px);
    line-height: var(--indexes-sidebar-item-height, 16px);
    color: var(--indexes-sidebar-text-color, #969799);
    cursor: pointer;
    border-radius: 8px;
}

.fanc-indexes__sidebar-item--active {
    color: var(--indexes-sidebar-active-color, #007bff);
    background-color: var(--indexes-sidebar-active-bg-color, #f2f3f5);
}

.fanc-indexes__content {
    flex: 1;
    height: 100%;
    overflow: hidden;
}

.fanc-indexes__body {
    padding-right: 20px;
}

.fanc-indexes__anchor {
    padding: 8px 16px;
    font-size: var(--indexes-anchor-font-size, 14px);
    font-weight: 500;
    color: var(--indexes-anchor-text-color, #969799);
    background-color: var(--indexes-anchor-bg-color, #f7f8fa);
    box-sizing: border-box;
}

.fanc-indexes__item {
    position: relative;
    padding: 0 16px;
    font-size: var(--indexes-item-font-size, 14px);
    line-height: var(--indexes-item-line-height, 48px);
    color: var(--indexes-item-text-color, #323233);
    background-color: var(--indexes-item-bg-color, #fff);
    cursor: pointer;
}

.fanc-indexes__item:not(:last-child)::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 16px;
    height: 1px;
    background-color: var(--indexes-item-border-color, #ebedf0);
    transform: scaleY(0.5);
    content: "";
}

.fanc-indexes__item:active {
    background-color: var(--indexes-item-active-bg-color, #f2f3f5);
}
</style>
