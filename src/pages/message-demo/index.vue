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
