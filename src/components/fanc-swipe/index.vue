<template>
    <view class="fanc-swipe" :style="{ height: height + 'px' }">
        <swiper
            class="fanc-swipe__container"
            :current="currentIndex"
            :interval="interval"
            :circular="circular"
            :vertical="vertical"
            :previous-margin="previousMargin"
            :next-margin="nextMargin"
            :autoplay="autoplay"
            :duration="duration"
            :indicator-dots="showIndicator && !customIndicator"
            :indicator-color="indicatorColor"
            :indicator-active-color="indicatorActiveColor"
            @change="onChange"
        >
            <swiper-item v-for="(item, index) in list" :key="index" class="fanc-swipe__item">
                <view class="fanc-swipe__item-wrapper">
                    <image
                        v-if="item.image"
                        class="fanc-swipe__image"
                        :src="item.image"
                        :mode="imageMode"
                        @error="onImageError(index, $event)"
                        @click="onItemClick(item, index)"
                    ></image>
                    <view v-else class="fanc-swipe__content" @click="onItemClick(item, index)">
                        <slot :item="item" :index="index"></slot>
                    </view>
                </view>
            </swiper-item>
        </swiper>

        <!-- 自定义指示器 -->
        <view
            v-if="showIndicator && customIndicator"
            :class="['fanc-swipe__indicators', vertical ? 'fanc-swipe__indicators--vertical' : '']"
        >
            <view
                v-for="(_, index) in list"
                :key="index"
                :class="[
                    'fanc-swipe__indicator',
                    currentIndex === index ? 'fanc-swipe__indicator--active' : '',
                ]"
                :style="{
                    backgroundColor: currentIndex === index ? indicatorActiveColor : indicatorColor,
                }"
                @click="setCurrentIndex(index)"
            ></view>
        </view>

        <!-- 标题 -->
        <view
            v-if="showTitle && list[currentIndex] && list[currentIndex].title"
            class="fanc-swipe__title"
        >
            {{ list[currentIndex].title }}
        </view>

        <!-- 上下页切换按钮 -->
        <view
            v-if="showNavButtons && list.length > 1"
            :class="[
                'fanc-swipe__nav-buttons',
                vertical ? 'fanc-swipe__nav-buttons--vertical' : '',
            ]"
        >
            <view
                :class="[
                    'fanc-swipe__nav-button',
                    vertical ? 'fanc-swipe__nav-button--up' : 'fanc-swipe__nav-button--prev',
                ]"
                @click="prev"
            >
                <fanc-icon :name="vertical ? 'angle-up' : 'angle-left'"></fanc-icon>
            </view>
            <view
                :class="[
                    'fanc-swipe__nav-button',
                    vertical ? 'fanc-swipe__nav-button--down' : 'fanc-swipe__nav-button--next',
                ]"
                @click="next"
            >
                <fanc-icon :name="vertical ? 'angle-down' : 'angle-right'"></fanc-icon>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancSwipe",
    props: {
        // 轮播图数据数组，格式为 [{image: 'url', title: '标题', ...}]
        list: {
            type: Array,
            default: () => [],
        },
        // 是否自动播放
        autoplay: {
            type: Boolean,
            default: true,
        },
        // 自动播放间隔时间（毫秒）
        interval: {
            type: Number,
            default: 3000,
        },
        // 切换动画时长（毫秒）
        duration: {
            type: Number,
            default: 500,
        },
        // 是否循环播放
        circular: {
            type: Boolean,
            default: true,
        },
        // 是否垂直方向播放
        vertical: {
            type: Boolean,
            default: false,
        },
        // 是否显示指示器
        showIndicator: {
            type: Boolean,
            default: true,
        },
        // 使用自定义指示器样式
        customIndicator: {
            type: Boolean,
            default: true,
        },
        // 指示器颜色
        indicatorColor: {
            type: String,
            default: "rgba(255, 255, 255, 0.6)",
        },
        // 当前指示器颜色
        indicatorActiveColor: {
            type: String,
            default: "#ffffff",
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: false,
        },
        // 轮播高度，单位为px
        height: {
            type: [Number, String],
            default: 200,
        },
        // 图片裁剪、缩放模式
        imageMode: {
            type: String,
            default: "aspectFill",
        },
        // 前边距，可用于露出前一项的一小部分，单位px
        previousMargin: {
            type: String,
            default: "0px",
        },
        // 后边距，可用于露出后一项的一小部分，单位px
        nextMargin: {
            type: String,
            default: "0px",
        },
        // 初始显示的轮播索引
        initialIndex: {
            type: Number,
            default: 0,
        },
        // 是否显示上下页切换按钮
        showNavButtons: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentIndex: this.initialIndex,
            timer: null,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.currentIndex = this.initialIndex;
            // 自动播放逻辑可以在这里添加
        },
        onChange(e) {
            this.currentIndex = e.detail.current;
            this.$emit("change", {
                index: this.currentIndex,
                item: this.list[this.currentIndex],
            });
        },
        onItemClick(item, index) {
            this.$emit("click", {
                item,
                index,
            });
        },
        onImageError(index, event) {
            this.$emit("error", {
                index,
                item: this.list[index],
                event,
            });
        },
        // 手动设置当前索引
        setCurrentIndex(index) {
            if (index >= 0 && index < this.list.length) {
                this.currentIndex = index;
            }
        },
        // 切换到下一张
        next() {
            const nextIndex = (this.currentIndex + 1) % this.list.length;
            this.setCurrentIndex(nextIndex);
        },
        // 切换到上一张
        prev() {
            const prevIndex = (this.currentIndex - 1 + this.list.length) % this.list.length;
            this.setCurrentIndex(prevIndex);
        },
    },
};
</script>

<style>
.fanc-swipe {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--swipe-bg-color, #f2f2f2);
}

.fanc-swipe__container {
    width: 100%;
    height: 100%;
}

.fanc-swipe__item {
    width: 100%;
    height: 100%;
    flex: 1;
}

.fanc-swipe__item-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fanc-swipe__image {
    width: 100%;
    height: 100%;
}

.fanc-swipe__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fanc-swipe__indicators {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
}

.fanc-swipe__indicators--vertical {
    bottom: auto;
    left: auto;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
}

.fanc-swipe__indicator {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin: 0 4px;
    transition: all 0.3s ease;
}

.fanc-swipe__indicators--vertical .fanc-swipe__indicator {
    margin: 4px 0;
}

.fanc-swipe__indicator--active {
    width: 16px;
}

.fanc-swipe__indicators--vertical .fanc-swipe__indicator--active {
    width: 8px;
    height: 16px;
}

.fanc-swipe__title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 16px;
    color: #fff;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.4);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.fanc-swipe__nav-buttons {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.fanc-swipe__nav-buttons--vertical {
    top: 0;
    bottom: 0;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    flex-direction: column;
    justify-content: space-between;
}

.fanc-swipe__nav-button {
    width: 36px;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    pointer-events: auto;
    margin: 0 10px;
}

.fanc-swipe__nav-buttons--vertical .fanc-swipe__nav-button {
    margin: 10px 0;
}

.fanc-swipe__nav-button--prev,
.fanc-swipe__nav-button--up {
    padding-right: 2px;
}

.fanc-swipe__nav-button--next,
.fanc-swipe__nav-button--down {
    padding-left: 2px;
}

.fanc-swipe__nav-button--up {
    padding-bottom: 2px;
}

.fanc-swipe__nav-button--down {
    padding-top: 2px;
}
</style>
