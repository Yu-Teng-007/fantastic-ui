<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">Fantastic UI 组件示例</text>
            <text class="example-page__header-desc">现代、高效、美观的移动端 UI 组件库</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础组件</view>
            <view class="example-page__section-desc">提供丰富的基础 UI 组件，满足常见的界面交互需求</view>
            <view class="example-page__card-grid">
                <navigator url="/pages/button-example/button-example" class="component-card">
                    <view class="component-card__icon button-icon"></view>
                    <text class="component-card__name">按钮</text>
                </navigator>
                <navigator url="/pages/icon-example/icon-example" class="component-card">
                    <view class="component-card__icon icon-demo-icon"></view>
                    <text class="component-card__name">图标</text>
                </navigator>
                <navigator url="/pages/cell-example/index" class="component-card">
                    <view class="component-card__icon cell-icon"></view>
                    <text class="component-card__name">单元格</text>
                </navigator>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">反馈组件</view>
            <view class="example-page__section-desc">用于向用户提供操作反馈的组件</view>
            <view class="example-page__card-grid">
                <navigator url="/pages/popup-example/index" class="component-card">
                    <view class="component-card__icon popup-icon"></view>
                    <text class="component-card__name">弹出层</text>
                </navigator>
                <navigator url="/pages/message-example/index" class="component-card">
                    <view class="component-card__icon message-icon"></view>
                    <text class="component-card__name">消息通知</text>
                </navigator>
                <navigator url="/pages/action-sheet-example/index" class="component-card">
                    <view class="component-card__icon action-sheet-icon"></view>
                    <text class="component-card__name">动作面板</text>
                </navigator>
                <navigator url="/pages/toast-example/index" class="component-card">
                    <view class="component-card__icon toast-icon"></view>
                    <text class="component-card__name">轻提示</text>
                </navigator>
                <navigator url="/pages/dialog-example/index" class="component-card">
                    <view class="component-card__icon dialog-icon"></view>
                    <text class="component-card__name">对话框</text>
                </navigator>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">展示组件</view>
            <view class="example-page__section-desc">用于展示内容的组件</view>
            <view class="example-page__card-grid">
                <navigator url="/pages/noticebar-example/index" class="component-card">
                    <view class="component-card__icon noticebar-icon"></view>
                    <text class="component-card__name">公告栏</text>
                </navigator>
                <navigator url="/pages/popover-example/index" class="component-card">
                    <view class="component-card__icon popover-icon"></view>
                    <text class="component-card__name">弹出气泡</text>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Fantastic UI",
        };
    },
    onLoad() {},
    methods: {},
};
</script>

<style lang="scss">
.example-page {
    &__card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 16px;
        padding: 8px 0;
    }
}

.component-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    &__icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: center;
    }

    &__name {
        font-size: 14px;
        color: #323233;
        font-weight: 500;
    }
}

// 组件图标样式
.button-icon {
    background-color: #007bff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3Cpath d='M7 12h10v2H7z'/%3E%3C/svg%3E");
}

.icon-demo-icon {
    background-color: #28a745;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M16 6v6c0 1.1-.9 2-2 2h-4v3.73c-.63.23-1.29.36-2 .36-3.31 0-6-2.69-6-6s2.69-6 6-6c.34 0 .67.04 1 .09V2.71c-.5-.08-1-.12-1.5-.12-5.52 0-10 4.48-10 10s4.48 10 10 10c1.55 0 3.03-.36 4.38-1.01l2.9 2.9 2.2-2.2-4.2-4.2c-.22-.24-.38-.5-.5-.78V9h3c1.1 0 2-.9 2-2V4h-7l2-2-1.4-1.4L9.4 6h6.6z'/%3E%3C/svg%3E");
}

.cell-icon {
    background-color: #fd7e14;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2zM7 7h2v2H7zm8 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z'/%3E%3C/svg%3E");
}

.popup-icon {
    background-color: #dc3545;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3Cpath d='M7 12h4v4h2v-4h4v-2h-4V6h-2v4H7z'/%3E%3C/svg%3E");
}

.message-icon {
    background-color: #6610f2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'/%3E%3C/svg%3E");
}

.noticebar-icon {
    background-color: #17a2b8;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E");
}

.action-sheet-icon {
    background-color: #6f42c1;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/%3E%3C/svg%3E");
}

.popover-icon {
    background-color: #e83e8c;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'/%3E%3Cpath d='M8 14H6v-2h2v2zm6 0h-4v-2h4v2zm2-6H6V6h10v2z'/%3E%3C/svg%3E");
}

.toast-icon {
    background-color: #20c997;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .55.45 1 1 1h.5c.25 0 .5-.1.7-.29L13.9 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H13.2l-3.8 3.4V16H4V4h16v12z'/%3E%3Cpath d='M7.5 12h2v2h-2zm4.5 0h2v2h-2zm4.5 0h2v2h-2z'/%3E%3C/svg%3E");
}

.dialog-icon {
    background-color: #fd7e14;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z'/%3E%3C/svg%3E");
}
</style>
