<template>
    <view
        :class="[
            'fanc-collapse-item',
            { 'fanc-collapse-item--expanded': isExpanded },
            { 'fanc-collapse-item--disabled': disabled },
            { 'fanc-collapse-item--border': index !== 0 && parent.border },
        ]"
    >
        <view
            class="fanc-collapse-item__header"
            :style="leftIcon ? { paddingLeft: '16px' } : {}"
            @click="onClick"
        >
            <view v-if="leftIcon" class="fanc-collapse-item__left-icon">
                <fanc-icon :name="leftIcon" :size="leftIconSize" :color="leftIconColor"></fanc-icon>
            </view>
            <view class="fanc-collapse-item__title">
                <slot name="title">{{ title }}</slot>
            </view>
            <view v-if="value" class="fanc-collapse-item__value">
                <slot name="value">{{ value }}</slot>
            </view>
            <view class="fanc-collapse-item__right-icon" :class="{ 'is-expanded': isExpanded }">
                <fanc-icon name="chevron-down" size="14" color="#969799"></fanc-icon>
            </view>
        </view>
        <view
            class="fanc-collapse-item__wrapper"
            :style="{ height: isExpanded ? animationHeight : '0px' }"
            :class="{ 'is-animating': isAnimating }"
        >
            <view
                class="fanc-collapse-item__content"
                ref="content"
                :class="{ 'is-visible': isExpanded }"
            >
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-collapse-item",
    props: {
        name: [String, Number],
        title: String,
        value: String,
        disabled: Boolean,
        leftIcon: String,
        leftIconSize: {
            type: [String, Number],
            default: 16,
        },
        leftIconColor: {
            type: String,
            default: "#323233",
        },
        duration: {
            type: Number,
            default: 300,
        },
    },
    inject: {
        collapse: { default: null },
    },
    data() {
        return {
            index: 0,
            animationHeight: "auto",
            isAnimating: false,
        };
    },
    computed: {
        parent() {
            return this.collapse;
        },
        currentName() {
            return this.name ?? this.index;
        },
        isExpanded() {
            return this.parent?.activeNames.includes(this.currentName) || false;
        },
    },
    watch: {
        isExpanded(val) {
            this.isAnimating = true;

            if (val) {
                this.$nextTick(this.updateContentHeight);
            } else if (this.$refs.content) {
                const height = this.$refs.content.offsetHeight;
                if (height > 0) {
                    this.animationHeight = `${height}px`;
                    this.$refs.content.offsetHeight; // 强制回流
                }
            }

            setTimeout(() => {
                this.isAnimating = false;
                if (!val) {
                    this.animationHeight = "0px";
                }
            }, this.duration);
        },
    },
    mounted() {
        if (this.parent) {
            this.parent.addChild(this);
            this.index = this.parent.children.indexOf(this);

            if (this.isExpanded) {
                this.$nextTick(() => setTimeout(this.updateContentHeight, 50));
            }
        }
    },
    beforeDestroy() {
        this.parent?.removeChild(this);
    },
    methods: {
        onClick() {
            if (this.disabled || this.isAnimating) return;

            const { parent, currentName } = this;
            parent?.toggle(currentName, !this.isExpanded);
        },
        updateContentHeight() {
            const content = this.$refs.content;
            if (!content) return;

            const contentHeight = content.offsetHeight;

            if (contentHeight > 0) {
                this.animationHeight = `${contentHeight}px`;
            } else {
                this.animationHeight = "auto";
                setTimeout(() => {
                    if (this.$refs.content) {
                        const height = this.$refs.content.offsetHeight;
                        if (height > 0) {
                            this.animationHeight = `${height}px`;
                        }
                    }
                }, 50);
            }
        },
    },
};
</script>

<style>
.fanc-collapse-item {
    position: relative;
    width: 100%;
}

.fanc-collapse-item--border {
    border-top: 1px solid var(--border-color);
}

.fanc-collapse-item__header {
    display: flex;
    align-items: center;
    padding: 12px 16px 12px 12px;
    font-size: 14px;
    line-height: 24px;
    color: var(--text-primary);
    background-color: var(--bg-white);
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.fanc-collapse-item__header:active {
    background-color: var(--bg-active);
}

.fanc-collapse-item--disabled .fanc-collapse-item__header {
    color: var(--text-disabled);
    cursor: not-allowed;
}

.fanc-collapse-item--disabled .fanc-collapse-item__header:active {
    background-color: var(--bg-white);
}

.fanc-collapse-item__left-icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
}

.fanc-collapse-item__title {
    flex: 1;
    font-weight: 500;
}

.fanc-collapse-item__value {
    margin-right: 8px;
    color: var(--text-secondary);
    font-size: 12px;
}

.fanc-collapse-item__right-icon {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fanc-collapse-item__right-icon.is-expanded {
    transform: rotate(180deg);
}

.fanc-collapse-item__wrapper {
    overflow: hidden;
    transition: height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: height;
}

.fanc-collapse-item__wrapper.is-animating {
    transition: height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fanc-collapse-item__content {
    padding: 12px 16px;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.5;
    background-color: var(--bg-white);
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fanc-collapse-item__content.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.fanc-collapse-item--expanded .fanc-collapse-item__content {
    border-bottom: 1px solid var(--border-color);
}
</style>
