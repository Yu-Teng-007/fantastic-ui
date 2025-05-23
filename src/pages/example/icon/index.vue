<template>
    <view class="container">
        <view class="header">
            <view class="title">图标</view>
            <view class="subtitle">提供丰富的图标集合，支持自定义颜色、大小和样式</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="home" size="24"></fanc-icon>
                    <text class="icon-name">home</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="user" size="24"></fanc-icon>
                    <text class="icon-name">user</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="search" size="24"></fanc-icon>
                    <text class="icon-name">search</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="heart" size="24"></fanc-icon>
                    <text class="icon-name">heart</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="star" size="24"></fanc-icon>
                    <text class="icon-name">star</text>
                </view>
            </view>
        </view>

        <!-- 图标类型 -->
        <view class="section">
            <view class="section-title">图标类型</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="user" type="solid" size="24"></fanc-icon>
                    <text class="icon-name">Solid</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="user" type="regular" size="24"></fanc-icon>
                    <text class="icon-name">Regular</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="apple" type="brands" size="24"></fanc-icon>
                    <text class="icon-name">Brands</text>
                </view>
            </view>
        </view>

        <!-- 不同颜色 -->
        <view class="section">
            <view class="section-title">不同颜色</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="check" size="24" color="#28a745"></fanc-icon>
                    <text class="icon-name">绿色</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="times" size="24" color="#dc3545"></fanc-icon>
                    <text class="icon-name">红色</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="exclamation-triangle" size="24" color="#ffc107"></fanc-icon>
                    <text class="icon-name">黄色</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="info-circle" size="24" color="#17a2b8"></fanc-icon>
                    <text class="icon-name">蓝色</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="question-circle" size="24" color="#6c757d"></fanc-icon>
                    <text class="icon-name">灰色</text>
                </view>
            </view>
        </view>

        <!-- 不同尺寸 -->
        <view class="section">
            <view class="section-title">不同尺寸</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="cog" size="16"></fanc-icon>
                    <text class="icon-name">16px</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="cog" size="24"></fanc-icon>
                    <text class="icon-name">24px</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="cog" size="32"></fanc-icon>
                    <text class="icon-name">32px</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="cog" size="48"></fanc-icon>
                    <text class="icon-name">48px</text>
                </view>
            </view>
        </view>

        <!-- 小红点 -->
        <view class="section">
            <view class="section-title">小红点(dot)</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="bell" size="24" dot></fanc-icon>
                    <text class="icon-name">消息提醒</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="envelope" size="24" dot></fanc-icon>
                    <text class="icon-name">邮件提醒</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="comment" size="24" dot></fanc-icon>
                    <text class="icon-name">评论提醒</text>
                </view>
            </view>
        </view>

        <!-- 徽标 -->
        <view class="section">
            <view class="section-title">徽标(badge)</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="bell" size="24" badge="8"></fanc-icon>
                    <text class="icon-name">8条消息</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="envelope" size="24" badge="99+"></fanc-icon>
                    <text class="icon-name">99+封邮件</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="shopping-cart" size="24" badge="5"></fanc-icon>
                    <text class="icon-name">5件商品</text>
                </view>
            </view>
        </view>

        <!-- 旋转动画 -->
        <view class="section">
            <view class="section-title">旋转动画(spin)</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="sync" size="24" spin></fanc-icon>
                    <text class="icon-name">同步</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="spinner" size="24" spin></fanc-icon>
                    <text class="icon-name">加载中</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="circle-notch" size="24" spin></fanc-icon>
                    <text class="icon-name">刷新</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon name="cog" size="24" spin></fanc-icon>
                    <text class="icon-name">设置</text>
                </view>
            </view>
        </view>

        <!-- 图片图标 -->
        <view class="section">
            <view class="section-title">图片图标</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon name="https://img.yzcdn.cn/vant/logo.png" size="32"></fanc-icon>
                    <text class="icon-name">URL图片</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon
                        name="https://img.yzcdn.cn/vant/logo.png"
                        size="48"
                        badge="new"
                    ></fanc-icon>
                    <text class="icon-name">带徽标</text>
                </view>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="icon-grid">
                <view class="icon-cell">
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
                <view class="icon-cell">
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

        <!-- 点击事件 -->
        <view class="section">
            <view class="section-title">点击事件</view>
            <view class="icon-grid">
                <view class="icon-cell">
                    <fanc-icon
                        name="bell"
                        size="32"
                        color="#007bff"
                        clickable
                        @click="handleIconClick"
                    ></fanc-icon>
                    <text class="icon-name">点击触发</text>
                </view>
                <view class="icon-cell">
                    <fanc-icon
                        name="thumbs-up"
                        size="32"
                        color="#28a745"
                        clickable
                        @click="handleLike"
                    ></fanc-icon>
                    <text class="icon-name">点赞</text>
                </view>
            </view>
        </view>

        <!-- 常用图标集合 -->
        <view class="section">
            <view class="section-title">常用图标集合</view>
            <view class="icon-grid">
                <view
                    class="icon-cell"
                    v-for="(icon, index) in commonIcons"
                    :key="index"
                    @click="copyIconName(icon)"
                >
                    <fanc-icon :name="icon" size="24"></fanc-icon>
                    <text class="icon-name">{{ icon }}</text>
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
            commonIcons: [
                "home",
                "search",
                "user",
                "cog",
                "heart",
                "star",
                "bell",
                "envelope",
                "camera",
                "calendar",
                "chart-bar",
                "check",
                "times",
                "edit",
                "trash",
                "download",
                "upload",
                "share",
                "comment",
                "bookmark",
            ],
        };
    },
    methods: {
        handleIconClick() {
            uni.showToast({
                title: "点击了图标",
                icon: "none",
            });
        },
        handleLike() {
            uni.showToast({
                title: "点赞成功",
                icon: "none",
            });
        },
        copyIconName(name) {
            uni.setClipboardData({
                data: name,
                success: () => {
                    uni.showToast({
                        title: `已复制: ${name}`,
                        icon: "none",
                    });
                },
            });
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
    padding: 16px;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    padding-bottom: 16px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 16px;
}

.icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 16px;
    padding: 12px 0;
}

.icon-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 8px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
}

.icon-cell:active {
    transform: scale(0.96);
    opacity: 0.8;
}

.icon-name {
    font-size: 12px;
    color: #646566;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: center;
}
</style>
