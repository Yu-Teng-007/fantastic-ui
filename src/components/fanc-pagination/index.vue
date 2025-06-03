<template>
    <view
        class="fanc-pagination"
        :class="{ 'is-mini': mini, 'is-dark': dark, 'is-hidden': hidden }"
    >
        <!-- 上一页按钮 -->
        <view
            class="fanc-pagination__prev"
            :class="{ 'is-disabled': value <= 1 }"
            @click="handlePrev"
        >
            <fanc-icon
                v-if="!simple"
                name="chevron-left"
                :size="iconSize"
                color="inherit"
            ></fanc-icon>
            <text v-if="showPageText" class="fanc-pagination__text">{{ prevText }}</text>
        </view>

        <!-- 页码显示 - 普通模式 -->
        <view v-if="!simple" class="fanc-pagination__pages">
            <!-- 当页码较少时直接全部显示 -->
            <template v-if="pageCount <= pagerCount">
                <view
                    v-for="page in pageCount"
                    :key="page"
                    class="fanc-pagination__page"
                    :class="{ 'is-active': page === value }"
                    @click="handleChangePage(page)"
                >
                    {{ page }}
                </view>
            </template>

            <!-- 当页码较多时显示省略模式 -->
            <template v-else>
                <!-- 第一页 -->
                <view
                    class="fanc-pagination__page"
                    :class="{ 'is-active': value === 1 }"
                    @click="handleChangePage(1)"
                >
                    1
                </view>

                <!-- 左侧省略号 -->
                <view v-if="showPrevMore" class="fanc-pagination__ellipsis" @click="handlePrevMore">
                    <fanc-icon
                        name="ellipsis"
                        :size="iconSize"
                        color="inherit"
                        class="ellipsis-icon"
                    ></fanc-icon>
                    <fanc-icon
                        name="chevron-left"
                        :size="iconSize"
                        color="inherit"
                        class="more-icon"
                    ></fanc-icon>
                </view>

                <!-- 中间页码 -->
                <view
                    v-for="page in pagers"
                    :key="page"
                    class="fanc-pagination__page"
                    :class="{ 'is-active': page === value }"
                    @click="handleChangePage(page)"
                >
                    {{ page }}
                </view>

                <!-- 右侧省略号 -->
                <view v-if="showNextMore" class="fanc-pagination__ellipsis" @click="handleNextMore">
                    <fanc-icon
                        name="ellipsis"
                        :size="iconSize"
                        color="inherit"
                        class="ellipsis-icon"
                    ></fanc-icon>
                    <fanc-icon
                        name="chevron-right"
                        :size="iconSize"
                        color="inherit"
                        class="more-icon"
                    ></fanc-icon>
                </view>

                <!-- 最后一页 -->
                <view
                    v-if="pageCount > 1"
                    class="fanc-pagination__page"
                    :class="{ 'is-active': value === pageCount }"
                    @click="handleChangePage(pageCount)"
                >
                    {{ pageCount }}
                </view>
            </template>
        </view>

        <!-- 页码显示 - 简洁模式 -->
        <view v-if="simple" class="fanc-pagination__simple">
            <text class="fanc-pagination__current">{{ value }}</text>
            <text class="fanc-pagination__separator">/</text>
            <text class="fanc-pagination__total">{{ pageCount }}</text>
        </view>

        <!-- 下一页按钮 -->
        <view
            class="fanc-pagination__next"
            :class="{ 'is-disabled': value >= pageCount }"
            @click="handleNext"
        >
            <text v-if="showPageText" class="fanc-pagination__text">{{ nextText }}</text>
            <fanc-icon
                v-if="!simple"
                name="chevron-right"
                :size="iconSize"
                color="inherit"
            ></fanc-icon>
        </view>
    </view>
</template>

<script>
/**
 * fanc-pagination 分页
 * @description 数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面
 * @property {Number} value/v-model - 当前页码
 * @property {Number} total - 总记录数
 * @property {Number} pageSize - 每页记录数
 * @property {Number} pagerCount - 页码按钮的数量，当总页数超过该值时会折叠
 * @property {Boolean} mini - 是否使用小型分页样式
 * @property {Boolean} simple - 是否使用简单分页模式
 * @property {Boolean} dark - 是否使用深色主题
 * @property {Boolean} hidden - 当只有1页时是否隐藏分页
 * @property {String} prevText - 上一页文字
 * @property {String} nextText - 下一页文字
 * @property {Boolean} showPageText - 是否显示上一页/下一页文字
 * @property {String} background - 页码按钮背景色
 * @property {String} activeColor - 当前页码的文字颜色
 * @property {String} activeBackground - 当前页码的背景颜色
 * @event {Function} change - 页码改变时触发
 * @event {Function} prev - 点击上一页按钮时触发
 * @event {Function} next - 点击下一页按钮时触发
 */
