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
                    <fanc-icon name="user" />
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
                <template #label>
                    <view class="custom-label">自定义描述信息</view>
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
import FancCell from "@/components/fanc-cell";
import FancCellGroup from "@/components/fanc-cell-group";
import FancIcon from "@/components/fanc-icon";

export default {
    components: {
        FancCell,
        FancCellGroup,
        FancIcon,
    },
};
</script>

<style lang="scss">
.cell-demo {
    padding-bottom: 20px;
    background-color: #f7f8fa;

    .demo-section {
        margin-bottom: 20px;
        padding: 15px 0;
    }

    .demo-title {
        margin: 0;
        padding: 16px 16px 8px;
        color: #969799;
        font-size: 14px;
        line-height: 16px;
    }

    .custom-value {
        color: #1989fa;
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
