<template>
    <view class="fanc-text-ellipsis" :class="{ 'fanc-text-ellipsis--expanded': expanded }">
        <!-- 文本容器 -->
        <view class="fanc-text-ellipsis__content" :style="contentStyle">
            <slot>{{ text }}</slot>
        </view>

        <!-- 展开/收起按钮 -->
        <view v-if="showTrigger" class="fanc-text-ellipsis__trigger" @click="handleToggle">
            <text class="fanc-text-ellipsis__trigger-text" :style="{ color: triggerColor }">
                {{ expanded ? collapseText : expandText }}
            </text>
            <fanc-icon
                v-if="showIcon"
                :name="expanded ? 'chevron-up' : 'chevron-down'"
                :color="triggerColor"
                size="12"
                class="fanc-text-ellipsis__trigger-icon"
            />
        </view>
    </view>
</template>

<script>
export default {
    name: "FancTextEllipsis",

    props: {
        // 显示的文本内容
        text: {
            type: String,
            default: "",
        },
        // 最大行数
        rows: {
            type: Number,
            default: 3,
        },
        // 是否默认展开
        defaultExpanded: {
            type: Boolean,
            default: false,
        },
        // 展开文本
        expandText: {
            type: String,
            default: "展开",
        },
        // 收起文本
        collapseText: {
            type: String,
            default: "收起",
        },
        // 展开/收起按钮颜色
        triggerColor: {
            type: String,
            default: "var(--fanc-primary-color)",
        },
        // 是否显示图标
        showIcon: {
            type: Boolean,
            default: true,
        },
        // 是否始终显示展开/收起按钮
        alwaysShowTrigger: {
            type: Boolean,
            default: false,
        },
        // 文本行高
        lineHeight: {
            type: String,
            default: "1.5",
        },
        // 文本字体大小
        fontSize: {
            type: String,
            default: "14px",
        },
        // 文本颜色
        textColor: {
            type: String,
            default: "var(--text-primary)",
        },
    },

    data() {
        return {
            expanded: this.defaultExpanded,
            needTrigger: false,
            originalHeight: 0,
            collapsedHeight: 0,
        };
    },

    computed: {
        contentStyle() {
            return {
                lineHeight: this.lineHeight,
                fontSize: this.fontSize,
                color: this.textColor,
                maxHeight: this.expanded
                    ? "none"
                    : `${this.rows * parseFloat(this.lineHeight) * parseFloat(this.fontSize)}px`,
                webkitLineClamp: this.expanded ? "none" : this.rows,
                overflow: this.expanded ? "visible" : "hidden",
                textOverflow: this.expanded ? "clip" : "ellipsis",
                display: "-webkit-box",
                webkitBoxOrient: "vertical",
            };
        },

        showTrigger() {
            return this.alwaysShowTrigger || this.needTrigger;
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.checkNeedTrigger();
        });
    },

    methods: {
        handleToggle() {
            this.expanded = !this.expanded;
            this.$emit("toggle", this.expanded);
        },

        checkNeedTrigger() {
            const content = this.$el.querySelector(".fanc-text-ellipsis__content");
            if (!content) return;

            // 保存原始高度
            const originalStyle = content.style.cssText;
            content.style.maxHeight = "none";
            content.style.overflow = "visible";
            content.style.webkitLineClamp = "none";
            this.originalHeight = content.scrollHeight;

            // 计算收起状态高度
            content.style.cssText = originalStyle;
            this.collapsedHeight =
                this.rows * parseFloat(this.lineHeight) * parseFloat(this.fontSize);

            // 判断是否需要显示展开/收起按钮
            this.needTrigger = this.originalHeight > this.collapsedHeight;
        },
    },
};
</script>

<style>
.fanc-text-ellipsis {
    width: 100%;
    position: relative;
}

.fanc-text-ellipsis__content {
    transition: max-height 0.3s ease;
    word-break: break-word;
    word-wrap: break-word;
}

.fanc-text-ellipsis__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    cursor: pointer;
}

.fanc-text-ellipsis__trigger-text {
    font-size: 14px;
    margin-right: 4px;
}

.fanc-text-ellipsis__trigger-icon {
    transition: transform 0.3s;
}
</style>
