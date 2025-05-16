<template>
    <view class="fanc-form">
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: "fanc-form",
    
    provide() {
        return {
            fancForm: this
        };
    },
    
    props: {
        // 表单数据对象
        model: {
            type: Object,
            default: () => ({})
        },
        // 表单验证规则
        rules: {
            type: Object,
            default: () => ({})
        },
        // 表单项标签宽度
        labelWidth: {
            type: String,
            default: ""
        },
        // 表单项标签位置，可选值为 left、top
        labelPosition: {
            type: String,
            default: "left",
            validator: (value) => {
                return ["left", "top"].includes(value);
            }
        },
        // 是否禁用所有表单项
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否显示星号
        showRequiredMark: {
            type: Boolean,
            default: true
        },
        // 是否显示校验错误信息
        showErrorMessage: {
            type: Boolean,
            default: true
        },
        // 是否在blur时触发验证
        validateOnBlur: {
            type: Boolean,
            default: true
        },
        // 是否在输入时触发验证
        validateOnChange: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            formItems: []
        };
    },
    
    methods: {
        // 添加表单项
        addField(field) {
            if (field) {
                this.formItems.push(field);
            }
        },
        
        // 移除表单项
        removeField(field) {
            if (field) {
                const index = this.formItems.indexOf(field);
                if (index !== -1) {
                    this.formItems.splice(index, 1);
                }
            }
        },
        
        // 重置表单
        reset() {
            // 重置所有表单项
            this.formItems.forEach(item => {
                item.resetField();
            });
        },
        
        // 清空表单
        clear() {
            Object.keys(this.model).forEach(key => {
                this.model[key] = "";
            });
        },
        
        // 验证表单
        validate(callback) {
            let valid = true;
            let count = 0;
            let errors = {};
            
            // 如果没有需要验证的表单项，直接返回true
            if (this.formItems.length === 0 && callback) {
                callback(true);
                return true;
            }
            
            // 验证所有表单项
            this.formItems.forEach(item => {
                item.validate("", (error) => {
                    if (error) {
                        valid = false;
                        errors[item.prop] = error;
                    }
                    
                    // 当所有表单项都验证完成后，执行回调
                    if (++count === this.formItems.length && callback) {
                        callback(valid, errors);
                    }
                });
            });
            
            return valid;
        },
        
        // 验证单个字段
        validateField(prop, callback) {
            const field = this.formItems.find(item => item.prop === prop);
            if (field) {
                field.validate("", callback);
            }
        }
    }
};
</script>

<style lang="scss">
.fanc-form {
    display: block;
    width: 100%;
}
</style> 