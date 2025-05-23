<template>
    <view class="container">
        <view class="header">
            <view class="title">数字键盘</view>
            <view class="subtitle">适用于输入密码、验证码、金额等场景</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-cell title="基础用法" is-link @click="showKeyboard('basic')">
                    <template #value>
                        <text class="cell-value">{{ basicValue || "点击输入" }}</text>
                    </template>
                </fanc-cell>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带额外按键</view>
            <view class="section-content">
                <fanc-cell title="带额外按键" is-link @click="showKeyboard('withExtraKey')">
                    <template #value>
                        <text class="cell-value">{{ extraValue || "点击输入" }}</text>
                    </template>
                </fanc-cell>
            </view>
        </view>

        <view class="section">
            <view class="section-title">身份证键盘</view>
            <view class="section-content">
                <fanc-cell title="身份证键盘" is-link @click="showKeyboard('idcard')">
                    <template #value>
                        <text class="cell-value">{{ idcardValue || "点击输入" }}</text>
                    </template>
                </fanc-cell>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义主题</view>
            <view class="section-content">
                <fanc-cell title="自定义主题" is-link @click="showKeyboard('custom')">
                    <template #value>
                        <text class="cell-value">{{ customValue || "点击输入" }}</text>
                    </template>
                </fanc-cell>
            </view>
        </view>

        <view class="section">
            <view class="section-title">随机数字</view>
            <view class="section-content">
                <fanc-cell title="随机数字" is-link @click="showKeyboard('random')">
                    <template #value>
                        <text class="cell-value">{{ randomValue || "点击输入" }}</text>
                    </template>
                </fanc-cell>
            </view>
        </view>

        <!-- 基础键盘 -->
        <fanc-number-keyboard
            :show="keyboardTypes.basic"
            @update:show="(val) => (keyboardTypes.basic = val)"
            @input="onBasicInput"
            @delete="onBasicDelete"
            @close="onClose('basic')"
        />

        <!-- 带额外按键 -->
        <fanc-number-keyboard
            :show="keyboardTypes.withExtraKey"
            @update:show="(val) => (keyboardTypes.withExtraKey = val)"
            :showExtraKey="true"
            extraKey="."
            @input="onExtraInput"
            @delete="onExtraDelete"
            @function="onExtraFunction"
            @close="onClose('withExtraKey')"
        />

        <!-- 身份证键盘 -->
        <fanc-number-keyboard
            :show="keyboardTypes.idcard"
            @update:show="(val) => (keyboardTypes.idcard = val)"
            theme="idcard"
            @input="onIdcardInput"
            @delete="onIdcardDelete"
            @close="onClose('idcard')"
        />

        <!-- 自定义主题 -->
        <fanc-number-keyboard
            :show="keyboardTypes.custom"
            @update:show="(val) => (keyboardTypes.custom = val)"
            theme="custom"
            :showSidebar="true"
            :showHeader="true"
            title="自定义键盘"
            confirmButtonText="确认"
            @input="onCustomInput"
            @delete="onCustomDelete"
            @confirm="onCustomConfirm"
            @close="onClose('custom')"
        />

        <!-- 随机数字 -->
        <fanc-number-keyboard
            :show="keyboardTypes.random"
            @update:show="(val) => (keyboardTypes.random = val)"
            :randomKeyOrder="true"
            :showExtraKey="true"
            extraKey="#"
            @input="onRandomInput"
            @delete="onRandomDelete"
            @close="onClose('random')"
        />
    </view>
</template>

<script>
import fancNumberKeyboard from "../../../components/fanc-number-keyboard/index.vue";
import fancCellGroup from "../../../components/fanc-cell-group/index.vue";
import fancCell from "../../../components/fanc-cell/index.vue";

export default {
    components: {
        fancNumberKeyboard,
        fancCellGroup,
        fancCell,
    },
    data() {
        return {
            // 键盘显示状态
            keyboardTypes: {
                basic: false,
                withExtraKey: false,
                idcard: false,
                custom: false,
                random: false,
            },
            // 输入值
            basicValue: "",
            extraValue: "",
            idcardValue: "",
            customValue: "",
            randomValue: "",
            // 限制长度
            maxLength: 6,
        };
    },
    methods: {
        // 显示指定类型的键盘
        showKeyboard(type) {
            // 先关闭所有键盘
            Object.keys(this.keyboardTypes).forEach((key) => {
                this.keyboardTypes[key] = false;
            });

            // 显示指定类型的键盘
            this.keyboardTypes[type] = true;
        },

        // 关闭键盘
        onClose(type) {
            this.keyboardTypes[type] = false;
        },

        // 基础键盘输入处理
        onBasicInput(value) {
            if (this.basicValue.length < this.maxLength) {
                this.basicValue += value;
            }
        },
        onBasicDelete() {
            if (this.basicValue.length > 0) {
                this.basicValue = this.basicValue.slice(0, -1);
            }
        },

        // 带额外按键的键盘输入处理
        onExtraInput(value) {
            if (this.extraValue.length < this.maxLength) {
                this.extraValue += value;
            }
        },
        onExtraDelete() {
            if (this.extraValue.length > 0) {
                this.extraValue = this.extraValue.slice(0, -1);
            }
        },
        onExtraFunction(value) {
            if (this.extraValue.length < this.maxLength && !this.extraValue.includes(".")) {
                this.extraValue += value;
            }
        },

        // 身份证键盘输入处理
        onIdcardInput(value) {
            if (this.idcardValue.length < 18) {
                this.idcardValue += value;
            }
        },
        onIdcardDelete() {
            if (this.idcardValue.length > 0) {
                this.idcardValue = this.idcardValue.slice(0, -1);
            }
        },

        // 自定义主题键盘输入处理
        onCustomInput(value) {
            if (this.customValue.length < this.maxLength) {
                this.customValue += value;
            }
        },
        onCustomDelete() {
            if (this.customValue.length > 0) {
                this.customValue = this.customValue.slice(0, -1);
            }
        },
        onCustomConfirm() {
            this.keyboardTypes.custom = false;
            this.$toast
                ? this.$toast.success("确认输入: " + this.customValue)
                : uni.showToast({ title: "确认输入: " + this.customValue, icon: "none" });
        },

        // 随机数字键盘输入处理
        onRandomInput(value) {
            if (this.randomValue.length < this.maxLength) {
                this.randomValue += value;
            }
        },
        onRandomDelete() {
            if (this.randomValue.length > 0) {
                this.randomValue = this.randomValue.slice(0, -1);
            }
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

.cell-value {
    font-size: 14px;
    color: #999;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
