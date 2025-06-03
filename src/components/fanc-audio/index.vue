<template>
    <view
        class="fanc-audio"
        :class="[
            `fanc-audio--${type}`,
            {
                'fanc-audio--mini': mini,
                'fanc-audio--playing': isPlaying,
                'fanc-audio--disabled': disabled,
            },
        ]"
    >
        <!-- 封面图 -->
        <view v-if="showCover && !mini" class="fanc-audio__cover">
            <image
                :src="cover || defaultCover"
                class="fanc-audio__cover-img"
                :class="{ 'fanc-audio__cover-img--rotating': isPlaying }"
                mode="aspectFill"
            />
        </view>

        <!-- 播放控制区 -->
        <view class="fanc-audio__controls">
            <!-- 播放/暂停按钮 -->
            <view
                class="fanc-audio__play-btn"
                :class="{ 'fanc-audio__play-btn--disabled': disabled }"
                @click="togglePlay"
            >
                <fanc-icon
                    :name="isPlaying ? 'pause' : 'play'"
                    :size="mini ? 16 : 24"
                    :color="disabled ? 'var(--text-disabled)' : buttonColor"
                />
            </view>

            <!-- 信息区域 -->
            <view class="fanc-audio__info" v-if="!mini">
                <!-- 标题和作者 -->
                <view class="fanc-audio__title-wrap">
                    <text class="fanc-audio__title">{{ title || "未知音频" }}</text>
                    <text v-if="author" class="fanc-audio__author">{{ author }}</text>
                </view>

                <!-- 进度条和时间 -->
                <view class="fanc-audio__progress-wrap">
                    <view class="fanc-audio__time fanc-audio__time--current">{{
                        formatTime(currentTime)
                    }}</view>
                    <view class="fanc-audio__progress-bar">
                        <view class="fanc-audio__progress-bg"></view>
                        <view
                            class="fanc-audio__progress-inner"
                            :style="{ width: `${progress}%` }"
                        ></view>
                        <view
                            class="fanc-audio__progress-dot"
                            :class="{ 'fanc-audio__progress-dot--dragging': isDragging }"
                            :style="{ left: `${progress}%` }"
                            @touchstart="onTouchStart"
                            @touchmove="onTouchMove"
                            @touchend="onTouchEnd"
                        ></view>
                    </view>
                    <view class="fanc-audio__time fanc-audio__time--duration">{{
                        formatTime(duration)
                    }}</view>
                </view>
            </view>

            <!-- 迷你模式下的标题 -->
            <view v-if="mini" class="fanc-audio__mini-title">{{ title || "未知音频" }}</view>

            <!-- 额外操作区 -->
            <view class="fanc-audio__actions" v-if="!mini">
                <!-- 音量控制 -->
                <view v-if="showVolume" class="fanc-audio__volume">
                    <fanc-icon name="volume-up" size="16" :color="buttonColor" />
                    <slider
                        class="fanc-audio__volume-slider"
                        :value="volume * 100"
                        min="0"
                        max="100"
                        activeColor="var(--fanc-audio-progress-color)"
                        backgroundColor="var(--fanc-audio-progress-bg-color)"
                        blockSize="12"
                        @change="onVolumeChange"
                    />
                </view>

                <!-- 下载按钮 -->
                <view v-if="showDownload" class="fanc-audio__download" @click="onDownload">
                    <fanc-icon name="download" size="16" :color="buttonColor" />
                </view>
            </view>
        </view>

        <!-- 实际的音频元素 -->
        <audio
            :src="src"
            id="fancAudio"
            ref="audioEl"
            @timeupdate="onTimeUpdate"
            @ended="onEnded"
            @canplay="onCanPlay"
            @error="onError"
            @waiting="onWaiting"
        ></audio>
    </view>
</template>

