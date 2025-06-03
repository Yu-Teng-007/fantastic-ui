<template>
    <view class="fanc-step" :style="stepStyle">
        <!-- 指示器 -->
        <view class="fanc-step__indicator" :class="indicatorClass" :style="indicatorStyle">
            <view v-if="status === 'finish'" class="fanc-step__icon">
                <fanc-icon name="check" :size="iconSize" :color="iconColor"></fanc-icon>
            </view>
            <view v-else-if="status === 'error'" class="fanc-step__icon">
                <fanc-icon name="times" :size="iconSize" :color="iconColor"></fanc-icon>
            </view>
            <view v-else-if="icon" class="fanc-step__icon">
                <fanc-icon :name="icon" :size="iconSize" :color="iconColor"></fanc-icon>
            </view>
            <text v-else class="fanc-step__index" :style="{ color: iconColor }">{{
                index + 1
            }}</text>
        </view>

        <!-- 连接线 -->
        <view v-if="!isLast" class="fanc-step__line" :class="lineClass" :style="lineStyle"></view>

        <!-- 内容 -->
        <view class="fanc-step__content" :class="contentClass">
            <view class="fanc-step__title" :style="titleStyle">
                <text>{{ title }}</text>
                <text v-if="status === 'error'" class="fanc-step__error-icon">!</text>
            </view>
            <view v-if="description" class="fanc-step__description" :style="descriptionStyle">
                {{ description }}
            </view>
            <view v-if="$slots.default" class="fanc-step__slot-content">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancStep",
    inject: ["steps"],
    props: {
        // 步骤标题
        title: {
            type: String,
            default: "",
        },
        // 步骤描述
        description: {
            type: String,
            default: "",
        },
        // 步骤图标
        icon: {
            type: String,
            default: "",
        },
        // 当前步骤的状态，可选值为 wait、process、finish、error
        status: {
            type: String,
            default: "",
            validator: (value) => ["", "wait", "process", "finish", "error"].includes(value),
        },
    },
    data() {
        return {
            index: 0,
            isLast: false,
        };
    },
    computed: {
        // 计算当前步骤状态
        currentStatus() {
            if (this.status) {
                return this.status;
            }

            if (this.index < this.steps.active) {
                return "finish";
            } else if (this.index === this.steps.active) {
                return "process";
            }

            return "wait";
        },

        // 指示器样式类
        indicatorClass() {
            return {
                "fanc-step__indicator--finish": this.currentStatus === "finish",
                "fanc-step__indicator--process": this.currentStatus === "process",
                "fanc-step__indicator--wait": this.currentStatus === "wait",
                "fanc-step__indicator--error": this.currentStatus === "error",
            };
        },

        // 连接线样式类
        lineClass() {
            return {
                "fanc-step__line--finish": this.currentStatus === "finish",
                "fanc-step__line--wait": this.currentStatus !== "finish",
            };
        },

        // 内容样式类
        contentClass() {
            return {
                "fanc-step__content--horizontal": this.steps.direction === "horizontal",
                "fanc-step__content--vertical": this.steps.direction === "vertical",
                "fanc-step__content--center": this.steps.center,
            };
        },

        // 步骤样式
        stepStyle() {
            if (this.steps.direction === "horizontal") {
                return {
                    flexBasis: this.isLast
                        ? "auto"
                        : `${100 / (this.parent?.children?.length || 1)}%`,
                };
            }
            return {};
        },

        // 指示器样式
        indicatorStyle() {
            const style = {};
            if (this.currentStatus === "process") {
                style.backgroundColor = this.steps.activeColor || "";
                style.borderColor = this.steps.activeColor || "";
            } else if (this.currentStatus === "finish") {
                style.backgroundColor = this.steps.activeColor || "";
                style.borderColor = this.steps.activeColor || "";
            } else if (this.currentStatus === "error") {
                style.backgroundColor = "var(--fanc-danger-color)";
                style.borderColor = "var(--fanc-danger-color)";
            } else {
                style.backgroundColor = this.steps.inactiveColor || "";
                style.borderColor = this.steps.inactiveColor || "";
            }
            return style;
        },

        // 连接线样式
        lineStyle() {
            const style = {};
            if (this.currentStatus === "finish") {
                style.backgroundColor = this.steps.activeColor || "";
            } else {
                style.backgroundColor = this.steps.inactiveColor || "";
            }
            return style;
        },

        // 标题样式
        titleStyle() {
            const style = {};
            if (this.currentStatus === "process") {
                style.color = this.steps.activeColor || "var(--fanc-primary-color)";
            } else if (this.currentStatus === "error") {
                style.color = "var(--fanc-danger-color)";
            }
            return style;
        },

        // 描述样式
        descriptionStyle() {
            const style = {};
            if (this.currentStatus === "error") {
                style.color = "var(--fanc-danger-color)";
            }
            return style;
        },

        // 图标颜色
        iconColor() {
            if (this.currentStatus === "process") {
                return "#ffffff";
            } else if (this.currentStatus === "finish") {
                return "#ffffff";
            } else if (this.currentStatus === "error") {
                return "#ffffff";
            }
            return "";
        },

        // 图标大小
        iconSize() {
            return this.steps.iconSize * 0.6;
        },

        // 父组件
        parent() {
            return this.steps;
        },
    },
    mounted() {
        this.updateIndex();
    },
    methods: {
        // 更新索引
        updateIndex() {
            if (!this.parent) return;

            const { children } = this.parent.$children;
            this.index = children ? children.indexOf(this) : 0;
            this.isLast = this.index === children?.length - 1;
        },
    },
};
</script>

