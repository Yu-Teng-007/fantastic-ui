<template>
    <view class="container">
        <view class="header">
            <view class="title">单元格</view>
            <view class="subtitle">单元格为列表中的单个项目，可以包含标题、内容、图标等</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell title="单元格" content="内容" />
            <fanc-cell title="单元格" content="内容" description="描述信息" />
        </view>

        <view class="section">
            <view class="section-title">单元格组</view>
            <fanc-cell-group title="单元格组">
                <fanc-cell title="单元格" content="内容" />
                <fanc-cell title="单元格" content="内容" />
            </fanc-cell-group>
        </view>

        <view class="section">
            <view class="section-title">圆角卡片</view>
            <fanc-cell-group inset>
                <fanc-cell title="单元格" content="内容" />
                <fanc-cell title="单元格" content="内容" />
            </fanc-cell-group>
        </view>

        <view class="section">
            <view class="section-title">使用图标</view>
            <fanc-cell title="单元格" content="内容" icon="home" />
            <fanc-cell title="单元格">
                <template #icon>
                    <fanc-icon name="user" style="color: #1989fa" size="16" />
                </template>
            </fanc-cell>
        </view>

        <view class="section">
            <view class="section-title">展示箭头</view>
            <fanc-cell title="单元格" is-link />
            <fanc-cell title="单元格" is-link content="内容" />
            <fanc-cell title="单元格" is-link arrow-direction="down" content="内容" />
        </view>

        <view class="section">
            <view class="section-title">页面导航</view>
            <fanc-cell title="URL 跳转" is-link url="/pages/index/index" />
            <fanc-cell title="路由跳转" is-link to="/pages/index/index" />
        </view>

        <view class="section">
            <view class="section-title">使用插槽</view>
            <fanc-cell title="单元格">
                <template #default>
                    <view class="custom-value">自定义内容</view>
                </template>
            </fanc-cell>
            <fanc-cell>
                <template #title>
                    <view class="custom-title">自定义标题</view>
                </template>
            </fanc-cell>
            <fanc-cell title="单元格">
                <template #description>
                    <view class="custom-description">自定义描述信息</view>
                </template>
            </fanc-cell>
            <fanc-cell title="单元格" is-link>
                <template #right-icon>
                    <fanc-icon name="settings" class="custom-icon" />
                </template>
            </fanc-cell>
        </view>

        <view class="section">
            <view class="section-title">垂直居中</view>
            <fanc-cell title="单元格" content="内容" description="描述信息" center />
        </view>

        <view class="section">
            <view class="section-title">大号单元格</view>
            <fanc-cell title="单元格" content="内容" large />
        </view>
    </view>
</template>

<script>
export default {};
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

.custom-value {
    color: #1989fa;
    font-weight: 500;
}

.custom-title {
    color: #f44336;
    font-weight: bold;
}

.custom-description {
    color: #4caf50;
    font-size: 12px;
}

.custom-icon {
    color: #ff9800;
}
</style>
