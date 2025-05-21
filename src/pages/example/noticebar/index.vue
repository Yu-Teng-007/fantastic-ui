<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">公告栏 NoticeBar</text>
            <text class="example-page__header-desc">用于循环播放展示一组消息通知</text>
        </view>

        <!-- 基础用法 -->
        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">最简单的公告栏用法，展示单行文本信息</view>
            <fanc-noticebar text="这是一条基础公告栏，展示系统通知"></fanc-noticebar>
        </view>

        <!-- 不同类型 -->
        <view class="example-page__section">
            <view class="example-page__section-title">不同类型</view>
            <view class="example-page__section-desc"
                >公告栏支持多种类型，用于不同场景的信息展示</view
            >
            <view class="notice-type-group">
                <view class="notice-type-item">
                    <text class="notice-type-label">信息类型</text>
                    <fanc-noticebar
                        type="info"
                        text="信息类型公告栏，适用于普通信息展示"
                    ></fanc-noticebar>
                </view>

                <view class="notice-type-item">
                    <text class="notice-type-label">成功类型</text>
                    <fanc-noticebar
                        type="success"
                        text="成功类型公告栏，适用于成功消息提示"
                    ></fanc-noticebar>
                </view>

                <view class="notice-type-item">
                    <text class="notice-type-label">警告类型</text>
                    <fanc-noticebar
                        type="warning"
                        text="警告类型公告栏，用于警示性消息展示"
                    ></fanc-noticebar>
                </view>

                <view class="notice-type-item">
                    <text class="notice-type-label">错误类型</text>
                    <fanc-noticebar
                        type="error"
                        text="错误类型公告栏，展示错误或重要警告信息"
                    ></fanc-noticebar>
                </view>
            </view>
        </view>

        <!-- 可关闭公告栏 -->
        <view class="example-page__section">
            <view class="example-page__section-title">可关闭公告栏</view>
            <view class="example-page__section-desc">添加关闭按钮，用户可以关闭不需要的公告</view>
            <fanc-noticebar
                v-if="showClosable"
                text="这是一条可关闭的公告栏，点击右侧关闭按钮后消失"
                closable
                scrollable
                @close="onCloseNotice"
            ></fanc-noticebar>
            <view v-else class="reset-btn-wrap">
                <fanc-button size="small" type="primary" @click="resetClosable"
                    >重新显示</fanc-button
                >
            </view>
        </view>

        <!-- 滚动公告 -->
        <view class="example-page__section">
            <view class="example-page__section-title">滚动公告</view>
            <view class="example-page__section-desc">内容较长时可以设置文字滚动展示</view>
            <fanc-noticebar
                text="这是一条可以滚动的公告栏，当内容较长时会自动滚动以显示全部信息。Fantastic UI 是一个轻量、可靠的移动端组件库，提供了丰富的基础组件和业务组件。"
                scrollable
            ></fanc-noticebar>
        </view>

        <!-- 多行公告 -->
        <view class="example-page__section">
            <view class="example-page__section-title">多行公告</view>
            <view class="example-page__section-desc">设置 multiLine 属性后可以展示多行内容</view>
            <fanc-noticebar
                text="这是一条多行公告栏示例，支持显示较长的内容而不需要滚动。第二行内容展示在这里，可以是系统公告、活动说明等。"
                multiLine
            ></fanc-noticebar>
        </view>

        <!-- 带操作按钮 -->
        <view class="example-page__section">
            <view class="example-page__section-title">带操作按钮</view>
            <view class="example-page__section-desc"
                >在公告栏右侧添加操作按钮，方便用户快速操作</view
            >
            <fanc-noticebar
                text="这是一条带有操作按钮的公告栏，点击右侧按钮可执行相关操作"
                actionText="详情"
                @action="onActionClick"
            ></fanc-noticebar>
        </view>

        <!-- 多条公告轮播 -->
        <view class="example-page__section">
            <view class="example-page__section-title">多条公告轮播</view>
            <view class="example-page__section-desc">支持多条消息轮播展示，点击可查看详情</view>
            <fanc-noticebar
                :text="noticeList"
                showPlayBtn
                @click="onNoticeItemClick"
            ></fanc-noticebar>

            <view class="example-page__button-group control-panel">
                <fanc-button size="small" type="primary" icon="plus" @click="addNotice"
                    >添加公告</fanc-button
                >
                <fanc-button size="small" type="danger" icon="refresh" @click="resetNotices"
                    >重置</fanc-button
                >
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="example-page__section">
            <view class="example-page__section-title">自定义图标</view>
            <view class="example-page__section-desc"
                >可以自定义公告栏左侧的图标，或者完全隐藏图标</view
            >
            <fanc-noticebar text="这是一条使用自定义图标的公告栏" iconName="bell"></fanc-noticebar>

            <view class="custom-margin">
                <fanc-noticebar
                    text="这是一条不显示图标的公告栏"
                    :showIcon="false"
                ></fanc-noticebar>
            </view>
        </view>

        <!-- HTML 内容 -->
        <view class="example-page__section">
            <view class="example-page__section-title">HTML 内容</view>
            <view class="example-page__section-desc">启用 HTML 渲染，可以展示富文本内容</view>
            <fanc-noticebar
                text="<span style='color: red; font-weight: bold;'>重要通知</span>：系统将于今晚 22:00 - 23:00 进行升级维护，期间可能无法访问。"
                enableHtml
            ></fanc-noticebar>
        </view>

        <!-- 综合示例 -->
        <view class="example-page__section">
            <view class="example-page__section-title">综合示例</view>
            <view class="example-page__section-desc">组合使用多种特性，满足复杂场景需求</view>
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
.notice-type-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.notice-type-item {
    .notice-type-label {
        display: block;
        font-size: 14px;
        color: #646566;
        margin-bottom: 8px;
    }
}

.reset-btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.control-panel {
    margin-top: 16px;
}

.custom-margin {
    margin-top: 16px;
}
</style>
