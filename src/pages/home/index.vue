<template>
    <view class="example-page">
        <!-- 页面顶部 -->
        <view class="header">
            <image class="header__logo" src="@/static/logo.png" mode="aspectFit"></image>
            <text class="header__title">Fantastic UI</text>
            <text class="header__desc">现代、高效、美观的移动端组件库</text>
        </view>

        <!-- 组件分类导航 -->
        <view class="category-nav">
            <view
                class="category-nav__item"
                v-for="(category, index) in categories"
                :key="index"
                @click="scrollToCategory(category.id)"
            >
                <view class="category-nav__icon">
                    <fanc-icon :name="category.icon" size="20" color="#4a6cf7"></fanc-icon>
                </view>
                <text class="category-nav__name">{{ category.name }}</text>
            </view>
        </view>

        <!-- 基础输入组件 -->
        <fanc-cell-group
            title="基础输入"
            description="文本输入与表单交互组件"
            :id="categories[0].id"
        >
            <fanc-cell title="按钮" is-link url="/pages/example/button/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="square" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="输入框" is-link url="/pages/example/field/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="keyboard" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="表单" is-link url="/pages/example/form/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="clipboard-list" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="搜索" is-link url="/pages/example/search/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="search" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="复选框" is-link url="/pages/example/checkbox/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="check-square" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="单选框" is-link url="/pages/example/radio/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="dot-circle" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="步进器" is-link url="/pages/example/stepper/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="plus-minus" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="数字键盘" is-link url="/pages/example/number-keyboard/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="calculator" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="文件上传" is-link url="/pages/example/uploader/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="upload" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 选择与日期组件 -->
        <fanc-cell-group
            title="选择与日期"
            description="多元化的选择器和日期相关组件"
            :id="categories[1].id"
        >
            <fanc-cell title="选择器" is-link url="/pages/example/picker/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="list-ul" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="级联选择" is-link url="/pages/example/cascader/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="sitemap" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="日期选择器" is-link url="/pages/example/date-picker/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="calendar-days" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="日历" is-link url="/pages/example/calendar/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="calendar" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 展示组件 -->
        <fanc-cell-group
            title="内容展示"
            description="用于信息呈现和内容展示的组件"
            :id="categories[2].id"
        >
            <fanc-cell title="单元格" is-link url="/pages/example/cell/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="table-cells" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="图标" is-link url="/pages/example/icon/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="icons" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="图片" is-link url="/pages/example/image/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="image" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="公告栏" is-link url="/pages/example/noticebar/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="bell" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="下拉菜单" is-link url="/pages/example/dropdown-menu/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="caret-down" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="评分" is-link url="/pages/example/rate/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="star" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="选项卡" is-link url="/pages/example/tabs/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="folder-open" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="标签栏" is-link url="/pages/example/tabbar/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="menu" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 反馈组件 -->
        <fanc-cell-group
            title="操作反馈"
            description="用户交互与操作反馈相关组件"
            :id="categories[3].id"
        >
            <fanc-cell title="弹出层" is-link url="/pages/example/popup/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="layer-group" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="弹出气泡" is-link url="/pages/example/popover/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="message" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="消息通知" is-link url="/pages/example/message/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="comment" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="轻提示" is-link url="/pages/example/toast/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="comment-dots" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="对话框" is-link url="/pages/example/dialog/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="comments" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="动作面板" is-link url="/pages/example/action-sheet/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="list" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 高级交互 -->
        <fanc-cell-group
            title="高级交互"
            description="提供复杂交互体验的功能组件"
            :id="categories[4].id"
        >
            <fanc-cell title="滑动单元格" is-link url="/pages/example/swipe-cell/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="arrows-left-right" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>

            <fanc-cell title="签名" is-link url="/pages/example/signature/index" center>
                <template #icon>
                    <view class="component-icon">
                        <fanc-icon name="signature" size="18"></fanc-icon>
                    </view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 页脚 -->
        <view class="footer">
            <text class="footer__text">Fantastic UI - v1.0.0</text>
            <text class="footer__copyright">© 2023 Fantastic Team</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Fantastic UI",
            categories: [
                { id: "basic-inputs", name: "基础输入", icon: "keyboard" },
                { id: "selection", name: "选择日期", icon: "calendar-days" },
                { id: "display", name: "内容展示", icon: "image" },
                { id: "feedback", name: "操作反馈", icon: "comment" },
                { id: "advanced", name: "高级交互", icon: "wand-magic-sparkles" },
            ],
            iconList: [
                // 基础图标
                "home",
                "user",
                "cog",
                "bell",
                "heart",
                "star",
                "check",
                "times",
                "search",
                "envelope",
                "phone",
                "lock",
                "unlock",
                "key",
                "link",
                // 文件相关
                "file",
                "folder",
                "folder-open",
                "file-pdf",
                "file-image",
                "file-alt",
                // 箭头
                "arrow-up",
                "arrow-down",
                "arrow-left",
                "arrow-right",
                "angle-up",
                "angle-down",
                "angle-left",
                "angle-right",
                // 媒体控制
                "play",
                "pause",
                "stop",
                "volume-up",
                "volume-down",
                "volume-mute",
                // 形状
                "circle",
                "square",
                "triangle",
                "pentagon",
                "hexagon",
                // 通信
                "comment",
                "comments",
                "message",
                "comment-dots",
                // 设备
                "laptop",
                "mobile",
                "tablet",
                "desktop",
                "camera",
                "headphones",
                // 图表
                "chart-bar",
                "chart-line",
                "chart-pie",
                "chart-area",
                // 网络
                "wifi",
                "signal",
                "globe",
                "cloud",
                "server",
                // 电商
                "shopping-cart",
                "gift",
                "tag",
                "barcode",
                "credit-card",
                // 编辑
                "edit",
                "copy",
                "paste",
                "cut",
                "trash",
                "save",
                // 互动
                "thumbs-up",
                "thumbs-down",
                "share",
                "bookmark",
                "flag",
                // 新增图标
                "wand-magic-sparkles",
            ],
        };
    },
    computed: {
        randomIcon() {
            return (index) => {
                return this.iconList[Math.floor(Math.random() * this.iconList.length)];
            };
        },
    },
    onLoad() {},
    methods: {
        scrollToCategory(id) {
            // 滚动到指定分类
            const query = uni.createSelectorQuery();
            query.select(`#${id}`).boundingClientRect();
            query.selectViewport().scrollOffset();
            query.exec(function (res) {
                if (res && res[0]) {
                    uni.pageScrollTo({
                        scrollTop: res[0].top + res[1].scrollTop - 10,
                        duration: 300,
                    });
                }
            });
        },
    },
};
</script>

