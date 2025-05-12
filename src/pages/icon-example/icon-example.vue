<template>
    <view class="container">
        <view class="header">
            <text class="title">Fanc Icon 图标组件</text>
            <text class="subtitle">基于Font Awesome的图标组件</text>
        </view>

        <view class="example-section">
            <text class="section-title">基础用法</text>
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
            <text class="section-title">图标类型</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="user" type="solid" size="24"></fanc-icon>
                    <text class="icon-name">Solid</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="user" type="regular" size="24"></fanc-icon>
                    <text class="icon-name">Regular</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="apple" type="brands" size="24"></fanc-icon>
                    <text class="icon-name">Brands</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="section-title">不同颜色</text>
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
            <text class="section-title">不同尺寸</text>
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
            <text class="section-title">小红点(dot)</text>
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
            <text class="section-title">徽标(badge)</text>
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
            <text class="section-title">旋转动画(spin)</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="sync" size="24" spin></fanc-icon>
                    <text class="icon-name">同步</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="spinner" size="24" spin></fanc-icon>
                    <text class="icon-name">加载中</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="circle-notch" size="24" spin></fanc-icon>
                    <text class="icon-name">刷新</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="cog" size="24" spin></fanc-icon>
                    <text class="icon-name">设置</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="section-title">图片图标</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="https://img.yzcdn.cn/vant/logo.png" size="32"></fanc-icon>
                    <text class="icon-name">URL图片</text>
                </view>
                <view class="icon-item">
                    <fanc-icon name="https://img.yzcdn.cn/vant/logo.png" size="48" badge="new"></fanc-icon>
                    <text class="icon-name">带徽标</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="section-title">自定义样式</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon
                        name="star"
                        size="32"
                        color="#ffc107"
                        :customStyle="{
                            transform: 'rotate(45deg)',
                            textShadow: '0 0 5px rgba(255, 193, 7, 0.5)',
                        }"
                    ></fanc-icon>
                    <text class="icon-name">旋转星星</text>
                </view>
                <view class="icon-item">
                    <fanc-icon
                        name="heart"
                        size="32"
                        color="#dc3545"
                        :customStyle="{
                            filter: 'drop-shadow(0 0 2px #dc3545)',
                        }"
                    ></fanc-icon>
                    <text class="icon-name">发光爱心</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <text class="section-title">点击事件</text>
            <view class="icon-row">
                <view class="icon-item">
                    <fanc-icon name="bell" size="32" color="#007bff" clickable @click="handleIconClick"></fanc-icon>
                    <text class="icon-name">点击我</text>
                </view>
                <view class="icon-item">
                    <fanc-icon
                        name="thumbs-up"
                        size="32"
                        :color="isLiked ? '#dc3545' : '#6c757d'"
                        clickable
                        @click="toggleLike"
                    ></fanc-icon>
                    <text class="icon-name">{{ isLiked ? "已点赞" : "点赞" }}</text>
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
        return {
            isLiked: false,
        };
    },
    methods: {
        handleIconClick() {
            uni.showToast({
                title: "图标被点击了",
                icon: "none",
            });
        },
        toggleLike() {
            this.isLiked = !this.isLiked;
            uni.showToast({
                title: this.isLiked ? "已点赞" : "已取消点赞",
                icon: "none",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.container {
    padding: $spacing-lg;
    background-color: $gray-100;
}

.header {
    margin-bottom: $spacing-xl;
    text-align: center;
}

.title {
    display: block;
    margin-bottom: $spacing-sm;
    font-size: $font-size-lg * 1.25;
    font-weight: $font-weight-bold;
    color: $gray-800;
}

.subtitle {
    font-size: $font-size-base;
    color: $gray-600;
}

.example-section {
    margin-bottom: $spacing-lg;
    padding: $spacing-md;
    background-color: $white;
    border-radius: $border-radius-lg;
    box-shadow: $box-shadow-sm;
}

.section-title {
    display: block;
    margin-bottom: $spacing-sm;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $gray-800;
}

.icon-row {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
    margin-top: $spacing-sm;
}

.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    padding: $spacing-sm;
    background-color: $gray-100;
    border-radius: $border-radius-md;
    transition: all $duration-base;

    &:hover {
        background-color: $gray-200;
        transform: translateY(-2px);
        box-shadow: $box-shadow-sm;
    }
}

.icon-name {
    margin-top: $spacing-sm;
    font-size: $font-size-sm;
    color: $gray-700;
    text-align: center;
}
</style>
