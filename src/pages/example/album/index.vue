<template>
    <view class="example-page">
        <view class="header">
            <view class="header__title">相册 Album</view>
            <view class="header__desc">相册组件用于图片展示和管理，支持多种展示模式</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section__title">基础用法</view>
            <fanc-album
                :images="basicImages"
                :columns="3"
                :gap="8"
                @click="handleAlbumClick"
                @preview="handlePreview"
            ></fanc-album>
        </view>

        <!-- 带标题 -->
        <view class="section">
            <view class="section__title">带标题和副标题</view>
            <fanc-album
                title="我的旅行相册"
                subtitle="记录美好时刻"
                :show-header="true"
                :images="basicImages"
                :columns="3"
                :gap="8"
                @click="handleAlbumClick"
                @preview="handlePreview"
            ></fanc-album>
        </view>

        <!-- 带边框 -->
        <view class="section">
            <view class="section__title">带边框</view>
            <fanc-album
                title="我的旅行相册"
                subtitle="记录美好时刻"
                :show-header="true"
                :images="basicImages"
                :columns="3"
                :gap="8"
                :border="true"
                @click="handleAlbumClick"
                @preview="handlePreview"
            ></fanc-album>
        </view>

        <!-- 不同列数 -->
        <view class="section">
            <view class="section__title">不同列数</view>
            <view class="subsection">
                <view class="subsection__title">2列</view>
                <fanc-album
                    :images="basicImages"
                    :columns="2"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
            <view class="subsection">
                <view class="subsection__title">4列</view>
                <fanc-album
                    :images="basicImages"
                    :columns="4"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
        </view>

        <!-- 带添加按钮 -->
        <view class="section">
            <view class="section__title">带添加按钮</view>
            <fanc-album
                :images="basicImages"
                :columns="3"
                :gap="8"
                :show-add-button="true"
                add-text="添加图片"
                @click="handleAlbumClick"
                @preview="handlePreview"
                @add="handleAddImage"
            ></fanc-album>
        </view>

        <!-- 带图片说明 -->
        <view class="section">
            <view class="section__title">带图片说明</view>
            <fanc-album
                :images="captionImages"
                :columns="2"
                :gap="8"
                :show-caption="true"
                @click="handleAlbumClick"
                @preview="handlePreview"
            ></fanc-album>
        </view>

        <!-- 列表模式 -->
        <view class="section">
            <view class="section__title">列表模式</view>
            <fanc-album mode="list" :images="listImages" @click="handleAlbumClick">
                <template #right="{ item }">
                    <fanc-icon name="ellipsis-v" size="18" color="#999"></fanc-icon>
                </template>
            </fanc-album>
        </view>

        <!-- 瀑布流模式 -->
        <view class="section">
            <view class="section__title">瀑布流模式</view>
            <fanc-album
                mode="waterfall"
                :images="waterfallImages"
                :columns="2"
                :gap="8"
                :show-caption="true"
                @click="handleAlbumClick"
                @preview="handlePreview"
            ></fanc-album>
        </view>

        <!-- 轮播模式 -->
        <view class="section">
            <view class="section__title">轮播模式</view>
            <fanc-album
                mode="swiper"
                :images="captionImages"
                :indicator-dots="true"
                :autoplay="true"
                :interval="3000"
                :show-caption="true"
                @click="handleAlbumClick"
                @preview="handlePreview"
                @change="handleSwiperChange"
            ></fanc-album>
        </view>

        <!-- 不同类型 -->
        <view class="section">
            <view class="section__title">不同类型</view>
            <view class="subsection">
                <view class="subsection__title">主要类型</view>
                <fanc-album
                    type="primary"
                    title="主要类型"
                    :show-header="true"
                    :images="basicImages.slice(0, 3)"
                    :columns="3"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
            <view class="subsection">
                <view class="subsection__title">成功类型</view>
                <fanc-album
                    type="success"
                    title="成功类型"
                    :show-header="true"
                    :images="basicImages.slice(3, 6)"
                    :columns="3"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
            <view class="subsection">
                <view class="subsection__title">警告类型</view>
                <fanc-album
                    type="warning"
                    title="警告类型"
                    :show-header="true"
                    :images="basicImages.slice(0, 3)"
                    :columns="3"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
            <view class="subsection">
                <view class="subsection__title">危险类型</view>
                <fanc-album
                    type="danger"
                    title="危险类型"
                    :show-header="true"
                    :images="basicImages.slice(3, 6)"
                    :columns="3"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
            <view class="subsection">
                <view class="subsection__title">信息类型</view>
                <fanc-album
                    type="info"
                    title="信息类型"
                    :show-header="true"
                    :images="basicImages.slice(0, 3)"
                    :columns="3"
                    :gap="8"
                    @click="handleAlbumClick"
                    @preview="handlePreview"
                ></fanc-album>
            </view>
        </view>

        <!-- 禁用状态 -->
        <view class="section">
            <view class="section__title">禁用状态</view>
            <fanc-album
                :disabled="true"
                :images="basicImages"
                :columns="3"
                :gap="8"
                @click="handleAlbumClick"
                @preview="handlePreview"
            ></fanc-album>
        </view>

        <!-- 空状态 -->
        <view class="section">
            <view class="section__title">空状态</view>
            <fanc-album :images="[]" :columns="3" :gap="8"></fanc-album>
        </view>

        <!-- 自定义空状态 -->
        <view class="section">
            <view class="section__title">自定义空状态</view>
            <fanc-album :images="[]" :columns="3" :gap="8">
                <template #empty>
                    <view class="custom-empty">
                        <fanc-icon name="image" size="36" color="#999"></fanc-icon>
                        <text class="custom-empty__text">暂无图片，请添加</text>
                        <fanc-button size="small" type="primary" @click="handleAddImage"
                            >添加图片</fanc-button
                        >
                    </view>
                </template>
            </fanc-album>
        </view>

        <!-- 底部插槽 -->
        <view class="section">
            <view class="section__title">底部插槽</view>
            <fanc-album
                :images="basicImages.slice(0, 6)"
                :columns="3"
                :gap="8"
                @click="handleAlbumClick"
                @preview="handlePreview"
            >
                <template #footer>
                    <view class="album-footer">
                        <fanc-button size="small" type="primary" @click="handleAddImage"
                            >添加图片</fanc-button
                        >
                        <fanc-button size="small" type="danger" @click="handleClearImages"
                            >清空图片</fanc-button
                        >
                    </view>
                </template>
            </fanc-album>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            basicImages: [
                "https://picsum.photos/id/1/300/300",
                "https://picsum.photos/id/10/300/300",
                "https://picsum.photos/id/100/300/300",
                "https://picsum.photos/id/1000/300/300",
                "https://picsum.photos/id/1001/300/300",
                "https://picsum.photos/id/1002/300/300",
                "https://picsum.photos/id/1003/300/300",
                "https://picsum.photos/id/1004/300/300",
                "https://picsum.photos/id/1005/300/300",
            ],
            captionImages: [
                {
                    url: "https://picsum.photos/id/1/300/300",
                    caption: "美丽的风景",
                },
                {
                    url: "https://picsum.photos/id/10/300/300",
                    caption: "城市夜景",
                },
                {
                    url: "https://picsum.photos/id/100/300/300",
                    caption: "海边日落",
                },
                {
                    url: "https://picsum.photos/id/1000/300/300",
                    caption: "山间小路",
                },
            ],
            listImages: [
                {
                    url: "https://picsum.photos/id/1/300/300",
                    title: "风景照片",
                    description: "拍摄于2023年夏天的旅行",
                    date: "2023-07-15",
                    size: "2.5MB",
                },
                {
                    url: "https://picsum.photos/id/10/300/300",
                    title: "城市夜景",
                    description: "城市灯光璀璨的夜晚",
                    date: "2023-08-20",
                    size: "3.1MB",
                },
                {
                    url: "https://picsum.photos/id/100/300/300",
                    title: "海边日落",
                    description: "金色的阳光洒在海面上",
                    date: "2023-09-05",
                    size: "2.8MB",
                },
            ],
            waterfallImages: [
                {
                    url: "https://picsum.photos/id/1/300/400",
                    caption: "风景照片",
                    aspectRatio: 0.75,
                },
                {
                    url: "https://picsum.photos/id/10/300/300",
                    caption: "城市夜景",
                    aspectRatio: 1,
                },
                {
                    url: "https://picsum.photos/id/100/300/500",
                    caption: "海边日落",
                    aspectRatio: 0.6,
                },
                {
                    url: "https://picsum.photos/id/1000/300/350",
                    caption: "山间小路",
                    aspectRatio: 0.857,
                },
                {
                    url: "https://picsum.photos/id/1001/300/450",
                    caption: "森林风光",
                    aspectRatio: 0.667,
                },
                {
                    url: "https://picsum.photos/id/1002/300/300",
                    caption: "湖泊倒影",
                    aspectRatio: 1,
                },
            ],
        };
    },
    methods: {
        handleAlbumClick(e) {
            this.$toast.text(`点击了第 ${e.index + 1} 张图片`);
        },
        handlePreview(e) {
            console.log("预览图片", e);
        },
        handleAddImage() {
            this.$toast.success("添加图片");
        },
        handleClearImages() {
            this.$toast.warning("清空图片");
        },
        handleSwiperChange(e) {
            console.log("轮播切换", e);
        },
    },
};
</script>

<style>
.example-page {
    padding: 16px;
    background-color: #f8f8f8;
}

.header {
    margin-bottom: 20px;
}

.header__title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.header__desc {
    font-size: 14px;
    color: #666;
}

.section {
    margin-bottom: 24px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section__title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 16px;
    position: relative;
    padding-left: 12px;
}

.section__title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 4px;
    height: 16px;
    width: 4px;
    background-color: #4a6cf7;
    border-radius: 2px;
}

.subsection {
    margin-bottom: 16px;
}

.subsection:last-child {
    margin-bottom: 0;
}

.subsection__title {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
}

.custom-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 0;
}

.custom-empty__text {
    font-size: 14px;
    color: #999;
    margin: 12px 0 16px;
}

.album-footer {
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
}
</style>
