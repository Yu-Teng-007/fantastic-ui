<template>
    <view class="container">
        <view class="header">
            <view class="title">步骤条</view>
            <view class="subtitle">用于任务步骤展示或任务进度展示</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-steps :active="active">
                    <fanc-step title="步骤一" description="这是第一步的描述信息"></fanc-step>
                    <fanc-step title="步骤二" description="这是第二步的描述信息"></fanc-step>
                    <fanc-step title="步骤三" description="这是第三步的描述信息"></fanc-step>
                    <fanc-step title="步骤四" description="这是第四步的描述信息"></fanc-step>
                </fanc-steps>

                <view class="demo-buttons">
                    <fanc-button size="small" @click="prev">上一步</fanc-button>
                    <fanc-button size="small" type="primary" @click="next">下一步</fanc-button>
                </view>
            </view>
        </view>

        <!-- 竖向步骤条 -->
        <view class="section">
            <view class="section-title">竖向步骤条</view>
            <view class="demo-block">
                <fanc-steps :active="active" direction="vertical">
                    <fanc-step title="步骤一" description="这是第一步的描述信息"></fanc-step>
                    <fanc-step title="步骤二" description="这是第二步的描述信息"></fanc-step>
                    <fanc-step title="步骤三" description="这是第三步的描述信息"></fanc-step>
                    <fanc-step title="步骤四" description="这是第四步的描述信息"></fanc-step>
                </fanc-steps>
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="section">
            <view class="section-title">自定义图标</view>
            <view class="demo-block">
                <fanc-steps :active="1">
                    <fanc-step title="登录" icon="user"></fanc-step>
                    <fanc-step title="信息填写" icon="edit"></fanc-step>
                    <fanc-step title="付款" icon="credit-card"></fanc-step>
                    <fanc-step title="完成" icon="check-circle"></fanc-step>
                </fanc-steps>
            </view>
        </view>

        <!-- 自定义状态 -->
        <view class="section">
            <view class="section-title">自定义状态</view>
            <view class="demo-block">
                <fanc-steps :active="1">
                    <fanc-step title="已完成" status="finish"></fanc-step>
                    <fanc-step title="进行中" status="process"></fanc-step>
                    <fanc-step title="待处理" status="wait"></fanc-step>
                    <fanc-step title="出错了" status="error"></fanc-step>
                </fanc-steps>
            </view>
        </view>

        <!-- 居中展示 -->
        <view class="section">
            <view class="section-title">居中展示</view>
            <view class="demo-block">
                <fanc-steps :active="1" center>
                    <fanc-step title="步骤一" description="这是第一步的描述信息"></fanc-step>
                    <fanc-step title="步骤二" description="这是第二步的描述信息"></fanc-step>
                    <fanc-step title="步骤三" description="这是第三步的描述信息"></fanc-step>
                </fanc-steps>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="demo-block">
                <fanc-steps :active="1" active-color="#07c160" inactive-color="#cccccc">
                    <fanc-step title="步骤一" description="已完成"></fanc-step>
                    <fanc-step title="步骤二" description="进行中"></fanc-step>
                    <fanc-step title="步骤三" description="待进行"></fanc-step>
                </fanc-steps>
            </view>
        </view>

        <!-- 任务步骤展示 -->
        <view class="section">
            <view class="section-title">任务步骤展示</view>
            <view class="demo-block">
                <fanc-steps :active="2">
                    <fanc-step title="已完成">
                        <text class="step-status">2023-05-01 12:30</text>
                    </fanc-step>
                    <fanc-step title="进行中">
                        <text class="step-status">2023-05-02 10:15</text>
                    </fanc-step>
                    <fanc-step title="待处理">
                        <text class="step-status">预计 2023-05-03</text>
                    </fanc-step>
                    <fanc-step title="完成">
                        <text class="step-status">预计 2023-05-04</text>
                    </fanc-step>
                </fanc-steps>
            </view>
        </view>

        <!-- 水平简约步骤条 -->
        <view class="section">
            <view class="section-title">水平简约步骤条</view>
            <view class="demo-block">
                <view class="simple-steps">
                    <view class="simple-steps__item" v-for="(item, index) in 4" :key="index">
                        <view
                            class="simple-steps__dot"
                            :class="{
                                'simple-steps__dot--active': index <= active,
                                'simple-steps__dot--first': index === 0,
                                'simple-steps__dot--last': index === 3,
                            }"
                        ></view>
                        <view
                            v-if="index < 3"
                            class="simple-steps__line"
                            :class="{ 'simple-steps__line--active': index < active }"
                        ></view>
                    </view>
                </view>
                <view class="simple-steps__labels">
                    <text class="simple-steps__label">已完成</text>
                    <text class="simple-steps__label">当前步骤</text>
                    <text class="simple-steps__label">未完成</text>
                    <text class="simple-steps__label">未完成</text>
                </view>
            </view>
        </view>

        <!-- 水平路线步骤条 -->
        <view class="section">
            <view class="section-title">水平路线步骤条</view>
            <view class="demo-block">
                <view class="route-steps">
                    <view class="route-steps__item" v-for="(item, index) in 4" :key="index">
                        <view
                            class="route-steps__icon"
                            :class="{
                                'route-steps__icon--active': index <= active,
                                'route-steps__icon--first': index === 0,
                                'route-steps__icon--last': index === 3,
                            }"
                        >
                            <fanc-icon
                                v-if="index <= active"
                                name="shopping-cart"
                                color="#fff"
                                size="14"
                            ></fanc-icon>
                        </view>
                        <view
                            v-if="index < 3"
                            class="route-steps__line"
                            :class="{ 'route-steps__line--active': index < active }"
                        ></view>
                    </view>
                </view>
                <view class="route-steps__labels">
                    <text class="route-steps__label">已完成</text>
                    <text class="route-steps__label">当前步骤</text>
                    <text class="route-steps__label">未完成</text>
                    <text class="route-steps__label">未完成</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            active: 1,
        };
    },
    methods: {
        next() {
            if (this.active >= 3) {
                this.$toast.text("已经是最后一步了");
                return;
            }
            this.active++;
        },
        prev() {
            if (this.active <= 0) {
                this.$toast.text("已经是第一步了");
                return;
            }
            this.active--;
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

.demo-block {
    padding: 20px 16px;
}

.demo-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 16px;
}

.step-status {
    font-size: 12px;
    color: #969799;
}

/* 简约步骤条样式 */
.simple-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 20px;
    height: 30px;
}

.simple-steps__item {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
}

.simple-steps__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #dcdee0;
    z-index: 1;
}

.simple-steps__dot--active {
    background-color: #007bff;
}

.simple-steps__line {
    flex: 1;
    height: 1px;
    background-color: #dcdee0;
}

.simple-steps__line--active {
    background-color: #007bff;
}

.simple-steps__labels {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 8px;
}

.simple-steps__label {
    font-size: 12px;
    color: #969799;
    flex: 1;
    text-align: center;
}

/* 路线步骤条样式 */
.route-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 20px;
    height: 40px;
}

.route-steps__item {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
}

.route-steps__icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #dcdee0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.route-steps__icon--active {
    background-color: #007bff;
}

.route-steps__line {
    flex: 1;
    height: 2px;
    background-color: #dcdee0;
}

.route-steps__line--active {
    background-color: #007bff;
}

.route-steps__labels {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 8px;
}

.route-steps__label {
    font-size: 12px;
    color: #969799;
    flex: 1;
    text-align: center;
}
</style>
