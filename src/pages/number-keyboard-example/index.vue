<template>
    <view class="container">
        <view class="header">
            <text class="title">数字键盘示例</text>
            <text class="desc">常用于输入密码、验证码等纯数字场景</text>
        </view>

        <!-- 使用cell-group组件展示所有场景 -->
        <fanc-cell-group title="键盘类型示例" inset>
            <!-- 基础用法 -->
            <fanc-cell title="基础用法" is-link @click="showBasicKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ basicValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 自定义标题 -->
            <fanc-cell title="自定义标题" is-link @click="showCustomTitleKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ customTitleValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 随机数字键盘 -->
            <fanc-cell title="随机数字键盘" is-link @click="showRandomKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ randomValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 自定义额外键 -->
            <fanc-cell title="自定义额外键" is-link @click="showCustomExtraKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ customExtraValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 无标题栏键盘 -->
            <fanc-cell title="无标题栏键盘" is-link @click="showNoHeaderKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ noHeaderValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 带关闭图标的键盘 -->
            <fanc-cell title="带关闭图标的键盘" is-link @click="showCloseIconKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ closeIconValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 身份证键盘 -->
            <fanc-cell title="身份证键盘" is-link @click="showIdCardKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ idCardValue || "点击选择" }}</text>
                </template>
            </fanc-cell>

            <!-- 带右侧栏的键盘 -->
            <fanc-cell title="带右侧栏的键盘" is-link @click="showSidebarKeyboard = true">
                <template #value>
                    <text class="cell-value">{{ sidebarValue || "点击选择" }}</text>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 键盘组件 -->
        <!-- 基础键盘 -->
        <fanc-number-keyboard
            :show="showBasicKeyboard"
            @input="onBasicInput"
            @delete="onBasicDelete"
            @close="showBasicKeyboard = false"
        />

        <!-- 自定义标题键盘 -->
        <fanc-number-keyboard
            :show="showCustomTitleKeyboard"
            title="请输入支付密码"
            close-button-text="确定"
            @input="onCustomTitleInput"
            @delete="onCustomTitleDelete"
            @close="showCustomTitleKeyboard = false"
        />

        <!-- 随机数字键盘 -->
        <fanc-number-keyboard
            :show="showRandomKeyboard"
            title="安全键盘"
            :random-key-order="true"
            @input="onRandomInput"
            @delete="onRandomDelete"
            @close="showRandomKeyboard = false"
        />

        <!-- 自定义额外键键盘 -->
        <fanc-number-keyboard
            :show="showCustomExtraKeyboard"
            title="输入金额"
            extra-key="."
            @input="onCustomExtraInput"
            @delete="onCustomExtraDelete"
            @close="showCustomExtraKeyboard = false"
            @function="onFunctionKey"
        />

        <!-- 无标题栏键盘 -->
        <fanc-number-keyboard
            :show="showNoHeaderKeyboard"
            :show-header="false"
            @input="onNoHeaderInput"
            @delete="onNoHeaderDelete"
            @close="showNoHeaderKeyboard = false"
        />

        <!-- 带关闭图标的键盘 -->
        <fanc-number-keyboard
            :show="showCloseIconKeyboard"
            title="带关闭图标的键盘"
            :show-close-icon="true"
            @input="onCloseIconInput"
            @delete="onCloseIconDelete"
            @close="showCloseIconKeyboard = false"
        />

        <!-- 身份证键盘 -->
        <fanc-number-keyboard
            :show="showIdCardKeyboard"
            title="请输入身份证号"
            theme="idcard"
            @input="onIdCardInput"
            @delete="onIdCardDelete"
            @close="showIdCardKeyboard = false"
        />

        <!-- 带右侧栏的键盘 -->
        <fanc-number-keyboard
            :show="showSidebarKeyboard"
            title="带右侧栏的键盘"
            theme="custom"
            :show-sidebar="true"
            confirm-button-text="确认"
            @input="onSidebarInput"
            @delete="onSidebarDelete"
            @close="showSidebarKeyboard = false"
            @confirm="onSidebarConfirm"
        />
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

            // 身份证键盘
            showIdCardKeyboard: false,
            idCardValue: "",

            // 带右侧栏的键盘
            showSidebarKeyboard: false,
            sidebarValue: "",
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

        // 身份证键盘
        onIdCardInput(key) {
            // 身份证号最多18位
            if (this.idCardValue && this.idCardValue.length >= 18) {
                return;
            }
            this.idCardValue = (this.idCardValue || "") + key;
        },
        onIdCardDelete() {
            this.idCardValue = this.idCardValue.slice(0, -1);
        },

        // 带右侧栏的键盘
        onSidebarInput(key) {
            this.sidebarValue = (this.sidebarValue || "") + key;
        },
        onSidebarDelete() {
            this.sidebarValue = this.sidebarValue.slice(0, -1);
        },
        onSidebarConfirm() {
            // 点击确认按钮时的操作
            this.showSidebarKeyboard = false;
            // 可以在这里添加确认后的逻辑，比如提交表单等
            uni.showToast({
                title: "已确认输入: " + this.sidebarValue,
                icon: "none",
            });
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

// 单元格值样式
.cell-value {
    color: #969799;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
    display: inline-block;
}
</style>
