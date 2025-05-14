<template>
    <view class="message-demo">
        <view class="message-demo__title">Message 消息通知</view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">基础用法</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showInfo">普通通知</fanc-button>
                <fanc-button type="success" @click="showSuccess">成功通知</fanc-button>
                <fanc-button type="warning" @click="showWarning">警示通知</fanc-button>
                <fanc-button type="danger" @click="showError">错误通知</fanc-button>
            </view>
        </view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">自定义配置</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showCustom">带关闭按钮</fanc-button>
                <fanc-button type="info" @click="showNoIcon">无图标通知</fanc-button>
                <fanc-button type="warning" @click="showLongDuration">显示时间长</fanc-button>
                <fanc-button type="danger" @click="closeAll">关闭所有</fanc-button>
            </view>
        </view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">带操作按钮</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showWithAction">普通操作按钮</fanc-button>
                <fanc-button type="success" @click="showSuccessAction">成功操作按钮</fanc-button>
                <fanc-button type="warning" @click="showWarningAction">警告操作按钮</fanc-button>
                <fanc-button type="danger" @click="showErrorAction">错误操作按钮</fanc-button>
            </view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showQuickAction">快速操作按钮</fanc-button>
                <fanc-button type="warning" @click="showPersistentAction">持久操作按钮</fanc-button>
            </view>
        </view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">横向滚动消息</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showScrollMessage">普通滚动消息</fanc-button>
                <fanc-button type="success" @click="showSuccessScroll">成功滚动消息</fanc-button>
                <fanc-button type="warning" @click="showWarningScroll">警告滚动消息</fanc-button>
                <fanc-button type="danger" @click="showErrorScroll">错误滚动消息</fanc-button>
            </view>
            <view class="message-demo__form">
                <view class="message-demo__form-item">
                    <text class="message-demo__form-label">自定义滚动消息:</text>
                    <input
                        class="message-demo__form-input"
                        v-model="customScrollMessage"
                        placeholder="输入长文本消息"
                    />
                </view>
                <view class="message-demo__form-item">
                    <text class="message-demo__form-label">滚动速度:</text>
                    <slider
                        class="message-demo__form-slider"
                        min="10"
                        max="100"
                        :value="scrollSpeed"
                        @change="onSpeedChange"
                        show-value
                    />
                </view>
                <view class="message-demo__form-actions">
                    <fanc-button type="primary" @click="showCustomScrollMessage">显示自定义滚动消息</fanc-button>
                </view>
            </view>
        </view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">多条消息</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showMultiple">显示多条</fanc-button>
            </view>
        </view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">测试与状态</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="testMessage">测试消息</fanc-button>
                <fanc-button type="warning" @click="detectPlatform">检测平台</fanc-button>
                <fanc-button type="info" @click="checkIconLib">检查图标库</fanc-button>
                <fanc-button type="danger" @click="showDebugMessage">调试信息</fanc-button>
            </view>
            <view class="message-demo__status" v-if="lastMessage">
                <text>最后一条消息: {{ lastMessage }}</text>
            </view>
            <view class="message-demo__debug" v-if="debugInfo">
                <view class="message-demo__debug-title">调试信息:</view>
                <view v-for="(info, index) in debugInfo" :key="index" class="message-demo__debug-item">
                    <text>{{ info.key }}: {{ info.value }}</text>
                </view>
            </view>
        </view>

        <!-- 测试图标显示 -->
        <view class="message-demo__section" v-if="showIconTest">
            <view class="message-demo__section-title">图标测试</view>
            <view class="message-demo__icons">
                <view class="message-demo__icon-item">
                    <i class="fas fa-info-circle"></i>
                    <text>info</text>
                </view>
                <view class="message-demo__icon-item">
                    <i class="fas fa-check-circle"></i>
                    <text>success</text>
                </view>
                <view class="message-demo__icon-item">
                    <i class="fas fa-exclamation-circle"></i>
                    <text>warning</text>
                </view>
                <view class="message-demo__icon-item">
                    <i class="fas fa-times-circle"></i>
                    <text>error</text>
                </view>
            </view>
        </view>

        <view class="message-demo__section">
            <view class="message-demo__section-title">富文本消息</view>
            <view class="message-demo__buttons">
                <fanc-button type="primary" @click="showHtmlMessage">普通富文本</fanc-button>
                <fanc-button type="success" @click="showHtmlSuccess">成功富文本</fanc-button>
                <fanc-button type="warning" @click="showHtmlWithAction">带操作按钮</fanc-button>
                <fanc-button type="danger" @click="showHtmlScroll">滚动富文本</fanc-button>
            </view>
        </view>
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
                this.$message.warning({
                    message: "这条消息会显示5秒",
                    duration: 5000,
                });
                this.lastMessage = "显示了长时间消息(5秒)";
            } catch (e) {
                this.handleError(e, "显示长时间消息时出错");
            }
        },

        // 带操作按钮的消息 - 普通
        showWithAction() {
            try {
                this.$message.info({
                    message: "这是一条带操作按钮的消息",
                    actionText: "查看详情",
                    duration: 0, // 不自动关闭
                    closable: true,
                    onAction: () => {
                        this.lastMessage = "点击了操作按钮: 查看详情";
                        console.log("执行操作: 查看详情");
                    },
                    onClose: () => {
                        this.lastMessage = "关闭了带操作按钮的消息";
                    },
                });
                this.lastMessage = "显示了带操作按钮的消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮消息时出错");
            }
        },

        // 带操作按钮的消息 - 成功
        showSuccessAction() {
            try {
                this.$message.success({
                    message: "操作已完成",
                    actionText: "撤销",
                    onAction: () => {
                        this.lastMessage = "点击了操作按钮: 撤销";
                        console.log("执行操作: 撤销");
                    },
                });
                this.lastMessage = "显示了带撤销按钮的成功消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮成功消息时出错");
            }
        },

        // 带操作按钮的消息 - 警告
        showWarningAction() {
            try {
                this.$message.warning({
                    message: "检测到潜在风险",
                    actionText: "查看风险",
                    onAction: () => {
                        this.lastMessage = "点击了操作按钮: 查看风险";
                        console.log("执行操作: 查看风险");
                    },
                });
                this.lastMessage = "显示了带操作按钮的警告消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮警告消息时出错");
            }
        },

        // 带操作按钮的消息 - 错误
        showErrorAction() {
            try {
                this.$message.error({
                    message: "提交失败，请检查表单",
                    actionText: "重试",
                    closable: true,
                    onAction: () => {
                        this.lastMessage = "点击了操作按钮: 重试";
                        console.log("执行操作: 重试");
                    },
                });
                this.lastMessage = "显示了带操作按钮的错误消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮错误消息时出错");
            }
        },

        // 普通滚动消息
        showScrollMessage() {
            try {
                this.$message.scroll("这是一条会自动横向滚动的消息，当内容过长时会自动滚动显示全部内容。");
                this.lastMessage = "显示了滚动消息";
            } catch (e) {
                this.handleError(e, "显示滚动消息时出错");
            }
        },

        // 成功滚动消息
        showSuccessScroll() {
            try {
                this.$message.scroll({
                    type: "success",
                    message: "操作已成功完成，这是一条较长的成功消息，会自动横向滚动显示。",
                    duration: 5000,
                });
                this.lastMessage = "显示了成功滚动消息";
            } catch (e) {
                this.handleError(e, "显示成功滚动消息时出错");
            }
        },

        // 警告滚动消息
        showWarningScroll() {
            try {
                this.$message.scroll({
                    type: "warning",
                    message: "警告：系统检测到潜在风险，请注意安全，这是一条较长的警告消息，会自动横向滚动显示。",
                    actionText: "查看详情",
                    onAction: () => {
                        this.lastMessage = "点击了滚动消息的操作按钮";
                    },
                });
                this.lastMessage = "显示了警告滚动消息";
            } catch (e) {
                this.handleError(e, "显示警告滚动消息时出错");
            }
        },

        // 错误滚动消息
        showErrorScroll() {
            try {
                this.$message.scroll({
                    type: "error",
                    message: "错误：提交表单失败，请检查输入并重试。这是一条较长的错误消息，会自动横向滚动显示。",
                    closable: true,
                });
                this.lastMessage = "显示了错误滚动消息";
            } catch (e) {
                this.handleError(e, "显示错误滚动消息时出错");
            }
        },

        // 自定义滚动消息
        showCustomScrollMessage() {
            try {
                if (!this.customScrollMessage) {
                    this.customScrollMessage = "这是默认的滚动消息文本";
                }

                this.$message.scroll({
                    message: this.customScrollMessage,
                    scrollSpeed: this.scrollSpeed,
                    duration: 8000,
                    closable: true,
                });

                this.lastMessage = "显示了自定义滚动消息";
            } catch (e) {
                this.handleError(e, "显示自定义滚动消息时出错");
            }
        },

        // 滚动速度变化
        onSpeedChange(e) {
            this.scrollSpeed = e.detail.value;
        },

        // 显示多条消息
        showMultiple() {
            try {
                this.$message.info("第一条消息");

                setTimeout(() => {
                    this.$message.success("第二条消息");
                }, 300);

                setTimeout(() => {
                    this.$message.warning("第三条消息");
                }, 600);

                setTimeout(() => {
                    this.$message.scroll("第四条消息：这是一条会自动滚动的长消息");
                }, 900);

                this.lastMessage = "显示了多条消息";
            } catch (e) {
                this.handleError(e, "显示多条消息时出错");
            }
        },

        // 关闭所有消息
        closeAll() {
            try {
                this.$message.closeAll();
                this.lastMessage = "已关闭所有消息";
            } catch (e) {
                this.handleError(e, "关闭所有消息时出错");
            }
        },

        // 测试消息
        testMessage() {
            try {
                // 直接创建一个DOM消息来测试
                const div = document.createElement("div");
                div.textContent = "这是一条测试DOM消息";
                div.style.position = "fixed";
                div.style.top = "100px";
                div.style.left = "50%";
                div.style.transform = "translateX(-50%)";
                div.style.backgroundColor = "#67c23a";
                div.style.color = "white";
                div.style.padding = "10px 20px";
                div.style.borderRadius = "4px";
                div.style.zIndex = "10000";
                document.body.appendChild(div);

                setTimeout(() => {
                    if (document.body.contains(div)) {
                        document.body.removeChild(div);
                    }
                }, 3000);

                // 使用API
                this.$message.info({
                    message: "测试消息API",
                    duration: 3000,
                    onClose: () => {
                        this.lastMessage = "测试消息已关闭";
                    },
                });

                this.lastMessage = "测试消息已显示";
            } catch (error) {
                this.handleError(error, "测试消息失败");
            }
        },

        // 检测平台
        detectPlatform() {
            try {
                // 收集环境信息
                const info = [
                    { key: "运行环境", value: process.env.VUE_APP_PLATFORM || "未知" },
                    { key: "User Agent", value: navigator.userAgent },
                    { key: "屏幕尺寸", value: `${window.innerWidth}x${window.innerHeight}` },
                    { key: "vue版本", value: this.$root.$options.version || "未知" },
                ];

                // 检查uni相关API
                if (typeof uni !== "undefined") {
                    info.push({ key: "uni-app可用", value: "是" });

                    // 获取系统信息
                    try {
                        const sysInfo = uni.getSystemInfoSync();
                        info.push({ key: "系统信息", value: JSON.stringify(sysInfo).substring(0, 100) + "..." });
                    } catch (e) {
                        info.push({ key: "获取系统信息", value: "失败:" + e.message });
                    }
                } else {
                    info.push({ key: "uni-app可用", value: "否" });
                }

                this.debugInfo = info;
                this.lastMessage = "已检测平台信息";
            } catch (error) {
                this.handleError(error, "检测平台失败");
            }
        },

        // 检查图标库
        checkIconLib() {
            try {
                this.showIconTest = true;
                this.lastMessage = "已显示图标测试";

                // 使用DOM API检测加载的字体
                if (document && document.fonts) {
                    const fontInfo = [];
                    document.fonts.forEach((font) => {
                        fontInfo.push({
                            key: font.family,
                            value: font.loaded ? "已加载" : "未加载",
                        });
                    });
                    if (fontInfo.length > 0) {
                        this.debugInfo = fontInfo;
                    }
                }
            } catch (error) {
                this.handleError(error, "检查图标库失败");
            }
        },

        // 显示调试信息
        showDebugMessage() {
            try {
                this.$message.info({
                    message: "这是调试消息，将在控制台输出信息",
                    duration: 3000,
                });

                console.log("Message组件:", this.$message);
                console.log("Vue实例:", this);

                // 检查$message是否正确安装
                const debugInfo = [
                    { key: "$message可用", value: typeof this.$message !== "undefined" ? "是" : "否" },
                    { key: "info方法", value: typeof this.$message?.info === "function" ? "是函数" : "不是函数" },
                    { key: "success方法", value: typeof this.$message?.success === "function" ? "是函数" : "不是函数" },
                    { key: "warning方法", value: typeof this.$message?.warning === "function" ? "是函数" : "不是函数" },
                    { key: "error方法", value: typeof this.$message?.error === "function" ? "是函数" : "不是函数" },
                    { key: "scroll方法", value: typeof this.$message?.scroll === "function" ? "是函数" : "不是函数" },
                    {
                        key: "closeAll方法",
                        value: typeof this.$message?.closeAll === "function" ? "是函数" : "不是函数",
                    },
                ];

                this.debugInfo = debugInfo;
                this.lastMessage = "已显示调试信息";
            } catch (error) {
                this.handleError(error, "显示调试信息失败");
            }
        },

        // 快速操作按钮
        showQuickAction() {
            try {
                this.$message.action({
                    message: "使用快捷方法创建的操作按钮消息",
                    actionText: "确认",
                    type: "info",
                    onAction: () => {
                        this.lastMessage = "点击了快速操作按钮: 确认";
                        console.log("执行操作: 确认");
                    },
                });
                this.lastMessage = "显示了快速操作按钮消息";
            } catch (e) {
                this.handleError(e, "显示快速操作按钮消息时出错");
            }
        },

        // 持久操作按钮
        showPersistentAction() {
            try {
                this.$message.action({
                    message: "此消息将持续显示直到点击操作按钮或关闭",
                    actionText: "我知道了",
                    type: "warning",
                    closable: true,
                    onAction: () => {
                        this.lastMessage = "点击了持久操作按钮: 我知道了";
                        console.log("执行操作: 我知道了");
                    },
                });
                this.lastMessage = "显示了持久操作按钮消息";
            } catch (e) {
                this.handleError(e, "显示持久操作按钮消息时出错");
            }
        },

        // 普通富文本消息
        showHtmlMessage() {
            try {
                this.$message.html('<span style="color: #409eff;">蓝色文本</span> 和 <b>粗体文本</b>');
                this.lastMessage = "显示了普通富文本消息";
            } catch (e) {
                this.handleError(e, "显示富文本消息时出错");
            }
        },

        // 成功富文本消息
        showHtmlSuccess() {
            try {
                this.$message.html({
                    type: "success",
                    message: '操作 <b>成功</b>，请查看 <span style="text-decoration: underline;">详情</span>',
                    duration: 5000,
                });
                this.lastMessage = "显示了成功富文本消息";
            } catch (e) {
                this.handleError(e, "显示成功富文本消息时出错");
            }
        },

        // 带操作按钮的富文本消息
        showHtmlWithAction() {
            try {
                this.$message.html({
                    type: "warning",
                    message: '检测到 <b>安全风险</b>，请及时 <span style="color: #ff4d4f;">处理</span>',
                    actionText: "查看详情",
                    closable: true,
                    onAction: () => {
                        this.lastMessage = "点击了富文本消息的操作按钮";
                        console.log("执行操作: 查看详情");
                    },
                });
                this.lastMessage = "显示了带操作按钮的富文本消息";
            } catch (e) {
                this.handleError(e, "显示带操作按钮的富文本消息时出错");
            }
        },

        // 滚动富文本消息
        showHtmlScroll() {
            try {
                const htmlContent =
                    '<span style="color: #ff4d4f;">重要通知：</span> 这是一条包含 <b>富文本格式</b> 的滚动消息，支持 <i>各种</i> <u>HTML</u> <span style="color: #52c41a;">样式</span> 和 <span style="font-size: 16px;">格式</span>';

                this.$message.html({
                    type: "error",
                    message: htmlContent,
                    scrollable: true,
                    duration: 8000,
                    closable: true,
                });
                this.lastMessage = "显示了滚动富文本消息";
            } catch (e) {
                this.handleError(e, "显示滚动富文本消息时出错");
            }
        },

        // 统一错误处理
        handleError(error, prefix = "错误") {
            console.error(error);
            this.lastMessage = `${prefix}: ${error.message}`;

            // 显示更详细的错误信息
            this.debugInfo = [
                { key: "错误类型", value: error.name || "未知类型" },
                { key: "错误消息", value: error.message },
                { key: "错误位置", value: error.stack ? error.stack.split("\n")[1] : "未知" },
            ];
        },
    },
};
</script>

