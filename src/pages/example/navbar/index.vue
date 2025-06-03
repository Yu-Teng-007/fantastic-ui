<template>
    <view class="example-page">
        <view class="section">
            <view class="section__title">基础用法</view>
            <fanc-navbar
                title="标题"
                left-text="返回"
                right-text="按钮"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </view>

        <view class="section">
            <view class="section__title">返回按钮</view>
            <fanc-navbar title="标题" left-arrow @click-left="onClickLeft" />
        </view>

        <view class="section">
            <view class="section__title">自定义颜色</view>
            <fanc-navbar
                title="自定义颜色"
                left-text="返回"
                right-text="按钮"
                background="#007bff"
                title-color="#fff"
                :arrow-color="'#fff'"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </view>

        <view class="section">
            <view class="section__title">自定义图标</view>
            <fanc-navbar title="自定义图标">
                <template #left>
                    <view class="navbar-icon-wrapper" @click="onClickLeft">
                        <fanc-icon name="arrow-left" size="20" />
                    </view>
                </template>
                <template #right>
                    <view class="navbar-icon-wrapper" @click="onClickRight">
                        <fanc-icon name="ellipsis-v" size="20" />
                    </view>
                </template>
            </fanc-navbar>
        </view>

        <view class="section">
            <view class="section__title">固定在顶部</view>
            <view class="description">设置fixed属性后，导航栏会固定在页面顶部。</view>
            <button class="example-btn" @click="showFixedNavbar">显示固定导航栏</button>
        </view>

        <!-- 固定导航栏示例（点击按钮显示） -->
        <fanc-navbar
            v-if="isFixedNavbarVisible"
            title="固定导航栏"
            left-text="返回"
            right-text="关闭"
            fixed
            placeholder
            background="#fff"
            @click-left="onClickLeft"
            @click-right="hideFixedNavbar"
        />

        <view class="section">
            <view class="section__title">多级导航</view>
            <view class="subsection">
                <fanc-navbar
                    title="商品详情"
                    left-arrow
                    :border="false"
                    @click-left="onClickLeft"
                />
                <view class="tabs">
                    <view
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="tab-item"
                        :class="{ active: activeTab === index }"
                        @click="activeTab = index"
                    >
                        {{ tab }}
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
            isFixedNavbarVisible: false,
            activeTab: 0,
            tabs: ["商品", "详情", "评论", "推荐"],
        };
    },
    methods: {
        onClickLeft() {
            this.$toast.text("点击返回");
        },
        onClickRight() {
            this.$toast.text("点击右侧按钮");
        },
        showFixedNavbar() {
            this.isFixedNavbarVisible = true;
            setTimeout(() => {
                this.hideFixedNavbar();
            }, 3000);
        },
        hideFixedNavbar() {
            this.isFixedNavbarVisible = false;
        },
    },
};
</script>

<style>
.example-page {
    padding: 20px;
    background-color: #f8f9fa;
}

.section {
    margin-bottom: 32px;
}

.section__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #323233;
}

.description {
    margin-bottom: 16px;
    font-size: 14px;
    color: #969799;
}

.example-btn {
    margin-top: 8px;
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    padding: 8px 16px;
    border: none;
}

.navbar-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
}

.subsection {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background-color: #fff;
}

.tabs {
    display: flex;
    padding: 0 16px;
    border-bottom: 1px solid #ebedf0;
    background-color: #fff;
}

.tab-item {
    position: relative;
    flex: 1;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
    color: #646566;
}

.tab-item.active {
    color: #007bff;
}

.tab-item.active:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    width: 40px;
    height: 2px;
    background-color: #007bff;
    transform: translateX(-50%);
}
</style>
