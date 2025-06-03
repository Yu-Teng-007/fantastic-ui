<template>
    <view class="example-container">
        <view class="header">
            <text class="title">轮播</text>
            <text class="desc">Swipe 组件用于循环播放一组图片或内容</text>
        </view>

        <view class="example-block">
            <view class="block-title">基础用法</view>
            <fanc-swipe :list="images" @click="onSwipeItemClick"></fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">显示标题</view>
            <fanc-swipe :list="imagesWithTitle" show-title></fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">自定义高度</view>
            <fanc-swipe :list="images" :height="150"></fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">垂直方向</view>
            <fanc-swipe :list="images" vertical :height="200"></fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">自定义指示器样式</view>
            <fanc-swipe
                :list="images"
                :indicator-color="'rgba(0, 123, 255, 0.3)'"
                :indicator-active-color="'var(--fanc-primary-color)'"
            ></fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">卡片效果</view>
            <fanc-swipe :list="images" :previous-margin="'10px'" :next-margin="'10px'"></fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">自定义内容</view>
            <fanc-swipe :list="customSlides" :height="150">
                <template v-slot="{ item }">
                    <view class="custom-slide" :style="{ backgroundColor: item.color }">
                        <text class="custom-slide-text">{{ item.text }}</text>
                    </view>
                </template>
            </fanc-swipe>
        </view>

        <view class="example-block">
            <view class="block-title">受控轮播</view>
            <fanc-swipe :list="images" :autoplay="false" ref="controlledSwipe"></fanc-swipe>
            <view class="swipe-controls">
                <fanc-button size="small" type="primary" @click="prevSlide">上一张</fanc-button>
                <fanc-button size="small" type="primary" @click="nextSlide">下一张</fanc-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            images: [
                {
                    image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                },
                {
                    image: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
                },
                {
                    image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                },
                {
                    image: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg",
                },
            ],
            imagesWithTitle: [
                {
                    image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    title: "自然风景",
                },
                {
                    image: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
                    title: "海洋风光",
                },
                {
                    image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                    title: "春日花树",
                },
                {
                    image: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg",
                    title: "山脉风景",
                },
            ],
            customSlides: [
                { color: "#007bff", text: "自定义内容 1" },
                { color: "#28a745", text: "自定义内容 2" },
                { color: "#dc3545", text: "自定义内容 3" },
                { color: "#ffc107", text: "自定义内容 4" },
            ],
        };
    },
    methods: {
        onSwipeItemClick(data) {
            this.$toast.text(`点击了第 ${data.index + 1} 项`);
        },
        prevSlide() {
            this.$refs.controlledSwipe.prev();
        },
        nextSlide() {
            this.$refs.controlledSwipe.next();
        },
    },
};
</script>

<style>
.example-container {
    padding: 16px;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.header {
    margin-bottom: 16px;
}

.title {
    font-size: 20px;
    font-weight: 600;
    display: block;
    margin-bottom: 8px;
}

.desc {
    font-size: 14px;
    color: #666;
    display: block;
}

.example-block {
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.block-title {
    font-size: 16px;
    font-weight: 500;
    padding: 16px;
    border-bottom: 1px solid #eee;
}

.custom-slide {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-slide-text {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
}

.swipe-controls {
    display: flex;
    justify-content: center;
    padding: 16px;
    gap: 16px;
}
</style>
