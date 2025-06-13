<template>
    <view class="page">
        <view class="page__header">
            <text class="page__title">图片预览示例</text>
            <text class="page__desc">用于图片预览，支持手势缩放、多图浏览等功能</text>
        </view>

        <view class="section">
            <view class="section__title">基础用法</view>
            <view class="demo-block">
                <view class="image-grid">
                    <view
                        class="image-item"
                        v-for="(img, index) in images"
                        :key="index"
                        @click="previewSingle(index)"
                    >
                        <fanc-image
                            :src="img"
                            width="100%"
                            height="100px"
                            mode="cover"
                        ></fanc-image>
                    </view>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">组件调用方式</view>
            <view class="demo-block">
                <fanc-button type="primary" @click="showPreview = true">打开预览</fanc-button>

                <fanc-image-preview
                    :show="showPreview"
                    :images="images"
                    :start-index="currentIndex"
                    @close="showPreview = false"
                    @change="handlePreviewChange"
                ></fanc-image-preview>
            </view>
        </view>

        <view class="section">
            <view class="section__title">函数调用方式</view>
            <view class="demo-block">
                <fanc-button type="success" @click="previewByFunction">函数调用预览</fanc-button>
            </view>
        </view>

        <view class="section">
            <view class="section__title">自定义功能</view>
            <view class="demo-block">
                <fanc-button type="info" @click="previewWithOptions">显示底部操作栏</fanc-button>
            </view>
        </view>

        <view class="section">
            <view class="section__title">无循环模式</view>
            <view class="demo-block">
                <fanc-button type="warning" @click="previewNoLoop">禁用循环切换</fanc-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            images: [
                "/static/img/source material/DM_20250613111832_001.jpg",
                "/static/img/source material/DM_20250613111832_002.jpg",
                "/static/img/source material/DM_20250613111832_003.jpg",
                "/static/img/source material/DM_20250613111832_004.jpg",
                "/static/img/source material/DM_20250613111832_005.jpg",
                "/static/img/source material/DM_20250613111832_006.jpg",
            ],
            showPreview: false,
            currentIndex: 0,
        };
    },
    methods: {
        // 单图预览
        previewSingle(index) {
            this.currentIndex = index;
            this.showPreview = true;
        },

        // 函数调用预览
        previewByFunction() {
            this.$imagePreview({
                images: this.images,
                startIndex: 0,
                onClose: () => {
                    this.$toast.text("预览已关闭");
                },
                onChange: (index) => {
                    console.log("当前图片索引:", index);
                },
            });
        },

        // 显示底部操作栏
        previewWithOptions() {
            this.$imagePreview({
                images: this.images,
                startIndex: 0,
                showFooter: true,
                onDownload: ({ index, url }) => {
                    this.$toast.success("开始下载图片");
                },
                onShare: ({ index, url }) => {
                    this.$toast.success("开始分享图片");
                },
            });
        },

        // 禁用循环切换
        previewNoLoop() {
            this.$imagePreview({
                images: this.images,
                startIndex: 0,
                loop: false,
                onClose: () => {
                    this.$toast.text("预览已关闭");
                },
            });
        },

        // 预览切换事件
        handlePreviewChange(index) {
            this.currentIndex = index;
            console.log("当前预览索引:", index);
        },
    },
};
</script>

<style>
.page {
    padding: 20px;
    background-color: #f7f8fa;
    min-height: 100vh;
}

.page__header {
    padding-bottom: 20px;
}

.page__title {
    font-size: 20px;
    font-weight: bold;
    color: #323233;
    display: block;
    margin-bottom: 10px;
}

.page__desc {
    font-size: 14px;
    color: #969799;
    display: block;
}

.section {
    margin-bottom: 30px;
}

.section__title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 16px;
    padding-left: 15px;
    position: relative;
}

.section__title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background-color: #4a6cf7;
    border-radius: 2px;
}

.demo-block {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    margin: -4px;
}

.image-item {
    width: calc(33.33% - 8px);
    margin: 4px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
