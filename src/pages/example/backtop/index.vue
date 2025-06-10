<template>
    <view class="container">
        <view class="header">
            <view class="title">返回顶部</view>
            <view class="subtitle">提供较长的页面快捷返回顶部功能</view>
        </view>

        <!-- 配置面板 -->
        <view class="section">
            <view class="section-title">配置面板</view>
            <view class="section-content">
                <view class="config-item">
                    <text class="config-label">类型：</text>
                    <view class="config-options">
                        <view
                            v-for="item in typeOptions"
                            :key="item.value"
                            :class="['config-option', { active: config.type === item.value }]"
                            @click="updateConfig('type', item.value)"
                        >
                            {{ item.label }}
                        </view>
                    </view>
                </view>

                <view class="config-item">
                    <text class="config-label">图标：</text>
                    <view class="config-options">
                        <view
                            v-for="item in iconOptions"
                            :key="item.value"
                            :class="['config-option', { active: config.icon === item.value }]"
                            @click="updateConfig('icon', item.value)"
                        >
                            {{ item.label }}
                        </view>
                    </view>
                </view>

                <view class="config-item">
                    <text class="config-label">文本：</text>
                    <input
                        class="config-input"
                        type="text"
                        v-model="config.text"
                        placeholder="输入文本"
                    />
                </view>

                <view class="config-item">
                    <text class="config-label">背景颜色：</text>
                    <input
                        class="config-input color-input"
                        type="text"
                        v-model="config.color"
                        placeholder="#ffffff"
                    />
                </view>

                <view class="config-item">
                    <text class="config-label">文字颜色：</text>
                    <input
                        class="config-input color-input"
                        type="text"
                        v-model="config.textColor"
                        placeholder="#000000"
                    />
                </view>

                <view class="config-item">
                    <text class="config-label">形状：</text>
                    <view class="config-switch">
                        <text>圆形</text>
                        <switch
                            :checked="config.round"
                            @change="updateConfig('round', $event.detail.value)"
                        />
                    </view>
                </view>

                <view class="config-item">
                    <text class="config-label">阴影：</text>
                    <view class="config-switch">
                        <text>显示</text>
                        <switch
                            :checked="config.shadow"
                            @change="updateConfig('shadow', $event.detail.value)"
                        />
                    </view>
                </view>

                <view class="config-item">
                    <text class="config-label">可见高度(px)：</text>
                    <view class="config-slider">
                        <slider
                            :value="config.visibilityHeight"
                            min="0"
                            max="500"
                            step="50"
                            show-value
                            @change="updateConfig('visibilityHeight', $event.detail.value)"
                        />
                    </view>
                </view>
            </view>
        </view>

        <!-- 预览区域 -->
        <view class="section">
            <view class="section-title">预览效果</view>
            <view class="section-content">
                <view class="tip">向下滚动页面查看效果，当前配置的返回顶部按钮将出现</view>
            </view>
        </view>

        <!-- 组件代码 -->
        <view class="section">
            <view class="section-title">组件代码</view>
            <view class="section-content">
                <view class="code-block">
                    <text selectable class="code">{{ generatedCode }}</text>
                </view>
            </view>
        </view>

        <!-- 填充内容，使页面可滚动 -->
        <view v-for="i in 20" :key="i" class="placeholder">
            <text>占位内容 {{ i }}</text>
        </view>

        <!-- 当前配置的返回顶部按钮 -->
        <fanc-backtop
            :type="config.type"
            :icon="config.icon"
            :text="config.text"
            :round="config.round"
            :shadow="config.shadow"
            :visibilityHeight="config.visibilityHeight"
            :color="config.color"
            :textColor="config.textColor"
            :bottom="config.bottom"
            :right="config.right"
            @click="handleBacktopClick"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            config: {
                type: "primary",
                icon: "arrow-up",
                text: "",
                round: true,
                shadow: true,
                visibilityHeight: 200,
                color: "",
                textColor: "",
                bottom: "40px",
                right: "20px",
            },
            typeOptions: [
                { label: "默认", value: "default" },
                { label: "主要", value: "primary" },
                { label: "成功", value: "success" },
                { label: "警告", value: "warning" },
                { label: "危险", value: "danger" },
                { label: "信息", value: "info" },
            ],
            iconOptions: [
                { label: "上箭头", value: "arrow-up" },
                { label: "上箭头(细)", value: "chevron-up" },
                { label: "上箭头(圆)", value: "arrow-circle-up" },
                { label: "火箭", value: "rocket" },
            ],
        };
    },
    computed: {
        generatedCode() {
            let code = "<fanc-backtop\n";

            if (this.config.type !== "primary") {
                code += `    type="${this.config.type}"\n`;
            }

            if (this.config.icon !== "arrow-up") {
                code += `    icon="${this.config.icon}"\n`;
            }

            if (this.config.text) {
                code += `    text="${this.config.text}"\n`;
            }

            if (!this.config.round) {
                code += '    :round="false"\n';
            }

            if (!this.config.shadow) {
                code += '    :shadow="false"\n';
            }

            if (this.config.visibilityHeight !== 200) {
                code += `    :visibilityHeight="${this.config.visibilityHeight}"\n`;
            }

            if (this.config.color) {
                code += `    color="${this.config.color}"\n`;
            }

            if (this.config.textColor) {
                code += `    textColor="${this.config.textColor}"\n`;
            }

            code += "/>";

            return code;
        },
    },
    methods: {
        updateConfig(key, value) {
            this.config[key] = value;
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    margin-bottom: 24px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
}

.section {
    margin-bottom: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
}

.section-content {
    padding: 16px;
}

.tip {
    font-size: 14px;
    color: #969799;
    margin-bottom: 12px;
}

.placeholder {
    height: 60px;
    background-color: #ffffff;
    margin-bottom: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #323233;
    font-size: 14px;
}

/* 配置面板样式 */
.config-item {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.config-label {
    width: 100px;
    font-size: 14px;
    color: #323233;
}

.config-options {
    display: flex;
    flex-wrap: wrap;
}

.config-option {
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 4px 12px;
    font-size: 12px;
    background-color: #f2f2f2;
    border-radius: 4px;
    color: #323233;
}

.config-option.active {
    background-color: #1989fa;
    color: #ffffff;
}

.config-input {
    flex: 1;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    font-size: 14px;
}

.color-input {
    width: 120px;
}

.config-switch {
    display: flex;
    align-items: center;
}

.config-switch text {
    margin-right: 8px;
    font-size: 14px;
}

.config-slider {
    flex: 1;
}

/* 代码块样式 */
.code-block {
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
    overflow-x: auto;
}

.code {
    font-family: monospace;
    font-size: 12px;
    color: #323233;
    white-space: pre;
    line-height: 1.5;
}
</style>
