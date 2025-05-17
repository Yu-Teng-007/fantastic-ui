/**
 * Field 输入框组件默认配置
 */

export default {
    // 输入框类型，可选值为 text、textarea、password、number、digit、idcard、tel
    type: "text",
    // 输入框占位文本
    placeholder: "请输入",
    // 标签宽度，可选值为 auto / fixed
    labelWidth: "",
    // 是否禁用输入框
    disabled: false,
    // 是否只读
    readonly: false,
    // 是否显示表单必填星号
    required: false,
    // 是否启用清除图标
    clearable: false,
    // 是否密码类型
    password: false,
    // 输入的最大字符数
    maxlength: -1,
    // 是否显示字数统计
    showWordLimit: false,
    // 是否垂直居中
    center: false,
    // 是否隐藏底部边框
    borderless: false,
    // 输入框内容对齐方式，可选值为 left、center、right
    inputAlign: "left",
    // 是否自动获取焦点
    focus: false,
    // 键盘弹起时，是否自动上推页面
    adjustPosition: true,
    // 点击键盘右下角按钮时是否保持键盘不收起
    confirmHold: false,
    // focus时，点击页面的时候不收起键盘
    holdKeyboard: false,
    // 设置键盘右下角按钮的文字，可选值为 send、search、next、go、done
    confirmType: "done",
    // 是否显示键盘上方带有"完成"按钮那一栏
    showConfirmBar: true,
    // 是否自动增高（仅文本域有效）
    autoHeight: false,
};
