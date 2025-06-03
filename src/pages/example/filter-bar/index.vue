<template>
    <view class="container">
        <view class="header">
            <view class="title">筛选栏</view>
            <view class="subtitle">筛选栏组件用于列表页面的数据筛选，支持下拉菜单和抽屉式筛选</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="basicItems"
                    @filter-change="onFilterChange"
                ></fanc-filter-bar>
                <view class="result-box">
                    <text class="result-text">筛选结果：{{ formatResult(filterResult) }}</text>
                </view>
            </view>
        </view>

        <!-- 带抽屉筛选 -->
        <view class="section">
            <view class="section-title">带抽屉筛选</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="drawerFilterItems"
                    :drawer-items="drawerItems"
                    @filter-change="onDrawerFilterChange"
                ></fanc-filter-bar>
                <view class="result-box">
                    <text class="result-text"
                        >筛选结果：{{ formatResult(drawerFilterResult) }}</text
                    >
                </view>
            </view>
        </view>

        <!-- 自定义文本 -->
        <view class="section">
            <view class="section-title">自定义文本</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="customTextItems"
                    :drawer-items="drawerItems"
                    more-text="筛选"
                    reset-text="清空"
                    confirm-text="应用"
                    @filter-change="onCustomFilterChange"
                ></fanc-filter-bar>
                <view class="result-box">
                    <text class="result-text"
                        >筛选结果：{{ formatResult(customFilterResult) }}</text
                    >
                </view>
            </view>
        </view>

        <!-- 禁用选项 -->
        <view class="section">
            <view class="section-title">禁用选项</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="disabledItems"
                    @filter-change="onDisabledFilterChange"
                ></fanc-filter-bar>
                <view class="result-box">
                    <text class="result-text"
                        >筛选结果：{{ formatResult(disabledFilterResult) }}</text
                    >
                </view>
            </view>
        </view>

        <!-- 固定顶部 -->
        <view class="section">
            <view class="section-title">固定顶部</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="fixedItems"
                    :fixed="true"
                    @filter-change="onFixedFilterChange"
                ></fanc-filter-bar>
                <view class="fixed-placeholder"></view>
                <view class="result-box">
                    <text class="result-text">筛选结果：{{ formatResult(fixedFilterResult) }}</text>
                </view>
            </view>
        </view>

        <!-- 无边框 -->
        <view class="section">
            <view class="section-title">无边框</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="noBorderItems"
                    :border="false"
                    @filter-change="onNoBorderFilterChange"
                ></fanc-filter-bar>
                <view class="result-box">
                    <text class="result-text"
                        >筛选结果：{{ formatResult(noBorderFilterResult) }}</text
                    >
                </view>
            </view>
        </view>

        <!-- 单选切换 -->
        <view class="section">
            <view class="section-title">单选切换</view>
            <view class="filter-content">
                <fanc-filter-bar
                    :items="radioItems"
                    @filter-change="onRadioFilterChange"
                ></fanc-filter-bar>
                <view class="result-box">
                    <text class="result-text">筛选结果：{{ formatResult(radioFilterResult) }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础筛选项
            basicItems: [
                {
                    text: "综合排序",
                    type: "dropdown",
                    id: "sort",
                    options: [
                        { text: "综合排序", value: "default" },
                        { text: "销量优先", value: "sales" },
                        { text: "价格低到高", value: "price-asc" },
                        { text: "价格高到低", value: "price-desc" },
                        { text: "好评优先", value: "rating" },
                    ],
                },
                {
                    text: "分类",
                    type: "dropdown",
                    id: "category",
                    options: [
                        { text: "全部分类", value: "" },
                        { text: "手机数码", value: "digital" },
                        { text: "家用电器", value: "appliance" },
                        { text: "电脑办公", value: "computer" },
                        { text: "服装鞋包", value: "clothing" },
                    ],
                },
                {
                    text: "品牌",
                    type: "dropdown",
                    id: "brand",
                    options: [
                        { text: "全部品牌", value: "" },
                        { text: "苹果", value: "apple" },
                        { text: "华为", value: "huawei" },
                        { text: "小米", value: "xiaomi" },
                        { text: "三星", value: "samsung" },
                    ],
                },
            ],
            // 带抽屉筛选项
            drawerFilterItems: [
                {
                    text: "综合排序",
                    type: "dropdown",
                    id: "sort",
                    options: [
                        { text: "综合排序", value: "default" },
                        { text: "销量优先", value: "sales" },
                        { text: "价格低到高", value: "price-asc" },
                        { text: "价格高到低", value: "price-desc" },
                    ],
                },
                {
                    text: "分类",
                    type: "dropdown",
                    id: "category",
                    options: [
                        { text: "全部分类", value: "" },
                        { text: "手机数码", value: "digital" },
                        { text: "家用电器", value: "appliance" },
                        { text: "电脑办公", value: "computer" },
                    ],
                },
                {
                    text: "更多筛选",
                    type: "drawer",
                },
            ],
            // 抽屉筛选项
            drawerItems: [
                {
                    id: "brand",
                    title: "品牌",
                    multiple: true,
                    options: [
                        { text: "苹果", value: "apple" },
                        { text: "华为", value: "huawei" },
                        { text: "小米", value: "xiaomi" },
                        { text: "三星", value: "samsung" },
                        { text: "OPPO", value: "oppo" },
                        { text: "vivo", value: "vivo" },
                    ],
                },
                {
                    id: "price",
                    title: "价格区间",
                    multiple: false,
                    options: [
                        { text: "0-1000元", value: "0-1000" },
                        { text: "1000-2000元", value: "1000-2000" },
                        { text: "2000-3000元", value: "2000-3000" },
                        { text: "3000-5000元", value: "3000-5000" },
                        { text: "5000元以上", value: "5000-" },
                    ],
                },
                {
                    id: "feature",
                    title: "功能特性",
                    multiple: true,
                    options: [
                        { text: "5G", value: "5g" },
                        { text: "快充", value: "fast-charge" },
                        { text: "无线充电", value: "wireless-charge" },
                        { text: "高刷新率", value: "high-refresh" },
                        { text: "NFC", value: "nfc" },
                        { text: "双卡双待", value: "dual-sim" },
                    ],
                },
            ],
            // 自定义文本筛选项
            customTextItems: [
                {
                    text: "销量",
                    type: "dropdown",
                    id: "sales",
                    options: [
                        { text: "默认", value: "" },
                        { text: "从高到低", value: "desc" },
                        { text: "从低到高", value: "asc" },
                    ],
                },
                {
                    text: "价格",
                    type: "dropdown",
                    id: "price",
                    options: [
                        { text: "默认", value: "" },
                        { text: "从高到低", value: "desc" },
                        { text: "从低到高", value: "asc" },
                    ],
                },
                {
                    text: "筛选",
                    type: "drawer",
                },
            ],
            // 禁用选项
            disabledItems: [
                {
                    text: "综合排序",
                    type: "dropdown",
                    id: "sort",
                    options: [
                        { text: "综合排序", value: "default" },
                        { text: "销量优先", value: "sales" },
                        { text: "价格低到高", value: "price-asc" },
                        { text: "价格高到低", value: "price-desc" },
                    ],
                },
                {
                    text: "分类",
                    type: "dropdown",
                    id: "category",
                    disabled: true,
                    options: [
                        { text: "全部分类", value: "" },
                        { text: "手机数码", value: "digital" },
                        { text: "家用电器", value: "appliance" },
                        { text: "电脑办公", value: "computer" },
                    ],
                },
                {
                    text: "品牌",
                    type: "dropdown",
                    id: "brand",
                    options: [
                        { text: "全部品牌", value: "" },
                        { text: "苹果", value: "apple" },
                        { text: "华为", value: "huawei" },
                        { text: "小米", value: "xiaomi" },
                    ],
                },
            ],
            // 固定顶部筛选项
            fixedItems: [
                {
                    text: "综合排序",
                    type: "dropdown",
                    id: "sort",
                    options: [
                        { text: "综合排序", value: "default" },
                        { text: "销量优先", value: "sales" },
                        { text: "价格低到高", value: "price-asc" },
                        { text: "价格高到低", value: "price-desc" },
                    ],
                },
                {
                    text: "分类",
                    type: "dropdown",
                    id: "category",
                    options: [
                        { text: "全部分类", value: "" },
                        { text: "手机数码", value: "digital" },
                        { text: "家用电器", value: "appliance" },
                        { text: "电脑办公", value: "computer" },
                    ],
                },
            ],
            // 无边框筛选项
            noBorderItems: [
                {
                    text: "综合排序",
                    type: "dropdown",
                    id: "sort",
                    options: [
                        { text: "综合排序", value: "default" },
                        { text: "销量优先", value: "sales" },
                        { text: "价格低到高", value: "price-asc" },
                        { text: "价格高到低", value: "price-desc" },
                    ],
                },
                {
                    text: "分类",
                    type: "dropdown",
                    id: "category",
                    options: [
                        { text: "全部分类", value: "" },
                        { text: "手机数码", value: "digital" },
                        { text: "家用电器", value: "appliance" },
                        { text: "电脑办公", value: "computer" },
                    ],
                },
            ],
            // 单选切换筛选项
            radioItems: [
                {
                    text: "综合排序",
                    type: "dropdown",
                    id: "sort",
                    options: [
                        { text: "综合排序", value: "default" },
                        { text: "销量优先", value: "sales" },
                        { text: "价格低到高", value: "price-asc" },
                        { text: "价格高到低", value: "price-desc" },
                    ],
                },
                {
                    text: "有货",
                    type: "radio",
                    id: "inStock",
                },
                {
                    text: "促销",
                    type: "radio",
                    id: "promotion",
                },
            ],
            // 筛选结果
            filterResult: {},
            drawerFilterResult: {},
            customFilterResult: {},
            disabledFilterResult: {},
            fixedFilterResult: {},
            noBorderFilterResult: {},
            radioFilterResult: {},
        };
    },
    methods: {
        // 处理筛选变化
        onFilterChange(result) {
            this.filterResult = result;
            console.log("筛选结果:", result);
        },
        // 处理抽屉筛选变化
        onDrawerFilterChange(result) {
            this.drawerFilterResult = result;
            console.log("抽屉筛选结果:", result);
        },
        // 处理自定义文本筛选变化
        onCustomFilterChange(result) {
            this.customFilterResult = result;
            console.log("自定义文本筛选结果:", result);
        },
        // 处理禁用筛选变化
        onDisabledFilterChange(result) {
            this.disabledFilterResult = result;
            console.log("禁用筛选结果:", result);
        },
        // 处理固定顶部筛选变化
        onFixedFilterChange(result) {
            this.fixedFilterResult = result;
            console.log("固定顶部筛选结果:", result);
        },
        // 处理无边框筛选变化
        onNoBorderFilterChange(result) {
            this.noBorderFilterResult = result;
            console.log("无边框筛选结果:", result);
        },
        // 处理单选切换筛选变化
        onRadioFilterChange(result) {
            this.radioFilterResult = result;
            console.log("单选切换筛选结果:", result);
        },
        // 格式化结果显示
        formatResult(result) {
            if (!result || Object.keys(result).length === 0) {
                return "无";
            }

            let text = "";

            // 处理普通筛选
            if (result.filter && Object.keys(result.filter).length > 0) {
                text += "普通筛选: " + JSON.stringify(result.filter);
            }

            // 处理抽屉筛选
            if (result.drawer && Object.keys(result.drawer).length > 0) {
                if (text) text += "; ";
                text += "抽屉筛选: " + JSON.stringify(result.drawer);
            }

            return text;
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
    margin-bottom: 32px;
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: #323233;
    margin: 16px 0;
    padding-left: 12px;
    position: relative;
}

.section-title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background-color: #007bff;
    border-radius: 2px;
}

.filter-content {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
}

.result-box {
    background-color: #fff;
    padding: 16px;
    border-top: 1px solid #f0f0f0;
}

.result-text {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    word-break: break-all;
}

.fixed-placeholder {
    height: 88px;
}
</style>
