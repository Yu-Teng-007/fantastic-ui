<template>
    <view
        class="fanc-tab"
        :class="{ 'fanc-tab--active': active }"
        :style="{ display: active ? '' : 'none' }"
    >
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "FancTab",

    props: {
        // 标签标题
        title: {
            type: String,
            default: "",
        },

        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },

        // 标签名称，作为匹配的标识符
        name: {
            type: [String, Number],
            default: "",
        },
    },

    data() {
        return {
            active: false,
            index: -1,
        };
    },

    created() {
        this.bindRelation();
    },

    methods: {
        bindRelation() {
            // 查找父级 Tabs 组件
            let parent = this.$parent;
            while (parent && parent.$options.name !== "FancTabs") {
                parent = parent.$parent;
            }

            if (parent && parent.$options.name === "FancTabs") {
                this.parent = parent;

                // 将自身添加到父级的 children 中
                const children = parent.children || (parent.children = []);
                this.index = children.length;
                children.push(this);

                // 初始化激活状态
                this.active = this.index === parent.currentIndex;
            }
        },
    },
};
</script>

<style>
.fanc-tab {
    width: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
}
</style>
