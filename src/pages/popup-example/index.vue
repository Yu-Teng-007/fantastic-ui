<template>
    <view class="popup-example">
        <view class="popup-example__section">
            <view class="popup-example__section-title">基础用法</view>
            <fanc-button type="primary" @click="showBasic = true">显示弹出层</fanc-button>
            <fanc-popup :show="showBasic" @close="showBasic = false">
                <view class="popup-content">
                    <text class="popup-content__title">基础弹出层</text>
                    <text class="popup-content__text">这是一个居中显示的基础弹出层</text>
                    <fanc-button size="small" type="primary" @click="showBasic = false">关闭</fanc-button>
                </view>
            </fanc-popup>
        </view>

        <view class="popup-example__section">
            <view class="popup-example__section-title">弹出位置</view>
            <view class="popup-example__button-group">
                <fanc-button type="primary" size="small" @click="showPosition('top')">顶部弹出</fanc-button>
                <fanc-button type="success" size="small" @click="showPosition('bottom')">底部弹出</fanc-button>
                <fanc-button type="warning" size="small" @click="showPosition('left')">左侧弹出</fanc-button>
                <fanc-button type="danger" size="small" @click="showPosition('right')">右侧弹出</fanc-button>
            </view>

            <fanc-popup :show="showTop" position="top" @close="showTop = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">顶部弹出</text>
                    <text class="popup-content__text">这是一个从顶部弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showTop = false">关闭</fanc-button>
                </view>
            </fanc-popup>

            <fanc-popup :show="showBottom" position="bottom" @close="showBottom = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">底部弹出</text>
                    <text class="popup-content__text">这是一个从底部弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showBottom = false">关闭</fanc-button>
                </view>
            </fanc-popup>

            <fanc-popup :show="showLeft" position="left" @close="showLeft = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">左侧弹出</text>
                    <text class="popup-content__text">这是一个从左侧弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showLeft = false">关闭</fanc-button>
                </view>
            </fanc-popup>

            <fanc-popup :show="showRight" position="right" @close="showRight = false">
                <view class="popup-content popup-content--position">
                    <text class="popup-content__title">右侧弹出</text>
                    <text class="popup-content__text">这是一个从右侧弹出的弹出层</text>
                    <fanc-button size="small" type="primary" @click="showRight = false">关闭</fanc-button>
                </view>
            </fanc-popup>
        </view>

        <view class="popup-example__section">
            <view class="popup-example__section-title">圆角和关闭图标</view>
            <fanc-button type="primary" @click="showRoundWithClose = true">圆角弹出层带关闭图标</fanc-button>
            <fanc-popup
                :show="showRoundWithClose"
                position="bottom"
                round
                closeable
                @close="showRoundWithClose = false"
            >
                <view class="popup-content popup-content--with-close">
                    <text class="popup-content__title">圆角弹出层</text>
                    <text class="popup-content__text">这是一个带圆角和关闭图标的弹出层</text>
                    <text class="popup-content__text">点击右上角的关闭图标可以关闭弹出层</text>
                </view>
            </fanc-popup>
        </view>

        <view class="popup-example__section">
            <view class="popup-example__section-title">关闭图标位置</view>
            <fanc-button type="primary" @click="showIconPositionDemo = true">自定义关闭图标位置</fanc-button>
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
                        <fanc-button size="mini" type="primary" @click="changeCloseIconPosition('top-left')"
                            >左上角</fanc-button
                        >
                        <fanc-button size="mini" type="success" @click="changeCloseIconPosition('top-right')"
                            >右上角</fanc-button
                        >
                        <fanc-button size="mini" type="warning" @click="changeCloseIconPosition('bottom-left')"
                            >左下角</fanc-button
                        >
                        <fanc-button size="mini" type="danger" @click="changeCloseIconPosition('bottom-right')"
                            >右下角</fanc-button
                        >
                    </view>
                </view>
            </fanc-popup>
        </view>

        <view class="popup-example__section">
            <view class="popup-example__section-title">自定义样式</view>
            <fanc-button type="primary" @click="showCustomStyle = true">自定义弹出层样式</fanc-button>
            <fanc-popup
                :show="showCustomStyle"
                position="center"
                :customStyle="{ width: '80%', height: '300px', padding: '20px' }"
                @close="showCustomStyle = false"
            >
                <view class="popup-content popup-content--custom">
                    <text class="popup-content__title">自定义样式</text>
                    <text class="popup-content__text">这是一个使用自定义样式的弹出层</text>
                    <text class="popup-content__text">可以通过customStyle属性自定义弹出层的宽度、高度等样式</text>
                    <fanc-button size="small" type="primary" @click="showCustomStyle = false">关闭</fanc-button>
                </view>
            </fanc-popup>
        </view>

        <view class="popup-example__section">
            <view class="popup-example__section-title">使用v-model控制</view>
            <fanc-button type="primary" @click="showVModel = true">使用v-model控制弹窗</fanc-button>
            <fanc-popup v-model="showVModel" position="center" closeable>
                <view class="popup-content">
                    <text class="popup-content__title">v-model控制</text>
                    <text class="popup-content__text">这个示例使用v-model实现双向绑定</text>
                    <text class="popup-content__text">点击按钮或遮罩层都可以关闭弹窗</text>
                    <fanc-button size="small" type="primary" @click="showVModel = false">关闭弹窗</fanc-button>
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

            // 圆角和关闭图标
            showRoundWithClose: false,

            // 关闭图标位置
            showIconPositionDemo: false,
            closeIconPosition: "top-right",

            // 自定义样式
            showCustomStyle: false,

            // v-model示例
            showVModel: false,
        };
    },
    methods: {
        // 显示不同位置的弹出层
        showPosition(position) {
            switch (position) {
                case "top":
                    this.showTop = true;
                    break;
                case "bottom":
                    this.showBottom = true;
                    break;
                case "left":
                    this.showLeft = true;
                    break;
                case "right":
                    this.showRight = true;
                    break;
            }
        },

        // 改变关闭图标位置
        changeCloseIconPosition(position) {
            this.closeIconPosition = position;
        },
    },
};
</script>

<style lang="scss">
.popup-example {
    padding: 16px;
    background-color: #f7f8fa;
    min-height: 100vh;

    &__header {
        margin-bottom: 24px;
        text-align: center;
        padding: 20px 0;
    }

    &__title {
        display: block;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 8px;
        color: #323233;
    }

    &__desc {
        display: block;
        font-size: 0.875rem;
        color: #969799;
    }

    &__section {
        margin-bottom: 24px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    }

    &__section-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: #323233;
        position: relative;
        padding-left: 12px;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            height: 16px;
            width: 4px;
            background-color: #007bff;
            border-radius: 2px;
        }
    }

    &__button-group {
        display: flex;
        flex-wrap: wrap;
        margin: -6px;

        .fanc-button {
            margin: 6px;
        }
    }
}

.popup-content {
    padding: 24px;
    text-align: center;

    &__title {
        display: block;
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: #323233;
    }

    &__text {
        display: block;
        font-size: 0.875rem;
        color: #646566;
        margin-bottom: 16px;
    }

    &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 12px -6px;

        .fanc-button {
            margin: 6px;
        }
    }

    &--position {
        padding: 24px;
        min-height: 30vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &--with-close {
        padding: 24px;
        padding-top: 40px;
    }

    &--custom {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
