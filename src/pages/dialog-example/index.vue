<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">对话框</text>
            <text class="example-page__header-desc">用于展示重要信息或需要用户进行操作的弹出式对话框</text>
        </view>

        <!-- 基础用法 -->
        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">展示基本的对话框</view>
            <view class="example-page__button-group">
                <button class="btn btn-primary" @click="showBasicDialog">基础对话框</button>
                <button class="btn btn-secondary" @click="showLongContentDialog">长文本对话框</button>
            </view>
        </view>

        <!-- 对话框类型 -->
        <view class="example-page__section">
            <view class="example-page__section-title">对话框类型</view>
            <view class="example-page__section-desc">Dialog 支持不同类型的对话框</view>
            <view class="example-page__button-group">
                <button class="btn btn-success" @click="showSuccessDialog">成功对话框</button>
                <button class="btn btn-danger" @click="showErrorDialog">错误对话框</button>
                <button class="btn btn-warning" @click="showWarningDialog">警告对话框</button>
                <button class="btn btn-info" @click="showInfoDialog">信息对话框</button>
            </view>
        </view>

        <!-- 对话框位置 -->
        <view class="example-page__section">
            <view class="example-page__section-title">对话框位置</view>
            <view class="example-page__section-desc">可以设置对话框显示在顶部、中间或底部</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-primary" @click="showTopDialog">顶部对话框</button>
                <button class="btn btn-outline-primary" @click="showCenterDialog">中间对话框</button>
                <button class="btn btn-outline-primary" @click="showBottomDialog">底部对话框</button>
            </view>
        </view>

        <!-- 按钮布局 -->
        <view class="example-page__section">
            <view class="example-page__section-title">按钮布局</view>
            <view class="example-page__section-desc">配置按钮的显示方式和布局</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-secondary" @click="showHorizontalButtonsDialog">水平按钮</button>
                <button class="btn btn-outline-secondary" @click="showVerticalButtonsDialog">垂直按钮</button>
                <button class="btn btn-outline-secondary" @click="showSingleButtonDialog">单个按钮</button>
                <button class="btn btn-outline-secondary" @click="showNoButtonsDialog">无按钮</button>
                <button class="btn btn-outline-secondary" @click="showMultiButtonsDialog">多按钮</button>
            </view>
        </view>

        <!-- 图片对话框 -->
        <view class="example-page__section">
            <view class="example-page__section-title">图片对话框</view>
            <view class="example-page__section-desc">显示带图片的对话框</view>
            <view class="example-page__button-group">
                <button class="btn btn-primary" @click="showImageDialog">基础图片对话框</button>
                <button class="btn btn-success" @click="showImageSuccessDialog">成功图片对话框</button>
                <button class="btn btn-warning" @click="showImageWarningDialog">警告图片对话框</button>
            </view>
        </view>

        <!-- 图片位置 -->
        <view class="example-page__section">
            <view class="example-page__section-title">图片位置</view>
            <view class="example-page__section-desc">控制图片在对话框中的位置</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-primary" @click="showImageTopDialog">图片置顶</button>
                <button class="btn btn-outline-primary" @click="showImageDefaultDialog">图片居中</button>
                <button class="btn btn-outline-primary" @click="showImageBottomDialog">图片底部</button>
            </view>
        </view>

        <!-- 高级配置 -->
        <view class="example-page__section">
            <view class="example-page__section-title">高级配置</view>
            <view class="example-page__section-desc">更多高级配置选项</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-info" @click="showCloseIconDialog">显示关闭图标</button>
                <button class="btn btn-outline-info" @click="showNoMaskDialog">无遮罩层</button>
                <button class="btn btn-outline-danger" @click="showNoMaskCloseDialog">遮罩不可关闭</button>
                <button class="btn btn-outline-warning" @click="showRoundedDialog">圆角对话框</button>
                <button class="btn btn-outline-warning" @click="showNoRoundedDialog">直角对话框</button>
                <button class="btn btn-outline-success" @click="showCustomStyleDialog">自定义样式</button>
            </view>
        </view>

        <!-- 异步操作 -->
        <view class="example-page__section">
            <view class="example-page__section-title">异步操作</view>
            <view class="example-page__section-desc">控制对话框的异步关闭</view>
            <view class="example-page__button-group">
                <button class="btn btn-primary" @click="showAsyncDialog">异步关闭</button>
                <button class="btn btn-danger" @click="showLoadingDialog">加载状态</button>
            </view>
        </view>

        <!-- 插槽用法 -->
        <view class="example-page__section">
            <view class="example-page__section-title">插槽用法</view>
            <view class="example-page__section-desc">使用插槽自定义对话框内容</view>
            <view class="example-page__button-group">
                <button class="btn btn-outline-primary" @click="showCustomHeaderDialog">自定义标题</button>
                <button class="btn btn-outline-primary" @click="showCustomContentDialog">自定义内容</button>
                <button class="btn btn-outline-primary" @click="showCustomFooterDialog">自定义底部按钮</button>
                <button class="btn btn-outline-primary" @click="showCustomBottomDialog">自定义底部内容</button>
            </view>
        </view>

        <!-- Dialog 组件 -->
        <fanc-dialog
            v-model:show="dialog.show"
            :title="dialog.title"
            :message="dialog.message"
            :type="dialog.type"
            :position="dialog.position"
            :show-title="dialog.showTitle"
            :show-buttons="dialog.showButtons"
            :show-confirm-button="dialog.showConfirmButton"
            :show-cancel-button="dialog.showCancelButton"
            :confirm-text="dialog.confirmText"
            :cancel-text="dialog.cancelText"
            :button-layout="dialog.buttonLayout"
            :message-align="dialog.messageAlign"
            :show-close="dialog.showClose"
            :close-icon-position="dialog.closeIconPosition"
            :mask="dialog.mask"
            :mask-click-close="dialog.maskClickClose"
            :round="dialog.round"
            :lock-scroll="dialog.lockScroll"
            :custom-class="dialog.customClass"
            :custom-style="dialog.customStyle"
            :confirm-button-style="dialog.confirmButtonStyle"
            :cancel-button-style="dialog.cancelButtonStyle"
            :async-close="dialog.asyncClose"
            :image-url="dialog.imageUrl"
            :image-style="dialog.imageStyle"
            :image-position="dialog.imagePosition"
            :buttons="dialog.buttons"
            @buttonClick="handleButtonClick"
            @confirm="handleConfirm"
            @cancel="handleCancel"
            @close="handleClose"
        >
            <!-- 自定义内容插槽 -->
            <template v-if="dialog.useCustomContent" #default>
                <view class="custom-content">
                    <image class="custom-image" src="../../static/img/picture_2.png" mode="aspectFit"></image>
                    <text class="custom-text">{{ dialog.customContentText }}</text>
                </view>
            </template>

            <!-- 自定义标题插槽 -->
            <template v-if="dialog.useCustomHeader" #header>
                <view class="custom-header">
                    <text class="custom-header-title">{{ dialog.customHeaderTitle }}</text>
                    <text class="custom-header-subtitle">{{ dialog.customHeaderSubtitle }}</text>
                </view>
            </template>

            <!-- 自定义底部按钮插槽 -->
            <template v-if="dialog.useCustomFooter" #footer>
                <view class="custom-footer">
                    <button class="custom-button primary" @click="handleCustomConfirm">
                        {{ dialog.customConfirmText }}
                    </button>
                    <button class="custom-button secondary" @click="handleCustomCancel">
                        {{ dialog.customCancelText }}
                    </button>
                </view>
            </template>

            <!-- 自定义底部内容插槽 -->
            <template v-if="dialog.useCustomBottom" #bottom>
                <view class="custom-bottom">
                    <text class="custom-bottom-text">{{ dialog.customBottomText }}</text>
                </view>
            </template>
        </fanc-dialog>

        <!-- 加载中对话框 -->
        <fanc-dialog
            v-model:show="loadingDialog.show"
            :title="loadingDialog.title"
            :show-cancel-button="false"
            :mask-click-close="false"
        >
            <view class="loading-content">
                <view class="loading-spinner"></view>
                <text class="loading-text">{{ loadingDialog.message }}</text>
            </view>
        </fanc-dialog>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 主对话框配置
            dialog: {
                show: false,
                title: "提示",
                message: "",
                type: "default",
                position: "center",
                showTitle: true,
                showButtons: true,
                showConfirmButton: true,
                showCancelButton: true,
                confirmText: "确定",
                cancelText: "取消",
                buttonLayout: "horizontal",
                messageAlign: "left",
                showClose: false,
                closeIconPosition: "inside",
                mask: true,
                maskClickClose: true,
                round: true,
                lockScroll: true,
                customClass: "",
                customStyle: "",
                confirmButtonStyle: "",
                cancelButtonStyle: "",
                asyncClose: false,
                imageUrl: "",
                imageStyle: "",
                imagePosition: "default",
                buttons: [],

                // 自定义内容相关
                useCustomContent: false,
                customContentText: "",

                // 自定义标题相关
                useCustomHeader: false,
                customHeaderTitle: "",
                customHeaderSubtitle: "",

                // 自定义底部按钮相关
                useCustomFooter: false,
                customConfirmText: "",
                customCancelText: "",

                // 自定义底部内容相关
                useCustomBottom: false,
                customBottomText: "",
            },

            // 加载对话框配置
            loadingDialog: {
                show: false,
                title: "加载中",
                message: "请稍候...",
            },

            // 加载完成后的定时器
            loadingTimer: null,
        };
    },
    methods: {
        // 重置对话框配置
        resetDialog() {
            this.dialog = {
                show: false,
                title: "提示",
                message: "",
                type: "default",
                position: "center",
                showTitle: true,
                showButtons: true,
                showConfirmButton: true,
                showCancelButton: true,
                confirmText: "确定",
                cancelText: "取消",
                buttonLayout: "horizontal",
                messageAlign: "left",
                showClose: false,
                closeIconPosition: "inside",
                mask: true,
                maskClickClose: true,
                round: true,
                lockScroll: true,
                customClass: "",
                customStyle: "",
                confirmButtonStyle: "",
                cancelButtonStyle: "",
                asyncClose: false,
                imageUrl: "",
                imageStyle: "",
                imagePosition: "default",
                buttons: [],

                useCustomContent: false,
                customContentText: "",

                useCustomHeader: false,
                customHeaderTitle: "",
                customHeaderSubtitle: "",

                useCustomFooter: false,
                customConfirmText: "",
                customCancelText: "",

                useCustomBottom: false,
                customBottomText: "",
            };
        },

        // 基础用法
        showBasicDialog() {
            this.resetDialog();
            this.dialog.title = "提示";
            this.dialog.message = "这是一个基础对话框，展示简单的信息内容。";
            this.dialog.show = true;
        },

        showLongContentDialog() {
            this.resetDialog();
            this.dialog.title = "详细信息";
            this.dialog.message =
                "这是一个包含较长文本内容的对话框示例。对话框组件会自动处理内容溢出情况，当内容超过一定高度时，将出现滚动条。这使得对话框可以展示大量信息而不会占据过多屏幕空间。您可以尝试在对话框中放置更多内容来测试这一功能。";
            this.dialog.show = true;
        },

        // 对话框类型
        showSuccessDialog() {
            this.resetDialog();
            this.dialog.title = "成功";
            this.dialog.message = "操作已成功完成！";
            this.dialog.type = "success";
            this.dialog.show = true;
        },

        showErrorDialog() {
            this.resetDialog();
            this.dialog.title = "错误";
            this.dialog.message = "操作执行失败，请重试。";
            this.dialog.type = "error";
            this.dialog.show = true;
        },

        showWarningDialog() {
            this.resetDialog();
            this.dialog.title = "警告";
            this.dialog.message = "此操作可能导致数据丢失，是否继续？";
            this.dialog.type = "warning";
            this.dialog.show = true;
        },

        showInfoDialog() {
            this.resetDialog();
            this.dialog.title = "信息";
            this.dialog.message = "这是一条重要的信息通知。";
            this.dialog.type = "info";
            this.dialog.show = true;
        },

        // 对话框位置
        showTopDialog() {
            this.resetDialog();
            this.dialog.title = "顶部对话框";
            this.dialog.message = "这个对话框显示在页面顶部。";
            this.dialog.position = "top";
            this.dialog.show = true;
        },

        showCenterDialog() {
            this.resetDialog();
            this.dialog.title = "中间对话框";
            this.dialog.message = "这个对话框显示在页面中间。";
            this.dialog.position = "center";
            this.dialog.show = true;
        },

        showBottomDialog() {
            this.resetDialog();
            this.dialog.title = "底部对话框";
            this.dialog.message = "这个对话框显示在页面底部。";
            this.dialog.position = "bottom";
            this.dialog.show = true;
        },

        // 按钮布局
        showHorizontalButtonsDialog() {
            this.resetDialog();
            this.dialog.title = "水平按钮";
            this.dialog.message = "这个对话框的按钮水平排列。";
            this.dialog.buttonLayout = "horizontal";
            this.dialog.show = true;
        },

        showVerticalButtonsDialog() {
            this.resetDialog();
            this.dialog.title = "垂直按钮";
            this.dialog.message = "这个对话框的按钮垂直排列。";
            this.dialog.buttonLayout = "vertical";
            this.dialog.show = true;
        },

        showSingleButtonDialog() {
            this.resetDialog();
            this.dialog.title = "单个按钮";
            this.dialog.message = "这个对话框只有一个确认按钮。";
            this.dialog.showCancelButton = false;
            this.dialog.show = true;
        },

        showNoButtonsDialog() {
            this.resetDialog();
            this.dialog.title = "无按钮";
            this.dialog.message = "这个对话框没有按钮，点击遮罩层关闭。";
            this.dialog.showButtons = false;
            this.dialog.show = true;
        },

        showMultiButtonsDialog() {
            this.resetDialog();
            this.dialog.title = "多个按钮";
            this.dialog.message = "垂直布局下可以显示多个按钮，支持不同类型和样式。";
            this.dialog.buttonLayout = "vertical";
            this.dialog.showCancelButton = false;
            this.dialog.showConfirmButton = false;
            this.dialog.buttons = [
                {
                    text: "立即购买",
                    type: "confirm",
                    callback: () => {
                        console.log("点击了立即购买");
                    },
                },
                {
                    text: "加入购物车",
                    type: "info",
                    callback: () => {
                        console.log("点击了加入购物车");
                    },
                },
                {
                    text: "稍后再说",
                    type: "cancel",
                    callback: () => {
                        console.log("点击了稍后再说");
                    },
                },
                {
                    text: "查看详情",
                    style: "color: #7952b3;",
                    callback: () => {
                        console.log("点击了查看详情");
                    },
                },
            ];
            this.dialog.show = true;
        },

        // 高级配置
        showCloseIconDialog() {
            this.resetDialog();
            this.dialog.title = "关闭图标";
            this.dialog.message = "这个对话框右上角有一个关闭图标。";
            this.dialog.showClose = true;
            this.dialog.closeIconPosition = "inside";
            this.dialog.show = true;
        },

        showNoMaskDialog() {
            this.resetDialog();
            this.dialog.title = "无遮罩层";
            this.dialog.message = "这个对话框没有背景遮罩层。";
            this.dialog.mask = false;
            this.dialog.show = true;
        },

        showNoMaskCloseDialog() {
            this.resetDialog();
            this.dialog.title = "遮罩不可关闭";
            this.dialog.message = "点击遮罩层不会关闭此对话框。";
            this.dialog.maskClickClose = false;
            this.dialog.show = true;
        },

        showRoundedDialog() {
            this.resetDialog();
            this.dialog.title = "圆角对话框";
            this.dialog.message = "这个对话框有圆角边框。";
            this.dialog.round = true;
            this.dialog.show = true;
        },

        showNoRoundedDialog() {
            this.resetDialog();
            this.dialog.title = "直角对话框";
            this.dialog.message = "这个对话框没有圆角边框。";
            this.dialog.round = false;
            this.dialog.show = true;
        },

        showCustomStyleDialog() {
            this.resetDialog();
            this.dialog.title = "自定义样式";
            this.dialog.message = "这个对话框使用了自定义样式。";
            this.dialog.customStyle = "background-color: #f0f9ff; box-shadow: 0 0 20px rgba(0, 123, 255, 0.15);";
            this.dialog.confirmButtonStyle = "color: #007bff; font-weight: bold;";
            this.dialog.cancelButtonStyle = "color: #6c757d;";
            this.dialog.show = true;
        },

        // 异步操作
        showAsyncDialog() {
            this.resetDialog();
            this.dialog.title = "异步关闭";
            this.dialog.message = "点击按钮后，对话框不会立即关闭，而是等待异步操作完成。";
            this.dialog.asyncClose = true;
            this.dialog.show = true;
        },

        showLoadingDialog() {
            this.resetDialog();
            // 显示加载对话框
            this.loadingDialog.show = true;

            // 模拟加载过程
            this.loadingTimer = setTimeout(() => {
                // 关闭加载对话框
                this.loadingDialog.show = false;

                // 显示成功对话框
                this.dialog.title = "加载完成";
                this.dialog.message = "数据已成功加载！";
                this.dialog.type = "success";
                this.dialog.show = true;
            }, 3000);
        },

        // 插槽用法
        showCustomHeaderDialog() {
            this.resetDialog();
            this.dialog.useCustomHeader = true;
            this.dialog.customHeaderTitle = "自定义标题";
            this.dialog.customHeaderSubtitle = "这是一个副标题，展示更多信息";
            this.dialog.message = "这个对话框使用了自定义的标题区域。";
            this.dialog.show = true;
        },

        showCustomContentDialog() {
            this.resetDialog();
            this.dialog.title = "自定义内容";
            this.dialog.useCustomContent = true;
            this.dialog.customContentText = "这是使用插槽自定义的内容区域，可以包含图片或其他组件。";
            this.dialog.show = true;
        },

        showCustomFooterDialog() {
            this.resetDialog();
            this.dialog.title = "自定义底部";
            this.dialog.message = "这个对话框使用了自定义的底部按钮区域。";
            this.dialog.useCustomFooter = true;
            this.dialog.customConfirmText = "同意并继续";
            this.dialog.customCancelText = "暂不操作";
            this.dialog.show = true;
        },

        showCustomBottomDialog() {
            this.resetDialog();
            this.dialog.title = "底部插槽";
            this.dialog.message = "这个对话框在底部按钮下方还有额外的内容区域。";
            this.dialog.useCustomBottom = true;
            this.dialog.customBottomText = "点击'确定'表示您同意我们的用户协议和隐私政策";
            this.dialog.show = true;
        },

        // 事件处理
        handleConfirm() {
            if (this.dialog.asyncClose) {
                // 模拟异步操作
                setTimeout(() => {
                    this.dialog.show = false;
                    console.log("异步操作完成，关闭对话框");
                }, 1000);
            } else {
                console.log("点击了确认按钮");
            }
        },

        handleCancel() {
            if (this.dialog.asyncClose) {
                // 模拟异步操作
                setTimeout(() => {
                    this.dialog.show = false;
                    console.log("异步操作取消，关闭对话框");
                }, 1000);
            } else {
                console.log("点击了取消按钮");
            }
        },

        handleClose() {
            console.log("对话框被关闭");
        },

        handleCustomConfirm() {
            this.dialog.show = false;
            console.log("点击了自定义确认按钮");
        },

        handleCustomCancel() {
            this.dialog.show = false;
            console.log("点击了自定义取消按钮");
        },

        handleButtonClick({ button, index }) {
            console.log(`点击了第${index + 1}个按钮:`, button.text);
        },

        // 图片对话框
        showImageDialog() {
            this.resetDialog();
            this.dialog.title = "图片对话框";
            this.dialog.message = "这是一个包含图片的对话框示例";
            this.dialog.imageUrl = "../../static/img/picture_1.png";
            this.dialog.show = true;
        },

        showImageSuccessDialog() {
            this.resetDialog();
            this.dialog.title = "操作成功";
            this.dialog.message = "您的文件已上传成功！";
            this.dialog.type = "success";
            this.dialog.imageUrl = "../../static/img/picture_3.png";
            this.dialog.show = true;
        },

        showImageWarningDialog() {
            this.resetDialog();
            this.dialog.title = "确认删除";
            this.dialog.message = "删除后无法恢复，是否继续？";
            this.dialog.type = "warning";
            this.dialog.imageUrl = "../../static/img/picture_4.png";
            this.dialog.imageStyle = "width: 180rpx; height: 180rpx;";
            this.dialog.show = true;
        },

        // 图片位置示例
        showImageTopDialog() {
            this.resetDialog();
            this.dialog.title = "图片置顶";
            this.dialog.message = "图片显示在标题上方，更加醒目";
            this.dialog.imageUrl = "../../static/img/picture_1.png";
            this.dialog.imagePosition = "top";
            this.dialog.show = true;
        },

        showImageDefaultDialog() {
            this.resetDialog();
            this.dialog.title = "图片默认位置";
            this.dialog.message = "图片显示在标题和内容之间";
            this.dialog.imageUrl = "../../static/img/picture_1.png";
            this.dialog.imagePosition = "default";
            this.dialog.show = true;
        },

        showImageBottomDialog() {
            this.resetDialog();
            this.dialog.title = "图片底部";
            this.dialog.message = "图片显示在内容和按钮之间";
            this.dialog.imageUrl = "../../static/img/picture_1.png";
            this.dialog.imagePosition = "bottom";
            this.dialog.show = true;
        },
    },

    beforeDestroy() {
        // 清除可能存在的定时器
        if (this.loadingTimer) {
            clearTimeout(this.loadingTimer);
            this.loadingTimer = null;
        }
    },
};
</script>

