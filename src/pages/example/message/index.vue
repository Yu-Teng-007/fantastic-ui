<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">消息通知组件</text>
            <text class="example-page__header-desc">用于展示操作反馈或提示信息的轻量级组件</text>
        </view>

        <fanc-cell-group 
            title="基础用法" 
            description="支持不同类型的消息通知，用于不同场景" 
            inset
        >
            <fanc-cell title="普通通知" is-link @click="showInfo" />
            <fanc-cell title="成功通知" is-link @click="showSuccess" />
            <fanc-cell title="警示通知" is-link @click="showWarning" />
            <fanc-cell title="错误通知" is-link @click="showError" />
        </fanc-cell-group>

        <fanc-cell-group 
            title="自定义配置" 
            description="可以自定义消息的关闭按钮、图标和显示时间" 
            inset
        >
            <fanc-cell title="带关闭按钮" is-link @click="showCustom" />
            <fanc-cell title="无图标通知" is-link @click="showNoIcon" />
            <fanc-cell title="显示时间长" is-link @click="showLongDuration" />
            <fanc-cell title="关闭所有" is-link @click="closeAll" />
        </fanc-cell-group>

        <fanc-cell-group 
            title="带操作按钮" 
            description="消息通知可以包含操作按钮，方便用户快速操作" 
            inset
        >
            <fanc-cell title="普通操作按钮" is-link @click="showWithAction" />
            <fanc-cell title="成功操作按钮" is-link @click="showSuccessAction" />
            <fanc-cell title="警告操作按钮" is-link @click="showWarningAction" />
            <fanc-cell title="错误操作按钮" is-link @click="showErrorAction" />
            
            <fanc-cell title="快速操作按钮" is-link @click="showQuickAction" />
            <fanc-cell title="持久操作按钮" is-link @click="showPersistentAction" />
            <fanc-cell title="点击不关闭按钮" is-link @click="showNoCloseOnAction" />
        </fanc-cell-group>

        <fanc-cell-group 
            title="横向滚动消息" 
            description="内容较长时可以使用横向滚动展示完整信息" 
            inset
        >
            <fanc-cell title="普通滚动消息" is-link @click="showScrollMessage" />
            <fanc-cell title="成功滚动消息" is-link @click="showSuccessScroll" />
            <fanc-cell title="警告滚动消息" is-link @click="showWarningScroll" />
            <fanc-cell title="错误滚动消息" is-link @click="showErrorScroll" />
            
            <view class="message-form">
                <view class="message-form__item">
                    <text class="message-form__label">自定义滚动消息:</text>
                    <input
                        class="message-form__input"
                        v-model="customScrollMessage"
                        placeholder="输入长文本消息"
                    />
                </view>
                <view class="message-form__item">
                    <text class="message-form__label">滚动速度:</text>
                    <slider
                        class="message-form__slider"
                        min="10"
                        max="100"
                        :value="scrollSpeed"
                        @change="onSpeedChange"
                        show-value
                    />
                </view>
                <view class="message-form__actions">
                    <fanc-button type="primary" @click="showCustomScrollMessage"
                        >显示自定义滚动消息</fanc-button
                    >
                </view>
            </view>
        </fanc-cell-group>

        <fanc-cell-group 
            title="多条消息" 
            description="可以同时显示多条消息通知，它们会自动堆叠排列" 
            inset
            >
            <fanc-cell title="显示多条" is-link @click="showMultiple" />
        </fanc-cell-group>

        <!-- 测试图标显示 -->
        <fanc-cell-group 
            v-if="showIconTest" 
            title="图标测试" 
            description="测试不同类型消息的图标显示" 
            inset
        >
            <view class="icon-test-group">
                <view class="icon-test-item">
                    <i class="fas fa-info-circle"></i>
                    <text>info</text>
                </view>
                <view class="icon-test-item">
                    <i class="fas fa-check-circle"></i>
                    <text>success</text>
                </view>
                <view class="icon-test-item">
                    <i class="fas fa-exclamation-circle"></i>
                    <text>warning</text>
                </view>
                <view class="icon-test-item">
                    <i class="fas fa-times-circle"></i>
                    <text>error</text>
                </view>
            </view>
        </fanc-cell-group>

        <fanc-cell-group 
            title="富文本消息" 
            description="支持在消息中显示富文本内容，如加粗、颜色等样式" 
            inset
        >
            <fanc-cell title="普通富文本" is-link @click="showHtmlMessage" />
            <fanc-cell title="成功富文本" is-link @click="showHtmlSuccess" />
            <fanc-cell title="带操作按钮" is-link @click="showHtmlWithAction" />
            <fanc-cell title="滚动富文本" is-link @click="showHtmlScroll" />
        </fanc-cell-group>
    </view>
