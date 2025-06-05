<template>
    <view
        class="fanc-pagination"
        :class="{ 'is-mini': mini, 'is-dark': dark, 'is-hidden': hidden, 'is-simple': simple }"
    >
        <!-- 基础用法 -->
        <view v-if="!simple && !showEllipsis" class="fanc-pagination__basic">
            <view
                class="fanc-pagination__prev"
                :class="{ 'is-disabled': current <= 1 }"
                @click="handlePrev"
            >
                <!-- 上一页按钮插槽 -->
                <slot name="prev"> 上一页 </slot>
            </view>

            <view class="fanc-pagination__pages">
                <view
                    v-for="page in pagerItems"
                    :key="page"
                    class="fanc-pagination__number"
                    :class="{ 'is-active': page === current }"
                    @click="handleChange(page)"
                >
                    <!-- 页码插槽 -->
                    <slot name="page" :page="page">
                        {{ page }}
                    </slot>
                </view>
            </view>

            <view
                class="fanc-pagination__next"
                :class="{ 'is-disabled': current >= totalPages }"
                @click="handleNext"
            >
                <!-- 下一页按钮插槽 -->
                <slot name="next"> 下一页 </slot>
            </view>
        </view>

        <!-- 简单模式 -->
        <view v-if="simple" class="fanc-pagination__simple">
            <view
                class="fanc-pagination__prev"
                :class="{ 'is-disabled': current <= 1 }"
                @click="handlePrev"
            >
                <slot name="prev"> 上一页 </slot>
            </view>

            <view class="fanc-pagination__info">
                <slot name="info" :current="current" :total="totalPages">
                    {{ current }}/{{ totalPages }}
                </slot>
            </view>

            <view
                class="fanc-pagination__next"
                :class="{ 'is-disabled': current >= totalPages }"
                @click="handleNext"
            >
                <slot name="next"> 下一页 </slot>
            </view>
        </view>

        <!-- 显示省略号 -->
        <view v-if="!simple && showEllipsis" class="fanc-pagination__ellipsis-mode">
            <view
                class="fanc-pagination__prev"
                :class="{ 'is-disabled': current <= 1 }"
                @click="handlePrev"
            >
                <slot name="prev"> 上一页 </slot>
            </view>

            <view class="fanc-pagination__pages">
                <!-- 情况1：当前页在前部分 -->
                <template v-if="pagerPosition === 'front'">
                    <view
                        v-for="page in frontPages"
                        :key="page"
                        class="fanc-pagination__number"
                        :class="{ 'is-active': page === current }"
                        @click="handleChange(page)"
                    >
                        <slot name="page" :page="page">
                            {{ page }}
                        </slot>
                    </view>

                    <view class="fanc-pagination__ellipsis" @click="jumpNext">
                        <slot name="next-more"> ... </slot>
                    </view>

                    <view
                        class="fanc-pagination__number"
                        :class="{ 'is-active': totalPages === current }"
                        @click="handleChange(totalPages)"
                    >
                        <slot name="page" :page="totalPages">
                            {{ totalPages }}
                        </slot>
                    </view>
                </template>

                <!-- 情况2：当前页在中间 -->
                <template v-else-if="pagerPosition === 'middle'">
                    <view class="fanc-pagination__ellipsis" @click="jumpPrev">
                        <slot name="prev-more"> ... </slot>
                    </view>

                    <view class="fanc-pagination__number" @click="handleChange(current - 1)">
                        <slot name="page" :page="current - 1">
                            {{ current - 1 }}
                        </slot>
                    </view>

                    <view
                        class="fanc-pagination__number"
                        :class="{ 'is-active': true }"
                        @click="handleChange(current)"
                    >
                        <slot name="page" :page="current">
                            {{ current }}
                        </slot>
                    </view>

                    <view class="fanc-pagination__number" @click="handleChange(current + 1)">
                        <slot name="page" :page="current + 1">
                            {{ current + 1 }}
                        </slot>
                    </view>

                    <view class="fanc-pagination__ellipsis" @click="jumpNext">
                        <slot name="next-more"> ... </slot>
                    </view>
                </template>

                <!-- 情况3：当前页在后部分 -->
                <template v-else-if="pagerPosition === 'back'">
                    <view
                        class="fanc-pagination__number"
                        :class="{ 'is-active': 1 === current }"
                        @click="handleChange(1)"
                    >
                        <slot name="page" :page="1"> 1 </slot>
                    </view>

                    <view class="fanc-pagination__ellipsis" @click="jumpPrev">
                        <slot name="prev-more"> ... </slot>
                    </view>

                    <view
                        v-for="page in backPages"
                        :key="page"
                        class="fanc-pagination__number"
                        :class="{ 'is-active': page === current }"
                        @click="handleChange(page)"
                    >
                        <slot name="page" :page="page">
                            {{ page }}
                        </slot>
                    </view>
                </template>
            </view>

            <view
                class="fanc-pagination__next"
                :class="{ 'is-disabled': current >= totalPages }"
                @click="handleNext"
            >
                <slot name="next"> 下一页 </slot>
            </view>
        </view>
    </view>
</template>

<script>
/**
 * fanc-pagination 分页
 * @description 数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面
 * @property {Number} current/v-model - 当前页码
 * @property {Number} total - 总条目数
 * @property {Number} pageSize - 每页条目数
 * @property {Boolean} simple - 是否使用简单模式
 * @property {Boolean} showEllipsis - 是否显示省略号
 * @property {Number} pagerCount - 页码按钮的数量
 * @property {Boolean} mini - 是否使用小型分页样式
 * @property {Boolean} dark - 是否使用深色主题
 * @property {Boolean} hidden - 当只有1页时是否隐藏分页
 * @event {Function} change - 页码改变时触发
 * @event {Function} prev - 点击上一页按钮时触发
 * @event {Function} next - 点击下一页按钮时触发
 */
