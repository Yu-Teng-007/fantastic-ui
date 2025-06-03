<template>
    <view class="fanc-card" :class="cardClasses" :style="cardStyles">
        <!-- 卡片封面图 -->
        <view class="fanc-card__thumb" v-if="thumb || $slots.thumb">
            <slot name="thumb">
                <fanc-image
                    v-if="thumb"
                    :src="thumb"
                    :width="thumbWidth"
                    :height="thumbHeight"
                    :radius="thumbRadius"
                    :lazy-load="lazyLoad"
                    :show-loading="showLoading"
                    :show-error="showError"
                    :fit="thumbFit"
                ></fanc-image>
            </slot>
        </view>

        <!-- 标签 -->
        <view class="fanc-card__tag" v-if="tag || $slots.tag">
            <slot name="tag">
                <fanc-tag :type="tagType" :color="tagColor">{{ tag }}</fanc-tag>
            </slot>
        </view>

        <!-- 卡片内容 -->
        <view class="fanc-card__content" :class="{ 'fanc-card__content--centered': centered }">
            <!-- 标题 -->
            <view class="fanc-card__title" v-if="title || $slots.title">
                <slot name="title">
                    <text class="fanc-card__title-text" :style="titleStyle">{{ title }}</text>
                </slot>
            </view>

            <!-- 副标题 -->
            <view class="fanc-card__subtitle" v-if="subtitle || $slots.subtitle">
                <slot name="subtitle">
                    <text class="fanc-card__subtitle-text">{{ subtitle }}</text>
                </slot>
            </view>

            <!-- 描述 -->
            <view class="fanc-card__desc" v-if="desc || $slots.desc">
                <slot name="desc">
                    <fanc-text-ellipsis
                        v-if="desc"
                        :text="desc"
                        :rows="descRows"
                        :expand-text="expandText"
                        :collapse-text="collapseText"
                        :toggle-expanded="toggleExpandable"
                    ></fanc-text-ellipsis>
                </slot>
            </view>

            <!-- 自定义内容区域 -->
            <slot></slot>

            <!-- 价格区域 -->
            <view class="fanc-card__price-wrap" v-if="price || $slots.price || originPrice">
                <view class="fanc-card__price" v-if="price || $slots.price">
                    <slot name="price">
                        <text class="fanc-card__price-symbol" v-if="currency">{{ currency }}</text>
                        <text class="fanc-card__price-text">{{ price }}</text>
                    </slot>
                </view>
                <view class="fanc-card__origin-price" v-if="originPrice">
                    <text class="fanc-card__origin-price-symbol" v-if="currency">{{
                        currency
                    }}</text>
                    <text class="fanc-card__origin-price-text">{{ originPrice }}</text>
                </view>
            </view>
        </view>

        <!-- 底部区域 -->
        <view class="fanc-card__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </view>

        <!-- 右侧自定义内容区域 -->
        <view class="fanc-card__right" v-if="$slots.right">
            <slot name="right"></slot>
        </view>

        <!-- 底栏区域 -->
        <view class="fanc-card__bottom" v-if="$slots.bottom || showFooter">
            <slot name="bottom">
                <!-- 内置底栏默认布局 -->
                <view class="fanc-card__bottom-content" v-if="showFooter">
                    <!-- 左侧信息区域 -->
                    <view class="fanc-card__meta">
                        <!-- 头像 -->
                        <view class="fanc-card__avatar" v-if="avatar">
                            <fanc-image
                                :src="avatar"
                                width="32"
                                height="32"
                                radius="16"
                                fit="cover"
                            ></fanc-image>
                        </view>

                        <!-- 作者和时间 -->
                        <view class="fanc-card__info">
                            <text class="fanc-card__author" v-if="author">{{ author }}</text>
                            <text class="fanc-card__time" v-if="time">{{ time }}</text>
                        </view>
                    </view>

                    <!-- 右侧操作区域 -->
                    <view class="fanc-card__actions" v-if="showActions">
                        <view class="fanc-card__action" @click.stop="handleClickAction('like')">
                            <slot name="like-icon">
                                <fanc-icon
                                    :name="isLiked ? 'heart' : 'heart-o'"
                                    size="18"
                                    :color="isLiked ? likedColor : ''"
                                ></fanc-icon>
                            </slot>
                            <text class="fanc-card__action-text" v-if="likeCount !== undefined">{{
                                likeCount
                            }}</text>
                        </view>
                        <view class="fanc-card__action" @click.stop="handleClickAction('comment')">
                            <slot name="comment-icon">
                                <fanc-icon name="comment-o" size="18"></fanc-icon>
                            </slot>
                            <text
                                class="fanc-card__action-text"
                                v-if="commentCount !== undefined"
                                >{{ commentCount }}</text
                            >
                        </view>
                        <view class="fanc-card__action" @click.stop="handleClickAction('share')">
                            <slot name="share-icon">
                                <fanc-icon name="share" size="18"></fanc-icon>
                            </slot>
                            <text class="fanc-card__action-text" v-if="shareCount !== undefined">{{
                                shareCount
                            }}</text>
                        </view>
                    </view>
                </view>
            </slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "FancCard",
    props: {
        // 基础属性
        title: {
            type: String,
            default: "",
        },
        subtitle: {
            type: String,
            default: "",
        },
        desc: {
            type: String,
            default: "",
        },
        // 卡片封面图
        thumb: {
            type: String,
            default: "",
        },
        thumbWidth: {
            type: [String, Number],
            default: "100%",
        },
        thumbHeight: {
            type: [String, Number],
            default: 180,
        },
        thumbRadius: {
            type: [String, Number],
            default: 0,
        },
        thumbFit: {
            type: String,
            default: "cover",
            validator: (value) =>
                ["contain", "cover", "fill", "none", "scale-down"].includes(value),
        },
        lazyLoad: {
            type: Boolean,
            default: true,
        },
        showLoading: {
            type: Boolean,
            default: true,
        },
        showError: {
            type: Boolean,
            default: true,
        },
        // 描述相关
        descRows: {
            type: Number,
            default: 3,
        },
        expandText: {
            type: String,
            default: "展开",
        },
        collapseText: {
            type: String,
            default: "收起",
        },
        toggleExpandable: {
            type: Boolean,
            default: true,
        },
        // 标签相关
        tag: {
            type: String,
            default: "",
        },
        tagType: {
            type: String,
            default: "primary",
        },
        tagColor: {
            type: String,
            default: "",
        },
        // 价格相关
        price: {
            type: [String, Number],
            default: "",
        },
        originPrice: {
            type: [String, Number],
            default: "",
        },
        currency: {
            type: String,
            default: "¥",
        },
        // 卡片样式
        shadow: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: true,
        },
        centered: {
            type: Boolean,
            default: false,
        },
        // 底部信息
        showFooter: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: "",
        },
        author: {
            type: String,
            default: "",
        },
        time: {
            type: String,
            default: "",
        },
        // 交互相关
        showActions: {
            type: Boolean,
            default: false,
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        likedColor: {
            type: String,
            default: "var(--fanc-danger-color)",
        },
        likeCount: {
            type: [String, Number],
            default: undefined,
        },
        commentCount: {
            type: [String, Number],
            default: undefined,
        },
        shareCount: {
            type: [String, Number],
            default: undefined,
        },
        // 点击事件
        clickable: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            default: "",
        },
        // 自定义样式
        color: {
            type: String,
            default: "",
        },
        backgroundColor: {
            type: String,
            default: "",
        },
        titleColor: {
            type: String,
            default: "",
        },
    },
    computed: {
        cardClasses() {
            return {
                "fanc-card--shadow": this.shadow,
                "fanc-card--round": this.round,
                "fanc-card--border": this.border,
                "fanc-card--clickable": this.clickable,
            };
        },
        cardStyles() {
            const styles = {};

            if (this.color) {
                styles.color = this.color;
            }

            if (this.backgroundColor) {
                styles.backgroundColor = this.backgroundColor;
            }

            return styles;
        },
        titleStyle() {
            return this.titleColor ? { color: this.titleColor } : {};
        },
    },
    methods: {
        handleClick(event) {
            this.$emit("click", event);

            if (this.url && this.clickable) {
                uni.navigateTo({
                    url: this.url,
                    fail: () => {
                        this.$toast.error("页面跳转失败");
                    },
                });
            }
        },
        handleClickAction(type) {
            this.$emit(`${type}-click`);
        },
    },
};
</script>

