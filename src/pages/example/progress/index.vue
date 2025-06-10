<template>
    <view class="container">
        <view class="header">
            <view class="title">进度条</view>
            <view class="subtitle">用于展示当前任务的进度</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">线条组织</view>
            <view class="demo-block">
                <fanc-progress :percentage="30" />
                <fanc-progress :percentage="50" />
                <fanc-progress :percentage="70" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">置灰</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" disabled />
            </view>
        </view>

        <view class="section">
            <view class="section-title">样式定制</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" themeColor="pink" pivotText="粉色" />
                <fanc-progress :percentage="50" themeColor="red" pivotText="红色" />
                <fanc-progress :percentage="50" themeColor="purple" pivotText="紫色" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">文本位置</view>
            <view class="demo-block">
                <fanc-progress :percentage="80" textPosition="outside" />
                <view class="subsection-title">内部文本</view>
                <fanc-progress :percentage="50" textPosition="inside" />
                <view class="subsection-title">自定义文本</view>
                <fanc-progress :percentage="75" pivotText="优秀" />
                <fanc-progress :percentage="25" textPosition="outside" pivotText="待提高" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">文本格式化</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" :format="formatText1" />
                <fanc-progress :percentage="50" textPosition="outside" :format="formatText2" />
                <fanc-progress :percentage="80" :format="formatLevel" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">条纹效果</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" striped />
                <view class="subsection-title">动画条纹</view>
                <fanc-progress :percentage="50" striped stripedActive />
            </view>
        </view>

        <view class="section">
            <view class="section-title">圆角样式</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" rounded />
                <fanc-progress :percentage="50" rounded themeColor="pink" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">不同粗细</view>
            <view class="demo-block">
                <view class="subsection-title">外部文本</view>
                <fanc-progress :percentage="50" :strokeWidth="4" textPosition="outside" />
                <fanc-progress :percentage="50" :strokeWidth="8" textPosition="outside" />
                <fanc-progress :percentage="50" :strokeWidth="12" textPosition="outside" />
                <fanc-progress :percentage="50" :strokeWidth="16" textPosition="outside" />

                <view class="subsection-title">内部文本</view>
                <fanc-progress :percentage="50" :strokeWidth="16" />
                <fanc-progress :percentage="50" :strokeWidth="20" />
                <fanc-progress :percentage="50" :strokeWidth="24" />
                <fanc-progress :percentage="50" :strokeWidth="30" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">状态变化</view>
            <view class="demo-block">
                <fanc-progress :percentage="50" status="normal" />
                <fanc-progress :percentage="50" status="success" />
                <fanc-progress :percentage="50" status="warning" />
                <fanc-progress :percentage="50" status="error" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">组合用法</view>
            <view class="demo-block">
                <fanc-progress
                    :percentage="80"
                    rounded
                    themeColor="purple"
                    textPosition="outside"
                />
                <fanc-progress :percentage="60" striped stripedActive rounded themeColor="pink" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">过渡效果</view>
            <view class="demo-block">
                <fanc-progress :percentage="percentage" />
                <view class="button-group">
                    <button class="button button-add" @click="addPercentage">增加</button>
                    <button class="button button-reduce" @click="reducePercentage">减少</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            percentage: 50,
        };
    },
    methods: {
        addPercentage() {
            if (this.percentage < 100) {
                this.percentage += 10;
            }
        },
        reducePercentage() {
            if (this.percentage > 0) {
                this.percentage -= 10;
            }
        },
        // 文本格式化函数示例
        formatText1(percentage) {
            return `进度：${percentage}/100`;
        },
        formatText2(percentage) {
            return `完成度 ${percentage}%`;
        },
        formatLevel(percentage) {
            if (percentage < 30) return "初级";
            if (percentage < 60) return "中级";
            if (percentage < 80) return "高级";
            return "专家";
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
    padding: 16px;
}

.subsection-title {
    font-size: 14px;
    color: #969799;
    margin: 16px 0 8px;
}

.button-group {
    display: flex;
    margin-top: 16px;
    gap: 12px;
}

.button {
    flex: 1;
    height: 36px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    color: #fff;
}

.button-add {
    background-color: #1989fa;
}

.button-reduce {
    background-color: #ee0a24;
}
</style>
