/**
 * 公告栏组件配置
 * 注意：此文件中的值应与_variables.scss保持同步
 */

// 公告栏类型
export const NOTICEBAR_TYPES = ["info", "success", "warning", "error"];

// 图标映射
export const NOTICEBAR_ICON_MAP = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-triangle",
    error: "exclamation-circle",
};

// 滚动速度（像素/秒）
export const NOTICEBAR_SCROLL_SPEED = 50;

// 默认播放间隔（毫秒）
export const NOTICEBAR_PLAY_INTERVAL = 3000;
