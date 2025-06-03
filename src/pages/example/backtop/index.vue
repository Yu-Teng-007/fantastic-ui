<template>
    <view class="container">
        <view class="header">
            <view class="title">返回顶部</view>
            <view class="subtitle">提供较长的页面快捷返回顶部功能</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <view class="tip">向下滚动页面查看效果</view>
            </view>
        </view>

        <!-- 不同类型 -->
        <view class="section">
            <view class="section-title">不同类型</view>
            <view class="section-content">
                <view class="backtop-group">
                    <fanc-backtop
                        type="default"
                        text="默认"
                        :visibilityHeight="0"
                        right="20px"
                        bottom="300px"
                    />
                    <fanc-backtop
                        type="primary"
                        text="主要"
                        :visibilityHeight="0"
                        right="70px"
                        bottom="300px"
                    />
                    <fanc-backtop
                        type="success"
                        text="成功"
                        :visibilityHeight="0"
                        right="120px"
                        bottom="300px"
                    />
                    <fanc-backtop
                        type="warning"
                        text="警告"
                        :visibilityHeight="0"
                        right="170px"
                        bottom="300px"
                    />
                    <fanc-backtop
                        type="danger"
                        text="危险"
                        :visibilityHeight="0"
                        right="220px"
                        bottom="300px"
                    />
                    <fanc-backtop
                        type="info"
                        text="信息"
                        :visibilityHeight="0"
                        right="270px"
                        bottom="300px"
                    />
                </view>
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="section">
            <view class="section-title">自定义图标</view>
            <view class="section-content">
                <view class="backtop-group">
                    <fanc-backtop
                        icon="chevron-up"
                        :visibilityHeight="0"
                        right="20px"
                        bottom="240px"
                    />
                    <fanc-backtop icon="rocket" :visibilityHeight="0" right="70px" bottom="240px" />
                    <fanc-backtop
                        icon="arrow-circle-up"
                        :visibilityHeight="0"
                        right="120px"
                        bottom="240px"
                    />
                </view>
            </view>
        </view>

        <!-- 自定义形状 -->
        <view class="section">
            <view class="section-title">自定义形状</view>
            <view class="section-content">
                <view class="backtop-group">
                    <fanc-backtop
                        :round="false"
                        :visibilityHeight="0"
                        right="20px"
                        bottom="180px"
                    />
                    <fanc-backtop
                        :round="false"
                        :shadow="false"
                        :visibilityHeight="0"
                        right="70px"
                        bottom="180px"
                    />
                </view>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="section-content">
                <view class="backtop-group">
                    <fanc-backtop
                        color="#8e44ad"
                        textColor="#ffffff"
                        text="紫色"
                        :visibilityHeight="0"
                        right="20px"
                        bottom="120px"
                    />
                    <fanc-backtop
                        color="#e74c3c"
                        textColor="#ffffff"
                        text="红色"
                        :visibilityHeight="0"
                        right="70px"
                        bottom="120px"
                    />
                    <fanc-backtop
                        color="#2ecc71"
                        textColor="#ffffff"
                        text="绿色"
                        :visibilityHeight="0"
                        right="120px"
                        bottom="120px"
                    />
                </view>
            </view>
        </view>

        <!-- 滚动触发 -->
        <view class="section">
            <view class="section-title">滚动触发</view>
            <view class="section-content">
                <view class="tip">默认滚动高度超过200px时显示</view>
                <fanc-backtop />
            </view>
        </view>

        <!-- 填充内容，使页面可滚动 -->
        <view v-for="i in 20" :key="i" class="placeholder">
            <text>占位内容 {{ i }}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
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

.backtop-group {
    position: relative;
    height: 60px;
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
</style>
