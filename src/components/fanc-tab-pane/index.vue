<template>
    <view
        class="fanc-tab-pane"
        :class="{ 'fanc-tab-pane--active': isActive }"
        v-show="animated || isActive"
    >
        <slot></slot>
    </view>
</template>

<script>
/**
 * fanc-tab-pane 选项卡面板
 * @description 选项卡内容面板，需配合 fanc-tabs 组件使用
 * @property {String} title - 选项卡标题
 * @property {Boolean} disabled - 是否禁用
 * @property {String|Number} badge - 徽标内容
 * @property {Boolean} dot - 是否显示小红点
 */
export default {
    name: "fanc-tab-pane",
    props: {
        // 选项卡标题
        title: {
            type: String,
            default: "",
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 徽标内容
        badge: {
            type: [String, Number],
            default: "",
        },
        // 是否显示小红点
        dot: {
            type: Boolean,
            default: false,
        },
    },
    inject: {
        tabs: {
            default: null,
        },
    },
    data() {
        return {
            index: -1,
            inited: false,
        };
    },
    computed: {
        isActive() {
            return this.index === this.tabs.currentIndex;
        },
        animated() {
            return this.tabs.animated;
        },
    },
    watch: {
        title() {
            this.tabs.updateTabs();
        },
        disabled() {
            this.tabs.updateTabs();
        },
        badge() {
            this.tabs.updateTabs();
        },
        dot() {
            this.tabs.updateTabs();
        },
    },
    mounted() {
        this.tabs.children.push(this);
        this.index = this.tabs.children.indexOf(this);
        this.tabs.updateTabs();
    },
    beforeDestroy() {
        this.tabs.children = this.tabs.children.filter((item) => item !== this);
        this.tabs.updateTabs();
    },
};
</script>

<style lang="scss" scoped>
.fanc-tab-pane {
    box-sizing: border-box;
    padding: 12px;

    &--inactive {
        display: none;
    }
}
</style>
