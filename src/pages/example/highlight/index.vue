<template>
    <view class="container">
        <view class="header">
            <view class="title">高亮文本</view>
            <view class="subtitle">高亮显示指定文本内容，适用于搜索结果、重要提示等场景</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-highlight>这是一段普通文本</fanc-highlight>
            </view>
        </view>

        <!-- 关键词高亮 -->
        <view class="section">
            <view class="section-title">关键词高亮</view>
            <view class="demo-block">
                <fanc-highlight
                    text="这是一段包含关键词的文本内容"
                    keywords="关键词"
                ></fanc-highlight>
            </view>
        </view>

        <!-- 多关键词高亮 -->
        <view class="section">
            <view class="section-title">多关键词高亮</view>
            <view class="demo-block">
                <fanc-highlight
                    text="这是一段包含多个关键词的长文本内容，可以同时高亮多个不同的关键词"
                    :keywords="['关键词', '高亮', '文本']"
                >
                </fanc-highlight>
            </view>
        </view>

        <!-- 不同类型 -->
        <view class="section">
            <view class="section-title">不同类型（带背景色）</view>
            <view class="demo-block">
                <view class="demo-row">
                    <fanc-highlight type="primary" :hasBackground="true">主要类型</fanc-highlight>
                </view>
                <view class="demo-row">
                    <fanc-highlight type="success" :hasBackground="true">成功类型</fanc-highlight>
                </view>
                <view class="demo-row">
                    <fanc-highlight type="warning" :hasBackground="true">警告类型</fanc-highlight>
                </view>
                <view class="demo-row">
                    <fanc-highlight type="danger" :hasBackground="true">危险类型</fanc-highlight>
                </view>
                <view class="demo-row">
                    <fanc-highlight type="info" :hasBackground="true">信息类型</fanc-highlight>
                </view>
            </view>
        </view>

        <!-- 圆角样式 -->
        <view class="section">
            <view class="section-title">圆角样式（带背景色）</view>
            <view class="demo-block">
                <view class="demo-row">
                    <fanc-highlight type="primary" :hasBackground="true" round
                        >圆角主要类型</fanc-highlight
                    >
                </view>
                <view class="demo-row">
                    <fanc-highlight type="success" :hasBackground="true" round
                        >圆角成功类型</fanc-highlight
                    >
                </view>
                <view class="demo-row">
                    <fanc-highlight type="warning" :hasBackground="true" round
                        >圆角警告类型</fanc-highlight
                    >
                </view>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色（带背景色）</view>
            <view class="demo-block">
                <view class="demo-row">
                    <fanc-highlight color="#8e44ad" backgroundColor="#f5e6ff"
                        >自定义紫色</fanc-highlight
                    >
                </view>
                <view class="demo-row">
                    <fanc-highlight color="#e67e22" backgroundColor="#fff5e6"
                        >自定义橙色</fanc-highlight
                    >
                </view>
                <view class="demo-row">
                    <fanc-highlight color="#2ecc71" backgroundColor="#e6fff0"
                        >自定义绿色</fanc-highlight
                    >
                </view>
            </view>
        </view>

        <!-- 自定义关键词样式 -->
        <view class="section">
            <view class="section-title">自定义关键词样式</view>
            <view class="demo-block">
                <view class="demo-row">
                    <fanc-highlight
                        text="这是一段包含自定义关键词样式的文本"
                        keywords="自定义关键词"
                        keywordColor="#ffffff"
                        keywordBackgroundColor="#ff5252"
                    >
                    </fanc-highlight>
                </view>
                <view class="demo-row">
                    <fanc-highlight
                        text="这是一段包含不加粗关键词的文本"
                        keywords="不加粗"
                        :bold="false"
                        keywordColor="#2196f3"
                    >
                    </fanc-highlight>
                </view>
            </view>
        </view>

        <!-- 带背景与不带背景对比 -->
        <view class="section">
            <view class="section-title">带背景与不带背景对比</view>
            <view class="demo-block">
                <view class="demo-row">
                    <fanc-highlight
                        text="这是一段默认只高亮关键词的文本"
                        keywords="关键词"
                    ></fanc-highlight>
                </view>
                <view class="demo-row">
                    <fanc-highlight
                        text="这是一段带背景色且高亮关键词的文本"
                        keywords="关键词"
                        :hasBackground="true"
                        type="primary"
                    ></fanc-highlight>
                </view>
            </view>
        </view>

        <!-- 搜索结果示例 -->
        <view class="section">
            <view class="section-title">搜索结果示例</view>
            <view class="demo-block search-demo">
                <view class="search-input">
                    <fanc-field
                        v-model="searchKeyword"
                        placeholder="请输入搜索关键词"
                        clearable
                        @confirm="handleSearch"
                    >
                        <template #right-icon>
                            <fanc-icon name="search" size="20" @click="handleSearch"></fanc-icon>
                        </template>
                    </fanc-field>
                </view>
                <view class="search-results">
                    <!-- 搜索结果 -->
                    <template v-if="searchKeyword && searchResults.length > 0">
                        <view
                            class="search-result-item"
                            v-for="(item, index) in searchResults"
                            :key="`search-${index}`"
                        >
                            <fanc-highlight
                                :text="item.content"
                                :keywords="searchKeyword"
                            ></fanc-highlight>
                        </view>
                    </template>

                    <!-- 无搜索结果 -->
                    <view
                        v-else-if="searchKeyword && searchResults.length === 0"
                        class="search-empty"
                    >
                        没有找到匹配的结果
                    </view>

                    <!-- 默认展示所有数据 -->
                    <template v-else>
                        <view
                            class="search-result-item"
                            v-for="(item, index) in mockData"
                            :key="`mock-${index}`"
                        >
                            {{ item.content }}
                        </view>
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            searchKeyword: "",
            searchResults: [],
            mockData: [
                { id: 1, content: "高亮文本组件是一个非常实用的 UI 组件" },
                { id: 2, content: "可以用于搜索结果中显示匹配的关键词" },
                { id: 3, content: "支持多个关键词同时高亮显示" },
                { id: 4, content: "高亮文本可以设置不同的颜色样式" },
                { id: 5, content: "用户界面中突出显示重要信息可以提升用户体验" },
                { id: 6, content: "组件库中的文本高亮组件通常支持自定义样式" },
            ],
        };
    },
    methods: {
        handleSearch() {
            if (!this.searchKeyword) {
                this.searchResults = [];
                return;
            }

            // 模拟搜索
            this.searchResults = this.mockData.filter((item) =>
                item.content.toLowerCase().includes(this.searchKeyword.toLowerCase())
            );

            // 确保搜索结果有效
            if (this.searchResults.length === 0) {
                // 无搜索结果时显示提示
                uni.showToast({
                    title: "没有找到匹配的结果",
                    icon: "none",
                });
            }
        },
    },
    mounted() {
        console.log("组件已挂载，mockData:", this.mockData);
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

.demo-block {
    padding: 16px;
}

.demo-row {
    margin-bottom: 12px;
}

.demo-row:last-child {
    margin-bottom: 0;
}

.search-demo {
    display: flex;
    flex-direction: column;
}

.search-input {
    margin-bottom: 16px;
}

.search-results {
    min-height: 120px;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    padding: 12px;
}

.search-result-item {
    padding: 8px 0;
    border-bottom: 1px solid #f2f2f2;
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-empty,
.search-placeholder {
    text-align: center;
    color: #969799;
    padding: 24px 0;
}
</style>
