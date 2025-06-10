<template>
    <view class="fanc-steps" :class="[`fanc-steps--${direction}`, `fanc-steps--${type}`]">
        <view class="fanc-steps__wrapper">
            <view
                v-for="(item, index) in steps"
                :key="index"
                class="fanc-steps__item"
                :class="{
                    'is-finish': item.status === 'finish',
                    'is-process': item.status === 'process',
                    'is-error': item.status === 'error',
                    'is-last': index === steps.length - 1,
                }"
                @click="clickStep(index)"
            >
                <!-- 步骤图标/序号区域 -->
                <view class="fanc-steps__icon-container">
                    <view
                        class="fanc-steps__icon-wrapper"
                        :class="{
                            'is-finish': item.status === 'finish',
                            'is-process': item.status === 'process',
                            'is-error': item.status === 'error',
                        }"
                        :style="getIconStyle(item)"
                    >
                        <!-- 图标类型 -->
                        <template v-if="type === 'icon'">
                            <fanc-icon
                                v-if="item.status === 'finish'"
                                name="shopping-cart"
                                size="20"
                                class="fanc-steps__icon"
                                :color="iconColor(item)"
                            />
                            <fanc-icon
                                v-else-if="item.status === 'error'"
                                name="close"
                                size="20"
                                class="fanc-steps__icon"
                                :color="iconColor(item)"
                            />
                            <fanc-icon
                                v-else
                                :name="item.icon || 'shopping-cart'"
                                size="20"
                                class="fanc-steps__icon"
                                :color="iconColor(item)"
                            />
                        </template>

                        <!-- 序号类型 -->
                        <template v-else-if="type === 'number'">
                            <text class="fanc-steps__number" :style="{ color: iconColor(item) }">
                                <fanc-icon
                                    v-if="item.status === 'finish'"
                                    name="check"
                                    size="14"
                                    class="fanc-steps__icon"
                                    :color="iconColor(item)"
                                />
                                <text v-else>{{ index + 1 }}</text>
                            </text>
                        </template>

                        <!-- 简略类型 -->
                        <view v-else class="fanc-steps__dot" :style="getDotStyle(item)"></view>
                    </view>
                </view>

                <!-- 连接线 -->
                <view
                    v-if="index !== steps.length - 1"
                    class="fanc-steps__line"
                    :class="{
                        'is-finish': hasFinishLine(index),
                        'is-error': hasErrorLine(index),
                    }"
                    :style="getLineStyle(index)"
                ></view>

                <!-- 内容区域 -->
                <view class="fanc-steps__content">
                    <view
                        class="fanc-steps__title"
                        :class="{
                            'is-finish': item.status === 'finish',
                            'is-process': item.status === 'process',
                            'is-error': item.status === 'error',
                        }"
                    >
                        {{ item.title }}
                    </view>
                    <view
                        v-if="item.description"
                        class="fanc-steps__description"
                        :class="{
                            'is-finish': item.status === 'finish',
                            'is-process': item.status === 'process',
                            'is-error': item.status === 'error',
                        }"
                    >
                        {{ item.description }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancSteps",
    props: {
        // 步骤数据
        steps: {
            type: Array,
            default: () => [],
        },
        // 方向：horizontal(水平)、vertical(垂直)
        direction: {
            type: String,
            default: "horizontal",
            validator: (value) => ["horizontal", "vertical"].includes(value),
        },
        // 类型：number(序号)、icon(图标)、simple(简略)
        type: {
            type: String,
            default: "number",
            validator: (value) => ["number", "icon", "simple"].includes(value),
        },
        // 激活状态颜色
        activeColor: {
            type: String,
            default: "#0052d9",
        },
        // 已完成颜色
        finishColor: {
            type: String,
            default: "#0052d9",
        },
        // 已完成背景颜色
        finishBgColor: {
            type: String,
            default: "#f2f3ff",
        },
        // 错误颜色
        errorColor: {
            type: String,
            default: "#fa3534",
        },
        // 默认颜色
        defaultColor: {
            type: String,
            default: "#c0c4cc",
        },
        // 是否可点击
        clickable: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        // 获取图标样式
        getIconStyle(item) {
            const style = {};
            // 如果是图标类型，不设置背景色和边框
            if (this.type === "icon") {
                style.backgroundColor = "transparent";
                style.borderColor = "transparent";
                style.borderWidth = "0";
            } else if (this.type === "number") {
                if (item.status === "finish") {
                    style.backgroundColor = this.finishColor;
                    style.borderColor = this.finishColor;
                    style.color = "#fff";
                } else if (item.status === "process") {
                    style.backgroundColor = this.activeColor;
                    style.borderColor = this.activeColor;
                } else if (item.status === "error") {
                    style.backgroundColor = this.errorColor;
                    style.borderColor = this.errorColor;
                } else {
                    style.borderColor = this.defaultColor;
                }
            } else {
                // 简略类型样式
                if (item.status === "finish") {
                    style.backgroundColor = this.finishBgColor;
                    style.borderColor = this.finishColor;
                } else if (item.status === "process") {
                    style.backgroundColor = this.activeColor;
                    style.borderColor = this.activeColor;
                } else if (item.status === "error") {
                    style.backgroundColor = this.errorColor;
                    style.borderColor = this.errorColor;
                } else {
                    style.borderColor = this.defaultColor;
                }
            }
            return style;
        },

        // 获取连接线样式
        getLineStyle(index) {
            const style = {};
            if (this.hasErrorLine(index)) {
                style.backgroundColor = this.errorColor;
            } else if (this.hasFinishLine(index)) {
                style.backgroundColor = this.finishColor;
            } else {
                style.backgroundColor = this.defaultColor;
            }
            return style;
        },

        // 获取图标颜色
        iconColor(item) {
            // 如果是图标类型，根据状态设置图标颜色
            if (this.type === "icon") {
                if (item.status === "finish") {
                    return this.finishColor;
                } else if (item.status === "process") {
                    return this.activeColor;
                } else if (item.status === "error") {
                    return this.errorColor;
                } else {
                    return this.defaultColor;
                }
            } else {
                // 其他类型保持原样式
                if (item.status === "finish") {
                    return "#fff";
                } else if (item.status === "process") {
                    return "#fff";
                } else if (item.status === "error") {
                    return "#fff";
                } else {
                    return this.defaultColor;
                }
            }
        },

        // 判断连接线是否为已完成状态
        hasFinishLine(index) {
            const currentStep = this.steps[index];
            const nextStep = this.steps[index + 1];
            return currentStep && currentStep.status === "finish";
        },

        // 判断连接线是否为错误状态
        hasErrorLine(index) {
            const currentStep = this.steps[index];
            return currentStep && currentStep.status === "error";
        },

        // 点击步骤
        clickStep(index) {
            if (this.clickable) {
                this.$emit("click-step", index);
            }
        },

        // 获取简略类型点的样式
        getDotStyle(item) {
            const style = {};
            if (item.status === "finish") {
                style.backgroundColor = this.finishColor;
            } else if (item.status === "process") {
                style.backgroundColor = this.activeColor;
            } else if (item.status === "error") {
                style.backgroundColor = this.errorColor;
            } else {
                style.backgroundColor = this.defaultColor;
            }
            return style;
        },
    },
};
</script>

