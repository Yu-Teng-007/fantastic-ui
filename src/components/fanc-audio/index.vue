<template>
    <view
        class="fanc-audio"
        :class="{
            'fanc-audio--mini': mini,
            'fanc-audio--playing': isPlaying,
            'fanc-audio--disabled': disabled,
        }"
        :style="customColorStyle"
    >
        <!-- 下载按钮角标 (非迷你模式) -->
        <view
            v-if="showDownload && !disabled && !mini"
            class="fanc-audio__download-triangle"
            @click="onDownload"
        >
            <fanc-icon name="download" size="10" color="#ffffff" />
        </view>
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
                :class="{
                    'fanc-audio__play-btn--disabled': disabled,
                    'fanc-audio__play-btn--rotating': isPlaying && !mini,
                }"
                @click="togglePlay"
            >
                <fanc-icon
                    :name="isPlaying ? 'pause' : 'play'"
                    :size="mini ? 16 : 24"
                    :color="disabled ? 'var(--text-disabled)' : actualColor"
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

            <!-- 迷你模式下的音律跳动动画 -->
            <view v-if="mini && isPlaying" class="fanc-audio__mini-equalizer">
                <view
                    class="fanc-audio__mini-equalizer-bar"
                    :style="{ backgroundColor: actualColor }"
                ></view>
                <view
                    class="fanc-audio__mini-equalizer-bar"
                    :style="{ backgroundColor: actualColor }"
                ></view>
                <view
                    class="fanc-audio__mini-equalizer-bar"
                    :style="{ backgroundColor: actualColor }"
                ></view>
                <view
                    class="fanc-audio__mini-equalizer-bar"
                    :style="{ backgroundColor: actualColor }"
                ></view>
                <view
                    class="fanc-audio__mini-equalizer-bar"
                    :style="{ backgroundColor: actualColor }"
                ></view>
                <view
                    class="fanc-audio__mini-equalizer-bar"
                    :style="{ backgroundColor: actualColor }"
                ></view>
            </view>

            <!-- 迷你模式下的音量控制和下载按钮 -->
            <view v-if="mini" class="fanc-audio__mini-controls">
                <view v-if="showVolume" class="fanc-audio__mini-volume">
                    <slider
                        class="fanc-audio__mini-volume-slider-inline"
                        :value="volume * 100"
                        min="0"
                        max="100"
                        :activeColor="actualColor"
                        backgroundColor="var(--fanc-audio-progress-bg-color)"
                        blockSize="10"
                        @change="onVolumeChange"
                    />
                    <view class="fanc-audio__mini-volume-icon" @click="toggleMute">
                        <fanc-icon
                            :name="isMuted ? 'volume-mute' : 'volume-up'"
                            size="14"
                            :color="actualColor"
                        />
                    </view>
                </view>
                <!-- 迷你模式下的下载按钮 -->
                <view
                    v-if="showDownload && !disabled"
                    class="fanc-audio__mini-download"
                    @click="onDownload"
                >
                    <fanc-icon name="download" size="14" :color="actualColor" />
                </view>
            </view>

            <!-- 额外操作区 -->
            <view class="fanc-audio__actions" v-if="!mini">
                <!-- 音量控制 -->
                <view v-if="showVolume" class="fanc-audio__volume">
                    <view class="fanc-audio__volume-icon" @click="toggleMute">
                        <fanc-icon
                            :name="isMuted ? 'volume-mute' : 'volume-up'"
                            size="16"
                            :color="actualColor"
                        />
                    </view>
                    <view class="fanc-audio__volume-slider-container">
                        <slider
                            class="fanc-audio__volume-slider"
                            :value="volume * 100"
                            min="0"
                            max="100"
                            :activeColor="actualColor"
                            backgroundColor="var(--fanc-audio-progress-bg-color)"
                            blockSize="12"
                            @change="onVolumeChange"
                        />
                    </view>
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

        // 自定义颜色
        color: {
            type: String,
            default: "",
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
            isMuted: false,
            defaultCover:
                "data:image/svg+xml;base64,PHN2ZyB0PSIxNjg4NDgwMTQxOTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzNDYiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTEyIDEwMjRDMjI5LjI0OCAxMDI0IDAgNzk0Ljc1MiAwIDUxMlMyMjkuMjQ4IDAgNTEyIDBzNTEyIDIyOS4yNDggNTEyIDUxMi0yMjkuMjQ4IDUxMi01MTIgNTEyek01MTIgNjRDMjY0LjU3NiA2NCA2NCAyNjQuNTc2IDY0IDUxMnMyMDAuNTc2IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuNTc2IDQ0OC00NDhTNzU5LjQyNCA2NCA1MTIgNjR6IiBmaWxsPSIjODg4ODg4IiBwLWlkPSIzMzQ3Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA3MzZjLTEyMy41MiAwLTIyNC0xMDAuNDgtMjI0LTIyNHMxMDAuNDgtMjI0IDIyNC0yMjQgMjI0IDEwMC40OCAyMjQgMjI0LTEwMC40OCAyMjQtMjI0IDIyNHogbTAtMzg0Yy04OC4yMjQgMC0xNjAgNzEuNzc2LTE2MCAxNjBzNzEuNzc2IDE2MCAxNjAgMTYwIDE2MC03MS43NzYgMTYwLTE2MC03MS43NzYtMTYwLTE2MC0xNjB6IiBmaWxsPSIjODg4ODg4IiBwLWlkPSIzMzQ4Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA1MTJtLTk2IDBhOTYgOTYgMCAxIDAgMTkyIDAgOTYgOTYgMCAxIDAtMTkyIDBaIiBmaWxsPSIjODg4ODg4IiBwLWlkPSIzMzQ5Ij48L3BhdGg+PC9zdmc+",
        };
    },
    computed: {
        // 获取实际使用的颜色
        actualColor() {
            if (this.color) {
                return this.color;
            }
            return "var(--fanc-primary-color)";
        },

        // 自定义颜色样式
        customColorStyle() {
            if (!this.color) return {};

            return {
                "--fanc-audio-custom-color": this.color,
            };
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

        // 切换静音状态
        toggleMute() {
            this.isMuted = !this.isMuted;

            if (this.audioContext) {
                if (this.isMuted) {
                    this.audioContext.volume = 0;
                } else {
                    this.audioContext.volume = this.volume;
                }
            }

            this.$emit("mutechange", this.isMuted);
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
            this.isMuted = value === 0;

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
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
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
    transition: transform 0.3s ease;
}

.fanc-audio__play-btn--rotating {
    animation: fanc-audio-play-btn-rotate 3s linear infinite;
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
    background-color: var(--fanc-audio-custom-color, var(--fanc-audio-progress-color));
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
    align-items: flex-start;
    margin-left: 16px;
    flex-shrink: 0;
}

.fanc-audio__volume {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
}

.fanc-audio__volume-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-bottom: 4px;
}

.fanc-audio__volume-slider-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.fanc-audio__volume-slider {
    width: 80px;
    margin: 0;
}

.fanc-audio__download-triangle {
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: var(--fanc-audio-border-radius);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 28px 28px 0;
    border-color: transparent var(--fanc-audio-custom-color, var(--fanc-primary-color)) transparent
        transparent;
    cursor: pointer;
    z-index: 10;
    transition: opacity 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-audio__download-triangle::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 3px 3px 0 0;
}

.fanc-audio__download-triangle .fanc-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    transform: rotate(-45deg);
}

