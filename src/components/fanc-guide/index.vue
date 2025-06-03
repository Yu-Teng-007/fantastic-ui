<template>
    <view class="fanc-guide" :class="[`fanc-guide--${theme}`]" v-if="show">
        <view class="fanc-guide__mask" @click="handleMaskClick" v-if="mask"></view>
        <view
            class="fanc-guide__content"
            :class="{
                'fanc-guide__content--centered': centered,
                'fanc-guide__content--with-close': showClose,
            }"
            :style="contentStyle"
        >
            <view class="fanc-guide__header" v-if="title || $slots.title">
                <slot name="title">
                    <text class="fanc-guide__title">{{ title }}</text>
                </slot>
            </view>
            <view class="fanc-guide__body">
                <slot>
                    <text class="fanc-guide__text">{{ text }}</text>
                </slot>
            </view>
            <view class="fanc-guide__footer" v-if="showFooter">
                <slot name="footer">
                    <view class="fanc-guide__steps" v-if="steps.length > 0">
                        <view
                            class="fanc-guide__step"
                            v-for="(step, index) in steps"
                            :key="index"
                            :class="{
                                'fanc-guide__step--active': index === currentStep,
                            }"
                        ></view>
                    </view>
                    <view class="fanc-guide__buttons">
                        <view
                            class="fanc-guide__button fanc-guide__button--prev"
                            v-if="currentStep > 0 && showPrevButton"
                            @click="handlePrev"
                        >
                            <slot name="prev-button">{{ prevButtonText }}</slot>
                        </view>
                        <view
                            class="fanc-guide__button fanc-guide__button--next"
                            @click="handleNext"
                        >
                            <slot name="next-button">
                                {{ isLastStep ? finishButtonText : nextButtonText }}
                            </slot>
                        </view>
                    </view>
                </slot>
            </view>
            <view class="fanc-guide__close" v-if="showClose" @click="handleClose">
                <slot name="close-icon">
                    <text class="fanc-guide__close-icon">×</text>
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancGuide",
    props: {
        // 是否显示引导
        show: {
            type: Boolean,
            default: true,
        },
        // 引导标题
        title: {
            type: String,
            default: "",
        },
        // 引导内容文本
        text: {
            type: String,
            default: "",
        },
        // 引导步骤数据
        steps: {
            type: Array,
            default: () => [],
        },
        // 当前步骤
        step: {
            type: Number,
            default: 0,
        },
        // 是否显示遮罩层
        mask: {
            type: Boolean,
            default: true,
        },
        // 点击遮罩是否关闭
        closeOnClickMask: {
            type: Boolean,
            default: false,
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: true,
        },
        // 是否显示底部
        showFooter: {
            type: Boolean,
            default: true,
        },
        // 是否显示上一步按钮
        showPrevButton: {
            type: Boolean,
            default: true,
        },
        // 上一步按钮文本
        prevButtonText: {
            type: String,
            default: "上一步",
        },
        // 下一步按钮文本
        nextButtonText: {
            type: String,
            default: "下一步",
        },
        // 完成按钮文本
        finishButtonText: {
            type: String,
            default: "完成",
        },
        // 引导框位置
        position: {
            type: Object,
            default: () => ({}),
        },
        // 是否居中显示
        centered: {
            type: Boolean,
            default: false,
        },
        // 主题风格
        theme: {
            type: String,
            default: "light",
            validator: (value) => ["light", "dark", "primary"].includes(value),
        },
        // 引导框宽度
        width: {
            type: [Number, String],
            default: 280,
        },
        // 引导框最大宽度
        maxWidth: {
            type: [Number, String],
            default: "80%",
        },
        // 是否自动播放
        autoplay: {
            type: Boolean,
            default: false,
        },
        // 自动播放间隔时间（毫秒）
        autoplayDelay: {
            type: Number,
            default: 3000,
        },
        // 是否循环播放
        loop: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentStep: this.step,
            timer: null,
        };
    },
    computed: {
        isLastStep() {
            return this.currentStep === this.steps.length - 1;
        },
        contentStyle() {
            const style = {};

            // 设置宽度
            if (this.width) {
                style.width = typeof this.width === "number" ? `${this.width}px` : this.width;
            }

            // 设置最大宽度
            if (this.maxWidth) {
                style.maxWidth =
                    typeof this.maxWidth === "number" ? `${this.maxWidth}px` : this.maxWidth;
            }

            // 设置位置
            if (!this.centered && this.position) {
                if (this.position.top !== undefined) {
                    style.top =
                        typeof this.position.top === "number"
                            ? `${this.position.top}px`
                            : this.position.top;
                }
                if (this.position.bottom !== undefined) {
                    style.bottom =
                        typeof this.position.bottom === "number"
                            ? `${this.position.bottom}px`
                            : this.position.bottom;
                }
                if (this.position.left !== undefined) {
                    style.left =
                        typeof this.position.left === "number"
                            ? `${this.position.left}px`
                            : this.position.left;
                }
                if (this.position.right !== undefined) {
                    style.right =
                        typeof this.position.right === "number"
                            ? `${this.position.right}px`
                            : this.position.right;
                }
            }

            return style;
        },
    },
    watch: {
        step(val) {
            this.currentStep = val;
        },
        show(val) {
            if (val && this.autoplay) {
                this.startAutoplay();
            } else {
                this.stopAutoplay();
            }
        },
        autoplay(val) {
            if (val && this.show) {
                this.startAutoplay();
            } else {
                this.stopAutoplay();
            }
        },
    },
    mounted() {
        if (this.show && this.autoplay) {
            this.startAutoplay();
        }
    },
    beforeDestroy() {
        this.stopAutoplay();
    },
    methods: {
        handleNext() {
            if (this.isLastStep) {
                this.$emit("finish");
                this.$emit("update:show", false);
            } else {
                this.currentStep++;
                this.$emit("next", this.currentStep);
                this.$emit("update:step", this.currentStep);
            }
        },
        handlePrev() {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.$emit("prev", this.currentStep);
                this.$emit("update:step", this.currentStep);
            }
        },
        handleClose() {
            this.$emit("close");
            this.$emit("update:show", false);
        },
        handleMaskClick() {
            if (this.closeOnClickMask) {
                this.handleClose();
            }
        },
        startAutoplay() {
            this.stopAutoplay();
            this.timer = setInterval(() => {
                if (this.isLastStep) {
                    if (this.loop) {
                        this.currentStep = 0;
                        this.$emit("update:step", 0);
                    } else {
                        this.stopAutoplay();
                        this.$emit("finish");
                    }
                } else {
                    this.handleNext();
                }
            }, this.autoplayDelay);
        },
        stopAutoplay() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
    },
};
</script>

