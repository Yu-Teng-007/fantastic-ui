<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">下拉菜单栏</text>
            <text class="example-page__header-desc">用于在页面中展示多个菜单选项，支持横向滑动和下拉选择</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">基础的下拉菜单栏用法，展示多个筛选条件</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="basicOptions"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义默认值</view>
            <view class="example-page__section-desc">可以通过默认值配置初始选中的选项</view>
            <view class="example-page__content">
                <fanc-dropdown-menu
                    :options="basicOptions"
                    :defaultValues="['zhejiang', 'noodles']"
                ></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">禁用菜单</view>
            <view class="example-page__section-desc">可以禁用特定的菜单项</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="disabledOptions"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">向上展开</view>
            <view class="example-page__section-desc">菜单可以向上展开，适合固定在页面底部的场景</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="basicOptions" direction="up"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">不显示遮罩层</view>
            <view class="example-page__section-desc">可以配置不显示遮罩层，允许同时操作页面其他内容</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="basicOptions" :overlay="false"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">横向滑动</view>
            <view class="example-page__section-desc">当菜单项较多时，支持横向滑动菜单栏</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="manyOptions"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义排序</view>
            <view class="example-page__section-desc">支持自定义排序下拉选项</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="sortableOptions" :sortFunction="sortByName"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义选中态颜色</view>
            <view class="example-page__section-desc">可以自定义选中状态的颜色，搭配不同风格的页面</view>
            <view class="example-page__content">
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
                <fanc-dropdown-menu :options="basicOptions" active-color="#ff8f00"></fanc-dropdown-menu>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">事件监听</view>
            <view class="example-page__section-desc">监听菜单栏的选择事件</view>
            <view class="example-page__content">
                <fanc-dropdown-menu :options="basicOptions" @select="onSelect"></fanc-dropdown-menu>
                <view v-if="selectedText" class="example-page__result"> 当前选择: {{ selectedText }} </view>
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

<style lang="scss" scoped></style>
