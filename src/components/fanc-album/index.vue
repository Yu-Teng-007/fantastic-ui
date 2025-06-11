<template>
    <view class="fanc-album" :class="{ 'fanc-album--disabled': disabled }">
        <!-- 相册标题区域 -->
        <view class="fanc-album__header" v-if="showHeader">
            <view class="fanc-album__title-wrap">
                <text class="fanc-album__title" v-if="title">{{ title }}</text>
                <text class="fanc-album__subtitle" v-if="subtitle">{{ subtitle }}</text>
            </view>
            <view class="fanc-album__extra" v-if="$slots.extra">
                <slot name="extra"></slot>
            </view>
        </view>

        <!-- 相册内容区域 -->
        <view
            class="fanc-album__content"
            :class="[`fanc-album__content--${mode}`, { 'fanc-album__content--border': border }]"
        >
            <!-- 网格模式 -->
            <view class="fanc-album__grid" v-if="mode === 'grid'">
                <view
                    class="fanc-album__item"
                    v-for="(item, index) in images"
                    :key="index"
                    :style="{
                        width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})`,
                        borderRadius: `${radius}px`,
                        marginRight: (index + 1) % columns === 0 ? '0' : `${gap}px`,
                        marginBottom: `${gap}px`,
                        aspectRatio: item.aspectRatio || '1',
                        height: item.height || 'auto',
                    }"
                    @click="handleItemClick(item, index)"
                >
                    <image
                        class="fanc-album__image"
                        :src="item.url || item"
                        :mode="imageMode"
                        :lazy-load="lazyLoad"
                        @error="handleImageError(index, $event)"
                    ></image>
                    <view class="fanc-album__mask" v-if="item.selected">
                        <fanc-icon name="check" size="20" color="#ffffff"></fanc-icon>
                    </view>
                    <view class="fanc-album__caption" v-if="showCaption && item.caption">
                        <text class="fanc-album__caption-text">{{ item.caption }}</text>
                    </view>
                </view>

                <!-- 添加按钮 -->
                <view
                    v-if="showAddButton && !disabled"
                    class="fanc-album__item fanc-album__add-btn"
                    :style="{
                        width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})`,
                        borderRadius: `${radius}px`,
                        marginRight: (images.length + 1) % columns === 0 ? '0' : `${gap}px`,
                    }"
                    @click="handleAddClick"
                >
                    <fanc-icon
                        name="plus"
                        size="24"
                        color="var(--album-add-icon-color)"
                    ></fanc-icon>
                    <text v-if="addText" class="fanc-album__add-text">{{ addText }}</text>
                </view>
            </view>

            <!-- 列表模式 -->
            <view class="fanc-album__list" v-else-if="mode === 'list'">
                <view
                    class="fanc-album__list-item"
                    v-for="(item, index) in images"
                    :key="index"
                    @click="handleItemClick(item, index)"
                >
                    <image
                        class="fanc-album__list-image"
                        :src="item.url || item"
                        :mode="imageMode"
                        :lazy-load="lazyLoad"
                        :style="{ borderRadius: `${radius}px` }"
                        @error="handleImageError(index, $event)"
                    ></image>
                    <view class="fanc-album__list-content">
                        <text class="fanc-album__list-title" v-if="item.title">{{
                            item.title
                        }}</text>
                        <text class="fanc-album__list-desc" v-if="item.description">{{
                            item.description
                        }}</text>
                        <view class="fanc-album__list-footer" v-if="item.date || item.size">
                            <text class="fanc-album__list-date" v-if="item.date">{{
                                item.date
                            }}</text>
                            <text class="fanc-album__list-size" v-if="item.size">{{
                                item.size
                            }}</text>
                        </view>
                    </view>
                    <view class="fanc-album__list-right">
                        <slot name="right" :item="item" :index="index"></slot>
                    </view>
                </view>
            </view>

            <!-- 瀑布流模式 -->
            <view
                class="fanc-album__waterfall"
                v-else-if="mode === 'waterfall'"
                :style="{ gap: `${gap}px` }"
            >
                <view
                    class="fanc-album__waterfall-column"
                    v-for="column in waterFallColumns"
                    :key="column"
                    :style="{ width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})` }"
                >
                    <view
                        class="fanc-album__waterfall-item"
                        v-for="item in getColumnItems(column)"
                        :key="item.index"
                        :style="{ marginBottom: `${gap}px`, borderRadius: `${radius}px` }"
                        @click="handleItemClick(item.data, item.index)"
                    >
                        <image
                            class="fanc-album__waterfall-image"
                            :src="item.data.url || item.data"
                            :mode="imageMode"
                            :lazy-load="lazyLoad"
                            :style="{ aspectRatio: item.data.aspectRatio || 1 }"
                            @error="handleImageError(item.index, $event)"
                        ></image>
                        <view class="fanc-album__caption" v-if="showCaption && item.data.caption">
                            <text class="fanc-album__caption-text">{{ item.data.caption }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 轮播模式 -->
            <view class="fanc-album__swiper" v-else-if="mode === 'swiper'">
                <swiper
                    class="fanc-album__swiper-container"
                    :indicator-dots="indicatorDots"
                    :autoplay="autoplay"
                    :interval="interval"
                    :duration="duration"
                    :circular="circular"
                    @change="handleSwiperChange"
                >
                    <swiper-item
                        v-for="(item, index) in images"
                        :key="index"
                        class="fanc-album__swiper-item"
                        @click="handleItemClick(item, index)"
                    >
                        <image
                            class="fanc-album__swiper-image"
                            :src="item.url || item"
                            :mode="imageMode"
                            :lazy-load="lazyLoad"
                            @error="handleImageError(index, $event)"
                        ></image>
                        <view class="fanc-album__swiper-caption" v-if="showCaption && item.caption">
                            <text class="fanc-album__swiper-caption-text">{{ item.caption }}</text>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="fanc-album__swiper-info" v-if="showCounter">
                    <text class="fanc-album__swiper-counter"
                        >{{ currentIndex + 1 }}/{{ images.length }}</text
                    >
                </view>
            </view>

            <!-- 空状态 -->
            <view class="fanc-album__empty" v-if="images.length === 0 && !showAddButton">
                <slot name="empty">
                    <fanc-empty description="暂无图片"></fanc-empty>
                </slot>
            </view>
        </view>

        <!-- 底部区域 -->
        <view class="fanc-album__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-album",
    props: {
        // 展示模式：grid-网格模式，list-列表模式，waterfall-瀑布流模式，swiper-轮播模式
        mode: {
            type: String,
            default: "grid",
            validator: (value) => ["grid", "list", "waterfall", "swiper"].includes(value),
        },
        // 图片列表
        images: {
            type: Array,
            default: () => [],
        },
        // 列数（网格模式和瀑布流模式下生效）
        columns: {
            type: Number,
            default: 3,
        },
        // 图片间距
        gap: {
            type: Number,
            default: 8,
        },
        // 图片圆角
        radius: {
            type: Number,
            default: 4,
        },
        // 图片填充模式
        imageMode: {
            type: String,
            default: "aspectFill",
        },
        // 是否显示标题区域
        showHeader: {
            type: Boolean,
            default: false,
        },
        // 相册标题
        title: {
            type: String,
            default: "",
        },
        // 相册副标题
        subtitle: {
            type: String,
            default: "",
        },
        // 是否显示图片说明
        showCaption: {
            type: Boolean,
            default: false,
        },
        // 是否显示添加按钮
        showAddButton: {
            type: Boolean,
            default: false,
        },
        // 添加按钮文字
        addText: {
            type: String,
            default: "",
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否开启图片懒加载
        lazyLoad: {
            type: Boolean,
            default: true,
        },
        // 是否显示边框
        border: {
            type: Boolean,
            default: false,
        },
        // 轮播模式属性
        indicatorDots: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        interval: {
            type: Number,
            default: 3000,
        },
        duration: {
            type: Number,
            default: 500,
        },
        circular: {
            type: Boolean,
            default: true,
        },
        // 是否显示轮播计数器
        showCounter: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            currentIndex: 0,
            waterfallData: [],
        };
    },
    computed: {
        waterFallColumns() {
            return Array.from({ length: this.columns }, (_, i) => i + 1);
        },
    },
    watch: {
        images: {
            handler(newVal) {
                if (this.mode === "waterfall") {
                    this.processWaterfallData();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        // 处理瀑布流数据
        processWaterfallData() {
            this.waterfallData = this.images.map((item, index) => ({
                data: item,
                index,
                column: (index % this.columns) + 1,
            }));
        },

        // 获取指定列的图片
        getColumnItems(column) {
            return this.waterfallData.filter((item) => item.column === column);
        },

        // 处理图片点击事件
        handleItemClick(item, index) {
            if (this.disabled) return;

            this.$emit("click", { item, index });

            // 如果是图片对象且包含url属性，则使用图片预览
            const urls = this.images.map((img) => (typeof img === "string" ? img : img.url));
            if (urls.length > 0) {
                this.$emit("preview", { urls, current: index });
            }
        },

        // 处理添加按钮点击事件
        handleAddClick() {
            if (this.disabled) return;
            this.$emit("add");
        },

        // 处理轮播切换事件
        handleSwiperChange(e) {
            this.currentIndex = e.detail.current;
            this.$emit("change", {
                index: this.currentIndex,
                item: this.images[this.currentIndex],
            });
        },

        // 处理图片加载错误
        handleImageError(index, event) {
            this.$emit("error", { index, event });
        },
    },
};
</script>

<style>
.fanc-album {
    width: 100%;
    background-color: var(--album-bg-color);
    border-radius: var(--album-radius);
    overflow: hidden;
}

/* 头部样式 */
.fanc-album__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--album-header-padding);
}

.fanc-album__title-wrap {
    flex: 1;
}

.fanc-album__title {
    font-size: var(--album-title-font-size);
    font-weight: var(--album-title-font-weight);
    color: var(--album-title-color);
    line-height: 1.4;
}

.fanc-album__subtitle {
    font-size: var(--album-subtitle-font-size);
    color: var(--album-subtitle-color);
    margin-top: 4px;
}

.fanc-album__extra {
    margin-left: 12px;
}

/* 内容区域样式 */
.fanc-album__content {
    position: relative;
    padding: var(--album-content-padding);
}

.fanc-album__content--border {
    border: 1px solid var(--album-border-color, rgba(0, 0, 0, 0.1));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.fanc-album__content--border:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06);
}

