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
                    src="https://wx.music.tc.qq.com/M80000140o6q3Jvfzr.mp3?fromtag=8&guid=ilingku&src=M800004Yi5BD3ksoAN.mp3&trace=4b5427ab69326485&uin=8200895&vkey=4DB2B90411E526DF0BB7FBD4390F23E96879D9EC3946E2317678E6E8FD39D1F8C340BB99480593A8480C515E8FF71CC0FC1FD17E8EFA7C48__v21e2a1733"
                    title="蒲公英的约定"
                    author="周杰伦"
                    cover="https://imge.kugou.com/stdmusic/120/20220705/20220705143006989099.jpg"
                ></fanc-audio>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>
            <view class="example-block">
                <fanc-audio
                    src="https://wx.music.tc.qq.com/M800002202B43Cq4V4.mp3?fromtag=8&guid=ilingku&trace=1b7706de3d201fa1&uin=2388721329&vkey=0D33A90EDA81AAB2B696FDDB9A18153D1041480D84C30D764DF91F4ADCBE2862092BCFF56714497C837249303A20FE16EF313EEBA7A687AB__v2b94c558"
                    title="晴天"
                    author="周杰伦"
                    cover="https://imge.kugou.com/stdmusic/120/20230920/20230920142503632013.jpg"
                    color="#1976d2"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1891469546.mp3"
                    title="理想"
                    author="李健"
                    cover="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=500&auto=format&fit=crop"
                    color="#4caf50"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1922723733.mp3"
                    title="像我这样的人"
                    author="毛不易"
                    cover="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=500&auto=format&fit=crop"
                    color="#ff9800"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1949096115.mp3"
                    title="哪里都是你"
                    author="队长"
                    cover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
                    color="#f44336"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1413863166.mp3"
                    title="起风了"
                    author="买辣椒也用券"
                    cover="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop"
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
                    src="https://music.163.com/song/media/outer/url?id=1808492017.mp3"
                    title="漫长的告别"
                    author="梁博"
                    mini
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1359460183.mp3"
                    title="小城夏天"
                    author="LBI利比"
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
                    src="https://music.163.com/song/media/outer/url?id=1934251776.mp3"
                    title="孤勇者"
                    author="陈奕迅"
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
                    src="https://music.163.com/song/media/outer/url?id=2007767912.mp3"
                    title="花海"
                    author="周杰伦"
                    cover="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=500&auto=format&fit=crop"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1942385658.mp3"
                    title="Letting Go"
                    author="蔡健雅"
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
                    src="https://music.163.com/song/media/outer/url?id=1818031620.mp3"
                    title="盗将行"
                    author="花粥"
                    cover="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=500&auto=format&fit=crop"
                    color="#4caf50"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1973643937.mp3"
                    title="白月光与朱砂痣"
                    author="大籽"
                    cover="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=500&auto=format&fit=crop"
                    color="#ff9800"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1401161519.mp3"
                    title="星辰大海"
                    author="黄霄雲"
                    cover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
                    color="#f44336"
                    :showDownload="true"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1436709403.mp3"
                    title="这一生关于你的风景"
                    author="隔壁老樊"
                    cover="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop"
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
                    src="https://music.163.com/song/media/outer/url?id=1930863111.mp3"
                    title="干杯"
                    author="五月天"
                    cover="https://images.unsplash.com/photo-1584679109597-c656b19974c9?q=80&w=500&auto=format&fit=crop"
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
                    src="https://music.163.com/song/media/outer/url?id=25643136.mp3"
                    title="光辉岁月"
                    author="Beyond"
                    cover="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500&auto=format&fit=crop"
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
                    src="https://music.163.com/song/media/outer/url?id=1975599456.mp3"
                    title="麻雀"
                    author="李荣浩"
                    cover="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop"
                    coverShape="circle"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=186016.mp3"
                    title="今天只做一件事"
                    author="陈奕迅"
                    cover="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop"
                    coverShape="circle"
                    color="#9c27b0"
                    class="example-item"
                ></fanc-audio>

                <fanc-audio
                    src="https://music.163.com/song/media/outer/url?id=1902224221.mp3"
                    title="和你一起"
                    author="陈奕迅"
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
                    src="https://music.163.com/song/media/outer/url?id=1842025914.mp3"
                    title="世间美好与你环环相扣"
                    author="柏松"
                    cover="https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?q=80&w=500&auto=format&fit=crop"
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
