<template>
    <view
        class="fanc-sidebar-item"
        :class="[
            { 'fanc-sidebar-item--active': active },
            { 'fanc-sidebar-item--disabled': disabled },
        ]"
        @click="onClick"
    >
        <view class="fanc-sidebar-item__content">
            <view class="fanc-sidebar-item__icon" v-if="$slots.icon || icon">
                <slot name="icon">
                    <fanc-icon :name="icon" :size="iconSize"></fanc-icon>
                </slot>
            </view>
            <view class="fanc-sidebar-item__text">
                <slot>{{ title }}</slot>
            </view>
        </view>
        <view class="fanc-sidebar-item__badge" v-if="badge">{{ badge }}</view>
    </view>
</template>

<script>
export default {
    name: "FancSidebarItem",
    model: {
        prop: "active",
        event: "update:active",
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        iconSize: {
            type: [Number, String],
            default: 18,
        },
        active: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        badge: {
            type: [Number, String],
            default: "",
        },
        index: {
            type: [Number, String],
            default: "",
        },
    },
    methods: {
        onClick() {
            if (this.disabled) {
                return;
            }

            const index = this.index !== "" ? this.index : null;
            this.$emit("click", index);
            this.$emit("update:active", true);
        },
    },
};
</script>

<style>
.fanc-sidebar-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: var(--sidebar-item-bg-color, #f5f5f5);
    border-bottom: 1px solid var(--sidebar-item-border-color, var(--border-color));
    margin: 2px 0;
    border-radius: 0;
}

.fanc-sidebar-item--active {
    background-color: var(--sidebar-item-active-bg-color, #fff);
    color: var(--sidebar-item-active-color, var(--primary-color));
    font-weight: 500;
    margin-right: -1px;
    border-top-left-radius: var(--sidebar-item-active-radius, 8px);
    border-bottom-left-radius: var(--sidebar-item-active-radius, 8px);
    position: relative;
    z-index: 1;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05);
}

.fanc-sidebar-item--active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--sidebar-item-active-indicator-color, var(--primary-color));
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.fanc-sidebar-item--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.fanc-sidebar-item__content {
    display: flex;
    align-items: center;
    flex: 1;
}

.fanc-sidebar-item__icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-sidebar-item__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}

.fanc-sidebar-item__badge {
    display: inline-block;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
    font-size: 12px;
    text-align: center;
    background-color: var(--sidebar-item-badge-bg-color, var(--danger-color));
    color: var(--sidebar-item-badge-color, #fff);
    border-radius: 8px;
}
</style>
