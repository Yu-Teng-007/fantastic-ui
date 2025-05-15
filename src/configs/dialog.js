/**
 * Dialog对话框组件配置
 */
export default {
    // 默认标题
    title: "提示",

    // 默认内容
    message: "",

    // 默认类型 (default | success | warning | error | info)
    type: "default",

    // 默认位置 (center | top | bottom)
    position: "center",

    // 是否显示标题
    showTitle: true,

    // 是否显示按钮
    showButtons: true,

    // 是否显示确认按钮
    showConfirmButton: true,

    // 是否显示取消按钮
    showCancelButton: true,

    // 确认按钮文本
    confirmText: "确定",

    // 取消按钮文本
    cancelText: "取消",

    // 按钮布局方式 (horizontal | vertical)
    buttonLayout: "horizontal",

    // 内容对齐方式 (left | center | right)
    messageAlign: "left",

    // 是否显示关闭图标
    showClose: false,

    // 关闭图标位置 (inside | outside)
    closeIconPosition: "inside",

    // 是否显示遮罩
    mask: true,

    // 点击遮罩是否可关闭
    maskClickClose: true,

    // 是否使用圆角
    round: true,

    // 锁定页面滚动
    lockScroll: true,

    // 是否异步关闭
    asyncClose: false,

    // 弹出动画时长 (毫秒)
    duration: 300,

    // z-index层级
    zIndex: 2000,

    // 回调函数
    onConfirm: null,
    onCancel: null,
    onClose: null,
};
