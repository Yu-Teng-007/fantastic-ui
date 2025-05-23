<template>
    <view class="container">
        <view class="header">
            <view class="title">签名组件</view>
            <view class="subtitle">用于手写签名场景，支持导出签名图片</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="signature-container">
                <fanc-signature @confirm="onConfirm1" @cancel="onCancel1" @clear="onClear1" />
            </view>
            <view class="signature-result" v-if="signatureImage1">
                <image :src="signatureImage1" mode="aspectFit" class="signature-image"></image>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义画笔</view>
            <view class="signature-container">
                <fanc-signature
                    penColor="#007bff"
                    :penWidth="5"
                    @confirm="onConfirm2"
                    @clear="onClear2"
                />
            </view>
            <view class="signature-result" v-if="signatureImage2">
                <image :src="signatureImage2" mode="aspectFit" class="signature-image"></image>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义尺寸</view>
            <view class="signature-container">
                <fanc-signature
                    width="100%"
                    :height="150"
                    @confirm="onConfirm3"
                    @clear="onClear3"
                />
            </view>
            <view class="signature-result" v-if="signatureImage3">
                <image :src="signatureImage3" mode="aspectFit" class="signature-image"></image>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义按钮文本</view>
            <view class="signature-container">
                <fanc-signature
                    clearText="重写"
                    confirmText="完成"
                    cancelText="放弃"
                    @confirm="onConfirm4"
                    @clear="onClear4"
                />
            </view>
            <view class="signature-result" v-if="signatureImage4">
                <image :src="signatureImage4" mode="aspectFit" class="signature-image"></image>
            </view>
        </view>

        <view class="section">
            <view class="section-title">隐藏部分按钮</view>
            <view class="signature-container">
                <fanc-signature :showCancel="false" @confirm="onConfirm5" @clear="onClear5" />
            </view>
            <view class="signature-result" v-if="signatureImage5">
                <image :src="signatureImage5" mode="aspectFit" class="signature-image"></image>
            </view>
        </view>

        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="signature-container">
                <fanc-signature disabled />
            </view>
        </view>

        <view class="section">
            <view class="section-title">透明背景</view>
            <view class="signature-container">
                <fanc-signature
                    :isTransparent="true"
                    background="#f8f8f8"
                    @confirm="onConfirm6"
                    @clear="onClear6"
                />
            </view>
            <view class="signature-result" v-if="signatureImage6">
                <image :src="signatureImage6" mode="aspectFit" class="signature-image"></image>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            signatureImage1: "",
            signatureImage2: "",
            signatureImage3: "",
            signatureImage4: "",
            signatureImage5: "",
            signatureImage6: "",
        };
    },
    methods: {
        // 基础用法
        onConfirm1(base64) {
            this.signatureImage1 = base64;
            this.$toast.custom({
                message: "基础签名已确认",
                iconName: "check",
            });
        },
        onCancel1() {
            this.$toast.custom({
                message: "已取消签名",
                icon: "none",
            });
        },
        onClear1() {
            this.signatureImage1 = "";
            this.$toast.custom({
                message: "已清除签名",
                icon: "none",
            });
        },

        // 自定义画笔
        onConfirm2(base64) {
            this.signatureImage2 = base64;
            this.$toast.custom({
                message: "蓝色画笔签名已确认",
                iconName: "check",
            });
        },
        onClear2() {
            this.signatureImage2 = "";
        },

        // 自定义尺寸
        onConfirm3(base64) {
            this.signatureImage3 = base64;
            this.$toast.custom({
                message: "自定义尺寸签名已确认",
                iconName: "check",
            });
        },
        onClear3() {
            this.signatureImage3 = "";
        },

        // 自定义按钮文本
        onConfirm4(base64) {
            this.signatureImage4 = base64;
            this.$toast.custom({
                message: "自定义按钮签名已确认",
                iconName: "check",
            });
        },
        onClear4() {
            this.signatureImage4 = "";
        },

        // 隐藏部分按钮
        onConfirm5(base64) {
            this.signatureImage5 = base64;
            this.$toast({ message: "无取消按钮签名已确认", iconName: "check" });
        },
        onClear5() {
            this.signatureImage5 = "";
        },

        // 透明背景
        onConfirm6(base64) {
            this.signatureImage6 = base64;
            this.$toast.custom({
                message: "透明背景签名已确认",
                iconName: "check",
            });
        },
        onClear6() {
            this.signatureImage6 = "";
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

.signature-container {
    padding: 16px;
    background-color: #ffffff;
    border-bottom: 1px solid #f2f2f2;
}

.signature-result {
    padding: 16px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
}

.signature-image {
    width: 100%;
    height: 200px;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    background-color: #f7f8fa;
}

.cell {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
}

.cell:last-child {
    border-bottom: none;
}

.cell-title {
    flex: 1;
    font-size: 14px;
    color: #323233;
}

.cell-value {
    font-size: 14px;
    color: #969799;
    margin-right: 8px;
}

.cell-arrow {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-icon {
    font-size: 14px;
    color: #c8c9cc;
    transform: rotate(90deg);
}
</style>
