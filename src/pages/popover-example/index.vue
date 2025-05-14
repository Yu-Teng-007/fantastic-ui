<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">弹出气泡组件</text>
            <text class="example-page__header-desc">用于展示悬浮提示、菜单等临时性内容</text>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">点击元素，弹出气泡式的浮层，用于提示信息</view>
            <view class="popover-demo popover-demo--basic">
                <fanc-popover content="这是一个简单的气泡框提示内容">
                    <fanc-button size="small" type="primary">点击查看</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">基础位置</view>
            <view class="example-page__section-desc">气泡框支持四个基础方向：上、右、下、左</view>
            <view class="popover-positions">
                <fanc-popover content="顶部气泡" placement="top">
                    <fanc-button size="small">上</fanc-button>
                </fanc-popover>
                <fanc-popover content="右侧气泡" placement="right">
                    <fanc-button size="small">右</fanc-button>
                </fanc-popover>
                <fanc-popover content="底部气泡" placement="bottom">
                    <fanc-button size="small">下</fanc-button>
                </fanc-popover>
                <fanc-popover content="左侧气泡" placement="left">
                    <fanc-button size="small">左</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">扩展位置</view>
            <view class="example-page__section-desc">气泡支持12种不同的位置，可以根据实际需要选择合适的展示位置</view>

            <view class="example-page__subsection">
                <view class="example-page__subsection-title">上方位置</view>
                <view class="popover-positions">
                    <fanc-popover content="上方居左" placement="top-left">
                        <fanc-button size="small">上左</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="上方居中" placement="top">
                        <fanc-button size="small">上中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="上方居右" placement="top-right">
                        <fanc-button size="small">上右</fanc-button>
                    </fanc-popover>
                </view>
            </view>

            <view class="example-page__subsection">
                <view class="example-page__subsection-title">下方位置</view>
                <view class="popover-positions">
                    <fanc-popover content="下方居左" placement="bottom-left">
                        <fanc-button size="small">下左</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="下方居中" placement="bottom">
                        <fanc-button size="small">下中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="下方居右" placement="bottom-right">
                        <fanc-button size="small">下右</fanc-button>
                    </fanc-popover>
                </view>
            </view>

            <view class="example-page__subsection">
                <view class="example-page__subsection-title">左侧位置</view>
                <view
                    class="popover-positions"
                    style="display: flex; flex-direction: column; align-items: center; transform: translateX(60px)"
                >
                    <fanc-popover content="左侧靠上" placement="left-top">
                        <fanc-button size="small">左上</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="左侧居中" placement="left">
                        <fanc-button size="small">左中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="左侧靠下" placement="left-bottom">
                        <fanc-button size="small">左下</fanc-button>
                    </fanc-popover>
                </view>
            </view>

            <view class="example-page__subsection">
                <view class="example-page__subsection-title">右侧位置</view>
                <view
                    class="popover-positions"
                    style="display: flex; flex-direction: column; align-items: center; transform: translateX(-60px)"
                >
                    <fanc-popover content="右侧靠上" placement="right-top">
                        <fanc-button size="small">右上</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="右侧居中" placement="right">
                        <fanc-button size="small">右中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="右侧靠下" placement="right-bottom">
                        <fanc-button size="small">右下</fanc-button>
                    </fanc-popover>
                </view>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">触发方式</view>
            <view class="example-page__section-desc">气泡可以通过点击或触摸方式触发</view>
            <view class="popover-demo">
                <fanc-popover content="点击触发的气泡" trigger="click">
                    <fanc-button size="small" type="primary">点击触发</fanc-button>
                </fanc-popover>
                <fanc-popover content="触摸触发的气泡" trigger="hover">
                    <fanc-button size="small" type="success">触摸触发</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">不同主题</view>
            <view class="example-page__section-desc">气泡支持亮色和暗色两种主题</view>
            <view class="popover-demo">
                <fanc-popover content="暗色主题气泡" theme="dark">
                    <fanc-button size="small">暗色主题</fanc-button>
                </fanc-popover>
                <fanc-popover content="亮色主题气泡" theme="light">
                    <fanc-button size="small">亮色主题</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">带标题的气泡</view>
            <view class="example-page__section-desc">气泡框可以设置标题，用于强调内容的重要性</view>
            <view class="popover-demo" style="height: 100px">
                <fanc-popover style="margin-top: 80px" title="提示标题" content="这是一条带有标题的气泡提示">
                    <fanc-button size="small" type="primary">带标题气泡</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自动关闭</view>
            <view class="example-page__section-desc">设置duration属性可以控制气泡自动关闭的时间</view>
            <view class="popover-demo">
                <fanc-popover content="3秒后自动关闭" :duration="3000">
                    <fanc-button size="small" type="warning">点击查看</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">自定义内容</view>
            <view class="example-page__section-desc">通过slot可以自定义气泡的内容，如图标、列表等</view>
            <view class="popover-demo" style="height: 150px">
                <fanc-popover style="margin-top: 130px">
                    <fanc-button size="small" type="primary">自定义内容</fanc-button>
                    <template #content>
                        <view class="custom-content">
                            <view class="custom-content-item">
                                <fanc-icon name="user" size="16"></fanc-icon>
                                <text>用户信息</text>
                            </view>
                            <view class="custom-content-item">
                                <fanc-icon name="settings" size="16"></fanc-icon>
                                <text>设置</text>
                            </view>
                            <view class="custom-content-item">
                                <fanc-icon name="logout" size="16"></fanc-icon>
                                <text>退出登录</text>
                            </view>
                        </view>
                    </template>
                </fanc-popover>
            </view>
        </view>

        <view class="example-page__section">
            <view class="example-page__section-title">手动控制</view>
            <view class="example-page__section-desc">通过ref可以获取组件实例，手动控制气泡的显示和隐藏</view>
            <view
                class="popover-demo"
                style="height: 100px; display: flex; align-items: center; flex-direction: column"
            >
                <fanc-popover ref="customPopover" content="手动控制显示和隐藏">
                    <fanc-button size="small" type="primary">内容</fanc-button>
                </fanc-popover>

                <view class="control-buttons">
                    <fanc-button size="small" type="success" @click="openPopover">打开气泡</fanc-button>
                    <fanc-button size="small" type="danger" @click="closePopover">关闭气泡</fanc-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        openPopover() {
            this.$refs.customPopover.open();
        },
        closePopover() {
            this.$refs.customPopover.close();
        },
    },
};
</script>

<style lang="scss">
@import "../../styles/example-pages.scss";

.popover-demo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    margin: 20px 0;
    justify-content: center;

    &--basic {
        justify-content: center;
        padding: 20px 0;
    }
}

.popover-positions {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 40px;
    margin: 24px 0;
    padding: 0 20px;
}

.control-buttons {
    margin-top: 16px;
    display: flex;
    gap: 16px;
}

.custom-content {
    &-item {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        transition: background-color 0.3s;

        &:active {
            background-color: rgba(0, 0, 0, 0.05);
        }

        text {
            margin-left: 8px;
            font-size: 14px;
        }
    }
}

/* 添加子段落样式 */
.example-page {
    &__subsection {
        margin: 20px 0;
        padding: 0 16px;

        &-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
        }
    }
}
</style>
