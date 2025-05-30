<template>
    <view class="container">
        <view class="header">
            <view class="title">标签栏</view>
            <view class="subtitle">底部导航栏，用于在不同页面之间进行切换</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell-group>
                <fanc-cell title="基础标签栏" is-link @click="showBasic = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showBasic"
                position="bottom"
                :safe-area-inset-bottom="false"
                @close="onClosePopup('basic')"
            >
                <view class="demo-content">
                    <fanc-tabbar v-model="activeBasic" :items="basicItems" @change="onChangeTab" />
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">自定义颜色</view>
            <fanc-cell-group>
                <fanc-cell title="自定义颜色" is-link @click="showCustomColor = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showCustomColor"
                position="bottom"
                :safe-area-inset-bottom="false"
                @close="onClosePopup('customColor')"
            >
                <view class="demo-content">
                    <fanc-tabbar
                        v-model="activeCustomColor"
                        :items="customColorItems"
                        @change="onChangeTab"
                    />
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">徽标提示</view>
            <fanc-cell-group>
                <fanc-cell title="徽标提示" is-link @click="showBadge = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showBadge"
                position="bottom"
                :safe-area-inset-bottom="false"
                @close="onClosePopup('badge')"
            >
                <view class="demo-content">
                    <fanc-tabbar v-model="activeBadge" :items="badgeItems" @change="onChangeTab" />
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">禁用状态</view>
            <fanc-cell-group>
                <fanc-cell title="禁用状态" is-link @click="showDisabled = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showDisabled"
                position="bottom"
                :safe-area-inset-bottom="false"
                @close="onClosePopup('disabled')"
            >
                <view class="demo-content">
                    <fanc-tabbar
                        v-model="activeDisabled"
                        :items="disabledItems"
                        @change="onChangeTab"
                    />
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">自定义图标尺寸</view>
            <fanc-cell-group>
                <fanc-cell title="自定义图标尺寸" is-link @click="showCustomSize = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showCustomSize"
                position="bottom"
                :safe-area-inset-bottom="false"
                @close="onClosePopup('customSize')"
            >
                <view class="demo-content">
                    <fanc-tabbar
                        v-model="activeCustomSize"
                        :items="basicItems"
                        icon-size="30"
                        @change="onChangeTab"
                    />
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">图片图标</view>
            <fanc-cell-group>
                <fanc-cell title="图片图标" is-link @click="showImage = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showImage"
                position="bottom"
                :safe-area-inset-bottom="false"
                @close="onClosePopup('image')"
            >
                <view class="demo-content">
                    <fanc-tabbar v-model="activeImage" :items="imageItems" @change="onChangeTab" />
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">不固定在底部</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeUnfixed"
                    :items="basicItems"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">该示例将标签栏直接显示在内容中，而不是固定在底部</view>
        </view>

        <view class="section">
            <view class="section-title">全屏应用示例</view>
            <fanc-cell-group>
                <fanc-cell title="全屏应用示例" is-link @click="showFullScreen = true" />
            </fanc-cell-group>
            <fanc-popup
                v-model="showFullScreen"
                custom-style="height: 100%;"
                @close="onClosePopup('fullScreen')"
            >
                <view class="demo-fullscreen">
                    <view class="demo-fullscreen__header">
                        <view class="demo-fullscreen__title">示例应用</view>
                        <view class="demo-fullscreen__close" @click="showFullScreen = false">
                            <fanc-icon name="xmark" size="24"></fanc-icon>
                        </view>
                    </view>
                    <view class="demo-fullscreen__content" v-if="activeFullScreen === 0">
                        <view class="demo-fullscreen__panel">
                            <view class="demo-fullscreen__panel-title">首页</view>
                            <view class="demo-fullscreen__placeholder">
                                <fanc-icon name="home" size="64" color="#e0e0e0"></fanc-icon>
                                <text>这是首页内容区域</text>
                            </view>
                        </view>
                    </view>
                    <view class="demo-fullscreen__content" v-else-if="activeFullScreen === 1">
                        <view class="demo-fullscreen__panel">
                            <view class="demo-fullscreen__panel-title">分类</view>
                            <view class="demo-fullscreen__placeholder">
                                <fanc-icon name="list" size="64" color="#e0e0e0"></fanc-icon>
                                <text>这是分类内容区域</text>
                            </view>
                        </view>
                    </view>
                    <view class="demo-fullscreen__content" v-else-if="activeFullScreen === 2">
                        <view class="demo-fullscreen__panel">
                            <view class="demo-fullscreen__panel-title">消息</view>
                            <view class="demo-fullscreen__placeholder">
                                <fanc-icon name="comment" size="64" color="#e0e0e0"></fanc-icon>
                                <text>这是消息内容区域</text>
                            </view>
                        </view>
                    </view>
                    <view class="demo-fullscreen__content" v-else-if="activeFullScreen === 3">
                        <view class="demo-fullscreen__panel">
                            <view class="demo-fullscreen__panel-title">我的</view>
                            <view class="demo-fullscreen__placeholder">
                                <fanc-icon name="user" size="64" color="#e0e0e0"></fanc-icon>
                                <text>这是我的内容区域</text>
                            </view>
                        </view>
                    </view>
                    <fanc-tabbar
                        v-model="activeFullScreen"
                        :items="fullScreenItems"
                        @change="onChangeTab"
                    />
                </view>
            </fanc-popup>
        </view>
    </view>
