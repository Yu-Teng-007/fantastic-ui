<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">轻提示</text>
            <text class="example-page__header-desc"
                >用于在不打断用户操作的情况下提供简短的操作反馈</text
            >
        </view>

        <!-- 基础用法 -->
        <fanc-cell-group title="基础用法" description="提供简短的文字信息反馈" inset>
            <fanc-cell title="文字提示" is-link @click="showBasicToast" />
            <fanc-cell title="长文本提示" is-link @click="showLongToast" />
        </fanc-cell-group>

        <!-- 提示类型 -->
        <fanc-cell-group title="提示类型" description="Toast 支持不同类型的提示" inset>
            <fanc-cell title="成功提示" is-link @click="showSuccessToast" />
            <fanc-cell title="错误提示" is-link @click="showErrorToast" />
            <fanc-cell title="警告提示" is-link @click="showWarningToast" />
            <fanc-cell title="加载提示" is-link @click="showLoadingToast" />
        </fanc-cell-group>

        <!-- 自定义位置 -->
        <fanc-cell-group title="自定义位置" description="Toast 可以显示在顶部、中间或底部" inset>
            <fanc-cell title="顶部提示" is-link @click="showTopToast" />
            <fanc-cell title="中间提示" is-link @click="showCenterToast" />
            <fanc-cell title="底部提示" is-link @click="showBottomToast" />
        </fanc-cell-group>

        <!-- 高级配置 -->
        <fanc-cell-group title="高级配置" description="配置持续时间和遮罩层" inset>
            <fanc-cell title="自定义时长" is-link @click="showCustomDurationToast" />
            <fanc-cell title="显示遮罩" is-link @click="showMaskToast" />
            <fanc-cell title="点击遮罩关闭" is-link @click="showMaskClosableToast" />
            <fanc-cell title="锁定背景滚动" is-link @click="showLockBackgroundToast" />
        </fanc-cell-group>

        <!-- 动态控制 -->
        <fanc-cell-group title="动态控制" description="动态更新或手动关闭 Toast" inset>
            <fanc-cell title="加载后成功" is-link @click="showLoadingThenSuccess" />
            <fanc-cell title="多个 Toast" is-link @click="showMultipleToast" />
            <fanc-cell title="关闭所有 Toast" is-link @click="showAndCloseAll" />
        </fanc-cell-group>
    </view>
</template>

<script>
export default {
    data() {
        return {
            loadingToast: null,
            timer: null,
            showDummyContent: false,
        };
    },
    methods: {
        // 基础用法
        showBasicToast() {
            this.$toast.text("这是一条提示消息");
        },

        showLongToast() {
            this.$toast.text(
                "这是一条较长的提示消息，演示了 Toast 组件支持长文本的情况。Toast 会根据内容自动调整宽度。"
            );
        },

        // 不同类型的 Toast
        showSuccessToast() {
            this.$toast.success("操作成功");
        },

        showErrorToast() {
            this.$toast.error("操作失败");
        },

        showWarningToast() {
            this.$toast.warning("警告信息");
        },

        showLoadingToast() {
            this.$toast.loading("加载中...");

            // 3秒后关闭
            setTimeout(() => {
                this.$toast.close();
            }, 3000);
        },

        // 自定义位置的 Toast
        showTopToast() {
            this.$toast.text({
                message: "顶部提示",
                position: "top",
            });
        },

        showCenterToast() {
            this.$toast.text({
                message: "中间提示",
                position: "center",
            });
        },

        showBottomToast() {
            this.$toast.text({
                message: "底部提示",
                position: "bottom",
            });
        },

        // 高级配置
        showCustomDurationToast() {
            this.$toast.success({
                message: "5秒后自动关闭",
                duration: 5000,
            });
        },

        showMaskToast() {
            this.$toast.warning({
                message: "显示背景遮罩",
                mask: true,
                duration: 4000,
            });
        },

        showMaskClosableToast() {
            this.$toast.success({
                message: "点击遮罩可关闭",
                mask: true,
                maskClosable: true,
                duration: 0,
                showIcon: true,
            });
        },

        // 新增：锁定背景的示例
        showLockBackgroundToast() {
            // 确保有足够的内容可以滚动
            this.showDummyContent = true;

            // 延迟一下，确保内容已经渲染
            setTimeout(() => {
                this.$toast.loading({
                    message: "锁定背景滚动",
                    mask: true,
                    lockBackground: true,
                    duration: 0,
                    showIcon: true,
                });

                // 提示用户可以手动关闭
                setTimeout(() => {
                    this.$toast.warning({
                        message: "尝试滚动页面，然后点击此处关闭",
                        mask: true,
                        maskClosable: true,
                        lockBackground: true,
                        duration: 0,
                        showIcon: true,
                    });
                }, 2000);
            }, 100);
        },

        // 动态控制 Toast
        showLoadingThenSuccess() {
            // 显示加载提示
            this.$toast.loading("正在提交...");

            // 2秒后关闭加载提示，显示成功提示
            setTimeout(() => {
                this.$toast.success("提交成功");
            }, 2000);
        },

        showMultipleToast() {
            this.$toast.text({
                message: "第一条消息",
                position: "top",
            });

            setTimeout(() => {
                this.$toast.success({
                    message: "第二条消息",
                    position: "center",
                });
            }, 1000);

            setTimeout(() => {
                this.$toast.warning({
                    message: "第三条消息",
                    position: "bottom",
                });
            }, 2000);
        },

        showAndCloseAll() {
            this.$toast.close();
        },
    },

    beforeDestroy() {
        // 清除可能存在的定时器
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        // 关闭可能存在的toast
        this.$toast.close();
    },
};
</script>

<style lang="scss">
.example-page {
    padding-bottom: 32px;
}

// 测试内容样式
.dummy-content {
    margin-top: 20px;
    padding-bottom: 50px;
}
</style>
