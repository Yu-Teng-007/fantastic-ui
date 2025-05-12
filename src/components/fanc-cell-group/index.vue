<!-- fanc-cell-group 单元格组组件 -->
<template>
    <view class="fanc-cell-group" :class="{ 'fanc-cell-group--inset': inset }">
        <!-- 标题 -->
        <view class="fanc-cell-group__title" v-if="title || $slots.title">
            <slot name="title">{{ title }}</slot>
        </view>

        <!-- 单元格容器 -->
        <view class="fanc-cell-group__container" :class="{ 'fanc-cell-group__container--inset': inset }">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-cell-group",

    props: {
        // 分组标题
        title: {
            type: String,
            default: "",
        },
        // 是否展示为圆角卡片风格
        inset: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.fanc-cell-group {
    &__title {
        padding: $spacing-lg $spacing-lg $spacing-sm;
        color: $gray-600;
        font-size: $font-size-base;
        line-height: $font-size-base;
    }

    &__container {
        position: relative;
        background-color: $white;

        &::after {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            z-index: 1;
            top: 0;
            right: 0;
            left: 0;
            border-top: $border-width solid $border-color;
            transform: scaleY(0.5);
        }

        &::before {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            z-index: 1;
            right: 0;
            bottom: 0;
            left: 0;
            border-bottom: $border-width solid $border-color;
            transform: scaleY(0.5);
        }

        &--inset {
            margin: 0 $spacing-lg;
            border-radius: $border-radius-normal;
            overflow: hidden;

            &::after,
            &::before {
                display: none;
            }
        }
    }

    &--inset {
        margin: 0 $spacing-lg;
    }
}
</style>
