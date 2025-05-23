<template>
    <view class="container">
        <view class="header">
            <view class="title">下拉菜单栏</view>
            <view class="subtitle">用于在页面中展示多个菜单选项，支持横向滑动和下拉选择</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-dropdown-menu :options="basicOptions"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义默认值</view>
            <view class="section-content">
                <fanc-dropdown-menu
                    :options="basicOptions"
                    :defaultValues="['zhejiang', 'noodles']"
                ></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">禁用菜单</view>
            <view class="section-content">
                <fanc-dropdown-menu :options="disabledOptions"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">向上展开</view>
            <view class="section-content">
                <fanc-dropdown-menu :options="basicOptions" direction="up"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">不显示遮罩层</view>
            <view class="section-content">
                <fanc-dropdown-menu :options="basicOptions" :overlay="false"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">横向滑动</view>
            <view class="section-content">
                <fanc-dropdown-menu :options="manyOptions"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义排序</view>
            <view class="section-content">
                <fanc-dropdown-menu
                    :options="sortableOptions"
                    :sortFunction="sortByName"
                ></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义选中态颜色</view>
            <view class="section-content">
                <fanc-dropdown-menu
                    :options="basicOptions"
                    active-color="#ff4757"
                    style="margin-bottom: 16px"
                ></fanc-dropdown-menu>
                <fanc-dropdown-menu
                    :options="basicOptions"
                    active-color="#2ed573"
                    style="margin-bottom: 16px"
                ></fanc-dropdown-menu>
                <fanc-dropdown-menu
                    :options="basicOptions"
                    active-color="#ff8f00"
                ></fanc-dropdown-menu>
            </view>
        </view>

        <view class="section">
            <view class="section-title">事件监听</view>
            <view class="section-content">
                <fanc-dropdown-menu :options="basicOptions" @select="onSelect"></fanc-dropdown-menu>
                <view v-if="selectedText" class="result-box"> 当前选择: {{ selectedText }} </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            selectedText: "",
            basicOptions: [
                {
                    title: "省份",
                    options: [
                        { text: "浙江省", value: "zhejiang" },
                        { text: "江苏省", value: "jiangsu" },
                        { text: "湖北省", value: "hubei" },
                        { text: "四川省", value: "sichuan" },
                        { text: "广东省", value: "guangdong" },
                        { text: "湖南省", value: "hunan" },
                        { text: "山东省", value: "shandong" },
                        { text: "陕西省", value: "shanxi" },
                        { text: "河南省", value: "henan" },
                        { text: "河北省", value: "hebei" },
                        { text: "北京市", value: "beijing" },
                        { text: "上海市", value: "shanghai" },
                        { text: "天津市", value: "tianjin" },
                    ],
                },
                {
                    title: "食物",
                    options: [
                        { text: "全部食物", value: "all" },
                        { text: "麻辣烫", value: "spicy" },
                        { text: "面条", value: "noodles" },
                        { text: "米饭", value: "rice" },
                        { text: "炒菜", value: "fry" },
                    ],
                },
            ],
            disabledOptions: [
                {
                    title: "省份",
                    options: [
                        { text: "浙江省", value: "zhejiang" },
                        { text: "江苏省", value: "jiangsu" },
                        { text: "湖北省", value: "hubei" },
                    ],
                },
                {
                    title: "食物",
                    disabled: true,
                    options: [
                        { text: "全部食物", value: "all" },
                        { text: "麻辣烫", value: "spicy" },
                        { text: "面条", value: "noodles" },
                    ],
                },
            ],
            manyOptions: [
                {
                    title: "省份",
                    options: [
                        { text: "浙江省", value: "zhejiang" },
                        { text: "江苏省", value: "jiangsu" },
                        { text: "湖北省", value: "hubei" },
                    ],
                },
                {
                    title: "食物",
                    options: [
                        { text: "全部食物", value: "all" },
                        { text: "麻辣烫", value: "spicy" },
                        { text: "面条", value: "noodles" },
                    ],
                },
                {
                    title: "季节",
                    options: [
                        { text: "春天", value: "spring" },
                        { text: "夏天", value: "summer" },
                        { text: "秋天", value: "autumn" },
                        { text: "冬天", value: "winter" },
                    ],
                },
                {
                    title: "颜色",
                    options: [
                        { text: "红色", value: "red" },
                        { text: "绿色", value: "green" },
                        { text: "蓝色", value: "blue" },
                        { text: "黄色", value: "yellow" },
                    ],
                },
                {
                    title: "爱好",
                    options: [
                        { text: "阅读", value: "reading" },
                        { text: "游泳", value: "swimming" },
                        { text: "跑步", value: "running" },
                        { text: "旅行", value: "travel" },
                    ],
                },
            ],
            sortableOptions: [
                {
                    title: "排序菜单",
                    options: [
                        { text: "香蕉", value: "banana" },
                        { text: "苹果", value: "apple" },
                        { text: "橙子", value: "orange" },
                        { text: "葡萄", value: "grape" },
                        { text: "西瓜", value: "watermelon" },
                    ],
                },
            ],
        };
    },
    methods: {
        onSelect(event) {
            console.log("选中项:", event);
            // 查找选中的文本
            const { menuIndex, value, text } = event;
            if (this.basicOptions[menuIndex]) {
                this.selectedText = `${this.basicOptions[menuIndex].title}: ${text}`;
            }
        },

        // 自定义排序函数
        sortByName(options) {
            return [...options].sort((a, b) => a.text.localeCompare(b.text));
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
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
}

.section-content {
    padding: 16px;
}

.result-box {
    margin-top: 16px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
    font-size: 14px;
    color: #323233;
}
</style>
