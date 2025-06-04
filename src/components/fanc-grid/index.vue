<template>
    <view class="fanc-grid" :class="[bordered ? 'fanc-grid--bordered' : '']" :style="gridStyle">
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "fanc-grid",

    props: {
        // 宫格列数
        columnNum: {
            type: Number,
            default: 4,
        },
        // 是否显示边框
        bordered: {
            type: Boolean,
            default: true,
        },
        // 格子间距，单位为px
        gutter: {
            type: [Number, String],
            default: 0,
        },
        // 是否将格子固定为正方形
        square: {
            type: Boolean,
            default: false,
        },
        // 格子内容排列方向
        direction: {
            type: String,
            default: "vertical",
            validator: (value) => {
                return ["horizontal", "vertical"].includes(value);
            },
        },
        // 是否显示点击效果
        clickable: {
            type: Boolean,
            default: false,
        },
        // 主题色
        theme: {
            type: String,
            default: "",
            validator: (value) => {
                return ["", "primary", "success", "warning", "danger", "info"].includes(value);
            },
        },
    },

    computed: {
        gridStyle() {
            const style = {};

            if (this.gutter) {
                style.paddingLeft = `${this.gutter}px`;
                style.paddingRight = `${this.gutter}px`;
            }

            return style;
        },
    },

    provide() {
        return {
            grid: this,
        };
    },
};
</script>

<style>
.fanc-grid {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.fanc-grid--bordered {
    position: relative;
}

.fanc-grid--bordered::after {
    content: none;
}
</style>
