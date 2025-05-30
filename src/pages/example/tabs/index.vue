<template>
    <view class="container">
        <view class="header">
            <view class="title">选项卡</view>
            <view class="subtitle">选项卡组件用于在不同的内容区域之间进行切换</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-content">
                <fanc-tabs v-model="activeTab1">
                    <fanc-tab title="标签 1">
                        <view class="content-block">标签 1 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 2">
                        <view class="content-block">标签 2 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 3">
                        <view class="content-block">标签 3 的内容</view>
                    </fanc-tab>
                </fanc-tabs>
            </view>
        </view>

        <!-- 卡片样式 -->
        <view class="section">
            <view class="section-title">卡片样式</view>
            <view class="demo-content card-demo">
                <fanc-tabs v-model="activeTab3" type="card">
                    <fanc-tab title="标签 1">
                        <view class="content-block">标签 1 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 2">
                        <view class="content-block">标签 2 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 3">
                        <view class="content-block">标签 3 的内容</view>
                    </fanc-tab>
                </fanc-tabs>
            </view>
        </view>

        <!-- 自定义标签 -->
        <view class="section">
            <view class="section-title">自定义标签</view>
            <view class="demo-content">
                <fanc-tabs v-model="activeTabCustom">
                    <template #title-0="{ active }">
                        <view class="custom-tab">
                            <fanc-icon
                                name="home"
                                size="16"
                                :color="active ? '#007bff' : '#666'"
                            ></fanc-icon>
                            <text :style="{ color: active ? '#007bff' : '#666', marginLeft: '4px' }"
                                >首页</text
                            >
                        </view>
                    </template>
                    <template #title-1="{ active }">
                        <view class="custom-tab">
                            <fanc-icon
                                name="heart"
                                size="16"
                                :color="active ? '#007bff' : '#666'"
                            ></fanc-icon>
                            <text :style="{ color: active ? '#007bff' : '#666', marginLeft: '4px' }"
                                >收藏</text
                            >
                            <view class="custom-tab-badge">8</view>
                        </view>
                    </template>
                    <template #title-2="{ active }">
                        <view class="custom-tab">
                            <fanc-icon
                                name="user"
                                size="16"
                                :color="active ? '#007bff' : '#666'"
                            ></fanc-icon>
                            <text :style="{ color: active ? '#007bff' : '#666', marginLeft: '4px' }"
                                >我的</text
                            >
                        </view>
                    </template>

                    <fanc-tab title="首页">
                        <view class="content-block">首页内容</view>
                    </fanc-tab>
                    <fanc-tab title="收藏">
                        <view class="content-block">收藏内容</view>
                    </fanc-tab>
                    <fanc-tab title="我的">
                        <view class="content-block">我的内容</view>
                    </fanc-tab>
                </fanc-tabs>
            </view>
        </view>

        <!-- 通过 name 属性匹配 -->
        <view class="section">
            <view class="section-title">通过 name 属性匹配</view>
            <view class="demo-content">
                <view class="name-tabs-info">当前选中: {{ activeTabName }}</view>
                <fanc-tabs v-model="activeTabName">
                    <fanc-tab title="首页" name="home">
                        <view class="content-block">首页内容</view>
                    </fanc-tab>
                    <fanc-tab title="分类" name="category">
                        <view class="content-block">分类内容</view>
                    </fanc-tab>
                    <fanc-tab title="我的" name="profile">
                        <view class="content-block">我的内容</view>
                    </fanc-tab>
                </fanc-tabs>
                <view class="name-tabs-buttons">
                    <button class="name-tab-btn" @click="activeTabName = 'home'">首页</button>
                    <button class="name-tab-btn" @click="activeTabName = 'category'">分类</button>
                    <button class="name-tab-btn" @click="activeTabName = 'profile'">我的</button>
                </view>
            </view>
        </view>

        <!-- 禁用标签 -->
        <view class="section">
            <view class="section-title">禁用标签</view>
            <view class="demo-content">
                <fanc-tabs v-model="activeTab4" @disabled="onDisabled">
                    <fanc-tab title="标签 1">
                        <view class="content-block">标签 1 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 2" disabled>
                        <view class="content-block">标签 2 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 3">
                        <view class="content-block">标签 3 的内容</view>
                    </fanc-tab>
                </fanc-tabs>
            </view>
        </view>

        <!-- 自定义样式 -->
        <view class="section">
            <view class="section-title">自定义样式</view>
            <view class="demo-content">
                <fanc-tabs
                    v-model="activeTab5"
                    active-color="#ff6b00"
                    inactive-color="#666666"
                    background="#f5f5f5"
                    :line-width="30"
                    :line-height="4"
                    :font-size="16"
                >
                    <fanc-tab title="标签 1">
                        <view class="content-block">标签 1 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 2">
                        <view class="content-block">标签 2 的内容</view>
                    </fanc-tab>
                    <fanc-tab title="标签 3">
                        <view class="content-block">标签 3 的内容</view>
                    </fanc-tab>
                </fanc-tabs>
            </view>
        </view>

        <!-- 多个标签滚动 -->
        <view class="section">
            <view class="section-title">多个标签滚动</view>
            <view class="demo-content">
                <fanc-tabs v-model="activeTab6">
                    <fanc-tab v-for="i in 8" :key="i" :title="`标签 ${i}`">
                        <view class="content-block">标签 {{ i }} 的内容</view>
                    </fanc-tab>
                </fanc-tabs>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            activeTab1: 0,
            activeTab3: 0,
            activeTab4: 0,
            activeTab5: 0,
            activeTab6: 0,
            activeTabName: "home",
            activeTabCustom: 0,
        };
    },
    methods: {
        onDisabled(index) {
            this.$toast.text("该标签已被禁用");
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
    background-color: #fff;
}

.card-demo {
    padding: 12px;
}

.content-block {
    padding: 20px;
    text-align: center;
    color: #666;
    font-size: 14px;
}

.name-tabs-info {
    padding: 10px 15px;
    color: #666;
    font-size: 14px;
    border-bottom: 1px solid #eee;
}

.name-tabs-buttons {
    display: flex;
    padding: 15px;
    justify-content: space-around;
}

.name-tab-btn {
    font-size: 12px;
    padding: 6px 12px;
    background-color: #f2f3f5;
    border: none;
    border-radius: 4px;
    color: #333;
}

.custom-tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
}

.custom-tab-badge {
    position: absolute;
    top: -8px;
    right: -12px;
    background-color: #f56c6c;
    color: white;
    font-size: 10px;
    height: 16px;
    min-width: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 8px;
    padding: 0 4px;
    box-sizing: border-box;
}
</style>
