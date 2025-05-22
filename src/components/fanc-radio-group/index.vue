<template>
    <view class="fanc-radio-group" :class="{ 'fanc-radio-group--disabled': disabled }">
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "fanc-radio-group",

    provide() {
        return {
            fancRadioGroup: this,
        };
    },

    props: {
        // 当前选中的值
        value: {
            type: [String, Number, Boolean],
            default: "",
        },
        // 是否禁用所有单选框
        disabled: {
            type: Boolean,
            default: false,
        },
        // 选中状态颜色
        checkedColor: {
            type: String,
            default: "",
        },
        // 排列方向，horizontal水平，vertical垂直
        direction: {
            type: String,
            default: "horizontal",
            validator: (val) => ["horizontal", "vertical"].includes(val),
        },
        // 形状，支持square、round
        shape: {
            type: String,
            default: "round",
            validator: (val) => ["square", "round"].includes(val),
        },
        // 选中样式类型，支持dot、check
        checkType: {
            type: String,
            default: "dot",
            validator: (val) => ["dot", "check"].includes(val),
        },
    },

    watch: {
        direction: {
            immediate: true,
            handler(val) {
                this.$nextTick(() => {
                    const el = this.$el;
                    if (!el) return;

                    if (val === "vertical") {
                        el.classList.add("fanc-radio-group--vertical");
                    } else {
                        el.classList.remove("fanc-radio-group--vertical");
                    }
                });
            },
        },
    },

    methods: {
        /**
         * 更新选中的值
         * @param {String|Number|Boolean} name 单选框的name
         */
        updateValue(name) {
            // 如果组件禁用，则不处理
            if (this.disabled) return;

            // 如果与当前值相同，则不更新
            if (this.value === name) return;

            // 更新选中的值
            this.$emit("input", name);
            this.$emit("change", name);
        },
    },

    // 防止默认属性继承
    inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.fanc-radio-group {
    display: flex;
    flex-wrap: wrap;
}

.fanc-radio-group--disabled {
    opacity: var(--radio-disabled-opacity, 0.6);
    cursor: not-allowed;
}

.fanc-radio-group .fanc-radio {
    margin: var(--radio-group-margin, 0 8px 8px 0);
}

.fanc-radio-group--vertical {
    flex-direction: column;
    ::v-deep.fanc-radio {
        margin-right: 0;
        margin-bottom: 8px;
    }
}
</style>
