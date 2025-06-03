<template>
    <view class="fanc-image-preview" v-if="show">
        <!-- 蒙层 -->
        <view class="fanc-image-preview__mask" @click="maskClose && close()"></view>

        <!-- 图片容器 -->
        <view class="fanc-image-preview__container">
            <swiper
                class="fanc-image-preview__swiper"
                :current="currentIndex"
                @change="handleChange"
                :circular="loop"
                :duration="300"
            >
                <swiper-item
                    v-for="(item, index) in images"
                    :key="index"
                    class="fanc-image-preview__swiper-item"
                >
                    <movable-area class="fanc-image-preview__movable-area">
                        <movable-view
                            class="fanc-image-preview__movable-view"
                            direction="all"
                            :scale="true"
                            :scale-min="1"
                            :scale-max="3"
                            :scale-value="item.scale || 1"
                            @scale="handleScale($event, index)"
                            @change="handlePosition($event, index)"
                            :animation="false"
                            :x="item.x || 0"
                            :y="item.y || 0"
                        >
                            <image
                                class="fanc-image-preview__image"
                                :src="typeof item === 'string' ? item : item.url || item.src"
                                mode="aspectFit"
                                @load="handleImageLoad($event, index)"
                                @error="handleImageError($event, index)"
                                @click="handleImageClick"
                            />
                        </movable-view>
                    </movable-area>
                </swiper-item>
            </swiper>

            <!-- 关闭按钮 -->
            <view class="fanc-image-preview__close" v-if="closeable" @click="close">
                <fanc-icon name="xmark" size="20" color="#fff"></fanc-icon>
            </view>

            <!-- 图片计数器 -->
            <view class="fanc-image-preview__counter" v-if="showIndex">
                {{ currentIndex + 1 }}/{{ images.length }}
            </view>

            <!-- 自定义操作区域 -->
            <view class="fanc-image-preview__footer" v-if="$slots.footer || showFooter">
                <slot name="footer">
                    <view class="fanc-image-preview__footer-actions">
                        <view class="fanc-image-preview__footer-action" @click="handleDownload">
                            <fanc-icon name="download" size="20" color="#fff"></fanc-icon>
                            <text>保存</text>
                        </view>
                        <view class="fanc-image-preview__footer-action" @click="handleShare">
                            <fanc-icon name="share" size="20" color="#fff"></fanc-icon>
                            <text>分享</text>
                        </view>
                    </view>
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancImagePreview",
    props: {
        // 图片数组，支持字符串数组或对象数组，对象格式 {url, src}
        images: {
            type: Array,
            default: () => [],
        },
        // 是否展示
        show: {
            type: Boolean,
            default: false,
        },
        // 起始位置索引
        startIndex: {
            type: Number,
            default: 0,
        },
        // 是否循环预览
        loop: {
            type: Boolean,
            default: true,
        },
        // 是否显示关闭按钮
        closeable: {
            type: Boolean,
            default: true,
        },
        // 是否显示页码
        showIndex: {
            type: Boolean,
            default: true,
        },
        // 是否显示底部操作栏
        showFooter: {
            type: Boolean,
            default: false,
        },
        // 点击蒙层是否关闭
        maskClose: {
            type: Boolean,
            default: true,
        },
        // 双击图片是否放大
        doubleTapZoom: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            currentIndex: this.startIndex,
            imageStatus: [], // 图片状态
            lastTapTime: 0, // 上次点击时间，用于双击判断
        };
    },
    watch: {
        startIndex(val) {
            this.currentIndex = val;
        },
        images: {
            handler(val) {
                this.initImageStatus();
            },
            immediate: true,
        },
    },
    methods: {
        // 初始化图片状态
        initImageStatus() {
            this.imageStatus = this.images.map(() => ({
                loaded: false,
                error: false,
                scale: 1,
                x: 0,
                y: 0,
            }));
        },

        // 关闭预览
        close() {
            this.$emit("close");
            this.$emit("update:show", false);
        },

        // 滑动切换
        handleChange(e) {
            const { current } = e.detail;
            this.currentIndex = current;
            this.$emit("change", current);
        },

        // 图片缩放
        handleScale(e, index) {
            const scale = e.detail.scale;
            this.imageStatus[index].scale = scale;
        },

        // 图片位置变化
        handlePosition(e, index) {
            if (e.detail.source === "touch") {
                this.imageStatus[index].x = e.detail.x;
                this.imageStatus[index].y = e.detail.y;
            }
        },

        // 图片加载完成
        handleImageLoad(e, index) {
            this.imageStatus[index].loaded = true;
            this.imageStatus[index].error = false;
            this.$emit("load", {
                index,
                event: e,
            });
        },

        // 图片加载错误
        handleImageError(e, index) {
            this.imageStatus[index].error = true;
            this.imageStatus[index].loaded = false;
            this.$emit("error", {
                index,
                event: e,
            });
        },

        // 图片点击
        handleImageClick(e) {
            const now = new Date().getTime();
            if (this.doubleTapZoom && now - this.lastTapTime < 300) {
                // 双击放大/还原
                const index = this.currentIndex;
                const currentScale = this.imageStatus[index].scale;
                this.imageStatus[index].scale = currentScale > 1.5 ? 1 : 2;
            }
            this.lastTapTime = now;
        },

        // 下载图片
        handleDownload() {
            const image = this.images[this.currentIndex];
            const url = typeof image === "string" ? image : image.url || image.src;

            // 兼容不同平台
            // #ifdef H5
            const a = document.createElement("a");
            a.href = url;
            a.download = url.split("/").pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // #endif

            // #ifdef APP-PLUS || MP
            uni.saveImageToPhotosAlbum({
                filePath: url,
                success: () => {
                    this.$toast.success("图片已保存到相册");
                },
                fail: (err) => {
                    if (err.errMsg.indexOf("auth deny") >= 0) {
                        this.$toast.error("保存失败，请授权相册权限");
                    } else {
                        this.$toast.error("保存失败");
                    }
                },
            });
            // #endif

            this.$emit("download", {
                index: this.currentIndex,
                url,
            });
        },

        // 分享图片
        handleShare() {
            const image = this.images[this.currentIndex];
            const url = typeof image === "string" ? image : image.url || image.src;

            // #ifdef APP-PLUS
            uni.share({
                provider: "weixin",
                scene: "WXSceneSession",
                type: 3,
                imageUrl: url,
                success: function () {
                    console.log("分享成功");
                },
                fail: function () {
                    console.log("分享失败");
                },
            });
            // #endif

            // #ifdef H5 || MP
            uni.showActionSheet({
                itemList: ["发送给朋友", "保存图片"],
                success: (res) => {
                    if (res.tapIndex === 1) {
                        this.handleDownload();
                    }
                },
            });
            // #endif

            this.$emit("share", {
                index: this.currentIndex,
                url,
            });
        },
    },
};
</script>

