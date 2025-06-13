<template>
    <view
        class="fanc-image"
        :class="[
            round ? 'fanc-image--round' : '',
            `fanc-image--mode-${mode}`,
            showError ? 'fanc-image--error' : '',
            showLoading ? 'fanc-image--loading' : '',
        ]"
        :style="wrapStyle"
        @click="onImgClick"
    >
        <!-- 原始图片，只有在未加载失败或者还未尝试加载替代图片时显示 -->
        <image
            v-if="!useFallback"
            :src="src"
            :mode="mode"
            :lazy-load="lazyLoad"
            class="fanc-image__img"
            :show-menu-by-longpress="showMenuByLongpress"
            @load="onImgLoad"
            @error="onSrcImgError"
        />

        <!-- 替代图片，只有在原始图片加载失败且存在fallbackSrc时显示 -->
        <image
            v-if="useFallback && fallbackSrc"
            :src="fallbackSrc"
            :mode="mode"
            :lazy-load="lazyLoad"
            class="fanc-image__img"
            :show-menu-by-longpress="showMenuByLongpress"
            @load="onFallbackImgLoad"
            @error="onFallbackImgError"
        />

        <!-- 加载错误提示 -->
        <view v-if="showError && !(useFallback && fallbackLoaded)" class="fanc-image__error">
            <slot name="error">
                <view class="fanc-image__error-icon">
                    <view class="fanc-image__error-icon-wrapper">
                        <view class="fanc-image__error-line fanc-image__error-line-x"></view>
                        <view class="fanc-image__error-line fanc-image__error-line-y"></view>
                    </view>
                </view>
                <text v-if="errorText" class="fanc-image__error-text">{{ errorText }}</text>
            </slot>
        </view>

        <!-- 加载中提示 -->
        <view v-if="showLoading" class="fanc-image__loading">
            <slot name="loading">
                <view class="fanc-image__loading-spinner">
                    <view
                        v-for="i in 12"
                        :key="i"
                        class="fanc-image__loading-dot"
                        :style="{ transform: `rotate(${(i - 1) * 30}deg)` }"
                    >
                        <view class="fanc-image__loading-dot-item"></view>
                    </view>
                </view>
                <text v-if="loadingText" class="fanc-image__loading-text">{{ loadingText }}</text>
            </slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancImage",
    props: {
        // 图片链接
        src: {
            type: String,
            default: "",
        },
        // 替代图片链接（加载失败时显示）
        fallbackSrc: {
            type: String,
            default: "",
        },
        // 图片裁剪、缩放的模式
        mode: {
            type: String,
            default: "aspectFill",
            validator: (value) => {
                return [
                    "scaleToFill",
                    "aspectFit",
                    "aspectFill",
                    "widthFix",
                    "heightFix",
                    "top",
                    "bottom",
                    "center",
                    "left",
                    "right",
                    "top left",
                    "top right",
                    "bottom left",
                    "bottom right",
                ].includes(value);
            },
        },
        // 宽度，支持数值或带单位字符串
        width: {
            type: [Number, String],
            default: "",
        },
        // 高度，支持数值或带单位字符串
        height: {
            type: [Number, String],
            default: "",
        },
        // 圆形图片
        round: {
            type: Boolean,
            default: false,
        },
        // 图片懒加载
        lazyLoad: {
            type: Boolean,
            default: false,
        },
        // 加载中提示文字
        loadingText: {
            type: String,
            default: "",
        },
        // 加载失败提示文字
        errorText: {
            type: String,
            default: "",
        },
        // 显示菜单（长按）
        showMenuByLongpress: {
            type: Boolean,
            default: false,
        },
        // 背景颜色
        background: {
            type: String,
            default: "",
        },
        // 自定义样式
        customStyle: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            isLoading: true,
            isError: false,
            useFallback: false, // 是否使用替代图片
            fallbackLoaded: false, // 替代图片是否加载成功
            fallbackError: false, // 替代图片是否加载失败
        };
    },

    computed: {
        // 容器样式
        wrapStyle() {
            const style = { ...this.customStyle };

            // 设置宽高
            if (this.width) {
                style.width = this.addUnit(this.width);
            }

            if (this.height) {
                style.height = this.addUnit(this.height);
            }

            // 设置背景色
            if (this.background) {
                style.backgroundColor = this.background;
            }

            return style;
        },

        // 是否显示加载中
        showLoading() {
            return this.isLoading && !this.isError;
        },

        // 是否显示错误提示
        showError() {
            return this.isError && (this.fallbackError || !this.fallbackSrc);
        },
    },

    watch: {
        src(newVal) {
            if (newVal) {
                this.isLoading = true;
                this.isError = false;
                this.useFallback = false;
                this.fallbackLoaded = false;
                this.fallbackError = false;
            }
        },

        fallbackSrc(newVal) {
            if (this.useFallback && newVal) {
                this.isLoading = true;
                this.fallbackLoaded = false;
                this.fallbackError = false;
            }
        },
    },

    mounted() {
        // 确保组件挂载后更新状态
        if (!this.src) {
            this.isLoading = false;
        }
    },

    methods: {
        // 统一添加单位
        addUnit(value) {
            if (value == null) {
                return "";
            }

            return typeof value === "number" ? `${value}px` : String(value);
        },

        // 图片加载完成
        onImgLoad(event) {
            this.isLoading = false;
            this.isError = false;
            this.$emit("load", event);
        },

        // 点击图片
        onImgClick(event) {
            this.$emit("click", event);
        },

        // 原始图片加载失败
        onSrcImgError(event) {
            this.isLoading = false;
            this.isError = true;

            // 如果有替代图片，则使用替代图片
            if (this.fallbackSrc) {
                this.useFallback = true;
                this.isLoading = true;
                this.isError = false;
            } else {
                this.$emit("error", event);
            }
        },

        // 替代图片加载完成
        onFallbackImgLoad(event) {
            this.isLoading = false;
            this.isError = false;
            this.fallbackLoaded = true;
            this.$emit("load", event);
        },

        // 替代图片加载失败
        onFallbackImgError(event) {
            this.isLoading = false;
            this.isError = true;
            this.fallbackError = true;
            this.$emit("error", event);
        },
    },
};
</script>

