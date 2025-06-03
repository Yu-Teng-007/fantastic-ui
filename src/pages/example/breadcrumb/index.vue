<template>
    <view class="container">
        <view class="header">
            <view class="title">面包屑</view>
            <view class="subtitle">面包屑用于显示当前页面的路径，并能快速返回之前的任意页面</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-breadcrumb :items="basicItems"></fanc-breadcrumb>
            </view>
        </view>

        <!-- 自定义分隔符 -->
        <view class="section">
            <view class="section-title">自定义分隔符</view>
            <view class="demo-block">
                <fanc-breadcrumb :items="basicItems" separator=">"></fanc-breadcrumb>
            </view>
            <view class="demo-block" style="margin-top: 16px">
                <fanc-breadcrumb :items="basicItems" separatorIcon="angle-right"></fanc-breadcrumb>
            </view>
        </view>

        <!-- 带图标 -->
        <view class="section">
            <view class="section-title">带图标的面包屑</view>
            <view class="demo-block">
                <fanc-breadcrumb :items="iconItems"></fanc-breadcrumb>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="demo-block">
                <fanc-breadcrumb
                    :items="basicItems"
                    fontSize="16"
                    textColor="#666666"
                    activeColor="#ff6700"
                    separatorColor="#999999"
                ></fanc-breadcrumb>
            </view>
        </view>

        <!-- 不同主题 -->
        <view class="section">
            <view class="section-title">不同主题</view>
            <view class="demo-block">
                <fanc-breadcrumb
                    :items="basicItems"
                    theme="light"
                    style="padding: 8px 16px; border-radius: 4px; margin-bottom: 16px"
                ></fanc-breadcrumb>

                <fanc-breadcrumb
                    :items="basicItems"
                    theme="dark"
                    style="padding: 8px 16px; border-radius: 4px; margin-bottom: 16px"
                ></fanc-breadcrumb>

                <fanc-breadcrumb
                    :items="basicItems"
                    theme="primary"
                    style="padding: 8px 16px; border-radius: 4px"
                ></fanc-breadcrumb>
            </view>
        </view>

        <!-- 单独使用子组件 -->
        <view class="section">
            <view class="section-title">单独使用子组件</view>
            <view class="demo-block">
                <view class="custom-breadcrumb">
                    <fanc-breadcrumb-item
                        text="首页"
                        icon="home"
                        url="/pages/home/index"
                    ></fanc-breadcrumb-item>

                    <fanc-breadcrumb-item text="组件" icon="puzzle-piece"></fanc-breadcrumb-item>

                    <fanc-breadcrumb-item text="导航组件" icon="compass"></fanc-breadcrumb-item>

                    <fanc-breadcrumb-item
                        text="面包屑"
                        icon="map-signs"
                        active
                        :showSeparator="false"
                    ></fanc-breadcrumb-item>
                </view>
            </view>
        </view>

        <!-- 自定义路由 -->
        <view class="section">
            <view class="section-title">自定义路由跳转</view>
            <view class="demo-block">
                <fanc-breadcrumb
                    :items="routeItems"
                    @item-click="handleItemClick"
                ></fanc-breadcrumb>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础面包屑项
            basicItems: [
                { text: "首页", url: "/pages/home/index" },
                { text: "组件" },
                { text: "导航组件" },
                { text: "面包屑" },
            ],

            // 带图标的面包屑项
            iconItems: [
                { text: "首页", icon: "home", url: "/pages/home/index" },
                { text: "组件", icon: "puzzle-piece" },
                { text: "导航组件", icon: "compass" },
                { text: "面包屑", icon: "map-signs" },
            ],

            // 自定义路由面包屑项
            routeItems: [
                { text: "首页", icon: "home", url: "/pages/home/index" },
                { text: "按钮", icon: "square", url: "/pages/example/button/index" },
                { text: "图标", icon: "icons", url: "/pages/example/icon/index" },
                { text: "面包屑", icon: "map-signs" },
            ],
        };
    },
    methods: {
        // 处理面包屑项点击
        handleItemClick(item, index) {
            this.$toast.text(`点击了: ${item.text}`);
            console.log("面包屑项点击:", item, "索引:", index);
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

.demo-block {
    padding: 16px;
}

.custom-breadcrumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px 0;
}
</style>
