<template>
    <view class="container">
        <view class="header">
            <view class="title">折叠面板</view>
            <view class="subtitle">可折叠/展开的内容区域，用于分组显示大量内容</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-collapse v-model="activeNames1">
                <fanc-collapse-item title="标题1" name="1">
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题2" name="2">
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题3" name="3">
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
            </fanc-collapse>
        </view>

        <!-- 手风琴模式 -->
        <view class="section">
            <view class="section-title">手风琴模式</view>
            <fanc-collapse v-model="activeName" accordion>
                <fanc-collapse-item title="标题1" name="1">
                    手风琴模式下，每次只能展开一个面板。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题2" name="2">
                    手风琴模式下，每次只能展开一个面板。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题3" name="3">
                    手风琴模式下，每次只能展开一个面板。
                </fanc-collapse-item>
            </fanc-collapse>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <fanc-collapse v-model="activeNames2">
                <fanc-collapse-item title="标题1" name="1">
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题2" name="2" disabled>
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题3" name="3">
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
            </fanc-collapse>
        </view>

        <!-- 自定义标题内容 -->
        <view class="section">
            <view class="section-title">自定义标题内容</view>
            <fanc-collapse v-model="activeNames3">
                <fanc-collapse-item name="1">
                    <template #title>
                        <view class="custom-title">
                            <fanc-icon name="star" color="#007bff" size="16"></fanc-icon>
                            <text style="margin-left: 8px">自定义标题</text>
                        </view>
                    </template>
                    这是一段自定义标题的内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="标题2" name="2" value="内容提示">
                    这是一段内容，这是一段内容，这是一段内容，这是一段内容。
                </fanc-collapse-item>
            </fanc-collapse>
        </view>

        <!-- 带图标的折叠面板 -->
        <view class="section">
            <view class="section-title">带图标的折叠面板</view>
            <fanc-collapse v-model="activeNames4">
                <fanc-collapse-item title="个人信息" name="1" left-icon="user">
                    这里是个人信息的相关内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="安全设置" name="2" left-icon="shield-alt">
                    这里是安全设置的相关内容。
                </fanc-collapse-item>
                <fanc-collapse-item title="支付管理" name="3" left-icon="credit-card">
                    这里是支付管理的相关内容。
                </fanc-collapse-item>
            </fanc-collapse>
        </view>

        <!-- 自定义内容区域 -->
        <view class="section">
            <view class="section-title">自定义内容区域</view>
            <fanc-collapse v-model="activeNames5">
                <fanc-collapse-item title="产品详情" name="1">
                    <view class="custom-content">
                        <view class="content-item">
                            <view class="content-label">商品名称</view>
                            <view class="content-value">Fantastic UI 组件库</view>
                        </view>
                        <view class="content-item">
                            <view class="content-label">价格</view>
                            <view class="content-value">免费开源</view>
                        </view>
                        <view class="content-item">
                            <view class="content-label">发布日期</view>
                            <view class="content-value">2023-05-01</view>
                        </view>
                        <view class="content-item">
                            <fanc-button size="small" type="primary">查看更多</fanc-button>
                        </view>
                    </view>
                </fanc-collapse-item>
            </fanc-collapse>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            activeNames1: ["1"],
            activeName: "1",
            activeNames2: ["1"],
            activeNames3: [],
            activeNames4: ["1"],
            activeNames5: ["1"],
        };
    },
    methods: {
        onChange(val) {
            console.log("当前展开的面板", val);
        },
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

.custom-title {
    display: flex;
    align-items: center;
}

.custom-content {
    padding: 8px 0;
}

.content-item {
    margin-bottom: 12px;
}

.content-label {
    font-size: 14px;
    color: #969799;
    margin-bottom: 4px;
}

.content-value {
    font-size: 14px;
    color: #323233;
}
</style>
