<template>
    <view class="page">
        <view class="header">
            <view class="header-content">
                <view class="title">数字键盘</view>
                <view class="description">适用于输入密码、验证码、金额等场景</view>
            </view>
            <view class="header-decoration"></view>
        </view>

        <fanc-cell-group title="键盘类型" inset>
            <!-- 基础用法 -->
            <fanc-cell title="基础用法" is-link @click="showKeyboard('basic')">
                <template #value>
                    <text class="cell-value">{{ basicValue || "点击输入" }}</text>
                </template>
            </fanc-cell>

            <!-- 带额外按键 -->
            <fanc-cell title="带额外按键" is-link @click="showKeyboard('withExtraKey')">
                <template #value>
                    <text class="cell-value">{{ extraValue || "点击输入" }}</text>
                </template>
            </fanc-cell>

            <!-- 身份证键盘 -->
            <fanc-cell title="身份证键盘" is-link @click="showKeyboard('idcard')">
                <template #value>
                    <text class="cell-value">{{ idcardValue || "点击输入" }}</text>
                </template>
            </fanc-cell>

            <!-- 自定义主题 -->
            <fanc-cell title="自定义主题" is-link @click="showKeyboard('custom')">
                <template #value>
                    <text class="cell-value">{{ customValue || "点击输入" }}</text>
                </template>
            </fanc-cell>

            <!-- 随机数字 -->
            <fanc-cell title="随机数字" is-link @click="showKeyboard('random')">
                <template #value>
                    <text class="cell-value">{{ randomValue || "点击输入" }}</text>
                </template>
            </fanc-cell>
        </fanc-cell-group>

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

<style lang="scss" scoped>
.page {
    padding: 0;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    position: relative;
    padding: 30px 20px 40px;
    background: linear-gradient(
        135deg,
        var(--fanc-primary-color, #007bff),
        var(--fanc-primary-dark-color, #0056b3)
    );
    color: #fff;
    border-radius: 0 0 15px 15px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .header-content {
        position: relative;
        z-index: 2;
    }

    .header-decoration {
        position: absolute;
        bottom: -30px;
        right: -30px;
        width: 150px;
        height: 150px;
        border-radius: 75px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1;
    }

    .title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .description {
        font-size: 14px;
        opacity: 0.9;
        font-weight: 300;
        max-width: 80%;
    }
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
