<template>
    <view
        class="fanc-swipe-cell"
        :class="{ 'fanc-swipe-cell--disabled': disabled }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <!-- 左侧操作区域 -->
        <view
            class="fanc-swipe-cell__left"
            :style="{ width: `${leftWidthPx}px` }"
            :class="{ 'fanc-swipe-cell__left--open': leftVisible }"
            @click.stop
        >
            <slot name="left"></slot>
        </view>

        <!-- 内容区域 -->
        <view class="fanc-swipe-cell__content" :style="contentStyle" @click="onClick">
            <slot></slot>
        </view>

        <!-- 右侧操作区域 -->
        <view
            class="fanc-swipe-cell__right"
            :style="{ width: `${rightWidthPx}px` }"
            :class="{ 'fanc-swipe-cell__right--open': rightVisible }"
            @click.stop
        >
            <slot name="right"></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-swipe-cell",

    props: {
        // 是否禁用滑动
        disabled: {
            type: Boolean,
            default: false,
        },
        // 左侧滑动区域宽度
        leftWidth: {
            type: [Number, String],
            default: 0,
        },
        // 右侧滑动区域宽度
        rightWidth: {
            type: [Number, String],
            default: 0,
        },
        // 点击时自动关闭
        autoClose: {
            type: Boolean,
            default: true,
        },
        // 阈值比例，开始显示菜单的拖动比例
        threshold: {
            type: Number,
            default: 0.3,
        },
        // 禁止自动关闭菜单的点击事件名称
        disableCloseNames: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            offset: 0,
            startOffset: 0,
            startX: 0,
            isDragging: false,
            leftVisible: false,
            rightVisible: false,
        };
    },

    computed: {
        // 将左侧宽度转换为数值
        leftWidthPx() {
            return parseInt(this.leftWidth, 10) || 0;
        },

        // 将右侧宽度转换为数值
        rightWidthPx() {
            return parseInt(this.rightWidth, 10) || 0;
        },

        contentStyle() {
            return {
                transform: `translateX(${this.offset}px)`,
                transitionDuration: this.isDragging ? "0s" : "var(--swipe-cell-transition-duration)",
            };
        },
    },

    methods: {
        onTouchStart(event) {
            if (this.disabled) return;

            this.startX = event.touches[0].clientX;
            this.startOffset = this.offset;
            this.isDragging = true;
        },

        onTouchMove(event) {
            if (this.disabled || !this.isDragging) return;

            const touch = event.touches[0];
            const deltaX = touch.clientX - this.startX;
            const newOffset = this.startOffset + deltaX;

            // 限制滑动范围
            if ((newOffset > 0 && this.leftWidthPx === 0) || (newOffset < 0 && this.rightWidthPx === 0)) {
                return;
            }

            // 设置最大滑动范围
            const maxRightOffset = -this.rightWidthPx;
            const maxLeftOffset = this.leftWidthPx;

            if (newOffset > maxLeftOffset) {
                this.offset = maxLeftOffset;
            } else if (newOffset < maxRightOffset) {
                this.offset = maxRightOffset;
            } else {
                this.offset = newOffset;
            }
        },

        onTouchEnd() {
            if (this.disabled || !this.isDragging) return;

            this.isDragging = false;

            // 计算是否应该打开或关闭
            if (this.offset > 0) {
                // 左侧滑动逻辑
                if (this.offset > this.leftWidthPx * this.threshold) {
                    this.open("left");
                } else {
                    this.close();
                }
            } else if (this.offset < 0) {
                // 右侧滑动逻辑
                if (Math.abs(this.offset) > this.rightWidthPx * this.threshold) {
                    this.open("right");
                } else {
                    this.close();
                }
            }
        },

        onClick(event) {
            // 检查点击的元素是否在禁止自动关闭的名单中
            const target = event.target;
            const isDisableClose = this.disableCloseNames.some((name) => {
                return target.classList.contains(name) || target.closest(`.${name}`);
            });

            if (this.autoClose && !isDisableClose && (this.leftVisible || this.rightVisible)) {
                this.close();
            }

            this.$emit("click", event);
        },

        // 打开指定方向的侧边栏
        open(position) {
            if (position === "left") {
                this.offset = this.leftWidthPx;
                this.leftVisible = true;
                this.rightVisible = false;
            } else {
                this.offset = -this.rightWidthPx;
                this.leftVisible = false;
                this.rightVisible = true;
            }

            this.$emit("open", { position });
        },

        // 关闭侧边栏
        close() {
            this.offset = 0;
            this.leftVisible = false;
            this.rightVisible = false;
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss">
.fanc-swipe-cell {
    position: relative;
    overflow: hidden;

    &--disabled {
        cursor: not-allowed;
        opacity: var(--swipe-cell-disabled-opacity);
    }

    &__left,
    &__right {
        position: absolute;
        top: 0;
        height: 100%;
        display: flex;

        &--open {
            transition: transform var(--swipe-cell-transition-duration) ease;
        }
    }

    &__left {
        left: 0;
        transform: translateX(-100%);

        &--open {
            transform: translateX(0);
        }
    }

    &__right {
        right: 0;
        transform: translateX(100%);

        &--open {
            transform: translateX(0);
        }
    }

    &__content {
        position: relative;
        background-color: var(--swipe-cell-content-bg);
        transition-property: transform;
        transition-timing-function: ease;
        z-index: 1;
    }
}
</style>
