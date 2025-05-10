<template>
    <view class="container">
        <view class="header">
            <text class="title">Fanc Icon 图标组件</text>
            <text class="subtitle">基于Font Awesome的图标组件</text>
        </view>

        <view class="example-section">
            <text class="title">基础用法</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="home" size="24"></fanc-icon>
                    <text class="icon-name">home</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="user" size="24"></fanc-icon>
                    <text class="icon-name">user</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="search" size="24"></fanc-icon>
                    <text class="icon-name">search</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="heart" size="24"></fanc-icon>
                    <text class="icon-name">heart</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="star" size="24"></fanc-icon>
                    <text class="icon-name">star</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="title">不同颜色</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="check" size="24" color="#28a745"></fanc-icon>
                    <text class="icon-name">绿色</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="times" size="24" color="#dc3545"></fanc-icon>
                    <text class="icon-name">红色</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="exclamation-triangle" size="24" color="#ffc107"></fanc-icon>
                    <text class="icon-name">黄色</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="info-circle" size="24" color="#17a2b8"></fanc-icon>
                    <text class="icon-name">蓝色</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="question-circle" size="24" color="#6c757d"></fanc-icon>
                    <text class="icon-name">灰色</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="title">不同尺寸</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="cog" size="16"></fanc-icon>
                    <text class="icon-name">16px</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="cog" size="24"></fanc-icon>
                    <text class="icon-name">24px</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="cog" size="32"></fanc-icon>
                    <text class="icon-name">32px</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="cog" size="48"></fanc-icon>
                    <text class="icon-name">48px</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="title">小红点(dot)</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="bell" size="24" dot></fanc-icon>
                    <text class="icon-name">消息提醒</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="envelope" size="24" dot></fanc-icon>
                    <text class="icon-name">邮件提醒</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="comment" size="24" dot></fanc-icon>
                    <text class="icon-name">评论提醒</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="title">徽标(badge)</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="bell" size="24" badge="8"></fanc-icon>
                    <text class="icon-name">8条消息</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="envelope" size="24" badge="99+"></fanc-icon>
                    <text class="icon-name">99+封邮件</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="shopping-cart" size="24" badge="5"></fanc-icon>
                    <text class="icon-name">5件商品</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="title">点击事件</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="bell" size="32" color="#007bff" @click="handleIconClick"></fanc-icon>
                    <text class="icon-name">点击我</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import fancIcon from "@/components/fanc-icon/index.vue";

export default {
    components: {
        fancIcon,
    },
    data() {
        return {};
    },
    methods: {
        handleIconClick() {
            uni.showToast({
                title: "图标被点击了",
                icon: "none",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;
    background-color: #f7f8fa;
}

.header {
    margin-bottom: 30px;
    text-align: center;
}

.title {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.subtitle {
    font-size: 14px;
    color: #666;
}

.example-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.icon-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
}

.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.icon-name {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    text-align: center;
}
</style>
