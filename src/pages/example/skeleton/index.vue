<template>
    <view class="container">
        <view class="header">
            <view class="title">骨架屏</view>
            <view class="subtitle"
                >在页面数据加载完成前，先展示出页面的大致结构，减少用户等待时的焦虑感</view
            >
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="example">
                <fanc-skeleton />
            </view>
        </view>

        <!-- 显示头像 -->
        <view class="section">
            <view class="section-title">显示头像</view>
            <view class="example">
                <fanc-skeleton avatar />
            </view>
        </view>

        <!-- 圆形头像 -->
        <view class="section">
            <view class="section-title">圆形头像</view>
            <view class="example">
                <fanc-skeleton avatar avatarRound />
            </view>
        </view>

        <!-- 标题和段落 -->
        <view class="section">
            <view class="section-title">标题和段落</view>
            <view class="example">
                <fanc-skeleton title paragraph />
            </view>
        </view>

        <!-- 自定义行数和宽度 -->
        <view class="section">
            <view class="section-title">自定义行数和宽度</view>
            <view class="example">
                <fanc-skeleton
                    title
                    paragraph
                    :rowCount="5"
                    :rowWidths="['60%', '80%', '70%', '90%', '40%']"
                />
            </view>
        </view>

        <!-- 带圆角风格 -->
        <view class="section">
            <view class="section-title">带圆角风格</view>
            <view class="example">
                <fanc-skeleton avatar avatarRound title paragraph round />
            </view>
        </view>

        <!-- 关闭动画效果 -->
        <view class="section">
            <view class="section-title">关闭动画效果</view>
            <view class="example">
                <fanc-skeleton title paragraph :animated="false" />
            </view>
        </view>

        <!-- 自定义背景色 -->
        <view class="section">
            <view class="section-title">自定义背景色</view>
            <view class="example">
                <fanc-skeleton title paragraph bgColor="#f8f8f8" />
            </view>
        </view>

        <!-- 实际应用场景 -->
        <view class="section">
            <view class="section-title">实际应用场景</view>
            <view class="example">
                <view class="buttons">
                    <fanc-button type="primary" size="small" @click="showSkeleton"
                        >显示骨架屏</fanc-button
                    >
                    <fanc-button type="success" size="small" @click="hideSkeleton"
                        >显示内容</fanc-button
                    >
                </view>
                <fanc-skeleton
                    :loading="isLoading"
                    avatar
                    avatarSize="48px"
                    avatarRound
                    title
                    titleWidth="60%"
                    paragraph
                    :rowCount="3"
                >
                    <!-- 实际内容 -->
                    <view class="card">
                        <view class="card-header">
                            <image
                                class="avatar"
                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                mode="aspectFill"
                            ></image>
                            <view class="user-info">
                                <view class="username">用户名称</view>
                                <view class="time">2小时前</view>
                            </view>
                        </view>
                        <view class="card-content">
                            这是一段示例文本内容，用于演示骨架屏组件的实际应用场景。当网络较慢时，骨架屏可以提前展示页面的大致结构，提升用户体验。
                        </view>
                    </view>
                </fanc-skeleton>
            </view>
        </view>

        <!-- 自定义骨架屏模板 -->
        <view class="section">
            <view class="section-title">自定义骨架屏模板</view>
            <view class="example">
                <fanc-skeleton :loading="isCustomLoading">
                    <template #template>
                        <view class="custom-skeleton">
                            <view class="custom-skeleton__header">
                                <view class="custom-skeleton__avatar"></view>
                                <view class="custom-skeleton__content">
                                    <view class="custom-skeleton__title"></view>
                                    <view class="custom-skeleton__subtitle"></view>
                                </view>
                            </view>
                            <view class="custom-skeleton__image"></view>
                            <view class="custom-skeleton__footer">
                                <view class="custom-skeleton__button"></view>
                                <view class="custom-skeleton__button"></view>
                            </view>
                        </view>
                    </template>

                    <!-- 实际内容 -->
                    <view class="custom-card">
                        <view class="custom-card__header">
                            <image
                                class="custom-card__avatar"
                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                mode="aspectFill"
                            ></image>
                            <view class="custom-card__content">
                                <view class="custom-card__title">商品标题</view>
                                <view class="custom-card__subtitle">¥ 199.00</view>
                            </view>
                        </view>
                        <image
                            class="custom-card__image"
                            src="https://img.yzcdn.cn/vant/ipad.jpeg"
                            mode="aspectFill"
                        ></image>
                        <view class="custom-card__footer">
                            <fanc-button size="small">加入购物车</fanc-button>
                            <fanc-button type="primary" size="small">立即购买</fanc-button>
                        </view>
                    </view>
                </fanc-skeleton>
                <view class="buttons">
                    <fanc-button type="primary" size="small" @click="showCustomSkeleton"
                        >显示自定义骨架屏</fanc-button
                    >
                    <fanc-button type="success" size="small" @click="hideCustomSkeleton"
                        >显示内容</fanc-button
                    >
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
            isCustomLoading: true,
        };
    },
    mounted() {
        // 模拟数据加载，3秒后显示实际内容
        setTimeout(() => {
            this.isLoading = false;
            this.isCustomLoading = false;
        }, 3000);
    },
    methods: {
        showSkeleton() {
            this.isLoading = true;
            // 模拟2秒后加载完成
            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        },
        hideSkeleton() {
            this.isLoading = false;
        },
        showCustomSkeleton() {
            this.isCustomLoading = true;
            // 模拟2秒后加载完成
            setTimeout(() => {
                this.isCustomLoading = false;
            }, 2000);
        },
        hideCustomSkeleton() {
            this.isCustomLoading = false;
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

.example {
    padding: 16px;
}

.buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}

/* 卡片样式 */
.card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
    display: flex;
    padding: 12px;
    align-items: center;
}

.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 12px;
}

.user-info {
    flex: 1;
}

.username {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
}

.time {
    font-size: 12px;
    color: #999;
}

.card-content {
    padding: 0 12px 12px;
    font-size: 14px;
    color: #666;
    line-height: 1.6;
}

/* 自定义骨架屏样式 */
.custom-skeleton {
    width: 100%;
}

.custom-skeleton__header {
    display: flex;
    padding: 12px;
    align-items: center;
}

.custom-skeleton__avatar {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: #eeeeee;
    margin-right: 12px;
}

.custom-skeleton__content {
    flex: 1;
}

.custom-skeleton__title {
    height: 16px;
    background-color: #eeeeee;
    margin-bottom: 8px;
    width: 50%;
    border-radius: 2px;
}

.custom-skeleton__subtitle {
    height: 12px;
    background-color: #eeeeee;
    width: 30%;
    border-radius: 2px;
}

.custom-skeleton__image {
    width: 100%;
    height: 160px;
    background-color: #eeeeee;
}

.custom-skeleton__footer {
    display: flex;
    justify-content: space-between;
    padding: 12px;
}

.custom-skeleton__button {
    width: 45%;
    height: 32px;
    background-color: #eeeeee;
    border-radius: 4px;
}

/* 自定义卡片样式 */
.custom-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.custom-card__header {
    display: flex;
    padding: 12px;
    align-items: center;
}

.custom-card__avatar {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 12px;
}

.custom-card__content {
    flex: 1;
}

.custom-card__title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
}

.custom-card__subtitle {
    font-size: 14px;
    color: #f44;
    font-weight: bold;
}

.custom-card__image {
    width: 100%;
    height: 160px;
}

.custom-card__footer {
    display: flex;
    justify-content: space-between;
    padding: 12px;
}
</style>