<script>
export default {
    name: "FancAudio",
    props: {
        // 音频源
        src: {
            type: String,
            required: true,
        },
        // 标题
        title: {
            type: String,
            default: "",
        },
        // 作者
        author: {
            type: String,
            default: "",
        },
        // 封面图片
        cover: {
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
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false,
        },
        // 迷你模式
        mini: {
            type: Boolean,
            default: false,
        },
        // 是否显示封面
        showCover: {
            type: Boolean,
            default: true,
        },
        // 是否显示音量控制
        showVolume: {
            type: Boolean,
            default: true,
        },
        // 是否显示下载按钮
        showDownload: {
            type: Boolean,
            default: false,
        },
        // 初始音量 0-1
        defaultVolume: {
            type: Number,
            default: 1,
            validator: (value) => value >= 0 && value <= 1,
        },
        // 循环播放
        loop: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isPlaying: false,
            duration: 0,
            currentTime: 0,
            progress: 0,
            volume: this.defaultVolume,
            isDragging: false,
            isLoaded: false,
            defaultCover:
                "data:image/svg+xml;base64,PHN2ZyB0PSIxNjg4NDgwMTQxOTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzNDYiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTEyIDEwMjRDMjI5LjI0OCAxMDI0IDAgNzk0Ljc1MiAwIDUxMlMyMjkuMjQ4IDAgNTEyIDBzNTEyIDIyOS4yNDggNTEyIDUxMi0yMjkuMjQ4IDUxMi01MTIgNTEyek01MTIgNjRDMjY0LjU3NiA2NCA2NCAyNjQuNTc2IDY0IDUxMnMyMDAuNTc2IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuNTc2IDQ0OC00NDhTNzU5LjQyNCA2NCA1MTIgNjR6IiBmaWxsPSIjODg4ODg4IiBwLWlkPSIzMzQ3Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA3MzZjLTEyMy41MiAwLTIyNC0xMDAuNDgtMjI0LTIyNHMxMDAuNDgtMjI0IDIyNC0yMjQgMjI0IDEwMC40OCAyMjQgMjI0LTEwMC40OCAyMjQtMjI0IDIyNHogbTAtMzg0Yy04OC4yMjQgMC0xNjAgNzEuNzc2LTE2MCAxNjBzNzEuNzc2IDE2MCAxNjAgMTYwIDE2MC03MS43NzYgMTYwLTE2MC03MS43NzYtMTYwLTE2MC0xNjB6IiBmaWxsPSIjODg4ODg4IiBwLWlkPSIzMzQ4Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA1MTJtLTk2IDBhOTYgOTYgMCAxIDAgMTkyIDAgOTYgOTYgMCAxIDAtMTkyIDBaIiBmaWxsPSIjODg4ODg4IiBwLWlkPSIzMzQ5Ij48L3BhdGg+PC9zdmc+",
        };
    },
    computed: {
        buttonColor() {
            switch (this.type) {
                case "primary":
                    return "var(--fanc-primary-color)";
                case "success":
                    return "var(--fanc-success-color)";
                case "warning":
                    return "var(--fanc-warning-color)";
                case "danger":
                    return "var(--fanc-danger-color)";
                case "info":
                    return "var(--fanc-info-color)";
                default:
                    return "var(--text-primary)";
            }
        },
    },
    mounted() {
        this.initAudio();
    },
    beforeDestroy() {
        this.pause();
    },
    methods: {
        // 初始化音频
        initAudio() {
            this.audioContext = uni.createInnerAudioContext();
            this.audioContext.src = this.src;
            this.audioContext.volume = this.volume;
            this.audioContext.loop = this.loop;

            // 监听事件
            this.audioContext.onCanplay(() => {
                this.isLoaded = true;
                this.duration = this.audioContext.duration || 0;
                this.$emit("canplay");

                if (this.autoplay && !this.disabled) {
                    this.play();
                }
            });

            this.audioContext.onTimeUpdate(() => {
                if (!this.isDragging) {
                    this.currentTime = this.audioContext.currentTime || 0;
                    this.progress =
                        this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
                    this.$emit("timeupdate", {
                        currentTime: this.currentTime,
                        duration: this.duration,
                    });
                }
            });

            this.audioContext.onEnded(() => {
                this.isPlaying = false;
                this.currentTime = 0;
                this.progress = 0;
                this.$emit("ended");

                if (this.loop) {
                    this.play();
                }
            });

            this.audioContext.onError((err) => {
                this.$toast.error("音频加载失败");
                this.$emit("error", err);
            });

            this.audioContext.onWaiting(() => {
                this.$emit("waiting");
            });
        },

        // 播放音频
        play() {
            if (this.disabled || !this.isLoaded) return;
            this.audioContext.play();
            this.isPlaying = true;
            this.$emit("play");
        },

        // 暂停音频
        pause() {
            if (!this.isPlaying) return;
            this.audioContext.pause();
            this.isPlaying = false;
            this.$emit("pause");
        },

        // 切换播放/暂停
        togglePlay() {
            if (this.disabled) return;
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        },

        // 格式化时间
        formatTime(seconds) {
            if (isNaN(seconds)) return "00:00";
            seconds = Math.floor(seconds);
            const minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        },

        // 处理进度条拖动开始
        onTouchStart(e) {
            if (this.disabled) return;
            this.isDragging = true;
        },

        // 处理进度条拖动中
        onTouchMove(e) {
            if (!this.isDragging || this.disabled) return;

            // 获取进度条宽度和位置
            const progressBar = e.currentTarget.parentNode;
            const rect = progressBar.getBoundingClientRect();
            const offsetX = e.touches[0].clientX - rect.left;
            const width = rect.width;

            // 计算百分比
            let percent = Math.max(0, Math.min(100, (offsetX / width) * 100));
            this.progress = percent;
        },

        // 处理进度条拖动结束
        onTouchEnd() {
            if (!this.isDragging || this.disabled) return;

            // 设置音频播放位置
            const newTime = (this.progress / 100) * this.duration;
            this.currentTime = newTime;
            this.audioContext.seek(newTime);

            this.isDragging = false;

            // 如果是暂停状态，保持暂停
            if (!this.isPlaying) {
                this.$emit("timeupdate", {
                    currentTime: this.currentTime,
                    duration: this.duration,
                });
            }
        },

        // 处理音量变化
        onVolumeChange(e) {
            const value = e.detail.value / 100;
            this.volume = value;
            if (this.audioContext) {
                this.audioContext.volume = value;
            }
            this.$emit("volumechange", value);
        },

        // 下载音频
        onDownload() {
            if (this.disabled) return;
            this.$emit("download", this.src);

            // 在小程序和APP中可以直接调用下载API
            // 这里简单实现，实际使用时需要根据平台差异调整
            uni.downloadFile({
                url: this.src,
                success: (res) => {
                    if (res.statusCode === 200) {
                        // 保存文件
                        uni.saveFile({
                            tempFilePath: res.tempFilePath,
                            success: (result) => {
                                this.$toast.success("下载成功");
                            },
                            fail: () => {
                                this.$toast.error("保存失败");
                            },
                        });
                    } else {
                        this.$toast.error("下载失败");
                    }
                },
                fail: () => {
                    this.$toast.error("下载失败");
                },
            });
        },

        // 音频可以播放事件
        onCanPlay() {
            this.isLoaded = true;
        },

        // 音频播放进度更新
        onTimeUpdate(e) {
            if (!this.isDragging) {
                // 在某些平台上可能需要通过事件获取当前时间
                if (e && e.detail && typeof e.detail.currentTime !== "undefined") {
                    this.currentTime = e.detail.currentTime;
                    this.duration = e.detail.duration || this.duration;
                }

                this.progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
            }
        },

        // 音频播放结束
        onEnded() {
            this.isPlaying = false;
            this.currentTime = 0;
            this.progress = 0;
        },

        // 音频加载错误
        onError() {
            this.$toast.error("音频加载失败");
        },

        // 音频加载中
        onWaiting() {
            // 可以在这里显示加载状态
        },
    },
};
</script>

