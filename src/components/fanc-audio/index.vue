<template>
    <view
        class="fanc-audio"
        :class="{
            'fanc-audio--mini': mini,
            'fanc-audio--playing': isPlaying,
            'fanc-audio--disabled': disabled,
            'fanc-audio--circle-cover': coverShape === 'circle',
        }"
        :style="customColorStyle"
    >
        <!-- 非mini模式 -->
        <view v-if="!mini" class="fanc-audio__container">
            <!-- 非mini模式的主要内容区 -->
            <view class="fanc-audio__main-content">
                <!-- 封面图 -->
                <view v-if="showCover" class="fanc-audio__cover">
                    <image
                        :src="cover || defaultCover"
                        class="fanc-audio__cover-img"
                        :class="{ 'fanc-audio__cover-img--rotating': isPlaying }"
                        mode="aspectFill"
                    />
                    <!-- 播放/暂停按钮覆盖在封面上 -->
                    <view
                        class="fanc-audio__cover-play-btn"
                        :class="{
                            'fanc-audio__cover-play-btn--disabled': disabled,
                        }"
                        @click="togglePlay"
                    >
                        <view class="fanc-audio__cover-play-btn-inner">
                            <fanc-icon
                                :name="isPlaying ? 'pause' : 'play'"
                                size="24"
                                :color="disabled ? 'var(--text-disabled)' : '#ffffff'"
                            />
                        </view>
                    </view>
                </view>

                <!-- 信息区域 -->
                <view class="fanc-audio__info">
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
            </view>

            <!-- 分隔线 -->
            <view class="fanc-audio__divider"></view>

            <!-- 非mini模式下的音量控制区域 -->
            <view v-if="!mini && showVolume" class="fanc-audio__volume-row">
                <view class="fanc-audio__volume-horizontal">
                    <!-- 音量区域的律动动画 -->
                    <view v-if="isPlaying" class="fanc-audio__volume-equalizer">
                        <view
                            class="fanc-audio__volume-equalizer-bar"
                            :style="{ backgroundColor: actualColor }"
                        ></view>
                        <view
                            class="fanc-audio__volume-equalizer-bar"
                            :style="{ backgroundColor: actualColor }"
                        ></view>
                        <view
                            class="fanc-audio__volume-equalizer-bar"
                            :style="{ backgroundColor: actualColor }"
                        ></view>
                    </view>

                    <!-- 占位元素，当没有律动动画时保持空间一致 -->
                    <view v-else class="fanc-audio__volume-placeholder"></view>

                    <view class="fanc-audio__volume-icon" @click="toggleMute">
                        <fanc-icon
                            :name="isMuted ? 'volume-mute' : 'volume-up'"
                            size="18"
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
                            blockSize="14"
                            @change="onVolumeChange"
                        />
                    </view>
                </view>
                <!-- 下载按钮 -->
                <view
                    v-if="showDownload && !disabled"
                    class="fanc-audio__volume-download"
                    @click="onDownload"
                >
                    <fanc-icon name="download" size="18" :color="actualColor" />
                </view>
            </view>
        </view>

        <!-- mini模式 -->
        <view v-if="mini" class="fanc-audio__mini">
            <!-- mini模式下的封面和播放按钮 -->
            <view class="fanc-audio__mini-cover-play">
                <view
                    class="fanc-audio__play-btn"
                    :class="{
                        'fanc-audio__play-btn--disabled': disabled,
                    }"
                    @click="togglePlay"
                >
                    <fanc-icon
                        :name="isPlaying ? 'pause' : 'play'"
                        size="16"
                        :color="disabled ? 'var(--text-disabled)' : actualColor"
                    />
                </view>
            </view>

            <!-- 播放控制区 -->
            <view class="fanc-audio__controls">
                <view class="fanc-audio__mini-title-row">
                    <!-- 迷你模式下的标题 -->
                    <view class="fanc-audio__mini-title">{{ title || "未知音频" }}</view>

                    <!-- 迷你模式下的音律跳动动画 -->
                    <view v-if="isPlaying" class="fanc-audio__mini-equalizer">
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
                    <view v-if="showVolume" class="fanc-audio__mini-volume">
                        <view class="fanc-audio__mini-volume-icon" @click="toggleMute">
                            <fanc-icon
                                :name="isMuted ? 'volume-mute' : 'volume-up'"
                                size="14"
                                :color="actualColor"
                            />
                        </view>
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
            </view>
        </view>
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
        // 封面形状，可选值：square(方形)、circle(圆形)
        coverShape: {
            type: String,
            default: "square",
            validator: (value) => ["square", "circle"].includes(value),
        },
        // 自定义颜色
        color: {
            type: String,
            default: "",
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
            default: 0.3,
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
            audioContext: null,
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
        if (this.audioContext) {
            this.audioContext.destroy();
            this.audioContext = null;
        }
    },
    watch: {
        src(newVal) {
            if (this.audioContext) {
                this.audioContext.destroy();
            }
            this.initAudio();
        },
    },
    methods: {
        // 初始化音频
        initAudio() {
            try {
                // 如果已存在音频上下文，先销毁
                if (this.audioContext) {
                    this.audioContext.destroy();
                }

                this.audioContext = uni.createInnerAudioContext();
                this.audioContext.src = this.src;
                this.audioContext.volume = this.volume;
                this.audioContext.loop = this.loop;
                this.isLoaded = false;

                // 监听事件
                this.audioContext.onCanplay(() => {
                    console.log("音频可以播放");
                    this.isLoaded = true;
                    this.duration = this.audioContext.duration || 0;
                    this.$emit("canplay");
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
                    console.log("音频播放结束");
                    this.isPlaying = false;
                    this.currentTime = 0;
                    this.progress = 0;
                    this.$emit("ended");

                    if (this.loop) {
                        this.play();
                    }
                });

                this.audioContext.onError((err) => {
                    console.error("音频播放错误:", err);
                    this.$emit("error", err);
                });

                this.audioContext.onWaiting(() => {
                    console.log("音频加载中");
                    this.$emit("waiting");
                });

                // 自动播放设置
                if (!this.disabled && this.isPlaying) {
                    this.play();
                }
            } catch (error) {
                console.error("初始化音频失败:", error);
                this.$emit("error", { errMsg: "初始化音频失败", errDetail: error });
            }
        },

        // 播放音频
        play() {
            if (this.disabled) return;

            try {
                // 确保音频上下文存在
                if (!this.audioContext) {
                    this.initAudio();
                }

                this.audioContext.play();
                this.isPlaying = true;
                this.$emit("play");
            } catch (error) {
                console.error("音频播放失败:", error);
                this.$emit("error", { errMsg: "音频播放失败", errDetail: error });
            }
        },

        // 暂停音频
        pause() {
            if (!this.isPlaying) return;

            try {
                if (this.audioContext) {
                    this.audioContext.pause();
                    this.isPlaying = false;
                    this.$emit("pause");
                }
            } catch (error) {
                console.error("音频暂停失败:", error);
                this.isPlaying = false;
            }
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
            try {
                this.isMuted = !this.isMuted;

                if (this.audioContext) {
                    if (this.isMuted) {
                        this.audioContext.volume = 0;
                    } else {
                        this.audioContext.volume = this.volume;
                    }
                }

                this.$emit("mutechange", this.isMuted);
            } catch (error) {
                console.error("切换静音状态失败:", error);
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

            try {
                // 设置音频播放位置
                const newTime = (this.progress / 100) * this.duration;
                this.currentTime = newTime;

                if (this.audioContext) {
                    this.audioContext.seek(newTime);
                }

                // 如果是暂停状态，保持暂停
                if (!this.isPlaying) {
                    this.$emit("timeupdate", {
                        currentTime: this.currentTime,
                        duration: this.duration,
                    });
                }
            } catch (error) {
                console.error("设置播放进度失败:", error);
            } finally {
                this.isDragging = false;
            }
        },

        // 处理音量变化
        onVolumeChange(e) {
            try {
                const value = e.detail.value / 100;
                this.volume = value;
                this.isMuted = value === 0;

                if (this.audioContext) {
                    this.audioContext.volume = value;
                }

                this.$emit("volumechange", value);
            } catch (error) {
                console.error("设置音量失败:", error);
            }
        },

        // 下载音频
        onDownload() {
            if (this.disabled) return;

            try {
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
                                    this.$toast?.success?.("下载成功");
                                },
                                fail: (err) => {
                                    console.error("保存文件失败:", err);
                                    this.$toast?.error?.("保存失败");
                                },
                            });
                        } else {
                            console.error("下载状态码异常:", res.statusCode);
                            this.$toast?.error?.("下载失败");
                        }
                    },
                    fail: (err) => {
                        console.error("下载失败:", err);
                        this.$toast?.error?.("下载失败");
                    },
                });
            } catch (error) {
                console.error("下载操作失败:", error);
                this.$toast?.error?.("下载失败");
            }
        },

        // 音频可以播放事件 - 已由audioContext.onCanplay处理
        onCanPlay() {
            this.isLoaded = true;
        },

        // 音频播放进度更新 - 已由audioContext.onTimeUpdate处理
        onTimeUpdate(e) {
            // 此方法保留用于兼容性，实际逻辑已移至audioContext.onTimeUpdate
        },

        // 音频播放结束 - 已由audioContext.onEnded处理
        onEnded() {
            // 此方法保留用于兼容性，实际逻辑已移至audioContext.onEnded
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-audio {
    position: relative;
    width: 100%;
    border-radius: var(--fanc-audio-border-radius, 12px);
    background-color: var(--fanc-audio-bg-color, #ffffff);
    box-shadow: var(--fanc-audio-box-shadow, 0 4px 12px rgba(0, 0, 0, 0.08));
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: var(--fanc-audio-box-shadow-hover, 0 6px 16px rgba(0, 0, 0, 0.12));
    }

    &--mini {
        padding: 10px 14px;
        align-items: center;
        border-radius: var(--fanc-audio-border-radius, 8px);
    }

    &--disabled {
        opacity: 0.6;
    }

    &--playing {
        .fanc-audio__cover-play-btn {
            opacity: 1;
        }
    }

    /* 非mini模式容器 - 垂直排列 */
    &__container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    /* 非mini模式下的主要内容区 */
    &__main-content {
        display: flex;
        width: 100%;
        align-items: flex-start;
        margin-bottom: 12px;
    }

    /* 分隔线 */
    &__divider {
        height: 1px;
        width: 100%;
        background-color: var(--fanc-audio-divider-color, rgba(0, 0, 0, 0.06));
        margin: 4px 0 12px 0;
    }

    /* 封面样式 */
    &__cover {
        width: 88px;
        height: 88px;
        border-radius: var(--fanc-audio-cover-border-radius, 8px);
        overflow: hidden;
        margin-right: 16px;
        flex-shrink: 0;
        position: relative;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

            .fanc-audio__cover-play-btn {
                opacity: 1;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        &-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;

            &--rotating {
                animation: fanc-audio-rotate 8s linear infinite;
            }
        }

        /* 封面上的播放按钮 */
        &-play-btn {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: var(--fanc-audio-cover-border-radius, 8px);
            opacity: 0;
            transition: opacity 0.3s ease, background-color 0.3s ease;
            cursor: pointer;

            @media (pointer: coarse) {
                opacity: 0.7;
            }

            &--disabled {
                cursor: not-allowed;
            }

            &-inner {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                transition: transform 0.2s ease, background-color 0.2s ease;

                &:hover {
                    transform: scale(1.05);
                    background-color: rgba(0, 0, 0, 0.7);
                }
            }
        }
    }

    /* 信息区域样式 */
    &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 4px;
    }

    &__title-wrap {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
    }

    &__title {
        font-size: var(--fanc-audio-title-font-size, 16px);
        color: var(--fanc-audio-title-color, #333333);
        font-weight: 600;
        margin-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__author {
        font-size: var(--fanc-audio-author-font-size, 13px);
        color: var(--fanc-audio-author-color, #888888);
    }

    /* 进度条样式 */
    &__progress-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    &__time {
        font-size: var(--fanc-audio-time-font-size, 12px);
        color: var(--fanc-audio-time-color, #999999);
        flex-shrink: 0;

        &--current {
            margin-right: 10px;
        }

        &--duration {
            margin-left: 10px;
        }
    }

    &__progress-bar {
        flex: 1;
        height: 4px;
        background-color: var(--fanc-audio-progress-bg-color, #f0f0f0);
        border-radius: 4px;
        position: relative;
        cursor: pointer;
        transition: height 0.2s ease;
        margin: 0 5px;

        &:hover {
            height: 6px;

            .fanc-audio__progress-dot {
                transform: translate(-50%, -50%) scale(1.1);
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
            }
        }
    }

    &__progress-inner {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background-color: var(--fanc-audio-custom-color, var(--fanc-audio-progress-color, #409eff));
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

    &__progress-dot {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--fanc-audio-dot-color, #ffffff);
        border: 2px solid var(--fanc-audio-custom-color, var(--fanc-audio-progress-color, #409eff));
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
        z-index: 1;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &--dragging {
            transform: translate(-50%, -50%) scale(1.2) !important;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.2) !important;
        }
    }

    /* 非mini模式下的音量控制行 */
    &__volume-row {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background-color: var(--fanc-audio-volume-bg-color, rgba(0, 0, 0, 0.02));
        border-radius: 8px;
        margin-top: 4px;
        box-sizing: border-box;
    }

    &__volume-horizontal {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        position: relative;

        &::before {
            content: "";
            display: none; /* 移除音量文本 */
        }
    }

    /* 音量区域的律动动画容器 */
    &__volume-equalizer {
        display: flex;
        align-items: flex-end;
        height: 18px;
        width: 30px;
        margin-right: 12px;
        flex-shrink: 0; /* 防止收缩 */

        &-bar {
            flex: 1;
            background-color: var(
                --fanc-audio-custom-color,
                var(--fanc-audio-progress-color, #409eff)
            );
            margin: 0 1px;
            height: 30%;
            border-radius: 1px;

            &:nth-child(1) {
                animation: fanc-audio-volume-eq-1 0.8s ease-in-out infinite alternate;
            }

            &:nth-child(2) {
                animation: fanc-audio-volume-eq-2 1s ease-in-out infinite alternate;
            }

            &:nth-child(3) {
                animation: fanc-audio-volume-eq-3 0.6s ease-in-out infinite alternate;
            }
        }
    }

    /* 占位元素，保持布局一致 */
    &__volume-placeholder {
        width: 30px;
        margin-right: 12px;
        flex-shrink: 0;
    }

    &__volume-icon {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        margin-right: 10px;
        border-radius: 50%;
        transition: all 0.2s ease;
        background-color: var(--fanc-audio-volume-icon-bg, rgba(0, 0, 0, 0.03));

        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
            transform: scale(1.05);
        }
    }

    &__volume-slider-container {
        display: flex;
        justify-content: center;
        flex: 0 0 auto; /* 不伸缩，保持固定尺寸 */
        position: relative;
        box-sizing: border-box;
        width: 140px; /* 固定宽度 */
        margin-right: 5px;

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: var(--fanc-audio-progress-bg-color, #f0f0f0);
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            border-radius: 2px;
            z-index: 0;
        }
    }

    &__volume-slider {
        width: 100%;
        margin: 0;
        position: relative;
        z-index: 1;
    }

    /* 下载按钮 */
    &__volume-download {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        margin-left: 10px;
        transition: all 0.2s ease;
        background-color: var(--fanc-audio-volume-icon-bg, rgba(0, 0, 0, 0.03));

        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
            transform: scale(1.05);
        }
    }

    /* Mini模式样式 */
    &__mini {
        display: flex;
        width: 100%;
        align-items: center;

        &-cover-play {
            display: flex;
            align-items: center;
            margin-right: 10px;
        }

        &-title-row {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 4px;
        }

        &-title {
            font-size: 14px;
            color: var(--fanc-audio-title-color, #333333);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 8px;
            font-weight: 500;
            flex-shrink: 0;
            flex: 1;
        }

        &-volume {
            display: flex;
            align-items: center;
            position: relative;
            flex-shrink: 0;
            margin-left: 6px;

            &-icon {
                cursor: pointer;
                padding: 4px;
                margin-right: 4px;
                border-radius: 50%;
                transition: background-color 0.2s ease;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }
            }

            &-slider-inline {
                width: 40px;
                margin: 0;
                margin-right: 5px;
            }
        }

        &-download {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: background-color 0.2s ease;

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
        }

        &-equalizer {
            display: flex;
            align-items: flex-end;
            height: 16px;
            width: 30px;
            margin: 0 auto;
            flex-shrink: 0;

            &-bar {
                flex: 1;
                background-color: var(
                    --fanc-audio-custom-color,
                    var(--fanc-audio-progress-color, #409eff)
                );
                margin: 0 1px;
                height: 30%;
                border-radius: 1px;

                &:nth-child(1) {
                    animation: fanc-audio-equalizer-1 0.8s ease-in-out infinite alternate;
                }

                &:nth-child(2) {
                    animation: fanc-audio-equalizer-2 1s ease-in-out infinite alternate;
                }

                &:nth-child(3) {
                    animation: fanc-audio-equalizer-3 0.6s ease-in-out infinite alternate;
                }

                &:nth-child(4) {
                    animation: fanc-audio-equalizer-4 0.9s ease-in-out infinite alternate;
                }

                &:nth-child(5) {
                    animation: fanc-audio-equalizer-5 0.7s ease-in-out infinite alternate;
                }

                &:nth-child(6) {
                    animation: fanc-audio-equalizer-6 1.1s ease-in-out infinite alternate;
                }
            }
        }
    }

    &__controls {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &__play-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--fanc-audio-button-bg-color, rgba(0, 0, 0, 0.05));
        margin-right: 12px;
        cursor: pointer;
        flex-shrink: 0;
        transition: transform 0.2s ease, background-color 0.2s ease;

        &:hover {
            transform: scale(1.05);
            background-color: rgba(0, 0, 0, 0.08);
        }

        &--disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
    }

    /* 圆形封面样式 */
    &--circle-cover {
        .fanc-audio__cover {
            border-radius: 50%;

            &-play-btn {
                border-radius: 50%;
            }
        }
    }
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

/* 音量律动动画 */
@keyframes fanc-audio-volume-eq-1 {
    0% {
        height: 30%;
    }
    100% {
        height: 90%;
    }
}

@keyframes fanc-audio-volume-eq-2 {
    0% {
        height: 20%;
    }
    100% {
        height: 80%;
    }
}

@keyframes fanc-audio-volume-eq-3 {
    0% {
        height: 50%;
    }
    100% {
        height: 100%;
    }
}

/* 音律跳动动画 */
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

/* 兼容小程序 */
slider {
    margin: 0;
}

/* mini模式下的特定修改 */
.fanc-audio--mini .fanc-audio__play-btn {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.fanc-audio--mini .fanc-audio__controls {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
