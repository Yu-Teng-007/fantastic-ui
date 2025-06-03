<template>
    <view class="fanc-list" :class="{ 'fanc-list--loading': loading }">
        <!-- 列表项容器 -->
        <view class="fanc-list__content" :style="{ height: customHeight || 'auto' }">
            <slot></slot>
        </view>

        <!-- 底部加载状态 -->
        <view class="fanc-list__footer" v-if="loading || noMore || error">
            <!-- 加载中状态 -->
            <view v-if="loading" class="fanc-list__loading">
                <view class="fanc-list__loading-spinner"></view>
                <text class="fanc-list__loading-text">{{ loadingText }}</text>
            </view>

            <!-- 无更多数据状态 -->
            <view v-else-if="noMore" class="fanc-list__no-more">
                <text class="fanc-list__no-more-text">{{ noMoreText }}</text>
            </view>

            <!-- 加载错误状态 -->
            <view v-else-if="error" class="fanc-list__error">
                <text class="fanc-list__error-text">{{ errorText }}</text>
                <view class="fanc-list__error-retry" @click="$emit('retry')">{{ retryText }}</view>
            </view>
        </view>

        <!-- 内容为空时的提示 -->
        <view v-if="!loading && isEmpty" class="fanc-list__empty">
            <slot name="empty">
                <view class="fanc-list__empty-wrapper">
                    <view class="fanc-list__empty-icon"></view>
                    <text class="fanc-list__empty-text">{{ emptyText }}</text>
                </view>
            </slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancList",

    props: {
        // 是否正在加载
        loading: {
            type: Boolean,
            default: false,
        },
        // 是否已加载全部数据
        noMore: {
            type: Boolean,
            default: false,
        },
        // 是否为空列表
        isEmpty: {
            type: Boolean,
            default: false,
        },
        // 是否出现加载错误
        error: {
            type: Boolean,
            default: false,
        },
        // 触发加载的距离阈值 (px)
        threshold: {
            type: Number,
            default: 300,
        },
        // 加载中的文字提示
        loadingText: {
            type: String,
            default: "加载中...",
        },
        // 加载完成的文字提示
        noMoreText: {
            type: String,
            default: "没有更多了",
        },
        // 空列表的文字提示
        emptyText: {
            type: String,
            default: "暂无数据",
        },
        // 加载出错的文字提示
        errorText: {
            type: String,
            default: "加载失败",
        },
        // 重试按钮的文字
        retryText: {
            type: String,
            default: "重新加载",
        },
        // 自定义列表高度
        customHeight: {
            type: String,
            default: "",
        },
        // 立即检查
        immediateCheck: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            scrollerEl: null,
            scrollTimer: null,
            isScrolling: false,
        };
    },

    mounted() {
        this.initScroller();

        if (this.immediateCheck) {
            this.$nextTick(() => {
                this.checkPosition();
            });
        }
    },

    beforeDestroy() {
        this.removeScrollListener();
    },

    methods: {
        // 初始化滚动容器
        initScroller() {
            // 在uni-app中，根据平台获取正确的滚动容器
            // #ifdef H5
            this.scrollerEl = window;
            // #endif

            // #ifdef APP-NVUE
            // NVUE环境下使用元素自身作为滚动容器
            this.scrollerEl = uni
                .createSelectorQuery()
                .in(this)
                .select(".fanc-list")
                .boundingClientRect()
                .exec((rect) => {
                    if (rect && rect[0]) {
                        this.scrollerEl = rect[0];
                    }
                });
            // #endif

            // #ifdef MP
            // 小程序环境使用页面滚动
            this.scrollerEl = {
                addEventListener: (event, handler) => {
                    uni.onPageScroll(handler);
                },
                removeEventListener: (event, handler) => {
                    uni.offPageScroll(handler);
                },
            };
            // #endif

            this.addScrollListener();
        },

        // 添加滚动监听
        addScrollListener() {
            if (!this.scrollerEl) return;

            // #ifdef H5
            this.scrollerEl.addEventListener("scroll", this.onScroll);
            // #endif

            // #ifdef MP
            this.scrollerEl.addEventListener("scroll", this.onPageScroll);
            // #endif

            // #ifdef APP-NVUE
            // NVUE环境下可能需要使用scrollable组件的onscroll事件
            // 这里使用通用处理
            if (this.scrollerEl && this.scrollerEl.addEventListener) {
                this.scrollerEl.addEventListener("scroll", this.onScroll);
            }
            // #endif
        },

        // 移除滚动监听
        removeScrollListener() {
            if (!this.scrollerEl) return;

            // #ifdef H5
            this.scrollerEl.removeEventListener("scroll", this.onScroll);
            // #endif

            // #ifdef MP
            this.scrollerEl.removeEventListener("scroll", this.onPageScroll);
            // #endif

            // #ifdef APP-NVUE
            if (this.scrollerEl && this.scrollerEl.removeEventListener) {
                this.scrollerEl.removeEventListener("scroll", this.onScroll);
            }
            // #endif

            if (this.scrollTimer) {
                clearTimeout(this.scrollTimer);
                this.scrollTimer = null;
            }
        },

        // H5环境滚动处理
        onScroll() {
            if (this.loading || this.noMore || this.error) return;

            this.isScrolling = true;

            if (this.scrollTimer) {
                clearTimeout(this.scrollTimer);
            }

            // 节流处理，避免频繁触发
            this.scrollTimer = setTimeout(() => {
                this.isScrolling = false;
                this.checkPosition();
            }, 200);
        },

        // 小程序环境滚动处理
        onPageScroll(e) {
            if (this.loading || this.noMore || this.error) return;

            this.isScrolling = true;

            if (this.scrollTimer) {
                clearTimeout(this.scrollTimer);
            }

            // 节流处理，避免频繁触发
            this.scrollTimer = setTimeout(() => {
                this.isScrolling = false;
                this.checkPosition();
            }, 200);
        },

        // 检查位置决定是否触发加载
        checkPosition() {
            if (this.loading || this.noMore || this.error) return;

            const el = uni.createSelectorQuery().in(this).select(".fanc-list");

            el.boundingClientRect((rect) => {
                if (!rect) return;

                // #ifdef H5
                const windowHeight = window.innerHeight;
                const scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                const elBottom = rect.bottom;

                // 当列表底部与视口底部距离小于阈值时触发加载
                if (windowHeight + scrollTop + this.threshold >= elBottom) {
                    this.$emit("load");
                }
                // #endif

                // #ifdef MP || APP-NVUE
                // 获取可见窗口信息
                const systemInfo = uni.getSystemInfoSync();
                const windowHeight = systemInfo.windowHeight;

                // 当列表底部进入可视区域阈值范围内时触发加载
                if (rect.bottom <= windowHeight + this.threshold) {
                    this.$emit("load");
                }
                // #endif
            }).exec();
        },

        // 手动检查位置，可供外部调用
        check() {
            this.$nextTick(() => {
                this.checkPosition();
            });
        },
    },
};
</script>

