<template>
    <view
        class="fanc-sidebar"
        :class="{ 'fanc-sidebar--right': position === 'right' }"
        :style="computedStyle"
    >
        <slot name="content">
            <view class="fanc-sidebar__content">
                <slot></slot>
            </view>
        </slot>
    </view>
</template>

<script>
export default {
    name: "FancSidebar",
    model: {
        prop: "activeIndex",
        event: "update:activeIndex",
    },
    props: {
        activeIndex: {
            type: [Number, String],
            default: 0,
        },
        width: {
            type: [Number, String],
            default: 200,
        },
        position: {
            type: String,
            default: "left",
            validator: (value) => ["left", "right"].includes(value),
        },
        customStyle: {
            type: Object,
            default: () => ({}),
        },
        backgroundColor: {
            type: String,
            default: "",
        },
    },
    computed: {
        computedStyle() {
            const style = {
                ...this.customStyle,
            };

            if (this.width) {
                style.width = typeof this.width === "number" ? `${this.width}px` : this.width;
            }

            if (this.backgroundColor) {
                style.backgroundColor = this.backgroundColor;
            }

            return style;
        },
    },
    methods: {
        handleItemClick(index) {
            this.$emit("update:activeIndex", index);
            this.$emit("change", index);
        },
    },
};
</script>

<style>
.fanc-sidebar {
    position: relative;
    height: 100%;
    background-color: var(--sidebar-bg-color, #f5f5f5);
    box-shadow: var(--sidebar-shadow, 0 0 10px rgba(0, 0, 0, 0.1));
    overflow-y: auto;
    flex-shrink: 0;
    z-index: 0;
}

.fanc-sidebar--right {
    border-left: 1px solid var(--sidebar-border-color, #ebedf0);
}

.fanc-sidebar--left {
    border-right: 1px solid var(--sidebar-border-color, #ebedf0);
}

.fanc-sidebar__content {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
