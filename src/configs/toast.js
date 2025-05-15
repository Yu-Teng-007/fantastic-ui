/**
 * Toast 轻提示组件配置
 * 注意：此文件中的值应与_variables.scss保持同步
 */

// Toast 类型
export const TOAST_TYPES = ["text", "success", "error", "warning", "loading"];

// Toast 位置
export const TOAST_POSITIONS = ["center", "top", "bottom"];

// 图标映射
export const TOAST_ICON_MAP = {
    success: "check-circle",
    error: "times-circle",
    warning: "exclamation-circle",
    info: "info-circle",
};

// Z-index层级
export const TOAST_ZINDEX = 3000;

// 默认值
export const TOAST_DEFAULT_DURATION = 2000; // 2秒
export const TOAST_MAX_WIDTH = "70%"; // 最大宽度
export const TOAST_LOCK_BACKGROUND = false; // 默认不锁定背景
