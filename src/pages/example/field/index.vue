<template>
    <view class="container">
        <view class="header">
            <view class="title">输入框组件</view>
            <view class="subtitle"
                >输入框组件用于用户信息输入，支持文本、密码、数字等类型，并提供多种输入控制和外观定制选项</view
            >
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-field v-model="value1" label="文本" placeholder="请输入文本"></fanc-field>
                <fanc-field v-model="value2" label="手机号" placeholder="请输入手机号"></fanc-field>
                <fanc-field v-model="value3" label="整数" placeholder="请输入整数"></fanc-field>
                <fanc-field
                    v-model="value4"
                    label="数字"
                    placeholder="请输入数字（支持小数）"
                    type="digit"
                ></fanc-field>
                <fanc-field
                    v-model="value5"
                    label="密码"
                    placeholder="请输入密码"
                    type="password"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义类型</view>
            <view class="section-content">
                <fanc-field
                    v-model="value6"
                    label="文本域"
                    type="textarea"
                    placeholder="请输入多行文本"
                    autosize
                ></fanc-field>
                <fanc-field
                    v-model="value7"
                    label="数字键盘"
                    type="number"
                    placeholder="请输入数字"
                ></fanc-field>
                <fanc-field
                    v-model="value8"
                    label="身份证号"
                    type="idcard"
                    placeholder="请输入身份证号"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">禁用和只读</view>
            <view class="section-content">
                <fanc-field
                    v-model="value9"
                    label="禁用输入框"
                    disabled
                    placeholder="输入框已禁用"
                ></fanc-field>
                <fanc-field
                    v-model="value10"
                    label="只读输入框"
                    readonly
                    placeholder="输入框为只读"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">显示图标</view>
            <view class="section-content">
                <fanc-field
                    v-model="value11"
                    label="用户名"
                    leftIcon="user"
                    placeholder="请输入用户名"
                ></fanc-field>
                <fanc-field
                    v-model="value12"
                    label="搜索"
                    leftIcon="search"
                    rightIcon="times-circle"
                    placeholder="请输入搜索关键词"
                    @click-right-icon="clearSearch"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">错误提示</view>
            <view class="section-content">
                <fanc-field
                    v-model="value13"
                    label="用户名"
                    placeholder="请输入用户名"
                    errorMessage="请输入用户名"
                ></fanc-field>
                <fanc-field
                    v-model="value28"
                    label="手机号"
                    placeholder="请输入手机号"
                    errorMessage="手机号格式错误"
                ></fanc-field>
                <fanc-field
                    v-model="value14"
                    label="验证码"
                    placeholder="请输入6位验证码"
                    rightIcon="arrow-right"
                    @click-right-icon="sendSmsCode"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">显示清除按钮</view>
            <view class="section-content">
                <fanc-field
                    v-model="value15"
                    label="用户名"
                    clearable
                    placeholder="请输入用户名"
                ></fanc-field>
                <fanc-field
                    v-model="value16"
                    label="密码"
                    type="password"
                    clearable
                    placeholder="请输入密码"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">字数统计</view>
            <view class="section-content">
                <fanc-field
                    v-model="value17"
                    label="留言"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言内容"
                    showWordLimit
                    autosize
                    errorMessage="请输入留言内容"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">垂直居中</view>
            <view class="section-content">
                <fanc-field
                    v-model="value18"
                    center
                    label="用户名"
                    placeholder="请输入用户名"
                ></fanc-field>
                <fanc-field v-model="value19" center label="验证码" placeholder="请输入验证码">
                    <template #right-icon>
                        <view class="verification-code">发送验证码</view>
                    </template>
                </fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">必填标识</view>
            <view class="section-content">
                <fanc-field
                    v-model="value20"
                    required
                    label="用户名"
                    placeholder="请输入用户名"
                ></fanc-field>
                <fanc-field
                    v-model="value21"
                    required
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">左侧图标</view>
            <view class="section-content">
                <fanc-field
                    v-model="value24"
                    leftIcon="user"
                    label="用户名"
                    placeholder="请输入用户名"
                ></fanc-field>
                <fanc-field
                    v-model="value25"
                    leftIcon="lock"
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                ></fanc-field>
                <fanc-field
                    v-model="value26"
                    leftIcon="mobile"
                    label="手机号"
                    placeholder="请输入手机号"
                ></fanc-field>
                <fanc-field
                    v-model="value27"
                    leftIcon="map-marker-alt"
                    label="地址"
                    placeholder="请输入地址"
                ></fanc-field>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义按钮</view>
            <view class="section-content">
                <fanc-field
                    v-model="value22"
                    label="短信验证码"
                    maxlength="6"
                    placeholder="请输入验证码"
                >
                    <template #right-icon>
                        <view class="sms-button" @click="sendSmsCode">
                            {{ smsButtonText }}
                        </view>
                    </template>
                </fanc-field>
                <fanc-field
                    v-model="value23"
                    label="搜索地点"
                    leftIcon="map-marker-alt"
                    placeholder="选择地址"
                >
                    <template #right-icon>
                        <view class="location-button" @click="chooseLocation">
                            <fanc-icon name="location-arrow" size="16" color="#007bff"></fanc-icon>
                        </view>
                    </template>
                </fanc-field>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
            value7: "",
            value8: "",
            value9: "禁用状态",
            value10: "只读状态",
            value11: "",
            value12: "",
            value13: "13800",
            value14: "",
            value15: "",
            value16: "",
            value17: "",
            value18: "",
            value19: "",
            value20: "",
            value21: "",
            value22: "",
            value23: "",
            value24: "",
            value25: "",
            value26: "",
            value27: "",
            value28: "",
            phoneError: true,
            smsButtonText: "发送验证码",
            countdown: 60,
            timer: null,
        };
    },
    methods: {
        clearSearch() {
            this.value12 = "";
            uni.showToast({
                title: "已清空搜索内容",
                icon: "none",
            });
        },
        sendSmsCode() {
            if (this.timer) return;

            uni.showToast({
                title: "验证码发送成功",
                icon: "success",
            });

            this.countdown = 60;
            this.smsButtonText = `${this.countdown}秒后重发`;

            this.timer = setInterval(() => {
                this.countdown--;
                this.smsButtonText = `${this.countdown}秒后重发`;

                if (this.countdown <= 0) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.smsButtonText = "发送验证码";
                }
            }, 1000);
        },
        chooseLocation() {
            uni.showToast({
                title: "选择当前位置",
                icon: "none",
            });
            this.value23 = "广州市天河区珠江新城";
        },
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
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

.section-content {
    background-color: #fff;
    overflow: hidden;
}

.verification-code,
.sms-button {
    margin-left: 8px;
    font-size: 14px;
    color: #007bff;
}

.location-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
}

.sms-button {
    white-space: nowrap;
}
</style>
