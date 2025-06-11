<template>
    <view
        class="fanc-list"
        :class="{ 'fanc-list--loading': loading }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
    >
        <!-- 下拉刷新指示器 -->
        <view
            class="fanc-list__refresh"
            v-if="pullRefreshEnabled"
            :style="{ height: `${refreshHeight}px`, opacity: refreshProgress }"
        >
            <view
                class="fanc-list__refresh-spinner"
                :class="{ 'fanc-list__refresh-spinner--active': isRefreshing }"
            ></view>
            <text class="fanc-list__refresh-text">{{
                isRefreshing ? refreshingText : pullRefreshText
            }}</text>
        </view>

        <!-- 列表项容器 -->
        <view
            class="fanc-list__content"
            :style="{
                height: customHeight || 'auto',
                transform: `translateY(${contentTranslateY}px)`,
            }"
        >
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
                <text class="fanc-list__error-retry" @click="$emit('retry')">{{ retryText }}</text>
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
            default: "请求失败",
        },
        // 重试按钮的文字
        retryText: {
            type: String,
            default: "点击重新加载",
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
        // 是否启用下拉刷新
        pullRefreshEnabled: {
            type: Boolean,
            default: false,
        },
        // 下拉刷新的阈值（px）
        pullRefreshThreshold: {
            type: Number,
            default: 60,
        },
        // 下拉刷新提示文字
        pullRefreshText: {
            type: String,
            default: "下拉刷新",
        },
        // 刷新中提示文字
        refreshingText: {
            type: String,
            default: "刷新中...",
        },
    },

    data() {
        return {
            scrollerEl: null,
            scrollTimer: null,
            isScrolling: false,
            // 下拉刷新相关数据
            startY: 0,
            currentY: 0,
            refreshHeight: 0,
            contentTranslateY: 0,
            isRefreshing: false,
            refreshProgress: 0,
            touchStarted: false,
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

                let windowHeight;

                // #ifdef H5
                windowHeight = window.innerHeight;
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
                windowHeight = systemInfo.windowHeight;

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

        // 下拉刷新相关方法
        onTouchStart(e) {
            if (!this.pullRefreshEnabled || this.isRefreshing) return;

            // 只在列表顶部时启用下拉刷新
            const scrollTop = this.getScrollTop();
            if (scrollTop > 0) return;

            this.touchStarted = true;
            this.startY = e.touches[0].clientY;
        },

        onTouchMove(e) {
            if (!this.pullRefreshEnabled || !this.touchStarted || this.isRefreshing) return;

            // 阻止默认滚动行为
            e.preventDefault && e.preventDefault();

            this.currentY = e.touches[0].clientY;
            let distance = this.currentY - this.startY;

            // 下拉才触发刷新
            if (distance <= 0) {
                this.refreshHeight = 0;
                this.contentTranslateY = 0;
                this.refreshProgress = 0;
                return;
            }

            // 计算下拉距离，使用平滑的对数阻尼
            const dampingFactor = 0.45;
            const maxPull = this.pullRefreshThreshold * 3;

            // 使用对数函数使阻尼更平滑
            const logDamping = Math.log10(distance + 10) / Math.log10(maxPull + 10);
            const effectiveDistance = distance * dampingFactor * (1 - logDamping * 0.5);

            // 限制最大下拉距离
            this.refreshHeight = Math.min(effectiveDistance, maxPull);
            this.contentTranslateY = this.refreshHeight;

            // 计算下拉进度 (0-1)
            this.refreshProgress = Math.min(this.refreshHeight / this.pullRefreshThreshold, 1);
        },

        onTouchEnd(e) {
            if (!this.pullRefreshEnabled || !this.touchStarted) return;

            this.touchStarted = false;

            // 消除可能的默认滚动行为
            e && e.preventDefault && e.preventDefault();

            // 防止快速点击触发刷新
            if (Math.abs(this.currentY - this.startY) < 5) {
                this.resetRefresh();
                return;
            }

            // 如果下拉高度超过阈值，触发刷新
            if (this.refreshHeight >= this.pullRefreshThreshold && !this.isRefreshing) {
                this.isRefreshing = true;

                // 使用动画效果设置高度
                const finalHeight = this.pullRefreshThreshold;
                this.animateToHeight(this.refreshHeight, finalHeight);

                // 触发刷新事件
                this.$emit("refresh");
            } else {
                // 未达到阈值，使用动画效果复位
                this.animateToHeight(this.refreshHeight, 0);
            }
        },

        // 完成刷新
        finishRefresh() {
            this.isRefreshing = false;
            // 使用动画效果收起刷新区域
            this.animateToHeight(this.refreshHeight, 0);
        },

        // 重置刷新状态
        resetRefresh() {
            this.refreshHeight = 0;
            this.contentTranslateY = 0;
            this.refreshProgress = 0;
        },

        // 使用动画效果设置高度
        animateToHeight(fromHeight, toHeight) {
            const startTime = Date.now();
            const duration = 300; // 动画持续时间(ms)
            let rafId = null;

            // 取消可能存在的未完成动画
            if (this._animationFrame) {
                cancelAnimationFrame(this._animationFrame);
                this._animationFrame = null;
            }

            const animateFrame = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 使用缓动函数使动画更自然
                const easeProgress = this.easeOutCubic(progress);
                const currentHeight = fromHeight + (toHeight - fromHeight) * easeProgress;

                this.refreshHeight = currentHeight;
                this.contentTranslateY = currentHeight;

                if (progress < 1) {
                    this._animationFrame = requestAnimationFrame(animateFrame);
                } else {
                    this._animationFrame = null;
                    if (toHeight === 0) {
                        this.resetRefresh();
                    }
                }
            };

            this._animationFrame = requestAnimationFrame(animateFrame);
        },

        // 缓动函数 - 三次方缓出
        easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        },

        // 获取滚动位置
        getScrollTop() {
            // #ifdef H5
            return (
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0
            );
            // #endif

            // #ifdef MP || APP-NVUE
            return 0; // 小程序环境需要通过页面生命周期或API获取
            // #endif
        },
    },
};
</script>

<style>
.fanc-list {
    position: relative;
    width: 100%;
    background-color: var(--list-bg-color, var(--bg-white));
    -webkit-overflow-scrolling: touch; /* 提高iOS滚动性能 */
    overscroll-behavior-y: none; /* 防止过度滚动 */
}

.fanc-list__refresh {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--list-refresh-bg-color, var(--bg-white));
    z-index: 1;
}

.fanc-list__refresh-spinner {
    width: var(--list-loading-size, 20px);
    height: var(--list-loading-size, 20px);
    border: 2px solid var(--list-loading-spinner-color, var(--fanc-primary-color));
    border-radius: 50%;
    border-top-color: transparent;
    margin-right: 8px;
    transform: scale(0.8) translateZ(0);
    transition: transform 0.3s;
}

.fanc-list__refresh-spinner--active {
    animation: fanc-list-loading var(--list-loading-duration, 0.8s) linear infinite;
    transform: scale(1) translateZ(0);
}

.fanc-list__refresh-text {
    font-size: var(--list-font-size, 14px);
    color: var(--list-loading-text-color, var(--text-secondary));
    transform: translateZ(0);
    transition: opacity 0.2s;
}

.fanc-list__content {
    position: relative;
    width: 100%;
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden; /* 提高动画性能 */
    perspective: 1000; /* 提高3D变换性能 */
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
    margin-right: 5px;
    display: inline;
}

.fanc-list__error-retry {
    font-size: var(--list-font-size, 14px);
    color: var(--list-error-retry-color, var(--fanc-primary-color));
    display: inline;
    text-decoration: underline;
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
