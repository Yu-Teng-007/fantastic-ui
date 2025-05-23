<template>
    <view
        class="fanc-form"
        :class="{
            'fanc-form--disabled': disabled,
            'fanc-form--inline': inline,
            'fanc-form--top': labelPosition === 'top',
        }"
    >
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "fanc-form",

    props: {
        // 表单数据对象
        model: {
            type: Object,
            default: () => ({}),
        },
        // 表单验证规则
        rules: {
            type: Object,
            default: () => ({}),
        },
        // 是否在表单域的值发生变化时立即验证
        validateOnChange: {
            type: Boolean,
            default: true,
        },
        // 是否在表单域的值发生变化时触发表单验证
        validateTrigger: {
            type: String,
            default: "onChange",
            validator: (val) => ["onChange", "onBlur", "onSubmit"].includes(val),
        },
        // 是否禁用表单内的所有组件
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否在提交表单且校验不通过时滚动至错误的表单项
        scrollToError: {
            type: Boolean,
            default: true,
        },
        // 是否显示验证错误信息
        showErrorMessage: {
            type: Boolean,
            default: true,
        },
        // 表单项标签宽度
        labelWidth: {
            type: String,
            default: "88px",
        },
        // 表单项标签的位置
        labelPosition: {
            type: String,
            default: "left",
            validator: (val) => ["left", "top"].includes(val),
        },
        // 是否为内联表单
        inline: {
            type: Boolean,
            default: false,
        },
        // 是否有边框
        border: {
            type: Boolean,
            default: true,
        },
        // 表单内边距
        padding: {
            type: String,
            default: "12px",
        },
    },

    provide() {
        return {
            fancForm: this,
        };
    },

    data() {
        return {
            fields: [], // 保存所有注册的表单项
            errorFields: {}, // 存储校验失败的表单项
        };
    },

    methods: {
        /**
         * 注册一个表单项
         * @param {Object} field 表单项实例
         */
        registerField(field) {
            if (field) {
                this.fields.push(field);
            }
        },

        /**
         * 移除一个表单项
         * @param {Object} field 表单项实例
         */
        unregisterField(field) {
            this.fields = this.fields.filter((item) => item !== field);
        },

        /**
         * 校验整个表单或部分字段
         * @param {Array} fieldNames 指定的字段名数组
         * @returns {Promise} 验证结果
         */
        validate(fieldNames) {
            return new Promise((resolve) => {
                if (this.fields.length === 0) {
                    resolve({ valid: true, fields: {} });
                    return;
                }

                // 清除之前的错误
                this.errorFields = {};

                // 需要校验的字段
                const validateFields = fieldNames
                    ? this.fields.filter((field) => fieldNames.includes(field.name))
                    : this.fields;

                // 没有需要校验的字段时，直接返回成功
                if (validateFields.length === 0) {
                    resolve({ valid: true, fields: {} });
                    return;
                }

                // 校验所有字段
                let isValid = true;
                const tasks = validateFields.map((field) => {
                    return field.validateField().then(
                        () => true,
                        (error) => {
                            isValid = false;
                            this.errorFields[field.name] = error;
                            return false;
                        }
                    );
                });

                // 等待所有校验任务完成
                Promise.all(tasks).then(() => {
                    resolve({
                        valid: isValid,
                        fields: this.errorFields,
                    });

                    // 如果开启了滚动到错误处，且验证失败
                    if (!isValid && this.scrollToError) {
                        this.$nextTick(() => {
                            const errorField = this.fields.find(
                                (field) => this.errorFields[field.name]
                            );
                            if (errorField && errorField.$el) {
                                this.scrollToElement(errorField.$el);
                            }
                        });
                    }
                });
            });
        },

        /**
         * 重置表单及其字段的值
         * @param {Array} fieldNames 指定字段名数组
         */
        resetFields(fieldNames) {
            // 重置指定字段或所有字段
            const resetFields = fieldNames
                ? this.fields.filter((field) => fieldNames.includes(field.name))
                : this.fields;

            resetFields.forEach((field) => {
                field.resetField();
            });

            // 清除错误状态
            this.errorFields = {};
        },

        /**
         * 清除验证错误信息
         * @param {Array} fieldNames 指定字段名数组
         */
        clearValidate(fieldNames) {
            const clearFields = fieldNames
                ? this.fields.filter((field) => fieldNames.includes(field.name))
                : this.fields;

            clearFields.forEach((field) => {
                field.clearValidate();
            });

            // 清除错误状态
            this.errorFields = {};
        },

        /**
         * 滚动到指定元素
         * @param {HTMLElement} el 目标元素
         */
        scrollToElement(el) {
            // 在uni-app环境中，使用uni.pageScrollTo方法
            if (typeof uni !== "undefined" && uni.pageScrollTo) {
                // 获取元素到页面顶部的距离
                let offsetTop = 0;
                let currentEl = el;

                while (currentEl) {
                    offsetTop += currentEl.offsetTop || 0;
                    currentEl = currentEl.offsetParent;
                }

                // 滚动到元素位置上方一点
                uni.pageScrollTo({
                    scrollTop: offsetTop - 20,
                    duration: 300,
                });
            }
        },

        /**
         * 提交表单
         */
        submit() {
            this.validate().then((result) => {
                if (result.valid) {
                    this.$emit("submit", this.model);
                } else {
                    this.$emit("validate-error", result.fields);
                }
            });
        },
    },
};
</script>

<style lang="scss">
.fanc-form {
    width: 100%;
    font-size: var(--form-item-content-font-size, 14px);
    line-height: var(--form-item-content-line-height, 24px);
    background-color: var(--form-bg-color, #fff);
    padding: var(--form-padding, 0);

    &--disabled {
        opacity: var(--form-disabled-opacity, 0.6);
        pointer-events: none;
    }

    &--inline {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        .fanc-field {
            width: auto;
            flex: 0 0 auto;
            margin-right: var(--form-inline-item-margin-right, 16px);
        }
    }

    &--top {
        .fanc-field {
            .fanc-field__label {
                width: 100% !important;
                text-align: left;
                margin-bottom: var(--form-item-top-margin-bottom, 8px);
            }
        }
    }
}
</style>
