<template>
    <view class="container">
        <view class="header">
            <view class="title">卡片</view>
            <view class="subtitle"
                >卡片用于展示完整独立的信息，让用户理解他的作用，常作为更复杂和详细信息的入口</view
            >
        </view>

        <!-- 基础卡片 -->
        <view class="section">
            <view class="section-title">基础卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="基础卡片"
                    subtitle="包含标题和内容"
                    desc="这是一个基础卡片示例，展示了卡片的基本用法。卡片常用于展示完整独立的信息，同时让用户理解他的作用。"
                >
                </fanc-card>
            </view>
        </view>

        <!-- 带封面图卡片 -->
        <view class="section">
            <view class="section-title">带封面图卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="风景摄影"
                    subtitle="自然风光"
                    desc="大自然的鬼斧神工创造了令人惊叹的美景，从雄伟的山脉到宁静的湖泊，从茂密的森林到广袤的草原，这些景色不仅让人赏心悦目，还能使人心灵得到净化。"
                    thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
                    thumb-height="200"
                >
                </fanc-card>
            </view>
        </view>

        <!-- 圆角阴影卡片 -->
        <view class="section">
            <view class="section-title">圆角阴影卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="设计灵感"
                    subtitle="现代简约风格"
                    desc="简约不等于简单，现代简约设计风格强调线条简洁、色彩明快，注重空间的实用性和舒适度，同时保持美感和格调。"
                    thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                    thumb-height="180"
                    round
                    shadow
                >
                </fanc-card>
            </view>
        </view>

        <!-- 带标签卡片 -->
        <view class="section">
            <view class="section-title">带标签卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="新品发布"
                    subtitle="限时优惠"
                    desc="全新智能手表，支持心率监测、睡眠分析、运动追踪等多种功能，续航能力长达14天，防水深度达50米。"
                    thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                    tag="新品"
                    tag-type="danger"
                >
                </fanc-card>
            </view>
        </view>

        <!-- 商品卡片 -->
        <view class="section">
            <view class="section-title">商品卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="智能手表 Pro"
                    subtitle="运动健康新选择"
                    desc="支持心率监测、睡眠分析、运动追踪等多种功能"
                    thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                    price="1299"
                    origin-price="1499"
                    tag="新品"
                >
                </fanc-card>
            </view>
        </view>

        <!-- 文章卡片 -->
        <view class="section">
            <view class="section-title">文章卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="前端技术的未来趋势"
                    subtitle="Web开发的新方向"
                    desc="随着技术的不断发展，前端开发已经从简单的页面制作演变成为复杂的应用开发。WebAssembly、PWA、微前端等技术的兴起正在改变我们构建Web应用的方式。本文将探讨这些趋势如何影响前端开发的未来，以及开发者需要掌握哪些技能才能在未来的技术浪潮中保持竞争力。"
                    thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
                    show-footer
                    avatar="https://img01.yzcdn.cn/vant/cat.jpeg"
                    author="技术先锋"
                    time="2小时前"
                    show-actions
                    like-count="328"
                    comment-count="46"
                >
                </fanc-card>
            </view>
        </view>

        <!-- 自定义内容卡片 -->
        <view class="section">
            <view class="section-title">自定义内容卡片</view>
            <view class="card-wrap">
                <fanc-card title="自定义内容示例">
                    <view class="custom-content">
                        <view class="custom-item">
                            <fanc-icon name="user" size="24" color="#4a6cf7"></fanc-icon>
                            <text class="custom-text">用户总数: 12,354</text>
                        </view>
                        <view class="custom-item">
                            <fanc-icon name="chart-line" size="24" color="#28a745"></fanc-icon>
                            <text class="custom-text">日活跃度: 89%</text>
                        </view>
                        <view class="custom-item">
                            <fanc-icon name="dollar-sign" size="24" color="#dc3545"></fanc-icon>
                            <text class="custom-text">总收入: ¥45,675</text>
                        </view>
                    </view>
                    <template #footer>
                        <view class="custom-footer">
                            <fanc-button size="small" type="primary">查看详情</fanc-button>
                        </view>
                    </template>
                </fanc-card>
            </view>
        </view>

        <!-- 网格布局卡片 -->
        <view class="section">
            <view class="section-title">网格布局卡片</view>
            <view class="card-wrap">
                <fanc-card title="热门分类">
                    <view class="grid-content">
                        <view class="grid-item" v-for="(item, index) in gridItems" :key="index">
                            <fanc-icon :name="item.icon" size="28" color="#4a6cf7"></fanc-icon>
                            <text class="grid-text">{{ item.text }}</text>
                        </view>
                    </view>
                </fanc-card>
            </view>
        </view>

        <!-- 可点击卡片 -->
        <view class="section">
            <view class="section-title">可点击卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="点击查看详情"
                    subtitle="点击卡片进入详情页"
                    desc="这是一个可点击的卡片示例，点击后将跳转到指定页面。"
                    thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
                    clickable
                    @click="handleCardClick"
                >
                </fanc-card>
            </view>
        </view>

        <!-- 自定义样式卡片 -->
        <view class="section">
            <view class="section-title">自定义样式卡片</view>
            <view class="card-wrap">
                <fanc-card
                    title="个性化卡片"
                    subtitle="自定义背景色和文字颜色"
                    desc="这是一个使用自定义样式的卡片示例，展示了如何通过属性修改卡片的背景色和文字颜色。"
                    background-color="#4a6cf7"
                    color="#ffffff"
                    title-color="#ffffff"
                    shadow
                >
                </fanc-card>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            gridItems: [
                { icon: "image", text: "照片" },
                { icon: "video", text: "视频" },
                { icon: "music", text: "音乐" },
                { icon: "book", text: "文档" },
                { icon: "download", text: "下载" },
                { icon: "star", text: "收藏" },
            ],
        };
    },
    methods: {
        handleCardClick() {
            this.$toast.text("点击了卡片");
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

.card-wrap {
    padding: 16px;
}

.custom-content {
    padding: 16px 0;
}

.custom-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.custom-text {
    margin-left: 12px;
    font-size: 14px;
    color: #323233;
}

.custom-footer {
    display: flex;
    justify-content: flex-end;
}

.grid-content {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 0;
}

.grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33.33%;
    padding: 16px 0;
}

.grid-text {
    margin-top: 8px;
    font-size: 14px;
    color: #323233;
}
</style>
