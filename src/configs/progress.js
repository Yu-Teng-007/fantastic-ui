/**
 * Progress 进度条组件配置
 */

// 进度条状态
export const PROGRESS_STATUS = ["normal", "success", "warning", "error"];

// 默认值
export const PROGRESS_DEFAULT_PERCENTAGE = 0;
export const PROGRESS_DEFAULT_STROKE_WIDTH = 8;
export const PROGRESS_DEFAULT_SHOW_PIVOT = true;
export const PROGRESS_DEFAULT_TEXT_INSIDE = false;
export const PROGRESS_DEFAULT_ROUNDED = false;
export const PROGRESS_DEFAULT_STRIPED = false;
export const PROGRESS_DEFAULT_STRIPED_ACTIVE = false;

// 进度条颜色映射
export const PROGRESS_COLOR_MAP = {
    normal: "var(--fanc-primary-color)",
    success: "var(--fanc-success-color)",
    warning: "var(--fanc-warning-color)",
    error: "var(--fanc-danger-color)",
}; 