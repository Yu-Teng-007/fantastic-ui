<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">按钮组件</text>
            <text class="example-page__header-desc">按钮用于触发操作，如提交表单、确认选择等</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">按钮类型 (Type)</view>
            <view class="example-page__section-desc">按钮支持多种类型，用于区分不同的操作场景</view>
            <view class="example-page__button-group">
                <fanc-button>默认按钮</fanc-button>
                <fanc-button type="primary">主要按钮</fanc-button>
                <fanc-button type="success">成功按钮</fanc-button>
                <fanc-button type="warning">警告按钮</fanc-button>
                <fanc-button type="danger">危险按钮</fanc-button>
                <fanc-button type="info">信息按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">朴素按钮 (Plain)</view>
            <view class="example-page__section-desc">朴素按钮的样式更加简约，常用于辅助功能</view>
            <view class="example-page__button-group">
                <fanc-button plain>朴素按钮</fanc-button>
                <fanc-button type="primary" plain>主要按钮</fanc-button>
                <fanc-button type="success" plain>成功按钮</fanc-button>
                <fanc-button type="warning" plain>警告按钮</fanc-button>
                <fanc-button type="danger" plain>危险按钮</fanc-button>
                <fanc-button type="info" plain>信息按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">禁用状态 (Disabled)</view>
            <view class="example-page__section-desc"
                >禁用状态的按钮不可点击，常用于表单校验失败的场景</view
            >
            <view class="example-page__button-group">
                <fanc-button disabled>禁用按钮</fanc-button>
                <fanc-button type="primary" disabled>禁用按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">加载状态 (Loading)</view>
            <view class="example-page__section-desc"
                >加载状态用于异步操作的过程中，防止用户重复点击</view
            >
            <view class="example-page__button-group">
                <fanc-button loading>加载中</fanc-button>
                <fanc-button type="primary" loading loadingText="处理中...">加载中</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">按钮尺寸 (Size)</view>
            <view class="example-page__section-desc">按钮支持多种尺寸，适用于不同的场景需求</view>
            <view class="example-page__button-group">
                <fanc-button size="large">大号按钮</fanc-button>
                <fanc-button>默认按钮</fanc-button>
                <fanc-button size="small">小型按钮</fanc-button>
                <fanc-button size="mini">迷你按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">按钮形状 (Shape)</view>
            <view class="example-page__section-desc">按钮可以有不同的形状，方形或圆形</view>
            <view class="example-page__button-group">
                <fanc-button type="primary" square>方形按钮</fanc-button>
                <fanc-button type="success" round>圆形按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">图标按钮 (Icon)</view>
            <view class="example-page__section-desc">按钮可以包含图标，增强视觉效果和交互体验</view>
            <view class="example-page__button-group">
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

        <view class="example-page__section">
            <view class="example-page__section-title">块级按钮 (Block)</view>
            <view class="example-page__section-desc">块级按钮会占满整个容器的宽度</view>
            <fanc-button type="primary" block>块级按钮</fanc-button>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">细边框 (Hairline)</view>
            <view class="example-page__section-desc">细边框按钮的边框更加细腻</view>
            <view class="example-page__button-group">
                <fanc-button type="primary" plain hairline>细边框按钮</fanc-button>
                <fanc-button type="success" plain hairline>细边框按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">阴影效果 (Shadow)</view>
            <view class="example-page__section-desc">添加阴影可以提升按钮的层次感</view>
            <view class="example-page__button-group">
                <fanc-button type="primary" shadow>主要按钮</fanc-button>
                <fanc-button type="success" shadow>成功按钮</fanc-button>
                <fanc-button type="danger" shadow>危险按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义颜色 (Color)</view>
            <view class="example-page__section-desc">支持自定义按钮的颜色，包括纯色和渐变色</view>
            <view class="example-page__button-group">
                <fanc-button color="#7232dd">单色按钮</fanc-button>
                <fanc-button color="#7232dd" plain>单色按钮 (朴素)</fanc-button>
                <fanc-button color="linear-gradient(to right, #ff6034, #ee0a24)"
                    >渐变色按钮</fanc-button
                >
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">组合效果 (Combined)</view>
            <view class="example-page__section-desc">可以组合多种属性来创建丰富的按钮效果</view>
            <view class="example-page__button-group">
                <fanc-button type="primary" round shadow>圆角阴影</fanc-button>
                <fanc-button type="info" plain hairline icon="info-circle">提示按钮</fanc-button>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">页面跳转 (URL/To)</view>
            <view class="example-page__section-desc"
                >按钮可以配置跳转链接，点击后自动跳转到指定页面</view
            >
            <view class="example-page__button-group">
                <fanc-button url="/pages/index/index" type="primary">跳转到首页 (URL)</fanc-button>
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

<style lang="scss" scoped></style>
