<template>
    <view class="container">
        <view class="header">
            <view class="title">悬浮导航</view>
            <view class="subtitle">悬浮收起体验交互，用于快捷导航</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <view class="tip">点击右下角按钮展开导航</view>
                <fanc-fixed-nav :items="basicItems" @click="onNavItemClick" />
            </view>
        </view>

        <!-- 不同类型 -->
        <view class="section">
            <view class="section-title">不同类型</view>
            <view class="section-content">
                <view class="type-group">
                    <view class="type-item">
                        <text class="type-name">默认</text>
                        <fanc-fixed-nav
                            type="default"
                            :items="basicItems"
                            :defaultCollapsed="false"
                            :offset="{ bottom: '500px', right: '20px' }"
                        />
                    </view>
                    <view class="type-item">
                        <text class="type-name">主要</text>
                        <fanc-fixed-nav
                            type="primary"
                            :items="basicItems"
                            :defaultCollapsed="false"
                            :offset="{ bottom: '500px', right: '90px' }"
                        />
                    </view>
                    <view class="type-item">
                        <text class="type-name">成功</text>
                        <fanc-fixed-nav
                            type="success"
                            :items="basicItems"
                            :defaultCollapsed="false"
                            :offset="{ bottom: '500px', right: '160px' }"
                        />
                    </view>
                    <view class="type-item">
                        <text class="type-name">警告</text>
                        <fanc-fixed-nav
                            type="warning"
                            :items="basicItems"
                            :defaultCollapsed="false"
                            :offset="{ bottom: '500px', right: '230px' }"
                        />
                    </view>
                    <view class="type-item">
                        <text class="type-name">危险</text>
                        <fanc-fixed-nav
                            type="danger"
                            :items="basicItems"
                            :defaultCollapsed="false"
                            :offset="{ bottom: '500px', right: '300px' }"
                        />
                    </view>
                </view>
            </view>
        </view>

        <!-- 不同位置 -->
        <view class="section">
            <view class="section-title">不同位置</view>
            <view class="section-content">
                <view class="tip">可设置左下、右下、左上、右上四个位置</view>
                <fanc-fixed-nav
                    position="left-bottom"
                    :items="positionItems"
                    :offset="{ bottom: '400px', left: '20px' }"
                />
                <fanc-fixed-nav
                    position="right-bottom"
                    :items="positionItems"
                    :offset="{ bottom: '400px', right: '20px' }"
                />
                <fanc-fixed-nav
                    position="left-top"
                    :items="positionItems"
                    :offset="{ top: '100px', left: '20px' }"
                />
                <fanc-fixed-nav
                    position="right-top"
                    :items="positionItems"
                    :offset="{ top: '100px', right: '20px' }"
                />
            </view>
        </view>

        <!-- 水平方向 -->
        <view class="section">
            <view class="section-title">水平方向</view>
            <view class="section-content">
                <view class="tip">支持水平和垂直两种方向</view>
                <fanc-fixed-nav
                    direction="horizontal"
                    :items="directionItems"
                    :offset="{ bottom: '300px', right: '20px' }"
                />
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="section">
            <view class="section-title">自定义图标</view>
            <view class="section-content">
                <view class="tip">可自定义主按钮图标和导航项图标</view>
                <fanc-fixed-nav
                    mainIcon="compass"
                    closeIcon="times-circle"
                    :items="iconItems"
                    :offset="{ bottom: '200px', right: '20px' }"
                />
            </view>
        </view>

        <!-- 带徽标 -->
        <view class="section">
            <view class="section-title">带徽标</view>
            <view class="section-content">
                <view class="tip">导航项可以显示徽标或小红点</view>
                <fanc-fixed-nav :items="badgeItems" :offset="{ bottom: '100px', right: '20px' }" />
            </view>
        </view>

        <!-- 遮罩层 -->
        <view class="section">
            <view class="section-title">遮罩层</view>
            <view class="section-content">
                <view class="tip">展开时显示遮罩层，点击遮罩层关闭</view>
                <fanc-fixed-nav
                    :items="basicItems"
                    :overlay="true"
                    :closeOnClickOverlay="true"
                    :offset="{ bottom: '20px', right: '20px' }"
                />
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            basicItems: [
                { icon: "home", text: "首页" },
                { icon: "user", text: "我的" },
                { icon: "shopping-cart", text: "购物车" },
                { icon: "heart", text: "收藏" },
            ],
            positionItems: [
                { icon: "map-marker-alt", text: "位置" },
                { icon: "compass", text: "导航" },
            ],
            directionItems: [
                { icon: "home", text: "首页" },
                { icon: "user", text: "我的" },
                { icon: "shopping-cart", text: "购物车" },
                { icon: "heart", text: "收藏" },
            ],
            iconItems: [
                { icon: "star", text: "收藏", iconColor: "#f39c12" },
                { icon: "bell", text: "通知", iconColor: "#3498db" },
                { icon: "comment", text: "消息", iconColor: "#2ecc71" },
                { icon: "cog", text: "设置", iconColor: "#9b59b6" },
            ],
            badgeItems: [
                { icon: "home", text: "首页" },
                { icon: "user", text: "我的", badge: true },
                { icon: "shopping-cart", text: "购物车", badge: "9" },
                { icon: "bell", text: "通知", badge: "99+" },
            ],
        };
    },
    methods: {
        onNavItemClick(item, index) {
            this.$toast.text(`点击了${item.text}，索引: ${index}`);
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
    position: relative;
    min-height: 60px;
}

.tip {
    font-size: 14px;
    color: #969799;
    margin-bottom: 12px;
}

.type-group {
    display: flex;
    flex-wrap: wrap;
}

.type-item {
    margin-right: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.type-name {
    font-size: 14px;
    color: #323233;
    margin-bottom: 8px;
    display: block;
}
</style>
