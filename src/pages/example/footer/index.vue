<template>
    <view class="container">
        <view class="header">
            <view class="title">页脚</view>
            <view class="subtitle">页脚组件用于展示网站的版权声明、联系信息和重要链接等内容</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="example-block">
                <fanc-footer
                    copyright="© 2024 Fantastic UI. All Rights Reserved."
                    :links="[
                        { text: '关于我们', url: '/pages/about/index' },
                        { text: '隐私政策', url: '/pages/privacy/index' },
                        { text: '服务条款', url: '/pages/terms/index' },
                    ]"
                ></fanc-footer>
            </view>
        </view>

        <!-- 主题样式 -->
        <view class="section">
            <view class="section-title">主题样式</view>
            <view class="example-block">
                <view class="example-item">
                    <view class="example-item-title">默认主题</view>
                    <fanc-footer
                        theme="default"
                        copyright="© 2024 Fantastic UI"
                        :links="[
                            { text: '关于我们', icon: 'info-circle' },
                            { text: '帮助中心', icon: 'question-circle' },
                        ]"
                    ></fanc-footer>
                </view>

                <view class="example-item">
                    <view class="example-item-title">暗色主题</view>
                    <fanc-footer
                        theme="dark"
                        copyright="© 2024 Fantastic UI"
                        :links="[
                            { text: '关于我们', icon: 'info-circle' },
                            { text: '帮助中心', icon: 'question-circle' },
                        ]"
                    ></fanc-footer>
                </view>

                <view class="example-item">
                    <view class="example-item-title">亮色主题</view>
                    <fanc-footer
                        theme="light"
                        copyright="© 2024 Fantastic UI"
                        :links="[
                            { text: '关于我们', icon: 'info-circle' },
                            { text: '帮助中心', icon: 'question-circle' },
                        ]"
                    ></fanc-footer>
                </view>

                <view class="example-item">
                    <view class="example-item-title">主色主题</view>
                    <fanc-footer
                        theme="primary"
                        copyright="© 2024 Fantastic UI"
                        :links="[
                            { text: '关于我们', icon: 'info-circle' },
                            { text: '帮助中心', icon: 'question-circle' },
                        ]"
                    ></fanc-footer>
                </view>
            </view>
        </view>

        <!-- 带Logo和标题 -->
        <view class="section">
            <view class="section-title">带Logo和标题</view>
            <view class="example-block">
                <fanc-footer
                    show-logo
                    logo="/static/logo.png"
                    title="Fantastic UI"
                    copyright="© 2024 Fantastic UI. All Rights Reserved."
                    :links="[
                        { text: '官方网站', url: 'https://www.example.com', external: true },
                        { text: '加入我们', url: '/pages/join/index' },
                    ]"
                ></fanc-footer>
            </view>
        </view>

        <!-- 自定义内容 -->
        <view class="section">
            <view class="section-title">自定义内容</view>
            <view class="example-block">
                <fanc-footer copyright="© 2024 Fantastic UI">
                    <view class="custom-content">
                        <view class="contact-info">
                            <view class="contact-item">
                                <fanc-icon name="phone" size="16"></fanc-icon>
                                <text>400-123-4567</text>
                            </view>
                            <view class="contact-item">
                                <fanc-icon name="envelope" size="16"></fanc-icon>
                                <text>support@example.com</text>
                            </view>
                        </view>
                        <view class="social-links">
                            <view class="social-item">
                                <fanc-icon name="weixin" size="24" color="#09BB07"></fanc-icon>
                            </view>
                            <view class="social-item">
                                <fanc-icon name="weibo" size="24" color="#E6162D"></fanc-icon>
                            </view>
                            <view class="social-item">
                                <fanc-icon name="github" size="24" color="#24292E"></fanc-icon>
                            </view>
                        </view>
                    </view>
                </fanc-footer>
            </view>
        </view>

        <!-- 带备案信息 -->
        <view class="section">
            <view class="section-title">带备案信息</view>
            <view class="example-block">
                <fanc-footer
                    copyright="© 2024 Fantastic UI. All Rights Reserved."
                    icp="京ICP备12345678号-1"
                ></fanc-footer>
            </view>
        </view>

        <!-- 固定在底部 -->
        <view class="section">
            <view class="section-title">固定在底部</view>
            <view class="example-note">
                <text
                    >设置 fixed 属性可将页脚固定在页面底部，设置 safe-area-inset-bottom
                    属性可适配底部安全区域</text
                >
            </view>
            <view class="example-block">
                <fanc-button type="primary" @click="showFixedFooter = true"
                    >显示固定页脚</fanc-button
                >
            </view>
        </view>

        <!-- 固定页脚示例 -->
        <fanc-footer
            v-if="showFixedFooter"
            fixed
            safe-area-inset-bottom
            theme="primary"
            copyright="© 2024 Fantastic UI"
            :links="[{ text: '关闭', icon: 'times-circle' }]"
            @link-click="showFixedFooter = false"
        ></fanc-footer>
    </view>
</template>

<script>
export default {
    data() {
        return {
            showFixedFooter: false,
        };
    },
    methods: {
        // 示例方法
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

.example-block {
    padding: 16px;
}

.example-item {
    margin-bottom: 24px;
}

.example-item-title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 8px;
}

.example-note {
    font-size: 14px;
    color: #969799;
    padding: 0 16px 16px;
    line-height: 1.5;
}

/* 自定义内容样式 */
.custom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.contact-item text {
    margin-left: 8px;
}

.social-links {
    display: flex;
    justify-content: center;
}

.social-item {
    margin: 0 12px;
}
</style>
