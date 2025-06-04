<template>
    <view
        v-if="show"
        class="fanc-alert"
        :class="[
            `fanc-alert--${type}`,
            {
                'fanc-alert--plain': plain,
                'fanc-alert--round': round,
                'fanc-alert--with-icon': showIcon,
                'fanc-alert--with-description': !!description,
                'fanc-alert--center': center,
            },
        ]"
    >
        <!-- 图标 -->
        <view v-if="showIcon" class="fanc-alert__icon">
            <fanc-icon :name="iconName" :size="description ? 20 : 16"></fanc-icon>
        </view>

        <!-- 内容区域 -->
        <view class="fanc-alert__content">
            <view class="fanc-alert__title">
                <slot>{{ title }}</slot>
            </view>
            <view v-if="description" class="fanc-alert__description">
                <slot name="description">{{ description }}</slot>
            </view>
        </view>

        <!-- 关闭按钮 -->
        <view v-if="closable" class="fanc-alert__close" @click="onClose">
            <fanc-icon name="times" size="14"></fanc-icon>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-alert",
    props: {
        // 警告提示的类型
        type: {
            type: String,
            default: "info",
            validator: (value) => {
                return ["info", "success", "warning", "error"].includes(value);
            },
        },
        // 警告提示的标题
        title: {
            type: String,
            default: "",
        },
        // 警告提示的辅助性文字介绍
        description: {
            type: String,
            default: "",
        },
        // 是否显示图标
        showIcon: {
            type: Boolean,
            default: false,
        },
        // 自定义图标名称
        icon: {
            type: String,
            default: "",
        },
        // 是否可关闭
        closable: {
            type: Boolean,
            default: false,
        },
        // 是否使用圆角
        round: {
            type: Boolean,
            default: false,
        },
        // 是否使用浅色背景
        plain: {
            type: Boolean,
            default: false,
        },
        // 文字是否居中
        center: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: true,
        };
    },
    computed: {
        iconName() {
            if (this.icon) {
                return this.icon;
            }

            // 根据类型设置默认图标
            const iconMap = {
                info: "info-circle",
                success: "check-circle",
                warning: "exclamation-triangle",
                error: "times-circle",
            };

            return iconMap[this.type] || "info-circle";
        },
    },
    methods: {
        onClose() {
            this.show = false;
            this.$emit("close");
        },
    },
};
</script>

<style>
.fanc-alert {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: var(--alert-padding);
    border-radius: var(--alert-border-radius);
    font-size: var(--alert-font-size);
    line-height: var(--alert-line-height);
    box-sizing: border-box;
    overflow: hidden;
}

/* 类型样式 */
.fanc-alert--info {
    color: var(--alert-info-color);
    background-color: var(--alert-info-bg-color);
    border: 1px solid var(--alert-info-border-color);
}

.fanc-alert--success {
    color: var(--alert-success-color);
    background-color: var(--alert-success-bg-color);
    border: 1px solid var(--alert-success-border-color);
}

.fanc-alert--warning {
    color: var(--alert-warning-color);
    background-color: var(--alert-warning-bg-color);
    border: 1px solid var(--alert-warning-border-color);
}

.fanc-alert--error {
    color: var(--alert-error-color);
    background-color: var(--alert-error-bg-color);
    border: 1px solid var(--alert-error-border-color);
}

/* 浅色背景样式 */
.fanc-alert--plain {
    background-color: var(--white);
}

/* 圆角样式 */
.fanc-alert--round {
    border-radius: var(--alert-round-border-radius);
}

/* 图标样式 */
.fanc-alert__icon {
    margin-right: var(--alert-icon-margin-right);
    display: flex;
    align-items: flex-start;
}

/* 内容区域样式 */
.fanc-alert__content {
    flex: 1;
    min-width: 0;
}

/* 标题样式 */
.fanc-alert__title {
    font-weight: var(--alert-title-font-weight);
    word-wrap: break-word;
}

/* 描述文字样式 */
.fanc-alert__description {
    margin-top: var(--alert-description-margin-top);
    font-size: var(--alert-description-font-size);
    color: var(--alert-description-color);
    word-wrap: break-word;
}

/* 关闭按钮样式 */
.fanc-alert__close {
    position: absolute;
    top: var(--alert-close-top);
    right: var(--alert-close-right);
    padding: var(--alert-close-padding);
    cursor: pointer;
    color: var(--alert-close-color);
}

/* 居中样式 */
.fanc-alert--center {
    justify-content: center;
    text-align: center;
}

.fanc-alert--center .fanc-alert__content {
    flex: 0 1 auto;
}

/* 带有描述的样式调整 */
.fanc-alert--with-description .fanc-alert__title {
    font-size: var(--alert-with-description-title-font-size);
    margin-bottom: var(--alert-with-description-title-margin-bottom);
}

/* 带有图标且有描述时的样式调整 */
.fanc-alert--with-icon.fanc-alert--with-description .fanc-alert__icon {
    margin-top: var(--alert-with-description-icon-margin-top);
}
</style>
