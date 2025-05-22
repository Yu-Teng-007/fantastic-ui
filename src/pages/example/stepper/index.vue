<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">步进器组件</text>
            <text class="example-page__header-desc"
                >步进器组件，用于增加或减少数值，常用于商品数量选择</text
            >
        </view>

        <view class="example-section">
            <view class="example-section__title">基础用法</view>
            <view class="example-section__desc">通过 value 绑定当前值，支持双向绑定</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value1" />
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">步长设置</view>
            <view class="example-section__desc">通过 step 属性设置步长，默认为 1</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value2" :step="2" />
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">限制输入范围</view>
            <view class="example-section__desc">通过 min 和 max 属性限制输入范围</view>
            <view class="example-section__desc">最大值10，最小值5</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value3" :min="5" :max="10" />
                <view class="example-section__result">
                    <text>当前值: {{ value3 }}</text>
                </view>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">禁用状态</view>
            <view class="example-section__desc">通过 disabled 属性设置禁用状态</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value4" disabled />
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">禁用输入框</view>
            <view class="example-section__desc">通过 disable-input 属性禁用输入框</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value5" disable-input />
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">固定小数位数</view>
            <view class="example-section__desc"
                >通过 decimal-length 属性设置固定显示的小数位数</view
            >
            <view class="example-section__content">
                <fanc-stepper v-model="value6" :step="0.2" :decimal-length="1" />
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">自定义大小</view>
            <view class="example-section__desc"
                >通过 input-width 和 button-size 属性自定义大小</view
            >
            <view class="example-section__content">
                <fanc-stepper v-model="value7" input-width="60px" button-size="20" />
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">圆角风格</view>
            <view class="example-section__desc">设置 theme 属性为 round 展示圆角风格</view>
            <view class="example-section__content">
                <view class="example-section__row">
                    <view class="example-section__item">
                        <view class="example-section__item-title">方形风格（默认）</view>
                        <fanc-stepper v-model="value8" />
                    </view>
                    <view class="example-section__item">
                        <view class="example-section__item-title">圆角风格</view>
                        <fanc-stepper v-model="value8" theme="round" />
                    </view>
                </view>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">异步变更</view>
            <view class="example-section__desc">通过监听 change 事件处理异步逻辑</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value9" @change="onChange" />
            </view>
            <view class="example-section__result" v-if="asyncResult">
                <text>异步结果: {{ asyncResult }}</text>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">禁用增加/减少按钮</view>
            <view class="example-section__desc"
                >通过 disable-plus 和 disable-minus 属性禁用按钮</view
            >
            <view class="example-section__content">
                <fanc-stepper v-model="value10" disable-plus />
                <view style="margin-top: 10px">
                    <fanc-stepper v-model="value11" disable-minus />
                </view>
            </view>
        </view>

        <view class="example-section">
            <view class="example-section__title">长按连续增减</view>
            <view class="example-section__desc">长按按钮可以连续增减数值</view>
            <view class="example-section__content">
                <fanc-stepper v-model="value14" :min="0" :max="100" />
                <view class="example-section__result">
                    <text>当前值: {{ value14 }}</text>
                    <view class="example-section__tip">
                        <text>提示：长按加减按钮可以快速增减值，长按时间越长，变化越快</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value1: 1,
            value2: 1,
            value3: 5,
            value4: 1,
            value5: 1,
            value6: 1.0,
            value7: 1,
            value8: 1,
            value9: 1,
            value10: 10,
            value11: 1,
            value12: 5,
            value13: 0,
            value14: 50,
            value15: 0,
            asyncResult: "",
        };
    },
    methods: {
        onChange(value) {
            this.asyncResult = `正在处理数值: ${value}`;

            // 模拟异步操作
            setTimeout(() => {
                this.asyncResult = `数值 ${value} 已更新`;
            }, 500);
        },
    },
};
</script>

<style scoped>
.example-page {
    padding: 16px;
    background-color: #f7f8fa;
}

.example-page__header {
    margin-bottom: 20px;
}

.example-page__header-title {
    font-size: 20px;
    font-weight: bold;
    color: #323233;
    display: block;
    margin-bottom: 8px;
}

.example-page__header-desc {
    font-size: 14px;
    color: #969799;
    display: block;
}

.example-section {
    margin-bottom: 24px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.example-section__title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.example-section__desc {
    font-size: 14px;
    color: #969799;
    margin-bottom: 16px;
}

.example-section__content {
    display: flex;
    flex-direction: column;
}

.example-section__result {
    margin-top: 12px;
    padding: 8px;
    background-color: #f2f3f5;
    border-radius: 4px;
    font-size: 14px;
    color: #323233;
}

.example-section__row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.example-section__item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.example-section__item-title {
    font-size: 14px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.example-section__tip {
    margin-top: 10px;
    font-size: 12px;
    color: #969799;
}

.test-link {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #1989fa;
    color: white;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
}
</style>