/* 网格模式样式 */
.fanc-album__grid {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.fanc-album__item {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    min-height: 100px;
}

.fanc-album__image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.fanc-album__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.fanc-album__caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: 8px;
    z-index: 1;
}

.fanc-album__caption-text {
    color: #ffffff;
    font-size: 12px;
    line-height: 1.4;
}

.fanc-album__add-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--album-add-btn-bg);
    border: 1px dashed var(--album-add-btn-border);
    box-sizing: border-box;
    height: 100px;
}

.fanc-album__add-text {
    font-size: 12px;
    color: var(--album-add-text-color);
    margin-top: 8px;
}

/* 列表模式样式 */
.fanc-album__list-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid var(--album-list-divider-color);
}

.fanc-album__list-item:last-child {
    border-bottom: none;
}

.fanc-album__list-image {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
}

.fanc-album__list-content {
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.fanc-album__list-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--album-list-title-color);
    line-height: 1.4;
}

.fanc-album__list-desc {
    font-size: 14px;
    color: var(--album-list-desc-color);
    margin-top: 4px;
    line-height: 1.4;
}

.fanc-album__list-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--album-list-footer-color);
    margin-top: 8px;
}

.fanc-album__list-right {
    display: flex;
    align-items: center;
    margin-left: 12px;
}