<style>
.fanc-step {
    position: relative;
    flex: 1;
}

/* 水平步骤条 */
.fanc-steps--horizontal .fanc-step {
    padding-bottom: 14px;
}

/* 垂直步骤条 */
.fanc-steps--vertical .fanc-step {
    padding-left: 30px;
    margin-bottom: 20px;
}

.fanc-steps--vertical .fanc-step:last-child {
    margin-bottom: 0;
}

/* 指示器 */
.fanc-step__indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--gray-400);
    border: 1px solid var(--gray-400);
    transition: all 0.3s;
    z-index: 1;
}

.fanc-steps--horizontal .fanc-step__indicator {
    margin: 0 auto;
}

.fanc-steps--vertical .fanc-step__indicator {
    position: absolute;
    left: 0;
    top: 0;
}

.fanc-step__indicator--process {
    background-color: var(--fanc-primary-color);
    border-color: var(--fanc-primary-color);
}

.fanc-step__indicator--finish {
    background-color: var(--fanc-primary-color);
    border-color: var(--fanc-primary-color);
}

.fanc-step__indicator--wait {
    background-color: var(--white);
    border-color: var(--gray-400);
}

.fanc-step__indicator--error {
    background-color: var(--fanc-danger-color);
    border-color: var(--fanc-danger-color);
}

.fanc-step__index {
    font-size: 14px;
    color: var(--gray-600);
}

.fanc-step__indicator--process .fanc-step__index,
.fanc-step__indicator--finish .fanc-step__index,
.fanc-step__indicator--error .fanc-step__index {
    color: var(--white);
}

/* 连接线 */
.fanc-step__line {
    position: absolute;
    background-color: var(--gray-400);
    transition: all 0.3s;
}

.fanc-steps--horizontal .fanc-step__line {
    top: 12px;
    right: 0;
    width: calc(100% - 24px);
    height: 1px;
    transform: translateX(50%);
}

.fanc-steps--vertical .fanc-step__line {
    top: 24px;
    left: 12px;
    width: 1px;
    height: calc(100% - 14px);
}

.fanc-step__line--finish {
    background-color: var(--fanc-primary-color);
}

/* 内容 */
.fanc-step__content {
    position: relative;
}

.fanc-step__content--horizontal {
    text-align: center;
    margin-top: 8px;
}

.fanc-step__content--vertical {
    margin-left: 12px;
}

.fanc-step__title {
    font-size: 14px;
    color: var(--text-primary);
    line-height: 20px;
    margin-bottom: 4px;
    position: relative;
}

.fanc-step__error-icon {
    color: var(--fanc-danger-color);
    margin-left: 4px;
}

.fanc-step__description {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 18px;
}

.fanc-step__slot-content {
    margin-top: 4px;
}
</style>
