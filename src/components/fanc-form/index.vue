<template>
    <view class="fanc-form" :class="{ 'fanc-form--disabled': disabled }">
        <slot></slot>
    </view>
</template>

<script>
/**
 * fanc-form 表单
 * @description 表单组件，用于数据收集、校验和提交，可包含输入框、选择器、单选框、多选框等组件
 * @property {Object} model - 表单数据对象
 * @property {Object} rules - 表单验证规则
 * @property {Boolean} disabled - 是否禁用所有表单项
 * @property {String} validateTrigger - 表单校验触发的时机，可选值为 change/blur/submit
 * @property {Boolean} scrollToError - 是否在提交表单且校验失败时滚动至错误的表单项
 * @event {Function} submit - 表单提交时触发
 * @event {Function} validate - 表单校验完成时触发
 * @event {Function} reset - 表单重置时触发
 */
export default {
    name: "fanc-form",

    provide() {
        return {
            fancForm: this,
        };
    },

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
        // 是否禁用表单
        disabled: {
            type: Boolean,
            default: false,
        },
        // 表单校验触发的时机，可选值为 change/blur/submit
        validateTrigger: {
            type: String,
            default: "blur",
            validator: (value) => ["change", "blur", "submit"].includes(value),
        },
        // 是否在提交表单且校验失败时滚动至错误的表单项
        scrollToError: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            // 存储所有表单字段组件的引用
            fields: [],
            // 表单校验结果
            validateState: {},
            // 验证处理中的字段
            validatingFields: [],
        };
    },

    watch: {
        // 监听规则变化
        rules: {
            handler() {
                // 更新所有字段的规则
                this.$nextTick(() => {
                    this.fields.forEach((field) => {
                        if (field.name && this.rules && this.rules[field.name]) {
                            field.$emit("update:rules", this.rules[field.name]);
                        }
                    });
                });
            },
            deep: true,
        },
    },

    created() {
        // 监听子组件的挂载事件
        this.$on("hook:mounted", () => {
            // 在下一个周期中查找所有field组件
            this.$nextTick(() => {
                this.findFieldsInChildren(this.$children);
            });
        });
    },

    mounted() {
        // 查找所有field子组件
        this.findFieldsInChildren(this.$children);
    },

    methods: {
        /**
         * 递归查找所有field子组件
         * @param {Array} children 子组件列表
         */
        findFieldsInChildren(children) {
            children.forEach((child) => {
                if (child.$options.name === "fanc-field") {
                    this.registerField(child);
                }
                if (child.$children && child.$children.length) {
                    this.findFieldsInChildren(child.$children);
                }
            });
        },

        /**
         * 注册表单字段
         * @param {Object} field 表单字段组件实例
         */
        registerField(field) {
            if (field && field.$options.name === "fanc-field") {
                if (!this.fields.includes(field)) {
                    this.fields.push(field);

                    // 为字段设置校验规则
                    if (field.name && this.rules && this.rules[field.name]) {
                        field.$emit("update:rules", this.rules[field.name]);
                    }

                    // 监听字段值变化
                    field.$on("input", () => {
                        // 如果验证触发方式为change，则立即验证
                        if (this.validateTrigger === "change" && field.name) {
                            this.validateField(field.name);
                        }
                    });

                    // 监听字段失焦事件
                    field.$on("blur", () => {
                        // 如果验证触发方式为blur，则失焦时验证
                        if (this.validateTrigger === "blur" && field.name) {
                            this.validateField(field.name);
                        }
                    });
                }
            }
        },

        /**
         * 移除表单字段
         * @param {Object} field 表单字段组件实例
         */
        unregisterField(field) {
            this.fields = this.fields.filter((item) => item !== field);
        },

        /**
         * 验证表单
         * @param {String|Array} fields 指定要验证的字段，不传则验证所有字段
         * @returns {Promise} 返回验证结果的Promise
         */
        validate(fields) {
            return new Promise((resolve) => {
                const fieldsToValidate = fields
                    ? Array.isArray(fields)
                        ? fields
                        : [fields]
                    : this.fields.map((field) => field.name).filter(Boolean);

                // 过滤出需要验证的表单字段
                const itemsToValidate = this.fields.filter(
                    (field) => field.name && fieldsToValidate.includes(field.name)
                );

                if (itemsToValidate.length === 0) {
                    resolve({ valid: true, invalidFields: {} });
                    return;
                }

                // 重置验证状态
                this.validateState = {};
                this.validatingFields = [...fieldsToValidate];

                // 验证每个字段
                const validatePromises = itemsToValidate.map((field) => {
                    return new Promise((resolveField) => {
                        // 直接调用字段的验证方法
                        field.validate((result) => {
                            resolveField({
                                field: field.name,
                                valid: result.valid,
                                message: result.message,
                                element: field.$el,
                            });
                        });
                    });
                });

                // 等待所有验证完成
                Promise.all(validatePromises).then((results) => {
                    const invalidFields = {};
                    let firstErrorField = null;

                    const isValid = results.every((item) => {
                        const { field, valid, message, element } = item;
                        // 记录验证结果
                        this.validateState[field] = valid;

                        if (!valid) {
                            invalidFields[field] = message;
                            // 记录第一个错误字段的信息
                            if (!firstErrorField) {
                                firstErrorField = { field, element };
                            }
                            return false;
                        }
                        return true;
                    });

                    this.validatingFields = [];
                    this.$emit("validate", isValid, invalidFields);

                    // 如果校验失败且需要滚动到错误字段
                    if (!isValid && this.scrollToError && firstErrorField) {
                        this.scrollToField(firstErrorField.element);
                    }

                    resolve({ valid: isValid, invalidFields });
                });
            });
        },

        /**
         * 验证特定字段
         * @param {String} name 字段名
         * @returns {Promise} 返回验证结果的Promise
         */
        validateField(name) {
            const field = this.fields.find((item) => item.name === name);
            if (!field) return Promise.resolve(true);

            this.validatingFields.push(name);
            return new Promise((resolve) => {
                field.validate((result) => {
                    this.validateState[name] = result.valid;
                    this.validatingFields = this.validatingFields.filter((field) => field !== name);
                    resolve(result);
                });
            });
        },

        /**
         * 重置表单
         * @param {String|Array} fields 指定要重置的字段，不传则重置所有字段
         */
        resetFields(fields) {
            const fieldsToReset = fields
                ? Array.isArray(fields)
                    ? fields
                    : [fields]
                : this.fields.map((field) => field.name).filter(Boolean);

            this.fields.forEach((field) => {
                if (field.name && fieldsToReset.includes(field.name)) {
                    // 重置字段值
                    this.resetFieldValue(field);
                    // 重置验证状态
                    field.resetValidation && field.resetValidation();
                }
            });

            // 重置验证状态
            fieldsToReset.forEach((field) => {
                this.validateState[field] = true;
            });

            this.$emit("reset");
        },

        /**
         * 重置字段值
         * @param {Object} field 表单字段组件
         */
        resetFieldValue(field) {
            if (!field.name || !this.model) return;

            // 获取字段在model中的路径
            const keys = field.name.split(".");
            let model = this.model;

            if (keys.length === 1) {
                // 简单路径直接设置为空
                this.$set(model, keys[0], "");
            } else {
                // 复杂路径需要逐级查找
                for (let i = 0; i < keys.length - 1; i++) {
                    model = model[keys[i]];
                    if (!model) return;
                }
                this.$set(model, keys[keys.length - 1], "");
            }

            // 清除错误状态
            field.error = false;
            field.errorMessage = "";
        },

        /**
         * 清除验证状态
         * @param {String|Array} fields 指定要清除的字段，不传则清除所有字段
         */
        clearValidate(fields) {
            const fieldsToClear = fields
                ? Array.isArray(fields)
                    ? fields
                    : [fields]
                : this.fields.map((field) => field.name).filter(Boolean);

            this.fields.forEach((field) => {
                if (field.name && fieldsToClear.includes(field.name)) {
                    field.error = false;
                    field.errorMessage = "";
                    field.resetValidation && field.resetValidation();
                }
            });

            // 重置验证状态
            fieldsToClear.forEach((field) => {
                this.validateState[field] = true;
            });
        },

        /**
         * 滚动到指定表单字段
         * @param {HTMLElement} element 表单字段元素
         */
        scrollToField(element) {
            if (!element) return;

            // 获取元素位置
            let offsetTop = 0;
            let currentElement = element;

            while (currentElement) {
                offsetTop += currentElement.offsetTop;
                currentElement = currentElement.offsetParent;
            }

            // 滚动到指定位置，减去一些距离确保表单项完全可见
            const scrollTop = offsetTop - 50;

            // 使用uni-app的滚动API
            uni.pageScrollTo({
                scrollTop,
                duration: 300,
            });
        },

        /**
         * 提交表单
         * @param {Event} event 事件对象
         */
        submitForm(event) {
            event && event.preventDefault();

            // 如果验证触发方式为submit，提交时进行验证
            this.validate().then(({ valid, invalidFields }) => {
                this.$emit("submit", {
                    valid,
                    invalidFields,
                    model: this.model,
                    event,
                });
            });
        },
    },
};
</script>

<style>
.fanc-form {
    display: block;
    width: 100%;
    background-color: var(--form-bg-color, var(--white));
}

.fanc-form--disabled {
    opacity: var(--form-disabled-opacity, 0.6);
    cursor: not-allowed;
}
</style>