export default {
    name: "fanc-pagination",
    props: {
        // 当前页码
        current: {
            type: Number,
            default: 1,
        },
        // 总条目数
        total: {
            type: Number,
            default: 0,
        },
        // 每页条目数
        pageSize: {
            type: Number,
            default: 10,
        },
        // 是否使用简单模式
        simple: {
            type: Boolean,
            default: false,
        },
        // 是否显示省略号
        showEllipsis: {
            type: Boolean,
            default: false,
        },
        // 页码按钮的数量
        pagerCount: {
            type: Number,
            default: 5,
        },
        // 是否使用小型分页样式
        mini: Boolean,
        // 是否使用深色主题
        dark: Boolean,
        // 当只有1页时是否隐藏分页
        hidden: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        // 总页数
        totalPages() {
            return Math.max(1, Math.ceil(this.total / this.pageSize));
        },
        // 基础模式下的页码
        pagerItems() {
            const { totalPages, current, pagerCount } = this;

            // 如果总页数小于等于要显示的页码数，直接返回全部页码
            if (totalPages <= pagerCount) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }

            // 否则根据当前页码计算要显示的页码范围
            const halfPagerCount = Math.floor(pagerCount / 2);
            let start = Math.max(1, current - halfPagerCount);
            let end = start + pagerCount - 1;

            // 处理边界情况
            if (end > totalPages) {
                end = totalPages;
                start = Math.max(1, end - pagerCount + 1);
            }

            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
        // 省略号模式下的位置
        pagerPosition() {
            const { current, totalPages } = this;

            // 当前页在前部分（1-2页）
            if (current <= 2) {
                return "front";
            }
            // 当前页在后部分（倒数2页）
            else if (current > totalPages - 2) {
                return "back";
            }
            // 当前页在中间
            else {
                return "middle";
            }
        },
        // 前部分页码 - 最多显示3个页码
        frontPages() {
            // 显示前3页
            const count = Math.min(3, this.totalPages - 1);
            return Array.from({ length: count }, (_, i) => i + 1);
        },
        // 后部分页码 - 最多显示3个页码
        backPages() {
            // 显示后3页
            const count = Math.min(3, this.totalPages - 1);
            return Array.from({ length: count }, (_, i) => this.totalPages - count + i + 1);
        },
        // 图标大小
        iconSize() {
            return this.mini ? 14 : 16;
        },
    },
    methods: {
        // 处理页码变化
        handleChange(page) {
            if (page !== this.current) {
                this.$emit("update:current", page);
                this.$emit("change", page);
            }
        },
        // 处理上一页
        handlePrev() {
            if (this.current > 1) {
                this.handleChange(this.current - 1);
                this.$emit("prev");
            }
        },
        // 处理下一页
        handleNext() {
            if (this.current < this.totalPages) {
                this.handleChange(this.current + 1);
                this.$emit("next");
            }
        },
        // 向前跳转5页
        jumpPrev() {
            this.handleChange(Math.max(1, this.current - 5));
        },
        // 向后跳转5页
        jumpNext() {
            this.handleChange(Math.min(this.totalPages, this.current + 5));
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    flex-wrap: wrap;

    &__basic,
    &__simple,
    &__ellipsis-mode {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    &__pages {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 100%;
        overflow: hidden;
    }

    &__prev,
    &__next {
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        background-color: #fff;
        border-radius: 4px;
        margin: 0 5px;
        cursor: pointer;
        color: #606266;
        white-space: nowrap;

        &.is-disabled {
            color: #c0c4cc;
            cursor: not-allowed;
        }
    }

    &__number {
        min-width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin: 0 5px;
        background-color: #fff;
        border-radius: 4px;
        cursor: pointer;
        color: #606266;

        &.is-active {
            background-color: #1989fa;
            color: #fff;
        }
    }

    &__ellipsis {
        min-width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin: 0 5px;
        cursor: pointer;
        color: #606266;
    }

    &__info {
        margin: 0 10px;
        color: #606266;
        height: 32px;
        line-height: 32px;
        display: flex;
        align-items: center;
    }

    .fanc-pagination__prev,
    .fanc-pagination__next,
    .fanc-pagination__info {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
    }

    // 小型分页样式
    &.is-mini {
        padding: 8px 0;

        .fanc-pagination__prev,
        .fanc-pagination__next {
            height: 24px;
            line-height: 24px;
            padding: 0 6px;
            font-size: 12px;
        }

        .fanc-pagination__number,
        .fanc-pagination__ellipsis {
            min-width: 24px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
        }

        .fanc-pagination__info {
            font-size: 12px;
            height: 24px;
            line-height: 24px;
        }
    }

    // 深色主题
    &.is-dark {
        background-color: #1d1e1f;
        padding:10px 5px;
        border-radius: 8px;

        .fanc-pagination__prev,
        .fanc-pagination__next,
        .fanc-pagination__number,
        .fanc-pagination__ellipsis {
            background-color: #323233;
            color: #e5e5e5;
        }

        .fanc-pagination__number.is-active {
            background-color: #1989fa;
            color: #fff;
        }

        .fanc-pagination__info,
        .fanc-pagination__icon {
            color: #e5e5e5;
        }
    }

    // 隐藏当只有一页时
    &.is-hidden {
        &:not(:has(.fanc-pagination__number:nth-child(2))) {
            display: none;
        }
    }

    @media screen and (max-width: 480px) {
        &__prev,
        &__next {
            padding: 0 8px;
        }

        &__number,
        &__ellipsis {
            margin: 0 2px;
        }
    }
}
</style>
