import formConfig from "@/configs/form";

/**
 * 表单验证工具
 */
class Validator {
    /**
     * 创建一个新的表单验证实例
     */
    constructor() {
        this.rules = formConfig.rules;
        this.messages = formConfig.messages;
    }

    /**
     * 获取预定义规则
     * @param {String} ruleName 规则名称
     * @returns {Object|null} 规则对象
     */
    getRule(ruleName) {
        return this.rules[ruleName] || null;
    }

    /**
     * 获取预定义提示信息
     * @param {String} messageName 提示信息名称
     * @returns {String} 提示信息
     */
    getMessage(messageName) {
        return this.messages[messageName] || "验证失败";
    }

    /**
     * 验证必填
     * @param {any} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    required(value) {
        if (value === undefined || value === null) {
            return false;
        }

        if (typeof value === "string") {
            return value.trim().length > 0;
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        if (typeof value === "object") {
            return Object.keys(value).length > 0;
        }

        return true;
    }

    /**
     * 验证手机号
     * @param {String} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    mobile(value) {
        if (!value) return true;
        return /^1[3-9]\d{9}$/.test(value);
    }

    /**
     * 验证邮箱
     * @param {String} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    email(value) {
        if (!value) return true;
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }

    /**
     * 验证URL
     * @param {String} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    url(value) {
        if (!value) return true;
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/.test(value);
    }

    /**
     * 验证数字
     * @param {String|Number} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    number(value) {
        if (value === "" || value === undefined || value === null) return true;
        return !isNaN(value) && value !== "";
    }

    /**
     * 验证整数
     * @param {String|Number} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    integer(value) {
        if (value === "" || value === undefined || value === null) return true;
        return /^-?\d+$/.test(value);
    }

    /**
     * 验证正整数
     * @param {String|Number} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    positiveInteger(value) {
        if (value === "" || value === undefined || value === null) return true;
        return /^[1-9]\d*$/.test(value);
    }

    /**
     * 验证身份证号码
     * @param {String} value 要验证的值
     * @returns {Boolean} 验证结果
     */
    idcard(value) {
        if (!value) return true;
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
    }

    /**
     * 验证最小长度
     * @param {String} value 要验证的值
     * @param {Number} length 最小长度
     * @returns {Boolean} 验证结果
     */
    minLength(value, length) {
        if (value === undefined || value === null || value === "") return true;
        return String(value).length >= length;
    }

    /**
     * 验证最大长度
     * @param {String} value 要验证的值
     * @param {Number} length 最大长度
     * @returns {Boolean} 验证结果
     */
    maxLength(value, length) {
        if (value === undefined || value === null || value === "") return true;
        return String(value).length <= length;
    }

    /**
     * 验证长度范围
     * @param {String} value 要验证的值
     * @param {Number} min 最小长度
     * @param {Number} max 最大长度
     * @returns {Boolean} 验证结果
     */
    rangeLength(value, min, max) {
        if (value === undefined || value === null || value === "") return true;
        const length = String(value).length;
        return length >= min && length <= max;
    }

    /**
     * 验证最小值
     * @param {Number} value 要验证的值
     * @param {Number} min 最小值
     * @returns {Boolean} 验证结果
     */
    min(value, min) {
        if (value === undefined || value === null || value === "") return true;
        return Number(value) >= min;
    }

    /**
     * 验证最大值
     * @param {Number} value 要验证的值
     * @param {Number} max 最大值
     * @returns {Boolean} 验证结果
     */
    max(value, max) {
        if (value === undefined || value === null || value === "") return true;
        return Number(value) <= max;
    }

    /**
     * 验证值范围
     * @param {Number} value 要验证的值
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {Boolean} 验证结果
     */
    range(value, min, max) {
        if (value === undefined || value === null || value === "") return true;
        const num = Number(value);
        return num >= min && num <= max;
    }

    /**
     * 自定义正则验证
     * @param {String} value 要验证的值
     * @param {RegExp} pattern 正则表达式
     * @returns {Boolean} 验证结果
     */
    pattern(value, pattern) {
        if (value === undefined || value === null || value === "") return true;
        if (typeof pattern === "string") {
            pattern = new RegExp(pattern);
        }
        return pattern.test(value);
    }
}

// 创建单例
const validator = new Validator();

export default {
    // 暴露实例
    validator,

    /**
     * 安装插件
     * @param {Vue} Vue Vue构造函数
     */
    install(Vue) {
        Vue.prototype.$validator = validator;
    },
};
