/**
 * Notify 消息提示组件配置
 * 注意：此文件中的值应与CSS变量保持同步
 */

// Notify 类型
export const NOTIFY_TYPES = ["primary", "success", "warning", "error"];

// 图标映射
export const NOTIFY_ICON_MAP = {
    primary: "info-circle",
    success: "check-circle",
    error: "times-circle",
    warning: "exclamation-circle",
};

// Z-index层级
export const NOTIFY_ZINDEX = 3000;

// 默认值
export const NOTIFY_DEFAULT_DURATION = 3000; // 3秒
export const NOTIFY_SAFE_AREA_INSET_TOP = false; // 默认不留出顶部安全距离
