<template>
    <view class="fanc-uploader" :class="[`fanc-uploader--${size}`]">
        <!-- 上传区域 -->
        <view class="fanc-uploader__wrapper">
            <!-- 已上传的文件列表 -->
            <view v-if="internalFileList.length > 0" class="fanc-uploader__file-list">
                <view
                    v-for="(item, index) in internalFileList"
                    :key="index"
                    class="fanc-uploader__file-item"
                    :class="{ 'fanc-uploader__file-item--error': item.status === 'error' }"
                >
                    <!-- 图片预览 -->
                    <view
                        v-if="item.type && item.type.startsWith('image/')"
                        class="fanc-uploader__image"
                    >
                        <image
                            :src="item.url"
                            mode="aspectFill"
                            @click="handlePreview(item)"
                        ></image>
                    </view>
                    <!-- 文件图标 -->
                    <view v-else class="fanc-uploader__file">
                        <view class="fanc-uploader__file-icon">
                            <fanc-icon name="file" size="24"></fanc-icon>
                        </view>
                        <text class="fanc-uploader__file-name">{{ item.name }}</text>
                    </view>
                    <!-- 状态显示 -->
                    <view class="fanc-uploader__file-status" v-if="showStatus && item.status">
                        <fanc-icon
                            v-if="item.status === 'uploading'"
                            name="spinner"
                            size="18"
                            class="fanc-uploader__loading-icon"
                        ></fanc-icon>
                        <fanc-icon
                            v-else-if="item.status === 'error'"
                            name="exclamation-circle"
                            size="18"
                            color="var(--fanc-danger-color)"
                        ></fanc-icon>
                        <fanc-icon
                            v-else-if="item.status === 'success'"
                            name="check-circle"
                            size="18"
                            color="var(--fanc-success-color)"
                        ></fanc-icon>
                    </view>
                    <!-- 删除按钮 -->
                    <view
                        v-if="!disabled && !readonly"
                        class="fanc-uploader__delete"
                        @click.stop="handleDelete(index)"
                    >
                        <fanc-icon name="xmark" size="14"></fanc-icon>
                    </view>
                    <!-- 上传进度 -->
                    <view
                        v-if="showStatus && item.status === 'uploading'"
                        class="fanc-uploader__progress"
                        :style="{ width: (item.progress || 0) + '%' }"
                    ></view>
                </view>
            </view>

            <!-- 上传按钮 -->
            <view
                v-if="
                    !disabled && !readonly && (maxCount === 0 || internalFileList.length < maxCount)
                "
                class="fanc-uploader__upload"
                @click="handleUploadClick"
            >
                <view class="fanc-uploader__upload-icon">
                    <fanc-icon :name="uploadIcon" :size="uploadIconSize"></fanc-icon>
                </view>
                <text v-if="uploadText" class="fanc-uploader__upload-text">{{ uploadText }}</text>
            </view>
        </view>

        <!-- 提示文本 -->
        <text v-if="tips" class="fanc-uploader__tips">{{ tips }}</text>
    </view>
</template>

