<template>
    <view class="container">
        <view class="header">
            <view class="title">空状态</view>
            <view class="subtitle">用于空状态时的占位提示，引导用户进行操作</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="example-block">
                <fanc-empty description="暂无数据"></fanc-empty>
            </view>
        </view>

        <!-- 图标用法 -->
        <view class="section">
            <view class="section-title">图标用法</view>
            <view class="example-block">
                <fanc-empty icon="box-open" description="没有找到包裹"></fanc-empty>
            </view>
        </view>

        <!-- 自定义图片 -->
        <view class="section">
            <view class="section-title">自定义图片</view>
            <view class="example-block">
                <fanc-empty 
                    image="/static/img/empty-image.png" 
                    description="暂无收藏内容">
                </fanc-empty>
            </view>
        </view>

        <!-- 预设类型 -->
        <view class="section">
            <view class="section-title">预设类型</view>
            <view class="example-block">
                <fanc-empty 
                    type="error" 
                    icon="exclamation-circle" 
                    description="加载失败，请检查网络">
                </fanc-empty>
            </view>
            <view class="example-block" style="margin-top: 20px;">
                <fanc-empty 
                    type="search" 
                    icon="search" 
                    description="没有找到搜索结果">
                </fanc-empty>
            </view>
            <view class="example-block" style="margin-top: 20px;">
                <fanc-empty 
                    type="network" 
                    icon="house-signal" 
                    description="网络连接失败，请检查网络设置">
                </fanc-empty>
            </view>
        </view>

        <!-- 自定义尺寸 -->
        <view class="section">
            <view class="section-title">自定义尺寸</view>
            <view class="example-block">
                <fanc-empty 
                    icon="inbox" 
                    iconSize="80" 
                    imageSize="150" 
                    description="自定义尺寸的空状态">
                </fanc-empty>
            </view>
        </view>

        <!-- 底部内容 -->
        <view class="section">
            <view class="section-title">底部内容</view>
            <view class="example-block">
                <fanc-empty icon="file-circle-exclamation" description="暂无订单数据">
                    <fanc-button type="primary" size="small">立即下单</fanc-button>
                </fanc-empty>
            </view>
        </view>

        <!-- 完全自定义 -->
        <view class="section">
            <view class="section-title">完全自定义</view>
            <view class="example-block">
                <fanc-empty>
                    <template #image>
                        <view class="custom-image">
                            <fanc-icon name="face-sad-tear" size="60" color="#4a6cf7"></fanc-icon>
                        </view>
                    </template>
                    <template #description>
                        <text class="custom-description">
                            您还没有创建任何内容<text class="highlight">需要帮助?</text>
                        </text>
                    </template>
                    <view class="custom-action">
                        <fanc-button type="primary" size="small">查看教程</fanc-button>
                        <fanc-button plain hairline size="small" style="margin-left: 10px;">联系客服</fanc-button>
                    </view>
                </fanc-empty>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
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

.example-block {
    padding: 16px;
}

.custom-image {
    width: 120px;
    height: 120px;
    background: rgba(74, 108, 247, 0.1);
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.custom-description {
    font-size: 16px;
    color: #323233;
}

.highlight {
    color: #4a6cf7;
    margin-left: 4px;
}

.custom-action {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}
</style> 