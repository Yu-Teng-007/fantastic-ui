<template>
    <view
        class="fanc-noticebar"
        :class="[
            `fanc-noticebar--${type}`,
            {
                'fanc-noticebar--scrollable': scrollable && shouldScroll,
                'fanc-noticebar--with-icon': showIcon,
                'fanc-noticebar--with-action': !!actionText,
                'fanc-noticebar--with-close': closable,
                'fanc-noticebar--multiline': multiLine,
                'is-playing': playing && autoPlay,
            },
        ]"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <!-- 左侧图标 -->
        <view v-if="showIcon" class="fanc-noticebar__icon">
            <fanc-icon :name="computedIconName" :size="16"></fanc-icon>
        </view>

        <!-- 内容区域 -->
        <view
            class="fanc-noticebar__content"
            :class="{ 'fanc-noticebar__content--scroll': scrollable && shouldScroll }"
            ref="content"
            @click="handleClick"
        >
            <view
                class="fanc-noticebar__content-inner"
                :class="{
                    'fanc-noticebar__content-inner--scroll': scrollable && shouldScroll,
                    'fanc-noticebar__content-inner--scrolling': scrollable && shouldScroll && !isScrollPaused,
                }"
                :style="scrollStyle"
                :data-content="Array.isArray(text) ? text[currentIndex] : text"
                ref="contentInner"
            >
                <view v-if="Array.isArray(text)" class="fanc-noticebar__list">
                    <view
                        v-for="(item, index) in text"
                        :key="index"
                        class="fanc-noticebar__item"
                        :class="{ 'fanc-noticebar__item--active': currentIndex === index && autoPlay }"
                    >
                        <rich-text v-if="enableHtml" :nodes="item"></rich-text>
                        <text v-else>{{ item }}</text>
                    </view>
                </view>
                <template v-else>
                    <rich-text v-if="enableHtml" :nodes="text"></rich-text>
                    <text v-else>{{ text }}</text>
                </template>
            </view>
        </view>

        <!-- 额外操作按钮 -->
        <view v-if="actionText" class="fanc-noticebar__action" @click="handleAction">
            <text class="fanc-noticebar__action-text">{{ actionText }}</text>
        </view>

        <!-- 播放控制按钮 -->
        <view v-if="showPlayBtn && Array.isArray(text)" class="fanc-noticebar__play" @click="togglePlay">
            <fanc-icon :name="playing ? 'pause' : 'play'" :size="14"></fanc-icon>
        </view>

        <!-- 关闭按钮 -->
        <view v-if="closable" class="fanc-noticebar__close" @click="handleClose">
            <fanc-icon name="times" :size="14"></fanc-icon>
        </view>
    </view>
</template>

<script>
/**
 * fanc-noticebar 公告栏
 * @description 用于展示系统公告、消息通知、活动提醒等
 * @property {String|Array} text - 公告内容，可以是字符串或字符串数组
 * @property {String} type - 公告类型，可选值为 info/success/warning/error
 * @property {Boolean} showIcon - 是否显示图标
 * @property {String} iconName - 自定义图标名称
 * @property {Boolean} closable - 是否显示关闭按钮
 * @property {Boolean} scrollable - 是否开启滚动播放
 * @property {Number} scrollSpeed - 滚动速度，单位为像素/秒
 * @property {Boolean} autoPlay - 是否自动播放，仅在text为数组时有效
 * @property {Number} playInterval - 播放间隔，单位为毫秒
 * @property {Boolean} showPlayBtn - 是否显示播放控制按钮
 * @property {Boolean} multiLine - 是否支持多行展示
 * @property {String} actionText - 操作按钮文本
 * @property {Boolean} enableHtml - 是否支持HTML内容
 * @event {Function} click - 点击公告内容时触发
 * @event {Function} close - 关闭公告时触发
 * @event {Function} action - 点击操作按钮时触发
 */
import {
    NOTICEBAR_TYPES,
    NOTICEBAR_ICON_MAP,
    NOTICEBAR_SCROLL_SPEED,
    NOTICEBAR_PLAY_INTERVAL,
} from "@/configs/noticebar";

