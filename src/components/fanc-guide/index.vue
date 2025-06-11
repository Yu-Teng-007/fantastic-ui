<template>
    <fanc-popup
        v-model:show="showGuide"
        :overlay="true"
        position="center"
        :overlay-closable="closeOnClickMask"
        :z-index="9999"
        custom-class="fanc-guide-popup"
    >
        <view class="fanc-guide" :class="[`fanc-guide--${theme}`]">
            <view
                class="fanc-guide__content"
                :class="{
                    'fanc-guide__content--with-close': showClose,
                }"
            >
                <!-- 标题 -->
                <view class="fanc-guide__header" v-if="currentTitle || $slots.title">
                    <slot name="title">
                        <text class="fanc-guide__title">{{ currentTitle }}</text>
                    </slot>
                </view>

                <!-- 内容 -->
                <view class="fanc-guide__body">
                    <slot>
                        <text class="fanc-guide__text">{{ currentText }}</text>
                    </slot>
                </view>

                <!-- 底部 -->
                <view class="fanc-guide__footer" v-if="showFooter">
                    <slot name="footer">
                        <!-- 步骤指示器 -->
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

                        <!-- 按钮区域 -->
                        <view class="fanc-guide__buttons">
                            <!-- 跳过按钮 -->
                            <view
                                class="fanc-guide__button fanc-guide__button--skip"
                                v-if="!isLastStep && showSkipButton"
                                @click="handleSkip"
                            >
                                <slot name="skip-button">{{ skipButtonText }}</slot>
                            </view>

                            <!-- 上一步按钮 -->
                            <view
                                class="fanc-guide__button fanc-guide__button--prev"
                                v-if="currentStep > 0 && showPrevButton"
                                @click="handlePrev"
                            >
                                <slot name="prev-button">{{ prevButtonText }}</slot>
                            </view>

                            <!-- 下一步/完成按钮 -->
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

                <!-- 关闭按钮 -->
                <view class="fanc-guide__close" v-if="showClose" @click="handleClose">
                    <slot name="close-icon">
                        <text class="fanc-guide__close-icon">×</text>
                    </slot>
                </view>
            </view>
        </view>
    </fanc-popup>
</template>

<script>
export default {
    name: "FancGuide",

    model: {
        prop: "show",
        event: "update:show",
    },

    props: {
        // 是否显示引导
        show: {
            type: [Boolean, Number],
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
        // 初始步骤
        initialStep: {
            type: Number,
            default: 0,
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
        // 是否显示跳过按钮
        showSkipButton: {
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
        // 跳过按钮文本
        skipButtonText: {
            type: String,
            default: "跳过",
        },
        // 主题风格
        theme: {
            type: String,
            default: "light",
            validator: (value) => ["light", "dark", "primary"].includes(value),
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
            currentStep: this.initialStep,
            timer: null,
        };
    },
    computed: {
        isLastStep() {
            // 如果没有步骤数据，则当作最后一步
            if (!this.steps || this.steps.length === 0) {
                return true;
            }
            return this.currentStep === this.steps.length - 1;
        },
        showGuide() {
            // 将show属性转换为布尔值
            return Boolean(this.show);
        },
        currentTitle() {
            // 根据当前步骤获取标题
            if (this.steps.length > 0 && this.currentStep < this.steps.length) {
                return this.steps[this.currentStep]?.title || "";
            }
            return this.title;
        },
        currentText() {
            // 根据当前步骤获取内容
            if (this.steps.length > 0 && this.currentStep < this.steps.length) {
                return this.steps[this.currentStep]?.content || "";
            }
            return this.text;
        },
    },
    watch: {
        initialStep(val) {
            this.currentStep = val;
        },
        show(val) {
            console.log("引导组件show属性变化:", val);
            if (val) {
                // 显示时重置步骤到初始值
                this.currentStep = this.initialStep;
                if (this.autoplay) {
                    this.startAutoplay();
                }
            } else {
                this.stopAutoplay();
            }
        },
        showGuide(val) {
            console.log("showGuide计算属性变化:", val);
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
            }
        },
        handlePrev() {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.$emit("prev", this.currentStep);
            }
        },
        handleClose() {
            this.$emit("close");
            this.$emit("update:show", false);
        },
        handleSkip() {
            this.$emit("skip");
            this.$emit("update:show", false);
        },
        startAutoplay() {
            this.stopAutoplay();
            this.timer = setInterval(() => {
                if (this.isLastStep) {
                    if (this.loop) {
                        this.currentStep = 0;
                    } else {
                        this.handleClose();
                        this.stopAutoplay();
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

<style lang="scss">
.fanc-guide-popup {
    .fanc-popup__content {
        background-color: transparent !important;
        box-shadow: none !important;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.fanc-guide {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fanc-guide__content {
    position: relative;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    padding: 24px;
    max-width: 320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.fanc-guide__header {
    margin-bottom: 16px;
}

.fanc-guide__title {
    font-size: 18px;
    font-weight: bold;
    color: var(--text-primary);
    line-height: 1.4;
}

.fanc-guide__body {
    flex: 1;
    margin-bottom: 24px;
}

.fanc-guide__text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
}

.fanc-guide__footer {
    display: flex;
    flex-direction: column;
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
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
}

.fanc-guide__button--skip {
    color: var(--gray-500);
    background-color: transparent;
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

.fanc-guide--dark .fanc-guide__button--skip {
    color: var(--gray-400);
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
    color: rgba(255, 255, 255, 0.8);
}

.fanc-guide--primary .fanc-guide__button--skip {
    color: rgba(255, 255, 255, 0.6);
}

.fanc-guide--primary .fanc-guide__button--prev {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--white);
}

.fanc-guide--primary .fanc-guide__button--next {
    background-color: var(--white);
    color: var(--fanc-primary-color);
}

.fanc-guide--primary .fanc-guide__step {
    background-color: rgba(255, 255, 255, 0.3);
}

.fanc-guide--primary .fanc-guide__step--active {
    background-color: var(--white);
}

.fanc-guide--primary .fanc-guide__close {
    background-color: rgba(255, 255, 255, 0.2);
}

.fanc-guide--primary .fanc-guide__close-icon {
    color: var(--white);
}
</style>
