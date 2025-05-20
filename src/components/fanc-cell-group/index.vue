<!-- fanc-cell-group 单元格组组件 -->
<template>
    <view class="fanc-cell-group" :class="{ 'fanc-cell-group--inset': inset }">
        <!-- 标题区域 -->
        <view class="fanc-cell-group__header" v-if="title || description || $slots.title || $slots.description">
            <!-- 标题 -->
            <view class="fanc-cell-group__title" v-if="title || $slots.title">
                <slot name="title">{{ title }}</slot>
            </view>
            
            <!-- 描述信息 -->
            <view class="fanc-cell-group__description" v-if="description || $slots.description">
                <slot name="description">{{ description }}</slot>
            </view>
        </view>

        <!-- 单元格容器 -->
        <view
            class="fanc-cell-group__container"
            :class="{ 'fanc-cell-group__container--inset': inset }"
        >
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
        // 分组描述信息
        description: {
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
.fanc-cell-group {
    &__header {
        padding: 16px 16px 8px;
    }
    
    &__title {
        color: var(--gray-600);
        font-size: 14px;
        line-height: 1.2;
        font-weight: 500;
    }
    
    &__description {
        margin-top: 4px;
        color: var(--gray-500);
        font-size: 12px;
        line-height: 1.4;
    }

    &__container {
        position: relative;
        background-color: var(--white);

        &::after {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            z-index: 1;
            top: 0;
            right: 0;
            left: 0;
            border-top: 1px solid var(--border-color);
            transform: scaleY(0.5);
        }

        &--inset {
            border-radius: 8px;
            overflow: hidden;

            &::after,
            &::before {
                display: none;
            }
        }
    }

    &--inset {
        margin: 0 16px;
    }
}
</style>
