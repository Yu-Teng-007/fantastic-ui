<template>
    <view class="container">
        <view class="header">
            <view class="title">音频播放器</view>
            <view class="subtitle">用于音频文件的播放控制和展示，提供多种样式和功能</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                ></fanc-audio>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#1976d2"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#4caf50"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#ff9800"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#f44336"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#2196f3"
                    class="example-item"
                ></fanc-audio>
            </view>
            <view class="tip">使用color属性可以自定义播放器的主题颜色</view>
        </view>

        <!-- 迷你模式 -->
        <view class="section">
            <view class="section-title">迷你模式</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    mini
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#1976d2"
                    mini
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 无封面 -->
        <view class="section">
            <view class="section-title">无封面</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    :showCover="false"
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 显示下载按钮 -->
        <view class="section">
            <view class="section-title">显示下载按钮</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#1976d2"
                    mini
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>
            </view>
            <view class="tip">下载按钮会显示在播放器右上角，以角标形式呈现</view>
        </view>

        <!-- 不同颜色的下载按钮 -->
        <view class="section">
            <view class="section-title">不同颜色的下载按钮</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#4caf50"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#ff9800"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#f44336"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    color="#8e44ad"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>
            </view>
            <view class="tip">下载按钮的颜色会跟随播放器的自定义颜色</view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    disabled
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 循环播放 -->
        <view class="section">
            <view class="section-title">循环播放</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    :loop="true"
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 圆形封面 -->
        <view class="section">
            <view class="section-title">圆形封面</view>
            <view class="example-block">
                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    coverShape="circle"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    coverShape="circle"
                    color="#9c27b0"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    coverShape="circle"
                    mini
                    color="#3f51b5"
                    class="example-item"
                ></fanc-audio>
            </view>
            <view class="tip">设置coverShape="circle"可以使封面显示为圆形</view>
        </view>

        <!-- 自定义事件 -->
        <view class="section">
            <view class="section-title">自定义事件</view>
            <view class="example-block">
                <fanc-audio
                    ref="eventAudio"
                    :src="audioSrc"
                    :title="audioTitle"
                    :author="audioAuthor"
                    :cover="audioCover"
                    class="example-item"
                    @play="onPlay"
                    @pause="onPause"
                    @ended="onEnded"
                    @timeupdate="onTimeUpdate"
                    @volumechange="onVolumeChange"
                    @error="onError"
                ></fanc-audio>
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
            audioSrc:
                "https://wx.music.tc.qq.com/M80000140o6q3Jvfzr.mp3?fromtag=8&guid=ilingku&src=M800004Yi5BD3ksoAN.mp3&trace=4b5427ab69326485&uin=8200895&vkey=4DB2B90411E526DF0BB7FBD4390F23E96879D9EC3946E2317678E6E8FD39D1F8C340BB99480593A8480C515E8FF71CC0FC1FD17E8EFA7C48__v21e2a1733",
            audioCover: "https://imge.kugou.com/stdmusic/120/20220705/20220705143006989099.jpg",
            audioTitle: "蒲公英的约定",
            audioAuthor: "周杰伦",
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
            // 只记录每秒一次，减少日志数量
            if (data && data.currentTime && Math.floor(data.currentTime) % 5 === 0) {
                this.logEvent("时间更新", data);
            }
        },

        onVolumeChange(volume) {
            this.logEvent("音量变化", `音量: ${Math.floor(volume * 100)}%`);
        },

        // 处理错误事件
        onError(err) {
            this.logEvent("音频加载错误", err);
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    margin-bottom: 24px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
}

.section {
    margin-bottom: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
}

.example-block {
    padding: 16px;
}

.example-item {
    margin-bottom: 16px;
}

.example-item:last-child {
    margin-bottom: 0;
}

.tip {
    font-size: 12px;
    color: #969799;
    padding: 0 16px;
    margin-top: -8px;
    margin-bottom: 8px;
}

.event-log {
    margin-top: 16px;
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 12px;
}

.event-log-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
}

.event-log-content {
    height: 150px;
}

.event-log-item {
    font-size: 12px;
    color: #666;
    padding: 4px 0;
    border-bottom: 1px dashed #eee;
}

.event-log-item:last-child {
    border-bottom: none;
}
</style>