</template>

<script>
export default {
    name: "MessageDemo",

    data() {
        return {
            lastMessage: "",
            debugInfo: null,
            showIconTest: false,
            customScrollMessage:
                "这是一条非常长的消息通知，它会自动横向滚动显示，以便用户能够看到完整内容而不会被截断。",
            scrollSpeed: 50,
        };
    },

    methods: {
        // 普通消息
        showInfo() {
            try {
                this.$message.info("这是一条普通消息");
                this.lastMessage = "显示了普通消息";
            } catch (e) {
                this.handleError(e, "显示普通消息时出错");
            }
        },

        // 成功消息
        showSuccess() {
            try {
                this.$message.success("操作成功");
                this.lastMessage = "显示了成功消息";
            } catch (e) {
                this.handleError(e, "显示成功消息时出错");
            }
        },

        // 警告消息
        showWarning() {
            try {
                this.$message.warning("警告提示");
                this.lastMessage = "显示了警告消息";
            } catch (e) {
                this.handleError(e, "显示警告消息时出错");
            }
        },

        // 错误消息
        showError() {
            try {
                this.$message.error("出错了");
                this.lastMessage = "显示了错误消息";
            } catch (e) {
                this.handleError(e, "显示错误消息时出错");
            }
        },

        // 自定义消息 - 带关闭按钮
        showCustom() {
            try {
                this.$message.info({
                    message: "这是一条带关闭按钮的消息",
                    closable: true,
                    onClose: () => {
                        this.lastMessage = "消息已手动关闭";
                        console.log("消息已手动关闭");
                    },
                });
                this.lastMessage = "显示了带关闭按钮的消息";
            } catch (e) {
                this.handleError(e, "显示带关闭按钮消息时出错");
            }
        },

        // 自定义消息 - 无图标
        showNoIcon() {
            try {
                this.$message.info({
                    message: "这是一条没有图标的消息",
                    showIcon: false,
                });
                this.lastMessage = "显示了无图标消息";
            } catch (e) {
                this.handleError(e, "显示无图标消息时出错");
            }
        },

        // 自定义消息 - 显示时间长
        showLongDuration() {
            try {
                this.$message.info({
                    message: "这条消息会显示较长时间 (10秒)",
                    duration: 10000,
                });
                this.lastMessage = "显示了长时间消息";
            } catch (e) {
                this.handleError(e, "显示长时间消息时出错");
            }
        },

        // 关闭所有消息
        closeAll() {
            try {
                this.$message.closeAll();
                this.lastMessage = "关闭了所有消息";
            } catch (e) {
                this.handleError(e, "关闭所有消息时出错");
            }
        },

        // 带操作按钮的消息
        showWithAction() {
            try {
                this.$message.info({
                    message: "这是一条带操作按钮的消息",
                    action: {
                        text: "查看详情",
                        callback: () => {
                            uni.showToast({
                                title: "点击了查看详情",
                                icon: "none",
                            });
                        },
                    },
                });
                this.lastMessage = "显示了带操作按钮的消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮消息时出错");
            }
        },

        // 带操作按钮的成功消息
        showSuccessAction() {
            try {
                this.$message.success({
                    message: "操作成功",
                    action: {
                        text: "撤销",
                        callback: () => {
                            uni.showToast({
                                title: "撤销了操作",
                                icon: "none",
                            });
                        },
                    },
                });
                this.lastMessage = "显示了带操作按钮的成功消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮成功消息时出错");
            }
        },

        // 带操作按钮的警告消息
        showWarningAction() {
            try {
                this.$message.warning({
                    message: "警告提示",
                    action: {
                        text: "知道了",
                        callback: () => {
                            uni.showToast({
                                title: "确认已知晓",
                                icon: "none",
                            });
                        },
                    },
                });
                this.lastMessage = "显示了带操作按钮的警告消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮警告消息时出错");
            }
        },

        // 带操作按钮的错误消息
        showErrorAction() {
            try {
                this.$message.error({
                    message: "出错了",
                    action: {
                        text: "重试",
                        callback: () => {
                            uni.showToast({
                                title: "正在重试",
                                icon: "none",
                            });
                        },
                    },
                });
                this.lastMessage = "显示了带操作按钮的错误消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮错误消息时出错");
            }
        },

        // 快速操作按钮
        showQuickAction() {
            try {
                this.$message.info({
                    message: "这是一条带快速操作按钮的消息",
                    action: {
                        text: "快速操作",
                        callback: () => {
                            uni.showToast({
                                title: "执行了快速操作",
                                icon: "none",
                            });
                        },
                        quick: true,
                    },
                });
                this.lastMessage = "显示了带快速操作按钮的消息";
            } catch (e) {
                this.handleError(e, "显示带快速操作按钮消息时出错");
            }
        },

        // 持久操作按钮
        showPersistentAction() {
            try {
                this.$message.warning({
                    message: "这是一条持久显示的消息",
                    duration: 0,
                    action: {
                        text: "确认",
                        callback: () => {
                            uni.showToast({
                                title: "已确认",
                                icon: "none",
                            });
                        },
                    },
                });
                this.lastMessage = "显示了持久消息";
            } catch (e) {
                this.handleError(e, "显示持久消息时出错");
            }
        },

        // 点击操作不关闭
        showNoCloseOnAction() {
            try {
                this.$message.info({
                    message: "点击操作按钮后不会自动关闭",
                    action: {
                        text: "执行操作",
                        callback: () => {
                            uni.showToast({
                                title: "执行了操作但消息不会关闭",
                                icon: "none",
                            });
                        },
                        closeOnAction: false,
                    },
                });
                this.lastMessage = "显示了点击不关闭的消息";
            } catch (e) {
                this.handleError(e, "显示点击不关闭的消息时出错");
            }
        },

        // 滚动消息
        showScrollMessage() {
            try {
                this.$message.info({
                    message:
                        "这是一条很长的普通消息通知，当内容超过显示区域宽度时，文字会自动滚动展示。这是内容的后半部分，演示滚动效果。",
                    scrollable: true,
                });
                this.lastMessage = "显示了滚动消息";
            } catch (e) {
                this.handleError(e, "显示滚动消息时出错");
            }
        },

        // 滚动成功消息
        showSuccessScroll() {
            try {
                this.$message.success({
                    message:
                        "这是一条很长的成功消息通知，当内容超过显示区域宽度时，文字会自动滚动展示。这是内容的后半部分，演示滚动效果。",
                    scrollable: true,
                });
                this.lastMessage = "显示了滚动成功消息";
            } catch (e) {
                this.handleError(e, "显示滚动成功消息时出错");
            }
        },

        // 滚动警告消息
        showWarningScroll() {
            try {
                this.$message.warning({
                    message:
                        "这是一条很长的警告消息通知，当内容超过显示区域宽度时，文字会自动滚动展示。这是内容的后半部分，演示滚动效果。",
                    scrollable: true,
                });
                this.lastMessage = "显示了滚动警告消息";
            } catch (e) {
                this.handleError(e, "显示滚动警告消息时出错");
            }
        },

        // 滚动错误消息
        showErrorScroll() {
            try {
                this.$message.error({
                    message:
                        "这是一条很长的错误消息通知，当内容超过显示区域宽度时，文字会自动滚动展示。这是内容的后半部分，演示滚动效果。",
                    scrollable: true,
                });
                this.lastMessage = "显示了滚动错误消息";
            } catch (e) {
                this.handleError(e, "显示滚动错误消息时出错");
            }
        },

        // 自定义滚动消息
        showCustomScrollMessage() {
            try {
                if (!this.customScrollMessage.trim()) {
                    uni.showToast({
                        title: "请输入滚动消息内容",
                        icon: "none",
                    });
                    return;
                }

                this.$message.info({
                    message: this.customScrollMessage,
                    scrollable: true,
                    scrollSpeed: this.scrollSpeed,
                });
                this.lastMessage = "显示了自定义滚动消息";
            } catch (e) {
                this.handleError(e, "显示自定义滚动消息时出错");
            }
        },

        // 滑块变化
        onSpeedChange(e) {
            this.scrollSpeed = e.detail.value;
        },

        // 多条消息
        showMultiple() {
            try {
                this.$message.info("这是第一条消息");
                setTimeout(() => {
                    this.$message.success("这是第二条消息");
                }, 300);
                setTimeout(() => {
                    this.$message.warning("这是第三条消息");
                }, 600);
                setTimeout(() => {
                    this.$message.error("这是第四条消息");
                }, 900);
                this.lastMessage = "显示了多条消息";
            } catch (e) {
                this.handleError(e, "显示多条消息时出错");
            }
        },

        // 富文本消息
        showHtmlMessage() {
            try {
                this.$message.info({
                    message:
                        "<span style='color: blue; font-weight: bold;'>这是一条富文本消息</span>，支持自定义样式。",
                    enableHtml: true,
                });
                this.lastMessage = "显示了富文本消息";
            } catch (e) {
                this.handleError(e, "显示富文本消息时出错");
            }
        },

        // 富文本成功消息
        showHtmlSuccess() {
            try {
                this.$message.success({
                    message:
                        "<span style='font-weight: bold;'>操作成功</span> - <span style='color: #52c41a;'>数据已保存</span>",
                    enableHtml: true,
                });
                this.lastMessage = "显示了富文本成功消息";
            } catch (e) {
                this.handleError(e, "显示富文本成功消息时出错");
            }
        },

        // 富文本消息带操作按钮
        showHtmlWithAction() {
            try {
                this.$message.warning({
                    message:
                        "<span style='color: #faad14; font-weight: bold;'>注意</span>：此操作不可撤销，请谨慎处理。",
                    enableHtml: true,
                    action: {
                        text: "了解详情",
                        callback: () => {
                            uni.showToast({
                                title: "查看详细说明",
                                icon: "none",
                            });
                        },
                    },
                });
                this.lastMessage = "显示了富文本带操作按钮的消息";
            } catch (e) {
                this.handleError(e, "显示富文本带操作按钮消息时出错");
            }
        },

        // 富文本滚动消息
        showHtmlScroll() {
            try {
                this.$message.error({
                    message:
                        "<span style='color: #f5222d; font-weight: bold;'>错误</span>：系统检测到异常，<span style='text-decoration: underline;'>请立即联系管理员</span>进行处理。这是一条很长的富文本消息，将会自动滚动显示。",
                    enableHtml: true,
                    scrollable: true,
                });
                this.lastMessage = "显示了富文本滚动消息";
            } catch (e) {
                this.handleError(e, "显示富文本滚动消息时出错");
            }
        },

        // 错误处理
        handleError(error, context) {
            console.error(`${context}:`, error);
            this.debugInfo = {
                context,
                error: error.message,
                stack: error.stack,
            };
            uni.showToast({
                title: `${context}，请查看控制台`,
                icon: "none",
                duration: 3000,
            });
        },
    },
};
</script>

<style lang="scss">
.message-form {
    margin-top: 20px;
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);

    &__item {
        margin-bottom: 12px;
    }

    &__label {
        display: block;
        font-size: 14px;
        color: #646566;
        margin-bottom: 8px;
    }

    &__input {
        width: 100%;
        padding: 8px 12px;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        height: 40px;
        font-size: 14px;
        color: #333;
        box-sizing: border-box;
    }

    &__slider {
        margin: 8px 0;
    }

    &__actions {
        margin-top: 16px;
    }
}

.icon-test-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
}

.icon-test-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    width: 72px;

    i {
        font-size: 24px;
        margin-bottom: 8px;
    }

    text {
        font-size: 12px;
    }

    &:nth-child(1) i {
        color: #1989fa;
    }

    &:nth-child(2) i {
        color: #28a745;
    }

    &:nth-child(3) i {
        color: #faad14;
    }

    &:nth-child(4) i {
        color: #f44336;
    }
}

.example-page {
    padding-bottom: 32px;
}
</style>
