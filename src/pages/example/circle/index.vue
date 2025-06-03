<template>
    <view class="container">
        <view class="header">
            <view class="title">环形进度条</view>
            <view class="subtitle">用于展示当前任务的环形进度</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="circle-demo">
                <fanc-circle :rate="30"></fanc-circle>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="circle-demo">
                <fanc-circle :rate="30" color="#f60"></fanc-circle>
                <fanc-circle :rate="60" color="#1989fa"></fanc-circle>
                <fanc-circle
                    :rate="80"
                    color="linear-gradient(to right, #be99ff, #7232dd)"
                ></fanc-circle>
            </view>
        </view>

        <!-- 轨道颜色 -->
        <view class="section">
            <view class="section-title">轨道颜色</view>
            <view class="circle-demo">
                <fanc-circle :rate="50" layer-color="#e1f5fe"></fanc-circle>
            </view>
        </view>

        <!-- 环形宽度 -->
        <view class="section">
            <view class="section-title">环形宽度</view>
            <view class="circle-demo">
                <fanc-circle :rate="50" :stroke-width="60"></fanc-circle>
                <fanc-circle :rate="50" :stroke-width="40"></fanc-circle>
                <fanc-circle :rate="50" :stroke-width="20"></fanc-circle>
            </view>
        </view>

        <!-- 环形尺寸 -->
        <view class="section">
            <view class="section-title">环形尺寸</view>
            <view class="circle-demo">
                <fanc-circle :rate="50" :size="150"></fanc-circle>
                <fanc-circle :rate="50" :size="100"></fanc-circle>
                <fanc-circle :rate="50" :size="80"></fanc-circle>
            </view>
        </view>

        <!-- 自定义文字内容 -->
        <view class="section">
            <view class="section-title">自定义文字内容</view>
            <view class="circle-demo">
                <fanc-circle :rate="customTextRate" text="加载中..."></fanc-circle>
                <fanc-circle :rate="customTextRate">
                    <view class="custom-text">
                        <view class="custom-text__value">{{ customTextRate }}</view>
                        <view class="custom-text__label">进度</view>
                    </view>
                </fanc-circle>
            </view>
        </view>

        <!-- 文字样式 -->
        <view class="section">
            <view class="section-title">文字样式</view>
            <view class="circle-demo">
                <fanc-circle :rate="50" text-color="#7232dd" font-size="24px"></fanc-circle>
            </view>
        </view>

        <!-- 圆角样式 -->
        <view class="section">
            <view class="section-title">圆角样式</view>
            <view class="circle-demo">
                <fanc-circle :rate="50" stroke-linecap="round"></fanc-circle>
                <fanc-circle :rate="50" stroke-linecap="butt"></fanc-circle>
                <fanc-circle :rate="50" stroke-linecap="square"></fanc-circle>
            </view>
        </view>

        <!-- 进度方向 -->
        <view class="section">
            <view class="section-title">进度方向</view>
            <view class="circle-demo">
                <fanc-circle :rate="50" :clockwise="true"></fanc-circle>
                <fanc-circle :rate="50" :clockwise="false"></fanc-circle>
            </view>
        </view>

        <!-- 状态进度条 -->
        <view class="section">
            <view class="section-title">状态进度条</view>
            <view class="circle-demo">
                <fanc-circle :rate="25" status="normal"></fanc-circle>
                <fanc-circle :rate="50" status="success"></fanc-circle>
                <fanc-circle :rate="75" status="warning"></fanc-circle>
                <fanc-circle :rate="100" status="error"></fanc-circle>
            </view>
        </view>

        <!-- 动画速度 -->
        <view class="section">
            <view class="section-title">动画速度</view>
            <view class="circle-demo">
                <fanc-circle :rate="speedRate" :speed="3000"></fanc-circle>
                <fanc-circle :rate="speedRate" :speed="1500"></fanc-circle>
                <fanc-circle :rate="speedRate" :speed="500"></fanc-circle>
            </view>
            <view class="button-group">
                <fanc-button size="small" @click="resetSpeedRate">重置</fanc-button>
                <fanc-button size="small" type="primary" @click="updateSpeedRate">更新</fanc-button>
            </view>
        </view>

        <!-- 动态进度条 -->
        <view class="section">
            <view class="section-title">动态进度条</view>
            <view class="circle-demo">
                <fanc-circle :rate="dynamicRate"></fanc-circle>
            </view>
            <view class="button-group">
                <fanc-button size="small" @click="decreaseRate">减少</fanc-button>
                <fanc-button size="small" type="primary" @click="increaseRate">增加</fanc-button>
                <fanc-button size="small" type="success" @click="startProgress">开始</fanc-button>
                <fanc-button size="small" type="warning" @click="resetProgress">重置</fanc-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            dynamicRate: 30,
            customTextRate: 75,
            speedRate: 0,
            progressTimer: null,
        };
    },
    beforeDestroy() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
        }
    },
    methods: {
        increaseRate() {
            if (this.dynamicRate < 100) {
                this.dynamicRate += 10;
                if (this.dynamicRate > 100) {
                    this.dynamicRate = 100;
                }
            } else {
                this.$toast.warning("已达到最大值");
            }
        },
        decreaseRate() {
            if (this.dynamicRate > 0) {
                this.dynamicRate -= 10;
                if (this.dynamicRate < 0) {
                    this.dynamicRate = 0;
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
                if (this.dynamicRate < 100) {
                    this.dynamicRate += 5;
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
            this.dynamicRate = 0;
        },
        updateSpeedRate() {
            this.speedRate = 100;
        },
        resetSpeedRate() {
            this.speedRate = 0;
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

.circle-demo {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: space-around;
}

.button-group {
    display: flex;
    gap: 8px;
    margin: 0 16px 16px;
}

.custom-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.custom-text__value {
    font-size: 24px;
    font-weight: bold;
    color: #323233;
}

.custom-text__label {
    font-size: 12px;
    color: #969799;
    margin-top: 4px;
}
</style>