<style lang="scss">
page {
    background-color: #f8f9fc;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --primary-color: #4a6cf7;
    --text-color: #333333;
    --text-secondary: #666666;
    --text-light: #999999;
    --border-color: #ebedf0;
    --white: #ffffff;
    --shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
    box-sizing: border-box;
}

.example-page {
    padding: 16px 12px 40px;
}

/* 头部样式 */
.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #1d3cbd 0%, #494e63 100%);
    border-radius: 12px;
    box-shadow: var(--shadow);

    &__logo {
        width: 76px;
        height: 76px;
        margin-bottom: 16px;
        border-radius: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__title {
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 8px;
        letter-spacing: 0.5px;
    }

    &__desc {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        text-align: center;
    }
}

/* 分类导航样式 */
.category-nav {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding: 12px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow);

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 18%;
        margin-bottom: 8px;
        padding: 8px 0;
        border-radius: 8px;
        transition: all 0.3s;

        &:active {
            background-color: rgba(74, 108, 247, 0.05);
        }
    }

    &__icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(74, 108, 247, 0.1);
        margin-bottom: 6px;
    }

    &__name {
        font-size: 12px;
        color: var(--text-color);
    }
}

/* 组件图标样式 */
.component-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    vertical-align: middle;
}

/* 页脚样式 */
.footer {
    margin-top: 30px;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__text {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 4px;
    }

    &__copyright {
        font-size: 12px;
        color: var(--text-light);
    }
}

/* 单元格组样式 */
::v-deep .fanc-cell-group {
    margin-bottom: 16px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow);
}

/* 调整单元格样式 */
::v-deep .fanc-cell {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    position: relative;
    min-height: 52px;

    &:active {
        background-color: #f9f9fb;
    }

    &::after {
        content: "";
        position: absolute;
        left: 16px;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: var(--border-color);
        transform: scaleY(0.5);
    }

    &:last-child::after {
        display: none;
    }
}

/* 调整单元格组标题样式 */
::v-deep .fanc-cell-group__header {
    padding: 16px 16px 8px;
}

::v-deep .fanc-cell-group__title {
    font-size: 16px;
    font-weight: 600;
    color: #4d4d57;
}

::v-deep .fanc-cell-group__description {
    font-size: 12px;
    color: var(--text-light);
    margin-top: 2px;
}

/* 调整单元格内容对齐 */
::v-deep .fanc-cell__left {
    display: flex;
    align-items: center;
}

::v-deep .fanc-cell__title {
    font-weight: 500;
    display: flex;
    align-items: center;
    height: 28px;
}

/* 优化图标和文字对齐 */
::v-deep .fanc-cell__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
}

/* 确保单元格完全垂直居中 */
::v-deep .fanc-cell__value {
    display: flex;
    align-items: center;
}
</style>
