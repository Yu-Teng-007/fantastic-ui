<template>
    <view class="container">
        <view class="header">
            <text class="title">数字键盘示例</text>
            <text class="desc">常用于输入密码、验证码等纯数字场景</text>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="input-display">{{ basicValue || "点击输入内容" }}</view>
            <fanc-button type="primary" @click="showBasicKeyboard = true">显示键盘</fanc-button>
            <fanc-number-keyboard
                :show="showBasicKeyboard"
                @input="onBasicInput"
                @delete="onBasicDelete"
                @close="showBasicKeyboard = false"
            />
        </view>

        <view class="section">
            <view class="section-title">自定义标题</view>
            <view class="input-display">{{ customTitleValue || "点击输入内容" }}</view>
            <fanc-button type="primary" @click="showCustomTitleKeyboard = true"
                >显示键盘</fanc-button
            >
            <fanc-number-keyboard
                :show="showCustomTitleKeyboard"
                title="请输入支付密码"
                close-button-text="确定"
                @input="onCustomTitleInput"
                @delete="onCustomTitleDelete"
                @close="showCustomTitleKeyboard = false"
            />
        </view>

        <view class="section">
            <view class="section-title">随机数字键盘</view>
            <view class="input-display">{{ randomValue || "点击输入内容" }}</view>
            <fanc-button type="primary" @click="showRandomKeyboard = true">显示键盘</fanc-button>
            <fanc-number-keyboard
                :show="showRandomKeyboard"
                title="安全键盘"
                :random-key-order="true"
                @input="onRandomInput"
                @delete="onRandomDelete"
                @close="showRandomKeyboard = false"
            />
        </view>

        <view class="section">
            <view class="section-title">自定义额外键</view>
            <view class="input-display">{{ customExtraValue || "点击输入内容" }}</view>
            <fanc-button type="primary" @click="showCustomExtraKeyboard = true"
                >显示键盘</fanc-button
            >
            <fanc-number-keyboard
                :show="showCustomExtraKeyboard"
                title="输入金额"
                extra-key="."
                @input="onCustomExtraInput"
                @delete="onCustomExtraDelete"
                @close="showCustomExtraKeyboard = false"
                @function="onFunctionKey"
            />
        </view>

        <view class="section">
            <view class="section-title">无标题栏键盘</view>
            <view class="input-display">{{ noHeaderValue || "点击输入内容" }}</view>
            <fanc-button type="primary" @click="showNoHeaderKeyboard = true">显示键盘</fanc-button>
            <fanc-number-keyboard
                :show="showNoHeaderKeyboard"
                :show-header="false"
                @input="onNoHeaderInput"
                @delete="onNoHeaderDelete"
                @close="showNoHeaderKeyboard = false"
            />
        </view>

        <view class="section">
            <view class="section-title">带关闭图标的键盘</view>
            <view class="input-display">{{ closeIconValue || "点击输入内容" }}</view>
            <fanc-button type="primary" @click="showCloseIconKeyboard = true">显示键盘</fanc-button>
            <fanc-number-keyboard
                :show="showCloseIconKeyboard"
                title="带关闭图标的键盘"
                :show-close-icon="true"
                @input="onCloseIconInput"
                @delete="onCloseIconDelete"
                @close="showCloseIconKeyboard = false"
            />
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础键盘
            showBasicKeyboard: false,
            basicValue: "",

            // 自定义标题键盘
            showCustomTitleKeyboard: false,
            customTitleValue: "",

            // 随机数字键盘
            showRandomKeyboard: false,
            randomValue: "",

            // 自定义额外键键盘
            showCustomExtraKeyboard: false,
            customExtraValue: "",

            // 无标题栏键盘
            showNoHeaderKeyboard: false,
            noHeaderValue: "",

            // 带关闭图标的键盘
            showCloseIconKeyboard: false,
            closeIconValue: "",
        };
    },
    methods: {
        // 基础键盘
        onBasicInput(key) {
            this.basicValue = (this.basicValue || "") + key;
        },
        onBasicDelete() {
            this.basicValue = this.basicValue.slice(0, -1);
        },

        // 自定义标题键盘
        onCustomTitleInput(key) {
            this.customTitleValue = (this.customTitleValue || "") + key;
        },
        onCustomTitleDelete() {
            this.customTitleValue = this.customTitleValue.slice(0, -1);
        },

        // 随机数字键盘
        onRandomInput(key) {
            this.randomValue = (this.randomValue || "") + key;
        },
        onRandomDelete() {
            this.randomValue = this.randomValue.slice(0, -1);
        },

        // 自定义额外键键盘
        onCustomExtraInput(key) {
            this.customExtraValue = (this.customExtraValue || "") + key;
        },
        onCustomExtraDelete() {
            this.customExtraValue = this.customExtraValue.slice(0, -1);
        },
        onFunctionKey(key) {
            // 小数点只能输入一次
            if (key === "." && !this.customExtraValue.includes(".")) {
                this.customExtraValue = (this.customExtraValue || "") + key;
            }
        },

        // 无标题栏键盘
        onNoHeaderInput(key) {
            this.noHeaderValue = (this.noHeaderValue || "") + key;
        },
        onNoHeaderDelete() {
            this.noHeaderValue = this.noHeaderValue.slice(0, -1);
        },

        // 带关闭图标的键盘
        onCloseIconInput(key) {
            this.closeIconValue = (this.closeIconValue || "") + key;
        },
        onCloseIconDelete() {
            this.closeIconValue = this.closeIconValue.slice(0, -1);
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 16px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    margin-bottom: 24px;

    .title {
        font-size: 24px;
        font-weight: 600;
        color: #323233;
        display: block;
        margin-bottom: 8px;
    }

    .desc {
        font-size: 14px;
        color: #969799;
        display: block;
    }
}

.section {
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    .section-title {
        font-size: 16px;
        font-weight: 600;
        color: #323233;
        margin-bottom: 16px;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 24px;
            height: 2px;
            background-color: var(--fanc-primary-color);
        }
    }
}

.input-display {
    height: 48px;
    line-height: 48px;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    padding: 0 12px;
    margin-bottom: 16px;
    font-size: 16px;
    background-color: #f7f8fa;
    color: #323233;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
