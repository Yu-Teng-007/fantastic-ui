<template>
    <view class="container">
        <view class="header">
            <view class="title">选项卡</view>
            <view class="subtitle">选项卡组件，用于内容分类后的展示切换</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-tabs :tabs="basicTabs" @change="onChange" @click="onClick">
                <view class="content-item">
                    <view class="content-block" v-if="activeTab === 0">标签 1 内容</view>
                    <view class="content-block" v-if="activeTab === 1">标签 2 内容</view>
                    <view class="content-block" v-if="activeTab === 2">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 通过标签名称匹配 -->
        <view class="section">
            <view class="section-title">通过标签名称匹配</view>
            <fanc-tabs :tabs="matchTabs" :active="1" @change="onNameChange">
                <view class="content-item">
                    <view class="content-block" v-if="activeNameTab === 0">标签 A 内容</view>
                    <view class="content-block" v-if="activeNameTab === 1">标签 B 内容</view>
                    <view class="content-block" v-if="activeNameTab === 2">标签 C 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 卡片样式 -->
        <view class="section">
            <view class="section-title">卡片样式</view>
            <fanc-tabs type="card" :tabs="cardTabs" @change="onCardChange">
                <view class="content-item">
                    <view class="content-block" v-if="activeCardTab === 0">标签 1 内容</view>
                    <view class="content-block" v-if="activeCardTab === 1">标签 2 内容</view>
                    <view class="content-block" v-if="activeCardTab === 2">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 徽标提示 -->
        <view class="section">
            <view class="section-title">徽标提示</view>
            <fanc-tabs :tabs="badgeTabs" @change="onBadgeChange">
                <view class="content-item">
                    <view class="content-block" v-if="activeBadgeTab === 0">标签 1 内容</view>
                    <view class="content-block" v-if="activeBadgeTab === 1">标签 2 内容</view>
                    <view class="content-block" v-if="activeBadgeTab === 2">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 禁用标签 -->
        <view class="section">
            <view class="section-title">禁用标签</view>
            <fanc-tabs :tabs="disabledTabs" @disabled="onDisabled" @change="onDisabledChange">
                <view class="content-item">
                    <view class="content-block" v-if="activeDisabledTab === 0">标签 1 内容</view>
                    <view class="content-block" v-if="activeDisabledTab === 1">标签 2 内容</view>
                    <view class="content-block" v-if="activeDisabledTab === 2">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <fanc-tabs
                :tabs="customTabs"
                active-color="#ee0a24"
                inactive-color="#646566"
                line-width="30px"
                line-height="4px"
                @change="onCustomChange"
            >
                <view class="content-item">
                    <view class="content-block" v-if="activeCustomTab === 0">标签 1 内容</view>
                    <view class="content-block" v-if="activeCustomTab === 1">标签 2 内容</view>
                    <view class="content-block" v-if="activeCustomTab === 2">标签 3 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 滚动标签 -->
        <view class="section">
            <view class="section-title">滚动标签</view>
            <view class="section-description">点击标签会自动将其滚动到居中位置</view>
            <fanc-tabs :tabs="scrollTabs" scrollable :active="2" @change="onScrollChange">
                <view class="content-item">
                    <view class="content-block" v-if="activeScrollTab === 0">标签 1 内容</view>
                    <view class="content-block" v-if="activeScrollTab === 1">标签 2 内容</view>
                    <view class="content-block" v-if="activeScrollTab === 2"
                        >标签 3 内容 (默认选中，居中显示)</view
                    >
                    <view class="content-block" v-if="activeScrollTab === 3">标签 4 内容</view>
                    <view class="content-block" v-if="activeScrollTab === 4">标签 5 内容</view>
                    <view class="content-block" v-if="activeScrollTab === 5">标签 6 内容</view>
                    <view class="content-block" v-if="activeScrollTab === 6">标签 7 内容</view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 粘性布局 -->
        <view class="section">
            <view class="section-title">粘性布局</view>
            <view class="section-description">滚动页面时，标签栏会固定在顶部</view>
            <fanc-tabs
                :tabs="basicTabs"
                sticky
                @change="onStickyChange"
                @init-sticky="initStickyScroll"
            >
                <view class="content-item">
                    <view class="content-block content-block-sticky" v-if="activeStickyTab === 0">
                        <view class="sticky-title">标签 1 内容</view>
                        <view class="sticky-instruction">向下滚动页面，标签栏会固定在顶部</view>
                        <view class="sticky-placeholder">
                            <view>滚动区域</view>
                            <view>继续向下滚动查看效果</view>
                        </view>
                        <view class="sticky-instruction">滚动回顶部，标签栏会恢复原位</view>
                        <view class="sticky-placeholder">
                            <view>再次滚动区域</view>
                        </view>
                    </view>
                    <view class="content-block content-block-sticky" v-if="activeStickyTab === 1">
                        <view class="sticky-title">标签 2 内容</view>
                        <view class="sticky-instruction">向下滚动页面，标签栏会固定在顶部</view>
                        <view class="sticky-placeholder">
                            <view>滚动区域</view>
                            <view>继续向下滚动查看效果</view>
                        </view>
                        <view class="sticky-instruction">滚动回顶部，标签栏会恢复原位</view>
                        <view class="sticky-placeholder">
                            <view>再次滚动区域</view>
                        </view>
                    </view>
                    <view class="content-block content-block-sticky" v-if="activeStickyTab === 2">
                        <view class="sticky-title">标签 3 内容</view>
                        <view class="sticky-instruction">向下滚动页面，标签栏会固定在顶部</view>
                        <view class="sticky-placeholder">
                            <view>滚动区域</view>
                            <view>继续向下滚动查看效果</view>
                        </view>
                        <view class="sticky-instruction">滚动回顶部，标签栏会恢复原位</view>
                        <view class="sticky-placeholder">
                            <view>再次滚动区域</view>
                        </view>
                    </view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 滑动切换 -->
        <view class="section">
            <view class="section-title">滑动切换</view>
            <view class="section-description">左右滑动内容区域可以切换标签</view>
            <fanc-tabs :tabs="basicTabs" swipeable @change="onSwipeChange">
                <view class="content-item">
                    <view class="content-block" v-if="activeSwipeTab === 0">
                        <view>标签 1 内容</view>
                        <view class="content-tip">← 向右滑动切换到标签 3</view>
                    </view>
                    <view class="content-block" v-if="activeSwipeTab === 1">
                        <view>标签 2 内容</view>
                        <view class="content-tip">← 向左/右滑动切换标签 →</view>
                    </view>
                    <view class="content-block" v-if="activeSwipeTab === 2">
                        <view>标签 3 内容</view>
                        <view class="content-tip">向左滑动切换到标签 1 →</view>
                    </view>
                </view>
            </fanc-tabs>
        </view>

        <!-- 禁用动画效果 -->
        <view class="section">
            <view class="section-title">禁用动画效果</view>
            <view class="section-description">切换标签时没有过渡动画</view>
            <fanc-tabs
                :tabs="basicTabs"
                :animated="false"
                content-height="200px"
                @change="onNoAnimChange"
            >
                <template v-slot:0>
                    <view class="content-block content-block-anim">
                        <view class="anim-title">标签 1 内容</view>
                        <view class="anim-subtitle">无动画切换效果</view>
                        <view class="anim-box anim-box-1"></view>
                    </view>
                </template>
                <template v-slot:1>
                    <view class="content-block content-block-anim">
                        <view class="anim-title">标签 2 内容</view>
                        <view class="anim-subtitle">无动画切换效果</view>
                        <view class="anim-box anim-box-2"></view>
                    </view>
                </template>
                <template v-slot:2>
                    <view class="content-block content-block-anim">
                        <view class="anim-title">标签 3 内容</view>
                        <view class="anim-subtitle">无动画切换效果</view>
                        <view class="anim-box anim-box-3"></view>
                    </view>
                </template>
            </fanc-tabs>
        </view>

        <!-- 自定义动画时长 -->
        <view class="section">
            <view class="section-title">自定义动画时长</view>
            <view class="section-description">设置较慢的动画速度 (0.8秒)</view>
            <fanc-tabs
                :tabs="basicTabs"
                :duration="0.8"
                content-height="200px"
                @change="onDurationChange"
            >
                <template v-slot:0>
                    <view class="content-block content-block-anim">
                        <view class="anim-title">标签 1 内容</view>
                        <view class="anim-subtitle">慢速动画效果 (0.8秒)</view>
                        <view class="anim-box anim-box-1"></view>
                    </view>
                </template>
                <template v-slot:1>
                    <view class="content-block content-block-anim">
                        <view class="anim-title">标签 2 内容</view>
                        <view class="anim-subtitle">慢速动画效果 (0.8秒)</view>
                        <view class="anim-box anim-box-2"></view>
                    </view>
                </template>
                <template v-slot:2>
                    <view class="content-block content-block-anim">
                        <view class="anim-title">标签 3 内容</view>
                        <view class="anim-subtitle">慢速动画效果 (0.8秒)</view>
                        <view class="anim-box anim-box-3"></view>
                    </view>
                </template>
            </fanc-tabs>
        </view>

        <!-- 自适应高度 -->
        <view class="section">
            <view class="section-title">自适应高度</view>
            <view class="section-description">设置不同高度的内容区域</view>
            <fanc-tabs :tabs="heightTabs" content-height="auto" @change="onHeightChange">
                <template v-slot:0>
                    <view class="content-block content-block-small">
                        <view>较小内容区域</view>
                        <view>高度自适应内容</view>
                    </view>
                </template>
                <template v-slot:1>
                    <view class="content-block content-block-medium">
                        <view>中等内容区域</view>
                        <view>高度自适应内容</view>
                        <view class="height-spacer"></view>
                    </view>
                </template>
                <template v-slot:2>
                    <view class="content-block content-block-large">
                        <view>较大内容区域</view>
                        <view>高度自适应内容</view>
                        <view class="height-spacer"></view>
                        <view class="height-spacer"></view>
                    </view>
                </template>
            </fanc-tabs>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础标签数据
            basicTabs: [{ title: "标签 1" }, { title: "标签 2" }, { title: "标签 3" }],
            activeTab: 0,

            // 名称匹配标签数据
            matchTabs: [{ title: "标签 A" }, { title: "标签 B" }, { title: "标签 C" }],
            activeNameTab: 1,

            // 卡片样式标签数据
            cardTabs: [{ title: "标签 1" }, { title: "标签 2" }, { title: "标签 3" }],
            activeCardTab: 0,

            // 徽标提示标签数据
            badgeTabs: [
                { title: "标签 1", badge: "5" },
                { title: "标签 2", badge: "10" },
                { title: "标签 3", dot: true },
            ],
            activeBadgeTab: 0,

            // 禁用标签数据
            disabledTabs: [
                { title: "标签 1" },
                { title: "标签 2", disabled: true },
                { title: "标签 3" },
            ],
            activeDisabledTab: 0,

            // 自定义样式标签数据
            customTabs: [{ title: "标签 1" }, { title: "标签 2" }, { title: "标签 3" }],
            activeCustomTab: 0,

            // 滚动标签数据
            scrollTabs: [
                { title: "标签 1" },
                { title: "标签 2" },
                { title: "标签 3" },
                { title: "标签 4" },
                { title: "标签 5" },
                { title: "标签 6" },
                { title: "标签 7" },
            ],
            activeScrollTab: 2,

            // 粘性布局标签数据
            activeStickyTab: 0,

            // 滑动切换标签数据
            activeSwipeTab: 0,

            // 禁用动画标签数据
            activeNoAnimTab: 0,

            // 自定义动画时长标签数据
            activeDurationTab: 0,

            // 高度自适应标签数据
            heightTabs: [{ title: "小高度" }, { title: "中高度" }, { title: "大高度" }],
            activeHeightTab: 0,

            // 粘性布局相关
            stickyComponentId: null,
        };
    },
    onPageScroll({ scrollTop }) {
        // 向粘性标签组件广播滚动事件
        if (this.stickyComponentId) {
            uni.$emit("page-scroll", scrollTop);
        }
    },
    methods: {
        // 基础标签切换事件
        onChange(event) {
            console.log("🚀 ~ onChange ~ event:", event);
            this.activeTab = event.index;
        },

        // 点击标签事件
        onClick(event) {
            console.log("点击标签", event);
        },

        // 名称匹配标签切换事件
        onNameChange(event) {
            this.activeNameTab = event.index;
        },

        // 卡片样式标签切换事件
        onCardChange(event) {
            this.activeCardTab = event.index;
        },

        // 徽标提示标签切换事件
        onBadgeChange(event) {
            this.activeBadgeTab = event.index;
        },

        // 禁用标签点击事件
        onDisabled(event) {
            this.$toast.warning("该标签已被禁用");
        },

        // 禁用标签切换事件
        onDisabledChange(event) {
            this.activeDisabledTab = event.index;
        },

        // 自定义样式标签切换事件
        onCustomChange(event) {
            this.activeCustomTab = event.index;
        },

        // 滚动标签切换事件
        onScrollChange(event) {
            this.activeScrollTab = event.index;
        },

        // 粘性布局标签切换事件
        onStickyChange(event) {
            this.activeStickyTab = event.index;
        },

        // 滑动切换标签切换事件
        onSwipeChange(event) {
            this.activeSwipeTab = event.index;
        },

        // 禁用动画标签切换事件
        onNoAnimChange(event) {
            this.activeNoAnimTab = event.index;
        },

        // 自定义动画时长标签切换事件
        onDurationChange(event) {
            this.activeDurationTab = event.index;
        },

        // 高度自适应标签切换事件
        onHeightChange(event) {
            this.activeHeightTab = event.index;
        },

        // 初始化粘性滚动
        initStickyScroll(event) {
            this.stickyComponentId = event.componentId;
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

.section-description {
    font-size: 14px;
    color: #969799;
    padding: 0 16px 8px;
    border-bottom: 1px solid #f2f2f2;
}

.content-item {
    padding: 16px;
}

.content-block {
    padding: 16px;
    background-color: #f7f8fa;
    border-radius: 4px;
    text-align: center;
    color: #646566;
}

.content-block-large {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content-tip {
    margin-top: 10px;
    font-size: 12px;
    color: #969799;
}

.content-block-sticky {
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 30px;
}

.sticky-title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 15px;
}

.sticky-instruction {
    font-size: 14px;
    color: #969799;
    margin: 15px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    width: 100%;
    text-align: center;
}

.sticky-placeholder {
    height: 300px;
    width: 100%;
    background: linear-gradient(to bottom, #e8f4fc, #c9e6f9);
    margin: 10px 0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #007bff;
    font-weight: bold;
}

.content-block-anim {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.anim-title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.anim-subtitle {
    font-size: 14px;
    color: #969799;
    margin-bottom: 20px;
}

.anim-box {
    width: 100px;
    height: 100px;
    border-radius: 8px;
}

.anim-box-1 {
    background: linear-gradient(135deg, #007bff, #00d2ff);
}

.anim-box-2 {
    background: linear-gradient(135deg, #ff9500, #ff5e3a);
}

.anim-box-3 {
    background: linear-gradient(135deg, #28c76f, #81fbb8);
}

.content-block-small {
    padding: 20px;
    background-color: #f7f8fa;
    border-radius: 4px;
    text-align: center;
    color: #646566;
}

.content-block-medium {
    padding: 20px;
    background-color: #f7f8fa;
    border-radius: 4px;
    text-align: center;
    color: #646566;
}

.content-block-large {
    padding: 20px;
    background-color: #f7f8fa;
    border-radius: 4px;
    text-align: center;
    color: #646566;
}

.height-spacer {
    height: 100px;
    margin: 10px 0;
    background-color: rgba(0, 123, 255, 0.1);
    border-radius: 4px;
}
</style>
