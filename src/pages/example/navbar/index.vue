<template>
    <view class="example-page">
        <!-- 固定导航栏示例（可切换显示） -->
        <fanc-navbar
            v-if="isFixedNavbarVisible"
            title="固定导航栏"
            left-text="返回"
            right-text="关闭"
            fixed
            :offset-top="44"
            background="#007bff"
            title-color="#fff"
            left-text-color="#fff"
            right-text-color="#fff"
            arrow-color="#fff"
            @click-left="onClickLeft"
            @click-right="hideFixedNavbar"
        />

        <view class="section">
            <view class="section__title">基础用法</view>
            <view class="description">默认显示返回箭头、返回文字和标题</view>
            <fanc-navbar title="标题" @click-left="onClickLeft" />
        </view>

        <view class="section">
            <view class="section__title">显示右侧内容</view>
            <fanc-navbar
                title="标题"
                right-text="按钮"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </view>

        <view class="section">
            <view class="section__title">自定义导航栏样式</view>
            <fanc-navbar
                title="自定义颜色"
                background="#007bff"
                title-color="#fff"
                arrow-color="#fff"
                left-text-color="#fff"
                @click-left="onClickLeft"
            />
        </view>

        <view class="section">
            <view class="section__title">标题文本省略</view>
            <view class="description">可以设置标题的最大宽度和最大字符数，超出部分将被省略</view>

            <view class="subsection">
                <view class="subsection-title">最大宽度限制</view>
                <fanc-navbar
                    title="这是一个很长的标题文本，会根据最大宽度自动省略"
                    :title-max-width="150"
                    @click-left="onClickLeft"
                />
            </view>

            <view class="subsection">
                <view class="subsection-title">最大字符数限制</view>
                <fanc-navbar
                    title="这是一个很长的标题文本，会根据最大字符数自动省略"
                    :title-max-length="10"
                    @click-left="onClickLeft"
                />
            </view>

            <view class="subsection">
                <view class="subsection-title">省略号在开头</view>
                <fanc-navbar
                    title="这是一个很长的标题文本，省略号将显示在开头"
                    :title-max-length="10"
                    title-ellipsis="start"
                    @click-left="onClickLeft"
                />
            </view>

            <view class="subsection">
                <view class="subsection-title">省略号在中间</view>
                <fanc-navbar
                    title="这是一个很长的标题文本，省略号将显示在中间位置"
                    :title-max-length="10"
                    title-ellipsis="middle"
                    @click-left="onClickLeft"
                />
            </view>
        </view>

        <view class="section">
            <view class="section__title">使用图标</view>
            <fanc-navbar
                title="导航栏图标"
                left-icon="home"
                right-icon="user"
                :show-left-text="false"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </view>

        <view class="section">
            <view class="section__title">使用插槽自定义内容</view>
            <fanc-navbar title="自定义内容">
                <template #left>
                    <view class="navbar-icon-wrapper" @click="onClickLeft">
                        <fanc-icon name="arrow-left" size="16" />
                        <text class="custom-text">自定义</text>
                    </view>
                </template>
                <template #right>
                    <view class="navbar-icon-wrapper" @click="onClickRight">
                        <fanc-icon name="ellipsis-v" size="20" />
                    </view>
                </template>
            </fanc-navbar>
        </view>

        <view class="section">
            <view class="section__title">固定在顶部</view>
            <view class="description"
                >设置fixed属性后，导航栏会固定在页面顶部，不会随页面滚动而移动。</view
            >
            <button class="example-btn" @click="toggleFixedNavbar">
                {{ isFixedNavbarVisible ? "隐藏" : "显示" }}固定导航栏
            </button>

            <view v-if="!isFixedNavbarVisible" class="fixed-tip">
                点击上方按钮显示固定导航栏，然后滚动页面查看效果
            </view>
            <view v-else class="fixed-tip active">
                固定导航栏已显示在页面顶部，请尝试滚动页面查看效果
            </view>

            <!-- 添加一个滚动区域，以便更好地演示固定效果 -->
            <view class="scroll-demo">
                <view class="scroll-item" v-for="i in 10" :key="i">
                    这是第 {{ i }} 行内容，向下滚动查看固定导航栏效果
                </view>
            </view>
        </view>

        <view class="section">
            <view class="section__title">多级导航示例</view>
            <view class="subsection">
                <fanc-navbar title="商品详情" :border="false" @click-left="onClickLeft" />
                <view class="tabs">
                    <view
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="tab-item"
                        :class="{ active: activeTab === index }"
                        @click="activeTab = index"
                    >
                        {{ tab }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isFixedNavbarVisible: false,
            activeTab: 0,
            tabs: ["商品", "详情", "评论", "推荐"],
        };
    },
    methods: {
        onClickLeft() {
            this.$toast.text("点击返回");
        },
        onClickRight() {
            this.$toast.text("点击右侧按钮");
        },
        toggleFixedNavbar() {
            this.isFixedNavbarVisible = !this.isFixedNavbarVisible;
        },
        showFixedNavbar() {
            this.isFixedNavbarVisible = true;
        },
        hideFixedNavbar() {
            this.isFixedNavbarVisible = false;
        },
    },
};
</script>

<style>
.example-page {
    padding: 20px;
    background-color: #f8f9fa;
}

.section {
    margin-bottom: 32px;
}

.section__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #323233;
}

.description {
    margin-bottom: 16px;
    font-size: 14px;
    color: #969799;
}

.subsection {
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.subsection:last-child {
    margin-bottom: 0;
}

.subsection-title {
    font-size: 14px;
    color: #969799;
    padding: 8px 16px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ebedf0;
}

.example-btn {
    margin-top: 8px;
    margin-bottom: 16px;
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    padding: 8px 16px;
    border: none;
}

.navbar-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
}

.custom-text {
    margin-left: 4px;
    font-size: 14px;
}

.tabs {
    display: flex;
    padding: 0 16px;
    border-bottom: 1px solid #ebedf0;
    background-color: #fff;
}

.tab-item {
    position: relative;
    flex: 1;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
    color: #646566;
}

.tab-item.active {
    color: #007bff;
}

.tab-item.active:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    width: 40px;
    height: 2px;
    background-color: #007bff;
    transform: translateX(-50%);
}

.scroll-demo {
    height: 200px;
    overflow-y: auto;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    background-color: #fff;
}

.scroll-item {
    padding: 16px;
    border-bottom: 1px solid #ebedf0;
    color: #323233;
}

.scroll-item:last-child {
    border-bottom: none;
}

/* 提示样式 */
.fixed-tip {
    margin: 12px 0;
    padding: 8px 12px;
    background-color: #f8f9fa;
    border-left: 3px solid #6c757d;
    color: #6c757d;
    font-size: 14px;
    border-radius: 4px;
}

.fixed-tip.active {
    background-color: #e8f4ff;
    border-left-color: #007bff;
    color: #007bff;
}
</style>
