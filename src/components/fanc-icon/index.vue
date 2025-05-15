<template>
    <view
        class="fanc-icon"
        :class="{ 'is-spin': spin }"
        :style="customStyle"
        @click="handleClick"
        :hover-class="clickable ? 'fanc-icon--hover' : ''"
    >
        <i v-if="!isSvgIcon && !isImageIcon" :class="`fa${iconType} fa-${name}`" :style="iconStyle"></i>
        <image v-if="isImageIcon" :src="name" :style="iconStyle" class="fanc-icon__image" mode="aspectFit"></image>
        <view v-if="dot" class="fanc-icon__dot"></view>
        <view v-if="badge" class="fanc-icon__badge">{{ badge }}</view>
    </view>
</template>

<script>
/**
 * fanc-icon 图标
 * @description 图标组件，基于Font Awesome图标库，支持自定义颜色、大小
 * @property {String} name - 图标名称或图片URL
 * @property {String} type - 图标类型，可选值为 solid/regular/brands
 * @property {String|Number} size - 图标大小，单位为px
 * @property {String} color - 图标颜色
 * @property {Boolean} dot - 是否显示小红点
 * @property {String|Number} badge - 图标右上角的徽标内容
 * @property {Boolean} spin - 是否启用旋转动画
 * @property {Boolean} clickable - 是否可点击
 * @property {Object|String} customStyle - 自定义样式
 * @event {Function} click - 点击图标时触发
 */
export default {
    name: "fanc-icon",
    props: {
        // 图标名称或图片URL
        name: {
            type: String,
            required: true,
        },
        // 图标类型：solid/regular/brands
        type: {
            type: String,
            default: "solid",
            validator: (value) => ["solid", "regular", "brands"].includes(value),
        },
        // 图标大小，单位为px
        size: {
            type: [String, Number],
            default: 24,
        },
        // 图标颜色
        color: {
            type: String,
            default: "",
        },
        // 是否显示小红点
        dot: {
            type: Boolean,
            default: false,
        },
        // 图标右上角的徽标内容
        badge: {
            type: [String, Number],
            default: "",
        },
        // 是否启用旋转动画
        spin: {
            type: Boolean,
            default: false,
        },
        // 是否可点击
        clickable: {
            type: Boolean,
            default: false,
        },
        // 自定义样式
        customStyle: {
            type: [Object, String],
            default: () => ({}),
        },
    },
    computed: {
        // 确定图标类型前缀
        iconType() {
            return this.type === "solid" ? "s" : this.type === "regular" ? "r" : "b";
        },
        // 计算图标样式
        iconStyle() {
            const style = {};

            if (this.size) {
                style.fontSize =
                    typeof this.size === "number"
                        ? `${this.size}px`
                        : this.size.includes("px")
                        ? this.size
                        : `${this.size}px`;

                if (this.isImageIcon) {
                    style.width = style.fontSize;
                    style.height = style.fontSize;
                }
            }

            if (this.color) {
                style.color = this.color;
            }

            return style;
        },
        // 判断是否为SVG图标
        isSvgIcon() {
            return this.name && this.name.endsWith(".svg");
        },
        // 判断是否为图片图标
        isImageIcon() {
            return (
                this.name &&
                (this.name.startsWith("http") ||
                    this.name.startsWith("/") ||
                    this.name.startsWith("./") ||
                    this.name.endsWith(".png") ||
                    this.name.endsWith(".jpg") ||
                    this.name.endsWith(".jpeg") ||
                    this.name.endsWith(".gif"))
            );
        },
    },
    methods: {
        // 处理图标点击事件
        handleClick(event) {
            if (this.clickable) {
                this.$emit("click", event);
            }
        },
    },
};
</script>

<style lang="scss">
.fanc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    line-height: 1;

    // 加载图片图标
    &__image {
        width: 100%;
        height: 100%;
    }

    // 小红点样式
    &__dot {
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        background-color: var(--fanc-danger-color);
        border-radius: 50%;
        transform: translate(50%, -50%);
        z-index: 1;
    }

    // 徽标样式
    &__badge {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        background-color: var(--fanc-danger-color);
        border-radius: 8px;
        color: var(--white);
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        transform: translate(90%, -50%);
        z-index: 1;
        box-sizing: border-box;
    }

    // 旋转动画
    &.is-spin {
        animation: fanc-icon-spin 500ms linear infinite;
    }

    // 点击反馈效果
    &--hover {
        opacity: 0.8;
    }
}

// 旋转动画关键帧
@keyframes fanc-icon-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