<script>
export default {
    name: "FancUploader",
    model: {
        prop: "fileList",
        event: "update:fileList",
    },
    props: {
        // 文件列表
        fileList: {
            type: Array,
            default: () => [],
        },
        // 文件类型组，可选值：image(图片)、document(文档)、media(媒体)、all(所有)
        fileType: {
            type: String,
            default: "image",
            validator: (value) => ["image", "document", "media", "all"].includes(value),
        },
        // 接受的文件类型
        accept: {
            type: String,
            default:
                "image/jpeg,image/png,image/gif,image/bmp,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否只读
        readonly: {
            type: Boolean,
            default: false,
        },
        // 是否支持多选
        multiple: {
            type: Boolean,
            default: false,
        },
        // 最大上传数量，0表示不限制
        maxCount: {
            type: Number,
            default: 0,
        },
        // 单个文件大小限制，单位为字节，0表示不限制
        maxSize: {
            type: Number,
            default: 0,
        },
        // 上传按钮图标
        uploadIcon: {
            type: String,
            default: "plus",
        },
        // 上传按钮图标大小
        uploadIconSize: {
            type: [Number, String],
            default: 24,
        },
        // 上传按钮文字
        uploadText: {
            type: String,
            default: "",
        },
        // 提示文本
        tips: {
            type: String,
            default: "",
        },
        // 组件尺寸
        size: {
            type: String,
            default: "normal",
            validator: (value) => ["small", "normal", "large"].includes(value),
        },
        // 上传前钩子函数，返回false表示阻止上传
        beforeUpload: {
            type: Function,
            default: null,
        },
        // 自定义上传方法，不设置则使用默认的上传方法
        customUpload: {
            type: Function,
            default: null,
        },
        // 上传的服务器地址，为空时表示仅本地预览模式
        action: {
            type: String,
            default: "",
        },
        // 上传的文件字段名
        name: {
            type: String,
            default: "file",
        },
        // 上传时附带的额外参数
        data: {
            type: Object,
            default: () => ({}),
        },
        // 上传的请求头
        headers: {
            type: Object,
            default: () => ({}),
        },
        // 是否自动上传
        autoUpload: {
            type: Boolean,
            default: true,
        },
        // 是否显示状态（上传中、成功、失败等状态）
        showStatus: {
            type: Boolean,
            default: true,
        },
        // 是否显示上传成功/失败的提示
        showToast: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            uploading: false,
            isH5: false,
            isApp: false,
            isMP: false,
            // 内部文件列表，用于避免直接修改props
            internalFileList: [],
            // 预定义的文件类型组
            fileTypeMap: {
                image: "image/jpeg,image/png,image/gif,image/bmp,image/webp",
                document:
                    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/csv",
                media: "image/jpeg,image/png,image/gif,image/bmp,image/webp,video/mp4,video/mpeg,video/quicktime,audio/mpeg,audio/wav,audio/ogg",
                all: "*/*",
            },
        };
    },
    computed: {
        // 计算得到的文件类型
        computedAccept() {
            // 如果用户显式设置了 accept，优先使用用户设置的值
            if (this.accept !== this.$options.props.accept.default) {
                return this.accept;
            }

            // 否则根据 fileType 返回预定义的值
            return this.fileTypeMap[this.fileType] || this.fileTypeMap.all;
        },
    },
    created() {
        // 初始化内部文件列表
        this.internalFileList = [...this.fileList];

        // 检测当前平台
        // #ifdef H5
        this.isH5 = true;
        // #endif

        // #ifdef APP-PLUS
        this.isApp = true;
        // #endif

        // #ifdef MP
        this.isMP = true;
        // #endif
    },
    watch: {
        // 监听外部fileList变化，更新内部状态
        fileList: {
            handler(newVal) {
                this.internalFileList = [...newVal];
            },
            deep: true,
        },
    },
    methods: {
        // 触发文件选择
        handleUploadClick() {
            if (this.disabled || this.readonly) return;

            // 判断是否只选择图片
            const isImageOnly = this.isImageAccept();

            // H5环境
            if (this.isH5) {
                // 如果只接受图片，使用 chooseImage
                if (isImageOnly) {
                    this.chooseImage();
                } else {
                    // H5环境下，如果需要选择其他类型文件，使用plus API（如果可用）
                    // #ifdef H5
                    if (window.plus && plus.os) {
                        this.chooseFileWithPlus();
                    } else {
                        this.showErrorToast("H5环境暂不支持选择非图片文件");
                    }
                    // #endif
                }
                return;
            }

            // 微信小程序环境
            if (this.isMP) {
                if (isImageOnly) {
                    this.chooseImage();
                } else {
                    // 微信小程序环境下可以使用chooseMessageFile
                    // #ifdef MP-WEIXIN
                    wx.chooseMessageFile({
                        count: this.multiple ? 9 : 1,
                        type: "all",
                        success: (res) => {
                            this.handleChooseMessageFileSuccess(res);
                        },
                        fail: () => {
                            this.showErrorToast("选择文件失败");
                        },
                    });
                    // #endif

                    // 其他小程序环境
                    // #ifndef MP-WEIXIN
                    this.showErrorToast("当前平台不支持选择非图片文件");
                    // #endif
                }
                return;
            }

            // App环境
            if (this.isApp) {
                // App环境下，优先使用chooseImage选择图片
                if (isImageOnly) {
                    this.chooseImage();
                    return;
                }

                // 选择其他类型文件
                // #ifdef APP-PLUS
                try {
                    const extensions = this.getExtensionList();

                    // 选择文件配置
                    const options = {
                        count: this.multiple ? 99 : 1,
                        success: (res) => {
                            this.handleFileChooseSuccess(res.tempFiles);
                        },
                        fail: () => {
                            this.showErrorToast("选择文件失败");
                        },
                    };

                    // 只有当有扩展名限制且不为空时才添加extension参数
                    if (extensions && extensions.length > 0) {
                        options.extension = extensions;
                    }

                    uni.chooseFile(options);
                } catch (error) {
                    this.showErrorToast("当前环境不支持此操作");
                }
                // #endif

                // #ifndef APP-PLUS
                this.showErrorToast("当前环境不支持选择非图片文件");
                // #endif

                return;
            }

            // 其他环境下提示不支持
            this.showErrorToast("当前环境不支持文件上传");
        },

        // 通用的选择图片方法
        chooseImage() {
            uni.chooseImage({
                count: this.multiple ? 9 : 1,
                success: (res) => {
                    this.handleChooseImageSuccess(res);
                },
                fail: () => {
                    this.showErrorToast("选择图片失败");
                },
            });
        },

        // 使用plus API选择文件
        chooseFileWithPlus() {
            // #ifdef H5
            try {
                // 创建临时input元素
                const input = document.createElement("input");
                input.type = "file";
                input.accept = this.computedAccept || "*/*";
                input.multiple = this.multiple;
                input.style.display = "none";

                // 监听文件选择事件
                input.onchange = (event) => {
                    const files = event.target.files;
                    if (!files || !files.length) return;

                    const tempFiles = Array.from(files).map((file) => {
                        return {
                            name: file.name,
                            size: file.size,
                            type: file.type || this.getFileType(file.name),
                            path: URL.createObjectURL(file),
                            file: file,
                        };
                    });

                    this.handleFileChooseSuccess(tempFiles);

                    // 移除临时元素
                    document.body.removeChild(input);
                };

                // 添加到页面并触发点击
                document.body.appendChild(input);
                input.click();
            } catch (error) {
                this.showErrorToast("当前环境不支持此操作");
            }
            // #endif
        },

        // 判断是否只接受图片
        isImageAccept() {
            if (!this.computedAccept || this.computedAccept === "*/*") return false;

            const acceptTypes = this.computedAccept.split(",");
            // 检查是否包含非图片类型
            for (const type of acceptTypes) {
                const trimmedType = type.trim();
                if (
                    !trimmedType.startsWith("image/") &&
                    !trimmedType.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)
                ) {
                    return false;
                }
            }

            // 如果所有类型都是图片，返回 true
            return acceptTypes.length > 0;
        },

        // 获取文件扩展名列表
        getExtensionList() {
            if (this.computedAccept === "*/*" || !this.computedAccept) return null;

            const mimeToExt = {
                "image/jpeg": "jpg",
                "image/png": "png",
                "image/gif": "gif",
                "image/bmp": "bmp",
                "image/webp": "webp",
                "application/pdf": "pdf",
                "application/msword": "doc",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
                "application/vnd.ms-excel": "xls",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
                "application/vnd.ms-powerpoint": "ppt",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
                "text/plain": "txt",
                "text/csv": "csv",
                "application/json": "json",
                "application/xml": "xml",
                "application/zip": "zip",
                "application/x-rar-compressed": "rar",
            };

            const extensions = this.computedAccept
                .split(",")
                .map((type) => {
                    const trimmedType = type.trim();
                    // 处理 MIME 类型
                    if (trimmedType.includes("/")) {
                        // 如果是 MIME 类型，查找对应的扩展名
                        if (mimeToExt[trimmedType]) {
                            return mimeToExt[trimmedType];
                        }
                        // 如果在映射表中找不到，尝试提取子类型
                        const subType = trimmedType.split("/")[1];
                        if (subType === "*") return null;
                        return subType;
                    } else {
                        // 如果已经是扩展名，去掉前面的点
                        return trimmedType.replace(/^\./, "");
                    }
                })
                .filter((ext) => ext !== null); // 过滤掉空值

            return extensions.length > 0 ? extensions : null;
        },

        // 处理微信小程序选择图片成功
        handleChooseImageSuccess(res) {
            const tempFiles = res.tempFiles || [];
            if (tempFiles.length === 0 && res.tempFilePaths) {
                // 兼容旧版本API
                res.tempFilePaths.forEach((path, index) => {
                    tempFiles.push({
                        path: path,
                        size: res.size ? res.size[index] : 0,
                        name: this.getFileNameFromPath(path),
                        type: "image/*",
                    });
                });
            }

            this.handleFileChooseSuccess(tempFiles);
        },

        // 处理微信小程序选择消息文件成功
        handleChooseMessageFileSuccess(res) {
            const tempFiles = res.tempFiles || [];
            this.handleFileChooseSuccess(tempFiles);
        },

        // 从路径中获取文件名
        getFileNameFromPath(path) {
            if (!path) return "unknown.png";
            const parts = path.split("/");
            return parts[parts.length - 1] || "unknown.png";
        },

        // 处理文件选择成功
        handleFileChooseSuccess(tempFiles) {
            if (!tempFiles || !tempFiles.length) return;

            // 检查文件数量限制
            if (
                this.maxCount > 0 &&
                this.internalFileList.length + tempFiles.length > this.maxCount
            ) {
                this.$emit("exceed", tempFiles);
                this.showErrorToast(`最多可上传${this.maxCount}个文件`);
                return;
            }

            // 处理选择的文件
            this.processSelectedFiles(tempFiles);
        },

        // 处理选择的文件
        async processSelectedFiles(tempFiles) {
            for (let i = 0; i < tempFiles.length; i++) {
                const tempFile = tempFiles[i];

                // 检查文件大小限制
                if (this.maxSize > 0 && tempFile.size > this.maxSize) {
                    const sizeInMB = (this.maxSize / 1024 / 1024).toFixed(1);
                    this.$emit("size-exceed", tempFile);
                    this.showErrorToast(`文件大小不能超过${sizeInMB}MB`);
                    continue;
                }

                // 执行上传前钩子函数
                if (this.beforeUpload) {
                    try {
                        const result = await this.beforeUpload(tempFile);
                        if (result === false) continue;
                    } catch (error) {
                        this.showErrorToast("上传前检查失败");
                        continue;
                    }
                }

                // 构建文件对象
                const fileObj = this.createFileObject(tempFile);

                // 添加到文件列表
                const newFileList = [...this.internalFileList, fileObj];
                this.$emit("update:fileList", newFileList);
                this.$emit("change", {
                    file: fileObj,
                    fileList: newFileList,
                });

                // 更新本地文件列表，确保组件内部状态与外部保持一致
                this.internalFileList = newFileList;

                // 如果设置了上传地址且启用了自动上传，则上传文件
                if (this.action && this.autoUpload) {
                    this.upload(fileObj, newFileList.length - 1);
                }
            }
        },

        // 创建文件对象
        createFileObject(tempFile) {
            return {
                name: tempFile.name || this.getFileNameFromPath(tempFile.path || tempFile.url),
                size: tempFile.size || 0,
                type:
                    tempFile.type ||
                    this.getFileType(tempFile.name || tempFile.path || tempFile.url),
                status: !this.action ? "success" : "ready",
                progress: !this.action ? 100 : 0,
                file: tempFile,
                url:
                    this.isH5 && tempFile.path
                        ? tempFile.path
                        : tempFile.path || tempFile.url || "",
            };
        },

        // 根据文件名获取文件类型
        getFileType(fileName) {
            if (!fileName) return "application/octet-stream";

            const ext = fileName.split(".").pop().toLowerCase();
            const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

            if (imageExts.includes(ext)) {
                return `image/${ext === "jpg" ? "jpeg" : ext}`;
            }

            const videoExts = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];
            if (videoExts.includes(ext)) {
                return `video/${ext}`;
            }

            const audioExts = ["mp3", "wav", "ogg", "aac", "flac"];
            if (audioExts.includes(ext)) {
                return `audio/${ext}`;
            }

            const docExts = {
                pdf: "application/pdf",
                doc: "application/msword",
                docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                xls: "application/vnd.ms-excel",
                xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ppt: "application/vnd.ms-powerpoint",
                pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                txt: "text/plain",
                csv: "text/csv",
                json: "application/json",
                xml: "application/xml",
                zip: "application/zip",
                rar: "application/x-rar-compressed",
            };

            return docExts[ext] || "application/octet-stream";
        },

        // 上传文件
        async upload(fileObj, index) {
            if (!fileObj || !fileObj.file) return;

            // 如果没有设置上传地址，则不执行上传
            if (!this.action) return;

            // 更新文件状态为上传中
            const updatedFile = { ...fileObj, status: "uploading", progress: 0 };
            const updatedFileList = [...this.internalFileList];
            updatedFileList[index] = updatedFile;
            this.$emit("update:fileList", updatedFileList);

            // 更新本地文件列表，确保组件内部状态与外部保持一致
            this.internalFileList = updatedFileList;

            try {
                let result;

                // 使用自定义上传方法或默认上传方法
                if (this.customUpload) {
                    result = await this.customUpload(fileObj.file, (progress) => {
                        this.updateFileProgress(index, progress);
                    });
                } else {
                    result = await this.defaultUpload(fileObj.file, (progress) => {
                        this.updateFileProgress(index, progress);
                    });
                }

                // 上传成功处理
                const successFile = {
                    ...updatedFile,
                    status: "success",
                    progress: 100,
                    ...result,
                };

                const successFileList = [...this.internalFileList];
                successFileList[index] = successFile;
                this.$emit("update:fileList", successFileList);

                // 更新本地文件列表，确保组件内部状态与外部保持一致
                this.internalFileList = successFileList;

                this.$emit("success", {
                    file: successFile,
                    fileList: successFileList,
                    response: result,
                });

                // 显示上传成功提示
                if (this.showToast) {
                    this.showSuccessToast("上传成功");
                }
            } catch (error) {
                // 上传失败处理
                const failFile = { ...updatedFile, status: "error" };
                const failFileList = [...this.internalFileList];
                failFileList[index] = failFile;
                this.$emit("update:fileList", failFileList);

                // 更新本地文件列表，确保组件内部状态与外部保持一致
                this.internalFileList = failFileList;

                this.$emit("error", {
                    file: failFile,
                    fileList: failFileList,
                    error,
                });

                // 显示上传失败提示
                if (this.showToast) {
                    this.showErrorToast("上传失败");
                }
            }
        },

        // 默认的上传方法
        defaultUpload(file, onProgress) {
            return new Promise((resolve, reject) => {
                if (!this.action) {
                    return reject(new Error("请设置上传地址"));
                }

                // 获取文件路径
                let filePath = "";
                let fileObj = null;

                // 根据不同平台获取文件路径和对象
                if (this.isH5) {
                    // H5环境
                    if (file.file instanceof File) {
                        fileObj = file.file;
                    } else if (file.path) {
                        filePath = file.path;
                    }
                } else {
                    // 非H5环境
                    filePath = file.path || file.url || "";
                }

                // H5环境且有File对象，使用FormData上传
                if (this.isH5 && fileObj) {
                    const formData = new FormData();
                    formData.append(this.name, fileObj);

                    // 添加额外参数
                    if (this.data) {
                        Object.keys(this.data).forEach((key) => {
                            formData.append(key, this.data[key]);
                        });
                    }

                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", this.action, true);

                    // 设置请求头
                    if (this.headers) {
                        Object.keys(this.headers).forEach((key) => {
                            xhr.setRequestHeader(key, this.headers[key]);
                        });
                    }

                    // 上传进度事件
                    xhr.upload.addEventListener("progress", (e) => {
                        if (e.lengthComputable) {
                            const progress = Math.round((e.loaded * 100) / e.total);
                            onProgress(progress);
                        }
                    });

                    // 请求完成事件
                    xhr.onload = function () {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                const response = JSON.parse(xhr.responseText);
                                resolve(response);
                            } catch (e) {
                                resolve(xhr.responseText);
                            }
                        } else {
                            reject(new Error(`上传失败: ${xhr.status}`));
                        }
                    };

                    // 请求错误事件
                    xhr.onerror = function () {
                        reject(new Error("网络错误"));
                    };

                    // 发送请求
                    xhr.send(formData);
                    return;
                }

                // 非H5环境或文件有path，使用uni.uploadFile
                if (!filePath) {
                    return reject(new Error("文件路径不存在"));
                }

                const uploadTask = uni.uploadFile({
                    url: this.action,
                    filePath: filePath,
                    name: this.name,
                    formData: this.data || {},
                    header: this.headers || {},
                    success: (res) => {
                        try {
                            const data =
                                typeof res.data === "string" ? JSON.parse(res.data) : res.data;
                            resolve(data);
                        } catch (e) {
                            resolve(res.data);
                        }
                    },
                    fail: (err) => {
                        reject(new Error(err.errMsg || "上传失败"));
                    },
                });

                // 监听上传进度
                if (uploadTask && uploadTask.onProgressUpdate) {
                    uploadTask.onProgressUpdate((res) => {
                        onProgress(res.progress);
                    });
                }
            });
        },

        // 更新文件上传进度
        updateFileProgress(index, progress) {
            if (!this.internalFileList[index]) return;

            const updatedFile = { ...this.internalFileList[index], progress };
            const updatedFileList = [...this.internalFileList];
            updatedFileList[index] = updatedFile;
            this.$emit("update:fileList", updatedFileList);

            // 更新本地文件列表，确保组件内部状态与外部保持一致
            this.internalFileList = updatedFileList;
        },

        // 删除文件
        handleDelete(index) {
            const file = this.internalFileList[index];
            const newFileList = [...this.internalFileList];
            newFileList.splice(index, 1);

            this.$emit("update:fileList", newFileList);

            // 更新本地文件列表，确保组件内部状态与外部保持一致
            this.internalFileList = newFileList;

            this.$emit("delete", {
                file,
                fileList: newFileList,
            });
        },

        // 预览文件
        handlePreview(file) {
            this.$emit("preview", file);

            // 如果是图片，使用uni.previewImage预览
            if (file.type && file.type.startsWith("image/")) {
                const urls = this.internalFileList
                    .filter((item) => item.type && item.type.startsWith("image/"))
                    .map((item) => item.url);
                const current = file.url;

                uni.previewImage({
                    urls,
                    current,
                });
            }
        },

        // 显示错误提示
        showErrorToast(message) {
            if (this.$toast && typeof this.$toast.error === "function") {
                this.$toast.error(message);
            } else if (this.$toast && typeof this.$toast.text === "function") {
                this.$toast.text(message);
            } else {
                uni.showToast({
                    title: message,
                    icon: "none",
                });
            }
        },

        // 显示成功提示
        showSuccessToast(message) {
            if (this.$toast && typeof this.$toast.success === "function") {
                this.$toast.success(message);
            } else if (this.$toast && typeof this.$toast.text === "function") {
                this.$toast.text(message);
            } else {
                uni.showToast({
                    title: message,
                    icon: "success",
                });
            }
        },
    },
};
</script>

