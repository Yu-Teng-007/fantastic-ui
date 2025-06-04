<template>
    <view class="container">
        <view class="header">
            <view class="title">开关选择器</view>
            <view class="subtitle">开关选择器，用于在打开和关闭状态之间进行切换</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">默认状态</text>
                    <fanc-switch v-model="switch1"></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">关闭禁用</text>
                    <fanc-switch disabled></fanc-switch>
                </view>
                <view class="switch-item">
                    <text class="switch-label">打开禁用</text>
                    <fanc-switch :model-value="true" disabled></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 加载状态 -->
        <view class="section">
            <view class="section-title">加载状态</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">关闭加载</text>
                    <fanc-switch loading></fanc-switch>
                </view>
                <view class="switch-item">
                    <text class="switch-label">打开加载</text>
                    <fanc-switch :model-value="true" loading></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 开关尺寸 -->
        <view class="section">
            <view class="section-title">开关尺寸</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">大号开关</text>
                    <fanc-switch v-model="switch2" size="large"></fanc-switch>
                </view>
                <view class="switch-item">
                    <text class="switch-label">默认开关</text>
                    <fanc-switch v-model="switch3"></fanc-switch>
                </view>
                <view class="switch-item">
                    <text class="switch-label">小号开关</text>
                    <fanc-switch v-model="switch4" size="small"></fanc-switch>
                </view>
                <view class="switch-item">
                    <text class="switch-label">迷你开关</text>
                    <fanc-switch v-model="switch5" size="mini"></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">自定义颜色</text>
                    <fanc-switch
                        v-model="switch6"
                        active-color="#07c160"
                        inactive-color="#ee0a24"
                    ></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 文字描述 -->
        <view class="section">
            <view class="section-title">文字描述</view>
            <view class="switch-group">
                <view class="switch-item">
                    <fanc-switch
                        v-model="switch7"
                        active-text="开启"
                        inactive-text="关闭"
                    ></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 异步控制 -->
        <view class="section">
            <view class="section-title">异步控制</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">异步控制</text>
                    <fanc-switch
                        :model-value="asyncValue"
                        :loading="asyncLoading"
                        @change="onAsyncChange"
                    ></fanc-switch>
                </view>
            </view>
        </view>

        <!-- 自定义值 -->
        <view class="section">
            <view class="section-title">自定义值</view>
            <view class="switch-group">
                <view class="switch-item">
                    <text class="switch-label">当前值: {{ customValue }}</text>
                    <fanc-switch
                        v-model="customSwitch"
                        :active-value="100"
                        :inactive-value="0"
                        @change="onCustomChange"
                    ></fanc-switch>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            switch1: false,
            switch2: true,
            switch3: true,
            switch4: true,
            switch5: false,
            switch6: true,
            switch7: true,
            asyncValue: false,
            asyncLoading: false,
            customSwitch: false,
            customValue: 0,
        };
    },
    methods: {
        // 异步控制开关
        onAsyncChange(value) {
            // 设置加载状态
            this.asyncLoading = true;

            // 模拟异步操作
            setTimeout(() => {
                // 更新值
                this.asyncValue = value;
                // 关闭加载状态
                this.asyncLoading = false;
                // 显示提示
                this.$toast.success(`已${value ? "打开" : "关闭"}`);
            }, 1000);
        },

        // 自定义值变化
        onCustomChange(value) {
            this.customValue = value;
            this.$toast.text(`当前值: ${value}`);
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

.switch-group {
    padding: 16px;
}

.switch-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.switch-item:last-child {
    margin-bottom: 0;
}

.switch-label {
    font-size: 14px;
    color: #323233;
}
</style>
