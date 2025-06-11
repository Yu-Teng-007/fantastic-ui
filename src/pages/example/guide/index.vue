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
                    close-on-click-overlay
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
                    :initialStep="currentStep"
                    :steps="steps"
                    @finish="handleFinish"
                    @skip="handleSkip"
                    @next="onStepChange"
                    @prev="onStepChange"
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
                    text="这个引导框位于页面中央，是一个全屏弹出引导。"
                    close-on-click-overlay
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
                    close-on-click-overlay
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
                    :initialStep="autoplayStep"
                    :steps="autoplaySteps"
                    autoplay
                    :autoplay-delay="2000"
                    @finish="handleAutoplayFinish"
                    close-on-click-overlay
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
                <fanc-guide v-model:show="showCustomGuide" close-on-click-overlay>
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
                    :initialStep="featureStep"
                    :steps="featureGuides"
                    @finish="handleFeatureFinish"
                    @skip="handleFeatureSkip"
                    @next="onFeatureStepChange"
                    @prev="onFeatureStepChange"
                    close-on-click-overlay
                ></fanc-guide>
            </view>
        </view>

        <!-- 表单填写引导 -->
        <view class="section">
            <view class="section-title">表单填写引导</view>
            <view class="demo-block">
                <view class="form-container">
                    <view class="form-item">
                        <text class="form-label">用户名</text>
                        <input
                            class="form-input"
                            v-model="formData.username"
                            placeholder="请输入用户名"
                        />
                    </view>
                    <view class="form-item">
                        <text class="form-label">密码</text>
                        <input
                            class="form-input"
                            v-model="formData.password"
                            type="password"
                            placeholder="请输入密码"
                        />
                    </view>
                    <view class="form-item">
                        <text class="form-label">手机号</text>
                        <input
                            class="form-input"
                            v-model="formData.phone"
                            placeholder="请输入手机号"
                        />
                    </view>
                    <view class="form-buttons">
                        <fanc-button type="primary" @click="submitForm">提交</fanc-button>
                        <fanc-button type="default" @click="startFormGuide"
                            >显示填写引导</fanc-button
                        >
                    </view>
                </view>

                <fanc-popup
                    v-model:show="showFormGuide"
                    position="center"
                    :overlay-closable="false"
                    :z-index="9999"
                >
                    <view class="form-guide">
                        <view class="form-guide__header">
                            <text class="form-guide__title">{{
                                formGuideSteps[formGuideStep].title || ""
                            }}</text>
                        </view>
                        <view class="form-guide__content">
                            <text class="form-guide__text">{{
                                formGuideSteps[formGuideStep].content || ""
                            }}</text>
                        </view>
                        <view class="form-guide__footer">
                            <view class="form-guide__steps">
                                <view
                                    class="form-guide__step"
                                    v-for="(step, index) in formGuideSteps"
                                    :key="index"
                                    :class="{ 'form-guide__step--active': index === formGuideStep }"
                                ></view>
                            </view>
                            <view class="form-guide__buttons">
                                <view
                                    class="form-guide__button form-guide__button--skip"
                                    v-if="formGuideStep < formGuideSteps.length - 1"
                                    @click="handleFormGuideSkip"
                                >
                                    跳过
                                </view>
                                <view
                                    class="form-guide__button form-guide__button--prev"
                                    v-if="formGuideStep > 0"
                                    @click="handleFormGuidePrev"
                                >
                                    上一步
                                </view>
                                <view
                                    class="form-guide__button form-guide__button--next"
                                    @click="handleFormGuideNext"
                                >
                                    {{
                                        formGuideStep === formGuideSteps.length - 1
                                            ? "完成"
                                            : "下一步"
                                    }}
                                </view>
                            </view>
                        </view>
                    </view>
                </fanc-popup>
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

            // 表单填写引导
            formData: {
                username: "",
                password: "",
                phone: "",
            },
            showFormGuide: false,
            formGuideStep: 0,
            formGuideSteps: [
                {
                    title: "用户引导标题",
                    content: "按照引导填写表单的每一项内容，请先填写用户名。",
                },
                {
                    title: "密码填写",
                    content: "请设置一个安全的密码，建议使用字母、数字和特殊字符的组合。",
                },
                {
                    title: "手机号填写",
                    content: "请输入您的手机号码，将用于接收验证码和重要通知。",
                },
            ],
        };
    },
    methods: {
        handleFinish() {
            this.$toast.success("引导完成！");
            this.currentStep = 0;
        },
        handleSkip() {
            this.$toast.text("已跳过引导");
            this.currentStep = 0;
        },
        onStepChange(step) {
            console.log("步骤变更:", step);
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
        handleFeatureSkip() {
            this.$toast.text("已跳过功能引导");
            this.featureStep = 0;
        },
        onFeatureStepChange(step) {
            console.log("功能引导步骤变更:", step);
        },
        submitForm() {
            this.$toast.success("表单提交成功！");
        },
        startFormGuide() {
            this.formGuideStep = 0;
            this.showFormGuide = true;
            console.log("显示表单引导", this.showFormGuide);
        },
        handleFormGuideFinish() {
            this.$toast.success("表单引导完成！");
            this.formGuideStep = 0;
            this.showFormGuide = false;
        },
        handleFormGuideSkip() {
            this.$toast.text("已跳过表单引导");
            this.formGuideStep = 0;
            this.showFormGuide = false;
        },
        handleFormGuideNext() {
            if (this.formGuideStep === this.formGuideSteps.length - 1) {
                this.handleFormGuideFinish();
            } else {
                this.formGuideStep++;
            }
        },
        handleFormGuidePrev() {
            if (this.formGuideStep > 0) {
                this.formGuideStep--;
            }
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

/* 表单样式 */
.form-container {
    width: 100%;
}

.form-item {
    margin-bottom: 16px;
}

.form-label {
    display: block;
    font-size: 14px;
    color: #323233;
    margin-bottom: 8px;
}

.form-input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    background-color: #f7f8fa;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 14px;
    color: #323233;
    box-sizing: border-box;
}

.form-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.form-guide {
    width: 300px;
    background-color: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.form-guide__header {
    margin-bottom: 16px;
}

.form-guide__title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
}

.form-guide__content {
    margin-bottom: 24px;
}

.form-guide__text {
    font-size: 14px;
    color: #646566;
    line-height: 1.6;
}

.form-guide__footer {
    display: flex;
    flex-direction: column;
}

.form-guide__steps {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
}

.form-guide__step {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #dcdee0;
    margin: 0 4px;
    transition: all 0.3s;
}

.form-guide__step--active {
    background-color: #1989fa;
    transform: scale(1.2);
}

.form-guide__buttons {
    display: flex;
    justify-content: space-between;
}

.form-guide__button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.form-guide__button--skip {
    color: #969799;
    background-color: transparent;
}

.form-guide__button--prev {
    color: #323233;
    background-color: #f2f3f5;
    margin-right: 8px;
}

.form-guide__button--next {
    color: #fff;
    background-color: #1989fa;
    flex: 1;
}
</style>