<style lang="scss">
.message-demo {
    padding: 20px;

    &__title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
        text-align: center;
    }

    &__section {
        margin-bottom: 30px;
    }

    &__section-title {
        font-size: 18px;
        margin-bottom: 16px;
        color: #333;
        font-weight: 500;
    }

    &__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 16px;
    }

    &__form {
        margin-top: 20px;
        background-color: #f5f7fa;
        padding: 16px;
        border-radius: 4px;

        &-item {
            margin-bottom: 16px;
        }

        &-label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #606266;
        }

        &-input {
            width: 100%;
            height: 36px;
            padding: 0 12px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            font-size: 14px;
            color: #606266;
            background-color: #fff;
        }

        &-slider {
            margin: 10px 0;
        }

        &-actions {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
        }
    }

    &__status {
        margin-top: 16px;
        padding: 12px;
        background-color: #f5f7fa;
        border-radius: 4px;
        font-size: 14px;
        color: #606266;
    }

    &__debug {
        margin-top: 16px;
        padding: 12px;
        background-color: #f5f7fa;
        border-radius: 4px;
        font-size: 14px;

        &-title {
            font-weight: bold;
            margin-bottom: 8px;
            color: #303133;
        }

        &-item {
            padding: 4px 0;
            color: #606266;
            word-break: break-all;
        }
    }

    &__icons {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 16px;
    }

    &__icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        i {
            font-size: 24px;
            margin-bottom: 8px;
        }

        text {
            font-size: 14px;
        }
    }
}
</style>