.fanc-audio__download-triangle:hover {
    opacity: 0.9;
}

/* 迷你模式下的音量控制 */
.fanc-audio__mini-controls {
    display: flex;
    align-items: center;
    position: relative;
}

.fanc-audio__mini-volume {
    display: flex;
    align-items: center;
    margin-right: 8px;
    position: relative;
}

.fanc-audio__mini-volume-icon {
    cursor: pointer;
    padding: 4px;
    margin-left: 4px;
}

.fanc-audio__mini-volume-slider-inline {
    width: 60px;
    margin: 0;
    margin-right: 10px;
}

.fanc-audio__mini-download {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px;
    margin-left: 4px;
}

/* 迷你模式下的音律跳动动画 */
.fanc-audio__mini-equalizer {
    display: flex;
    align-items: flex-end;
    height: 16px;
    width: 30px;
    margin-right: 8px;
}

.fanc-audio__mini-equalizer-bar {
    flex: 1;
    background-color: var(--fanc-audio-custom-color, var(--fanc-audio-progress-color));
    margin: 0 1px;
    height: 30%;
    border-radius: 1px;
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

@keyframes fanc-audio-play-btn-rotate {
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

.fanc-audio__mini-equalizer-bar:nth-child(1) {
    animation: fanc-audio-equalizer-1 0.8s ease-in-out infinite alternate;
}

.fanc-audio__mini-equalizer-bar:nth-child(2) {
    animation: fanc-audio-equalizer-2 1s ease-in-out infinite alternate;
}

.fanc-audio__mini-equalizer-bar:nth-child(3) {
    animation: fanc-audio-equalizer-3 0.6s ease-in-out infinite alternate;
}

.fanc-audio__mini-equalizer-bar:nth-child(4) {
    animation: fanc-audio-equalizer-4 0.9s ease-in-out infinite alternate;
}

.fanc-audio__mini-equalizer-bar:nth-child(5) {
    animation: fanc-audio-equalizer-5 0.7s ease-in-out infinite alternate;
}

.fanc-audio__mini-equalizer-bar:nth-child(6) {
    animation: fanc-audio-equalizer-6 1.1s ease-in-out infinite alternate;
}

@keyframes fanc-audio-equalizer-1 {
    0% {
        height: 30%;
    }
    100% {
        height: 90%;
    }
}

@keyframes fanc-audio-equalizer-2 {
    0% {
        height: 20%;
    }
    100% {
        height: 80%;
    }
}

@keyframes fanc-audio-equalizer-3 {
    0% {
        height: 50%;
    }
    100% {
        height: 100%;
    }
}

@keyframes fanc-audio-equalizer-4 {
    0% {
        height: 10%;
    }
    100% {
        height: 70%;
    }
}

@keyframes fanc-audio-equalizer-5 {
    0% {
        height: 40%;
    }
    100% {
        height: 95%;
    }
}

@keyframes fanc-audio-equalizer-6 {
    0% {
        height: 25%;
    }
    100% {
        height: 85%;
    }
}

/* 使用自定义颜色 */
.fanc-audio .fanc-audio__progress-inner {
    background-color: var(--fanc-audio-custom-color, var(--fanc-audio-progress-color));
}
</style>
