/**
 * Form表单组件配置
 */
export default {
    // 默认验证规则触发方式
    validateTrigger: "onChange",

    // 是否在表单域的值发生变化时立即验证
    validateOnChange: true,

    // 默认表单项标签宽度
    labelWidth: "88px",

    // 默认表单项标签位置
    labelPosition: "left",

    // 是否显示验证错误信息
    showErrorMessage: true,

    // 是否在提交表单且校验不通过时滚动至错误的表单项
    scrollToError: true,

    // 默认尺寸
    size: "default",

    // 是否显示边框
    border: true,

    // 常用验证规则
    rules: {
        // 必填规则
        required: {
            required: true,
            message: "此项不能为空",
        },

        // 手机号码验证规则
        mobile: {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号码",
        },

        // 邮箱验证规则
        email: {
            type: "email",
            message: "请输入正确的邮箱地址",
        },

        // URL验证规则
        url: {
            type: "url",
            message: "请输入正确的URL地址",
        },

        // 身份证号码验证规则
        idcard: {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证号码",
        },

        // 数字验证规则
        number: {
            type: "number",
            message: "请输入数字",
        },

        // 整数验证规则
        integer: {
            pattern: /^-?\d+$/,
            message: "请输入整数",
        },

        // 正整数验证规则
        positiveInteger: {
            pattern: /^[1-9]\d*$/,
            message: "请输入正整数",
        },

        // 金额验证规则（两位小数）
        price: {
            pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
            message: "请输入正确的金额（最多两位小数）",
        },
    },

    // 常用提示信息
    messages: {
        required: "此项不能为空",
        email: "请输入正确的邮箱地址",
        url: "请输入正确的URL地址",
        date: "请输入正确的日期",
        number: "请输入数字",
    },
};
