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
                    src="https://music.163.com/song/media/outer/url?id=447925558.mp3"
                    title="梦想家"
                    author="白举纲"
                    cover="https://p2.music.126.net/QHw-RuMwfQkmgtiyRpOtdg==/18264758718898447.jpg"
                ></fanc-audio>
            </view>
        </view>

        <!-- 不同主题 -->
        <view class="section">
            <view class="section-title">不同主题</view>
            <view class="example-block">
                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=28012031.mp3"
                    title="Time"
                    author="Hans Zimmer"
                    cover="https://p2.music.126.net/wW-sSvvrKfYMNO5HQxQ8GA==/8898348765273307.jpg"
                    type="primary"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=5057892.mp3"
                    title="Summer"
                    author="Joe Hisaishi"
                    cover="https://p1.music.126.net/ViuPiT1ZjLdencbF0ktTfw==/7957165652256243.jpg"
                    type="success"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=26664345.mp3"
                    title="Moon River"
                    author="Audrey Hepburn"
                    cover="https://p2.music.126.net/9WvMFDLm7u4OF7iYQsJIjw==/109951165633862464.jpg"
                    type="warning"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=17177324.mp3"
                    title="Flower Dance"
                    author="DJ Okawari"
                    cover="https://p2.music.126.net/e4LLVF0V_UyLYODUUJTjWg==/669602418069239.jpg"
                    type="danger"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1443838820.mp3"
                    title="出山"
                    author="花粥"
                    cover="https://p1.music.126.net/xUAfdMHdXhu3BmO4g8nOYA==/109951164590324445.jpg"
                    type="info"
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 迷你模式 -->
        <view class="section">
            <view class="section-title">迷你模式</view>
            <view class="example-block">
                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=527403536.mp3"
                    title="借"
                    author="毛不易"
                    mini
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1359460183.mp3"
                    title="小城夏天"
                    author="LBI利比"
                    type="primary"
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
                    src="https://music.163.com/song/media/outer/url?id=441491828.mp3"
                    title="水星记"
                    author="郭顶"
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
                    src="https://music.163.com/song/media/outer/url?id=487191330.mp3"
                    title="The Nights"
                    author="Avicii"
                    cover="https://p2.music.126.net/mQyWm3vC5NWYGBf3K27n2g==/109951163221157827.jpg"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section-title">禁用状态</view>
            <view class="example-block">
                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=26127161.mp3"
                    title="暧昧"
                    author="薛之谦"
                    cover="https://p1.music.126.net/CjGoqmvF_MHbXjQmZRgrYQ==/17907745881553797.jpg"
                    disabled
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 自动播放 -->
        <view class="section">
            <view class="section-title">自动播放</view>
            <view class="tip">注意：由于浏览器政策限制，自动播放可能会被阻止。</view>
            <view class="example-block">
                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=32192436.mp3"
                    title="句号"
                    author="G.E.M.邓紫棋"
                    cover="https://p1.music.126.net/VY-LfiQZZNjtDBHGmEu85A==/109951164900229922.jpg"
                    :autoplay="true"
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 循环播放 -->
        <view class="section">
            <view class="section-title">循环播放</view>
            <view class="example-block">
                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=187408.mp3"
                    title="千千阙歌"
                    author="陈慧娴"
                    cover="https://p1.music.126.net/U7LwRwsqz1oyD09H4OFhIw==/109951164221720976.jpg"
                    :loop="true"
                    class="example-item"
                ></fanc-audio>
            </view>
        </view>

        <!-- 自定义事件 -->
        <view class="section">
            <view class="section-title">自定义事件</view>
            <view class="example-block">
                <fanc-audio
                    ref="eventAudio"
                    src="https://music.163.com/song/media/outer/url?id=409654891.mp3"
                    title="平凡之路"
                    author="朴树"
                    cover="https://p1.music.126.net/W_5XiCv3rGS1-J7EXpHSCQ==/18885211718782327.jpg"
                    class="example-item"
                    @play="onPlay"
                    @pause="onPause"
                    @ended="onEnded"
                    @timeupdate="onTimeUpdate"
                    @volumechange="onVolumeChange"
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
