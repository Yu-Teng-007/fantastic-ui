<template>
    <view class="container">
        <view class="header">
            <view class="title">标签栏</view>
            <view class="subtitle">底部导航栏，用于在不同页面之间进行切换</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeBasic"
                    :items="basicItems"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">标准的底部导航栏，显示图标和文本</view>
        </view>

        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeCustomColor"
                    :items="customColorItems"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">可以自定义标签的颜色和激活状态的颜色</view>
        </view>

        <view class="section">
            <view class="section-title">徽标提示</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeBadge"
                    :items="badgeItems"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">在图标右上角显示徽标，可以是数字或红点</view>
        </view>

        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeDisabled"
                    :items="disabledItems"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">禁用的标签无法点击</view>
        </view>

        <view class="section">
            <view class="section-title">胶囊模式</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeCapsule"
                    :items="basicItems"
                    :capsule="true"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">胶囊样式的标签栏，居中显示</view>
        </view>

        <view class="section">
            <view class="section-title">纯图标模式</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeIconOnly"
                    :items="basicItems"
                    :icon-only="true"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">只显示图标，不显示文本</view>
        </view>

        <view class="section">
            <view class="section-title">纯文本模式</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeTextOnly"
                    :items="basicItems"
                    :text-only="true"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">只显示文本，不显示图标，选中项带有椭圆形背景</view>
        </view>

        <view class="section">
            <view class="section-title">胶囊+纯图标模式</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeCapsuleIconOnly"
                    :items="basicItems"
                    :capsule="true"
                    :icon-only="true"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">结合胶囊模式和纯图标模式</view>
        </view>

        <view class="section">
            <view class="section-title">胶囊+纯文本模式</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeCapsuleTextOnly"
                    :items="basicItems"
                    :capsule="true"
                    :text-only="true"
                    :fixed="false"
                    @change="onChangeTab"
                />
            </view>
            <view class="demo-description">结合胶囊模式和纯文本模式</view>
        </view>

        <view class="section">
            <view class="section-title">使用name属性</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar
                    v-model="activeName"
                    :items="nameItems"
                    :fixed="false"
                    @change="onChangeNameTab"
                />
            </view>
            <view class="demo-description">
                当前选中: {{ activeName }}
                <fanc-button size="small" type="primary" @click="switchTab">切换标签</fanc-button>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义标签栏</view>
            <view class="demo-content demo-tabbar-container">
                <fanc-tabbar :fixed="false">
                    <view
                        v-for="(item, index) in customItems"
                        :key="index"
                        class="custom-tab-item"
                        :class="{ 'custom-tab-item--active': activeCustom === index }"
                        @click="onCustomTabClick(index)"
                    >
                        <view
                            class="custom-tab-item__icon"
                            :style="{ backgroundColor: item.color }"
                        >
                            <fanc-icon :name="item.icon" color="#fff" size="16"></fanc-icon>
                        </view>
                        <view class="custom-tab-item__text">{{ item.text }}</view>
                    </view>
                </fanc-tabbar>
            </view>
            <view class="demo-description">使用插槽完全自定义标签栏内容和样式</view>
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
            showFullScreen: false,

            // 激活标签
            activeBasic: 0,
            activeCustomColor: 0,
            activeBadge: 0,
            activeDisabled: 0,
            activeFullScreen: 0,
            activeName: "home",
            activeCapsule: 0,
            activeIconOnly: 0,
            activeTextOnly: 0,
            activeCapsuleIconOnly: 0,
            activeCapsuleTextOnly: 0,
            activeCustom: 0,

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

            // 全屏应用示例标签项
            fullScreenItems: [
                { text: "首页", icon: "home", badge: 3 },
                { text: "分类", icon: "list" },
                { text: "消息", icon: "comment", badge: 12 },
                { text: "我的", icon: "user" },
            ],

            // 带name属性的标签项
            nameItems: [
                { text: "首页", icon: "home", name: "home" },
                { text: "分类", icon: "list", name: "category" },
                { text: "消息", icon: "comment", name: "message" },
                { text: "我的", icon: "user", name: "user" },
            ],

            // 自定义标签项
            customItems: [
                { text: "红色", icon: "heart", color: "#ee0a24" },
                { text: "橙色", icon: "star", color: "#ff976a" },
                { text: "蓝色", icon: "info", color: "#1989fa" },
                { text: "绿色", icon: "success", color: "#07c160" },
            ],
        };
    },
    methods: {
        // 标签切换事件
        onChangeTab(index, item) {
            this.$toast.text(`点击了: ${item.text}, 索引: ${index}`);
        },

        // 标签切换事件（带name）
        onChangeNameTab(index, item) {
            this.$toast.text(`点击了: ${item.text}, name: ${item.name}`);
        },

        // 自定义标签点击事件
        onCustomTabClick(index) {
            this.activeCustom = index;
            this.$toast.text(`点击了自定义标签: ${this.customItems[index].text}`);
        },

        // 手动切换标签
        switchTab() {
            const names = ["home", "category", "message", "user"];
            const currentIndex = names.indexOf(this.activeName);
            const nextIndex = (currentIndex + 1) % names.length;
            this.activeName = names[nextIndex];
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
    margin: 16px 0;
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;
}

.demo-description {
    padding: 12px 16px;
    font-size: 14px;
    color: #969799;
}

/* 自定义标签栏样式 */
.custom-tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 8px 0;
}

.custom-tab-item--active .custom-tab-item__text {
    color: #1989fa;
    font-weight: bold;
}

.custom-tab-item__icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    opacity: 0.8;
}

.custom-tab-item--active .custom-tab-item__icon {
    opacity: 1;
    transform: scale(1.1);
}

.custom-tab-item__text {
    font-size: 12px;
    color: #646566;
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
