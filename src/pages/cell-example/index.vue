<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">单元格组件</text>
            <text class="example-page__header-desc"
                >单元格为列表中的单个项目，可以包含标题、内容、图标等</text
            >
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc"
                >单元格可以单独使用，也可以与单元格组搭配使用</view
            >
            <fanc-cell title="单元格" content="内容" />
            <fanc-cell title="单元格" content="内容" description="描述信息" />
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">单元格组</view>
            <view class="example-page__section-desc">单元格组可以为单元格提供上下外边框</view>
            <fanc-cell-group title="单元格组">
                <fanc-cell title="单元格" content="内容" />
                <fanc-cell title="单元格" content="内容" />
            </fanc-cell-group>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">圆角卡片</view>
            <view class="example-page__section-desc"
                >设置 inset 属性后，单元格组会以圆角卡片的形式展示</view
            >
            <fanc-cell-group inset>
                <fanc-cell title="单元格" content="内容" />
                <fanc-cell title="单元格" content="内容" />
            </fanc-cell-group>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">使用图标</view>
            <view class="example-page__section-desc"
                >通过 icon 属性或 icon 插槽在单元格左侧展示图标</view
            >
            <fanc-cell title="单元格" content="内容" icon="home" />
            <fanc-cell title="单元格">
                <template #icon>
                    <fanc-icon name="user" style="color: #1989fa; margin-right: 4px" size="16" />
                </template>
            </fanc-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">展示箭头</view>
            <view class="example-page__section-desc"
                >设置 is-link 属性后，单元格右侧会显示箭头，并且可以设置箭头方向</view
            >
            <fanc-cell title="单元格" is-link />
            <fanc-cell title="单元格" is-link content="内容" />
            <fanc-cell title="单元格" is-link arrow-direction="down" content="内容" />
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">页面导航</view>
            <view class="example-page__section-desc">可以通过 url 或 to 属性进行页面跳转</view>
            <fanc-cell title="URL 跳转" is-link url="/pages/index/index" />
            <fanc-cell title="路由跳转" is-link to="/pages/index/index" />
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">使用插槽</view>
            <view class="example-page__section-desc">通过插槽可以自定义单元格的各个部分</view>
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

        <view class="example-page__section">
            <view class="example-page__section-title">垂直居中</view>
            <view class="example-page__section-desc">通过 center 属性可以使单元格垂直居中对齐</view>
            <fanc-cell title="单元格" content="内容" description="描述信息" center />
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">大号单元格</view>
            <view class="example-page__section-desc">通过 large 属性可以增大单元格高度</view>
            <fanc-cell title="单元格" content="内容" large />
        </view>
    </view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.custom-value {
    color: #1989fa;
    font-weight: 500;
}

.custom-title {
    color: #f44336;
    font-weight: bold;
}

.custom-description {
    color: #4caf50;
    font-size: 12px;
}

.custom-icon {
    color: #ff9800;
}
</style>
