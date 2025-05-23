<template>
    <view class="container">
        <view class="header">
            <view class="title">按钮</view>
            <view class="subtitle">按钮用于触发操作，如提交表单、确认选择等</view>
        </view>

        <!-- 按钮类型 -->
        <view class="section">
            <view class="section-title">按钮类型</view>
            <view class="button-group">
                <fanc-button>默认按钮</fanc-button>
                <fanc-button type="primary">主要按钮</fanc-button>
                <fanc-button type="success">成功按钮</fanc-button>
                <fanc-button type="warning">警告按钮</fanc-button>
                <fanc-button type="danger">危险按钮</fanc-button>
                <fanc-button type="info">信息按钮</fanc-button>
            </view>
        </view>

        <!-- 朴素按钮 -->
        <view class="section">
            <view class="section-title">朴素按钮</view>
            <view class="button-group">
                <fanc-button plain>朴素按钮</fanc-button>
                <fanc-button type="primary" plain>主要按钮</fanc-button>
                <fanc-button type="success" plain>成功按钮</fanc-button>
                <fanc-button type="warning" plain>警告按钮</fanc-button>
                <fanc-button type="danger" plain>危险按钮</fanc-button>
                <fanc-button type="info" plain>信息按钮</fanc-button>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="button-group">
                <fanc-button disabled>禁用按钮</fanc-button>
                <fanc-button type="primary" disabled>禁用按钮</fanc-button>
            </view>
        </view>

        <!-- 加载状态 -->
        <view class="section">
            <view class="section-title">加载状态</view>
            <view class="button-group">
                <fanc-button loading>加载中</fanc-button>
                <fanc-button type="primary" loading loadingText="处理中...">加载中</fanc-button>
            </view>
        </view>

        <!-- 按钮尺寸 -->
        <view class="section">
            <view class="section-title">按钮尺寸</view>
            <view class="button-group">
                <fanc-button size="large">大号按钮</fanc-button>
                <fanc-button>默认按钮</fanc-button>
                <fanc-button size="small">小型按钮</fanc-button>
                <fanc-button size="mini">迷你按钮</fanc-button>
            </view>
        </view>

        <!-- 按钮形状 -->
        <view class="section">
            <view class="section-title">按钮形状</view>
            <view class="button-group">
                <fanc-button type="primary" square>方形按钮</fanc-button>
                <fanc-button type="success" round>圆形按钮</fanc-button>
            </view>
        </view>

        <!-- 图标按钮 -->
        <view class="section">
            <view class="section-title">图标按钮</view>
            <view class="button-group">
                <fanc-button icon="search">搜索</fanc-button>
                <fanc-button type="primary" icon="edit" iconSize="18">编辑</fanc-button>
                <fanc-button
                    type="primary"
                    icon="apple-alt"
                    iconColor="#ff0000"
                    plain
                ></fanc-button>
                <fanc-button icon="https://img.yzcdn.cn/vant/logo.png">图片图标</fanc-button>
            </view>
        </view>

        <!-- 块级按钮 -->
        <view class="section">
            <view class="section-title">块级按钮</view>
            <fanc-button type="primary" block>块级按钮</fanc-button>
        </view>

        <!-- 细边框 -->
        <view class="section">
            <view class="section-title">细边框</view>
            <view class="button-group">
                <fanc-button type="primary" plain hairline>细边框按钮</fanc-button>
                <fanc-button type="success" plain hairline>细边框按钮</fanc-button>
            </view>
        </view>

        <!-- 阴影效果 -->
        <view class="section">
            <view class="section-title">阴影效果</view>
            <view class="button-group">
                <fanc-button type="primary" shadow>主要按钮</fanc-button>
                <fanc-button type="success" shadow>成功按钮</fanc-button>
                <fanc-button type="danger" shadow>危险按钮</fanc-button>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="button-group">
                <fanc-button color="#7232dd">单色按钮</fanc-button>
                <fanc-button color="#7232dd" plain>单色按钮 (朴素)</fanc-button>
                <fanc-button color="linear-gradient(to right, #ff6034, #ee0a24)"
                    >渐变色按钮</fanc-button
                >
            </view>
        </view>

        <!-- 组合效果 -->
        <view class="section">
            <view class="section-title">组合效果</view>
            <view class="button-group">
                <fanc-button type="primary" round shadow>圆角阴影</fanc-button>
                <fanc-button type="info" plain hairline icon="info-circle">提示按钮</fanc-button>
            </view>
        </view>

        <!-- 页面跳转 -->
        <view class="section">
            <view class="section-title">页面跳转</view>
            <view class="button-group">
                <fanc-button url="/pages/index/index" type="primary">跳转到首页</fanc-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleClick() {
            console.log("Button clicked!");
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

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
}
</style>