<style>
:root {
    /* 图片预览组件颜色 */
    --image-preview-bg-color: rgba(0, 0, 0, 0.9);
    --image-preview-index-bg-color: rgba(0, 0, 0, 0.3);
    --image-preview-index-color: #fff;
    --image-preview-close-color: #fff;
    --image-preview-close-bg-color: rgba(0, 0, 0, 0.3);
    --image-preview-footer-bg-color: rgba(0, 0, 0, 0.5);
    --image-preview-footer-text-color: #fff;
    --image-preview-swiper-duration: 300ms;
}

.fanc-image-preview {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: transparent;
}

.fanc-image-preview__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--image-preview-bg-color);
}

.fanc-image-preview__container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.fanc-image-preview__swiper {
    width: 100%;
    height: 100%;
}

.fanc-image-preview__swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.fanc-image-preview__movable-area {
    width: 100%;
    height: 100%;
}

.fanc-image-preview__movable-view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-image-preview__image {
    width: 100%;
    height: 100%;
}

.fanc-image-preview__close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--image-preview-close-bg-color);
    z-index: 10;
}

.fanc-image-preview__counter {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 12px;
    border-radius: 16px;
    background-color: var(--image-preview-index-bg-color);
    color: var(--image-preview-index-color);
    font-size: 14px;
}

.fanc-image-preview__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: var(--image-preview-footer-bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-image-preview__footer-actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.fanc-image-preview__footer-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--image-preview-footer-text-color);
    font-size: 12px;
    margin: 0 20px;
}

.fanc-image-preview__footer-action text {
    margin-top: 8px;
}
</style>
