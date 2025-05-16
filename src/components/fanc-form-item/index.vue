<template>
    <view class="fanc-form-item" :class="[
        error ? 'fanc-form-item--error' : '',
        formLabelPosition === 'top' ? 'fanc-form-item--label-top' : '',
        { 'fanc-form-item--required': isRequired && formShowRequiredMark }
    ]">
        <view 
            v-if="label || $slots.label" 
            class="fanc-form-item__label" 
            :style="{ width: formLabelPosition === 'left' ? formLabelWidth : '', textAlign: labelAlign }"
        >
            <slot name="label">{{ label }}</slot>
        </view>
        <view class="fanc-form-item__content">
            <slot></slot>
            <view class="fanc-form-item__error" v-if="validateState === 'error' && showError">
                {{ validateMessage }}
            </view>
        </view>
    </view>
</template>

<script>
// 引入异步验证器
import AsyncValidator from 'async-validator';

export default {
    name: "fanc-form-item",
    
    inject: {
        fancForm: {
            default: null
        }
    },
    
    props: {
        // 表单域 model 字段
        prop: {
            type: String,
            default: ""
        },
        // 标签文本
        label: {
            type: String,
            default: ""
        },
        // 标签宽度
        labelWidth: {
            type: String,
            default: ""
        },
        // 标签对齐方式
        labelAlign: {
            type: String,
            default: "left",
            validator: (value) => {
                return ["left", "center", "right"].includes(value);
            }
        },
        // 是否必填字段
        required: {
            type: Boolean,
            default: false
        },
        // 表单验证规则
        rules: {
            type: [Object, Array],
            default: () => ({})
        },
        // 是否显示错误信息
        showError: {
            type: Boolean,
            default: true
        },
        // 是否显示验证图标
        showErrorIcon: {
            type: Boolean,
            default: true
        }
    },
    
    data() {
        return {
            validateState: "", // error、success
            validateMessage: "",
            initialValue: null // 字段初始值，用于重置
        };
    },
    
    computed: {
        // 表单
        form() {
            return this.fancForm;
        },
        
        // 是否是必填字段
        isRequired() {
            if (this.required) {
                return true;
            }
            
            // 从规则中判断是否必填
            if (this.rules && this.prop) {
                const rules = this.getRules();
                return rules.some(rule => rule.required);
            }
            
            return false;
        },
        
        // 表单项禁用状态继承自表单
        disabled() {
            return this.form && this.form.disabled;
        },
        
        // 表单标签宽度
        formLabelWidth() {
            return this.labelWidth || (this.form && this.form.labelWidth) || "";
        },
        
        // 表单标签位置
        formLabelPosition() {
            return this.form && this.form.labelPosition || "left";
        },
        
        // 是否显示必填标记
        formShowRequiredMark() {
            return this.form && this.form.showRequiredMark;
        },
        
        // 检查是否有错误
        error() {
            return this.validateState === "error";
        }
    },
    
    mounted() {
        // 将表单项添加到表单中
        if (this.form && this.prop) {
            this.form.addField(this);
            
            // 保存初始值，用于重置
            this.initialValue = this.fieldValue;
            
            // 初始化验证
            this.getRules();
        }
    },
    
    beforeDestroy() {
        // 在组件销毁前从表单中移除
        if (this.form && this.prop) {
            this.form.removeField(this);
        }
    },
    
    methods: {
        // 获取字段当前值
        getFieldValue() {
            if (!this.form || !this.prop) return null;
            
            const model = this.form.model;
            if (!model) return null;
            
            // 支持嵌套属性，如 'user.name'
            let path = this.prop;
            if (path.indexOf('.') < 0) {
                return model[path];
            }
            
            const parts = path.split('.');
            let value = model;
            for (let part of parts) {
                if (value == null) return null;
                value = value[part];
            }
            
            return value;
        },
        
        // 设置字段值
        setFieldValue(value) {
            if (!this.form || !this.prop) return;
            
            const model = this.form.model;
            if (!model) return;
            
            // 支持嵌套属性，如 'user.name'
            let path = this.prop;
            if (path.indexOf('.') < 0) {
                model[path] = value;
                return;
            }
            
            const parts = path.split('.');
            let current = model;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (current[part] === undefined) {
                    // 如果路径不存在，创建对象
                    current[part] = {};
                }
                current = current[part];
            }
            current[parts[parts.length - 1]] = value;
        },
        
        // 重置字段
        resetField() {
            this.validateState = "";
            this.validateMessage = "";
            
            // 重置为初始值
            if (this.initialValue !== undefined && this.prop) {
                this.setFieldValue(this.initialValue);
            }
        },
        
        // 清空字段
        clearField() {
            if (this.prop) {
                this.setFieldValue("");
            }
        },
        
        // 字段值
        get fieldValue() {
            return this.getFieldValue();
        },
        
        // 获取验证规则
        getRules() {
            let formRules = this.form && this.form.rules;
            const rules = formRules ? formRules[this.prop] : [];
            
            // 合并组件规则和表单规则
            const selfRules = this.rules;
            
            // 将规则转换为数组
            if (selfRules) {
                if (Array.isArray(selfRules)) {
                    return [...selfRules, ...(Array.isArray(rules) ? rules : [rules])];
                } else {
                    return [selfRules, ...(Array.isArray(rules) ? rules : [rules])];
                }
            }
            
            return Array.isArray(rules) ? rules : (rules ? [rules] : []);
        },
        
        // 验证字段
        validate(trigger, callback = () => {}) {
            // 如果没有规则或者不是表单字段，不需要验证
            if (!this.prop) {
                callback();
                return;
            }
            
            const rules = this.getRules();
            if (rules.length === 0) {
                callback();
                return;
            }
            
            // 根据触发方式过滤规则
            const filteredRules = trigger
                ? rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger))
                : rules;
                
            if (filteredRules.length === 0) {
                callback();
                return;
            }
            
            // 设置验证状态为校验中
            this.validateState = "validating";
            
            // 构建验证描述对象
            const descriptor = {};
            descriptor[this.prop] = filteredRules;
            
            // 创建验证器
            const validator = new AsyncValidator(descriptor);
            const model = {};
            model[this.prop] = this.fieldValue;
            
            // 执行验证
            validator.validate(model, { firstFields: true }, (errors, fields) => {
                this.validateState = errors ? "error" : "success";
                this.validateMessage = errors ? errors[0].message : "";
                
                callback(this.validateMessage);
            });
        },
        
        // 触发字段验证
        onFieldBlur() {
            if (this.form && this.form.validateOnBlur) {
                this.validate("blur");
            }
        },
        
        // 字段值变化时触发验证
        onFieldChange() {
            if (this.form && this.form.validateOnChange) {
                this.validate("change");
            }
        }
    }
};
</script>

<style lang="scss">
.fanc-form-item {
    display: flex;
    margin-bottom: 14px;
    font-size: 14px;
    
    &--required {
        .fanc-form-item__label::before {
            content: "*";
            color: var(--form-item-required-color, var(--fanc-danger-color));
            margin-right: 4px;
        }
    }
    
    &--label-top {
        flex-direction: column;
        align-items: flex-start;
        
        .fanc-form-item__label {
            margin-bottom: 8px;
        }
    }
    
    &--error {
        .fanc-field {
            border-color: var(--form-item-error-color, var(--fanc-danger-color));
        }
    }
    
    &__label {
        padding-right: 12px;
        line-height: 24px;
        min-width: 80px;
        color: var(--form-item-label-color, var(--text-primary));
    }
    
    &__content {
        flex: 1;
        position: relative;
        width: 100%;
    }
    
    &__error {
        color: var(--form-item-error-color, var(--fanc-danger-color));
        font-size: 12px;
        line-height: 1.5;
        padding-top: 4px;
    }
}
</style> 