<style>
.fanc-card {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    background-color: var(--card-bg-color, var(--white));
    border-radius: var(--card-border-radius, 8px);
    margin-bottom: var(--card-margin-bottom, 16px);
}

.fanc-card--border {
    border: 1px solid var(--card-border-color, var(--border-color));
}

.fanc-card--shadow {
    box-shadow: var(--card-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
}

.fanc-card--round {
    border-radius: var(--card-round-radius, 12px);
}

.fanc-card--clickable {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.fanc-card--clickable:active {
    transform: translateY(2px);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.fanc-card__thumb {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.fanc-card__tag {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
}

.fanc-card__content {
    padding: var(--card-content-padding, 16px);
}

.fanc-card__content--centered {
    text-align: center;
}

.fanc-card__title {
    margin-bottom: var(--card-title-margin-bottom, 8px);
}

.fanc-card__title-text {
    font-size: var(--card-title-font-size, 16px);
    font-weight: var(--card-title-font-weight, 500);
    line-height: var(--card-title-line-height, 22px);
    color: var(--card-title-color, var(--text-primary));
}

.fanc-card__subtitle {
    margin-bottom: var(--card-subtitle-margin-bottom, 8px);
}

.fanc-card__subtitle-text {
    font-size: var(--card-subtitle-font-size, 14px);
    line-height: var(--card-subtitle-line-height, 20px);
    color: var(--card-subtitle-color, var(--text-secondary));
}

.fanc-card__desc {
    margin-bottom: var(--card-desc-margin-bottom, 12px);
    font-size: var(--card-desc-font-size, 14px);
    line-height: var(--card-desc-line-height, 20px);
    color: var(--card-desc-color, var(--text-secondary));
}

.fanc-card__price-wrap {
    display: flex;
    align-items: baseline;
    margin-top: var(--card-price-margin-top, 8px);
}

.fanc-card__price {
    display: flex;
    align-items: baseline;
    font-weight: var(--card-price-font-weight, 500);
    color: var(--card-price-color, var(--fanc-danger-color));
}

.fanc-card__price-symbol {
    font-size: var(--card-price-symbol-size, 14px);
    margin-right: 2px;
}

.fanc-card__price-text {
    font-size: var(--card-price-font-size, 18px);
}

.fanc-card__origin-price {
    display: flex;
    align-items: baseline;
    margin-left: var(--card-origin-price-margin-left, 8px);
    color: var(--card-origin-price-color, var(--text-disabled));
    text-decoration: line-through;
}

.fanc-card__origin-price-symbol {
    font-size: var(--card-origin-price-symbol-size, 12px);
    margin-right: 2px;
}

.fanc-card__origin-price-text {
    font-size: var(--card-origin-price-font-size, 14px);
}

.fanc-card__footer {
    padding: var(--card-footer-padding, 12px 16px);
    border-top: 1px solid var(--card-footer-border-color, var(--border-color));
}

.fanc-card__right {
    position: absolute;
    top: 16px;
    right: 16px;
}

.fanc-card__bottom {
    padding: var(--card-bottom-padding, 12px 16px);
    border-top: 1px solid var(--card-bottom-border-color, var(--border-color));
}

.fanc-card__bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fanc-card__meta {
    display: flex;
    align-items: center;
}

.fanc-card__avatar {
    margin-right: var(--card-avatar-margin-right, 8px);
}

.fanc-card__info {
    display: flex;
    flex-direction: column;
}

.fanc-card__author {
    font-size: var(--card-author-font-size, 14px);
    font-weight: var(--card-author-font-weight, 500);
    line-height: var(--card-author-line-height, 20px);
    color: var(--card-author-color, var(--text-primary));
}

.fanc-card__time {
    font-size: var(--card-time-font-size, 12px);
    line-height: var(--card-time-line-height, 18px);
    color: var(--card-time-color, var(--text-secondary));
}

.fanc-card__actions {
    display: flex;
    align-items: center;
}

.fanc-card__action {
    display: flex;
    align-items: center;
    margin-left: var(--card-action-margin-left, 16px);
}

.fanc-card__action-text {
    margin-left: var(--card-action-text-margin-left, 4px);
    font-size: var(--card-action-text-font-size, 12px);
    color: var(--card-action-text-color, var(--text-secondary));
}
</style>
