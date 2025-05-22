<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">公告栏 NoticeBar</text>
            <text class="example-page__header-desc">用于循环播放展示一组消息通知</text>
        </view>

        <!-- 基础用法 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">基础用法</view>
                <view class="demo-card__header-desc">最简单的公告栏用法，展示单行文本信息</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar text="这是一条基础公告栏，展示系统通知"></fanc-noticebar>
            </view>
        </view>

        <!-- 不同类型 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">不同类型</view>
                <view class="demo-card__header-desc"
                    >公告栏支持多种类型，用于不同场景的信息展示</view
                >
            </view>
            <view class="demo-card__body">
                <view class="type-showcase">
                    <view class="type-item">
                        <text class="type-item__label type-item__label--info">信息类型</text>
                        <fanc-noticebar
                            type="info"
                            text="信息类型公告栏，适用于普通信息展示"
                        ></fanc-noticebar>
                    </view>

                    <view class="type-item">
                        <text class="type-item__label type-item__label--success">成功类型</text>
                        <fanc-noticebar
                            type="success"
                            text="成功类型公告栏，适用于成功消息提示"
                        ></fanc-noticebar>
                    </view>

                    <view class="type-item">
                        <text class="type-item__label type-item__label--warning">警告类型</text>
                        <fanc-noticebar
                            type="warning"
                            text="警告类型公告栏，用于警示性消息展示"
                        ></fanc-noticebar>
                    </view>

                    <view class="type-item">
                        <text class="type-item__label type-item__label--error">错误类型</text>
                        <fanc-noticebar
                            type="error"
                            text="错误类型公告栏，展示错误或重要警告信息"
                        ></fanc-noticebar>
                    </view>
                </view>
            </view>
        </view>

        <!-- 可关闭公告栏 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">可关闭公告栏</view>
                <view class="demo-card__header-desc">添加关闭按钮，用户可以关闭不需要的公告</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    v-if="showClosable"
                    text="这是一条可关闭的公告栏，点击右侧关闭按钮后消失"
                    closable
                    scrollable
                    @close="onCloseNotice"
                ></fanc-noticebar>
                <view v-else class="action-area">
                    <button class="btn btn--primary" @click="resetClosable">
                        <span class="btn__icon">↻</span>
                        重新显示
                    </button>
                </view>
            </view>
        </view>

        <!-- 滚动公告 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">滚动公告</view>
                <view class="demo-card__header-desc">内容较长时可以设置文字滚动展示</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    text="这是一条可以滚动的公告栏，当内容较长时会自动滚动以显示全部信息。Fantastic UI 是一个轻量、可靠的移动端组件库，提供了丰富的基础组件和业务组件。"
                    scrollable
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 多行公告 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">多行公告</view>
                <view class="demo-card__header-desc">设置 multiLine 属性后可以展示多行内容</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    text="这是一条多行公告栏示例，支持显示较长的内容而不需要滚动。第二行内容展示在这里，可以是系统公告、活动说明等。"
                    multiLine
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 带操作按钮 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">带操作按钮</view>
                <view class="demo-card__header-desc"
                    >在公告栏右侧添加操作按钮，方便用户快速操作</view
                >
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    text="这是一条带有操作按钮的公告栏，点击右侧按钮可执行相关操作"
                    actionText="详情"
                    @action="onActionClick"
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 多条公告轮播 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">多条公告轮播</view>
                <view class="demo-card__header-desc">支持多条消息轮播展示，点击可查看详情</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    :text="noticeList"
                    showPlayBtn
                    @click="onNoticeItemClick"
                ></fanc-noticebar>

                <view class="action-area">
                    <button class="btn btn--primary" @click="addNotice">
                        <span class="btn__icon">+</span>
                        添加公告
                    </button>
                    <button class="btn btn--danger" @click="resetNotices">
                        <span class="btn__icon">↻</span>
                        重置
                    </button>
                </view>
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">自定义图标</view>
                <view class="demo-card__header-desc"
                    >可以自定义公告栏左侧的图标，或者完全隐藏图标</view
                >
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    text="这是一条使用自定义图标的公告栏"
                    iconName="bell"
                ></fanc-noticebar>
                <view class="spacer"></view>
                <fanc-noticebar
                    text="这是一条不显示图标的公告栏"
                    :showIcon="false"
                ></fanc-noticebar>
            </view>
        </view>

        <!-- HTML 内容 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">HTML 内容</view>
                <view class="demo-card__header-desc">启用 HTML 渲染，可以展示富文本内容</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    text="<span style='color: red; font-weight: bold;'>重要通知</span>：系统将于今晚 22:00 - 23:00 进行升级维护，期间可能无法访问。"
                    enableHtml
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 综合示例 -->
        <view class="demo-card">
            <view class="demo-card__header">
                <view class="demo-card__header-title">综合示例</view>
                <view class="demo-card__header-desc">组合使用多种特性，满足复杂场景需求</view>
            </view>
            <view class="demo-card__body">
                <fanc-noticebar
                    type="warning"
                    text="这是一个综合功能的公告栏示例，结合了多种特性，适合重要信息展示"
                    scrollable
                    closable
                    actionText="查看详情"
                    @close="onCombinedClose"
                    @action="onCombinedAction"
                ></fanc-noticebar>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            showClosable: true,
            noticeList: [
                "第一条公告：Fantastic UI 组件库全新发布",
                "第二条公告：Noticebar 公告栏组件支持多种展示方式",
                "第三条公告：欢迎加入组件库建设，提交您的宝贵意见",
            ],
            noticeCount: 3,
        };
    },

    methods: {
        // 关闭公告事件处理
        onCloseNotice() {
            this.showClosable = false;
            uni.showToast({
                title: "公告已关闭",
                icon: "none",
            });
        },

        // 重置可关闭公告
        resetClosable() {
            this.showClosable = true;
        },

        // 操作按钮点击处理
        onActionClick() {
            uni.showToast({
                title: "点击了操作按钮",
                icon: "none",
            });
        },

        // 公告项点击处理
        onNoticeItemClick(index) {
            uni.showToast({
                title: `点击了第${index + 1}条公告`,
                icon: "none",
            });
        },

        // 添加新公告
        addNotice() {
            this.noticeCount++;
            this.noticeList.push(`新增公告${this.noticeCount}：这是一条新添加的公告内容`);
        },

        // 重置公告列表
        resetNotices() {
            this.noticeCount = 3;
            this.noticeList = [
                "第一条公告：Fantastic UI 组件库全新发布",
                "第二条公告：Noticebar 公告栏组件支持多种展示方式",
                "第三条公告：欢迎加入组件库建设，提交您的宝贵意见",
            ];
            uni.showToast({
                title: "公告列表已重置",
                icon: "none",
            });
        },

        // 综合示例关闭事件
        onCombinedClose() {
            uni.showToast({
                title: "关闭了综合示例公告",
                icon: "none",
            });
        },

        // 综合示例操作事件
        onCombinedAction() {
            uni.showToast({
                title: "点击了综合示例操作按钮",
                icon: "none",
            });
        },
    },
};
</script>

