<template>
    <view class="container">
        <view class="header">
            <view class="title">视频播放器</view>
            <view class="subtitle">用于视频文件的播放控制和展示，提供多种功能</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="example-block">
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                ></fanc-video>
            </view>
        </view>

        <!-- 不同填充模式 -->
        <view class="section">
            <view class="section-title">不同填充模式</view>
            <view class="example-block">
                <view class="fill-mode-title">填充模式：contain（包含，保持比例）</view>
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg"
                    object-fit="contain"
                    class="example-item"
                ></fanc-video>

                <view class="fill-mode-title">填充模式：cover（覆盖，可能裁剪）</view>
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg"
                    object-fit="cover"
                    class="example-item"
                ></fanc-video>

                <view class="fill-mode-title">填充模式：fill（拉伸填充）</view>
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg"
                    object-fit="fill"
                    class="example-item"
                ></fanc-video>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="example-block">
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg"
                    disabled
                    class="example-item"
                ></fanc-video>
            </view>
        </view>

        <!-- 自动播放 -->
        <view class="section">
            <view class="section-title">自动播放</view>
            <view class="tip">注意：由于浏览器政策限制，自动播放可能会被阻止。</view>
            <view class="example-block">
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg"
                    :autoplay="true"
                    :muted="true"
                    class="example-item"
                ></fanc-video>
            </view>
        </view>

        <!-- 循环播放 -->
        <view class="section">
            <view class="section-title">循环播放</view>
            <view class="example-block">
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"
                    :loop="true"
                    class="example-item"
                ></fanc-video>
            </view>
        </view>

        <!-- 初始静音 -->
        <view class="section">
            <view class="section-title">初始静音</view>
            <view class="example-block">
                <fanc-video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg"
                    :muted="true"
                    class="example-item"
                ></fanc-video>
            </view>
        </view>

        <!-- 自定义事件 -->
        <view class="section">
            <view class="section-title">自定义事件</view>
            <view class="example-block">
                <fanc-video
                    ref="eventVideo"
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
                    poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg"
                    class="example-item"
                    @play="onPlay"
                    @pause="onPause"
                    @ended="onEnded"
                    @timeupdate="onTimeUpdate"
                    @loadedmetadata="onLoadedMetadata"
                    @fullscreenchange="onFullscreenChange"
                ></fanc-video>
                <view class="event-log">
                    <view class="event-log-title">事件日志：</view>
                    <scroll-view scroll-y class="event-log-content">
                        <view v-for="(log, index) in eventLogs" :key="index" class="event-log-item">
                            {{ log }}
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            eventLogs: [],
        };
    },
    methods: {
        // 记录事件日志
        logEvent(event, data) {
            const time = new Date().toLocaleTimeString();
            let message = `[${time}] ${event}`;

            if (data) {
                if (typeof data === "object") {
                    if (data.currentTime) {
                        message += ` - 当前时间: ${this.formatTime(data.currentTime)}`;
                    }
                    if (data.duration) {
                        message += `, 总时长: ${this.formatTime(data.duration)}`;
                    }
                } else {
                    message += ` - ${data}`;
                }
            }

            this.eventLogs.unshift(message);

            // 限制日志数量
            if (this.eventLogs.length > 10) {
                this.eventLogs.pop();
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

        // 事件处理
        onPlay() {
            this.logEvent("播放开始");
        },

        onPause() {
            this.logEvent("播放暂停");
        },

        onEnded() {
            this.logEvent("播放结束");
        },

        onTimeUpdate(data) {
            // 只记录整秒的时间更新，避免日志过多
            if (Math.floor(data.currentTime) !== Math.floor(this.lastTimeUpdate)) {
                this.logEvent("时间更新", data);
                this.lastTimeUpdate = data.currentTime;
            }
        },

        onLoadedMetadata(data) {
            this.logEvent("元数据加载完成", `视频时长: ${this.formatTime(data.duration)}`);
        },

        onFullscreenChange(isFullscreen) {
            this.logEvent("全屏状态变化", isFullscreen ? "进入全屏" : "退出全屏");
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.header {
    margin-bottom: 30px;
}

.title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}

.section {
    margin-bottom: 30px;
}

.section-title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 16px;
    position: relative;
    padding-left: 12px;
}

.section-title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 4px;
    height: 16px;
    width: 4px;
    background-color: #007bff;
    border-radius: 2px;
}

.example-block {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.example-item {
    margin-bottom: 20px;
}

.example-item:last-child {
    margin-bottom: 0;
}

.tip {
    font-size: 14px;
    color: #ff9800;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.tip::before {
    content: "!";
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background-color: #ff9800;
    color: white;
    border-radius: 50%;
    margin-right: 6px;
    font-weight: bold;
    font-size: 12px;
}

.fill-mode-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    margin-top: 16px;
}

.fill-mode-title:first-child {
    margin-top: 0;
}

.event-log {
    margin-top: 16px;
    border-top: 1px solid #eee;
    padding-top: 16px;
}

.event-log-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
}

.event-log-content {
    height: 200px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 8px;
    font-family: monospace;
    font-size: 12px;
    background-color: #f8f9fa;
}

.event-log-item {
    padding: 4px 0;
    border-bottom: 1px dashed #eee;
}

.event-log-item:last-child {
    border-bottom: none;
}
</style>
