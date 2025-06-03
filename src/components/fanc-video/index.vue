<template>
    <view
        class="fanc-video"
        :class="[
            `fanc-video--${type}`,
            {
                'fanc-video--playing': isPlaying,
                'fanc-video--fullscreen': isFullscreen,
                'fanc-video--disabled': disabled,
            },
        ]"
    >
        <!-- 视频播放区域 -->
        <view class="fanc-video__container">
            <video
                :id="videoId"
                class="fanc-video__player"
                :src="src"
                :poster="poster"
                :controls="false"
                :autoplay="autoplay"
                :loop="loop"
                :muted="muted"
                :initial-time="initialTime"
                :duration="duration"
                :object-fit="objectFit"
                :show-loading="showLoading"
                :enable-progress-gesture="enableProgressGesture"
                :show-mute-btn="false"
                :show-play-btn="false"
                :show-fullscreen-btn="false"
                :direction="direction"
                :show-center-play-btn="showCenterPlayBtn"
                @play="onVideoPlay"
                @pause="onVideoPause"
                @ended="onVideoEnded"
                @timeupdate="onTimeUpdate"
                @fullscreenchange="onFullscreenChange"
                @waiting="onWaiting"
                @error="onError"
                @progress="onProgress"
                @loadedmetadata="onLoadedMetadata"
            ></video>

            <!-- 封面图在视频未开始播放时显示 -->
            <view
                v-if="!isPlaying && !isLoading && !hasPlayed"
                class="fanc-video__poster"
                @click="play"
            >
                <image
                    v-if="poster"
                    :src="poster"
                    class="fanc-video__poster-img"
                    mode="aspectFill"
                ></image>
                <view class="fanc-video__center-play-btn" v-if="showCenterPlayBtn">
                    <fanc-icon name="play-circle" size="48" color="#ffffff"></fanc-icon>
                </view>
            </view>

            <!-- 播放暂停中央按钮层，仅在视频已经加载后显示 -->
            <view
                v-if="showControlsOverlay && !disabled && hasPlayed"
                class="fanc-video__center-controls"
                @click="togglePlay"
            >
                <view v-if="!isPlaying && !isLoading" class="fanc-video__center-play-btn">
                    <fanc-icon name="play-circle" size="48" color="#ffffff"></fanc-icon>
                </view>
            </view>

            <!-- 加载动画 -->
            <view v-if="isLoading" class="fanc-video__loading">
                <view class="fanc-video__loading-spinner"></view>
            </view>

            <!-- 控制栏 -->
            <view
                v-if="showControls && !disabled"
                class="fanc-video__controls"
                :class="{ 'fanc-video__controls--active': showControlsOverlay }"
            >
                <!-- 播放/暂停按钮 -->
                <view class="fanc-video__play-btn" @click.stop="togglePlay">
                    <fanc-icon
                        :name="isPlaying ? 'pause' : 'play'"
                        size="18"
                        color="#ffffff"
                    ></fanc-icon>
                </view>

                <!-- 时间显示和进度条 -->
                <view class="fanc-video__progress-wrap">
                    <view class="fanc-video__time fanc-video__time--current">{{
                        formatTime(currentTime)
                    }}</view>
                    <view class="fanc-video__progress-bar">
                        <view class="fanc-video__progress-bg"></view>
                        <view
                            class="fanc-video__progress-inner"
                            :style="{ width: `${progress}%` }"
                        ></view>
                        <view
                            class="fanc-video__progress-buffer"
                            :style="{ width: `${buffered}%` }"
                        ></view>
                        <view
                            class="fanc-video__progress-dot"
                            :class="{ 'fanc-video__progress-dot--dragging': isDragging }"
                            :style="{ left: `${progress}%` }"
                            @touchstart="onTouchStart"
                            @touchmove="onTouchMove"
                            @touchend="onTouchEnd"
                        ></view>
                    </view>
                    <view class="fanc-video__time fanc-video__time--duration">{{
                        formatTime(videoDuration)
                    }}</view>
                </view>

                <!-- 右侧控制区 -->
                <view class="fanc-video__actions">
                    <!-- 音量控制 -->
                    <view v-if="showVolume" class="fanc-video__volume-btn" @click.stop="toggleMute">
                        <fanc-icon
                            :name="isMuted ? 'volume-mute' : 'volume-up'"
                            size="18"
                            color="#ffffff"
                        ></fanc-icon>
                    </view>

                    <!-- 画中画按钮 (如果支持) -->
                    <view
                        v-if="showPictureInPicture"
                        class="fanc-video__pip-btn"
                        @click.stop="togglePictureInPicture"
                    >
                        <fanc-icon name="external-link-alt" size="16" color="#ffffff"></fanc-icon>
                    </view>

                    <!-- 全屏按钮 -->
                    <view
                        v-if="showFullscreen"
                        class="fanc-video__fullscreen-btn"
                        @click.stop="toggleFullscreen"
                    >
                        <fanc-icon
                            :name="isFullscreen ? 'compress' : 'expand'"
                            size="16"
                            color="#ffffff"
                        ></fanc-icon>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancVideo",
    props: {
        // 视频源
        src: {
            type: String,
            required: true,
        },
        // 封面图
        poster: {
            type: String,
            default: "",
        },
        // 类型：默认、主要、成功、警告、危险和信息
        type: {
            type: String,
            default: "default",
            validator: (value) => {
                return ["default", "primary", "success", "warning", "danger", "info"].includes(
                    value
                );
            },
        },
        // 自动播放
        autoplay: {
            type: Boolean,
            default: false,
        },
        // 循环播放
        loop: {
            type: Boolean,
            default: false,
        },
        // 静音
        muted: {
            type: Boolean,
            default: false,
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false,
        },
        // 视频起始播放位置
        initialTime: {
            type: Number,
            default: 0,
        },
        // 指定视频时长
        duration: {
            type: Number,
            default: 0,
        },
        // 视频填充模式
        objectFit: {
            type: String,
            default: "contain",
            validator: (value) => {
                return ["contain", "fill", "cover"].includes(value);
            },
        },
        // 是否显示加载中画面
        showLoading: {
            type: Boolean,
            default: true,
        },
        // 是否开启控制进度的手势
        enableProgressGesture: {
            type: Boolean,
            default: true,
        },
        // 设置全屏时视频的方向
        direction: {
            type: Number,
            default: 0,
            validator: (value) => {
                return [0, 90, -90].includes(value);
            },
        },
        // 是否显示控制栏
        showControls: {
            type: Boolean,
            default: true,
        },
        // 是否显示音量按钮
        showVolume: {
            type: Boolean,
            default: true,
        },
        // 是否显示全屏按钮
        showFullscreen: {
            type: Boolean,
            default: true,
        },
        // 是否显示画中画按钮
        showPictureInPicture: {
            type: Boolean,
            default: false,
        },
        // 是否显示视频中央的播放按钮
        showCenterPlayBtn: {
            type: Boolean,
            default: true,
        },
        // 视频元素的id，用于获取video上下文
        videoId: {
            type: String,
            default: "fancVideo",
        },
    },
    data() {
        return {
            isPlaying: false,
            isLoading: false,
            isFullscreen: false,
            isMuted: this.muted,
            isPictureInPicture: false,
            currentTime: 0,
            videoDuration: this.duration || 0,
            progress: 0,
            buffered: 0,
            isDragging: false,
            videoContext: null,
            controlsTimer: null,
            showControlsOverlay: false,
            hasPlayed: false,
        };
    },
    mounted() {
        this.initVideoContext();
        // 添加点击事件监听器
        this.addTouchListeners();
    },
    beforeDestroy() {
        this.clearControlsTimer();
        // 移除点击事件监听器
        this.removeTouchListeners();
    },
    methods: {
        // 初始化视频上下文
        initVideoContext() {
            // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU || MP-QQ
            this.videoContext = uni.createVideoContext(this.videoId, this);
            // #endif
        },

        // 播放视频
        play() {
            if (this.disabled) return;

            this.videoContext?.play();
            this.isPlaying = true;
            this.hasPlayed = true;
            this.showControlsOverlay = true;
            this.resetControlsTimer();

            this.$emit("play");
        },

        // 暂停视频
        pause() {
            if (this.disabled) return;

            this.videoContext?.pause();
            this.isPlaying = false;
            this.showControlsOverlay = true;
            this.clearControlsTimer();

            this.$emit("pause");
        },

        // 切换播放/暂停状态
        togglePlay() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        },

        // 切换全屏/退出全屏
        toggleFullscreen() {
            if (this.isFullscreen) {
                this.videoContext?.exitFullScreen();
            } else {
                this.videoContext?.requestFullScreen();
            }
        },

        // 切换静音状态
        toggleMute() {
            this.isMuted = !this.isMuted;

            if (this.videoContext) {
                if (this.isMuted) {
                    this.videoContext.mute();
                } else {
                    this.videoContext.unmute();
                }
            }

            this.$emit("mutechange", this.isMuted);
        },

        // 切换画中画模式
        togglePictureInPicture() {
            // #ifdef H5
            if (document.pictureInPictureEnabled) {
                const videoElement = document.getElementById(this.videoId);
                if (videoElement) {
                    if (document.pictureInPictureElement) {
                        document.exitPictureInPicture().catch((error) => {
                            this.$toast.error("退出画中画模式失败");
                            console.error("退出画中画模式失败:", error);
                        });
                    } else {
                        videoElement.requestPictureInPicture().catch((error) => {
                            this.$toast.error("进入画中画模式失败");
                            console.error("进入画中画模式失败:", error);
                        });
                    }
                }
            } else {
                this.$toast.warning("当前环境不支持画中画模式");
            }
            // #endif

            // #ifdef MP-WEIXIN
            if (this.isPictureInPicture) {
                this.videoContext?.exitPictureInPicture?.();
            } else {
                this.videoContext?.requestPictureInPicture?.();
            }
            // #endif
        },

        // 格式化时间
        formatTime(seconds) {
            if (isNaN(seconds) || seconds === Infinity) return "00:00";
            seconds = Math.floor(seconds);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            seconds = seconds % 60;

            if (hours > 0) {
                return `${hours.toString().padStart(2, "0")}:${(minutes % 60)
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            }
            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        },

        // 进度条触摸开始
        onTouchStart(e) {
            this.isDragging = true;
            this.clearControlsTimer();
            this.updateProgressByTouch(e);
        },

        // 进度条触摸移动
        onTouchMove(e) {
            if (!this.isDragging) return;
            this.updateProgressByTouch(e);
        },

        // 进度条触摸结束
        onTouchEnd(e) {
            if (!this.isDragging) return;

            this.updateProgressByTouch(e);
            this.isDragging = false;
            this.resetControlsTimer();

            // 更新视频播放位置
            const seekTime = (this.progress / 100) * this.videoDuration;
            this.videoContext?.seek(seekTime);
        },

        // 根据触摸位置更新进度
        updateProgressByTouch(e) {
            // 获取进度条元素
            const progressBar = e.currentTarget.parentNode;
            const rect = progressBar.getBoundingClientRect();

            // 计算进度百分比
            let touch = e.touches[0];
            let x = touch.clientX - rect.left;
            let percent = Math.min(Math.max(x / rect.width, 0), 1) * 100;

            // 更新进度
            this.progress = percent;
        },

        // 视频播放事件
        onVideoPlay() {
            this.isPlaying = true;
            this.isLoading = false;
            this.hasPlayed = true;
            this.resetControlsTimer();
            this.$emit("play");
        },

        // 视频暂停事件
        onVideoPause() {
            this.isPlaying = false;
            this.$emit("pause");
        },

        // 视频播放结束事件
        onVideoEnded() {
            this.isPlaying = false;
            this.progress = 100;
            this.currentTime = this.videoDuration;
            this.showControlsOverlay = true;
            this.clearControlsTimer();
            this.$emit("ended");
        },

        // 视频加载元数据事件
        onLoadedMetadata(e) {
            if (e.detail && e.detail.duration) {
                this.videoDuration = e.detail.duration;
            }
            this.$emit("loadedmetadata", e.detail);
        },

        // 视频缓冲进度事件
        onProgress(e) {
            if (e.detail && e.detail.buffered) {
                this.buffered = (e.detail.buffered / this.videoDuration) * 100;
            }
            this.$emit("progress", e.detail);
        },

        // 视频时间更新事件
        onTimeUpdate(e) {
            if (!this.isDragging && e.detail) {
                this.currentTime = e.detail.currentTime;

                if (this.videoDuration > 0) {
                    this.progress = (this.currentTime / this.videoDuration) * 100;
                }

                this.$emit("timeupdate", {
                    currentTime: this.currentTime,
                    duration: this.videoDuration,
                });
            }
        },

        // 全屏状态变化事件
        onFullscreenChange(e) {
            this.isFullscreen = e.detail.fullScreen || e.detail.fullscreen;
            this.$emit("fullscreenchange", this.isFullscreen);
        },

        // 视频加载中事件
        onWaiting() {
            this.isLoading = true;
            this.$emit("waiting");
        },

        // 视频错误事件
        onError(e) {
            this.isLoading = false;
            this.$toast.error("视频加载失败");
            console.error("视频加载失败:", e.detail);
            this.$emit("error", e.detail);
        },

        // 添加触摸事件监听器
        addTouchListeners() {
            // #ifdef H5
            const container = document.querySelector(".fanc-video__container");
            if (container) {
                container.addEventListener("click", this.onContainerClick);
            }
            // #endif
        },

        // 移除触摸事件监听器
        removeTouchListeners() {
            // #ifdef H5
            const container = document.querySelector(".fanc-video__container");
            if (container) {
                container.removeEventListener("click", this.onContainerClick);
            }
            // #endif
        },

        // 容器点击事件处理
        onContainerClick() {
            if (this.disabled) return;

            this.showControlsOverlay = !this.showControlsOverlay;

            if (this.showControlsOverlay) {
                this.resetControlsTimer();
            } else {
                this.clearControlsTimer();
            }
        },

        // 重置控制栏显示计时器
        resetControlsTimer() {
            this.clearControlsTimer();

            if (this.isPlaying) {
                this.controlsTimer = setTimeout(() => {
                    this.showControlsOverlay = false;
                }, 3000);
            }
        },

        // 清除控制栏显示计时器
        clearControlsTimer() {
            if (this.controlsTimer) {
                clearTimeout(this.controlsTimer);
                this.controlsTimer = null;
            }
        },

        // 跳转到指定时间
        seek(time) {
            if (this.videoContext) {
                this.videoContext.seek(time);
            }
        },
    },
};
</script>

<style>
.fanc-video {
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background-color: #000;
}

.fanc-video--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.fanc-video__container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 宽高比 */
}

.fanc-video__player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.fanc-video__poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
}

.fanc-video__poster-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.fanc-video__center-controls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-video__center-play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.fanc-video__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
}

.fanc-video__loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: video-loading-spin 1s infinite linear;
}

@keyframes video-loading-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.fanc-video__controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    z-index: 4;
    opacity: 0;
    transition: opacity 0.3s;
}

.fanc-video__controls--active {
    opacity: 1;
}

.fanc-video__play-btn {
    margin-right: 10px;
    cursor: pointer;
}

.fanc-video__progress-wrap {
    flex: 1;
    display: flex;
    align-items: center;
}

.fanc-video__time {
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
}

.fanc-video__time--current {
    margin-right: 8px;
}

.fanc-video__time--duration {
    margin-left: 8px;
}

.fanc-video__progress-bar {
    flex: 1;
    position: relative;
    height: 4px;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
}

.fanc-video__progress-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 1;
}

.fanc-video__progress-buffer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 2;
}

.fanc-video__progress-inner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--fanc-video-progress-color);
    z-index: 3;
}

.fanc-video__progress-dot {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.fanc-video__progress-dot--dragging {
    transform: translate(-50%, -50%) scale(1.2);
}

.fanc-video__actions {
    display: flex;
    align-items: center;
    margin-left: 16px;
}

.fanc-video__volume-btn,
.fanc-video__pip-btn,
.fanc-video__fullscreen-btn {
    margin-left: 16px;
    cursor: pointer;
}

/* 主题样式 */
.fanc-video--default .fanc-video__progress-inner {
    background-color: var(--fanc-primary-color);
}

.fanc-video--primary .fanc-video__progress-inner {
    background-color: var(--fanc-primary-color);
}

.fanc-video--success .fanc-video__progress-inner {
    background-color: var(--fanc-success-color);
}

.fanc-video--warning .fanc-video__progress-inner {
    background-color: var(--fanc-warning-color);
}

.fanc-video--danger .fanc-video__progress-inner {
    background-color: var(--fanc-danger-color);
}

.fanc-video--info .fanc-video__progress-inner {
    background-color: var(--fanc-info-color);
}
</style>
