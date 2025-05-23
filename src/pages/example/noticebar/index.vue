<template>
    <view class="container">
        <view class="header">
            <view class="title">公告栏</view>
            <view class="subtitle">用于循环播放展示一组消息通知</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-noticebar text="这是一条基础公告栏，展示系统通知"></fanc-noticebar>
            </view>
        </view>

        <!-- 不同类型 -->
        <view class="section">
            <view class="section-title">不同类型</view>
            <view class="section-content">
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
        <view class="section">
            <view class="section-title">可关闭公告栏</view>
            <view class="section-content">
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
        <view class="section">
            <view class="section-title">滚动公告</view>
            <view class="section-content">
                <fanc-noticebar
                    text="这是一条可以滚动的公告栏，当内容较长时会自动滚动以显示全部信息。Fantastic UI 是一个轻量、可靠的移动端组件库，提供了丰富的基础组件和业务组件。"
                    scrollable
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 多行公告 -->
        <view class="section">
            <view class="section-title">多行公告</view>
            <view class="section-content">
                <fanc-noticebar
                    text="这是一条多行公告栏示例，支持显示较长的内容而不需要滚动。第二行内容展示在这里，可以是系统公告、活动说明等。"
                    multiLine
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 带操作按钮 -->
        <view class="section">
            <view class="section-title">带操作按钮</view>
            <view class="section-content">
                <fanc-noticebar
                    text="这是一条带有操作按钮的公告栏，点击右侧按钮可执行相关操作"
                    actionText="详情"
                    @action="onActionClick"
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 多条公告轮播 -->
        <view class="section">
            <view class="section-title">多条公告轮播</view>
            <view class="section-content">
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
        <view class="section">
            <view class="section-title">自定义图标</view>
            <view class="section-content">
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
        <view class="section">
            <view class="section-title">HTML 内容</view>
            <view class="section-content">
                <fanc-noticebar
                    text="<span style='color: red; font-weight: bold;'>重要通知</span>：系统将于今晚 22:00 - 23:00 进行升级维护，期间可能无法访问。"
                    enableHtml
                ></fanc-noticebar>
            </view>
        </view>

        <!-- 综合示例 -->
        <view class="section">
            <view class="section-title">综合示例</view>
            <view class="section-content">
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

.section-content {
    padding: 16px;
}

/* 类型展示区样式 */
.type-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 8px;
}

@media screen and (max-width: 576px) {
    .type-showcase {
        grid-template-columns: 1fr;
    }
}

.type-item {
    background-color: #fafafa;
    border-radius: 6px;
    transition: all 0.3s;
}

.type-item:hover {
    background-color: #f0f2f5;
}

.type-item__label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.type-item__label::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.type-item__label--info::before {
    background-color: #2db7f5;
}

.type-item__label--success::before {
    background-color: #19be6b;
}

.type-item__label--warning::before {
    background-color: #ff9900;
}

.type-item__label--error::before {
    background-color: #fa3534;
}

/* 按钮样式 */
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
    transition: all 0.3s;
    overflow: hidden;
}

.btn--primary {
    background-color: #2b85e4;
    color: white;
}

.btn--primary:hover {
    background-color: #4097e8;
}

.btn--danger {
    background-color: #fa3534;
    color: white;
}

.btn--danger:hover {
    background-color: #fb5c5b;
}

.btn__icon {
    margin-right: 4px;
}

/* 自定义分隔区域样式 */
.spacer {
    height: 8px;
    margin: 12px 0;
}
</style>
