<template>
    <view class="page">
        <view class="page__header">
            <view class="page__title">表单布局示例</view>
            <view class="page__desc">展示了不同的表单布局方式（左侧标签和顶部标签）</view>
        </view>

        <view class="page__content">
            <!-- 左侧标签布局 -->
            <view class="section">
                <view class="section-title">左侧标签布局</view>
                <fanc-form :model="formData" label-position="left" label-width="80px">
                    <fanc-form-item label="用户名" prop="username">
                        <fanc-field v-model="formData.username" placeholder="请输入用户名" />
                    </fanc-form-item>

                    <fanc-form-item label="手机号码" prop="phone">
                        <fanc-field v-model="formData.phone" placeholder="请输入手机号码" />
                    </fanc-form-item>

                    <fanc-form-item label="备注" prop="remark">
                        <fanc-field v-model="formData.remark" placeholder="请输入备注信息" />
                    </fanc-form-item>
                </fanc-form>
            </view>

            <!-- 顶部标签布局 -->
            <view class="section">
                <view class="section-title">顶部标签布局</view>
                <fanc-form :model="formData" label-position="top">
                    <fanc-form-item label="用户名" prop="username">
                        <fanc-field v-model="formData.username" placeholder="请输入用户名" />
                    </fanc-form-item>

                    <fanc-form-item label="手机号码" prop="phone">
                        <fanc-field v-model="formData.phone" placeholder="请输入手机号码" />
                    </fanc-form-item>

                    <fanc-form-item label="备注" prop="remark">
                        <fanc-field v-model="formData.remark" placeholder="请输入备注信息" />
                    </fanc-form-item>
                </fanc-form>
            </view>

            <!-- 不同标签宽度 -->
            <view class="section">
                <view class="section-title">不同标签宽度</view>
                <fanc-form :model="formData" label-position="left" label-width="120px">
                    <fanc-form-item label="固定宽度标签" prop="field1">
                        <fanc-field v-model="formData.field1" placeholder="标签宽度为120px" />
                    </fanc-form-item>

                    <fanc-form-item label="自定义宽度" prop="field2" label-width="150px">
                        <fanc-field v-model="formData.field2" placeholder="标签宽度为150px" />
                    </fanc-form-item>
                </fanc-form>
            </view>

            <!-- 不同对齐方式 -->
            <view class="section">
                <view class="section-title">不同标签对齐方式</view>
                <fanc-form :model="formData" label-position="left" label-width="100px">
                    <fanc-form-item label="左对齐" prop="align1" label-align="left">
                        <fanc-field v-model="formData.align1" placeholder="左对齐标签" />
                    </fanc-form-item>

                    <fanc-form-item label="居中对齐" prop="align2" label-align="center">
                        <fanc-field v-model="formData.align2" placeholder="居中对齐标签" />
                    </fanc-form-item>

                    <fanc-form-item label="右对齐" prop="align3" label-align="right">
                        <fanc-field v-model="formData.align3" placeholder="右对齐标签" />
                    </fanc-form-item>
                </fanc-form>
            </view>

            <!-- 嵌套布局 -->
            <view class="section">
                <view class="section-title">嵌套表单布局</view>
                <fanc-form :model="formData">
                    <view class="form-row">
                        <view class="form-col">
                            <fanc-form-item label="姓" prop="lastName" label-position="top">
                                <fanc-field v-model="formData.lastName" placeholder="请输入姓" />
                            </fanc-form-item>
                        </view>
                        <view class="form-col">
                            <fanc-form-item label="名" prop="firstName" label-position="top">
                                <fanc-field v-model="formData.firstName" placeholder="请输入名" />
                            </fanc-form-item>
                        </view>
                    </view>

                    <fanc-form-item label="地址" prop="address" label-position="top">
                        <fanc-field
                            v-model="formData.address"
                            type="textarea"
                            placeholder="请输入地址"
                        />
                    </fanc-form-item>
                </fanc-form>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username: "",
                phone: "",
                remark: "",
                field1: "",
                field2: "",
                align1: "",
                align2: "",
                align3: "",
                lastName: "",
                firstName: "",
                address: "",
            },
        };
    },
};
</script>

<style>
.page {
    padding: 32rpx;
}

.page__header {
    margin-bottom: 40rpx;
}

.page__title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
}

.page__desc {
    font-size: 28rpx;
    color: #666;
}

.page__content {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 32rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section {
    margin-bottom: 48rpx;
    padding-bottom: 48rpx;
    border-bottom: 1px solid #eee;
}

.section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 32rpx;
    color: #333;
    padding-left: 16rpx;
    border-left: 8rpx solid var(--fanc-primary-color);
    line-height: 1.2;
}

.form-row {
    display: flex;
    margin: 0 -16rpx;
}

.form-col {
    flex: 1;
    padding: 0 16rpx;
}
</style>
