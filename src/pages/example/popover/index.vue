<template>
    <view class="container">
        <view class="header">
            <view class="title">弹出气泡组件</view>
            <view class="subtitle">用于展示悬浮提示、菜单等临时性内容</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="popover-demo popover-demo--basic">
                <fanc-popover content="这是一个简单的气泡框提示内容">
                    <fanc-button plain type="primary">点击查看</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="section">
            <view class="section-title">基础位置</view>
            <view class="popover-positions" style="margin: 50px 0px">
                <fanc-popover content="右侧气泡" placement="right">
                    <fanc-button type="primary" plain>右</fanc-button>
                </fanc-popover>
                <fanc-popover content="顶部气泡" placement="top">
                    <fanc-button type="primary" plain>上</fanc-button>
                </fanc-popover>
                <fanc-popover content="底部气泡" placement="bottom">
                    <fanc-button type="primary" plain>下</fanc-button>
                </fanc-popover>
                <fanc-popover content="左侧气泡" placement="left">
                    <fanc-button type="primary" plain>左</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="section">
            <view class="section-title">扩展位置</view>

            <view class="subsection">
                <view class="subsection-title">上方位置</view>
                <view class="popover-positions">
                    <fanc-popover content="上方居左" placement="top-left">
                        <fanc-button type="primary" plain>上左</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="上方居中" placement="top">
                        <fanc-button type="primary" plain>上中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="上方居右" placement="top-right">
                        <fanc-button type="primary" plain>上右</fanc-button>
                    </fanc-popover>
                </view>
            </view>

            <view class="subsection">
                <view class="subsection-title">下方位置</view>
                <view class="popover-positions">
                    <fanc-popover content="下方居左" placement="bottom-left">
                        <fanc-button type="primary" plain>下左</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="下方居中" placement="bottom">
                        <fanc-button type="primary" plain>下中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="下方居右" placement="bottom-right">
                        <fanc-button type="primary" plain>下右</fanc-button>
                    </fanc-popover>
                </view>
            </view>

            <view class="subsection">
                <view class="subsection-title">左侧位置</view>
                <view
                    class="popover-positions"
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        transform: translateX(60px);
                    "
                >
                    <fanc-popover content="左侧靠上" placement="left-top">
                        <fanc-button type="primary" plain>左上</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="左侧居中" placement="left">
                        <fanc-button type="primary" plain>左中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="左侧靠下" placement="left-bottom">
                        <fanc-button type="primary" plain>左下</fanc-button>
                    </fanc-popover>
                </view>
            </view>

            <view class="subsection">
                <view class="subsection-title">右侧位置</view>
                <view
                    class="popover-positions"
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        transform: translateX(-60px);
                    "
                >
                    <fanc-popover content="右侧靠上" placement="right-top">
                        <fanc-button type="primary" plain>右上</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="右侧居中" placement="right">
                        <fanc-button type="primary" plain>右中</fanc-button>
                    </fanc-popover>
                    <fanc-popover content="右侧靠下" placement="right-bottom">
                        <fanc-button type="primary" plain>右下</fanc-button>
                    </fanc-popover>
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section-title">触发方式</view>
            <view class="popover-demo">
                <fanc-popover content="点击触发的气泡" trigger="click">
                    <fanc-button type="primary" plain>点击触发</fanc-button>
                </fanc-popover>
                <fanc-popover content="触摸触发的气泡" trigger="hover">
                    <fanc-button type="primary" plain>触摸触发</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="section">
            <view class="section-title">不同主题</view>
            <view class="popover-demo">
                <fanc-popover content="暗色主题气泡" theme="dark">
                    <fanc-button type="primary" plain>暗色主题</fanc-button>
                </fanc-popover>
                <fanc-popover content="亮色主题气泡" theme="light">
                    <fanc-button type="primary" plain>亮色主题</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="section">
            <view class="section-title">带标题的气泡</view>
            <view class="popover-demo" style="height: 80px">
                <fanc-popover
                    style="margin-top: 40px"
                    title="提示标题"
                    content="这是一条带有标题的气泡提示"
                >
                    <fanc-button type="primary" plain>带标题气泡</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自动关闭</view>
            <view class="popover-demo">
                <fanc-popover content="3秒后自动关闭" :duration="3000">
                    <fanc-button type="warning" plain>点击查看</fanc-button>
                </fanc-popover>
            </view>
        </view>

        <view class="section">
            <view class="section-title">自定义内容</view>
            <view class="popover-demo" style="height: 120px">
                <fanc-popover style="margin-top: 80px">
                    <fanc-button type="primary" plain>自定义内容</fanc-button>
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

        <view class="section">
            <view class="section-title">手动控制</view>
            <view
                class="popover-demo"
                style="height: 100px; display: flex; align-items: center; flex-direction: column"
            >
                <fanc-popover ref="customPopover" content="手动控制显示和隐藏">
                    <fanc-button plain type="primary">内容</fanc-button>
                </fanc-popover>

                <view class="control-buttons">
                    <fanc-button plain type="success" @click="openPopover">打开气泡</fanc-button>
                    <fanc-button plain type="danger" @click="closePopover">关闭气泡</fanc-button>
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

.subsection {
    margin: 20px 0;
    padding: 0 16px;
}

.subsection-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
}

.popover-demo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    margin: 20px 0;
    justify-content: center;
}

.popover-demo--basic {
    justify-content: center;
    padding: 20px 0;
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

.custom-content-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    transition: background-color 0.3s;
}

.custom-content-item:active {
    background-color: rgba(0, 0, 0, 0.05);
}

.custom-content-item text {
    margin-left: 8px;
    font-size: 14px;
}
</style>