/* 瀑布流模式样式 */
.fanc-album__waterfall {
    display: flex;
}

.fanc-album__waterfall-column {
    display: flex;
    flex-direction: column;
}

.fanc-album__waterfall-item {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.fanc-album__waterfall-image {
    width: 100%;
    height: auto;
    display: block;
}

/* 轮播模式样式 */
.fanc-album__swiper {
    position: relative;
    width: 100%;
}

.fanc-album__swiper-container {
    width: 100%;
    height: 240px;
}

.fanc-album__swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-album__swiper-image {
    width: 100%;
    height: 100%;
}

.fanc-album__swiper-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: 16px;
    z-index: 1;
}

.fanc-album__swiper-caption-text {
    color: #ffffff;
    font-size: 14px;
    line-height: 1.4;
}

.fanc-album__swiper-info {
    position: absolute;
    right: 12px;
    top: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    padding: 4px 8px;
    z-index: 2;
}

.fanc-album__swiper-counter {
    color: #ffffff;
    font-size: 12px;
}

/* 空状态样式 */
.fanc-album__empty {
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 底部区域样式 */
.fanc-album__footer {
    padding: var(--album-footer-padding);
    border-top: 1px solid var(--album-footer-border-color);
}

/* 禁用状态 */
.fanc-album--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
