<template>
    <view class="container">
        <view class="header">
            <view class="title">选项卡</view>
            <view class="subtitle">选项卡组件，用于内容分类后的展示切换</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-tabs :tabs="basicTabs" @change="onChange" @click="onClick">
                <view class="content-item" v-if="activeTab === 0">
                    <view class="content-block">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeTab === 1">
                    <view class="content-block">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeTab === 2">
                    <view class="content-block">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 通过标签名称匹配 -->
        <view class="section">
            <view class="section-title">通过标签名称匹配</view>
            <fanc-tabs :tabs="matchTabs" :active="1" @change="onNameChange">
                <view class="content-item" v-if="activeNameTab === 0">
                    <view class="content-block">标签 A 内容</view>
                </view>
                <view class="content-item" v-if="activeNameTab === 1">
                    <view class="content-block">标签 B 内容</view>
                </view>
                <view class="content-item" v-if="activeNameTab === 2">
                    <view class="content-block">标签 C 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 卡片样式 -->
        <view class="section">
            <view class="section-title">卡片样式</view>
            <fanc-tabs type="card" :tabs="cardTabs" @change="onCardChange">
                <view class="content-item" v-if="activeCardTab === 0">
                    <view class="content-block">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeCardTab === 1">
                    <view class="content-block">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeCardTab === 2">
                    <view class="content-block">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 徽标提示 -->
        <view class="section">
            <view class="section-title">徽标提示</view>
            <fanc-tabs :tabs="badgeTabs" @change="onBadgeChange">
                <view class="content-item" v-if="activeBadgeTab === 0">
                    <view class="content-block">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeBadgeTab === 1">
                    <view class="content-block">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeBadgeTab === 2">
                    <view class="content-block">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 禁用标签 -->
        <view class="section">
            <view class="section-title">禁用标签</view>
            <fanc-tabs :tabs="disabledTabs" @disabled="onDisabled" @change="onDisabledChange">
                <view class="content-item" v-if="activeDisabledTab === 0">
                    <view class="content-block">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeDisabledTab === 1">
                    <view class="content-block">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeDisabledTab === 2">
                    <view class="content-block">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <fanc-tabs
                :tabs="customTabs"
                active-color="#ee0a24"
                inactive-color="#646566"
                line-width="30px"
                line-height="4px"
                @change="onCustomChange"
            >
                <view class="content-item" v-if="activeCustomTab === 0">
                    <view class="content-block">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeCustomTab === 1">
                    <view class="content-block">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeCustomTab === 2">
                    <view class="content-block">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 滚动标签 -->
        <view class="section">
            <view class="section-title">滚动标签</view>
            <fanc-tabs :tabs="scrollTabs" scrollable @change="onScrollChange">
                <view class="content-item" v-if="activeScrollTab === 0">
                    <view class="content-block">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeScrollTab === 1">
                    <view class="content-block">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeScrollTab === 2">
                    <view class="content-block">标签 3 内容</view>
                </view>
                <view class="content-item" v-if="activeScrollTab === 3">
                    <view class="content-block">标签 4 内容</view>
                </view>
                <view class="content-item" v-if="activeScrollTab === 4">
                    <view class="content-block">标签 5 内容</view>
                </view>
                <view class="content-item" v-if="activeScrollTab === 5">
                    <view class="content-block">标签 6 内容</view>
                </view>
                <view class="content-item" v-if="activeScrollTab === 6">
                    <view class="content-block">标签 7 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 粘性布局 -->
        <view class="section">
            <view class="section-title">粘性布局</view>
            <fanc-tabs :tabs="basicTabs" sticky @change="onStickyChange">
                <view class="content-item" v-if="activeStickyTab === 0">
                    <view class="content-block content-block-large">标签 1 内容</view>
                </view>
                <view class="content-item" v-if="activeStickyTab === 1">
                    <view class="content-block content-block-large">标签 2 内容</view>
                </view>
                <view class="content-item" v-if="activeStickyTab === 2">
                    <view class="content-block content-block-large">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础标签数据
            basicTabs: [{ title: "标签 1" }, { title: "标签 2" }, { title: "标签 3" }],
            activeTab: 0,

            // 名称匹配标签数据
            matchTabs: [{ title: "标签 A" }, { title: "标签 B" }, { title: "标签 C" }],
            activeNameTab: 1,

            // 卡片样式标签数据
            cardTabs: [{ title: "标签 1" }, { title: "标签 2" }, { title: "标签 3" }],
            activeCardTab: 0,

            // 徽标提示标签数据
            badgeTabs: [
                { title: "标签 1", badge: "5" },
                { title: "标签 2", badge: "10" },
                { title: "标签 3", dot: true },
            ],
            activeBadgeTab: 0,

            // 禁用标签数据
            disabledTabs: [
                { title: "标签 1" },
                { title: "标签 2", disabled: true },
                { title: "标签 3" },
            ],
            activeDisabledTab: 0,

            // 自定义样式标签数据
            customTabs: [{ title: "标签 1" }, { title: "标签 2" }, { title: "标签 3" }],
            activeCustomTab: 0,

            // 滚动标签数据
            scrollTabs: [
                { title: "标签 1" },
                { title: "标签 2" },
                { title: "标签 3" },
                { title: "标签 4" },
                { title: "标签 5" },
                { title: "标签 6" },
                { title: "标签 7" },
            ],
            activeScrollTab: 0,

            // 粘性布局标签数据
            activeStickyTab: 0,
        };
    },
    methods: {
        // 基础标签切换事件
        onChange(event) {
            this.activeTab = event.index;
            this.$toast.text(`切换到标签 ${event.title}`);
        },

        // 点击标签事件
        onClick(event) {
            console.log("点击标签", event);
        },

        // 名称匹配标签切换事件
        onNameChange(event) {
            this.activeNameTab = event.index;
        },

        // 卡片样式标签切换事件
        onCardChange(event) {
            this.activeCardTab = event.index;
        },

        // 徽标提示标签切换事件
        onBadgeChange(event) {
            this.activeBadgeTab = event.index;
        },

        // 禁用标签点击事件
        onDisabled(event) {
            this.$toast.warning("该标签已被禁用");
        },

        // 禁用标签切换事件
        onDisabledChange(event) {
            this.activeDisabledTab = event.index;
        },

        // 自定义样式标签切换事件
        onCustomChange(event) {
            this.activeCustomTab = event.index;
        },

        // 滚动标签切换事件
        onScrollChange(event) {
            this.activeScrollTab = event.index;
        },

        // 粘性布局标签切换事件
        onStickyChange(event) {
            this.activeStickyTab = event.index;
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

.content-item {
    padding: 16px;
}

.content-block {
    padding: 16px;
    background-color: #f7f8fa;
    border-radius: 4px;
    text-align: center;
    color: #646566;
}

.content-block-large {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