export default {
    name: "fanc-noticebar",

    props: {
        // 公告内容，可以是字符串或字符串数组
        text: {
            type: [String, Array],
            default: "",
            required: true,
        },
        // 公告类型
        type: {
            type: String,
            default: "info",
            validator: (value) => NOTICEBAR_TYPES.includes(value),
        },
        // 是否显示图标
        showIcon: {
            type: Boolean,
            default: true,
        },
        // 自定义图标
        iconName: {
            type: String,
            default: "",
        },
        // 是否显示关闭按钮
        closable: {
            type: Boolean,
            default: false,
        },
        // 是否开启滚动播放
        scrollable: {
            type: Boolean,
            default: false,
        },
        // 滚动速度
        scrollSpeed: {
            type: Number,
            default: NOTICEBAR_SCROLL_SPEED,
        },
        // 是否自动播放
        autoPlay: {
            type: Boolean,
            default: true,
        },
        // 播放间隔
        playInterval: {
            type: Number,
            default: NOTICEBAR_PLAY_INTERVAL,
        },
        // 是否显示播放控制按钮
        showPlayBtn: {
            type: Boolean,
            default: false,
        },
        // 是否支持多行展示
        multiLine: {
            type: Boolean,
            default: false,
        },
        // 操作按钮文本
        actionText: {
            type: String,
            default: "",
        },
        // 是否支持HTML内容
        enableHtml: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            currentIndex: 0, // 当前播放索引
            playing: true, // 是否正在播放
            playTimer: null, // 播放定时器
            shouldScroll: false, // 是否需要滚动
            contentWidth: 0, // 内容宽度
            containerWidth: 0, // 容器宽度
            isScrollPaused: false, // 是否暂停滚动
        };
    },

    computed: {
        // 根据类型获取图标
        defaultIconName() {
            return NOTICEBAR_ICON_MAP[this.type] || NOTICEBAR_ICON_MAP.info;
        },

        // 实际使用的图标
        computedIconName() {
            // 获取props中的iconName，避免使用this.iconName造成递归
            const propIconName = this.$options.propsData.iconName;
            return propIconName || this.defaultIconName;
        },

        // 滚动样式
        scrollStyle() {
            if (!this.scrollable || !this.shouldScroll) {
                return {};
            }

            // 计算动画时长：根据内容长度和速度设置
            const duration = this.contentWidth / this.scrollSpeed;

            return {
                animationDuration: `${duration}s`,
                animationPlayState: this.isScrollPaused ? "paused" : "running",
            };
        },
    },

    watch: {
        // 监听内容变化
        text() {
            this.$nextTick(() => {
                this.checkScrollable();
            });
        },

        // 监听滚动属性变化
        scrollable(val) {
            this.$nextTick(() => {
                if (val) {
                    this.checkScrollable();
                } else {
                    this.shouldScroll = false;
                }
            });
        },

        // 监听播放状态变化
        playing(val) {
            if (val && Array.isArray(this.text) && this.autoPlay) {
                this.startPlay();
            } else {
                this.stopPlay();
            }
        },

        // 监听自动播放属性变化
        autoPlay(val) {
            if (val && Array.isArray(this.text) && this.playing) {
                this.startPlay();
            } else {
                this.stopPlay();
            }
        },
    },

    mounted() {
        // 检查是否需要滚动显示
        this.$nextTick(() => {
            this.checkScrollable();
        });

        // 如果是数组内容且自动播放，则开始播放
        if (Array.isArray(this.text) && this.autoPlay) {
            this.startPlay();
        }
    },

    beforeDestroy() {
        // 确保停止播放
        this.stopPlay();
    },

    methods: {
        // 检查是否需要滚动显示
        checkScrollable() {
            if (!this.scrollable || !this.$refs.content || !this.$refs.contentInner) {
                this.shouldScroll = false;
                return;
            }

            this.containerWidth = this.$refs.content.offsetWidth || 0;
            this.contentWidth = this.$refs.contentInner.offsetWidth || 0;

            // 当内容宽度超过容器宽度时才需要滚动
            this.shouldScroll = this.contentWidth > this.containerWidth;
            console.log("🚀 ~ checkScrollable ~ this.shouldScroll:", this.shouldScroll);
            console.log(
                "🚀 ~ checkScrollable ~ contentWidth:",
                this.contentWidth,
                "containerWidth:",
                this.containerWidth
            );
        },

        // 鼠标进入时暂停滚动
        handleMouseEnter() {
            if (this.scrollable && this.shouldScroll) {
                this.isScrollPaused = true;
            }
            if (Array.isArray(this.text) && this.autoPlay) {
                this.stopPlay();
            }
        },

        // 鼠标离开时继续滚动
        handleMouseLeave() {
            if (this.scrollable && this.shouldScroll) {
                this.isScrollPaused = false;
            }
            if (Array.isArray(this.text) && this.autoPlay && this.playing) {
                this.startPlay();
            }
        },

        // 开始播放
        startPlay() {
            this.stopPlay();

            if (!Array.isArray(this.text) || this.text.length <= 1) return;

            this.playTimer = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.text.length;
            }, this.playInterval);
        },

        // 停止播放
        stopPlay() {
            if (this.playTimer) {
                clearInterval(this.playTimer);
                this.playTimer = null;
            }
        },

        // 切换播放状态
        togglePlay() {
            this.playing = !this.playing;
        },

        // 处理操作按钮点击
        handleAction(event) {
            this.$emit("action", event);
        },

        // 处理关闭按钮点击
        handleClose(event) {
            this.$emit("close", event);
        },

        // 处理内容点击
        handleClick(event) {
            this.$emit("click", event);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

// 公告栏基础样式
.fanc-noticebar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 16px;
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    word-wrap: break-word;
    background-color: $noticebar-info-bg;
    border: 1px solid $noticebar-info-border;
    border-radius: 4px;
    transition: all 0.3s;

    // 图标区域
    &__icon {
        flex-shrink: 0;
        margin-right: 8px;
        line-height: 1;
        color: $noticebar-info-color;
    }

    // 内容区域
    &__content {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        position: relative;

        // 滚动效果容器
        &--scroll {
            overflow: hidden;
        }
    }

    // 内容内层
    &__content-inner {
        display: inline-block;
        white-space: nowrap;

        // 滚动效果内容
        &--scroll {
            display: inline-block;
            padding-right: 16px;

            // 创建滚动内容的伪元素，实现连续滚动效果
            &::after {
                content: attr(data-content);
                display: inline-block;
                padding-left: 16px;
            }
        }

        // 添加滚动动画
        &--scrolling {
            animation: fanc-noticebar-scroll linear infinite both;
            animation-play-state: running;
        }
    }

    // 列表模式
    &__list {
        display: flex;
        flex-direction: column;
    }

    // 列表项
    &__item {
        display: none;
        animation: fadeIn 0.5s;

        &--active {
            display: block;
        }
    }

    // 操作按钮
    &__action {
        flex-shrink: 0;
        margin-left: 16px;
        cursor: pointer;

        &-text {
            color: $noticebar-action-color;
            font-size: 14px;
        }

        &:hover {
            background-color: $noticebar-action-hover-bg;
            border-radius: 4px;
        }
    }

    // 播放控制按钮
    &__play {
        flex-shrink: 0;
        margin-left: 12px;
        cursor: pointer;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $noticebar-info-color;
        border-radius: 50%;

        &:hover {
            background-color: $noticebar-action-hover-bg;
        }
    }

    // 关闭按钮
    &__close {
        flex-shrink: 0;
        margin-left: 12px;
        cursor: pointer;
        color: $noticebar-close-color;

        &:hover {
            opacity: 0.8;
        }
    }

    // 多行模式
    &--multiline {
        .fanc-noticebar__content-inner {
            white-space: normal;
        }

        .fanc-noticebar__item {
            white-space: normal;
        }
    }

    // 信息类型样式
    &--info {
        background-color: $noticebar-info-bg;
        border-color: $noticebar-info-border;

        .fanc-noticebar__icon {
            color: $noticebar-info-color;
        }
    }

    // 成功类型样式
    &--success {
        background-color: $noticebar-success-bg;
        border-color: $noticebar-success-border;

        .fanc-noticebar__icon,
        .fanc-noticebar__play {
            color: $noticebar-success-color;
        }
    }

    // 警告类型样式
    &--warning {
        background-color: $noticebar-warning-bg;
        border-color: $noticebar-warning-border;

        .fanc-noticebar__icon,
        .fanc-noticebar__play {
            color: $noticebar-warning-color;
        }
    }

    // 错误类型样式
    &--error {
        background-color: $noticebar-error-bg;
        border-color: $noticebar-error-border;

        .fanc-noticebar__icon,
        .fanc-noticebar__play {
            color: $noticebar-error-color;
        }
    }
}

// 淡入动画
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

// 旋转动画
@keyframes fanc-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes fanc-noticebar-scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>
