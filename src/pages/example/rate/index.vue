<template>
    <view class="container">
        <view class="header">
            <view class="title">评分</view>
            <view class="subtitle">用于对事物进行评级操作，展示评分结果</view>
        </view>

        <!-- 基础功能 -->
        <view class="section">
            <view class="section-title">基础功能</view>

            <!-- 基础用法 -->
            <view class="rate-demo">
                <view class="demo-title">基础用法</view>
                <fanc-rate v-model="value1" />
                <text class="rate-value">当前值：{{ value1 }}</text>
            </view>

            <!-- 半星 -->
            <view class="rate-demo">
                <view class="demo-title">半星评分</view>
                <fanc-rate v-model="value7" :allowHalf="true" />
                <text class="rate-value">当前值：{{ value7 }}</text>
            </view>

            <!-- 监听事件 -->
            <view class="rate-demo">
                <view class="demo-title">监听事件</view>
                <fanc-rate v-model="value10" @change="onChange" />
                <text class="rate-value">点击星星触发事件，当前值：{{ value10 }}</text>
            </view>
        </view>

        <!-- 自定义外观 -->
        <view class="section">
            <view class="section-title">自定义外观</view>

            <!-- 自定义图标 -->
            <view class="rate-demo">
                <view class="demo-title">自定义图标</view>
                <fanc-rate v-model="value2" activeIcon="heart" inactiveIcon="heart-o" />
                <text class="rate-value">使用心形图标</text>
            </view>

            <!-- 自定义半星图标 -->
            <view class="rate-demo">
                <view class="demo-title">自定义半星图标</view>
                <fanc-rate
                    v-model="value25"
                    :allowHalf="true"
                    activeIcon="heart"
                    inactiveIcon="heart-o"
                    halfIcon="heart-half"
                    activeColor="#ff5252"
                />
                <text class="rate-value">使用心形图标和半心图标，当前值：{{ value25 }}</text>
            </view>

            <!-- 自定义颜色 -->
            <view class="rate-demo">
                <view class="demo-title">自定义颜色</view>
                <fanc-rate v-model="value3" activeColor="#ff5252" inactiveColor="#dddddd" />
                <text class="rate-value">自定义选中和未选中的颜色</text>
            </view>

            <!-- 自定义大小和间距 -->
            <view class="rate-demo">
                <view class="demo-title">自定义大小和间距</view>
                <fanc-rate v-model="value5" size="30" :gutter="16" />
                <text class="rate-value">大小：30px，间距：16px</text>
            </view>

            <!-- 自定义数量 -->
            <view class="rate-demo">
                <view class="demo-title">自定义数量</view>
                <fanc-rate v-model="value4" :count="8" />
                <text class="rate-value">8颗星</text>
            </view>
        </view>

        <!-- 交互功能 -->
        <view class="section">
            <view class="section-title">交互功能</view>

            <!-- 气泡提示 -->
            <view class="rate-demo">
                <view class="demo-title">气泡提示</view>
                <fanc-rate v-model="value11" :showBubble="true" />
                <text class="rate-value">点击星星查看带图标的气泡效果</text>
            </view>

            <!-- 半星选择气泡 -->
            <view class="rate-demo">
                <view class="demo-title">半星选择气泡</view>
                <fanc-rate v-model="value13" :allowHalf="true" :showBubble="true" />
                <text class="rate-value">点击星星后选择半星或整星，当前值：{{ value13 }}</text>
            </view>

            <!-- 自定义气泡行为 -->
            <view class="rate-demo">
                <view class="demo-title">自定义气泡行为</view>
                <fanc-rate
                    v-model="value15"
                    :allowHalf="true"
                    :showBubble="true"
                    :autoCloseBubble="true"
                    :bubbleDuration="2000"
                />
                <text class="rate-value">允许半星但气泡会自动关闭(2秒)，当前值：{{ value15 }}</text>
            </view>

            <!-- 滑动评分 -->
            <view class="rate-demo">
                <view class="demo-title">滑动评分</view>
                <fanc-rate v-model="value22" :touchable="true" :allowHalf="true" />
                <text class="rate-value"
                    >在星星上左右滑动可更改评分，支持半星，当前值：{{ value22 }}</text
                >
            </view>
        </view>

        <!-- 状态与描述 -->
        <view class="section">
            <view class="section-title">状态与描述</view>

            <!-- 只读状态 -->
            <view class="rate-demo">
                <view class="demo-title">只读状态</view>
                <fanc-rate v-model="value8" :readonly="true" />
                <text class="rate-value">不可修改，只作展示</text>
            </view>

            <!-- 禁用状态 -->
            <view class="rate-demo">
                <view class="demo-title">禁用状态</view>
                <fanc-rate v-model="value9" :disabled="true" />
                <text class="rate-value">置灰显示，不可操作</text>
            </view>

            <!-- 右侧带描述评分 -->
            <view class="rate-demo">
                <view class="demo-title">右侧带描述评分</view>
                <fanc-rate
                    v-model="value17"
                    :showDescription="true"
                    :descriptions="descriptions"
                    descriptionPosition="right"
                    unselectedDescription="请选择评分"
                />
                <text class="rate-value">当前值：{{ value17 }}</text>
            </view>

            <!-- 左侧带描述评分 -->
            <view class="rate-demo">
                <view class="demo-title">左侧带描述评分</view>
                <fanc-rate
                    v-model="value18"
                    :showDescription="true"
                    :descriptions="descriptions"
                    descriptionPosition="left"
                    unselectedDescription="请选择评分"
                />
                <text class="rate-value">当前值：{{ value18 }}</text>
            </view>

            <!-- 带描述的半星评分 -->
            <view class="rate-demo">
                <view class="demo-title">带描述的半星评分</view>
                <fanc-rate
                    v-model="value19"
                    :allowHalf="true"
                    :showBubble="true"
                    :showDescription="true"
                    :descriptions="descriptions"
                    descriptionPosition="right"
                    unselectedDescription="请选择评分"
                />
                <text class="rate-value">结合半星和描述，当前值：{{ value19 }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value1: 3,
            value2: 3,
            value3: 3,
            value4: 4,
            value5: 3,
            value7: 3.5,
            value8: 4,
            value9: 2,
            value10: 3,
            value11: 0,
            value13: 2.5,
            value15: 2.5,
            value17: 0,
            value18: 0,
            value19: 0,
            value22: 2.5,
            value25: 4.5,
            descriptions: ["很差", "差", "一般", "好评", "优秀"],
        };
    },
    methods: {
        onChange(value) {
            this.$toast.text(`当前评分：${value}`);
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

.rate-demo {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid #f8f8f8;
}

.rate-demo:last-child {
    border-bottom: none;
}

.demo-title {
    font-size: 14px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 12px;
}

.rate-value {
    margin-top: 8px;
    font-size: 12px;
    color: #969799;
}
</style>
