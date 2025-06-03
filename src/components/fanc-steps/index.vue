<template>
    <view class="fanc-steps" :class="[`fanc-steps--${direction}`]">
        <view
            class="fanc-steps__items"
            :class="{
                'fanc-steps__items--center': center,
            }"
        >
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancSteps",
    props: {
        // 步骤条方向，可选值为 horizontal、vertical
        direction: {
            type: String,
            default: "horizontal",
            validator: (value) => ["horizontal", "vertical"].includes(value),
        },
        // 当前步骤
        active: {
            type: Number,
            default: 0,
        },
        // 是否居中展示
        center: {
            type: Boolean,
            default: false,
        },
        // 自定义图标大小
        iconSize: {
            type: [String, Number],
            default: 24,
        },
        // 自定义激活状态颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 自定义未激活状态颜色
        inactiveColor: {
            type: String,
            default: "",
        },
    },
    provide() {
        return {
            steps: this,
        };
    },
};
</script>

<style>
.fanc-steps {
    width: 100%;
    overflow: hidden;
}

.fanc-steps--horizontal {
    padding: 10px 0;
}

.fanc-steps--vertical {
    padding: 0 10px;
}

.fanc-steps__items {
    position: relative;
    display: flex;
}

.fanc-steps--horizontal .fanc-steps__items {
    flex-direction: row;
}

.fanc-steps--vertical .fanc-steps__items {
    flex-direction: column;
    height: 100%;
}

.fanc-steps__items--center {
    justify-content: center;
}
</style>