</template>

<script>
/**
 * TabBar标签栏示例
 * 展示了TabBar组件的各种使用场景和配置选项
 */
export default {
    data() {
        return {
            // 弹出层控制
            showBasic: false,
            showCustomColor: false,
            showBadge: false,
            showDisabled: false,
            showCustomSize: false,
            showImage: false,
            showFullScreen: false,

            // 激活标签
            activeBasic: 0,
            activeCustomColor: 0,
            activeBadge: 0,
            activeDisabled: 0,
            activeCustomSize: 0,
            activeImage: 0,
            activeUnfixed: 0,
            activeFullScreen: 0,

            // 基础标签项
            basicItems: [
                { text: "首页", icon: "home" },
                { text: "分类", icon: "list" },
                { text: "消息", icon: "comment" },
                { text: "我的", icon: "user" },
            ],

            // 自定义颜色标签项
            customColorItems: [
                { text: "首页", icon: "home", color: "#7d7e80", activeColor: "#1989fa" },
                { text: "分类", icon: "list", color: "#7d7e80", activeColor: "#1989fa" },
                { text: "消息", icon: "comment", color: "#7d7e80", activeColor: "#1989fa" },
                { text: "我的", icon: "user", color: "#7d7e80", activeColor: "#1989fa" },
            ],

            // 徽标提示标签项
            badgeItems: [
                { text: "首页", icon: "home", badge: 3 },
                { text: "分类", icon: "list" },
                { text: "消息", icon: "comment", badge: 12 },
                { text: "我的", icon: "user", badge: true },
            ],

            // 禁用状态标签项
            disabledItems: [
                { text: "首页", icon: "home" },
                { text: "分类", icon: "list" },
                { text: "消息", icon: "comment", disabled: true },
                { text: "我的", icon: "user" },
            ],

            // 图片图标标签项
            imageItems: [
                {
                    text: "首页",
                    image: "/static/img/home.png",
                    activeImage: "/static/img/home-active.png",
                },
                {
                    text: "分类",
                    image: "/static/img/category.png",
                    activeImage: "/static/img/category-active.png",
                },
                {
                    text: "消息",
                    image: "/static/img/message.png",
                    activeImage: "/static/img/message-active.png",
                },
                {
                    text: "我的",
                    image: "/static/img/user.png",
                    activeImage: "/static/img/user-active.png",
                },
            ],

            // 全屏应用示例标签项
            fullScreenItems: [
                { text: "首页", icon: "home", badge: 3 },
                { text: "分类", icon: "list" },
                { text: "消息", icon: "comment", badge: 12 },
                { text: "我的", icon: "user" },
            ],
        };
    },
    methods: {
        // 标签切换事件
        onChangeTab(index, item) {
            this.$toast.text(`点击了: ${item.text}, 索引: ${index}`);
        },

        // 关闭弹出层
        onClosePopup(type) {
            console.log(`${type}示例已关闭`);
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

.demo-content {
    padding: 0;
    position: relative;
}

.demo-tabbar-container {
    height: 50px;
    margin-top: 16px;
}

.demo-description {
    padding: 12px 16px;
    font-size: 14px;
    color: #969799;
}

.demo-fullscreen {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #f7f8fa;
}

.demo-fullscreen__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 16px;
    background-color: #fff;
    border-bottom: 1px solid #ebedf0;
}

.demo-fullscreen__title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
}

.demo-fullscreen__close {
    padding: 6px;
}

.demo-fullscreen__content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
}

.demo-fullscreen__panel {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.demo-fullscreen__panel-title {
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    border-bottom: 1px solid #f2f2f2;
}

.demo-fullscreen__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
}

.demo-fullscreen__placeholder text {
    margin-top: 16px;
    font-size: 14px;
    color: #969799;
}
</style>
