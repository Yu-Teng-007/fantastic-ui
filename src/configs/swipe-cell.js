/**
 * SwipeCell 滑动单元格组件配置
 */
export default {
    // 默认左侧滑动区域宽度
    defaultLeftWidth: 0,

    // 默认右侧滑动区域宽度
    defaultRightWidth: 0,

    // 默认滑动阈值比例
    defaultThreshold: 0.3,

    // 默认自动关闭
    defaultAutoClose: true,

    // 默认禁用状态
    defaultDisabled: false,

    // 过渡动画持续时间
    transitionDuration: "0.3s",

    // 操作按钮默认配置
    actionButton: {
        // 删除按钮
        delete: {
            text: "删除",
            backgroundColor: "var(--swipe-cell-delete-bg)",
            color: "var(--swipe-cell-text-color)",
        },
        // 编辑按钮
        edit: {
            text: "编辑",
            backgroundColor: "var(--swipe-cell-edit-bg)",
            color: "var(--swipe-cell-text-color)",
        },
        // 收藏按钮
        collect: {
            text: "收藏",
            backgroundColor: "var(--swipe-cell-collect-bg)",
            color: "var(--swipe-cell-text-color)",
        },
    },
};
