<template>
    <view
        class="fanc-skeleton"
        :class="{
            'is-animated': animated,
            'is-round': round,
            'is-loading': loading,
        }"
        :style="{ backgroundColor: bgColor }"
    >
        <!-- 骨架屏内容区域 -->
        <view v-if="loading" class="fanc-skeleton__content">
            <!-- 标题骨架 -->
            <view v-if="title" class="fanc-skeleton__title" :style="{ width: titleWidth }"></view>

            <!-- 头像骨架 -->
            <view
                v-if="avatar"
                class="fanc-skeleton__avatar"
                :class="{ 'is-round': avatarRound }"
                :style="{
                    width: avatarSize,
                    height: avatarSize,
                }"
            ></view>

            <!-- 段落骨架 -->
            <view v-if="paragraph" class="fanc-skeleton__paragraph">
                <view
                    v-for="(item, index) in rowArray"
                    :key="index"
                    class="fanc-skeleton__row"
                    :style="{ width: getRowWidth(index) }"
                ></view>
            </view>

            <!-- 自定义内容区域 -->
            <slot name="template"></slot>
        </view>

        <!-- 实际内容区域 -->
        <view v-else class="fanc-skeleton__real-content">
            <slot></slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-skeleton 骨架屏
 * @description 在页面数据加载完成前，先展示出页面的大致结构，减少用户等待时的焦虑感
 * @property {Boolean} loading - 是否显示骨架屏，true表示显示骨架屏，false则显示实际内容
 * @property {Boolean} animated - 是否启用动画效果
 * @property {Boolean} avatar - 是否显示头像占位图
 * @property {String} avatar-size - 头像占位图大小，默认为32px
 * @property {Boolean} avatar-round - 头像是否为圆形
 * @property {Boolean} title - 是否显示标题占位图
 * @property {String} title-width - 标题占位图宽度，默认为40%
 * @property {Boolean} paragraph - 是否显示段落占位图
 * @property {Number} row-count - 段落占位图行数，默认为3
 * @property {Array} row-widths - 自定义每行宽度，如 ['60%', '100%', '80%']，优先级高于row-width属性
 * @property {Boolean} round - 所有占位图是否显示为圆角风格
 * @property {String} bg-color - 骨架屏背景色
 * @slot default - 实际内容插槽，当loading为false时显示
 * @slot template - 自定义骨架屏模板，可用于复杂布局
 */
export default {
    name: "fanc-skeleton",
    props: {
        // 是否显示骨架屏
        loading: {
            type: Boolean,
            default: true,
        },
        // 是否启用动画效果
        animated: {
            type: Boolean,
            default: true,
        },
        // 是否显示头像占位图
        avatar: {
            type: Boolean,
            default: false,
        },
        // 头像占位图大小
        avatarSize: {
            type: String,
            default: "32px",
        },
        // 头像是否为圆形
        avatarRound: {
            type: Boolean,
            default: false,
        },
        // 是否显示标题占位图
        title: {
            type: Boolean,
            default: true,
        },
        // 标题占位图宽度
        titleWidth: {
            type: String,
            default: "40%",
        },
        // 是否显示段落占位图
        paragraph: {
            type: Boolean,
            default: true,
        },
        // 段落占位图行数
        rowCount: {
            type: Number,
            default: 3,
        },
        // 自定义每行宽度，如 ['60%', '100%', '80%']
        rowWidths: {
            type: Array,
            default: null,
        },
        // 所有占位图是否显示为圆角风格
        round: {
            type: Boolean,
            default: false,
        },
        // 骨架屏背景色
        bgColor: {
            type: String,
            default: "",
        },
    },
    computed: {
        // 生成段落行数组
        rowArray() {
            return Array.from({ length: this.rowCount });
        },
    },
    methods: {
        // 获取每行的宽度
        getRowWidth(index) {
            // 如果提供了自定义宽度数组，优先使用
            if (this.rowWidths && this.rowWidths[index] !== undefined) {
                return this.rowWidths[index];
            }

            // 默认宽度逻辑：最后一行宽度为60%，其余为100%
            if (index === this.rowCount - 1 && this.rowCount > 1) {
                return "60%";
            }
            return "100%";
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-skeleton {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;

    // 通用占位元素样式
    &__title,
    &__avatar,
    &__row {
        background-color: var(--skeleton-bg-color, #eeeeee);
        background-image: var(--skeleton-gradient, none);
    }

    // 标题占位图样式
    &__title {
        height: 16px;
        margin-bottom: 12px;
        border-radius: var(--skeleton-title-radius, 2px);
    }

    // 头像占位图样式
    &__avatar {
        float: left;
        margin-right: 12px;
        border-radius: var(--skeleton-avatar-radius, 2px);

        &.is-round {
            border-radius: 50%;
        }
    }

    // 段落占位图样式
    &__paragraph {
        overflow: hidden;

        .fanc-skeleton__row {
            height: 12px;
            margin-top: 12px;
            border-radius: var(--skeleton-row-radius, 2px);

            &:first-child {
                margin-top: 0;
            }
        }
    }

    // 圆角风格
    &.is-round {
        .fanc-skeleton__title,
        .fanc-skeleton__row {
            border-radius: var(--skeleton-round-radius, 8px);
        }

        .fanc-skeleton__avatar:not(.is-round) {
            border-radius: var(--skeleton-round-radius, 8px);
        }
    }

    // 动画效果
    &.is-animated {
        .fanc-skeleton__title,
        .fanc-skeleton__avatar,
        .fanc-skeleton__row {
            background: linear-gradient(
                90deg,
                var(--skeleton-from-color, #eeeeee) 25%,
                var(--skeleton-to-color, #dddddd) 37%,
                var(--skeleton-from-color, #eeeeee) 63%
            );
            background-size: 400% 100%;
            animation: fanc-skeleton-loading 1.4s ease infinite;
        }
    }
}

@keyframes fanc-skeleton-loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