<style>
.fanc-list {
    position: relative;
    width: 100%;
    background-color: var(--list-bg-color, var(--bg-white));
}

.fanc-list__content {
    position: relative;
    width: 100%;
}

.fanc-list__footer {
    padding: var(--list-footer-padding, 16px 0);
    text-align: center;
}

.fanc-list__loading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.fanc-list__loading-spinner {
    width: var(--list-loading-size, 20px);
    height: var(--list-loading-size, 20px);
    border: 2px solid var(--list-loading-spinner-color, var(--fanc-primary-color));
    border-radius: 50%;
    border-top-color: transparent;
    animation: fanc-list-loading var(--list-loading-duration, 0.8s) linear infinite;
    margin-right: 8px;
}

@keyframes fanc-list-loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.fanc-list__loading-text {
    font-size: var(--list-font-size, 14px);
    color: var(--list-loading-text-color, var(--text-secondary));
}

.fanc-list__no-more {
    padding: 8px 0;
}

.fanc-list__no-more-text {
    font-size: var(--list-font-size, 14px);
    color: var(--list-no-more-text-color, var(--text-secondary));
}

.fanc-list__error {
    padding: 8px 0;
}

.fanc-list__error-text {
    font-size: var(--list-font-size, 14px);
    color: var(--list-error-text-color, var(--text-secondary));
    margin-bottom: 8px;
}

.fanc-list__error-retry {
    font-size: var(--list-font-size, 14px);
    color: var(--list-error-retry-color, var(--fanc-primary-color));
    padding: 4px 12px;
    display: inline-block;
    border: 1px solid var(--list-error-retry-border-color, var(--fanc-primary-color));
    border-radius: var(--list-border-radius, 4px);
}

.fanc-list__empty {
    padding: var(--list-empty-padding, 40px 0);
    text-align: center;
}

.fanc-list__empty-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.fanc-list__empty-icon {
    width: var(--list-empty-icon-size, 80px);
    height: var(--list-empty-icon-size, 80px);
    border-radius: 50%;
    background-color: var(--list-empty-icon-bg-color, var(--gray-100));
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
}

.fanc-list__empty-icon::before,
.fanc-list__empty-icon::after {
    content: "";
    position: absolute;
    background-color: var(--list-empty-icon-color, var(--gray-300));
}

.fanc-list__empty-icon::before {
    width: 40px;
    height: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.fanc-list__empty-icon::after {
    width: 4px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
}

.fanc-list__empty-text {
    font-size: var(--list-font-size, 14px);
    color: var(--list-empty-text-color, var(--text-secondary));
}
</style>
