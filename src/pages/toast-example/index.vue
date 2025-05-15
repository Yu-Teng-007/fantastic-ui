<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">轻提示</text>
            <text class="example-page__header-desc">用于在不打断用户操作的情况下提供简短的操作反馈</text>
        </view>

        <!-- 基础用法 -->
        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">提供简短的文字信息反馈</view>
            <view class="example-page__button-group">
                <button class="btn btn-primary" @click="showBasicToast">文字提示</button>
                <button class="btn btn-secondary" @click="showLongToast">长文本提示</button>
            </view>
        </view>

        <!-- 提示类型 -->
        <view class="example-page__section">
            <view class="example-page__section-title">提示类型</view>
            <view class="example-page__section-desc">Toast 支持不同类型的提示</view>
            <view class="example-page__button-group">
                <button class="btn btn-success" @click="showSuccessToast">成功提示</button>
                <button class="btn btn-danger" @click="showErrorToast">错误提示</button>
                <button class="btn btn-warning" @click="showWarningToast">警告提示</button>
                <button class="btn btn-info" @click="showLoadingToast">加载提示</button>
            </view>
        </view>

        <!-- 自定义位置 -->
        <view class="example-page__section">
            <view class="example-page__section-title">自定义位置</view>
            <view class="example-page__section-desc">Toast 可以显示在顶部、中间或底部</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-primary" @click="showTopToast">顶部提示</button>
                <button class="btn btn-outline-primary" @click="showCenterToast">中间提示</button>
                <button class="btn btn-outline-primary" @click="showBottomToast">底部提示</button>
            </view>
        </view>

        <!-- 高级配置 -->
        <view class="example-page__section">
            <view class="example-page__section-title">高级配置</view>
            <view class="example-page__section-desc">配置持续时间和遮罩层</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-secondary" @click="showCustomDurationToast">自定义时长</button>
                <button class="btn btn-outline-secondary" @click="showMaskToast">显示遮罩</button>
                <button class="btn btn-outline-secondary" @click="showMaskClosableToast">点击遮罩关闭</button>
                <button class="btn btn-outline-secondary" @click="showLockBackgroundToast">锁定背景滚动</button>
            </view>
        </view>

        <!-- 动态控制 -->
        <view class="example-page__section">
            <view class="example-page__section-title">动态控制</view>
            <view class="example-page__section-desc">动态更新或手动关闭 Toast</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-info" @click="showLoadingThenSuccess">加载后成功</button>
                <button class="btn btn-outline-danger" @click="showMultipleToast">多个 Toast</button>
                <button class="btn btn-outline-warning" @click="showAndCloseAll">关闭所有 Toast</button>
            </view>
        </view>

        <!-- 填充内容使页面可滚动，用于测试锁定背景功能 -->
        <view v-if="showDummyContent" class="dummy-content">
            <view class="example-page__section" v-for="i in 10" :key="i">
                <view class="example-page__section-title">测试内容 {{ i }}</view>
                <view class="example-page__section-desc">
                    这是用于测试背景锁定功能的内容。当显示带有锁定背景的 Toast 时，
                    页面将无法滚动。这有助于聚焦用户注意力或防止用户在某些操作期间与背景内容交互。
                </view>
            </view>
        </view>
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
@import "../../styles/example-pages.scss";

// 示例页面按钮样式
.btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    min-width: 100px;
    text-align: center;
    transition: all 0.3s;
    margin: 0 8px 8px 0;

    &:active {
        opacity: 0.8;
        transform: scale(0.98);
    }

    // 主要按钮
    &-primary {
        background-color: #007bff;
        color: #fff;
        border: none;
    }

    // 次要按钮
    &-secondary {
        background-color: #6c757d;
        color: #fff;
        border: none;
    }

    // 成功按钮
    &-success {
        background-color: #28a745;
        color: #fff;
        border: none;
    }

    // 危险按钮
    &-danger {
        background-color: #dc3545;
        color: #fff;
        border: none;
    }

    // 警告按钮
    &-warning {
        background-color: #ffc107;
        color: #212529;
        border: none;
    }

    // 信息按钮
    &-info {
        background-color: #17a2b8;
        color: #fff;
        border: none;
    }

    // 轮廓按钮样式
    &-outline-primary {
        background-color: transparent;
        color: #007bff;
        border: 1px solid #007bff;
    }

    &-outline-secondary {
        background-color: transparent;
        color: #6c757d;
        border: 1px solid #6c757d;
    }

    &-outline-success {
        background-color: transparent;
        color: #28a745;
        border: 1px solid #28a745;
    }

    &-outline-danger {
        background-color: transparent;
        color: #dc3545;
        border: 1px solid #dc3545;
    }

    &-outline-warning {
        background-color: transparent;
        color: #ffc107;
        border: 1px solid #ffc107;
    }

    &-outline-info {
        background-color: transparent;
        color: #17a2b8;
        border: 1px solid #17a2b8;
    }
}

// 测试内容样式
.dummy-content {
    margin-top: 20px;
    padding-bottom: 50px;
}
</style>
