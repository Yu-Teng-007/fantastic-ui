import Vue from "vue";
import DialogComponent from "@/components/fanc-dialog/index.vue";
import defaultConfig from "../configs/dialog";

// 创建对话框构造器
const DialogConstructor = Vue.extend(DialogComponent);

// 对话框实例队列
const instances = [];
// 计数器，用于确保每个实例id不同
let seed = 1;
// 当前对话框的zIndex基础值
let zIndex = defaultConfig.zIndex;

/**
 * 创建对话框实例
 * @param {Object} options 配置选项
 * @returns {Object} 对话框实例
 */
const createDialog = (options) => {
    // 生成ID
    const id = `dialog_${seed++}`;

    // 合并配置
    options = {
        ...defaultConfig,
        ...options,
    };

    // 保存回调函数
    const userOnConfirm = options.onConfirm;
    const userOnCancel = options.onCancel;
    const userOnClose = options.onClose;
    const userSuccess = options.success;
    const userFail = options.fail;
    const userComplete = options.complete;

    // 创建对话框组件的DOM容器
    const container = document.createElement("div");
    document.body.appendChild(container);

    // 实例化组件
    const instance = new DialogConstructor({
        propsData: {
            zIndex: zIndex++,
            ...options,
        },
    });

    // 设置确认回调
    instance.handleConfirm = () => {
        if (typeof userOnConfirm === "function") {
            userOnConfirm("confirm");
        }

        // 处理成功回调
        if (typeof userSuccess === "function") {
            userSuccess({
                action: "confirm",
                dialog: {
                    close: () => closeDialog(id),
                },
            });
        }

        if (!options.asyncClose) {
            closeDialog(id);
        }
    };

    // 设置取消回调
    instance.handleCancel = () => {
        if (typeof userOnCancel === "function") {
            userOnCancel("cancel");
        }

        // 处理成功回调
        if (typeof userSuccess === "function") {
            userSuccess({
                action: "cancel",
                dialog: {
                    close: () => closeDialog(id),
                },
            });
        }

        if (!options.asyncClose) {
            closeDialog(id);
        }
    };

    // 设置关闭回调
    instance.handleClose = () => {
        if (typeof userOnClose === "function") {
            userOnClose("close");
        }

        // 处理成功回调
        if (typeof userSuccess === "function") {
            userSuccess({
                action: "close",
                dialog: {
                    close: () => closeDialog(id),
                },
            });
        }

        if (!options.asyncClose) {
            closeDialog(id);
        }
    };

    // 挂载到DOM
    instance.$mount(container);

    // 显示对话框
    instance.show = true;

    // 添加到实例队列
    instances.push({
        id,
        instance,
    });

    return instance;
};

/**
 * 关闭对话框
 * @param {String} id 对话框ID
 */
const closeDialog = (id) => {
    const index = instances.findIndex((item) => item.id === id);
    if (index === -1) return;

    const { instance } = instances[index];

    // 隐藏对话框
    instance.show = false;

    // 处理完成回调
    if (typeof instance.complete === "function") {
        instance.complete();
    }

    // 延迟销毁实例
    setTimeout(() => {
        // 从实例队列中移除
        instances.splice(index, 1);

        // 在DOM中移除组件
        if (instance.$el && instance.$el.parentNode) {
            instance.$el.parentNode.removeChild(instance.$el);
        }

        // 处理下一个队列中的对话框
        if (instances.length > 0 && index === 0) {
            const nextDialog = instances[0];
            nextDialog.instance.show = true;
        }
    }, instance.duration + 100);
};

// 定义对话框方法
const Dialog = {
    /**
     * 显示确认对话框
     * @param {Object|String} options 配置选项或消息文本
     * @returns {Object} 对话框实例
     */
    confirm(options) {
        if (typeof options === "string") {
            options = {
                message: options,
            };
        }

        return createDialog({
            showCancelButton: true,
            ...options,
        });
    },

    /**
     * 显示提示对话框
     * @param {Object|String} options 配置选项或消息文本
     * @returns {Object} 对话框实例
     */
    alert(options) {
        if (typeof options === "string") {
            options = {
                message: options,
            };
        }

        return createDialog({
            showCancelButton: false,
            ...options,
        });
    },

    /**
     * 显示成功对话框
     * @param {Object|String} options 配置选项或消息文本
     * @returns {Object} 对话框实例
     */
    success(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "success",
            };
        } else {
            options.type = "success";
        }

        return createDialog({
            showCancelButton: false,
            ...options,
        });
    },

    /**
     * 显示警告对话框
     * @param {Object|String} options 配置选项或消息文本
     * @returns {Object} 对话框实例
     */
    warning(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "warning",
            };
        } else {
            options.type = "warning";
        }

        return createDialog({
            showCancelButton: false,
            ...options,
        });
    },

    /**
     * 显示错误对话框
     * @param {Object|String} options 配置选项或消息文本
     * @returns {Object} 对话框实例
     */
    error(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "error",
            };
        } else {
            options.type = "error";
        }

        return createDialog({
            showCancelButton: false,
            ...options,
        });
    },

    /**
     * 显示信息对话框
     * @param {Object|String} options 配置选项或消息文本
     * @returns {Object} 对话框实例
     */
    info(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "info",
            };
        } else {
            options.type = "info";
        }

        return createDialog({
            showCancelButton: false,
            ...options,
        });
    },

    /**
     * 关闭所有对话框
     */
    closeAll() {
        for (let i = instances.length - 1; i >= 0; i--) {
            const { id } = instances[i];
            closeDialog(id);
        }
    },
};

// 导出Dialog
export default {
    // 安装插件
    install(Vue) {
        Vue.prototype.$dialog = Dialog;
    },

    // 提供静态方法
    ...Dialog,
};
