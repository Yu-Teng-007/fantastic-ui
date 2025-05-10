<template>
    <view class="fanc-icon" @click="$emit('click')">
        <i :class="`fa${iconType} fa-${name}`" :style="iconStyle"></i>
        <view v-if="dot" class="fanc-icon__dot"></view>
        <view v-if="badge" class="fanc-icon__badge">{{ badge }}</view>
    </view>
</template>

<script>
export default {
    name: "FancIcon",
    props: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "solid", // solid/regular/brands
        },
        size: {
            type: [String, Number],
            default: 16,
        },
        color: {
            type: String,
            default: "#333",
        },
        dot: {
            type: Boolean,
            default: false,
        },
        badge: {
            type: [String, Number],
            default: "",
        },
    },
    computed: {
        iconType() {
            return this.type === "solid" ? "s" : this.type === "regular" ? "r" : "b";
        },
        iconStyle() {
            return {
                fontSize: `${this.size}px`,
                color: this.color,
            };
        },
    },
};
</script>

<style scoped>
.fanc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.fanc-icon__dot {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #ff4d4f;
    border-radius: 50%;
    transform: translate(50%, -50%);
}

.fanc-icon__badge {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background-color: #ff4d4f;
    border-radius: 8px;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    transform: translate(50%, -50%);
}
</style>