<style>
.fanc-steps {
    width: 100%;
}

/* 水平步骤条 */
.fanc-steps--horizontal .fanc-steps__wrapper {
    display: flex;
    position: relative;
}

.fanc-steps--horizontal .fanc-steps__item {
    flex: 1;
    text-align: center;
    position: relative;
}

.fanc-steps--horizontal .fanc-steps__icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
}

.fanc-steps--horizontal .fanc-steps__line {
    position: absolute;
    top: 14px;
    left: calc(50% + 20px);
    width: calc(100% - 40px);
    height: 2px;
}

/* 垂直步骤条 */
.fanc-steps--vertical .fanc-steps__wrapper {
    display: flex;
    flex-direction: column;
}

.fanc-steps--vertical .fanc-steps__item {
    display: flex;
    padding-bottom: 20px;
    position: relative;
}

.fanc-steps--vertical .fanc-steps__item.is-last {
    padding-bottom: 0;
}

.fanc-steps--vertical .fanc-steps__icon-container {
    margin-right: 12px;
}

.fanc-steps--vertical .fanc-steps__content {
    flex: 1;
}

.fanc-steps--vertical .fanc-steps__line {
    position: absolute;
    left: 14px;
    top: 30px;
    height: calc(100% - 30px);
    width: 2px;
}

/* 图标包装器 */
.fanc-steps__icon-wrapper {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #c0c4cc;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    position: relative;
    z-index: 1;
    transition: all 0.3s;
}

/* 图标 */
.fanc-steps__icon {
    font-size: 14px;
}

/* 序号 */
.fanc-steps__number {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

/* 简略类型的点 */
.fanc-steps--simple .fanc-steps__icon-wrapper {
    width: 12px;
    height: 12px;
    border-width: 0;
    background-color: transparent;
}

.fanc-steps--simple .fanc-steps__dot {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: all 0.3s;
}

.fanc-steps--simple.fanc-steps--horizontal .fanc-steps__line {
    top: 6px;
    left: calc(50% + 10px);
    width: calc(100% - 20px);
}

.fanc-steps--simple.fanc-steps--vertical .fanc-steps__line {
    left: 6px;
    top: 16px;
}

/* 内容区域 */
.fanc-steps__title {
    font-size: 14px;
    color: #303133;
    line-height: 1.5;
}

.fanc-steps__title.is-process {
    font-weight: bold;
    color: #303133;
}

.fanc-steps__title.is-finish {
    color: #606266;
}

.fanc-steps__title.is-error {
    color: #fa3534;
}

.fanc-steps__description {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}

.fanc-steps__description.is-process {
    color: #606266;
}

.fanc-steps__description.is-error {
    color: #fa3534;
}
</style>