<style>
.fanc-uploader {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.fanc-uploader__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: var(--uploader-gap);
}

.fanc-uploader__file-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--uploader-gap);
}

.fanc-uploader__file-item {
    position: relative;
    width: var(--uploader-item-size-normal);
    height: var(--uploader-item-size-normal);
    background-color: var(--uploader-bg-color);
    border-radius: var(--uploader-border-radius);
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid var(--uploader-border-color);
}

.fanc-uploader--small .fanc-uploader__file-item {
    width: var(--uploader-item-size-small);
    height: var(--uploader-item-size-small);
}

.fanc-uploader--large .fanc-uploader__file-item {
    width: var(--uploader-item-size-large);
    height: var(--uploader-item-size-large);
}

.fanc-uploader__file-item--error {
    border-color: var(--uploader-error-color);
}

.fanc-uploader__image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-uploader__image image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.fanc-uploader__file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.fanc-uploader__file-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    color: var(--uploader-file-icon-color);
}

.fanc-uploader__file-name {
    font-size: 12px;
    color: var(--uploader-file-name-color);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.fanc-uploader__file-status {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--uploader-status-bg-color);
    z-index: 1;
}

.fanc-uploader__loading-icon {
    animation: fanc-uploader-rotate 1s linear infinite;
    color: var(--uploader-loading-color);
}

@keyframes fanc-uploader-rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.fanc-uploader__delete {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    background-color: var(--uploader-delete-bg-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--uploader-delete-color);
    z-index: 2;
}

.fanc-uploader__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: var(--uploader-progress-color);
    z-index: 3;
}

.fanc-uploader__upload {
    position: relative;
    width: var(--uploader-item-size-normal);
    height: var(--uploader-item-size-normal);
    background-color: var(--uploader-bg-color);
    border: 1px dashed var(--uploader-border-color);
    border-radius: var(--uploader-border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
}

.fanc-uploader--small .fanc-uploader__upload {
    width: var(--uploader-item-size-small);
    height: var(--uploader-item-size-small);
}

.fanc-uploader--large .fanc-uploader__upload {
    width: var(--uploader-item-size-large);
    height: var(--uploader-item-size-large);
}

.fanc-uploader__upload-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--uploader-upload-icon-color);
}

.fanc-uploader__upload-text {
    margin-top: 8px;
    font-size: 12px;
    color: var(--uploader-upload-text-color);
}

.fanc-uploader__tips {
    margin-top: 8px;
    font-size: 12px;
    color: var(--uploader-tips-color);
    line-height: 1.5;
}
</style>