<style>
.fanc-guide {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
}

.fanc-guide__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
}

.fanc-guide__content {
    position: absolute;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 20px;
    pointer-events: auto;
    z-index: 10000;
    box-sizing: border-box;
}

.fanc-guide__content--centered {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.fanc-guide__content--with-close {
    padding-top: 36px;
}

.fanc-guide__header {
    margin-bottom: 12px;
}

.fanc-guide__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
    display: block;
}

.fanc-guide__body {
    margin-bottom: 16px;
}

.fanc-guide__text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    display: block;
}

.fanc-guide__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fanc-guide__steps {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
}

.fanc-guide__step {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--gray-300);
    margin: 0 4px;
    transition: all 0.3s;
}

.fanc-guide__step--active {
    background-color: var(--fanc-primary-color);
    transform: scale(1.2);
}

.fanc-guide__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.fanc-guide__button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
}

.fanc-guide__button--prev {
    color: var(--text-secondary);
    background-color: var(--gray-100);
    margin-right: 8px;
}

.fanc-guide__button--next {
    color: var(--white);
    background-color: var(--fanc-primary-color);
    flex: 1;
}

.fanc-guide__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    background-color: var(--gray-100);
    transition: all 0.3s;
}

.fanc-guide__close:hover {
    background-color: var(--gray-200);
}

.fanc-guide__close-icon {
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1;
}

/* 暗色主题 */
.fanc-guide--dark .fanc-guide__content {
    background-color: var(--dark-color);
}

.fanc-guide--dark .fanc-guide__title {
    color: var(--white);
}

.fanc-guide--dark .fanc-guide__text {
    color: var(--gray-300);
}

.fanc-guide--dark .fanc-guide__button--prev {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--gray-300);
}

.fanc-guide--dark .fanc-guide__close {
    background-color: rgba(255, 255, 255, 0.1);
}

.fanc-guide--dark .fanc-guide__close-icon {
    color: var(--gray-300);
}

/* 主色主题 */
.fanc-guide--primary .fanc-guide__content {
    background-color: var(--fanc-primary-color);
}

.fanc-guide--primary .fanc-guide__title {
    color: var(--white);
}

.fanc-guide--primary .fanc-guide__text {
    color: rgba(255, 255, 255, 0.9);
}

.fanc-guide--primary .fanc-guide__step {
    background-color: rgba(255, 255, 255, 0.5);
}

.fanc-guide--primary .fanc-guide__step--active {
    background-color: var(--white);
}

.fanc-guide--primary .fanc-guide__button--prev {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--white);
}

.fanc-guide--primary .fanc-guide__button--next {
    background-color: var(--white);
    color: var(--fanc-primary-color);
}

.fanc-guide--primary .fanc-guide__close {
    background-color: rgba(255, 255, 255, 0.2);
}

.fanc-guide--primary .fanc-guide__close-icon {
    color: var(--white);
}
</style>
