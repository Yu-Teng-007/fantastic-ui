<template>
    <view class="container">
        <view class="header">
            <view class="title">弹出层</view>
            <view class="subtitle">弹出层用于展示临时内容，可以从多个方向弹出</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell-group>
                <fanc-cell
                    title="基础弹出层"
                    description="基础弹出层从屏幕中心淡入，点击遮罩层或关闭按钮可关闭"
                    is-link
                    @click="showBasic = true"
                />
            </fanc-cell-group>
            <fanc-popup :show="showBasic" @close="showBasic = false">
                <view class="popup-content">
                    <text class="popup-content__title">基础弹出层</text>
                    <text class="popup-content__text">这是一个居中显示的基础弹出层</text>
                    <fanc-button size="small" type="primary" @click="showBasic = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">弹出位置</view>
            <fanc-cell-group>
                <fanc-cell
                    title="顶部弹出"
                    description="弹出层从顶部滑入"
                    is-link
                    @click="showTop = true"
                />
                <fanc-cell
                    title="底部弹出"
                    description="弹出层从底部滑入"
                    is-link
                    @click="showBottom = true"
                />
                <fanc-cell
                    title="左侧弹出"
                    description="弹出层从左侧滑入"
                    is-link
                    @click="showLeft = true"
                />
                <fanc-cell
                    title="右侧弹出"
                    description="弹出层从右侧滑入"
                    is-link
                    @click="showRight = true"
                />
                <fanc-cell
                    title="全屏弹出"
                    description="弹出层占满整个屏幕"
                    is-link
                    @click="showFullscreen = true"
                />
            </fanc-cell-group>

            <fanc-popup :show="showTop" position="top" @close="showTop = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">顶部弹出</text>
                    <text class="popup-content__text">这是一个从顶部弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showTop = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <fanc-popup :show="showBottom" position="bottom" @close="showBottom = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">底部弹出</text>
                    <text class="popup-content__text">这是一个从底部弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showBottom = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <fanc-popup :show="showLeft" position="left" @close="showLeft = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">左侧弹出</text>
                    <text class="popup-content__text">这是一个从左侧弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showLeft = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <fanc-popup :show="showRight" position="right" @close="showRight = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">右侧弹出</text>
                    <text class="popup-content__text">这是一个从右侧弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showRight = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <fanc-popup :show="showFullscreen" fullscreen closeable @close="showFullscreen = false">
                <view class="popup-content popup-content--fullscreen">
                    <text class="popup-content__title">全屏弹出</text>
                    <text class="popup-content__text">这是一个全屏显示的弹出层</text>
                    <text class="popup-content__text">占满整个屏幕空间，适合展示重要内容</text>
                    <fanc-button size="small" type="primary" @click="showFullscreen = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">全屏弹出</view>
            <fanc-cell-group>
                <fanc-cell
                    title="全屏从底部弹出"
                    description="默认全屏弹出方式，从底部滑入"
                    is-link
                    @click="showFullscreenBottom = true"
                />
                <fanc-cell
                    title="全屏从顶部弹出"
                    description="全屏从顶部滑入"
                    is-link
                    @click="showFullscreenTop = true"
                />
                <fanc-cell
                    title="全屏中心弹出"
                    description="全屏从中心缩放弹出"
                    is-link
                    @click="showFullscreenCenter = true"
                />
                <fanc-cell
                    title="全屏带关闭图标"
                    description="全屏弹出层可以添加关闭图标"
                    is-link
                    @click="showFullscreenWithContent = true"
                />
                <fanc-cell
                    title="纯按钮关闭"
                    description="全屏弹出层只通过按钮关闭，无关闭图标"
                    is-link
                    @click="showFullscreenButtonClose = true"
                />
            </fanc-cell-group>

            <!-- 全屏从底部弹出 -->
            <fanc-popup
                :show="showFullscreenBottom"
                fullscreen
                fullscreenAnimDirection="bottom"
                @close="showFullscreenBottom = false"
            >
                <view class="popup-content popup-content--fullscreen-demo">
                    <text class="popup-content__title popup-content__title--large">从底部滑入</text>
                    <text class="popup-content__text">这是一个从底部滑入的全屏弹出层</text>
                    <text class="popup-content__text">底部滑入是全屏弹出的默认方式</text>
                    <fanc-button type="primary" @click="showFullscreenBottom = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <!-- 全屏从顶部弹出 -->
            <fanc-popup
                :show="showFullscreenTop"
                fullscreen
                fullscreenAnimDirection="top"
                @close="showFullscreenTop = false"
            >
                <view class="popup-content popup-content--fullscreen-demo">
                    <text class="popup-content__title popup-content__title--large">从顶部滑入</text>
                    <text class="popup-content__text">这是一个从顶部滑入的全屏弹出层</text>
                    <text class="popup-content__text">适合展示通知、提醒等重要信息</text>
                    <fanc-button type="primary" @click="showFullscreenTop = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <!-- 全屏中心弹出 -->
            <fanc-popup
                :show="showFullscreenCenter"
                fullscreen
                fullscreenAnimDirection="center"
                @close="showFullscreenCenter = false"
            >
                <view class="popup-content popup-content--fullscreen-demo">
                    <text class="popup-content__title popup-content__title--large"
                        >中心缩放弹出</text
                    >
                    <text class="popup-content__text">这是一个从中心缩放弹出的全屏弹出层</text>
                    <text class="popup-content__text">适合强调内容的重要性</text>
                    <fanc-button type="primary" @click="showFullscreenCenter = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>

            <!-- 全屏带丰富内容 -->
            <fanc-popup
                :show="showFullscreenWithContent"
                fullscreen
                closeable
                @close="showFullscreenWithContent = false"
            >
                <view class="popup-content popup-content--fullscreen-demo">
                    <text class="popup-content__title popup-content__title--large">全屏弹出层</text>
                    <text class="popup-content__text">全屏弹出层可以展示更加丰富的内容</text>
                    <text class="popup-content__text"
                        >适合用于重要信息展示、引导页、广告页等场景</text
                    >
                    <view class="popup-content__image">
                        <view class="image-placeholder">
                            <text>图片内容区域</text>
                        </view>
                    </view>
                    <fanc-button type="primary" @click="showFullscreenWithContent = false"
                        >我知道了</fanc-button
                    >
                </view>
            </fanc-popup>

            <!-- 纯按钮关闭的全屏弹窗 -->
            <fanc-popup
                :show="showFullscreenButtonClose"
                fullscreen
                :overlayClosable="false"
                @close="showFullscreenButtonClose = false"
            >
                <view class="popup-content popup-content--fullscreen-demo">
                    <text class="popup-content__title popup-content__title--large">纯按钮关闭</text>
                    <text class="popup-content__text">这个全屏弹出层没有关闭图标</text>
                    <text class="popup-content__text">只能通过按钮关闭，且点击遮罩层不会关闭</text>
                    <view class="popup-content__image">
                        <view class="image-placeholder">
                            <text>重要内容区域</text>
                        </view>
                    </view>
                    <fanc-button type="primary" @click="showFullscreenButtonClose = false"
                        >确认并关闭</fanc-button
                    >
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">直角和关闭图标</view>
            <fanc-cell-group>
                <fanc-cell
                    title="直角弹出层带关闭图标"
                    description="可以为弹出层添加直角样式和关闭图标"
                    is-link
                    @click="showRoundWithClose = true"
                />
            </fanc-cell-group>
            <fanc-popup
                :show="showRoundWithClose"
                position="bottom"
                :round="false"
                closeable
                @close="showRoundWithClose = false"
            >
                <view class="popup-content popup-content--with-close">
                    <text class="popup-content__title">直角弹出层</text>
                    <text class="popup-content__text">这是一个带直角和关闭图标的弹出层</text>
                    <text class="popup-content__text">点击右上角的关闭图标可以关闭弹出层</text>
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">关闭图标位置</view>
            <fanc-cell-group>
                <fanc-cell
                    title="自定义关闭图标位置"
                    description="关闭图标可以设置在弹出层的四个角落"
                    is-link
                    @click="showIconPositionDemo = true"
                />
            </fanc-cell-group>
            <fanc-popup
                :show="showIconPositionDemo"
                position="center"
                closeable
                :closeIconPosition="closeIconPosition"
                @close="showIconPositionDemo = false"
            >
                <view class="popup-content">
                    <text class="popup-content__title">关闭图标位置</text>
                    <text class="popup-content__text">当前位置：{{ closeIconPosition }}</text>
                    <view class="popup-content__buttons">
                        <fanc-button
                            size="mini"
                            type="primary"
                            @click="changeCloseIconPosition('top-left')"
                            >左上角</fanc-button
                        >
                        <fanc-button
                            size="mini"
                            type="success"
                            @click="changeCloseIconPosition('top-right')"
                            >右上角</fanc-button
                        >
                        <fanc-button
                            size="mini"
                            type="warning"
                            @click="changeCloseIconPosition('bottom-left')"
                            >左下角</fanc-button
                        >
                        <fanc-button
                            size="mini"
                            type="danger"
                            @click="changeCloseIconPosition('bottom-right')"
                            >右下角</fanc-button
                        >
                    </view>
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">自定义样式</view>
            <fanc-cell-group>
                <fanc-cell
                    title="自定义弹出层样式"
                    description="通过customStyle属性可以自定义弹出层的尺寸和样式"
                    is-link
                    @click="showCustomStyle = true"
                />
            </fanc-cell-group>
            <fanc-popup
                :show="showCustomStyle"
                position="center"
                :customStyle="{ width: '80%', height: '300px', padding: '20px' }"
                @close="showCustomStyle = false"
            >
                <view class="popup-content popup-content--custom">
                    <text class="popup-content__title">自定义样式</text>
                    <text class="popup-content__text">这是一个使用自定义样式的弹出层</text>
                    <text class="popup-content__text"
                        >可以通过customStyle属性自定义弹出层的宽度、高度等样式</text
                    >
                    <fanc-button size="small" type="primary" @click="showCustomStyle = false"
                        >关闭</fanc-button
                    >
                </view>
            </fanc-popup>
        </view>

        <view class="section">
            <view class="section-title">使用v-model控制</view>
            <fanc-cell-group>
                <fanc-cell
                    title="使用v-model控制弹窗"
                    description="可以使用v-model实现弹出层的双向数据绑定"
                    is-link
                    @click="showVModel = true"
                />
            </fanc-cell-group>
            <fanc-popup v-model="showVModel" position="center" closeable>
                <view class="popup-content">
                    <text class="popup-content__title">v-model控制</text>
                    <text class="popup-content__text">这个示例使用v-model实现双向绑定</text>
                    <text class="popup-content__text">点击按钮或遮罩层都可以关闭弹窗</text>
                    <fanc-button size="small" type="primary" @click="showVModel = false"
                        >关闭弹窗</fanc-button
                    >
                </view>
            </fanc-popup>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础弹出层
            showBasic: false,

            // 弹出位置相关
            showTop: false,
            showBottom: false,
            showLeft: false,
            showRight: false,
            showFullscreen: false,

            // 圆角和关闭图标
            showRoundWithClose: false,

            // 关闭图标位置
            showIconPositionDemo: false,
            closeIconPosition: "top-right",

            // 自定义样式
            showCustomStyle: false,

            // v-model示例
            showVModel: false,

            // 全屏弹出
            showFullscreenWithContent: false,

            // 全屏弹出
            showFullscreenBottom: false,
            showFullscreenTop: false,
            showFullscreenCenter: false,

            // 纯按钮关闭
            showFullscreenButtonClose: false,
        };
    },
    methods: {
        // 改变关闭图标位置
        changeCloseIconPosition(position) {
            this.closeIconPosition = position;
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

.popup-content {
    padding: 24px;
    text-align: center;
}

.popup-content__title {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #323233;
}

.popup-content__text {
    display: block;
    font-size: 0.875rem;
    color: #646566;
    margin-bottom: 16px;
}

.popup-content__buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin: 12px 0;
}

.popup-content--position {
    padding: 24px;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.popup-content--with-close {
    padding: 24px;
    padding-top: 40px;
}

.popup-content--custom {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.popup-content--fullscreen {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.popup-content--fullscreen-demo {
    padding: 24px;
    text-align: center;
}

.popup-content__title--large {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #323233;
}

.popup-content__image {
    margin-bottom: 24px;
}

.image-placeholder {
    width: 100%;
    height: 200px;
    background-color: #f2f2f2;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
