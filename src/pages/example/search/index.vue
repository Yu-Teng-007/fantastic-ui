<template>
    <view class="container">
        <view class="header">
            <view class="title">搜索</view>
            <view class="subtitle">搜索组件用于展示搜索框，通常用于搜索场景</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="search-content">
                <fanc-search v-model="value1" placeholder="请输入搜索关键词"></fanc-search>
            </view>
        </view>

        <!-- 搜索框形状 -->
        <view class="section">
            <view class="section-title">搜索框形状</view>
            <view class="search-content">
                <fanc-search
                    v-model="value2"
                    placeholder="圆形搜索框"
                    shape="round"
                    class="search-item"
                ></fanc-search>
                <fanc-search
                    v-model="value3"
                    placeholder="方形搜索框"
                    shape="square"
                    class="search-item"
                ></fanc-search>
            </view>
        </view>

        <!-- 显示标签文本 -->
        <view class="section">
            <view class="section-title">显示标签文本</view>
            <view class="search-content">
                <fanc-search
                    v-model="value4"
                    label="商品"
                    placeholder="请输入商品名称"
                ></fanc-search>
            </view>
        </view>

        <!-- 显示操作按钮 -->
        <view class="section">
            <view class="section-title">显示操作按钮</view>
            <view class="search-content">
                <fanc-search
                    v-model="value5"
                    placeholder="请输入搜索内容"
                    showActionButton
                    @search="onSearch"
                >
                </fanc-search>
            </view>
        </view>

        <!-- 自定义按钮文本 -->
        <view class="section">
            <view class="section-title">自定义按钮文本</view>
            <view class="search-content">
                <fanc-search
                    v-model="value6"
                    placeholder="请输入搜索内容"
                    showActionButton
                    actionText="查询"
                    @search="onSearch"
                >
                </fanc-search>
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="section">
            <view class="section-title">自定义图标</view>
            <view class="search-content">
                <fanc-search
                    v-model="value7"
                    leftIcon="map-marker-alt"
                    placeholder="搜索地点"
                    class="search-item"
                >
                </fanc-search>
                <fanc-search
                    v-model="value8"
                    leftIcon="user"
                    rightIcon="qrcode"
                    placeholder="搜索用户"
                    @right-icon-click="onRightIconClick"
                    class="search-item"
                >
                </fanc-search>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="search-content">
                <fanc-search v-model="value9" disabled placeholder="禁用状态的搜索框">
                </fanc-search>
            </view>
        </view>

        <!-- 事件监听 -->
        <view class="section">
            <view class="section-title">事件监听</view>
            <view class="search-content">
                <fanc-search
                    v-model="value10"
                    placeholder="监听事件"
                    @input="onInput"
                    @search="onSearch"
                    @clear="onClear"
                    @focus="onFocus"
                    @blur="onBlur"
                >
                </fanc-search>
                <view class="result-value" v-if="eventResult">
                    <text>事件类型：{{ eventResult.type }}</text>
                    <text v-if="eventResult.value !== undefined">值：{{ eventResult.value }}</text>
                </view>
            </view>
        </view>

        <!-- 自定义背景色 -->
        <view class="section">
            <view class="section-title">自定义背景色</view>
            <view class="search-content">
                <fanc-search v-model="value11" placeholder="自定义背景色" background="#f0f9ff">
                </fanc-search>
            </view>
        </view>

        <!-- 输入框对齐方式 -->
        <view class="section">
            <view class="section-title">输入框对齐方式</view>
            <view class="search-content">
                <fanc-search
                    v-model="value12"
                    placeholder="左对齐(默认)"
                    align="left"
                    class="search-item"
                >
                </fanc-search>
                <fanc-search
                    v-model="value13"
                    placeholder="居中对齐"
                    align="center"
                    class="search-item"
                >
                </fanc-search>
                <fanc-search
                    v-model="value14"
                    placeholder="右对齐"
                    align="right"
                    class="search-item"
                >
                </fanc-search>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
            value7: "",
            value8: "",
            value9: "",
            value10: "",
            value11: "",
            value12: "左对齐文本",
            value13: "居中对齐文本",
            value14: "右对齐文本",
            eventResult: null,
        };
    },
    methods: {
        onInput(value) {
            this.eventResult = { type: "input", value };
            console.log("输入事件：", value);
        },
        onSearch(value) {
            this.eventResult = { type: "search", value };
            console.log("搜索事件：", value);
            uni.showToast({
                title: `搜索：${value}`,
                icon: "none",
            });
        },
        onClear() {
            this.eventResult = { type: "clear" };
            console.log("清除事件");
        },
        onFocus(event) {
            this.eventResult = { type: "focus" };
            console.log("聚焦事件", event);
        },
        onBlur(event) {
            this.eventResult = { type: "blur" };
            console.log("失焦事件", event);
        },
        onRightIconClick() {
            this.eventResult = { type: "rightIconClick" };
            console.log("右侧图标点击");
            uni.showToast({
                title: "扫码搜索",
                icon: "none",
            });
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

.search-content {
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.search-item {
    margin-bottom: 16px;
}

.result-value {
    margin-top: 12px;
    padding: 8px;
    background-color: #f8f8f8;
    border-radius: 4px;
    font-size: 14px;
    color: #323233;
    border-left: 3px solid #007bff;
}

.result-value text {
    display: block;
    line-height: 1.5;
}
</style>
