<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">级联选择</text>
            <text class="example-page__header-desc"
                >用于从一组相关联的数据集合中进行选择，常用于省市区地址选择</text
            >
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc"
                >基础的级联选择用法，选择最后一级会自动确认并关闭</view
            >
            <view class="example-page__content">
                <fanc-cell
                    :content="basicSelectedText || '请选择'"
                    title="地区"
                    is-link
                    @click="showBasicCascader = true"
                />

                <fanc-cascader
                    v-model="showBasicCascader"
                    :options="addressOptions"
                    @finish="onBasicFinish"
                >
                </fanc-cascader>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">垂直布局</view>
            <view class="example-page__section-desc">选项卡在左侧垂直布局，适合分类较多的场景</view>
            <view class="example-page__content">
                <fanc-cell
                    :content="verticalSelectedText || '请选择'"
                    title="地区"
                    is-link
                    @click="showVerticalCascader = true"
                />

                <fanc-cascader
                    v-model="showVerticalCascader"
                    :options="addressOptions"
                    mode="vertical"
                    @finish="onVerticalFinish"
                >
                </fanc-cascader>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义标题</view>
            <view class="example-page__section-desc">可以自定义顶部标题文字</view>
            <view class="example-page__content">
                <fanc-cell
                    :content="customTitleSelectedText || '请选择'"
                    title="收货地址"
                    is-link
                    @click="showCustomTitleCascader = true"
                />

                <fanc-cascader
                    v-model="showCustomTitleCascader"
                    :options="addressOptions"
                    title="选择您的收货地址"
                    @finish="onCustomTitleFinish"
                >
                </fanc-cascader>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义按钮文字</view>
            <view class="example-page__section-desc">可以自定义确认和取消按钮的文字</view>
            <view class="example-page__content">
                <fanc-cell
                    :content="customButtonSelectedText || '请选择'"
                    title="地址"
                    is-link
                    @click="showCustomButtonCascader = true"
                />

                <fanc-cascader
                    v-model="showCustomButtonCascader"
                    :options="addressOptions"
                    confirm-text="完成"
                    cancel-text="返回"
                    @finish="onCustomButtonFinish"
                >
                </fanc-cascader>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">默认选中值</view>
            <view class="example-page__section-desc">可以指定默认选中的选项</view>
            <view class="example-page__content">
                <fanc-cell
                    :content="defaultValueSelectedText"
                    title="默认地址"
                    is-link
                    @click="showDefaultValueCascader = true"
                />

                <fanc-cascader
                    v-model="showDefaultValueCascader"
                    :options="addressOptions"
                    :default-value="defaultSelectedValue"
                    @finish="onDefaultValueFinish"
                >
                </fanc-cascader>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">无头部样式</view>
            <view class="example-page__section-desc"
                >可以隐藏顶部标题栏，适用于自定义头部的场景，选择最后一级仍会自动关闭</view
            >
            <view class="example-page__content">
                <fanc-cell
                    :content="noHeaderSelectedResult || '请选择'"
                    title="地址选择"
                    is-link
                    @click="showNoHeaderCascaderWithHeader = true"
                />

                <view class="custom-cascader-outer">
                    <fanc-cascader
                        v-model="showNoHeaderCascaderWithHeader"
                        :options="addressOptions"
                        :show-header="false"
                        @pathSelected="onNoHeaderPathSelected"
                        @update:show="onNoHeaderPopupChange"
                    >
                    </fanc-cascader>
                </view>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义颜色</view>
            <view class="example-page__section-desc">可以自定义选中状态的颜色</view>
            <view class="example-page__content">
                <fanc-cell
                    :content="customColorSelectedText || '请选择'"
                    title="地址"
                    is-link
                    @click="showCustomColorCascader = true"
                    custom-class="custom-color-cell"
                />

                <fanc-cascader
                    v-model="showCustomColorCascader"
                    :options="addressOptions"
                    active-color="#ff5722"
                    @finish="onCustomColorFinish"
                >
                </fanc-cascader>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">选项变化事件</view>
            <view class="example-page__section-desc"
                >监听选项变化事件，并在选择完成路径时自动关闭</view
            >
            <view class="example-page__content">
                <fanc-cell
                    :content="eventSelectedText || '请选择'"
                    title="地址"
                    is-link
                    @click="showEventCascader = true"
                />

                <fanc-cascader
                    v-model="showEventCascader"
                    :options="addressOptions"
                    @change="onEventChange"
                    @finish="onEventFinish"
                >
                </fanc-cascader>

                <view v-if="currentChangeValue" class="result-display">
                    <text>当前选择: {{ currentChangeValue }}</text>
                </view>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">弹出位置</view>
            <view class="example-page__section-desc">可以设置从中心弹出</view>
            <view class="example-page__content">
                <fanc-cell
                    :content="centerSelectedText || '请选择'"
                    title="地址"
                    is-link
                    center
                    @click="showCenterCascader = true"
                />

                <fanc-cascader
                    v-model="showCenterCascader"
                    :options="addressOptions"
                    position="center"
                    @finish="onCenterFinish"
                >
                </fanc-cascader>

                <view v-if="centerSelectedText" class="result-display">
                    <text>已选择: {{ centerSelectedText }}</text>
                </view>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">完全自定义</view>
            <view class="example-page__section-desc">可以自定义弹窗的各种属性</view>
            <view class="example-page__content">
                <fanc-cell
                    content="完全自定义弹窗"
                    title="高级选项"
                    is-link
                    large
                    icon="settings-o"
                    @click="showCustomCascader = true"
                />

                <fanc-cascader
                    v-model="showCustomCascader"
                    :options="addressOptions"
                    position="bottom"
                    title="自定义级联选择器"
                    :round="true"
                    :closeable="true"
                    :z-index="2000"
                    :overlay-closable="false"
                    active-color="#8e44ad"
                    custom-class="custom-cascader"
                    @finish="onCustomFinish"
                >
                </fanc-cascader>

                <view v-if="customSelectedText" class="result-display">
                    <text>已选择: {{ customSelectedText }}</text>
                </view>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">垂直布局 + 自定义颜色</view>
            <view class="example-page__section-desc"
                >垂直布局结合自定义颜色，适合分类较多的场景</view
            >
            <view class="example-page__content">
                <fanc-cell
                    :content="verticalColorSelectedText || '请选择'"
                    title="分类选择"
                    is-link
                    @click="showVerticalColorCascader = true"
                />

                <fanc-cascader
                    v-model="showVerticalColorCascader"
                    :options="addressOptions"
                    mode="vertical"
                    active-color="#e324a7"
                    @finish="onVerticalColorFinish"
                >
                </fanc-cascader>

                <view v-if="verticalColorSelectedText" class="result-display">
                    <text>已选择: {{ verticalColorSelectedText }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 弹窗显示状态
            showBasicCascader: false,
            showVerticalCascader: false,
            showCustomTitleCascader: false,
            showCustomButtonCascader: false,
            showDefaultValueCascader: false,
            showNoHeaderCascader: false,
            showNoHeaderCascaderWithHeader: false,
            showCustomColorCascader: false,
            showEventCascader: false,
            showCenterCascader: false,
            showCustomCascader: false,
            showVerticalColorCascader: false,

            // 选中结果文本
            basicSelectedText: "",
            verticalSelectedText: "",
            customTitleSelectedText: "",
            customButtonSelectedText: "",
            defaultValueSelectedText: "广东省 - 深圳市 - 南山区",
            noHeaderSelectedText: "",
            customColorSelectedText: "",
            eventSelectedText: "",
            currentChangeValue: "",
            centerSelectedText: "",
            customSelectedText: "",
            verticalColorSelectedText: "",

            // 默认选中值
            defaultSelectedValue: ["guangdong", "shenzhen", "nanshan"],

            // 临时存储无头部选择器结果
            noHeaderSelectedResult: null,

            // 级联选择数据
            addressOptions: [
                {
                    text: "北京市",
                    value: "beijing",
                    children: [
                        {
                            text: "北京市",
                            value: "beijing_city",
                            children: [
                                { text: "东城区", value: "dongcheng" },
                                { text: "西城区", value: "xicheng" },
                                { text: "朝阳区", value: "chaoyang" },
                                { text: "海淀区", value: "haidian" },
                                { text: "丰台区", value: "fengtai" },
                            ],
                        },
                    ],
                },
                {
                    text: "上海市",
                    value: "shanghai",
                    children: [
                        {
                            text: "上海市",
                            value: "shanghai_city",
                            children: [
                                { text: "黄浦区", value: "huangpu" },
                                { text: "徐汇区", value: "xuhui" },
                                { text: "长宁区", value: "changning" },
                                { text: "静安区", value: "jingan" },
                                { text: "普陀区", value: "putuo" },
                            ],
                        },
                    ],
                },
                {
                    text: "广东省",
                    value: "guangdong",
                    children: [
                        {
                            text: "广州市",
                            value: "guangzhou",
                            children: [
                                { text: "天河区", value: "tianhe" },
                                { text: "白云区", value: "baiyun" },
                                { text: "越秀区", value: "yuexiu" },
                                { text: "海珠区", value: "haizhu" },
                                { text: "番禺区", value: "panyu" },
                            ],
                        },
                        {
                            text: "深圳市",
                            value: "shenzhen",
                            children: [
                                { text: "福田区", value: "futian" },
                                { text: "罗湖区", value: "luohu" },
                                { text: "南山区", value: "nanshan" },
                                { text: "宝安区", value: "baoan" },
                                { text: "龙岗区", value: "longgang" },
                            ],
                        },
                        {
                            text: "东莞市",
                            value: "dongguan",
                            children: [
                                { text: "莞城街道", value: "guancheng" },
                                { text: "东城街道", value: "dongcheng" },
                                { text: "南城街道", value: "nancheng" },
                                { text: "万江街道", value: "wanjiang" },
                            ],
                        },
                    ],
                },
                {
                    text: "浙江省",
                    value: "zhejiang",
                    children: [
                        {
                            text: "杭州市",
                            value: "hangzhou",
                            children: [
                                { text: "西湖区", value: "xihu" },
                                { text: "上城区", value: "shangcheng" },
                                { text: "下城区", value: "xiacheng" },
                                { text: "余杭区", value: "yuhang" },
                                { text: "滨江区", value: "binjiang" },
                            ],
                        },
                        {
                            text: "宁波市",
                            value: "ningbo",
                            children: [
                                { text: "海曙区", value: "haishu" },
                                { text: "江北区", value: "jiangbei" },
                                { text: "鄞州区", value: "yinzhou" },
                                { text: "镇海区", value: "zhenhai" },
                            ],
                        },
                    ],
                },
                {
                    text: "四川省",
                    value: "sichuan",
                    children: [
                        {
                            text: "成都市",
                            value: "chengdu",
                            children: [
                                { text: "武侯区", value: "wuhou" },
                                { text: "锦江区", value: "jinjiang" },
                                { text: "青羊区", value: "qingyang" },
                                { text: "金牛区", value: "jinniu" },
                                { text: "成华区", value: "chenghua" },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        formatSelectedText(result) {
            return result.texts.join(" - ");
        },

        // 基础用法回调
        onBasicFinish(result) {
            console.log("基础用法选择结果:", result);
            this.basicSelectedText = this.formatSelectedText(result);
        },

        // 垂直布局回调
        onVerticalFinish(result) {
            console.log("垂直布局选择结果:", result);
            this.verticalSelectedText = this.formatSelectedText(result);
        },

        // 自定义标题回调
        onCustomTitleFinish(result) {
            console.log("自定义标题选择结果:", result);
            this.customTitleSelectedText = this.formatSelectedText(result);
        },

        // 自定义按钮文字回调
        onCustomButtonFinish(result) {
            console.log("自定义按钮文字选择结果:", result);
            this.customButtonSelectedText = this.formatSelectedText(result);
        },

        // 默认选中回调
        onDefaultValueFinish(result) {
            console.log("默认选中选择结果:", result);
            this.defaultValueSelectedText = this.formatSelectedText(result);
        },

        // 无头部回调
        onNoHeaderPathSelected(result) {
            console.log("无头部选择中结果:", result);
            this.noHeaderSelectedResult = this.formatSelectedText(result);
        },

        // 处理级联选择器弹窗状态变化
        onNoHeaderPopupChange(val) {
            console.log("无头部选择器弹窗状态变化:", val);
            // 同步自定义头部弹窗状态
            this.showNoHeaderCascader = val;
        },

        // 无头部确认
        onNoHeaderConfirm() {
            if (this.noHeaderSelectedResult) {
                this.noHeaderSelectedText = this.formatSelectedText(this.noHeaderSelectedResult);
            }
            this.showNoHeaderCascader = false;
            // 关闭内部级联选择器
            this.showNoHeaderCascaderWithHeader = false;
        },

        // 自定义颜色回调
        onCustomColorFinish(result) {
            console.log("自定义颜色选择结果:", result);
            this.customColorSelectedText = this.formatSelectedText(result);
        },

        // 事件监听回调
        onEventChange(result) {
            console.log("选择变化:", result);
            // 显示当前层级的选中项
            this.currentChangeValue = `${result.tabIndex + 1}级: ${result.value}`;
        },

        // 事件完成回调
        onEventFinish(result) {
            console.log("选择完成:", result);
            this.eventSelectedText = this.formatSelectedText(result);
        },

        // 从中心弹出的级联选择器完成回调
        onCenterFinish(data) {
            this.centerSelectedText = data.texts.join(" / ");
        },

        // 完全自定义的级联选择器完成回调
        onCustomFinish(data) {
            this.customSelectedText = data.texts.join(" / ");
        },

        // 垂直布局 + 自定义颜色回调
        onVerticalColorFinish(data) {
            this.verticalColorSelectedText = data.texts.join(" / ");
        },
    },
};
</script>

<style lang="scss" scoped>
// 结果显示样式
.result-display {
    margin-top: 24rpx;
    padding: 24rpx;
    background-color: #f8f9fa;
    border-radius: 8rpx;
    font-size: 28rpx;
}
</style>
