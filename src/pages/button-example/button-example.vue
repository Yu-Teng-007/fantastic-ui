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
                <fanc-button icon="fanc-icon-search">搜索</fanc-button>
                <fanc-button type="primary" icon="fanc-icon-edit">编辑</fanc-button>
                <fanc-button type="primary" icon="fanc-icon-check" plain></fanc-button>
                <fanc-button icon="https://img.yzcdn.cn/vant/logo.png">图片图标</fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">块级按钮 (Block)</text>
            <fanc-button type="primary" block>块级按钮</fanc-button>
        </view>

        <view class="example-section">
            <text class="title">自定义颜色 (Color)</text>
            <view class="button-row">
                <fanc-button color="#7232dd">单色按钮</fanc-button>
                <fanc-button color="#7232dd" plain>单色按钮 (朴素)</fanc-button>
                <fanc-button color="linear-gradient(to right, #ff6034, #ee0a24)"> 渐变色按钮 </fanc-button>
            </view>
        </view>

        <view class="example-section">
            <text class="title">页面跳转 (URL/To)</text>
            <view class="button-row">
                <fanc-button url="/pages/index/index">跳转到首页 (URL)</fanc-button>
                <!-- <fanc-button to="{ path: '/pages/index/index' }">跳转到首页 (Router)</fanc-button> -->
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
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
    padding: 15px;
    background-color: #f7f8fa;
}

.example-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Adds space between buttons */
    align-items: center; /* Vertically align items if they wrap to multiple lines */
}

/* Add some global icon font styles if you are using icon class names */
/* For example, if you are using Font Awesome or a similar library */
.fanc-icon-search::before {
    content: "\F002"; /* Example: Font Awesome search icon */
    font-family: "FontAwesome";
}
.fanc-icon-edit::before {
    content: "\F044"; /* Example: Font Awesome edit icon */
    font-family: "FontAwesome";
}
.fanc-icon-check::before {
    content: "\F00C"; /* Example: Font Awesome check icon */
    font-family: "FontAwesome";
}
</style>
