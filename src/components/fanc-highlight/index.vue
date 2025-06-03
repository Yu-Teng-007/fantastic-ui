<template>
    <view class="fanc-highlight">
        <text
            v-if="!text"
            class="fanc-highlight__content"
            :class="[color ? '' : `fanc-highlight--${type}`, { 'fanc-highlight--round': round }]"
            :style="customStyle"
        >
            <slot></slot>
        </text>
        <text
            v-else
            class="fanc-highlight__content"
            :class="[color ? '' : `fanc-highlight--${type}`, { 'fanc-highlight--round': round }]"
            :style="customStyle"
        >
            <template v-if="keywords && keywords.length">
                <template v-for="(item, index) in textParts">
                    <text
                        v-if="item.isKeyword"
                        :key="index"
                        class="fanc-highlight__keyword"
                        :style="keywordStyle"
                        >{{ item.text }}</text
                    >
                    <text v-else :key="index">{{ item.text }}</text>
                </template>
            </template>
            <template v-else>
                {{ text }}
            </template>
        </text>
    </view>
</template>

<script>
export default {
    name: "FancHighlight",
    props: {
        // 文本内容
        text: {
            type: String,
            default: "",
        },
        // 需要高亮的关键词，字符串或数组
        keywords: {
            type: [String, Array],
            default: "",
        },
        // 类型，可选值为 primary success warning danger info
        type: {
            type: String,
            default: "primary",
        },
        // 自定义颜色
        color: {
            type: String,
            default: "",
        },
        // 自定义背景色
        backgroundColor: {
            type: String,
            default: "",
        },
        // 是否使用圆角
        round: {
            type: Boolean,
            default: false,
        },
        // 关键词自定义样式
        keywordColor: {
            type: String,
            default: "",
        },
        // 关键词自定义背景色
        keywordBackgroundColor: {
            type: String,
            default: "",
        },
        // 是否使用加粗效果
        bold: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        // 处理关键词数组
        keywordsArray() {
            if (!this.keywords) return [];
            return typeof this.keywords === "string" ? [this.keywords] : this.keywords;
        },
        // 文本分段处理
        textParts() {
            if (!this.text || !this.keywordsArray.length)
                return [{ text: this.text, isKeyword: false }];

            const parts = [];
            let remainingText = this.text;
            let lastIndex = 0;

            // 对每个关键词进行匹配
            this.keywordsArray.forEach((keyword) => {
                if (!keyword) return;

                const keywordRegExp = new RegExp(keyword, "gi");
                let match;

                // 重置匹配索引
                keywordRegExp.lastIndex = 0;

                while ((match = keywordRegExp.exec(this.text)) !== null) {
                    const matchIndex = match.index;

                    // 添加关键词前的文本
                    if (matchIndex > lastIndex) {
                        parts.push({
                            text: this.text.substring(lastIndex, matchIndex),
                            isKeyword: false,
                        });
                    }

                    // 添加关键词
                    parts.push({
                        text: match[0],
                        isKeyword: true,
                    });

                    lastIndex = matchIndex + match[0].length;
                }
            });

            // 添加最后一段非关键词文本
            if (lastIndex < this.text.length) {
                parts.push({
                    text: this.text.substring(lastIndex),
                    isKeyword: false,
                });
            }

            // 如果没有匹配到任何关键词，返回完整文本
            if (parts.length === 0) {
                return [{ text: this.text, isKeyword: false }];
            }

            return parts;
        },
        // 自定义样式
        customStyle() {
            const style = {};
            if (this.color) {
                style.color = this.color;
            }
            if (this.backgroundColor) {
                style.backgroundColor = this.backgroundColor;
            }
            return style;
        },
        // 关键词自定义样式
        keywordStyle() {
            const style = {};
            if (this.keywordColor) {
                style.color = this.keywordColor;
            }
            if (this.keywordBackgroundColor) {
                style.backgroundColor = this.keywordBackgroundColor;
            }
            if (this.bold) {
                style.fontWeight = "bold";
            }
            return style;
        },
    },
};
</script>

<style>
.fanc-highlight {
    display: inline-flex;
    align-items: center;
}

.fanc-highlight__content {
    display: inline;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-primary);
    background-color: transparent;
    padding: 2px 0;
}

.fanc-highlight__keyword {
    color: var(--fanc-primary-color);
    font-weight: bold;
}

/* 预设类型样式 */
.fanc-highlight--primary {
    background-color: var(--highlight-primary-bg-color);
    color: var(--highlight-primary-text-color);
    padding: 2px 8px;
}

.fanc-highlight--success {
    background-color: var(--highlight-success-bg-color);
    color: var(--highlight-success-text-color);
    padding: 2px 8px;
}

.fanc-highlight--warning {
    background-color: var(--highlight-warning-bg-color);
    color: var(--highlight-warning-text-color);
    padding: 2px 8px;
}

.fanc-highlight--danger {
    background-color: var(--highlight-danger-bg-color);
    color: var(--highlight-danger-text-color);
    padding: 2px 8px;
}

.fanc-highlight--info {
    background-color: var(--highlight-info-bg-color);
    color: var(--highlight-info-text-color);
    padding: 2px 8px;
}

/* 圆角样式 */
.fanc-highlight--round {
    border-radius: 16px;
}
</style>