<style lang="scss">
// 示例页面按钮样式
.btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    min-width: 100px;
    text-align: center;
    transition: all 0.3s;
    margin: 0 8px 8px 0;

    &:active {
        opacity: 0.8;
        transform: scale(0.98);
    }

    // 主要按钮
    &-primary {
        background-color: #007bff;
        color: #fff;
        border: none;
    }

    // 次要按钮
    &-secondary {
        background-color: #6c757d;
        color: #fff;
        border: none;
    }

    // 成功按钮
    &-success {
        background-color: #28a745;
        color: #fff;
        border: none;
    }

    // 危险按钮
    &-danger {
        background-color: #dc3545;
        color: #fff;
        border: none;
    }

    // 警告按钮
    &-warning {
        background-color: #ffc107;
        color: #212529;
        border: none;
    }

    // 信息按钮
    &-info {
        background-color: #17a2b8;
        color: #fff;
        border: none;
    }

    // 轮廓按钮样式
    &-outline-primary {
        background-color: transparent;
        color: #007bff;
        border: 1px solid #007bff;
    }

    &-outline-secondary {
        background-color: transparent;
        color: #6c757d;
        border: 1px solid #6c757d;
    }

    &-outline-success {
        background-color: transparent;
        color: #28a745;
        border: 1px solid #28a745;
    }

    &-outline-danger {
        background-color: transparent;
        color: #dc3545;
        border: 1px solid #dc3545;
    }

    &-outline-warning {
        background-color: transparent;
        color: #ffc107;
        border: 1px solid #ffc107;
    }

    &-outline-info {
        background-color: transparent;
        color: #17a2b8;
        border: 1px solid #17a2b8;
    }
}

