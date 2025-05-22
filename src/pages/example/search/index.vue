<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">搜索组件</text>
            <text class="example-page__header-desc">搜索组件用于展示搜索框，通常用于搜索场景</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">基础的搜索框用法，提供了左侧搜索图标。</view>
            <view class="example-section__content">
                <fanc-search v-model="value1" placeholder="请输入搜索关键词"></fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">搜索框形状</view>
            <view class="example-page__section-desc">搜索框支持圆形和方形两种样式。</view>
            <view class="example-section__content">
                <fanc-search
                    v-model="value2"
                    placeholder="圆形搜索框"
                    shape="round"
                    class="shape-demo"
                ></fanc-search>
                <fanc-search
                    v-model="value3"
                    placeholder="方形搜索框"
                    shape="square"
                    class="shape-demo"
                ></fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">显示标签文本</view>
            <view class="example-page__section-desc"
                >通过 label 属性可以在搜索框左侧显示文本标签。</view
            >
            <view class="example-section__content">
                <fanc-search
                    v-model="value4"
                    label="商品"
                    placeholder="请输入商品名称"
                ></fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">显示操作按钮</view>
            <view class="example-page__section-desc"
                >通过 showActionButton 属性可以在搜索框右侧显示"搜索"按钮。</view
            >
            <view class="example-section__content">
                <fanc-search
                    v-model="value5"
                    placeholder="请输入搜索内容"
                    showActionButton
                    @search="onSearch"
                >
                </fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义按钮文本</view>
            <view class="example-page__section-desc">可以通过 actionText 属性自定义按钮文本。</view>
            <view class="example-section__content">
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

        <view class="example-page__section">
            <view class="example-page__section-title">自定义图标</view>
            <view class="example-page__section-desc"
                >可以自定义左右图标，根据需求调整搜索框样式。</view
            >
            <view class="example-section__content">
                <fanc-search
                    v-model="value7"
                    leftIcon="map-marker-alt"
                    placeholder="搜索地点"
                    class="icon-demo"
                >
                </fanc-search>
                <fanc-search
                    v-model="value8"
                    leftIcon="user"
                    rightIcon="qrcode"
                    placeholder="搜索用户"
                    @right-icon-click="onRightIconClick"
                    class="icon-demo"
                >
                </fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">禁用状态</view>
            <view class="example-page__section-desc"
                >通过 disabled 属性可以将搜索框设置为禁用状态。</view
            >
            <view class="example-section__content">
                <fanc-search v-model="value9" disabled placeholder="禁用状态的搜索框">
                </fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">事件监听</view>
            <view class="example-page__section-desc"
                >搜索组件提供了多种事件，包括输入、清除、搜索等。</view
            >
            <view class="example-section__content">
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
                <view class="event-result" v-if="eventResult">
                    <text>事件类型：{{ eventResult.type }}</text>
                    <text v-if="eventResult.value !== undefined">值：{{ eventResult.value }}</text>
                </view>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义背景色</view>
            <view class="example-page__section-desc"
                >可以通过 background 属性自定义搜索框的背景颜色。</view
            >
            <view class="example-section__content">
                <fanc-search v-model="value11" placeholder="自定义背景色" background="#f0f9ff">
                </fanc-search>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">输入框对齐方式</view>
            <view class="example-page__section-desc"
                >通过 align 属性可以设置输入框内容的对齐方式。</view
            >
            <view class="example-section__content">
                <fanc-search
                    v-model="value12"
                    placeholder="左对齐(默认)"
                    align="left"
                    class="align-demo"
                >
                </fanc-search>
                <fanc-search
                    v-model="value13"
                    placeholder="居中对齐"
                    align="center"
                    class="align-demo"
                >
                </fanc-search>
                <fanc-search
                    v-model="value14"
                    placeholder="右对齐"
                    align="right"
                    class="align-demo"
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

<style lang="scss" scoped>
.example-section__content {
    padding: 16px;
    background-color: #f6f6f6;
    border-radius: 8px;
}

.shape-demo {
    margin-bottom: 16px;
}

.icon-demo {
    margin-bottom: 16px;
}

.align-demo {
    margin-bottom: 16px;
}

.event-result {
    margin-top: 12px;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    border-left: 3px solid #007bff;

    text {
        display: block;
        font-size: 14px;
        color: #343a40;
        line-height: 1.5;
    }
}
</style>
