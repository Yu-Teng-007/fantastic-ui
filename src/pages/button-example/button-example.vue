<template>
    <view class="button-example-page">
        <view class="example-section">
            <text class="title">按钮类型 (Type)</text>
            <view class="button-row">
                <fanc-button>默认按钮</fanc-button>
                <fanc-button type="primary">主要按钮</fanc-button>
                <fanc-button type="success">成功按钮</fanc-button>
                <fanc-button type="warning">警告按钮</fanc-button>
                <fanc-button type="danger">危险按钮</fanc-button>
                <fanc-button type="info">信息按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">朴素按钮 (Plain)</text>
            <view class="button-row">
                <fanc-button plain>朴素按钮</fanc-button>
                <fanc-button type="primary" plain>主要按钮</fanc-button>
                <fanc-button type="success" plain>成功按钮</fanc-button>
                <fanc-button type="warning" plain>警告按钮</fanc-button>
                <fanc-button type="danger" plain>危险按钮</fanc-button>
                <fanc-button type="info" plain>信息按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">禁用状态 (Disabled)</text>
            <view class="button-row">
                <fanc-button disabled>禁用按钮</fanc-button>
                <fanc-button type="primary" disabled>禁用按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">加载状态 (Loading)</text>
            <view class="button-row">
                <fanc-button loading>加载中</fanc-button>
                <fanc-button type="primary" loading loadingText="处理中...">加载中</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">按钮尺寸 (Size)</text>
            <view class="button-row">
                <fanc-button size="large">大号按钮</fanc-button>
                <fanc-button>默认按钮</fanc-button>
                <fanc-button size="small">小型按钮</fanc-button>
                <fanc-button size="mini">迷你按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">按钮形状 (Shape)</text>
            <view class="button-row">
                <fanc-button type="primary" square>方形按钮</fanc-button>
                <fanc-button type="success" round>圆形按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">图标按钮 (Icon)</text>
            <view class="button-row">
                <fanc-button icon="search">搜索</fanc-button>
                <fanc-button type="primary" icon="edit" iconSize="18">编辑</fanc-button>
                <fanc-button type="primary" icon="apple-alt" iconColor="#ff0000" plain></fanc-button>
                <fanc-button icon="https://img.yzcdn.cn/vant/logo.png">图片图标</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">块级按钮 (Block)</text>
            <fanc-button type="primary" block>块级按钮</fanc-button>
        </view>

        <view class="example-section">
            <text class="title">细边框 (Hairline)</text>
            <view class="button-row">
                <fanc-button type="primary" plain hairline>细边框按钮</fanc-button>
                <fanc-button type="success" plain hairline>细边框按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">阴影效果 (Shadow)</text>
            <view class="button-row">
                <fanc-button type="primary" shadow>主要按钮</fanc-button>
                <fanc-button type="success" shadow>成功按钮</fanc-button>
                <fanc-button type="danger" shadow>危险按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">自定义颜色 (Color)</text>
            <view class="button-row">
                <fanc-button color="#7232dd">单色按钮</fanc-button>
                <fanc-button color="#7232dd" plain>单色按钮 (朴素)</fanc-button>
                <fanc-button color="linear-gradient(to right, #ff6034, #ee0a24)">渐变色按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">组合效果 (Combined)</text>
            <view class="button-row">
                <fanc-button type="primary" round shadow>圆角阴影</fanc-button>
                <fanc-button type="info" plain hairline icon="info-circle">提示按钮</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">页面跳转 (URL/To)</text>
            <view class="button-row">
                <fanc-button url="/pages/index/index">跳转到首页 (URL)</fanc-button>
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

<style lang="scss" scoped>
.button-example-page {
    padding: 16px;
    background-color: #f7f8fa;
    min-height: 100vh;
}

.example-section {
    margin-bottom: 24px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.title {
    display: block;
    margin-bottom: 16px;
    font-size: 1.125rem;
    font-weight: 600;
    color: #323233;
    position: relative;
    padding-left: 12px;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 4px;
        height: 16px;
        width: 4px;
        background-color: #007bff;
        border-radius: 2px;
    }
}

.button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 8px;
}
</style>
