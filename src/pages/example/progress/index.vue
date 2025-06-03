<template>
    <view class="container">
        <view class="header">
            <view class="title">进度条</view>
            <view class="subtitle">用于展示当前任务的进度</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50"></fanc-progress>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="progress-demo">
                <fanc-progress :percentage="25" color="#f60"></fanc-progress>
                <fanc-progress :percentage="50" color="#1989fa"></fanc-progress>
                <fanc-progress :percentage="75" color="#6c757d"></fanc-progress>
                <fanc-progress
                    :percentage="100"
                    color="linear-gradient(to right, #be99ff, #7232dd)"
                ></fanc-progress>
            </view>
        </view>

        <!-- 轨道颜色 -->
        <view class="section">
            <view class="section-title">轨道颜色</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50" track-color="#e1f5fe"></fanc-progress>
            </view>
        </view>

        <!-- 进度条粗细 -->
        <view class="section">
            <view class="section-title">进度条粗细</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50" :stroke-width="4"></fanc-progress>
                <fanc-progress :percentage="50" :stroke-width="8"></fanc-progress>
                <fanc-progress :percentage="50" :stroke-width="12"></fanc-progress>
                <fanc-progress :percentage="50" :stroke-width="16"></fanc-progress>
            </view>
        </view>

        <!-- 不显示进度文字 -->
        <view class="section">
            <view class="section-title">不显示进度文字</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50" :show-pivot="false"></fanc-progress>
            </view>
        </view>

        <!-- 文字内显 -->
        <view class="section">
            <view class="section-title">文字内显</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50" text-inside></fanc-progress>
            </view>
        </view>

        <!-- 自定义文字内容 -->
        <view class="section">
            <view class="section-title">自定义文字内容</view>
            <view class="progress-demo">
                <fanc-progress
                    :percentage="status.percentage"
                    :pivot-text="status.text"
                ></fanc-progress>
            </view>
        </view>

        <!-- 状态进度条 -->
        <view class="section">
            <view class="section-title">状态进度条</view>
            <view class="progress-demo">
                <fanc-progress :percentage="20" status="normal"></fanc-progress>
                <fanc-progress :percentage="50" status="success"></fanc-progress>
                <fanc-progress :percentage="80" status="warning"></fanc-progress>
                <fanc-progress :percentage="100" status="error"></fanc-progress>
            </view>
        </view>

        <!-- 自定义进度文字背景 -->
        <view class="section">
            <view class="section-title">自定义进度文字背景</view>
            <view class="progress-demo">
                <fanc-progress
                    :percentage="50"
                    pivot-color="#7232dd"
                    pivot-text-color="#fff"
                ></fanc-progress>
            </view>
        </view>

        <!-- 圆角进度条 -->
        <view class="section">
            <view class="section-title">圆角进度条</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50" rounded></fanc-progress>
            </view>
        </view>

        <!-- 条纹进度条 -->
        <view class="section">
            <view class="section-title">条纹进度条</view>
            <view class="progress-demo">
                <fanc-progress :percentage="50" striped></fanc-progress>
                <fanc-progress :percentage="50" striped striped-active></fanc-progress>
            </view>
        </view>

        <!-- 动态进度条 -->
        <view class="section">
            <view class="section-title">动态进度条</view>
            <view class="progress-demo">
                <fanc-progress :percentage="dynamicPercentage"></fanc-progress>
                <view class="button-group">
                    <fanc-button size="small" @click="decreasePercentage">减少</fanc-button>
                    <fanc-button size="small" type="primary" @click="increasePercentage"
                        >增加</fanc-button
                    >
                    <fanc-button size="small" type="success" @click="startProgress"
                        >开始</fanc-button
                    >
                    <fanc-button size="small" type="warning" @click="resetProgress"
                        >重置</fanc-button
                    >
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            status: {
                percentage: 75,
                text: "加载中...",
            },
            dynamicPercentage: 30,
            progressTimer: null,
        };
    },
    beforeDestroy() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
        }
    },
    methods: {
        increasePercentage() {
            if (this.dynamicPercentage < 100) {
                this.dynamicPercentage += 10;
                if (this.dynamicPercentage > 100) {
                    this.dynamicPercentage = 100;
                }
            } else {
                this.$toast.warning("已达到最大值");
            }
        },
        decreasePercentage() {
            if (this.dynamicPercentage > 0) {
                this.dynamicPercentage -= 10;
                if (this.dynamicPercentage < 0) {
                    this.dynamicPercentage = 0;
                }
            } else {
                this.$toast.warning("已达到最小值");
            }
        },
        startProgress() {
            if (this.progressTimer) {
                this.$toast.text("进度条已在运行中");
                return;
            }

            this.resetProgress();
            this.progressTimer = setInterval(() => {
                if (this.dynamicPercentage < 100) {
                    this.dynamicPercentage += 5;
                } else {
                    clearInterval(this.progressTimer);
                    this.progressTimer = null;
                    this.$toast.success("进度已完成");
                }
            }, 500);
        },
        resetProgress() {
            if (this.progressTimer) {
                clearInterval(this.progressTimer);
                this.progressTimer = null;
            }
            this.dynamicPercentage = 0;
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

.progress-demo {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.button-group {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}
</style>
