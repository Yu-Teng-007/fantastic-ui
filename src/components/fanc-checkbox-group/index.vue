<template>
    <view class="fanc-checkbox-group" :class="{ 'fanc-checkbox-group--disabled': disabled }">
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "fanc-checkbox-group",

    provide() {
        return {
            fancCheckboxGroup: this,
        };
    },

    props: {
        // 当前选中的值
        value: {
            type: Array,
            default: () => [],
        },
        // 是否禁用所有复选框
        disabled: {
            type: Boolean,
            default: false,
        },
        // 选中状态颜色
        checkedColor: {
            type: String,
            default: "",
        },
        // 最大可选数量
        max: {
            type: Number,
            default: 0, // 0表示不限制
        },
        // 形状，支持square、round
        shape: {
            type: String,
            default: "round",
        },
        // 排列方向，horizontal水平，vertical垂直
        direction: {
            type: String,
            default: "horizontal",
            validator: (val) => ["horizontal", "vertical"].includes(val),
        },
    },

    computed: {
        // 是否已达到最大选择数量
        isExceedMax() {
            return this.max > 0 && this.value.length >= this.max;
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
                        el.classList.add("fanc-checkbox-group--vertical");
                    } else {
                        el.classList.remove("fanc-checkbox-group--vertical");
                    }
                });
            },
        },
    },

    methods: {
        /**
         * 切换选中状态
         * @param {String|Number|Boolean} name 复选框的name
         */
        toggleValue(name) {
            // 如果组件禁用，则不处理
            if (this.disabled) return;

            // 当前选中值的副本
            const currentValue = [...this.value];
            const index = currentValue.indexOf(name);

            // 如果已选中，则取消选中
            if (index !== -1) {
                currentValue.splice(index, 1);
                this.$emit("input", currentValue);
                this.$emit("change", currentValue);
                return;
            }

            // 如果未选中但达到最大数量限制，则不操作
            if (this.isExceedMax) {
                this.$emit("exceed-max", this.max);
                return;
            }

            // 添加到选中项
            currentValue.push(name);
            this.$emit("input", currentValue);
            this.$emit("change", currentValue);
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-checkbox-group {
    display: flex;
    flex-wrap: wrap;
}

.fanc-checkbox-group--disabled {
    opacity: var(--checkbox-disabled-opacity, 0.6);
    cursor: not-allowed;
}

.fanc-checkbox-group .fanc-checkbox {
    margin: var(--checkbox-group-margin, 0 8px 8px 0);
}

.fanc-checkbox-group--vertical {
    flex-direction: column;
    ::v-deep.fanc-checkbox {
        margin-right: 0;
        margin-bottom: 8px;
    }
}
</style>