<style lang="scss">
:root {
    --theme-primary: #2b85e4;
    --theme-secondary: #576b95;
    --theme-success: #19be6b;
    --theme-warning: #ff9900;
    --theme-error: #fa3534;
    --theme-info: #2db7f5;
    --theme-bg: #f5f7fa;
    --theme-card: #ffffff;
    --theme-text-primary: #303133;
    --theme-text-regular: #606266;
    --theme-text-secondary: #909399;
    --theme-border: #e4e7ed;
    --theme-border-light: #ebeef5;
    --card-radius: 8px;
    --transition-standard: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    background-color: var(--theme-bg);
    color: var(--theme-text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
}

.example-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 16px;

    &__header {
        text-align: center;
        margin-bottom: 32px;
        position: relative;

        &-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--theme-primary);
            display: block;
        }

        &-desc {
            font-size: 14px;
            color: var(--theme-text-secondary);
            display: block;
        }
    }
}

// 卡片组件样式
.demo-card {
    background: var(--theme-card);
    border-radius: var(--card-radius);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
    overflow: hidden;
    transition: var(--transition-standard);

    &:hover {
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    }

    &__header {
        padding: 16px;
        border-bottom: 1px solid var(--theme-border-light);
        background-color: rgba(0, 0, 0, 0.02);

        &-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--theme-text-primary);
            position: relative;
            padding-left: 12px;
            margin: 0;

            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 4px;
                background-color: var(--theme-primary);
                border-radius: 2px;
            }
        }

        &-desc {
            margin-top: 8px;
            font-size: 13px;
            color: var(--theme-text-secondary);
            line-height: 1.5;
        }
    }

    &__body {
        padding: 16px;
    }
}

// 类型展示区样式
.type-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 8px;

    @media screen and (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}

.type-item {
    background-color: #fafafa;
    border-radius: 6px;
    transition: var(--transition-standard);

    &:hover {
        background-color: #f0f2f5;
    }

    &__label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
        display: flex;
        align-items: center;

        &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
        }

        &--info::before {
            background-color: var(--theme-info);
        }

        &--success::before {
            background-color: var(--theme-success);
        }

        &--warning::before {
            background-color: var(--theme-warning);
        }

        &--error::before {
            background-color: var(--theme-error);
        }
    }
}

// 按钮样式
.action-area {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
}

.btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    height: 32px;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-standard);
    overflow: hidden;

    &--primary {
        background-color: var(--theme-primary);
        color: white;

        &:hover {
            background-color: lighten(#2b85e4, 10%);
        }
    }

    &--danger {
        background-color: var(--theme-error);
        color: white;

        &:hover {
            background-color: lighten(#fa3534, 10%);
        }
    }

    &__icon {
        margin-right: 4px;
    }

    // 波纹效果
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.6);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
    }

    &:active::after {
        animation: btn-ripple 0.6s ease-out;
    }
}

@keyframes btn-ripple {
    0% {
        transform: scale(0, 0);
        opacity: 0.6;
    }
    20% {
        transform: scale(25, 25);
        opacity: 0.6;
    }
    100% {
        opacity: 0;
        transform: scale(40, 40);
    }
}

// 自定义分隔区域样式
.spacer {
    height: 8px;
    margin: 12px 0;
}

// 动画定义
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// 暗色模式
@media (prefers-color-scheme: dark) {
    :root {
        --theme-bg: #121212;
        --theme-card: #1e1e1e;
        --theme-text-primary: #e0e0e0;
        --theme-text-regular: #b0b0b0;
        --theme-text-secondary: #909090;
        --theme-border: #333333;
        --theme-border-light: #2c2c2c;
    }

    .type-item {
        background-color: #2d2d2d;

        &:hover {
            background-color: #353535;
        }
    }

    .demo-card__header {
        background-color: rgba(255, 255, 255, 0.03);
    }
}
</style>
