<template>
    <view class="container">
        <view class="header">
            <view class="title">标签</view>
            <view class="subtitle">用于标记关键词和概括主要内容</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="tag-group">
                <fanc-tag>默认标签</fanc-tag>
                <fanc-tag type="primary">主要标签</fanc-tag>
                <fanc-tag type="success">成功标签</fanc-tag>
                <fanc-tag type="warning">警告标签</fanc-tag>
                <fanc-tag type="danger">危险标签</fanc-tag>
                <fanc-tag type="info">信息标签</fanc-tag>
            </view>
        </view>

        <!-- 空心样式 -->
        <view class="section">
            <view class="section-title">空心样式</view>
            <view class="tag-group">
                <fanc-tag plain>默认标签</fanc-tag>
                <fanc-tag type="primary" plain>主要标签</fanc-tag>
                <fanc-tag type="success" plain>成功标签</fanc-tag>
                <fanc-tag type="warning" plain>警告标签</fanc-tag>
                <fanc-tag type="danger" plain>危险标签</fanc-tag>
                <fanc-tag type="info" plain>信息标签</fanc-tag>
            </view>
        </view>

        <!-- 圆角样式 -->
        <view class="section">
            <view class="section-title">圆角样式</view>
            <view class="tag-group">
                <fanc-tag round>默认标签</fanc-tag>
                <fanc-tag type="primary" round>主要标签</fanc-tag>
                <fanc-tag type="success" round>成功标签</fanc-tag>
                <fanc-tag type="warning" round>警告标签</fanc-tag>
                <fanc-tag type="danger" round>危险标签</fanc-tag>
                <fanc-tag type="info" round>信息标签</fanc-tag>
            </view>
        </view>

        <!-- 标记样式 -->
        <view class="section">
            <view class="section-title">标记样式</view>
            <view class="tag-group">
                <fanc-tag mark>默认标签</fanc-tag>
                <fanc-tag type="primary" mark>主要标签</fanc-tag>
                <fanc-tag type="success" mark>成功标签</fanc-tag>
                <fanc-tag type="warning" mark>警告标签</fanc-tag>
                <fanc-tag type="danger" mark>危险标签</fanc-tag>
                <fanc-tag type="info" mark>信息标签</fanc-tag>
            </view>
        </view>

        <!-- 标签尺寸 -->
        <view class="section">
            <view class="section-title">标签尺寸</view>
            <view class="tag-group">
                <fanc-tag type="primary" size="small">小型标签</fanc-tag>
                <fanc-tag type="primary">默认标签</fanc-tag>
                <fanc-tag type="primary" size="large">大型标签</fanc-tag>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="tag-group">
                <fanc-tag color="#7232dd">单色标签</fanc-tag>
                <fanc-tag color="#7232dd" plain>空心颜色</fanc-tag>
                <fanc-tag color="#7232dd" text-color="#fff">文字颜色</fanc-tag>
            </view>
        </view>

        <!-- 可关闭标签 -->
        <view class="section">
            <view class="section-title">可关闭标签</view>
            <view class="tag-group">
                <fanc-tag v-if="showPrimary" type="primary" closeable @close="showPrimary = false"
                    >主要标签</fanc-tag
                >
                <fanc-tag v-if="showSuccess" type="success" closeable @close="showSuccess = false"
                    >成功标签</fanc-tag
                >
                <fanc-tag v-if="showWarning" type="warning" closeable @close="showWarning = false"
                    >警告标签</fanc-tag
                >
            </view>
            <view style="margin-top: 16px">
                <fanc-button size="small" @click="resetCloseable">重置</fanc-button>
            </view>
        </view>

        <!-- 组合样式 -->
        <view class="section">
            <view class="section-title">组合样式</view>
            <view class="tag-group">
                <fanc-tag type="primary" round plain>圆角空心</fanc-tag>
                <fanc-tag type="success" mark plain>标记空心</fanc-tag>
                <fanc-tag type="danger" round closeable>圆角可关闭</fanc-tag>
                <fanc-tag type="warning" round mark>圆角标记</fanc-tag>
            </view>
        </view>

        <!-- 禁用标签 -->
        <view class="section">
            <view class="section-title">禁用标签</view>
            <view class="tag-group">
                <fanc-tag disabled>禁用标签</fanc-tag>
                <fanc-tag type="primary" disabled>禁用主要</fanc-tag>
                <fanc-tag type="success" plain disabled>禁用空心</fanc-tag>
                <fanc-tag type="warning" round disabled>禁用圆角</fanc-tag>
                <fanc-tag type="danger" closeable disabled>禁用关闭</fanc-tag>
            </view>
        </view>

        <!-- 用法示例 -->
        <view class="section">
            <view class="section-title">用法示例</view>
            <view class="example-block">
                <view class="example-title">商品标签</view>
                <view class="example-content">
                    <view class="product-card">
                        <view class="product-tags">
                            <fanc-tag type="danger" size="small">热卖</fanc-tag>
                            <fanc-tag type="warning" size="small">限时</fanc-tag>
                        </view>
                        <view class="product-name">优质纯棉T恤</view>
                        <view class="product-price">¥89.00</view>
                    </view>
                </view>
            </view>
            <view class="example-block">
                <view class="example-title">文章标签</view>
                <view class="example-content">
                    <view class="article-card">
                        <view class="article-title">Vue3 组件开发教程</view>
                        <view class="article-tags">
                            <fanc-tag type="primary" plain size="small">Vue3</fanc-tag>
                            <fanc-tag type="info" plain size="small">组件</fanc-tag>
                            <fanc-tag type="success" plain size="small">教程</fanc-tag>
                        </view>
                        <view class="article-desc">探讨Vue3组件库的开发实践和最佳方案...</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            showPrimary: true,
            showSuccess: true,
            showWarning: true,
        };
    },
    methods: {
        resetCloseable() {
            this.showPrimary = true;
            this.showSuccess = true;
            this.showWarning = true;
        },
        onTagClose(tag) {
            this.$toast.text(`${tag}标签被关闭`);
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

.tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
}

.example-block {
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
}

.example-block:last-child {
    border-bottom: none;
}

.example-title {
    font-size: 14px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 12px;
}

.example-content {
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 16px;
}

.product-card {
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
}

.product-tags {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
}

.product-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

.product-price {
    color: #ff2b2b;
    font-weight: bold;
}

.article-card {
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
}

.article-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

.article-tags {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
}

.article-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}
</style>
