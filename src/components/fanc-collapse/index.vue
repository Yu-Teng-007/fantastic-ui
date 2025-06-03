<template>
    <view class="fanc-collapse">
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "fanc-collapse",
    props: {
        // 是否开启手风琴模式，开启后每次只能展开一个面板
        accordion: {
            type: Boolean,
            default: false,
        },
        // 当前展开面板的 name，非手风琴模式下为数组
        modelValue: {
            type: [String, Number, Array],
            default: () => [],
        },
        // 是否显示外边框
        border: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["update:modelValue", "change"],
    provide() {
        return {
            collapse: this,
        };
    },
    data() {
        return {
            // 内部维护的激活项
            activeNames: [],
        };
    },
    watch: {
        modelValue: {
            handler(val) {
                this.setActiveNames(val);
            },
            immediate: true,
        },
    },
    created() {
        this.children = [];
    },
    methods: {
        // 设置当前激活的面板
        setActiveNames(activeNames) {
            if (this.accordion) {
                // 手风琴模式转为数组
                this.activeNames = activeNames ? [activeNames] : [];
            } else {
                // 非手风琴模式，确保是数组
                this.activeNames = Array.isArray(activeNames) ? activeNames : [activeNames];
            }
        },
        // 切换面板展开状态
        toggle(name, expanded) {
            if (this.accordion) {
                // 手风琴模式下，只保留当前展开的面板
                const activeNames = expanded ? [name] : [];
                this.$emit("update:modelValue", activeNames[0]);
                this.$emit("change", activeNames[0]);
                this.setActiveNames(activeNames);
            } else {
                // 非手风琴模式，可以展开多个面板
                const activeNames = [...this.activeNames];
                const index = activeNames.indexOf(name);

                if (expanded) {
                    // 当前未展开，需要展开
                    if (index === -1) {
                        activeNames.push(name);
                    }
                } else {
                    // 当前已展开，需要收起
                    if (index !== -1) {
                        activeNames.splice(index, 1);
                    }
                }

                this.$emit("update:modelValue", activeNames);
                this.$emit("change", activeNames);
                this.setActiveNames(activeNames);
            }
        },
        // 添加子组件
        addChild(child) {
            this.children.push(child);
        },
        // 移除子组件
        removeChild(child) {
            const index = this.children.indexOf(child);
            if (index !== -1) {
                this.children.splice(index, 1);
            }
        },
    },
};
</script>

<style>
.fanc-collapse {
    width: 100%;
    background-color: var(--bg-white);
    overflow: hidden;
}

.fanc-collapse--border {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}
</style>
