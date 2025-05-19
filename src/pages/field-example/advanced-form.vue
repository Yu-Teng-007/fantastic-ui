<template>
    <view class="advanced-form-container">
        <view class="advanced-form-header">
            <text class="advanced-form-title">高级表单示例</text>
            <text class="advanced-form-subtitle">展示复杂表单场景下的输入框应用</text>
        </view>

        <view class="advanced-form-card">
            <view class="section-title">个人信息</view>

            <fanc-field
                v-model="formData.name"
                name="name"
                label="姓名"
                left-icon="user"
                placeholder="请输入您的姓名"
                required
                clearable
                :rules="{ required: true, message: '请输入姓名' }"
                @validate="onValidate"
            ></fanc-field>

            <fanc-field
                v-model="formData.gender"
                name="gender"
                label="性别"
                left-icon="venus-mars"
                placeholder="请选择性别"
                readonly
                isLink
                required
                :rules="{ required: true, message: '请选择性别' }"
                @click="openGenderPicker"
                @validate="onValidate"
            ></fanc-field>

            <fanc-field
                v-model="formData.birthday"
                name="birthday"
                label="出生日期"
                left-icon="calendar-alt"
                placeholder="请选择出生日期"
                readonly
                isLink
                required
                :rules="{ required: true, message: '请选择出生日期' }"
                @click="openDatePicker"
                @validate="onValidate"
            ></fanc-field>

            <fanc-field
                v-model="formData.idCard"
                name="idCard"
                label="身份证号"
                left-icon="id-card"
                type="idcard"
                placeholder="请输入身份证号码"
                maxlength="18"
                required
                clearable
                :rules="[
                    { required: true, message: '请输入身份证号' },
                    { type: 'idcard', message: '请输入正确的身份证号码' },
                ]"
                @validate="onValidate"
            ></fanc-field>
        </view>

        <view class="advanced-form-card">
            <view class="section-title">联系方式</view>

            <fanc-field
                v-model="formData.phone"
                name="phone"
                label="手机号码"
                left-icon="phone"
                type="tel"
                placeholder="请输入手机号码"
                maxlength="11"
                required
                clearable
                :rules="[
                    { required: true, message: '请输入手机号码' },
                    { type: 'mobile', message: '请输入正确的手机号码' },
                ]"
                @validate="onValidate"
            ></fanc-field>

            <fanc-field
                v-model="formData.email"
                name="email"
                label="电子邮箱"
                left-icon="envelope"
                placeholder="请输入电子邮箱"
                clearable
                :rules="{ type: 'email', message: '请输入正确的邮箱格式' }"
                @validate="onValidate"
            ></fanc-field>

            <fanc-field
                v-model="formData.address"
                name="address"
                label="居住地址"
                left-icon="home"
                placeholder="请选择居住地址"
                readonly
                isLink
                @click="openAddressPicker"
            ></fanc-field>

            <fanc-field
                v-model="formData.addressDetail"
                name="addressDetail"
                label="详细地址"
                left-icon="map-marker-alt"
                type="textarea"
                placeholder="请输入详细地址信息"
                clearable
                auto-height
                :rules="{ max: 100, message: '详细地址最多100个字符' }"
                @validate="onValidate"
            ></fanc-field>
        </view>

        <view class="advanced-form-card">
            <view class="section-title">教育背景</view>

            <fanc-field
                v-model="formData.education"
                name="education"
                label="最高学历"
                left-icon="graduation-cap"
                placeholder="请选择最高学历"
                readonly
                isLink
                @click="openEducationPicker"
            ></fanc-field>

            <fanc-field
                v-model="formData.school"
                name="school"
                label="毕业院校"
                left-icon="university"
                placeholder="请输入毕业院校"
                clearable
            ></fanc-field>

            <fanc-field
                v-model="formData.major"
                name="major"
                label="专业"
                left-icon="book"
                placeholder="请输入所学专业"
                clearable
            ></fanc-field>

            <fanc-field
                v-model="formData.graduationDate"
                name="graduationDate"
                label="毕业时间"
                left-icon="calendar-check"
                placeholder="请选择毕业时间"
                readonly
                isLink
                @click="openGraduationDatePicker"
            ></fanc-field>
        </view>

        <view class="advanced-form-card">
            <view class="section-title">工作经历</view>

            <fanc-field
                v-model="formData.company"
                name="company"
                label="公司名称"
                left-icon="building"
                placeholder="请输入公司名称"
                clearable
            ></fanc-field>

            <fanc-field
                v-model="formData.position"
                name="position"
                label="职位"
                left-icon="briefcase"
                placeholder="请输入职位"
                clearable
            ></fanc-field>

            <fanc-field
                v-model="formData.workYear"
                name="workYear"
                label="工作年限"
                left-icon="clock"
                type="digit"
                placeholder="请输入工作年限"
                :rules="{ type: 'number', message: '请输入正确的工作年限' }"
                @validate="onValidate"
            ></fanc-field>

            <fanc-field
                v-model="formData.salary"
                name="salary"
                label="期望薪资"
                left-icon="money-bill-wave"
                placeholder="请输入期望薪资"
                input-align="right"
                clearable
            >
                <template #input-prefix>
                    <text style="margin-right: 4px; font-size: 14px; color: #606266">¥</text>
                </template>
                <template #input-suffix>
                    <text style="margin-left: 4px; font-size: 14px; color: #606266">元/月</text>
                </template>
            </fanc-field>
        </view>

        <view class="advanced-form-card">
            <view class="section-title">自我介绍</view>

            <fanc-field
                v-model="formData.introduction"
                name="introduction"
                type="textarea"
                placeholder="请简单介绍一下自己..."
                show-word-limit
                auto-height
                maxlength="200"
                :rules="{ max: 200, message: '自我介绍最多200个字符' }"
                @validate="onValidate"
            ></fanc-field>
        </view>

        <view class="advanced-form-card">
            <view class="section-title">上传资料</view>

            <fanc-field
                v-model="formData.resumeFile"
                name="resume"
                label="简历上传"
                left-icon="file-upload"
                placeholder="请上传个人简历"
                readonly
                required
                :error="resumeError"
                :error-message="resumeErrorMessage"
            >
                <template #input-suffix>
                    <view style="margin-left: 8px">
                        <fanc-button size="small" type="primary" @click="uploadResume"
                            >选择文件</fanc-button
                        >
                    </view>
                </template>
            </fanc-field>

            <fanc-field
                v-model="formData.certificates"
                name="certificates"
                label="资格证书"
                left-icon="certificate"
                placeholder="请上传资格证书"
                readonly
            >
                <template #input-suffix>
                    <view style="margin-left: 8px">
                        <fanc-button size="small" type="primary" @click="uploadCertificates"
                            >选择文件</fanc-button
                        >
                    </view>
                </template>
            </fanc-field>
        </view>

        <view class="advanced-form-actions">
            <fanc-button type="primary" block @click="submitForm">提交表单</fanc-button>
            <fanc-button type="default" block plain style="margin-top: 12px" @click="resetForm"
                >重置表单</fanc-button
            >
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: "",
                gender: "",
                birthday: "",
                idCard: "",
                phone: "",
                email: "",
                address: "",
                addressDetail: "",
                education: "",
                school: "",
                major: "",
                graduationDate: "",
                company: "",
                position: "",
                workYear: "",
                salary: "",
                introduction: "",
                resumeFile: "",
                certificates: "",
            },
            validationResults: {},
            // 额外的验证状态
            resumeError: false,
            resumeErrorMessage: "",
        };
    },
    methods: {
        // 表单验证处理
        onValidate(field) {
            this.validationResults[field.name] = field.valid;
            console.log(
                `字段 ${field.name} 校验结果:`,
                field.valid ? "通过" : "失败",
                field.message
            );
        },

        // 打开选择器
        openGenderPicker() {
            // 模拟选择器
            uni.showActionSheet({
                itemList: ["男", "女", "其他"],
                success: (res) => {
                    const genderOptions = ["男", "女", "其他"];
                    this.formData.gender = genderOptions[res.tapIndex];

                    // 手动触发验证
                    this.triggerFieldValidation("gender");
                },
            });
        },

        openDatePicker() {
            // 模拟日期选择器
            uni.showToast({
                title: "打开日期选择器",
                icon: "none",
            });

            // 为演示设置一个模拟日期
            setTimeout(() => {
                this.formData.birthday = "1990-01-01";

                // 手动触发验证
                this.triggerFieldValidation("birthday");
            }, 500);
        },

        openAddressPicker() {
            // 模拟地址选择器
            uni.showToast({
                title: "打开地址选择器",
                icon: "none",
            });

            // 为演示设置一个模拟地址
            setTimeout(() => {
                this.formData.address = "广东省深圳市南山区";
            }, 500);
        },

        openEducationPicker() {
            // 模拟学历选择器
            uni.showActionSheet({
                itemList: ["高中", "大专", "本科", "硕士", "博士"],
                success: (res) => {
                    const educationOptions = ["高中", "大专", "本科", "硕士", "博士"];
                    this.formData.education = educationOptions[res.tapIndex];
                },
            });
        },

        openGraduationDatePicker() {
            // 模拟日期选择器
            uni.showToast({
                title: "打开日期选择器",
                icon: "none",
            });

            // 为演示设置一个模拟日期
            setTimeout(() => {
                this.formData.graduationDate = "2015-07-01";
            }, 500);
        },

        // 上传文件
        uploadResume() {
            // 模拟文件上传
            uni.showToast({
                title: "选择文件",
                icon: "none",
            });

            // 为演示设置一个模拟文件名
            setTimeout(() => {
                this.formData.resumeFile = "个人简历.pdf";

                // 清除错误状态
                this.resumeError = false;
                this.resumeErrorMessage = "";
            }, 1000);
        },

        uploadCertificates() {
            // 模拟文件上传
            uni.showToast({
                title: "选择文件",
                icon: "none",
            });

            // 为演示设置一个模拟文件名
            setTimeout(() => {
                this.formData.certificates = "资格证书.zip";
            }, 1000);
        },

        // 手动触发字段验证
        triggerFieldValidation(fieldName) {
            const fieldRef = this.$children.find(
                (child) => child.$options.name === "fanc-field" && child.name === fieldName
            );

            if (fieldRef) {
                fieldRef.validate();
            }
        },

        // 验证表单
        validateForm() {
            // 获取所有的field组件
            const fieldRefs = this.$children.filter(
                (child) => child.$options.name === "fanc-field"
            );

            // 创建验证Promise数组
            const validations = fieldRefs.map((field) => {
                return new Promise((resolve) => {
                    field.validate((valid) => {
                        resolve(valid);
                    });
                });
            });

            // 验证简历是否上传
            if (!this.formData.resumeFile) {
                this.resumeError = true;
                this.resumeErrorMessage = "请上传个人简历";
            }

            return Promise.all(validations).then((results) => {
                return results.every((valid) => valid) && !this.resumeError;
            });
        },

        // 提交表单
        async submitForm() {
            const isValid = await this.validateForm();

            if (isValid) {
                uni.showLoading({
                    title: "提交中...",
                });

                // 模拟提交过程
                setTimeout(() => {
                    uni.hideLoading();
                    uni.showToast({
                        title: "提交成功",
                        icon: "success",
                    });

                    console.log("表单数据:", this.formData);
                }, 1500);
            } else {
                uni.showToast({
                    title: "请完善表单信息",
                    icon: "none",
                });
            }
        },

        // 重置表单
        resetForm() {
            // 重置所有字段值
            Object.keys(this.formData).forEach((key) => {
                this.formData[key] = "";
            });

            // 重置所有字段的验证状态
            const fieldRefs = this.$children.filter(
                (child) => child.$options.name === "fanc-field"
            );
            fieldRefs.forEach((field) => {
                field.resetValidation();
            });

            // 重置额外的验证状态
            this.resumeError = false;
            this.resumeErrorMessage = "";

            uni.showToast({
                title: "表单已重置",
                icon: "none",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.advanced-form-container {
    padding: 16px;
    background-color: #f7f8fa;
    min-height: 100vh;
}

.advanced-form-header {
    margin-bottom: 24px;
    text-align: center;
}

.advanced-form-title {
    font-size: 20px;
    font-weight: 600;
    color: #323233;
    margin-bottom: 8px;
    display: block;
}

.advanced-form-subtitle {
    font-size: 14px;
    color: #969799;
    display: block;
}

.advanced-form-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 15px;
    font-weight: 500;
    color: #323233;
    padding: 12px 16px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #ebedf0;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 12px;
        bottom: 12px;
        width: 4px;
        background: linear-gradient(#4a66ff, #6abffd);
        border-radius: 0 2px 2px 0;
    }
}

.advanced-form-actions {
    padding: 16px 8px 32px;
}
</style>
