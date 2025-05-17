<template>
    <view class="container">
        <view class="header">
            <view class="title">表单组件示例</view>
            <view class="desc">Form 表单组件用于数据录入、校验和提交，支持各种表单项</view>
        </view>

        <view class="example-list">
            <view class="example-item" @click="navigateTo('/pages/form-example/basic')">
                <view class="item-title">基础表单</view>
                <view class="item-desc">展示基础表单的使用，包含验证和提交功能</view>
                <fanc-icon name="angle-right" color="#bbb" size="18"></fanc-icon>
            </view>

            <view class="example-item" @click="navigateTo('/pages/form-example/layout')">
                <view class="item-title">表单布局</view>
                <view class="item-desc">展示不同的表单布局方式（左侧标签和顶部标签）</view>
                <fanc-icon name="angle-right" color="#bbb" size="18"></fanc-icon>
            </view>

            <view class="example-item" @click="navigateTo('/pages/form-example/validation')">
                <view class="item-title">表单验证</view>
                <view class="item-desc">展示表单验证功能，包括必填、正则、自定义验证等</view>
                <fanc-icon name="angle-right" color="#bbb" size="18"></fanc-icon>
            </view>

            <view class="example-item" @click="navigateTo('/pages/form-example/advanced')">
                <view class="item-title">高级表单示例</view>
                <view class="item-desc">展示复杂的表单布局和组合使用方式</view>
                <fanc-icon name="angle-right" color="#bbb" size="18"></fanc-icon>
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
        navigateTo(url) {
            uni.navigateTo({
                url: url,
            });
        },
    },
};
</script>

<style lang="scss">
.container {
    padding: 20rpx;
}

.header {
    padding: 30rpx 0;
    .title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
    }
    .desc {
        font-size: 28rpx;
        color: #666;
    }
}

.example-list {
    margin-top: 20rpx;

    .example-item {
        padding: 30rpx;
        background-color: #fff;
        border-radius: 12rpx;
        margin-bottom: 20rpx;
        display: flex;
        position: relative;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

        .item-title {
            font-size: 30rpx;
            font-weight: bold;
            margin-bottom: 6rpx;
        }

        .item-desc {
            font-size: 26rpx;
            color: #999;
            flex: 1;
            padding-right: 50rpx;
        }

        .fanc-icon {
            position: absolute;
            right: 30rpx;
            top: 50%;
            transform: translateY(-50%);
        }

        &:active {
            background-color: #f9f9f9;
        }
    }
}
</style>
