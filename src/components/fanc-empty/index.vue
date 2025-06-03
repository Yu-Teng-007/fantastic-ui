<template>
    <view :class="['fanc-empty', `fanc-empty--${type}`, customClass]" :style="customStyle">
        <view
            class="fanc-empty__image"
            :style="{ width: imageSize + 'px', height: imageSize + 'px' }"
        >
            <image
                v-if="image"
                :src="image"
                class="fanc-empty__image-content"
                mode="aspectFit"
            ></image>
            <fanc-icon
                v-else-if="icon"
                :name="icon"
                :size="iconSize"
                :color="iconColor"
            ></fanc-icon>
            <slot v-else name="image">
                <fanc-icon name="inbox" size="50" color="#c8c9cc"></fanc-icon>
            </slot>
        </view>
        <view v-if="description || $slots.description" class="fanc-empty__description">
            <slot name="description">{{ description }}</slot>
        </view>
        <view v-if="$slots.default" class="fanc-empty__bottom">
            <slot></slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-empty 空状态组件
 * @description 用于空状态时的占位提示
 * @property {String} description - 描述文字
 * @property {String} image - 图片链接
 * @property {String} icon - 图标名称
 * @property {Number} imageSize - 图片尺寸
 * @property {Number} iconSize - 图标尺寸
 * @property {String} iconColor - 图标颜色
 * @property {String} type - 预设类型，可选值：default、error、search、network
 * @property {String} customClass - 自定义类名
 * @property {String} customStyle - 自定义样式
 * @event {Function} click - 点击空状态时触发
 * @example <fanc-empty description="暂无数据"></fanc-empty>
 */
export default {
    name: "FancEmpty",
    props: {
        description: {
            type: String,
            default: "暂无数据",
        },
        image: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        imageSize: {
            type: Number,
            default: 100,
        },
        iconSize: {
            type: Number,
            default: 50,
        },
        iconColor: {
            type: String,
            default: "#c8c9cc",
        },
        type: {
            type: String,
            default: "default",
            validator(value) {
                return ["default", "error", "search", "network"].includes(value);
            },
        },
        customClass: {
            type: String,
            default: "",
        },
        customStyle: {
            type: String,
            default: "",
        },
    },
};
</script>

<style>
.fanc-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 40px 0;
}

.fanc-empty__image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
}

.fanc-empty__image-content {
    width: 100%;
    height: 100%;
}

.fanc-empty__description {
    margin-bottom: 16px;
    padding: 0 30px;
    color: var(--empty-description-color, var(--text-secondary));
    font-size: var(--empty-description-font-size, 14px);
    line-height: var(--empty-description-line-height, 1.5);
    text-align: center;
}

.fanc-empty__bottom {
    margin-top: 8px;
}

/* 预设类型样式 */
.fanc-empty--error .fanc-empty__description {
    color: var(--empty-error-color, var(--fanc-danger-color));
}

.fanc-empty--search .fanc-empty__description {
    color: var(--empty-search-color, var(--text-secondary));
}

.fanc-empty--network .fanc-empty__description {
    color: var(--empty-network-color, var(--fanc-warning-color));
}
</style>
