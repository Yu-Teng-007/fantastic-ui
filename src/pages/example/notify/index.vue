<template>
    <view class="container">
        <view class="header">
            <view class="title">消息提示</view>
            <view class="subtitle">用于页面顶部向下滑出一个提示，尔后自动收起的场景</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-desc">提供简短的文字信息反馈</view>
            <fanc-cell-group>
                <fanc-cell title="基础消息提示" is-link @click="showBasicNotify" />
                <fanc-cell title="长文本消息提示" is-link @click="showLongNotify" />
            </fanc-cell-group>
        </view>

        <!-- 提示类型 -->
        <view class="section">
            <view class="section-title">提示类型</view>
            <view class="section-desc">Notify 支持不同类型的提示</view>
            <fanc-cell-group>
                <fanc-cell title="主要提示" is-link @click="showPrimaryNotify" />
                <fanc-cell title="成功提示" is-link @click="showSuccessNotify" />
                <fanc-cell title="错误提示" is-link @click="showErrorNotify" />
                <fanc-cell title="警告提示" is-link @click="showWarningNotify" />
            </fanc-cell-group>
        </view>

        <!-- 高级配置 -->
        <view class="section">
            <view class="section-title">高级配置</view>
            <view class="section-desc">配置持续时间和其他选项</view>
            <fanc-cell-group>
                <fanc-cell title="自定义时长" is-link @click="showCustomDurationNotify" />
                <fanc-cell title="带标题提示" is-link @click="showTitleNotify" />
                <fanc-cell title="不显示图标" is-link @click="showNoIconNotify" />
                <fanc-cell title="自定义图标" is-link @click="showCustomIconNotify" />
                <fanc-cell title="右侧图标" is-link @click="showRightIconNotify" />
                <fanc-cell title="顶部安全距离" is-link @click="showSafeAreaNotify" />
            </fanc-cell-group>
        </view>

        <!-- 事件监听 -->
        <view class="section">
            <view class="section-title">事件监听</view>
            <view class="section-desc">监听点击和关闭事件</view>
            <fanc-cell-group>
                <fanc-cell title="点击事件" is-link @click="showClickNotify" />
                <fanc-cell title="关闭事件" is-link @click="showCloseNotify" />
            </fanc-cell-group>
        </view>

        <!-- 手动控制 -->
        <view class="section">
            <view class="section-title">手动控制</view>
            <view class="section-desc">手动关闭消息提示</view>
            <fanc-cell-group>
                <fanc-cell title="显示不会自动关闭的提示" is-link @click="showPersistentNotify" />
                <fanc-cell title="关闭所有提示" is-link @click="closeAllNotify" />
            </fanc-cell-group>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        // 基础用法
        showBasicNotify() {
            this.$notify("这是一条消息提示");
        },

        showLongNotify() {
            this.$notify(
                "这是一条较长的消息提示，演示了 Notify 组件支持长文本的情况。Notify 会自动调整宽度。"
            );
        },

        // 不同类型的 Notify
        showPrimaryNotify() {
            this.$notify.primary("这是一条主要消息提示");
        },

        showSuccessNotify() {
            this.$notify.success("操作成功");
        },

        showErrorNotify() {
            this.$notify.error("操作失败");
        },

        showWarningNotify() {
            this.$notify.warning("警告信息");
        },

        // 高级配置
        showCustomDurationNotify() {
            this.$notify({
                message: "5秒后自动关闭",
                duration: 5000,
            });
        },

        showTitleNotify() {
            this.$notify({
                title: "标题",
                message: "带有标题的消息提示",
                type: "primary",
            });
        },

        showNoIconNotify() {
            this.$notify({
                message: "不显示图标的消息提示",
                showIcon: false,
                type: "primary",
            });
        },

        showCustomIconNotify() {
            this.$notify({
                message: "自定义图标的消息提示",
                iconName: "bell",
                type: "primary",
            });
        },

        showRightIconNotify() {
            this.$notify({
                message: "带有右侧图标的消息提示",
                rightIcon: "chevron-right",
                type: "primary",
            });
        },

        showSafeAreaNotify() {
            this.$notify({
                message: "适配顶部安全距离的消息提示",
                safeAreaInsetTop: true,
                type: "primary",
            });
        },

        // 事件监听
        showClickNotify() {
            this.$notify({
                message: "点击此消息提示",
                onClick: () => {
                    this.$toast.text("你点击了消息提示");
                },
            });
        },

        showCloseNotify() {
            this.$notify({
                message: "监听关闭事件",
                onClose: () => {
                    this.$toast.text("消息提示已关闭");
                },
            });
        },

        // 手动控制
        showPersistentNotify() {
            this.$notify({
                message: "这条消息提示不会自动关闭",
                duration: 0,
                type: "warning",
            });
        },

        closeAllNotify() {
            this.$notify.close();
            this.$toast.success("已关闭所有消息提示");
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
}

.section {
    margin-bottom: 24px;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.section-desc {
    font-size: 14px;
    color: #969799;
    margin-bottom: 12px;
}

.demo-button {
    margin-right: 12px;
    margin-bottom: 12px;
}
</style>
