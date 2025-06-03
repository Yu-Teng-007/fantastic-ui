<template>
    <view class="container">
        <view class="header">
            <view class="title">引导</view>
            <view class="subtitle"
                >逐步骤进行指引或解释说明的组件，常用于用户不熟悉的或需进行特别强调的页面</view
            >
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-button type="primary" @click="showBasicGuide = true"
                    >显示基础引导</fanc-button
                >
                <fanc-guide
                    v-model:show="showBasicGuide"
                    title="欢迎使用"
                    text="这是一个简单的引导示例，点击完成按钮关闭引导。"
                    centered
                ></fanc-guide>
            </view>
        </view>

        <!-- 多步骤引导 -->
        <view class="section">
            <view class="section-title">多步骤引导</view>
            <view class="demo-block">
                <fanc-button type="primary" @click="showStepsGuide = true"
                    >显示多步骤引导</fanc-button
                >
                <fanc-guide
                    v-model:show="showStepsGuide"
                    v-model:step="currentStep"
                    :steps="steps"
                    :title="steps[currentStep].title"
                    :text="steps[currentStep].content"
                    centered
                    @finish="handleFinish"
                ></fanc-guide>
            </view>
        </view>

        <!-- 自定义位置 -->
        <view class="section">
            <view class="section-title">自定义位置</view>
            <view class="demo-block">
                <fanc-button type="primary" @click="showPositionGuide = true"
                    >显示自定义位置引导</fanc-button
                >
                <fanc-guide
                    v-model:show="showPositionGuide"
                    title="自定义位置"
                    text="这个引导框位于页面右上角。"
                    :position="{ top: '100px', right: '20px' }"
                ></fanc-guide>
            </view>
        </view>

        <!-- 不同主题 -->
        <view class="section">
            <view class="section-title">不同主题</view>
            <view class="demo-block theme-buttons">
                <fanc-button type="default" @click="showLightTheme">浅色主题</fanc-button>
                <fanc-button type="primary" @click="showDarkTheme">深色主题</fanc-button>
                <fanc-button type="info" @click="showPrimaryTheme">主色主题</fanc-button>

                <fanc-guide
                    v-model:show="showThemeGuide"
                    :theme="currentTheme"
                    title="主题演示"
                    :text="`这是${themeNames[currentTheme]}主题的引导框。`"
                    centered
                ></fanc-guide>
            </view>
        </view>

        <!-- 自动播放 -->
        <view class="section">
            <view class="section-title">自动播放</view>
            <view class="demo-block">
                <fanc-button type="primary" @click="showAutoplayGuide = true"
                    >显示自动播放引导</fanc-button
                >
                <fanc-guide
                    v-model:show="showAutoplayGuide"
                    v-model:step="autoplayStep"
                    :steps="autoplaySteps"
                    :title="autoplaySteps[autoplayStep].title"
                    :text="autoplaySteps[autoplayStep].content"
                    centered
                    autoplay
                    :autoplay-delay="2000"
                    @finish="handleAutoplayFinish"
                ></fanc-guide>
            </view>
        </view>

        <!-- 自定义内容 -->
        <view class="section">
            <view class="section-title">自定义内容</view>
            <view class="demo-block">
                <fanc-button type="primary" @click="showCustomGuide = true"
                    >显示自定义内容引导</fanc-button
                >
                <fanc-guide v-model:show="showCustomGuide" centered>
                    <template #title>
                        <view class="custom-title">
                            <fanc-icon name="star" color="#ffc107" size="20"></fanc-icon>
                            <text>自定义标题</text>
                        </view>
                    </template>
                    <view class="custom-content">
                        <image class="custom-image" src="/static/logo.png" mode="widthFix"></image>
                        <text class="custom-text"
                            >这是一个带有自定义内容的引导框，可以添加图片、按钮等元素。</text
                        >
                        <fanc-button type="primary" size="small" class="custom-button"
                            >了解更多</fanc-button
                        >
                    </view>
                    <template #footer>
                        <view class="custom-footer">
                            <fanc-button type="primary" block @click="showCustomGuide = false"
                                >我知道了</fanc-button
                            >
                        </view>
                    </template>
                </fanc-guide>
            </view>
        </view>

        <!-- 功能引导 -->
        <view class="section">
            <view class="section-title">功能引导</view>
            <view class="demo-block feature-guide-container">
                <view class="feature-buttons">
                    <view class="feature-button" @click="showFeature('search')">
                        <fanc-icon name="search" size="24"></fanc-icon>
                        <text>搜索</text>
                    </view>
                    <view class="feature-button" @click="showFeature('cart')">
                        <fanc-icon name="shopping-cart" size="24"></fanc-icon>
                        <text>购物车</text>
                    </view>
                    <view class="feature-button" @click="showFeature('user')">
                        <fanc-icon name="user" size="24"></fanc-icon>
                        <text>我的</text>
                    </view>
                </view>

                <fanc-button type="primary" @click="startFeatureGuide">开始功能引导</fanc-button>

                <fanc-guide
                    v-model:show="showFeatureGuide"
                    v-model:step="featureStep"
                    :steps="featureGuides"
                    :title="featureGuides[featureStep].title"
                    :text="featureGuides[featureStep].content"
                    :position="featurePositions[featureStep]"
                    @finish="handleFeatureFinish"
                ></fanc-guide>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础引导
            showBasicGuide: false,

            // 多步骤引导
            showStepsGuide: false,
            currentStep: 0,
            steps: [
                { title: "第一步", content: "这是第一步的引导内容，点击下一步继续。" },
                { title: "第二步", content: "这是第二步的引导内容，介绍更多功能。" },
                { title: "第三步", content: "这是最后一步，点击完成按钮结束引导。" },
            ],

            // 自定义位置引导
            showPositionGuide: false,

            // 主题引导
            showThemeGuide: false,
            currentTheme: "light",
            themeNames: {
                light: "浅色",
                dark: "深色",
                primary: "主色",
            },

            // 自动播放引导
            showAutoplayGuide: false,
            autoplayStep: 0,
            autoplaySteps: [
                { title: "自动播放", content: "这个引导会自动播放，每2秒切换一次。" },
                { title: "无需点击", content: "无需手动点击，系统会自动切换到下一步。" },
                { title: "播放结束", content: "自动播放结束后，引导会自动关闭。" },
            ],

            // 自定义内容引导
            showCustomGuide: false,

            // 功能引导
            showFeatureGuide: false,
            featureStep: 0,
            featureGuides: [
                { title: "搜索功能", content: "点击这里可以搜索您需要的商品。" },
                { title: "购物车", content: "您的购物车，查看已选商品。" },
                { title: "个人中心", content: "查看您的订单和个人信息。" },
            ],
            featurePositions: [
                { top: "100px", left: "20px" },
                { top: "100px", left: "50%" },
                { top: "100px", right: "20px" },
            ],
        };
    },
    methods: {
        handleFinish() {
            this.$toast.success("引导完成！");
            this.currentStep = 0;
        },
        showLightTheme() {
            this.currentTheme = "light";
            this.showThemeGuide = true;
        },
        showDarkTheme() {
            this.currentTheme = "dark";
            this.showThemeGuide = true;
        },
        showPrimaryTheme() {
            this.currentTheme = "primary";
            this.showThemeGuide = true;
        },
        handleAutoplayFinish() {
            this.$toast.success("自动播放引导完成！");
            this.autoplayStep = 0;
        },
        showFeature(feature) {
            this.$toast.text(`点击了${feature}功能`);
        },
        startFeatureGuide() {
            this.featureStep = 0;
            this.showFeatureGuide = true;
        },
        handleFeatureFinish() {
            this.$toast.success("功能引导完成！");
            this.featureStep = 0;
        },
    },
};
</script>

<style scoped>
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
    padding: 20px 16px;
}

.theme-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.custom-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #323233;
}

.custom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.custom-image {
    width: 100px;
    height: 100px;
}

.custom-text {
    font-size: 14px;
    color: #646566;
    text-align: center;
    line-height: 1.5;
}

.custom-button {
    margin-top: 8px;
}

.custom-footer {
    width: 100%;
    margin-top: 16px;
}

.feature-guide-container {
    position: relative;
    padding: 20px;
}

.feature-buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
}

.feature-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-radius: 8px;
    background-color: #f2f2f2;
    width: 80px;
}

.feature-button text {
    font-size: 14px;
    color: #323233;
}
</style>