// 自定义内容样式
.custom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
}

.custom-image {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
}

.custom-text {
    text-align: center;
    font-size: 16px;
    color: #333;
}

// 自定义标题样式
.custom-header {
    padding: 24px 24px 0;
    text-align: center;
}

.custom-header-title {
    font-size: 20px;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 8px;
    display: block;
}

.custom-header-subtitle {
    font-size: 14px;
    color: #6c757d;
    display: block;
}

// 自定义底部按钮样式
.custom-footer {
    width: 100%;
    display: flex;
    padding: 16px 24px;
    justify-content: space-between;
    border-top: 1px solid #eee;
}

.custom-button {
    border-radius: 4px;
    font-size: 14px;
    border: none;
    transition: all 0.3s;

    &:active {
        opacity: 0.8;
        transform: scale(0.98);
    }

    &.primary {
        background-color: #007bff;
        color: #fff;
        margin-right: 15px;
    }

    &.secondary {
        background-color: #f8f9fa;
        color: #6c757d;
        border: 1px solid #dee2e6;
    }
}

// 自定义底部内容样式
.custom-bottom {
    padding: 12px 24px;
    text-align: center;
    background-color: #f8f9fa;
    border-top: 1px solid #eee;
}

.custom-bottom-text {
    font-size: 12px;
    color: #6c757d;
}

// 加载内容样式
.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
}

.loading-text {
    font-size: 16px;
    color: #6c757d;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
