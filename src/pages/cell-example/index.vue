<template>
    <view class="cell-demo">
        <view class="demo-section">
            <view class="demo-title">基础用法</view>
            <fanc-cell title="单元格" content="内容" />
            <fanc-cell title="单元格" content="内容" description="描述信息" />
        </view>

        <view class="demo-section">
            <fanc-cell-group title="单元格组">
                <fanc-cell title="单元格" content="内容" />
                <fanc-cell title="单元格" content="内容" />
            </fanc-cell-group>
        </view>

        <view class="demo-section">
            <view class="demo-title">圆角卡片</view>
            <fanc-cell-group inset>
                <fanc-cell title="单元格" content="内容" />
                <fanc-cell title="单元格" content="内容" />
            </fanc-cell-group>
        </view>

        <view class="demo-section">
            <view class="demo-title">使用图标</view>
            <fanc-cell title="单元格" content="内容" icon="home" />
            <fanc-cell title="单元格">
                <template #icon>
                    <fanc-icon name="user" style="color: #1989fa; margin-right: 4px" size="16" />
                </template>
            </fanc-cell>
        </view>

        <view class="demo-section">
            <view class="demo-title">展示箭头</view>
            <fanc-cell title="单元格" is-link />
            <fanc-cell title="单元格" is-link content="内容" />
            <fanc-cell title="单元格" is-link arrow-direction="down" content="内容" />
        </view>

        <view class="demo-section">
            <view class="demo-title">页面导航</view>
            <fanc-cell title="URL 跳转" is-link url="/pages/index/index" />
            <fanc-cell title="路由跳转" is-link to="/pages/index/index" />
        </view>

        <view class="demo-section">
            <view class="demo-title">使用插槽</view>
            <fanc-cell title="单元格">
                <template #default>
                    <view class="custom-value">自定义内容</view>
                </template>
            </fanc-cell>
            <fanc-cell>
                <template #title>
                    <view class="custom-title">自定义标题</view>
                </template>
            </fanc-cell>
            <fanc-cell title="单元格">
                <template #description>
                    <view class="custom-description">自定义描述信息</view>
                </template>
            </fanc-cell>
            <fanc-cell title="单元格" is-link>
                <template #right-icon>
                    <fanc-icon name="settings" class="custom-icon" />
                </template>
            </fanc-cell>
        </view>

        <view class="demo-section">
            <view class="demo-title">垂直居中</view>
            <fanc-cell title="单元格" content="内容" description="描述信息" center />
        </view>

        <view class="demo-section">
            <view class="demo-title">大号单元格</view>
            <fanc-cell title="单元格" content="内容" large />
        </view>
    </view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.cell-demo {
    padding: 16px;
    background-color: #f7f8fa;
    min-height: 100vh;

    .demo-section {
        margin-bottom: 24px;
        padding: 0;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    }

    .demo-title {
        margin: 0;
        padding: 16px;
        color: #323233;
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 1.4;
        position: relative;
        padding-left: 28px;

        &::before {
            content: "";
            position: absolute;
            left: 16px;
            top: 18px;
            height: 16px;
            width: 4px;
            background-color: #007bff;
            border-radius: 2px;
        }
    }

    .custom-value {
        color: #1989fa;
        font-weight: 500;
    }

    .custom-title {
        color: #f44336;
        font-weight: bold;
    }

    .custom-label {
        color: #4caf50;
    }

    .custom-icon {
        color: #ff9800;
    }
}
</style>