<style>
.fanc-audio {
    position: relative;
    width: 100%;
    border-radius: var(--fanc-audio-border-radius);
    background-color: var(--fanc-audio-bg-color);
    box-shadow: var(--fanc-audio-box-shadow);
    overflow: hidden;
    display: flex;
    padding: 16px;
}

.fanc-audio--mini {
    padding: 8px 12px;
    align-items: center;
}

.fanc-audio--disabled {
    opacity: 0.6;
}

.fanc-audio__cover {
    width: 60px;
    height: 60px;
    border-radius: var(--fanc-audio-cover-border-radius);
    overflow: hidden;
    margin-right: 12px;
    flex-shrink: 0;
}

.fanc-audio__cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.fanc-audio__cover-img--rotating {
    animation: fanc-audio-rotate 8s linear infinite;
}

.fanc-audio__controls {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.fanc-audio--mini .fanc-audio__controls {
    flex-direction: row;
}

.fanc-audio__play-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--fanc-audio-button-bg-color);
    margin-right: 12px;
    cursor: pointer;
    flex-shrink: 0;
}

.fanc-audio--mini .fanc-audio__play-btn {
    width: 28px;
    height: 28px;
}

.fanc-audio__play-btn--disabled {
    cursor: not-allowed;
}

.fanc-audio__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.fanc-audio__title-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
}

.fanc-audio__title {
    font-size: var(--fanc-audio-title-font-size);
    color: var(--fanc-audio-title-color);
    font-weight: bold;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.fanc-audio__author {
    font-size: var(--fanc-audio-author-font-size);
    color: var(--fanc-audio-author-color);
}

.fanc-audio__mini-title {
    font-size: 14px;
    color: var(--fanc-audio-title-color);
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
}

.fanc-audio__progress-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.fanc-audio__time {
    font-size: var(--fanc-audio-time-font-size);
    color: var(--fanc-audio-time-color);
    flex-shrink: 0;
}

.fanc-audio__time--current {
    margin-right: 8px;
}

.fanc-audio__time--duration {
    margin-left: 8px;
}

.fanc-audio__progress-bar {
    flex: 1;
    height: 4px;
    background-color: var(--fanc-audio-progress-bg-color);
    border-radius: 2px;
    position: relative;
}

.fanc-audio__progress-inner {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background-color: var(--fanc-audio-progress-color);
    border-radius: 2px;
}

.fanc-audio__progress-dot {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--fanc-audio-dot-color);
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.fanc-audio__progress-dot--dragging {
    transform: translate(-50%, -50%) scale(1.2);
}

.fanc-audio__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
    flex-shrink: 0;
}

.fanc-audio__volume {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 16px;
}

.fanc-audio__volume-slider {
    width: 80px;
    margin: 0 8px;
}

.fanc-audio__download {
    cursor: pointer;
}

/* 音频组件的主题色定义 */
.fanc-audio--primary .fanc-audio__play-btn {
    background-color: var(--fanc-primary-color);
}

.fanc-audio--success .fanc-audio__play-btn {
    background-color: var(--fanc-success-color);
}

.fanc-audio--warning .fanc-audio__play-btn {
    background-color: var(--fanc-warning-color);
}

.fanc-audio--danger .fanc-audio__play-btn {
    background-color: var(--fanc-danger-color);
}

.fanc-audio--info .fanc-audio__play-btn {
    background-color: var(--fanc-info-color);
}

/* 旋转动画 */
@keyframes fanc-audio-rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 兼容小程序 */
slider {
    margin: 0;
}
</style>
