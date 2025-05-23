<template>
    <view class="example-page">
        <view class="example-page__header">
            <image class="example-page__logo" src="@/static/logo.png" mode="aspectFit"></image>
            <text class="example-page__header-title">Fantastic UI</text>
            <text class="example-page__header-desc">现代、高效、美观的移动端组件库</text>
        </view>

        <!-- 基础组件 -->
        <fanc-cell-group title="基础组件" description="满足常见的界面交互需求" inset>
            <fanc-cell title="按钮" is-link url="/pages/example/button/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="square" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="图标" is-link url="/pages/example/icon/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="icons" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="单元格" is-link url="/pages/example/cell/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="table-cells" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="滑动单元格" is-link url="/pages/example/swipe-cell/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="arrows-left-right" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="复选框" is-link url="/pages/example/checkbox/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="check-square" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="单选框" is-link url="/pages/example/radio/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="dot-circle" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="搜索" is-link url="/pages/example/search/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="search" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="输入框" is-link url="/pages/example/field/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="keyboard" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="表单" is-link url="/pages/example/form/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="clipboard-list" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="级联选择" is-link url="/pages/example/cascader/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="sitemap" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="选择器" is-link url="/pages/example/picker/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="list-ul" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="数字键盘" is-link url="/pages/example/number-keyboard/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="calculator" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="步进器" is-link url="/pages/example/stepper/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="plus-minus" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="签名" is-link url="/pages/example/signature/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="signature" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 反馈组件 -->
        <fanc-cell-group title="反馈组件" description="提供操作反馈的交互组件" inset>
            <fanc-cell title="弹出层" is-link url="/pages/example/popup/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="layer-group" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="消息通知" is-link url="/pages/example/message/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="comment" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="动作面板" is-link url="/pages/example/action-sheet/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="list" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="轻提示" is-link url="/pages/example/toast/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="comment-dots" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="对话框" is-link url="/pages/example/dialog/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="comments" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 展示组件 -->
        <fanc-cell-group title="展示组件" description="用于内容展示的组件" inset>
            <fanc-cell title="公告栏" is-link url="/pages/example/noticebar/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="bell" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="弹出气泡" is-link url="/pages/example/popover/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="message" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="下拉菜单" is-link url="/pages/example/dropdown-menu/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="caret-down" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="图片" is-link url="/pages/example/image/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="image" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="日历" is-link url="/pages/example/calendar/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="calendar" size="18" color="#666666"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Fantastic UI",
            iconList: [
                // 基础图标
                "home",
                "user",
                "cog",
                "bell",
                "heart",
                "star",
                "check",
                "times",
                "search",
                "envelope",
                "phone",
                "lock",
                "unlock",
                "key",
                "link",
                // 文件相关
                "file",
                "folder",
                "folder-open",
                "file-pdf",
                "file-image",
                "file-alt",
                // 箭头
                "arrow-up",
                "arrow-down",
                "arrow-left",
                "arrow-right",
                "angle-up",
                "angle-down",
                "angle-left",
                "angle-right",
                // 媒体控制
                "play",
                "pause",
                "stop",
                "volume-up",
                "volume-down",
                "volume-mute",
                // 形状
                "circle",
                "square",
                "triangle",
                "pentagon",
                "hexagon",
                // 通信
                "comment",
                "comments",
                "message",
                "comment-dots",
                // 设备
                "laptop",
                "mobile",
                "tablet",
                "desktop",
                "camera",
                "headphones",
                // 图表
                "chart-bar",
                "chart-line",
                "chart-pie",
                "chart-area",
                // 网络
                "wifi",
                "signal",
                "globe",
                "cloud",
                "server",
                // 电商
                "shopping-cart",
                "gift",
                "tag",
                "barcode",
                "credit-card",
                // 编辑
                "edit",
                "copy",
                "paste",
                "cut",
                "trash",
                "save",
                // 互动
                "thumbs-up",
                "thumbs-down",
                "share",
                "bookmark",
                "flag",
            ],
        };
    },
    computed: {
        randomIcon() {
            return (index) => {
                return this.iconList[Math.floor(Math.random() * this.iconList.length)];
            };
        },
    },
    onLoad() {},
    methods: {},
};
</script>

<style lang="scss">
page {
    background-color: #f5f7fa;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --white: #ffffff;
    --border-color: #ebedf0;
    --black-300: #323233;
    --gray-500: #999999;
    --gray-600: #666666;
}

.example-page {
    padding: 20px 12px;
    padding-bottom: 32px;

    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 0;
        margin-bottom: 16px;
    }

    &__logo {
        width: 72px;
        height: 72px;
        margin-bottom: 12px;
    }

    &__header-title {
        font-size: 24px;
        font-weight: 600;
        color: #4a6cf7;
        margin-bottom: 6px;
    }

    &__header-desc {
        font-size: 14px;
        color: #666666;
        text-align: center;
    }
}

// 单元格组间距
::v-deep .fanc-cell-group {
    margin-bottom: 12px;
}

// 自定义组件图标
.component-icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f3f5;
    flex-shrink: 0;
}

// 调整单元格样式
::v-deep .fanc-cell {
    padding: 10px 12px;
    align-items: center; /* 确保单元格内容垂直居中 */
}

/* 调整icon容器 */
::v-deep .fanc-cell__icon {
    display: flex;
    align-items: center;
    height: 24px;
}

/* 调整单元格左侧内容布局 */
::v-deep .fanc-cell__left {
    display: flex;
    align-items: center;
}

::v-deep .fanc-cell-group__header {
    padding: 12px 12px 6px;
}

::v-deep .fanc-cell-group__title {
    font-size: 14px;
    font-weight: 500;
}

::v-deep .fanc-cell-group__description {
    font-size: 12px;
    color: #999;
}
</style>
