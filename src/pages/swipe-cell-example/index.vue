<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">滑动单元格</text>
            <text class="example-page__header-desc">可以左右滑动来展示操作按钮的单元格组件</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">左滑显示删除按钮，点击单元格关闭</view>
            <fanc-swipe-cell right-width="70">
                <fanc-cell title="基础用法" content="向左滑动" />
                <template #right>
                    <view class="swipe-cell-right delete-button">删除</view>
                </template>
            </fanc-swipe-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">左右滑动</view>
            <view class="example-page__section-desc">可以同时设置左滑和右滑两个方向的按钮</view>
            <fanc-swipe-cell left-width="80" right-width="140">
                <fanc-cell title="左右滑动" content="支持多个按钮" />
                <template #left>
                    <view class="swipe-cell-left collect-button">收藏</view>
                </template>
                <template #right>
                    <view class="swipe-cell-right edit-button">编辑</view>
                    <view class="swipe-cell-right delete-button">删除</view>
                </template>
            </fanc-swipe-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义内容</view>
            <view class="example-page__section-desc">可以在滑动单元格中放入任意内容</view>
            <fanc-swipe-cell right-width="70">
                <view class="custom-content">
                    <image
                        class="custom-image"
                        src="/static/placeholder.jpg"
                        mode="aspectFill"
                    ></image>
                    <view class="custom-info">
                        <text class="custom-title">自定义内容</text>
                        <text class="custom-desc">你可以放入任何自定义内容</text>
                    </view>
                </view>
                <template #right>
                    <view class="swipe-cell-right delete-button">删除</view>
                </template>
            </fanc-swipe-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">禁用状态</view>
            <view class="example-page__section-desc">设置disabled属性可以禁用滑动</view>
            <fanc-swipe-cell right-width="70" disabled>
                <fanc-cell title="禁用状态" content="无法滑动" />
                <template #right>
                    <view class="swipe-cell-right delete-button">删除</view>
                </template>
            </fanc-swipe-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">异步关闭</view>
            <view class="example-page__section-desc">点击删除后，触发异步操作，完成后关闭</view>
            <fanc-swipe-cell right-width="70" ref="asyncCell">
                <fanc-cell title="异步操作" content="点击删除触发" />
                <template #right>
                    <view class="swipe-cell-right delete-button" @click="handleAsyncDelete"
                        >删除</view
                    >
                </template>
            </fanc-swipe-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">事件监听</view>
            <view class="example-page__section-desc">可以监听单元格的点击、打开和关闭事件</view>
            <fanc-swipe-cell
                right-width="70"
                ref="eventCell"
                @open="handleCellOpen"
                @close="handleCellClose"
                @click="handleCellClick"
            >
                <fanc-cell title="事件监听" :content="eventContent" />
                <template #right>
                    <view class="swipe-cell-right delete-button">删除</view>
                </template>
            </fanc-swipe-cell>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">滑动阈值</view>
            <view class="example-page__section-desc">设置threshold属性可自定义滑动阈值比例</view>
            <fanc-swipe-cell right-width="70" :threshold="0.5">
                <fanc-cell title="滑动阈值" content="需要滑动超过50%才会触发" />
                <template #right>
                    <view class="swipe-cell-right delete-button">删除</view>
                </template>
            </fanc-swipe-cell>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            eventContent: "滑动触发事件",
        };
    },
    methods: {
        handleAsyncDelete() {
            uni.showLoading({
                title: "删除中...",
            });

            // 模拟异步操作
            setTimeout(() => {
                uni.hideLoading();
                this.$refs.asyncCell.close();
                uni.showToast({
                    title: "删除成功",
                    icon: "success",
                });
            }, 1000);
        },
        handleCellOpen(event) {
            this.eventContent = `已打开 ${event.position} 侧边栏`;
        },
        handleCellClose() {
            this.eventContent = "已关闭侧边栏";
        },
        handleCellClick() {
            this.eventContent = "点击了单元格";
        },
    },
};
</script>

<style lang="scss">
// 左侧操作按钮样式
.swipe-cell-left {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #ffffff;
    text-align: center;
    padding: 0 15px;
    font-size: 14px;
}

// 右侧操作按钮样式
.swipe-cell-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #ffffff;
    text-align: center;
    padding: 0 15px;
    font-size: 14px;
}

// 删除按钮
.delete-button {
    background-color: #ff4d4f;
}

// 编辑按钮
.edit-button {
    background-color: #1989fa;
}

// 收藏按钮
.collect-button {
    background-color: #ff9800;
}

// 自定义内容
.custom-content {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background-color: #ffffff;
}

.custom-image {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 12px;
}

.custom-info {
    flex: 1;
}

.custom-title {
    font-size: 16px;
    color: #323233;
    margin-bottom: 4px;
}

.custom-desc {
    font-size: 12px;
    color: #969799;
}
</style>
