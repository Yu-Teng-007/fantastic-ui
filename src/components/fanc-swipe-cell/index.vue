<template>
    <view
        class="fanc-swipe-cell"
        :class="{ 'fanc-swipe-cell--disabled': disabled }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <!-- 整体包装容器 -->
        <view class="fanc-swipe-cell__container">
            <!-- 左侧操作区域 -->
            <view
                class="fanc-swipe-cell__left"
                :style="leftStyle"
                :class="{ 'fanc-swipe-cell__left--open': leftVisible }"
                @click.stop
            >
                <!-- 按钮容器，增加内边距 -->
                <view class="fanc-swipe-cell__button-wrapper">
                    <slot name="left"></slot>
                </view>
            </view>

            <!-- 内容区域包装层 -->
            <view class="fanc-swipe-cell__wrapper">
                <view class="fanc-swipe-cell__content" :style="contentStyle" @click="onClick">
                    <slot></slot>
                </view>
            </view>

            <!-- 右侧操作区域 -->
            <view
                class="fanc-swipe-cell__right"
                :style="rightStyle"
                :class="{ 'fanc-swipe-cell__right--open': rightVisible }"
                @click.stop
            >
                <!-- 按钮容器，增加内边距 -->
                <view class="fanc-swipe-cell__button-wrapper">
                    <slot name="right"></slot>
                </view>
            </view>
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
        // 单个按钮宽度
        buttonWidth: {
            type: [Number, String],
            default: 80,
        },
        // 左侧按钮数量，为0时禁用左滑
        leftButtons: {
            type: [Number, String],
            default: 0,
        },
        // 右侧按钮数量，为0时禁用右滑
        rightButtons: {
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
            leftWidth: 0,
            rightWidth: 0,
        };
    },

    mounted() {
        this.updateSideWidths();
    },

    watch: {
        leftButtons() {
            this.updateSideWidths();
        },
        rightButtons() {
            this.updateSideWidths();
        },
        buttonWidth() {
            this.updateSideWidths();
        },
    },

    computed: {
        // 单个按钮宽度（像素）
        buttonWidthPx() {
            return parseInt(this.buttonWidth, 10) || 80;
        },

        // 左侧滑动区域样式
        leftStyle() {
            return {
                width: `${this.leftWidth}px`,
                justifyContent: "flex-start",
            };
        },

        // 右侧滑动区域样式
        rightStyle() {
            return {
                width: `${this.rightWidth}px`,
                justifyContent: "flex-end",
            };
        },

        contentStyle() {
            const isClosing = this.offset === 0 && (this.leftVisible || this.rightVisible);

            return {
                transform: `translateX(${this.offset}px)`,
                transitionDuration: this.isDragging
                    ? "0s"
                    : "var(--swipe-cell-transition-duration, 0.3s)",
                transitionProperty: "transform",
                transitionTimingFunction: "ease",
                marginRight: this.rightVisible || isClosing ? "3px" : "0",
                // 关闭时添加额外的右边距覆盖
                paddingRight: isClosing ? "5px" : "3px",
                // 增加额外的阴影效果，确保完全覆盖
                boxShadow: isClosing
                    ? "0 0 0 5px var(--swipe-cell-content-bg, #fff)"
                    : "0 0 0 3px var(--swipe-cell-content-bg, #fff)",
            };
        },
    },

    methods: {
        // 更新左右侧滑动区域宽度
        updateSideWidths() {
            const leftButtonCount = parseInt(this.leftButtons, 10) || 0;
            const rightButtonCount = parseInt(this.rightButtons, 10) || 0;

            this.leftWidth = leftButtonCount * this.buttonWidthPx;
            this.rightWidth = rightButtonCount * this.buttonWidthPx;

            // 如果当前正在显示左右侧区域，更新偏移量
            if (this.leftVisible) {
                this.offset = this.leftWidth;
            } else if (this.rightVisible) {
                this.offset = -this.rightWidth;
            }
        },

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
            if (
                (newOffset > 0 && this.leftWidth === 0) ||
                (newOffset < 0 && this.rightWidth === 0)
            ) {
                return;
            }

            // 设置最大滑动范围
            const maxRightOffset = -this.rightWidth;
            const maxLeftOffset = this.leftWidth;

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
                if (this.offset > this.leftWidth * this.threshold) {
                    this.open("left");
                } else {
                    this.close();
                }
            } else if (this.offset < 0) {
                // 右侧滑动逻辑
                if (Math.abs(this.offset) > this.rightWidth * this.threshold) {
                    this.open("right");
                } else {
                    this.close();
                }
            } else {
                // 如果没有偏移，确保关闭状态
                this.leftVisible = false;
                this.rightVisible = false;
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
                this.offset = this.leftWidth;
                this.leftVisible = true;
                this.rightVisible = false;
            } else {
                this.offset = -this.rightWidth;
                this.leftVisible = false;
                this.rightVisible = true;
            }

            this.$emit("open", { position });
        },

        // 关闭侧边栏
        close() {
            const wasOpen = this.leftVisible || this.rightVisible;

            // 先将offset设为0，触发内容区域回到原位的动画
            this.offset = 0;

            // 计算过渡动画持续时间，默认300ms
            const transitionDuration = 300;

            // 确保过渡动画结束后才改变状态，防止边框漏出
            if (wasOpen) {
                // 延长等待时间，确保动画完全结束
                setTimeout(() => {
                    this.leftVisible = false;
                    this.rightVisible = false;
                    // 触发关闭事件
                    this.$emit("close");
                }, transitionDuration + 50);
            } else {
                this.leftVisible = false;
                this.rightVisible = false;
                this.$emit("close");
            }
        },
    },
};
</script>

<style lang="scss">
.fanc-swipe-cell {
    position: relative;
    overflow: hidden;
    background-color: var(--swipe-cell-content-bg, #fff);
    box-sizing: border-box;

    &--disabled {
        cursor: not-allowed;
        opacity: var(--swipe-cell-disabled-opacity, 0.6);
    }

    &__container {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    &__wrapper {
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 2;
    }

    &__button-wrapper {
        display: flex;
        height: 100%;
        /* 缩小按钮容器尺寸，避免边缘露出 */
        margin: 1px;
        /* 确保没有边框 */
        border: none;
        box-sizing: border-box;
    }

    &__left,
    &__right {
        position: absolute;
        top: 0;
        height: 100%;
        display: flex;
        z-index: 0;
        /* 确保按钮内容不会超出 */
        overflow: hidden;
        /* 增加内边距，防止边框漏出 */
        box-sizing: border-box;
        /* 确保没有边框 */
        border: none;

        &--open {
            transition: transform var(--swipe-cell-transition-duration, 0.3s) ease;
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
        background-color: var(--swipe-cell-content-bg, #fff);
        transition-property: transform;
        transition-timing-function: ease;
        z-index: 1;
        width: 100%;
        box-sizing: border-box;
        transform: translateX(0);
        will-change: transform;
        overflow: hidden;
    }
}
</style>
