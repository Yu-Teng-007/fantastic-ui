<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">表单组件</text>
            <text class="example-page__header-desc"
                >表单组件用于数据收集、校验和提交，支持各种表单项的布局和验证</text
            >
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">应用场景示例</view>
            <view class="example-page__section-desc">提供多种真实场景下的表单使用示例</view>
            <view class="example-page__content">
                <view class="example-entries">
                    <fanc-button
                        type="primary"
                        class="example-entry-btn"
                        @click="goToDemo('basic')"
                    >
                        基础表单
                    </fanc-button>

                    <fanc-button
                        type="success"
                        class="example-entry-btn"
                        @click="goToDemo('validation')"
                    >
                        表单验证
                    </fanc-button>

                    <fanc-button type="info" class="example-entry-btn" @click="goToDemo('complex')">
                        复杂表单
                    </fanc-button>
                </view>
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
        // 跳转到示例页面
        goToDemo(page) {
            uni.navigateTo({
                url: `/pages/form-example/${page}`,
            });
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/example-pages.scss";

// 自定义样式补充
.example-page {
    &__content {
        padding: 0 16px;
    }
}

.example-entries {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 8px 0 12px;

    .example-entry-btn {
        flex: 1;
        min-width: 100px;
    }
}
</style>
