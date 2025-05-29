<template>
    <view class="container">
        <view class="header">
            <view class="title">文件上传</view>
            <view class="subtitle">用于上传图片或文件到服务器，并展示上传进度和结果</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList1"
                    :action="uploadUrl"
                    tips="支持上传多种文件格式"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 文件预览 -->
        <view class="section">
            <view class="section-title">文件预览</view>
            <view class="section-content">
                <fanc-uploader v-model="fileList2" :action="uploadUrl"></fanc-uploader>
            </view>
        </view>

        <!-- 上传按钮文字 -->
        <view class="section">
            <view class="section-title">上传按钮文字</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList3"
                    :action="uploadUrl"
                    uploadText="上传文件"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 限制上传数量 -->
        <view class="section">
            <view class="section-title">限制上传数量</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList4"
                    :action="uploadUrl"
                    :maxCount="3"
                    tips="最多上传3个文件"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 限制文件大小 -->
        <view class="section">
            <view class="section-title">限制文件大小</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList5"
                    :action="uploadUrl"
                    :maxSize="1024 * 1024 * 2"
                    tips="文件大小不能超过2MB"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 自定义上传图标 -->
        <view class="section">
            <view class="section-title">自定义上传图标</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList6"
                    :action="uploadUrl"
                    uploadIcon="cloud-arrow-up"
                    uploadText="上传到云端"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 不同尺寸 -->
        <view class="section">
            <view class="section-title">不同尺寸</view>
            <view class="section-content">
                <view class="size-demo">
                    <view class="size-item">
                        <text class="size-label">小尺寸</text>
                        <fanc-uploader
                            v-model="fileList7"
                            :action="uploadUrl"
                            size="small"
                        ></fanc-uploader>
                    </view>
                    <view class="size-item">
                        <text class="size-label">默认尺寸</text>
                        <fanc-uploader
                            v-model="fileList8"
                            :action="uploadUrl"
                            size="normal"
                        ></fanc-uploader>
                    </view>
                    <view class="size-item">
                        <text class="size-label">大尺寸</text>
                        <fanc-uploader
                            v-model="fileList9"
                            :action="uploadUrl"
                            size="large"
                        ></fanc-uploader>
                    </view>
                </view>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList10"
                    :action="uploadUrl"
                    disabled
                    tips="上传功能已禁用"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 只读状态 -->
        <view class="section">
            <view class="section-title">只读状态</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList11"
                    :action="uploadUrl"
                    readonly
                    tips="只能查看，不能上传或删除"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 手动上传 -->
        <view class="section">
            <view class="section-title">手动上传</view>
            <view class="section-content">
                <fanc-uploader
                    ref="uploader"
                    v-model="fileList12"
                    :action="uploadUrl"
                    :autoUpload="false"
                    tips="选择文件后，点击下方按钮上传"
                ></fanc-uploader>
                <view class="manual-upload">
                    <fanc-button type="primary" size="small" @click="uploadFiles"
                        >开始上传</fanc-button
                    >
                </view>
            </view>
        </view>

        <!-- 上传前钩子函数 -->
        <view class="section">
            <view class="section-title">上传前钩子函数</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList13"
                    :action="uploadUrl"
                    :beforeUpload="beforeUpload"
                    tips="只能上传图片文件"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 本地预览模式 -->
        <view class="section">
            <view class="section-title">本地预览模式</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList14"
                    action=""
                    tips="文件将只在本地预览，不会上传到服务器"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 隐藏状态 -->
        <view class="section">
            <view class="section-title">隐藏状态</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList15"
                    :action="uploadUrl"
                    :showStatus="false"
                    tips="上传状态（上传中、成功、失败）将不会显示"
                ></fanc-uploader>
            </view>
        </view>

        <!-- 隐藏提示 -->
        <view class="section">
            <view class="section-title">隐藏提示</view>
            <view class="section-content">
                <fanc-uploader
                    v-model="fileList16"
                    :action="uploadUrl"
                    :showToast="false"
                    tips="上传成功/失败的提示将不会显示"
                ></fanc-uploader>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            uploadUrl: "https://jsonplaceholder.typicode.com/posts/", // 模拟上传地址
            fileList1: [],
            fileList2: [
                {
                    name: "图片1.jpg",
                    url: "https://picsum.photos/200/200?random=1",
                    type: "image/jpeg",
                    status: "success",
                },
            ],
            fileList3: [],
            fileList4: [],
            fileList5: [],
            fileList6: [],
            fileList7: [],
            fileList8: [],
            fileList9: [],
            fileList10: [
                {
                    name: "文档.pdf",
                    type: "application/pdf",
                    status: "success",
                },
            ],
            fileList11: [
                {
                    name: "图片2.jpg",
                    url: "https://picsum.photos/200/200?random=2",
                    type: "image/jpeg",
                    status: "success",
                },
                {
                    name: "文档2.pdf",
                    type: "application/pdf",
                    status: "success",
                },
            ],
            fileList12: [],
            fileList13: [],
            fileList14: [],
            fileList15: [],
            fileList16: [],
        };
    },
    methods: {
        // 手动上传文件
        uploadFiles() {
            // 找到所有状态为ready的文件
            const readyFiles = this.fileList12.filter((file) => file.status === "ready");

            // 遍历并上传
            readyFiles.forEach((file, index) => {
                // 获取文件在fileList中的索引
                const fileIndex = this.fileList12.findIndex((item) => item === file);

                // 调用上传方法
                this.$refs.uploader && this.$refs.uploader.upload(file, fileIndex);
            });

            if (readyFiles.length === 0) {
                this.$toast && this.$toast.text("没有待上传的文件");
            }
        },

        // 上传前钩子函数
        beforeUpload(file) {
            // 检查是否为图片文件
            if (!file.type.startsWith("image/")) {
                this.$toast && this.$toast.error("只能上传图片文件");
                return false;
            }
            return true;
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

.section-content {
    padding: 16px;
}

.size-demo {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.size-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.size-label {
    font-size: 14px;
    color: #323233;
}

.manual-upload {
    margin-top: 16px;
}
</style>
