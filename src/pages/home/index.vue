<template>
    <view class="example-page">
        <!-- 页面顶部 -->
        <view class="header">
            <image class="header__logo" src="@/static/logo.png" mode="aspectFit"></image>
            <text class="header__title">Fantastic UI</text>
            <text class="header__desc">现代、高效、美观的移动端组件库</text>
        </view>

        <!-- 搜索框 -->
        <view class="search-container">
            <fanc-search
                v-model="searchText"
                placeholder="搜索组件"
                shape="round"
                :clearable="true"
                background="transparent"
                @input="onSearch"
                @clear="clearSearch"
            ></fanc-search>
        </view>

        <!-- 组件分类导航 -->
        <scroll-view class="category-nav" scroll-x>
            <view
                class="category-nav__item"
                v-for="(category, index) in categories"
                :key="index"
                :class="{ 'category-nav__item--active': activeCategory === category.id }"
                @click="scrollToCategory(category.id)"
            >
                <view class="category-nav__icon">
                    <fanc-icon
                        :name="category.icon"
                        size="20"
                        :color="activeCategory === category.id ? '#ffffff' : '#4a6cf7'"
                    ></fanc-icon>
                </view>
                <text class="category-nav__name">{{ category.name }}</text>
            </view>
        </scroll-view>

        <view v-if="searchText && filteredComponents.length === 0" class="empty-search">
            <fanc-icon name="search" size="40" color="#ddd"></fanc-icon>
            <text class="empty-search__text">未找到匹配的组件</text>
        </view>

        <!-- 搜索结果 -->
        <view v-if="searchText && filteredComponents.length > 0" class="search-results">
            <fanc-cell-group
                title="搜索结果"
                :description="`找到 ${filteredComponents.length} 个相关组件`"
            >
                <fanc-cell
                    v-for="(item, index) in filteredComponents"
                    :key="index"
                    :title="item.title"
                    is-link
                    :url="item.url"
                    center
                >
                    <template #icon>
                        <view class="component-icon">
                            <fanc-icon :name="item.icon" size="18"></fanc-icon>
                        </view>
                    </template>
                </fanc-cell>
            </fanc-cell-group>
        </view>

        <!-- 组件列表（搜索为空时显示） -->
        <template v-if="!searchText">
            <!-- 核心组件 -->
            <fanc-cell-group title="核心组件" description="最常用的基础组件" :id="categories[0].id">
                <view class="grid-layout">
                    <view
                        class="grid-item"
                        v-for="(item, index) in coreComponents"
                        :key="index"
                        @click="navigateTo(item.url)"
                    >
                        <view class="grid-item__icon">
                            <fanc-icon :name="item.icon" size="24"></fanc-icon>
                        </view>
                        <text class="grid-item__title">{{ item.title }}</text>
                    </view>
                </view>
            </fanc-cell-group>

            <!-- 表单组件 -->
            <fanc-cell-group
                title="表单控件"
                description="数据采集与用户输入组件"
                :id="categories[1].id"
            >
                <fanc-cell
                    v-for="(item, index) in formComponents"
                    :key="index"
                    :title="item.title"
                    is-link
                    :url="item.url"
                    center
                >
                    <template #icon>
                        <view class="component-icon">
                            <fanc-icon :name="item.icon" size="18"></fanc-icon>
                        </view>
                    </template>
                </fanc-cell>
            </fanc-cell-group>

            <!-- 导航与布局 -->
            <fanc-cell-group
                title="导航与布局"
                description="页面结构和导航相关组件"
                :id="categories[2].id"
            >
                <fanc-cell
                    v-for="(item, index) in navigationComponents"
                    :key="index"
                    :title="item.title"
                    is-link
                    :url="item.url"
                    center
                >
                    <template #icon>
                        <view class="component-icon">
                            <fanc-icon :name="item.icon" size="18"></fanc-icon>
                        </view>
                    </template>
                </fanc-cell>
            </fanc-cell-group>

            <!-- 数据展示 -->
            <fanc-cell-group
                title="数据展示"
                description="用于呈现数据的组件"
                :id="categories[3].id"
            >
                <fanc-cell
                    v-for="(item, index) in displayComponents"
                    :key="index"
                    :title="item.title"
                    is-link
                    :url="item.url"
                    center
                >
                    <template #icon>
                        <view class="component-icon">
                            <fanc-icon :name="item.icon" size="18"></fanc-icon>
                        </view>
                    </template>
                </fanc-cell>
            </fanc-cell-group>

            <!-- 反馈与通知 -->
            <fanc-cell-group
                title="反馈与通知"
                description="交互反馈与信息提示组件"
                :id="categories[4].id"
            >
                <fanc-cell
                    v-for="(item, index) in feedbackComponents"
                    :key="index"
                    :title="item.title"
                    is-link
                    :url="item.url"
                    center
                >
                    <template #icon>
                        <view class="component-icon">
                            <fanc-icon :name="item.icon" size="18"></fanc-icon>
                        </view>
                    </template>
                </fanc-cell>
            </fanc-cell-group>

            <!-- 多媒体 -->
            <fanc-cell-group title="多媒体" description="图片与媒体相关组件" :id="categories[5].id">
                <fanc-cell
                    v-for="(item, index) in mediaComponents"
                    :key="index"
                    :title="item.title"
                    is-link
                    :url="item.url"
                    center
                >
                    <template #icon>
                        <view class="component-icon">
                            <fanc-icon :name="item.icon" size="18"></fanc-icon>
                        </view>
                    </template>
                </fanc-cell>
            </fanc-cell-group>
        </template>

        <!-- 页脚 -->
        <view class="footer">
            <text class="footer__text">Fantastic UI - v1.0.0</text>
            <text class="footer__copyright">© 2023-2024 Fantastic Team</text>
        </view>

        <!-- 返回顶部按钮 -->
        <fanc-backtop
            :visibility-height="300"
            :duration="500"
            :bottom="bottom"
            type="primary"
            icon="arrow-up"
            :icon-size="20"
            round
            shadow
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Fantastic UI",
            searchText: "",
            activeCategory: "core",
            bottom: "80px", // 返回顶部按钮距离底部距离
            categories: [
                { id: "core", name: "核心组件", icon: "cube" },
                { id: "form", name: "表单控件", icon: "keyboard" },
                { id: "navigation", name: "导航布局", icon: "compass" },
                { id: "display", name: "数据展示", icon: "chart-bar" },
                { id: "feedback", name: "反馈通知", icon: "bell" },
                { id: "media", name: "多媒体", icon: "photo-film" },
            ],
            // 核心组件 - 网格布局
            coreComponents: [
                { title: "按钮", icon: "square", url: "/pages/example/button/index" },
                { title: "图标", icon: "icons", url: "/pages/example/icon/index" },
                { title: "单元格", icon: "table-cells", url: "/pages/example/cell/index" },
                { title: "标签", icon: "tags", url: "/pages/example/tag/index" },
                { title: "宫格", icon: "th", url: "/pages/example/grid/index" },
                { title: "分割线", icon: "minus", url: "/pages/example/divider/index" },
                { title: "颜色", icon: "palette", url: "/pages/example/color/index" },
                { title: "主题", icon: "sun", url: "/pages/example/theme/index" },
            ],
            // 表单组件
            formComponents: [
                { title: "输入框", icon: "keyboard", url: "/pages/example/field/index" },
                { title: "表单", icon: "clipboard-list", url: "/pages/example/form/index" },
                { title: "搜索", icon: "search", url: "/pages/example/search/index" },
                { title: "复选框", icon: "check-square", url: "/pages/example/checkbox/index" },
                { title: "单选框", icon: "dot-circle", url: "/pages/example/radio/index" },
                { title: "开关", icon: "toggle-on", url: "/pages/example/switch/index" },
                { title: "步进器", icon: "plus-minus", url: "/pages/example/stepper/index" },
                { title: "滑块", icon: "sliders-h", url: "/pages/example/slider/index" },
                {
                    title: "数字键盘",
                    icon: "calculator",
                    url: "/pages/example/number-keyboard/index",
                },
                { title: "文件上传", icon: "upload", url: "/pages/example/uploader/index" },
                { title: "评分", icon: "star", url: "/pages/example/rate/index" },
                { title: "签名", icon: "signature", url: "/pages/example/signature/index" },
                { title: "选择器", icon: "list-ul", url: "/pages/example/picker/index" },
                { title: "级联选择", icon: "sitemap", url: "/pages/example/cascader/index" },
                {
                    title: "日期选择器",
                    icon: "calendar-days",
                    url: "/pages/example/date-picker/index",
                },
                { title: "时间选择器", icon: "clock", url: "/pages/example/time-picker/index" },
                { title: "日历", icon: "calendar", url: "/pages/example/calendar/index" },
            ],
            // 导航与布局组件
            navigationComponents: [
                { title: "导航栏", icon: "bars", url: "/pages/example/navbar/index" },
                { title: "标签栏", icon: "tablet", url: "/pages/example/tabbar/index" },
                { title: "标签页", icon: "folder", url: "/pages/example/tabs/index" },
                { title: "面包屑", icon: "map-signs", url: "/pages/example/breadcrumb/index" },
                { title: "索引列表", icon: "list-ol", url: "/pages/example/indexes/index" },
                { title: "分页", icon: "ellipsis-h", url: "/pages/example/pagination/index" },
                { title: "步骤条", icon: "shoe-prints", url: "/pages/example/steps/index" },
                { title: "返回顶部", icon: "arrow-up", url: "/pages/example/backtop/index" },
                { title: "侧边栏", icon: "bars", url: "/pages/example/sidebar/index" },
                { title: "布局", icon: "table", url: "/pages/example/layout/index" },
                { title: "页脚", icon: "copyright", url: "/pages/example/footer/index" },
            ],
            // 数据展示组件
            displayComponents: [
                { title: "卡片", icon: "credit-card", url: "/pages/example/card/index" },
                { title: "轮播", icon: "images", url: "/pages/example/swipe/index" },
                { title: "空状态", icon: "inbox", url: "/pages/example/empty/index" },
                { title: "折叠面板", icon: "angle-down", url: "/pages/example/collapse/index" },
                { title: "列表", icon: "list", url: "/pages/example/list/index" },
                { title: "表格", icon: "table", url: "/pages/example/table/index" },
                { title: "高亮文本", icon: "highlighter", url: "/pages/example/highlight/index" },
                {
                    title: "文本省略",
                    icon: "align-left",
                    url: "/pages/example/text-ellipsis/index",
                },
                { title: "倒计时", icon: "clock", url: "/pages/example/count-down/index" },
                {
                    title: "数字滚动",
                    icon: "sort-numeric-up",
                    url: "/pages/example/count-to/index",
                },
                { title: "进度条", icon: "spinner", url: "/pages/example/progress/index" },
                { title: "环形进度条", icon: "circle-notch", url: "/pages/example/circle/index" },
                { title: "骨架屏", icon: "window-restore", url: "/pages/example/skeleton/index" },
                { title: "公告栏", icon: "bell", url: "/pages/example/noticebar/index" },
                {
                    title: "下拉菜单",
                    icon: "caret-down",
                    url: "/pages/example/dropdown-menu/index",
                },
                { title: "筛选栏", icon: "filter", url: "/pages/example/filter-bar/index" },
            ],
            // 反馈组件
            feedbackComponents: [
                {
                    title: "警告提示",
                    icon: "exclamation-triangle",
                    url: "/pages/example/alert/index",
                },
                { title: "弹出层", icon: "layer-group", url: "/pages/example/popup/index" },
                { title: "弹出气泡", icon: "message", url: "/pages/example/popover/index" },
                { title: "消息通知", icon: "comment", url: "/pages/example/message/index" },
                { title: "消息提示", icon: "bell", url: "/pages/example/notify/index" },
                { title: "轻提示", icon: "comment-dots", url: "/pages/example/toast/index" },
                { title: "对话框", icon: "comments", url: "/pages/example/dialog/index" },
                { title: "动作面板", icon: "list", url: "/pages/example/action-sheet/index" },
                {
                    title: "滑动单元格",
                    icon: "arrows-left-right",
                    url: "/pages/example/swipe-cell/index",
                },
                { title: "引导", icon: "lightbulb", url: "/pages/example/guide/index" },
            ],
            // 媒体组件
            mediaComponents: [
                { title: "图片", icon: "image", url: "/pages/example/image/index" },
                { title: "图片预览", icon: "images", url: "/pages/example/image-preview/index" },
                { title: "相册", icon: "photo-film", url: "/pages/example/album/index" },
                { title: "视频播放器", icon: "video", url: "/pages/example/video/index" },
                { title: "音频播放器", icon: "music", url: "/pages/example/audio/index" },
            ],
        };
    },
    computed: {
        allComponents() {
            return [
                ...this.coreComponents,
                ...this.formComponents,
                ...this.navigationComponents,
                ...this.displayComponents,
                ...this.feedbackComponents,
                ...this.mediaComponents,
            ];
        },
        filteredComponents() {
            if (!this.searchText) return [];

            return this.allComponents.filter((item) =>
                item.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
    },
    onPageScroll(e) {
        // 监听页面滚动，更新当前分类标识
        this.updateActiveCategory(e.scrollTop);
    },
    methods: {
        scrollToCategory(id) {
            // 设置活跃分类
            this.activeCategory = id;

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
        navigateTo(url) {
            uni.navigateTo({
                url: url,
            });
        },
        onSearch() {
            // 搜索逻辑
        },
        clearSearch() {
            this.searchText = "";
        },
        updateActiveCategory(scrollTop) {
            // 根据滚动位置更新当前活跃分类
            const query = uni.createSelectorQuery();

            this.categories.forEach((category) => {
                query.select(`#${category.id}`).boundingClientRect();
            });

            query.exec((res) => {
                if (!res || !res[0]) return;

                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    if (!element) continue;

                    // 当元素进入视口或接近顶部时，将其设置为当前活跃分类
                    if (element.top <= 100) {
                        this.activeCategory = this.categories[i].id;
                    }
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
    --primary-light: rgba(74, 108, 247, 0.1);
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
    padding: 28px 0;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #4a6cf7 0%, #1d3cbd 100%);
    border-radius: 16px;
    box-shadow: var(--shadow);

    &__logo {
        width: 68px;
        height: 68px;
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

/* 搜索框容器样式 */
.search-container {
    margin-bottom: 16px;
    padding: 0 4px;

    ::v-deep .fanc-search {
        background-color: transparent;

        .fanc-search__content {
            background-color: var(--white);
            box-shadow: var(--shadow);
        }
    }
}

/* 移除自定义搜索框样式 */
.search-box {
    display: none;
}

/* 分类导航样式 */
.category-nav {
    display: flex;
    white-space: nowrap;
    margin-bottom: 16px;
    padding: 4px;

    &__item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 16px;
        margin: 0 4px;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: var(--shadow);
        transition: all 0.3s;

        &--active {
            background-color: var(--primary-color);
            box-shadow: 0 4px 8px rgba(74, 108, 247, 0.2);

            .category-nav__name {
                color: #fff;
            }
        }
    }

    &__icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: var(--primary-light);
        margin-bottom: 6px;

        .category-nav__item--active & {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

    &__name {
        font-size: 12px;
        color: var(--text-color);
    }
}

/* 网格布局样式 */
.grid-layout {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
}

.grid-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;

    &:active {
        opacity: 0.7;
    }

    &__icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background-color: var(--primary-light);
        margin-bottom: 8px;
        color: var(--primary-color);
    }

    &__title {
        font-size: 12px;
        color: var(--text-color);
    }
}

/* 空搜索结果样式 */
.empty-search {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__text {
        margin-top: 12px;
        font-size: 14px;
        color: var(--text-light);
    }
}

/* 组件图标样式 */
.component-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    margin-right: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: var(--primary-light);
    color: var(--primary-color);
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
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);
}

/* 调整单元格样式 */
::v-deep .fanc-cell {
    padding: 14px 16px;
    min-height: 56px;

    &:active {
        background-color: #f9f9fb;
    }

    &::after {
        left: 16px;
    }
}

/* 调整单元格组标题样式 */
::v-deep .fanc-cell-group__header {
    padding: 16px 16px 8px;
}

::v-deep .fanc-cell-group__title {
    font-size: 18px;
    font-weight: 600;
    color: #4d4d57;
}

::v-deep .fanc-cell-group__description {
    font-size: 12px;
    color: var(--text-light);
    margin-top: 4px;
}

/* 调整单元格内容对齐 */
::v-deep .fanc-cell__title {
    font-size: 15px;
    font-weight: 400;
}
</style>
