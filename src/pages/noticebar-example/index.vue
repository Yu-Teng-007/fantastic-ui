<template>
    <view class="noticebar-example">
        <view class="demo-block">
            <view class="block-title">基础用法</view>
            <fanc-noticebar text="这是一条基础公告栏，展示系统通知"></fanc-noticebar>
        </view>

        <view class="demo-block">
            <view class="block-title">不同类型</view>
            <view class="block-items">
                <view class="block-item">
                    <text class="item-label">信息类型</text>
                    <fanc-noticebar type="info" text="信息类型公告栏，适用于普通信息展示"></fanc-noticebar>
                </view>

                <view class="block-item">
                    <text class="item-label">成功类型</text>
                    <fanc-noticebar type="success" text="成功类型公告栏，适用于成功消息提示"></fanc-noticebar>
                </view>

                <view class="block-item">
                    <text class="item-label">警告类型</text>
                    <fanc-noticebar type="warning" text="警告类型公告栏，用于警示性消息展示"></fanc-noticebar>
                </view>

                <view class="block-item">
                    <text class="item-label">错误类型</text>
                    <fanc-noticebar type="error" text="错误类型公告栏，展示错误或重要警告信息"></fanc-noticebar>
                </view>
            </view>
        </view>

        <view class="demo-block">
            <view class="block-title">可关闭公告栏</view>
            <fanc-noticebar
                v-if="showClosable"
                text="这是一条可关闭的公告栏，点击右侧关闭按钮后消失"
                closable
                scrollable
                @close="onCloseNotice"
            ></fanc-noticebar>
            <view v-else class="reset-btn-wrap">
                <fanc-button size="small" @click="resetClosable">重新显示</fanc-button>
            </view>
        </view>

        <view class="demo-block">
            <view class="block-title">滚动公告</view>
            <fanc-noticebar
                text="这是一条可以滚动的公告栏，当内容较长时会自动滚动以显示全部信息。Fantastic UI 是一个轻量、可靠的移动端组件库，提供了丰富的基础组件和业务组件。"
                scrollable
            ></fanc-noticebar>
        </view>

        <view class="demo-block">
            <view class="block-title">多行公告</view>
            <fanc-noticebar
                text="这是一条多行公告栏示例，支持显示较长的内容而不需要滚动。第二行内容展示在这里，可以是系统公告、活动说明等。"
                multiLine
            ></fanc-noticebar>
        </view>

        <view class="demo-block">
            <view class="block-title">带操作按钮</view>
            <fanc-noticebar
                text="这是一条带有操作按钮的公告栏，点击右侧按钮可执行相关操作"
                actionText="详情"
                @action="onActionClick"
            ></fanc-noticebar>
        </view>

        <view class="demo-block">
            <view class="block-title">多条公告轮播</view>
            <fanc-noticebar :text="noticeList" showPlayBtn @click="onNoticeItemClick"></fanc-noticebar>

            <view class="control-panel">
                <fanc-button size="small" @click="addNotice">添加公告</fanc-button>
                <fanc-button size="small" type="danger" @click="resetNotices">重置</fanc-button>
            </view>
        </view>

        <view class="demo-block">
            <view class="block-title">自定义图标</view>
            <fanc-noticebar text="这是一条使用自定义图标的公告栏" iconName="bell"></fanc-noticebar>

            <view class="block-item">
                <fanc-noticebar text="这是一条不显示图标的公告栏" :showIcon="false"></fanc-noticebar>
            </view>
        </view>

        <view class="demo-block">
            <view class="block-title">HTML 内容</view>
            <fanc-noticebar
                text="<span style='color: red; font-weight: bold;'>重要通知</span>：系统将于今晚 22:00 - 23:00 进行升级维护，期间可能无法访问。"
                enableHtml
            ></fanc-noticebar>
        </view>

        <view class="demo-block">
            <view class="block-title">综合示例</view>
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
        onNoticeItemClick(event) {
            uni.showToast({
                title: `点击了公告项`,
                icon: "none",
            });
        },

        // 添加公告
        addNotice() {
            this.noticeCount++;
            this.noticeList.push(`第${this.noticeCount}条公告：这是新添加的公告内容示例`);
        },

        // 重置公告列表
        resetNotices() {
            this.noticeList = [
                "第一条公告：Fantastic UI 组件库全新发布",
                "第二条公告：Noticebar 公告栏组件支持多种展示方式",
                "第三条公告：欢迎加入组件库建设，提交您的宝贵意见",
            ];
            this.noticeCount = 3;
        },

        // 综合示例关闭处理
        onCombinedClose() {
            uni.showToast({
                title: "关闭了综合示例公告",
                icon: "none",
            });
        },

        // 综合示例操作按钮处理
        onCombinedAction() {
            uni.showModal({
                title: "详细信息",
                content: "这是一个演示公告栏综合功能的示例，包含了类型、滚动、关闭按钮和操作按钮等特性",
                showCancel: false,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.noticebar-example {
    padding: 16px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.demo-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
}

.demo-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.demo-desc {
    font-size: 14px;
    color: #666;
}

.demo-block {
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.block-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #333;
}

.block-items {
    display: flex;
    flex-direction: column;
}

.block-item {
    margin-bottom: 12px;

    &:last-child {
        margin-bottom: 0;
    }
}

.item-label {
    display: block;
    font-size: 14px;
    color: #666;
    margin-bottom: 6px;
}

.reset-btn-wrap {
    display: flex;
    justify-content: center;
    padding: 10px 0;
}

.control-panel {
    display: flex;
    margin-top: 16px;
    gap: 12px;
}
</style>
