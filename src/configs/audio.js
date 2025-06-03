/**
 * Audio 音频播放器组件配置
 */

// 音频播放器类型
export const AUDIO_TYPES = ["default", "primary", "success", "warning", "danger", "info"];

// 播放速率选项
export const AUDIO_PLAYBACK_RATES = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

// 默认设置
export const AUDIO_DEFAULT_SETTINGS = {
    volume: 1,
    playbackRate: 1.0,
    autoplay: false,
    loop: false,
    showVolume: true,
    showCover: true,
    mini: false,
    showDownload: false,
};

// 默认超时时间（毫秒）
export const AUDIO_LOAD_TIMEOUT = 10000;
