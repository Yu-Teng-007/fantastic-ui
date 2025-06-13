<template>
    <view class="container">
        <view class="header">
            <view class="title">图片</view>
            <view class="subtitle"
                >增强版的图片组件，支持懒加载、加载中提示、加载失败提示等特性</view
            >
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-image
                    src="/static/img/source material/DM_20250613111832_001.jpg"
                    width="200"
                    height="200"
                />
            </view>
        </view>

        <!-- 图片模式 -->
        <view class="section">
            <view class="section-title">图片模式</view>
            <view class="section-content">
                <view class="image-mode-demo">
                    <view class="image-mode-item" v-for="(item, index) in modes" :key="index">
                        <fanc-image :src="demoImageUrl" width="80" height="80" :mode="item" />
                        <text class="image-mode-text">{{ item }}</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 圆形图片 -->
        <view class="section">
            <view class="section-title">圆形图片</view>
            <view class="section-content">
                <fanc-image :src="demoImageUrl" width="100" height="100" mode="aspectFill" round />
            </view>
        </view>

        <!-- 加载中提示 -->
        <view class="section">
            <view class="section-title">加载中提示</view>
            <view class="section-content">
                <view class="loading-demo">
                    <fanc-image
                        :key="loadingKey"
                        src="/static/img/source material/DM_20250613111832_002.jpg"
                        width="100"
                        height="100"
                        loading-text="加载中..."
                    />
                    <view class="loading-demo-btn" @click="reloadImage"> 重新加载 </view>
                </view>
            </view>
        </view>

        <!-- 加载失败提示 -->
        <view class="section">
            <view class="section-title">加载失败提示</view>
            <view class="section-content">
                <fanc-image
                    src="https://1.jpg"
                    width="100"
                    height="100"
                    error-text="加载失败"
                    fallbackSrc="/static/img/source material/DM_20250613112436_022.JPEG"
                />
            </view>
        </view>

        <!-- 图片懒加载 -->
        <view class="section">
            <view class="section-title">图片懒加载</view>
            <view class="section-content">
                <view class="lazy-load-demo">
                    <fanc-image
                        v-for="(item, index) in lazyImages"
                        :key="index"
                        :src="item"
                        width="100%"
                        height="200"
                        mode="aspectFill"
                        lazy-load
                    />
                </view>
            </view>
        </view>

        <!-- 事件监听 -->
        <view class="section">
            <view class="section-title">事件监听</view>
            <view class="section-content">
                <fanc-image
                    src="/static/img/source material/DM_20250613111832_003.jpg"
                    width="200"
                    height="100"
                    @load="onImageLoad"
                    @error="onImageError"
                    @click="onImageClick"
                />
                <view class="event-result">
                    <text class="event-result-text">{{ eventResult }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            demoImageUrl: "/static/img/source material/DM_20250613112436_001.JPEG",
            modes: [
                "scaleToFill",
                "aspectFit",
                "aspectFill",
                "widthFix",
                "heightFix",
                "top",
                "bottom",
                "center",
                "left",
                "right",
                "top left",
                "top right",
                "bottom left",
                "bottom right",
            ],
            lazyImages: [
                "/static/img/source material/DM_20250613112436_010.JPEG",
                "/static/img/source material/DM_20250613112436_011.JPEG",
                "/static/img/source material/DM_20250613112436_012.JPEG",
                "/static/img/source material/DM_20250613112436_013.JPEG",
                "/static/img/source material/DM_20250613112436_014.JPEG",
            ],
            eventResult: "点击图片、加载成功或失败时会显示事件信息",
            loadingKey: 0,
        };
    },
    methods: {
        reloadImage() {
            // 通过改变key使组件重新渲染，模拟加载效果
            this.loadingKey++;
        },
        onImageLoad() {
            this.eventResult = "图片加载成功";
        },
        onImageError() {
            this.eventResult = "图片加载失败";
        },
        onImageClick() {
            this.eventResult = "图片被点击";
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

.section-content {
    padding: 16px;
}

.image-mode-demo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.image-mode-item {
    margin: 0 12px 12px 0;
    text-align: center;
}

.image-mode-text {
    font-size: 12px;
    color: #969799;
    margin-top: 6px;
    display: block;
    word-break: break-word;
}

.loading-demo {
    display: flex;
    align-items: center;
}

.loading-demo-btn {
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    margin-left: 16px;
    cursor: pointer;
}

.lazy-load-demo {
    display: flex;
    flex-direction: column;
}

.lazy-load-demo .fanc-image {
    margin-bottom: 12px;
}

.event-result {
    margin-top: 16px;
    padding: 12px;
    background-color: #f7f8fa;
    border-radius: 4px;
}

.event-result-text {
    font-size: 14px;
    color: #323233;
}
</style>
