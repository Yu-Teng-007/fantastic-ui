<template>
    <view class="example-container">
        <view class="example-title">
            <text class="example-title__text">文本省略</text>
            <text class="example-title__desc">用于长文本内容的展开收起交互</text>
        </view>

        <view class="example-section">
            <view class="example-section__title">基础用法</view>
            <view class="example-section__content">
                <fanc-text-ellipsis :text="shortText" :rows="2"></fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">默认展开</view>
            <view class="example-section__content">
                <fanc-text-ellipsis :text="longText" :default-expanded="true"></fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">自定义行数</view>
            <view class="example-section__content">
                <fanc-text-ellipsis :text="longText" :rows="4"></fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">自定义按钮文本</view>
            <view class="example-section__content">
                <fanc-text-ellipsis
                    :text="longText"
                    expand-text="查看更多"
                    collapse-text="收起内容"
                >
                </fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">不显示图标</view>
            <view class="example-section__content">
                <fanc-text-ellipsis :text="longText" :show-icon="false"></fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">自定义样式</view>
            <view class="example-section__content">
                <fanc-text-ellipsis
                    :text="longText"
                    font-size="16px"
                    line-height="1.8"
                    text-color="#333333"
                    trigger-color="#ff6600"
                >
                </fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">使用插槽</view>
            <view class="example-section__content">
                <fanc-text-ellipsis :rows="3">
                    <view>
                        <text>这是通过</text>
                        <text style="color: #ff6600; font-weight: bold">插槽</text>
                        <text>传入的内容，可以包含</text>
                        <text style="color: #007bff; text-decoration: underline"
                            >复杂的HTML结构</text
                        >
                        <text>，比如加粗、颜色、下划线等样式。{{ longText }}</text>
                    </view>
                </fanc-text-ellipsis>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">监听展开/收起事件</view>
            <view class="example-section__content">
                <fanc-text-ellipsis :text="longText" @toggle="onToggle"> </fanc-text-ellipsis>
                <view class="toggle-status"> 当前状态: {{ toggleStatus }} </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            shortText:
                "这是一段较短的文本，主要用于测试当文本内容较少时是否会显示展开按钮。根据设计，当文本内容不足以超过指定的行数限制时，展开按钮应该自动隐藏。",
            longText:
                '这是一段很长的文本内容，用于测试文本省略组件的展开收起功能。当文本内容超过指定的行数限制时，多余的部分会被省略，并显示一个"展开"按钮。点击"展开"按钮后，所有内容都会显示出来，同时按钮文本变为"收起"。再次点击"收起"按钮，文本会回到省略状态。这种交互方式适用于文章摘要、商品描述、评论内容等场景，可以帮助用户在浏览大量内容时快速获取信息，同时也能在需要时查看完整内容。文本省略组件还支持自定义行数、自定义展开收起按钮文本、自定义样式等功能，可以灵活适应不同的设计需求。在移动端应用中，由于屏幕空间有限，合理使用文本省略可以优化用户界面，提升用户体验。此外，组件还支持通过插槽传入复杂的HTML结构，满足更加丰富的展示需求。',
            toggleStatus: "未展开",
        };
    },
    methods: {
        onToggle(expanded) {
            this.toggleStatus = expanded ? "已展开" : "已收起";
            this.$toast.text(`文本已${expanded ? "展开" : "收起"}`);
        },
    },
};
</script>

<style>
.example-container {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.example-title {
    margin-bottom: 20px;
}

.example-title__text {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 8px;
}

.example-title__desc {
    font-size: 14px;
    color: #666;
    display: block;
}

.example-section {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.example-section__title {
    font-size: 16px;
    color: #333;
    padding: 16px;
    border-bottom: 1px solid #eee;
    font-weight: 500;
}

.example-section__content {
    padding: 16px;
}

.toggle-status {
    margin-top: 12px;
    font-size: 14px;
    color: #666;
    background-color: #f8f8f8;
    padding: 8px 12px;
    border-radius: 4px;
}
</style>