export default {
    name: "fanc-pagination",
    props: {
        // 当前页码
        value: {
            type: Number,
            default: 1,
        },
        // 总记录数
        total: {
            type: Number,
            default: 0,
        },
        // 每页记录数
        pageSize: {
            type: Number,
            default: 10,
        },
        // 页码按钮的数量
        pagerCount: {
            type: Number,
            default: 7,
        },
        // 是否使用小型分页样式
        mini: Boolean,
        // 是否使用简单分页模式
        simple: Boolean,
        // 是否使用深色主题
        dark: Boolean,
        // 当只有1页时是否隐藏分页
        hidden: {
            type: Boolean,
            default: false,
        },
        // 上一页文字
        prevText: {
            type: String,
            default: "上一页",
        },
        // 下一页文字
        nextText: {
            type: String,
            default: "下一页",
        },
        // 是否显示上一页/下一页文字
        showPageText: {
            type: Boolean,
            default: false,
        },
        // 页码按钮背景色
        background: String,
        // 当前页码的文字颜色
        activeColor: String,
        // 当前页码的背景颜色
        activeBackground: String,
    },
    computed: {
        // 图标大小
        iconSize() {
            return this.mini ? 14 : 16;
        },
        // 总页数
        pageCount() {
            return Math.max(1, Math.ceil(this.total / this.pageSize));
        },
        // 显示的页码按钮数组
        pagers() {
            const pagerCount = this.pagerCount;
            const halfPagerCount = Math.floor(pagerCount / 2);
            const currentPage = this.value;
            const pageCount = this.pageCount;

            let showPagerCount = pagerCount - 2;
            if (!this.showPrevMore) {
                showPagerCount--;
            }
            if (!this.showNextMore) {
                showPagerCount--;
            }

            let startPage = 1;
            if (currentPage > halfPagerCount) {
                startPage = Math.min(currentPage - halfPagerCount, pageCount - showPagerCount);
                startPage = Math.max(startPage, 2);
            }

            const endPage = Math.min(startPage + showPagerCount - 1, pageCount - 1);

            const result = [];
            for (let i = startPage; i <= endPage; i++) {
                result.push(i);
            }

            return result;
        },
        // 是否显示左侧省略号
        showPrevMore() {
            return this.pageCount > this.pagerCount && this.value > Math.ceil(this.pagerCount / 2);
        },
        // 是否显示右侧省略号
        showNextMore() {
            return (
                this.pageCount > this.pagerCount &&
                this.value < this.pageCount - Math.floor(this.pagerCount / 2)
            );
        },
    },
    methods: {
        // 点击上一页
        handlePrev() {
            if (this.value > 1) {
                this.handleChangePage(this.value - 1);
                this.$emit("prev");
            } else {
                this.$toast.text("已经是第一页了");
            }
        },
        // 点击下一页
        handleNext() {
            if (this.value < this.pageCount) {
                this.handleChangePage(this.value + 1);
                this.$emit("next");
            } else {
                this.$toast.text("已经是最后一页了");
            }
        },
        // 点击页码
        handleChangePage(page) {
            if (page !== this.value) {
                this.$emit("input", page);
                this.$emit("change", page);
            }
        },
        // 点击左侧省略号
        handlePrevMore() {
            this.handleChangePage(Math.max(1, this.value - 5));
        },
        // 点击右侧省略号
        handleNextMore() {
            this.handleChangePage(Math.min(this.pageCount, this.value + 5));
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;

    &__prev,
    &__next {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        height: 36px;
        margin: 0 4px;
        background-color: var(--pagination-button-bg-color, var(--bg-white));
        color: var(--pagination-button-text-color, var(--text-primary));
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;

        &.is-disabled {
            color: var(--pagination-disabled-color, var(--text-disabled));
            cursor: not-allowed;
            pointer-events: none;
        }
    }

    &__text {
        margin: 0 4px;
    }

    &__pages {
        display: flex;
        align-items: center;
    }

    &__page {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        margin: 0 4px;
        border-radius: 4px;
        font-size: 14px;
        background-color: var(--pagination-button-bg-color, var(--bg-white));
        color: var(--pagination-button-text-color, var(--text-primary));
        cursor: pointer;
        transition: all 0.3s;

        &.is-active {
            background-color: var(--pagination-active-bg-color, var(--fanc-primary-color));
            color: var(--pagination-active-text-color, var(--white));
        }
    }

    &__ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        margin: 0 4px;
        border-radius: 4px;
        font-size: 14px;
        background-color: var(--pagination-button-bg-color, var(--bg-white));
        color: var(--pagination-button-text-color, var(--text-primary));
        cursor: pointer;
        position: relative;

        .more-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s;
        }

        .ellipsis-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;
            transition: opacity 0.3s;
        }

        &:hover {
            .more-icon {
                opacity: 1;
            }

            .ellipsis-icon {
                opacity: 0;
            }
        }
    }

    &__simple {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 8px;
        font-size: 14px;
        color: var(--pagination-text-color, var(--text-primary));
    }

    &__current {
        color: var(--pagination-current-color, var(--fanc-primary-color));
        font-weight: 500;
    }

    &__separator {
        margin: 0 4px;
        color: var(--pagination-separator-color, var(--text-secondary));
    }

    &__total {
        color: var(--pagination-total-color, var(--text-secondary));
    }

    // 小型分页样式
    &.is-mini {
        padding: 8px 0;

        .fanc-pagination__prev,
        .fanc-pagination__next {
            height: 28px;
            padding: 0 8px;
            font-size: 12px;
        }

        .fanc-pagination__page,
        .fanc-pagination__ellipsis {
            width: 28px;
            height: 28px;
            font-size: 12px;
        }

        .fanc-pagination__simple {
            font-size: 12px;
        }
    }

    // 深色主题
    &.is-dark {
        .fanc-pagination__prev,
        .fanc-pagination__next,
        .fanc-pagination__page,
        .fanc-pagination__ellipsis {
            background-color: var(--pagination-dark-bg-color, var(--black-300));
            color: var(--pagination-dark-text-color, var(--gray-100));
        }

        .fanc-pagination__page.is-active {
            background-color: var(--pagination-dark-active-bg-color, var(--fanc-primary-color));
            color: var(--pagination-dark-active-text-color, var(--white));
        }

        .fanc-pagination__simple,
        .fanc-pagination__current,
        .fanc-pagination__separator,
        .fanc-pagination__total {
            color: var(--pagination-dark-text-color, var(--gray-100));
        }
    }

    // 隐藏当只有一页时
    &.is-hidden {
        &:not(:has(.fanc-pagination__page:nth-child(2))) {
            display: none;
        }
    }
}
</style>
