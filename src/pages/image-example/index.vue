<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">Image 图片</text>
            <text class="example-page__header-desc">增强版的图片组件，支持懒加载、加载中提示、加载失败提示等特性</text>
        </view>

        <!-- 基础用法 -->
        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">基础的图片用法</view>
            <view class="example-page__content">
                <fanc-image src="/static/img/demo/little_boy_with_trumpet.png" width="200" height="200" />
            </view>
        </view>

        <!-- 图片模式 -->
        <view class="example-page__section">
            <view class="example-page__section-title">图片模式</view>
            <view class="example-page__section-desc">通过 mode 属性可以设置图片裁剪、缩放的模式</view>
            <view class="example-page__content image-mode-demo">
                <view class="image-mode-item" v-for="(item, index) in modes" :key="index">
                    <fanc-image :src="demoImageUrl" width="80" height="80" :mode="item" />
                    <text class="image-mode-text">{{ item }}</text>
                </view>
            </view>
        </view>

        <!-- 圆形图片 -->
        <view class="example-page__section">
            <view class="example-page__section-title">圆形图片</view>
            <view class="example-page__section-desc">通过 round 属性可以设置图片变圆</view>
            <view class="example-page__content">
                <fanc-image :src="demoImageUrl" width="100" height="100" mode="aspectFill" round />
            </view>
        </view>

        <!-- 加载中提示 -->
        <view class="example-page__section">
            <view class="example-page__section-title">加载中提示</view>
            <view class="example-page__section-desc">Image 组件提供了默认的加载中提示</view>
            <view class="example-page__content">
                <view class="loading-demo">
                    <fanc-image
                        :key="loadingKey"
                        src="/static/img/demo/little_girl_with_trumpet.png"
                        width="100"
                        height="100"
                        loading-text="加载中..."
                    />
                    <view class="loading-demo-btn" @click="reloadImage"> 重新加载 </view>
                </view>
            </view>
        </view>

        <!-- 加载失败提示 -->
        <view class="example-page__section">
            <view class="example-page__section-title">加载失败提示</view>
            <view class="example-page__section-desc">Image 组件提供了默认的加载失败提示</view>
            <view class="example-page__content">
                <fanc-image
                    src="https://1.jpg"
                    width="100"
                    height="100"
                    error-text="加载失败"
                    fallbackSrc="/static/img/demo/fail_load.png"
                />
            </view>
        </view>

        <!-- 图片懒加载 -->
        <view class="example-page__section">
            <view class="example-page__section-title">图片懒加载</view>
            <view class="example-page__section-desc">设置 lazy-load 属性来开启图片懒加载</view>
            <view class="example-page__content lazy-load-demo">
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

        <!-- 事件监听 -->
        <view class="example-page__section">
            <view class="example-page__section-title">事件监听</view>
            <view class="example-page__section-desc">监听图片的加载成功和失败事件</view>
            <view class="example-page__content">
                <fanc-image
                    src="/static/img/demo/woman_with_trumpet.png"
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
            demoImageUrl: "/static/img/demo/cat.jpeg",
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
                "/static/img/demo/little_pig_with_trumpet.png",
                "/static/img/demo/little_dog_with_trumpet.png",
                "/static/img/demo/little_rabbit_with_trumpet.png",
                "/static/img/demo/little_panda_with_trumpet.png",
                "/static/img/demo/little_penguin_with_trumpet.png",
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

<style lang="scss">
.image-mode-demo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .image-mode-item {
        margin: 0 12px 12px 0;
        text-align: center;

        .image-mode-text {
            font-size: 12px;
            color: #969799;
            margin-top: 6px;
            display: block;
            word-break: break-word;
        }
    }
}

.loading-demo {
    display: flex;
    align-items: center;

    .loading-demo-btn {
        background-color: #007bff;
        color: #fff;
        font-size: 14px;
        padding: 8px 16px;
        border-radius: 4px;
        margin-left: 16px;
        cursor: pointer;
    }
}

.lazy-load-demo {
    display: flex;
    flex-direction: column;

    .fanc-image {
        margin-bottom: 12px;
    }
}

.event-result {
    margin-top: 16px;
    padding: 12px;
    background-color: #f7f8fa;
    border-radius: 4px;

    .event-result-text {
        font-size: 14px;
        color: #323233;
    }
}
</style>
