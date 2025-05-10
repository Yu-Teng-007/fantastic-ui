<template>
    <view class="fanc-icon">
        <i :class="`fa${iconType} fa-${name}`" :style="iconStyle"></i>
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
}
</style>
