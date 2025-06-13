<template>
    <view class="container">
        <view class="header">
            <view class="title">单元格</view>
            <view class="subtitle">单元格为列表中的单个项目，可以包含标题、内容、图标等</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell title="姓名" content="张三" />
            <fanc-cell title="手机号码" content="+86 13800138000" description="联系方式信息" />
        </view>

        <view class="section">
            <view class="section-title">单元格组</view>
            <fanc-cell-group title="个人信息">
                <fanc-cell title="姓名" content="李四" />
                <fanc-cell title="年龄" content="28岁" />
            </fanc-cell-group>
        </view>

        <view class="section" style="background-color: #f7f7f7">
            <view class="section-title">圆角卡片</view>
            <fanc-cell-group inset>
                <fanc-cell title="收货地址" content="广东省深圳市南山区科技园" />
                <fanc-cell title="联系电话" content="0755-88888888" />
            </fanc-cell-group>
        </view>

        <view class="section">
            <view class="section-title">使用图标</view>
            <fanc-cell title="我的主页" content="个人信息与账户设置" icon="home" />
            <fanc-cell title="个人中心">
                <template #left>
                    <view style="display: flex; align-items: center">
                        <view class="fanc-cell__icon" style="margin-right: 6px">
                            <fanc-icon name="user" style="color: #1989fa" size="16" />
                        </view>
                        <view class="fanc-cell__title">
                            <text>个人中心</text>
                        </view>
                    </view>
                </template>
                <template #default>
                    <text>查看与编辑资料</text>
                </template>
            </fanc-cell>
        </view>

        <view class="section">
            <view class="section-title">展示箭头</view>
            <fanc-cell title="设置" is-link />
            <fanc-cell title="我的订单" is-link content="查看全部订单" />
            <fanc-cell title="地址管理" is-link arrow-direction="down" content="管理收货地址" />
        </view>

        <view class="section">
            <view class="section-title">页面导航</view>
            <fanc-cell title="常见问题" is-link content="查看解答" url="/pages/index/index" />
            <fanc-cell title="系统设置" is-link content="偏好配置" to="/pages/index/index" />
        </view>

        <view class="section">
            <view class="section-title">使用插槽</view>
            <fanc-cell title="会员等级">
                <template #default>
                    <view class="custom-value">黄金会员</view>
                </template>
            </fanc-cell>
            <fanc-cell>
                <template #title>
                    <view class="custom-title">积分兑换</view>
                </template>
                <template #default>
                    <text>当前积分: 1280</text>
                </template>
            </fanc-cell>
            <fanc-cell title="消息通知">
                <template #description>
                    <view class="custom-description">接收重要消息和活动提醒</view>
                </template>
                <template #default>
                    <text>已开启</text>
                </template>
            </fanc-cell>
            <fanc-cell title="系统设置" is-link content="偏好配置">
                <template #right-icon>
                    <fanc-icon name="settings" class="custom-icon" />
                </template>
            </fanc-cell>
        </view>

        <view class="section">
            <view class="section-title">垂直居中</view>
            <fanc-cell title="配送方式" content="快递 免邮" description="部分地区不支持" center />
        </view>

        <view class="section">
            <view class="section-title">大号单元格</view>
            <fanc-cell title="活动详情" content="618年中大促销活动，全场5折起" large />
        </view>
    </view>
</template>

<script>
export default {};
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
