<template>
    <view class="container">
        <view class="header">
            <view class="title">复选框</view>
            <view class="subtitle">用于在选中和非选中状态之间进行切换</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox v-model="checked1" label="复选框1" />
                <fanc-checkbox v-model="checked2" label="复选框2" disabled />
            </view>
        </view>

        <view class="section">
            <view class="section-title">不同尺寸</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox v-model="checked3" label="小尺寸" icon-size="small" />
                <fanc-checkbox v-model="checked4" label="正常尺寸" />
                <fanc-checkbox v-model="checked5" label="大尺寸" icon-size="large" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">不同形状</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox v-model="checked6" label="圆形" shape="round" />
                <fanc-checkbox v-model="checked7" label="方形" shape="square" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox v-model="checked8" label="红色" checked-color="#f44336" />
                <fanc-checkbox v-model="checked9" label="绿色" checked-color="#4caf50" />
                <fanc-checkbox v-model="checked10" label="蓝色" checked-color="#2196f3" />
            </view>
        </view>

        <view class="section">
            <view class="section-title">复选框组</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox-group v-model="groupValue" checked-color="#1989fa">
                    <fanc-checkbox name="a" label="选项A" />
                    <fanc-checkbox name="b" label="选项B" />
                    <fanc-checkbox name="c" label="选项C" />
                </fanc-checkbox-group>
                <view class="result-value">当前选中值: {{ JSON.stringify(groupValue) }}</view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">最大可选数量</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox-group
                    v-model="groupMaxValue"
                    checked-color="#1989fa"
                    :max="2"
                    @exceed-max="onExceedMax"
                >
                    <fanc-checkbox name="a" label="选项A" />
                    <fanc-checkbox name="b" label="选项B" />
                    <fanc-checkbox name="c" label="选项C" />
                    <fanc-checkbox name="d" label="选项D" />
                </fanc-checkbox-group>
                <view class="result-value">
                    <text>当前选中值: {{ JSON.stringify(groupMaxValue) }}</text>
                    <text>最多可选2项</text>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox-group v-model="groupDisabledValue" disabled>
                    <fanc-checkbox name="a" label="选项A" />
                    <fanc-checkbox name="b" label="选项B" />
                    <fanc-checkbox name="c" label="选项C" />
                </fanc-checkbox-group>
                <view class="result-value">
                    当前选中值: {{ JSON.stringify(groupDisabledValue) }}
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">垂直排列</view>
            <view class="checkbox-wrapper">
                <fanc-checkbox-group v-model="groupVerticalValue" direction="vertical">
                    <fanc-checkbox name="a" label="选项A" />
                    <fanc-checkbox name="b" label="选项B" />
                    <fanc-checkbox name="c" label="选项C" />
                </fanc-checkbox-group>
                <view class="result-value">
                    当前选中值: {{ JSON.stringify(groupVerticalValue) }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "checkbox-demo",

    data() {
        return {
            // 基础用法
            checked1: false,
            checked2: true,

            // 不同尺寸
            checked3: true,
            checked4: true,
            checked5: true,

            // 不同形状
            checked6: true,
            checked7: true,

            // 自定义颜色
            checked8: true,
            checked9: true,
            checked10: true,

            // 复选框组
            groupValue: ["a", "c"],

            // 最大可选数量
            groupMaxValue: [],

            // 禁用状态
            groupDisabledValue: ["a"],

            // 垂直排列
            groupVerticalValue: ["b"],
        };
    },

    methods: {
        onExceedMax(max) {
            this.$toast.warning(`最多只能选择${max}项`);
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

.checkbox-wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.result-value {
    margin-top: 12px;
    font-size: 14px;
    color: #969799;
    padding: 8px;
    background-color: #f8f8f8;
    border-radius: 4px;
}

.result-value text {
    display: block;
    line-height: 1.5;
}

/* 设置主题色变量 */
:root {
    --fanc-primary-color: #1989fa;
    --text-primary: #323233;
    --text-disabled: #c8c9cc;
}
</style>
