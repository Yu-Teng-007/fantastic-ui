<template>
    <view class="container">
        <view class="header">
            <text class="header__title">侧边栏组件示例</text>
            <text class="header__desc">用于创建固定的侧边导航菜单</text>
        </view>

        <view class="section">
            <view class="section__title">视觉黏连效果</view>
            <view class="section__content sidebar-demo">
                <fanc-sidebar
                    :active-index="stickActiveIndex"
                    :items="menuItems"
                    @change="onChangeStickTab"
                    @click="onStickItemClick"
                    class="sidebar-demo__nav"
                />
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{
                            menuItems[stickActiveIndex].title
                        }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ stickActiveIndex + 1 }}项</text
                        >
                        <text class="content-panel__note">选中项与内容区域视觉黏连效果</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">基础用法</view>
            <view class="section__content sidebar-demo">
                <fanc-sidebar
                    :active-index="activeIndex"
                    :items="menuItems"
                    @change="onChangeTab"
                    @click="onItemClick"
                    class="sidebar-demo__nav"
                />
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{ menuItems[activeIndex].title }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ activeIndex + 1 }}项</text
                        >
                    </view>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">带徽标的侧边栏</view>
            <view class="section__content sidebar-demo">
                <fanc-sidebar
                    :active-index="badgeActiveIndex"
                    :items="badgeMenuItems"
                    @change="onChangeBadgeTab"
                    @click="onBadgeItemClick"
                    class="sidebar-demo__nav"
                />
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{
                            badgeMenuItems[badgeActiveIndex].title
                        }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ badgeActiveIndex + 1 }}项</text
                        >
                    </view>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">自定义宽度</view>
            <view class="section__content sidebar-demo">
                <fanc-sidebar
                    :active-index="customWidthActiveIndex"
                    :items="menuItems"
                    :width="100"
                    @change="onChangeCustomWidthTab"
                    @click="onCustomWidthItemClick"
                    class="sidebar-demo__nav"
                />
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{
                            menuItems[customWidthActiveIndex].title
                        }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ customWidthActiveIndex + 1 }}项</text
                        >
                    </view>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">右侧侧边栏</view>
            <view class="section__content sidebar-demo">
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{
                            menuItems[rightActiveIndex].title
                        }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ rightActiveIndex + 1 }}项</text
                        >
                    </view>
                </view>
                <fanc-sidebar
                    :active-index="rightActiveIndex"
                    :items="menuItems"
                    position="right"
                    @change="onChangeRightTab"
                    @click="onRightItemClick"
                    class="sidebar-demo__nav"
                />
            </view>
        </view>

        <view class="section">
            <view class="section__title">禁用状态</view>
            <view class="section__content sidebar-demo">
                <fanc-sidebar
                    :active-index="disabledActiveIndex"
                    :items="disabledMenuItems"
                    @change="onChangeDisabledTab"
                    @click="onDisabledItemClick"
                    @disabled-click="onDisabledItemClick"
                    class="sidebar-demo__nav"
                />
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{
                            disabledMenuItems[disabledActiveIndex].title
                        }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ disabledActiveIndex + 1 }}项</text
                        >
                    </view>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">纯文本侧边栏</view>
            <view class="section__content sidebar-demo">
                <fanc-sidebar
                    :active-index="textOnlyActiveIndex"
                    :items="textOnlyMenuItems"
                    @change="onChangeTextOnlyTab"
                    @click="onTextOnlyItemClick"
                    class="sidebar-demo__nav"
                />
                <view class="sidebar-demo__content">
                    <view class="content-panel">
                        <text class="content-panel__title">{{
                            textOnlyMenuItems[textOnlyActiveIndex].title
                        }}</text>
                        <text class="content-panel__desc"
                            >当前选中的是第{{ textOnlyActiveIndex + 1 }}项</text
                        >
                        <text class="content-panel__note">纯文本侧边栏，无图标</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            stickActiveIndex: 0,
            activeIndex: 0,
            badgeActiveIndex: 0,
            customWidthActiveIndex: 0,
            rightActiveIndex: 0,
            disabledActiveIndex: 0,
            textOnlyActiveIndex: 0,
            menuItems: [
                { title: "选项一", icon: "home" },
                { title: "选项二", icon: "user" },
                { title: "选项三", icon: "bell" },
                { title: "选项四", icon: "cog" },
                { title: "选项五", icon: "question-circle" },
            ],
            badgeMenuItems: [
                { title: "选项一", icon: "home" },
                { title: "选项二", icon: "user" },
                { title: "选项三", icon: "bell", badge: "5" },
                { title: "选项四", icon: "cog" },
                { title: "选项五", icon: "question-circle", badge: "新" },
            ],
            disabledMenuItems: [
                { title: "选项一", icon: "home" },
                { title: "选项二", icon: "user" },
                { title: "选项三", icon: "bell", disabled: true },
                { title: "选项四", icon: "cog" },
                { title: "选项五", icon: "question-circle", disabled: true },
            ],
            textOnlyMenuItems: [
                { title: "菜单一" },
                { title: "菜单二" },
                { title: "菜单三" },
                { title: "菜单四" },
                { title: "菜单五" },
            ],
        };
    },
    methods: {
        onStickItemClick(index) {
            this.stickActiveIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.menuItems[index].title}`);
        },
        onItemClick(index) {
            this.activeIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.menuItems[index].title}`);
        },
        onBadgeItemClick(index) {
            this.badgeActiveIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.badgeMenuItems[index].title}`);
        },
        onCustomWidthItemClick(index) {
            this.customWidthActiveIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.menuItems[index].title}`);
        },
        onRightItemClick(index) {
            this.rightActiveIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.menuItems[index].title}`);
        },
        onDisabledItemClick(index, item) {
            if (item && item.disabled) {
                this.$toast.text(`第${index + 1}项已禁用`);
                return;
            }
            this.disabledActiveIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.disabledMenuItems[index].title}`);
        },
        onChangeStickTab(index) {
            console.log("Stick tab changed:", index);
        },
        onChangeTab(index) {
            console.log("Tab changed:", index);
        },
        onChangeBadgeTab(index) {
            console.log("Badge tab changed:", index);
        },
        onChangeCustomWidthTab(index) {
            console.log("Custom width tab changed:", index);
        },
        onChangeRightTab(index) {
            console.log("Right tab changed:", index);
        },
        onChangeDisabledTab(index) {
            console.log("Disabled tab changed:", index);
        },
        onTextOnlyItemClick(index) {
            this.textOnlyActiveIndex = index;
            this.$toast.text(`点击了第${index + 1}项: ${this.textOnlyMenuItems[index].title}`);
        },
        onChangeTextOnlyTab(index) {
            console.log("Text only tab changed:", index);
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
}

.header {
    margin-bottom: 20px;
}

.header__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
}

.header__desc {
    font-size: 14px;
    color: #666;
    display: block;
}

.section {
    margin-bottom: 30px;
}

.section__title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    padding-left: 10px;
    border-left: 3px solid #007bff;
}

.section__content {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.sidebar-demo {
    display: flex;
    height: 300px;
    border: 1px solid #ebedf0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.sidebar-demo__nav {
    width: 90px;
    height: 100%;
    border-right: none;
    background-color: #f7f7f7;
}

.sidebar-demo__content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #fff;
    position: relative;
    padding-left: 30px;
}

.content-panel {
    text-align: left;
    width: 100%;
}

.content-panel__title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    display: block;
    color: #333;
}

.content-panel__desc {
    font-size: 14px;
    color: #666;
    display: block;
}

.content-panel__note {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
    display: block;
}
</style>
