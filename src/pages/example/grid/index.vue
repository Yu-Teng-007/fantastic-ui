<template>
    <view class="container">
        <view class="header">
            <view class="title">宫格</view>
            <view class="subtitle"
                >宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航</view
            >
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-grid>
                <fanc-grid-item
                    v-for="(item, index) in 8"
                    :key="index"
                    :icon="defaultIcons[index]"
                    :text="'文本 ' + (index + 1)"
                />
            </fanc-grid>
        </view>

        <!-- 自定义列数 -->
        <view class="section">
            <view class="section-title">自定义列数</view>
            <fanc-grid :column-num="3">
                <fanc-grid-item
                    v-for="(item, index) in 6"
                    :key="index"
                    :icon="defaultIcons[index]"
                    :text="'文本 ' + (index + 1)"
                />
            </fanc-grid>
        </view>

        <!-- 正方形格子 -->
        <view class="section">
            <view class="section-title">正方形格子</view>
            <fanc-grid :column-num="4" square>
                <fanc-grid-item
                    v-for="(item, index) in 8"
                    :key="index"
                    :icon="defaultIcons[index]"
                    :text="'文本 ' + (index + 1)"
                />
            </fanc-grid>
        </view>

        <!-- 格子间距 -->
        <view class="section">
            <view class="section-title">格子间距</view>
            <fanc-grid :gutter="10">
                <fanc-grid-item
                    v-for="(item, index) in 8"
                    :key="index"
                    :icon="defaultIcons[index]"
                    :text="'文本 ' + (index + 1)"
                />
            </fanc-grid>
        </view>

        <!-- 内容横排 -->
        <view class="section">
            <view class="section-title">内容横排</view>
            <fanc-grid direction="horizontal" :column-num="3">
                <fanc-grid-item
                    v-for="(item, index) in 6"
                    :key="index"
                    :icon="defaultIcons[index]"
                    :text="'文本 ' + (index + 1)"
                />
            </fanc-grid>
        </view>

        <!-- 徽标提示 -->
        <view class="section">
            <view class="section-title">徽标提示</view>
            <fanc-grid :column-num="2">
                <fanc-grid-item icon="bell" text="徽标文字" badge="5" />
                <fanc-grid-item icon="envelope" text="小红点" dot />
            </fanc-grid>
        </view>

        <!-- 无边框 -->
        <view class="section">
            <view class="section-title">无边框</view>
            <fanc-grid :bordered="false" :column-num="3">
                <fanc-grid-item
                    v-for="(item, index) in 6"
                    :key="index"
                    :icon="defaultIcons[index]"
                    :text="'文本 ' + (index + 1)"
                />
            </fanc-grid>
        </view>

        <!-- 主题色 -->
        <view class="section">
            <view class="section-title">主题色</view>
            <fanc-grid :column-num="5">
                <fanc-grid-item icon="folder" text="默认" />
                <fanc-grid-item icon="folder" text="主要" theme="primary" />
                <fanc-grid-item icon="folder" text="成功" theme="success" />
                <fanc-grid-item icon="folder" text="警告" theme="warning" />
                <fanc-grid-item icon="folder" text="危险" theme="danger" />
            </fanc-grid>
        </view>

        <!-- 自定义内容 -->
        <view class="section">
            <view class="section-title">自定义内容</view>
            <fanc-grid :column-num="3">
                <fanc-grid-item>
                    <template #icon>
                        <image
                            src="https://img.yzcdn.cn/vant/apple-1.jpg"
                            style="width: 36px; height: 36px; border-radius: 4px"
                        />
                    </template>
                    <template #text>
                        <view style="font-size: 14px; color: #323233; margin-top: 8px">
                            自定义图文
                        </view>
                    </template>
                </fanc-grid-item>
                <fanc-grid-item>
                    <view style="text-align: center">
                        <view
                            style="
                                background: #f2f3f5;
                                width: 64px;
                                height: 32px;
                                border-radius: 4px;
                                line-height: 32px;
                            "
                        >
                            自定义
                        </view>
                    </view>
                </fanc-grid-item>
                <fanc-grid-item icon="image" text="图片名称">
                    <template #icon>
                        <image
                            src="https://img.yzcdn.cn/vant/apple-2.jpg"
                            style="width: 36px; height: 36px; border-radius: 4px"
                        />
                    </template>
                </fanc-grid-item>
            </fanc-grid>
        </view>

        <!-- 页面导航 -->
        <view class="section">
            <view class="section-title">页面导航</view>
            <fanc-grid :column-num="2" clickable>
                <fanc-grid-item icon="home" text="首页" url="/pages/home/index" />
                <fanc-grid-item
                    icon="search"
                    text="搜索"
                    :to="{ url: '/pages/example/search/index' }"
                />
            </fanc-grid>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            defaultIcons: [
                "home",
                "search",
                "heart",
                "user",
                "thumbs-up",
                "calendar",
                "image",
                "shopping-cart",
            ],
        };
    },
    methods: {
        handleGridItemClick(index) {
            this.$toast.text(`点击了第 ${index + 1} 个格子`);
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
</style>
