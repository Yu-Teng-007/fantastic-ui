<template>
    <view class="container">
        <view class="header">
            <view class="title">单选框</view>
            <view class="subtitle">在一组备选项中进行单选</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="radio-wrapper">
                <view class="radio-group">
                    <fanc-radio v-model="checked1" label="单选框1" />
                    <fanc-radio v-model="checked2" label="单选框2" disabled />
                </view>
            </view>
        </view>

        <!-- 不同形状 -->
        <view class="section">
            <view class="section-title">不同形状</view>
            <view class="radio-wrapper">
                <view class="radio-group">
                    <fanc-radio v-model="shapeChecked1" label="圆形" shape="round" />
                    <fanc-radio v-model="shapeChecked2" label="方形" shape="square" />
                </view>
            </view>
        </view>

        <!-- 不同选中样式 -->
        <view class="section">
            <view class="section-title">不同选中样式</view>
            <view class="radio-wrapper">
                <view class="radio-group">
                    <fanc-radio v-model="checkTypeChecked1" label="圆点样式" />
                    <fanc-radio v-model="checkTypeChecked2" label="对勾样式" check-type="check" />
                </view>
            </view>
        </view>

        <!-- 不同尺寸 -->
        <view class="section">
            <view class="section-title">不同尺寸</view>
            <view class="radio-wrapper">
                <view class="radio-group">
                    <fanc-radio v-model="checked3" label="小尺寸" icon-size="small" />
                    <fanc-radio v-model="checked4" label="正常尺寸" />
                    <fanc-radio v-model="checked5" label="大尺寸" icon-size="large" />
                </view>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="radio-wrapper">
                <view class="radio-group">
                    <fanc-radio v-model="checked6" label="红色" checked-color="#f44336" />
                    <fanc-radio v-model="checked7" label="绿色" checked-color="#4caf50" />
                    <fanc-radio v-model="checked8" label="蓝色" checked-color="#2196f3" />
                </view>
            </view>
        </view>

        <!-- 单选框组 -->
        <view class="section">
            <view class="section-title">单选框组</view>
            <view class="radio-wrapper">
                <fanc-radio-group v-model="groupValue" checked-color="#1989fa">
                    <fanc-radio name="a" label="选项A" />
                    <fanc-radio name="b" label="选项B" />
                    <fanc-radio name="c" label="选项C" />
                </fanc-radio-group>
                <view class="result-value">当前选中值: {{ groupValue }}</view>
            </view>
        </view>

        <!-- 单选框组选中样式 -->
        <view class="section">
            <view class="section-title">单选框组选中样式</view>
            <view class="radio-wrapper">
                <fanc-radio-group
                    v-model="groupCheckTypeValue"
                    check-type="check"
                    checked-color="#1989fa"
                >
                    <fanc-radio name="a" label="选项A" />
                    <fanc-radio name="b" label="选项B" />
                    <fanc-radio name="c" label="选项C" />
                </fanc-radio-group>
                <view class="result-value">当前选中值: {{ groupCheckTypeValue }}</view>
            </view>
        </view>

        <!-- 单选框组形状 -->
        <view class="section">
            <view class="section-title">单选框组形状</view>
            <view class="radio-wrapper">
                <fanc-radio-group v-model="groupShapeValue" shape="square" checked-color="#1989fa">
                    <fanc-radio name="a" label="选项A" />
                    <fanc-radio name="b" label="选项B" />
                    <fanc-radio name="c" label="选项C" />
                </fanc-radio-group>
                <view class="result-value">当前选中值: {{ groupShapeValue }}</view>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="radio-wrapper">
                <fanc-radio-group v-model="groupDisabledValue" disabled>
                    <fanc-radio name="a" label="选项A" />
                    <fanc-radio name="b" label="选项B" />
                    <fanc-radio name="c" label="选项C" />
                </fanc-radio-group>
                <view class="result-value">当前选中值: {{ groupDisabledValue }}</view>
            </view>
        </view>

        <!-- 垂直排列 -->
        <view class="section">
            <view class="section-title">垂直排列</view>
            <view class="radio-wrapper">
                <fanc-radio-group v-model="groupVerticalValue" direction="vertical">
                    <fanc-radio name="a" label="选项A" />
                    <fanc-radio name="b" label="选项B" />
                    <fanc-radio name="c" label="选项C" />
                </fanc-radio-group>
                <view class="result-value">当前选中值: {{ groupVerticalValue }}</view>
            </view>
        </view>

        <!-- 单选框组混合形状 -->
        <view class="section">
            <view class="section-title">单选框组混合形状</view>
            <view class="radio-wrapper">
                <fanc-radio-group v-model="groupMixedShapeValue" shape="round">
                    <fanc-radio name="a" label="继承圆形" />
                    <fanc-radio name="b" label="指定方形" shape="square" />
                </fanc-radio-group>
                <view class="result-value">当前选中值: {{ groupMixedShapeValue }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "radio-demo",

    data() {
        return {
            // 基础用法
            checked1: true,
            checked2: false,

            // 不同形状
            shapeChecked1: true,
            shapeChecked2: true,

            // 不同选中样式
            checkTypeChecked1: true,
            checkTypeChecked2: true,

            // 不同尺寸
            checked3: true,
            checked4: true,
            checked5: true,

            // 自定义颜色
            checked6: true,
            checked7: true,
            checked8: true,

            // 单选框组
            groupValue: "a",

            // 单选框组选中样式
            groupCheckTypeValue: "b",

            // 单选框组形状
            groupShapeValue: "b",

            // 禁用状态
            groupDisabledValue: "b",

            // 垂直排列
            groupVerticalValue: "c",

            // 单选框组混合形状
            groupMixedShapeValue: "a",
        };
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

.radio-wrapper {
    padding: 16px;
}

.radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.result-value {
    margin-top: 12px;
    font-size: 14px;
    color: #969799;
    padding: 8px;
    background-color: #f8f8f8;
    border-radius: 4px;
}

/* 设置主题色变量 */
:root {
    --fanc-primary-color: #1989fa;
    --text-primary: #323233;
    --text-disabled: #c8c9cc;
}
</style>
