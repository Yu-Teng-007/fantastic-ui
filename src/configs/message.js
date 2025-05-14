/**
 * 消息通知组件配置
 * 注意：此文件中的值应与_variables.scss保持同步
 */

// 消息类型
export const MESSAGE_TYPES = ["info", "success", "warning", "error"];

// 图标映射
export const MESSAGE_ICON_MAP = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-circle",
    error: "exclamation-circle",
};

// Z-index层级
export const MESSAGE_ZINDEX = 2000;

// 消息提示默认值
export const MESSAGE_DEFAULT_DURATION = 3000; // 3秒
export const MESSAGE_SCROLL_SPEED = 50; // 像素/秒
export const MESSAGE_OFFSET_TOP = 20; // 像素