<style>
.fanc-image {
    position: relative;
    display: inline-block;
    width: 100px; /* 默认宽度 */
    height: 100px; /* 默认高度 */
    overflow: hidden;
    background-color: var(--image-bg-color);
}

.fanc-image__img {
    display: block;
    width: 100%;
    height: 100%;
}

/* 其他模式由 uniapp 原生支持 */

/* 圆形图片 */
.fanc-image--round {
    border-radius: 50%;
}

.fanc-image--round .fanc-image__img {
    border-radius: 50%;
}

/* 错误状态 */
.fanc-image--error {
    background-color: var(--image-error-bg-color);
}

.fanc-image__error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.fanc-image__error-icon {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--image-error-icon-color);
}

.fanc-image__error-icon-wrapper {
    position: relative;
    width: 24px;
    height: 24px;
}

.fanc-image__error-line {
    position: absolute;
    background-color: var(--image-error-icon-color);
    border-radius: 1px;
}

.fanc-image__error-line-x {
    width: 100%;
    height: 2px;
    top: 50%;
    transform: translateY(-50%);
}

.fanc-image__error-line-y {
    width: 2px;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
}

.fanc-image__error-text {
    font-size: 12px;
    color: var(--image-error-text-color);
    margin-top: 4px;
}

/* 加载中状态 */
.fanc-image--loading {
    background-color: var(--image-loading-bg-color);
}

.fanc-image__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.fanc-image__loading-spinner {
    position: relative;
    width: 32px;
    height: 32px;
    animation: fanc-image-rotate 1.2s linear infinite;
}

.fanc-image__loading-dot {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.fanc-image__loading-dot-item {
    width: 2px;
    height: 25%;
    border-radius: 40%;
    background-color: var(--image-loading-icon-color);
    position: absolute;
    left: 15px;
    top: 0;
    opacity: 0.25;
    animation: fanc-image-opacity 1s linear infinite;
}

.fanc-image__loading-text {
    font-size: 12px;
    color: var(--image-loading-text-color);
    margin-top: 8px;
}

@keyframes fanc-image-rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes fanc-image-opacity {
    0% {
        opacity: 0.25;
    }
    40% {
        opacity: 1;
    }
    80% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}
</style>
