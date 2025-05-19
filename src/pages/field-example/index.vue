<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">输入框组件</text>
            <text class="example-page__header-desc"
                >输入框用于接收用户输入的信息，支持多种类型和自定义样式</text
            >
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">应用场景示例</view>
            <view class="example-page__section-desc">提供多种真实场景下的输入框使用示例</view>
            <view class="example-page__content">
                <view class="example-entries">
                    <fanc-button type="primary" class="example-entry-btn" @click="goToDemo('demo')">
                        简单示例
                    </fanc-button>

                    <fanc-button
                        type="success"
                        class="example-entry-btn"
                        @click="goToDemo('login-form')"
                    >
                        登录表单
                    </fanc-button>

                    <fanc-button
                        type="info"
                        class="example-entry-btn"
                        @click="goToDemo('advanced-form')"
                    >
                        高级表单
                    </fanc-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            text: "",
            password: "",
            number: "",
            idcard: "",
            tel: "",
            message: "",
            disabled: "禁用状态",
            readonly: "只读状态",
            required: "",
            error: "",
            leftIcon: "",
            rightIcon: "",
            clearable: "",
            wordLimit: "",
            autoHeight: "",
            alignLeft: "",
            alignCenter: "",
            alignRight: "",
            slots: "",
            username: "",
            phone: "",
            code: "",
            validation: {
                required: "",
                email: "",
                mobile: "",
                password: "",
            },
        };
    },
    methods: {
        // 跳转到示例页面
        goToDemo(page) {
            uni.navigateTo({
                url: `/pages/field-example/${page}`,
            });
        },
        onValidate(field, isValid) {
            // 处理验证结果
            console.log(`${field} 验证结果:`, isValid);
        },
        validateAll() {
            // 实现验证全部字段的逻辑
        },
        resetValidation() {
            // 实现重置验证的逻辑
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
